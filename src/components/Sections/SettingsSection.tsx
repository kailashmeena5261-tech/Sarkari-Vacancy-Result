import React, { useState } from 'react';
import {
  Settings,
  Languages,
  Moon,
  Sun,
  Bell,
  Code2,
  FileText,
  KeyRound,
  BookOpen,
  Bookmark,
  ShieldCheck,
  Info,
  ChevronRight,
  ExternalLink,
  Smartphone
} from 'lucide-react';
import { Language, SectionType, IndianState } from '../../types';
import { INDIAN_STATES } from '../../data/mockData';

interface SettingsSectionProps {
  language: Language;
  onToggleLanguage: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
  onNavigate: (section: SectionType) => void;
  selectedState: IndianState;
  onSelectState: (s: IndianState) => void;
  onShowToast: (msg: string) => void;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  language,
  onToggleLanguage,
  darkMode,
  onToggleDarkMode,
  isPhoneFrame,
  onTogglePhoneFrame,
  onNavigate,
  selectedState,
  onSelectState,
  onShowToast,
}) => {
  const isHindi = language === 'hi';
  const [jobAlerts, setJobAlerts] = useState(true);
  const [admitAlerts, setAdmitAlerts] = useState(true);
  const [resultAlerts, setResultAlerts] = useState(true);

  return (
    <div className="p-3 sm:p-4 space-y-4 pb-24 text-xs">
      {/* Quick Navigation Hub */}
      <div>
        <h3 className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px] mb-2 px-1">
          {isHindi ? 'त्वरित अनुभाग' : 'Explore Sections'}
        </h3>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700/60 overflow-hidden">
          <button
            onClick={() => onNavigate('answer-keys')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-700/40 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 flex items-center justify-center">
                <KeyRound className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">
                  {isHindi ? 'उत्तर कुंजी (Answer Keys)' : 'Official Answer Keys'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isHindi ? 'ओएमआर शीट व आपत्ति दर्ज करें' : 'OMR sheets & objection links'}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => onNavigate('study-material')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-700/40 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">
                  {isHindi ? 'अध्ययन सामग्री व सिलेबस' : 'Study Material & Syllabus'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isHindi ? 'पिछले 5 वर्षों के हल प्रश्न पत्र' : 'Previous Year Papers & GK PDF'}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => onNavigate('kotlin-code')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-700/40 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">
                  Kotlin / Jetpack Compose Source
                </span>
                <span className="text-[11px] text-slate-500">
                  {isHindi ? 'स्वच्छ आर्किटेक्चर कोड देखें' : 'View Android Clean Architecture Source'}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Preferences Section */}
      <div>
        <h3 className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px] mb-2 px-1">
          {isHindi ? 'प्राथमिकताएं' : 'App Preferences'}
        </h3>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700/60 overflow-hidden">
          {/* Language Switch */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Languages className="w-4 h-4 text-slate-500" />
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">
                  {isHindi ? 'भाषा (Language)' : 'App Language'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {language === 'hi' ? 'हिन्दी में सामग्री देखें' : 'View in English'}
                </span>
              </div>
            </div>
            <button
              onClick={onToggleLanguage}
              className="px-3 py-1.5 rounded-xl border border-blue-900 dark:border-blue-500 text-blue-900 dark:text-blue-300 font-bold active:scale-95 transition"
            >
              {language === 'hi' ? 'English' : 'हिन्दी'}
            </button>
          </div>

          {/* Theme Switch */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-500" />}
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">
                  {isHindi ? 'डार्क मोड' : 'Dark Mode (Material 3)'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {darkMode ? 'Dark Theme Active' : 'Light Theme Active'}
                </span>
              </div>
            </div>
            <button
              onClick={onToggleDarkMode}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                darkMode ? 'bg-blue-900' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Device Frame Viewport Toggle */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-4 h-4 text-slate-500" />
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">
                  {isHindi ? 'एंड्रॉयड फोन फ्रेम' : 'Android Phone Frame Preview'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isPhoneFrame ? 'Pixel 9 Frame Active' : 'Full Width Layout'}
                </span>
              </div>
            </div>
            <button
              onClick={onTogglePhoneFrame}
              className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold"
            >
              {isPhoneFrame ? 'Disable' : 'Enable'}
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Toggle */}
      <div>
        <h3 className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px] mb-2 px-1">
          {isHindi ? 'सूचना सेटिंग' : 'Push Notification Alerts'}
        </h3>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700/60 overflow-hidden">
          <div className="p-3 flex items-center justify-between">
            <span>{isHindi ? 'नई सरकारी भर्ती अलर्ट' : 'New Job Release Alerts'}</span>
            <input
              type="checkbox"
              checked={jobAlerts}
              onChange={() => {
                setJobAlerts(!jobAlerts);
                onShowToast(jobAlerts ? 'Job alerts paused' : 'Job alerts enabled');
              }}
              className="w-4 h-4 accent-blue-900 rounded"
            />
          </div>
          <div className="p-3 flex items-center justify-between">
            <span>{isHindi ? 'प्रवेश पत्र / एडमिट कार्ड अलर्ट' : 'Admit Card & Hall Ticket Alerts'}</span>
            <input
              type="checkbox"
              checked={admitAlerts}
              onChange={() => {
                setAdmitAlerts(!admitAlerts);
                onShowToast(admitAlerts ? 'Admit card alerts paused' : 'Admit card alerts enabled');
              }}
              className="w-4 h-4 accent-blue-900 rounded"
            />
          </div>
          <div className="p-3 flex items-center justify-between">
            <span>{isHindi ? 'परीक्षा परिणाम व कटऑफ अलर्ट' : 'Exam Result & Cutoff Alerts'}</span>
            <input
              type="checkbox"
              checked={resultAlerts}
              onChange={() => {
                setResultAlerts(!resultAlerts);
                onShowToast(resultAlerts ? 'Result alerts paused' : 'Result alerts enabled');
              }}
              className="w-4 h-4 accent-blue-900 rounded"
            />
          </div>
        </div>
      </div>

      {/* Official Sources & Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{isHindi ? 'आधिकारिक स्रोत एवं अस्वीकरण' : 'Information Sources & Disclaimer'}</span>
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
          {isHindi
            ? 'यह एप्लिकेशन भारतीय नागरिकों को सरकारी भर्ती सूचनाएं सहज रूप से प्रदान करने के लिए बनाई गई है। सभी सूचनाएं भारत सरकार एवं राज्य आयोगों (upsc.gov.in, ssc.gov.in, rrbapply.gov.in, bpsc.bih.nic.in) के आधिकारिक विज्ञापनों से सत्यापित की जाती हैं।'
            : 'Sarkari Vacancy Result is an informational recruitment portal. All examination and recruitment data is aggregated from official public commission websites (e.g. upsc.gov.in, ssc.gov.in, indianrailways.gov.in, state psc portals) for public awareness.'}
        </p>
        <div className="pt-1 text-[10px] text-slate-500">
          Sarkari Vacancy Result v2.4.0 · Material 3 Design
        </div>
      </div>
    </div>
  );
};
