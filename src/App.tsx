import { useEffect, useMemo, useRef, useState } from 'react';
import { AnalyticsView } from './components/AnalyticsView';
import { CreateTaskPanel } from './components/CreateTaskPanel';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import {
  DeleteTaskModal,
  DocsModal,
  EditTaskModal,
  SettingsModal,
} from './components/Modals';
import { SchemaBanner } from './components/SchemaBanner';
import { StatsRow } from './components/StatsRow';
import { TaskListSection } from './components/TaskListSection';
import { INITIAL_TODOS } from './data/initialTodos';
import type {
  ActivityEvent,
  FilterTab,
  NavView,
  TaskPriority,
  Todo,
} from './types/todo';
import { createUuid } from './utils/dateFormat';

const STORAGE_KEY = 'taskflow_todos_mvp_v1';
const ACTIVITY_STORAGE_KEY = 'taskflow_activity_mvp_v1';

function loadInitialTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_TODOS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => ({
        id: String(item.id || createUuid()),
        title: String(item.title || ''),
        description: String(item.description || ''),
        is_completed: Boolean(item.is_completed),
        is_today: item.is_today !== undefined ? Boolean(item.is_today) : true,
        priority: item.priority === 'priority' ? 'priority' : 'standard',
        created_at: item.created_at || new Date().toISOString(),
        completed_at: item.completed_at || null,
      }));
    }
    return INITIAL_TODOS;
  } catch {
    return INITIAL_TODOS;
  }
}

