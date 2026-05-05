"use client";

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";

import { buildColumnDefinitions } from "@/lib/grid/column-definitions";
import { baseGridOptions } from "@/lib/grid/grid-options";
import type { DataRow, GridColumn } from "@/lib/types";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface AgGridViewProps {
  columns: GridColumn[];
  rows: DataRow[];
}

export function AgGridView({ columns, rows }: AgGridViewProps) {
  return (
    <AgGridReact<DataRow>
      columnDefs={buildColumnDefinitions(columns)}
      rowData={rows}
      {...baseGridOptions}
    />
  );
}
