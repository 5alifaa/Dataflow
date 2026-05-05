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

function toColumnIdentity(value: string | undefined) {
  return normalizeColumnIdentity(value ?? "");
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

function matchesNormalizedIdentity(identity: string, value: string | undefined) {
  return identity.length > 0 && toColumnIdentity(value) === identity;
}

function findExistingColumnMatch(
  selection: ExcelColumnOption,
  existingColumns: GridColumn[],
) {
  const sourceIdentity = toColumnIdentity(selection.sourceKey);
  const displayIdentity = toColumnIdentity(
    selection.displayName || selection.sourceKey,
  );

  return existingColumns.find(
    (column) =>
      matchesNormalizedIdentity(sourceIdentity, column.sourceKey) ||
      matchesNormalizedIdentity(sourceIdentity, column.headerName) ||
      matchesNormalizedIdentity(displayIdentity, column.headerName),
  );
}

function createPreparedIncomingColumn(
  selection: ExcelColumnOption,
  usedKeys: Set<string>,
) {
  const baseKey = slugifyLabel(selection.displayName || selection.sourceKey);

  return {
    key: dedupeColumnKey(baseKey, usedKeys),
    headerName: titleCaseLabel(selection.displayName || selection.sourceKey),
    sourceKey: selection.sourceKey,
  };
}

function toGridColumn(column: PreparedIncomingColumn): GridColumn {
  return {
    key: column.key,
    headerName: column.headerName,
    sourceKey: column.sourceKey,
  };
}

function getAdditionalColumns(
  currentColumns: GridColumn[],
  incomingColumns: PreparedIncomingColumn[],
) {
  return incomingColumns
    .filter(
      (incomingColumn) =>
        !currentColumns.some((column) => column.key === incomingColumn.key),
    )
    .map(toGridColumn);
}

function prepareIncomingColumns(
  selections: ExcelColumnOption[],
  existingColumns: GridColumn[],
) {
  const usedKeys = new Set(existingColumns.map((column) => column.key));

  return selections
    .filter((selection) => selection.selected)
    .map<PreparedIncomingColumn>((selection) => {
      const existingMatch = findExistingColumnMatch(selection, existingColumns);

      if (existingMatch) {
        usedKeys.add(existingMatch.key);
        return {
          key: existingMatch.key,
          headerName: existingMatch.headerName,
          sourceKey: existingMatch.sourceKey ?? selection.sourceKey,
        };
      }

      return createPreparedIncomingColumn(selection, usedKeys);
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
  const additionalColumns = getAdditionalColumns(current.columns, incomingColumns);
  const mergedColumnsBase = [...current.columns, ...additionalColumns];
  const incomingRows = parsedRows.map((row, index) =>
    normalizeRowForColumns(row, incomingColumns, `${batchId}-${index}`),
  );
  const appendedRows = backfillRows(incomingRows, mergedColumnsBase);
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
