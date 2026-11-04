import React, { useEffect, useRef, useState } from 'react';
import { 
  Wifi, 
  Activity, 
  ShieldAlert, 
  Pause, 
  Play, 
  Layers, 
  Sliders, 
  AlertTriangle, 
  CheckCircle, 
  Lock, 
  ExternalLink,
  Flame,
  Radio
} from 'lucide-react';
import { TrackedApp } from '../types';

interface LiveTrackerViewProps {
  apps: TrackedApp[];
  activeApp: TrackedApp;
  onSelectActiveApp: (app: TrackedApp) => void;
  liveSpeedMbps: number;
  onSpeedChange: (speed: number) => void;
  isPaused: boolean;
  onTogglePause: () => void;
  isFloatingOpen: boolean;
  onToggleFloating: () => void;
}

export const LiveTrackerView: React.FC<LiveTrackerViewProps> = ({
  apps,
  activeApp,
  onSelectActiveApp,
  liveSpeedMbps,
  onSpeedChange,
  isPaused,
  onTogglePause,
  isFloatingOpen,
  onToggleFloating,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(14 * 60 + 24); // 14m 24s
  const [networkLeakThrottled, setNetworkLeakThrottled] = useState(false);

  // Active session timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Live Canvas Waveform Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let step = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Background subtle grid
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.4)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (isPaused) {
        // Render straight line if paused
        ctx.beginPath();
        ctx.strokeStyle = '#94A3B8';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
        ctx.setLineDash([]);
        
        ctx.fillStyle = '#64748B';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Tracking Paused for Privacy', width / 2, height / 2 - 12);
        return;
      }

      step += 0.05;

      const isHighSpeed = liveSpeedMbps > 5;
      const baseAmplitude = Math.min(65, 12 + liveSpeedMbps * 7);
      const waveColor = isHighSpeed ? 'rgb(217, 119, 54)' : 'rgb(163, 177, 138)';
      const waveFillGradient = ctx.createLinearGradient(0, 0, 0, height);
      if (isHighSpeed) {
        waveFillGradient.addColorStop(0, 'rgba(217, 119, 54, 0.35)');
        waveFillGradient.addColorStop(1, 'rgba(217, 119, 54, 0.02)');
      } else {
        waveFillGradient.addColorStop(0, 'rgba(163, 177, 138, 0.35)');
        waveFillGradient.addColorStop(1, 'rgba(163, 177, 138, 0.02)');
      }

      // Draw filled sine waveform
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, height / 2);

      for (let x = 0; x <= width; x += 2) {
        const freq1 = 0.018;
        const freq2 = 0.04;
        const y =
          height / 2 +
          Math.sin(x * freq1 + step) * baseAmplitude +
          Math.cos(x * freq2 - step * 1.2) * (baseAmplitude * 0.35);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = waveFillGradient;
      ctx.fill();

      // Draw primary wave line
      ctx.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const freq1 = 0.018;
        const freq2 = 0.04;
        const y =
          height / 2 +
          Math.sin(x * freq1 + step) * baseAmplitude +
          Math.cos(x * freq2 - step * 1.2) * (baseAmplitude * 0.35);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = waveColor;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw secondary trailing aura wave
      ctx.beginPath();
      for (let x = 0; x <= width; x += 3) {
        const freq1 = 0.024;
        const y = height / 2 + Math.sin(x * freq1 + step * 0.8) * (baseAmplitude * 0.6);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = isHighSpeed ? 'rgba(217, 119, 54, 0.5)' : 'rgba(163, 177, 138, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [liveSpeedMbps, isPaused]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const isHighVelocity = liveSpeedMbps > 5;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner with Active App Spotlight */}
      <div className="rounded-[32px] bg-white p-6 sm:p-8 border border-[#e5e5dc] shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          {/* Active App Indicator with Pulsing Glow */}
          <div className="flex items-center gap-4">
            <div className="relative">
              {/* Pulsing glow aura around current app icon */}
              <div 
                className="absolute -inset-1.5 rounded-2xl opacity-60 blur-sm animate-pulse"
                style={{ backgroundColor: activeApp.color }}
              />
              <div 
                className="relative flex h-16 w-16 items-center justify-center rounded-2xl text-white font-bold text-xl shadow-xs"
                style={{ backgroundColor: activeApp.color }}
              >
                {activeApp.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5A5A40] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#5A5A40] ring-2 ring-white"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#5A5A40] bg-[#f0f0e8] px-2.5 py-0.5 rounded-full border border-[#e5e5dc]">
                  Active App in Foreground
                </span>
                <span className="text-xs text-[#8b8b80] font-medium">Monitoring system socket</span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-[#2d2d2a] mt-1">{activeApp.name}</h2>
              <div className="flex items-center gap-3 text-xs text-[#8b8b80] mt-0.5">
                <span>Category: <strong className="text-[#2d2d2a]">{activeApp.category}</strong></span>
                <span>•</span>
                <span>Session Duration: <strong className="text-[#5A5A40] font-mono font-bold">{formatTimer(elapsedSeconds)}</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Action Toggles: Overlay toggle & Pause tracking */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="live-overlay-toggle-btn"
              onClick={onToggleFloating}
              className={`flex items-center gap-2 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-wider transition border shadow-2xs ${
                isFloatingOpen
                  ? 'border-[#5A5A40] bg-[#5A5A40] text-white'
                  : 'border-[#e5e5dc] bg-white text-[#5A5A40] hover:bg-[#f5f5f0]'
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>{isFloatingOpen ? 'Overlay Active' : 'Show Floating Overlay'}</span>
            </button>

            <button
              id="live-pause-toggle-btn"
              onClick={onTogglePause}
              className={`flex items-center gap-2 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-wider transition border shadow-2xs ${
                isPaused
                  ? 'border-[#d97736] bg-[#d97736] text-white'
                  : 'border-[#e5e5dc] bg-[#f0f0e8] text-[#5A5A40] hover:bg-[#e5e5dc]'
              }`}
            >
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              <span>{isPaused ? 'Resume Tracking' : 'Pause for Privacy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Pulse Waveform Visualizer */}
      <div 
        id="live-pulse-waveform-card"
        className="rounded-[32px] bg-[#252520] p-6 sm:p-8 text-[#f5f5f0] shadow-sm relative overflow-hidden border border-[#3e3e35]"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isHighVelocity ? 'bg-[#d97736]' : 'bg-[#a3b18a]'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isHighVelocity ? 'bg-[#d97736]' : 'bg-[#a3b18a]'
                }`}></span>
              </span>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#dcdcd2]">
                Live Data Waveform Monitor
              </h3>
            </div>
            <p className="text-xs text-[#a8a89c] mt-1 font-serif italic text-base">
              Real-time socket data throughput. Turns terracotta when bandwidth &gt; 5.0 Mbps.
            </p>
          </div>

          {/* Current Live Speed Badge */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 rounded-full px-4 py-1.5 font-mono font-bold text-sm border ${
              isHighVelocity 
                ? 'bg-[#d97736]/20 border-[#d97736] text-[#e8a87c]' 
                : 'bg-[#a3b18a]/20 border-[#a3b18a] text-[#dcdcd2]'
            }`}>
              <Radio className="h-4 w-4 animate-pulse" />
              <span>{isPaused ? '0.0' : liveSpeedMbps.toFixed(1)} Mbps</span>
            </div>
          </div>
        </div>

        {/* Dynamic Waveform Canvas */}
        <div className="relative w-full rounded-2xl bg-[#1c1c18] border border-[#3e3e35] p-2 overflow-hidden">
          <canvas
            ref={canvasRef}
            width={800}
            height={200}
            className="w-full h-44 sm:h-52 block rounded-xl"
          />

          {isHighVelocity && (
            <div className="absolute top-4 right-4 rounded-full bg-[#3e1f14]/90 border border-[#d97736] px-3.5 py-1.5 text-xs text-[#e8a87c] backdrop-blur-md flex items-center gap-1.5 animate-pulse">
              <Flame className="h-3.5 w-3.5 text-[#e8a87c]" />
              <span>Heavy Video Streaming Detected (&gt;5 Mbps)</span>
            </div>
          )}
        </div>

        {/* Interactive Simulation Controls */}
        <div className="mt-5 pt-4 border-t border-[#3e3e35] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Sliders className="h-4 w-4 text-[#a8a89c]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#a8a89c] whitespace-nowrap">Simulate Speed:</span>
            <input
              id="live-speed-slider"
              type="range"
              min="0.2"
              max="9.5"
              step="0.1"
              value={liveSpeedMbps}
              onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
              className="w-44 accent-[#a3b18a] cursor-pointer"
            />
            <span className="text-xs font-mono text-[#e5e5dc] w-16 font-bold">{liveSpeedMbps.toFixed(1)} Mbps</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSpeedChange(0.8)}
              className="rounded-full bg-[#34342c] px-3.5 py-1.5 text-xs font-semibold text-[#dcdcd2] hover:bg-[#424238] border border-[#424238] transition"
            >
              Text/Chat (0.8 Mbps)
            </button>
            <button
              onClick={() => onSpeedChange(2.5)}
              className="rounded-full bg-[#34342c] px-3.5 py-1.5 text-xs font-semibold text-[#dcdcd2] hover:bg-[#424238] border border-[#424238] transition"
            >
              Social Feed (2.5 Mbps)
            </button>
            <button
              onClick={() => onSpeedChange(7.2)}
              className="rounded-full bg-[#402419] border border-[#d97736] px-3.5 py-1.5 text-xs font-semibold text-[#e8a87c] hover:bg-[#502e20] transition"
            >
              4K Video (7.2 Mbps)
            </button>
          </div>
        </div>
      </div>

      {/* Network Leak Detector ("Pro" Feature from User Prompt) */}
      <div 
        id="network-leak-detector-card"
        className="rounded-[28px] border border-[#e5e5dc] bg-[#f9f9f5] p-6 shadow-2xs"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8a87c] text-white shadow-xs">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-serif font-bold text-[#2d2d2a]">Network Leak Detector</h4>
                <span className="rounded-full bg-[#e8a87c]/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#9c4d1d] border border-[#e8a87c]/40">
                  Background Guard
                </span>
              </div>
              <p className="mt-1 text-xs text-[#8b8b80]">
                {networkLeakThrottled
                  ? "Background data throttled! YouTube background socket restricted to 0.05 Mbps."
                  : "Alert: YouTube is consuming 520 MB in the background while inactive. Potential data leak or auto-caching."}
              </p>
            </div>
          </div>

          <button
            id="throttle-leak-btn"
            onClick={() => setNetworkLeakThrottled(!networkLeakThrottled)}
            className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition shadow-2xs whitespace-nowrap ${
              networkLeakThrottled
                ? 'bg-[#5A5A40] text-white hover:bg-[#484833]'
                : 'bg-[#d97736] text-white hover:bg-[#c4682b]'
            }`}
          >
            {networkLeakThrottled ? '✓ Leak Sandboxed' : 'Sandbox & Throttle Leak'}
          </button>
        </div>
      </div>

      {/* App Switcher Simulation Grid */}
      <div className="rounded-[32px] bg-white p-6 sm:p-8 border border-[#e5e5dc] shadow-2xs">
        <h4 className="text-xl font-serif font-bold text-[#2d2d2a] mb-1">Simulate Active Foreground App</h4>
        <p className="text-xs text-[#8b8b80] mb-5">
          Click an app below to switch the real-time live monitoring target:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {apps.map((app) => {
            const isSelected = app.id === activeApp.id;
            return (
              <button
                key={app.id}
                onClick={() => {
                  onSelectActiveApp(app);
                  onSpeedChange(app.currentSpeedMbps);
                }}
                className={`flex flex-col items-center text-center p-3.5 rounded-2xl border transition-all ${
                  isSelected
                    ? 'border-[#5A5A40] bg-[#f0f0e8] shadow-xs ring-2 ring-[#5A5A40]/30'
                    : 'border-[#e5e5dc] bg-[#f9f9f5] hover:bg-white hover:border-[#5A5A40]/40'
                }`}
              >
                <div 
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-white font-bold text-sm shadow-2xs mb-2"
                  style={{ backgroundColor: app.color }}
                >
                  {app.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-[#2d2d2a] truncate w-full">{app.name}</span>
                <span className="text-[11px] text-[#8b8b80] font-mono mt-0.5">{app.timeSpentMinutes}m spent</span>
                <span className="text-[10px] font-bold text-[#5A5A40] mt-1">{app.currentSpeedMbps} Mbps</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
