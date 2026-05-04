export const APP_NAME = "DataFlow";
export const APP_DESCRIPTION =
  "Production-quality Excel import and large dataset browsing proof of concept.";

export const ROW_WARNING_LIMIT = 150_000;
export const ROW_BLOCK_LIMIT = 200_000;

export const ACCEPTED_EXCEL_EXTENSIONS = [".xlsx", ".xls"] as const;
export const ACCEPTED_EXCEL_TYPES = [
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
] as const;

export const GRID_ROW_HEIGHT = 52;
export const GRID_HEADER_HEIGHT = 46;
export const IMAGE_THUMBNAIL_SIZE = 40;

export const SAMPLE_IMAGE_PLACEHOLDER = "Image unavailable";
