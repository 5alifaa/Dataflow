import type {
  DataRow,
  ExcelColumnOption,
  GridColumn,
  GridDataset,
  ImportBatchResult,
} from "@/lib/types";
import {
  normalizeColumnIdentity,
  slugifyLabel,
  titleCaseLabel,
} from "@/lib/utils";
import { detectImageColumns } from "./detect-image-columns";

interface PreparedIncomingColumn {
  key: string;
  headerName: string;
  sourceKey: string;
}

function dedupeColumnKey(baseKey: string, usedKeys: Set<string>) {
  let candidate = baseKey || "column";
  let suffix = 2;

  while (usedKeys.has(candidate)) {
    candidate = `${baseKey || "column"}_${suffix}`;
    suffix += 1;
  }

  usedKeys.add(candidate);
  return candidate;
}

function prepareIncomingColumns(
  selections: ExcelColumnOption[],
  existingColumns: GridColumn[],
) {
  const usedKeys = new Set(existingColumns.map((column) => column.key));

  return selections
    .filter((selection) => selection.selected)
    .map<PreparedIncomingColumn>((selection) => {
      const normalizedSourceKey = normalizeColumnIdentity(selection.sourceKey);
      const normalizedDisplayName = normalizeColumnIdentity(
        selection.displayName || selection.sourceKey,
      );
      const existingMatch = existingColumns.find(
        (column) =>
          (normalizedSourceKey.length > 0 &&
            (normalizeColumnIdentity(column.sourceKey ?? "") ===
              normalizedSourceKey ||
              normalizeColumnIdentity(column.headerName) ===
                normalizedSourceKey)) ||
          (normalizedDisplayName.length > 0 &&
            normalizeColumnIdentity(column.headerName) === normalizedDisplayName),
      );

      if (existingMatch) {
        usedKeys.add(existingMatch.key);
        return {
          key: existingMatch.key,
          headerName: existingMatch.headerName,
          sourceKey: existingMatch.sourceKey ?? selection.sourceKey,
        };
      }

      const baseKey = slugifyLabel(selection.displayName || selection.sourceKey);
      return {
        key: dedupeColumnKey(baseKey, usedKeys),
        headerName: titleCaseLabel(selection.displayName || selection.sourceKey),
        sourceKey: selection.sourceKey,
      };
    });
}

function normalizeRowForColumns(
  row: Record<string, unknown>,
  incomingColumns: PreparedIncomingColumn[],
  rowId: string,
): DataRow {
  const nextRow: DataRow = { __rowId: rowId };

  for (const column of incomingColumns) {
    nextRow[column.key] = (row[column.sourceKey] as DataRow[string]) ?? null;
  }

  return nextRow;
}

function backfillRows(rows: DataRow[], columns: GridColumn[]) {
  return rows.map((row) => {
    const filledRow: DataRow = { ...row };
    for (const column of columns) {
      if (!(column.key in filledRow)) {
        filledRow[column.key] = null;
      }
    }
    return filledRow;
  });
}

export function mergeImportedDataset(params: {
  current: GridDataset;
  selections: ExcelColumnOption[];
  parsedRows: Record<string, unknown>[];
  batchId: string;
}): ImportBatchResult {
  const { current, selections, parsedRows, batchId } = params;
  const incomingColumns = prepareIncomingColumns(selections, current.columns);
  const incomingRows = parsedRows.map((row, index) =>
    normalizeRowForColumns(row, incomingColumns, `${batchId}-${index}`),
  );

  const appendedRows = backfillRows(incomingRows, [
    ...current.columns,
    ...incomingColumns
      .filter(
        (incomingColumn) =>
          !current.columns.some((column) => column.key === incomingColumn.key),
      )
      .map<GridColumn>((column) => ({
        key: column.key,
        headerName: column.headerName,
        sourceKey: column.sourceKey,
      })),
  ]);

  const mergedColumnsBase = [
    ...current.columns,
    ...incomingColumns
      .filter(
        (incomingColumn) =>
          !current.columns.some((column) => column.key === incomingColumn.key),
      )
      .map<GridColumn>((column) => ({
        key: column.key,
        headerName: column.headerName,
        sourceKey: column.sourceKey,
      })),
  ];

  const columnsChanged = mergedColumnsBase.length !== current.columns.length;
  const mergedRows = [
    ...backfillRows(current.rows, mergedColumnsBase),
    ...appendedRows,
  ];
  const mergedColumns = detectImageColumns(mergedColumnsBase, mergedRows);

  return {
    dataset: {
      columns: mergedColumns,
      rows: mergedRows,
    },
    appendedRows,
    columnsChanged,
    totalRows: mergedRows.length,
  };
}
