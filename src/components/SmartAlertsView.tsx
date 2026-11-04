import React, { useState } from 'react';
import { 
  BellRing, 
  Wind, 
  Wifi, 
  Sunrise, 
  Clock, 
  Sliders, 
  CheckCircle2, 
  Volume2, 
  Smartphone, 
  Send, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { SmartAlert } from '../types';

interface SmartAlertsViewProps {
  alerts: SmartAlert[];
  onToggleAlert: (alertId: string) => void;
  onChangeStrictness: (alertId: string, level: SmartAlert['strictness']) => void;
  onTriggerMindfulIntercept: () => void;
}

export const SmartAlertsView: React.FC<SmartAlertsViewProps> = ({
  alerts,
  onToggleAlert,
  onChangeStrictness,
  onTriggerMindfulIntercept,
}) => {
  const [activePreviewAlert, setActivePreviewAlert] = useState<SmartAlert>(alerts[0]);
  const [showInAppBanner, setShowInAppBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState('');

  const strictnessLabels: Record<SmartAlert['strictness'], { label: string; desc: string; badgeColor: string }> = {
    gentle_nudge: {
      label: 'Gentle Nudge',
      desc: 'Discreet, non-intrusive status bar notification with calming chime.',
      badgeColor: 'bg-[#f0f0e8] text-[#5A5A40] border border-[#e5e5dc]',
    },
    chime: {
      label: 'Firm Chime',
      desc: 'Sound notification with vibration reminding you to refocus.',
      badgeColor: 'bg-[#a3b18a]/20 text-[#5A5A40] border border-[#a3b18a]/40',
    },
    mindful_intercept: {
      label: 'Mindful Breath Intercept',
      desc: 'Pauses app and forces a 10-second diaphragmatic breathing cycle.',
      badgeColor: 'bg-[#e8a87c]/20 text-[#9c4d1d] border border-[#e8a87c]/40',
    },
    hard_lock: {
      label: 'Hard Lock (Strict)',
      desc: 'Immediately shuts app and locks usage until next scheduled window.',
      badgeColor: 'bg-[#d97736]/15 text-[#b45309] border border-[#d97736]/30',
    },
  };

  const handleTestAlert = (alertItem: SmartAlert) => {
    setActivePreviewAlert(alertItem);
    if (alertItem.strictness === 'mindful_intercept') {
      onTriggerMindfulIntercept();
    } else {
      setBannerMessage(alertItem.description);
      setShowInAppBanner(true);
      setTimeout(() => setShowInAppBanner(false), 5000);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Interactive In-App Notification Toast Simulation */}
      {showInAppBanner && (
        <div 
          id="simulated-system-alert-toast"
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md rounded-2xl bg-[#252520] text-[#f5f5f0] p-4 shadow-2xl border border-[#3e3e35] flex items-start gap-3 transition-all animate-bounce"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#5A5A40] text-white">
            <BellRing className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#dcdcd2]">ZenFlow • Smart Alert</span>
              <span className="text-[10px] text-[#8b8b80]">Just now</span>
            </div>
            <p className="text-xs text-[#e5e5dc] mt-1 font-medium">{bannerMessage}</p>
          </div>
          <button 
            onClick={() => setShowInAppBanner(false)}
            className="text-[#8b8b80] hover:text-white text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Banner */}
      <div className="rounded-[32px] bg-white p-6 sm:p-8 border border-[#e5e5dc] shadow-2xs">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#5A5A40]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#5A5A40]">
          <BellRing className="h-3.5 w-3.5" />
          <span>Contextual Nudges & Mindful Intercepts</span>
        </div>
        <h1 className="mt-2 text-3xl font-serif font-bold text-[#2d2d2a]">Smart Alert Rules & Strictness</h1>
        <p className="mt-1 text-xs text-[#8b8b80]">
          Unlike stressful blaring alarms, ZenFlow uses behavioral pauses—like 10-second breath interceptors—to gently break dopamine loops.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Trigger-Action Cards List */}
        <div className="lg:col-span-7 space-y-4">
          {alerts.map((alertItem) => {
            return (
              <div
                key={alertItem.id}
                id={`alert-card-${alertItem.id}`}
                className={`rounded-[32px] border p-6 sm:p-7 transition-all ${
                  alertItem.enabled
                    ? 'border-[#e5e5dc] bg-white shadow-2xs'
                    : 'border-[#e5e5dc] bg-[#f0f0e8]/50 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f0f0e8] text-[#5A5A40] border border-[#e5e5dc]">
                      {alertItem.triggerType === 'continuous_scroll' && <Wind className="h-5 w-5" />}
                      {alertItem.triggerType === 'data_velocity' && <Wifi className="h-5 w-5" />}
                      {alertItem.triggerType === 'sacred_morning' && <Sunrise className="h-5 w-5" />}
                      {alertItem.triggerType === 'predictive_cap' && <Clock className="h-5 w-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-serif font-bold text-[#2d2d2a]">{alertItem.title}</h3>
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${strictnessLabels[alertItem.strictness].badgeColor}`}>
                          {strictnessLabels[alertItem.strictness].label}
                        </span>
                      </div>
                      <p className="text-xs text-[#8b8b80] mt-1 leading-relaxed">{alertItem.description}</p>
                    </div>
                  </div>

                  {/* Toggle switch */}
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={alertItem.enabled}
                      onChange={() => onToggleAlert(alertItem.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#e5e5dc] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#dcdcd2] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5A5A40]"></div>
                  </label>
                </div>

                {/* Strictness Level Customizer */}
                <div className="mt-5 pt-4 border-t border-[#e5e5dc] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-[#8b8b80]">
                    <Sliders className="h-3.5 w-3.5 text-[#5A5A40]" />
                    <span className="font-bold uppercase tracking-wider text-[11px]">Strictness:</span>
                    <select
                      value={alertItem.strictness}
                      onChange={(e) => onChangeStrictness(alertItem.id, e.target.value as SmartAlert['strictness'])}
                      className="rounded-xl border border-[#e5e5dc] bg-[#f9f9f5] px-2.5 py-1.5 text-xs font-semibold text-[#2d2d2a] focus:outline-none focus:border-[#5A5A40]"
                    >
                      <option value="gentle_nudge">Gentle Nudge</option>
                      <option value="chime">Firm Chime</option>
                      <option value="mindful_intercept">Mindful 10s Breath Intercept</option>
                      <option value="hard_lock">Hard Lock</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTestAlert(alertItem)}
                      className="rounded-full border border-[#e5e5dc] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#5A5A40] hover:bg-[#f0f0e8] transition"
                    >
                      Preview & Test
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Phone Lockscreen Preview Card */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-[32px] bg-[#252520] p-6 sm:p-8 text-[#f5f5f0] shadow-sm border border-[#3e3e35]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-[#a3b18a]" />
                <h3 className="text-xs uppercase font-bold tracking-widest text-[#dcdcd2]">
                  Lock Screen Simulation
                </h3>
              </div>
              <span className="text-[10px] text-[#8b8b80] font-mono">Live Widget</span>
            </div>

            {/* Mobile Device Frame Representation */}
            <div className="rounded-2xl bg-gradient-to-b from-[#1c1c18] to-[#252520] p-4 border border-[#3e3e35] shadow-inner min-h-[300px] flex flex-col justify-between">
              
              {/* Phone Status Bar */}
              <div className="flex items-center justify-between text-[11px] text-[#8b8b80] pb-4 border-b border-[#3e3e35]">
                <span>09:41</span>
                <div className="flex items-center gap-1.5 font-mono">
                  <span>5G</span>
                  <Wifi className="h-3 w-3" />
                  <span>100%</span>
                </div>
              </div>

              {/* Center Lock Notification Banner */}
              <div className="my-6 rounded-2xl bg-white/10 backdrop-blur-md p-4 border border-white/15 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#5A5A40] text-white font-bold text-xs">
                      Z
                    </div>
                    <span className="text-xs font-bold text-[#f5f5f0]">ZenFlow Tracker</span>
                  </div>
                  <span className="text-[10px] text-[#8b8b80]">now</span>
                </div>
                <h4 className="text-xs font-bold text-[#dcdcd2]">{activePreviewAlert.title}</h4>
                <p className="text-xs text-[#a8a89c] mt-1 leading-snug">
                  {activePreviewAlert.description}
                </p>

                {activePreviewAlert.strictness === 'mindful_intercept' && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#a3b18a]/20 border border-[#a3b18a]/40 px-2.5 py-1 text-[11px] font-semibold text-[#dcdcd2]">
                    <Wind className="h-3 w-3 animate-pulse text-[#a3b18a]" />
                    <span>Initiates 10-Second Guided Breath</span>
                  </div>
                )}
              </div>

              {/* Test Action */}
              <div className="pt-2 text-center">
                <button
                  id="test-active-alert-preview-btn"
                  onClick={() => handleTestAlert(activePreviewAlert)}
                  className="w-full rounded-full bg-[#5A5A40] py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#484833] transition flex items-center justify-center gap-2 shadow-xs"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>Trigger Alert Test Now</span>
                </button>
                <p className="text-[10px] text-[#8b8b80] mt-2">
                  Previews how ZenFlow nudges you when behavioral thresholds are breached.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
