import { readFile } from "node:fs/promises";
import path from "node:path";

import type { DummyDataResponse } from "@/lib/types";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "data", "dummy-data.json");

  try {
    const file = await readFile(filePath, "utf-8");
    const rows = JSON.parse(file) as Record<string, unknown>[];

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
          : "Failed to load dummy data from JSON.",
    };

    return Response.json(response, { status: 500 });
  }
}
