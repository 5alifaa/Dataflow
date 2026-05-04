"use client";

import { Database } from "lucide-react";

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
      <Card>
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <CardTitle>Server dummy data</CardTitle>
            <p className="text-sm leading-6 text-stone-600">
              Load the API-backed sample dataset to validate the shared grid,
              wide schemas, and thumbnail rendering without a file upload.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
              {rowCount.toLocaleString()} rows
            </div>
            <div className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
              {columnCount.toLocaleString()} columns
            </div>
            <Button onClick={() => void loadDummyData()} disabled={isLoading}>
              <Database className="size-4" />
              {isLoading ? "Loading..." : "Load dummy data"}
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
