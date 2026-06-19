'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import AppLayout from '@/components/AppLayout';

interface Message {
  role: 'user' | 'ai';
  text: string;
  product?: { name: string; price: string; emoji: string; id: string };
}

const personaMap: Record<string, { name: string; type: string; emoji: string; color: string }> = {
  'glow-ai': { name: 'Glow AI', type: 'Shopping Assistant · Skincare', emoji: '🧴', color: '#14b8a6' },
  'founder-ai': { name: 'Founder Persona', type: 'Founder Persona · Brand Story', emoji: '👤', color: '#7c3aed' },
  'support-ai': { name: 'Support AI', type: 'Shopping Assistant · Support', emoji: '💬', color: '#0ea5e9' },
  'aria-sales': { name: 'Aria', type: 'Shopping Assistant · D2C', emoji: '✨', color: '#14b8a6' },
};

const aiResponses: Record<string, { text: string; product?: { name: string; price: string; emoji: string; id: string } }> = {
  default: {
    text: 'Great question! I\'m here to help you find the perfect product. Could you tell me a bit more about what you\'re looking for?',
  },
  'recommend a product': {
    text: 'Based on our bestsellers, I\'d recommend the Matte Control Gel for oily skin or the Hydra Boost for dry skin. Which skin type are you?',
    product: { name: 'Matte Control Gel SPF 30', price: '₹899', emoji: '🧴', id: 'p1' },
  },
  'what are your bestsellers': {
    text: 'Our top 3 bestsellers right now are:\n1. Matte Control Gel SPF 30 — oily skin\n2. Vitamin C Brightening Serum — dull skin\n3. Barrier Repair Cream — sensitive skin\n\nWant details on any of these?',
    product: { name: 'Vitamin C Brightening Serum', price: '₹1,299', emoji: '✨', id: 'p2' },
  },
};

const suggestedPrompts = [
  'Recommend a product',
  'What are your bestsellers?',
  'Compare two products',
  'What\'s good for dry skin?',
];

export default function ChatPage() {
  const params = useParams();
  const personaSlug = (params?.['persona-slug'] as string) || 'aria-sales';
  const persona = personaMap[personaSlug] || personaMap['aria-sales'];

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      text: `Hi! I'm ${persona.name}, your AI shopping assistant. I can help you find the right products, compare options, and answer any questions. What are you looking for today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const key = text.toLowerCase().trim();
      const response = aiResponses[key] || aiResponses['default'];
      setMessages((prev) => [...prev, { role: 'ai', text: response.text, product: response.product }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)] -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-10 -mt-6 lg:-mt-8">
        {/* Chat header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/8 flex-shrink-0"
          style={{ background: 'rgba(10,12,18,0.8)', backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-white/40 hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </Link>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: `${persona.color}20`, border: `1px solid ${persona.color}30` }}
            >
              {persona.emoji}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{persona.name}</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: persona.color }} />
                <span className="text-[11px] text-white/40">{persona.type}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/deploy" className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/55 hover:text-white hover:border-white/25 transition-all">
              Deploy
            </Link>
            <Link href="/analytics" className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/55 hover:text-white hover:border-white/25 transition-all">
              Analytics
            </Link>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <div className="max-w-2xl mx-auto flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-3`}>
                {msg.role === 'ai' && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-1"
                    style={{ background: `${persona.color}20`, border: `1px solid ${persona.color}30` }}
                  >
                    {persona.emoji}
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
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/4">
                      <div className="w-10 h-10 rounded-lg bg-white/8 flex items-center justify-center text-xl flex-shrink-0">
                        {msg.product.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{msg.product.name}</p>
                        <p className="text-[11px] text-white/50">{msg.product.price} · In stock</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button className="text-[10px] font-semibold text-white/55 border border-white/12 px-2.5 py-1.5 rounded-lg hover:bg-white/8 transition-colors">
                          View Product
                        </button>
                        <button
                          className="text-[10px] font-semibold text-white px-2.5 py-1.5 rounded-lg transition-colors"
                          style={{ background: persona.color }}
                        >
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
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-1"
                  style={{ background: `${persona.color}20` }}
                >
                  {persona.emoji}
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white/6 border border-white/8 flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Suggested prompts */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 max-w-2xl mx-auto w-full">
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
        <div className="px-4 pb-4 pt-2 flex-shrink-0 border-t border-white/6">
          <form onSubmit={handleSubmit} className="flex items-center gap-3 max-w-2xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products..."
              className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#7c3aed]/50 focus:bg-white/8 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-xl btn-primary flex items-center justify-center flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}