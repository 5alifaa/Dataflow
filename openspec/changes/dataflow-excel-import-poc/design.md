## Context

DataFlow is a Next.js App Router proof of concept for validating two high-volume dataset entry points: client-side Excel import and server-backed dummy data loading. The implementation must combine shadcn/ui for the full interaction layer, AG Grid Community for virtualization, and `xlsx` parsing inside a Web Worker so large spreadsheet imports do not block the main thread.

The requested scope crosses multiple modules: route handlers, worker orchestration, domain utilities, reusable table rendering, and page-level workflows. The design also needs to support multi-import column union, row-limit enforcement, image URL detection, and transaction-based row appends while keeping the codebase easy to extend.

Constraints:

- Use Next.js App Router and React with TypeScript.
- Treat shadcn/ui as the required source for controls, cards, alerts, dialogs, inputs, loading states, and layout composition.
- Use AG Grid Community without pagination and preserve row/column virtualization.
- Parse `.xlsx` and `.xls` files off the main thread with a Web Worker.
- Keep business logic out of UI components and isolate utilities by responsibility.

## Goals / Non-Goals

**Goals:**

- Provide a clean home page plus `/import` and `/dummy-data` workflows with shared layout patterns.
- Parse Excel files in a worker, return typed parsing results, and keep the UI responsive throughout import.
- Let users review extracted columns, choose which columns to keep, and rename selected headers before rows are appended.
- Support multiple imports by merging column sets through a reusable union utility and filling absent values with `null`.
- Reuse a single grid component and grid configuration pipeline across imported and server-loaded datasets.
- Surface row-limit warnings at 150,000 rows and block imports above 200,000 rows with clear alerts.
- Render image URL fields as low-cost lazy thumbnails inside the grid.
- Handle parsing, rendering, and fetch failures with bounded, recoverable UI states.

**Non-Goals:**

- Persist imported datasets across page reloads or user sessions.
- Implement pagination, server-side sorting, filtering, or editing workflows.
- Support non-Excel upload formats such as CSV.
- Add backend storage, authentication, or multi-user collaboration features.
- Optimize for production-scale observability, telemetry, or SSR data prefetching beyond the needs of the POC.

## Decisions

### 1. Use capability-oriented folders with thin pages and reusable hooks

Pages in `app/` will focus on route assembly while reusable UI lives under `components/` and domain logic lives under `lib/` and `hooks/`. This keeps route files small and lets import logic, dummy-data loading, and grid state evolve independently.

Alternatives considered:

- Build each page as a self-contained large component. Rejected because the requested behaviors span parsing, normalization, merging, and grid orchestration that would become difficult to test and maintain.
- Centralize everything in a single `services/` layer. Rejected because UI-specific state transitions still benefit from dedicated hooks near the route workflows.

### 2. Parse Excel data in a dedicated worker and expose it through a client wrapper

`xlsx` parsing will run in `lib/excel/excel-worker.ts`, with a small `excel-parser-client.ts` wrapper managing worker lifecycle and typed request/response messages. The UI hook can await parse results without knowing worker implementation details.

Alternatives considered:

- Parse directly in the page component. Rejected because large workbooks can freeze the UI and violate the prompt’s responsiveness requirement.
- Parse through a server upload endpoint. Rejected for the POC because it adds transport and storage complexity unrelated to validating client-side responsiveness.

### 3. Model import processing as a staged pipeline

The import flow will use separate utilities for validation, parsing, normalization, image URL detection, row-limit checks, and dataset merging. Column selection output becomes a normalized import contract consumed by the grid state hook. This keeps each step single-purpose and aligns with the requested maintainability goals.

Alternatives considered:

- Merge all processing inside the custom hook. Rejected because it would blur responsibilities and make future changes, like new file types or transform rules, harder to introduce.

### 4. Use AG Grid Community as a reusable rendering engine with stable configuration helpers

The `DataGrid` component will accept rows and column metadata while column definition creation and shared grid options remain in `lib/grid/`. This allows imported and dummy datasets to share the same rendering behavior, including image thumbnail cells, virtualization settings, and async transaction appends.

Alternatives considered:

- Build a custom virtualized table from scratch. Rejected because the prompt explicitly requires AG Grid Community and because AG Grid already provides the needed row/column virtualization.
- Define grid config inline per page. Rejected because it would duplicate logic and weaken consistency between workflows.

### 5. Treat column selection as an explicit confirmation step before grid mutation

After parsing, the app will open a dedicated shadcn dialog listing extracted columns with selection controls and rename inputs. Only confirmed selections will produce the merged dataset update. Canceling the dialog discards the pending parse result and leaves existing rows untouched.

Alternatives considered:

- Auto-import all columns immediately and let users hide columns later. Rejected because the prompt requires pre-import column selection and renaming.

### 6. Load dummy data through a typed API route backed by `public/data/dummy-data.json`

The `/api/dummy-data` route will serve JSON data with a typed success/error envelope. The client hook will fetch from the route rather than importing the JSON directly into the page, which preserves the architectural distinction between client loading and server-provided datasets.

Alternatives considered:

- Import the JSON directly in the page component. Rejected because the prompt explicitly requires a Next.js API route serving the dummy data.

### 7. Wrap grid-centric workflows in an error boundary with local recovery affordances

The import page and dummy-data page will use a reusable error boundary around the table and related workflow UI. Parsing errors remain typed application errors, while rendering exceptions fall through to a friendly shadcn-based fallback with retry/reset affordances.

Alternatives considered:

- Rely only on inline error alerts. Rejected because unexpected rendering failures in the grid or cell renderers should not take down the route.

## Risks / Trade-offs

- [Large workbook parsing may still consume significant memory] -> Mitigate by validating file type early, enforcing the hard row limit before appending, and keeping worker messages as lean as practical.
- [AG Grid plus custom image cells can introduce render cost on wide datasets] -> Mitigate by limiting image rendering to detected image columns, using fixed-size lazy thumbnails, and keeping cell renderers minimal.
- [Multi-import union can create sparse rows and many columns] -> Mitigate by centralizing merge behavior and ensuring missing values are consistently normalized to `null`.
- [Worker bundling in this Next.js version may have framework-specific constraints] -> Mitigate by following the local Next.js docs in `node_modules/next/dist/docs/` before implementation and encapsulating worker creation behind a client helper.
- [Dummy JSON shape drift could break client expectations] -> Mitigate by defining shared TypeScript response/data types and validating success/error handling in the route and hook.

## Migration Plan

1. Add shared types, constants, and utility modules that define the import and grid contracts.
2. Implement the worker/client parsing path and the row/column normalization pipeline.
3. Implement the reusable grid, thumbnail cell, and surrounding UI states.
4. Add the `/import` and `/dummy-data` pages with their hooks and API route.
5. Validate multi-import append behavior, row-limit handling, and error-boundary recovery.

Rollback is straightforward for this POC because the change adds new routes and components without modifying existing production workflows. If needed, the new pages and route can be removed independently.

## Open Questions

- Whether the dummy data JSON should intentionally include at least one image URL field so thumbnail rendering can be demonstrated on both workflows.
- Whether row-limit warnings should be based on the incoming file size alone or the projected total after merging with already imported rows. The safer interpretation is projected total rows.
- Which AG Grid theme package best matches the chosen shadcn/tailwind styling without adding avoidable visual inconsistency.
