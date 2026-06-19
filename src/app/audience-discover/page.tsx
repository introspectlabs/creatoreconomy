'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Star, MessageSquare, CreditCard, Heart } from 'lucide-react';
import AudienceLayout from '@/components/AudienceLayout';

type Domain = 'Finance' | 'Education' | 'Coaching' | 'Sales' | 'Support' | 'Retail';

interface Creator {
  id: string;
  name: string;
  slug: string;
  handle: string;
  domains: Domain[];
  emoji: string;
  tagline: string;
  description: string;
  followers: string;
  rating: number;
  personaCount: number;
  personaLabels: string[];
  isFollowing: boolean;
  isNew?: boolean;
}

const domainMeta: Record<Domain, { icon: string; color: string; bg: string }> = {
  Finance: { icon: '📈', color: '#0ea5e9', bg: 'rgba(14,165,233,0.12)' },
  Education: { icon: '🎓', color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
  Coaching: { icon: '🧭', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  Sales: { icon: '🤝', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  Support: { icon: '🛠️', color: '#6b7ff0', bg: 'rgba(107,127,240,0.12)' },
  Retail: { icon: '🛍️', color: '#ec4899', bg: 'rgba(236,72,153,0.12)' },
};

const ALL_CREATORS: Creator[] = [
  {
    id: '1',
    name: 'Marcus Wealth',
    slug: 'marcus-wealth',
    handle: '@marcuswealth',
    domains: ['Finance', 'Coaching'],
    emoji: '💰',
    tagline: 'Personal finance meets high-performance habits',
    description: 'Covers index investing, tax-loss harvesting, and wealth building — plus the mindset and habits that make it stick.',
    followers: '284K',
    rating: 4.9,
    personaCount: 4,
    personaLabels: ['Wealth Advisor', 'FIRE Coach', 'Tax Strategist', 'Mindset Mentor'],
    isFollowing: true,
  },
  {
    id: '2',
    name: 'Priya Trades',
    slug: 'priya-trades',
    handle: '@priyatrades',
    domains: ['Finance', 'Education'],
    emoji: '📊',
    tagline: 'Options trading + financial literacy for beginners',
    description: 'Explains covered calls, puts, and risk management in plain English — and teaches the financial fundamentals behind every trade.',
    followers: '118K',
    rating: 4.8,
    personaCount: 3,
    personaLabels: ['Options Trader', 'Finance Educator', 'Risk Coach'],
    isFollowing: false,
    isNew: true,
  },
  {
    id: '3',
    name: 'Jordan Builds',
    slug: 'jordan-builds',
    handle: '@jordanbuilds',
    domains: ['Education', 'Coaching'],
    emoji: '🚀',
    tagline: 'No-code SaaS from idea to $10K MRR — with coaching',
    description: 'Guides you through validating, building, and launching no-code products — and coaches you through the founder mindset challenges.',
    followers: '92K',
    rating: 4.7,
    personaCount: 5,
    personaLabels: ['SaaS Educator', 'Validation Coach', 'Product Strategist', 'Launch Advisor', 'Mindset Coach'],
    isFollowing: false,
  },
  {
    id: '4',
    name: 'Leila Learns',
    slug: 'leila-learns',
    handle: '@leilalearns',
    domains: ['Education', 'Coaching'],
    emoji: '🎨',
    tagline: 'UX design courses + career coaching that get you hired',
    description: 'Helps with portfolio reviews, design critiques, and landing your first UX role — with dedicated coaching personas for job seekers.',
    followers: '67K',
    rating: 4.8,
    personaCount: 2,
    personaLabels: ['UX Educator', 'Career Coach'],
    isFollowing: true,
  },
  {
    id: '5',
    name: 'Coach Dani',
    slug: 'coach-dani',
    handle: '@coachdani',
    domains: ['Coaching', 'Education', 'Finance'],
    emoji: '🧭',
    tagline: 'Executive presence, leadership skills & financial confidence',
    description: 'Helps new managers navigate difficult conversations and build leadership confidence — plus a finance persona for comp and equity.',
    followers: '53K',
    rating: 4.9,
    personaCount: 3,
    personaLabels: ['Leadership Coach', 'Communication Trainer', 'Comp & Equity Advisor'],
    isFollowing: false,
    isNew: true,
  },
  {
    id: '6',
    name: 'Ravi Mindset',
    slug: 'ravi-mindset',
    handle: '@ravimindset',
    domains: ['Coaching', 'Finance'],
    emoji: '🧠',
    tagline: 'High-performance habits for entrepreneurs building wealth',
    description: 'Covers morning routines, deep work systems, and mental resilience for founders — plus a finance persona for bootstrapped business money management.',
    followers: '141K',
    rating: 4.7,
    personaCount: 6,
    personaLabels: ['Performance Coach', 'Deep Work Advisor', 'Resilience Mentor', 'Business Finance Coach', 'Habit Architect', 'Founder Strategist'],
    isFollowing: false,
  },
];

const DOMAIN_FILTERS = ['All', 'Finance', 'Education', 'Coaching'] as const;

export default function AudienceDiscoverPage() {
  const [creators, setCreators] = useState(ALL_CREATORS);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const toggleFollow = (id: string) => {
    setCreators((prev) => prev.map((c) => (c.id === id ? { ...c, isFollowing: !c.isFollowing } : c)));
  };

  const filtered = creators.filter((c) => {
    const matchFilter = activeFilter === 'All' || c.domains.includes(activeFilter as Domain);
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.tagline.toLowerCase().includes(search.toLowerCase()) ||
      c.personaLabels.some((p) => p.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  const multiDomainCount = creators.filter((c) => c.domains.length > 1).length;

  return (
    <AudienceLayout topbarTitle="Discover" topbarIcon={Compass}>
      <div className="px-4 sm:px-6 py-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-white">Discover Creators</h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#7c3aed]/15 text-[#a78bfa] border border-[#7c3aed]/25">
              {multiDomainCount} multi-domain
            </span>
          </div>
          <p className="text-white/50 text-sm">Each creator builds expert personas across finance, education, coaching, and more</p>
        </div>

        {/* Multi-domain callout */}
        <div className="mb-5 flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-white/[0.02]">
          <span className="text-base">🎭</span>
          <p className="text-xs text-white/45 leading-relaxed">
            <span className="text-white/70 font-medium">Creators aren&apos;t limited to one niche.</span>{' '}
            Each creator builds expert personas across multiple domains — so you get the full picture from people you already trust.
          </p>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search creators, personas, or topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#6b7ff0]/50 transition-all"
          />
        </div>

        {/* Domain filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6" style={{ scrollbarWidth: 'none' }}>
          {DOMAIN_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
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

        {/* Creator grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((creator) => (
            <div
              key={creator.id}
              className="relative flex flex-col gap-3 p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-150"
            >
              {creator.isNew && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#7c3aed]/20 text-[#a78bfa] border border-[#7c3aed]/30">
                  NEW
                </span>
              )}

              {/* Avatar + name */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#6b7ff0]/10 flex items-center justify-center text-2xl flex-shrink-0">
                  {creator.emoji}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">{creator.name}</p>
                  <p className="text-xs text-white/40 truncate">{creator.handle}</p>
                </div>
              </div>

              {/* Domain tags */}
              <div className="flex flex-wrap gap-1.5">
                {creator.domains.map((d) => (
                  <span
                    key={d}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{ background: domainMeta[d].bg, color: domainMeta[d].color, border: `1px solid ${domainMeta[d].color}30` }}
                  >
                    {domainMeta[d].icon} {d}
                  </span>
                ))}
                {creator.domains.length > 1 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 text-white/40 border border-white/10">
                    multi-domain
                  </span>
                )}
              </div>

              <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{creator.description}</p>

              {/* Persona preview */}
              <div className="flex flex-wrap gap-1">
                {creator.personaLabels.slice(0, 3).map((label) => (
                  <span key={label} className="px-2 py-0.5 rounded-md text-[10px] text-white/50 bg-white/5 border border-white/8">
                    🎭 {label}
                  </span>
                ))}
                {creator.personaLabels.length > 3 && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] text-white/35 bg-white/5 border border-white/8">
                    +{creator.personaLabels.length - 3} more
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-3 text-[11px]">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star size={11} fill="currentColor" />
                  <span className="text-white/60">{creator.rating}</span>
                </div>
                <span className="text-white/30">{creator.followers} followers</span>
                <span className="text-white/30">🎭 {creator.personaCount} personas</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-auto pt-1">
                <Link
                  href={`/creator/${creator.slug}`}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                  <MessageSquare size={12} /> View
                </Link>
                <button
                  onClick={() => toggleFollow(creator.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
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

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-white/30 text-sm">No creators found matching your search.</p>
          </div>
        )}

        {/* Credits nudge */}
        <div
          className="mt-8 p-5 rounded-2xl border border-[#6b7ff0]/20 flex flex-col sm:flex-row sm:items-center gap-4"
          style={{ background: 'linear-gradient(135deg, rgba(107,127,240,0.08) 0%, rgba(124,58,237,0.05) 100%)' }}
        >
          <div className="flex-1">
            <p className="text-sm font-bold text-white">Chat with any creator persona, anytime</p>
            <p className="text-xs text-white/40 mt-0.5">Buy credits to unlock unlimited chats across all domains — no subscription needed.</p>
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
