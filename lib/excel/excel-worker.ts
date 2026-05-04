import * as XLSX from "xlsx";
import type {
  ExcelParseFailure,
  ExcelParseSuccess,
  ExcelWorkerParseRequest,
  ExcelWorkerResponse,
} from "@/lib/types";

function postMessageToMainThread(message: ExcelWorkerResponse) {
  self.postMessage(message);
}

function parseWorkbook(request: ExcelWorkerParseRequest): ExcelParseSuccess {
  const workbook = XLSX.read(request.buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    throw new Error("The workbook does not contain any sheets.");
  }

  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: null,
    raw: false,
  });

  const columns = Array.from(
    new Set(rows.flatMap((row) => Object.keys(row)).filter(Boolean)),
  );

  return {
    fileName: request.fileName,
    columns,
    rows,
    rowCount: rows.length,
  };
}

self.onmessage = (event: MessageEvent<ExcelWorkerParseRequest>) => {
  const request = event.data;

  if (request.type !== "parse") {
    return;
  }

  try {
    const payload = parseWorkbook(request);
    postMessageToMainThread({
      type: "parse-success",
      payload,
    });
  } catch (error) {
    const payload: ExcelParseFailure = {
      fileName: request.fileName,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected workbook parsing error.",
    };

    postMessageToMainThread({
      type: "parse-error",
      payload,
    });
  }
};
