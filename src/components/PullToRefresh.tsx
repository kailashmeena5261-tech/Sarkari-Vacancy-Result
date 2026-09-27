import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  isRefreshing: boolean;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  isRefreshing,
}) => {
  const [pullDistance, setPullDistance] = useState(0);
  const startYRef = useRef(0);
  const isPullingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const MAX_PULL = 80;
  const THRESHOLD = 60;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current && containerRef.current.scrollTop === 0) {
      startYRef.current = e.touches[0].clientY;
      isPullingRef.current = true;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPullingRef.current) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startYRef.current;

    if (diff > 0) {
      // Elastic resistance formula
      const distance = Math.min(MAX_PULL, diff * 0.4);
      setPullDistance(distance);
    }
  };

  const handleTouchEnd = async () => {
    if (!isPullingRef.current) return;
    isPullingRef.current = false;

    if (pullDistance >= THRESHOLD) {
      setPullDistance(THRESHOLD);
      await onRefresh();
    }
    setPullDistance(0);
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative flex-1 overflow-y-auto no-scrollbar"
    >
      {/* Visual Pull Indicator */}
      <div
        className="flex items-center justify-center transition-all overflow-hidden"
        style={{
          height: `${isRefreshing ? 48 : pullDistance}px`,
          opacity: isRefreshing ? 1 : pullDistance / THRESHOLD,
        }}
      >
        <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-blue-900 dark:text-blue-300">
          <RefreshCw
            className={`w-4 h-4 transition-transform ${
              isRefreshing ? 'animate-spin' : ''
            }`}
            style={{
              transform: isRefreshing ? undefined : `rotate(${pullDistance * 4}deg)`,
            }}
          />
        </div>
      </div>

      {children}
    </div>
  );
};
