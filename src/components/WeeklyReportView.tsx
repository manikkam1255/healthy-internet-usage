import React, { useState } from 'react';
import { 
  FileText, 
  Share2, 
  Download, 
  Award, 
  TrendingDown, 
  Calendar, 
  CheckCircle, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  Leaf
} from 'lucide-react';
import { DailyUsageData, UserProfile } from '../types';

interface WeeklyReportViewProps {
  user: UserProfile;
  weeklyHistory: DailyUsageData[];
}

export const WeeklyReportView: React.FC<WeeklyReportViewProps> = ({
  user,
  weeklyHistory,
}) => {
  const [copied, setCopied] = useState(false);

  const healthScore = 82;
  const scoreGrade = 'A+';
  const hoursSaved = 4;
  const percentageDown = 12;

  const handleShare = () => {
    navigator.clipboard.writeText(
      `🌿 My Digital Health Score this week is ${healthScore}/100 (${scoreGrade}) on ZenFlow Healthy Internet Usage Tracker! Saved ${hoursSaved} hours of screen time. #DigitalWellbeing #ZenFlow`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-[32px] bg-white p-6 sm:p-8 border border-[#e5e5dc] shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#5A5A40]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#5A5A40]">
            <FileText className="h-3.5 w-3.5" />
            <span>Weekly Executive Digest</span>
          </div>
          <h1 className="mt-2 text-3xl font-serif font-bold text-[#2d2d2a]">Weekly Health Report (Sept 1 – Sept 7)</h1>
          <p className="mt-1 text-xs text-[#8b8b80]">
            A comprehensive retrospective of your digital consumption, balance, and cognitive restoration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="share-weekly-report-btn"
            onClick={handleShare}
            className="flex items-center gap-2 rounded-full bg-[#5A5A40] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-2xs hover:bg-[#484833] transition"
          >
            <Share2 className="h-4 w-4" />
            <span>{copied ? '✓ Copied to Clipboard!' : 'Share Accountability Card'}</span>
          </button>
        </div>
      </div>

      {/* Magazine-Style Infographic Card */}
      <div 
        id="weekly-infographic-report"
        className="rounded-[32px] bg-[#252520] p-8 sm:p-12 text-[#f5f5f0] shadow-sm border border-[#3e3e35] relative overflow-hidden"
      >
        {/* Zen ambient watermark */}
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Leaf className="h-96 w-96 text-[#a3b18a]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-10">
          
          {/* Top Title Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#a3b18a]">ZenFlow Digest</span>
              <h2 className="text-3xl font-serif font-bold tracking-tight mt-1 text-[#f5f5f0]">
                Mindful Restoration Scorecard
              </h2>
              <p className="text-xs text-[#a8a89c] mt-0.5">Prepared for {user.name} • 7 Days Aggregated</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold text-[#dcdcd2]">
              <Calendar className="h-4 w-4 text-[#a3b18a]" />
              <span>Sept 1 - Sept 7, 2026</span>
            </div>
          </div>

          {/* Centerpiece: Giant Health Score */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Giant Score Circle / Card */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl text-center">
              <span className="text-xs uppercase font-bold tracking-wider text-[#a3b18a]">
                Digital Health Score
              </span>
              
              <div className="my-4 flex items-baseline gap-2">
                <span className="text-7xl sm:text-8xl font-serif font-bold tracking-tighter text-white">
                  {healthScore}
                </span>
                <span className="text-2xl font-serif font-bold text-[#a3b18a]">/100</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-[#a3b18a]/20 border border-[#a3b18a]/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#dcdcd2]">
                <Award className="h-4 w-4 text-[#a3b18a]" />
                <span>Grade {scoreGrade}: Well Done!</span>
              </div>
            </div>

            {/* Key Achievements Grid */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Achievement 1: Saved 4 hours */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4.5 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5A5A40]/40 text-[#a3b18a]">
                  <TrendingDown className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#f5f5f0]">
                    Saved {hoursSaved} Hours Compared to Last Week (⬇️ {percentageDown}%)
                  </h4>
                  <p className="text-xs text-[#a8a89c] mt-1">
                    That is equivalent to reading an entire 220-page book or 6 full yoga sessions!
                  </p>
                </div>
              </div>

              {/* Achievement 2: Focus Winner */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4.5 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5A5A40]/40 text-[#a3b18a]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#f5f5f0]">
                    Focus Winner: Monday Was Your Most Productive Day
                  </h4>
                  <p className="text-xs text-[#a8a89c] mt-1">
                    Logged 80 minutes of continuous deep work with zero social media distraction.
                  </p>
                </div>
              </div>

              {/* Achievement 3: Habit Shift */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4.5 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5A5A40]/40 text-[#a3b18a]">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#f5f5f0]">
                    Autopilot Intercepts: 14 Breaths Completed
                  </h4>
                  <p className="text-xs text-[#a8a89c] mt-1">
                    You chose not to open Instagram 14 times after taking the 10-second pause.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Plan for Next Week */}
          <div className="rounded-[32px] bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#a3b18a]">Prescription for Next Week</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-white">
              Action Plan: "Target 10% Reduction in Late Night Screen Time"
            </h3>
            <p className="text-xs text-[#a8a89c] mt-2 leading-relaxed">
              While your daytime deep work remains stellar, your 10:00 PM – 11:30 PM streaming sessions consume 42% of your non-work bandwidth. Enabling the Bedtime Curfew at 10:00 PM next week will effortlessly push your Health Score past 90/100.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
