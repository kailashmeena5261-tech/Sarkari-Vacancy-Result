/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { SectionType, JobCategory, IndianState, QualificationLevel, Language, JobItem, NotificationItem } from './types';
import { MOCK_JOBS, MOCK_NOTIFICATIONS } from './data/mockData';
import { M3TopAppBar } from './components/M3TopAppBar';
import { M3BottomNav } from './components/M3BottomNav';
import { AndroidFrame } from './components/AndroidFrame';
import { JobDetailModal } from './components/JobDetailModal';
import { OfficialPdfViewerModal } from './components/OfficialPdfViewerModal';
import { FilterBottomSheet } from './components/FilterBottomSheet';
import { PullToRefresh } from './components/PullToRefresh';
import { Toast, ToastMessage } from './components/Toast';

import { LatestJobsSection } from './components/Sections/LatestJobsSection';
import { ResultsSection } from './components/Sections/ResultsSection';
import { AdmitCardsSection } from './components/Sections/AdmitCardsSection';
import { AnswerKeysSection } from './components/Sections/AnswerKeysSection';
import { AdmissionsSection } from './components/Sections/AdmissionsSection';
import { StudyMaterialSection } from './components/Sections/StudyMaterialSection';
import { FavoritesSection } from './components/Sections/FavoritesSection';
import { NotificationsSection } from './components/Sections/NotificationsSection';
import { SettingsSection } from './components/Sections/SettingsSection';
import { KotlinCodeViewer } from './components/Sections/KotlinCodeViewer';

import { ExternalLink, CheckCircle2, X } from 'lucide-react';

