import React, { useState } from 'react';
import { 
  Sparkles, 
  Bot, 
  Send, 
  RefreshCw, 
  TrendingUp, 
  Moon, 
  HeartHandshake, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Brain,
  ShieldCheck
} from 'lucide-react';
import { AIInsightItem, TrackedApp, UserProfile } from '../types';

interface AiInsightsViewProps {
  insights: AIInsightItem[];
  user: UserProfile;
  apps: TrackedApp[];
  onTriggerMindfulIntercept: () => void;
  onRefreshInsights: () => Promise<void>;
  isRefreshing: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AiInsightsView: React.FC<AiInsightsViewProps> = ({
  insights,
  user,
  apps,
  onTriggerMindfulIntercept,
  onRefreshInsights,
  isRefreshing,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Hello ${user.name.split(' ')[0]}! I've been reviewing your usage telemetry today. I noticed you open Instagram within 12 seconds of closing LinkedIn or Slack—this is a classic cognitive 'context-switching' habit. Would you like advice on replacing this with a mini recharge pause?`,
      timestamp: '09:30 AM',
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [appliedActionId, setAppliedActionId] = useState<string | null>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: inputPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const sentText = inputPrompt;
    setInputPrompt('');
    setIsSending(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: sentText,
          history: messages.map((m) => ({ role: m.sender === 'user' ? 'user' : 'model', text: m.text })),
        }),
      });

      const data = await response.json();
      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || "Take a slow diaphragmatic breath. Mindful presence begins by noticing urges without instantly obeying them.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      const fallbackReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "When you feel the compulsion to doom-scroll, try the 'Rule of 5': step away from the device, look at something 20 feet away, and take 5 deep slow breaths.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsSending(false);
    }
  };

  const handleApplyAction = (insightId: string, actionText: string) => {
    setAppliedActionId(insightId);
    if (actionText.toLowerCase().includes('breath') || actionText.toLowerCase().includes('intercept')) {
      onTriggerMindfulIntercept();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header with Regenerate Gemini Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-[32px] bg-white p-6 sm:p-8 border border-[#e5e5dc] shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#5A5A40]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#5A5A40]">
            <Sparkles className="h-3.5 w-3.5 text-[#5A5A40]" />
            <span>Behavioral Machine Learning & Gemini AI</span>
          </div>
          <h1 className="mt-2 text-3xl font-serif font-bold text-[#2d2d2a]">AI Habit Insights & Prediction</h1>
          <p className="mt-1 text-xs text-[#8b8b80]">
            Automated psychological pattern detection, context-switching loops, and future usage predictions.
          </p>
        </div>

        <button
          id="refresh-ai-insights-btn"
          onClick={onRefreshInsights}
          disabled={isRefreshing}
          className="flex items-center gap-2 rounded-full border border-[#5A5A40]/30 bg-[#f0f0e8] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#5A5A40] hover:bg-[#e5e5dc] transition disabled:opacity-50 self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Analyzing Habits...' : 'Re-run Gemini Diagnosis'}</span>
        </button>
      </div>

      {/* Main Grid: Insight Cards & AI Persona Chatbot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: 4 Insight Cards */}
        <div className="lg:col-span-7 space-y-4">
          {insights.map((insight) => {
            const isApplied = appliedActionId === insight.id;

            return (
              <div
                key={insight.id}
                id={`ai-insight-card-${insight.id}`}
                className="rounded-[32px] border border-[#e5e5dc] bg-white p-6 sm:p-7 shadow-2xs hover:border-[#5A5A40]/50 transition-all overflow-hidden"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f0f0e8] text-[#5A5A40] border border-[#e5e5dc]">
                      {insight.type === 'pattern' && <TrendingUp className="h-5 w-5" />}
                      {insight.type === 'context_switch' && <Brain className="h-5 w-5" />}
                      {insight.type === 'prediction' && <Moon className="h-5 w-5" />}
                      {insight.type === 'mood_correlation' && <HeartHandshake className="h-5 w-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-serif font-bold text-[#2d2d2a]">{insight.title}</h3>
                        <span className="rounded-full bg-[#f0f0e8] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] border border-[#e5e5dc]">
                          {insight.impact} Impact
                        </span>
                      </div>
                      <p className="text-xs text-[#8b8b80] mt-1 leading-relaxed">{insight.description}</p>
                    </div>
                  </div>
                </div>

                {/* Actionable Recommendation Bar */}
                <div className="mt-5 pt-3.5 border-t border-[#e5e5dc] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#f9f9f5] -mx-6 sm:-mx-7 -mb-6 sm:-mb-7 p-4 sm:p-5 rounded-b-[32px]">
                  <div className="text-xs text-[#2d2d2a] font-medium flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#5A5A40] shrink-0" />
                    <span>{insight.suggestedAction}</span>
                  </div>

                  <button
                    onClick={() => handleApplyAction(insight.id, insight.suggestedAction)}
                    className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition shadow-2xs whitespace-nowrap ${
                      isApplied
                        ? 'bg-[#5A5A40] text-white'
                        : 'bg-white text-[#5A5A40] border border-[#e5e5dc] hover:bg-[#f0f0e8]'
                    }`}
                  >
                    {isApplied ? '✓ Action Configured' : 'Apply Recommendation'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Zen AI Companion Chatbot Persona */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-[32px] bg-white p-6 border border-[#e5e5dc] shadow-2xs flex flex-col h-[560px]">
            
            {/* Persona Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#e5e5dc]">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-[#5A5A40] text-white shadow-xs">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#a3b18a] ring-2 ring-white" />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-bold text-[#2d2d2a]">Zen AI Companion</h3>
                  <p className="text-[10px] text-[#5A5A40] font-bold uppercase tracking-wider">Digital Habit Behavioral Coach</p>
                </div>
              </div>
              <span className="text-[10px] text-[#8b8b80] font-mono">Gemini 3.8 Flash</span>
            </div>

            {/* Chat message stream */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#5A5A40] text-white rounded-br-xs'
                        : 'bg-[#f0f0e8] text-[#2d2d2a] rounded-bl-xs border border-[#e5e5dc]'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-[#8b8b80] mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
              {isSending && (
                <div className="flex items-center gap-2 text-xs text-[#8b8b80] italic">
                  <span className="h-2 w-2 rounded-full bg-[#5A5A40] animate-ping" />
                  <span>Zen Coach is reflecting on your question...</span>
                </div>
              )}
            </div>

            {/* Quick Suggestions Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-2 no-scrollbar border-t border-[#e5e5dc]">
              <button
                onClick={() => setInputPrompt("How can I avoid doom-scrolling before sleep?")}
                className="rounded-full bg-[#f0f0e8] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] border border-[#e5e5dc] hover:bg-[#e5e5dc] whitespace-nowrap transition"
              >
                Avoid sleep doom-scrolling
              </button>
              <button
                onClick={() => setInputPrompt("What is the 'Mindful Intercept' method?")}
                className="rounded-full bg-[#f0f0e8] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] border border-[#e5e5dc] hover:bg-[#e5e5dc] whitespace-nowrap transition"
              >
                Explain Mindful Intercept
              </button>
            </div>

            {/* Chat Input Form */}
            <form onSubmit={handleSendMessage} className="pt-2 flex gap-2">
              <input
                id="ai-companion-input"
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Ask advice on phone habits..."
                className="flex-1 rounded-xl border border-[#e5e5dc] bg-[#f9f9f5] px-3.5 py-2.5 text-xs text-[#2d2d2a] focus:border-[#5A5A40] focus:outline-none placeholder:text-[#8b8b80]"
              />
              <button
                id="ai-companion-send-btn"
                type="submit"
                disabled={isSending || !inputPrompt.trim()}
                className="flex items-center justify-center rounded-xl bg-[#5A5A40] p-2.5 text-white hover:bg-[#484833] transition disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
