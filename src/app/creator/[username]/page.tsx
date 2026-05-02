'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { personas } from '@/app/persona-library/components/personaData';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

// ─── Mock Creator Data ─────────────────────────────────────────────────────────
const CREATOR_DATA = {
  username: 'personamatrix',
  displayName: 'PersonaMatrix Labs',
  tagline: 'Building AI personas that actually understand your business',
  bio: `We're a team of AI engineers and product designers obsessed with making AI conversations feel genuinely human. Since 2024, we've trained over 50 specialized AI personas across creator economy, OTT engagement, sales, support, and HR — each grounded in real domain knowledge, not generic prompts.

Our personas are used by 200+ companies worldwide to handle millions of conversations monthly. Every persona we build goes through rigorous knowledge curation, voice calibration, and real-world testing before going live.`,
  location: 'San Francisco, CA',
  website: 'https://personamatrix.ai',
  joinedDate: 'January 2024',
  verified: true,
  avatar: 'PM',
  coverGradient: 'linear-gradient(135deg, #1a0533 0%, #0f1a3a 50%, #0a1628 100%)',
  domains: ['Finance', 'Education', 'Coaching'] as const,
  personaLabels: ['Wealth Advisor', 'FIRE Coach', 'Tax Strategist', 'SaaS Educator', 'Leadership Coach', 'Mindset Mentor', 'UX Educator', 'Career Coach', 'Options Trader', 'Finance Educator', 'Performance Coach', 'Deep Work Advisor'],
  stats: {
    totalPersonas: 12,
    totalConversations: '240K+',
    avgRating: 4.8,
    totalFollowers: '18.4K',
    responseRate: '99.2%',
    avgResponseTime: '< 2s',
  },
  expertise: [
    'Enterprise Sales Automation',
    'Customer Support AI',
    'HR & People Operations',
    'Financial Services',
    'E-commerce & Retail',
    'Voice AI & IVR',
    'Multilingual Deployments',
    'SaaS Onboarding',
  ],
  knowledgeSources: [
    { label: 'Proprietary Training Data', count: '2.4M', icon: '🧠', desc: 'Curated domain-specific datasets' },
    { label: 'Knowledge Base Chunks', count: '68K+', icon: '📚', desc: 'Structured Q&A and documentation' },
    { label: 'Real Conversations Trained', count: '1.2M', icon: '💬', desc: 'Refined from live interactions' },
    { label: 'Languages Supported', count: '14', icon: '🌐', desc: 'Including EN, ES, FR, DE, JA, AR, HI' },
  ],
  trustSignals: [
    { label: 'Identity Verified', detail: 'Government ID + business registration confirmed', icon: '✓' },
    { label: 'SOC 2 Type II Compliant', detail: 'Annual third-party security audit', icon: '🔒' },
    { label: 'GDPR & CCPA Ready', detail: 'Data processing agreements available', icon: '🛡️' },
    { label: 'Uptime SLA 99.9%', detail: 'Monitored 24/7 with incident response', icon: '⚡' },
  ],
  socialProof: [
    {
      quote: 'Aria Sales booked 3x more demos in the first month than our entire SDR team combined.',
      author: 'Sarah Chen',
      role: 'VP of Sales',
      company: 'Nexus SaaS',
      rating: 5,
    },
    {
      quote: 'Support Bot v2 handles 80% of our tier-1 tickets autonomously. Our team now focuses on what actually matters.',
      author: 'Marcus Webb',
      role: 'Head of Customer Success',
      company: 'CloudOps Inc.',
      rating: 5,
    },
    {
      quote: 'Maya HR answered 200 employee questions in the first week. Onboarding time dropped by 40%.',
      author: 'Priya Nair',
      role: 'Chief People Officer',
      company: 'Meridian Group',
      rating: 5,
    },
  ],
  certifications: [
    { name: 'OpenAI Partner', year: '2024' },
    { name: 'ElevenLabs Certified', year: '2024' },
    { name: 'AWS Advanced Partner', year: '2025' },
    { name: 'ISO 27001', year: '2025' },
  ],
};

type Domain = 'Finance' | 'Education' | 'Coaching';

