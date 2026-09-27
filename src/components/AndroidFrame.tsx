import React, { useState, useEffect } from 'react';
import { Wifi, Signal, Battery, Smartphone } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  isPhoneFrame: boolean;
  darkMode: boolean;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  isPhoneFrame,
  darkMode,
}) => {
  const [time, setTime] = useState('10:45');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).replace(/ AM| PM/, '')
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isPhoneFrame) {
    return (
      <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'}`}>
        <div className="max-w-3xl mx-auto min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col shadow-2xl relative">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-2 sm:p-6 transition-colors ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-200 text-slate-900'}`}>
      {/* Android Device Outer Bezel */}
      <div className="relative w-full max-w-[420px] h-[92vh] max-h-[880px] bg-slate-900 rounded-[44px] p-3 shadow-2xl ring-1 ring-slate-800 flex flex-col overflow-hidden">
        {/* Android Speaker Grill & Camera Punch-hole */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 pointer-events-none">
          <div className="w-3.5 h-3.5 rounded-full bg-slate-950 ring-2 ring-slate-800/80" />
        </div>

        {/* Screen Bezel Container */}
        <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[34px] overflow-hidden flex flex-col relative">
          {/* Android Status Bar */}
          <div className="h-8 px-6 bg-blue-900 dark:bg-slate-900 text-white flex items-center justify-between text-[11px] font-semibold tracking-tight shrink-0 select-none z-40">
            <span>{time}</span>
            <div className="flex items-center gap-1.5 text-white/90">
              <Signal className="w-3 h-3 fill-current" />
              <Wifi className="w-3 h-3" />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] tabular-nums">98%</span>
                <Battery className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
          </div>

          {/* App Body Content */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {children}
          </div>

          {/* Android 3-Button or Gesture Home Bar */}
          <div className="h-5 bg-white dark:bg-slate-900 flex items-center justify-center shrink-0 z-40">
            <div className="w-28 h-1 bg-slate-400 dark:bg-slate-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
