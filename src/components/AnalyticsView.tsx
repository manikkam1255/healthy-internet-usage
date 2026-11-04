import React, { useState } from 'react';
import { 
  BarChart3, 
  Clock, 
  Calendar, 
  Flame, 
  AlertOctagon, 
  Info, 
  TrendingDown, 
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { DailyUsageData, HourlyHeatmapSlot, TrackedApp } from '../types';

interface AnalyticsViewProps {
  apps: TrackedApp[];
  weeklyHistory: DailyUsageData[];
  hourlyHeatmap: HourlyHeatmapSlot[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  apps,
  weeklyHistory,
  hourlyHeatmap,
}) => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');
  const [selectedHour, setSelectedHour] = useState<HourlyHeatmapSlot | null>(hourlyHeatmap[22]); // 10 PM default

  // Calculate Category breakdown
  const categoryTotals: Record<string, number> = {
    Social: 0,
    Productivity: 0,
    Entertainment: 0,
    Utility: 0,
  };

  apps.forEach((app) => {
    if (categoryTotals[app.category] !== undefined) {
      categoryTotals[app.category] += app.timeSpentMinutes;
    } else {
      categoryTotals['Utility'] += app.timeSpentMinutes;
    }
  });

  const totalTrackedMinutes = Object.values(categoryTotals).reduce((a, b) => a + b, 0) || 1;
  const socialPercent = Math.round((categoryTotals['Social'] / totalTrackedMinutes) * 100);
  const prodPercent = Math.round((categoryTotals['Productivity'] / totalTrackedMinutes) * 100);
  const entPercent = Math.round((categoryTotals['Entertainment'] / totalTrackedMinutes) * 100);
  const utilPercent = 100 - socialPercent - prodPercent - entPercent;

  // Max minutes in daily history for scaling
  const maxDayMinutes = Math.max(...weeklyHistory.map((d) => d.screenTimeMinutes));

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Header & Range Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-[32px] bg-white p-6 sm:p-8 border border-[#e5e5dc] shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#5A5A40]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#5A5A40]">
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Digital Consumption Science</span>
          </div>
          <h1 className="mt-2 text-3xl font-serif font-bold text-[#2d2d2a]">Habit & Usage Analytics</h1>
          <p className="mt-1 text-xs text-[#8b8b80]">
            Uncover psychological usage patterns, addiction peak hours, and cognitive strain indicators.
          </p>
        </div>

        {/* [Day] [Week] [Month] Toggle */}
        <div className="inline-flex rounded-full bg-[#f0f0e8] p-1.5 border border-[#e5e5dc] self-start sm:self-auto">
          {(['day', 'week', 'month'] as const).map((range) => (
            <button
              key={range}
              id={`analytics-range-${range}`}
              onClick={() => setTimeRange(range)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                timeRange === range
                  ? 'bg-[#5A5A40] text-white shadow-xs'
                  : 'text-[#8b8b80] hover:text-[#2d2d2a]'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stress & Habit Insight Callout */}
      <div 
        id="stress-habit-insight-banner"
        className="rounded-[28px] border border-[#e5e5dc] bg-[#f9f9f5] p-6 shadow-2xs flex items-start gap-4"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#d97736] text-white shadow-xs">
          <AlertOctagon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-base font-serif font-bold text-[#2d2d2a]">
            Psychological Habit Insight: Doom-Scrolling & Stress
          </h3>
          <p className="mt-1 text-xs text-[#52524a] leading-relaxed">
            <strong>You spend 30% of your total internet time on apps that trigger stress</strong> (Instagram & X feeds).
            Late evening sessions (10:00 PM – 12:00 AM) feature rapid scrolling velocity with frequent context-switching, generating mild cortisol spikes before sleep.
          </p>
        </div>
      </div>

      {/* Weekly Daily Trends Bar Graph */}
      <div className="rounded-[32px] bg-white p-6 sm:p-8 border border-[#e5e5dc] shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-xl font-serif font-bold text-[#2d2d2a]">Daily Screen Time Trends (Monday - Sunday)</h3>
            <p className="text-xs text-[#8b8b80]">Comparison of daily screen time caps vs actual logged minutes</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-[#8b8b80]">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#5A5A40]" />
              Under Daily Cap
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#d97736]" />
              Surpassed Cap
            </span>
          </div>
        </div>

        {/* Vertical Bar Chart */}
        <div className="h-64 flex items-end justify-between gap-2 sm:gap-6 pt-8 pb-2 px-2 sm:px-6 border-b border-[#e5e5dc]">
          {weeklyHistory.map((item) => {
            const heightPercent = Math.round((item.screenTimeMinutes / maxDayMinutes) * 100);
            const isExceeded = item.screenTimeMinutes > 240; // 4h cap
            const hours = Math.floor(item.screenTimeMinutes / 60);
            const mins = item.screenTimeMinutes % 60;

            return (
              <div key={item.day} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                {/* Tooltip on hover */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#2d2d2a] text-[#f5f5f0] text-[11px] rounded-lg py-1 px-2 pointer-events-none whitespace-nowrap z-10 shadow-md">
                  {hours}h {mins}m • {item.dataGB} GB
                </div>

                <div 
                  className={`w-full max-w-[48px] rounded-t-xl transition-all duration-500 group-hover:opacity-90 ${
                    isExceeded ? 'bg-[#d97736]' : 'bg-[#5A5A40]'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="mt-3 text-xs font-bold text-[#2d2d2a] truncate">{item.day}</span>
                <span className="text-[10px] text-[#8b8b80] tabular-nums">{hours}h {mins}m</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 24-Hour Heatmap Grid & Category Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 24-Hour Addiction Heatmap Grid (GitHub style) */}
        <div 
          id="analytics-24h-heatmap-card"
          className="lg:col-span-8 rounded-[32px] bg-white p-6 sm:p-8 border border-[#e5e5dc] shadow-2xs"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-serif font-bold text-[#2d2d2a]">24-Hour Addiction Heatmap</h3>
                <span className="rounded-full bg-[#d97736]/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#b45309] border border-[#d97736]/30">
                  Peak: 10 PM - 12 AM
                </span>
              </div>
              <p className="text-xs text-[#8b8b80]">
                Hourly activity density. Darkest squares reveal repetitive checking habits and bedtime doom-scrolling.
              </p>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-1.5 text-[10px] text-[#8b8b80]">
              <span>Less</span>
              <span className="h-3 w-3 rounded bg-[#f0f0e8]" />
              <span className="h-3 w-3 rounded bg-[#dcdcd2]" />
              <span className="h-3 w-3 rounded bg-[#a3b18a]" />
              <span className="h-3 w-3 rounded bg-[#5A5A40]" />
              <span className="h-3 w-3 rounded bg-[#d97736] ring-1 ring-[#c4682b]" />
              <span>Heavy</span>
            </div>
          </div>

          {/* 24 Hour Blocks Grid (12 AM to 11 PM) */}
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 my-6">
            {hourlyHeatmap.map((slot) => {
              const isSelected = selectedHour?.hour === slot.hour;
              let bgClass = 'bg-[#f0f0e8] hover:bg-[#e5e5dc] text-[#52524a]';
              if (slot.isStressTrigger) {
                bgClass = 'bg-[#d97736] text-white font-bold ring-2 ring-[#e8a87c]';
              } else if (slot.intensity === 3) {
                bgClass = 'bg-[#5A5A40] text-white';
              } else if (slot.intensity === 2) {
                bgClass = 'bg-[#a3b18a] text-white';
              } else if (slot.intensity === 1) {
                bgClass = 'bg-[#dcdcd2] text-[#2d2d2a]';
              }

              return (
                <button
                  key={slot.hour}
                  onClick={() => setSelectedHour(slot)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${bgClass} ${
                    isSelected ? 'ring-3 ring-[#5A5A40] shadow-sm scale-105' : ''
                  }`}
                  title={`${slot.label}: ${slot.minutes} mins spent`}
                >
                  <span className="text-[10px] uppercase font-semibold">{slot.label.replace(' ', '')}</span>
                  <span className="text-xs font-mono font-bold mt-0.5">{slot.minutes}m</span>
                </button>
              );
            })}
          </div>

          {/* Selected Hour Details */}
          {selectedHour && (
            <div className="rounded-2xl bg-[#f9f9f5] p-4 border border-[#e5e5dc] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#5A5A40]" />
                  <h4 className="text-xs font-bold text-[#2d2d2a]">
                    Inspecting {selectedHour.label} ({selectedHour.minutes} minutes logged)
                  </h4>
                  {selectedHour.isStressTrigger && (
                    <span className="text-[10px] font-bold text-[#b45309] bg-[#d97736]/15 px-2 py-0.5 rounded-full border border-[#d97736]/30">
                      High Dopamine Stress Window
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#8b8b80] mt-1">
                  {selectedHour.isStressTrigger
                    ? "Peak late-night consumption window. Dominated by algorithmic video feeds (Reels & Shorts)."
                    : "Standard daytime intermittent checking. Well within healthy biological limits."}
                </p>
              </div>

              {selectedHour.isStressTrigger && (
                <button 
                  className="rounded-full bg-[#5A5A40] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[#484833] whitespace-nowrap"
                  onClick={() => alert("Bedtime Wind-Down Lock scheduled for 10:00 PM!")}
                >
                  Lock Apps at 10 PM
                </button>
              )}
            </div>
          )}
        </div>

        {/* Category Split (Social, Productivity, Entertainment, Utility) */}
        <div 
          id="analytics-category-split-card"
          className="lg:col-span-4 rounded-[32px] bg-white p-6 sm:p-8 border border-[#e5e5dc] shadow-2xs flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-serif font-bold text-[#2d2d2a]">Category Breakdown</h3>
            <p className="text-xs text-[#8b8b80]">Distribution across application archetypes</p>

            {/* Stacked Progress Bar */}
            <div className="mt-5 h-4 w-full rounded-full overflow-hidden flex bg-[#f0f0e8] shadow-inner">
              <div style={{ width: `${socialPercent}%` }} className="bg-[#c87d55] transition-all" title={`Social: ${socialPercent}%`} />
              <div style={{ width: `${prodPercent}%` }} className="bg-[#5A5A40] transition-all" title={`Productivity: ${prodPercent}%`} />
              <div style={{ width: `${entPercent}%` }} className="bg-[#e8a87c] transition-all" title={`Entertainment: ${entPercent}%`} />
              <div style={{ width: `${Math.max(0, utilPercent)}%` }} className="bg-[#7d8c82] transition-all" title={`Utility: ${utilPercent}%`} />
            </div>

            {/* Legend List */}
            <div className="mt-6 space-y-3.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#c87d55]" />
                  <strong className="text-[#2d2d2a]">Social Media</strong>
                </span>
                <span className="font-mono font-bold text-[#2d2d2a]">{socialPercent}% ({categoryTotals['Social']}m)</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#5A5A40]" />
                  <strong className="text-[#2d2d2a]">Productivity & Work</strong>
                </span>
                <span className="font-mono font-bold text-[#2d2d2a]">{prodPercent}% ({categoryTotals['Productivity']}m)</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#e8a87c]" />
                  <strong className="text-[#2d2d2a]">Entertainment & Video</strong>
                </span>
                <span className="font-mono font-bold text-[#2d2d2a]">{entPercent}% ({categoryTotals['Entertainment']}m)</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#7d8c82]" />
                  <strong className="text-[#2d2d2a]">Utilities & Tools</strong>
                </span>
                <span className="font-mono font-bold text-[#2d2d2a]">{Math.max(0, utilPercent)}% ({categoryTotals['Utility']}m)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#e5e5dc] text-xs text-[#8b8b80]">
            <span>Productivity Ratio: <strong className="text-[#5A5A40] font-bold">1.2x</strong> compared to social consumption.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
