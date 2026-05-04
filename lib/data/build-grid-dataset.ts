import { detectImageColumns } from "@/lib/data/detect-image-columns";
import type { DataRow, GridColumn, GridDataset } from "@/lib/types";
import { slugifyLabel, titleCaseLabel } from "@/lib/utils";

function normalizeValue(value: unknown) {
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

  return String(value);
}

export function buildGridDatasetFromRecords(
  rows: Record<string, unknown>[],
  batchId: string,
): GridDataset {
  const seen = new Set<string>();
  const columns = Array.from(
    new Set(rows.flatMap((row) => Object.keys(row)).filter(Boolean)),
  ).map<GridColumn>((columnName) => {
    let key = slugifyLabel(columnName) || "column";
    let suffix = 2;

    while (seen.has(key)) {
      key = `${slugifyLabel(columnName) || "column"}_${suffix}`;
      suffix += 1;
    }

    seen.add(key);

    return {
      key,
      sourceKey: columnName,
      headerName: titleCaseLabel(columnName),
    };
  });

  const normalizedRows = rows.map<DataRow>((row, rowIndex) => {
    const nextRow: DataRow = {
      __rowId: `${batchId}-${rowIndex}`,
    };

    for (const column of columns) {
      nextRow[column.key] = normalizeValue(row[column.sourceKey ?? column.key]);
    }

    return nextRow;
  });

  return {
    columns: detectImageColumns(columns, normalizedRows),
    rows: normalizedRows,
  };
}
