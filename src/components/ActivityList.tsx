import { Calendar, Plus } from 'lucide-react';
import { Activity, ActivityCategory } from '../types/activity';
import { ActivityRow } from './ActivityRow';

interface ActivityListProps {
  activities: Activity[];
  totalForDateCount: number;
  selectedDate: string;
  selectedCategories: ActivityCategory[];
  onToggleComplete: (id: string) => void;
  onEdit: (activity: Activity) => void;
  onDelete: (activity: Activity) => void;
  onAddClick: () => void;
  onClearFilters: () => void;
}

export function ActivityList({
  activities,
  totalForDateCount,
  selectedDate,
  selectedCategories,
  onToggleComplete,
  onEdit,
  onDelete,
  onAddClick,
  onClearFilters,
}: ActivityListProps) {
  if (activities.length === 0) {
    const hasActiveFilter = selectedCategories.length > 0;

    return (
      <div className="rounded-xl border border-slate-200 bg-white px-6 py-14 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500">
          <Calendar className="h-5 w-5" aria-hidden="true" />
        </div>

        {hasActiveFilter && totalForDateCount > 0 ? (
          <>
            <h2 className="mt-4 text-base font-semibold text-slate-900">
              No matching activities for {selectedDate}
            </h2>
            <p className="mx-auto mt-1.5 max-w-md text-sm text-slate-600">
              None of the {totalForDateCount} scheduled{' '}
              {totalForDateCount === 1 ? 'activity' : 'activities'} on this date match the selected{' '}
              {selectedCategories.length === 1 ? 'category' : 'categories'} (
              {selectedCategories.join(', ')}).
            </p>
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={onClearFilters}
                className="inline-flex min-h-10 items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 cursor-pointer"
              >
                Show All Categories
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="mt-4 text-base font-semibold text-slate-900">
              No activities scheduled for {selectedDate}
            </h2>
            <p className="mx-auto mt-1.5 max-w-md text-sm text-slate-600">
              {hasActiveFilter
                ? `There are no activities in ${selectedCategories.join(', ')} on this date. Add a new activity or view all categories.`
                : 'Your schedule for this date is clear. Add a class, lab, assignment, or study session to get started.'}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onAddClick}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 cursor-pointer"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                <span>Add Activity</span>
              </button>
              {hasActiveFilter && (
                <button
                  type="button"
                  onClick={onClearFilters}
                  className="inline-flex min-h-10 items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 cursor-pointer"
                >
                  Show All Categories
                </button>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/60 px-4 py-3 sm:px-6">
        <span className="text-xs font-medium text-slate-600">
          Daily Schedule
        </span>
        <span className="font-mono text-xs tabular-nums text-slate-500">
          {activities.length} {activities.length === 1 ? 'activity' : 'activities'}
        </span>
      </div>

      <ul className="divide-y divide-slate-200">
        {activities.map((activity) => (
          <ActivityRow
            key={activity.id}
            activity={activity}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}
