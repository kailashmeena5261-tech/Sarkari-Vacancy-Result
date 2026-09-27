import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Printer, Share2, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import { JobItem, Language } from '../types';

interface OfficialPdfViewerModalProps {
  job: JobItem | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onDownload: () => void;
  onShare: (job: JobItem) => void;
}

export const OfficialPdfViewerModal: React.FC<OfficialPdfViewerModalProps> = ({
  job,
  isOpen,
  onClose,
  language,
  onDownload,
  onShare,
}) => {
  if (!isOpen || !job) return null;
  const isHindi = language === 'hi';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.18 }}
          className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col h-[90vh] overflow-hidden border border-slate-300 dark:border-slate-700"
        >
          {/* Header Bar */}
          <div className="h-14 px-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 truncate">
              <FileText className="w-5 h-5 text-blue-900 dark:text-blue-400 shrink-0" />
              <div className="truncate">
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">
                  {job.advtNumber} - Official Notification
                </span>
                <span className="text-[10px] text-slate-500 truncate block">
                  {isHindi ? 'आधिकारिक भर्ती राजपत्र सूचना' : 'Official Gazette Advertisement Document'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={onDownload}
                className="px-2.5 py-1.5 rounded-lg bg-blue-900 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-blue-800 active:scale-95 transition"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isHindi ? 'डाउनलोड' : 'Download'}</span>
              </button>
              <button
                onClick={() => onShare(job)}
                className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition"
                title="Share Document"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 active:scale-95 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Gazette Paper View */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-200 dark:bg-slate-950 flex justify-center">
            <div className="w-full max-w-2xl bg-white text-slate-900 p-6 sm:p-10 shadow-lg rounded-sm border border-slate-300 text-xs font-serif leading-relaxed space-y-6">
              {/* Document Header */}
              <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
                <div className="w-10 h-10 mx-auto rounded-full border-2 border-slate-900 flex items-center justify-center font-bold text-sm mb-1">
                  GOI
                </div>
                <h1 className="text-sm font-bold uppercase tracking-wider">
                  {job.department}
                </h1>
                <p className="text-[11px] font-sans text-slate-700">
                  RECRUITMENT & EXAMINATION NOTIFICATION - 2026
                </p>
                <p className="text-[10px] font-mono text-slate-600">
                  Advertisement Reference: {job.advtNumber} | Date of Release: {job.dates.applicationStart || job.postedOn}
                </p>
              </div>

              {/* Official Notice Intro */}
              <div className="space-y-2">
                <h2 className="font-bold text-xs uppercase underline">
                  SUBJECT: {job.title.toUpperCase()}
                </h2>
                <p className="text-justify font-sans text-[11px] text-slate-800">
                  1. Applications are invited from eligible Indian citizens for recruitment to the following positions under {job.department}. Candidates must read the instructions carefully before filling out the online application form on the official web portal (<strong>{job.officialWebsite}</strong>).
                </p>
              </div>

              {/* Vacancy Breakdown Table */}
              <div className="space-y-2 font-sans">
                <h3 className="font-bold text-[11px] uppercase">
                  2. DETAILS OF VACANCIES & PAY SCALE
                </h3>
                <div className="border border-slate-800 rounded-sm overflow-hidden text-[10px]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-800 font-bold">
                        <th className="p-2 border-r border-slate-800">S.No</th>
                        <th className="p-2 border-r border-slate-800">Post Designation</th>
                        <th className="p-2 border-r border-slate-800">Total Posts</th>
                        <th className="p-2">Minimum Educational Criteria</th>
                      </tr>
                    </thead>
                    <tbody>
                      {job.vacancies.map((v, i) => (
                        <tr key={i} className="border-b border-slate-300">
                          <td className="p-2 border-r border-slate-300 tabular-nums">{i + 1}</td>
                          <td className="p-2 border-r border-slate-300 font-semibold">{v.postName}</td>
                          <td className="p-2 border-r border-slate-300 tabular-nums font-bold">{v.totalPosts}</td>
                          <td className="p-2 text-slate-700">{v.eligibility}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Key Dates & Fees */}
              <div className="grid grid-cols-2 gap-4 font-sans text-[11px]">
                <div className="p-3 border border-slate-300 rounded-sm space-y-1 bg-slate-50">
                  <h4 className="font-bold text-[11px] border-b pb-1">3. KEY SCHEDULE</h4>
                  <p>• Online Registration Open: <strong>{job.dates.applicationStart || 'Refer Notice'}</strong></p>
                  <p>• Online Registration Closes: <strong className="text-red-700">{job.dates.applicationEnd || 'Refer Notice'}</strong></p>
                  <p>• Tentative Examination: <strong>{job.dates.examDate || 'Refer Updates'}</strong></p>
                </div>
                <div className="p-3 border border-slate-300 rounded-sm space-y-1 bg-slate-50">
                  <h4 className="font-bold text-[11px] border-b pb-1">4. APPLICATION FEES</h4>
                  <p>• Gen / OBC / EWS: <strong>{job.applicationFee.generalOBC}</strong></p>
                  <p>• SC / ST / Divyang: <strong>{job.applicationFee.scST}</strong></p>
                  <p>• Female Candidates: <strong>{job.applicationFee.female}</strong></p>
                </div>
              </div>

              {/* Scheme of Examination */}
              <div className="space-y-1 font-sans text-[11px]">
                <h4 className="font-bold text-[11px] uppercase">
                  5. SCHEME OF SELECTION & EXAMINATION
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-700 pl-2">
                  {job.selectionProcess.map((proc, i) => (
                    <li key={i}>{proc}</li>
                  ))}
                </ul>
              </div>

              {/* Authentication & Signature */}
              <div className="pt-6 border-t border-slate-400 flex justify-between items-end text-[10px] font-sans">
                <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Verified Official Notification Notice</span>
                </div>
                <div className="text-right">
                  <p className="font-bold">Competent Authority / Secretary</p>
                  <p className="text-slate-600">{job.department}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
