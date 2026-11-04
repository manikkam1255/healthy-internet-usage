import React from 'react';
import { 
  Sparkles, 
  Wifi, 
  Unlock, 
  Flame, 
  Clock, 
  Play, 
  TrendingDown, 
  ShieldCheck, 
  AlertCircle,
  TreeDeciduous,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { TrackedApp, UserGoal, UserProfile } from '../types';

interface DashboardViewProps {
  user: UserProfile;
  apps: TrackedApp[];
  goals: UserGoal[];
  totalScreenTimeMinutes: number;
  dailyGoalMinutes: number;
  dataUsedGB: number;
  unlocksCount: number;
  focusMinutes: number;
  timeSavedMinutes: number;
  onStartFocusSession: () => void;
  onSelectApp: (app: TrackedApp) => void;
  onNavigateToLiveTracker: () => void;
  onNavigateToGoals: () => void;
  onNavigateToAiInsights: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  apps,
  goals,
  totalScreenTimeMinutes,
  dailyGoalMinutes,
  dataUsedGB,
  unlocksCount,
  focusMinutes,
  timeSavedMinutes,
  onStartFocusSession,
  onSelectApp,
  onNavigateToLiveTracker,
  onNavigateToGoals,
  onNavigateToAiInsights,
}) => {
  const hoursSpent = Math.floor(totalScreenTimeMinutes / 60);
  const minutesSpent = totalScreenTimeMinutes % 60;
  const goalHours = Math.floor(dailyGoalMinutes / 60);
  const goalMinutes = dailyGoalMinutes % 60;

  const percentage = Math.min(Math.round((totalScreenTimeMinutes / dailyGoalMinutes) * 100), 100);
  
  // Circumference for SVG circle
  const radius = 80;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Digital tree growth calculation (grows when under 70%, blossoms under 50%, withers if > 90%)
  const isTreeFlourishing = percentage < 75;
  const isTreeWithering = percentage > 85;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Calm Tech Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-[32px] bg-[#5A5A40] p-6 sm:p-8 text-white shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#f5f5f0]">
            <Sparkles className="h-3.5 w-3.5 text-[#f5f5f0]" />
            <span>Daily Equilibrium Report</span>
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-serif italic tracking-tight font-medium text-white">
            Good Morning, {user.name.split(' ')[0]}.
          </h1>
          <p className="mt-1 text-sm text-[#e5e5dc] font-medium">
            You're 15% more focused today! Kept screen-free for 4 hours offline.
          </p>
        </div>

        {/* Quick Action Button: Large "Start Focus Session" */}
        <div className="flex items-center gap-3">
          <button
            id="start-focus-session-btn"
            onClick={onStartFocusSession}
            className="flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-[#5A5A40] shadow-sm hover:bg-[#f5f5f0] hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-[#5A5A40] text-[#5A5A40]" />
            <span>Start Focus Session</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Donut Progress Ring Centerpiece & Digital Tree Gamification */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left/Center Card: Donut Progress Ring */}
        <div 
          id="dashboard-donut-card"
          className="lg:col-span-7 rounded-[32px] bg-white p-6 sm:p-8 border border-[#e5e5dc] shadow-2xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#2d2d2a]">Total Screen Time</h2>
              <p className="text-xs text-[#8b8b80]">Live aggregated time across all connected devices</p>
            </div>
            <span className="rounded-full bg-[#f0f0e8] px-3.5 py-1 text-xs font-semibold text-[#5A5A40] flex items-center gap-1.5 border border-[#e5e5dc]">
              <TrendingDown className="h-3.5 w-3.5" />
              <span>+{timeSavedMinutes}m Saved vs last week</span>
            </span>
          </div>

          {/* Large Donut Progress Ring */}
          <div className="my-6 flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="relative flex items-center justify-center">
              <svg className="h-56 w-56 -rotate-90 transform" viewBox="0 0 200 200">
                {/* Background Ring */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke="#e5e5dc"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                {/* Active Progress Ring */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke={percentage > 85 ? '#b91c1c' : percentage > 70 ? '#d97736' : '#5A5A40'}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Center Display: 2h 45m / Goal: 4h 00m */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-[#5A5A40]">
                  {hoursSpent}h {minutesSpent}m
                </span>
                <span className="mt-1 text-xs font-medium text-[#8b8b80]">
                  Goal: {goalHours}h {goalMinutes > 0 ? `${goalMinutes}m` : '00m'}
                </span>
                <span className="mt-1.5 text-[11px] font-bold uppercase tracking-wider text-[#5A5A40] bg-[#f0f0e8] px-2.5 py-0.5 rounded-full border border-[#e5e5dc]">
                  {percentage}% of daily cap
                </span>
              </div>
            </div>

            {/* Micro Breakdown Stats */}
            <div className="space-y-3 w-full sm:w-56">
              <div className="p-3.5 rounded-2xl bg-[#f9f9f5] border border-[#e5e5dc]">
                <div className="flex justify-between items-center text-xs text-[#8b8b80] mb-1.5">
                  <span className="font-medium">Productive Time</span>
                  <span className="font-bold text-[#2d2d2a] font-serif text-sm">1h 18m</span>
                </div>
                <div className="w-full bg-[#e5e5dc] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#5A5A40] h-full rounded-full w-[48%]" />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f9f9f5] border border-[#e5e5dc]">
                <div className="flex justify-between items-center text-xs text-[#8b8b80] mb-1.5">
                  <span className="font-medium">Entertainment & Social</span>
                  <span className="font-bold text-[#2d2d2a] font-serif text-sm">1h 27m</span>
                </div>
                <div className="w-full bg-[#e5e5dc] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#e8a87c] h-full rounded-full w-[52%]" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#8b8b80] pt-1">
                <span>Remaining Buffer:</span>
                <span className="font-bold text-[#5A5A40] font-serif text-sm">
                  {Math.max(0, dailyGoalMinutes - totalScreenTimeMinutes)} mins
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#e5e5dc] pt-4 text-xs text-[#8b8b80]">
            <span>Pacing status: On track to stay well beneath your 4h threshold</span>
            <button 
              onClick={onNavigateToGoals}
              className="text-[#5A5A40] font-bold hover:underline flex items-center gap-1"
            >
              Adjust Limit <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Right Card: Digital Tree Gamification */}
        <div 
          id="digital-tree-gamification-card"
          className="lg:col-span-5 rounded-[32px] bg-[#f9f9f5] p-6 sm:p-8 border border-[#e5e5dc] shadow-2xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#5A5A40]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#5A5A40]">
                <TreeDeciduous className="h-3.5 w-3.5 text-[#5A5A40]" />
                <span>Zen Sprout Tree</span>
              </div>
              <span className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider">Stage 3 of 4</span>
            </div>

            <h3 className="mt-3 text-2xl font-serif text-[#2d2d2a]">
              {isTreeWithering 
                ? "Leaves Drooping! Doom-scroll Alert" 
                : isTreeFlourishing 
                ? "Flourishing Bonsai (Healthy!)" 
                : "Growing Steadily"}
            </h3>
            <p className="mt-1 text-xs text-[#8b8b80]">
              Your digital tree blossoms when you honor screen-free periods and respect daily caps.
            </p>
          </div>

          {/* Visual Digital Tree Illustration */}
          <div className="my-6 flex flex-col items-center justify-center">
            <div className="relative flex h-36 w-36 items-center justify-center rounded-3xl bg-white shadow-2xs border border-[#e5e5dc] p-4">
              <div className={`transition-all duration-700 ${isTreeFlourishing ? 'scale-110' : ''}`}>
                <TreeDeciduous className={`h-24 w-24 ${
                  isTreeWithering ? 'text-[#d97736]' : 'text-[#5A5A40] animate-pulse-glow'
                }`} />
              </div>
              <span className="absolute bottom-2 rounded-full bg-[#f0f0e8] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] border border-[#e5e5dc]">
                14 Days Alive
              </span>
            </div>
            <div className="mt-3 text-center">
              <p className="text-xs font-bold text-[#2d2d2a]">Daily Water Level: 84%</p>
              <p className="text-[11px] text-[#8b8b80]">Each 30m of deep focus nourishes the roots.</p>
            </div>
          </div>

          {/* Quick Habit Action */}
          <button
            onClick={onNavigateToAiInsights}
            className="w-full rounded-full border border-[#5A5A40] bg-white py-3 text-xs font-bold uppercase tracking-widest text-[#5A5A40] shadow-2xs hover:bg-[#5A5A40] hover:text-white transition text-center"
          >
            Check AI Behavior Insights ➔
          </button>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Metric 1: Data Used */}
        <div 
          id="stat-card-data-used"
          className="rounded-[28px] bg-white p-5 border border-[#e5e5dc] shadow-2xs flex items-center gap-4"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f0e8] text-[#5A5A40] border border-[#e5e5dc]">
            <Wifi className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#8b8b80] uppercase tracking-widest">Data Consumption</p>
            <h4 className="text-2xl font-serif font-bold text-[#2d2d2a]">{dataUsedGB.toFixed(1)} GB used</h4>
            <p className="text-[11px] text-[#8b8b80]">Wi-Fi & Cellular today</p>
          </div>
        </div>

        {/* Metric 2: Unlocks */}
        <div 
          id="stat-card-unlocks"
          className="rounded-[28px] bg-white p-5 border border-[#e5e5dc] shadow-2xs flex items-center gap-4"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f0e8] text-[#5A5A40] border border-[#e5e5dc]">
            <Unlock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#8b8b80] uppercase tracking-widest">Device Pickups</p>
            <h4 className="text-2xl font-serif font-bold text-[#2d2d2a]">{unlocksCount} Unlocks</h4>
            <p className="text-[11px] text-[#5A5A40] font-semibold">18% lower than average</p>
          </div>
        </div>

        {/* Metric 3: Focus Work Session */}
        <div 
          id="stat-card-focus-session"
          className="rounded-[28px] bg-white p-5 border border-[#e5e5dc] shadow-2xs flex items-center gap-4"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f0e8] text-[#5A5A40] border border-[#e5e5dc]">
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#8b8b80] uppercase tracking-widest">Deep Work Focus</p>
            <h4 className="text-2xl font-serif font-bold text-[#2d2d2a]">{focusMinutes}m Session</h4>
            <p className="text-[11px] text-[#8b8b80]">Zero notification intrusions</p>
          </div>
        </div>
      </div>

      {/* Top 4 Used Apps Horizontal Scroll Cards */}
      <div className="rounded-[32px] bg-white p-6 sm:p-8 border border-[#e5e5dc] shadow-2xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xl font-serif font-bold text-[#2d2d2a]">Top Used Apps Today</h3>
            <p className="text-xs text-[#8b8b80]">Live usage breakdown with real-time speed indicators</p>
          </div>
          <button 
            onClick={onNavigateToLiveTracker}
            className="text-xs font-bold uppercase tracking-wider text-[#5A5A40] hover:underline flex items-center gap-1"
          >
            Launch Live Pulse Meter <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {apps.slice(0, 4).map((app) => {
            const appLimitPercent = Math.round((app.timeSpentMinutes / app.dailyLimitMinutes) * 100);
            const isHighSpeed = app.currentSpeedMbps > 5;
            return (
              <div
                key={app.id}
                id={`top-app-card-${app.id}`}
                onClick={() => onSelectApp(app)}
                className="group relative cursor-pointer rounded-2xl border border-[#e5e5dc] bg-[#f9f9f5] p-4.5 hover:bg-white hover:border-[#5A5A40]/50 hover:shadow-xs transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold text-sm shadow-2xs"
                      style={{ backgroundColor: app.color }}
                    >
                      {app.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#2d2d2a] group-hover:text-[#5A5A40] transition">
                        {app.name}
                      </h4>
                      <span className="text-[11px] text-[#8b8b80]">{app.category}</span>
                    </div>
                  </div>

                  {/* Speed Pill */}
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    isHighSpeed 
                      ? 'bg-[#e8a87c]/30 text-[#b91c1c] border border-[#e8a87c]' 
                      : 'bg-[#f0f0e8] text-[#5A5A40] border border-[#e5e5dc]'
                  }`}>
                    {app.currentSpeedMbps} Mbps
                  </span>
                </div>

                {/* Progress bar for app limit */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-[#8b8b80] mb-1">
                    <span className="font-semibold text-[#2d2d2a] font-serif">{app.timeSpentMinutes}m spent</span>
                    <span className="text-[#8b8b80]">Cap: {app.dailyLimitMinutes}m</span>
                  </div>
                  <div className="h-2 w-full bg-[#e5e5dc] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        appLimitPercent >= 80 ? 'bg-[#b91c1c]' : appLimitPercent >= 60 ? 'bg-[#e8a87c]' : 'bg-[#5A5A40]'
                      }`}
                      style={{ width: `${Math.min(appLimitPercent, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-[#8b8b80] pt-2 border-t border-[#e5e5dc]">
                  <span>Data: {app.dataUsedMB} MB</span>
                  <span className="text-[#5A5A40] font-bold group-hover:underline">View Live Tracker ➔</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
