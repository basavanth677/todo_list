export type NavView = 'all-tasks' | 'today' | 'completed' | 'analytics';

export type FilterTab = 'all' | 'pending' | 'completed';

export type TaskPriority = 'standard' | 'priority';

export interface Todo {
  id: string;
  title: string;
  description: string;
  is_completed: boolean;
  is_today: boolean;
  priority: TaskPriority;
  created_at: string;
  completed_at?: string | null;
}

export interface ActivityEvent {
  id: string;
  type: 'created' | 'completed' | 'reopened' | 'updated' | 'deleted' | 'synced';
  title: string;
  timestamp: string;
}
