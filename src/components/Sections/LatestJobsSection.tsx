import React from 'react';
import { Filter, AlertCircle, Sparkles, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { JobItem, Language, JobCategory, IndianState, QualificationLevel } from '../../types';
import { JobCard } from '../JobCard';
import { JOB_CATEGORIES } from '../../data/mockData';

interface LatestJobsSectionProps {
  jobs: JobItem[];
  language: Language;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenDetails: (job: JobItem) => void;
  onShare: (job: JobItem) => void;
  onCopyLink: (job: JobItem) => void;
  selectedCategory: JobCategory;
  onSelectCategory: (cat: JobCategory) => void;
  selectedState: IndianState;
  selectedQualification: QualificationLevel;
  onOpenFilterSheet: () => void;
  onResetFilters: () => void;
  isLoading: boolean;
}

export const LatestJobsSection: React.FC<LatestJobsSectionProps> = ({
  jobs,
  language,
  favorites,
  onToggleFavorite,
  onOpenDetails,
  onShare,
  onCopyLink,
  selectedCategory,
  onSelectCategory,
  selectedState,
  selectedQualification,
  onOpenFilterSheet,
  onResetFilters,
  isLoading,
}) => {
  const isHindi = language === 'hi';

  const hasActiveFilters =
    selectedCategory !== 'all' || selectedState !== 'all' || selectedQualification !== 'all';

  return (
    <div className="p-3 sm:p-4 space-y-3 pb-24">
      {/* 1. Quick Category Filter Bar (Functional Buttons) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {/* Filter Sheet Trigger */}
        <button
          onClick={onOpenFilterSheet}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold shrink-0 transition-colors ${
            hasActiveFilters
              ? 'border-blue-900 bg-blue-900 text-white'
              : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
          aria-label="Open filter options"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{isHindi ? 'फिल्टर' : 'Filter'}</span>
          {hasActiveFilters && (
            <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold flex items-center justify-center">
              !
            </span>
          )}
        </button>

        {/* Category Buttons */}
        {JOB_CATEGORIES.slice(0, 6).map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as JobCategory)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
                isSelected
                  ? 'border-blue-900 dark:border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-300 font-semibold'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              {isHindi ? cat.labelHi : cat.labelEn}
            </button>
          );
        })}
      </div>

      {/* 2. Active Filter Notice (if any) */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between px-3 py-2 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-xs text-blue-900 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/60">
          <div className="flex items-center gap-1.5 truncate">
            <span>
              {selectedState !== 'all' && `${selectedState} · `}
              {selectedCategory !== 'all' && `${selectedCategory.toUpperCase()} · `}
              {selectedQualification !== 'all' && `${selectedQualification.toUpperCase()} · `}
              {jobs.length} {isHindi ? 'भर्तियां' : 'posts'}
            </span>
          </div>
          <button
            onClick={onResetFilters}
            className="font-bold underline text-blue-800 dark:text-blue-300 shrink-0 text-[11px]"
          >
            {isHindi ? 'हटाएं' : 'Clear'}
          </button>
        </div>
      )}

      {/* 3. Urgent Alert Banner */}
      <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 text-xs">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
        <p className="text-amber-900 dark:text-amber-200 font-medium truncate">
          <strong>{isHindi ? 'सूचना:' : 'Alert:'}</strong>{' '}
          {isHindi
            ? 'रेलवे एनटीपीसी एवं एसएससी सीजीएल आवेदन की अंतिम तिथि निकट है। तुरंत फॉर्म भरें।'
            : 'RRB NTPC 11,558 Posts & SSC CGL 2026 application deadlines closing soon.'}
        </p>
      </div>

      {/* 4. Skeleton Loading State */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 animate-pulse space-y-3"
            >
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
              <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-4/5" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* 5. Job Cards List */}
      {!isLoading && jobs.length > 0 && (
        <div className="space-y-3">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              language={language}
              isFavorite={favorites.includes(job.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenDetails={onOpenDetails}
              onShare={onShare}
              onCopyLink={onCopyLink}
            />
          ))}
        </div>
      )}

      {/* 6. Empty State */}
      {!isLoading && jobs.length === 0 && (
        <div className="py-12 px-4 text-center rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 mx-auto flex items-center justify-center text-slate-400">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {isHindi ? 'कोई भर्ती नहीं मिली' : 'No Vacancies Found'}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            {isHindi
              ? 'आपके द्वारा चुने गए फिल्टर या खोज शब्द से मेल खाती कोई भर्ती उपलब्ध नहीं है।'
              : 'Try clearing your category, qualification, or state filters to see more results.'}
          </p>
          <button
            onClick={onResetFilters}
            className="px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-semibold active:scale-95 transition"
          >
            {isHindi ? 'सभी फिल्टर हटाएं' : 'Reset All Filters'}
          </button>
        </div>
      )}
    </div>
  );
};
