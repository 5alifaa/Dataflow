## ADDED Requirements

### Requirement: A shared virtualized grid must render large datasets without pagination
The system SHALL provide a reusable data grid component based on AG Grid Community that displays all rows in one virtualized table, supports large row counts and many columns, and does not implement pagination.

#### Scenario: Large dataset is displayed in a single grid
- **WHEN** a page provides a large dataset to the shared grid component
- **THEN** the system renders the dataset in one AG Grid instance with row and column virtualization enabled and no pagination controls

#### Scenario: Grid supports two-dimensional navigation
- **WHEN** the displayed dataset exceeds the viewport in either direction
- **THEN** the system allows smooth vertical and horizontal scrolling across the full dataset

### Requirement: Grid configuration must be reusable and stable across workflows
The system SHALL keep grid options and column-definition generation outside page components so imported and server-loaded datasets share the same rendering behaviors and avoid unnecessary re-renders.

#### Scenario: Different pages render through the same grid abstraction
- **WHEN** the import page and dummy-data page load datasets with different schemas
- **THEN** the system builds their grid columns through shared configuration utilities and renders them through the same reusable grid component

#### Scenario: Existing rows remain stable during append operations
- **WHEN** new rows are appended to an already rendered dataset
- **THEN** the system preserves stable row identification where possible and avoids unnecessary full-grid reconstruction

### Requirement: Image URL columns must render efficient thumbnails
The system SHALL detect columns containing image URLs and render those values as 40x40 pixel lazy-loaded thumbnails with a fallback placeholder when an image cannot be loaded.

#### Scenario: Image URL column is detected
- **WHEN** a dataset includes a column whose values are recognized as image URLs
- **THEN** the system renders that column with an image thumbnail cell instead of a raw URL string

#### Scenario: Image fails to load
- **WHEN** an image URL cell cannot be loaded successfully
- **THEN** the system shows a placeholder state in the thumbnail cell without breaking grid scrolling or rendering

### Requirement: Grid workflows must degrade safely on rendering failures
The system SHALL isolate grid-area rendering failures behind a reusable error boundary and present a friendly fallback with recovery actions.

#### Scenario: Grid subtree throws an exception
- **WHEN** an unexpected rendering error occurs in the grid or a related cell renderer
- **THEN** the system shows a fallback card or alert for the affected workflow and allows the user to retry or continue without a full app crash
