"use client";

import { useState } from "react";

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Select and rename columns</DialogTitle>
          <DialogDescription>
            Review every extracted column before the rows are appended to the
            grid. Renamed values will be used as the displayed headers.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <ScrollArea className="max-h-[58vh] pr-3">
          <div className="space-y-4">
            {draftColumns.map((column) => (
              <div
                key={column.sourceKey}
                className="grid gap-3 rounded-2xl border border-stone-200 p-4 md:grid-cols-[auto_1fr_1fr]"
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
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onConfirm(draftColumns)}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
