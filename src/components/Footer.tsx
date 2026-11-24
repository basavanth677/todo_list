import React from 'react';

interface FooterProps {
  onOpenSettings: () => void;
  onOpenDocs: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSettings,
  onOpenDocs,
}) => {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-on-surface-variant">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-on-surface">TaskFlow</span>
          <span>© 2026 Kinetic Clarity Workspace. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-5 text-xs">
          <button
            type="button"
            onClick={onOpenSettings}
            className="hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1"
          >
            Settings
          </button>
          <button
            type="button"
            onClick={onOpenDocs}
            className="hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1"
          >
            Docs
          </button>
        </div>
      </div>
    </footer>
  );
};
