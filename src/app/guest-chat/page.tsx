'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const suggestedPrompts = [
  'How do I start investing in mutual funds?',
  'What is the difference between SIP and lump sum?',
  'How much should I save each month?',
  'Best way to build an emergency fund?',
];

const aiResponses: Record<string, { text: string }> = {
  default: {
    text: 'Great question! I\'d love to help you with that. Could you share a bit more about your current financial situation or what specific goal you\'re working towards?',
  },
  'how do i start investing in mutual funds?': {
    text: 'Starting with mutual funds is simpler than most people think! Here\'s my recommended path:\n\n1. **Open a KYC-verified account** — use any SEBI-registered platform (Zerodha Coin, Groww, or Kuvera).\n2. **Start with an index fund** — Nifty 50 or Nifty Next 50 index funds are low-cost and diversified.\n3. **Set up a monthly SIP** — even ₹500/month builds the habit.\n\nWant me to walk you through picking your first fund?',
  },
  'what is the difference between sip and lump sum?': {
    text: 'Great question! Here\'s the key difference:\n\n**SIP (Systematic Investment Plan)**\n• Invest a fixed amount every month\n• Averages out market ups and downs (rupee cost averaging)\n• Best for salaried individuals with regular income\n\n**Lump Sum**\n• Invest a large amount at once\n• Works best when markets are at a low\n• Higher risk if you invest at a market peak\n\nFor most beginners, SIP is the safer and smarter choice. 📈',
  },
  'how much should i save each month?': {
    text: 'A solid rule of thumb is the **50-30-20 rule**:\n\n• **50%** of income → Needs (rent, food, bills)\n• **30%** → Wants (dining out, entertainment)\n• **20%** → Savings & investments\n\nIf you\'re just starting out, even 10% is a great first step. The key is consistency — automate your SIP so you invest before you spend. What\'s your monthly take-home income? I can give you a more personalised breakdown.',
  },
  'best way to build an emergency fund?': {
    text: 'An emergency fund is your financial safety net — here\'s how to build one:\n\n**Target:** 3–6 months of monthly expenses\n\n**Where to keep it:**\n• High-yield savings account (4–5% interest)\n• Liquid mutual funds (better returns, easy withdrawal)\n\n**How to build it fast:**\n• Set aside 10–15% of income every month\n• Park any bonuses or windfalls here first\n• Don\'t touch it unless it\'s a real emergency\n\nOnce your emergency fund is set, you can invest the rest more aggressively. 💪',
  },
};

export default function GuestChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      text: 'Hi! I\'m Arjun AI — your personal finance guide. I can help you understand investing, build a savings plan, and answer any money questions you have. What would you like to explore today? 😊',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const [showCta, setShowCta] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const newCount = msgCount + 1;
    setMsgCount(newCount);

    setTimeout(() => {
      const key = text.toLowerCase().trim();
      const response = aiResponses[key] || aiResponses['default'];
      const aiMsg: Message = { role: 'ai', text: response.text };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      if (newCount >= 3) setShowCta(true);
    }, 1200 + Math.random() * 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="min-h-screen bg-[#0a0c12] text-white flex flex-col">
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b border-white/8"
        style={{ background: 'rgba(10,12,18,0.95)', backdropFilter: 'blur(24px)' }}
      >
        <div className="flex items-center gap-3">
          <Link href="/" className="text-white/40 hover:text-white transition-colors mr-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Link>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#14b8a6] flex items-center justify-center text-sm font-bold">
            A
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Arjun AI — Finance Educator</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
              <span className="text-[11px] text-white/40">Demo persona · Creator AI</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-xs text-white/30 border border-white/10 px-2.5 py-1 rounded-lg">
            Demo — No login required
          </span>
          <Link href="/register" className="px-4 py-2 rounded-xl text-xs font-semibold text-white btn-primary">
            Create Your AI →
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-2xl mx-auto w-full">
        <div className="flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-3`}>
              {msg.role === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#14b8a6] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                  A
                </div>
              )}
              <div className="flex flex-col gap-2 max-w-[80%]">
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === 'user' ?'bg-[#7c3aed]/30 text-white border border-[#7c3aed]/30 rounded-br-sm' :'bg-white/6 text-white/85 border border-white/8 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#14b8a6] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                A
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white/6 border border-white/8 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          {/* CTA after 3-5 messages */}
          {showCta && (
            <div
              className="mx-auto w-full max-w-sm p-5 rounded-2xl border border-[#7c3aed]/30 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(20,184,166,0.08) 100%)' }}
            >
              <p className="text-sm font-semibold text-white mb-1">Enjoying the demo?</p>
              <p className="text-xs text-white/50 mb-4">Create your own AI persona and let it answer your audience 24/7 — in your voice.</p>
              <Link href="/register" className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary">
                Create Your AI Persona →
              </Link>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested prompts */}
      {messages.length <= 2 && (
        <div className="px-4 pb-3 max-w-2xl mx-auto w-full">
          <p className="text-xs text-white/30 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/55 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-6 pt-2 max-w-2xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about investing, savings, or financial planning..."
            className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#7c3aed]/50 focus:bg-white/8 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-xl btn-primary flex items-center justify-center flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
        <p className="text-[10px] text-white/20 text-center mt-2">
          This is a demo persona for a finance educator creator. <Link href="/register" className="text-[#7c3aed]/70 hover:text-[#a78bfa]">Create your own →</Link>
        </p>
      </div>
    </div>
  );
}
