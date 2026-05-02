'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

const plans = [
  {
    name: 'Creator',
    badge: null,
    price: '₹3,999',
    priceNote: '/month',
    desc: 'Perfect for individual creators getting started with their AI persona.',
    color: '#38bdf8',
    accentBg: 'from-[#38bdf8]/8 to-transparent',
    borderColor: 'border-white/8',
    personas: '1 Persona',
    channels: 'Web Chat',
    conversations: '500 conversations/mo',
    features: [
      '1 AI Creator Persona',
      'Web Chat channel',
      '500 conversations/month',
      'Upload PDFs, videos & posts',
      'Basic analytics',
      'Email support',
    ],
    cta: 'Start Free Trial',
    ctaHref: '/register',
    popular: false,
  },
  {
    name: 'Pro Creator',
    badge: 'Most Popular',
    price: '₹14,999',
    priceNote: '/month',
    desc: 'For creators scaling their audience engagement and course monetization.',
    color: '#a78bfa',
    accentBg: 'from-[#7c3aed]/12 to-[#38bdf8]/5',
    borderColor: 'border-[#7c3aed]/40',
    personas: '5 Personas',
    channels: 'Web + WhatsApp',
    conversations: '5,000 conversations/mo',
    features: [
      '5 AI Creator Personas',
      'Web Chat + WhatsApp channels',
      '5,000 conversations/month',
      'Upload PDFs, videos, courses & posts',
      'Course & product promotion in chat',
      'Audience engagement analytics',
      'Embeddable JS widget',
      'Priority support',
    ],
    cta: 'Start Pro Trial',
    ctaHref: '/register',
    popular: true,
  },
  {
    name: 'Studio',
    badge: null,
    price: 'Custom',
    priceNote: '',
    desc: 'For creator studios, agencies, and media companies needing custom personas and SLAs.',
    color: '#34d399',
    accentBg: 'from-[#34d399]/8 to-transparent',
    borderColor: 'border-white/8',
    personas: 'Unlimited Personas',
    channels: 'All Channels',
    conversations: 'Unlimited',
    features: [
      'Unlimited AI Personas',
      'All channels (Web, WhatsApp, API)',
      'Unlimited conversations',
      'Custom content integrations',
      'White-label deployment',
      'Advanced analytics & reporting',
      'Dedicated account manager',
      'SLA + 24/7 support',
    ],
    cta: 'Contact Sales',
    ctaHref: '/register',
    popular: false,
  },
];

