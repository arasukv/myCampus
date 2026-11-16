# Functional Specification: CampusSync

## Data Definitions

### Activity Fields

* **Title:** Short name or summary of the scheduled item (required, non-empty text).

* **Category:** Classification of the activity. Allowed values: `Class`, `Lab`, `Assignment`, `Quiz`, `Exam`, `Study`, `Extra-curricular`.

* **Date:** Calendar date on which the activity occurs.

* **Start time:** Scheduled start time of the activity.

* **End time:** Scheduled end time of the activity (must be strictly later than Start time).

* **Status:** Completion state of the activity (e.g., Pending, Completed).

* **Notes:** Optional descriptive details, locations, or instructions associated with the activity.

## Ambiguity Review & Group Decisions

* **Invalid Time Ranges (REQ-07):** An activity cannot end before or at the exact same time it starts on the same date. The system must block submission and display a clear validation message if End time is earlier than or equal to Start time.

* **Missing Title (REQ-08):** Activities without a meaningful title create ambiguity on the schedule. Titles consisting of empty or whitespace-only text must be rejected with a validation prompt before saving.

* **Accidental Deletion (REQ-04):** Single-click permanent deletion risks accidental loss of schedule items. Deleting an activity must require explicit user confirmation before permanent removal.

## Functional Requirements

### REQ-01: View schedule

The system SHALL display all persisted activities for a selected date in chronological order, showing each activity's Title, Category, Date, Start time, End time, Status, and Notes.

**Scenario:** Viewing the daily schedule

* **GIVEN** the user has previously added activities for a specific Date

* **WHEN** the user opens CampusSync or selects that Date

* **THEN** the system displays all activities for that Date sorted by Start time, clearly presenting their Title, Category, Start time, End time, Status, and Notes.

### REQ-02: Add activity

The system SHALL allow the user to create and persist a new activity with a Title, Category (`Class`, `Lab`, `Assignment`, `Quiz`, `Exam`, `Study`, or `Extra-curricular`), Date, Start time, End time, initial Status, and optional Notes.

**Scenario:** Adding a new study session

* **GIVEN** the user is viewing their schedule

* **WHEN** the user submits a new activity with Title "Calculus Review", Category `Study`, Date "2026-11-17", Start time "14:00", End time "15:30", and Notes "Library 2nd floor"

* **THEN** the system saves the activity with an incomplete Status and immediately displays it in the schedule for "2026-11-17".

### REQ-03: Edit activity

The system SHALL allow the user to modify the Title, Category, Date, Start time, End time, Status, or Notes of any existing activity and persist the updated details.

**Scenario:** Rescheduling an existing lab session

* **GIVEN** an existing activity with Title "Physics Lab", Category `Lab`, and Start time "10:00" is displayed on the schedule

* **WHEN** the user edits the activity to change the Start time to "11:00", End time to "13:00", and updates the Notes to "Room 304"

* **THEN** the system updates the persisted activity and displays the revised times and Notes on the schedule.

### REQ-04: Delete activity

The system SHALL require explicit user confirmation before permanently removing any existing activity from the schedule.

**Scenario:** Confirming deletion of a canceled class

* **GIVEN** an existing activity with Title "Intro to Sociology" and Category `Class` is present on the schedule

* **WHEN** the user triggers the delete action for that activity and confirms the deletion prompt

* **THEN** the system permanently removes the activity so it no longer appears on the schedule or persists upon reloading the application, whereas canceling the prompt leaves the activity intact.

### REQ-05: Mark complete

The system SHALL allow the user to toggle the Status of any activity between incomplete and complete, visually distinguishing completed activities while persisting the updated Status.

**Scenario:** Completing an assignment

* **GIVEN** an existing activity with Title "History Essay", Category `Assignment`, and an incomplete Status is visible on the schedule

* **WHEN** the user marks the activity as complete

* **THEN** the system updates the activity's Status to complete, applies a visual completion indicator, and retains this Status across browser sessions.

### REQ-06: Filter by category

The system SHALL allow the user to filter the displayed schedule by selecting one or more Categories (`Class`, `Lab`, `Assignment`, `Quiz`, `Exam`, `Study`, `Extra-curricular`) or viewing all Categories.

**Scenario:** Filtering schedule to show only exams

* **GIVEN** the schedule contains activities across multiple Categories including `Class`, `Study`, `Quiz`, and `Exam`

* **WHEN** the user selects the `Exam` category filter

* **THEN** the system displays only activities assigned to the `Exam` category and hides activities belonging to all other categories until the filter is cleared or changed.

### REQ-07: Validate time range

The system SHALL prevent saving or updating an activity when the End time is earlier than or equal to the Start time, displaying an inline validation error message.

**Scenario:** Submitting an activity with an End time earlier than Start time

* **GIVEN** the user is adding or editing an activity on Date "2026-11-17"

* **WHEN** the user enters Start time "15:00" and End time "14:00" and attempts to save

* **THEN** the system rejects the submission, preserves the user's entered form values, and displays an error message indicating that End time must be after Start time.

### REQ-08: Validate required title

The system SHALL prevent saving or updating an activity when the Title is empty or contains only whitespace characters, displaying an inline validation error message.

**Scenario:** Submitting an activity with a blank Title

* **GIVEN** the user is adding or editing an activity with valid Category, Date, Start time, and End time

* **WHEN** the user leaves the Title field empty or enters only spaces and attempts to save

* **THEN** the system rejects the submission, preserves the user's entered form values, and displays an error message indicating that a Title is required.