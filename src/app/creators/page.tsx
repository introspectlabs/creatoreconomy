'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { personas, Persona } from '@/app/persona-library/components/personaData';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

const statusColors: Record<string, string> = {
  active: '#14b8a6',
  training: '#f59e0b',
  draft: '#6b7280',
  paused: '#ef4444',
  archived: '#6b7280',
};

const categoryFilters = ['All', 'Sales', 'Support', 'HR', 'Creator', 'OTT', 'Retail', 'Voice'];

function matchesCategory(persona: Persona, category: string): boolean {
  if (category === 'All') return true;
  const combined = `${persona.name} ${persona.description}`.toLowerCase();
  return combined.includes(category.toLowerCase());
}

export default function CreatorsDirectoryPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = personas.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && matchesCategory(p, activeCategory);
  });

  const activeCount = personas.filter((p) => p.status === 'active').length;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(135deg, #0a0c12 0%, #0f1120 100%)' }}
    >
      <PublicHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
            <span className="text-xs font-medium text-white/60">{activeCount} Creators Online</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Creators{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
            >
              Directory
            </span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Browse AI personas from creators and experts. Click any card to start a live conversation instantly — no sign-up required.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="px-6 pb-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search */}
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
              placeholder="Search creators..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'text-white border border-purple-500/50' :'text-white/40 border border-white/8 hover:text-white/70 hover:border-white/20'
                }`}
                style={
                  activeCategory === cat
                    ? { background: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(59,130,246,0.15))' }
                    : {}
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Creators Grid */}
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
              {filtered.map((persona) => (
                <CreatorCard key={persona.id} persona={persona} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl border border-white/10 p-8 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(59,130,246,0.10) 100%)',
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-2">Are you a creator?</h2>
            <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
              Build your own AI persona, share a link with your fans, and let them chat with you 24/7 — no website needed.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
            >
              Create Your Persona Free
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

function CreatorCard({ persona }: { persona: Persona }) {
  const statusColor = statusColors[persona.status] || '#6b7280';
  const isActive = persona.status === 'active';

  return (
    <div
      className="group relative rounded-2xl border border-white/8 p-5 flex flex-col gap-4 transition-all duration-200 hover:border-white/20 hover:shadow-[0_0_32px_rgba(124,58,237,0.12)]"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      {/* Top row */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
            boxShadow: isActive ? '0 0 18px rgba(124,58,237,0.3)' : 'none',
          }}
        >
          {persona.avatar}
        </div>

        {/* Name + status */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-white truncate">{persona.name}</h3>
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
                style={{
                  background: statusColor,
                  boxShadow: isActive ? `0 0 4px ${statusColor}` : 'none',
                }}
              />
              {persona.status}
            </span>
          </div>
          <p className="text-xs text-white/40 mt-0.5 line-clamp-2 leading-relaxed">{persona.description}</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4">
        <div>
          <p className="text-[10px] text-white/25 uppercase tracking-wider">Messages</p>
          <p className="text-sm font-semibold text-white/70">
            {persona.messagesTotal > 0 ? persona.messagesTotal.toLocaleString() : '—'}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-white/25 uppercase tracking-wider">Language</p>
          <p className="text-sm font-semibold text-white/70 truncate max-w-[100px]">{persona.language}</p>
        </div>
        <div className="ml-auto flex flex-wrap gap-1 justify-end">
          {persona.channels.slice(0, 2).map((ch) => (
            <span
              key={ch}
              className="text-[10px] text-white/30 bg-white/5 border border-white/8 px-1.5 py-0.5 rounded-md"
            >
              {ch}
            </span>
          ))}
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
            href={`/chat/${persona.slug}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Chat
          </Link>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white/25 bg-white/4 border border-white/8 cursor-not-allowed">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {persona.status === 'training' ? 'Training...' : 'Unavailable'}
        </div>
      )}
    </div>
  );
}
