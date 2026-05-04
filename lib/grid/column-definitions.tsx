"use client";

import type { ColDef } from "@ag-grid-community/core";

import { ImageThumbnailCell } from "@/components/table/image-thumbnail-cell";
import type { DataRow, GridColumn } from "@/lib/types";

export function buildColumnDefinitions(columns: GridColumn[]): ColDef<DataRow>[] {
  return columns.map((column) => ({
    colId: column.key,
    field: column.key,
    headerName: column.headerName,
    minWidth: column.isImage ? 140 : 180,
    cellRenderer: column.isImage
      ? (params: { value: string | null }) => (
          <ImageThumbnailCell value={params.value} />
        )
      : undefined,
    valueFormatter: column.isImage
      ? undefined
      : (params) => {
          const value = params.value;
          return value === null || value === undefined ? "null" : String(value);
        },
  }));
}
