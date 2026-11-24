import React from 'react';
import { ListFilter, PlusCircle, Search, Trash2, X } from 'lucide-react';
import type { FilterTab, Todo } from '../types/todo';
import { TaskCard } from './TaskCard';

interface TaskListSectionProps {
  todos: Todo[];
  counts: {
    all: number;
    pending: number;
    completed: number;
  };
  activeFilter: FilterTab;
  onFilterChange: (filter: FilterTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onToggleComplete: (id: string) => void;
  onToggleToday: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onFocusCreate: () => void;
  onClearCompleted?: () => void;
  viewHeading?: string;
  hideFilterTabs?: boolean;
}

export const TaskListSection: React.FC<TaskListSectionProps> = ({
  todos,
  counts,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  onToggleComplete,
  onToggleToday,
  onEdit,
  onDelete,
  onFocusCreate,
  onClearCompleted,
  viewHeading,
  hideFilterTabs = false,
}) => {
  const tabs: { id: FilterTab; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'pending', label: 'Pending', count: counts.pending },
    { id: 'completed', label: 'Completed', count: counts.completed },
  ];

  const hasFiltersActive = activeFilter !== 'all' || searchQuery.trim() !== '';

  return (
    <section className="lg:col-span-8 flex flex-col gap-4">
      {/* Controls Toolbar */}
      <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-outline-variant/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {!hideFilterTabs ? (
          <div
            role="tablist"
            aria-label="Filter tasks by completion status"
            className="flex items-center gap-1 p-1 bg-surface-container-low rounded-lg shrink-0"
          >
            {tabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onFilterChange(tab.id)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-all flex items-center gap-2 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? 'bg-surface-container-lowest text-primary font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface font-medium'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded font-semibold tabular-nums ${
                      isActive
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : 'bg-surface-container-highest text-on-surface'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <h2 className="font-display text-base font-semibold text-on-surface">
              {viewHeading || 'Completed Tasks'}
            </h2>
            {onClearCompleted && counts.completed > 0 && (
              <button
                type="button"
                onClick={onClearCompleted}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-error bg-error-container/40 hover:bg-error-container/70 transition-colors whitespace-nowrap"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear Completed
              </button>
            )}
          </div>
        )}

        {/* Inline Live Search Input */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="w-4 h-4 text-outline absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title or description..."
            aria-label="Search tasks"
            className="w-full pl-8 pr-8 py-1.5 text-sm text-on-surface bg-surface-container-low border border-outline-variant/40 rounded-lg focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all placeholder:text-outline"
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="Clear task search"
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Task List or Empty State */}
      {todos.length > 0 ? (
        <div aria-live="polite" className="flex flex-col gap-3">
          {todos.map((todo) => (
            <TaskCard
              key={todo.id}
              todo={todo}
              onToggleComplete={onToggleComplete}
              onToggleToday={onToggleToday}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-xl p-12 text-center shadow-xs border border-outline-variant/30 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary mb-4">
            <ListFilter className="w-8 h-8" />
          </div>
          <h3 className="font-display text-[18px] leading-[26px] font-semibold text-on-surface mb-1">
            No tasks found
          </h3>
          <p className="text-sm text-on-surface-variant max-w-sm mb-6">
            {hasFiltersActive
              ? 'No records match your current filter or search query. Reset filters or add a new task.'
              : 'Your task queue is clear. Create a new task on the left to start tracking execution.'}
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {hasFiltersActive && (
              <button
                type="button"
                onClick={() => {
                  onFilterChange('all');
                  onSearchChange('');
                }}
                className="px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface text-sm font-medium transition-colors"
              >
                Reset Filters
              </button>
            )}
            <button
              type="button"
              onClick={onFocusCreate}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-sm font-medium transition-colors shadow-xs inline-flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              Create New Task
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
