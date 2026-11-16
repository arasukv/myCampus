# Implementation Tasks: CampusSync

## Schedule Display

- [ ] Set up local browser storage persistence layer to store and retrieve activity records (`Title`, `Category`, `Date`, `Start time`, `End time`, `Status`, `Notes`) across page reloads (REQ-01, REQ-02, REQ-03, REQ-04, REQ-05)
- [ ] Build date selector control to let users view activities for a chosen calendar `Date` (REQ-01)
- [ ] Render the daily schedule list sorted chronologically by `Start time` for the selected `Date` (REQ-01)
- [ ] Display all required activity details (`Title`, `Category`, `Start time`, `End time`, `Status`, and `Notes`) on each schedule item (REQ-01)
- [ ] Implement empty-state messaging when no activities exist for the selected `Date` or active filter (REQ-01, REQ-06)

## Activity Management

- [ ] Create an add-activity form/modal supporting `Title`, `Category` (`Class`, `Lab`, `Assignment`, `Quiz`, `Exam`, `Study`, `Extra-curricular`), `Date`, `Start time`, `End time`, and optional `Notes` (REQ-02)
- [ ] Persist newly created activities with an initial incomplete `Status` and immediately update the schedule view (REQ-02)
- [ ] Implement edit functionality allowing users to modify `Title`, `Category`, `Date`, `Start time`, `End time`, `Status`, and `Notes` of an existing activity and persist changes (REQ-03)
- [ ] Add a delete trigger on each activity that opens an explicit confirmation prompt before removal (REQ-04)
- [ ] Permanently remove confirmed activities from local storage and the schedule view, while leaving canceled deletions intact (REQ-04)
- [ ] Add a completion toggle control to switch an activity's `Status` between incomplete and complete (REQ-05)
- [ ] Apply distinct visual styling to completed activities and persist `Status` updates in local storage (REQ-05)

## Filtering

- [ ] Build a category filter control supporting all allowed categories (`Class`, `Lab`, `Assignment`, `Quiz`, `Exam`, `Study`, `Extra-curricular`) plus an option to view all categories (REQ-06)
- [ ] Filter the displayed schedule items dynamically based on the selected category filter(s) without mutating stored data (REQ-06)

## Validation

- [ ] Implement validation on add and edit submissions to reject empty or whitespace-only `Title` values and show an inline error message while preserving form inputs (REQ-08)
- [ ] Implement validation on add and edit submissions to reject cases where `End time` is earlier than or equal to `Start time` and show an inline error message while preserving form inputs (REQ-07)

## Testing

- [ ] Verify chronological sorting, field visibility, and local storage persistence across browser refreshes (REQ-01, REQ-02)
- [ ] Test adding, editing, and toggling completion `Status` across all seven allowed categories (REQ-02, REQ-03, REQ-05)
- [ ] Test the deletion confirmation flow for both confirmed removal and prompt cancellation (REQ-04)
- [ ] Test category filtering across single and all-category states (REQ-06)
- [ ] Test validation edge cases including blank/whitespace `Title` inputs and `End time` equal to or earlier than `Start time` on both create and edit forms (REQ-07, REQ-08)