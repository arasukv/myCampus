import { Activity, ALLOWED_CATEGORIES, ActivityCategory, ActivityStatus } from '../types/activity';

const STORAGE_KEY = 'campussync_activities_v1';

function isValidCategory(value: unknown): value is ActivityCategory {
  return typeof value === 'string' && (ALLOWED_CATEGORIES as readonly string[]).includes(value);
}

function isValidStatus(value: unknown): value is ActivityStatus {
  return value === 'Pending' || value === 'Completed';
}

function isValidActivityRecord(item: unknown): item is Activity {
  if (!item || typeof item !== 'object') {
    return false;
  }
  const record = item as Record<string, unknown>;
  return (
    typeof record.id === 'string' &&
    typeof record.title === 'string' &&
    isValidCategory(record.category) &&
    typeof record.date === 'string' &&
    typeof record.startTime === 'string' &&
    typeof record.endTime === 'string' &&
    isValidStatus(record.status) &&
    typeof record.notes === 'string'
  );
}

export function loadActivities(): Activity[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isValidActivityRecord);
  } catch {
    return [];
  }
}

export function saveActivities(activities: Activity[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  } catch {
    // Ignore storage quota or private-mode write failures safely.
  }
}

export function generateActivityId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `act_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
