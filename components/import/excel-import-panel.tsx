"use client";

import { FileXls, SpinnerGap, UploadSimple } from "@phosphor-icons/react";

import { ImportStatus } from "@/components/import/import-status";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { ImportStatusState } from "@/lib/types";

interface ExcelImportPanelProps {
  selectedFile: File | null;
  status: ImportStatusState;
  warningMessage: string | null;
  counts: {
    rows: number;
    columns: number;
  };
  isParsing: boolean;
  onFileChange: (file: File | null) => void;
  onImport: () => Promise<void>;
}

function formatFileSize(bytes: number) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function ExcelImportPanel({
  selectedFile,
  status,
  warningMessage,
  counts,
  isParsing,
  onFileChange,
  onImport,
}: ExcelImportPanelProps) {
  const hasSelectedFile = Boolean(selectedFile);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="gap-4 border-b border-stone-200 bg-[#f9f9f8]">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <div className="space-y-1">
            <CardTitle>Excel import</CardTitle>
            <CardDescription>
              Upload a workbook, parse it in a worker, and review the extracted
              columns before the rows are appended.
            </CardDescription>
            <p className="text-xs uppercase tracking-[0.08em] text-stone-500">
              Step 1 upload, step 2 map columns, step 3 append rows
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>{counts.rows.toLocaleString()} rows</Badge>
            <Badge>{counts.columns.toLocaleString()} columns</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="space-y-3">
            <label
              htmlFor="excel-file"
              className="text-sm font-medium text-stone-900"
            >
              Excel workbook
            </label>
            <p id="excel-file-hint" className="text-sm text-stone-600">
              Accepted formats: .xlsx, .xls. Files are parsed locally in your
              browser worker.
            </p>
            <Input
              id="excel-file"
              type="file"
              accept=".xlsx,.xls"
              aria-describedby="excel-file-hint"
              onChange={(event) =>
                onFileChange(event.target.files?.[0] ?? null)
              }
            />
            <div className="flex min-h-12 items-center gap-3 rounded-lg border border-dashed border-stone-200 bg-[#fbfbfa] px-4 text-sm text-stone-600">
              <FileXls className="size-5 text-[#346538]" weight="duotone" />
              <span className="truncate" aria-live="polite">
                {selectedFile
                  ? `${selectedFile.name} (${formatFileSize(selectedFile.size)})`
                  : "No file selected yet"}
              </span>
            </div>
          </div>
          <Button
            size="lg"
            onClick={() => void onImport()}
            disabled={isParsing || !hasSelectedFile}
            className="min-w-44"
            aria-busy={isParsing}
          >
            {isParsing ? (
              <>
                <SpinnerGap className="size-4 animate-spin" weight="bold" />
                Parsing
              </>
            ) : (
              <>
                <UploadSimple className="size-4" weight="bold" />
                Import workbook
              </>
            )}
          </Button>
        </div>

        {warningMessage ? (
          <Alert tone="warning">
            <AlertTitle>Large dataset warning</AlertTitle>
            <AlertDescription>{warningMessage}</AlertDescription>
          </Alert>
        ) : null}

        <ImportStatus status={status} />
      </CardContent>
    </Card>
  );
}
