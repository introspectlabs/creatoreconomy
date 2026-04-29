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

function FeatureCard({
  icon,
  title,
  desc,
  accent,
  className = '',
  accentColor = '#7c3aed',
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  accent: string;
  className?: string;
  accentColor?: string;
}) {
  return (
    <div
      className={`group relative glass-elevated rounded-2xl p-6 flex flex-col gap-4 border border-white/8 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] cursor-default overflow-hidden ${className}`}
      style={{ '--accent-color': accentColor } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse at 30% 20%, ${accentColor}18 0%, transparent 65%)` }}
      />
      <div
        className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}80, transparent)` }}
      />
      <div
        className="relative w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg"
        style={{ background: accent, boxShadow: `0 0 0 0 ${accentColor}00` }}
      >
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: `0 0 16px ${accentColor}60` }}
        />
        {icon}
      </div>
      <div className="relative flex flex-col gap-1.5">
        <h3 className="font-bold text-white text-base tracking-tight leading-snug group-hover:text-white transition-colors duration-200">
          {title}
        </h3>
        <p className="text-[13px] text-white/45 leading-relaxed group-hover:text-white/60 transition-colors duration-200">
          {desc}
        </p>
      </div>
    </div>
  );
}

const features = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    title: 'AI Shopping Assistant for Your Shopify Store',
    desc: 'Deploy an AI that knows every product, variant, and use case — answering customer questions, handling objections, and guiding buyers to checkout automatically, 24/7.',
    accent: 'rgba(124,58,237,0.25)',
    accentColor: '#7c3aed',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    title: 'Reduce Cart Abandonment & Returns',
    desc: 'Customers abandon carts when they have unanswered questions. Your AI resolves doubts instantly — on the product page, in cart, or via WhatsApp — before they leave.',
    accent: 'rgba(239,68,68,0.25)',
    accentColor: '#ef4444',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
      </svg>
    ),
    title: 'Embed on Your Website in One Click',
    desc: 'Drop your AI brand assistant onto your Shopify store, landing pages, or DTC website with a simple embed — no developers needed, live in minutes.',
    accent: 'rgba(20,184,166,0.25)',
    accentColor: '#14b8a6',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
    title: 'WhatsApp & Voice for Post-Purchase Support',
    desc: 'Handle order status, returns, and product questions on WhatsApp and Voice — reducing support tickets by up to 70% without hiring more agents.',
    accent: 'rgba(245,158,11,0.25)',
    accentColor: '#f59e0b',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: 'Know What Customers Ask Before They Leave',
    desc: 'See exactly what questions customers ask, which products get the most objections, and where buyers drop off — so you can fix your store copy and increase conversions.',
    accent: 'rgba(20,184,166,0.25)',
    accentColor: '#14b8a6',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Shopify & Website Integration',
    desc: 'Native Shopify embed widget plus JS snippet for any website. Your AI syncs with your product catalog and brand knowledge automatically.',
    accent: 'rgba(124,58,237,0.25)',
    accentColor: '#7c3aed',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Brand-Safe AI — Your Voice, Your Rules',
    desc: 'Set guardrails on what your AI can and cannot say. Your brand tone, product claims, and messaging stay consistent across every customer conversation.',
    accent: 'rgba(16,185,129,0.25)',
    accentColor: '#10b981',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    title: 'Train on Your Entire Product Catalog',
    desc: 'Upload product descriptions, FAQs, ingredient lists, size guides, and brand story. Your AI learns everything and keeps getting smarter as you add more.',
    accent: 'rgba(239,68,68,0.25)',
    accentColor: '#ef4444',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: 'Upsell & Cross-Sell Automatically',
    desc: 'Your AI recommends complementary products based on what customers are browsing — increasing average order value without any manual effort.',
    accent: 'rgba(59,130,246,0.25)',
    accentColor: '#3b82f6',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: 'Works Alongside Your Existing Stack',
    desc: 'Embed PersonaMatrix on Shopify, WooCommerce, or any custom website. Works alongside your existing tools — no rebuilding required.',
    accent: 'rgba(59,130,246,0.25)',
    accentColor: '#3b82f6',
  },
];

