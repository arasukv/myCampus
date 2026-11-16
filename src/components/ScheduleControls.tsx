import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ALLOWED_CATEGORIES, ActivityCategory } from '../types/activity';
import { formatDisplayDate, getTodayDateString, shiftDateString } from '../utils/dateTime';

interface ScheduleControlsProps {
  selectedDate: string;
  onDateChange: (nextDate: string) => void;
  selectedCategories: ActivityCategory[];
  onToggleCategory: (category: ActivityCategory) => void;
  onClearCategories: () => void;
}

export function ScheduleControls({
  selectedDate,
  onDateChange,
  selectedCategories,
  onToggleCategory,
  onClearCategories,
}: ScheduleControlsProps) {
  const today = getTodayDateString();
  const isAllSelected = selectedCategories.length === 0;

  return (
    <section aria-label="Schedule filters and date selection" className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl text-balance">
            {formatDisplayDate(selectedDate)}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white">
            <button
              type="button"
              onClick={() => onDateChange(shiftDateString(selectedDate, -1))}
              aria-label="Previous day"
              className="inline-flex h-10 w-10 items-center justify-center rounded-l-lg text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-700 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>

            <label htmlFor="schedule-date-picker" className="sr-only">
              Select schedule date
            </label>
            <input
              id="schedule-date-picker"
              type="date"
              value={selectedDate}
              onChange={(e) => {
                if (e.target.value) {
                  onDateChange(e.target.value);
                }
              }}
              className="h-10 border-x border-slate-200 bg-white px-3 font-mono text-sm tabular-nums text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-700"
            />

            <button
              type="button"
              onClick={() => onDateChange(shiftDateString(selectedDate, 1))}
              aria-label="Next day"
              className="inline-flex h-10 w-10 items-center justify-center rounded-r-lg text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-700 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => onDateChange(today)}
            disabled={selectedDate === today}
            className="inline-flex h-10 items-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 disabled:cursor-default disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Today
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
        <button
          type="button"
          onClick={onClearCategories}
          aria-pressed={isAllSelected}
          className={`inline-flex min-h-10 items-center rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
            isAllSelected
              ? 'border-blue-700 bg-blue-700 text-white'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          All Categories
        </button>

        {ALLOWED_CATEGORIES.map((category) => {
          const isActive = selectedCategories.includes(category);
          return (
            <button
              key={category}
              type="button"
              onClick={() => onToggleCategory(category)}
              aria-pressed={isActive}
              className={`inline-flex min-h-10 items-center rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                isActive
                  ? 'border-blue-700 bg-blue-50 text-blue-800'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
}
