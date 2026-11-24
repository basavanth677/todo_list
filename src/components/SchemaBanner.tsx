import React, { useState } from 'react';
import { Database, Download, RefreshCw } from 'lucide-react';
import { formatSyncTime } from '../utils/dateFormat';

interface SchemaBannerProps {
  lastSyncedAt: Date;
  taskCount: number;
  onRefresh: () => void;
  onExportJson: () => void;
}

export const SchemaBanner: React.FC<SchemaBannerProps> = ({
  lastSyncedAt,
  taskCount,
  onRefresh,
  onExportJson,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh();
    window.setTimeout(() => {
      setIsRefreshing(false);
    }, 450);
  };

  return (
    <section className="mb-6">
      <div className="bg-surface-container-low rounded-xl p-4 shadow-xs border border-outline-variant/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display text-[17px] leading-[24px] font-semibold text-on-surface">
                Task Schema:
              </span>
              <code className="text-xs bg-surface-container px-2 py-0.5 rounded text-primary font-mono font-semibold">
                todos
              </code>
              <span className="text-xs font-medium text-on-secondary-container tabular-nums">
                · {taskCount} {taskCount === 1 ? 'record' : 'records'} persisted
              </span>
            </div>
            <p className="text-xs text-on-surface-variant truncate mt-0.5">
              UUID <span className="text-outline">·</span> text{' '}
              <code className="font-mono text-on-surface">title</code>{' '}
              <span className="text-outline">·</span> text{' '}
              <code className="font-mono text-on-surface">description</code>{' '}
              <span className="text-outline">·</span> boolean{' '}
              <code className="font-mono text-on-surface">is_completed</code>{' '}
              <span className="text-outline">·</span> timestamptz{' '}
              <code className="font-mono text-on-surface">created_at</code>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto">
          <span className="text-xs font-medium text-on-surface-variant tabular-nums">
            Synced at {formatSyncTime(lastSyncedAt)}
          </span>
          <button
            type="button"
            onClick={onExportJson}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface shadow-xs border border-outline-variant/40 hover:bg-surface-container-high transition-colors text-xs font-medium whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Download className="w-3.5 h-3.5 text-on-surface-variant" />
            Export
          </button>
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface shadow-xs border border-outline-variant/40 hover:bg-surface-container-high transition-colors text-xs font-medium whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-primary ${
                isRefreshing ? 'animate-spin' : ''
              }`}
            />
            Fetch Fresh
          </button>
        </div>
      </div>
    </section>
  );
};
