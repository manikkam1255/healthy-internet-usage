export type NavigationTab = 
  | 'login'
  | 'dashboard'
  | 'live-tracker'
  | 'analytics'
  | 'goals'
  | 'smart-alerts'
  | 'ai-insights'
  | 'weekly-report'
  | 'settings';

export type AppCategory = 'Social' | 'Productivity' | 'Entertainment' | 'Utility' | 'Health';

export interface TrackedApp {
  id: string;
  name: string;
  category: AppCategory;
  iconName: string;
  timeSpentMinutes: number;
  dailyLimitMinutes: number;
  currentSpeedMbps: number;
  dataUsedMB: number;
  isBlocked: boolean;
  isWhitelisted: boolean;
  color: string;
}

export interface UserGoal {
  id: string;
  title: string;
  category?: AppCategory;
  appId?: string;
  targetMinutes: number;
  currentMinutes: number;
  type: 'daily_cap' | 'app_limit' | 'focus_sprint' | 'curfew';
  strictMode: boolean;
  streakDays: number;
  badge: string;
}

export interface SmartAlert {
  id: string;
  title: string;
  description: string;
  triggerType: 'continuous_scroll' | 'data_velocity' | 'sacred_morning' | 'predictive_cap';
  thresholdValue: number;
  unit: string;
  strictness: 'gentle_nudge' | 'chime' | 'mindful_intercept' | 'hard_lock';
  enabled: boolean;
  affectedApps: string[];
}

export interface AIInsightItem {
  id: string;
  type: 'pattern' | 'context_switch' | 'prediction' | 'mood_correlation';
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  suggestedAction: string;
}

export interface UserProfile {
  name: string;
  email: string;
  zenLevel: string;
  streakDays: number;
  avatarUrl: string;
  theme: 'light' | 'dark' | 'oled';
  isIncognito: boolean;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
}

export interface DailyUsageData {
  day: string;
  screenTimeMinutes: number;
  dataGB: number;
  focusMinutes: number;
  unlocks: number;
}

export interface HourlyHeatmapSlot {
  hour: number; // 0 to 23
  label: string;
  intensity: number; // 0 to 4
  minutes: number;
  isStressTrigger: boolean;
}
