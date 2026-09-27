import React from 'react';
import {
  Filter,
  AlertCircle,
  Sparkles,
  SlidersHorizontal,
  RefreshCw,
  Globe,
  CheckCircle2,
  ChevronDown,
  Layers,
  ArrowRight
} from 'lucide-react';
import { JobItem, Language, JobCategory, IndianState, QualificationLevel, WordPressApiConfig } from '../../types';
import { JobCard } from '../JobCard';
import { BannerAd } from '../BannerAd';
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
  isRefreshing: boolean;
  onRefresh: () => void;
  errorMessage?: string | null;
  onRetry: () => void;
  currentPage: number;
  totalPages: number;
  totalPostsCount: number;
  onLoadMore: () => void;
  wpConfig: WordPressApiConfig;
  isMockFallback?: boolean;
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
  isRefreshing,
  onRefresh,
  errorMessage,
  onRetry,
  currentPage,
  totalPages,
  totalPostsCount,
  onLoadMore,
  wpConfig,
  isMockFallback = false,
}) => {
  const isHindi = language === 'hi';

  const hasActiveFilters =
    selectedCategory !== 'all' || selectedState !== 'all' || selectedQualification !== 'all';

  return (
    <div className="p-3 sm:p-4 space-y-3 pb-24 text-xs">
      {/* 1. WordPress REST API Live Connection Status Pill */}
      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-[11px]">
        <div className="flex items-center gap-1.5 truncate">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              wpConfig.useCustomUrl && wpConfig.connectionStatus === 'connected'
                ? 'bg-emerald-500 animate-pulse'
                : 'bg-blue-600'
            }`}
          />
          <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
            {wpConfig.useCustomUrl
              ? `Connected: ${wpConfig.baseUrl}`
              : isHindi
              ? 'वर्डप्रेस REST API सिंक सक्रिय'
              : 'WordPress REST API Feed'}
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500 tabular-nums">
            {totalPostsCount} {isHindi ? 'भर्तियां' : 'posts'}
          </span>
        </div>

        <button
          onClick={onRefresh}
          disabled={isLoading || isRefreshing}
          className="p-1 rounded-md text-blue-900 dark:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition active:scale-95 shrink-0"
          title="Refresh Feed"
          aria-label="Refresh from API"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing || isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* 2. Error State Banner (if API error occurred) */}
      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-800 dark:text-red-200 flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">
                {isHindi ? 'API कनेक्शन त्रुटि' : 'WordPress API Connection Notice'}
              </strong>
              <p className="text-[11px] text-red-700 dark:text-red-300 mt-0.5">
                {errorMessage}
              </p>
            </div>
          </div>
          <button
            onClick={onRetry}
            className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-[11px] shrink-0 active:scale-95 transition"
          >
            {isHindi ? 'पुनः प्रयास करें' : 'Retry'}
          </button>
        </div>
      )}

      {/* 3. Quick Category Horizontal Filter Bar */}
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

      {/* 4. Active Filters Tag Row */}
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

      {/* 5. Skeleton Loading State */}
      {isLoading && jobs.length === 0 && (
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

      {/* 6. Jobs List with Embedded Native/Banner Ad */}
      {!isLoading && jobs.length > 0 && (
        <div className="space-y-3">
          {jobs.map((job, idx) => (
            <React.Fragment key={job.id}>
              <JobCard
                job={job}
                language={language}
                isFavorite={favorites.includes(job.id)}
                onToggleFavorite={onToggleFavorite}
                onOpenDetails={onOpenDetails}
                onShare={onShare}
                onCopyLink={onCopyLink}
              />

              {/* Native/Banner Ad inserted after 2nd item per app flow */}
              {idx === 1 && <BannerAd language={language} />}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* 7. Pagination Controls ("Load More Vacancies" / Page status) */}
      {jobs.length > 0 && totalPages > 1 && (
        <div className="pt-2 flex flex-col items-center gap-2">
          {currentPage < totalPages ? (
            <button
              onClick={onLoadMore}
              disabled={isLoading}
              className="w-full h-11 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-900/10 active:scale-95 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>
                {isHindi
                  ? `और भर्तियां लोड करें (पेज ${currentPage} / ${totalPages})`
                  : `Load More Vacancies (Page ${currentPage} of ${totalPages})`}
              </span>
            </button>
          ) : (
            <p className="text-center text-[11px] text-slate-400 py-2">
              {isHindi ? 'सभी उपलब्ध सरकारी भर्तियां प्रदर्शित की गईं' : 'You have viewed all available government posts'}
            </p>
          )}
        </div>
      )}

      {/* 8. Empty State */}
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
