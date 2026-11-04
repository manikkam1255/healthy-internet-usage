import React, { useState } from 'react';
import { Leaf, Fingerprint, Lock, Mail, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

interface LoginViewProps {
  onLogin: (user: UserProfile) => void;
  currentUser: UserProfile;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, currentUser }) => {
  const [email, setEmail] = useState('rahul.sharma@zenflow.io');
  const [password, setPassword] = useState('••••••••••••');
  const [useBiometrics, setUseBiometrics] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onLogin({
        ...currentUser,
        email: email || currentUser.email,
      });
    }, 600);
  };

  const handleOAuthLogin = (provider: 'google' | 'apple') => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onLogin({
        ...currentUser,
        name: provider === 'google' ? 'Rahul Sharma' : 'Rahul (Apple ID)',
      });
    }, 500);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 overflow-hidden bg-[#f5f5f0]">
      
      {/* Decorative Warm Organic ambient background elements */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#e5e5dc]/50 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#dcdcd2]/50 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        
        {/* Main Card */}
        <div 
          id="login-gateway-card"
          className="rounded-[32px] border border-[#e5e5dc] bg-white p-8 sm:p-10 shadow-2xs transition-all"
        >
          {/* Central Logo: Minimalist circle with pulsing olive dot in center */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#f9f9f5] shadow-xs border border-[#e5e5dc] ring-8 ring-[#e5e5dc]/50">
              <div className="relative flex h-8 w-8 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a3b18a] opacity-60"></span>
                <span className="relative inline-flex h-5 w-5 rounded-full bg-[#5A5A40]"></span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#5A5A40]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#5A5A40]">
              <Leaf className="h-3.5 w-3.5" />
              <span>ZenFlow Gateway</span>
            </div>

            <h1 className="mt-3 text-3xl font-serif font-bold tracking-tight text-[#2d2d2a]">
              Healthy Internet Usage
            </h1>
            <p className="mt-1 text-xs text-[#8b8b80]">
              Restore equilibrium between screen time and living mindfully.
            </p>
          </div>

          {/* Quick Demo One-Tap Button */}
          <div className="mt-6">
            <button
              id="quick-demo-login-btn"
              onClick={() => handleOAuthLogin('google')}
              disabled={isAuthenticating}
              className="w-full flex items-center justify-between rounded-2xl border border-[#e5e5dc] bg-[#f9f9f5] p-3.5 text-left hover:bg-[#f0f0e8] transition group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatarUrl}
                  alt="Rahul"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-[#5A5A40]"
                />
                <div>
                  <p className="text-xs font-bold text-[#2d2d2a] flex items-center gap-1.5">
                    Continue as {currentUser.name}
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#5A5A40]" />
                  </p>
                  <p className="text-[11px] text-[#8b8b80]">Pre-loaded with live stats & tracker data</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-[#5A5A40] group-hover:translate-x-0.5 transition" />
            </button>
          </div>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e5e5dc]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-[#8b8b80] font-bold tracking-wider text-[10px]">or sign in with</span>
            </div>
          </div>

          {/* Social OAuth One-Tap Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              id="google-oauth-btn"
              onClick={() => handleOAuthLogin('google')}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#e5e5dc] bg-white py-2.5 text-xs font-semibold text-[#2d2d2a] hover:bg-[#f9f9f5] transition shadow-2xs cursor-pointer"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.36 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.94 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              Google
            </button>

            <button
              id="apple-oauth-btn"
              onClick={() => handleOAuthLogin('apple')}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#e5e5dc] bg-white py-2.5 text-xs font-semibold text-[#2d2d2a] hover:bg-[#f9f9f5] transition shadow-2xs cursor-pointer"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.6-7.79-11.74-14.24-6.41-10.02-11.41-21.2-15-33.54-3.59-12.33-5.39-24.08-5.39-35.25 0-14.24 3.42-26.04 10.26-35.39 6.84-9.35 15.34-14.13 25.5-14.34 5.34 0 11.22 1.37 17.65 4.11 6.43 2.74 10.63 4.17 12.61 4.29 1.76 0 6.13-1.57 13.12-4.71 6.98-3.14 12.87-4.47 17.67-3.99 13.48 1.09 23.95 6.07 31.42 14.93-11.75 7.07-17.42 16.73-17 28.98.39 9.57 4.12 17.51 11.2 23.82 7.08 6.31 15.45 9.87 25.11 10.68-2.18 6.53-4.94 13.06-8.29 19.59zM119.22 33.02c0-7.39 2.65-14.28 7.95-20.67 5.3-6.39 11.77-10.42 19.41-12.09.21 1.25.32 2.45.32 3.6 0 7.39-2.77 14.49-8.32 21.31-5.55 6.82-12.18 10.74-19.89 11.76-.22-1.37-.33-2.57-.33-3.91z" />
              </svg>
              Apple ID
            </button>
          </div>

          {/* Traditional Form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#8b8b80]" />
                <input
                  id="login-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full rounded-xl border border-[#e5e5dc] bg-[#f9f9f5] pl-10 pr-3.5 py-2.5 text-xs text-[#2d2d2a] placeholder:text-[#8b8b80] focus:border-[#5A5A40] focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5A5A40] mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-[#8b8b80]" />
                <input
                  id="login-password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full rounded-xl border border-[#e5e5dc] bg-[#f9f9f5] pl-10 pr-3.5 py-2.5 text-xs text-[#2d2d2a] placeholder:text-[#8b8b80] focus:border-[#5A5A40] focus:outline-none transition"
                />
              </div>
            </div>

            {/* Biometrics Toggle Option */}
            <div className="flex items-center justify-between py-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useBiometrics}
                  onChange={(e) => setUseBiometrics(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-[#e5e5dc] text-[#5A5A40] accent-[#5A5A40]"
                />
                <span className="text-xs text-[#8b8b80] flex items-center gap-1">
                  <Fingerprint className="h-3.5 w-3.5 text-[#5A5A40]" />
                  Enable Biometric Quick Unlock
                </span>
              </label>
            </div>

            {/* Primary Submit Button */}
            <button
              id="start-mindful-journey-btn"
              type="submit"
              disabled={isAuthenticating}
              className="w-full rounded-full bg-[#5A5A40] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-2xs hover:bg-[#484833] transition flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
            >
              {isAuthenticating ? (
                <span>Centering Your Mind...</span>
              ) : (
                <>
                  <span>Start My Mindful Journey</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Quote */}
          <div className="mt-8 border-t border-[#e5e5dc] pt-5 text-center">
            <p className="italic text-xs font-serif text-[#8b8b80]">
              "Reclaim your time today."
            </p>
            <p className="mt-2 text-[11px] text-[#8b8b80]">
              New here? Join the movement toward mindful digital consumption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
