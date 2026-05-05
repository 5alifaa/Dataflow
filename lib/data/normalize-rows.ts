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

export function buildColumnSelection(
  columns: string[],
  existingColumns: GridColumn[] = [],
) {
  return columns.map((column) => {
    const normalizedSourceKey = normalizeColumnIdentity(column);
    const existingMatch = existingColumns.find((existingColumn) => {
      const normalizedHeaderName = normalizeColumnIdentity(
        existingColumn.headerName,
      );
      const normalizedExistingSourceKey = normalizeColumnIdentity(
        existingColumn.sourceKey ?? "",
      );

      return (
        normalizedSourceKey.length > 0 &&
        (normalizedSourceKey === normalizedHeaderName ||
          normalizedSourceKey === normalizedExistingSourceKey)
      );
    });

    return {
      sourceKey: column,
      originalHeader: column,
      displayName:
        existingMatch?.headerName ??
        (isNonEmptyString(column) ? column : "Untitled Column"),
      selected: true,
    };
  });
}
