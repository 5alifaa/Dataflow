import type { DataRow, PrimitiveCell } from "@/lib/types";
import { isNonEmptyString } from "@/lib/utils";

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

export function buildColumnSelection(columns: string[]) {
  return columns.map((column) => ({
    sourceKey: column,
    originalHeader: column,
    displayName: isNonEmptyString(column) ? column : "Untitled Column",
    selected: true,
  }));
}