const faqs = [
  {
    q: 'What counts as a conversation?',
    a: 'A conversation is a single chat session with an audience member — from their first message to when they leave or the session ends. Multiple messages in one session count as one conversation.',
  },
  {
    q: 'What content can I upload to train my AI persona?',
    a: 'You can upload PDFs, course materials, blog posts, video transcripts, FAQs, and more. Your AI learns your expertise and speaks in your voice — always on-brand.',
  },
  {
    q: 'What happens if I exceed my conversation limit?',
    a: 'We\'ll notify you before you hit the limit. You can upgrade your plan or purchase additional conversation packs. We never cut off your AI mid-month without warning.',
  },
  {
    q: 'Can I try before I buy?',
    a: 'Absolutely. Try our live demo at /guest-chat with no login required. All paid plans also include a 14-day free trial.',
  },
  {
    q: 'Do you support D2C brands and OTT platforms?',
    a: 'D2C brands and OTT platforms are on our roadmap and coming soon. We\'re launching creator-first — Finance creators, course builders, and coaches — and will expand to commerce and media verticals next.',
  },
  {
    q: 'Do you offer annual billing?',
    a: 'Yes — annual billing saves you 20% compared to monthly. Contact us to set up annual billing for any plan.',
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#080a10] text-white overflow-x-hidden">
      <PublicHeader />
      {/* Hero */}
      <section className="relative pt-32 pb-12 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[#7c3aed]/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-[400px] h-[250px] bg-[#0ea5e9]/8 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 text-[#a78bfa] text-xs font-semibold tracking-widest uppercase mb-6">
            Pricing
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5 leading-tight">
            Grow your audience with{' '}
            <span className="bg-gradient-to-r from-[#a78bfa] via-[#0ea5e9] to-[#34d399] bg-clip-text text-transparent">
              AI-powered engagement
            </span>
          </h1>
          <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto mb-4 leading-relaxed">
            Simple, transparent pricing for creators. Start free, scale as your audience grows.
          </p>
          <p className="text-sm text-white/35">All plans include a 14-day free trial. No credit card required.</p>
        </div>
      </section>
      {/* Plans */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans?.map((plan) => (
              <div
                key={plan?.name}
                className={`relative flex flex-col rounded-2xl border bg-gradient-to-b ${plan?.accentBg} bg-[#0d0f1a] p-6 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] ${plan?.borderColor} ${plan?.popular ? 'shadow-[0_0_40px_rgba(124,58,237,0.2)]' : ''}`}
              >
                {plan?.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-bold bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white shadow-lg">
                    {plan?.badge}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-1">{plan?.name}</h3>
                  <p className="text-xs text-white/45 leading-relaxed mb-4">{plan?.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-white">{plan?.price}</span>
                    {plan?.priceNote && <span className="text-sm text-white/40">{plan?.priceNote}</span>}
                  </div>
                </div>

                {/* Key specs */}
                <div className="flex flex-col gap-2 mb-6 p-3 rounded-xl bg-white/4 border border-white/6">
                  {[
                    { label: 'Personas', val: plan?.personas },
                    { label: 'Channels', val: plan?.channels },
                    { label: 'Usage', val: plan?.conversations },
                  ]?.map((spec) => (
                    <div key={spec?.label} className="flex items-center justify-between">
                      <span className="text-xs text-white/40">{spec?.label}</span>
                      <span className="text-xs font-semibold text-white">{spec?.val}</span>
                    </div>
                  ))}
                </div>

                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {plan?.features?.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5" style={{ color: plan?.color }}>
                        <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                      <span className="text-xs text-white/65 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan?.ctaHref}
                  className={`w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    plan?.popular
                      ? 'btn-primary text-white' :'border border-white/15 text-white hover:bg-white/8'
                  }`}
                >
                  {plan?.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Value prop strip */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl border border-[#7c3aed]/20 p-8 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(14,165,233,0.06) 100%)' }}
          >
            <h3 className="text-xl font-bold text-white mb-2">
              &quot;Your AI persona, on your platform, driving your revenue&quot;
            </h3>
            <p className="text-white/50 text-sm max-w-lg mx-auto">
              Every plan includes content upload, multi-channel deployment, and audience analytics. Deploy in minutes, not weeks.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              {[
                { val: '3 min', label: 'Average setup time' },
                { val: '3.4×', label: 'Avg engagement lift' },
                { val: '24/7', label: 'Always available' },
                { val: '0', label: 'Developers needed' },
              ]?.map((s) => (
                <div key={s?.label} className="text-center">
                  <p className="text-2xl font-extrabold text-[#a78bfa]">{s?.val}</p>
                  <p className="text-xs text-white/40 mt-0.5">{s?.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently asked questions</h2>
          <div className="flex flex-col gap-2">
            {faqs?.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/8 overflow-hidden"
                style={{ background: 'rgba(14,16,24,0.6)' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-white">{faq?.q}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className={`flex-shrink-0 text-white/30 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-white/50 leading-relaxed">{faq?.a}</p>
                  </div>
                )}
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
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(14,165,233,0.08) 100%)' }}
          >
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to build your AI persona?
            </h2>
            <p className="text-white/50 text-sm mb-6">
              Turn your expertise into a 24/7 AI. Engage your audience. Monetize your content.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/guest-chat" className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/15 text-white hover:bg-white/8 transition-all">
                Try Demo
              </Link>
              <Link href="/register" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary">
                Get Started Free →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}
