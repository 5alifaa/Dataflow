'use client';

import {
  CheckCircle,
  FileArrowUp,
  FileXls,
  SpinnerGap,
  UploadSimple,
  X,
} from '@phosphor-icons/react';

import { ImportStatus } from '@/components/import/import-status';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { ImportStatusState } from '@/lib/types';

const EMPTY_SELECTION_COPY = 'Import is disabled until a workbook is chosen.';

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

function ImportCountBadge({ value, label }: { value: number; label: string }) {
  return (
    <Badge className="bg-white/70 text-stone-700 ring-1 ring-stone-200">
      {value.toLocaleString()} {label}
    </Badge>
  );
}

function HiddenFileInput({
  onFileChange,
}: {
  onFileChange: (file: File | null) => void;
}) {
  return (
    <Input
      id="excel-file"
      type="file"
      accept=".xlsx,.xls"
      aria-describedby="excel-file-hint excel-file-selection"
      className="sr-only"
      onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
    />
  );
}

function FilePickerCallout({ hasSelectedFile }: { hasSelectedFile: boolean }) {
  return (
    <label
      htmlFor="excel-file"
      className="group flex min-h-40 cursor-pointer items-center gap-5 rounded-lg border border-dashed border-stone-300 bg-[#fbfaf5] p-6 transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-stone-500 hover:bg-white"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-950 shadow-[0_12px_40px_rgba(28,25,23,0.06)]">
        <FileArrowUp className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" weight="regular" />
      </span>
      <span className="min-w-0 text-left">
        <span className="block text-lg font-semibold tracking-normal text-stone-950">
          {hasSelectedFile ? 'Replace workbook' : 'Choose workbook'}
        </span>
        <span className="mt-2 block max-w-xl text-sm leading-6 text-stone-600">
          Select a local .xlsx or .xls file. Nothing is appended until you
          confirm the columns.
        </span>
      </span>
    </label>
  );
}

function SelectedFileSummary({ selectedFile }: { selectedFile: File | null }) {
  const hasSelectedFile = Boolean(selectedFile);
  const fileDetails = selectedFile
    ? formatFileSize(selectedFile.size)
    : EMPTY_SELECTION_COPY;

  return (
    <div
      id="excel-file-selection"
      className="flex min-h-14 items-center gap-3 rounded-lg bg-white/70 px-3 text-sm text-stone-700 ring-1 ring-stone-200"
      aria-live="polite"
    >
      {hasSelectedFile ? (
        <CheckCircle className="size-5 shrink-0 text-[#346538]" weight="fill" />
      ) : (
        <FileXls className="size-5 shrink-0 text-stone-500" weight="duotone" />
      )}
      <span className="min-w-0">
        <span className="block truncate font-medium text-stone-950">
          {selectedFile?.name ?? 'No file selected'}
        </span>
        <span className="block text-xs text-stone-500">{fileDetails}</span>
      </span>
    </div>
  );
}

function ImportWorkbookButton({
  disabled,
  isParsing,
  onImport,
}: {
  disabled: boolean;
  isParsing: boolean;
  onImport: () => Promise<void>;
}) {
  return (
    <Button
      size="lg"
      onClick={() => void onImport()}
      disabled={disabled}
      className="w-full bg-stone-950 text-white hover:bg-stone-800"
      aria-busy={isParsing}
    >
      {isParsing ? (
        <>
          <SpinnerGap className="size-4 animate-spin" weight="bold" />
          Parsing workbook
        </>
      ) : (
        <>
          <UploadSimple className="size-4" weight="bold" />
          Import workbook
        </>
      )}
    </Button>
  );
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
  const importDisabled = isParsing || !hasSelectedFile;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-stone-950/10 bg-white/40 p-5 sm:p-6">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          <div className="space-y-1">
            <CardTitle>Workbook intake</CardTitle>
            <CardDescription>
              Choose a workbook, then shape the schema before rows enter the grid.
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            <ImportCountBadge value={counts.rows} label="rows" />
            <ImportCountBadge value={counts.columns} label="columns" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 p-5 sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="excel-file"
                className="text-[0.6875rem] font-semibold uppercase tracking-normal text-stone-600"
              >
                Excel workbook
              </label>
              <p id="excel-file-hint" className="text-sm leading-6 text-stone-600">
                Accepted formats: .xlsx and .xls. Parsing happens locally in
                your browser worker.
              </p>
            </div>
            <FilePickerCallout hasSelectedFile={hasSelectedFile} />
            <HiddenFileInput onFileChange={onFileChange} />
          </div>

          <aside className="flex flex-col justify-between gap-4 border-t border-stone-200 pt-5 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
            <div className="space-y-3">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-normal text-stone-600">
                Selected file
              </p>
              <SelectedFileSummary selectedFile={selectedFile} />
              {hasSelectedFile ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-9 w-fit text-stone-600"
                  onClick={() => onFileChange(null)}
                >
                  <X className="size-4" weight="bold" />
                  Clear file
                </Button>
              ) : null}
            </div>
            <ImportWorkbookButton
              disabled={importDisabled}
              isParsing={isParsing}
              onImport={onImport}
            />
          </aside>
        </div>

        {!hasSelectedFile ? (
          <p className="text-xs leading-5 text-stone-500">
            Select a workbook to enable import.
          </p>
        ) : null}

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
