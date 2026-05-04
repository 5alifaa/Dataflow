## Why

DataFlow needs a production-quality proof of concept that demonstrates Excel import and large dataset exploration without sacrificing UI responsiveness or maintainability. Building this now establishes a clean architectural foundation for validating high-volume import, worker-based parsing, and virtualized data presentation before the product grows in scope.

## What Changes

- Add a Next.js App Router proof of concept with a home page and two focused workflows: Excel import and server-backed dummy data browsing.
- Introduce a worker-based Excel parsing flow using `xlsx`, including file validation, parse feedback, column selection, column renaming, row-limit enforcement, and multi-file append behavior.
- Add a reusable AG Grid Community data grid that supports large row counts, wide datasets, image thumbnail rendering, and transaction-based row appends without pagination.
- Add a typed API route backed by a JSON file so the same grid experience can be validated against server-loaded dummy data.
- Add shared utilities, hooks, and types that keep parsing, normalization, merging, validation, image detection, and grid configuration separate from UI components.
- Add resilient error handling with a React error boundary and user-friendly shadcn/ui feedback states across both data-loading workflows.

## Capabilities

### New Capabilities
- `excel-import-workflow`: Upload Excel files, parse them in a Web Worker, let users choose and rename columns, and append normalized results into the shared data grid.
- `virtualized-data-grid`: Present large row and column sets in a reusable AG Grid-based table with virtualization, image thumbnails, stable row handling, and responsive surrounding UI.
- `dummy-data-browsing`: Load typed dummy data from a Next.js API route backed by a JSON file and display it through the shared grid workflow with consistent feedback states.

### Modified Capabilities

None.

## Impact

- Affected areas: `app/`, `components/`, `hooks/`, `lib/`, `public/data/`, and `openspec/changes/dataflow-excel-import-poc/specs/`.
- New dependencies and integrations: AG Grid Community, `xlsx`, Web Worker-based parsing, and shadcn/ui-driven UI composition.
- API surface: add `/api/dummy-data` and typed client-side data loading for the dummy data page.
- Architecture impact: introduces reusable domain utilities and grid abstractions intended to support future import sources and larger datasets.
