import { readFile } from "node:fs/promises";
import path from "node:path";
import * as XLSX from "xlsx";

import type { DummyDataResponse } from "@/lib/types";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "data", "dummy-data.xlsx");

  try {
    const file = await readFile(filePath);
    const workbook = XLSX.read(file, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
      throw new Error("The dummy data workbook does not contain any sheets.");
    }

    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
      defval: null,
      raw: false,
    });

    const response: DummyDataResponse = {
      ok: true,
      rows,
      totalRows: rows.length,
    };

    return Response.json(response);
  } catch (error) {
    const response: DummyDataResponse = {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to load dummy data from the workbook.",
    };

    return Response.json(response, { status: 500 });
  }
}
