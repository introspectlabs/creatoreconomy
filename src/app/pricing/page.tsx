'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

const plans = [
  {
    name: 'Starter',
    badge: null,
    monthlyPrice: 0,
    yearlyPrice: 0,
    desc: 'Try AI brand assistance for your Shopify store or website — no credit card needed.',
    color: '#38bdf8',
    accentBg: 'from-[#38bdf8]/8 to-transparent',
    borderColor: 'border-white/8',
    storage: '500 MB',
    storageDesc: 'Ingested document storage',
    minutes: '200 min/mo',
    minutesDesc: 'Conversational minutes',
    channels: ['Web Chat'],
    personas: '3 personas',
    features: [
      'Web Chat channel',
      '3 AI brand assistants',
      '500 MB product knowledge ingestion',
      '200 conversational minutes',
      'PDF, DOCX, TXT support',
      'Community support',
    ],
    cta: 'Start free',
    ctaHref: '/register',
    popular: false,
  },
  {
    name: 'Growth',
    badge: 'Most Popular',
    monthlyPrice: 79,
    yearlyPrice: 63,
    desc: 'For D2C brands deploying AI across their Shopify store, website, and WhatsApp.',
    color: '#a78bfa',
    accentBg: 'from-[#7c3aed]/12 to-[#38bdf8]/5',
    borderColor: 'border-[#7c3aed]/40',
    storage: '10 GB',
    storageDesc: 'Ingested document storage',
    minutes: '2,000 min/mo',
    minutesDesc: 'Conversational minutes',
    channels: ['Chat', 'WhatsApp', 'Voice', 'API'],
    personas: 'Unlimited personas',
    features: [
      'All channels: Chat, WhatsApp, Voice, API',
      'Unlimited AI brand assistants',
      '10 GB product knowledge ingestion',
      '2,000 conversational minutes',
      'Video, audio, PDF, web scraping',
      'Embeddable JS widgets (Shopify-ready)',
      'Webhooks & streaming',
      'Priority email support',
    ],
    cta: 'Start Growth trial',
    ctaHref: '/register',
    popular: true,
  },
  {
    name: 'Scale',
    badge: null,
    monthlyPrice: 249,
    yearlyPrice: 199,
    desc: 'High-volume D2C brands with large catalogs and multi-channel customer support needs.',
    color: '#34d399',
    accentBg: 'from-[#34d399]/8 to-transparent',
    borderColor: 'border-white/8',
    storage: '100 GB',
    storageDesc: 'Ingested document storage',
    minutes: '10,000 min/mo',
    minutesDesc: 'Conversational minutes',
    channels: ['Chat', 'WhatsApp', 'Voice', 'Avatar Chat'],
    personas: 'Unlimited personas',
    features: [
      'All channels incl. Avatar Chat',
      'Unlimited AI brand assistants',
      '100 GB product knowledge ingestion',
      '10,000 conversational minutes',
      'AI Video Avatars (Tavus)',
      'Video generation pipeline',
      'RBAC & audit logs',
      'SSO / SAML',
      'SLA + dedicated support',
    ],
    cta: 'Start Scale trial',
    ctaHref: '/register',
    popular: false,
  },
  {
    name: 'Enterprise',
    badge: null,
    monthlyPrice: null,
    yearlyPrice: null,
    desc: 'Custom storage, minutes, and SLAs for large D2C brands and multi-brand organizations.',
    color: '#f59e0b',
    accentBg: 'from-[#f59e0b]/8 to-transparent',
    borderColor: 'border-white/8',
    storage: 'Unlimited',
    storageDesc: 'Custom ingestion limits',
    minutes: 'Unlimited',
    minutesDesc: 'Custom minute pools',
    channels: ['All channels', 'Custom'],
    personas: 'Unlimited personas',
    features: [
      'Everything in Scale',
      'Custom storage & minute pools',
      'Dedicated infrastructure',
      'Custom integrations & connectors',
      'White-label deployment',
      'On-premise / private cloud',
      'Named CSM + 24/7 support',
    ],
    cta: 'Contact sales',
    ctaHref: '/register',
    popular: false,
  },
];

