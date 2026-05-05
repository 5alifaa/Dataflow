import { readFile } from "node:fs/promises";
import path from "node:path";
import * as XLSX from "xlsx";

import type { DummyDataResponse } from "@/lib/types";

type DummyDataSuccessResponse = Extract<DummyDataResponse, { ok: true }>;

const DUMMY_DATA_CACHE_HEADERS = {
  "Cache-Control": "public, max-age=3600",
};

let cachedDummyDataPromise: Promise<DummyDataSuccessResponse> | null = null;

function getDummyWorkbookPath() {
  return path.join(process.cwd(), "public", "data", "dummy-data.xlsx");
}

function getFirstSheet(workbook: XLSX.WorkBook) {
  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    throw new Error("The dummy data workbook does not contain any sheets.");
  }

  return workbook.Sheets[sheetName];
}

function readRowsFromWorkbook(file: Buffer) {
  const workbook = XLSX.read(file, { type: "buffer" });
  const sheet = getFirstSheet(workbook);

  return XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: null,
    raw: false,
  });
}

function createSuccessResponse(
  rows: Record<string, unknown>[],
): DummyDataSuccessResponse {
  return {
    ok: true,
    rows,
    totalRows: rows.length,
  };
}

function createErrorResponse(error: unknown): DummyDataResponse {
  return {
    ok: false,
    error:
      error instanceof Error
        ? error.message
        : "Failed to load dummy data from the workbook.",
  };
}

async function loadDummyData() {
  const file = await readFile(getDummyWorkbookPath());
  const rows = readRowsFromWorkbook(file);

  return createSuccessResponse(rows);
}

function getCachedDummyData() {
  cachedDummyDataPromise ??= loadDummyData().catch((error) => {
    cachedDummyDataPromise = null;
    throw error;
  });

  return cachedDummyDataPromise;
}

export async function GET() {
  try {
    const response = await getCachedDummyData();

    return Response.json(response, {
      headers: DUMMY_DATA_CACHE_HEADERS,
    });
  } catch (error) {
    return Response.json(createErrorResponse(error), { status: 500 });
  }
}
