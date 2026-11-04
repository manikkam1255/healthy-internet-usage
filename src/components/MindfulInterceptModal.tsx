import React, { useState, useEffect } from 'react';
import { Wind, X, CheckCircle, Sparkles } from 'lucide-react';

interface MindfulInterceptModalProps {
  isOpen: boolean;
  onClose: () => void;
  appName?: string;
  onComplete?: () => void;
}

export const MindfulInterceptModal: React.FC<MindfulInterceptModalProps> = ({
  isOpen,
  onClose,
  appName = 'Distracting App',
  onComplete,
}) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [secondsRemaining, setSecondsRemaining] = useState(10);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSecondsRemaining(10);
      setIsFinished(false);
      setPhase('inhale');
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        const next = prev - 1;
        // 10s cycle: 10-7 Inhale (4s), 6-5 Hold (2s), 4-0 Exhale (4s)
        if (next > 6) {
          setPhase('inhale');
        } else if (next > 4) {
          setPhase('hold');
        } else {
          setPhase('exhale');
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d2d2a]/60 backdrop-blur-md p-4 transition-all">
      <div 
        id="mindful-intercept-card"
        className="relative w-full max-w-md rounded-[32px] bg-white p-8 text-center shadow-xl border border-[#e5e5dc]"
      >
        {/* Close / Dismiss */}
        <button
          id="close-intercept-btn"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#8b8b80] hover:bg-[#f0f0e8] hover:text-[#2d2d2a] transition cursor-pointer"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#5A5A40]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#5A5A40]">
            <Wind className="h-3.5 w-3.5 animate-pulse" />
            Mindful Intercept
          </div>
          <h2 className="mt-3 text-2xl font-serif font-bold text-[#2d2d2a]">
            {isFinished ? "You're Centered" : `Pause Before Opening ${appName}`}
          </h2>
          <p className="mt-1 text-xs text-[#8b8b80]">
            {isFinished
              ? "Break the dopamine loop. Proceed with conscious intention."
              : "Take 10 seconds of calm diaphragmatic breathing to break the autopilot reflex."}
          </p>
        </div>

        {/* Breathing Circle */}
        <div className="my-8 flex items-center justify-center">
          <div className="relative flex h-48 w-48 items-center justify-center">
            {/* Pulsing outer aura */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                phase === 'inhale'
                  ? 'scale-110 bg-[#5A5A40]/15'
                  : phase === 'hold'
                  ? 'scale-105 bg-[#a3b18a]/25 ring-4 ring-[#5A5A40]/30'
                  : 'scale-90 bg-[#e5e5dc]/40'
              }`}
            />
            {/* Core circle */}
            <div
              className={`relative z-10 flex h-36 w-36 flex-col items-center justify-center rounded-full shadow-lg transition-all duration-1000 ${
                isFinished
                  ? 'bg-[#5A5A40] text-white scale-100'
                  : phase === 'inhale'
                  ? 'bg-[#6b6b4e] text-white scale-110'
                  : phase === 'hold'
                  ? 'bg-[#5A5A40] text-white scale-105'
                  : 'bg-[#484833] text-white scale-95'
              }`}
            >
              {isFinished ? (
                <CheckCircle className="h-10 w-10 text-white" />
              ) : (
                <>
                  <span className="text-3xl font-serif font-bold tabular-nums tracking-tight">
                    {secondsRemaining}s
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-bold mt-1">
                    {phase === 'inhale' ? 'Inhale' : phase === 'hold' ? 'Hold' : 'Exhale'}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Guidance Prompt */}
        <div className="rounded-2xl bg-[#f9f9f5] border border-[#e5e5dc] p-3.5 text-xs text-[#5A5A40] font-medium mb-6">
          {phase === 'inhale' && '🌿 Fill your chest and relax your shoulders...'}
          {phase === 'hold' && '✨ Hold gently, notice the urge to scroll...'}
          {phase === 'exhale' && '🍃 Slowly let go of tension and rush...'}
          {isFinished && '🎉 Mindful habit reinforced. Your intention is in your control.'}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            id="intercept-cancel-btn"
            onClick={onClose}
            className="flex-1 rounded-full border border-[#e5e5dc] py-3 text-xs font-bold uppercase tracking-wider text-[#2d2d2a] hover:bg-[#f0f0e8] transition cursor-pointer"
          >
            I'll Stay Mindful
          </button>
          <button
            id="intercept-proceed-btn"
            onClick={() => {
              if (onComplete) onComplete();
              onClose();
            }}
            className="flex-1 rounded-full py-3 text-xs font-bold uppercase tracking-wider text-white shadow-2xs transition bg-[#5A5A40] hover:bg-[#484833] cursor-pointer"
          >
            {isFinished ? 'Proceed Consciously' : 'Continue Anyway'}
          </button>
        </div>
      </div>
    </div>
  );
};
