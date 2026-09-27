import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RotateCcw, Check, Filter } from 'lucide-react';
import { JobCategory, IndianState, QualificationLevel, Language } from '../types';
import { JOB_CATEGORIES, INDIAN_STATES, QUALIFICATIONS } from '../data/mockData';

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  selectedCategory: JobCategory;
  onSelectCategory: (cat: JobCategory) => void;
  selectedState: IndianState;
  onSelectState: (st: IndianState) => void;
  selectedQualification: QualificationLevel;
  onSelectQualification: (q: QualificationLevel) => void;
  sortBy: 'latest' | 'closing-soon' | 'vacancies';
  onSelectSortBy: (sort: 'latest' | 'closing-soon' | 'vacancies') => void;
  onReset: () => void;
  totalFilteredCount: number;
}

export const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({
  isOpen,
  onClose,
  language,
  selectedCategory,
  onSelectCategory,
  selectedState,
  onSelectState,
  selectedQualification,
  onSelectQualification,
  sortBy,
  onSelectSortBy,
  onReset,
  totalFilteredCount,
}) => {
  if (!isOpen) return null;
  const isHindi = language === 'hi';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden border border-slate-200 dark:border-slate-800"
        >
          {/* Top Handle */}
          <div className="w-12 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto my-2.5" />

          {/* Header */}
          <div className="px-5 py-2.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-900 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {isHindi ? 'फिल्टर एवं सॉर्ट' : 'Filters & Sorting'}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onReset}
                className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 p-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isHindi ? 'रीसेट' : 'Reset'}</span>
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Filter Options */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
            {/* 1. Sort Options (Segmented Control - functional buttons) */}
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase text-[11px] tracking-wider text-slate-500">
                {isHindi ? 'क्रमबद्ध करें (Sort By)' : 'Sort By'}
              </h4>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                {[
                  { id: 'latest', labelEn: 'Latest Added', labelHi: 'नवीनतम' },
                  { id: 'closing-soon', labelEn: 'Closing Soon', labelHi: 'अंतिम तिथि' },
                  { id: 'vacancies', labelEn: 'Max Posts', labelHi: 'अधिकतम पद' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onSelectSortBy(s.id as any)}
                    className={`py-2 px-2 text-center rounded-lg font-medium transition-all ${
                      sortBy === s.id
                        ? 'bg-white dark:bg-slate-700 text-blue-900 dark:text-blue-300 shadow-sm font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {isHindi ? s.labelHi : s.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Job Category (Interactive Button Grid) */}
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase text-[11px] tracking-wider text-slate-500">
                {isHindi ? 'भर्ती श्रेणी' : 'Recruitment Category'}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {JOB_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => onSelectCategory(cat.id as JobCategory)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all active:scale-95 ${
                        isSelected
                          ? 'border-blue-900 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 font-semibold'
                          : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {isHindi ? cat.labelHi : cat.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. State-wise Filter */}
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase text-[11px] tracking-wider text-slate-500">
                {isHindi ? 'राज्य अनुसार भर्ती' : 'State / Region'}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {INDIAN_STATES.map((st) => {
                  const isSelected = selectedState === st;
                  return (
                    <button
                      key={st}
                      onClick={() => onSelectState(st as IndianState)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all active:scale-95 ${
                        isSelected
                          ? 'border-blue-900 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 font-semibold'
                          : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {st}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Education Qualification Filter */}
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase text-[11px] tracking-wider text-slate-500">
                {isHindi ? 'शैक्षणिक योग्यता' : 'Minimum Qualification'}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {QUALIFICATIONS.map((q) => {
                  const isSelected = selectedQualification === q.id;
                  return (
                    <button
                      key={q.id}
                      onClick={() => onSelectQualification(q.id as QualificationLevel)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all active:scale-95 ${
                        isSelected
                          ? 'border-blue-900 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 font-semibold'
                          : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {isHindi ? q.labelHi : q.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sticky Bottom Apply Filters Button */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              <strong className="text-slate-900 dark:text-white font-bold tabular-nums">{totalFilteredCount}</strong> {isHindi ? 'भर्तियां उपलब्ध' : 'matches found'}
            </span>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold shadow-md active:scale-95 transition"
            >
              {isHindi ? 'फिल्टर लागू करें' : 'Apply Filters'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
