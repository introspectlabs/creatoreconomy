'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import PublicHeader from '@/components/public/PublicHeader';
import { personas } from '@/app/persona-library/components/personaData';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const aiResponses: Record<string, string> = {
  default: "That's a great question! I'm here to help. Could you tell me a bit more about what you're looking for?",
  'hello': "Hello! Great to meet you. How can I help you today?",
  'hi': "Hi there! I'm ready to chat. What's on your mind?",
  'who are you': "I'm an AI persona created to share knowledge and insights. Ask me anything!",
};

const suggestedPrompts = [
  'Tell me about yourself',
  'What can you help me with?',
  'Share your top advice',
  'How do I get started?',
];

export default function PersonaChatPage() {
  const params = useParams();
  const username = (params?.username as string) || '';
  const personaname = (params?.personaname as string) || '';

  const persona = personas.find(
    (p) =>
      p.slug === personaname ||
      p.name.toLowerCase().replace(/\s+/g, '-') === personaname ||
      p.name.toLowerCase() === personaname.toLowerCase()
  ) || null;

  const displayName = persona?.name || personaname.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const personaColor = '#7c3aed';
  const personaEmoji = persona?.avatar || '🤖';

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      text: `Hi! I'm ${displayName}${persona?.description ? ` — ${persona.description}` : ''}. How can I help you today?`,
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
      const responseText = aiResponses[key] || aiResponses['default'];
      setMessages((prev) => [...prev, { role: 'ai', text: responseText }]);
      setIsTyping(false);
    }, 900 + Math.random() * 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: '#080a10' }}>
      <PublicHeader />

      {/* Full-height chat container below header */}
      <div className="flex-1 flex flex-col overflow-hidden pt-16">
        {/* Persona header banner */}
        <div
          className="border-b border-white/8 px-6 py-4 flex-shrink-0"
          style={{ background: 'rgba(10,12,18,0.9)', backdropFilter: 'blur(12px)' }}
        >
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href={`/creator/${username}`}
                className="text-white/40 hover:text-white transition-colors flex-shrink-0"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </Link>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                style={{
                  background: `rgba(124,58,237,0.2)`,
                  border: `1px solid rgba(124,58,237,0.35)`,
                }}
              >
                {personaEmoji}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-semibold text-white">{displayName}</h1>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.25)' }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
                    <span className="text-[10px] text-[#14b8a6] font-medium">Online</span>
                  </div>
                </div>
                <p className="text-[11px] text-white/40">
                  by{' '}
                  <Link href={`/creator/${username}`} className="text-purple-400 hover:text-purple-300 transition-colors">
                    @{username}
                  </Link>
                </p>
              </div>
            </div>

            {persona && (
              <div className="hidden sm:flex items-center gap-2 text-[11px] text-white/35">
                {persona.tags?.slice(0, 2).map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-lg"
                    style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', color: '#c4b5fd' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Scrollable messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-3`}>
                {msg.role === 'ai' && (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-1"
                    style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.3)' }}
                  >
                    {personaEmoji}
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed max-w-[80%] ${
                    msg.role === 'user' ?'bg-[#7c3aed]/30 text-white border border-[#7c3aed]/30 rounded-br-sm' :'bg-white/6 text-white/85 border border-white/8 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-1"
                  style={{ background: 'rgba(124,58,237,0.2)' }}
                >
                  {personaEmoji}
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
          <div className="px-4 pb-2 max-w-3xl mx-auto w-full flex-shrink-0">
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

        {/* Input bar */}
        <div className="px-4 pb-5 pt-3 flex-shrink-0 border-t border-white/6" style={{ background: 'rgba(8,10,16,0.95)' }}>
          <form onSubmit={handleSubmit} className="flex items-center gap-3 max-w-3xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${displayName}...`}
              className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#7c3aed]/50 focus:bg-white/8 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
          <p className="text-center text-[10px] text-white/20 mt-3">
            AI persona powered by{' '}
            <Link href="/" className="text-purple-400/60 hover:text-purple-400 transition-colors">
              PersonaMatrix
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
