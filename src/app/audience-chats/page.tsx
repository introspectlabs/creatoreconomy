'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, Search, Clock, CreditCard, ChevronRight } from 'lucide-react';
import AudienceLayout from '@/components/AudienceLayout';

interface ChatSession {
  id: string;
  persona: string;
  creator: string;
  emoji: string;
  slug: string;
  lastMessage: string;
  time: string;
  messageCount: number;
  unread: boolean;
}

const CHAT_SESSIONS: ChatSession[] = [
  { id: '1', persona: 'Aria Sales', creator: 'PersonaMatrix', emoji: '🤝', slug: 'aria-sales', lastMessage: 'Great question! Let me qualify your lead and schedule a demo...', time: '2h ago', messageCount: 12, unread: true },
  { id: '2', persona: 'Support Bot v2', creator: 'PersonaMatrix', emoji: '🛠️', slug: 'support-bot-v2', lastMessage: 'Your ticket has been resolved. Is there anything else I can help with?', time: '1d ago', messageCount: 8, unread: false },
  { id: '3', persona: 'Zara Retail', creator: 'PersonaMatrix', emoji: '🛍️', slug: 'zara-retail', lastMessage: 'I found 3 products matching your search. Here are the top picks...', time: '3d ago', messageCount: 5, unread: false },
  { id: '4', persona: 'Maya HR', creator: 'PersonaMatrix', emoji: '👩‍💼', slug: 'maya-hr', lastMessage: 'Your leave request has been noted. HR will confirm within 24 hours.', time: '1w ago', messageCount: 15, unread: false },
];

export default function AudienceChatsPage() {
  const [search, setSearch] = useState('');

  const filtered = CHAT_SESSIONS.filter(
    (s) => s.persona.toLowerCase().includes(search.toLowerCase()) || s.creator.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AudienceLayout topbarTitle="My Chats" topbarIcon={MessageSquare}>
      <div className="px-4 sm:px-6 py-6 max-w-3xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">My Chats</h2>
            <p className="text-white/55 text-sm mt-1">Your conversation history with AI personas</p>
          </div>
          <Link
            href="/chat/aria-sales"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #6b7ff0 0%, #7c3aed 100%)' }}
          >
            <MessageSquare size={13} /> New Chat
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#6b7ff0]/50 transition-all"
          />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Total Chats', value: CHAT_SESSIONS.reduce((a, s) => a + s.messageCount, 0), icon: MessageSquare },
            { label: 'Personas Chatted', value: CHAT_SESSIONS.length, icon: Clock },
            { label: 'Free Chats Left', value: 1, icon: CreditCard },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-2xl border border-white/10 bg-white/4 text-center">
              <p className="text-2xl font-extrabold text-white">{stat.value}</p>
              <p className="text-[11px] text-white/40 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Chat list */}
        <div className="flex flex-col gap-2">
          {filtered.map((session) => (
            <Link
              key={session.id}
              href={`/chat/${session.slug}`}
              className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/4 hover:bg-white/6 hover:border-[#6b7ff0]/20 transition-all duration-150 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#6b7ff0]/10 flex items-center justify-center text-2xl flex-shrink-0">{session.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-bold text-white truncate">{session.persona}</p>
                  {session.unread && <span className="w-2 h-2 rounded-full bg-[#6b7ff0] flex-shrink-0" />}
                </div>
                <p className="text-xs text-white/40 truncate">{session.lastMessage}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-white/25">{session.time}</span>
                  <span className="text-[10px] text-white/25">·</span>
                  <span className="text-[10px] text-white/25">{session.messageCount} messages</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" />
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
              <MessageSquare size={28} className="text-white/20" />
            </div>
            <p className="text-white/40 text-sm">No chats found.</p>
            <Link href="/chat/aria-sales" className="mt-4 px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #6b7ff0 0%, #7c3aed 100%)' }}>
              Start a Chat
            </Link>
          </div>
        )}

        {/* Buy credits nudge */}
        <div className="mt-6 p-4 rounded-2xl border border-amber-500/20 bg-amber-500/8 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <p className="text-sm font-bold text-amber-300">1 free chat remaining</p>
            <p className="text-xs text-amber-300/60 mt-0.5">Buy credits to keep chatting after your free limit.</p>
          </div>
          <Link href="/audience-credits" className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-500 hover:bg-amber-400 transition-colors">
            Buy Credits
          </Link>
        </div>
      </div>
    </AudienceLayout>
  );
}
