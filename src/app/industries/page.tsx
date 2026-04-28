'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

const industries = [
  {
    slug: 'd2c-commerce',
    name: 'D2C Brands & E-commerce',
    value: 'Deploy an AI Sales Agent that knows your entire product catalog, handles objections, recommends the right product, and drives customers from discovery to checkout — 24/7, on every channel.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    color: '#10b981',
    bg: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.25)',
    badge: 'Primary Focus',
  },
  {
    slug: 'finance-trading',
    name: 'Finance & Trading Creators',
    value: 'Let your followers ask about your trading strategies, market analysis, and investment frameworks — your AI answers in your voice, 24/7. Monetize your knowledge without being glued to DMs.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.12)',
    border: 'rgba(59,130,246,0.25)',
    badge: null,
  },
  {
    slug: 'education-courses',
    name: 'Education & Course Creators',
    value: 'Turn your course content into an interactive AI tutor. Students get instant answers from your lessons, you reduce support load, and your content sells itself through conversations.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.12)',
    border: 'rgba(168,85,247,0.25)',
    badge: null,
  },
  {
    slug: 'coaches',
    name: 'Coaches & Service Businesses',
    value: 'Scale your coaching without burning out. Your AI handles intake questions, shares your frameworks, and keeps clients engaged between sessions — so you can focus on high-value work.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.25)',
    badge: null,
  },
];

const comingSoonIndustries = [
  {
    slug: 'ott-streaming',
    name: 'OTT & Streaming Platforms',
    value: 'The same AI engine that powers D2C sales will power interactive character experiences — chat with characters, discover outfits, and shop inspired looks from your favorite shows.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    color: '#14b8a6',
    bg: 'rgba(20,184,166,0.12)',
    border: 'rgba(20,184,166,0.25)',
  },
];

const channels = [
  { label: 'Web Chat', icon: '🌐', desc: 'Embeddable widget for your Shopify or website' },
  { label: 'WhatsApp AI', icon: '💬', desc: 'Meet customers on WhatsApp Business' },
  { label: 'Voice AI', icon: '📞', desc: 'Telephony-grade voice sales agent' },
  { label: 'API Integrations', icon: '⚡', desc: 'REST APIs for custom deployments' },
  { label: 'Shopify Plugin', icon: '🛍️', desc: 'Native Shopify storefront integration' },
];

const differentiators = [
  {
    title: 'Not a chatbot',
    desc: 'Deep product catalog understanding — knows every SKU, variant, and use case. Recommends like your best sales rep.',
    icon: '🎯',
  },
  {
    title: 'Multimodal understanding',
    desc: 'Ingests product videos, images, PDFs, and FAQs. Answers questions that static pages can\'t.',
    icon: '🎬',
  },
  {
    title: 'Conversion-first design',
    desc: 'Every response is engineered to move customers toward purchase — not just answer questions.',
    icon: '📈',
  },
  {
    title: 'Multi-channel deployment',
    desc: 'One AI agent, every channel. Web, WhatsApp, Voice — all from a single knowledge base.',
    icon: '🔀',
  },
];

