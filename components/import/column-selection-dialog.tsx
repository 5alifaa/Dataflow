"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { ExcelColumnOption } from "@/lib/types";

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

  const selectedCount = useMemo(
    () => draftColumns.filter((column) => column.selected).length,
    [draftColumns],
  );

  const allSelected = draftColumns.length > 0 && selectedCount === draftColumns.length;

  const updateColumn = (
    sourceKey: string,
    patch: Partial<Pick<ExcelColumnOption, "selected" | "displayName">>,
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
            <Button
              size="sm"
              variant="outline"
              onClick={() => setAllSelected(true)}
              disabled={allSelected || draftColumns.length === 0}
            >
              Select all
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setAllSelected(false)}
              disabled={selectedCount === 0}
            >
              Clear all
            </Button>
          </div>
        </div>
        <ScrollArea className="max-h-[58vh] pr-3">
          {draftColumns.length === 0 ? (
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm text-stone-600">
              No columns were detected in this worksheet.
            </div>
          ) : (
            <div className="space-y-3">
              {draftColumns.map((column) => (
                <div
                  key={column.sourceKey}
                  className="grid gap-3 rounded-lg border border-stone-200 bg-[#fbfbfa] p-4 md:grid-cols-[auto_1fr_1fr]"
                >
                  <div className="flex items-center pt-7">
                    <Checkbox
                      checked={column.selected}
                      onCheckedChange={(checked) =>
                        updateColumn(column.sourceKey, { selected: checked === true })
                      }
                      aria-label={`Select ${column.originalHeader}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Original column</Label>
                    <Input value={column.originalHeader} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`display-${column.sourceKey}`}>
                      Displayed column
                    </Label>
                    <Input
                      id={`display-${column.sourceKey}`}
                      value={column.displayName}
                      onChange={(event) =>
                        updateColumn(column.sourceKey, {
                          displayName: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={() => onConfirm(draftColumns)}
            disabled={selectedCount === 0}
          >
            Import {selectedCount.toLocaleString()} columns
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
