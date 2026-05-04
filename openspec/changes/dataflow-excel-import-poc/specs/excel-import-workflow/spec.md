## ADDED Requirements

### Requirement: Excel files can be imported through a guided workflow
The system SHALL provide an Excel import workflow on `/import` that accepts `.xlsx` and `.xls` files, validates file type before parsing, and keeps the interface responsive while workbook parsing runs off the main thread.

#### Scenario: Valid Excel file starts parsing
- **WHEN** a user selects a `.xlsx` or `.xls` file and starts import
- **THEN** the system starts parsing the file in a Web Worker and shows a loading state without freezing the page

#### Scenario: Invalid file type is rejected
- **WHEN** a user selects a file that is not `.xlsx` or `.xls`
- **THEN** the system SHALL reject the file and show a clear validation error in the import UI

### Requirement: Parsed columns must be reviewed before data is appended
The system SHALL present the extracted columns in a confirmation dialog after parsing, allow the user to choose which columns to import, allow renaming selected columns, and append only the confirmed selection to the dataset.

#### Scenario: User confirms selected and renamed columns
- **WHEN** parsing completes successfully and the user confirms a subset of columns with edited display names
- **THEN** the system appends only the selected columns to the dataset and uses the renamed headers in the displayed table

#### Scenario: User cancels column confirmation
- **WHEN** parsing completes successfully and the user cancels the confirmation dialog
- **THEN** the system discards the pending parsed result and leaves the existing dataset unchanged

### Requirement: Multiple imports must merge columns and preserve previous rows
The system SHALL support importing multiple Excel files into the same dataset by merging columns through a union strategy, preserving existing rows, appending new rows, and filling missing values with `null`.

#### Scenario: Second import introduces new columns
- **WHEN** a user imports a second file whose selected columns differ from the current dataset
- **THEN** the system expands the dataset to the union of all imported columns, retains previously imported rows, appends the new rows, and sets missing field values to `null`

#### Scenario: Appending rows uses asynchronous grid transactions
- **WHEN** newly confirmed rows are added to an existing grid dataset
- **THEN** the system uses AG Grid asynchronous row appends where supported so new rows are added without rebuilding the entire table

### Requirement: Row limits must warn and block at defined thresholds
The system SHALL evaluate the projected total row count for each import, show a soft warning at 150,000 rows, and block imports that would exceed 200,000 rows.

#### Scenario: Import reaches warning threshold
- **WHEN** an import would bring the dataset total to at least 150,000 rows and at most 200,000 rows
- **THEN** the system shows a clear warning message and allows the user to continue the import

#### Scenario: Import exceeds block threshold
- **WHEN** an import would bring the dataset total above 200,000 rows
- **THEN** the system blocks the import and shows a clear error message without mutating the existing dataset

### Requirement: Import status and failures must be recoverable
The system SHALL show empty, loading, success, and error states for the import workflow and SHALL prevent parsing failures from crashing the page.

#### Scenario: Parsing fails
- **WHEN** the worker reports a parsing error or invalid workbook structure
- **THEN** the system shows an error state for the import workflow and allows the user to try another file without reloading the page

#### Scenario: Import completes successfully
- **WHEN** parsed rows are confirmed and appended
- **THEN** the system shows a success state including the resulting row count and column count
