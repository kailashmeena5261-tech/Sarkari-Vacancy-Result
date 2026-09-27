import React, { useState } from 'react';
import { Award, Search, Download, ExternalLink, CheckCircle2, ChevronRight, FileCheck, X } from 'lucide-react';
import { JobItem, Language } from '../../types';

interface ResultsSectionProps {
  jobs: JobItem[];
  language: Language;
  onOpenDetails: (job: JobItem) => void;
  onShare: (job: JobItem) => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  jobs,
  language,
  onOpenDetails,
  onShare,
}) => {
  const isHindi = language === 'hi';
  const [rollModalOpen, setRollModalOpen] = useState(false);
  const [activeResultJob, setActiveResultJob] = useState<JobItem | null>(null);
  const [rollNumber, setRollNumber] = useState('');
  const [resultFound, setResultFound] = useState<boolean | null>(null);

  // Filter items that have results
  const resultItems = jobs.filter(
    (j) => j.type === 'result' || j.status === 'result-declared' || j.dates.resultDate
  );

  const handleCheckRoll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollNumber.trim()) return;
    // Simulate lookup
    setResultFound(true);
  };

  const openRollChecker = (job: JobItem) => {
    setActiveResultJob(job);
    setRollNumber('');
    setResultFound(null);
    setRollModalOpen(true);
  };

  return (
    <div className="p-3 sm:p-4 space-y-3 pb-24">
      {/* Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <Award className="w-5 h-5 text-emerald-300" />
          <h2 className="text-sm font-bold tracking-tight">
            {isHindi ? 'सरकारी परीक्षा परिणाम' : 'Government Exam Results'}
          </h2>
        </div>
        <p className="text-xs text-emerald-100">
          {isHindi
            ? 'नवीनतम घोषित परीक्षा परिणाम, मेरिट सूची एवं कटऑफ अंक सीधे देखें व डाउनलोड करें।'
            : 'Access official written exam scorecards, cut-off marks and merit lists.'}
        </p>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {resultItems.map((job) => (
          <div
            key={job.id}
            className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                {isHindi ? job.departmentHi : job.department}
              </span>
              <span className="text-[11px] text-slate-500">{job.dates.resultDate || 'Recently Declared'}</span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
              {isHindi ? job.titleHi : job.title}
            </h3>

            {/* Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>{job.advtNumber}</span>
              <span aria-hidden="true">·</span>
              <span>{job.state}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                {job.resultStatus || 'Scorecard Available'}
              </span>
            </div>

            {/* Action buttons */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2">
              <button
                onClick={() => openRollChecker(job)}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold flex items-center gap-1 active:scale-95 transition"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{isHindi ? 'रोल नंबर से खोजें' : 'Check by Roll No'}</span>
              </button>

              <button
                onClick={() => onOpenDetails(job)}
                className="px-3 py-1.5 rounded-xl bg-blue-900 text-white text-xs font-semibold flex items-center gap-1 active:scale-95 transition"
              >
                <span>{isHindi ? 'कटऑफ व विवरण' : 'View Cutoff'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Simulated Roll Number Verification Modal */}
      {rollModalOpen && activeResultJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {isHindi ? 'रिजल्ट सत्यापन' : 'Check Exam Result'}
              </h3>
              <button
                onClick={() => setRollModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              {isHindi ? activeResultJob.titleHi : activeResultJob.title}
            </p>

            <form onSubmit={handleCheckRoll} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  {isHindi ? 'रोल नंबर या रजिस्ट्रेशन नंबर दर्ज करें:' : 'Enter Roll Number / Registration No:'}
                </label>
                <input
                  type="text"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="e.g. 240810928"
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full h-10 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold active:scale-95 transition"
              >
                {isHindi ? 'परिणाम देखें' : 'Search Result'}
              </button>
            </form>

            {resultFound && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isHindi ? 'बधाई! आप चयनित हैं' : 'Congratulations! Qualified for Next Stage'}</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Roll No:</span>
                    <strong className="tabular-nums">{rollNumber}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Marks Obtained:</span>
                    <strong className="text-emerald-700 tabular-nums">214.50 / 300</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <strong className="text-emerald-700">Eligible for DV / PST</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
