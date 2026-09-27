import React from 'react';
import { GraduationCap, BookOpen, Calendar, ChevronRight, ExternalLink } from 'lucide-react';
import { JobItem, Language } from '../../types';

interface AdmissionsSectionProps {
  jobs: JobItem[];
  language: Language;
  onOpenDetails: (job: JobItem) => void;
  onApplyOnline: (job: JobItem) => void;
}

export const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({
  jobs,
  language,
  onOpenDetails,
  onApplyOnline,
}) => {
  const isHindi = language === 'hi';

  const admissionJobs = jobs.filter((j) => j.type === 'admission');

  return (
    <div className="p-3 sm:p-4 space-y-3 pb-24">
      {/* Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-900 to-blue-950 text-white shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap className="w-5 h-5 text-cyan-300" />
          <h2 className="text-sm font-bold tracking-tight">
            {isHindi ? 'केंद्रीय एवं राज्य विश्वविद्यालय प्रवेश' : 'University & Entrance Admissions 2026'}
          </h2>
        </div>
        <p className="text-xs text-cyan-100">
          {isHindi
            ? 'नीट, सीयूईटी, आईआईटी, पॉलिटेक्निक, आईटीआई एवं बीएड प्रवेश काउंसलिंग व आवेदन।'
            : 'Admissions for CUET UG, NEET UG Medical Counselling, B.Ed, ITI & Polytechnic.'}
        </p>
      </div>

      <div className="space-y-3">
        {admissionJobs.map((job) => (
          <div
            key={job.id}
            className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-cyan-900 dark:text-cyan-300">
                {isHindi ? job.departmentHi : job.department}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {isHindi ? 'अंतिम तिथि:' : 'Last Date:'} {job.dates.applicationEnd || 'Open'}
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
              {isHindi ? job.titleHi : job.title}
            </h3>

            {/* Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-200">{job.admissionCourse}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums font-semibold text-cyan-800 dark:text-cyan-400">
                {job.totalVacancies.toLocaleString('en-IN')} {isHindi ? 'सीटें' : 'Seats'}
              </span>
              <span aria-hidden="true">·</span>
              <span>{job.state}</span>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2">
              <button
                onClick={() => onApplyOnline(job)}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-900 hover:bg-cyan-800 text-white text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{isHindi ? 'ऑनलाइन आवेदन / काउंसलिंग' : 'Apply / Counselling'}</span>
              </button>

              <button
                onClick={() => onOpenDetails(job)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 active:scale-95 transition"
              >
                {isHindi ? 'सीट विवरण' : 'Seat Matrix'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
