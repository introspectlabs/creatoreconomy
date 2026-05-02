'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

type CreatorCategory = 'Finance' | 'Education' | 'Coaching';

interface Creator {
  id: string;
  name: string;
  slug: string;
  handle: string;
  category: CreatorCategory;
  tagline: string;
  description: string;
  avatar: string;
  avatarColor: string;
  audience: string;
  topics: string[];
  rating: number;
  responseCount: string;
  personaCount: number;
}

const creators: Creator[] = [
  {
    id: 'c-001',
    name: 'Marcus Wealth',
    slug: 'marcus-wealth',
    handle: '@marcuswealth',
    category: 'Finance',
    tagline: 'Personal finance for the 9-to-5 investor',
    description: 'Covers index investing, tax-loss harvesting, and building long-term wealth on a regular salary.',
    avatar: 'MW',
    avatarColor: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
    audience: '284K followers',
    topics: ['Investing', 'Tax Strategy', 'FIRE'],
    rating: 4.9,
    responseCount: '61K',
    personaCount: 4,
  },
  {
    id: 'c-002',
    name: 'Priya Trades',
    slug: 'priya-trades',
    handle: '@priyatrades',
    category: 'Finance',
    tagline: 'Options trading made simple for beginners',
    description: 'Explains covered calls, puts, and risk management in plain English — no jargon, no hype.',
    avatar: 'PT',
    avatarColor: 'linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)',
    audience: '118K followers',
    topics: ['Options', 'Risk Management', 'Stocks'],
    rating: 4.8,
    responseCount: '39K',
    personaCount: 3,
  },
  {
    id: 'c-003',
    name: 'Jordan Builds',
    slug: 'jordan-builds',
    handle: '@jordanbuilds',
    category: 'Education',
    tagline: 'No-code SaaS from idea to $10K MRR',
    description: 'Guides you through validating, building, and launching no-code products with real revenue milestones.',
    avatar: 'JB',
    avatarColor: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    audience: '92K followers',
    topics: ['No-Code', 'SaaS', 'Validation'],
    rating: 4.7,
    responseCount: '47K',
    personaCount: 5,
  },
  {
    id: 'c-004',
    name: 'Leila Learns',
    slug: 'leila-learns',
    handle: '@leilalearns',
    category: 'Education',
    tagline: 'UX design courses that get you hired',
    description: 'Helps with portfolio reviews, design critiques, and landing your first UX role.',
    avatar: 'LL',
    avatarColor: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    audience: '67K followers',
    topics: ['UX Design', 'Portfolio', 'Job Search'],
    rating: 4.8,
    responseCount: '29K',
    personaCount: 2,
  },
  {
    id: 'c-005',
    name: 'Coach Dani',
    slug: 'coach-dani',
    handle: '@coachdani',
    category: 'Coaching',
    tagline: 'Executive presence for first-time managers',
    description: 'Helps new managers navigate difficult conversations, set boundaries, and build leadership confidence.',
    avatar: 'CD',
    avatarColor: 'linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)',
    audience: '53K followers',
    topics: ['Leadership', 'Communication', 'Mindset'],
    rating: 4.9,
    responseCount: '23K',
    personaCount: 3,
  },
  {
    id: 'c-006',
    name: 'Ravi Mindset',
    slug: 'ravi-mindset',
    handle: '@ravimindset',
    category: 'Coaching',
    tagline: 'High-performance habits for entrepreneurs',
    description: 'Covers morning routines, deep work systems, and mental resilience for founders building under pressure.',
    avatar: 'RM',
    avatarColor: 'linear-gradient(135deg, #8b5cf6 0%, #14b8a6 100%)',
    audience: '141K followers',
    topics: ['Habits', 'Deep Work', 'Resilience'],
    rating: 4.7,
    responseCount: '56K',
    personaCount: 6,
  },
];

const categoryFilters = ['All', 'Finance', 'Education', 'Coaching'] as const;

