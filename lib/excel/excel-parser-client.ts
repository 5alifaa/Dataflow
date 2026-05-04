"use client";

import type {
  ExcelParseSuccess,
  ExcelWorkerParseRequest,
  ExcelWorkerResponse,
} from "@/lib/types";

export async function parseExcelFileInWorker(file: File) {
  const worker = new Worker(new URL("./excel-worker.ts", import.meta.url), {
    type: "module",
  });

  const buffer = await file.arrayBuffer();

  return new Promise<ExcelParseSuccess>((resolve, reject) => {
    worker.onmessage = (event: MessageEvent<ExcelWorkerResponse>) => {
      const message = event.data;

      if (message.type === "parse-success") {
        resolve(message.payload);
      } else {
        reject(new Error(message.payload.error));
      }

      worker.terminate();
    };

    worker.onerror = () => {
      reject(new Error("Excel parsing failed in the worker."));
      worker.terminate();
    };

    const request: ExcelWorkerParseRequest = {
      type: "parse",
      fileName: file.name,
      buffer,
    };

    worker.postMessage(request, [buffer]);
  });
}
