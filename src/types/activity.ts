export const ALLOWED_CATEGORIES = [
  'Class',
  'Lab',
  'Assignment',
  'Quiz',
  'Exam',
  'Study',
  'Extra-curricular',
] as const;

export type ActivityCategory = (typeof ALLOWED_CATEGORIES)[number];

export type ActivityStatus = 'Pending' | 'Completed';

export interface Activity {
  id: string;
  title: string;
  category: ActivityCategory;
  date: string;
  startTime: string;
  endTime: string;
  status: ActivityStatus;
  notes: string;
}

export interface ActivityFormValues {
  title: string;
  category: ActivityCategory;
  date: string;
  startTime: string;
  endTime: string;
  status: ActivityStatus;
  notes: string;
}

export interface ActivityFormErrors {
  title?: string;
  date?: string;
  time?: string;
}
