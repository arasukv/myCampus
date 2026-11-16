import { Check, CheckCircle2, Pencil, Trash2 } from 'lucide-react';
import { Activity } from '../types/activity';

interface ActivityRowProps {
  activity: Activity;
  onToggleComplete: (id: string) => void;
  onEdit: (activity: Activity) => void;
  onDelete: (activity: Activity) => void;
}

export function ActivityRow({
  activity,
  onToggleComplete,
  onEdit,
  onDelete,
}: ActivityRowProps) {
  const isCompleted = activity.status === 'Completed';

  return (
    <li
      className={`flex flex-col gap-4 px-4 py-4 transition-colors sm:flex-row sm:items-start sm:justify-between sm:px-6 ${
        isCompleted ? 'bg-slate-50/70' : 'bg-white hover:bg-slate-50/50'
      }`}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3.5">
        <button
          type="button"
          onClick={() => onToggleComplete(activity.id)}
          aria-pressed={isCompleted}
          aria-label={
            isCompleted
              ? `Mark ${activity.title} as Pending`
              : `Mark ${activity.title} as Completed`
          }
          className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 cursor-pointer"
        >
          <span
            className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
              isCompleted
                ? 'border-emerald-600 bg-emerald-600 text-white'
                : 'border-slate-300 bg-white hover:border-blue-700'
            }`}
          >
            {isCompleted && <Check className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />}
          </span>
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span
              className={`font-mono text-sm font-medium tabular-nums whitespace-nowrap ${
                isCompleted ? 'text-slate-400' : 'text-slate-700'
              }`}
            >
              {activity.startTime} – {activity.endTime}
            </span>

            <h2
              className={`text-base font-semibold break-words ${
                isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'
              }`}
            >
              {activity.title}
            </h2>
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
            <span className="font-medium text-slate-700">{activity.category}</span>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <span className="font-mono tabular-nums text-slate-500">{activity.date}</span>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <span
              className={`inline-flex items-center gap-1 font-medium ${
                isCompleted ? 'text-emerald-700' : 'text-slate-600'
              }`}
            >
              {isCompleted && <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />}
              <span>{activity.status}</span>
            </span>
          </div>

          <p
            className={`mt-2 text-sm break-words ${
              activity.notes
                ? isCompleted
                  ? 'text-slate-400'
                  : 'text-slate-600'
                : 'text-slate-400'
            }`}
          >
            {activity.notes ? activity.notes : 'No notes'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-start shrink-0">
        <button
          type="button"
          onClick={() => onEdit(activity)}
          aria-label={`Edit ${activity.title}`}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Edit</span>
        </button>

        <button
          type="button"
          onClick={() => onDelete(activity)}
          aria-label={`Delete ${activity.title}`}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-red-700 transition-colors hover:border-red-200 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Delete</span>
        </button>
      </div>
    </li>
  );
}
