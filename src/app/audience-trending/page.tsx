'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Star, MessageSquare, Heart, Flame, CreditCard } from 'lucide-react';
import AudienceLayout from '@/components/AudienceLayout';

interface TrendingPersona {
  id: string;
  name: string;
  creator: string;
  category: string;
  emoji: string;
  slug: string;
  description: string;
  followers: string;
  growth: string;
  chatsToday: string;
  rating: number;
  rank: number;
  isFollowing: boolean;
}

const TRENDING_PERSONAS: TrendingPersona[] = [
  { id: '1', name: 'Support Bot v2', creator: 'PersonaMatrix', category: 'Support', emoji: '🛠️', slug: 'support-bot-v2', description: 'Handles tier-1 support tickets, FAQ resolution, and escalation routing.', followers: '94.1k', growth: '+18%', chatsToday: '1.2k', rating: 4.8, rank: 1, isFollowing: false },
  { id: '2', name: 'Zara Retail', creator: 'PersonaMatrix', category: 'Retail', emoji: '🛍️', slug: 'zara-retail', description: 'E-commerce shopping assistant with product discovery and order tracking.', followers: '41.2k', growth: '+12%', chatsToday: '980', rating: 4.9, rank: 2, isFollowing: true },
  { id: '3', name: 'Aria Sales', creator: 'PersonaMatrix', category: 'Sales', emoji: '🤝', slug: 'aria-sales', description: 'Outbound sales assistant for SaaS leads — qualifies prospects and books demos.', followers: '28.4k', growth: '+9%', chatsToday: '750', rating: 4.9, rank: 3, isFollowing: true },
  { id: '4', name: 'Nova Customer Success', creator: 'PersonaMatrix', category: 'Success', emoji: '🌟', slug: 'nova-customer-success', description: 'Proactive success outreach — NPS follow-ups, renewal reminders, upsell conversations.', followers: '18.9k', growth: '+22%', chatsToday: '640', rating: 4.8, rank: 4, isFollowing: false },
  { id: '5', name: 'Kai Voice Agent', creator: 'PersonaMatrix', category: 'Voice', emoji: '🎙️', slug: 'kai-voice-agent', description: 'SIP-based voice IVR replacement with natural language understanding.', followers: '15.6k', growth: '+7%', chatsToday: '520', rating: 4.8, rank: 5, isFollowing: false },
  { id: '6', name: 'Multilingual Welcome', creator: 'PersonaMatrix', category: 'Onboarding', emoji: '🌍', slug: 'multilingual-welcome', description: 'First-touch multilingual greeter for global product onboarding flows.', followers: '11.4k', growth: '+15%', chatsToday: '480', rating: 4.7, rank: 6, isFollowing: false },
];

const CATEGORIES = ['All', 'Sales', 'Support', 'HR', 'Voice', 'Onboarding', 'Retail', 'Success'];

const rankColors: Record<number, string> = {
  1: 'text-amber-400',
  2: 'text-slate-300',
  3: 'text-amber-600',
};

export default function AudienceTrendingPage() {
  const [personas, setPersonas] = useState(TRENDING_PERSONAS);
  const [activeCategory, setActiveCategory] = useState('All');

  const toggleFollow = (id: string) => {
    setPersonas((prev) => prev.map((p) => (p.id === id ? { ...p, isFollowing: !p.isFollowing } : p)));
  };

  const filtered = activeCategory === 'All' ? personas : personas.filter((p) => p.category === activeCategory);

  return (
    <AudienceLayout topbarTitle="Trending" topbarIcon={TrendingUp}>
      <div className="px-4 sm:px-6 py-6 max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Flame size={20} className="text-amber-400" />
              Trending Creators
            </h2>
            <p className="text-white/55 text-sm mt-1">Most popular personas right now</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
            <Flame size={12} />
            Updated hourly
          </div>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#5a6ee0] text-white'
                  : 'bg-white/5 text-white/55 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Trending list */}
        <div className="flex flex-col gap-3">
          {filtered.map((persona) => (
            <div key={persona.id} className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/4 hover:bg-white/6 transition-all duration-150">
              {/* Rank */}
              <div className={`w-8 text-center font-extrabold text-lg flex-shrink-0 ${rankColors[persona.rank] || 'text-white/30'}`}>
                {persona.rank <= 3 ? (
                  <span>{persona.rank === 1 ? '🥇' : persona.rank === 2 ? '🥈' : '🥉'}</span>
                ) : (
                  <span className="text-sm text-white/30">#{persona.rank}</span>
                )}
              </div>

              {/* Emoji */}
              <div className="w-12 h-12 rounded-xl bg-[#6b7ff0]/10 flex items-center justify-center text-2xl flex-shrink-0">{persona.emoji}</div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-bold text-white truncate">{persona.name}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/8 text-white/40 border border-white/10 flex-shrink-0">{persona.category}</span>
                </div>
                <p className="text-xs text-white/40 truncate">by {persona.creator}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1">
                    <Star size={10} fill="#f59e0b" className="text-amber-400" />
                    <span className="text-[11px] text-white/50">{persona.rating}</span>
                  </div>
                  <span className="text-[11px] text-white/30">{persona.followers} followers</span>
                  <span className="text-[11px] text-green-400 font-semibold">{persona.growth} this week</span>
                  <span className="text-[11px] text-white/30">{persona.chatsToday} chats today</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href={`/chat/${persona.slug}`} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all">
                  <MessageSquare size={12} /> Chat
                </Link>
                <button
                  onClick={() => toggleFollow(persona.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    persona.isFollowing
                      ? 'bg-[#6b7ff0]/15 text-[#6b7ff0] border border-[#6b7ff0]/30 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20'
                      : 'bg-[#6b7ff0] text-white hover:bg-[#5a6ee0]'
                  }`}
                >
                  <Heart size={12} fill={persona.isFollowing ? 'currentColor' : 'none'} />
                  {persona.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Credits nudge */}
        <div className="mt-8 p-5 rounded-2xl border border-[#6b7ff0]/20 flex flex-col sm:flex-row sm:items-center gap-4" style={{ background: 'linear-gradient(135deg, rgba(107,127,240,0.08) 0%, rgba(124,58,237,0.05) 100%)' }}>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">Chat with trending creators</p>
            <p className="text-xs text-white/40 mt-0.5">Buy credits to chat with any trending persona — no subscription needed.</p>
          </div>
          <Link href="/audience-credits" className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #6b7ff0 0%, #7c3aed 100%)' }}>
            <CreditCard size={13} /> Buy Credits
          </Link>
        </div>
      </div>
    </AudienceLayout>
  );
}
