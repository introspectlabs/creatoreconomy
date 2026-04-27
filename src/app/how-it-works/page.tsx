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
    title: 'Creator Signs Up & Builds Their Persona',
    description:
      'Creators register on PersonaMatrix, complete their profile, and configure their AI persona with their unique knowledge, style, and expertise.',
    details: [
      'Create an account and verify your identity',
      'Set up your creator profile with bio, expertise areas, and certifications',
      'Link your social profiles for authenticity verification',
      "Configure your AI persona's tone, style, and response behavior",
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
    title: 'Upload & Train on Your Knowledge',
    description:
      'Feed your persona with your authentic content — documents, videos, web pages, and more. The AI learns your expertise deeply.',
    details: [
      'Upload PDFs, articles, research papers, and documents',
      'Import YouTube videos and transcripts automatically',
      'Add web pages and blog posts via URL',
      'Declare copyright ownership to ensure content authenticity',
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
    title: 'Publish Your AI Persona',
    description:
      'Once trained, your persona goes live on the PersonaMatrix marketplace. Audiences can discover and interact with your AI-powered knowledge.',
    details: [
      'Review and test your persona\'s responses before publishing',
      'Set access tiers — free preview or paid subscription',
      'Your persona appears in the public creator directory',
      'Embed your persona on your own website via plugin',
    ],
    accentColor: '#10b981',
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
    title: 'Audiences Engage & Subscribe',
    description:
      'Fans, viewers, and followers discover your persona, ask questions, and subscribe to unlock deeper access to your content and expertise.',
    details: [
      'Audiences search and discover personas by topic or creator',
      'Free-tier users get a preview of your knowledge',
      'Subscribers unlock unlimited conversations and premium content',
      'Audience credits system enables flexible monetization',
    ],
    accentColor: '#f59e0b',
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
    title: 'Creators Earn & Grow',
    description:
      'Every interaction generates revenue for creators. Track analytics, optimize your persona, and grow your audience over time.',
    details: [
      'Earn revenue from subscriptions and per-message credits',
      'Access detailed analytics on engagement and earnings',
      'Continuously improve your persona with new knowledge uploads',
      'Withdraw earnings via integrated billing and payout system',
    ],
    accentColor: '#ec4899',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

const forCreators: Feature[] = [
  {
    title: 'Multi-Model AI Engine',
    description: 'Your persona is powered by the latest LLMs — GPT-4, Claude, Gemini — ensuring the most accurate and nuanced responses.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'Knowledge Authenticity',
    description: 'Every piece of content is tied to your verified identity. Copyright declarations and source tracking ensure your knowledge is yours.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Flexible Monetization',
    description: 'Set your own pricing. Offer free previews, subscription tiers, or pay-per-message — you control how your knowledge is accessed.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    title: 'Embeds & Plugins',
    description: 'Embed your AI persona directly on your website, blog, or platform with a single line of code.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

const forAudiences: Feature[] = [
  {
    title: 'Discover Expert Personas',
    description: 'Browse a curated marketplace of AI personas built by real creators, educators, and industry experts.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    title: 'Ask Anything, Anytime',
    description: 'Get instant, in-depth answers from your favorite creator\'s knowledge base — available 24/7 without scheduling.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: 'Verified Knowledge Sources',
    description: 'Every response is grounded in content the creator uploaded and verified — no hallucinations from generic AI.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    title: 'Credits-Based Access',
    description: 'Use credits to access premium personas. Flexible plans let you pay only for what you use.',
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-medium mb-6">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
            </svg>
            Simple 5-Step Process
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            How{' '}
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              PersonaMatrix
            </span>{' '}
            Works
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            From creator signup to audience engagement — understand the complete journey of how AI personas are built, published, and monetized on our platform.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Everyone</h2>
            <p className="text-white/45 text-base max-w-xl mx-auto">
              Whether you're sharing your expertise or seeking knowledge, PersonaMatrix has you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* For Creators */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
                    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">For Creators</h3>
              </div>
              <div className="flex flex-col gap-4">
                {forCreators.map((f, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border border-white/6 bg-white/[0.02] hover:border-white/12 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center flex-shrink-0">
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

            {/* For Audiences */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">For Audiences</h3>
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
              Join thousands of creators already monetizing their expertise on PersonaMatrix.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="px-8 py-3 rounded-xl text-sm font-semibold text-white btn-primary"
              >
                Create Your Persona
              </Link>
              <Link
                href="/creators"
                className="px-8 py-3 rounded-xl text-sm font-semibold text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all"
              >
                Browse Creators
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
