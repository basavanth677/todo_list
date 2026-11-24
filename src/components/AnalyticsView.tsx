import React from 'react';
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flag,
} from 'lucide-react';
import type { NavView, Todo } from '../types/todo';
import { formatRelativeDate } from '../utils/dateFormat';

interface AnalyticsViewProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onNavigate: (view: NavView) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  todos,
  onToggleComplete,
  onEdit,
  onNavigate,
}) => {
  const total = todos.length;
  const completed = todos.filter((t) => t.is_completed).length;
  const pending = total - completed;
  const priorityPending = todos.filter(
    (t) => !t.is_completed && t.priority === 'priority'
  ).length;
  const todayCount = todos.filter((t) => t.is_today).length;
  const todayCompleted = todos.filter(
    (t) => t.is_today && t.is_completed
  ).length;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Build 7-day distribution from real todo timestamps
  const days = Array.from({ length: 7 }, (_, idx) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (6 - idx));
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const dayTasks = todos.filter((t) => {
      const created = new Date(t.created_at).getTime();
      return created >= date.getTime() && created < nextDate.getTime();
    });

    const completedDay = dayTasks.filter((t) => t.is_completed).length;
    const pendingDay = dayTasks.length - completedDay;

    return {
      label: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dateLabel: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      total: dayTasks.length,
      completed: completedDay,
      pending: pendingDay,
    };
  });

  const maxBarValue = Math.max(2, ...days.map((d) => d.total));
  const ringCircumference = 2 * Math.PI * 46;
  const ringOffset =
    ringCircumference - (completionRate / 100) * ringCircumference;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Action Header */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display text-[22px] leading-[28px] tracking-[-0.02em] font-semibold text-on-surface">
              Execution Analytics
            </h1>
            <p className="text-sm text-on-surface-variant">
              Real-time completion throughput and queue distribution across your{' '}
              <span className="tabular-nums font-medium text-on-surface">
                {total}
              </span>{' '}
              tracked tasks.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('all-tasks')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-sm font-medium transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
        >
          Manage Tasks
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Analytics Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* 7-Day Task Creation & Resolution Chart */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="font-display text-[18px] leading-[26px] font-semibold text-on-surface">
                7-Day Task Activity
              </h2>
              <p className="text-xs text-on-surface-variant">
                Created tasks grouped by day and current completion status
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-on-surface-variant">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-secondary inline-block" />
                Completed
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-primary inline-block" />
                Pending
              </span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-3 items-end h-52 pt-4 pb-2 border-b border-outline-variant/40">
            {days.map((day) => {
              const completedPct = (day.completed / maxBarValue) * 100;
              const pendingPct = (day.pending / maxBarValue) * 100;
              return (
                <div
                  key={day.dateLabel}
                  className="flex flex-col items-center justify-end h-full gap-2"
                >
                  <span className="text-[11px] font-mono text-on-surface-variant tabular-nums">
                    {day.total > 0 ? day.total : '0'}
                  </span>
                  <div className="w-full max-w-[44px] h-36 bg-surface-container-low rounded-lg p-1 flex flex-col justify-end gap-1 overflow-hidden">
                    {day.pending > 0 && (
                      <div
                        style={{ height: `${Math.max(14, pendingPct)}%` }}
                        className="w-full rounded bg-primary transition-all duration-300"
                        title={`${day.pending} pending on ${day.dateLabel}`}
                      />
                    )}
                    {day.completed > 0 && (
                      <div
                        style={{ height: `${Math.max(14, completedPct)}%` }}
                        className="w-full rounded bg-secondary transition-all duration-300"
                        title={`${day.completed} completed on ${day.dateLabel}`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-7 gap-3 pt-2.5 text-center">
            {days.map((day) => (
              <div key={day.dateLabel}>
                <div className="text-xs font-medium text-on-surface">
                  {day.label}
                </div>
                <div className="text-[11px] text-outline tabular-nums">
                  {day.dateLabel}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Ratio & Focus Breakdown */}
        <div className="lg:col-span-4 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-xs flex flex-col justify-between gap-6">
          <div>
            <h2 className="font-display text-[18px] leading-[26px] font-semibold text-on-surface">
              Completion Ratio
            </h2>
            <p className="text-xs text-on-surface-variant">
              Overall resolution across all tasks
            </p>
          </div>

          <div className="flex items-center justify-center py-2">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-36 h-36 -rotate-90" viewBox="0 0 112 112">
                <circle
                  cx="56"
                  cy="56"
                  r="46"
                  fill="none"
                  strokeWidth="10"
                  className="stroke-surface-container-high"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="46"
                  fill="none"
                  strokeWidth="10"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={ringOffset}
                  strokeLinecap="round"
                  className="stroke-secondary transition-all duration-500 ease-out"
                />
              </svg>
              <div className="absolute text-center">
                <span className="font-display text-2xl font-bold text-on-surface tabular-nums block">
                  {completionRate}%
                </span>
                <span className="text-[11px] font-medium text-on-surface-variant">
                  Resolved
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col divide-y divide-outline-variant/30 text-sm">
            <div className="py-2.5 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-on-surface-variant">
                <CalendarDays className="w-4 h-4 text-primary" />
                Scheduled Today
              </span>
              <span className="font-mono font-semibold text-on-surface tabular-nums">
                {todayCompleted}/{todayCount}
              </span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-on-surface-variant">
                <Flag className="w-4 h-4 text-tertiary" />
                High Priority Open
              </span>
              <span className="font-mono font-semibold text-tertiary tabular-nums">
                {priorityPending}
              </span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-on-surface-variant">
                <Clock3 className="w-4 h-4 text-outline" />
                Remaining Backlog
              </span>
              <span className="font-mono font-semibold text-on-surface tabular-nums">
                {pending}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Task Ledger Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-[17px] font-semibold text-on-surface">
              Task Ledger
            </h2>
            <p className="text-xs text-on-surface-variant">
              Click any status button to toggle completion directly from analytics
            </p>
          </div>
          <span className="text-xs font-mono text-on-surface-variant tabular-nums">
            {total} rows
          </span>
        </div>

        {todos.length === 0 ? (
          <div className="p-10 text-center text-sm text-on-surface-variant">
            No tasks available yet. Create a task in All Tasks to populate analytics.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/70 border-b border-outline-variant/30 text-xs font-semibold text-on-surface-variant">
                  <th className="py-2.5 px-6">ID</th>
                  <th className="py-2.5 px-4">Task Title</th>
                  <th className="py-2.5 px-4">Scope</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4 text-right">Created</th>
                  <th className="py-2.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/25 text-sm">
                {todos.map((todo) => (
                  <tr
                    key={todo.id}
                    className="hover:bg-surface-container-low/40 transition-colors"
                  >
                    <td className="py-3 px-6 font-mono text-xs text-outline tabular-nums whitespace-nowrap">
                      {todo.id.slice(0, 8)}
                    </td>
                    <td className="py-3 px-4 font-medium text-on-surface max-w-md truncate">
                      <span
                        className={
                          todo.is_completed ? 'line-through text-outline' : ''
                        }
                      >
                        {todo.title}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-on-surface-variant whitespace-nowrap">
                      {todo.is_today ? 'Today' : 'Backlog'}
                      {todo.priority === 'priority' ? ' · Priority' : ''}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onToggleComplete(todo.id)}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                          todo.is_completed
                            ? 'text-secondary hover:text-on-secondary-fixed-variant'
                            : 'text-tertiary hover:text-on-tertiary-fixed-variant'
                        }`}
                      >
                        {todo.is_completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Clock3 className="w-3.5 h-3.5" />
                        )}
                        {todo.is_completed ? 'Completed' : 'Pending'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right text-xs text-on-surface-variant tabular-nums whitespace-nowrap">
                      {formatRelativeDate(todo.created_at)}
                    </td>
                    <td className="py-3 px-6 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onEdit(todo)}
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
