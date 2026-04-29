'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  role: 'user' | 'ai';
  text: string;
  product?: { name: string; price: string; emoji: string };
}

const suggestedPrompts = [
  'Recommend a moisturizer for oily skin',
  'Compare your top 2 serums',
  'What\'s best for sensitive skin?',
  'Do you have SPF products?',
];

const aiResponses: Record<string, { text: string; product?: { name: string; price: string; emoji: string } }> = {
  default: {
    text: 'Great question! Based on your needs, I\'d recommend checking out our bestsellers. Would you like me to narrow it down by skin type or concern?',
  },
  'recommend a moisturizer for oily skin': {
    text: 'For oily skin, our Matte Control Gel SPF 30 is the #1 pick — lightweight, non-comedogenic, and controls shine all day. It\'s our bestseller for oily skin types! 🎯',
    product: { name: 'Matte Control Gel SPF 30', price: '₹899', emoji: '🧴' },
  },
  'compare your top 2 serums': {
    text: 'Our top 2 serums are:\n\n1. **Vitamin C Brightening Serum** — for dull/uneven skin, fades dark spots, morning use.\n2. **Hyaluronic Acid Plump Serum** — for dehydrated skin, deep moisture, day & night.\n\nWhich skin concern fits you better?',
    product: { name: 'Vitamin C Brightening Serum', price: '₹1,299', emoji: '✨' },
  },
  "what's best for sensitive skin?": {
    text: 'For sensitive skin, I always recommend our Calm & Soothe range — fragrance-free, dermatologist tested, and gentle enough for daily use. The Barrier Repair Cream is our #1 for sensitive skin.',
    product: { name: 'Barrier Repair Cream', price: '₹749', emoji: '🌿' },
  },
  'do you have spf products?': {
    text: 'Yes! We have 3 SPF options:\n• Matte Control Gel SPF 30 (oily skin)\n• Hydra Shield SPF 50 (dry/normal skin)\n• Invisible Sunscreen SPF 50+ (all skin types)\n\nWhich skin type are you shopping for?',
    product: { name: 'Invisible Sunscreen SPF 50+', price: '₹999', emoji: '☀️' },
  },
};

export default function GuestChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      text: 'Hi! I\'m Glow AI, your personal skincare assistant. I can help you find the perfect products for your skin type, compare options, and answer any questions. What are you looking for today? 😊',
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
      const aiMsg: Message = { role: 'ai', text: response.text, product: response.product };
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
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#7c3aed] flex items-center justify-center text-sm font-bold">
            G
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Glow AI — Skincare Assistant</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
              <span className="text-[11px] text-white/40">Demo persona · D2C Skincare Brand</span>
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
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#7c3aed] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                  G
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
                {msg.product && (
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-[#14b8a6]/25 bg-[#14b8a6]/8">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#14b8a6]/20 to-[#7c3aed]/15 flex items-center justify-center text-xl flex-shrink-0">
                      {msg.product.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{msg.product.name}</p>
                      <p className="text-[11px] text-white/50">{msg.product.price} · In stock</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button className="text-[10px] font-semibold text-white/60 border border-white/15 px-2 py-1 rounded-lg hover:bg-white/8 transition-colors">
                        View
                      </button>
                      <button className="text-[10px] font-semibold text-[#14b8a6] border border-[#14b8a6]/40 px-2 py-1 rounded-lg hover:bg-[#14b8a6]/15 transition-colors">
                        Buy Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#7c3aed] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                G
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
              <p className="text-xs text-white/50 mb-4">Create your own AI persona for your D2C brand in under 3 minutes.</p>
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
            placeholder="Ask about products, ingredients, or recommendations..."
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
          This is a demo persona for a fictional skincare brand. <Link href="/register" className="text-[#7c3aed]/70 hover:text-[#a78bfa]">Create your own →</Link>
        </p>
      </div>
    </div>
  );
}
