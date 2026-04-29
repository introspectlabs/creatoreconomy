'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

type CreatorVertical = 'Finance Creator' | 'Course Builder' | 'Coach' | 'D2C Founder';

interface Creator {
  id: string;
  name: string;
  slug: string;
  handle: string;
  vertical: CreatorVertical;
  tagline: string;
  description: string;
  avatar: string;
  avatarColor: string;
  status: 'active' | 'training' | 'coming-soon';
  audience: string;
  topics: string[];
  messagesTotal: number;
  conversionFocus: string;
}

const creators: Creator[] = [
  {
    id: 'c-001',
    name: 'Marcus Wealth',
    slug: 'marcus-wealth',
    handle: '@marcuswealth',
    vertical: 'Finance Creator',
    tagline: 'Personal finance for the 9-to-5 investor',
    description: 'Answers questions on index investing, tax-loss harvesting, and building a $1M portfolio on a regular salary.',
    avatar: 'MW',
    avatarColor: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
    status: 'active',
    audience: '284K followers',
    topics: ['Investing', 'Tax Strategy', 'FIRE'],
    messagesTotal: 61400,
    conversionFocus: 'Course enrollment',
  },
  {
    id: 'c-002',
    name: 'Priya Trades',
    slug: 'priya-trades',
    handle: '@priyatrades',
    vertical: 'Finance Creator',
    tagline: 'Options trading made simple for beginners',
    description: 'Walks through covered calls, puts, and risk management — in plain English, no jargon.',
    avatar: 'PT',
    avatarColor: 'linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)',
    status: 'active',
    audience: '118K followers',
    topics: ['Options', 'Risk Management', 'Stocks'],
    messagesTotal: 38900,
    conversionFocus: 'Community membership',
  },
  {
    id: 'c-003',
    name: 'Jordan Builds',
    slug: 'jordan-builds',
    handle: '@jordanbuilds',
    vertical: 'Course Builder',
    tagline: 'No-code SaaS from idea to $10K MRR',
    description: 'Guides students through validating, building, and launching no-code products — with real revenue milestones.',
    avatar: 'JB',
    avatarColor: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    status: 'active',
    audience: '92K followers',
    topics: ['No-Code', 'SaaS', 'Validation'],
    messagesTotal: 47200,
    conversionFocus: 'Course upsell',
  },
  {
    id: 'c-004',
    name: 'Leila Learns',
    slug: 'leila-learns',
    handle: '@leilalearns',
    vertical: 'Course Builder',
    tagline: 'UX design courses that get you hired',
    description: 'Answers portfolio questions, critiques design work, and helps students land their first UX role.',
    avatar: 'LL',
    avatarColor: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    status: 'active',
    audience: '67K followers',
    topics: ['UX Design', 'Portfolio', 'Job Search'],
    messagesTotal: 29100,
    conversionFocus: 'Bootcamp enrollment',
  },
  {
    id: 'c-005',
    name: 'Coach Dani',
    slug: 'coach-dani',
    handle: '@coachdani',
    vertical: 'Coach',
    tagline: 'Executive presence for first-time managers',
    description: 'Helps new managers navigate difficult conversations, set boundaries, and build leadership confidence.',
    avatar: 'CD',
    avatarColor: 'linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)',
    status: 'active',
    audience: '53K followers',
    topics: ['Leadership', 'Communication', 'Mindset'],
    messagesTotal: 22700,
    conversionFocus: '1:1 coaching booking',
  },
  {
    id: 'c-006',
    name: 'Ravi Mindset',
    slug: 'ravi-mindset',
    handle: '@ravimindset',
    vertical: 'Coach',
    tagline: 'High-performance habits for entrepreneurs',
    description: 'Covers morning routines, deep work systems, and mental resilience for founders building under pressure.',
    avatar: 'RM',
    avatarColor: 'linear-gradient(135deg, #8b5cf6 0%, #14b8a6 100%)',
    status: 'active',
    audience: '141K followers',
    topics: ['Habits', 'Deep Work', 'Resilience'],
    messagesTotal: 55800,
    conversionFocus: 'Group program',
  },
  {
    id: 'c-007',
    name: 'Sasha Skin',
    slug: 'sasha-skin',
    handle: '@sashaskin',
    vertical: 'D2C Founder',
    tagline: 'Clean skincare built for melanin-rich skin',
    description: 'Recommends products from her own line, answers ingredient questions, and guides customers to their perfect routine.',
    avatar: 'SS',
    avatarColor: 'linear-gradient(135deg, #f43f5e 0%, #f59e0b 100%)',
    status: 'active',
    audience: '209K followers',
    topics: ['Skincare', 'Ingredients', 'Routines'],
    messagesTotal: 73600,
    conversionFocus: 'Product purchase',
  },
  {
    id: 'c-008',
    name: 'Theo Gear',
    slug: 'theo-gear',
    handle: '@theogear',
    vertical: 'D2C Founder',
    tagline: 'Minimalist everyday carry for remote workers',
    description: 'Helps customers choose the right bag, accessories, and workspace setup from his curated product line.',
    avatar: 'TG',
    avatarColor: 'linear-gradient(135deg, #64748b 0%, #0ea5e9 100%)',
    status: 'active',
    audience: '78K followers',
    topics: ['EDC', 'Remote Work', 'Gear'],
    messagesTotal: 31500,
    conversionFocus: 'Bundle purchase',
  },
  {
    id: 'c-009',
    name: 'Nina Crypto',
    slug: 'nina-crypto',
    handle: '@ninacrypto',
    vertical: 'Finance Creator',
    tagline: 'DeFi and Web3 for skeptical beginners',
    description: 'Breaks down wallets, staking, and on-chain risk — without the hype or the shilling.',
    avatar: 'NC',
    avatarColor: 'linear-gradient(135deg, #f59e0b 0%, #a855f7 100%)',
    status: 'training',
    audience: '196K followers',
    topics: ['DeFi', 'Web3', 'Risk'],
    messagesTotal: 0,
    conversionFocus: 'Newsletter subscription',
  },
  {
    id: 'c-010',
    name: 'Felix Fit',
    slug: 'felix-fit',
    handle: '@felixfit',
    vertical: 'Course Builder',
    tagline: 'Strength training programs for busy professionals',
    description: 'Answers workout questions, adjusts programs for injuries, and keeps students accountable between sessions.',
    avatar: 'FF',
    avatarColor: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
    status: 'training',
    audience: '312K followers',
    topics: ['Strength', 'Nutrition', 'Recovery'],
    messagesTotal: 0,
    conversionFocus: 'Program purchase',
  },
];

