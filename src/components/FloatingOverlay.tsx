import React, { useState } from 'react';
import { Activity, Wifi, X, Maximize2, Minimize2, EyeOff } from 'lucide-react';
import { TrackedApp } from '../types';

interface FloatingOverlayProps {
  activeApp: TrackedApp;
  currentSpeedMbps: number;
  isOpen: boolean;
  onToggle: () => void;
  onOpenLiveTracker: () => void;
  isPaused: boolean;
}

export const FloatingOverlay: React.FC<FloatingOverlayProps> = ({
  activeApp,
  currentSpeedMbps,
  isOpen,
  onToggle,
  onOpenLiveTracker,
  isPaused,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  return (
    <div 
      id="floating-live-meter-overlay"
      className="fixed top-4 right-4 z-40 transition-all duration-300 select-none shadow-xl"
    >
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 rounded-full bg-[#252520]/95 text-[#f5f5f0] px-4 py-2 backdrop-blur-md border border-[#3e3e35] shadow-xs hover:scale-105 transition text-xs font-semibold cursor-pointer"
          title="Expand Live Meter"
        >
          <span className="h-2 w-2 rounded-full bg-[#a3b18a] animate-ping" />
          <span className="font-serif font-bold tracking-wide">{activeApp.name.slice(0, 2).toUpperCase()}: {activeApp.timeSpentMinutes}m</span>
          <Maximize2 className="h-3 w-3 text-[#8b8b80]" />
        </button>
      ) : (
        <div className="flex items-center gap-3 rounded-full bg-[#252520]/95 text-[#f5f5f0] pl-4 pr-2 py-2 backdrop-blur-md border border-[#3e3e35] ring-1 ring-white/5 shadow-xl">
          {/* Active status pulse */}
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isPaused
                  ? 'bg-amber-400'
                  : currentSpeedMbps > 5
                  ? 'bg-rose-500 animate-pulse'
                  : 'bg-[#a3b18a] animate-pulse'
              }`}
            />
            <span className="text-xs font-serif font-bold text-[#f5f5f0]">
              {isPaused ? 'Paused' : `${activeApp.name}: ${activeApp.timeSpentMinutes}m`}
            </span>
          </div>

          <div className="h-3 w-px bg-[#3e3e35]" />

          {/* Real-time speed */}
          <div className="flex items-center gap-1 text-xs tabular-nums text-[#a3b18a] font-mono font-medium">
            <Wifi className="h-3 w-3" />
            <span>{isPaused ? '0.0' : currentSpeedMbps.toFixed(1)} Mbps</span>
          </div>

          {/* Quick controls */}
          <div className="flex items-center gap-1 pl-1">
            <button
              onClick={onOpenLiveTracker}
              title="Open full Live Tracker"
              className="p-1 text-[#8b8b80] hover:text-white rounded-full hover:bg-white/10 transition cursor-pointer"
            >
              <Activity className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              title="Minimize pill"
              className="p-1 text-[#8b8b80] hover:text-white rounded-full hover:bg-white/10 transition cursor-pointer"
            >
              <Minimize2 className="h-3 w-3" />
            </button>
            <button
              onClick={onToggle}
              title="Close floating overlay"
              className="p-1 text-[#8b8b80] hover:text-rose-400 rounded-full hover:bg-white/10 transition cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
