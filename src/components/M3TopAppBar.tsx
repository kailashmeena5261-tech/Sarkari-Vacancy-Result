import React from 'react';
import { Search, Bell, Moon, Sun, Smartphone, Monitor, ArrowLeft, X } from 'lucide-react';
import { SectionType, Language } from '../types';

interface M3TopAppBarProps {
  currentSection: SectionType;
  onNavigate: (section: SectionType) => void;
  language: Language;
  onToggleLanguage: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
  unreadCount: number;
  searchOpen: boolean;
  onToggleSearch: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const M3TopAppBar: React.FC<M3TopAppBarProps> = ({
  currentSection,
  onNavigate,
  language,
  onToggleLanguage,
  darkMode,
  onToggleDarkMode,
  isPhoneFrame,
  onTogglePhoneFrame,
  unreadCount,
  searchOpen,
  onToggleSearch,
  searchQuery,
  onSearchChange,
}) => {
  const isHindi = language === 'hi';

  const getSectionTitle = () => {
    switch (currentSection) {
      case 'jobs':
        return isHindi ? 'सरकारी वैकेंसी' : 'Latest Jobs';
      case 'search':
        return isHindi ? 'खोज व फिल्टर' : 'Search & Filters';
      case 'results':
        return isHindi ? 'परीक्षा परिणाम' : 'Exam Results';
      case 'admit-cards':
        return isHindi ? 'प्रवेश पत्र' : 'Admit Cards';
      case 'answer-keys':
        return isHindi ? 'उत्तर कुंजी' : 'Answer Keys';
      case 'admissions':
        return isHindi ? 'प्रवेश प्रक्रिया' : 'Admissions';
      case 'study-material':
        return isHindi ? 'अध्ययन सामग्री' : 'Study Material';
      case 'favorites':
        return isHindi ? 'पसंदीदा भर्तियां' : 'Saved Vacancies';
      case 'notifications':
        return isHindi ? 'सूचनाएं' : 'Notifications';
      case 'settings':
        return isHindi ? 'सेटिंग्स' : 'App Settings';
      case 'kotlin-code':
        return 'Jetpack Compose Code';
      default:
        return 'Sarkari Vacancy';
    }
  };

  const isMainTab = ['jobs', 'results', 'admit-cards', 'admissions'].includes(currentSection);

  return (
    <header className="sticky top-0 z-30 bg-blue-900 dark:bg-slate-900 text-white shadow-md transition-colors">
      {/* Primary Top Bar Row */}
      <div className="h-14 px-3 flex items-center justify-between gap-2 max-w-5xl mx-auto">
        {/* Left: Back or Brand Icon */}
        <div className="flex items-center gap-2 min-w-0">
          {!isMainTab ? (
            <button
              onClick={() => onNavigate('jobs')}
              className="p-2 -ml-1 rounded-full hover:bg-white/10 active:scale-95 transition"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
              <span className="text-amber-400 font-bold text-xs tracking-wider">SV</span>
            </div>
          )}

          {/* Single element title per design constitution */}
          <div className="min-w-0 flex flex-col justify-center">
            <h1 className="text-sm font-semibold tracking-tight text-white truncate leading-tight">
              {isMainTab ? 'Sarkari Vacancy Result' : getSectionTitle()}
            </h1>
            <p className="text-[10px] text-blue-200 dark:text-slate-400 truncate leading-none">
              {isHindi ? 'भारत का भरोसेमंद सरकारी भर्ती पोर्टल' : 'Official Recruitment & Exam Portal'}
            </p>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onToggleSearch}
            className={`p-2 rounded-full transition active:scale-95 ${
              searchOpen ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-blue-100'
            }`}
            aria-label="Search jobs"
            title="Search"
          >
            {searchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </button>

          {/* Language Toggle */}
          <button
            onClick={onToggleLanguage}
            className="px-2 py-1 rounded-md text-xs font-semibold bg-white/10 hover:bg-white/20 text-amber-300 transition active:scale-95"
            aria-label="Toggle language"
            title="Hindi / English"
          >
            {language === 'en' ? 'हिन्दी' : 'ENG'}
          </button>

          {/* Notifications Bell */}
          <button
            onClick={() => onNavigate('notifications')}
            className={`p-2 rounded-full hover:bg-white/10 relative transition active:scale-95 ${
              currentSection === 'notifications' ? 'bg-white/20' : 'text-blue-100'
            }`}
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            )}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-full hover:bg-white/10 text-blue-100 transition active:scale-95"
            aria-label="Toggle theme"
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Desktop Frame Switcher (Hidden on narrow mobile viewports) */}
          <button
            onClick={onTogglePhoneFrame}
            className="hidden sm:flex p-2 rounded-full hover:bg-white/10 text-blue-100 transition active:scale-95"
            title={isPhoneFrame ? 'Expand Full View' : 'Phone Frame View'}
            aria-label="Toggle frame"
          >
            {isPhoneFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Input Bar */}
      {searchOpen && (
        <div className="px-3 pb-2.5 pt-0.5 max-w-5xl mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={isHindi ? 'भर्ती, पद, विभाग या राज्य खोजें (e.g. SSC, BPSC)...' : 'Search by job title, department, post, or state...'}
              className="w-full h-10 pl-9 pr-9 text-xs rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-400"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
