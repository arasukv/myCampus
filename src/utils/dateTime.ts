import { Activity, ActivityFormErrors, ActivityFormValues } from '../types/activity';

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function shiftDateString(dateString: string, deltaDays: number): string {
  const parts = dateString.split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return getTodayDateString();
  }
  const [year, month, day] = parts;
  const date = new Date(year, month - 1, day + deltaDays);
  const nextYear = date.getFullYear();
  const nextMonth = String(date.getMonth() + 1).padStart(2, '0');
  const nextDay = String(date.getDate()).padStart(2, '0');
  return `${nextYear}-${nextMonth}-${nextDay}`;
}

export function formatDisplayDate(dateString: string): string {
  const parts = dateString.split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return dateString;
  }
  const [year, month, day] = parts;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function compareActivitiesChronologically(a: Activity, b: Activity): number {
  const startDiff = a.startTime.localeCompare(b.startTime);
  if (startDiff !== 0) {
    return startDiff;
  }
  const endDiff = a.endTime.localeCompare(b.endTime);
  if (endDiff !== 0) {
    return endDiff;
  }
  return a.title.localeCompare(b.title);
}

export function validateActivityForm(values: ActivityFormValues): ActivityFormErrors {
  const errors: ActivityFormErrors = {};

  if (values.title.trim().length === 0) {
    errors.title = 'Title is required and cannot be empty or whitespace only.';
  }

  if (!values.date) {
    errors.date = 'Date is required.';
  }

  if (!values.startTime || !values.endTime) {
    errors.time = 'Both start time and end time are required.';
  } else if (values.endTime <= values.startTime) {
    errors.time = 'End time must be later than start time.';
  }

  return errors;
}
