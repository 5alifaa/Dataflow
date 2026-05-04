export type PrimitiveCell = string | number | boolean | null;

export interface DataRow {
  __rowId: string;
  [key: string]: PrimitiveCell;
}

export interface GridColumn {
  key: string;
  headerName: string;
  sourceKey?: string;
  isImage?: boolean;
}

export interface GridDataset {
  columns: GridColumn[];
  rows: DataRow[];
}

export interface ExcelColumnOption {
  sourceKey: string;
  originalHeader: string;
  displayName: string;
  selected: boolean;
}

export interface ExcelParseSuccess {
  fileName: string;
  columns: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
}

export interface ExcelParseFailure {
  fileName: string;
  error: string;
}

export type ExcelParseResult = ExcelParseSuccess | ExcelParseFailure;

export interface ExcelWorkerParseRequest {
  type: "parse";
  fileName: string;
  buffer: ArrayBuffer;
}

export interface ExcelWorkerParseSuccessMessage {
  type: "parse-success";
  payload: ExcelParseSuccess;
}

export interface ExcelWorkerParseErrorMessage {
  type: "parse-error";
  payload: ExcelParseFailure;
}

export type ExcelWorkerResponse =
  | ExcelWorkerParseSuccessMessage
  | ExcelWorkerParseErrorMessage;

export interface RowLimitEvaluation {
  totalRows: number;
  warning: boolean;
  blocked: boolean;
  message: string | null;
}

export type ImportAlertTone = "default" | "success" | "warning" | "error";

export interface ImportStatusState {
  tone: ImportAlertTone;
  title: string;
  description: string;
}

export interface DummyDataResponseSuccess {
  ok: true;
  rows: Record<string, unknown>[];
  totalRows: number;
}

export interface DummyDataResponseError {
  ok: false;
  error: string;
}

export type DummyDataResponse = DummyDataResponseSuccess | DummyDataResponseError;

export interface ImportBatchResult {
  dataset: GridDataset;
  appendedRows: DataRow[];
  columnsChanged: boolean;
  totalRows: number;
}
