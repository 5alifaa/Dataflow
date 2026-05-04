"use client";

import { ColumnSelectionDialog } from "@/components/import/column-selection-dialog";
import { ExcelImportPanel } from "@/components/import/excel-import-panel";
import { ErrorBoundary } from "@/components/error-boundary";
import { DataGrid } from "@/components/table/data-grid";
import { useExcelImport } from "@/hooks/use-excel-import";

export function ExcelImportWorkspace() {
  const {
    dataset,
    appendedRows,
    replaceVersion,
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
  } = useExcelImport();

  return (
    <div className="space-y-6">
      <ExcelImportPanel
        selectedFile={selectedFile}
        status={status}
        warningMessage={warningMessage}
        counts={counts}
        isParsing={isParsing}
        onFileChange={handleFileChange}
        onImport={beginImport}
      />

      <ErrorBoundary>
        <DataGrid
          title="Imported dataset"
          columns={dataset.columns}
          rows={dataset.rows}
          appendedRows={appendedRows}
          replaceVersion={replaceVersion}
          emptyTitle="No imported rows yet"
          emptyDescription="Upload an Excel workbook to preview the parsed data, select columns, and build up the dataset with multiple imports."
        />
      </ErrorBoundary>

      <ColumnSelectionDialog
        key={`${pendingParse?.fileName ?? "column-dialog"}-${dialogRevision}`}
        open={dialogOpen}
        columns={pendingColumns}
        onOpenChange={(open) => {
          if (!open) {
            cancelImport();
            return;
          }
        }}
        onConfirm={confirmImport}
        onCancel={cancelImport}
      />
    </div>
  );
}
