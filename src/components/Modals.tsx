import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  CalendarClock,
  Download,
  FileCode2,
  Flag,
  Keyboard,
  PencilLine,
  RotateCcw,
  Settings,
  Trash2,
  X,
} from 'lucide-react';
import type { TaskPriority, Todo } from '../types/todo';

interface EditTaskModalProps {
  todo: Todo | null;
  onClose: () => void;
  onSave: (
    id: string,
    updates: {
      title: string;
      description: string;
      is_today: boolean;
      priority: TaskPriority;
    }
  ) => void;
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  todo,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isToday, setIsToday] = useState(true);
  const [priority, setPriority] = useState<TaskPriority>('standard');
  const [showError, setShowError] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || '');
      setIsToday(todo.is_today);
      setPriority(todo.priority);
      setShowError(false);
      window.setTimeout(() => titleRef.current?.focus(), 20);
    }
  }, [todo]);

  if (!todo) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setShowError(true);
      titleRef.current?.focus();
      return;
    }
    onSave(todo.id, {
      title: trimmed,
      description: description.trim(),
      is_today: isToday,
      priority,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-on-background/40 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-6 shadow-2xl border border-outline-variant/40">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-outline-variant/30">
          <div className="flex items-center gap-2">
            <PencilLine className="w-5 h-5 text-primary" />
            <h3
              id="edit-modal-title"
              className="font-display text-[18px] font-semibold text-on-surface"
            >
              Edit Task
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close edit dialog"
            className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg hover:bg-surface-container transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="editTaskTitle"
              className="block text-sm font-medium text-on-surface mb-1.5"
            >
              Task Title <span className="text-error font-bold">*</span>
            </label>
            <input
              ref={titleRef}
              id="editTaskTitle"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim()) setShowError(false);
              }}
              className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-container-lowest text-sm text-on-surface border focus:outline-none focus:ring-2 transition-all ${
                showError
                  ? 'border-error focus:ring-error'
                  : 'border-outline-variant/60 focus:ring-primary'
              }`}
            />
            {showError && (
              <p className="mt-1.5 text-xs font-semibold text-error flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Title is required
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="editTaskDescription"
              className="block text-sm font-medium text-on-surface mb-1.5"
            >
              Description
            </label>
            <textarea
              id="editTaskDescription"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-lowest text-sm text-on-surface border border-outline-variant/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setIsToday((v) => !v)}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors flex items-center justify-center gap-1.5 ${
                isToday
                  ? 'bg-primary-fixed/70 border-primary/30 text-on-primary-fixed font-semibold'
                  : 'bg-surface-container-low border-outline-variant/40 text-on-surface-variant'
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
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors flex items-center justify-center gap-1.5 ${
                priority === 'priority'
                  ? 'bg-tertiary-fixed border-tertiary/30 text-on-tertiary-fixed font-semibold'
                  : 'bg-surface-container-low border-outline-variant/40 text-on-surface-variant'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              {priority === 'priority' ? 'High Priority' : 'Standard'}
            </button>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-sm font-semibold transition-all shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface DeleteTaskModalProps {
  todo: Todo | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  todo,
  onClose,
  onConfirm,
}) => {
  if (!todo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-on-background/40 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-surface-container-lowest rounded-xl max-w-md w-full p-6 shadow-2xl border border-outline-variant/40">
        <div className="w-12 h-12 rounded-full bg-error-container/60 flex items-center justify-center text-error mb-4">
          <Trash2 className="w-6 h-6" />
        </div>
        <h3
          id="delete-modal-title"
          className="font-display text-[18px] font-semibold text-on-surface mb-2"
        >
          Delete Task?
        </h3>
        <p className="text-sm text-on-surface-variant mb-4">
          Are you sure you want to delete this task from your workspace? This action cannot be undone.
        </p>

        <div className="p-3 bg-surface-container-low rounded-lg mb-5 border border-outline-variant/30">
          <span className="text-[11px] font-semibold text-on-surface-variant block mb-1">
            Record to delete
          </span>
          <span className="text-sm font-semibold text-on-surface truncate block">
            &ldquo;{todo.title}&rdquo;
          </span>
        </div>

        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(todo.id);
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-error hover:bg-on-error-container text-on-error text-sm font-semibold transition-all shadow-xs inline-flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  totalCount: number;
  completedCount: number;
  onExportJson: () => void;
  onClearCompleted: () => void;
  onResetSampleData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  onClose,
  totalCount,
  completedCount,
  onExportJson,
  onClearCompleted,
  onResetSampleData,
}) => {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-on-background/40 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-surface-container-lowest rounded-xl max-w-md w-full p-6 shadow-2xl border border-outline-variant/40">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-outline-variant/30">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <h3
              id="settings-modal-title"
              className="font-display text-[18px] font-semibold text-on-surface"
            >
              Workspace Settings
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg hover:bg-surface-container transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="p-3.5 rounded-lg bg-surface-container-low flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-on-surface">
                Export Todos JSON
              </p>
              <p className="text-xs text-on-surface-variant tabular-nums">
                Download all {totalCount} records as JSON
              </p>
            </div>
            <button
              type="button"
              onClick={onExportJson}
              className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/50 hover:bg-surface-container-high text-xs font-semibold text-on-surface inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-primary" />
              Export
            </button>
          </div>

          <div className="p-3.5 rounded-lg bg-surface-container-low flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-on-surface">
                Clear Completed Tasks
              </p>
              <p className="text-xs text-on-surface-variant tabular-nums">
                Remove {completedCount} finished tasks
              </p>
            </div>
            <button
              type="button"
              disabled={completedCount === 0}
              onClick={() => {
                onClearCompleted();
                onClose();
              }}
              className="px-3 py-1.5 rounded-lg bg-error-container/50 hover:bg-error-container text-on-error-container disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>

          <div className="p-3.5 rounded-lg bg-surface-container-low flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-on-surface">
                Restore Sample Tasks
              </p>
              <p className="text-xs text-on-surface-variant">
                Reset list to default starter records
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onResetSampleData();
                onClose();
              }}
              className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/50 hover:bg-surface-container-high text-xs font-semibold text-on-surface inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-primary" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DocsModalProps {
  open: boolean;
  onClose: () => void;
}

export const DocsModal: React.FC<DocsModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="docs-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-on-background/40 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-6 shadow-2xl border border-outline-variant/40">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-outline-variant/30">
          <div className="flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-primary" />
            <h3
              id="docs-modal-title"
              className="font-display text-[18px] font-semibold text-on-surface"
            >
              Schema & Keyboard Shortcuts
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close docs"
            className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg hover:bg-surface-container transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <h4 className="text-xs font-semibold text-on-surface-variant mb-2 flex items-center gap-1.5">
              <Keyboard className="w-3.5 h-3.5 text-primary" />
              Keyboard Shortcuts
            </h4>
            <div className="bg-surface-container-low rounded-lg divide-y divide-outline-variant/30 text-xs">
              <div className="px-3.5 py-2.5 flex items-center justify-between">
                <span className="text-on-surface">Focus search bar</span>
                <kbd className="font-mono px-2 py-0.5 bg-surface-container-lowest rounded border border-outline-variant/50 text-on-surface">
                  /
                </kbd>
              </div>
              <div className="px-3.5 py-2.5 flex items-center justify-between">
                <span className="text-on-surface">Jump to New Task title</span>
                <kbd className="font-mono px-2 py-0.5 bg-surface-container-lowest rounded border border-outline-variant/50 text-on-surface">
                  N
                </kbd>
              </div>
              <div className="px-3.5 py-2.5 flex items-center justify-between">
                <span className="text-on-surface">Close open modal</span>
                <kbd className="font-mono px-2 py-0.5 bg-surface-container-lowest rounded border border-outline-variant/50 text-on-surface">
                  Esc
                </kbd>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-on-surface-variant mb-2">
              todos Record Structure
            </h4>
            <pre className="p-3.5 rounded-lg bg-inverse-surface text-inverse-on-surface font-mono text-xs overflow-x-auto leading-relaxed">
{`{
  id: uuid,
  title: text,
  description: text,
  is_completed: boolean,
  is_today: boolean,
  priority: "standard" | "priority",
  created_at: timestamptz
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
