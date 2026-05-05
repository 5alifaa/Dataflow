"use client";

import { Database, SpinnerGap } from "@phosphor-icons/react";

import { ErrorBoundary } from "@/components/error-boundary";
import { ImportStatus } from "@/components/import/import-status";
import { DataGrid } from "@/components/table/data-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDummyData } from "@/hooks/use-dummy-data";

export function DummyDataWorkspace() {
  const {
    dataset,
    replaceVersion,
    rowCount,
    columnCount,
    isLoading,
    status,
    loadDummyData,
  } = useDummyData();

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="grid gap-5 border-b border-stone-950/10 bg-white/40 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="space-y-2">
            <CardTitle>Sample route</CardTitle>
            <p className="text-sm leading-6 text-stone-600">
              Load the API-backed sample dataset to validate the shared grid,
              wide schemas, and thumbnail rendering without a file upload.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-stone-700 ring-1 ring-stone-200">
              {rowCount.toLocaleString()} rows
            </div>
            <div className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-stone-700 ring-1 ring-stone-200">
              {columnCount.toLocaleString()} columns
            </div>
            <Button onClick={() => void loadDummyData()} disabled={isLoading}>
              {isLoading ? (
                <SpinnerGap className="size-4 animate-spin" weight="bold" />
              ) : (
                <Database className="size-4" weight="bold" />
              )}
              {isLoading ? "Loading" : "Load dummy data"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportStatus status={status} />
        </CardContent>
      </Card>

      <ErrorBoundary>
        <DataGrid
          title="Dummy dataset"
          columns={dataset.columns}
          rows={dataset.rows}
          replaceVersion={replaceVersion}
          loading={isLoading}
          emptyTitle="Dummy data not loaded"
          emptyDescription="Use the load action above to fetch the sample JSON through the Next.js route and inspect it in the shared grid."
        />
      </ErrorBoundary>
    </div>
  );
}
