'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Star, MessageSquare, Heart, Flame, CreditCard } from 'lucide-react';
import AudienceLayout from '@/components/AudienceLayout';

type Domain = 'Finance' | 'Education' | 'Coaching' | 'Sales' | 'Support' | 'Retail';

interface TrendingCreator {
  id: string;
  name: string;
  slug: string;
  handle: string;
  domains: Domain[];
  emoji: string;
  tagline: string;
  followers: string;
  growth: string;
  chatsToday: string;
  rating: number;
  rank: number;
  personaCount: number;
  personaLabels: string[];
  isFollowing: boolean;
}

const domainMeta: Record<Domain, { icon: string; color: string; bg: string }> = {
  Finance: { icon: '📈', color: '#0ea5e9', bg: 'rgba(14,165,233,0.12)' },
  Education: { icon: '🎓', color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
  Coaching: { icon: '🧭', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  Sales: { icon: '🤝', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  Support: { icon: '🛠️', color: '#6b7ff0', bg: 'rgba(107,127,240,0.12)' },
  Retail: { icon: '🛍️', color: '#ec4899', bg: 'rgba(236,72,153,0.12)' },
};

const TRENDING_CREATORS: TrendingCreator[] = [
  {
    id: '1',
    name: 'Ravi Mindset',
    slug: 'ravi-mindset',
    handle: '@ravimindset',
    domains: ['Coaching', 'Finance'],
    emoji: '🧠',
    tagline: 'High-performance habits for entrepreneurs building wealth',
    followers: '141K',
    growth: '+22%',
    chatsToday: '1.4k',
    rating: 4.7,
    rank: 1,
    personaCount: 6,
    personaLabels: ['Performance Coach', 'Deep Work Advisor', 'Resilience Mentor', 'Business Finance Coach', 'Habit Architect', 'Founder Strategist'],
    isFollowing: false,
  },
  {
    id: '2',
    name: 'Marcus Wealth',
    slug: 'marcus-wealth',
    handle: '@marcuswealth',
    domains: ['Finance', 'Coaching'],
    emoji: '💰',
    tagline: 'Personal finance meets high-performance habits',
    followers: '284K',
    growth: '+18%',
    chatsToday: '1.2k',
    rating: 4.9,
    rank: 2,
    personaCount: 4,
    personaLabels: ['Wealth Advisor', 'FIRE Coach', 'Tax Strategist', 'Mindset Mentor'],
    isFollowing: true,
  },
  {
    id: '3',
    name: 'Coach Dani',
    slug: 'coach-dani',
    handle: '@coachdani',
    domains: ['Coaching', 'Education', 'Finance'],
    emoji: '🧭',
    tagline: 'Executive presence, leadership skills & financial confidence',
    followers: '53K',
    growth: '+15%',
    chatsToday: '980',
    rating: 4.9,
    rank: 3,
    personaCount: 3,
    personaLabels: ['Leadership Coach', 'Communication Trainer', 'Comp & Equity Advisor'],
    isFollowing: false,
  },
  {
    id: '4',
    name: 'Priya Trades',
    slug: 'priya-trades',
    handle: '@priyatrades',
    domains: ['Finance', 'Education'],
    emoji: '📊',
    tagline: 'Options trading + financial literacy for beginners',
    followers: '118K',
    growth: '+12%',
    chatsToday: '750',
    rating: 4.8,
    rank: 4,
    personaCount: 3,
    personaLabels: ['Options Trader', 'Finance Educator', 'Risk Coach'],
    isFollowing: true,
  },
  {
    id: '5',
    name: 'Jordan Builds',
    slug: 'jordan-builds',
    handle: '@jordanbuilds',
    domains: ['Education', 'Coaching'],
    emoji: '🚀',
    tagline: 'No-code SaaS from idea to $10K MRR — with coaching',
    followers: '92K',
    growth: '+9%',
    chatsToday: '640',
    rating: 4.7,
    rank: 5,
    personaCount: 5,
    personaLabels: ['SaaS Educator', 'Validation Coach', 'Product Strategist', 'Launch Advisor', 'Mindset Coach'],
    isFollowing: false,
  },
  {
    id: '6',
    name: 'Leila Learns',
    slug: 'leila-learns',
    handle: '@leilalearns',
    domains: ['Education', 'Coaching'],
    emoji: '🎨',
    tagline: 'UX design courses + career coaching that get you hired',
    followers: '67K',
    growth: '+7%',
    chatsToday: '480',
    rating: 4.8,
    rank: 6,
    personaCount: 2,
    personaLabels: ['UX Educator', 'Career Coach'],
    isFollowing: false,
  },
];

const DOMAIN_FILTERS = ['All', 'Finance', 'Education', 'Coaching'] as const;

const rankMedal: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

export default function AudienceTrendingPage() {
  const [creators, setCreators] = useState(TRENDING_CREATORS);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const toggleFollow = (id: string) => {
    setCreators((prev) => prev.map((c) => (c.id === id ? { ...c, isFollowing: !c.isFollowing } : c)));
  };

  const filtered =
    activeFilter === 'All'
      ? creators
      : creators.filter((c) => c.domains.includes(activeFilter as Domain));

  return (
    <AudienceLayout topbarTitle="Trending" topbarIcon={TrendingUp}>
      <div className="px-4 sm:px-6 py-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Flame size={20} className="text-amber-400" />
              Trending Creators
            </h2>
            <p className="text-white/50 text-sm mt-1">Most-chatted multi-domain creators right now</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
            <Flame size={12} />
            Updated hourly
          </div>
        </div>

        {/* Multi-domain callout */}
        <div className="mb-5 flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-white/[0.02]">
          <span className="text-base">🎭</span>
          <p className="text-xs text-white/45 leading-relaxed">
            <span className="text-white/70 font-medium">These creators span multiple domains.</span>{' '}
            Each one builds expert personas across finance, education, coaching, and more — one creator, many angles.
          </p>
        </div>

        {/* Domain filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6" style={{ scrollbarWidth: 'none' }}>
          {DOMAIN_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === f
                  ? 'bg-[#5a6ee0] text-white'
                  : 'bg-white/5 text-white/55 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {f !== 'All' && <span>{domainMeta[f as Domain]?.icon}</span>}
              {f}
            </button>
          ))}
        </div>

        {/* Trending list */}
        <div className="flex flex-col gap-3">
          {filtered.map((creator) => (
            <div
              key={creator.id}
              className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-150"
            >
              {/* Rank */}
              <div className="w-8 text-center font-extrabold text-lg flex-shrink-0 pt-1">
                {creator.rank <= 3 ? (
                  <span>{rankMedal[creator.rank]}</span>
                ) : (
                  <span className="text-sm text-white/30">#{creator.rank}</span>
                )}
              </div>

              {/* Emoji */}
              <div className="w-12 h-12 rounded-xl bg-[#6b7ff0]/10 flex items-center justify-center text-2xl flex-shrink-0">
                {creator.emoji}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="text-sm font-bold text-white">{creator.name}</p>
                  <span className="text-[10px] text-white/35">{creator.handle}</span>
                  {creator.domains.length > 1 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#7c3aed]/15 text-[#a78bfa] border border-[#7c3aed]/25">
                      multi-domain
                    </span>
                  )}
                </div>

                {/* Domain tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {creator.domains.map((d) => (
                    <span
                      key={d}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{ background: domainMeta[d].bg, color: domainMeta[d].color, border: `1px solid ${domainMeta[d].color}30` }}
                    >
                      {domainMeta[d].icon} {d}
                    </span>
                  ))}
                </div>

                {/* Persona labels */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {creator.personaLabels.slice(0, 3).map((label) => (
                    <span key={label} className="px-2 py-0.5 rounded-md text-[10px] text-white/40 bg-white/5 border border-white/8">
                      🎭 {label}
                    </span>
                  ))}
                  {creator.personaLabels.length > 3 && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] text-white/30 bg-white/5 border border-white/8">
                      +{creator.personaLabels.length - 3} more
                    </span>
                  )}
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star size={10} fill="#f59e0b" className="text-amber-400" />
                    <span className="text-[11px] text-white/50">{creator.rating}</span>
                  </div>
                  <span className="text-[11px] text-white/30">{creator.followers} followers</span>
                  <span className="text-[11px] text-white/30">🎭 {creator.personaCount} personas</span>
                  <span className="text-[11px] text-green-400 font-semibold">{creator.growth} this week</span>
                  <span className="text-[11px] text-white/30">{creator.chatsToday} chats today</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-2 flex-shrink-0">
                <Link
                  href={`/creator/${creator.slug}`}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                  <MessageSquare size={12} /> View
                </Link>
                <button
                  onClick={() => toggleFollow(creator.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    creator.isFollowing
                      ? 'bg-[#6b7ff0]/15 text-[#6b7ff0] border border-[#6b7ff0]/30 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20'
                      : 'bg-[#6b7ff0] text-white hover:bg-[#5a6ee0]'
                  }`}
                >
                  <Heart size={12} fill={creator.isFollowing ? 'currentColor' : 'none'} />
                  {creator.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Credits nudge */}
        <div
          className="mt-8 p-5 rounded-2xl border border-[#6b7ff0]/20 flex flex-col sm:flex-row sm:items-center gap-4"
          style={{ background: 'linear-gradient(135deg, rgba(107,127,240,0.08) 0%, rgba(124,58,237,0.05) 100%)' }}
        >
          <div className="flex-1">
            <p className="text-sm font-bold text-white">Chat with trending creators</p>
            <p className="text-xs text-white/40 mt-0.5">Buy credits to chat with any trending persona across all domains — no subscription needed.</p>
          </div>
          <Link
            href="/audience-credits"
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #6b7ff0 0%, #7c3aed 100%)' }}
          >
            <CreditCard size={13} /> Buy Credits
          </Link>
        </div>
      </div>
    </AudienceLayout>
  );
}
