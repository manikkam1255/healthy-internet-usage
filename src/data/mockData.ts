import { TrackedApp, UserGoal, SmartAlert, AIInsightItem, DailyUsageData, HourlyHeatmapSlot, UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@zenflow.io',
  zenLevel: 'Intermediate Mindful Master',
  streakDays: 14,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  theme: 'light',
  isIncognito: false,
  soundEnabled: true,
  hapticsEnabled: true,
};

export const INITIAL_APPS: TrackedApp[] = [
  {
    id: 'app-instagram',
    name: 'Instagram',
    category: 'Social',
    iconName: 'Camera',
    timeSpentMinutes: 48,
    dailyLimitMinutes: 60,
    currentSpeedMbps: 1.8,
    dataUsedMB: 380,
    isBlocked: false,
    isWhitelisted: false,
    color: '#E1306C'
  },
  {
    id: 'app-youtube',
    name: 'YouTube',
    category: 'Entertainment',
    iconName: 'PlaySquare',
    timeSpentMinutes: 35,
    dailyLimitMinutes: 60,
    currentSpeedMbps: 5.6, // High speed indicator
    dataUsedMB: 520,
    isBlocked: false,
    isWhitelisted: false,
    color: '#FF0000'
  },
  {
    id: 'app-chrome',
    name: 'Chrome',
    category: 'Utility',
    iconName: 'Globe',
    timeSpentMinutes: 40,
    dailyLimitMinutes: 90,
    currentSpeedMbps: 0.9,
    dataUsedMB: 195,
    isBlocked: false,
    isWhitelisted: false,
    color: '#4285F4'
  },
  {
    id: 'app-slack',
    name: 'Slack',
    category: 'Productivity',
    iconName: 'MessageSquare',
    timeSpentMinutes: 30,
    dailyLimitMinutes: 120,
    currentSpeedMbps: 0.2,
    dataUsedMB: 45,
    isBlocked: false,
    isWhitelisted: true,
    color: '#4A154B'
  },
  {
    id: 'app-linkedin',
    name: 'LinkedIn',
    category: 'Social',
    iconName: 'Briefcase',
    timeSpentMinutes: 20,
    dailyLimitMinutes: 30,
    currentSpeedMbps: 0.4,
    dataUsedMB: 60,
    isBlocked: false,
    isWhitelisted: false,
    color: '#0A66C2'
  },
  {
    id: 'app-maps',
    name: 'Google Maps',
    category: 'Utility',
    iconName: 'Navigation',
    timeSpentMinutes: 12,
    dailyLimitMinutes: 60,
    currentSpeedMbps: 0.3,
    dataUsedMB: 30,
    isBlocked: false,
    isWhitelisted: true,
    color: '#34A853'
  }
];

export const INITIAL_GOALS: UserGoal[] = [
  {
    id: 'goal-1',
    title: 'Social Media Detox',
    category: 'Social',
    targetMinutes: 60,
    currentMinutes: 48,
    type: 'app_limit',
    strictMode: true,
    streakDays: 6,
    badge: '🌿 Mindful Scroll'
  },
  {
    id: 'goal-2',
    title: 'Deep Work Session',
    category: 'Productivity',
    targetMinutes: 120,
    currentMinutes: 48,
    type: 'focus_sprint',
    strictMode: false,
    streakDays: 11,
    badge: '⚡ Focus Champion'
  },
  {
    id: 'goal-3',
    title: 'Late Night Screen-Free (Post 10 PM)',
    targetMinutes: 0,
    currentMinutes: 0,
    type: 'curfew',
    strictMode: true,
    streakDays: 7,
    badge: '🌙 Night Guardian'
  }
];

export const INITIAL_ALERTS: SmartAlert[] = [
  {
    id: 'alert-1',
    title: 'Continuous Scrolling Intercept',
    description: 'Alerts you after 20 minutes of non-stop social feed consumption to break the autopilot trance.',
    triggerType: 'continuous_scroll',
    thresholdValue: 20,
    unit: 'minutes',
    strictness: 'mindful_intercept',
    enabled: true,
    affectedApps: ['Instagram', 'YouTube', 'TikTok']
  },
  {
    id: 'alert-2',
    title: 'High Data Velocity Leak Alert',
    description: 'Warns when an application consumes more than 500 MB/hr in background or streaming.',
    triggerType: 'data_velocity',
    thresholdValue: 500,
    unit: 'MB/hr',
    strictness: 'chime',
    enabled: true,
    affectedApps: ['YouTube', 'Chrome']
  },
  {
    id: 'alert-3',
    title: 'The Sacred Morning AI Guard',
    description: 'Locks distracting social and entertainment apps during the first 30 minutes after waking up.',
    triggerType: 'sacred_morning',
    thresholdValue: 30,
    unit: 'minutes after wake',
    strictness: 'hard_lock',
    enabled: true,
    affectedApps: ['Instagram', 'LinkedIn', 'YouTube']
  },
  {
    id: 'alert-4',
    title: 'Predictive Daily Cap Nudge',
    description: 'Notifies you when current rate of usage indicates you will hit your daily ceiling in 10 minutes.',
    triggerType: 'predictive_cap',
    thresholdValue: 10,
    unit: 'minutes before cap',
    strictness: 'gentle_nudge',
    enabled: true,
    affectedApps: ['All Apps']
  }
];

