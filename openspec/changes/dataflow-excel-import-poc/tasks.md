## 1. Project setup and shared contracts

- [x] 1.1 Review the local Next.js docs under `node_modules/next/dist/docs/` for App Router and worker-related constraints that affect this implementation.
- [x] 1.2 Add and verify required dependencies for shadcn/ui, AG Grid Community, and `xlsx`, plus any supporting Tailwind or utility packages already expected by the repo.
- [x] 1.3 Create the target folder structure under `app/`, `components/`, `hooks/`, `lib/`, and `public/data/` for the DataFlow POC.
- [x] 1.4 Define shared TypeScript types and centralized constants for rows, columns, import messages, API responses, and row-limit thresholds.

## 2. Excel import domain pipeline

- [x] 2.1 Implement the worker-backed Excel parser contract, including typed request/response messages and a client wrapper for invoking the worker.
- [x] 2.2 Implement file validation, parse-result normalization, and row-shape normalization utilities separate from UI components.
- [x] 2.3 Implement reusable utilities for selected-column mapping, column renaming, union-based dataset merging, and `null` backfilling for missing values.
- [x] 2.4 Implement reusable row-limit validation and image URL detection utilities that can be shared by import and grid workflows.

## 3. Shared grid and visual components

- [x] 3.1 Implement shared AG Grid column-definition and grid-options helpers with stable row ID support and async append behavior.
- [x] 3.2 Build the reusable `DataGrid` component, empty state, and image thumbnail cell renderer using shadcn/ui layout elements around the grid.
- [x] 3.3 Build reusable layout primitives including the app shell, page header, and route navigation cards for the home page and feature pages.
- [x] 3.4 Implement a reusable React error boundary with shadcn-based fallback UI and recovery actions for grid-centered workflows.

## 4. Excel import page workflow

- [x] 4.1 Build the `use-excel-import` and related grid-state hooks to coordinate file selection, parsing, dialog state, append flow, and status messaging.
- [x] 4.2 Implement the import panel UI with file picker, import action, filename display, loading state, empty state, success state, and error/warning alerts.
- [x] 4.3 Implement the column-selection dialog with selectable extracted columns, rename inputs, confirm/cancel actions, and accessible keyboard-friendly controls.
- [x] 4.4 Assemble `/import` with the reusable layout, import workflow components, shared grid, and error boundary integration.

## 5. Dummy data route and page workflow

- [x] 5.1 Create `public/data/dummy-data.json` with representative wide-row sample data, including at least one image URL column for thumbnail validation.
- [x] 5.2 Implement the `/api/dummy-data` route with typed success/error responses and graceful JSON-loading failure handling.
- [x] 5.3 Implement the dummy data client and `use-dummy-data` hook for on-demand fetch, loading, success, and error states.
- [x] 5.4 Assemble `/dummy-data` with a load button, shared grid usage, and responsive status UI consistent with the import workflow.

## 6. Final integration and verification

- [x] 6.1 Build the home page with shadcn/ui navigation cards linking to `/import` and `/dummy-data`.
- [ ] 6.2 Verify multiple-import append behavior, merged-column results, warning/block thresholds, and thumbnail rendering across both data sources.
- [ ] 6.3 Verify responsive behavior, smooth horizontal and vertical scrolling, and recovery from parse, fetch, and render failures.
- [ ] 6.4 Run the project checks required by the repo and resolve any type, lint, or integration issues introduced by the POC.
