import React from 'react';
import { CheckCircle2, Clock3, ListChecks, TrendingUp } from 'lucide-react';

interface StatsRowProps {
  total: number;
  pending: number;
  completed: number;
  rate: number;
}

export const StatsRow: React.FC<StatsRowProps> = ({
  total,
  pending,
  completed,
  rate,
}) => {
  const circumference = 88;
  const offset = circumference - (rate / 100) * circumference;

  return (
    <section
      aria-label="Task metrics overview"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-outline-variant/30 hover:shadow-md transition-shadow flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold tracking-[0.02em] text-on-surface-variant block mb-1">
            Total Tasks
          </span>
          <span className="font-display text-[36px] leading-[44px] tracking-[-0.025em] font-bold text-on-surface tabular-nums">
            {total}
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
          <ListChecks className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-outline-variant/30 hover:shadow-md transition-shadow flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold tracking-[0.02em] text-on-surface-variant block mb-1">
            Pending Execution
          </span>
          <span className="font-display text-[36px] leading-[44px] tracking-[-0.025em] font-bold text-tertiary tabular-nums">
            {pending}
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0">
          <Clock3 className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-outline-variant/30 hover:shadow-md transition-shadow flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold tracking-[0.02em] text-on-surface-variant block mb-1">
            Completed Goals
          </span>
          <span className="font-display text-[36px] leading-[44px] tracking-[-0.025em] font-bold text-secondary tabular-nums">
            {completed}
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
          <CheckCircle2 className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-outline-variant/30 hover:shadow-md transition-shadow flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold tracking-[0.02em] text-on-surface-variant block mb-1">
            Progress Rate
          </span>
          <span className="font-display text-[36px] leading-[44px] tracking-[-0.025em] font-bold text-primary tabular-nums">
            {rate}%
          </span>
        </div>
        <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
            <circle
              className="stroke-surface-container-high"
              cx="18"
              cy="18"
              fill="none"
              r="14"
              strokeWidth="3"
            />
            <circle
              className="stroke-primary transition-all duration-500 ease-out"
              cx="18"
              cy="18"
              fill="none"
              r="14"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              strokeWidth="3"
            />
          </svg>
          <TrendingUp className="w-4 h-4 text-primary absolute" />
        </div>
      </div>
    </section>
  );
};