const categoryMeta: Record<string, { icon: string; color: string; bg: string; description: string }> = {
  Finance: {
    icon: '📈',
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.12)',
    description: 'Investing, trading & money',
  },
  Education: {
    icon: '🎓',
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.12)',
    description: 'Courses, skills & careers',
  },
  Coaching: {
    icon: '🧭',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.12)',
    description: 'Mindset, leadership & growth',
  },
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
    const matchesFilter = activeFilter === 'All' || c.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(135deg, #0a0c12 0%, #0f1120 100%)' }}
    >
      <PublicHeader />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
                <span className="text-xs font-medium text-white/60">{creators.length} creators available to chat</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                Discover creators{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #a855f7, #0ea5e9)' }}
                >
                  you can talk to
                </span>
              </h1>
              <p className="text-base text-white/50 max-w-xl leading-relaxed">
                Browse finance experts, educators, and coaches. Ask questions, get personalised answers, and learn directly from the creators you follow.
              </p>
            </div>

            {/* Category cards */}
            <div className="flex gap-3 flex-wrap lg:flex-nowrap lg:flex-shrink-0">
              {Object.entries(categoryMeta).map(([key, meta]) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(activeFilter === key ? 'All' : key)}
                  className="flex flex-col items-start gap-1 px-4 py-3 rounded-2xl border transition-all duration-200 text-left"
                  style={{
                    background: activeFilter === key ? meta.bg : 'rgba(255,255,255,0.03)',
                    borderColor: activeFilter === key ? `${meta.color}40` : 'rgba(255,255,255,0.08)',
                  }}
                >
                  <span className="text-lg">{meta.icon}</span>
                  <span className="text-xs font-semibold" style={{ color: activeFilter === key ? meta.color : 'rgba(255,255,255,0.6)' }}>
                    {key}
                  </span>
                  <span className="text-[10px] text-white/30 whitespace-nowrap">{meta.description}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search + Filter bar */}
      <section className="px-6 pb-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
              width="15"
              height="15"
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
              placeholder="Search by name, topic, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categoryFilters.map((f) => (
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
      <section className="px-6 pb-20 flex-1">
        <div className="max-w-5xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-white/30">
              <p className="text-2xl mb-2">🔍</p>
              <p className="text-base font-medium mb-1">No creators found</p>
              <p className="text-sm">Try a different search term or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((creator) => {
                const meta = categoryMeta[creator.category];
                return (
                  <div
                    key={creator.id}
                    className="group flex flex-col p-5 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                        style={{ background: creator.avatarColor }}
                      >
                        {creator.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h3 className="font-bold text-white text-sm truncate">{creator.name}</h3>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] flex-shrink-0" title="Active" />
                        </div>
                        <p className="text-[11px] text-white/35">{creator.handle}</p>
                      </div>
                    </div>

                    {/* Category tag */}
                    <div className="mb-3">
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ color: meta?.color, background: meta?.bg }}
                      >
                        {meta?.icon} {creator.category}
                      </span>
                    </div>

                    {/* Tagline + description */}
                    <p className="text-xs font-semibold text-white/80 mb-1 leading-snug">{creator.tagline}</p>
                    <p className="text-xs text-white/40 leading-relaxed mb-4 flex-1">{creator.description}</p>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {creator.topics.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-white/45"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Footer stats + CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/6">
                      <div className="flex gap-3">
                        <div>
                          <p className="text-xs font-semibold text-white">{creator.audience}</p>
                          <p className="text-[10px] text-white/30">Followers</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">⭐ {creator.rating}</p>
                          <p className="text-[10px] text-white/30">Rating</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">
                            🎭 {creator.personaCount}
                          </p>
                          <p className="text-[10px] text-white/30">Personas</p>
                        </div>
                      </div>
                      <Link
                        href={`/creator/${creator.slug}`}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/15 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
                      >
                        View Profile →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Results count */}
          {filtered.length > 0 && (
            <p className="text-center text-xs text-white/25 mt-8">
              Showing {filtered.length} of {creators.length} creators
            </p>
          )}
        </div>
      </section>

      {/* Audience CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-2xl border border-white/10 p-8 flex flex-col sm:flex-row items-center gap-6"
            style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(14,165,233,0.06) 100%)' }}
          >
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-lg font-bold text-white mb-2">Not sure where to start?</h2>
              <p className="text-sm text-white/45 leading-relaxed">
                Try a free chat with any creator. No account needed — just pick a topic and start asking.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link
                href="/guest-chat"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/15 text-white hover:bg-white/8 transition-all whitespace-nowrap"
              >
                Try Free Chat
              </Link>
              <Link
                href="/register"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary whitespace-nowrap"
              >
                Sign Up Free →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
