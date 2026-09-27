import React, { useState } from 'react';
import { BookOpen, Download, FileText, CheckCircle2, Search, Sparkles } from 'lucide-react';
import { StudyMaterialItem, Language, JobCategory } from '../../types';
import { MOCK_STUDY_MATERIAL } from '../../data/mockData';

interface StudyMaterialSectionProps {
  language: Language;
  onDownloadToast: (title: string) => void;
}

export const StudyMaterialSection: React.FC<StudyMaterialSectionProps> = ({
  language,
  onDownloadToast,
}) => {
  const isHindi = language === 'hi';
  const [activeFilter, setActiveFilter] = useState<'all' | 'syllabus' | 'pyq' | 'notes'>('all');
  const [search, setSearch] = useState('');

  const filteredMaterials = MOCK_STUDY_MATERIAL.filter((m) => {
    const matchesFilter = activeFilter === 'all' || m.type === activeFilter;
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.examTarget.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-3 sm:p-4 space-y-3 pb-24">
      {/* Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-800 to-orange-900 text-white shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-amber-300" />
          <h2 className="text-sm font-bold tracking-tight">
            {isHindi ? 'सरकारी परीक्षा अध्ययन सामग्री एवं सिलेबस' : 'Official Syllabus & Study Material'}
          </h2>
        </div>
        <p className="text-xs text-amber-100">
          {isHindi
            ? 'विस्तृत पाठ्यक्रम, पिछले 5 वर्षों के हल प्रश्न पत्र एवं विषयवार शॉर्ट ट्रिक्स नोट्स PDF।'
            : 'Download official exam syllabus PDFs, solved previous year papers & speed-revision notes.'}
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'all', labelEn: 'All Material', labelHi: 'सभी सामग्री' },
          { id: 'syllabus', labelEn: 'Syllabus PDF', labelHi: 'पाठ्यक्रम (Syllabus)' },
          { id: 'pyq', labelEn: 'Solved Papers (PYQ)', labelHi: 'पिछले वर्ष के प्रश्न पत्र' },
          { id: 'notes', labelEn: 'Revision Notes', labelHi: 'रिवीजन नोट्स' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium whitespace-nowrap transition-all ${
              activeFilter === tab.id
                ? 'border-amber-800 dark:border-amber-500 bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-semibold'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
            }`}
          >
            {isHindi ? tab.labelHi : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Materials List */}
      <div className="space-y-3">
        {filteredMaterials.map((mat) => (
          <div
            key={mat.id}
            className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-wider text-[11px]">
                {mat.examTarget}
              </span>
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <span>{mat.pagesOrDuration}</span>
                <span aria-hidden="true">·</span>
                <span>{mat.fileSize}</span>
              </div>
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
              {isHindi ? mat.titleHi : mat.title}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {mat.description}
            </p>

            {/* Topics covered checklist */}
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                {isHindi ? 'मुख्य विषय समाविष्ट:' : 'Key Topics Included:'}
              </span>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-700 dark:text-slate-300">
                {mat.topicsCovered.map((topic, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                    <span>{topic}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Download Bar */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 tabular-nums">
                {mat.downloadCount.toLocaleString('en-IN')} {isHindi ? 'बार डाउनलोड किया गया' : 'downloads'}
              </span>

              <button
                onClick={() => onDownloadToast(isHindi ? mat.titleHi : mat.title)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isHindi ? 'मुफ्त PDF डाउनलोड' : 'Free Download PDF'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
