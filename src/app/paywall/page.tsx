'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/public/PublicHeader';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    period: 'forever',
    color: '#38bdf8',
    highlight: false,
    badge: null,
    features: [
      '3 AI Personas',
      '200 conversational minutes/mo',
      '500 MB knowledge storage',
      'Web Chat channel',
      'Community support',
    ],
    cta: 'Start free',
    ctaHref: '/register',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 79,
    period: '/mo',
    color: '#a78bfa',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'Unlimited personas',
      '2,000 conversational minutes/mo',
      '10 GB knowledge storage',
      'All channels: Chat, WhatsApp, Voice, API',
      'Embeddable widgets',
      'Priority support',
    ],
    cta: 'Start 14-day trial',
    ctaHref: '/register',
  },
  {
    id: 'scale',
    name: 'Scale',
    price: 249,
    period: '/mo',
    color: '#34d399',
    highlight: false,
    badge: null,
    features: [
      'Everything in Growth',
      '10,000 conversational minutes/mo',
      '100 GB knowledge storage',
      'AI Video Avatars',
      'RBAC & audit logs',
      'SLA + dedicated support',
    ],
    cta: 'Start 14-day trial',
    ctaHref: '/register',
  },
];

const CREDIT_PACKS = [
  { minutes: 500, price: 4, label: '500 min', popular: false },
  { minutes: 2000, price: 14, label: '2,000 min', popular: true },
  { minutes: 5000, price: 29, label: '5,000 min', popular: false },
  { minutes: 15000, price: 79, label: '15,000 min', popular: false },
];

export default function PaywallPage() {
  const [tab, setTab] = useState<'plans' | 'credits'>('plans');
  const [selectedPack, setSelectedPack] = useState(1);

  return (
    <div className="min-h-screen bg-[#080a10] text-white">
      <PublicHeader />
      {/* Hero */}
      <section className="relative pt-28 sm:pt-36 pb-10 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-[#7c3aed]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[300px] bg-[#38bdf8]/6 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10 text-center">
          {/* Lock icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 border border-[#7c3aed]/30" style={{ background: 'rgba(124,58,237,0.12)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            You've reached the{' '}
            <span className="bg-gradient-to-r from-[#a78bfa] via-[#38bdf8] to-[#34d399] bg-clip-text text-transparent">
              free limit
            </span>
          </h1>
          <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto mb-8 leading-relaxed">
            You've used all 5 free messages. Unlock unlimited conversations, more personas, and full channel access.
          </p>

          {/* Tab switcher */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl border border-white/8 bg-white/4 mb-10">
            <button
              onClick={() => setTab('plans')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                tab === 'plans' ? 'bg-[#7c3aed] text-white shadow-[0_0_16px_rgba(124,58,237,0.4)]' : 'text-white/40 hover:text-white'
              }`}
            >
              Subscription Plans
            </button>
            <button
              onClick={() => setTab('credits')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                tab === 'credits' ? 'bg-[#7c3aed] text-white shadow-[0_0_16px_rgba(124,58,237,0.4)]' : 'text-white/40 hover:text-white'
              }`}
            >
              Buy Credits
            </button>
          </div>
        </div>
      </section>
      {/* Plans tab */}
      {tab === 'plans' && (
        <section className="pb-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PLANS?.map((plan) => (
                <div
                  key={plan?.id}
                  className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-200 ${
                    plan?.highlight
                      ? 'border-[#7c3aed]/50 shadow-[0_0_60px_rgba(124,58,237,0.18)]'
                      : 'border-white/8 hover:border-white/16'
                  }`}
                  style={{
                    background: plan?.highlight
                      ? 'linear-gradient(160deg, rgba(124,58,237,0.12) 0%, rgba(59,130,246,0.06) 100%)'
                      : 'rgba(255,255,255,0.02)',
                  }}
                >
                  {plan?.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#38bdf8] text-[11px] font-bold text-white shadow-[0_0_16px_rgba(124,58,237,0.5)] whitespace-nowrap">
                      {plan?.badge}
                    </div>
                  )}

                  <div className="mb-5">
                    <div className="w-6 h-0.5 rounded-full mb-3" style={{ background: plan?.color }} />
                    <h3 className="text-lg font-bold text-white mb-1">{plan?.name}</h3>
                  </div>

                  <div className="mb-6">
                    {plan?.price === 0 ? (
                      <span className="text-4xl font-extrabold text-white">Free</span>
                    ) : (
                      <div className="flex items-end gap-1">
                        <span className="text-4xl font-extrabold text-white">${plan?.price}</span>
                        <span className="text-white/35 text-sm mb-1.5">{plan?.period}</span>
                      </div>
                    )}
                  </div>

                  <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                    {plan?.features?.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/65">
                        <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={plan?.color} strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan?.ctaHref}
                    className={`w-full flex items-center justify-center py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 ${
                      plan?.highlight ? 'text-white shadow-[0_0_20px_rgba(124,58,237,0.35)]' : 'text-white border border-white/12 hover:bg-white/5'
                    }`}
                    style={plan?.highlight ? { background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' } : {}}
                  >
                    {plan?.cta}
                  </Link>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-white/25 mt-8">
              No credit card required for free plan · Cancel anytime · 14-day money-back guarantee
            </p>
          </div>
        </section>
      )}
      {/* Credits tab */}
      {tab === 'credits' && (
        <section className="pb-24 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-white/50 text-sm">Buy a one-time credit pack — no subscription needed. Credits never expire.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {CREDIT_PACKS?.map((pack, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPack(i)}
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-150 ${
                    selectedPack === i
                      ? 'border-[#7c3aed]/60 shadow-[0_0_24px_rgba(124,58,237,0.2)]'
                      : 'border-white/8 hover:border-white/16'
                  }`}
                  style={{
                    background: selectedPack === i ? 'rgba(124,58,237,0.1)' : 'rgba(255,255,255,0.02)',
                  }}
                >
                  {pack?.popular && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#7c3aed] text-[10px] font-bold text-white whitespace-nowrap">
                      Best value
                    </span>
                  )}
                  <span className="text-lg font-extrabold text-white">${pack?.price}</span>
                  <span className="text-xs text-white/50">{pack?.label}</span>
                  <span className="text-[10px] text-white/30">
                    ${(pack?.price / pack?.minutes * 1000)?.toFixed(1)}/1k min
                  </span>
                </button>
              ))}
            </div>

            {/* Selected pack summary */}
            <div
              className="rounded-2xl p-6 border border-white/8 mb-5"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-white">Order Summary</span>
                <span className="text-xs text-white/35">One-time purchase</span>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-white/8">
                <div>
                  <p className="text-sm text-white">{CREDIT_PACKS?.[selectedPack]?.label} Credit Pack</p>
                  <p className="text-xs text-white/40 mt-0.5">Conversational minutes · Never expire</p>
                </div>
                <span className="text-lg font-bold text-white">${CREDIT_PACKS?.[selectedPack]?.price}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-white/8">
                <span className="text-sm text-white/60">Total</span>
                <span className="text-xl font-extrabold text-white">${CREDIT_PACKS?.[selectedPack]?.price}</span>
              </div>
            </div>

            <Link
              href="/register"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shadow-[0_0_24px_rgba(124,58,237,0.35)]"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
            >
              Sign up to purchase
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-center text-xs text-white/25 mt-3">Create a free account first, then complete your purchase</p>
          </div>
        </section>
      )}
    </div>
  );
}