export const INITIAL_AI_INSIGHTS: AIInsightItem[] = [
  {
    id: 'ai-1',
    type: 'pattern',
    title: 'Tuesday Instagram Surge (+40%)',
    description: 'You consistently spend 40% more time on Instagram on Tuesday evenings between 8:00 PM and 10:30 PM compared to other weekdays.',
    impact: 'High',
    suggestedAction: 'Schedule a 45m screen downtime on Tuesday evenings.'
  },
  {
    id: 'ai-2',
    type: 'context_switch',
    title: 'The Procrastination Switch: LinkedIn ➔ Instagram',
    description: 'The tracker observed you opening Instagram within 12 seconds of closing professional tasks on LinkedIn 6 times today.',
    impact: 'Medium',
    suggestedAction: 'Activate 10-second Breathing Intercept on Social apps.'
  },
  {
    id: 'ai-3',
    type: 'prediction',
    title: 'Predicted Usage for Tonight: 4h 30m',
    description: 'Based on your Friday patterns, you are at risk of an extended late-night video streaming session after 10 PM.',
    impact: 'High',
    suggestedAction: 'Enable 11:00 PM Bedtime Lock now.'
  },
  {
    id: 'ai-4',
    type: 'mood_correlation',
    title: 'Late Night Screen Time & Anxiety Link',
    description: 'High internet speeds (>5 Mbps) past 11:30 PM correlate with a 28% drop in your next-morning focus sprint duration.',
    impact: 'Medium',
    suggestedAction: 'Turn on Night Grayscale filter to reduce visual dopamine.'
  }
];

export const WEEKLY_USAGE_HISTORY: DailyUsageData[] = [
  { day: 'Mon', screenTimeMinutes: 195, dataGB: 1.1, focusMinutes: 75, unlocks: 22 },
  { day: 'Tue', screenTimeMinutes: 240, dataGB: 1.6, focusMinutes: 50, unlocks: 29 },
  { day: 'Wed', screenTimeMinutes: 180, dataGB: 0.9, focusMinutes: 80, unlocks: 19 },
  { day: 'Thu', screenTimeMinutes: 170, dataGB: 1.0, focusMinutes: 90, unlocks: 21 },
  { day: 'Fri', screenTimeMinutes: 210, dataGB: 1.4, focusMinutes: 65, unlocks: 26 },
  { day: 'Sat', screenTimeMinutes: 265, dataGB: 1.9, focusMinutes: 40, unlocks: 34 },
  { day: 'Sun (Today)', screenTimeMinutes: 165, dataGB: 1.2, focusMinutes: 45, unlocks: 24 },
];

export const HOURLY_HEATMAP: HourlyHeatmapSlot[] = [
  { hour: 0, label: '12 AM', intensity: 1, minutes: 12, isStressTrigger: false },
  { hour: 1, label: '1 AM', intensity: 0, minutes: 0, isStressTrigger: false },
  { hour: 2, label: '2 AM', intensity: 0, minutes: 0, isStressTrigger: false },
  { hour: 3, label: '3 AM', intensity: 0, minutes: 0, isStressTrigger: false },
  { hour: 4, label: '4 AM', intensity: 0, minutes: 0, isStressTrigger: false },
  { hour: 5, label: '5 AM', intensity: 0, minutes: 0, isStressTrigger: false },
  { hour: 6, label: '6 AM', intensity: 0, minutes: 5, isStressTrigger: false },
  { hour: 7, label: '7 AM', intensity: 1, minutes: 15, isStressTrigger: false },
  { hour: 8, label: '8 AM', intensity: 2, minutes: 28, isStressTrigger: false },
  { hour: 9, label: '9 AM', intensity: 3, minutes: 42, isStressTrigger: false },
  { hour: 10, label: '10 AM', intensity: 2, minutes: 30, isStressTrigger: false },
  { hour: 11, label: '11 AM', intensity: 2, minutes: 25, isStressTrigger: false },
  { hour: 12, label: '12 PM', intensity: 3, minutes: 44, isStressTrigger: false },
  { hour: 13, label: '1 PM', intensity: 2, minutes: 22, isStressTrigger: false },
  { hour: 14, label: '2 PM', intensity: 2, minutes: 31, isStressTrigger: false },
  { hour: 15, label: '3 PM', intensity: 3, minutes: 38, isStressTrigger: false },
  { hour: 16, label: '4 PM', intensity: 2, minutes: 24, isStressTrigger: false },
  { hour: 17, label: '5 PM', intensity: 2, minutes: 29, isStressTrigger: false },
  { hour: 18, label: '6 PM', intensity: 1, minutes: 18, isStressTrigger: false },
  { hour: 19, label: '7 PM', intensity: 2, minutes: 30, isStressTrigger: false },
  { hour: 20, label: '8 PM', intensity: 3, minutes: 48, isStressTrigger: false },
  { hour: 21, label: '9 PM', intensity: 4, minutes: 52, isStressTrigger: true },
  { hour: 22, label: '10 PM', intensity: 4, minutes: 56, isStressTrigger: true }, // Peak addiction zone
  { hour: 23, label: '11 PM', intensity: 3, minutes: 39, isStressTrigger: true },
];
