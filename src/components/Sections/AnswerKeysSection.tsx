import React from 'react';
import { KeyRound, Download, ExternalLink, Calendar, CheckSquare, ChevronRight } from 'lucide-react';
import { JobItem, Language } from '../../types';

interface AnswerKeysSectionProps {
  jobs: JobItem[];
  language: Language;
  onOpenDetails: (job: JobItem) => void;
  onOpenPdf: (job: JobItem) => void;
}

export const AnswerKeysSection: React.FC<AnswerKeysSectionProps> = ({
  jobs,
  language,
  onOpenDetails,
  onOpenPdf,
}) => {
  const isHindi = language === 'hi';

  const answerKeyJobs = jobs.filter(
    (j) => j.type === 'answer-key' || j.status === 'answer-key-out' || j.dates.answerKeyDate
  );

  return (
    <div className="p-3 sm:p-4 space-y-3 pb-24">
      {/* Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900 to-violet-900 text-white shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <KeyRound className="w-5 h-5 text-purple-300" />
          <h2 className="text-sm font-bold tracking-tight">
            {isHindi ? 'आधिकारिक उत्तर कुंजी (Answer Keys)' : 'Official Answer Keys & OMR Sheets'}
          </h2>
        </div>
        <p className="text-xs text-purple-100">
          {isHindi
            ? 'परीक्षा की आधिकारिक उत्तर कुंजी से अपने उत्तरों का मिलान करें एवं आपत्ति दर्ज करें।'
            : 'Match your candidate responses with official answer keys & raise challenges.'}
        </p>
      </div>

      <div className="space-y-3">
        {answerKeyJobs.map((job) => (
          <div
            key={job.id}
            className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-purple-900 dark:text-purple-300">
                {isHindi ? job.departmentHi : job.department}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {isHindi ? 'जारी तिथि:' : 'Released:'} {job.dates.answerKeyDate || 'Live'}
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
              {isHindi ? job.titleHi : job.title}
            </h3>

            {/* Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>{job.advtNumber}</span>
              <span aria-hidden="true">·</span>
              <span className="text-purple-700 dark:text-purple-400 font-semibold">
                {job.answerKeyStatus || 'Official Key Available'}
              </span>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2">
              <button
                onClick={() => onOpenPdf(job)}
                className="px-3 py-1.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-white text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isHindi ? 'आंसर की PDF देखें' : 'View Answer Key PDF'}</span>
              </button>

              <button
                onClick={() => onOpenDetails(job)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 active:scale-95 transition"
              >
                {isHindi ? 'आपत्ति दिशानिर्देश' : 'Raise Objection'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
