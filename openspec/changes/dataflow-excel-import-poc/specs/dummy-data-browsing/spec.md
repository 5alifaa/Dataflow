## ADDED Requirements

### Requirement: Dummy data must be served from a typed API route backed by JSON
The system SHALL provide a `/api/dummy-data` route that loads dummy dataset records from a JSON file and returns a typed JSON response with graceful error handling.

#### Scenario: Dummy data request succeeds
- **WHEN** a client requests `/api/dummy-data` and the JSON source is available
- **THEN** the system returns a success response containing the dummy rows and any metadata needed by the client

#### Scenario: Dummy data request fails
- **WHEN** the JSON source cannot be read or the route encounters an unexpected error
- **THEN** the system returns a typed error response instead of an unhandled failure

### Requirement: Dummy data page must load server-backed data on demand
The system SHALL provide a `/dummy-data` page with a user-triggered load action, loading state, success state, and error state for fetching data from `/api/dummy-data`.

#### Scenario: User loads dummy data successfully
- **WHEN** a user activates the load action on `/dummy-data` and the API request succeeds
- **THEN** the system shows a loading state during the request, then displays the returned data in the shared grid along with a success message

#### Scenario: Dummy data load fails
- **WHEN** a user activates the load action on `/dummy-data` and the API request fails
- **THEN** the system shows an error message and leaves the page in a recoverable state so the user can try again

### Requirement: Dummy data must use the same grid behaviors as imported data
The system SHALL render server-loaded dummy data through the shared data grid, including image thumbnail handling, no pagination, and responsive surrounding UI states.

#### Scenario: Dummy data includes image URLs
- **WHEN** the server response includes one or more image URL columns
- **THEN** the system renders those values as thumbnails using the same image-cell behavior as imported datasets

#### Scenario: Dummy data grid exceeds viewport width
- **WHEN** the server-loaded dataset contains enough columns to overflow horizontally
- **THEN** the system supports smooth horizontal scrolling within the shared grid layout
