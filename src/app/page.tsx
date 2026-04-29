'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

function AnimatedGradientOrb({ className }: { className: string }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 animate-pulse-slow pointer-events-none ${className}`}
    />
  );
}

const steps = [
  {
    num: '01',
    title: 'Create Your Persona',
    desc: 'Name your AI sales persona, set the tone — friendly, expert, or premium — and define its personality in minutes.',
    color: '#7c3aed',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Connect Store / Upload Content',
    desc: 'Auto-sync your Shopify catalog or upload PDFs and product docs. Your AI learns your entire inventory instantly.',
    color: '#0ea5e9',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Deploy & Convert',
    desc: 'Embed on your website or Shopify store in one click. Your AI salesperson starts engaging visitors and driving conversions 24/7.',
    color: '#14b8a6',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

const useCases = [
  {
    tag: 'D2C Brands',
    tagColor: '#14b8a6',
    tagBg: 'rgba(20,184,166,0.12)',
    status: null,
    title: 'AI Shopping Assistant',
    desc: 'Engage every visitor with a smart AI that recommends products, answers questions, and nudges them toward checkout — increasing conversion without extra ad spend.',
    metrics: [
      { label: 'Avg. Conversion Lift', value: '23%' },
      { label: 'Queries Handled', value: '24/7' },
    ],
    accentColor: '#14b8a6',
    span: 'lg:col-span-2',
  },
  {
    tag: 'Creators',
    tagColor: '#a78bfa',
    tagBg: 'rgba(167,139,250,0.12)',
    status: 'Coming Soon',
    title: 'Interactive AI Persona',
    desc: 'Turn your content into an interactive AI persona that engages your audience around the clock.',
    metrics: [],
    accentColor: '#7c3aed',
    span: 'lg:col-span-1',
  },
  {
    tag: 'OTT & Media',
    tagColor: '#f59e0b',
    tagBg: 'rgba(245,158,11,0.12)',
    status: 'Coming Soon',
    title: 'Character Chat',
    desc: 'Let users chat with characters and explore content interactively across your streaming platform.',
    metrics: [],
    accentColor: '#f59e0b',
    span: 'lg:col-span-1',
  },
];

const benefits = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
      </svg>
    ),
    title: 'Engage Visitors Instantly',
    desc: 'Your AI salesperson greets every visitor, answers product questions, and guides them to the right item — no wait time.',
    accent: 'rgba(20,184,166,0.2)',
    accentColor: '#14b8a6',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: 'Increase Conversion with AI',
    desc: 'Turn content into revenue by surfacing the right products at the right moment in every conversation.',
    accent: 'rgba(124,58,237,0.2)',
    accentColor: '#7c3aed',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: 'Shopify-Native Integration',
    desc: 'Auto-sync your product catalog. Your AI knows every SKU, variant, and price — always up to date.',
    accent: 'rgba(14,165,233,0.2)',
    accentColor: '#0ea5e9',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Brand-Safe Responses',
    desc: 'Set guardrails so your AI always speaks in your brand voice — consistent, on-message, and on-brand.',
    accent: 'rgba(245,158,11,0.2)',
    accentColor: '#f59e0b',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'One-Click Embed',
    desc: 'Drop your AI persona onto any website or Shopify store with a single JS snippet — no developers needed.',
    accent: 'rgba(52,211,153,0.2)',
    accentColor: '#34d399',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'WhatsApp & Web Channels',
    desc: 'Meet customers where they are — deploy your AI persona on your website and WhatsApp Business simultaneously.',
    accent: 'rgba(124,58,237,0.2)',
    accentColor: '#7c3aed',
  },
];

const chatMessages = [
  { role: 'user', text: 'Do you have a moisturizer for oily skin?' },
  { role: 'ai', text: 'Yes! Our Matte Control Gel is perfect for oily skin — lightweight, non-comedogenic, and SPF 30. It\'s our #1 seller for oily skin types. Want me to show you more details?' },
  { role: 'user', text: 'What\'s the difference between that and the Hydra Boost?' },
  { role: 'ai', text: 'Great question! Matte Control Gel controls shine and is ideal for oily/combination skin. Hydra Boost is richer — better for dry or dehydrated skin. Since you mentioned oily skin, Matte Control Gel is your best bet. 🎯' },
];

export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [visibleMessages, setVisibleMessages] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useEffect(() => {
    if (visibleMessages >= chatMessages.length) return;
    const t = setTimeout(() => setVisibleMessages((v) => v + 1), 900 + visibleMessages * 400);
    return () => clearTimeout(t);
  }, [visibleMessages]);

  return (
    <div className="min-h-screen bg-[#0a0c12] text-white overflow-x-hidden">
      <PublicHeader />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      >
        <AnimatedGradientOrb className="w-[600px] h-[600px] bg-[#7c3aed] -top-32 -left-32" />
        <AnimatedGradientOrb className="w-[400px] h-[400px] bg-[#14b8a6] bottom-0 right-0" />
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(124,58,237,0.06), transparent 60%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-16">
          {/* Left */}
          <div className="flex-1 flex flex-col gap-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#14b8a6]/30 bg-[#14b8a6]/10 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
              <span className="text-xs font-medium text-[#5eead4]">AI Sales Persona for D2C Brands</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight">
              Turn Your Content into a{' '}
              <span className="text-gradient">24/7 AI</span> for Engagement, Discovery, and Conversion
            </h1>

            <p className="text-lg text-white/55 leading-relaxed max-w-xl">
              Build AI sales personas that help D2C brands engage visitors, answer questions, and drive more conversions — even when you&apos;re offline.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/guest-chat"
                className="px-6 py-3 rounded-xl text-sm font-semibold border border-white/15 text-white hover:bg-white/8 transition-all duration-200"
              >
                Try Demo
              </Link>
              <Link
                href="/register"
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white btn-primary"
              >
                Get Started →
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-2">
              {[
                { val: '24/7', label: 'Always available' },
                { val: '3 min', label: 'Setup time' },
                { val: '23%', label: 'Avg conversion lift' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span className="text-xl font-bold text-white">{stat.val}</span>
                  <span className="text-xs text-white/40">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Demo Chat Preview */}
          <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md">
            <div
              className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
              style={{ background: 'rgba(14,16,24,0.9)', backdropFilter: 'blur(24px)' }}
            >
              {/* Chat header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#7c3aed] flex items-center justify-center text-xs font-bold">
                  G
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Glow AI — Skincare Assistant</p>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
                    <span className="text-[10px] text-white/40">Your AI salesperson, available 24/7</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 flex flex-col gap-3 min-h-[260px]">
                {chatMessages.slice(0, visibleMessages).map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                        msg.role === 'user' ?'bg-[#7c3aed]/30 text-white border border-[#7c3aed]/30' :'bg-white/6 text-white/85 border border-white/8'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {visibleMessages < chatMessages.length && (
                  <div className="flex justify-start">
                    <div className="px-3 py-2 rounded-xl bg-white/6 border border-white/8 flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Product card */}
              {visibleMessages >= 2 && (
                <div className="mx-4 mb-4 p-3 rounded-xl border border-[#14b8a6]/25 bg-[#14b8a6]/8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#14b8a6]/30 to-[#7c3aed]/20 flex items-center justify-center text-lg">
                    🧴
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">Matte Control Gel SPF 30</p>
                    <p className="text-[10px] text-white/50">₹899 · In stock</p>
                  </div>
                  <button className="text-[10px] font-semibold text-[#14b8a6] border border-[#14b8a6]/40 px-2 py-1 rounded-lg hover:bg-[#14b8a6]/15 transition-colors flex-shrink-0">
                    Buy Now
                  </button>
                </div>
              )}

              <div className="px-4 pb-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/8 bg-white/4">
                  <span className="text-xs text-white/25 flex-1">Ask about products...</span>
                  <Link href="/guest-chat" className="text-[10px] font-semibold text-[#7c3aed] hover:text-[#a78bfa] transition-colors">
                    Try live →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7c3aed]/4 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/4 text-white/50 text-xs font-medium mb-4">
              Simple 3-Step Setup
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              From zero to deployed in{' '}
              <span className="bg-gradient-to-r from-[#a78bfa] to-[#14b8a6] bg-clip-text text-transparent">
                under 3 minutes
              </span>
            </h2>
            <p className="text-white/45 max-w-xl mx-auto">
              Minimal clicks to create, test, and deploy your AI persona.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="relative group p-6 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${step.color}80, transparent)` }}
                />
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${step.color}22` }}
                  >
                    {step.icon}
                  </div>
                  <span
                    className="text-3xl font-black opacity-20"
                    style={{ color: step.color }}
                  >
                    {step.num}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base mb-2">{step.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 z-10 text-white/20">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/how-it-works" className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-4">
              See detailed walkthrough →
            </Link>
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/4 text-white/50 text-xs font-medium mb-4">
              Powering More Than Commerce
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Built for D2C today.{' '}
              <span className="bg-gradient-to-r from-[#a78bfa] to-[#f59e0b] bg-clip-text text-transparent">
                Expanding to creators and media.
              </span>
            </h2>
            <p className="text-white/45 max-w-xl mx-auto">
              PersonaMatrix starts with D2C brands and Shopify stores — with creators and OTT platforms coming next.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className={`relative group p-6 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-white/15 transition-all duration-300 ${uc.span} ${uc.status ? 'opacity-70' : ''}`}
              >
                {uc.status && (
                  <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[10px] font-semibold border"
                    style={{ color: uc.accentColor, borderColor: `${uc.accentColor}40`, background: `${uc.accentColor}12` }}>
                    {uc.status}
                  </div>
                )}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                    style={{ color: uc.tagColor, background: uc.tagBg }}
                  >
                    {uc.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{uc.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-4">{uc.desc}</p>
                {uc.metrics.length > 0 && (
                  <div className="flex gap-6 pt-4 border-t border-white/6">
                    {uc.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="text-xl font-bold" style={{ color: uc.accentColor }}>{m.value}</p>
                        <p className="text-[11px] text-white/40">{m.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS BENTO ── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#14b8a6]/3 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Your AI salesperson,{' '}
              <span className="bg-gradient-to-r from-[#14b8a6] to-[#7c3aed] bg-clip-text text-transparent">
                available 24/7
              </span>
            </h2>
            <p className="text-white/45 max-w-xl mx-auto">
              Everything you need to engage visitors instantly and increase conversion with AI personas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="group relative p-5 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300 cursor-default overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 30% 20%, ${b.accentColor}12 0%, transparent 65%)` }}
                />
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: b.accent }}
                >
                  {b.icon}
                </div>
                <h3 className="font-bold text-white text-sm mb-1.5">{b.title}</h3>
                <p className="text-xs text-white/45 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="relative rounded-3xl border border-white/10 p-12 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(20,184,166,0.08) 100%)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/10 via-transparent to-[#14b8a6]/10 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                Start converting visitors into customers today
              </h2>
              <p className="text-white/50 mb-8 max-w-lg mx-auto">
                Deploy your AI sales persona in minutes. No developers needed. No long setup. Just results.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/guest-chat" className="px-6 py-3 rounded-xl text-sm font-semibold border border-white/15 text-white hover:bg-white/8 transition-all">
                  Try Demo First
                </Link>
                <Link href="/register" className="px-6 py-3 rounded-xl text-sm font-semibold text-white btn-primary">
                  Get Started Free →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
