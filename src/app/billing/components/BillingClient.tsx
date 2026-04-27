'use client';

import React, { useState } from 'react';
import { CreditCard, Zap, Users, Brain, CheckCircle, ArrowUpRight, AlertCircle } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    monthlyPrice: 0,
    annualPrice: 0,
    storage: '500 MB',
    minutes: '200 min/mo',
    features: [
      'Web Chat channel',
      '3 AI Personas',
      '500 MB knowledge ingestion',
      '200 conversational minutes',
      'PDF, DOCX, TXT support',
      'Community support',
    ],
    current: false,
    color: '#38bdf8',
  },
  {
    name: 'Growth',
    monthlyPrice: 79,
    annualPrice: 63,
    storage: '10 GB',
    minutes: '2,000 min/mo',
    features: [
      'All channels: Chat, WhatsApp, Voice, API',
      'Unlimited personas',
      '10 GB knowledge ingestion',
      '2,000 conversational minutes',
      'Video, audio, PDF, web scraping',
      'Embeddable JS widgets',
      'Webhooks & streaming',
      'Priority email support',
    ],
    current: true,
    color: '#a78bfa',
  },
  {
    name: 'Scale',
    monthlyPrice: 249,
    annualPrice: 199,
    storage: '100 GB',
    minutes: '10,000 min/mo',
    features: [
      'All channels incl. Avatar Chat',
      'Unlimited personas',
      '100 GB knowledge ingestion',
      '10,000 conversational minutes',
      'AI Video Avatars (Tavus)',
      'Video generation pipeline',
      'RBAC & audit logs',
      'SSO / SAML',
      'SLA + dedicated support',
    ],
    current: false,
    color: '#34d399',
  },
  {
    name: 'Enterprise',
    monthlyPrice: null,
    annualPrice: null,
    storage: 'Unlimited',
    minutes: 'Unlimited',
    features: [
      'Everything in Scale',
      'Custom storage & minute pools',
      'Dedicated infrastructure',
      'Custom integrations & connectors',
      'White-label deployment',
      'On-premise / private cloud',
      'Named CSM + 24/7 support',
    ],
    current: false,
    color: '#f59e0b',
  },
];

const usageStats = [
  { label: 'Storage Used', usedLabel: '3.2 GB', totalLabel: '10 GB', pct: 32, icon: Brain, color: 'purple' },
  { label: 'Conv. Minutes', usedLabel: '1,240', totalLabel: '2,000', pct: 62, icon: Zap, color: 'blue' },
  { label: 'Team Members', usedLabel: '4', totalLabel: '10', pct: 40, icon: Users, color: 'emerald' },
];

export default function BillingClient() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">Billing</h1>
        <p className="text-sm text-white/40 mt-1">Manage your subscription, usage, and payment methods.</p>
      </div>

      {/* Current Plan Banner */}
      <div
        className="rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.10) 100%)', border: '1px solid rgba(139,92,246,0.25)' }}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
            <Zap size={18} className="text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest">Current Plan</p>
            <p className="text-base sm:text-lg font-bold text-white">Growth — $79/mo</p>
            <p className="text-xs text-white/40 mt-0.5">Renews on May 3, 2026 · Next invoice: <span className="text-white/60">$79.00</span></p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium hover:bg-purple-500/30 transition-all self-start sm:self-auto">
          Manage Plan <ArrowUpRight size={13} />
        </button>
      </div>

      {/* Usage */}
      <div>
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Usage This Cycle</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {usageStats.map((stat) => {
            const StatIcon = stat.icon;
            const barColor = stat.color === 'purple' ? 'bg-purple-500' : stat.color === 'blue' ? 'bg-blue-500' : 'bg-emerald-500';
            const iconBg = stat.color === 'purple' ? 'bg-purple-500/15 text-purple-400' : stat.color === 'blue' ? 'bg-blue-500/15 text-blue-400' : 'bg-emerald-500/15 text-emerald-400';
            return (
              <div key={stat.label} className="rounded-2xl p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
                    <StatIcon size={15} />
                  </div>
                  <span className="text-xs text-white/40">{stat.pct}%</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{stat.label}</p>
                  <p className="text-xs text-white/40 mt-0.5">{stat.usedLabel} / {stat.totalLabel}</p>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/5">
                  <div className={`h-1.5 rounded-full ${barColor} transition-all`} style={{ width: `${stat.pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Plans */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest">Plans</h2>
          <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {(['monthly', 'annual'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setBillingCycle(c)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${billingCycle === c ? 'bg-purple-500/30 text-purple-300' : 'text-white/40 hover:text-white/60'}`}
              >
                {c === 'monthly' ? 'Monthly' : 'Annual (−20%)'}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {plans.map((plan) => {
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.name}
                className={`rounded-2xl p-5 flex flex-col gap-4 relative ${plan.current ? 'ring-1 ring-purple-500/40' : ''}`}
                style={{ background: plan.current ? 'rgba(139,92,246,0.08)' : 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {plan.current && (
                  <span className="absolute top-3 right-3 text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full px-2 py-0.5">Current</span>
                )}
                <div>
                  <div className="w-5 h-0.5 rounded-full mb-2" style={{ background: plan.color }} />
                  <p className="text-sm font-semibold text-white">{plan.name}</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {price === null ? (
                      'Custom'
                    ) : price === 0 ? (
                      'Free'
                    ) : (
                      <>
                        ${price}
                        <span className="text-sm font-normal text-white/40">/mo</span>
                      </>
                    )}
                  </p>
                  <p className="text-[11px] text-white/35 mt-1">{plan.storage} · {plan.minutes}</p>
                </div>
                <ul className="space-y-2 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-white/60">
                      <CheckCircle size={12} className="text-purple-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 rounded-xl text-xs font-semibold transition-all ${
                    plan.current
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 cursor-default'
                      : plan.name === 'Enterprise' ?'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10' :'bg-purple-600 text-white hover:bg-purple-500'
                  }`}
                >
                  {plan.current ? 'Current Plan' : plan.name === 'Enterprise' ? 'Contact Sales' : plan.name === 'Starter' ? 'Downgrade' : 'Upgrade'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Payment Method</h2>
        <div className="rounded-2xl p-4 flex items-center justify-between gap-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 rounded-md bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <CreditCard size={14} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-white font-medium">Visa ending in 4242</p>
              <p className="text-xs text-white/40">Expires 08/2027</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <AlertCircle size={11} /> Default
            </span>
            <button className="px-3 py-1.5 rounded-lg text-xs text-white/50 border border-white/10 hover:bg-white/5 transition-all">Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}
