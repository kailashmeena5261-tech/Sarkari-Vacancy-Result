import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  SlidersHorizontal,
  Calendar,
  Building2,
  GraduationCap,
  MapPin,
  ArrowUpDown,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Clock,
  Briefcase
} from 'lucide-react';
import { JobItem, Language, JobCategory, IndianState, QualificationLevel } from '../../types';
import { JobCard } from '../JobCard';
import { JOB_CATEGORIES, INDIAN_STATES, QUALIFICATIONS } from '../../data/mockData';

interface SearchSectionProps {
  jobs: JobItem[];
  language: Language;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenDetails: (job: JobItem) => void;
  onShare: (job: JobItem) => void;
  onCopyLink: (job: JobItem) => void;
  initialQuery?: string;
}

const POPULAR_SEARCH_KEYWORDS = [
  'SSC CGL',
  'RRB NTPC',
  'UP Police',
  '10th Pass',
  '12th Pass',
  'Graduate',
  'BPSC',
  'Railway',
  'Banking PO',
  'Rajasthan',
  'October 2026',
];

export const SearchSection: React.FC<SearchSectionProps> = ({
  jobs,
  language,
  favorites,
  onToggleFavorite,
  onOpenDetails,
  onShare,
  onCopyLink,
  initialQuery = '',
}) => {
  const isHindi = language === 'hi';

  // Search Criteria States
  const [query, setQuery] = useState(initialQuery);
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedQualification, setSelectedQualification] = useState<QualificationLevel>('all');
  const [selectedState, setSelectedState] = useState<IndianState>('all');
  const [lastDateFilter, setLastDateFilter] = useState<'all' | '3-days' | '7-days' | '15-days' | 'month'>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'closing-soon' | 'vacancies' | 'title-asc'>('latest');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Extract unique departments for department filter
  const departmentsList = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => {
      if (j.department) set.add(j.department);
    });
    return Array.from(set);
  }, [jobs]);

  // Fast Filtering Engine
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();

    return jobs.filter((job) => {
      // 1. Keyword search (Title, Dept, Qualification, State, Advt, Last date text)
      if (q) {
        const matchesTitle =
          job.title.toLowerCase().includes(q) || job.titleHi.toLowerCase().includes(q);
        const matchesDept =
          job.department.toLowerCase().includes(q) || job.departmentHi.toLowerCase().includes(q);
        const matchesQual = job.qualification.toLowerCase().includes(q);
        const matchesState = job.state.toLowerCase().includes(q);
        const matchesAdvt = job.advtNumber.toLowerCase().includes(q);
        const matchesDate =
          (job.dates.applicationEnd && job.dates.applicationEnd.toLowerCase().includes(q)) ||
          (job.dates.examDate && job.dates.examDate.toLowerCase().includes(q));

        if (!matchesTitle && !matchesDept && !matchesQual && !matchesState && !matchesAdvt && !matchesDate) {
          return false;
        }
      }

      // 2. Department filter
      if (selectedDept !== 'all' && job.department !== selectedDept) {
        return false;
      }

      // 3. Qualification filter
      if (selectedQualification !== 'all' && job.qualification !== selectedQualification) {
        return false;
      }

      // 4. State filter
      if (selectedState !== 'all' && job.state !== 'All India' && job.state !== selectedState) {
        return false;
      }

      // 5. Last Date Urgency filter
      if (lastDateFilter !== 'all') {
        if (lastDateFilter === '3-days') {
          // Jobs tagged closing soon or ending soon
          if (job.status !== 'closing-soon' && !job.dates.applicationEnd?.includes('Oct 2026')) {
            return false;
          }
        } else if (lastDateFilter === '7-days') {
          if (job.status !== 'closing-soon' && !job.dates.applicationEnd) {
            return false;
          }
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'vacancies') {
        return b.totalVacancies - a.totalVacancies;
      }
      if (sortBy === 'closing-soon') {
        return (a.status === 'closing-soon' ? -1 : 1);
      }
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [jobs, query, selectedDept, selectedQualification, selectedState, lastDateFilter, sortBy]);

  const hasActiveFilters =
    query.trim() !== '' ||
    selectedDept !== 'all' ||
    selectedQualification !== 'all' ||
    selectedState !== 'all' ||
    lastDateFilter !== 'all';

  const handleReset = () => {
    setQuery('');
    setSelectedDept('all');
    setSelectedQualification('all');
    setSelectedState('all');
    setLastDateFilter('all');
    setSortBy('latest');
  };

  return (
    <div className="p-3 sm:p-4 space-y-3 pb-24 text-xs">
      {/* 1. Master Search Bar */}
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-blue-900 dark:text-blue-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            isHindi
              ? 'पद, विभाग, योग्यता (10th/12th/स्नातक), राज्य या अंतिम तिथि खोजें...'
              : 'Search job title, department, qualification, state or last date...'
          }
          className="w-full h-12 pl-10 pr-20 text-xs sm:text-sm font-medium rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-slate-200 dark:border-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500"
          autoFocus
        />
        <div className="absolute right-2 flex items-center gap-1">
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition ${
              showAdvancedFilters || hasActiveFilters
                ? 'bg-blue-900 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
            title="Toggle filters"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Popular Quick Search Keywords */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          {isHindi ? 'सुझाव:' : 'Popular:'}
        </span>
        {POPULAR_SEARCH_KEYWORDS.map((kw) => (
          <button
            key={kw}
            onClick={() => setQuery(kw)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium whitespace-nowrap shrink-0 transition-all ${
              query.toLowerCase() === kw.toLowerCase()
                ? 'border-blue-900 bg-blue-900 text-white font-semibold'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
            }`}
          >
            {kw}
          </button>
        ))}
      </div>

      {/* 3. Advanced Multi-Criteria Filter Accordion */}
      {showAdvancedFilters && (
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-2">
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              {isHindi ? 'विस्तृत खोज फिल्टर' : 'Multi-Criteria Search Filters'}
            </span>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-blue-900 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{isHindi ? 'रीसेट करें' : 'Reset'}</span>
            </button>
          </div>

          {/* Department Selection */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-blue-800 dark:text-blue-400" />
              <span>{isHindi ? 'विभाग द्वारा खोजें' : 'By Department / Commission:'}</span>
            </label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium focus:outline-none"
            >
              <option value="all">{isHindi ? 'सभी विभाग (All Commissions)' : 'All Departments'}</option>
              {departmentsList.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Qualification Selection */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-blue-800 dark:text-blue-400" />
              <span>{isHindi ? 'शैक्षणिक योग्यता द्वारा खोजें' : 'By Qualification:'}</span>
            </label>
            <select
              value={selectedQualification}
              onChange={(e) => setSelectedQualification(e.target.value as QualificationLevel)}
              className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium focus:outline-none"
            >
              {QUALIFICATIONS.map((q) => (
                <option key={q.id} value={q.id}>
                  {isHindi ? q.labelHi : q.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* State / Region Selection */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-800 dark:text-blue-400" />
              <span>{isHindi ? 'राज्य / क्षेत्र द्वारा खोजें' : 'By State / Location:'}</span>
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value as IndianState)}
              className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium focus:outline-none"
            >
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Last Date Urgency */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>{isHindi ? 'अंतिम तिथि निकटता' : 'By Last Date Urgency:'}</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'all', labelEn: 'Any Date', labelHi: 'सभी तिथियां' },
                { id: '3-days', labelEn: 'Closing Soon', labelHi: 'अंतिम तिथि निकट' },
                { id: '7-days', labelEn: 'October 2026', labelHi: 'अक्टूबर 2026' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setLastDateFilter(opt.id as any)}
                  className={`py-1.5 px-2 rounded-lg border text-center text-[11px] font-medium transition ${
                    lastDateFilter === opt.id
                      ? 'border-blue-900 bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-300 font-bold'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {isHindi ? opt.labelHi : opt.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Sorting Row */}
          <div className="space-y-1 pt-1">
            <label className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-800 dark:text-blue-400" />
              <span>{isHindi ? 'क्रमबद्धता (Sort Results)' : 'Sort By:'}</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'latest', labelEn: 'Newest', labelHi: 'नवीनतम' },
                { id: 'vacancies', labelEn: 'Max Posts', labelHi: 'अधिकतम पद' },
                { id: 'closing-soon', labelEn: 'Closing Soon', labelHi: 'अंतिम तिथि' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSortBy(s.id as any)}
                  className={`py-1.5 px-2 rounded-lg border text-center text-[11px] font-medium transition ${
                    sortBy === s.id
                      ? 'border-blue-900 bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-300 font-bold'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {isHindi ? s.labelHi : s.labelEn}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Results Header & Count */}
      <div className="flex items-center justify-between px-1 text-xs">
        <span className="font-semibold text-slate-600 dark:text-slate-400">
          <strong className="text-slate-900 dark:text-white tabular-nums">{searchResults.length}</strong>{' '}
          {isHindi ? 'भर्तियां परिणाम में उपलब्ध' : 'matching vacancies found'}
        </span>

        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-[11px] font-bold text-blue-900 dark:text-blue-400 hover:underline"
          >
            {isHindi ? 'सभी फिल्टर हटाएं' : 'Clear Search'}
          </button>
        )}
      </div>

      {/* 5. Results Cards */}
      {searchResults.length > 0 ? (
        <div className="space-y-3">
          {searchResults.map((job) => (
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
      ) : (
        <div className="py-12 px-4 text-center rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 mx-auto flex items-center justify-center text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {isHindi ? 'कोई मेल खाती भर्ती नहीं मिली' : 'No Results Match Your Search'}
          </h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            {isHindi
              ? 'कृपया किसी अन्य कीवर्ड (जैसे "10th", "Railway", "Police") या कम फिल्टर के साथ प्रयास करें।'
              : 'Try searching with simpler terms like "Graduate", "SSC", "Delhi", or reset criteria.'}
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-semibold active:scale-95 transition"
          >
            {isHindi ? 'खोज रीसेट करें' : 'Reset Search'}
          </button>
        </div>
      )}
    </div>
  );
};
