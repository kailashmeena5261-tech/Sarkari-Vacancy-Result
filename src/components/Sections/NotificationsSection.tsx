import React from 'react';
import { Bell, CheckCheck, Clock, AlertCircle, Award, FileText, ChevronRight } from 'lucide-react';
import { NotificationItem, Language, JobItem } from '../../types';

interface NotificationsSectionProps {
  notifications: NotificationItem[];
  language: Language;
  onMarkAllAsRead: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
}

export const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  notifications,
  language,
  onMarkAllAsRead,
  onSelectNotification,
}) => {
  const isHindi = language === 'hi';
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="p-3 sm:p-4 space-y-3 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            {isHindi ? 'भर्ती एवं परीक्षा सूचनाएं' : 'Recruitment & Exam Alerts'}
          </h2>
          <p className="text-xs text-slate-500">
            {unreadCount > 0
              ? `${unreadCount} ${isHindi ? 'नई सूचनाएं' : 'new updates'}`
              : isHindi
              ? 'सभी सूचनाएं पढ़ी जा चुकी हैं'
              : 'All caught up'}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="text-xs font-semibold text-blue-800 dark:text-blue-400 hover:underline flex items-center gap-1 p-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>{isHindi ? 'सभी पढ़ा हुआ मार्क करें' : 'Mark all as read'}</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => onSelectNotification(notif)}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer active:scale-[0.99] flex items-start gap-3 ${
              notif.isRead
                ? 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                : 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/80 text-slate-900 dark:text-slate-100 shadow-sm'
            }`}
          >
            {/* Icon */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                notif.type === 'result'
                  ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                  : notif.type === 'admit'
                  ? 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300'
                  : 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300'
              }`}
            >
              {notif.type === 'result' ? (
                <Award className="w-4 h-4" />
              ) : notif.type === 'admit' ? (
                <FileText className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <h4 className="text-xs font-bold truncate">
                  {isHindi ? notif.titleHi : notif.title}
                </h4>
                <span className="text-[10px] text-slate-400 shrink-0 tabular-nums">
                  {notif.timestamp}
                </span>
              </div>

              <p className="text-[11px] leading-relaxed line-clamp-2">
                {isHindi ? notif.bodyHi : notif.body}
              </p>

              {notif.relatedJobId && (
                <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-blue-900 dark:text-blue-400">
                  <span>{isHindi ? 'विवरण देखें' : 'View Recruitment Details'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
