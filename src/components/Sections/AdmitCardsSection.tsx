import React, { useState } from 'react';
import { FileText, Calendar, Download, AlertTriangle, ExternalLink, CheckCircle2, X } from 'lucide-react';
import { JobItem, Language } from '../../types';

interface AdmitCardsSectionProps {
  jobs: JobItem[];
  language: Language;
  onOpenDetails: (job: JobItem) => void;
  onOpenPdf: (job: JobItem) => void;
}

export const AdmitCardsSection: React.FC<AdmitCardsSectionProps> = ({
  jobs,
  language,
  onOpenDetails,
  onOpenPdf,
}) => {
  const isHindi = language === 'hi';
  const [downloadModalJob, setDownloadModalJob] = useState<JobItem | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const admitCardJobs = jobs.filter(
    (j) => j.type === 'admit-card' || j.status === 'admit-card-live' || j.dates.admitCardDate
  );

  const handleDownloadTicket = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      setDownloadModalJob(null);
    }, 2000);
  };

  return (
    <div className="p-3 sm:p-4 space-y-3 pb-24">
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="w-5 h-5 text-blue-300" />
          <h2 className="text-sm font-bold tracking-tight">
            {isHindi ? 'प्रवेश पत्र / हॉल टिकट डाउनलोड' : 'Admit Cards & Exam City Slip'}
          </h2>
        </div>
        <p className="text-xs text-blue-100">
          {isHindi
            ? 'परीक्षा तिथि से 4-7 दिन पूर्व आधिकारिक प्रवेश पत्र एवं परीक्षा शहर सूचना डाउनलोड करें।'
            : 'Download active online examination call letters, reporting times & test center details.'}
        </p>
      </div>

      {/* Admit Cards List */}
      <div className="space-y-3">
        {admitCardJobs.map((job) => (
          <div
            key={job.id}
            className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-blue-900 dark:text-blue-300">
                {isHindi ? job.departmentHi : job.department}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {isHindi ? 'परीक्षा:' : 'Exam:'} {job.dates.examDate}
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
              {isHindi ? job.titleHi : job.title}
            </h3>

            {/* Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>{job.advtNumber}</span>
              <span aria-hidden="true">·</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {job.admitCardStatus || 'Call Letter Active'}
              </span>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2">
              <button
                onClick={() => setDownloadModalJob(job)}
                className="px-3 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isHindi ? 'एडमिट कार्ड डाउनलोड करें' : 'Download Hall Ticket'}</span>
              </button>

              <button
                onClick={() => onOpenDetails(job)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 active:scale-95 transition"
              >
                {isHindi ? 'परीक्षा निर्देश' : 'Exam Guidelines'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hall Ticket Simulation Dialog */}
      {downloadModalJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {isHindi ? 'एडमिट कार्ड डाउनलोड' : 'Download Call Letter'}
              </h3>
              <button
                onClick={() => setDownloadModalJob(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              {isHindi ? downloadModalJob.titleHi : downloadModalJob.title}
            </p>

            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-xs text-blue-900 dark:text-blue-300 space-y-1">
              <p>• {isHindi ? 'रजिस्ट्रेशन नंबर व जन्मतिथि तैयार रखें।' : 'Keep your Registration No & DOB handy.'}</p>
              <p>• {isHindi ? 'रंगीन प्रिंटआउट एवं वैध मूल फोटो पहचान पत्र साथ लाएं।' : 'Carry a color printout and valid original Photo ID.'}</p>
            </div>

            {!downloadSuccess ? (
              <button
                onClick={handleDownloadTicket}
                className="w-full h-11 rounded-xl bg-blue-900 text-white font-semibold text-xs flex items-center justify-center gap-2 active:scale-95 transition"
              >
                <Download className="w-4 h-4" />
                <span>{isHindi ? 'डाउनलोड शुरू करें (PDF)' : 'Generate & Download PDF'}</span>
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{isHindi ? 'हॉल टिकट सफलतापूर्वक डाउनलोड हुआ!' : 'Hall Ticket generated & downloaded!'}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
