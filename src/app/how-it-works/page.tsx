'use client';
import React from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

interface Step {
  number: string;
  title: string;
  description: string;
  details: string[];
  accentColor: string;
  icon: React.ReactNode;
}

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Connect Your Store & Upload Content',
    description:
      'Connect your Shopify store or upload your product catalog, videos, FAQs, and brand documents. Setup takes minutes — no technical skills required.',
    details: [
      'Connect Shopify or upload product CSV/JSON',
      'Import product videos and demo content',
      'Add FAQs, return policies, and brand docs',
      'Sync Google Sheets for custom product feeds',
    ],
    accentColor: '#10b981',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'AI Learns Your Products & Brand',
    description:
      'The AI ingests your entire catalog — every SKU, variant, use case, and selling point. It understands your brand voice and learns how to answer like your best sales rep.',
    details: [
      'Deep product catalog understanding',
      'Multimodal ingestion: video, text, images',
      'Brand voice and tone configuration',
      'Objection handling from your FAQs',
    ],
    accentColor: '#3b82f6',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Deploy Your AI Sales Agent',
    description:
      'Go live on your website, Shopify storefront, WhatsApp, or any channel with one click. Embed a branded chat widget or use our API for full control.',
    details: [
      'Embeddable JS widget for any website',
      'Native Shopify plugin integration',
      'WhatsApp Business API deployment',
      'REST API for custom integrations',
    ],
    accentColor: '#7c3aed',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Customers Interact & Convert',
    description:
      'Customers ask questions, get personalized recommendations, and complete purchases — guided by your AI agent every step of the way, 24/7.',
    details: [
      'Instant answers to pre-purchase questions',
      'Personalized product recommendations',
      'Upsell and cross-sell automation',
      'Cart recovery and checkout guidance',
    ],
    accentColor: '#f59e0b',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Measure ROI & Optimize',
    description:
      'Track conversion rates, revenue influenced, support tickets deflected, and AOV lift. Continuously improve your agent with new content and A/B testing.',
    details: [
      'Conversion rate and revenue attribution',
      'Support ticket deflection metrics',
      'Average order value tracking',
      'Conversation analytics and optimization',
    ],
    accentColor: '#ec4899',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

const forBrands: Feature[] = [
  {
    title: 'Conversion-Driven Recommendations',
    description: 'Every response is engineered to guide customers toward the right product and complete the purchase — not just answer questions.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: 'Multimodal Product Understanding',
    description: 'Ingests product videos, images, PDFs, and web pages. Answers questions that static product pages simply cannot.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'Personalization with Memory',
    description: 'Remembers customer preferences and past interactions across sessions. Every conversation feels personal.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: 'Multi-Channel Deployment',
    description: 'One AI agent, every channel. Web, WhatsApp, Voice, API — all from a single product knowledge base.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

const roiMetrics: Feature[] = [
  {
    title: 'Increase Conversion Rate',
    description: 'Customers who chat with the AI agent convert at 3–5× the rate of those who don\'t. Instant answers eliminate drop-off.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    title: 'Reduce Support Costs',
    description: 'Deflect 60–80% of pre-purchase support tickets automatically. Your team focuses on complex issues only.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: 'Increase Average Order Value',
    description: 'Intelligent upsell and cross-sell recommendations increase AOV by 15–25% on average.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    title: 'Recover Abandoned Carts',
    description: 'Proactively re-engage customers who left without purchasing. AI-driven cart recovery that feels personal, not spammy.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#07090f] text-white">
      <PublicHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#10b981]/8 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 text-[#10b981] text-xs font-medium mb-6">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
            </svg>
            5-Step Process
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            How Your{' '}
            <span className="bg-gradient-to-r from-[#10b981] via-[#3b82f6] to-[#7c3aed] bg-clip-text text-transparent">
              AI Sales Agent
            </span>{' '}
            Works
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            From connecting your store to watching conversions climb — understand the complete journey of deploying an AI Sales Agent for your D2C brand.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative group flex flex-col md:flex-row gap-6 p-8 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute left-[3.75rem] top-full w-px h-8 opacity-20"
                    style={{ background: `linear-gradient(to bottom, ${step.accentColor}, transparent)` }}
                  />
                )}

                {/* Step number + icon */}
                <div className="flex-shrink-0 flex flex-col items-center gap-3">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                    style={{ background: `${step.accentColor}20`, border: `1px solid ${step.accentColor}40` }}
                  >
                    {step.icon}
                  </div>
                  <span
                    className="text-xs font-bold tracking-widest opacity-40"
                    style={{ color: step.accentColor }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{step.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/40">
                        <svg
                          className="flex-shrink-0 mt-0.5"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={step.accentColor}
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Brands & ROI */}
      <section className="px-6 pb-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto pt-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for D2C Commerce</h2>
            <p className="text-white/45 text-base max-w-xl mx-auto">
              Every feature is designed to increase revenue, reduce costs, and deliver measurable ROI for your brand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Capabilities */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#10b981]/20 border border-[#10b981]/30 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">Agent Capabilities</h3>
              </div>
              <div className="flex flex-col gap-4">
                {forBrands.map((f, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border border-white/6 bg-white/[0.02] hover:border-white/12 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-[#10b981]/15 flex items-center justify-center flex-shrink-0">
                      {f.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">{f.title}</p>
                      <p className="text-xs text-white/40 leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROI */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/20 border border-[#3b82f6]/30 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">Measurable ROI</h3>
              </div>
              <div className="flex flex-col gap-4">
                {roiMetrics.map((f, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border border-white/6 bg-white/[0.02] hover:border-white/12 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-[#3b82f6]/15 flex items-center justify-center flex-shrink-0">
                      {f.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">{f.title}</p>
                      <p className="text-xs text-white/40 leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-10 rounded-3xl border border-[#10b981]/20 bg-gradient-to-b from-[#10b981]/10 to-transparent">
            <h2 className="text-3xl font-bold mb-4">Ready to Deploy Your AI Sales Agent?</h2>
            <p className="text-white/45 mb-8 text-base">
              Join D2C brands already using PersonaMatrix to increase conversions and reduce support costs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="px-8 py-3 rounded-xl text-sm font-semibold text-white btn-primary"
              >
                Book a Demo
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-3 rounded-xl text-sm font-semibold text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
