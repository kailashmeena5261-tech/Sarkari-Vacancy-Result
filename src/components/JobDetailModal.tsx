import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Share2,
  Bookmark,
  Copy,
  Download,
  ExternalLink,
  Calendar,
  CreditCard,
  UserCheck,
  Building2,
  FileText,
  Clock,
  Award,
  CheckCircle2,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { JobItem, Language } from '../types';

interface JobDetailModalProps {
  job: JobItem | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onShare: (job: JobItem) => void;
  onCopyLink: (job: JobItem) => void;
  onOpenPdf: (job: JobItem) => void;
  onApplyOnline: (job: JobItem) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  isOpen,
  onClose,
  language,
  isFavorite,
  onToggleFavorite,
  onShare,
  onCopyLink,
  onOpenPdf,
  onApplyOnline,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'dates-fees' | 'syllabus'>('overview');

  if (!isOpen || !job) return null;
  const isHindi = language === 'hi';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[85vh] overflow-hidden border border-slate-200 dark:border-slate-800"
        >
          {/* Top Grab Handle on mobile */}
          <div className="sm:hidden w-12 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto my-2" />

          {/* Modal Header */}
          <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 truncate">
              <span className="text-xs font-semibold text-blue-900 dark:text-blue-300 truncate">
                {isHindi ? job.departmentHi : job.department}
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => onToggleFavorite(job.id)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-amber-500 transition"
                aria-label="Bookmark"
              >
                <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
              </button>
              <button
                onClick={() => onShare(job)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-600 transition"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onCopyLink(job)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-600 transition"
                aria-label="Copy Details"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Title & Quick Stats Section */}
          <div className="px-5 pt-4 pb-2 shrink-0 bg-slate-50/70 dark:bg-slate-800/40">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {isHindi ? job.titleHi : job.title}
            </h2>

