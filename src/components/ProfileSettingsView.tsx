import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  ShieldCheck, 
  EyeOff, 
  Palette, 
  Download, 
  Volume2, 
  Vibrate, 
  Check, 
  Sparkles, 
  Lock, 
  CheckCircle2,
  Trash2,
  FolderArchive,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { TrackedApp, UserProfile } from '../types';

interface ProfileSettingsViewProps {
  user: UserProfile;
  apps: TrackedApp[];
  onUpdateUser: (updatedUser: Partial<UserProfile>) => void;
  onToggleWhitelistApp: (appId: string) => void;
  onOpenDownloadModal?: () => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({
  user,
  apps,
  onUpdateUser,
  onToggleWhitelistApp,
  onOpenDownloadModal,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);

  const handleExportCSV = () => {
    const headers = 'App Name,Category,Time Spent (min),Data (MB),Whitelisted\n';
    const rows = apps
      .map((app) => `${app.name},${app.category},${app.timeSpentMinutes},${app.dataUsedMB},${app.isWhitelisted}`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zenflow_internet_usage_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleDownloadZip = () => {
    setIsDownloadingZip(true);
    window.location.href = '/api/download/zip';
    setTimeout(() => setIsDownloadingZip(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      
      {/* Top Profile Card */}
      <div className="rounded-[32px] bg-white p-6 sm:p-8 border border-[#e5e5dc] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="h-20 w-20 rounded-full object-cover ring-4 ring-[#5A5A40]/20 shadow-md"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#5A5A40]/10 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-[#5A5A40]">
              <Sparkles className="h-3 w-3" />
              <span>{user.zenLevel}</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#2d2d2a] mt-1">{user.name}</h2>
            <p className="text-xs text-[#8b8b80] font-mono">{user.email}</p>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end gap-2 bg-[#f9f9f5] p-4 rounded-2xl border border-[#e5e5dc]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A5A40]">Current Mindfulness Streak</span>
          <span className="text-2xl font-serif font-bold text-[#5A5A40]">{user.streakDays} Consecutive Days</span>
        </div>
      </div>

      {/* Whitelist Manager ("Always Allowed" Apps) */}
      <div className="rounded-[32px] bg-white p-6 sm:p-8 border border-[#e5e5dc] shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#5A5A40]" />
              <h3 className="text-base font-serif font-bold text-[#2d2d2a]">Always Allowed Whitelist</h3>
            </div>
            <p className="text-xs text-[#8b8b80] mt-0.5">
              These applications will never trigger limit warnings, focus intercepts, or curfew locks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {apps.map((app) => {
            return (
              <div
                key={app.id}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  app.isWhitelisted
                    ? 'border-[#5A5A40]/30 bg-[#f9f9f5]'
                    : 'border-[#e5e5dc] bg-[#f9f9f5]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white font-bold text-xs"
                    style={{ backgroundColor: app.color }}
                  >
                    {app.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2d2d2a]">{app.name}</h4>
                    <span className="text-[10px] text-[#8b8b80]">{app.category}</span>
                  </div>
                </div>

                <button
                  id={`toggle-whitelist-${app.id}`}
                  onClick={() => onToggleWhitelistApp(app.id)}
                  className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition ${
                    app.isWhitelisted
                      ? 'bg-[#5A5A40] text-white'
                      : 'border border-[#e5e5dc] text-[#5A5A40] hover:bg-[#f0f0e8]'
                  }`}
                >
                  {app.isWhitelisted ? 'Whitelisted' : 'Add'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Privacy & Incognito Mode */}
      <div className="rounded-[32px] bg-white p-6 sm:p-8 border border-[#e5e5dc] shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f0f0e8] text-[#5A5A40]">
              <EyeOff className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-[#2d2d2a]">Incognito Privacy Mode</h3>
              <p className="text-xs text-[#8b8b80] mt-0.5 leading-relaxed">
                Temporarily suspend all internet data velocity logging and app tracking for 1 hour. No metrics will be recorded.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
            <input
              type="checkbox"
              checked={user.isIncognito}
              onChange={(e) => onUpdateUser({ isIncognito: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#e5e5dc] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#dcdcd2] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5A5A40]"></div>
          </label>
        </div>
      </div>

      {/* Theme & Sensory Aesthetics */}
      <div className="rounded-[32px] bg-white p-6 sm:p-8 border border-[#e5e5dc] shadow-2xs space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Palette className="h-5 w-5 text-[#5A5A40]" />
            <h3 className="text-base font-serif font-bold text-[#2d2d2a]">Calm Tech Themes</h3>
          </div>
          <p className="text-xs text-[#8b8b80]">
            Select an eye-safe visual palette designed to minimize eye strain and screen fatigue.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'light', label: 'Warm Organic', desc: 'Earthy olive, warm stone, and serene neutrals' },
            { id: 'dark', label: 'Deep Earth', desc: 'Muted charcoal and warm clay for evening' },
            { id: 'oled', label: 'OLED Zen', desc: 'True black contrast with warm ochre highlights' },
          ].map((themeOpt) => {
            const isSelected = user.theme === themeOpt.id;
            return (
              <button
                key={themeOpt.id}
                onClick={() => onUpdateUser({ theme: themeOpt.id as UserProfile['theme'] })}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-[#5A5A40] bg-[#f9f9f5] ring-2 ring-[#5A5A40]/20 shadow-2xs'
                    : 'border-[#e5e5dc] bg-[#f0f0e8]/40 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-serif font-bold text-[#2d2d2a]">{themeOpt.label}</h4>
                  {isSelected && <Check className="h-4 w-4 text-[#5A5A40]" />}
                </div>
                <p className="text-[11px] text-[#8b8b80]">{themeOpt.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Audio & Haptics */}
        <div className="pt-4 border-t border-[#e5e5dc] grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f9f9f5] border border-[#e5e5dc] cursor-pointer">
            <span className="text-xs font-semibold text-[#2d2d2a] flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-[#5A5A40]" />
              Gentle Chime Sounds
            </span>
            <input
              type="checkbox"
              checked={user.soundEnabled}
              onChange={(e) => onUpdateUser({ soundEnabled: e.target.checked })}
              className="h-4 w-4 rounded border-[#e5e5dc] text-[#5A5A40] accent-[#5A5A40]"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f9f9f5] border border-[#e5e5dc] cursor-pointer">
            <span className="text-xs font-semibold text-[#2d2d2a] flex items-center gap-2">
              <Vibrate className="h-4 w-4 text-[#5A5A40]" />
              Breathing Haptic Pulses
            </span>
            <input
              type="checkbox"
              checked={user.hapticsEnabled}
              onChange={(e) => onUpdateUser({ hapticsEnabled: e.target.checked })}
              className="h-4 w-4 rounded border-[#e5e5dc] text-[#5A5A40] accent-[#5A5A40]"
            />
          </label>
        </div>
      </div>

      {/* App Codebase & Source Files Export */}
      <div className="rounded-[32px] bg-white p-6 sm:p-8 border border-[#e5e5dc] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FolderArchive className="h-5 w-5 text-[#5A5A40]" />
              <h3 className="text-base font-serif font-bold text-[#2d2d2a]">Download App Files & Source Code</h3>
            </div>
            <p className="text-xs text-[#8b8b80] max-w-xl">
              Export the complete, production-ready ZenFlow application codebase as a standalone <strong className="text-[#2d2d2a]">.ZIP archive</strong> containing all React 19 components, Tailwind CSS styles, Vite setup, Express server, and local development scripts.
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {onOpenDownloadModal && (
              <button
                type="button"
                onClick={onOpenDownloadModal}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-full border border-[#e5e5dc] bg-[#f9f9f5] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#5A5A40] hover:bg-[#f0f0e8] transition whitespace-nowrap cursor-pointer"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>Setup Guide</span>
              </button>
            )}

            <button
              id="export-zip-btn"
              onClick={handleDownloadZip}
              disabled={isDownloadingZip}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-full bg-[#5A5A40] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#484833] transition whitespace-nowrap shadow-2xs cursor-pointer disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              <span>{isDownloadingZip ? 'Downloading ZIP...' : 'Download Project .ZIP'}</span>
            </button>
          </div>
        </div>

        {/* Local commands preview pill */}
        <div className="pt-3 border-t border-[#e5e5dc] flex flex-wrap items-center justify-between gap-2 text-xs text-[#8b8b80]">
          <span className="font-mono bg-[#f0f0e8] px-3 py-1 rounded-full text-[#5A5A40] font-semibold text-[11px]">
            npm install && npm run dev
          </span>
          <span className="text-[11px]">Ready for Node.js 18+ · React 19 · Vite 6</span>
        </div>
      </div>

      {/* Raw Telemetry Data CSV Export */}
      <div className="rounded-[32px] bg-white p-6 sm:p-8 border border-[#e5e5dc] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-serif font-bold text-[#2d2d2a]">Telemetry Data Export (CSV)</h3>
          <p className="text-xs text-[#8b8b80] mt-0.5">
            Download your raw bandwidth consumption and app duration logs as an offline CSV spreadsheet.
          </p>
        </div>

        <button
          id="export-csv-btn"
          onClick={handleExportCSV}
          className="flex items-center gap-2 rounded-full border border-[#e5e5dc] bg-[#f9f9f5] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#5A5A40] hover:bg-[#f0f0e8] transition whitespace-nowrap shadow-2xs cursor-pointer"
        >
          <Download className="h-4 w-4" />
          <span>{downloadSuccess ? '✓ CSV Generated!' : 'Download CSV Logs'}</span>
        </button>
      </div>
    </div>
  );
};
