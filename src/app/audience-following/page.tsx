'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, MessageSquare, Star, CreditCard, Zap } from 'lucide-react';
import AudienceLayout from '@/components/AudienceLayout';

interface FollowedPersona {
  id: string;
  name: string;
  creator: string;
  category: string;
  emoji: string;
  slug: string;
  description: string;
  followers: string;
  rating: number;
  lastActive: string;
  newContent: boolean;
}

const FOLLOWED_PERSONAS: FollowedPersona[] = [
  { id: '1', name: 'Aria Sales', creator: 'PersonaMatrix', category: 'Sales', emoji: '🤝', slug: 'aria-sales', description: 'Outbound sales assistant for SaaS leads — qualifies prospects and books demos.', followers: '28.4k', rating: 4.9, lastActive: '2h ago', newContent: true },
  { id: '2', name: 'Zara Retail', creator: 'PersonaMatrix', category: 'Retail', emoji: '🛍️', slug: 'zara-retail', description: 'E-commerce shopping assistant with product discovery and order tracking.', followers: '41.2k', rating: 4.9, lastActive: '5 min ago', newContent: false },
  { id: '3', name: 'Maya HR', creator: 'PersonaMatrix', category: 'HR', emoji: '👩‍💼', slug: 'maya-hr', description: 'Internal HR assistant for policy Q&A, onboarding, and leave management.', followers: '7.8k', rating: 4.7, lastActive: '1h ago', newContent: true },
];

export default function AudienceFollowingPage() {
  const [personas, setPersonas] = useState(FOLLOWED_PERSONAS);

  const unfollow = (id: string) => {
    setPersonas((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <AudienceLayout topbarTitle="Following" topbarIcon={Heart}>
      <div className="px-4 sm:px-6 py-6 max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Creators You Follow</h2>
            <p className="text-white/55 text-sm mt-1">Stay connected with your favourite personas</p>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-[#6b7ff0]/10 border border-[#6b7ff0]/20 text-xs font-bold text-[#6b7ff0]">
            {personas.length} Following
          </span>
        </div>

        {personas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
              <Heart size={28} className="text-white/20" />
            </div>
            <p className="text-white/40 text-sm">You&apos;re not following anyone yet.</p>
            <Link href="/audience-discover" className="mt-4 px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #6b7ff0 0%, #7c3aed 100%)' }}>
              Discover Creators
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {personas.map((persona) => (
              <div key={persona.id} className="relative flex flex-col gap-3 p-5 rounded-2xl border border-white/10 bg-white/4 hover:bg-white/6 transition-all duration-150">
                {persona.newContent && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#6b7ff0]/20 text-[#a5b4fc] border border-[#6b7ff0]/30">NEW</span>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#6b7ff0]/10 flex items-center justify-center text-2xl flex-shrink-0">{persona.emoji}</div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">{persona.name}</p>
                    <p className="text-xs text-white/40 truncate">by {persona.creator}</p>
                  </div>
                </div>
                <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{persona.description}</p>
                <div className="flex items-center gap-2 text-[11px] text-white/30">
                  <Star size={11} fill="#f59e0b" className="text-amber-400" />
                  <span className="text-white/50">{persona.rating}</span>
                  <span>·</span>
                  <span>{persona.followers} followers</span>
                  <span>·</span>
                  <span>Active {persona.lastActive}</span>
                </div>
                <div className="flex items-center gap-2 mt-auto pt-1">
                  <Link href={`/chat/${persona.slug}`} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all">
                    <MessageSquare size={12} /> Chat
                  </Link>
                  <button
                    onClick={() => unfollow(persona.id)}
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
        <div className="mt-8 p-5 rounded-2xl border border-[#6b7ff0]/20 flex flex-col sm:flex-row sm:items-center gap-4" style={{ background: 'linear-gradient(135deg, rgba(107,127,240,0.08) 0%, rgba(124,58,237,0.05) 100%)' }}>
          <div className="flex items-center gap-3 flex-1">
            <Zap size={18} className="text-[#6b7ff0] flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">Get more from your creators</p>
              <p className="text-xs text-white/40">Buy credits to chat with all your followed personas without limits.</p>
            </div>
          </div>
          <Link href="/audience-credits" className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #6b7ff0 0%, #7c3aed 100%)' }}>
            <CreditCard size={13} /> Buy Credits
          </Link>
        </div>
      </div>
    </AudienceLayout>
  );
}
