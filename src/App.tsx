/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  NavigationTab, 
  UserProfile, 
  TrackedApp, 
  UserGoal, 
  SmartAlert, 
  AIInsightItem 
} from './types';
import { 
  INITIAL_USER, 
  INITIAL_APPS, 
  INITIAL_GOALS, 
  INITIAL_ALERTS, 
  INITIAL_AI_INSIGHTS, 
  WEEKLY_USAGE_HISTORY, 
  HOURLY_HEATMAP 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { LoginView } from './components/LoginView';
import { DashboardView } from './components/DashboardView';
import { LiveTrackerView } from './components/LiveTrackerView';
import { AnalyticsView } from './components/AnalyticsView';
import { GoalsView } from './components/GoalsView';
import { SmartAlertsView } from './components/SmartAlertsView';
import { AiInsightsView } from './components/AiInsightsView';
import { WeeklyReportView } from './components/WeeklyReportView';
import { ProfileSettingsView } from './components/ProfileSettingsView';
import { MindfulInterceptModal } from './components/MindfulInterceptModal';
import { FloatingOverlay } from './components/FloatingOverlay';
import { DownloadModal } from './components/DownloadModal';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [apps, setApps] = useState<TrackedApp[]>(INITIAL_APPS);
  const [activeApp, setActiveApp] = useState<TrackedApp>(INITIAL_APPS[0]); // Instagram
  const [liveSpeedMbps, setLiveSpeedMbps] = useState(1.8);
  const [isPaused, setIsPaused] = useState(false);
  const [isFloatingOpen, setIsFloatingOpen] = useState(true);
  const [isBreathingModalOpen, setIsBreathingModalOpen] = useState(false);
  const [breathingAppName, setBreathingAppName] = useState('Instagram');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [goals, setGoals] = useState<UserGoal[]>(INITIAL_GOALS);
  const [alerts, setAlerts] = useState<SmartAlert[]>(INITIAL_ALERTS);
  const [insights, setInsights] = useState<AIInsightItem[]>(INITIAL_AI_INSIGHTS);
  const [isRefreshingAi, setIsRefreshingAi] = useState(false);

  // Core metrics matching prompt
  const [totalScreenTimeMinutes, setTotalScreenTimeMinutes] = useState(165); // 2h 45m
  const dailyGoalMinutes = 240; // 4h 00m
  const [dataUsedGB, setDataUsedGB] = useState(1.2);
  const unlocksCount = 24;
  const focusMinutes = 45;
  const timeSavedMinutes = 42;

  // Real-time speed simulation with gentle organic fluctuations
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setLiveSpeedMbps((prev) => {
        const delta = (Math.random() - 0.5) * 0.4;
        const target = activeApp.currentSpeedMbps || 1.8;
        const next = Math.max(0.2, Math.min(12, target + delta));
        return parseFloat(next.toFixed(1));
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused, activeApp]);

  // Subtle clock accumulation for active app
  useEffect(() => {
    if (isPaused) return;

    const minuteTimer = setInterval(() => {
      setTotalScreenTimeMinutes((prev) => prev + 1);
      setApps((prevApps) =>
        prevApps.map((a) =>
          a.id === activeApp.id ? { ...a, timeSpentMinutes: a.timeSpentMinutes + 1 } : a
        )
      );
    }, 60000);

    return () => clearInterval(minuteTimer);
  }, [isPaused, activeApp]);

  // Goal strict mode toggle
  const handleToggleStrictMode = (goalId: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, strictMode: !g.strictMode } : g))
    );
  };

  // Add new goal
  const handleAddGoal = (newGoalData: Omit<UserGoal, 'id' | 'streakDays'>) => {
    const newGoal: UserGoal = {
      ...newGoalData,
      id: `goal-${Date.now()}`,
      streakDays: 1,
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  // Smart alert toggle
  const handleToggleAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, enabled: !a.enabled } : a))
    );
  };

  // Smart alert strictness change
  const handleChangeStrictness = (alertId: string, strictness: SmartAlert['strictness']) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, strictness } : a))
    );
  };

  // Whitelist toggle
  const handleToggleWhitelist = (appId: string) => {
    setApps((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, isWhitelisted: !a.isWhitelisted } : a))
    );
  };

  // Trigger Mindful Intercept
  const handleTriggerMindfulIntercept = (appTitle: string = 'Instagram') => {
    setBreathingAppName(appTitle);
    setIsBreathingModalOpen(true);
  };

  // Refresh AI Insights via server Gemini endpoint
  const handleRefreshInsights = async () => {
    setIsRefreshingAi(true);
    try {
      const res = await fetch('/api/ai/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stats: { screenTimeMinutes: totalScreenTimeMinutes, dataUsedGB, unlocks: unlocksCount },
          topApps: apps.map((a) => `${a.name}: ${a.timeSpentMinutes}m`),
          goals: goals.map((g) => g.title),
        }),
      });
      const data = await res.json();
      if (data.insights && Array.isArray(data.insights)) {
        setInsights(data.insights);
      }
    } catch (err) {
      console.error('Failed to refresh insights:', err);
    } finally {
      setIsRefreshingAi(false);
    }
  };

  // Theme styling
  const themeClass =
    user.theme === 'oled'
      ? 'bg-[#181815] text-[#f5f5f0]'
      : user.theme === 'dark'
      ? 'bg-[#252520] text-[#f5f5f0]'
      : 'bg-[#f5f5f0] text-[#2d2d2a]';

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${themeClass}`}>
      
      {/* Navigation Header */}
      <Navbar
        activeTab={isAuthenticated ? activeTab : 'login'}
        onSelectTab={(tab) => {
          if (!isAuthenticated) {
            setIsAuthenticated(true);
          }
          setActiveTab(tab);
        }}
        user={user}
        liveSpeedMbps={liveSpeedMbps}
        isFloatingOpen={isFloatingOpen}
        onToggleFloating={() => setIsFloatingOpen(!isFloatingOpen)}
        onOpenBreathingModal={() => handleTriggerMindfulIntercept('Active Window')}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        onLogout={() => {
          setIsAuthenticated(false);
          setActiveTab('login');
        }}
        isPaused={isPaused}
      />

      {/* Floating Real-Time Meter Overlay */}
      <FloatingOverlay
        activeApp={activeApp}
        currentSpeedMbps={liveSpeedMbps}
        isOpen={isFloatingOpen && isAuthenticated}
        onToggle={() => setIsFloatingOpen(false)}
        onOpenLiveTracker={() => setActiveTab('live-tracker')}
        isPaused={isPaused}
      />

      {/* 10-Second Mindful Breathing Intercept Modal */}
      <MindfulInterceptModal
        isOpen={isBreathingModalOpen}
        onClose={() => setIsBreathingModalOpen(false)}
        appName={breathingAppName}
        onComplete={() => {
          // Success callback
        }}
      />

      {/* Download Codebase & Setup Guide Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        {!isAuthenticated || activeTab === 'login' ? (
          <LoginView
            currentUser={user}
            onLogin={(updatedUser) => {
              setUser(updatedUser);
              setIsAuthenticated(true);
              setActiveTab('dashboard');
            }}
          />
        ) : activeTab === 'dashboard' ? (
          <DashboardView
            user={user}
            apps={apps}
            goals={goals}
            totalScreenTimeMinutes={totalScreenTimeMinutes}
            dailyGoalMinutes={dailyGoalMinutes}
            dataUsedGB={dataUsedGB}
            unlocksCount={unlocksCount}
            focusMinutes={focusMinutes}
            timeSavedMinutes={timeSavedMinutes}
            onStartFocusSession={() => handleTriggerMindfulIntercept('Focus Session')}
            onSelectApp={(app) => {
              setActiveApp(app);
              setLiveSpeedMbps(app.currentSpeedMbps);
              setActiveTab('live-tracker');
            }}
            onNavigateToLiveTracker={() => setActiveTab('live-tracker')}
            onNavigateToGoals={() => setActiveTab('goals')}
            onNavigateToAiInsights={() => setActiveTab('ai-insights')}
          />
        ) : activeTab === 'live-tracker' ? (
          <LiveTrackerView
            apps={apps}
            activeApp={activeApp}
            onSelectActiveApp={(app) => {
              setActiveApp(app);
              setLiveSpeedMbps(app.currentSpeedMbps);
            }}
            liveSpeedMbps={liveSpeedMbps}
            onSpeedChange={(speed) => setLiveSpeedMbps(speed)}
            isPaused={isPaused}
            onTogglePause={() => setIsPaused(!isPaused)}
            isFloatingOpen={isFloatingOpen}
            onToggleFloating={() => setIsFloatingOpen(!isFloatingOpen)}
          />
        ) : activeTab === 'analytics' ? (
          <AnalyticsView
            apps={apps}
            weeklyHistory={WEEKLY_USAGE_HISTORY}
            hourlyHeatmap={HOURLY_HEATMAP}
          />
        ) : activeTab === 'goals' ? (
          <GoalsView
            goals={goals}
            onToggleStrictMode={handleToggleStrictMode}
            onAddGoal={handleAddGoal}
            onTriggerMindfulIntercept={() => handleTriggerMindfulIntercept('Social Media Detox')}
          />
        ) : activeTab === 'smart-alerts' ? (
          <SmartAlertsView
            alerts={alerts}
            onToggleAlert={handleToggleAlert}
            onChangeStrictness={handleChangeStrictness}
            onTriggerMindfulIntercept={() => handleTriggerMindfulIntercept('Continuous Scroll Intercept')}
          />
        ) : activeTab === 'ai-insights' ? (
          <AiInsightsView
            insights={insights}
            user={user}
            apps={apps}
            onTriggerMindfulIntercept={() => handleTriggerMindfulIntercept('Context Switch Intercept')}
            onRefreshInsights={handleRefreshInsights}
            isRefreshing={isRefreshingAi}
          />
        ) : activeTab === 'weekly-report' ? (
          <WeeklyReportView
            user={user}
            weeklyHistory={WEEKLY_USAGE_HISTORY}
          />
        ) : activeTab === 'settings' ? (
          <ProfileSettingsView
            user={user}
            apps={apps}
            onUpdateUser={(up) => setUser((prev) => ({ ...prev, ...up }))}
            onToggleWhitelistApp={handleToggleWhitelist}
            onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
          />
        ) : null}
      </main>
    </div>
  );
}
