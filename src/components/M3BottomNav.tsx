import React from 'react';
import { Briefcase, Award, FileText, GraduationCap, LayoutGrid, Bookmark } from 'lucide-react';
import { SectionType, Language } from '../types';

interface M3BottomNavProps {
  currentSection: SectionType;
  onNavigate: (section: SectionType) => void;
  language: Language;
  favoritesCount: number;
}

export const M3BottomNav: React.FC<M3BottomNavProps> = ({
  currentSection,
  onNavigate,
  language,
  favoritesCount,
}) => {
  const isHindi = language === 'hi';

  const navItems: { id: SectionType; labelEn: string; labelHi: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'jobs', labelEn: 'Jobs', labelHi: 'नौकरियां', icon: Briefcase },
    { id: 'results', labelEn: 'Results', labelHi: 'परिणाम', icon: Award },
    { id: 'admit-cards', labelEn: 'Admit Card', labelHi: 'एडमिट कार्ड', icon: FileText },
    { id: 'admissions', labelEn: 'Admissions', labelHi: 'प्रवेश', icon: GraduationCap },
    { id: 'favorites', labelEn: 'Saved', labelHi: 'सेव्ड', icon: Bookmark, badge: favoritesCount },
    { id: 'settings', labelEn: 'Menu', labelHi: 'मेनू', icon: LayoutGrid },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 transition-colors"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="grid grid-cols-6 items-center h-16 max-w-lg mx-auto px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center h-full group focus:outline-none min-h-[44px]"
              aria-label={item.labelEn}
            >
              {/* Material 3 Active Pill Indicator */}
              <div
                className={`relative flex items-center justify-center w-12 h-7 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-100 dark:bg-blue-900/80 text-blue-900 dark:text-blue-200'
                    : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 px-1 min-w-[16px] h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[9px] flex items-center justify-center leading-none">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 truncate max-w-full font-medium transition-colors ${
                  isActive
                    ? 'text-blue-900 dark:text-blue-300 font-semibold'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {isHindi ? item.labelHi : item.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
