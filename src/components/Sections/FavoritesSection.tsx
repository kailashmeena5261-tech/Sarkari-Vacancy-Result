import React from 'react';
import { Bookmark, Trash2, ArrowRight } from 'lucide-react';
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
}) => {
  const isHindi = language === 'hi';
  const favoriteJobs = jobs.filter((j) => favorites.includes(j.id));

  return (
    <div className="p-3 sm:p-4 space-y-3 pb-24">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            {isHindi ? 'सहेजी गई भर्तियां' : 'Saved Bookmarks'}
          </h2>
          <p className="text-xs text-slate-500">
            {favoriteJobs.length} {isHindi ? 'भर्तियां ऑफलाइन सुरक्षित' : 'vacancies saved offline'}
          </p>
        </div>

        {favoriteJobs.length > 0 && (
          <button
            onClick={onClearAllFavorites}
            className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 p-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isHindi ? 'सभी हटाएं' : 'Clear All'}</span>
          </button>
        )}
      </div>

      {/* Favorites List */}
      {favoriteJobs.length > 0 ? (
        <div className="space-y-3">
          {favoriteJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              language={language}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onOpenDetails={onOpenDetails}
              onShare={onShare}
              onCopyLink={onCopyLink}
            />
          ))}
        </div>
      ) : (
        <div className="py-14 px-4 text-center rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-500 mx-auto flex items-center justify-center">
            <Bookmark className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            {isHindi ? 'कोई पसंदीदा भर्ती नहीं है' : 'No Bookmarks Yet'}
          </h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            {isHindi
              ? 'महत्वपूर्ण भर्तियों को बुकमार्क करें ताकि अंतिम तिथि से पहले आवेदन याद रहे।'
              : 'Save important recruitment notices to track their application deadlines easily.'}
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
