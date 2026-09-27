import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Download, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface InterstitialAdProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onProceed: () => void;
}

export const InterstitialAd: React.FC<InterstitialAdProps> = ({
  isOpen,
  onClose,
  language,
  onProceed,
}) => {
  const [countdown, setCountdown] = useState(3);
  const [canSkip, setCanSkip] = useState(false);
  const isHindi = language === 'hi';

  useEffect(() => {
    if (!isOpen) {
      setCountdown(3);
      setCanSkip(false);
      return;
    }

    setCountdown(3);
    setCanSkip(false);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-300 dark:border-slate-800 overflow-hidden flex flex-col"
        >
          {/* Top Ad Label & Skip Counter */}
          <div className="px-4 py-3 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider">
              {isHindi ? 'प्रायोजित विज्ञापन' : 'Sponsored Ad'}
            </span>

            <div className="flex items-center gap-2">
              {!canSkip ? (
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {isHindi ? `${countdown}s में छोड़ें` : `Skip in ${countdown}s`}
                </span>
              ) : (
                <button
                  onClick={onClose}
                  className="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1 active:scale-95 transition"
                  aria-label="Skip ad"
                >
                  <span>{isHindi ? 'विज्ञापन छोड़ें' : 'Skip Ad'}</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Ad Creative Body */}
          <div className="p-6 flex flex-col items-center text-center space-y-4">
            {/* App Icon Graphic */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-900 to-indigo-600 flex items-center justify-center text-white shadow-xl ring-4 ring-blue-500/20">
              <span className="text-2xl font-black tracking-wider">SV</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                {isHindi ? 'सरकारी नौकरी मास्टर - मॉक टेस्ट एवं करेंट अफेयर्स' : 'Sarkari Pariksha Pro - Live Mocks & PYQ'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isHindi
                  ? 'एसएससी, रेलवे, बैंक एवं पुलिस परीक्षाओं हेतु भारत का नंबर 1 टेस्ट ऐप।'
                  : '50,000+ Solved Questions & Chapter-wise Tests. 4.8★ Rated by 2M Aspirants.'}
              </p>
            </div>

            {/* Rating Stars & Trust */}
            <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-500" />
                <span>4.8</span>
              </div>
              <span aria-hidden="true">•</span>
              <span>2M+ Downloads</span>
              <span aria-hidden="true">•</span>
              <div className="flex items-center gap-1 text-emerald-600">
                <ShieldCheck className="w-4 h-4" />
                <span>Free</span>
              </div>
            </div>

            {/* Key Features Pill */}
            <div className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 text-left text-xs space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span className="text-slate-700 dark:text-slate-300">Daily Bilingual Current Affairs PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span className="text-slate-700 dark:text-slate-300">All India Live Ranking & Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span className="text-slate-700 dark:text-slate-300">Works 100% Offline with Auto-Sync</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                window.open('https://play.google.com', '_blank');
                onClose();
              }}
              className="w-full h-11 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-900/20 active:scale-95 transition"
            >
              <Download className="w-4 h-4" />
              <span>{isHindi ? 'मुफ्त ऐप इंस्टॉल करें (Google Play)' : 'Install Free on Google Play'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2 text-center text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
            >
              {isHindi ? 'भर्ती विवरण पर जारी रखें' : 'Continue to Job Details'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
