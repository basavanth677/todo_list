import React from 'react';
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock3,
  Flag,
  Pencil,
  Trash2,
} from 'lucide-react';
import type { Todo } from '../types/todo';
import { formatRelativeDate } from '../utils/dateFormat';

interface TaskCardProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onToggleToday?: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
  onToggleToday,
}) => {
  const isCompleted = todo.is_completed;

  return (
    <article
      className={`p-4 rounded-xl border transition-all duration-150 flex flex-col sm:flex-row items-start justify-between gap-4 ${
        isCompleted
          ? 'bg-surface-container-low/75 border-outline-variant/30 shadow-none'
          : 'bg-surface-container-lowest border-outline-variant/40 shadow-xs hover:shadow-md hover:border-outline-variant/70'
      }`}
    >
      <div className="flex items-start gap-3.5 min-w-0 flex-1">
        {/* Completion Checkbox */}
        <button
          type="button"
          onClick={() => onToggleComplete(todo.id)}
          aria-label={isCompleted ? 'Mark task as pending' : 'Mark task as completed'}
          aria-pressed={isCompleted}
          className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
            isCompleted
              ? 'bg-secondary text-on-secondary shadow-xs'
              : 'bg-surface-container-highest hover:bg-primary-fixed text-transparent hover:text-primary/60 border border-outline-variant/50'
          }`}
        >
          <Check className="w-4 h-4 stroke-[2.75]" />
        </button>

        {/* Task Body */}
        <div className="min-w-0 flex-1">
          <h4
            className={`font-display text-[17px] leading-[24px] tracking-[-0.01em] font-semibold transition-colors break-words ${
              isCompleted ? 'line-through text-outline' : 'text-on-surface'
            }`}
          >
            {todo.title}
          </h4>

          {todo.description && todo.description.trim() !== '' && (
            <p
              className={`text-sm leading-relaxed mt-1 break-words ${
                isCompleted
                  ? 'text-outline/80 line-through'
                  : 'text-on-surface-variant'
              }`}
            >
              {todo.description}
            </p>
          )}

          {/* Clean Unboxed Metadata Row */}
          <div className="flex items-center gap-2.5 mt-3 flex-wrap text-xs">
            <span
              className={`inline-flex items-center gap-1 font-semibold ${
                isCompleted ? 'text-secondary' : 'text-tertiary'
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <Clock3 className="w-3.5 h-3.5" />
              )}
              {isCompleted ? 'Completed' : 'Pending'}
            </span>

            <span aria-hidden="true" className="text-outline-variant">
              ·
            </span>

            <span className="inline-flex items-center gap-1 text-on-surface-variant tabular-nums">
              <Calendar className="w-3.5 h-3.5 text-outline" />
              {formatRelativeDate(todo.created_at)}
            </span>

            {todo.priority === 'priority' && !isCompleted && (
              <>
                <span aria-hidden="true" className="text-outline-variant">
                  ·
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-tertiary">
                  <Flag className="w-3 h-3" />
                  Priority
                </span>
              </>
            )}

            {todo.is_today && (
              <>
                <span aria-hidden="true" className="text-outline-variant">
                  ·
                </span>
                {onToggleToday ? (
                  <button
                    type="button"
                    onClick={() => onToggleToday(todo.id)}
                    title="Click to move between Today and Backlog"
                    className="text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                  >
                    Today
                  </button>
                ) : (
                  <span className="text-primary font-medium">Today</span>
                )}
              </>
            )}

            <span aria-hidden="true" className="text-outline-variant hidden md:inline">
              ·
            </span>

            <span className="font-mono text-[11px] text-outline hidden md:inline tabular-nums">
              {todo.id.slice(0, 8)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
        <button
          type="button"
          onClick={() => onEdit(todo)}
          aria-label={`Edit ${todo.title}`}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(todo)}
          aria-label={`Delete ${todo.title}`}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};