const verticalFilters = ['All', 'Finance Creator', 'Course Builder', 'Coach', 'D2C Founder'] as const;

const verticalMeta: Record<string, { icon: string; color: string; bg: string }> = {
  'Finance Creator': { icon: '📈', color: '#0ea5e9', bg: 'rgba(14,165,233,0.12)' },
  'Course Builder': { icon: '🎓', color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
  'Coach': { icon: '🧭', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  'D2C Founder': { icon: '🛍️', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
};

const statusColors: Record<string, string> = {
  active: '#14b8a6',
  training: '#f59e0b',
  'coming-soon': '#6b7280',
};

export default function CreatorsDirectoryPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filtered = creators.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.tagline.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.topics.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesFilter = activeFilter === 'All' || c.vertical === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const activeCount = creators.filter((c) => c.status === 'active').length;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(135deg, #0a0c12 0%, #0f1120 100%)' }}
    >
      <PublicHeader />

      {/* Hero */}
      <section className="pt-32 pb-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
            <span className="text-xs font-medium text-white/60">{activeCount} Creators Live</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Meet the{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #a855f7, #0ea5e9)' }}
            >
              Creator Directory
            </span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Finance creators, course builders, coaches, and D2C brands — each with an AI persona that engages their audience, answers questions, and drives conversions 24/7.
          </p>

          {/* Vertical pills — decorative overview */}
          <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
            {Object.entries(verticalMeta).map(([label, meta]) => (
              <div
                key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
                style={{ background: meta.bg, color: meta.color, borderColor: `${meta.color}30` }}
              >
                <span>{meta.icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="px-6 pb-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, topic, or niche..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {verticalFilters.map((f) => {
              const meta = f !== 'All' ? verticalMeta[f] : null;
              const isActive = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border"
                  style={
                    isActive
                      ? {
                          background: meta
                            ? meta.bg
                            : 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(14,165,233,0.15))',
                          color: meta ? meta.color : '#c4b5fd',
                          borderColor: meta ? `${meta.color}40` : 'rgba(168,85,247,0.4)',
                        }
                      : {
                          background: 'transparent',
                          color: 'rgba(255,255,255,0.35)',
                          borderColor: 'rgba(255,255,255,0.08)',
                        }
                  }
                >
                  {meta && <span>{meta.icon}</span>}
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="flex-1 px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <p className="text-white/40 text-sm">No creators found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl border border-white/10 p-8 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(14,165,233,0.08) 100%)' }}
          >
            <h2 className="text-2xl font-bold text-white mb-2">Build your AI persona</h2>
            <p className="text-white/50 text-sm mb-6 max-w-lg mx-auto">
              Whether you teach finance, run a coaching practice, sell a course, or ship your own products — your AI persona works your audience around the clock.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #a855f7, #0ea5e9)' }}
              >
                Get Started Free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white/60 border border-white/10 hover:text-white hover:border-white/25 transition-all"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

function CreatorCard({ creator }: { creator: Creator }) {
  const meta = verticalMeta[creator.vertical];
  const statusColor = statusColors[creator.status] || '#6b7280';
  const isActive = creator.status === 'active';

  return (
    <div
      className="group relative rounded-2xl border border-white/8 p-5 flex flex-col gap-4 transition-all duration-200 hover:border-white/20 hover:shadow-[0_0_32px_rgba(168,85,247,0.10)]"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      {/* Top row */}
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ background: creator.avatarColor }}
        >
          {creator.avatar}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-white truncate">{creator.name}</h3>
            <span
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider flex-shrink-0"
              style={{
                background: `${statusColor}18`,
                color: statusColor,
                border: `1px solid ${statusColor}30`,
              }}
            >
              <span
                className="w-1 h-1 rounded-full"
                style={{ background: statusColor, boxShadow: isActive ? `0 0 4px ${statusColor}` : 'none' }}
              />
              {creator.status === 'active' ? 'Live' : creator.status === 'training' ? 'Training' : 'Soon'}
            </span>
          </div>
          <p className="text-xs text-white/35 mt-0.5">{creator.handle}</p>
        </div>
      </div>

      {/* Vertical badge + tagline */}
      <div>
        <div
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium mb-2"
          style={{ background: meta.bg, color: meta.color }}
        >
          {meta.icon} {creator.vertical}
        </div>
        <p className="text-xs text-white/55 leading-relaxed line-clamp-2">{creator.description}</p>
      </div>

      {/* Topics */}
      <div className="flex flex-wrap gap-1">
        {creator.topics.map((t) => (
          <span
            key={t}
            className="text-[10px] text-white/30 bg-white/5 border border-white/8 px-1.5 py-0.5 rounded-md"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 pt-1 border-t border-white/5">
        <div>
          <p className="text-[10px] text-white/25 uppercase tracking-wider">Audience</p>
          <p className="text-xs font-semibold text-white/60">{creator.audience}</p>
        </div>
        <div>
          <p className="text-[10px] text-white/25 uppercase tracking-wider">Conversations</p>
          <p className="text-xs font-semibold text-white/60">
            {creator.messagesTotal > 0 ? creator.messagesTotal.toLocaleString() : '—'}
          </p>
        </div>
        <div className="ml-auto">
          <p className="text-[10px] text-white/25 uppercase tracking-wider">Goal</p>
          <p className="text-xs font-semibold text-white/60 truncate max-w-[90px]">{creator.conversionFocus}</p>
        </div>
      </div>

      {/* CTA */}
      {isActive ? (
        <div className="flex gap-2">
          <Link
            href={`/creator/personamatrix`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium text-white/60 border border-white/10 hover:text-white hover:border-white/25 transition-all"
          >
            Profile
          </Link>
          <Link
            href={`/chat/${creator.slug}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #a855f7, #0ea5e9)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Chat Now
          </Link>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white/25 bg-white/4 border border-white/8 cursor-not-allowed">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {creator.status === 'training' ? 'Training...' : 'Coming Soon'}
        </div>
      )}
    </div>
  );
}
