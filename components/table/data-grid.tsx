"use client";

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

import {
  ClientSideRowModelModule,
} from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import type { GridApi, GridReadyEvent } from "@ag-grid-community/core";
import { useEffect, useRef } from "react";

import { EmptyTableState } from "@/components/table/empty-table-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { buildColumnDefinitions } from "@/lib/grid/column-definitions";
import { baseGridOptions } from "@/lib/grid/grid-options";
import type { DataRow, GridColumn } from "@/lib/types";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface DataGridProps {
  title: string;
  columns: GridColumn[];
  rows: DataRow[];
  appendedRows?: DataRow[];
  replaceVersion?: number;
  loading?: boolean;
  emptyTitle: string;
  emptyDescription: string;
}

export function DataGrid({
  title,
  columns,
  rows,
  appendedRows = [],
  replaceVersion = 0,
  loading = false,
  emptyTitle,
  emptyDescription,
}: DataGridProps) {
  const apiRef = useRef<GridApi<DataRow> | null>(null);

  useEffect(() => {
    if (apiRef.current) {
      apiRef.current.setGridOption("rowData", rows);
    }
  }, [replaceVersion, rows]);

  useEffect(() => {
    if (!apiRef.current || appendedRows.length === 0) {
      return;
    }

    apiRef.current.applyTransactionAsync({ add: appendedRows });
  }, [appendedRows]);

  const handleGridReady = (event: GridReadyEvent<DataRow>) => {
    apiRef.current = event.api;
    event.api.setGridOption("rowData", rows);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-[420px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (columns.length === 0 || rows.length === 0) {
    return <EmptyTableState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="ag-theme-quartz h-[620px] w-full overflow-hidden rounded-2xl border border-stone-200">
          <AgGridReact<DataRow>
            columnDefs={buildColumnDefinitions(columns)}
            rowData={[]}
            onGridReady={handleGridReady}
            {...baseGridOptions}
          />
        </div>
      </CardContent>
    </Card>
  );
}
