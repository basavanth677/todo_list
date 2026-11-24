import React, { useState } from 'react';
import {
  AlertCircle,
  CalendarClock,
  Flag,
  Lightbulb,
  Plus,
  PlusSquare,
} from 'lucide-react';
import type { TaskPriority } from '../types/todo';

interface CreateTaskPanelProps {
  onCreateTask: (payload: {
    title: string;
    description: string;
    is_today: boolean;
    priority: TaskPriority;
  }) => void;
  titleInputRef: React.RefObject<HTMLInputElement | null>;
  defaultToday?: boolean;
}

export const CreateTaskPanel: React.FC<CreateTaskPanelProps> = ({
  onCreateTask,
  titleInputRef,
  defaultToday = true,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isToday, setIsToday] = useState(defaultToday);
  const [priority, setPriority] = useState<TaskPriority>('standard');
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setShowError(true);
      titleInputRef.current?.focus();
      return;
    }

    onCreateTask({
      title: trimmed,
      description: description.trim(),
      is_today: isToday,
      priority,
    });

    setTitle('');
    setDescription('');
    setPriority('standard');
    setShowError(false);
    titleInputRef.current?.focus();
  };

  return (
    <aside className="lg:col-span-4 lg:sticky lg:top-20">
      <div className="bg-surface-container-lowest p-6 rounded-xl shadow-xs border border-outline-variant/30 transition-all">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0">
            <PlusSquare className="w-[18px] h-[18px]" />
          </div>
          <div>
            <h2 className="font-display text-[18px] leading-[26px] tracking-[-0.01em] font-semibold text-on-surface">
              Add New Task
            </h2>
            <p className="text-xs text-on-surface-variant">
              Persist directly to local todos store
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="taskTitle"
              className="block text-sm font-medium text-on-surface mb-1.5"
            >
              Task Title <span className="text-error font-bold">*</span>
            </label>
            <input
              ref={titleInputRef}
              id="taskTitle"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim()) setShowError(false);
              }}
              placeholder="e.g. Implement optimistic task sync"
              className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-container-lowest text-sm text-on-surface border transition-all placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary ${
                showError
                  ? 'border-error focus:ring-error'
                  : 'border-outline-variant/60'
              }`}
            />
            {showError && (
              <p className="mt-1.5 text-xs font-semibold text-error flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Task title cannot be empty
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="taskDescription"
              className="block text-sm font-medium text-on-surface mb-1.5"
            >
              Description{' '}
              <span className="text-xs text-on-surface-variant font-normal">
                (optional)
              </span>
            </label>
            <textarea
              id="taskDescription"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide technical context or acceptance criteria..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-lowest text-sm text-on-surface border border-outline-variant/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-outline resize-none"
            />
          </div>

          {/* Schedule & Priority Segmented Controls */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setIsToday((v) => !v)}
              aria-pressed={isToday}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap ${
                isToday
                  ? 'bg-primary-fixed/70 border-primary/30 text-on-primary-fixed font-semibold'
                  : 'bg-surface-container-low border-outline-variant/40 text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <CalendarClock className="w-3.5 h-3.5" />
              {isToday ? 'Due Today' : 'Backlog'}
            </button>

            <button
              type="button"
              onClick={() =>
                setPriority((p) => (p === 'priority' ? 'standard' : 'priority'))
              }
              aria-pressed={priority === 'priority'}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap ${
                priority === 'priority'
                  ? 'bg-tertiary-fixed border-tertiary/30 text-on-tertiary-fixed font-semibold'
                  : 'bg-surface-container-low border-outline-variant/40 text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              {priority === 'priority' ? 'High Priority' : 'Standard'}
            </button>
          </div>

          <div className="bg-surface-container-low p-3 rounded-lg flex items-center justify-between text-xs text-on-surface-variant">
            <span className="font-medium flex items-center gap-1.5">
              <CalendarClock className="w-4 h-4 text-primary" />
              Created Timestamp
            </span>
            <span className="font-mono font-semibold text-on-surface">
              Auto Generated
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg bg-primary hover:bg-primary-container active:scale-[0.99] text-on-primary text-sm font-semibold transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Plus className="w-[18px] h-[18px] group-hover:rotate-90 transition-transform duration-200" />
            Create Task
          </button>
        </form>

        <div className="mt-5 p-3 bg-surface-container rounded-lg flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <p className="text-xs leading-relaxed text-on-surface-variant">
            Press <kbd className="font-mono px-1 py-0.5 bg-surface-container-lowest rounded text-on-surface">/</kbd> anywhere to filter tasks, or{' '}
            <kbd className="font-mono px-1 py-0.5 bg-surface-container-lowest rounded text-on-surface">N</kbd> to jump straight to creating a new task.
          </p>
        </div>
      </div>
    </aside>
  );
};