const audiencePacks = [
  {
    name: 'Starter Pack',
    badge: null,
    chats: 10,
    price: 4.99,
    perChat: '$0.50',
    color: '#38bdf8',
    accentBg: 'from-[#38bdf8]/8 to-transparent',
    borderColor: 'border-white/8',
    desc: 'Try out a few AI personas before committing.',
    features: [
      '10 persona chat sessions',
      'Access to all public personas',
      'Text & voice chat',
      'Chat history saved for 7 days',
      'No subscription required',
    ],
    cta: 'Buy Starter Pack',
    ctaHref: '/register',
    popular: false,
  },
  {
    name: 'Fan Pack',
    badge: 'Best Value',
    chats: 30,
    price: 9.99,
    perChat: '$0.33',
    color: '#a78bfa',
    accentBg: 'from-[#7c3aed]/12 to-[#38bdf8]/5',
    borderColor: 'border-[#7c3aed]/40',
    desc: 'For fans who regularly engage with their favourite personas.',
    features: [
      '30 persona chat sessions',
      'Access to all public personas',
      'Text, voice & avatar chat',
      'Chat history saved for 30 days',
      'Priority queue during peak hours',
      'No subscription required',
    ],
    cta: 'Buy Fan Pack',
    ctaHref: '/register',
    popular: true,
  },
  {
    name: 'Power Pack',
    badge: null,
    chats: 100,
    price: 24.99,
    perChat: '$0.25',
    color: '#34d399',
    accentBg: 'from-[#34d399]/8 to-transparent',
    borderColor: 'border-white/8',
    desc: 'Heavy users who want the lowest per-chat rate.',
    features: [
      '100 persona chat sessions',
      'Access to all public & premium personas',
      'Text, voice & avatar chat',
      'Unlimited chat history',
      'Priority queue always',
      'Early access to new personas',
    ],
    cta: 'Buy Power Pack',
    ctaHref: '/register',
    popular: false,
  },
];

const channelRates = [
  { channel: 'Web Chat', icon: '💬', unit: 'per minute', rate: '$0.004', note: 'Text-based conversations' },
  { channel: 'WhatsApp', icon: '📱', unit: 'per minute', rate: '$0.006', note: 'WhatsApp Business API' },
  { channel: 'Voice AI', icon: '🎙️', unit: 'per minute', rate: '$0.012', note: 'Real-time voice conversations' },
  { channel: 'Avatar Chat', icon: '🎭', unit: 'per minute', rate: '$0.025', note: 'Video avatar conversations' },
];

