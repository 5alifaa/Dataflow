'use client';

import { useMemo, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import type { ExcelColumnOption } from '@/lib/types';

interface ColumnSelectionDialogProps {
  open: boolean;
  columns: ExcelColumnOption[];
  onOpenChange: (open: boolean) => void;
  onConfirm: (columns: ExcelColumnOption[]) => void;
  onCancel: () => void;
}

export function ColumnSelectionDialog({
  open,
  columns,
  onOpenChange,
  onConfirm,
  onCancel,
}: ColumnSelectionDialogProps) {
  const [draftColumns, setDraftColumns] = useState(columns);
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLocaleLowerCase();

  const filteredColumns = useMemo(() => {
    if (!normalizedQuery) {
      return draftColumns;
    }

    return draftColumns.filter((column) => {
      const original = column.originalHeader.toLocaleLowerCase();
      const displayed = column.displayName.toLocaleLowerCase();
      return (
        original.includes(normalizedQuery) ||
        displayed.includes(normalizedQuery)
      );
    });
  }, [draftColumns, normalizedQuery]);

  const selectedCount = useMemo(
    () => draftColumns.filter((column) => column.selected).length,
    [draftColumns],
  );

  const selectedNameCounts = useMemo(() => {
    const counts = new Map<string, number>();

    for (const column of draftColumns) {
      if (!column.selected) {
        continue;
      }

      const key = column.displayName.trim().toLocaleLowerCase();
      if (!key) {
        continue;
      }

      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    return counts;
  }, [draftColumns]);

  const hasInvalidSelectedNames = useMemo(
    () =>
      draftColumns.some((column) => {
        if (!column.selected) {
          return false;
        }

        const key = column.displayName.trim().toLocaleLowerCase();
        if (!key) {
          return true;
        }

        return (selectedNameCounts.get(key) ?? 0) > 1;
      }),
    [draftColumns, selectedNameCounts],
  );

  const visibleSelectedCount = useMemo(
    () => filteredColumns.filter((column) => column.selected).length,
    [filteredColumns],
  );

  const allSelected =
    draftColumns.length > 0 && selectedCount === draftColumns.length;
  const allVisibleSelected =
    filteredColumns.length > 0 &&
    visibleSelectedCount === filteredColumns.length;

  const selectVisibleColumns = (selected: boolean) => {
    const visibleKeys = new Set(
      filteredColumns.map((column) => column.sourceKey),
    );
    setDraftColumns((current) =>
      current.map((column) =>
        visibleKeys.has(column.sourceKey) ? { ...column, selected } : column,
      ),
    );
  };

  const updateColumn = (
    sourceKey: string,
    patch: Partial<Pick<ExcelColumnOption, 'selected' | 'displayName'>>,
  ) => {
    setDraftColumns((current) =>
      current.map((column) =>
        column.sourceKey === sourceKey ? { ...column, ...patch } : column,
      ),
    );
  };

  const setAllSelected = (selected: boolean) => {
    setDraftColumns((current) =>
      current.map((column) => ({
        ...column,
        selected,
      })),
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] sm:max-w-4xl">
        <DialogHeader className="gap-3">
          <DialogTitle>Select and rename columns</DialogTitle>
          <DialogDescription>
            Review every extracted column before the rows are appended to the
            grid. Renamed values will be used as the displayed headers.
          </DialogDescription>
          <div className="flex flex-wrap gap-2 pt-1">
            <Badge>{selectedCount.toLocaleString()} selected</Badge>
            <Badge>{draftColumns.length.toLocaleString()} total</Badge>
          </div>
        </DialogHeader>
        <Separator />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-stone-600">
            Choose the columns to keep, then edit their display names.
          </p>
          <div className="flex flex-wrap gap-2">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search columns"
              className="h-9 w-[220px]"
              aria-label="Search columns"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                normalizedQuery
                  ? selectVisibleColumns(true)
                  : setAllSelected(true)
              }
              disabled={
                normalizedQuery
                  ? allVisibleSelected || filteredColumns.length === 0
                  : allSelected || draftColumns.length === 0
              }
            >
              {normalizedQuery ? 'Select visible' : 'Select all'}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                normalizedQuery
                  ? selectVisibleColumns(false)
                  : setAllSelected(false)
              }
              disabled={
                normalizedQuery
                  ? visibleSelectedCount === 0
                  : selectedCount === 0
              }
            >
              {normalizedQuery ? 'Clear visible' : 'Clear all'}
            </Button>
          </div>
        </div>
        <ScrollArea className="max-h-[58vh] pr-3">
          {draftColumns.length === 0 ? (
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm text-stone-600">
              No columns were detected in this worksheet.
            </div>
          ) : filteredColumns.length === 0 ? (
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm text-stone-600">
              No columns match this search.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredColumns.map((column, index) => {
                const normalizedName = column.displayName
                  .trim()
                  .toLocaleLowerCase();
                const isEmptySelected =
                  column.selected && normalizedName.length === 0;
                const isDuplicateSelected =
                  column.selected &&
                  normalizedName.length > 0 &&
                  (selectedNameCounts.get(normalizedName) ?? 0) > 1;

                return (
                  <div
                    key={column.sourceKey}
                    className="grid gap-3 rounded-lg border border-stone-200 bg-[#fbfbfa] p-4 md:grid-cols-[auto_1fr_1fr]"
                  >
                    <div className="flex items-center pt-7">
                      <Checkbox
                        checked={column.selected}
                        onCheckedChange={(checked) =>
                          updateColumn(column.sourceKey, {
                            selected: checked === true,
                          })
                        }
                        aria-label={`Select ${column.originalHeader}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-stone-600">
                        Original column
                      </Label>
                      <p className="rounded-md border border-stone-200 bg-stone-100 px-3 py-2 text-sm text-stone-700">
                        {column.originalHeader}
                      </p>
                      <p className="text-xs text-stone-500">
                        Column {index + 1}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`display-${column.sourceKey}`}
                        className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-stone-600"
                      >
                        Displayed column
                      </Label>
                      <Input
                        id={`display-${column.sourceKey}`}
                        className={
                          isEmptySelected || isDuplicateSelected
                            ? 'border-rose-300 focus-visible:border-rose-700 focus-visible:ring-rose-700/10'
                            : undefined
                        }
                        value={column.displayName}
                        onChange={(event) =>
                          updateColumn(column.sourceKey, {
                            displayName: event.target.value,
                          })
                        }
                      />
                      {isEmptySelected ? (
                        <p className="text-xs text-rose-700">
                          Displayed column name is required.
                        </p>
                      ) : null}
                      {isDuplicateSelected ? (
                        <p className="text-xs text-rose-700">
                          Displayed column name must be unique.
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
        {hasInvalidSelectedNames ? (
          <Alert tone="error">
            <AlertTitle>Fix column names before importing</AlertTitle>
            <AlertDescription>
              Selected columns need non-empty, unique displayed names.
            </AlertDescription>
          </Alert>
        ) : null}
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={() => onConfirm(draftColumns)}
            disabled={selectedCount === 0 || hasInvalidSelectedNames}
          >
            Import {selectedCount.toLocaleString()} columns
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
