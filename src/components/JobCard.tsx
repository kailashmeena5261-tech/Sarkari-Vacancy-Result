import React from 'react';
import { Bookmark, Share2, Copy, ExternalLink, Calendar, MapPin, Users, GraduationCap, ChevronRight, FileCheck } from 'lucide-react';
import { JobItem, Language } from '../types';

interface JobCardProps {
  job: JobItem;
  language: Language;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenDetails: (job: JobItem) => void;
  onShare: (job: JobItem) => void;
  onCopyLink: (job: JobItem) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  language,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
  onShare,
  onCopyLink,
}) => {
  const isHindi = language === 'hi';

  const getStatusText = () => {
    switch (job.status) {
      case 'closing-soon':
        return isHindi ? 'अंतिम तिथि निकट' : 'Closing Soon';
      case 'result-declared':
        return isHindi ? 'परिणाम घोषित' : 'Result Declared';
      case 'admit-card-live':
        return isHindi ? 'एडमिट कार्ड जारी' : 'Admit Card Live';
      case 'answer-key-out':
        return isHindi ? 'उत्तर कुंजी जारी' : 'Answer Key Out';
      default:
        return isHindi ? 'आवेदन जारी' : 'Applications Open';
    }
  };

  const getStatusColor = () => {
    switch (job.status) {
      case 'closing-soon':
        return 'text-amber-700 dark:text-amber-400 font-semibold';
      case 'result-declared':
        return 'text-emerald-700 dark:text-emerald-400 font-semibold';
      case 'admit-card-live':
        return 'text-blue-700 dark:text-blue-400 font-semibold';
      case 'answer-key-out':
        return 'text-purple-700 dark:text-purple-400 font-semibold';
      default:
        return 'text-slate-600 dark:text-slate-400';
    }
  };

  return (
    <article
      onClick={() => onOpenDetails(job)}
      className="group relative bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden active:scale-[0.99]"
    >
      {/* 1. Quiet One-Line Kicker (Anti-Pill Compliant) */}
      <div className="flex items-center justify-between gap-2 mb-1.5 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5 truncate">
          <span className="font-semibold text-blue-900 dark:text-blue-300 truncate">
            {isHindi ? job.departmentHi : job.department}
          </span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
          <span className="text-[11px] text-slate-500 truncate">{job.advtNumber}</span>
        </div>

        {/* Favorite Icon Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(job.id);
          }}
          className="p-1.5 -mr-1 rounded-full text-slate-400 hover:text-amber-500 active:scale-95 transition-colors shrink-0"
          aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
        </button>
      </div>

      {/* 2. Main Title */}
      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug tracking-tight group-hover:text-blue-900 dark:group-hover:text-blue-300 transition-colors">
        {isHindi ? job.titleHi : job.title}
      </h3>

      {/* 3. Unboxed Typographic Metadata with Clean Separators */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
        {job.totalVacancies > 0 && (
          <span className="flex items-center gap-1 tabular-nums font-semibold text-slate-900 dark:text-slate-100">
            <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            {job.totalVacancies.toLocaleString('en-IN')} {isHindi ? 'पद' : 'Vacancies'}
          </span>
        )}

        <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>

        <span className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{job.state}</span>
        </span>

        <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>

        <span className="flex items-center gap-1">
          <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="capitalize">{job.qualification.replace('-', ' ')}</span>
        </span>
      </div>

      {/* 4. Dates & Key Status */}
      <div className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-500 dark:text-slate-400">
            {isHindi ? 'अंतिम तिथि:' : 'Last Date:'}
          </span>
          <span className="font-semibold tabular-nums text-slate-800 dark:text-slate-200">
            {job.dates.applicationEnd || job.dates.examDate || 'Refer Notice'}
          </span>
        </div>

        <div className={`flex items-center gap-1 text-[11px] ${getStatusColor()}`}>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-current" />
          <span>{getStatusText()}</span>
        </div>
      </div>

      {/* 5. Interactive Action Strip */}
      <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onShare(job);
            }}
            className="p-1.5 text-slate-500 hover:text-blue-800 dark:hover:text-blue-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/60 transition"
            title="Share"
            aria-label="Share"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCopyLink(job);
            }}
            className="p-1.5 text-slate-500 hover:text-blue-800 dark:hover:text-blue-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/60 transition"
            title="Copy Details"
            aria-label="Copy Details"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-blue-900 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
          <span>{isHindi ? 'विवरण एवं आवेदन' : 'Details & Apply'}</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </article>
  );
};
