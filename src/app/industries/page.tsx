'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

const industries = [
  {
    slug: 'creator-economy',
    name: 'Creator Economy',
    value: 'Turn your videos, knowledge, and expertise into an interactive AI persona that engages your audience 24/7, monetizes your content, and scales your personal brand.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
        <path d="M10 8l6 4-6 4V8z" />
      </svg>
    ),
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.12)',
    border: 'rgba(124,58,237,0.25)',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    value: 'Guide buyers through discovery, virtual tours, and qualification. Increase lead conversion and accelerate deal closure.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    color: '#14b8a6',
    bg: 'rgba(20,184,166,0.12)',
    border: 'rgba(20,184,166,0.25)',
  },
  {
    slug: 'education',
    name: 'Education',
    value: 'Enable students to interact with courses and receive instant guidance. Improve engagement and scale personalized learning.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.25)',
  },
];

const channels = [
  { label: 'WhatsApp AI', icon: '💬', desc: 'Deploy personas on WhatsApp Business' },
  { label: 'Voice AI (SIP)', icon: '📞', desc: 'Telephony-grade voice personas' },
  { label: 'Web Chat', icon: '🌐', desc: 'Embeddable JS widgets for any site' },
  { label: 'API Integrations', icon: '⚡', desc: 'REST APIs for custom deployments' },
  { label: 'Video Avatars', icon: '🎭', desc: 'Lifelike video persona responses' },
];

const differentiators = [
  {
    title: 'Video-first AI',
    desc: 'Deep understanding of video content — not just text. Personas trained on your video library.',
    icon: '🎬',
  },
  {
    title: 'Multi-channel deployment',
    desc: 'One persona, every channel. Web, WhatsApp, Voice, API — all from a single definition.',
    icon: '🔀',
  },
  {
    title: 'Persona memory',
    desc: 'Persistent context across sessions. Personas remember users, preferences, and history.',
    icon: '🧠',
  },
  {
    title: 'Enterprise-ready',
    desc: 'RBAC, multi-tenant, audit logs, and compliance controls built in from day one.',
    icon: '🏢',
  },
];

function IndustryCard({ industry, index }: { industry: typeof industries[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-2xl p-6 flex flex-col gap-4 cursor-pointer transition-all duration-300 border"
      style={{
        background: hovered ? industry.bg : 'rgba(255,255,255,0.03)',
        borderColor: hovered ? industry.border : 'rgba(255,255,255,0.08)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 16px 48px ${industry.bg}, 0 0 0 1px ${industry.border}` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
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
      {/* Coming Soon badge */}
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
        {/* Background orbs */}
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-15 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #7c3aed 0%, #3b82f6 50%, transparent 70%)',
            transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #14b8a6 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/60 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
              3 Industries · High-Impact Use Cases
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              AI Personas for{' '}
              <span className="bg-gradient-to-r from-[#7c3aed] via-[#3b82f6] to-[#14b8a6] bg-clip-text text-transparent">
                Every Industry
              </span>
            </h1>
            <p className="text-base sm:text-lg text-white/50 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto">
              AI Personas for high-impact industries — Creator Economy, Real Estate, and Education. Turn knowledge into interactive assistants that improve decisions, engagement, and revenue.
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
                Book Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section id="industries" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Industries</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Built for High-Impact Industries</h2>
          <p className="text-white/50 mt-3 max-w-xl">
            Focused on industries where knowledge complexity directly impacts revenue and customer decisions.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {industries.map((industry, i) => (
            <IndustryCard key={industry.slug} industry={industry} index={i} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">From knowledge to deployment</h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto">Three steps to a production-ready AI persona</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] opacity-30" />
            <div className="hidden md:block absolute top-12 left-2/3 right-0 h-px bg-gradient-to-r from-[#3b82f6] to-[#14b8a6] opacity-30" />

            {[
              {
                step: '01',
                title: 'Upload Knowledge',
                desc: 'Ingest videos, documents, and data.',
                color: '#7c3aed',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                ),
              },
              {
                step: '02',
                title: 'Create Persona',
                desc: 'Define behavior, memory, and domain responses.',
                color: '#3b82f6',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'Deploy Anywhere',
                desc: 'Chat, voice, WhatsApp, APIs, embedded widgets.',
                color: '#14b8a6',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                ),
              },
            ].map((step) => (
              <div
                key={step.step}
                className="relative rounded-2xl p-8 border border-white/8 bg-white/[0.02] flex flex-col gap-5"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${step.color}22`, color: step.color }}
                  >
                    {step.icon}
                  </div>
                  <span
                    className="text-4xl font-black opacity-10 leading-none"
                    style={{ color: step.color }}
                  >
                    {step.step}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Channels & Capabilities */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Channels</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Meet users where they are
              </h2>
              <p className="text-white/50 leading-relaxed mb-8">
                Deploy once and reach users across all channels without rebuilding workflows.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary"
              >
                Start Building
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {channels.map((ch) => (
                <div
                  key={ch.label}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/12 transition-all duration-200"
                >
                  <span className="text-2xl">{ch.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{ch.label}</p>
                    <p className="text-xs text-white/40">{ch.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Persona Matrix */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Differentiation</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Why Persona Matrix</h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto">
              Built for real-world deployments, not chatbot demos.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {differentiators.map((d) => (
              <div
                key={d.title}
                className="p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/12 transition-all duration-200 flex gap-5"
              >
                <span className="text-3xl flex-shrink-0">{d.icon}</span>
                <div>
                  <h3 className="font-semibold text-white mb-2">{d.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 border-t border-white/6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl blur-3xl opacity-20 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] pointer-events-none" />
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12 md:p-16">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Build Your First AI Persona
              </h2>
              <p className="text-white/50 text-base sm:text-lg mb-8 sm:mb-10 max-w-lg mx-auto">
                Start with high-impact use cases that drive real revenue.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/register"
                  className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-white text-sm btn-primary w-full sm:w-auto text-center"
                >
                  Start Free
                </Link>
                <Link
                  href="/register"
                  className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-sm text-white/70 border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200 w-full sm:w-auto text-center"
                >
                  Book Demo
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
