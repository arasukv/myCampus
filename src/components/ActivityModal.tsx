import { AlertCircle, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import {
  ALLOWED_CATEGORIES,
  Activity,
  ActivityCategory,
  ActivityFormErrors,
  ActivityFormValues,
  ActivityStatus,
} from '../types/activity';
import { validateActivityForm } from '../utils/dateTime';

interface ActivityModalProps {
  mode: 'add' | 'edit';
  defaultDate: string;
  initialActivity?: Activity | null;
  onClose: () => void;
  onSave: (values: ActivityFormValues) => void;
}

export function ActivityModal({
  mode,
  defaultDate,
  initialActivity,
  onClose,
  onSave,
}: ActivityModalProps) {
  const [values, setValues] = useState<ActivityFormValues>(() => {
    if (mode === 'edit' && initialActivity) {
      return {
        title: initialActivity.title,
        category: initialActivity.category,
        date: initialActivity.date,
        startTime: initialActivity.startTime,
        endTime: initialActivity.endTime,
        status: initialActivity.status,
        notes: initialActivity.notes,
      };
    }

    return {
      title: '',
      category: 'Class',
      date: defaultDate,
      startTime: '09:00',
      endTime: '10:00',
      status: 'Pending',
      notes: '',
    };
  });

  const [errors, setErrors] = useState<ActivityFormErrors>({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateActivityForm(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave({
      ...values,
      title: values.title.trim(),
      notes: values.notes.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="activity-modal-title"
        className="w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-lg"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 id="activity-modal-title" className="text-lg font-bold text-slate-900">
            {mode === 'add' ? 'Add Activity' : 'Edit Activity'}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4 px-6 py-5">
          <div>
            <label htmlFor="activity-title" className="block text-sm font-medium text-slate-700">
              Title <span className="text-red-600">*</span>
            </label>
            <input
              id="activity-title"
              name="title"
              type="text"
              value={values.title}
              onChange={(e) => {
                setValues((prev) => ({ ...prev, title: e.target.value }));
                if (errors.title) {
                  setErrors((prev) => ({ ...prev, title: undefined }));
                }
              }}
              placeholder="e.g., Calculus Review"
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'activity-title-error' : undefined}
              className={`mt-1.5 block w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                errors.title
                  ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-700 focus:ring-blue-100'
              }`}
            />
            {errors.title && (
              <p
                id="activity-title-error"
                role="alert"
                className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600"
              >
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="activity-category"
                className="block text-sm font-medium text-slate-700"
              >
                Category
              </label>
              <select
                id="activity-category"
                name="category"
                value={values.category}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    category: e.target.value as ActivityCategory,
                  }))
                }
                className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {ALLOWED_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="activity-date" className="block text-sm font-medium text-slate-700">
                Date
              </label>
              <input
                id="activity-date"
                name="date"
                type="date"
                value={values.date}
                onChange={(e) => {
                  setValues((prev) => ({ ...prev, date: e.target.value }));
                  if (errors.date) {
                    setErrors((prev) => ({ ...prev, date: undefined }));
                  }
                }}
                aria-invalid={Boolean(errors.date)}
                aria-describedby={errors.date ? 'activity-date-error' : undefined}
                className={`mt-1.5 block w-full rounded-lg border px-3.5 py-2.5 font-mono text-sm tabular-nums text-slate-900 focus:outline-none focus:ring-2 ${
                  errors.date
                    ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
                    : 'border-slate-300 focus:border-blue-700 focus:ring-blue-100'
                }`}
              />
              {errors.date && (
                <p
                  id="activity-date-error"
                  role="alert"
                  className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.date}</span>
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="activity-start-time"
                  className="block text-sm font-medium text-slate-700"
                >
                  Start time
                </label>
                <input
                  id="activity-start-time"
                  name="startTime"
                  type="time"
                  value={values.startTime}
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, startTime: e.target.value }));
                    if (errors.time) {
                      setErrors((prev) => ({ ...prev, time: undefined }));
                    }
                  }}
                  aria-invalid={Boolean(errors.time)}
                  aria-describedby={errors.time ? 'activity-time-error' : undefined}
                  className={`mt-1.5 block w-full rounded-lg border px-3.5 py-2.5 font-mono text-sm tabular-nums text-slate-900 focus:outline-none focus:ring-2 ${
                    errors.time
                      ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
                      : 'border-slate-300 focus:border-blue-700 focus:ring-blue-100'
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="activity-end-time"
                  className="block text-sm font-medium text-slate-700"
                >
                  End time
                </label>
                <input
                  id="activity-end-time"
                  name="endTime"
                  type="time"
                  value={values.endTime}
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, endTime: e.target.value }));
                    if (errors.time) {
                      setErrors((prev) => ({ ...prev, time: undefined }));
                    }
                  }}
                  aria-invalid={Boolean(errors.time)}
                  aria-describedby={errors.time ? 'activity-time-error' : undefined}
                  className={`mt-1.5 block w-full rounded-lg border px-3.5 py-2.5 font-mono text-sm tabular-nums text-slate-900 focus:outline-none focus:ring-2 ${
                    errors.time
                      ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
                      : 'border-slate-300 focus:border-blue-700 focus:ring-blue-100'
                  }`}
                />
              </div>
            </div>

            {errors.time && (
              <p
                id="activity-time-error"
                role="alert"
                className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600"
              >
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.time}</span>
              </p>
            )}
          </div>

          {mode === 'edit' && (
            <div>
              <label htmlFor="activity-status" className="block text-sm font-medium text-slate-700">
                Status
              </label>
              <select
                id="activity-status"
                name="status"
                value={values.status}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    status: e.target.value as ActivityStatus,
                  }))
                }
                className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          )}

          <div>
            <label htmlFor="activity-notes" className="block text-sm font-medium text-slate-700">
              Notes <span className="font-normal text-slate-500">(optional)</span>
            </label>
            <textarea
              id="activity-notes"
              name="notes"
              rows={3}
              value={values.notes}
              onChange={(e) => setValues((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Location, room number, or study reminders"
              className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-10 items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex min-h-10 items-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 cursor-pointer"
            >
              {mode === 'add' ? 'Save Activity' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
