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
    title: 'Set Up Your AI Brand Assistant',
    description:
      'Create your account, configure your AI brand assistant with your brand name, voice, and product focus. No technical skills required — live in minutes.',
    details: [
      'Create an account and set up your brand profile',
      'Configure your AI\'s tone, style, and response behavior',
      'Set guardrails on what your AI can and cannot say',
      'Define your product categories and brand positioning',
    ],
    accentColor: '#ec4899',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Upload Your Product Knowledge',
    description:
      'Feed your AI with your product catalog, FAQs, size guides, ingredient lists, brand story, and any content that helps customers make purchase decisions.',
    details: [
      'Upload product descriptions, specs, and FAQs',
      'Add size guides, ingredient lists, and how-to content',
      'Import your brand story, values, and differentiators',
      'Add web pages, blog posts, and landing pages via URL',
    ],
    accentColor: '#7c3aed',
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
    title: 'Embed on Your Shopify Store & Website',
    description:
      'Deploy your AI brand assistant on your Shopify store, website, or WhatsApp with a simple embed. Your customers can start getting answers — and you start converting more sales.',
    details: [
      'Add the JS widget to your Shopify store in one click',
      'Embed on product pages, cart, and landing pages',
      'Connect to WhatsApp Business for post-purchase support',
      'Test your AI\'s responses before going live',
    ],
    accentColor: '#0ea5e9',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Customers Engage & Convert',
    description:
      'Shoppers ask questions, get instant personalized answers, and are guided to the right product — reducing cart abandonment and support tickets while increasing conversions.',
    details: [
      'Customers get instant answers on product pages',
      'AI handles objections and recommends the right product',
      'Upsell and cross-sell happen naturally in conversation',
      'Post-purchase support reduces returns and tickets',
    ],
    accentColor: '#10b981',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Optimize & Scale Revenue',
    description:
      'Track what customers ask, which questions lead to purchases, and where buyers drop off. Use insights to improve your store copy and AI responses — continuously increasing conversions.',
    details: [
      'See exactly what questions customers ask before buying',
      'Identify which products get the most objections',
      'Track conversion rates from AI conversations',
      'Continuously improve your AI with new product knowledge',
    ],
    accentColor: '#f59e0b',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

const forCreators: Feature[] = [
  {
    title: 'Shopify & Website Embed',
    description: 'Drop your AI brand assistant onto your Shopify store or any website with a single line of code. Works on product pages, cart, and landing pages.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Product Catalog Training',
    description: 'Your AI learns from your entire product catalog — descriptions, specs, FAQs, size guides, and brand story — and keeps getting smarter as you add more.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    title: 'Brand-Safe AI',
    description: 'Set guardrails on what your AI can and cannot say. Your brand tone, product claims, and messaging stay consistent across every customer conversation.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Conversion Analytics',
    description: 'Track what customers ask, which questions lead to purchases, and where buyers drop off — so you can optimize your store and AI responses.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

const forAudiences: Feature[] = [
  {
    title: 'Instant Product Answers',
    description: 'Shoppers get instant, accurate answers about products — ingredients, sizing, compatibility, and use cases — without waiting for a support agent.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    title: 'Personalized Recommendations',
    description: 'The AI asks the right questions and recommends the perfect product for each customer\'s specific needs — reducing returns and increasing satisfaction.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: 'Always Available Support',
    description: 'Get help with orders, returns, and product questions 24/7 — on the website, WhatsApp, or voice — without waiting for business hours.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    title: 'Confident Purchase Decisions',
    description: 'Customers buy with confidence when all their questions are answered. The AI handles objections and provides the social proof needed to convert.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ec4899]/30 bg-[#ec4899]/10 text-[#f9a8d4] text-xs font-medium mb-6">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
            </svg>
            Simple 5-Step Process
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            How{' '}
            <span className="bg-gradient-to-r from-[#ec4899] via-[#7c3aed] to-[#3b82f6] bg-clip-text text-transparent">
              PersonaMatrix
            </span>{' '}
            Works for D2C Brands
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            From setting up your AI brand assistant to converting more customers — understand the complete journey of how D2C brands on Shopify deploy AI to drive revenue.
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

      {/* For Creators & Audiences */}
      <section className="px-6 pb-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto pt-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for D2C Brands & Their Customers</h2>
            <p className="text-white/45 text-base max-w-xl mx-auto">
              Whether you're a D2C brand deploying AI or a customer getting instant answers — PersonaMatrix has you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* For Brands */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#ec4899]/20 border border-[#ec4899]/30 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f9a8d4" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">For D2C Brands</h3>
              </div>
              <div className="flex flex-col gap-4">
                {forCreators.map((f, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border border-white/6 bg-white/[0.02] hover:border-white/12 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-[#ec4899]/15 flex items-center justify-center flex-shrink-0">
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

            {/* For Customers */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">For Customers</h3>
              </div>
              <div className="flex flex-col gap-4">
                {forAudiences.map((f, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border border-white/6 bg-white/[0.02] hover:border-white/12 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-sky-500/15 flex items-center justify-center flex-shrink-0">
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
          <div className="p-10 rounded-3xl border border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-transparent">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-white/45 mb-8 text-base">
              Join D2C brands on Shopify already using PersonaMatrix to answer customer questions, reduce returns, and drive more revenue — automatically.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="px-8 py-3 rounded-xl text-sm font-semibold text-white btn-primary"
              >
                Build Your AI Brand Assistant
              </Link>
              <Link
                href="/industries/d2c-commerce"
                className="px-8 py-3 rounded-xl text-sm font-semibold text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all"
              >
                See D2C Use Cases
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
