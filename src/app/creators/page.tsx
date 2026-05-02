'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

type CreatorVertical = 'Finance Creator' | 'Course Builder' | 'Coach';

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

const verticalFilters = ['All', 'Finance Creator', 'Course Builder', 'Coach'] as const;

const verticalMeta: Record<string, { icon: string; color: string; bg: string }> = {
  'Finance Creator': { icon: '📈', color: '#0ea5e9', bg: 'rgba(14,165,233,0.12)' },
  'Course Builder': { icon: '🎓', color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
  'Coach': { icon: '🧭', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
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
            <span className="text-xs font-medium text-white/60">{activeCount} Creator Personas Live</span>
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
            Finance creators, course builders, and coaches — each with an AI persona that engages their audience, answers questions, and drives conversions 24/7.
          </p>

          {/* Vertical pills */}
          <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
            {Object.entries(verticalMeta).map(([key, meta]) => (
              <div
                key={key}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-white/10"
                style={{ background: meta.bg, color: meta.color }}
              >
                <span>{meta.icon}</span>
                <span>{key}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search + Filter */}
      <section className="px-6 pb-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search creators, topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {verticalFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeFilter === f
                    ? 'bg-white/10 text-white border border-white/20' :'text-white/50 border border-white/8 hover:text-white hover:border-white/15'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Grid */}
      <section className="px-6 pb-16 flex-1">
        <div className="max-w-4xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-white/30">
              <p className="text-lg font-medium mb-2">No creators found</p>
              <p className="text-sm">Try a different search or filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((creator) => {
                const meta = verticalMeta[creator.vertical];
                return (
                  <div
                    key={creator.id}
                    className="group relative p-5 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300"
                  >
                    {/* Status badge */}
                    {creator.status !== 'active' && (
                      <div
                        className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize"
                        style={{
                          color: statusColors[creator.status],
                          background: `${statusColors[creator.status]}18`,
                          border: `1px solid ${statusColors[creator.status]}30`,
                        }}
                      >
                        {creator.status === 'training' ? 'Training...' : creator.status}
                      </div>
                    )}

                    <div className="flex items-start gap-4 mb-4">
                      {/* Avatar */}
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                        style={{ background: creator.avatarColor }}
                      >
                        {creator.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-bold text-white text-sm">{creator.name}</h3>
                          {creator.status === 'active' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-white/40">{creator.handle}</p>
                      </div>
                    </div>

                    {/* Vertical tag */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ color: meta?.color, background: meta?.bg }}
                      >
                        {meta?.icon} {creator.vertical}
                      </span>
                    </div>

                    <p className="text-xs text-white/60 font-medium mb-1">{creator.tagline}</p>
                    <p className="text-xs text-white/40 leading-relaxed mb-4">{creator.description}</p>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {creator.topics.map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-white/50">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/6">
                      <div className="flex gap-4">
                        <div>
                          <p className="text-xs font-semibold text-white">{creator.audience}</p>
                          <p className="text-[10px] text-white/35">Audience</p>
                        </div>
                        {creator.messagesTotal > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-white">{creator.messagesTotal.toLocaleString()}</p>
                            <p className="text-[10px] text-white/35">Messages</p>
                          </div>
                        )}
                      </div>
                      {creator.status === 'active' && (
                        <Link
                          href={`/creator/${creator.slug}`}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all"
                        >
                          Chat →
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon — D2C */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/5 border border-white/10 text-white/40">
                <span className="w-1 h-1 rounded-full bg-white/30" />
                Coming Soon
              </span>
              <h3 className="text-sm font-semibold text-white/40">D2C Brands & OTT Platforms</h3>
            </div>
            <p className="text-sm text-white/25 leading-relaxed max-w-2xl">
              We&apos;re launching creator-first. D2C brands and OTT streaming platforms are next on our roadmap — AI shopping assistants and character chat experiences coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="rounded-2xl border border-white/10 p-10"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(14,165,233,0.08) 100%)' }}
          >
            <h2 className="text-2xl font-bold text-white mb-3">Build your own AI creator persona</h2>
            <p className="text-white/50 text-sm mb-6">
              Join Finance creators, course builders, and coaches already using PersonaMatrix to engage their audience 24/7.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/guest-chat" className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/15 text-white hover:bg-white/8 transition-all">
                Try Demo
              </Link>
              <Link href="/register" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary">
                Get Started Free →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
