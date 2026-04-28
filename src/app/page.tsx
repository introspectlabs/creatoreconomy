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

export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

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
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const problems = [
    {
      stat: '2.3%',
      label: 'Average D2C conversion rate',
      pain: 'Customers leave without buying because no one answered their question.',
      color: '#ef4444',
    },
    {
      stat: '$87',
      label: 'Average customer acquisition cost',
      pain: 'You pay to bring shoppers in, then lose them to a static product page.',
      color: '#f59e0b',
    },
    {
      stat: '68%',
      label: 'Carts abandoned before checkout',
      pain: 'Unanswered pre-purchase questions are the #1 reason carts go cold.',
      color: '#ef4444',
    },
    {
      stat: '0',
      label: 'Answers from a product image',
      pain: 'Static pages can\'t explain fit, ingredients, compatibility, or use cases.',
      color: '#f59e0b',
    },
  ];

  const features = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
      title: 'Shopify & Store Connect',
      desc: 'Sync your product catalog in one click. AI learns SKUs, variants, pricing, and inventory — always up to date.',
      accent: 'rgba(16,185,129,0.2)',
      accentColor: '#10b981',
      span: 'lg:col-span-1',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      ),
      title: 'Video + Content Understanding',
      desc: 'Upload product demos, unboxing videos, and FAQs. The AI watches, understands, and answers from them.',
      accent: 'rgba(124,58,237,0.2)',
      accentColor: '#7c3aed',
      span: 'lg:col-span-1',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
      ),
      title: 'Conversion-Driven Recommendations',
      desc: 'AI doesn\'t just answer — it recommends the right product at the right moment, increasing AOV on every conversation.',
      accent: 'rgba(245,158,11,0.2)',
      accentColor: '#f59e0b',
      span: 'lg:col-span-2',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      title: 'Multi-Channel Deployment',
      desc: 'Deploy on your website, WhatsApp, and voice — one AI agent, every channel your customers already use.',
      accent: 'rgba(59,130,246,0.2)',
      accentColor: '#3b82f6',
      span: 'lg:col-span-2',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      title: 'Memory & Personalization',
      desc: 'Remembers past interactions. Returns customers get personalized suggestions based on what they\'ve browsed and bought.',
      accent: 'rgba(236,72,153,0.2)',
      accentColor: '#ec4899',
      span: 'lg:col-span-1',
    },
  ];

  const useCases = [
    { icon: '🔍', title: 'Product Discovery', desc: 'Shoppers describe what they need in plain language. AI surfaces the exact right product from your catalog.' },
    { icon: '💬', title: 'Pre-Purchase Q&A', desc: 'Size, ingredients, compatibility, shipping — answered instantly before doubt kills the sale.' },
    { icon: '⬆️', title: 'Upsell & Cross-Sell', desc: 'AI identifies the right moment to suggest bundles, add-ons, and complementary products.' },
    { icon: '🛒', title: 'Cart Recovery', desc: 'Re-engages hesitant shoppers with answers to their unspoken objections before they leave.' },
    { icon: '🎧', title: 'Support Automation', desc: 'Order status, returns, and FAQs handled automatically — zero agent time, full customer satisfaction.' },
  ];

  const roiStats = [
    { metric: '3.2×', label: 'Conversion rate lift', sub: 'vs. static product pages', color: '#10b981' },
    { metric: '41%', label: 'Reduction in support tickets', sub: 'automated pre-purchase answers', color: '#7c3aed' },
    { metric: '28%', label: 'Increase in average order value', sub: 'from AI-driven recommendations', color: '#f59e0b' },
  ];

  const ottFeatures = [
    {
      icon: '🎭',
      title: 'Persona-Based Character Chat',
      desc: 'Chat with characters from movies and series. Ask about their decisions, personality, and story arcs. Relive scenes through conversation.',
      color: '#7c3aed',
    },
    {
      icon: '👗',
      title: 'Style & Outfit Discovery',
      desc: '"What is this character wearing?" Get outfit breakdowns, discover similar products, and shop inspired looks — directly from scenes.',
      color: '#ec4899',
    },
    {
      icon: '💇',
      title: 'Hair & Style Inspiration',
      desc: 'Ask about hairstyles, grooming, and fashion from your favourite characters. Get personalized suggestions that connect inspiration to purchase.',
      color: '#f59e0b',
    },
    {
      icon: '🔗',
      title: 'Watch → Chat → Shop',
      desc: 'Convert inspiration into commerce. Link outfits to real products, enable seamless discovery, and turn every scene into a shoppable moment.',
      color: '#10b981',
    },
  ];

  const steps = [
    { label: 'Connect Shopify or upload content', detail: 'Sync your product catalog, videos, and FAQs in minutes.' },
    { label: 'AI learns your products & content', detail: 'Deep understanding of every SKU, variant, and use case.' },
    { label: 'Deploy your AI sales agent', detail: 'One-click embed on web, WhatsApp, or voice channels.' },
    { label: 'Customers interact → conversions rise', detail: 'Every conversation is a guided path to checkout.' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0c12] text-white overflow-x-hidden">
      <PublicHeader />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      >
        <AnimatedGradientOrb className="w-[700px] h-[700px] bg-[#10b981] -top-40 -left-40" />
        <AnimatedGradientOrb className="w-[500px] h-[500px] bg-[#7c3aed] bottom-0 right-0" />
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(16,185,129,0.07), transparent 60%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-16">
          {/* Left */}
          <div className="flex-1 flex flex-col gap-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-xs font-semibold text-[#6ee7b7]">AI Sales Agent for D2C Brands</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.06] tracking-tight">
              Your store never sleeps.{' '}
              <br className="hidden lg:block" />
              <span
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #34d399 40%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Neither does your AI.
              </span>
            </h1>

            <p className="text-lg text-white/55 leading-relaxed max-w-xl">
              Turn your product catalog, videos, and FAQs into an AI sales agent that answers every question, recommends the right product, and drives customers to checkout — 24/7, on autopilot.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="px-7 py-3.5 rounded-xl font-semibold text-white text-sm"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  boxShadow: '0 0 28px rgba(16,185,129,0.4)',
                }}
              >
                Book a Demo →
              </Link>
              <Link
                href="/register"
                className="px-7 py-3.5 rounded-xl font-semibold text-white/80 border border-white/12 hover:border-white/25 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm"
              >
                Start Free Trial
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-1">
              {['No credit card needed', 'Live in 30 minutes', 'Shopify-ready'].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" fill="rgba(16,185,129,0.2)" />
                    <path d="M4.5 7l2 2 3-3" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-xs text-white/40">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — AI Sales Agent demo */}
          <div className="flex-1 flex items-center justify-center w-full max-w-md">
            <div className="relative w-full">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#10b981]/20 to-[#7c3aed]/10 blur-2xl scale-105" />
              <div className="relative glass-elevated rounded-3xl border border-white/10 overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="ml-3 flex-1 h-5 rounded-md bg-white/5 text-[10px] text-white/25 flex items-center px-2">
                    yourstore.com — AI Sales Agent
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#10b981]/15 border border-[#10b981]/30">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                    <span className="text-[9px] text-[#6ee7b7] font-semibold">LIVE</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-3 min-h-[300px]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: 'linear-gradient(135deg, #10b981, #7c3aed)' }}>AI</div>
                    <div className="glass rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-white/80 max-w-[85%]">
                      Hi! I know everything about our skincare range. What are you looking for today?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-[#10b981]/15 border border-[#10b981]/25 rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-white/80 max-w-[85%]">
                      I have sensitive skin. Which moisturiser should I get?
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: 'linear-gradient(135deg, #10b981, #7c3aed)' }}>AI</div>
                    <div className="glass rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-white/80 max-w-[85%]">
                      For sensitive skin, our <span className="text-[#10b981] font-semibold">Calm & Restore Gel</span> is perfect — fragrance-free, dermatologist tested. Pairs well with the Barrier Serum. Want me to add both to your cart?
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pl-11">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-[#10b981]/60"
                          style={{ animation: `bounce 1.2s ${i * 0.2}s infinite` }}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-white/25">AI Agent is typing…</span>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-2 glass rounded-xl px-4 py-2.5 border border-white/8">
                    <span className="text-sm text-white/25 flex-1">Ask about any product…</span>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M7 3l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM SECTION ── */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ef4444]/3 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold text-[#f87171] uppercase tracking-[0.2em] mb-3">The D2C Problem</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">
              You're paying to acquire customers<br />
              <span style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                then losing them to silence.
              </span>
            </h2>
            <p className="mt-4 text-white/50 max-w-lg mx-auto text-[15px] leading-relaxed">
              Static product pages can't answer questions. Unanswered questions kill conversions. It's that simple.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {problems.map((item) => (
              <div
                key={item.label}
                className="glass-elevated rounded-2xl p-7 border border-white/8 flex gap-6 items-start"
              >
                <div className="shrink-0 flex flex-col items-center gap-1">
                  <span className="text-3xl font-extrabold tracking-tight" style={{ color: item.color }}>{item.stat}</span>
                  <span className="text-[10px] text-white/35 text-center leading-tight max-w-[80px]">{item.label}</span>
                </div>
                <div className="w-px self-stretch bg-white/8 shrink-0" />
                <p className="text-sm text-white/55 leading-relaxed">{item.pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION SECTION ── */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#10b981]/4 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 flex flex-col gap-6">
              <p className="text-[11px] font-bold text-[#6ee7b7] uppercase tracking-[0.2em]">The Solution</p>
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">
                An AI that knows your products<br />
                <span style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  better than your best rep.
                </span>
              </h2>
              <p className="text-white/55 text-[15px] leading-relaxed max-w-lg">
                Feed it your product catalog, demo videos, and FAQs. It understands everything — and turns every customer question into a guided path to purchase.
              </p>
              <div className="flex flex-col gap-4 mt-2">
                {[
                  { icon: '📦', text: 'Ingests your full product catalog — SKUs, variants, specs, pricing' },
                  { icon: '🎬', text: 'Watches your product videos and extracts answers from them' },
                  { icon: '🎯', text: 'Recommends the right product based on what the customer describes' },
                  { icon: '⚡', text: 'Answers every pre-purchase question instantly, at scale' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                    <p className="text-sm text-white/65 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 max-w-md w-full">
              <div className="glass-elevated rounded-2xl border border-white/10 p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="text-xs font-semibold text-[#6ee7b7] uppercase tracking-widest">AI Agent Activity</span>
                </div>
                {[
                  { q: 'Does this come in size XL?', a: 'Yes — XL is in stock in Black and Navy. Ships in 2 days.', t: '2s ago' },
                  { q: 'Is this vegan and cruelty-free?', a: 'Fully vegan, certified cruelty-free by PETA. No parabens.', t: '14s ago' },
                  { q: 'What\'s the difference between Plan A and B?', a: 'Plan B adds priority support and 3× more API calls. Most teams pick B.', t: '31s ago' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-2 p-4 rounded-xl bg-white/4 border border-white/6">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs text-white/50 italic">"{item.q}"</p>
                      <span className="text-[10px] text-white/25 shrink-0">{item.t}</span>
                    </div>
                    <p className="text-xs text-[#6ee7b7] leading-relaxed">→ {item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7c3aed]/4 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold text-[#a78bfa] uppercase tracking-[0.2em] mb-3">How It Works</p>
            <h2 className="text-4xl font-extrabold tracking-tight">From catalog to conversions in 4 steps</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`text-left glass-elevated rounded-2xl p-7 border transition-all duration-300 flex gap-5 items-start cursor-pointer ${
                  activeStep === i
                    ? 'border-[#10b981]/40 shadow-[0_0_32px_rgba(16,185,129,0.12)]'
                    : 'border-white/8 hover:border-white/15'
                }`}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-lg shrink-0 transition-all duration-300"
                  style={{
                    background: activeStep === i ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)',
                    color: activeStep === i ? '#10b981' : 'rgba(255,255,255,0.3)',
                    border: `1px solid ${activeStep === i ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className={`font-bold text-base transition-colors duration-200 ${activeStep === i ? 'text-white' : 'text-white/60'}`}>
                    {step.label}
                  </h3>
                  <p className={`text-sm leading-relaxed transition-colors duration-200 ${activeStep === i ? 'text-white/60' : 'text-white/30'}`}>
                    {step.detail}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES BENTO ── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold text-[#a78bfa] uppercase tracking-[0.2em] mb-3">Built for Commerce</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">
              Not a chatbot.{' '}
              <span style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                A revenue engine.
              </span>
            </h2>
            <p className="mt-4 text-white/55 max-w-lg mx-auto text-[15px] leading-relaxed">
              Every feature is built to move customers closer to checkout — not just answer questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className={`group relative glass-elevated rounded-2xl p-6 flex flex-col gap-4 border border-white/8 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden ${f.span}`}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 30% 20%, ${f.accentColor}18 0%, transparent 65%)` }}
                />
                <div
                  className="relative w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: f.accent }}
                >
                  {f.icon}
                </div>
                <div className="relative flex flex-col gap-1.5">
                  <h3 className="font-bold text-white text-base tracking-tight">{f.title}</h3>
                  <p className="text-[13px] text-white/45 leading-relaxed group-hover:text-white/60 transition-colors duration-200">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFFERENTIATION ── */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#10b981]/3 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold text-[#6ee7b7] uppercase tracking-[0.2em] mb-3">Why Not Just a Chatbot?</p>
            <h2 className="text-4xl font-extrabold tracking-tight leading-[1.1]">
              Generic AI talks. This one{' '}
              <span style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                sells.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="glass-elevated rounded-2xl p-7 border border-[#ef4444]/20 bg-[#ef4444]/4">
              <p className="text-xs font-bold text-[#f87171] uppercase tracking-widest mb-5">Generic Chatbot</p>
              <div className="flex flex-col gap-3">
                {[
                  'Scripted responses that break on edge cases',
                  'No understanding of your actual products',
                  'Can\'t watch or learn from your videos',
                  'Doesn\'t recommend — just responds',
                  'One channel, one format, no memory',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
                      <circle cx="7" cy="7" r="6" fill="rgba(239,68,68,0.15)" />
                      <path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span className="text-sm text-white/50">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-elevated rounded-2xl p-7 border border-[#10b981]/25 bg-[#10b981]/5">
              <p className="text-xs font-bold text-[#6ee7b7] uppercase tracking-widest mb-5">Your AI Sales Agent</p>
              <div className="flex flex-col gap-3">
                {[
                  'Deep understanding of every product in your catalog',
                  'Learns from videos, PDFs, FAQs, and live inventory',
                  'Recommends products based on what customers describe',
                  'Drives upsells and cross-sells at the right moment',
                  'Web, WhatsApp, and voice — with persistent memory',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
                      <circle cx="7" cy="7" r="6" fill="rgba(16,185,129,0.2)" />
                      <path d="M4.5 7l2 2 3-3" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm text-white/65">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold text-[#a78bfa] uppercase tracking-[0.2em] mb-3">Use Cases</p>
            <h2 className="text-4xl font-extrabold tracking-tight leading-[1.1]">
              Every stage of the customer journey,{' '}
              <span style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                covered.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {useCases.map((uc, i) => (
              <div
                key={i}
                className="glass-elevated rounded-2xl p-6 border border-white/8 flex flex-col gap-3 hover:border-white/18 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-3xl">{uc.icon}</span>
                <h3 className="font-bold text-white text-sm">{uc.title}</h3>
                <p className="text-[12px] text-white/45 leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI SECTION ── */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#10b981]/4 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold text-[#6ee7b7] uppercase tracking-[0.2em] mb-3">The ROI</p>
            <h2 className="text-4xl font-extrabold tracking-tight leading-[1.1]">
              Numbers that move{' '}
              <span style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                your bottom line.
              </span>
            </h2>
            <p className="mt-4 text-white/50 max-w-md mx-auto text-[15px]">
              Based on aggregate data from D2C brands using AI-assisted product discovery and pre-purchase Q&A.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roiStats.map((stat) => (
              <div
                key={stat.label}
                className="glass-elevated rounded-2xl p-8 border border-white/8 flex flex-col gap-3 text-center hover:border-white/18 transition-all duration-300"
              >
                <span className="text-5xl font-extrabold tracking-tight" style={{ color: stat.color }}>{stat.metric}</span>
                <h3 className="font-bold text-white text-base">{stat.label}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{stat.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 glass-elevated rounded-2xl p-7 border border-[#10b981]/20 bg-[#10b981]/4 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <p className="text-sm font-bold text-white mb-1">Shopify Plugin — Coming Soon</p>
              <p className="text-sm text-white/50 leading-relaxed">
                Install directly from the Shopify App Store. Your AI sales agent syncs with your store in real time — no developer needed. Join the waitlist.
              </p>
            </div>
            <Link
              href="/register"
              className="shrink-0 px-6 py-3 rounded-xl font-semibold text-sm text-white border border-[#10b981]/40 hover:bg-[#10b981]/10 transition-all duration-200"
            >
              Join Shopify Waitlist →
            </Link>
          </div>
        </div>
      </section>

      {/* ── OTT VISION SECTION ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <AnimatedGradientOrb className="w-[600px] h-[600px] bg-[#7c3aed] top-0 right-0 opacity-10" />
        <AnimatedGradientOrb className="w-[400px] h-[400px] bg-[#ec4899] bottom-0 left-0 opacity-10" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 mb-6">
              <span className="text-xs font-semibold text-[#a78bfa]">Platform Vision · 2025 Roadmap</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4">
              From Shopping to Storytelling:{' '}
              <br className="hidden lg:block" />
              <span style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f59e0b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                The Future of Discovery
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-[15px] leading-relaxed">
              The same AI engine that powers D2C sales is being extended to OTT and media platforms — enabling a new kind of content experience where audiences don't just watch, they interact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
            {ottFeatures.map((item) => (
              <div
                key={item.title}
                className="glass-elevated rounded-2xl p-7 border border-white/8 flex gap-5 items-start hover:border-white/18 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}
                >
                  {item.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-white text-base">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 glass-elevated rounded-2xl p-8 border border-white/8 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/8 via-[#ec4899]/5 to-[#f59e0b]/8 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <p className="text-xs font-bold text-[#a78bfa] uppercase tracking-widest mb-3">The Watch → Chat → Shop Journey</p>
                <div className="flex items-center gap-3 flex-wrap">
                  {['Watch a scene', '→', 'Chat with the character', '→', 'Discover the outfit', '→', 'Shop the look'].map((step, i) => (
                    <span
                      key={i}
                      className={`text-sm font-semibold ${step === '→' ? 'text-white/25' : 'text-white/80'}`}
                    >
                      {step}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm text-white/45 leading-relaxed max-w-lg">
                  Every scene becomes a discovery moment. Every character becomes a style guide. Every conversation becomes a commerce opportunity.
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-center gap-2">
                <div className="px-5 py-2.5 rounded-xl border border-[#7c3aed]/30 bg-[#7c3aed]/10 text-sm font-semibold text-[#a78bfa]">
                  OTT Partnerships Open
                </div>
                <p className="text-[11px] text-white/30">Reach out to explore integration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative glass-elevated rounded-3xl border border-white/10 p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/10 via-transparent to-[#7c3aed]/10 pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#10b981]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[#7c3aed]/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#10b981]/30 bg-[#10b981]/10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-xs font-semibold text-[#6ee7b7]">Start converting more today</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Your store is open 24/7.<br />
                <span style={{ background: 'linear-gradient(135deg, #10b981, #34d399, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Your AI should be too.
                </span>
              </h2>
              <p className="text-white/50 max-w-md text-base leading-relaxed">
                Join D2C brands turning product questions into purchase decisions — automatically, at scale.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/register"
                  className="px-8 py-4 rounded-xl font-semibold text-white text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    boxShadow: '0 0 32px rgba(16,185,129,0.4)',
                  }}
                >
                  Book a Demo
                </Link>
                <Link
                  href="/register"
                  className="px-8 py-4 rounded-xl font-semibold text-white/80 border border-white/12 hover:border-white/25 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm"
                >
                  Start Free Trial →
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-1">
                {['No credit card needed', 'Live in 30 minutes', 'Cancel anytime'].map((t) => (
                  <div key={t} className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6" fill="rgba(16,185,129,0.2)" />
                      <path d="M4.5 7l2 2 3-3" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-xs text-white/35">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />

      <style jsx>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