function IndustryCard({ industry, index }: { industry: typeof industries[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-2xl p-6 flex flex-col gap-4 cursor-pointer transition-all duration-300 border"
      style={{
        background: hovered ? industry.bg : 'rgba(255,255,255,0.03)',
        borderColor: hovered ? industry.border : index === 0 ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.08)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 16px 48px ${industry.bg}, 0 0 0 1px ${industry.border}` : index === 0 ? '0 0 32px rgba(16,185,129,0.08)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {industry.badge && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981]">
            <span className="w-1 h-1 rounded-full bg-[#10b981] animate-pulse" />
            {industry.badge}
          </span>
        </div>
      )}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
        style={{ background: industry.bg, color: industry.color }}
      >
        {industry.icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-white text-base mb-1">{industry.name}</h3>
        <p className="text-sm text-white/50 leading-relaxed">{industry.value}</p>
      </div>
      <Link
        href={`/industries/${industry.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200"
        style={{ color: industry.color }}
      >
        View Use Cases
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}

function ComingSoonCard({ industry }: { industry: typeof comingSoonIndustries[0] }) {
  return (
    <div
      className="relative rounded-2xl p-6 flex flex-col gap-4 border overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.02)',
        borderColor: 'rgba(255,255,255,0.06)',
      }}
    >
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/5 border border-white/10 text-white/40">
          <span className="w-1 h-1 rounded-full bg-white/30" />
          Coming Soon
        </span>
      </div>

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center opacity-40"
        style={{ background: `${industry.color}18`, color: industry.color }}
      >
        {industry.icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-white/40 text-base mb-1">{industry.name}</h3>
        <p className="text-sm text-white/25 leading-relaxed">{industry.value}</p>
      </div>
      <div className="inline-flex items-center gap-1.5 text-sm font-medium text-white/20 cursor-default select-none">
        View Use Cases
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

export default function IndustriesPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0c12] text-white">
      <PublicHeader />

      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-15 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #10b981 0%, #3b82f6 50%, transparent 70%)',
            transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 text-xs text-[#10b981] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              AI Sales Agent for D2C Brands
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Turn Every Visitor Into{' '}
              <span className="bg-gradient-to-r from-[#10b981] via-[#3b82f6] to-[#7c3aed] bg-clip-text text-transparent">
                a Paying Customer
              </span>
            </h1>
            <p className="text-base sm:text-lg text-white/50 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto">
              Deploy an AI Sales Agent that knows your products inside out — answers questions, handles objections, and drives conversions 24/7. Built for D2C brands, with expansion into OTT and media on the roadmap.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#industries"
                className="px-6 py-3 rounded-xl font-semibold text-white text-sm btn-primary w-full sm:w-auto text-center"
              >
                Explore Use Cases
              </a>
              <Link
                href="/register"
                className="px-6 py-3 rounded-xl font-semibold text-sm text-white/70 border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200 w-full sm:w-auto text-center"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section id="industries" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Use Cases</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">One platform, multiple verticals</h2>
          <p className="text-white/50 mt-3 max-w-xl">
            D2C commerce is our primary focus. Finance, education, and coaching verticals are also supported — each with AI agents built for their specific conversion goals.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {industries.map((industry, i) => (
            <IndustryCard key={industry.slug} industry={industry} index={i} />
          ))}
        </div>

        {/* Coming Soon */}
        {comingSoonIndustries.length > 0 && (
          <div className="mt-8">
            <p className="text-xs font-semibold text-white/20 uppercase tracking-widest mb-4">Platform Roadmap</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {comingSoonIndustries.map((industry) => (
                <ComingSoonCard key={industry.slug} industry={industry} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">From product catalog to live AI agent</h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto">Four steps to deploy your AI Sales Agent and start converting</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-3/4 h-px bg-gradient-to-r from-[#10b981] to-[#3b82f6] opacity-30" style={{ left: '25%', right: '50%' }} />
            <div className="hidden md:block absolute top-12 h-px bg-gradient-to-r from-[#3b82f6] to-[#7c3aed] opacity-30" style={{ left: '50%', right: '25%' }} />

            {[
              {
                num: '01',
                title: 'Connect Your Store',
                desc: 'Connect Shopify or upload your product catalog, videos, and FAQs. Setup takes minutes.',
                color: '#10b981',
              },
              {
                num: '02',
                title: 'AI Learns Your Products',
                desc: 'The AI ingests your entire catalog — every SKU, variant, use case, and selling point.',
                color: '#3b82f6',
              },
              {
                num: '03',
                title: 'Deploy Your Agent',
                desc: 'Embed on your website, connect to WhatsApp, or go live on any channel in one click.',
                color: '#7c3aed',
              },
              {
                num: '04',
                title: 'Conversions Increase',
                desc: 'Customers get instant answers, get guided to the right product, and complete purchases.',
                color: '#f59e0b',
              },
            ].map((step) => (
              <div
                key={step.num}
                className="relative rounded-2xl p-8 border border-white/8 bg-white/[0.02] flex flex-col gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-lg"
                  style={{ background: `${step.color}20`, color: step.color, border: `1px solid ${step.color}30` }}
                >
                  {step.num}
                </div>
                <h3 className="font-semibold text-white text-base">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why PersonaMatrix */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Differentiation</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Not a chatbot. An AI Sales Agent.</h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto">Built for commerce. Deep product understanding. Every response engineered to convert.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {differentiators.map((d) => (
              <div key={d.title} className="rounded-2xl p-6 border border-white/8 bg-white/[0.02] flex flex-col gap-3">
                <div className="text-2xl">{d.icon}</div>
                <h3 className="font-semibold text-white text-sm">{d.title}</h3>
                <p className="text-xs text-white/45 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Channels</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Sell where your customers are</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {channels.map((ch) => (
              <div key={ch.label} className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/8 bg-white/[0.02]">
                <span className="text-xl">{ch.icon}</span>
                <div>
                  <p className="text-sm font-medium text-white">{ch.label}</p>
                  <p className="text-xs text-white/40">{ch.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to deploy your AI Sales Agent?</h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            Join D2C brands already using PersonaMatrix to increase conversions, reduce support costs, and grow average order value.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="px-6 py-3 rounded-xl font-semibold text-white text-sm btn-primary">
              Book a Demo
            </Link>
            <Link href="/pricing" className="px-6 py-3 rounded-xl font-semibold text-sm text-white/70 border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
