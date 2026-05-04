"use client";

import { useState } from "react";

import type { DataRow, GridDataset, ImportBatchResult } from "@/lib/types";

const EMPTY_DATASET: GridDataset = {
  columns: [],
  rows: [],
};

export function useGridData(initialDataset: GridDataset = EMPTY_DATASET) {
  const [dataset, setDataset] = useState<GridDataset>(initialDataset);
  const [appendedRows, setAppendedRows] = useState<DataRow[]>([]);
  const [replaceVersion, setReplaceVersion] = useState(0);

  const replaceDataset = (nextDataset: GridDataset) => {
    setDataset(nextDataset);
    setAppendedRows([]);
    setReplaceVersion((version) => version + 1);
  };

  const applyImportBatch = (result: ImportBatchResult) => {
    setDataset(result.dataset);

    if (result.columnsChanged || result.dataset.rows.length === result.appendedRows.length) {
      setAppendedRows([]);
      setReplaceVersion((version) => version + 1);
      return;
    }

    setAppendedRows(result.appendedRows);
  };

  return {
    dataset,
    appendedRows,
    replaceVersion,
    replaceDataset,
    applyImportBatch,
    rowCount: dataset.rows.length,
    columnCount: dataset.columns.length,
  };
}
