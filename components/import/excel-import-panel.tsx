"use client";

import { FileSpreadsheet, LoaderCircle, Upload } from "lucide-react";

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

export function ExcelImportPanel({
  selectedFile,
  status,
  warningMessage,
  counts,
  isParsing,
  onFileChange,
  onImport,
}: ExcelImportPanelProps) {
  return (
    <Card>
      <CardHeader className="gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <CardTitle>Excel import</CardTitle>
            <CardDescription>
              Upload a workbook, parse it in a worker, and review the extracted
              columns before the rows are appended.
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>{counts.rows.toLocaleString()} rows</Badge>
            <Badge>{counts.columns.toLocaleString()} columns</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-3">
            <label
              htmlFor="excel-file"
              className="text-sm font-medium text-stone-800"
            >
              Excel workbook
            </label>
            <Input
              id="excel-file"
              type="file"
              accept=".xlsx,.xls"
              onChange={(event) =>
                onFileChange(event.target.files?.[0] ?? null)
              }
            />
            <div className="flex min-h-11 items-center gap-3 rounded-2xl border border-dashed border-stone-200 bg-stone-50 px-4 text-sm text-stone-600">
              <FileSpreadsheet className="size-4 text-sky-700" />
              {selectedFile ? selectedFile.name : "No file selected yet"}
            </div>
          </div>
          <Button
            size="lg"
            onClick={() => void onImport()}
            disabled={isParsing}
            className="min-w-44"
          >
            {isParsing ? (
              <>
                <LoaderCircle className="size-4 animate-spin" />
                Parsing
              </>
            ) : (
              <>
                <Upload className="size-4" />
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
