import type { GridOptions } from "@ag-grid-community/core";

import { GRID_HEADER_HEIGHT, GRID_ROW_HEIGHT } from "@/lib/constants";
import type { DataRow } from "@/lib/types";

export const baseGridOptions: GridOptions<DataRow> = {
  defaultColDef: {
    editable: false,
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 160,
  },
  animateRows: false,
  ensureDomOrder: false,
  suppressPaginationPanel: true,
  rowHeight: GRID_ROW_HEIGHT,
  headerHeight: GRID_HEADER_HEIGHT,
  suppressCellFocus: false,
  getRowId: (params) => params.data.__rowId,
};
