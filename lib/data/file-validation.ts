import {
  ACCEPTED_EXCEL_EXTENSIONS,
  ACCEPTED_EXCEL_TYPES,
} from "@/lib/constants";

export function validateExcelFile(file: File) {
  const name = file.name.toLowerCase();
  const extensionValid = ACCEPTED_EXCEL_EXTENSIONS.some((extension) =>
    name.endsWith(extension),
  );
  const typeValid =
    file.type.length === 0 ||
    ACCEPTED_EXCEL_TYPES.includes(file.type as (typeof ACCEPTED_EXCEL_TYPES)[number]);

  if (!extensionValid || !typeValid) {
    return {
      valid: false as const,
      message: "Please select a valid Excel file in .xlsx or .xls format.",
    };
  }

  return {
    valid: true as const,
    message: null,
  };
}
