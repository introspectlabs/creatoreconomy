'use client';
import React from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

const steps = [
  {
    number: '01',
    title: 'Create Your Persona',
    description:
      'Name your AI sales persona, choose a type (Shopping Assistant or Founder Persona), and set the tone — friendly, expert, or premium. Takes under 2 minutes.',
    details: [
      'Choose a persona name and type',
      'Set tone: friendly, expert, or premium',
      'Define your brand voice and guardrails',
      'Preview how your persona will respond',
    ],
    accentColor: '#7c3aed',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Connect Store / Upload Content',
    description:
      'Auto-sync your Shopify catalog with one click, or upload PDFs, product guides, and FAQs. Your AI learns your entire inventory and brand knowledge instantly.',
    details: [
      'One-click Shopify product catalog sync',
      'Upload PDFs, product guides, FAQs',
      'Add videos and brand content (optional)',
      'AI learns and stays up to date automatically',
    ],
    accentColor: '#0ea5e9',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Deploy & Convert',
    description:
      'Embed your AI persona on your website or Shopify store with a single JS snippet. Your AI salesperson starts engaging visitors, recommending products, and driving conversions 24/7.',
    details: [
      'Copy-paste JS snippet onto your site',
      'Install Shopify plugin in one click',
      'Enable WhatsApp channel (optional)',
      'Watch conversations and conversions roll in',
    ],
    accentColor: '#14b8a6',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

const features = [
  {
    title: 'Shopify-Native Sync',
    description: 'Your AI automatically knows every product, variant, price, and stock level — always current.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    color: '#14b8a6',
  },
  {
    title: 'Product Cards in Chat',
    description: 'Your AI surfaces product cards with images, prices, and Buy Now buttons directly inside the conversation.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    color: '#7c3aed',
  },
  {
    title: 'Multi-Channel Deploy',
    description: 'Deploy on your website and WhatsApp Business simultaneously — meet customers wherever they are.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
      </svg>
    ),
    color: '#0ea5e9',
  },
  {
    title: 'Conversion Tracking',
    description: 'See which conversations led to purchases. Track top questions, engagement rates, and conversion proxies.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    color: '#34d399',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#07090f] text-white">
      <PublicHeader />
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#7c3aed]/10 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 text-[#a78bfa] text-xs font-medium mb-6">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
            </svg>
            3 Steps to Your AI Salesperson
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            From zero to deployed{' '}
            <span className="bg-gradient-to-r from-[#a78bfa] via-[#14b8a6] to-[#34d399] bg-clip-text text-transparent">
              in under 3 minutes
            </span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed mb-8">
            PersonaMatrix is built for D2C brands that want to engage visitors instantly and increase conversion with AI personas — without any technical setup.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/guest-chat" className="px-6 py-3 rounded-xl text-sm font-semibold border border-white/15 text-white hover:bg-white/8 transition-all">
              Try Demo
            </Link>
            <Link href="/register" className="px-6 py-3 rounded-xl text-sm font-semibold text-white btn-primary">
              Get Started →
            </Link>
          </div>
        </div>
      </section>
      {/* Steps */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-6">
            {steps?.map((step, index) => (
              <div
                key={step?.number}
                className="relative group flex flex-col md:flex-row gap-6 p-8 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${step?.accentColor}80, transparent)` }}
                />

                {/* Icon + Number */}
                <div className="flex-shrink-0 flex flex-col items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: `${step?.accentColor}20`, border: `1px solid ${step?.accentColor}30` }}
                  >
                    {step?.icon}
                  </div>
                  {index < steps?.length - 1 && (
                    <div
                      className="hidden md:block w-px flex-1 min-h-[2rem] opacity-20"
                      style={{ background: `linear-gradient(to bottom, ${step?.accentColor}, transparent)` }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-4xl font-black opacity-15"
                      style={{ color: step?.accentColor }}
                    >
                      {step?.number}
                    </span>
                    <h2 className="text-xl font-bold text-white">{step?.title}</h2>
                  </div>
                  <p className="text-white/55 leading-relaxed mb-4">{step?.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {step?.details?.map((detail) => (
                      <li key={detail} className="flex items-start gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5" style={{ color: step?.accentColor }}>
                          <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                        <span className="text-sm text-white/55">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Features grid */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            Everything included in every step
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features?.map((f) => (
              <div
                key={f?.title}
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-white/15 transition-all duration-200"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${f?.color}20` }}
                >
                  {f?.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1">{f?.title}</h3>
                  <p className="text-xs text-white/45 leading-relaxed">{f?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="rounded-2xl border border-white/10 p-10"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(20,184,166,0.08) 100%)' }}
          >
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to deploy your AI salesperson?
            </h2>
            <p className="text-white/50 text-sm mb-6">
              Turn content into revenue. Engage visitors instantly. Increase conversion with AI personas.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/guest-chat" className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/15 text-white hover:bg-white/8 transition-all">
                Try Demo
              </Link>
              <Link href="/register" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}
