"use client";

import { startTransition, useMemo, useState } from "react";

import { buildColumnSelection } from "@/lib/data/normalize-rows";
import { mergeImportedDataset } from "@/lib/data/merge-datasets";
import { validateExcelFile } from "@/lib/data/file-validation";
import { validateRowLimits } from "@/lib/data/validate-row-limits";
import { parseExcelFileInWorker } from "@/lib/excel/excel-parser-client";
import type {
  ExcelColumnOption,
  ExcelParseSuccess,
  ImportStatusState,
} from "@/lib/types";
import { useGridData } from "@/hooks/use-grid-data";

const EMPTY_SUCCESS: ImportStatusState = {
  tone: "default",
  title: "Ready to import",
  description:
    "Choose an Excel workbook to parse it in a worker, review the columns, and append the selected data to the shared grid.",
};

export function useExcelImport() {
  const gridData = useGridData();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingParse, setPendingParse] = useState<ExcelParseSuccess | null>(null);
  const [pendingColumns, setPendingColumns] = useState<ExcelColumnOption[]>([]);
  const [dialogRevision, setDialogRevision] = useState(0);
  const [status, setStatus] = useState<ImportStatusState>(EMPTY_SUCCESS);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const counts = useMemo(
    () => ({
      rows: gridData.rowCount,
      columns: gridData.columnCount,
    }),
    [gridData.columnCount, gridData.rowCount],
  );

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    setWarningMessage(null);
    if (file) {
      setStatus({
        tone: "default",
        title: "File ready",
        description: `${file.name} is ready to parse.`,
      });
    } else {
      setStatus(EMPTY_SUCCESS);
    }
  };

  const beginImport = async () => {
    if (!selectedFile) {
      setStatus({
        tone: "error",
        title: "No file selected",
        description: "Select an Excel workbook before starting the import.",
      });
      return;
    }

    const fileValidation = validateExcelFile(selectedFile);
    if (!fileValidation.valid) {
      setStatus({
        tone: "error",
        title: "Invalid file type",
        description: fileValidation.message ?? "The selected file is not supported.",
      });
      return;
    }

    try {
      setIsParsing(true);
      setStatus({
        tone: "default",
        title: "Parsing workbook",
        description: "The Excel file is being parsed in a Web Worker.",
      });

      const parseResult = await parseExcelFileInWorker(selectedFile);
      const rowCheck = validateRowLimits(gridData.rowCount, parseResult.rowCount);

      if (rowCheck.blocked) {
        setStatus({
          tone: "error",
          title: "Import blocked",
          description: rowCheck.message ?? "The import would exceed the row limit.",
        });
        setWarningMessage(null);
        return;
      }

      setWarningMessage(rowCheck.warning ? rowCheck.message : null);
      setPendingParse(parseResult);
      setPendingColumns(
        buildColumnSelection(parseResult.columns, gridData.dataset.columns),
      );
      setDialogRevision((revision) => revision + 1);
      setDialogOpen(true);
      setStatus({
        tone: "success",
        title: "Workbook parsed",
        description: `${parseResult.fileName} yielded ${parseResult.rowCount.toLocaleString()} rows and ${parseResult.columns.length.toLocaleString()} columns.`,
      });
    } catch (error) {
      setStatus({
        tone: "error",
        title: "Parsing failed",
        description:
          error instanceof Error
            ? error.message
            : "The workbook could not be parsed.",
      });
    } finally {
      setIsParsing(false);
    }
  };

  const confirmImport = (columns: ExcelColumnOption[]) => {
    if (!pendingParse) {
      return;
    }

    const selectedCount = columns.filter((column) => column.selected).length;
    if (selectedCount === 0) {
      setStatus({
        tone: "error",
        title: "No columns selected",
        description: "Select at least one column before confirming the import.",
      });
      return;
    }

    const importResult = mergeImportedDataset({
      current: gridData.dataset,
      selections: columns,
      parsedRows: pendingParse.rows,
      batchId: `${Date.now()}`,
    });

    startTransition(() => {
      gridData.applyImportBatch(importResult);
    });

    setDialogOpen(false);
    setPendingParse(null);
    setPendingColumns([]);
    setStatus({
      tone: "success",
      title: "Import complete",
      description: `${pendingParse.fileName} appended ${pendingParse.rowCount.toLocaleString()} rows. The grid now shows ${importResult.totalRows.toLocaleString()} rows across ${importResult.dataset.columns.length.toLocaleString()} columns.`,
    });
  };

  const cancelImport = () => {
    setDialogOpen(false);
    setPendingParse(null);
    setPendingColumns([]);
    setStatus({
      tone: "default",
      title: "Import canceled",
      description: "The parsed workbook was discarded and the current dataset is unchanged.",
    });
  };

  return {
    ...gridData,
    selectedFile,
    isParsing,
    dialogOpen,
    pendingParse,
    pendingColumns,
    dialogRevision,
    status,
    warningMessage,
    counts,
    handleFileChange,
    beginImport,
    confirmImport,
    cancelImport,
    setPendingColumns,
  };
}
