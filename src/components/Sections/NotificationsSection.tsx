import React, { useState } from 'react';
import {
  Bell,
  CheckCheck,
  Clock,
  AlertCircle,
  Award,
  FileText,
  ChevronRight,
  Trash2,
  Calendar,
  Filter,
  Check,
  Layers,
  Sparkles
} from 'lucide-react';
import { NotificationItem, Language, JobItem } from '../../types';

interface NotificationsSectionProps {
  notifications: NotificationItem[];
  language: Language;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onToggleRead: (id: string) => void;
  onSelectNotification: (notif: NotificationItem) => void;
}

export const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  notifications,
  language,
  onMarkAllAsRead,
  onClearAll,
  onToggleRead,
  onSelectNotification,
}) => {
  const isHindi = language === 'hi';
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'job' | 'admit' | 'result' | 'alert'>('all');
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((n) => {
    if (selectedCategory === 'all') return true;
    return n.type === selectedCategory;
  });

  const getCategoryLabel = (type: NotificationItem['type']) => {
    switch (type) {
      case 'job':
        return isHindi ? 'भर्ती विज्ञप्ति' : 'Job Alert';
      case 'admit':
        return isHindi ? 'एडमिट कार्ड' : 'Admit Card';
      case 'result':
        return isHindi ? 'परीक्षा परिणाम' : 'Exam Result';
      case 'alert':
        return isHindi ? 'अंतिम तिथि' : 'Urgent Alert';
      default:
        return 'Notice';
    }
  };

  const getCategoryColor = (type: NotificationItem['type']) => {
    switch (type) {
      case 'job':
        return 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300';
      case 'admit':
        return 'bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-300';
      case 'result':
        return 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300';
      case 'alert':
        return 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300';
      default:
        return 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="p-3 sm:p-4 space-y-3 pb-24 text-xs">
      {/* 1. Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300">
            <Bell className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight">
              {isHindi ? 'भर्ती सूचना केंद्र' : 'Recruitment Notification Center'}
            </h2>
            <p className="text-[11px] text-blue-200">
              <strong className="text-amber-300 tabular-nums">{unreadCount}</strong>{' '}
              {isHindi ? 'अपठित सूचनाएं' : 'unread notifications'}
            </p>
          </div>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
                title="Mark all as read"
                aria-label="Mark all read"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setShowConfirmClear(true)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-red-200 transition active:scale-95"
              title="Clear all notifications"
              aria-label="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 2. Clear All Confirmation */}
      {showConfirmClear && (
        <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{isHindi ? 'सभी सूचनाएं हटाना चाहते हैं?' : 'Clear all notifications?'}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                onClearAll();
                setShowConfirmClear(false);
              }}
              className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px]"
            >
              {isHindi ? 'हटाएं' : 'Confirm'}
            </button>
            <button
              onClick={() => setShowConfirmClear(false)}
              className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px]"
            >
              {isHindi ? 'रद्द' : 'Cancel'}
            </button>
          </div>
        </div>
      )}

      {/* 3. Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'all', labelEn: 'All Alerts', labelHi: 'सभी सूचनाएं' },
          { id: 'job', labelEn: 'Jobs', labelHi: 'नौकरियां' },
          { id: 'admit', labelEn: 'Admit Cards', labelHi: 'एडमिट कार्ड' },
          { id: 'result', labelEn: 'Results', labelHi: 'परिणाम' },
          { id: 'alert', labelEn: 'Deadlines', labelHi: 'अंतिम तिथि' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id as any)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === tab.id
                ? 'border-blue-900 dark:border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-300 font-bold'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
            }`}
          >
            {isHindi ? tab.labelHi : tab.labelEn}
          </button>
        ))}
      </div>

      {/* 4. Notifications List */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-2.5">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => onSelectNotification(notif)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer active:scale-[0.99] flex flex-col gap-2 ${
                notif.isRead
                  ? 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 opacity-90'
                  : 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-300 dark:border-blue-900 text-slate-900 dark:text-slate-100 shadow-sm ring-1 ring-blue-500/20'
              }`}
            >
              {/* Category, Date & Read status */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 animate-pulse" />
                  )}
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getCategoryColor(
                      notif.type
                    )}`}
                  >
                    {getCategoryLabel(notif.type)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{notif.timestamp}</span>
                  </span>
                  <span aria-hidden="true">•</span>
                  <span>{notif.dateFormatted || '27 Sep 2026'}</span>
                </div>
              </div>

              {/* Title & Body */}
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold leading-snug">
                  {isHindi ? notif.titleHi : notif.title}
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isHindi ? notif.bodyHi : notif.body}
                </p>
              </div>

              {/* Footer action */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleRead(notif.id);
                  }}
                  className="text-[10px] font-semibold text-slate-500 hover:text-blue-900 dark:hover:text-blue-400"
                >
                  {notif.isRead
                    ? isHindi
                      ? 'अपठित के रूप में मार्क करें'
                      : 'Mark as unread'
                    : isHindi
                    ? 'पढ़ा हुआ मार्क करें'
                    : 'Mark as read'}
                </button>

                {notif.relatedJobId && (
                  <div className="flex items-center gap-1 text-[11px] font-bold text-blue-900 dark:text-blue-400">
                    <span>{isHindi ? 'विवरण देखें' : 'View Job Details'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-14 px-4 text-center rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 mx-auto flex items-center justify-center text-slate-400">
            <Bell className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            {isHindi ? 'कोई सूचना उपलब्ध नहीं है' : 'No Notifications'}
          </h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            {isHindi
              ? 'नई सरकारी भर्ती, परिणाम व एडमिट कार्ड जारी होते ही आपको तुरंत अलर्ट प्राप्त होंगे।'
              : 'You will receive real-time alerts as soon as new recruitment notices, admit cards or results are released.'}
          </p>
        </div>
      )}
    </div>
  );
};