const domainMeta: Record<Domain, { icon: string; color: string; bg: string }> = {
  Finance: { icon: '📈', color: '#0ea5e9', bg: 'rgba(14,165,233,0.12)' },
  Education: { icon: '🎓', color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
  Coaching: { icon: '🧭', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
};

const statusColors: Record<string, string> = {
  active: '#14b8a6',
  training: '#f59e0b',
  draft: '#6b7280',
  paused: '#ef4444',
  archived: '#6b7280',
};

type TabType = 'overview' | 'personas' | 'reviews';

export default function CreatorProfilePage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const creator = CREATOR_DATA;
  const activePersonas = personas.filter((p) => p.status === 'active');
  const filteredPersonas = activePersonas;
  const firstActivePersona = activePersonas[0];

  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'personas', label: 'Personas', count: activePersonas.length },
    { id: 'reviews', label: 'Reviews', count: creator.socialProof.length },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#080a10' }}>
      <PublicHeader />

      {/* Cover + Profile Header */}
      <div className="pt-16">
        {/* Cover */}
        <div
          className="h-52 sm:h-64 relative overflow-hidden"
          style={{ background: creator.coverGradient }}
        >
          {/* Animated grid overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          {/* Glow orbs */}
          <div
            className="absolute top-8 left-1/4 w-64 h-64 rounded-full opacity-30 blur-3xl"
            style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
          />
          <div
            className="absolute bottom-0 right-1/3 w-48 h-48 rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }}
          />
          {/* Verified badge top-right */}
          {creator.verified && (
            <div
              className="absolute top-4 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(20,184,166,0.15)',
                border: '1px solid rgba(20,184,166,0.4)',
                color: '#14b8a6',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Verified Creator
            </div>
          )}
        </div>

        {/* Profile info row */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-14 mb-6">
            {/* Avatar */}
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center text-white text-2xl font-black flex-shrink-0 relative z-10 border-4 border-[#080a10]"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
                boxShadow: '0 0 40px rgba(124,58,237,0.5)',
              }}
            >
              {creator.avatar}
            </div>

            {/* Name + meta */}
            <div className="flex-1 pb-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{creator.displayName}</h1>
                {creator.verified && (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-white/50 text-sm mb-2">@{creator.username}</p>
              <p className="text-white/70 text-sm max-w-lg">{creator.tagline}</p>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3 pb-1">
              <button
                className="px-4 py-2 rounded-xl text-sm font-medium border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all"
              >
                Follow
              </button>
              {firstActivePersona ? (
                <Link
                  href={`/creator/${params?.username || 'personamatrix'}/persona/${firstActivePersona.slug}`}
                  className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
                >
                  Chat Now
                </Link>
              ) : (
                <button
                  disabled
                  className="px-5 py-2 rounded-xl text-sm font-semibold text-white/30 cursor-not-allowed"
                  style={{ background: 'rgba(124,58,237,0.2)' }}
                >
                  No Active Personas
                </button>
              )}
            </div>
          </div>

          {/* Quick stats strip */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden mb-6"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {[
              { label: 'Personas', value: creator.stats.totalPersonas },
              { label: 'Conversations', value: creator.stats.totalConversations },
              { label: 'Avg Rating', value: `${creator.stats.avgRating}★` },
              { label: 'Followers', value: creator.stats.totalFollowers },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center py-4 px-2"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <span className="text-lg font-bold text-white">{stat.value}</span>
                <span className="text-[10px] text-white/35 uppercase tracking-wider mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Domain tags + multi-domain callout */}
          <div className="mb-6 flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {creator.domains.map((d) => (
                <span
                  key={d}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: domainMeta[d].bg, color: domainMeta[d].color, border: `1px solid ${domainMeta[d].color}30` }}
                >
                  {domainMeta[d].icon} {d}
                </span>
              ))}
              {creator.domains.length > 1 && (
                <span className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 text-white/50 border border-white/10">
                  🎭 multi-domain creator
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-white/[0.02]">
              <span className="text-base">🎭</span>
              <p className="text-xs text-white/45 leading-relaxed">
                <span className="text-white/70 font-medium">This creator spans multiple domains.</span>{' '}
                Each persona covers a different area of expertise — finance, education, coaching, and more — so you get the full picture.
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-white/8 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-all -mb-px ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-white' :'border-transparent text-white/40 hover:text-white/70'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    className="px-1.5 py-0.5 rounded-md text-[10px] font-semibold"
                    style={{
                      background: activeTab === tab.id ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.06)',
                      color: activeTab === tab.id ? '#a78bfa' : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto px-6 pb-20 w-full">

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: About + Expertise */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* About Me */}
              <div
                className="rounded-2xl p-6"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full" style={{ background: 'linear-gradient(#7c3aed, #3b82f6)' }} />
                  About
                </h2>
                <div className="space-y-3">
                  {creator.bio.split('\n\n').map((para, i) => (
                    <p key={i} className="text-sm text-white/60 leading-relaxed">{para}</p>
                  ))}
                </div>

                {/* Meta info */}
                <div className="flex flex-wrap gap-4 mt-5 pt-5 border-t border-white/6">
                  <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {creator.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    {creator.website}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Joined {creator.joinedDate}
                  </div>
                </div>
              </div>

              {/* Expertise Tags */}
              <div
                className="rounded-2xl p-6"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full" style={{ background: 'linear-gradient(#7c3aed, #3b82f6)' }} />
                  Areas of Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {creator.expertise.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{
                        background: 'rgba(124,58,237,0.12)',
                        border: '1px solid rgba(124,58,237,0.25)',
                        color: '#c4b5fd',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Featured Testimonial */}
              <div
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(59,130,246,0.08) 100%)',
                  border: '1px solid rgba(124,58,237,0.2)',
                }}
              >
                <div
                  className="absolute top-4 right-6 text-6xl font-serif leading-none opacity-10"
                  style={{ color: '#7c3aed' }}
                >
                  "
                </div>
                <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full" style={{ background: 'linear-gradient(#7c3aed, #3b82f6)' }} />
                  What Audiences Say
                </h2>
                <div className="space-y-4">
                  {creator.socialProof.slice(0, 2).map((review, i) => (
                    <div key={i} className="flex gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
                      >
                        {review.author.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          {Array.from({ length: review.rating }).map((_, j) => (
                            <svg key={j} width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-sm text-white/65 leading-relaxed italic">"{review.quote}"</p>
                        <p className="text-xs text-white/35 mt-1.5">{review.author} · {review.role}, {review.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="mt-4 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                >
                  View all reviews →
                </button>
              </div>
            </div>

            {/* Right: Trust + Quick Personas */}
            <div className="flex flex-col gap-6">

              {/* Trust Signals */}
              <div
                className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-3.5 rounded-full" style={{ background: 'linear-gradient(#14b8a6, #3b82f6)' }} />
                  Trust & Safety
                </h3>
                <div className="space-y-3">
                  {creator.trustSignals.slice(0, 1).map((signal, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 mt-0.5"
                        style={{ background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.25)' }}
                      >
                        {signal.icon}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white/80">{signal.label}</p>
                        <p className="text-[11px] text-white/35 mt-0.5 leading-relaxed">{signal.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Personas Quick View */}
              <div
                className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <span className="w-1 h-3.5 rounded-full" style={{ background: 'linear-gradient(#7c3aed, #3b82f6)' }} />
                    Active Personas
                  </h3>
                  <button
                    onClick={() => setActiveTab('personas')}
                    className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    View all
                  </button>
                </div>
                <div className="space-y-2.5">
                  {activePersonas.slice(0, 4).map((p) => (
                    <Link
                      key={p.id}
                      href={`/creator/${params?.username || 'personamatrix'}/persona/${p.slug}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl transition-all hover:bg-white/5 group"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
                      >
                        {p.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white/80 truncate group-hover:text-white transition-colors">{p.name}</p>
                        <p className="text-[10px] text-white/35 truncate">{p.description.slice(0, 40)}…</p>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── PERSONAS TAB ── */}
        {activeTab === 'personas' && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPersonas.map((persona) => {
                const isActive = persona.status === 'active';
                return (
                  <div
                    key={persona.id}
                    className="rounded-2xl p-5 flex flex-col gap-4 transition-all duration-200 hover:border-white/20"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                          boxShadow: isActive ? '0 0 16px rgba(124,58,237,0.35)' : 'none',
                        }}
                      >
                        {persona.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-white truncate mb-1">{persona.name}</h3>
                        <p className="text-xs text-white/40 line-clamp-3 leading-relaxed">{persona.description}</p>
                      </div>
                    </div>

                    {isActive ? (
                      <Link
                        href={`/creator/${params?.username || 'personamatrix'}/persona/${persona.slug}`}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        Start Chat
                      </Link>
                    ) : (
                      <div className="w-full flex items-center justify-center py-2.5 rounded-xl text-sm text-white/25 bg-white/4 border border-white/8 cursor-not-allowed">
                        Unavailable
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── REVIEWS TAB ── */}
        {activeTab === 'reviews' && (
          <div className="flex flex-col gap-6">
            {/* Rating summary */}
            <div
              className="rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-8"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="text-center flex-shrink-0">
                <p className="text-6xl font-black text-white">{creator.stats.avgRating}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < Math.floor(creator.stats.avgRating) ? '#f59e0b' : 'rgba(255,255,255,0.15)'} stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-white/35 mt-1">out of 5</p>
              </div>
              <div className="flex-1 w-full space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const pct = star === 5 ? 78 : star === 4 ? 16 : star === 3 ? 4 : star === 2 ? 1 : 1;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-xs text-white/40 w-4 text-right">{star}</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#f59e0b' }} />
                      </div>
                      <span className="text-xs text-white/30 w-8">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Review cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {creator.socialProof.map((review, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 flex flex-col gap-4"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-white/65 leading-relaxed flex-1 italic">"{review.quote}"</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-white/6">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
                    >
                      {review.author.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white/80">{review.author}</p>
                      <p className="text-[11px] text-white/35">{review.role} · {review.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA to chat */}
            <div
              className="rounded-2xl p-8 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(59,130,246,0.10) 100%)',
                border: '1px solid rgba(124,58,237,0.2)',
              }}
            >
              <p className="text-lg font-bold text-white mb-2">Ready to experience it yourself?</p>
              <p className="text-sm text-white/50 mb-5">Start a free conversation with any persona — no sign-up required.</p>
              <button
                onClick={() => setActiveTab('personas')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
              >
                Browse All Personas
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <PublicFooter />
    </div>
  );
}
