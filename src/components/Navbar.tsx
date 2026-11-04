import React from 'react';
import { 
  Leaf, 
  LayoutDashboard, 
  Activity, 
  BarChart3, 
  Target, 
  BellRing, 
  Sparkles, 
  FileText, 
  Settings, 
  Wifi, 
  Wind, 
  Layers,
  LogOut,
  UserCheck,
  Download
} from 'lucide-react';
import { NavigationTab, UserProfile } from '../types';

interface NavbarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  user: UserProfile;
  liveSpeedMbps: number;
  isFloatingOpen: boolean;
  onToggleFloating: () => void;
  onOpenBreathingModal: () => void;
  onOpenDownloadModal?: () => void;
  onLogout: () => void;
  isPaused: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  user,
  liveSpeedMbps,
  isFloatingOpen,
  onToggleFloating,
  onOpenBreathingModal,
  onOpenDownloadModal,
  onLogout,
  isPaused,
}) => {
  const navItems: { tab: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { tab: 'live-tracker', label: 'Live Tracker', icon: <Activity className="h-4 w-4" /> },
    { tab: 'analytics', label: 'Analytics', icon: <BarChart3 className="h-4 w-4" /> },
    { tab: 'goals', label: 'Goals', icon: <Target className="h-4 w-4" /> },
    { tab: 'smart-alerts', label: 'Smart Alerts', icon: <BellRing className="h-4 w-4" /> },
    { tab: 'ai-insights', label: 'AI Insights', icon: <Sparkles className="h-4 w-4" /> },
    { tab: 'weekly-report', label: 'Weekly Report', icon: <FileText className="h-4 w-4" /> },
    { tab: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[#e5e5dc] bg-white/95 backdrop-blur-md transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Brand Logo & Calm Identity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('dashboard')}
              className="flex items-center gap-3 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 bg-[#5A5A40] rounded-full flex items-center justify-center shadow-lg shadow-[#5A5A40]/20 group-hover:scale-105 transition">
                <div className="w-3.5 h-3.5 bg-white rounded-full"></div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-serif font-bold italic tracking-tight text-[#5A5A40]">ZenFlow</span>
                  <span className="rounded-full bg-[#5A5A40]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#5A5A40]">Tracker</span>
                </div>
                <p className="text-[10px] text-[#8b8b80] font-medium tracking-wide">Healthy Internet Usage</p>
              </div>
            </button>
          </div>

          {/* Center Navigation Tabs (Scrollable on mobile) */}
          <nav className="hidden lg:flex items-center gap-1.5 overflow-x-auto py-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  id={`nav-${item.tab}`}
                  onClick={() => onSelectTab(item.tab)}
                  className={`inline-flex items-center gap-2 rounded-2xl px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#5A5A40] text-white shadow-xs'
                      : 'text-[#8b8b80] hover:bg-[#f0f0e8] hover:text-[#2d2d2a]'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'border border-[#8b8b80]'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Live Speed Indicator, Breath Button, Overlay Toggle, Profile */}
          <div className="flex items-center gap-2.5">
            
            {/* Live Speed Badge */}
            <div 
              onClick={() => onSelectTab('live-tracker')}
              className="cursor-pointer hidden sm:flex items-center gap-2 rounded-full border border-[#e5e5dc] bg-[#f9f9f5] px-3 py-1.5 text-xs font-medium text-[#5A5A40] shadow-2xs hover:bg-[#f0f0e8] transition"
              title="Live Network Speed"
            >
              <span className={`h-2 w-2 rounded-full ${isPaused ? 'bg-amber-500' : 'bg-[#5A5A40] animate-pulse'}`} />
              <Wifi className="h-3.5 w-3.5 text-[#5A5A40]" />
              <span className="font-mono tabular-nums font-bold text-xs">
                {isPaused ? 'Paused' : `${liveSpeedMbps.toFixed(1)} Mbps`}
              </span>
            </div>

            {/* Quick 10s Mindful Breath Intercept */}
            <button
              id="header-breath-trigger-btn"
              onClick={onOpenBreathingModal}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e5dc] bg-[#f0f0e8] px-3 py-1.5 text-xs font-semibold text-[#5A5A40] hover:bg-[#e5e5dc] transition shadow-2xs"
              title="Take a 10s conscious breath"
            >
              <Wind className="h-3.5 w-3.5 text-[#5A5A40]" />
              <span className="hidden md:inline">10s Breath</span>
            </button>

            {/* Floating Overlay Pill Toggle */}
            <button
              id="header-floating-toggle-btn"
              onClick={onToggleFloating}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition border ${
                isFloatingOpen
                  ? 'border-[#5A5A40] bg-[#5A5A40] text-white shadow-2xs'
                  : 'border-[#e5e5dc] bg-white text-[#5A5A40] hover:bg-[#f5f5f0]'
              }`}
              title="Toggle Live Floating Bubble Overlay"
            >
              <Layers className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">Overlay</span>
            </button>

            {/* Download App Files / Codebase */}
            {onOpenDownloadModal && (
              <button
                id="header-download-btn"
                onClick={onOpenDownloadModal}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#5A5A40]/30 bg-[#5A5A40]/10 px-3 py-1.5 text-xs font-semibold text-[#5A5A40] hover:bg-[#5A5A40] hover:text-white transition shadow-2xs cursor-pointer"
                title="Download App Files & Source Code (.ZIP)"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Download Code</span>
              </button>
            )}

            {/* User Avatar & Settings link */}
            <button
              id="header-profile-btn"
              onClick={() => onSelectTab('settings')}
              className="flex items-center gap-2 rounded-full p-1 pl-1 pr-3 hover:bg-[#f0f0e8] transition border border-[#e5e5dc] bg-[#f9f9f5]"
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-7 w-7 rounded-full object-cover ring-1 ring-[#5A5A40]/30"
              />
              <span className="text-xs font-bold text-[#2d2d2a] hidden sm:inline max-w-[80px] truncate font-serif">
                {user.name.split(' ')[0]}
              </span>
            </button>

            {/* Logout / Switch */}
            <button
              id="header-logout-btn"
              onClick={onLogout}
              className="p-1.5 rounded-full text-[#8b8b80] hover:text-[#2d2d2a] hover:bg-[#f0f0e8] transition"
              title="Log out / Switch Profile"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Navigation Bar */}
        <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto py-2.5 border-t border-[#e5e5dc] no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => onSelectTab(item.tab)}
                className={`flex items-center gap-1.5 rounded-2xl px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#5A5A40] text-white shadow-xs'
                    : 'text-[#8b8b80] hover:bg-[#f0f0e8] hover:text-[#2d2d2a]'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
