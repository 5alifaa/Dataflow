import { ROW_BLOCK_LIMIT, ROW_WARNING_LIMIT } from "@/lib/constants";
import type { RowLimitEvaluation } from "@/lib/types";

export function validateRowLimits(
  existingRows: number,
  incomingRows: number,
): RowLimitEvaluation {
  const totalRows = existingRows + incomingRows;

  if (totalRows > ROW_BLOCK_LIMIT) {
    return {
      totalRows,
      warning: false,
      blocked: true,
      message: `Import blocked: adding ${incomingRows.toLocaleString()} rows would exceed the ${ROW_BLOCK_LIMIT.toLocaleString()} row limit.`,
    };
  }

  if (totalRows >= ROW_WARNING_LIMIT) {
    return {
      totalRows,
      warning: true,
      blocked: false,
      message: `Large dataset warning: this import will bring the grid to ${totalRows.toLocaleString()} rows.`,
    };
  }

  return {
    totalRows,
    warning: false,
    blocked: false,
    message: null,
  };
}
