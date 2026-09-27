import React, { useState } from 'react';
import {
  Bookmark,
  Trash2,
  ArrowRight,
  Search,
  ExternalLink,
  FileText,
  Share2,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { JobItem, Language } from '../../types';
import { JobCard } from '../JobCard';

interface FavoritesSectionProps {
  jobs: JobItem[];
  favorites: string[];
  language: Language;
  onToggleFavorite: (id: string) => void;
  onClearAllFavorites: () => void;
  onOpenDetails: (job: JobItem) => void;
  onShare: (job: JobItem) => void;
  onCopyLink: (job: JobItem) => void;
  onNavigateToJobs: () => void;
  onOpenPdf: (job: JobItem) => void;
  onApplyOnline: (job: JobItem) => void;
}

export const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  jobs,
  favorites,
  language,
  onToggleFavorite,
  onClearAllFavorites,
  onOpenDetails,
  onShare,
  onCopyLink,
  onNavigateToJobs,
  onOpenPdf,
  onApplyOnline,
}) => {
  const isHindi = language === 'hi';
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);

  const favoriteJobs = jobs.filter((j) => favorites.includes(j.id));

  const filteredFavorites = favoriteJobs.filter((job) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(q) ||
      job.titleHi.toLowerCase().includes(q) ||
      job.department.toLowerCase().includes(q) ||
      job.state.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-3 sm:p-4 space-y-3 pb-24 text-xs">
      {/* Top Header Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <Bookmark className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight">
              {isHindi ? 'सहेजी गई पसंदीदा भर्तियां' : 'Saved Government Jobs'}
            </h2>
            <p className="text-[11px] text-blue-200">
              <strong className="text-amber-300 tabular-nums">{favoriteJobs.length}</strong>{' '}
              {isHindi ? 'भर्तियां ऑफलाइन सुरक्षित हैं' : 'vacancies saved locally on your device'}
            </p>
          </div>
        </div>

        {favoriteJobs.length > 0 && (
          <button
            onClick={() => setConfirmClear(true)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-red-200 transition active:scale-95"
            title="Clear all bookmarks"
            aria-label="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Confirmation Dialog for Clear All */}
      {confirmClear && (
        <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-red-800 dark:text-red-200 text-xs">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{isHindi ? 'क्या आप सभी सहेजी गई भर्तियां हटाना चाहते हैं?' : 'Remove all saved vacancies?'}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                onClearAllFavorites();
                setConfirmClear(false);
              }}
              className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px]"
            >
              {isHindi ? 'हटाएं' : 'Confirm'}
            </button>
            <button
              onClick={() => setConfirmClear(false)}
              className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px]"
            >
              {isHindi ? 'रद्द' : 'Cancel'}
            </button>
          </div>
        </div>
      )}

      {/* Quick Search within Saved Jobs */}
      {favoriteJobs.length > 2 && (
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isHindi ? 'सहेजी गई भर्तियों में खोजें...' : 'Filter saved jobs...'}
            className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-900"
          />
        </div>
      )}

      {/* Favorites List */}
      {filteredFavorites.length > 0 ? (
        <div className="space-y-3">
          {filteredFavorites.map((job) => (
            <div key={job.id} className="relative">
              <JobCard
                job={job}
                language={language}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
                onOpenDetails={onOpenDetails}
                onShare={onShare}
                onCopyLink={onCopyLink}
              />

              {/* Quick Direct Actions Strip */}
              <div className="mt-1 px-2 py-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-b-xl flex items-center justify-between text-[11px] -mt-2 border-x border-b border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => onOpenPdf(job)}
                  className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-blue-900 font-medium"
                >
                  <FileText className="w-3 h-3" />
                  <span>{isHindi ? 'नोटिफिकेशन' : 'Notice PDF'}</span>
                </button>

                <button
                  onClick={() => onApplyOnline(job)}
                  className="flex items-center gap-1 text-blue-900 dark:text-blue-300 font-bold hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>{isHindi ? 'सीधे आवेदन करें' : 'Apply Online'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : favoriteJobs.length > 0 ? (
        <div className="py-8 text-center text-slate-500">
          <p>{isHindi ? 'खोज के अनुसार कोई सहेजी गई भर्ती नहीं मिली।' : 'No saved jobs match your search.'}</p>
        </div>
      ) : (
        <div className="py-14 px-4 text-center rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-500 mx-auto flex items-center justify-center">
            <Bookmark className="w-7 h-7" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            {isHindi ? 'कोई पसंदीदा भर्ती सहेजी नहीं गई है' : 'No Bookmarks Saved Yet'}
          </h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            {isHindi
              ? 'किसी भी भर्ती कार्ड पर बने बुकमार्क आइकन (🔖) पर क्लिक करके उसे यहां सहेजें और ऑफलाइन भी देखें।'
              : 'Tap the bookmark icon on any recruitment card to save it for quick access, deadline reminders & offline reading.'}
          </p>
          <button
            onClick={onNavigateToJobs}
            className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 active:scale-95 transition"
          >
            <span>{isHindi ? 'लेटेस्ट जॉब्स देखें' : 'Browse Latest Jobs'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
