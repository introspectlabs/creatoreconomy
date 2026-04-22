'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function PublicChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your PersonaMatrix AI assistant. How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Simulated response — replace with real API call as needed
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          "Thanks for reaching out! Our team will get back to you shortly. In the meantime, feel free to explore our platform or check out our pricing page.",
      };
      setMessages((prev) => [...prev, reply]);
      setLoading(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-[9999] w-[340px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.7)] border border-white/10"
          style={{
            background: 'rgba(12,14,22,0.97)',
            backdropFilter: 'blur(24px)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b border-white/8"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(59,130,246,0.15) 100%)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] shadow-lg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-none">PersonaMatrix AI</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
                  <span className="text-[10px] text-white/40">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all"
              aria-label="Close chat"
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ maxHeight: '320px', minHeight: '200px' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] text-white rounded-br-sm'
                      : 'bg-white/6 text-white/80 border border-white/8 rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/6 border border-white/8 rounded-xl rounded-bl-sm px-3 py-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-white/8 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              className="flex-1 bg-white/5 border border-white/8 rounded-xl px-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-[#7c3aed]/60 focus:bg-white/8 transition-all"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_16px_rgba(124,58,237,0.5)] transition-all"
              aria-label="Send message"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Launcher Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(124,58,237,0.5)] transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 5L15 15M15 5L5 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {/* Pulse ring */}
        {!open && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
          />
        )}
      </button>
    </>
  );
}
