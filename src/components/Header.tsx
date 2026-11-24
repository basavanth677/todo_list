import React, { useEffect, useRef, useState } from 'react';
import {
  Bell,
  CheckCircle2,
  FileCode2,
  ListTodo,
  Search,
  Settings,
  X,
} from 'lucide-react';
import { TASKFLOW_LOGO_URL, USER_AVATAR_URL } from '../data/initialTodos';
import type { ActivityEvent, NavView } from '../types/todo';
import { formatRelativeDate } from '../utils/dateFormat';

interface HeaderProps {
  activeView: NavView;
  onSelectView: (view: NavView) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  activities: ActivityEvent[];
  unreadCount: number;
  onMarkNotificationsRead: () => void;
  onOpenSettings: () => void;
  onOpenDocs: () => void;
}

const NAV_ITEMS: { id: NavView; label: string }[] = [
  { id: 'all-tasks', label: 'All Tasks' },
  { id: 'today', label: 'Today' },
  { id: 'completed', label: 'Completed' },
  { id: 'analytics', label: 'Analytics' },
];

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onSelectView,
  searchQuery,
  onSearchChange,
  searchInputRef,
  activities,
  unreadCount,
  onMarkNotificationsRead,
  onOpenSettings,
  onOpenDocs,
}) => {
  const [logoFailed, setLogoFailed] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleToggleNotifications = () => {
    const next = !showNotifications;
    setShowNotifications(next);
    setShowProfileMenu(false);
    if (next && unreadCount > 0) {
      onMarkNotificationsRead();
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-surface-container-lowest/95 backdrop-blur-xl border-b border-outline-variant/40">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => onSelectView('all-tasks')}
          className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg py-1 pr-1"
        >
          {!logoFailed ? (
            <img
              src={TASKFLOW_LOGO_URL}
              alt="TaskFlow Logo"
              referrerPolicy="no-referrer"
              onError={() => setLogoFailed(true)}
              className="h-8 w-8 rounded-lg object-contain bg-surface-container-low"
            />
          ) : (
            <span className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
              <ListTodo className="w-4 h-4" />
            </span>
          )}
          <span className="font-display text-[18px] leading-[26px] tracking-[-0.01em] text-on-surface font-semibold whitespace-nowrap">
            TaskFlow
          </span>
        </button>

        {/* Zone 2: Primary Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7 h-full"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onSelectView(item.id)}
                className={`h-full inline-flex items-center text-[14px] whitespace-nowrap shrink-0 transition-colors border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? 'text-primary font-semibold border-primary'
                    : 'text-on-surface-variant hover:text-on-surface font-medium border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Quick Filter, Notifications & Profile */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 text-outline absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filter todos... (/)"
              aria-label="Filter todos by keyword"
              className="w-48 xl:w-60 h-9 pl-8 pr-7 rounded-lg bg-surface-container-low border border-outline-variant/60 text-[13px] text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-0.5 rounded"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Notifications Popover */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              aria-label="Activity notifications"
              aria-expanded={showNotifications}
              onClick={handleToggleNotifications}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Bell className="w-[19px] h-[19px]" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-primary text-on-primary text-[10px] font-semibold flex items-center justify-center tabular-nums">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/50 p-3 z-50">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-outline-variant/40">
                  <span className="font-display text-sm font-semibold text-on-surface">
                    Recent Activity
                  </span>
                  <span className="text-xs text-on-surface-variant tabular-nums">
                    {activities.length} events
                  </span>
                </div>
                {activities.length === 0 ? (
                  <p className="text-xs text-on-surface-variant py-6 text-center">
                    No recent task activity yet.
                  </p>
                ) : (
                  <ul className="max-h-64 overflow-y-auto divide-y divide-outline-variant/30">
                    {activities.slice(0, 8).map((ev) => (
                      <li key={ev.id} className="py-2.5 flex items-start gap-2.5">
                        <CheckCircle2
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            ev.type === 'completed'
                              ? 'text-secondary'
                              : ev.type === 'deleted'
                              ? 'text-error'
                              : 'text-primary'
                          }`}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-on-surface truncate">
                            {ev.title}
                          </p>
                          <p className="text-[11px] text-on-surface-variant capitalize">
                            {ev.type} · {formatRelativeDate(ev.timestamp)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative pl-1" ref={profileRef}>
            <button
              type="button"
              aria-label="Open workspace menu"
              aria-expanded={showProfileMenu}
              onClick={() => {
                setShowProfileMenu((v) => !v);
                setShowNotifications(false);
              }}
              className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-outline-variant/40 hover:ring-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center bg-primary-fixed text-on-primary-fixed text-xs font-semibold"
            >
              {!avatarFailed ? (
                <img
                  src={USER_AVATAR_URL}
                  alt="Workspace Profile"
                  referrerPolicy="no-referrer"
                  onError={() => setAvatarFailed(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>TF</span>
              )}
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/50 p-1.5 z-50">
                <div className="px-3 py-2 border-b border-outline-variant/40 mb-1">
                  <p className="text-xs font-semibold text-on-surface">
                    TaskFlow Workspace
                  </p>
                  <p className="text-[11px] text-on-surface-variant">
                    Kinetic Clarity Edition
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onSelectView('analytics');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-on-surface hover:bg-surface-container-low rounded-lg transition-colors text-left"
                >
                  <ListTodo className="w-3.5 h-3.5 text-primary" />
                  View Analytics
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onOpenSettings();
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-on-surface hover:bg-surface-container-low rounded-lg transition-colors text-left"
                >
                  <Settings className="w-3.5 h-3.5 text-primary" />
                  Workspace Settings
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onOpenDocs();
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-on-surface hover:bg-surface-container-low rounded-lg transition-colors text-left"
                >
                  <FileCode2 className="w-3.5 h-3.5 text-primary" />
                  Schema & Shortcuts
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compact Mobile & Tablet Navigation Bar */}
      <div className="lg:hidden border-t border-outline-variant/30 bg-surface-container-lowest/90 px-4 py-1.5 flex items-center gap-1 overflow-x-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectView(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-primary-fixed text-on-primary-fixed font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
