import type { Todo } from '../types/todo';

export const TASKFLOW_LOGO_URL =
  'https://lh3.googleusercontent.com/aida/ALJJyrC3iZFCgvw1Q8PNEYBEmvF7a_AUqpI_LSOnKFqYpqionWTsea8sJGeQAkN4HX-JwxJ5R8E_31neCg_DKyCFZoUdDBfJEpxVUbzzQ7-i_0cw-pFXzLv6AzlIO6Md69nNauVDF1rct1aRmWZwXgcSJ0ezlHX1-x2Cz3afyPYTIoEcC6RCSm9zR-zikoATlint4EBIqY_X7PgsjI-KfPbHFKw9uwDMpdfl1DKO-XRgfrnn';

export const USER_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA-Rspvm9w0IU_HybH7hoke6NuW_Rm5t7idbraFrG-N6VxMXC7qDHbTC1bQNX-UG3x8ReTohPJKRLZswQpavZKl2yD63eSA5kEUGaosL2ViWVKk8wKvoGXSoqGbbevtb5nLz7b2hLc2G8oQBEZdDKH1dcetVoFpzktPe97grWHS1JgIRmoRgk-Au29YLWNNeY99Qlahv15VJ3MkcrUMsSr0LHWZF4LVnkpwFlYk0Mg';

const now = Date.now();

export const INITIAL_TODOS: Todo[] = [
  {
    id: '7f9c2d18-3a9b-4e8c-a012-9c1e40b3f811',
    title: 'Integrate Supabase Auth & JWT refresh tokens',
    description:
      'Configure edge middleware and secure HTTP-only cookies for row-level security policies across user workspaces.',
    is_completed: false,
    is_today: true,
    priority: 'priority',
    created_at: new Date(now - 3600000 * 2).toISOString(),
    completed_at: null,
  },
  {
    id: '8a1b3c29-4d0e-5f9a-b123-0d2f51c4a922',
    title: 'Design PostgreSQL todos table schema and migration',
    description:
      'Include uuid primary keys, timestamptz default now(), and composite index on is_completed and created_at.',
    is_completed: true,
    is_today: true,
    priority: 'standard',
    created_at: new Date(now - 3600000 * 22).toISOString(),
    completed_at: new Date(now - 3600000 * 4).toISOString(),
  },
  {
    id: '9b2c4d30-5e1f-6a0b-c234-1e3a62d5b033',
    title: 'Implement optimistic UI toggles and error boundaries',
    description:
      'Provide tactile visual feedback instantaneously while background persistence resolves cleanly.',
    is_completed: false,
    is_today: true,
    priority: 'standard',
    created_at: new Date(now - 3600000 * 5).toISOString(),
    completed_at: null,
  },
  {
    id: '4c8e1a72-9b3d-42f0-81c5-6a7b8c9d0e11',
    title: 'Audit keyboard focus order across modal dialogs',
    description:
      'Verify Escape dismissal, initial input autofocus, and visible focus-visible rings on all task controls.',
    is_completed: true,
    is_today: false,
    priority: 'standard',
    created_at: new Date(now - 3600000 * 48).toISOString(),
    completed_at: new Date(now - 3600000 * 26).toISOString(),
  },
  {
    id: '2d5f9e04-7c1a-4b88-9d21-3e4f5a6b7c88',
    title: 'Prepare release checklist for weekly sprint review',
    description:
      'Summarize completed deliverables, open blockers, and velocity metrics for stakeholder walkthrough.',
    is_completed: false,
    is_today: false,
    priority: 'priority',
    created_at: new Date(now - 3600000 * 72).toISOString(),
    completed_at: null,
  },
];