export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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

  return (
    <div className="min-h-screen bg-[#0a0c12] text-white overflow-x-hidden">
      <PublicHeader />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      >
        <AnimatedGradientOrb className="w-[600px] h-[600px] bg-[#7c3aed] -top-32 -left-32" />
        <AnimatedGradientOrb className="w-[400px] h-[400px] bg-[#3b82f6] bottom-0 right-0" />
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-12">
          {/* Left */}
          <div className="flex-1 flex flex-col gap-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
              <span className="text-xs font-medium text-[#a78bfa]">Now in public beta</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight">
              Give Your Shopify Store a 24/7{' '}
              <span className="text-gradient">AI Brand Assistant</span>
            </h1>

            <p className="text-lg text-white/55 leading-relaxed max-w-xl">
              Turn your product catalog and brand knowledge into an AI that answers customer questions, reduces cart abandonment, and drives conversions — even when you're offline.
            </p>

            <div className="px-4 py-3 rounded-xl border border-[#7c3aed]/40 bg-[#7c3aed]/10 backdrop-blur-sm">
              <p className="text-sm text-[#c4b5fd] leading-relaxed font-medium">
                Built for <span className="text-white font-semibold">D2C brands on Shopify and their websites</span> who want to turn their product knowledge into{' '}
                <span className="text-white font-semibold">always-on, revenue-generating AI</span> — without working more hours.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="px-6 py-3 rounded-xl font-semibold text-white btn-primary text-sm shadow-[0_0_24px_rgba(124,58,237,0.35)] hover:shadow-[0_0_32px_rgba(124,58,237,0.5)]"
              >
                Get Started — free
              </Link>
              <Link
                href="/developers"
                className="px-6 py-3 rounded-xl font-semibold text-white/80 border border-white/12 hover:border-white/25 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm"
              >
                See How It Works →
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-2">
              {['No credit card needed', 'Ready in minutes', 'Your brand, your rules'].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" fill="rgba(20,184,166,0.2)" />
                    <path d="M4.5 7l2 2 3-3" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-xs text-white/40">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — product preview */}
          <div className="flex-1 flex items-center justify-center w-full max-w-lg">
            <div className="relative w-full">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#7c3aed]/20 to-[#3b82f6]/10 blur-2xl scale-105" />
              <div className="relative glass-elevated rounded-3xl border border-white/10 overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="ml-3 flex-1 h-5 rounded-md bg-white/5 text-[10px] text-white/25 flex items-center px-2">
                    yourstore.com — AI Shopping Assistant
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-3 min-h-[280px]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#ec4899] flex items-center justify-center text-xs font-bold shrink-0">S</div>
                    <div className="glass rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-white/80 max-w-[80%]">
                      Hi! I'm the Sasha Skin AI. Ask me anything about our products or your skin concerns!
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-[#7c3aed]/20 border border-[#7c3aed]/30 rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-white/80 max-w-[80%]">
                      I have dry, sensitive skin. What moisturizer should I get?
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#ec4899] flex items-center justify-center text-xs font-bold shrink-0">S</div>
                    <div className="glass rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-white/80 max-w-[80%]">
                      Our Barrier Repair Serum is perfect for you — fragrance-free, dermatologist-tested, and 89% of customers with dry sensitive skin see results in 2 weeks. Want me to add it to your cart with 20% off?
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pl-11">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-[#7c3aed]/60"
                          style={{ animation: `bounce 1.2s ${i * 0.2}s infinite` }}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-white/25">AI Assistant is typing…</span>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-2 glass rounded-xl px-4 py-2.5 border border-white/8">
                    <span className="text-sm text-white/25 flex-1">Ask about our products…</span>
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#ec4899] flex items-center justify-center">
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

      {/* ── PAIN POINTS ── */}
      <section className="py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ef4444]/3 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold text-[#f87171] uppercase tracking-[0.2em] mb-3">Sound Familiar?</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">
              The problems every D2C brand<br />
              <span className="text-gradient">on Shopify faces</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                emoji: '🛒',
                problem: 'Customers abandon carts because they have unanswered questions',
                fix: 'Your AI answers product questions instantly — on the product page, in cart, or via WhatsApp — before customers leave your store.',
              },
              {
                emoji: '📦',
                problem: 'Returns and support tickets eat into your margins',
                fix: 'Your AI guides customers to the right product upfront, reducing wrong-size and wrong-product purchases — and handles post-purchase support automatically.',
              },
              {
                emoji: '🕐',
                problem: 'You can\'t staff customer support 24/7 without burning cash',
                fix: 'One AI brand assistant handles thousands of customer conversations simultaneously — your product knowledge, infinitely scalable.',
              },
              {
                emoji: '💸',
                problem: 'Hard to increase AOV without a dedicated sales team',
                fix: 'Your AI recommends complementary products and upsells naturally in conversation — increasing average order value without any manual effort.',
              },
            ].map((item) => (
              <div key={item.problem} className="glass-elevated rounded-2xl p-6 border flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl shrink-0">{item.emoji}</div>
                </div>
                <p className="text-sm font-semibold text-white">{item.problem}</p>
                <p className="text-sm text-white/50 leading-relaxed">{item.fix}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES BENTO ── */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold text-[#a78bfa] uppercase tracking-[0.2em] mb-3">What You Get</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">
              Everything D2C brands{' '}
              <span className="text-gradient">actually need</span>
            </h2>
            <p className="mt-4 text-white/60 max-w-lg mx-auto text-[15px] leading-relaxed">
              From uploading your product catalog to converting customers at scale — all in one place.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <svg
              className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-10"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="line-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
                  <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="line-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="line-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
                  <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <line x1="66.7%" y1="25%" x2="100%" y2="25%" stroke="url(#line-grad-1)" strokeWidth="1" strokeDasharray="4 6" filter="url(#glow)" />
              <line x1="83.3%" y1="50%" x2="83.3%" y2="75%" stroke="url(#line-grad-2)" strokeWidth="1" strokeDasharray="4 6" filter="url(#glow)" />
              <line x1="0%" y1="75%" x2="33.3%" y2="75%" stroke="url(#line-grad-3)" strokeWidth="1" strokeDasharray="4 6" filter="url(#glow)" />
              <circle cx="66.7%" cy="25%" r="3" fill="#7c3aed" opacity="0.6" filter="url(#glow)" />
              <circle cx="100%" cy="25%" r="3" fill="#3b82f6" opacity="0.6" filter="url(#glow)" />
              <circle cx="83.3%" cy="75%" r="3" fill="#3b82f6" opacity="0.6" filter="url(#glow)" />
              <circle cx="0%" cy="75%" r="3" fill="#7c3aed" opacity="0.6" filter="url(#glow)" />
              <circle cx="33.3%" cy="75%" r="3" fill="#7c3aed" opacity="0.6" filter="url(#glow)" />
            </svg>

            <FeatureCard className="lg:col-span-2 lg:row-span-1" icon={features[0].icon} title={features[0].title} desc={features[0].desc} accent={features[0].accent} accentColor={features[0].accentColor} />
            <FeatureCard icon={features[1].icon} title={features[1].title} desc={features[1].desc} accent={features[1].accent} accentColor={features[1].accentColor} />
            <FeatureCard icon={features[2].icon} title={features[2].title} desc={features[2].desc} accent={features[2].accent} accentColor={features[2].accentColor} />
            <FeatureCard className="lg:col-span-2" icon={features[3].icon} title={features[3].title} desc={features[3].desc} accent={features[3].accent} accentColor={features[3].accentColor} />
            <FeatureCard icon={features[4].icon} title={features[4].title} desc={features[4].desc} accent={features[4].accent} accentColor={features[4].accentColor} />
            <FeatureCard icon={features[5].icon} title={features[5].title} desc={features[5].desc} accent={features[5].accent} accentColor={features[5].accentColor} />
            <FeatureCard icon={features[6].icon} title={features[6].title} desc={features[6].desc} accent={features[6].accent} accentColor={features[6].accentColor} />
            <FeatureCard icon={features[7].icon} title={features[7].title} desc={features[7].desc} accent={features[7].accent} accentColor={features[7].accentColor} />
            <FeatureCard icon={features[8].icon} title={features[8].title} desc={features[8].desc} accent={features[8].accent} accentColor={features[8].accentColor} />
            <FeatureCard icon={features[9].icon} title={features[9].title} desc={features[9].desc} accent={features[9].accent} accentColor={features[9].accentColor} />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7c3aed]/4 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-[#14b8a6] uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-4xl font-extrabold tracking-tight">Up and running in three simple steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-[#7c3aed]/40 via-[#3b82f6]/40 to-[#14b8a6]/40" />

            {[
              {
                step: '01',
                title: 'Build Your AI Brand Assistant',
                desc: 'Give it your brand name, voice, and set what it should and shouldn\'t talk about. Think of it as setting up a digital version of your best sales rep.',
                color: '#7c3aed',
                bg: 'rgba(124,58,237,0.15)',
              },
              {
                step: '02',
                title: 'Feed It Your Product Knowledge',
                desc: 'Upload your product catalog, FAQs, size guides, ingredient lists, and brand story. Your AI learns from everything you\'ve already created.',
                color: '#3b82f6',
                bg: 'rgba(59,130,246,0.15)',
              },
              {
                step: '03',
                title: 'Embed on Your Store & Website',
                desc: 'Add it to your Shopify store, website, or WhatsApp in minutes. Your customers can start getting answers — and you start converting more sales.',
                color: '#14b8a6',
                bg: 'rgba(20,184,166,0.15)',
              },
            ].map((item) => (
              <div key={item.step} className="glass-elevated rounded-2xl p-8 border border-white/8 flex flex-col gap-5 card-hover">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-lg"
                  style={{ background: item.bg, color: item.color, border: `1px solid ${item.color}30` }}
                >
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES SECTION ── */}
      <section className="py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7c3aed]/4 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold text-[#a78bfa] uppercase tracking-[0.2em] mb-3">Use Cases</p>
            <h2 className="text-4xl font-extrabold tracking-tight leading-[1.1]">
              Built for D2C brands,<br />
              <span className="text-gradient">expanding to more</span>
            </h2>
            <p className="mt-4 text-white/55 max-w-xl mx-auto text-[15px] leading-relaxed">
              Starting with Shopify and D2C brands — where AI has the most immediate impact on revenue. Expanding to creators, coaches, and OTT platforms.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {[
              {
                emoji: '🛍️',
                label: 'D2C Brands on Shopify',
                color: '#ec4899',
                border: 'rgba(236,72,153,0.35)',
                bg: 'rgba(236,72,153,0.10)',
                badge: 'Primary Focus',
                badgeColor: '#ec4899',
                desc: 'Give every customer a personal shopping assistant that knows your products inside out. Answer questions, handle objections, and guide buyers from discovery to checkout — automatically.',
                examples: ['Product discovery & recommendations', 'Pre-purchase Q&A & objection handling', 'Post-purchase support & upsells', 'Cart abandonment recovery via WhatsApp'],
              },
              {
                emoji: '🌐',
                label: 'D2C Brand Websites',
                color: '#7c3aed',
                border: 'rgba(124,58,237,0.35)',
                bg: 'rgba(124,58,237,0.10)',
                badge: 'Primary Focus',
                badgeColor: '#7c3aed',
                desc: 'Embed your AI brand assistant on your website, landing pages, and product pages. Convert more visitors into buyers with instant, personalized responses — no live agent needed.',
                examples: ['Landing page conversion assistant', 'Product page Q&A widget', 'Brand story & values conversations', 'Lead capture & email list growth'],
              },
              {
                emoji: '🎓',
                label: 'Creators & Course Builders',
                color: '#3b82f6',
                border: 'rgba(59,130,246,0.20)',
                bg: 'rgba(59,130,246,0.05)',
                badge: 'Coming Soon',
                badgeColor: '#3b82f6',
                desc: 'Finance creators, course builders, and coaches who want to turn their expertise into an AI that engages their audience and monetizes their knowledge.',
                examples: ['Course Q&A & student support', 'Finance strategy explainers', 'Coaching intake & onboarding'],
              },
              {
                emoji: '📺',
                label: 'OTT & Streaming Platforms',
                color: '#14b8a6',
                border: 'rgba(20,184,166,0.20)',
                bg: 'rgba(20,184,166,0.05)',
                badge: 'Future Roadmap',
                badgeColor: '#14b8a6',
                desc: 'AI personas for streaming platforms — interactive characters, personalized content discovery, and viewer retention tools for OTT and media companies.',
                examples: ['Interactive content discovery', 'Character-based engagement', 'Viewer retention & recommendations'],
              },
            ].map((item) => (
              <div
                key={item.label}
                className="glass-elevated rounded-2xl p-6 border flex flex-col gap-4"
                style={{ borderColor: item.border, background: item.bg }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{item.emoji}</div>
                    <h3 className="font-bold text-white text-base" style={{ color: item.color }}>{item.label}</h3>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0"
                    style={{ color: item.badgeColor, borderColor: `${item.badgeColor}40`, background: `${item.badgeColor}12` }}
                  >
                    {item.badge}
                  </span>
                </div>
                <p className="text-[13px] text-white/60 leading-relaxed">{item.desc}</p>
                <ul className="flex flex-col gap-1.5">
                  {item.examples.map((ex) => (
                    <li key={ex} className="flex items-center gap-2 text-[12px] text-white/50">
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="6" fill="rgba(255,255,255,0.08)" />
                        <path d="M4.5 7l2 2 3-3" stroke={item.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white btn-primary text-sm shadow-[0_0_24px_rgba(124,58,237,0.35)] hover:shadow-[0_0_32px_rgba(124,58,237,0.5)]"
            >
              Start Building Your AI Brand Assistant →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative glass-elevated rounded-3xl border border-white/10 p-10 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/10 via-transparent to-[#3b82f6]/10 pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#7c3aed]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[#3b82f6]/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center gap-6">
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Ready to turn your store into<br />
                <span className="text-gradient">a conversion machine?</span>
              </h2>
              <p className="text-white/50 max-w-md text-base">
                Join D2C brands on Shopify and their websites using PersonaMatrix to answer customer questions, reduce returns, and drive more revenue — automatically.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/register"
                  className="px-8 py-3.5 rounded-xl font-semibold text-white btn-primary text-sm shadow-[0_0_32px_rgba(124,58,237,0.4)]"
                >
                  Get Started — free
                </Link>
                <Link
                  href="/pricing"
                  className="px-8 py-3.5 rounded-xl font-semibold text-white/70 border border-white/12 hover:border-white/25 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm"
                >
                  View Pricing
                </Link>
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