export default function App() {
  // 1. Core App State
  const [currentSection, setCurrentSection] = useState<SectionType>('jobs');
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('sarkari_lang') as Language) || 'hi';
  });
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('sarkari_dark') === 'true';
  });
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(() => {
    // Default to true on wider screens for realistic Android preview
    return window.innerWidth > 640;
  });

  // 2. Data & Persistence
  const [jobs, setJobs] = useState<JobItem[]>(MOCK_JOBS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('sarkari_notifs');
    return saved ? JSON.parse(saved) : MOCK_NOTIFICATIONS;
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('sarkari_favorites');
    return saved ? JSON.parse(saved) : ['ssc-cgl-2026', 'rrb-ntpc-2026'];
  });

  // 3. Search & Filter State
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>('all');
  const [selectedState, setSelectedState] = useState<IndianState>('all');
  const [selectedQualification, setSelectedQualification] = useState<QualificationLevel>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'closing-soon' | 'vacancies'>('latest');
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  // 4. Modals State
  const [activeJobDetail, setActiveJobDetail] = useState<JobItem | null>(null);
  const [activePdfJob, setActivePdfJob] = useState<JobItem | null>(null);
  const [applyPortalModal, setApplyPortalModal] = useState<JobItem | null>(null);

  // 5. Feedback Toasts & Refresh
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('sarkari_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('sarkari_dark', darkMode ? 'true' : 'false');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('sarkari_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('sarkari_notifs', JSON.stringify(notifications));
  }, [notifications]);

  // Toast Helper
  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle Favorite
  const handleToggleFavorite = (jobId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(jobId);
      if (exists) {
        showToast(language === 'hi' ? 'भर्ती पसंदीदा सूची से हटा दी गई' : 'Removed from Saved Vacancies', 'info');
        return prev.filter((id) => id !== jobId);
      } else {
        showToast(language === 'hi' ? 'भर्ती पसंदीदा सूची में सहेजी गई' : 'Saved to Bookmarks', 'success');
        return [...prev, jobId];
      }
    });
  };

  // Clear All Favorites
  const handleClearAllFavorites = () => {
    setFavorites([]);
    showToast(language === 'hi' ? 'सभी पसंदीदा भर्तियां हटा दी गईं' : 'All bookmarks cleared', 'info');
  };

  // Share Functionality (Native Web Share + WhatsApp fallback)
  const handleShare = async (job: JobItem) => {
    const shareText = `🏛️ *Sarkari Vacancy Result Alert*\n📋 *${job.title}*\n🏢 ${job.department}\n👥 Vacancies: ${job.totalVacancies > 0 ? job.totalVacancies.toLocaleString('en-IN') : 'Check Notice'}\n📅 Last Date: ${job.dates.applicationEnd || 'Refer Notice'}\n🔗 Official Portal: ${job.officialWebsite}\n\nCheck official notification & apply online via Sarkari Vacancy Result App!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: shareText,
          url: window.location.href,
        });
        showToast(language === 'hi' ? 'सफलतापूर्वक साझा किया गया' : 'Shared successfully', 'success');
        return;
      } catch (err) {
        // Fallback to clipboard if user cancelled or error
      }
    }

    // Fallback: Copy to clipboard
    navigator.clipboard.writeText(shareText);
    showToast(
      language === 'hi'
        ? 'भर्ती विवरण कॉपी किया गया! व्हाट्सएप पर पेस्ट कर साझा करें'
        : 'Recruitment text copied to clipboard for sharing!',
      'success'
    );
  };

  // Copy Direct Link
  const handleCopyLink = (job: JobItem) => {
    const url = `${window.location.origin}#${job.id}`;
    navigator.clipboard.writeText(url);
    showToast(language === 'hi' ? 'भर्ती लिंक कॉपी किया गया' : 'Job link copied to clipboard', 'success');
  };

  // Apply Online Simulation Modal Trigger
  const handleApplyOnline = (job: JobItem) => {
    setApplyPortalModal(job);
  };

  // Pull to refresh simulation
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsRefreshing(false);
    showToast(language === 'hi' ? 'भर्तियां अपडेट की गईं' : 'Recruitment feed updated', 'info');
  };

  // Notifications Management
  const handleMarkAllNotifsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast(language === 'hi' ? 'सभी सूचनाएं पढ़ी गईं' : 'All notifications marked as read', 'info');
  };

  const handleSelectNotification = (notif: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
    );
    if (notif.relatedJobId) {
      const target = jobs.find((j) => j.id === notif.relatedJobId);
      if (target) {
        setActiveJobDetail(target);
      }
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedState('all');
    setSelectedQualification('all');
    setSearchQuery('');
    setSortBy('latest');
    showToast(language === 'hi' ? 'फिल्टर रीसेट किए गए' : 'Filters reset to default', 'info');
  };

  // Filtered & Sorted Jobs
  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) => {
        // Category filter
        if (selectedCategory !== 'all' && job.category !== selectedCategory) {
          return false;
        }
        // State filter
        if (selectedState !== 'all' && job.state !== 'All India' && job.state !== selectedState) {
          return false;
        }
        // Qualification filter
        if (selectedQualification !== 'all' && job.qualification !== selectedQualification) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = job.title.toLowerCase().includes(q) || job.titleHi.toLowerCase().includes(q);
          const matchDept = job.department.toLowerCase().includes(q) || job.departmentHi.toLowerCase().includes(q);
          const matchAdvt = job.advtNumber.toLowerCase().includes(q);
          const matchState = job.state.toLowerCase().includes(q);
          if (!matchTitle && !matchDept && !matchAdvt && !matchState) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'vacancies') {
          return b.totalVacancies - a.totalVacancies;
        }
        if (sortBy === 'closing-soon') {
          return (a.status === 'closing-soon' ? -1 : 1);
        }
        // Default: latest
        return 0;
      });
  }, [jobs, selectedCategory, selectedState, selectedQualification, searchQuery, sortBy]);

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <AndroidFrame isPhoneFrame={isPhoneFrame} darkMode={darkMode}>
      {/* 1. Material 3 Top App Bar */}
      <M3TopAppBar
        currentSection={currentSection}
        onNavigate={setCurrentSection}
        language={language}
        onToggleLanguage={() => setLanguage((l) => (l === 'en' ? 'hi' : 'en'))}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((d) => !d)}
        isPhoneFrame={isPhoneFrame}
        onTogglePhoneFrame={() => setIsPhoneFrame((f) => !f)}
        unreadCount={unreadNotificationsCount}
        searchOpen={searchOpen}
        onToggleSearch={() => setSearchOpen(!searchOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 2. Main Content Area with Pull-to-Refresh */}
      <PullToRefresh onRefresh={handleRefresh} isRefreshing={isRefreshing}>
        <main className="flex-1 min-h-[calc(100vh-140px)]">
          {currentSection === 'jobs' && (
            <LatestJobsSection
              jobs={filteredJobs}
              language={language}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onOpenDetails={setActiveJobDetail}
              onShare={handleShare}
              onCopyLink={handleCopyLink}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedState={selectedState}
              selectedQualification={selectedQualification}
              onOpenFilterSheet={() => setFilterSheetOpen(true)}
              onResetFilters={handleResetFilters}
              isLoading={isLoading}
            />
          )}

          {currentSection === 'results' && (
            <ResultsSection
              jobs={jobs}
              language={language}
              onOpenDetails={setActiveJobDetail}
              onShare={handleShare}
            />
          )}

          {currentSection === 'admit-cards' && (
            <AdmitCardsSection
              jobs={jobs}
              language={language}
              onOpenDetails={setActiveJobDetail}
              onOpenPdf={setActivePdfJob}
            />
          )}

          {currentSection === 'answer-keys' && (
            <AnswerKeysSection
              jobs={jobs}
              language={language}
              onOpenDetails={setActiveJobDetail}
              onOpenPdf={setActivePdfJob}
            />
          )}

          {currentSection === 'admissions' && (
            <AdmissionsSection
              jobs={jobs}
              language={language}
              onOpenDetails={setActiveJobDetail}
              onApplyOnline={handleApplyOnline}
            />
          )}

          {currentSection === 'study-material' && (
            <StudyMaterialSection
              language={language}
              onDownloadToast={(title) =>
                showToast(
                  language === 'hi'
                    ? `${title} डाउनलोड हो रहा है...`
                    : `Downloading ${title}...`,
                  'success'
                )
              }
            />
          )}

          {currentSection === 'favorites' && (
            <FavoritesSection
              jobs={jobs}
              favorites={favorites}
              language={language}
              onToggleFavorite={handleToggleFavorite}
              onClearAllFavorites={handleClearAllFavorites}
              onOpenDetails={setActiveJobDetail}
              onShare={handleShare}
              onCopyLink={handleCopyLink}
              onNavigateToJobs={() => setCurrentSection('jobs')}
            />
          )}

          {currentSection === 'notifications' && (
            <NotificationsSection
              notifications={notifications}
              language={language}
              onMarkAllAsRead={handleMarkAllNotifsRead}
              onSelectNotification={handleSelectNotification}
            />
          )}

          {currentSection === 'settings' && (
            <SettingsSection
              language={language}
              onToggleLanguage={() => setLanguage((l) => (l === 'en' ? 'hi' : 'en'))}
              darkMode={darkMode}
              onToggleDarkMode={() => setDarkMode((d) => !d)}
              isPhoneFrame={isPhoneFrame}
              onTogglePhoneFrame={() => setIsPhoneFrame((f) => !f)}
              onNavigate={setCurrentSection}
              selectedState={selectedState}
              onSelectState={setSelectedState}
              onShowToast={showToast}
            />
          )}

          {currentSection === 'kotlin-code' && (
            <KotlinCodeViewer onShowToast={showToast} />
          )}
        </main>
      </PullToRefresh>

      {/* 3. Material 3 Bottom Navigation Bar */}
      <M3BottomNav
        currentSection={currentSection}
        onNavigate={setCurrentSection}
        language={language}
        favoritesCount={favorites.length}
      />

      {/* 4. Filter Bottom Sheet */}
      <FilterBottomSheet
        isOpen={filterSheetOpen}
        onClose={() => setFilterSheetOpen(false)}
        language={language}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedState={selectedState}
        onSelectState={setSelectedState}
        selectedQualification={selectedQualification}
        onSelectQualification={setSelectedQualification}
        sortBy={sortBy}
        onSelectSortBy={setSortBy}
        onReset={handleResetFilters}
        totalFilteredCount={filteredJobs.length}
      />

      {/* 5. Detailed Job Modal */}
      <JobDetailModal
        job={activeJobDetail}
        isOpen={!!activeJobDetail}
        onClose={() => setActiveJobDetail(null)}
        language={language}
        isFavorite={activeJobDetail ? favorites.includes(activeJobDetail.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onShare={handleShare}
        onCopyLink={handleCopyLink}
        onOpenPdf={(job) => {
          setActivePdfJob(job);
        }}
        onApplyOnline={(job) => {
          handleApplyOnline(job);
        }}
      />

      {/* 6. Official Notification PDF Viewer Modal */}
      <OfficialPdfViewerModal
        job={activePdfJob}
        isOpen={!!activePdfJob}
        onClose={() => setActivePdfJob(null)}
        language={language}
        onDownload={() => {
          showToast(
            language === 'hi'
              ? 'आधिकारिक अधिसूचना PDF डाउनलोड हो गई!'
              : 'Official Notification PDF Downloaded!',
            'success'
          );
        }}
        onShare={handleShare}
      />

      {/* 7. Official Apply Online Portal Modal */}
      {applyPortalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-blue-900 dark:text-blue-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {language === 'hi' ? 'आधिकारिक आवेदन पोर्टल' : 'Official Application Portal'}
                </h3>
              </div>
              <button
                onClick={() => setApplyPortalModal(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              {language === 'hi' ? applyPortalModal.titleHi : applyPortalModal.title}
            </p>

            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 space-y-2">
              <p className="font-semibold">
                {language === 'hi' ? 'आधिकारिक भर्ती यूआरएल:' : 'Official Recruitment Web Address:'}
              </p>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 font-mono text-[11px] text-blue-800 dark:text-blue-300 break-all select-all border border-blue-200 dark:border-slate-700">
                {applyPortalModal.officialWebsite}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                {language === 'hi'
                  ? 'सुरक्षा मानकों के तहत अभ्यर्थियों को सीधे आयोग की आधिकारिक वेबसाइट पर निर्देशित किया जाता है।'
                  : 'Applicants are directed to the official commission server to complete One-Time Registration & Fee Payment securely.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(applyPortalModal.officialWebsite);
                  showToast(language === 'hi' ? 'वेबसाइट लिंक कॉपी किया गया' : 'Website URL copied', 'success');
                }}
                className="flex-1 h-10 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition"
              >
                {language === 'hi' ? 'लिंक कॉपी करें' : 'Copy URL'}
              </button>
              <button
                onClick={() => {
                  window.open(applyPortalModal.officialWebsite, '_blank');
                  showToast(language === 'hi' ? 'आधिकारिक पोर्टल खोला जा रहा है' : 'Opening official portal', 'info');
                  setApplyPortalModal(null);
                }}
                className="flex-1 h-10 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition"
              >
                <span>{language === 'hi' ? 'पोर्टल पर जाएं' : 'Proceed to Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Toast Feedback Engine */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </AndroidFrame>
  );
}
