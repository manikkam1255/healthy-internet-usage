import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  Flame, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Award, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  X
} from 'lucide-react';
import { UserGoal, AppCategory } from '../types';

interface GoalsViewProps {
  goals: UserGoal[];
  onToggleStrictMode: (goalId: string) => void;
  onAddGoal: (newGoal: Omit<UserGoal, 'id' | 'streakDays'>) => void;
  onTriggerMindfulIntercept: () => void;
}

export const GoalsView: React.FC<GoalsViewProps> = ({
  goals,
  onToggleStrictMode,
  onAddGoal,
  onTriggerMindfulIntercept,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTargetHours, setNewTargetHours] = useState('1');
  const [newTargetMinutes, setNewTargetMinutes] = useState('0');
  const [newCategory, setNewCategory] = useState<AppCategory>('Social');
  const [newStrictMode, setNewStrictMode] = useState(true);
  const [newBadge, setNewBadge] = useState('🌿 Mindful Scroll');

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const totalMinutes = (parseInt(newTargetHours) || 0) * 60 + (parseInt(newTargetMinutes) || 0);
    if (!newTitle.trim() || totalMinutes <= 0) return;

    onAddGoal({
      title: newTitle,
      category: newCategory,
      targetMinutes: totalMinutes,
      currentMinutes: 0,
      type: newCategory === 'Productivity' ? 'focus_sprint' : 'app_limit',
      strictMode: newStrictMode,
      badge: newBadge,
    });

    setNewTitle('');
    setIsModalOpen(false);
  };

  const badgesList = [
    { title: '7 Days Screen-Free (Post 10 PM)', unlocked: true, icon: '🌙', count: '7d streak' },
    { title: '14-Day Focus Champion', unlocked: true, icon: '⚡', count: '14d streak' },
    { title: 'Under 1hr Social Master', unlocked: true, icon: '🌿', count: '6d streak' },
    { title: 'Zero Doom-Scroll Weekend', unlocked: false, icon: '🛡️', count: 'Locked (2 days to go)' },
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-[32px] bg-white p-6 sm:p-8 border border-[#e5e5dc] shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#5A5A40]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#5A5A40]">
            <Target className="h-3.5 w-3.5" />
            <span>Digital Well-Being Commitments</span>
          </div>
          <h1 className="mt-2 text-3xl font-serif font-bold text-[#2d2d2a]">User Goals & Strict Caps</h1>
          <p className="mt-1 text-xs text-[#8b8b80]">
            Set deliberate boundaries with color-coded alerts, biometric strict locks, and habit streaks.
          </p>
        </div>

        {/* Add Goal Button */}
        <button
          id="open-add-goal-modal-btn"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-full bg-[#5A5A40] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-2xs hover:bg-[#484833] transition self-start sm:self-auto cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Set App Usage Cap</span>
        </button>
      </div>

      {/* Active Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {goals.map((goal) => {
          const isCurfew = goal.type === 'curfew';
          const percent = isCurfew
            ? 0
            : Math.min(Math.round((goal.currentMinutes / goal.targetMinutes) * 100), 100);

          // Color coding: Green at 50%, Orange at 80%, Terracotta Red when exceeded
          const isRed = percent >= 80;
          const isOrange = percent >= 50 && percent < 80;
          const isGreen = percent < 50;

          return (
            <div
              key={goal.id}
              id={`goal-card-${goal.id}`}
              className="flex flex-col justify-between rounded-[32px] bg-white p-6 sm:p-7 border border-[#e5e5dc] shadow-2xs hover:shadow-xs transition-all relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#8b8b80] flex items-center gap-1.5">
                    <span>{goal.badge}</span>
                  </span>

                  {/* Strict Mode Indicator */}
                  <button
                    onClick={() => onToggleStrictMode(goal.id)}
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition ${
                      goal.strictMode
                        ? 'bg-[#d97736]/15 text-[#b45309] border border-[#d97736]/30'
                        : 'bg-[#f0f0e8] text-[#5A5A40] border border-[#e5e5dc]'
                    }`}
                    title={goal.strictMode ? "Strict Mode: Hard Lock when cap reached" : "Gentle Mode: Nudge only"}
                  >
                    {goal.strictMode ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                    <span>{goal.strictMode ? 'Hard Mode' : 'Gentle'}</span>
                  </button>
                </div>

                <h3 className="mt-3 text-xl font-serif font-bold text-[#2d2d2a]">{goal.title}</h3>
                
                {isCurfew ? (
                  <p className="mt-1 text-xs text-[#8b8b80]">
                    Active nightly from 10:00 PM to 7:00 AM. Zero social or streaming feeds allowed.
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-[#8b8b80]">
                    Daily ceiling of {Math.floor(goal.targetMinutes / 60)}h {goal.targetMinutes % 60}m.
                  </p>
                )}

                {/* Progress bar */}
                {!isCurfew && (
                  <div className="mt-5">
                    <div className="flex justify-between text-xs font-semibold mb-1.5">
                      <span className="text-[#2d2d2a] font-mono">{goal.currentMinutes}m logged</span>
                      <span className="text-[#8b8b80] font-mono">Limit: {goal.targetMinutes}m</span>
                    </div>

                    <div className="h-3 w-full rounded-full bg-[#f0f0e8] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          isRed ? 'bg-[#d97736]' : isOrange ? 'bg-[#e8a87c]' : 'bg-[#5A5A40]'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#8b8b80] mt-2">
                      <span className={`font-bold ${isRed ? 'text-[#d97736]' : isOrange ? 'text-[#b45309]' : 'text-[#5A5A40]'}`}>
                        {percent}% of daily quota
                      </span>
                      <span>{Math.max(0, goal.targetMinutes - goal.currentMinutes)}m left</span>
                    </div>
                  </div>
                )}

                {isCurfew && (
                  <div className="mt-5 rounded-2xl bg-[#f9f9f5] p-4 border border-[#e5e5dc]">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#2d2d2a]">
                      <CheckCircle2 className="h-4 w-4 text-[#5A5A40]" />
                      <span>Curfew Active Tonight</span>
                    </div>
                    <p className="text-[11px] text-[#8b8b80] mt-0.5">
                      Will trigger 10s mindful breathing intercept if opened.
                    </p>
                  </div>
                )}
              </div>

              {/* Streak Footer */}
              <div className="mt-6 pt-4 border-t border-[#e5e5dc] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#5A5A40]">
                  <Flame className="h-4 w-4 text-[#d97736] fill-[#d97736]" />
                  <span className="font-bold">{goal.streakDays} Day Streak</span>
                </div>

                {percent >= 80 && (
                  <button
                    onClick={onTriggerMindfulIntercept}
                    className="text-[11px] font-bold uppercase tracking-wider text-[#d97736] hover:underline flex items-center gap-1"
                  >
                    Test Lock ➔
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Badges & Consistency Streaks */}
      <div className="rounded-[32px] bg-white p-6 sm:p-8 border border-[#e5e5dc] shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-serif font-bold text-[#2d2d2a]">Consistency Streaks & Milestones</h3>
            <p className="text-xs text-[#8b8b80]">Gamified rewards for sustaining mindful internet habits</p>
          </div>
          <span className="rounded-full bg-[#f0f0e8] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#5A5A40] border border-[#e5e5dc] flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5" />
            <span>3 of 4 Unlocked</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badgesList.map((badge, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-4 border transition-all ${
                badge.unlocked
                  ? 'border-[#e5e5dc] bg-[#f9f9f5]'
                  : 'border-[#e5e5dc] bg-[#f0f0e8]/50 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-2xs text-xl border border-[#e5e5dc]">
                  {badge.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2d2d2a]">{badge.title}</h4>
                  <p className="text-[11px] font-bold text-[#5A5A40] mt-0.5">{badge.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#252520]/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-[32px] bg-[#f5f5f0] p-6 sm:p-8 shadow-2xl border border-[#e5e5dc]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-5 top-5 rounded-full p-2 text-[#8b8b80] hover:bg-[#e5e5dc] transition"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-2xl font-serif font-bold text-[#2d2d2a]">Create New Goal Commitment</h3>
            <p className="text-xs text-[#8b8b80] mt-0.5">Define an intentional time cap for apps or categories.</p>

            <form onSubmit={handleCreateGoal} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5A5A40] mb-1.5">Goal Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Reddit Weekend Detox, Deep Coding Sprint"
                  className="w-full rounded-xl border border-[#e5e5dc] bg-white px-3.5 py-2.5 text-xs text-[#2d2d2a] focus:border-[#5A5A40] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5A5A40] mb-1.5">Target Hours</label>
                  <input
                    type="number"
                    min="0"
                    max="12"
                    value={newTargetHours}
                    onChange={(e) => setNewTargetHours(e.target.value)}
                    className="w-full rounded-xl border border-[#e5e5dc] bg-white px-3.5 py-2.5 text-xs text-[#2d2d2a] focus:border-[#5A5A40] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5A5A40] mb-1.5">Target Minutes</label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={newTargetMinutes}
                    onChange={(e) => setNewTargetMinutes(e.target.value)}
                    className="w-full rounded-xl border border-[#e5e5dc] bg-white px-3.5 py-2.5 text-xs text-[#2d2d2a] focus:border-[#5A5A40] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5A5A40] mb-1.5">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as AppCategory)}
                  className="w-full rounded-xl border border-[#e5e5dc] bg-white px-3.5 py-2.5 text-xs text-[#2d2d2a] focus:border-[#5A5A40] focus:outline-none"
                >
                  <option value="Social">Social Media</option>
                  <option value="Entertainment">Entertainment & Video</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Utility">Utility</option>
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newStrictMode}
                    onChange={(e) => setNewStrictMode(e.target.checked)}
                    className="h-4 w-4 rounded border-[#e5e5dc] text-[#5A5A40] accent-[#5A5A40]"
                  />
                  <span className="text-xs text-[#2d2d2a] font-medium">
                    Strict Mode (Hard Lock / Mindful Intercept upon reaching limit)
                  </span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-full border border-[#e5e5dc] bg-white py-3 text-xs font-bold uppercase tracking-wider text-[#5A5A40] hover:bg-[#f0f0e8] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-[#5A5A40] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-2xs hover:bg-[#484833] transition"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
