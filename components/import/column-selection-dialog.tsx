'use client';

import { useMemo, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
        <DialogHeader className="gap-2">
          <DialogTitle>Choose columns to import</DialogTitle>
          <DialogDescription>
            Review your columns before import. Renamed values become the display
            headers.
          </DialogDescription>
          <div className="flex items-center gap-3 pt-2">
            <span className="text-sm font-medium text-stone-700">
              {selectedCount.toLocaleString()} of{' '}
              {draftColumns.length.toLocaleString()} selected
            </span>
          </div>
        </DialogHeader>
        <Separator />
        <div className="space-y-3">
          <p className="text-sm text-stone-600">
            Select the columns to keep, then edit their display names.
          </p>
          <div className="flex flex-wrap gap-2">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by original or display name"
              className="h-9 flex-1 min-w-[220px]"
              aria-label="Search columns"
            />
            <Button
              size="sm"
              variant={
                allSelected || (normalizedQuery && allVisibleSelected)
                  ? 'default'
                  : 'outline'
              }
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
              Deselect {normalizedQuery ? 'visible' : 'all'}
            </Button>
          </div>
        </div>
        <ScrollArea className="max-h-[55vh] pr-3">
          {draftColumns.length === 0 ? (
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm text-stone-600">
              No columns were detected.
            </div>
          ) : filteredColumns.length === 0 ? (
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm text-stone-600">
              No columns match your search.
            </div>
          ) : (
            <div className="space-y-4">
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
                    className="grid gap-4 rounded-lg border border-stone-200 bg-white p-4 md:grid-cols-[40px_1fr_1fr]"
                  >
                    <div className="flex items-start pt-1">
                      <Checkbox
                        checked={column.selected}
                        onCheckedChange={(checked) =>
                          updateColumn(column.sourceKey, {
                            selected: checked === true,
                          })
                        }
                        aria-label={`Import column: ${column.originalHeader}`}
                      />
                    </div>
                    <div className="space-y-2 min-w-0">
                      <Label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                        Original
                      </Label>
                      <div className="rounded border border-stone-200 bg-stone-50 px-3 py-2.5">
                        <p className="truncate text-sm text-stone-700 font-medium">
                          {column.originalHeader}
                        </p>
                        <p className="text-xs text-stone-500 mt-1">
                          Column {index + 1}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 min-w-0">
                      <Label
                        htmlFor={`display-${column.sourceKey}`}
                        className="text-xs font-semibold text-stone-500 uppercase tracking-wider"
                      >
                        Display name
                      </Label>
                      <div>
                        <Input
                          id={`display-${column.sourceKey}`}
                          className={`${
                            isEmptySelected || isDuplicateSelected
                              ? 'border-rose-300 focus-visible:border-rose-700 focus-visible:ring-rose-700/10'
                              : ''
                          }`}
                          value={column.displayName}
                          onChange={(event) =>
                            updateColumn(column.sourceKey, {
                              displayName: event.target.value,
                            })
                          }
                          placeholder="Enter name"
                        />
                        {isEmptySelected ? (
                          <p className="text-xs text-rose-700 mt-1.5">
                            Required
                          </p>
                        ) : null}
                        {isDuplicateSelected ? (
                          <p className="text-xs text-rose-700 mt-1.5">
                            Name must be unique
                          </p>
                        ) : null}
                      </div>
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
              Selected columns need unique, non-empty display names.
            </AlertDescription>
          </Alert>
        ) : null}
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={() => onConfirm(draftColumns)}
            disabled={selectedCount === 0 || hasInvalidSelectedNames}
          >
            Import {selectedCount.toLocaleString()} column
            {selectedCount === 1 ? '' : 's'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