function loadInitialActivities(): ActivityEvent[] {
  try {
    const raw = localStorage.getItem(ACTIVITY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(loadInitialTodos);
  const [activities, setActivities] = useState<ActivityEvent[]>(
    loadInitialActivities
  );
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeView, setActiveView] = useState<NavView>('all-tasks');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSyncedAt, setLastSyncedAt] = useState<Date>(() => new Date());

  // Modals
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodo, setDeletingTodo] = useState<Todo | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Refs for keyboard shortcuts
  const headerSearchRef = useRef<HTMLInputElement>(null);
  const createTitleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      setLastSyncedAt(new Date());
    } catch {
      // Ignore storage quota errors
    }
  }, [todos]);

  useEffect(() => {
    try {
      localStorage.setItem(
        ACTIVITY_STORAGE_KEY,
        JSON.stringify(activities.slice(0, 25))
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [activities]);

  useEffect(() => {
    if (!toastMessage) return;
    const id = window.setTimeout(() => setToastMessage(null), 2600);
    return () => window.clearTimeout(id);
  }, [toastMessage]);

  // Global Keyboard Shortcuts: '/' to search, 'N' to new task, 'Esc' to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEditingTodo(null);
        setDeletingTodo(null);
        setSettingsOpen(false);
        setDocsOpen(false);
        return;
      }

      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if (isTyping) return;

      if (e.key === '/') {
        e.preventDefault();
        headerSearchRef.current?.focus();
      } else if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        if (activeView === 'analytics') {
          setActiveView('all-tasks');
        }
        window.setTimeout(() => createTitleRef.current?.focus(), 30);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeView]);

  const recordActivity = (
    type: ActivityEvent['type'],
    title: string
  ) => {
    const event: ActivityEvent = {
      id: createUuid(),
      type,
      title,
      timestamp: new Date().toISOString(),
    };
    setActivities((prev) => [event, ...prev].slice(0, 25));
    setUnreadCount((c) => c + 1);
  };

  const handleCreateTask = (payload: {
    title: string;
    description: string;
    is_today: boolean;
    priority: TaskPriority;
  }) => {
    const newTodo: Todo = {
      id: createUuid(),
      title: payload.title,
      description: payload.description,
      is_completed: false,
      is_today: payload.is_today,
      priority: payload.priority,
      created_at: new Date().toISOString(),
      completed_at: null,
    };
    setTodos((prev) => [newTodo, ...prev]);
    recordActivity('created', newTodo.title);
    setToastMessage('Task created');
    if (activeView === 'completed') {
      setActiveView('all-tasks');
    }
  };

  const handleToggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id !== id) return todo;
        const nextCompleted = !todo.is_completed;
        recordActivity(nextCompleted ? 'completed' : 'reopened', todo.title);
        return {
          ...todo,
          is_completed: nextCompleted,
          completed_at: nextCompleted ? new Date().toISOString() : null,
        };
      })
    );
  };

  const handleToggleToday = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, is_today: !todo.is_today } : todo
      )
    );
  };

  const handleSaveEdit = (
    id: string,
    updates: {
      title: string;
      description: string;
      is_today: boolean;
      priority: TaskPriority;
    }
  ) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: updates.title,
              description: updates.description,
              is_today: updates.is_today,
              priority: updates.priority,
            }
          : todo
      )
    );
    recordActivity('updated', updates.title);
    setToastMessage('Task updated');
  };

  const handleDeleteTask = (id: string) => {
    const target = todos.find((t) => t.id === id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
    if (target) {
      recordActivity('deleted', target.title);
    }
    setToastMessage('Task deleted');
  };

  const handleClearCompleted = () => {
    const completedCount = todos.filter((t) => t.is_completed).length;
    if (completedCount === 0) return;
    setTodos((prev) => prev.filter((t) => !t.is_completed));
    recordActivity('deleted', `Cleared ${completedCount} completed tasks`);
    setToastMessage(`Cleared ${completedCount} completed tasks`);
  };

  const handleResetSampleData = () => {
    setTodos(INITIAL_TODOS);
    setActiveFilter('all');
    setSearchQuery('');
    recordActivity('synced', 'Restored starter tasks');
    setToastMessage('Starter tasks restored');
  };

  const handleRefresh = () => {
    setTodos(loadInitialTodos());
    setLastSyncedAt(new Date());
    setToastMessage('Workspace synchronized');
  };

  const handleExportJson = () => {
    try {
      const blob = new Blob([JSON.stringify(todos, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `taskflow-todos-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setToastMessage('Exported todos JSON');
    } catch {
      setToastMessage('Unable to export JSON');
    }
  };

  // Scope todos by current view ('all-tasks' | 'today' | 'completed')
  const viewScopedTodos = useMemo(() => {
    if (activeView === 'today') {
      return todos.filter((t) => t.is_today);
    }
    if (activeView === 'completed') {
      return todos.filter((t) => t.is_completed);
    }
    return todos;
  }, [todos, activeView]);

  // Stats for StatsRow (scoped to Today when on Today screen, otherwise overall)
  const statsSource = activeView === 'today' ? viewScopedTodos : todos;
  const stats = useMemo(() => {
    const total = statsSource.length;
    const completed = statsSource.filter((t) => t.is_completed).length;
    const pending = total - completed;
    const rate = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, pending, completed, rate };
  }, [statsSource]);

  const tabCounts = useMemo(() => {
    const all = viewScopedTodos.length;
    const completed = viewScopedTodos.filter((t) => t.is_completed).length;
    const pending = all - completed;
    return { all, pending, completed };
  }, [viewScopedTodos]);

  const visibleTodos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return viewScopedTodos.filter((todo) => {
      if (activeView !== 'completed') {
        if (activeFilter === 'pending' && todo.is_completed) return false;
        if (activeFilter === 'completed' && !todo.is_completed) return false;
      }
      if (query) {
        const matchTitle = todo.title.toLowerCase().includes(query);
        const matchDesc = (todo.description || '').toLowerCase().includes(query);
        return matchTitle || matchDesc;
      }
      return true;
    });
  }, [viewScopedTodos, activeView, activeFilter, searchQuery]);

  const handleSelectView = (view: NavView) => {
    setActiveView(view);
    if (view === 'all-tasks' || view === 'today') {
      setActiveFilter('all');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header
        activeView={activeView}
        onSelectView={handleSelectView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchInputRef={headerSearchRef}
        activities={activities}
        unreadCount={unreadCount}
        onMarkNotificationsRead={() => setUnreadCount(0)}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenDocs={() => setDocsOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 w-full pt-28 lg:pt-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
          <SchemaBanner
            lastSyncedAt={lastSyncedAt}
            taskCount={todos.length}
            onRefresh={handleRefresh}
            onExportJson={handleExportJson}
          />

          <StatsRow
            total={stats.total}
            pending={stats.pending}
            completed={stats.completed}
            rate={stats.rate}
          />

          {activeView === 'analytics' ? (
            <AnalyticsView
              todos={todos}
              onToggleComplete={handleToggleComplete}
              onEdit={setEditingTodo}
              onNavigate={handleSelectView}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <CreateTaskPanel
                onCreateTask={handleCreateTask}
                titleInputRef={createTitleRef}
                defaultToday={true}
              />

              <TaskListSection
                todos={visibleTodos}
                counts={tabCounts}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onToggleComplete={handleToggleComplete}
                onToggleToday={handleToggleToday}
                onEdit={setEditingTodo}
                onDelete={setDeletingTodo}
                onFocusCreate={() => createTitleRef.current?.focus()}
                onClearCompleted={
                  activeView === 'completed' ? handleClearCompleted : undefined
                }
                viewHeading={
                  activeView === 'completed'
                    ? `Completed Archive (${tabCounts.completed})`
                    : undefined
                }
                hideFilterTabs={activeView === 'completed'}
              />
            </div>
          )}
        </div>
      </main>

      <Footer
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenDocs={() => setDocsOpen(true)}
      />

      {/* Modals */}
      <EditTaskModal
        todo={editingTodo}
        onClose={() => setEditingTodo(null)}
        onSave={handleSaveEdit}
      />

      <DeleteTaskModal
        todo={deletingTodo}
        onClose={() => setDeletingTodo(null)}
        onConfirm={handleDeleteTask}
      />

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        totalCount={todos.length}
        completedCount={todos.filter((t) => t.is_completed).length}
        onExportJson={handleExportJson}
        onClearCompleted={handleClearCompleted}
        onResetSampleData={handleResetSampleData}
      />

      <DocsModal open={docsOpen} onClose={() => setDocsOpen(false)} />

      {/* Ephemeral Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-inverse-surface text-inverse-on-surface text-xs font-medium shadow-lg"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