const storageRates = [
  { tier: '0 – 1 GB', rate: 'Free', note: 'Included in all plans' },
  { tier: '1 – 50 GB', rate: '$0.08 / GB', note: 'Per GB per month' },
  { tier: '50 – 500 GB', rate: '$0.05 / GB', note: 'Volume discount' },
  { tier: '500 GB+', rate: 'Custom', note: 'Contact sales' },
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const [activeTab, setActiveTab] = useState<'plans' | 'usage'>('plans');
  const [buyerType, setBuyerType] = useState<'creator' | 'audience'>('creator');

  return (
    <div className="min-h-screen bg-[#080a10] text-white overflow-x-hidden">
      <PublicHeader />

      {/* Hero */}
      <section className="relative pt-24 sm:pt-32 pb-10 sm:pb-12 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[#7c3aed]/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-[400px] h-[250px] bg-[#38bdf8]/8 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 text-[#a78bfa] text-xs font-semibold tracking-widest uppercase mb-6">
            Pricing
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5 leading-tight">
            Pay for what you<br />
            <span className="bg-gradient-to-r from-[#a78bfa] via-[#38bdf8] to-[#34d399] bg-clip-text text-transparent">
              actually use
            </span>
          </h1>
          <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Whether you&apos;re a D2C brand deploying AI on Shopify or a customer chatting with an AI assistant — we have a plan that fits.
          </p>

          {/* Buyer type toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-2xl border border-white/10 bg-white/4 mb-8">
            <button
              onClick={() => setBuyerType('creator')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                buyerType === 'creator' ?'bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white shadow-[0_0_16px_rgba(124,58,237,0.4)]' :'text-white/45 hover:text-white'
              }`}
            >
              <span>🛍️</span>
              <span>For D2C Brands &amp; Creators</span>
            </button>
            <button
              onClick={() => setBuyerType('audience')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                buyerType === 'audience' ?'bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white shadow-[0_0_16px_rgba(56,189,248,0.4)]' :'text-white/45 hover:text-white'
              }`}
            >
              <span>🎭</span>
              <span>For Audience / Fans</span>
            </button>
          </div>

          {/* Sub-tabs — only show for creator view */}
          {buyerType === 'creator' && (
            <>
              <div className="inline-flex items-center gap-1 p-1 rounded-xl border border-white/8 bg-white/4 mb-6 ml-4">
                <button
                  onClick={() => setActiveTab('plans')}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    activeTab === 'plans' ? 'bg-[#7c3aed] text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]' : 'text-white/40 hover:text-white'
                  }`}
                >
                  Plans
                </button>
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    activeTab === 'usage' ? 'bg-[#7c3aed] text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]' : 'text-white/40 hover:text-white'
                  }`}
                >
                  Usage Rates
                </button>
              </div>

              {activeTab === 'plans' && (
                <div className="inline-flex items-center gap-3 p-1 rounded-xl border border-white/8 bg-white/4">
                  <button
                    onClick={() => setYearly(false)}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                      !yearly ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setYearly(true)}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center gap-2 ${
                      yearly ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    Yearly
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#34d399]/15 text-[#34d399] border border-[#34d399]/25">
                      −20%
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── AUDIENCE CREDIT PACKS ── */}
      {buyerType === 'audience' && (
        <section className="pb-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">

            {/* Section header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#38bdf8]/30 bg-[#38bdf8]/10 text-[#38bdf8] text-xs font-semibold tracking-widest uppercase mb-4">
                Audience Credit Packs
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Chat with any AI persona.<br />
                <span className="bg-gradient-to-r from-[#38bdf8] to-[#a78bfa] bg-clip-text text-transparent">No subscription needed.</span>
              </h2>
              <p className="text-sm text-white/45 max-w-xl mx-auto leading-relaxed">
                Buy a credit pack once and use it whenever you like. Each chat session with an AI persona uses one credit — no monthly commitment, no expiry on Power Pack credits.
              </p>
            </div>

            {/* Credit pack cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch mb-10">
              {audiencePacks.map((pack) => (
                <div
                  key={pack.name}
                  className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-200 bg-gradient-to-b ${pack.accentBg} ${pack.borderColor} ${
                    pack.popular ? 'shadow-[0_0_50px_rgba(124,58,237,0.18)]' : 'hover:border-white/16'
                  }`}
                >
                  {pack.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#7c3aed] text-[11px] font-bold text-white shadow-[0_0_16px_rgba(56,189,248,0.5)] whitespace-nowrap">
                      {pack.badge}
                    </div>
                  )}

                  {/* Pack header */}
                  <div className="mb-5">
                    <div className="w-7 h-0.5 rounded-full mb-3" style={{ background: pack.color }} />
                    <h3 className="text-lg font-bold text-white mb-1">{pack.name}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{pack.desc}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-end gap-1 mb-1">
                      <span className="text-3xl font-extrabold text-white">${pack.price}</span>
                      <span className="text-white/35 text-sm mb-1">one-time</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/8">
                      <span className="text-lg font-bold" style={{ color: pack.color }}>{pack.chats}</span>
                      <span className="text-xs text-white/45">chat sessions</span>
                      <span className="text-white/20 mx-0.5">·</span>
                      <span className="text-xs font-semibold" style={{ color: pack.color }}>{pack.perChat}</span>
                      <span className="text-xs text-white/45">per chat</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5 mb-7 flex-1">
                    {pack.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
                          <circle cx="7" cy="7" r="6" fill={`${pack.color}20`} />
                          <path d="M4.5 7l2 2 3-3" stroke={pack.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-xs text-white/55 leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={pack.ctaHref}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold text-center transition-all duration-200 ${
                      pack.popular
                        ? 'bg-gradient-to-r from-[#38bdf8] to-[#7c3aed] text-white shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_28px_rgba(56,189,248,0.5)]'
                        : 'border border-white/12 text-white/65 hover:border-white/25 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {pack.cta}
                  </Link>
                </div>
              ))}
            </div>

            {/* How credits work */}
            <div className="rounded-2xl border border-white/8 bg-white/3 p-6 mb-6">
              <h3 className="text-sm font-bold text-white mb-4">💡 How credits work</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { step: '1', title: 'Buy a pack', desc: 'One-time purchase — no recurring charges unless you choose to top up.' },
                  { step: '2', title: 'Start chatting', desc: 'Each conversation with an AI persona uses 1 credit, regardless of length.' },
                  { step: '3', title: 'Top up anytime', desc: 'Running low? Buy another pack. Credits stack — they never expire on Power Pack.' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#38bdf8]/15 border border-[#38bdf8]/25 flex items-center justify-center text-xs font-bold text-[#38bdf8] shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white mb-0.5">{item.title}</div>
                      <div className="text-xs text-white/40 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '🔒', title: 'Secure one-time payment', desc: 'Powered by Stripe. No card stored after purchase.' },
                { icon: '♾️', title: 'Credits never expire', desc: 'Power Pack credits roll over forever. Starter & Fan valid 90 days.' },
                { icon: '🎭', title: 'Access all personas', desc: 'Use credits across any public persona on the platform.' },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl p-5 border border-white/6 bg-white/3 flex items-start gap-4">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                    <div className="text-xs text-white/40 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Switch to creator CTA */}
            <div className="mt-8 text-center">
              <p className="text-sm text-white/40 mb-3">Are you a D2C brand or creator building AI assistants?</p>
              <button
                onClick={() => setBuyerType('creator')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#7c3aed]/35 text-[#a78bfa] text-sm font-semibold hover:bg-[#7c3aed]/10 transition-all duration-200"
              >
                🛍️ View D2C Brand &amp; Creator Plans →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── CREATOR / ORG PLANS ── */}
      {buyerType === 'creator' && activeTab === 'plans' && (
        <section className="pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-200 bg-gradient-to-b ${plan.accentBg} ${plan.borderColor} ${
                    plan.popular ? 'shadow-[0_0_50px_rgba(124,58,237,0.18)]' : 'hover:border-white/16'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#38bdf8] text-[11px] font-bold text-white shadow-[0_0_16px_rgba(124,58,237,0.5)] whitespace-nowrap">
                      {plan.badge}
                    </div>
                  )}

                  {/* Plan header */}
                  <div className="mb-5">
                    <div className="w-7 h-0.5 rounded-full mb-3" style={{ background: plan.color }} />
                    <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{plan.desc}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {plan.monthlyPrice === null ? (
                      <div className="text-3xl font-extrabold text-white">Custom</div>
                    ) : plan.monthlyPrice === 0 ? (
                      <div className="text-3xl font-extrabold text-white">Free</div>
                    ) : (
                      <div className="flex items-end gap-1">
                        <span className="text-3xl font-extrabold text-white">
                          ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-white/35 text-sm mb-1">/mo</span>
                      </div>
                    )}
                    {plan.monthlyPrice !== null && plan.monthlyPrice !== 0 && yearly && (
                      <p className="text-[11px] text-[#34d399] mt-1">
                        Billed annually — save ${((plan.monthlyPrice! - plan.yearlyPrice!) * 12)}/yr
                      </p>
                    )}
                  </div>

                  {/* Usage limits */}
                  <div className="mb-5 p-3 rounded-xl bg-white/4 border border-white/6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-white/40">📦 Storage</span>
                      <span className="text-xs font-bold" style={{ color: plan.color }}>{plan.storage}</span>
                    </div>
                    <div className="w-full h-px bg-white/6" />
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-white/40">🕐 Minutes</span>
                      <span className="text-xs font-bold" style={{ color: plan.color }}>{plan.minutes}</span>
                    </div>
                    <div className="w-full h-px bg-white/6" />
                    <div>
                      <span className="text-[11px] text-white/40 block mb-1.5">📡 Channels</span>
                      <div className="flex flex-wrap gap-1">
                        {plan.channels.map((ch) => (
                          <span key={ch} className="text-[10px] px-2 py-0.5 rounded-full bg-white/6 text-white/55 border border-white/8">
                            {ch}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5 mb-7 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
                          <circle cx="7" cy="7" r="6" fill={`${plan.color}20`} />
                          <path d="M4.5 7l2 2 3-3" stroke={plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-xs text-white/55 leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.ctaHref}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold text-center transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#7c3aed] to-[#38bdf8] text-white shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_28px_rgba(124,58,237,0.5)]'
                        : 'border border-white/12 text-white/65 hover:border-white/25 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>

            {/* Overage note */}
            <div className="mt-8 p-5 rounded-2xl border border-white/8 bg-white/3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/15 border border-[#f59e0b]/20 flex items-center justify-center text-lg shrink-0">⚡</div>
              <div>
                <div className="text-sm font-semibold text-white mb-0.5">Overage billing</div>
                <div className="text-xs text-white/45 leading-relaxed">
                  Exceed your plan limits? We charge only for what you use. Storage overages at <strong className="text-white/70">$0.08/GB/mo</strong>, conversational minutes at channel-specific rates. No surprise bills — set spending caps in your dashboard.
                </div>
              </div>
            </div>

            {/* Trust row */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '🔒', title: 'No credit card for free tier', desc: 'Start building without a payment method.' },
                { icon: '↩', title: 'Cancel anytime', desc: 'No lock-in. Downgrade or cancel with one click.' },
                { icon: '📊', title: 'Real-time usage dashboard', desc: 'Track storage and minutes consumed live.' },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl p-5 border border-white/6 bg-white/3 flex items-start gap-4">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                    <div className="text-xs text-white/40 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Switch to audience CTA */}
            <div className="mt-8 text-center">
              <p className="text-sm text-white/40 mb-3">Just here to chat with AI personas?</p>
              <button
                onClick={() => setBuyerType('audience')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#38bdf8]/35 text-[#38bdf8] text-sm font-semibold hover:bg-[#38bdf8]/10 transition-all duration-200"
              >
                🎭 View Audience Credit Packs →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Usage Rates Tab */}
      {buyerType === 'creator' && activeTab === 'usage' && (
        <section className="pb-24 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-10">

            {/* Conversational Minutes */}
            <div>
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-white mb-1">Conversational Minutes</h2>
                <p className="text-sm text-white/45">Billed per minute of active conversation. Rates vary by channel complexity. Ideal for D2C brands handling customer Q&A at scale.</p>
              </div>
              <div className="rounded-2xl border border-white/8 overflow-hidden">
                {/* Desktop header */}
                <div className="hidden sm:grid sm:grid-cols-4 px-5 py-3 bg-white/4 border-b border-white/8">
                  <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Channel</span>
                  <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Rate</span>
                  <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Unit</span>
                  <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Notes</span>
                </div>
                {channelRates.map((row, i) => (
                  <div
                    key={row.channel}
                    className={`${i < channelRates.length - 1 ? 'border-b border-white/6' : ''} hover:bg-white/3 transition-colors`}
                  >
                    {/* Mobile card layout */}
                    <div className="sm:hidden px-4 py-4 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xl flex-shrink-0">{row.icon}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">{row.channel}</p>
                          <p className="text-xs text-white/40 mt-0.5">{row.note}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-[#a78bfa]">{row.rate}</p>
                        <p className="text-xs text-white/35 mt-0.5">{row.unit}</p>
                      </div>
                    </div>
                    {/* Desktop row */}
                    <div className="hidden sm:grid sm:grid-cols-4 px-5 py-4 items-center">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{row.icon}</span>
                        <span className="text-sm font-semibold text-white">{row.channel}</span>
                      </div>
                      <span className="text-sm font-bold text-[#a78bfa]">{row.rate}</span>
                      <span className="text-xs text-white/40">{row.unit}</span>
                      <span className="text-xs text-white/40">{row.note}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/30 mt-3">* Minutes are counted from first message to conversation end. Idle time &gt;5 min is not billed.</p>
            </div>

            {/* Document Storage */}
            <div>
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-white mb-1">Knowledge Ingestion Storage</h2>
                <p className="text-sm text-white/45">Charged on total ingested and indexed content size. Supports product catalogs, PDFs, DOCX, TXT, video transcripts, and web pages.</p>
              </div>
              <div className="rounded-2xl border border-white/8 overflow-hidden">
                {/* Desktop header */}
                <div className="hidden sm:grid sm:grid-cols-3 px-5 py-3 bg-white/4 border-b border-white/8">
                  <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Storage Tier</span>
                  <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Rate</span>
                  <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Notes</span>
                </div>
                {storageRates.map((row, i) => (
                  <div
                    key={row.tier}
                    className={`${i < storageRates.length - 1 ? 'border-b border-white/6' : ''} hover:bg-white/3 transition-colors`}
                  >
                    {/* Mobile card layout */}
                    <div className="sm:hidden px-4 py-4 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">{row.tier}</p>
                        <p className="text-xs text-white/40 mt-0.5">{row.note}</p>
                      </div>
                      <span className="text-sm font-bold text-[#34d399] flex-shrink-0">{row.rate}</span>
                    </div>
                    {/* Desktop row */}
                    <div className="hidden sm:grid sm:grid-cols-3 px-5 py-4 items-center">
                      <span className="text-sm font-semibold text-white">{row.tier}</span>
                      <span className="text-sm font-bold text-[#34d399]">{row.rate}</span>
                      <span className="text-xs text-white/40">{row.note}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/30 mt-3">* Storage is measured after processing and indexing. Raw file size may differ from indexed size.</p>
            </div>

            {/* Example bill */}
            <div className="rounded-2xl border border-[#7c3aed]/25 bg-gradient-to-br from-[#7c3aed]/8 to-[#38bdf8]/5 p-6">
              <h3 className="text-base font-bold text-white mb-4">📋 Example monthly bill (Growth plan — D2C brand)</h3>
              <div className="space-y-2.5 mb-5">
                {[
                  { label: 'Growth plan base', amount: '$79.00' },
                  { label: '8 GB product catalog storage (−10 GB included = 0 overage)', amount: '$0.00' },
                  { label: '1,800 chat minutes (within 2,000 included)', amount: '$0.00' },
                  { label: '300 WhatsApp overage minutes × $0.006', amount: '$1.80' },
                  { label: '120 Voice overage minutes × $0.012', amount: '$1.44' },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between">
                    <span className="text-xs text-white/50">{row.label}</span>
                    <span className="text-xs font-semibold text-white">{row.amount}</span>
                  </div>
                ))}
                <div className="w-full h-px bg-white/10 my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Total</span>
                  <span className="text-sm font-bold text-[#a78bfa]">$82.24</span>
                </div>
              </div>
              <p className="text-xs text-white/35">Overage is billed at the end of each billing cycle. Set spending caps to avoid surprises.</p>
            </div>

            <div className="text-center">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#38bdf8] text-white text-sm font-semibold shadow-[0_0_24px_rgba(124,58,237,0.35)] hover:shadow-[0_0_32px_rgba(124,58,237,0.5)] transition-all duration-200"
              >
                Get started free →
              </Link>
            </div>
          </div>
        </section>
      )}

      <PublicFooter />
    </div>
  );
}
