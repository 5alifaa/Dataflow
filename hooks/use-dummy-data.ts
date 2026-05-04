"use client";

import { useState } from "react";

import { fetchDummyData } from "@/lib/api/dummy-data-client";
import { buildGridDatasetFromRecords } from "@/lib/data/build-grid-dataset";
import type { ImportStatusState } from "@/lib/types";
import { useGridData } from "@/hooks/use-grid-data";

const INITIAL_STATUS: ImportStatusState = {
  tone: "default",
  title: "Server-backed preview",
  description:
    "Load the bundled dataset from the Next.js API route to validate the shared grid and image handling.",
};

export function useDummyData() {
  const gridData = useGridData();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<ImportStatusState>(INITIAL_STATUS);

  const loadDummyData = async () => {
    try {
      setIsLoading(true);
      setStatus({
        tone: "default",
        title: "Loading dummy data",
        description: "Fetching the sample dataset from /api/dummy-data.",
      });

      const response = await fetchDummyData();
      const dataset = buildGridDatasetFromRecords(response.rows, "dummy-data");

      gridData.replaceDataset(dataset);
      setStatus({
        tone: "success",
        title: "Dummy data loaded",
        description: `${response.totalRows.toLocaleString()} rows are ready in the shared grid.`,
      });
    } catch (error) {
      setStatus({
        tone: "error",
        title: "Dummy data failed to load",
        description:
          error instanceof Error ? error.message : "The sample dataset request failed.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...gridData,
    isLoading,
    status,
    loadDummyData,
  };
}
