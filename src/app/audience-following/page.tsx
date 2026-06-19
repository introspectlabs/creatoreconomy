'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, MessageSquare, Star, CreditCard, Zap } from 'lucide-react';
import AudienceLayout from '@/components/AudienceLayout';

type Domain = 'Finance' | 'Education' | 'Coaching';

interface FollowedCreator {
  id: string;
  name: string;
  slug: string;
  handle: string;
  domains: Domain[];
  emoji: string;
  tagline: string;
  followers: string;
  rating: number;
  personaCount: number;
  personaLabels: string[];
  lastActive: string;
  newContent: boolean;
}

const domainMeta: Record<Domain, { icon: string; color: string; bg: string }> = {
  Finance: { icon: '📈', color: '#0ea5e9', bg: 'rgba(14,165,233,0.12)' },
  Education: { icon: '🎓', color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
  Coaching: { icon: '🧭', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
};

const FOLLOWED_CREATORS: FollowedCreator[] = [
  {
    id: '1',
    name: 'Marcus Wealth',
    slug: 'marcus-wealth',
    handle: '@marcuswealth',
    domains: ['Finance', 'Coaching'],
    emoji: '💰',
    tagline: 'Personal finance meets high-performance habits',
    followers: '284K',
    rating: 4.9,
    personaCount: 4,
    personaLabels: ['Wealth Advisor', 'FIRE Coach', 'Tax Strategist', 'Mindset Mentor'],
    lastActive: '2h ago',
    newContent: true,
  },
  {
    id: '2',
    name: 'Leila Learns',
    slug: 'leila-learns',
    handle: '@leilalearns',
    domains: ['Education', 'Coaching'],
    emoji: '🎨',
    tagline: 'UX design courses + career coaching that get you hired',
    followers: '67K',
    rating: 4.8,
    personaCount: 2,
    personaLabels: ['UX Educator', 'Career Coach'],
    lastActive: '5 min ago',
    newContent: false,
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
    rating: 4.9,
    personaCount: 3,
    personaLabels: ['Leadership Coach', 'Communication Trainer', 'Comp & Equity Advisor'],
    lastActive: '1h ago',
    newContent: true,
  },
];

export default function AudienceFollowingPage() {
  const [creators, setCreators] = useState(FOLLOWED_CREATORS);

  const unfollow = (id: string) => {
    setCreators((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <AudienceLayout topbarTitle="Following" topbarIcon={Heart}>
      <div className="px-4 sm:px-6 py-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Creators You Follow</h2>
            <p className="text-white/50 text-sm mt-1">Stay connected with your favourite multi-domain creators</p>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-[#6b7ff0]/10 border border-[#6b7ff0]/20 text-xs font-bold text-[#6b7ff0]">
            {creators.length} Following
          </span>
        </div>

        {creators.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
              <Heart size={28} className="text-white/20" />
            </div>
            <p className="text-white/40 text-sm">You&apos;re not following anyone yet.</p>
            <Link
              href="/audience-discover"
              className="mt-4 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #6b7ff0 0%, #7c3aed 100%)' }}
            >
              Discover Creators
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {creators.map((creator) => (
              <div
                key={creator.id}
                className="relative flex flex-col gap-3 p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-150"
              >
                {creator.newContent && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#6b7ff0]/20 text-[#a5b4fc] border border-[#6b7ff0]/30">
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

                <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{creator.tagline}</p>

                {/* Persona preview */}
                <div className="flex flex-wrap gap-1">
                  {creator.personaLabels.slice(0, 2).map((label) => (
                    <span key={label} className="px-2 py-0.5 rounded-md text-[10px] text-white/45 bg-white/5 border border-white/8">
                      🎭 {label}
                    </span>
                  ))}
                  {creator.personaLabels.length > 2 && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] text-white/30 bg-white/5 border border-white/8">
                      +{creator.personaLabels.length - 2} more
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-2 text-[11px] text-white/30">
                  <Star size={11} fill="#f59e0b" className="text-amber-400" />
                  <span className="text-white/50">{creator.rating}</span>
                  <span>·</span>
                  <span>{creator.followers} followers</span>
                  <span>·</span>
                  <span>🎭 {creator.personaCount} personas</span>
                  <span>·</span>
                  <span>Active {creator.lastActive}</span>
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
                    onClick={() => unfollow(creator.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#6b7ff0]/15 text-[#6b7ff0] border border-[#6b7ff0]/30 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all"
                  >
                    <Heart size={12} fill="currentColor" /> Following
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upgrade nudge */}
        <div
          className="mt-8 p-5 rounded-2xl border border-[#6b7ff0]/20 flex flex-col sm:flex-row sm:items-center gap-4"
          style={{ background: 'linear-gradient(135deg, rgba(107,127,240,0.08) 0%, rgba(124,58,237,0.05) 100%)' }}
        >
          <div className="flex items-center gap-3 flex-1">
            <Zap size={18} className="text-[#6b7ff0] flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">Get more from your creators</p>
              <p className="text-xs text-white/40">Buy credits to chat with all personas across every domain — no limits.</p>
            </div>
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
