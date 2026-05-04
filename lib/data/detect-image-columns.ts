import type { GridColumn } from "@/lib/types";

const IMAGE_URL_PATTERN =
  /^https?:\/\/[^\s]+\.(?:png|jpe?g|gif|webp|avif|svg)(?:\?[^\s]*)?$/i;

function isImageUrl(value: unknown) {
  return typeof value === "string" && IMAGE_URL_PATTERN.test(value.trim());
}

export function detectImageColumns(
  columns: Pick<GridColumn, "key" | "headerName" | "sourceKey">[],
  rows: Array<Record<string, unknown>>,
): GridColumn[] {
  return columns.map((column) => {
    const values = rows
      .map((row) => row[column.key])
      .filter((value) => value !== null && value !== undefined)
      .slice(0, 25);

    const matches = values.filter((value) => isImageUrl(value)).length;
    const isImage = values.length > 0 && matches / values.length >= 0.6;

    return {
      ...column,
      isImage,
    };
  });
}

export function isImageValue(value: unknown) {
  return isImageUrl(value);
}
