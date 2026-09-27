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
  Smartphone,
  Globe,
  Radio,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Sliders,
  DollarSign
} from 'lucide-react';
import { Language, SectionType, IndianState, WordPressApiConfig } from '../../types';
import { wpApiService } from '../../services/wpApiService';

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
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
  wpConfig: WordPressApiConfig;
  onUpdateWpConfig: (cfg: Partial<WordPressApiConfig>) => void;
  onTestInterstitialAd: () => void;
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
  wpConfig,
  onUpdateWpConfig,
  onTestInterstitialAd,
}) => {
  const isHindi = language === 'hi';

  // WordPress Form State
  const [customUrlInput, setCustomUrlInput] = useState(wpConfig.baseUrl);
  const [endpointType, setEndpointType] = useState(wpConfig.endpointType || 'posts');
  const [useCustomUrl, setUseCustomUrl] = useState(wpConfig.useCustomUrl);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // Notification toggles
  const [jobAlerts, setJobAlerts] = useState(true);
  const [admitAlerts, setAdmitAlerts] = useState(true);
  const [resultAlerts, setResultAlerts] = useState(true);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await wpApiService.testConnection(customUrlInput, endpointType);
      setTestResult(res);
      if (res.success) {
        onShowToast(res.message, 'success');
      } else {
        onShowToast(res.message, 'error');
      }
    } catch (err: any) {
      const msg = err.message || 'Connection failed';
      setTestResult({ success: false, message: msg });
      onShowToast(msg, 'error');
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveWpConfig = () => {
    onUpdateWpConfig({
      baseUrl: customUrlInput.trim(),
      endpointType: endpointType as any,
      useCustomUrl: useCustomUrl,
    });
    onShowToast(
      isHindi ? 'वर्डप्रेस API कॉन्फ़िगरेशन सहेजा गया' : 'WordPress API settings updated',
      'success'
    );
  };

  return (
    <div className="p-3 sm:p-4 space-y-4 pb-24 text-xs">
      {/* 1. WordPress REST API Integration Center */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-300 flex items-center justify-center font-bold">
              WP
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                {isHindi ? 'वर्डप्रेस REST API एकीकरण' : 'WordPress REST API Integration'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {isHindi ? 'अपनी वर्डप्रेस वेबसाइट से सरकारी भर्तियां सिंक करें' : 'Connect live government job posts from your site'}
              </p>
            </div>
          </div>

          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              wpConfig.useCustomUrl && wpConfig.connectionStatus === 'connected'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
            }`}
          >
            {wpConfig.useCustomUrl ? 'Custom API' : 'Active REST API'}
          </span>
        </div>

        {/* Custom URL Toggle */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-900 dark:text-white block">
                {isHindi ? 'कस्टम वर्डप्रेस URL सक्षम करें' : 'Connect Custom WordPress URL'}
              </span>
              <span className="text-[11px] text-slate-500">
                {isHindi ? 'डिफ़ॉल्ट फीड के स्थान पर अपनी वेबसाइट जोड़ें' : 'Override default feed with your site REST endpoint'}
              </span>
            </div>
            <input
              type="checkbox"
              checked={useCustomUrl}
              onChange={(e) => setUseCustomUrl(e.target.checked)}
              className="w-4 h-4 accent-blue-900 rounded"
            />
          </div>

          {useCustomUrl && (
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  WordPress REST API Base URL:
                </label>
                <input
                  type="url"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  placeholder="https://example.com/wp-json/wp/v2"
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-900"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Example: https://yoursite.com/wp-json/wp/v2
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  {isHindi ? 'पोस्ट प्रकार (Post Type):' : 'Endpoint Post Type:'}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'posts', label: 'posts (Standard)' },
                    { id: 'jobs', label: 'jobs (Custom Type)' },
                    { id: 'sarkari-jobs', label: 'sarkari-jobs' },
                  ].map((ep) => (
                    <button
                      key={ep.id}
                      onClick={() => setEndpointType(ep.id as any)}
                      className={`py-1.5 px-2 rounded-lg border text-center text-[10px] font-mono transition ${
                        endpointType === ep.id
                          ? 'border-blue-900 bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-300 font-bold'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {ep.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Test Connection & Save Action */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleTestConnection}
                  disabled={isTesting || !customUrlInput.trim()}
                  className="flex-1 h-9 rounded-xl border border-blue-900 dark:border-blue-500 text-blue-900 dark:text-blue-300 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-blue-50 dark:hover:bg-blue-950 active:scale-95 transition disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                  <span>{isHindi ? 'कनेक्शन जांचें' : 'Test API'}</span>
                </button>

                <button
                  onClick={handleSaveWpConfig}
                  className="flex-1 h-9 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs active:scale-95 transition"
                >
                  {isHindi ? 'सेव करें' : 'Save & Sync'}
                </button>
              </div>

              {/* Test Result Message */}
              {testResult && (
                <div
                  className={`p-2.5 rounded-xl border text-[11px] leading-relaxed ${
                    testResult.success
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                      : 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-800 dark:text-red-300'
                  }`}
                >
                  <div className="flex items-start gap-1.5">
                    {testResult.success ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                    )}
                    <span>{testResult.message}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. AdMob & Monetization Flow Preview */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 space-y-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">
              {isHindi ? 'विज्ञापन एवं मुद्रीकरण' : 'AdMob User Flow & Monetization'}
            </h3>
            <p className="text-[11px] text-slate-500">
              Native In-Feed Ad & Occasional Interstitial Ad
            </p>
          </div>
        </div>

        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
          {isHindi
            ? 'ऐप फ्लो: होम → जॉब लिस्ट → नेटिव/बैनर विज्ञापन → जॉब विवरण → सामयिक इंटरस्टीशियल विज्ञापन।'
            : 'Configured User Flow: Home → Job List → Native/Banner Ad → Job Details → Occasional Interstitial.'}
        </p>

        <button
          onClick={onTestInterstitialAd}
          className="w-full h-10 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isHindi ? 'इंटरस्टीशियल विज्ञापन टेस्ट करें' : 'Preview Interstitial Ad'}</span>
        </button>
      </div>

      {/* 3. Explore Other Sections */}
      <div>
        <h3 className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px] mb-2 px-1">
          {isHindi ? 'त्वरित अनुभाग' : 'Explore Sections'}
        </h3>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700/60 overflow-hidden">
          <button
            onClick={() => onNavigate('search')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-700/40 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">
                  {isHindi ? 'शक्तिशाली खोज (Power Search)' : 'Multi-Criteria Search System'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isHindi ? 'पद, योग्यता, विभाग, राज्य व अंतिम तिथि' : 'Search by title, dept, qualification, state'}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

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

      {/* 4. Preferences (Language, Dark Mode, Phone Frame) */}
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

          {/* Android Frame Switch */}
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

      {/* 5. Push Notification Preferences */}
      <div>
        <h3 className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px] mb-2 px-1">
          {isHindi ? 'सूचनाएं सेटिंग' : 'Push Notification Alerts'}
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

      {/* 6. Official Disclaimer */}
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
          Sarkari Vacancy Result v2.5.0 · WordPress REST API Ready · Material 3
        </div>
      </div>
    </div>
  );
};
