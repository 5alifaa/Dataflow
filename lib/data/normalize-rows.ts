import type { DataRow, GridColumn, PrimitiveCell } from "@/lib/types";
import { isNonEmptyString, normalizeColumnIdentity } from "@/lib/utils";

function normalizePrimitive(value: unknown): PrimitiveCell {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  return String(value);
}

export function normalizeParsedRows(
  rows: Record<string, unknown>[],
  columns: string[],
  batchId: string,
) {
  return rows.map((row, rowIndex) => {
    const normalizedRow: DataRow = {
      __rowId: `${batchId}-${rowIndex}`,
    };

    for (const column of columns) {
      normalizedRow[column] = normalizePrimitive(row[column]);
    }

    return normalizedRow;
  });
}

function matchesExistingColumn(
  normalizedColumnName: string,
  existingColumn: GridColumn,
) {
  if (normalizedColumnName.length === 0) {
    return false;
  }

  return [existingColumn.headerName, existingColumn.sourceKey ?? ""]
    .map(normalizeColumnIdentity)
    .some((value) => value === normalizedColumnName);
}

function findMatchingColumn(column: string, existingColumns: GridColumn[]) {
  const normalizedColumnName = normalizeColumnIdentity(column);

  return existingColumns.find((existingColumn) =>
    matchesExistingColumn(normalizedColumnName, existingColumn),
  );
}

function getDisplayName(column: string, existingColumns: GridColumn[]) {
  const existingColumn = findMatchingColumn(column, existingColumns);

  if (existingColumn) {
    return existingColumn.headerName;
  }

  return isNonEmptyString(column) ? column : "Untitled Column";
}

export function buildColumnSelection(
  columns: string[],
  existingColumns: GridColumn[] = [],
) {
  return columns.map((column) => ({
    sourceKey: column,
    originalHeader: column,
    displayName: getDisplayName(column, existingColumns),
    selected: true,
  }));
}