            {/* Unboxed Metadata Row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
              <span>{isHindi ? 'विज्ञापन सं:' : 'Advt:'} <strong className="text-slate-900 dark:text-white">{job.advtNumber}</strong></span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
              {job.totalVacancies > 0 && (
                <span className="tabular-nums font-semibold text-blue-900 dark:text-blue-300">
                  {job.totalVacancies.toLocaleString('en-IN')} {isHindi ? 'कुल पद' : 'Total Posts'}
                </span>
              )}
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
              <span>{job.state}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
              <span>{job.salaryPayScale}</span>
            </div>

            {/* Interactive Tab Strip */}
            <div className="flex items-center gap-1 mt-4 border-b border-slate-200 dark:border-slate-700/80 overflow-x-auto no-scrollbar">
              {[
                { id: 'overview', labelEn: 'Overview', labelHi: 'विवरण' },
                { id: 'dates-fees', labelEn: 'Dates & Fees', labelHi: 'तिथियां व शुल्क' },
                { id: 'eligibility', labelEn: 'Eligibility & Posts', labelHi: 'पात्रता व पद' },
                { id: 'syllabus', labelEn: 'Syllabus & Process', labelHi: 'सिलेबस व चयन' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
                    activeTab === tab.id
                      ? 'border-blue-900 dark:border-blue-400 text-blue-900 dark:text-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {isHindi ? tab.labelHi : tab.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 text-slate-800 dark:text-slate-200">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {/* Status Notice Callout */}
                <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-blue-900 dark:text-blue-300 mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isHindi ? 'भर्ती स्थिति सारांश' : 'Recruitment Status Summary'}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isHindi
                      ? `${job.departmentHi} द्वारा ${job.totalVacancies > 0 ? `${job.totalVacancies} पदों पर` : ''} भर्ती प्रक्रिया संचालित की जा रही है। इच्छुक अभ्यर्थी निर्धारित अंतिम तिथि से पूर्व ऑनलाइन आवेदन जमा करें।`
                      : `${job.department} is conducting this examination for ${job.totalVacancies > 0 ? `${job.totalVacancies.toLocaleString()} positions` : 'prescribed criteria'}. Candidates must verify eligibility details before applying.`}
                  </p>
                </div>

                {/* Important Dates Summary */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    {isHindi ? 'मुख्य तिथियां' : 'Key Milestones'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80">
                      <span className="text-slate-500 dark:text-slate-400 block text-[11px]">
                        {isHindi ? 'आवेदन प्रारंभ:' : 'Application Starts:'}
                      </span>
                      <strong className="text-slate-900 dark:text-white tabular-nums">
                        {job.dates.applicationStart || 'Refer Notice'}
                      </strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/50">
                      <span className="text-amber-800 dark:text-amber-300 block text-[11px]">
                        {isHindi ? 'ऑनलाइन अंतिम तिथि:' : 'Last Date to Apply:'}
                      </span>
                      <strong className="text-amber-900 dark:text-amber-200 tabular-nums">
                        {job.dates.applicationEnd || 'Refer Notice'}
                      </strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80">
                      <span className="text-slate-500 dark:text-slate-400 block text-[11px]">
                        {isHindi ? 'परीक्षा तिथि:' : 'Exam Date:'}
                      </span>
                      <strong className="text-slate-900 dark:text-white tabular-nums">
                        {job.dates.examDate || 'To be announced'}
                      </strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80">
                      <span className="text-slate-500 dark:text-slate-400 block text-[11px]">
                        {isHindi ? 'आयु सीमा:' : 'Age Limit:'}
                      </span>
                      <strong className="text-slate-900 dark:text-white">
                        {job.ageLimit}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Steps to Apply */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    {isHindi ? 'आवेदन करने के सरल चरण' : 'How to Apply Online'}
                  </h4>
                  <ol className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-200 flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                      <span>{isHindi ? 'नीचे दिए "ऑनलाइन आवेदन करें" बटन पर क्लिक करके आधिकारिक भर्ती पोर्टल पर जाएं।' : 'Click the "Apply Online" button to visit the official commission portal.'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-200 flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                      <span>{isHindi ? 'One Time Registration (OTR) या नया पंजीकरण पूरा करें और लॉगिन क्रेडेंशियल्स प्राप्त करें।' : 'Complete One Time Registration (OTR) or New User Sign Up to get registration ID.'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-200 flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                      <span>{isHindi ? 'शैक्षणिक योग्यता, व्यक्तिगत विवरण दर्ज करें और फोटो व हस्ताक्षर स्कैन अपलोड करें।' : 'Fill educational qualifications, personal details and upload required photo & signature.'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-200 flex items-center justify-center font-bold text-[10px] shrink-0">4</span>
                      <span>{isHindi ? 'श्रेणी अनुसार आवेदन शुल्क का भुगतान करें और भविष्य के संदर्भ हेतु फाइनल फॉर्म प्रिंट करें।' : 'Pay applicable category fee online and save the confirmation printout safely.'}</span>
                    </li>
                  </ol>
                </div>
              </div>
            )}

            {activeTab === 'dates-fees' && (
              <div className="space-y-4">
                {/* Fee Structure */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    {isHindi ? 'आवेदन शुल्क विवरण' : 'Application Fee Details'}
                  </h4>
                  <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs">
                    <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
                      <span>General / OBC / EWS:</span>
                      <strong className="text-slate-900 dark:text-white tabular-nums">{job.applicationFee.generalOBC}</strong>
                    </div>
                    <div className="flex justify-between p-3 border-b border-slate-200 dark:border-slate-800">
                      <span>SC / ST:</span>
                      <strong className="text-slate-900 dark:text-white tabular-nums">{job.applicationFee.scST}</strong>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
                      <span>{isHindi ? 'महिला (सभी श्रेणी):' : 'Female (All Category):'}</span>
                      <strong className="text-slate-900 dark:text-white tabular-nums">{job.applicationFee.female}</strong>
                    </div>
                    {job.applicationFee.phDivyang && (
                      <div className="flex justify-between p-3 border-b border-slate-200 dark:border-slate-800">
                        <span>PH / Divyang:</span>
                        <strong className="text-slate-900 dark:text-white tabular-nums">{job.applicationFee.phDivyang}</strong>
                      </div>
                    )}
                    <div className="p-3 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100/50 dark:bg-slate-800/40">
                      <strong>Payment Mode:</strong> {job.applicationFee.paymentMode}
                    </div>
                  </div>
                </div>

                {/* Important Dates Full Timeline */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    {isHindi ? 'विस्तृत समय सारिणी' : 'Official Timeline'}
                  </h4>
                  <div className="space-y-2 text-xs">
                    {Object.entries(job.dates).map(([key, val]) => (
                      <div key={key} className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                        <span className="capitalize text-slate-600 dark:text-slate-300">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'eligibility' && (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs">
                  <div className="font-semibold text-slate-900 dark:text-white mb-1">
                    {isHindi ? 'आयु सीमा एवं छूट:' : 'Age Criteria & Relaxation:'}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">{job.ageLimit}</p>
                </div>

                {/* Posts Breakdown */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    {isHindi ? 'पदवार रिक्तियां एवं न्यूनतम योग्यता' : 'Post-wise Vacancy & Qualifications'}
                  </h4>
                  <div className="space-y-2">
                    {job.vacancies.map((v, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 text-xs"
                      >
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <strong className="font-semibold text-slate-900 dark:text-white">
                            {v.postName}
                          </strong>
                          {v.totalPosts > 0 && (
                            <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/40 text-blue-900 dark:text-blue-300 font-bold tabular-nums shrink-0">
                              {v.totalPosts.toLocaleString('en-IN')} {isHindi ? 'पद' : 'Posts'}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                          <strong>{isHindi ? 'पात्रता:' : 'Eligibility:'}</strong> {v.eligibility}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'syllabus' && (
              <div className="space-y-4">
                {/* Selection Stages */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    {isHindi ? 'चयन प्रक्रिया के चरण' : 'Selection Process Stages'}
                  </h4>
                  <div className="space-y-2 text-xs">
                    {job.selectionProcess.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-[10px] shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-medium text-slate-800 dark:text-slate-200">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Syllabus Highlights */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    {isHindi ? 'परीक्षा पाठ्यक्रम सारांश' : 'Exam Syllabus Overview'}
                  </h4>
                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 text-xs space-y-2">
                    {job.syllabusOverview.map((topic, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                        <span className="text-slate-700 dark:text-slate-300">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Bottom Actions Bar (Compliant with 15% Mobile Sticky Cap) */}
          <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shrink-0 flex items-center gap-2">
            {/* Download Official PDF */}
            <button
              onClick={() => onOpenPdf(job)}
              className="flex-1 h-11 px-3 rounded-xl border border-blue-900/30 dark:border-blue-700/60 bg-blue-50/80 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition"
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span className="truncate">{isHindi ? 'ऑफिशियल नोटिफिकेशन' : 'Official Notice PDF'}</span>
            </button>

            {/* Apply Online CTA */}
            <button
              onClick={() => onApplyOnline(job)}
              className="flex-1 h-11 px-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/20 active:scale-95 transition"
            >
              <ExternalLink className="w-4 h-4 shrink-0" />
              <span className="truncate">{isHindi ? 'ऑनलाइन आवेदन करें' : 'Apply Online'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
