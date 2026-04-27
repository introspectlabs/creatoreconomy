'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Star, MessageSquare, CreditCard, Heart } from 'lucide-react';
import AudienceLayout from '@/components/AudienceLayout';

interface Persona {
  id: string;
  name: string;
  creator: string;
  category: string;
  emoji: string;
  slug: string;
  description: string;
  followers: string;
  isFollowing: boolean;
  isNew?: boolean;
  rating: number;
}

const ALL_PERSONAS: Persona[] = [
  { id: '1', name: 'Aria Sales', creator: 'PersonaMatrix', category: 'Sales', emoji: '🤝', slug: 'aria-sales', description: 'Outbound sales assistant for SaaS leads — qualifies prospects and books demos.', followers: '28.4k', isFollowing: true, rating: 4.9 },
  { id: '2', name: 'Support Bot v2', creator: 'PersonaMatrix', category: 'Support', emoji: '🛠️', slug: 'support-bot-v2', description: 'Handles tier-1 support tickets, FAQ resolution, and escalation routing.', followers: '94.1k', isFollowing: false, rating: 4.8 },
  { id: '3', name: 'Maya HR', creator: 'PersonaMatrix', category: 'HR', emoji: '👩‍💼', slug: 'maya-hr', description: 'Internal HR assistant for policy Q&A, onboarding, and leave management.', followers: '7.8k', isFollowing: true, rating: 4.7 },
  { id: '4', name: 'Kai Voice Agent', creator: 'PersonaMatrix', category: 'Voice', emoji: '🎙️', slug: 'kai-voice-agent', description: 'Voice AI IVR replacement with natural language understanding.', followers: '15.6k', isFollowing: false, rating: 4.8 },
  { id: '5', name: 'Demo Concierge', creator: 'PersonaMatrix', category: 'Onboarding', emoji: '🎯', slug: 'demo-concierge', description: 'Product tour guide for new trial users — walks through key features interactively.', followers: '4.3k', isFollowing: false, isNew: true, rating: 4.6 },
  { id: '6', name: 'Zara Retail', creator: 'PersonaMatrix', category: 'Retail', emoji: '🛍️', slug: 'zara-retail', description: 'E-commerce shopping assistant with product discovery and order tracking.', followers: '41.2k', isFollowing: true, rating: 4.9 },
  { id: '7', name: 'Nova Customer Success', creator: 'PersonaMatrix', category: 'Success', emoji: '🌟', slug: 'nova-customer-success', description: 'Proactive success outreach — NPS follow-ups, renewal reminders, upsell conversations.', followers: '18.9k', isFollowing: false, isNew: true, rating: 4.8 },
  { id: '8', name: 'Multilingual Welcome', creator: 'PersonaMatrix', category: 'Onboarding', emoji: '🌍', slug: 'multilingual-welcome', description: 'First-touch multilingual greeter for global product onboarding flows.', followers: '11.4k', isFollowing: false, rating: 4.7 },
];

const CATEGORIES = ['All', 'Sales', 'Support', 'HR', 'Voice', 'Onboarding', 'Retail', 'Success'];

export default function AudienceDiscoverPage() {
  const [personas, setPersonas] = useState(ALL_PERSONAS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const toggleFollow = (id: string) => {
    setPersonas((prev) => prev.map((p) => (p.id === id ? { ...p, isFollowing: !p.isFollowing } : p)));
  };

  const filtered = personas.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.creator.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <AudienceLayout topbarTitle="Discover" topbarIcon={Compass}>
      <div className="px-4 sm:px-6 py-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">Discover Creators</h2>
          <p className="text-white/55 text-sm mt-1">Find and follow AI personas that match your interests</p>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search creators or personas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#6b7ff0]/50 transition-all"
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                activeCategory === cat
                  ? 'bg-[#5a6ee0] text-white'
                  : 'bg-white/5 text-white/55 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((persona) => (
            <div key={persona.id} className="relative flex flex-col gap-3 p-5 rounded-2xl border border-white/10 bg-white/4 hover:bg-white/6 transition-all duration-150">
              {persona.isNew && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#7c3aed]/20 text-[#a78bfa] border border-[#7c3aed]/30">NEW</span>
              )}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#6b7ff0]/10 flex items-center justify-center text-2xl flex-shrink-0">{persona.emoji}</div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">{persona.name}</p>
                  <p className="text-xs text-white/40 truncate">by {persona.creator}</p>
                </div>
              </div>
              <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{persona.description}</p>
              <div className="flex items-center gap-1 text-amber-400">
                <Star size={11} fill="currentColor" />
                <span className="text-[11px] font-semibold text-white/60">{persona.rating}</span>
                <span className="text-[11px] text-white/30 ml-1">{persona.followers} followers</span>
              </div>
              <div className="flex items-center gap-2 mt-auto pt-1">
                <Link href={`/chat/${persona.slug}`} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all">
                  <MessageSquare size={12} /> Chat
                </Link>
                <button
                  onClick={() => toggleFollow(persona.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
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

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-white/30 text-sm">No creators found matching your search.</p>
          </div>
        )}

        {/* Credits nudge */}
        <div className="mt-8 p-5 rounded-2xl border border-[#6b7ff0]/20 flex flex-col sm:flex-row sm:items-center gap-4" style={{ background: 'linear-gradient(135deg, rgba(107,127,240,0.08) 0%, rgba(124,58,237,0.05) 100%)' }}>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">Chat with any creator, anytime</p>
            <p className="text-xs text-white/40 mt-0.5">Buy credits to unlock unlimited chats — no subscription needed.</p>
          </div>
          <Link href="/audience-credits" className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #6b7ff0 0%, #7c3aed 100%)' }}>
            <CreditCard size={13} /> Buy Credits
          </Link>
        </div>
      </div>
    </AudienceLayout>
  );
}
