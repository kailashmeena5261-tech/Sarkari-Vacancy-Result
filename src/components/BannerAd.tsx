import React, { useState } from 'react';
import { ExternalLink, Sparkles, X, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface BannerAdProps {
  language: Language;
  variant?: 'feed' | 'compact' | 'footer';
  onAdClick?: () => void;
}

const SPONSORED_OFFERS = [
  {
    sponsor: 'Testbook Pass',
    titleEn: '75,000+ Govt Exam Mock Tests & Previous Year Papers',
    titleHi: '75,000+ सरकारी नौकरी मॉक टेस्ट व पिछले वर्ष के प्रश्न पत्र',
    descEn: 'Practice SSC CGL, RRB NTPC, Banking & Police tests with All-India rank percentile analysis.',
    descHi: 'एसएससी, रेलवे एवं पुलिस परीक्षाओं के लिए ऑल इंडिया रैंक मॉक टेस्ट सीरीज।',
    ctaEn: 'Start Free Mock',
    ctaHi: 'मुफ्त टेस्ट दें',
    url: 'https://testbook.com',
    accentColor: 'from-amber-500/10 to-orange-500/10 dark:from-amber-950/30 dark:to-orange-950/20',
    borderColor: 'border-amber-200/80 dark:border-amber-800/60',
    tagColor: 'bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300',
  },
  {
    sponsor: 'Oliveboard Live',
    titleEn: 'IBPS PO & SBI PO 2026 Daily High-Speed Quizzes',
    titleHi: 'आईबीपीएस व एसबीआई बैंक परीक्षा दैनिक लाइव स्पीड क्विज',
    descEn: 'Master Quantitative Aptitude and Data Interpretation with expert shortcut formula sheets.',
    descHi: 'गणित एवं रीजनिंग के लिए शॉर्टकट फॉर्मूला शीट व स्पीड मैथ ट्रिक्स।',
    ctaEn: 'Enroll Free',
    ctaHi: 'निःशुल्क जुड़ें',
    url: 'https://oliveboard.in',
    accentColor: 'from-blue-500/10 to-indigo-500/10 dark:from-blue-950/30 dark:to-indigo-950/20',
    borderColor: 'border-blue-200/80 dark:border-blue-800/60',
    tagColor: 'bg-blue-100 text-blue-900 dark:bg-blue-950/80 dark:text-blue-300',
  },
  {
    sponsor: 'Drishti IAS Hindi',
    titleEn: 'UPSC CSE 2026 Monthly Current Affairs Digest PDF',
    titleHi: 'दृष्टि आईएएस 2026 मासिक समसामयिकी पीडीएफ',
    descEn: 'Comprehensive Yojana, Kurukshetra & PIB summaries designed for civil services aspirants.',
    descHi: 'योजना, कुरुक्षेत्र एवं पीआईबी का संपूर्ण सार संग्रह सिविल सेवा अभ्यर्थियों के लिए।',
    ctaEn: 'Download PDF',
    ctaHi: 'पीडीएफ डाउनलोड',
    url: 'https://drishtiias.com',
    accentColor: 'from-emerald-500/10 to-teal-500/10 dark:from-emerald-950/30 dark:to-teal-950/20',
    borderColor: 'border-emerald-200/80 dark:border-emerald-800/60',
    tagColor: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-300',
  },
];

export const BannerAd: React.FC<BannerAdProps> = ({ language, variant = 'feed', onAdClick }) => {
  const [dismissed, setDismissed] = useState(false);
  const [offerIndex] = useState(() => Math.floor(Math.random() * SPONSORED_OFFERS.length));
  const isHindi = language === 'hi';
  const offer = SPONSORED_OFFERS[offerIndex];

  if (dismissed) return null;

  return (
    <div
      className={`relative rounded-2xl border ${offer.borderColor} bg-gradient-to-r ${offer.accentColor} p-3.5 shadow-sm transition-all duration-200 overflow-hidden my-3`}
    >
      {/* Top Tag Row */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${offer.tagColor}`}>
            {isHindi ? 'प्रायोजित • विज्ञापन' : 'Sponsored • Ad'}
          </span>
          <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
            {offer.sponsor}
          </span>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
          aria-label="Hide Ad"
          title="Dismiss ad"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Copy */}
      <div className="space-y-1 mb-3">
        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
          {isHindi ? offer.titleHi : offer.titleEn}
        </h4>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
          {isHindi ? offer.descHi : offer.descEn}
        </p>
      </div>

      {/* Action Row */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{isHindi ? 'सत्यापित शिक्षा भागीदार' : 'Verified Partner'}</span>
        </div>

        <button
          onClick={() => {
            if (onAdClick) onAdClick();
            window.open(offer.url, '_blank');
          }}
          className="px-3 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition"
        >
          <span>{isHindi ? offer.ctaHi : offer.ctaEn}</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
