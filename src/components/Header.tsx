import { Plus } from 'lucide-react';

interface HeaderProps {
  onAddClick: () => void;
}

export function Header({ onAddClick }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-8 px-4 py-4 sm:px-6">
        <span className="font-display text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
          CampusSync
        </span>

        <button
          type="button"
          onClick={onAddClick}
          className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>Add Activity</span>
        </button>
      </div>
    </header>
  );
}
