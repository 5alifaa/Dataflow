"use client";

import dynamic from "next/dynamic";

import { EmptyTableState } from "@/components/table/empty-table-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { DataRow, GridColumn } from "@/lib/types";

const AgGridView = dynamic(
  () => import("@/components/table/ag-grid-view").then((mod) => mod.AgGridView),
  {
    ssr: false,
    loading: () => <Skeleton className="h-full w-full" />,
  },
);

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
  loading = false,
  emptyTitle,
  emptyDescription,
}: DataGridProps) {
  if (loading) {
    return (
      <Card className="overflow-hidden rounded-lg shadow-none">
        <CardHeader className="border-b border-stone-200 bg-white">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
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
    <Card className="overflow-hidden rounded-lg shadow-none">
      <CardHeader className="grid gap-3 border-b border-stone-200 bg-white sm:grid-cols-[1fr_auto] sm:items-center">
        <CardTitle>{title}</CardTitle>
        <div className="flex flex-wrap gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-stone-500">
          <span className="rounded-full bg-[#fbfbfa] px-3 py-1 ring-1 ring-stone-200">
            {rows.length.toLocaleString()} rows
          </span>
          <span className="rounded-full bg-[#fbfbfa] px-3 py-1 ring-1 ring-stone-200">
            {columns.length.toLocaleString()} columns
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        <div className="ag-theme-quartz h-[620px] w-full overflow-hidden rounded-md border border-stone-200">
          <AgGridView columns={columns} rows={rows} />
        </div>
      </CardContent>
    </Card>
  );
}
