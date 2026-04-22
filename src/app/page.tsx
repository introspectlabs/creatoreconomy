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
      style={
        {
          '--accent-color': accentColor,
        } as React.CSSProperties
      }
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${accentColor}18 0%, transparent 65%)`,
        }}
      />
      {/* Top edge accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}80, transparent)`,
        }}
      />

      <div
        className="relative w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg"
        style={{
          background: accent,
          boxShadow: `0 0 0 0 ${accentColor}00`,
        }}
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
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 10h2M11 10h6" strokeDasharray="2 2" />
      </svg>
    ),
    title: 'Cloud-Agnostic Multi-Model AI',
    desc: 'Run AI workloads across any cloud or on-premise using multiple LLMs and models—optimized for performance, cost, and flexibility.',
    accent: 'rgba(124,58,237,0.25)',
    accentColor: '#7c3aed',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    title: 'Video-First Deep RAG Engine',
    desc: 'Transform videos, documents, and media into searchable, conversational intelligence with ultra-deep retrieval across frames and context.',
    accent: 'rgba(239,68,68,0.25)',
    accentColor: '#ef4444',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: 'AI Personas with Memory & Context',
    desc: 'Create persistent, intelligent personas that understand users, retain context, and deliver personalized interactions over time.',
    accent: 'rgba(59,130,246,0.25)',
    accentColor: '#3b82f6',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
      </svg>
    ),
    title: 'Omnichannel AI Deployment',
    desc: 'Deploy personas across WhatsApp, voice (SIP), web chat, APIs, and video—ensuring consistent experiences across all touchpoints.',
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
    title: 'Embeddable AI via JS SDK',
    desc: 'Integrate AI personas into any website or application using lightweight JavaScript plugins with secure, domain-restricted access.',
    accent: 'rgba(124,58,237,0.25)',
    accentColor: '#7c3aed',
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
    title: 'Real-Time Voice & Avatar AI',
    desc: 'Enable human-like interactions using speech-to-speech AI, voice synthesis, and avatar-based conversations powered by external services.',
    accent: 'rgba(245,158,11,0.25)',
    accentColor: '#f59e0b',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Enterprise-Grade RBAC & Multi-Tenancy',
    desc: 'Securely manage teams, roles, and permissions with full organization-level control and isolation across tenants.',
    accent: 'rgba(16,185,129,0.25)',
    accentColor: '#10b981',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: 'Extensible AI Integrations Layer',
    desc: 'Seamlessly connect with AI providers like Heygen, Tavus, Omnidimension, and ElevenLabs through a unified integration layer.',
    accent: 'rgba(59,130,246,0.25)',
    accentColor: '#3b82f6',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    title: 'Scalable Knowledge Ingestion Pipeline',
    desc: 'Ingest and process large-scale content (PDFs, videos, audio, web) with automated parsing, chunking, and indexing pipelines.',
    accent: 'rgba(239,68,68,0.25)',
    accentColor: '#ef4444',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: 'Analytics & Usage Intelligence',
    desc: 'Track persona performance, user interactions, and channel activity with actionable insights and real-time metrics.',
    accent: 'rgba(20,184,166,0.25)',
    accentColor: '#14b8a6',
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
        {/* Background orbs */}
        <AnimatedGradientOrb className="w-[600px] h-[600px] bg-[#7c3aed] -top-32 -left-32" />
        <AnimatedGradientOrb className="w-[400px] h-[400px] bg-[#3b82f6] bottom-0 right-0" />
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(124,58,237,0.06), transparent 60%)`,
          }}
        />

        {/* Grid overlay */}
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
              Transform Content into{' '}
              <span className="text-gradient">Interactive AI Personas</span>
            </h1>

            <p className="text-lg text-white/55 leading-relaxed max-w-xl">
              Build, deploy, and scale AI personas across chat, SIP trunking, WhatsApp, voice, avatars, and APIs—grounded in your knowledge and ready to run everywhere.
            </p>

            <div className="px-4 py-3 rounded-xl border border-[#7c3aed]/40 bg-[#7c3aed]/10 backdrop-blur-sm">
              <p className="text-sm text-[#c4b5fd] leading-relaxed font-medium">
                PersonaMatrix is a <span className="text-white font-semibold">video-first, multimodal AI platform</span> that transforms content into <span className="text-white font-semibold">interactive, memory-driven personas</span> with <span className="text-white font-semibold">causal reasoning</span>.
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
                View Demo →
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-2">
              {['No credit card', 'Deploy in minutes', 'SOC 2 ready'].map((t) => (
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
              {/* Glow behind card */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#7c3aed]/20 to-[#3b82f6]/10 blur-2xl scale-105" />
              <div className="relative glass-elevated rounded-3xl border border-white/10 overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
                {/* Fake topbar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="ml-3 flex-1 h-5 rounded-md bg-white/5 text-[10px] text-white/25 flex items-center px-2">
                    personamatrix.ai/chat/aria
                  </div>
                </div>
                {/* Chat preview */}
                <div className="p-5 flex flex-col gap-3 min-h-[280px]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] flex items-center justify-center text-xs font-bold shrink-0">A</div>
                    <div className="glass rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-white/80 max-w-[80%]">
                      Hi! I'm Aria, your AI product specialist. How can I help you today?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-[#7c3aed]/20 border border-[#7c3aed]/30 rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-white/80 max-w-[80%]">
                      What's included in the Pro plan?
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] flex items-center justify-center text-xs font-bold shrink-0">A</div>
                    <div className="glass rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-white/80 max-w-[80%]">
                      Pro includes unlimited personas, all channels (WhatsApp, SIP, API), embeds, and priority support. Want me to walk you through setup?
                    </div>
                  </div>
                  {/* Typing indicator */}
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
                    <span className="text-[11px] text-white/25">Aria is typing…</span>
                  </div>
                </div>
                {/* Input bar */}
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-2 glass rounded-xl px-4 py-2.5 border border-white/8">
                    <span className="text-sm text-white/25 flex-1">Ask Aria anything…</span>
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] flex items-center justify-center">
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

      {/* ── FEATURES BENTO ── */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold text-[#a78bfa] uppercase tracking-[0.2em] mb-3">Platform Capabilities</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">
              Everything you need to ship{' '}
              <span className="text-gradient">AI personas</span>
            </h2>
            <p className="mt-4 text-white/60 max-w-lg mx-auto text-[15px] leading-relaxed">
              From knowledge ingestion to omnichannel deployment — the full stack, in one platform.
            </p>
          </div>

          {/* Bento grid — asymmetric with connecting lines */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* SVG connecting lines overlay — visible on lg screens */}
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
              {/* Horizontal connector: card 0 (col-span-2) → card 1 */}
              <line
                x1="66.7%"
                y1="25%"
                x2="100%"
                y2="25%"
                stroke="url(#line-grad-1)"
                strokeWidth="1"
                strokeDasharray="4 6"
                filter="url(#glow)"
              />
              {/* Vertical connector: card 1 → card 4 */}
              <line
                x1="83.3%"
                y1="50%"
                x2="83.3%"
                y2="75%"
                stroke="url(#line-grad-2)"
                strokeWidth="1"
                strokeDasharray="4 6"
                filter="url(#glow)"
              />
              {/* Horizontal connector: card 2 → card 3 (col-span-2) */}
              <line
                x1="0%"
                y1="75%"
                x2="33.3%"
                y2="75%"
                stroke="url(#line-grad-3)"
                strokeWidth="1"
                strokeDasharray="4 6"
                filter="url(#glow)"
              />
              {/* Dot nodes at connection points */}
              <circle cx="66.7%" cy="25%" r="3" fill="#7c3aed" opacity="0.6" filter="url(#glow)" />
              <circle cx="100%" cy="25%" r="3" fill="#3b82f6" opacity="0.6" filter="url(#glow)" />
              <circle cx="83.3%" cy="75%" r="3" fill="#3b82f6" opacity="0.6" filter="url(#glow)" />
              <circle cx="0%" cy="75%" r="3" fill="#7c3aed" opacity="0.6" filter="url(#glow)" />
              <circle cx="33.3%" cy="75%" r="3" fill="#7c3aed" opacity="0.6" filter="url(#glow)" />
            </svg>

            <FeatureCard
              className="lg:col-span-2 lg:row-span-1"
              icon={features[0].icon}
              title={features[0].title}
              desc={features[0].desc}
              accent={features[0].accent}
              accentColor={features[0].accentColor}
            />
            <FeatureCard
              icon={features[1].icon}
              title={features[1].title}
              desc={features[1].desc}
              accent={features[1].accent}
              accentColor={features[1].accentColor}
            />
            <FeatureCard
              icon={features[2].icon}
              title={features[2].title}
              desc={features[2].desc}
              accent={features[2].accent}
              accentColor={features[2].accentColor}
            />
            <FeatureCard
              className="lg:col-span-2"
              icon={features[3].icon}
              title={features[3].title}
              desc={features[3].desc}
              accent={features[3].accent}
              accentColor={features[3].accentColor}
            />
            <FeatureCard
              icon={features[4].icon}
              title={features[4].title}
              desc={features[4].desc}
              accent={features[4].accent}
              accentColor={features[4].accentColor}
            />
            <FeatureCard
              icon={features[5].icon}
              title={features[5].title}
              desc={features[5].desc}
              accent={features[5].accent}
              accentColor={features[5].accentColor}
            />
            <FeatureCard
              icon={features[6].icon}
              title={features[6].title}
              desc={features[6].desc}
              accent={features[6].accent}
              accentColor={features[6].accentColor}
            />
            <FeatureCard
              icon={features[7].icon}
              title={features[7].title}
              desc={features[7].desc}
              accent={features[7].accent}
              accentColor={features[7].accentColor}
            />
            <FeatureCard
              icon={features[8].icon}
              title={features[8].title}
              desc={features[8].desc}
              accent={features[8].accent}
              accentColor={features[8].accentColor}
            />
            <FeatureCard
              icon={features[9].icon}
              title={features[9].title}
              desc={features[9].desc}
              accent={features[9].accent}
              accentColor={features[9].accentColor}
            />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7c3aed]/4 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-[#14b8a6] uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-4xl font-extrabold tracking-tight">From idea to deployed in three steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-[#7c3aed]/40 via-[#3b82f6]/40 to-[#14b8a6]/40" />

            {[
              {
                step: '01',
                title: 'Create Persona',
                desc: 'Define your AI persona — name, personality, system prompt, and behavioral guardrails.',
                color: '#7c3aed',
                bg: 'rgba(124,58,237,0.15)',
              },
              {
                step: '02',
                title: 'Attach Knowledge',
                desc: 'Upload PDFs, videos, URLs, or connect live data sources. Your persona learns from your content.',
                color: '#3b82f6',
                bg: 'rgba(59,130,246,0.15)',
              },
              {
                step: '03',
                title: 'Deploy Anywhere',
                desc: 'Publish to WhatsApp, embed on your site, expose via REST API, or launch a video avatar.',
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

      {/* ── CTA SECTION ── */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative glass-elevated rounded-3xl border border-white/10 p-10 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/10 via-transparent to-[#3b82f6]/10 pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#7c3aed]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[#3b82f6]/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center gap-6">
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Start building your<br />
                <span className="text-gradient">AI Persona today</span>
              </h2>
              <p className="text-white/50 max-w-md text-base">
                Join thousands of creators and enterprises already using PersonaMatrix to automate conversations at scale.
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
