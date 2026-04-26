'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';

interface CreditTransaction {
  id: string;
  type: 'purchase' | 'usage' | 'bonus';
  description: string;
  amount: number;
  date: string;
  channel?: string;
}

const MOCK_TRANSACTIONS: CreditTransaction[] = [
  { id: 't1', type: 'purchase', description: '2,000 min Credit Pack', amount: 2000, date: 'Apr 8, 2026' },
  { id: 't2', type: 'usage', description: 'Web Chat — Alex persona', amount: -45, date: 'Apr 8, 2026', channel: 'Web Chat' },
  { id: 't3', type: 'usage', description: 'Voice AI — Maya persona', amount: -120, date: 'Apr 7, 2026', channel: 'Voice AI' },
  { id: 't4', type: 'bonus', description: 'Welcome bonus credits', amount: 200, date: 'Apr 6, 2026' },
  { id: 't5', type: 'usage', description: 'Voice AI — Leo persona', amount: -80, date: 'Apr 5, 2026', channel: 'Voice AI' },
  { id: 't6', type: 'usage', description: 'Web Chat — Alex persona', amount: -30, date: 'Apr 4, 2026', channel: 'Web Chat' },
  { id: 't7', type: 'purchase', description: '500 min Credit Pack', amount: 500, date: 'Apr 1, 2026' },
];

const CREDIT_PACKS = [
  { minutes: 500, price: 4, label: '500 min', perK: '8.0' },
  { minutes: 2000, price: 14, label: '2,000 min', perK: '7.0', popular: true },
  { minutes: 5000, price: 29, label: '5,000 min', perK: '5.8' },
  { minutes: 15000, price: 79, label: '15,000 min', perK: '5.3' },
];

const SUBSCRIPTION_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    color: '#38bdf8',
    minutes: '200 min/mo',
    personas: '3 personas',
    current: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 79,
    color: '#a78bfa',
    minutes: '2,000 min/mo',
    personas: 'Unlimited',
    current: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    price: 249,
    color: '#34d399',
    minutes: '10,000 min/mo',
    personas: 'Unlimited',
    current: false,
  },
];

const CHANNEL_USAGE = [
  { channel: 'Web Chat', minutes: 175, color: '#38bdf8', icon: '💬' },
  { channel: 'Voice AI', minutes: 320, color: '#a78bfa', icon: '🎙️' },
  { channel: 'SIP/Voice', minutes: 80, color: '#34d399', icon: '📞' },
];

const totalUsed = CHANNEL_USAGE.reduce((s, c) => s + c.minutes, 0);

export default function CreditsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'buy' | 'subscription'>('overview');
  const [selectedPack, setSelectedPack] = useState(1);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const balance = 2225;
  const monthlyAllotment = 2000;
  const usedThisMonth = totalUsed;
  const usagePct = Math.min(100, (usedThisMonth / monthlyAllotment) * 100);

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Credits & Subscription</h1>
            <p className="text-sm text-white/40 mt-1">Manage your minute balance, buy credit packs, and update your plan.</p>
          </div>
        </div>

        {/* Balance cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Credit balance */}
          <div
            className="rounded-2xl p-5 border border-white/8 col-span-1"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(59,130,246,0.06) 100%)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.2)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Credit Balance</span>
            </div>
            <p className="text-3xl font-extrabold text-white">{balance.toLocaleString()}</p>
            <p className="text-xs text-white/35 mt-1">minutes available</p>
          </div>

          {/* Monthly usage */}
          <div className="rounded-2xl p-5 border border-white/8" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(56,189,248,0.15)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">This Month</span>
            </div>
            <p className="text-3xl font-extrabold text-white">{usedThisMonth.toLocaleString()}</p>
            <p className="text-xs text-white/35 mt-1">of {monthlyAllotment.toLocaleString()} plan minutes</p>
            <div className="mt-3 w-full h-1.5 rounded-full bg-white/8 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${usagePct}%`,
                  background: usagePct > 80 ? 'linear-gradient(90deg, #ef4444, #f97316)' : 'linear-gradient(90deg, #38bdf8, #7c3aed)',
                }}
              />
            </div>
          </div>

          {/* Current plan */}
          <div className="rounded-2xl p-5 border border-white/8" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(167,139,250,0.15)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Current Plan</span>
            </div>
            <p className="text-2xl font-extrabold text-white">Growth</p>
            <p className="text-xs text-white/35 mt-1">$79/mo · Renews May 1</p>
            <button
              onClick={() => setActiveTab('subscription')}
              className="mt-3 text-xs font-semibold text-[#a78bfa] hover:text-white transition-colors"
            >
              Manage plan →
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl border border-white/8 bg-white/3 w-fit">
          {(['overview', 'buy', 'subscription'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-150 ${
                activeTab === t ? 'bg-[#7c3aed] text-white shadow-[0_0_12px_rgba(124,58,237,0.35)]' : 'text-white/40 hover:text-white'
              }`}
            >
              {t === 'buy' ? 'Buy Credits' : t === 'subscription' ? 'Plan' : 'Overview'}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div className="space-y-5">
            {/* Channel breakdown */}
            <div className="rounded-2xl border border-white/8 p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h3 className="text-sm font-semibold text-white mb-4">Usage by Channel — April 2026</h3>
              <div className="space-y-3">
                {CHANNEL_USAGE.map((c) => {
                  const pct = (c.minutes / totalUsed) * 100;
                  return (
                    <div key={c.channel} className="flex items-center gap-3">
                      <span className="text-base w-5 flex-shrink-0">{c.icon}</span>
                      <span className="text-sm text-white/60 w-24 flex-shrink-0">{c.channel}</span>
                      <div className="flex-1 h-2 rounded-full bg-white/6 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, background: c.color }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-white w-16 text-right flex-shrink-0">{c.minutes} min</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Transaction history */}
            <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="px-5 py-4 border-b border-white/8">
                <h3 className="text-sm font-semibold text-white">Transaction History</h3>
              </div>
              <div className="divide-y divide-white/5">
                {MOCK_TRANSACTIONS.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/2 transition-colors">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background:
                            tx.type === 'purchase' ? 'rgba(52,211,153,0.12)' :
                            tx.type === 'bonus' ? 'rgba(245,158,11,0.12)' :
                            'rgba(239,68,68,0.1)',
                        }}
                      >
                        {tx.type === 'purchase' ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                          </svg>
                        ) : tx.type === 'bonus' ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-white">{tx.description}</p>
                        <p className="text-xs text-white/35">{tx.date}{tx.channel ? ` · ${tx.channel}` : ''}</p>
                      </div>
                    </div>
                    <span
                      className="text-sm font-bold"
                      style={{
                        color: tx.amount > 0 ? '#34d399' : '#ef4444',
                      }}
                    >
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} min
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Buy Credits tab */}
        {activeTab === 'buy' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CREDIT_PACKS.map((pack, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPack(i)}
                  className={`relative flex flex-col items-center gap-2 p-5 rounded-2xl border transition-all duration-150 ${
                    selectedPack === i
                      ? 'border-[#7c3aed]/60 shadow-[0_0_24px_rgba(124,58,237,0.2)]'
                      : 'border-white/8 hover:border-white/16'
                  }`}
                  style={{
                    background: selectedPack === i ? 'rgba(124,58,237,0.1)' : 'rgba(255,255,255,0.02)',
                  }}
                >
                  {pack.popular && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#7c3aed] text-[10px] font-bold text-white whitespace-nowrap">
                      Best value
                    </span>
                  )}
                  <span className="text-2xl font-extrabold text-white">${pack.price}</span>
                  <span className="text-sm font-semibold text-white/70">{pack.label}</span>
                  <span className="text-[11px] text-white/30">${pack.perK}/1k min</span>
                </button>
              ))}
            </div>

            {/* Order summary */}
            <div className="rounded-2xl border border-white/8 p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h3 className="text-sm font-semibold text-white mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-t border-white/8">
                  <div>
                    <p className="text-sm text-white">{CREDIT_PACKS[selectedPack].label} Credit Pack</p>
                    <p className="text-xs text-white/40 mt-0.5">One-time · Credits never expire</p>
                  </div>
                  <span className="text-lg font-bold text-white">${CREDIT_PACKS[selectedPack].price}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-white/8">
                  <span className="text-sm text-white/60">New balance after purchase</span>
                  <span className="text-sm font-semibold text-[#34d399]">
                    {(balance + CREDIT_PACKS[selectedPack].minutes).toLocaleString()} min
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-white/8">
                  <span className="text-sm font-semibold text-white">Total</span>
                  <span className="text-xl font-extrabold text-white">${CREDIT_PACKS[selectedPack].price}</span>
                </div>
              </div>
            </div>

            {/* Payment method placeholder */}
            <div className="rounded-2xl border border-white/8 p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h3 className="text-sm font-semibold text-white mb-4">Payment Method</h3>
              <div className="flex items-center gap-3 p-3 rounded-xl border border-white/8 bg-white/3">
                <div className="w-10 h-7 rounded-md bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-white/10 flex items-center justify-center">
                  <div className="flex gap-0.5">
                    <div className="w-3 h-3 rounded-full bg-[#eb001b] opacity-90" />
                    <div className="w-3 h-3 rounded-full bg-[#f79e1b] opacity-90 -ml-1.5" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">•••• •••• •••• 4242</p>
                  <p className="text-xs text-white/35">Expires 12/27</p>
                </div>
                <button className="text-xs text-[#a78bfa] hover:text-white transition-colors">Change</button>
              </div>
            </div>

            <button
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shadow-[0_0_24px_rgba(124,58,237,0.3)]"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
            >
              Purchase {CREDIT_PACKS[selectedPack].label} for ${CREDIT_PACKS[selectedPack].price}
            </button>
            <p className="text-center text-xs text-white/25">Secure checkout · Credits added instantly</p>
          </div>
        )}

        {/* Subscription tab */}
        {activeTab === 'subscription' && (
          <div className="space-y-5">
            {/* Billing cycle toggle */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/50">Billing:</span>
              <div className="inline-flex items-center gap-1 p-1 rounded-xl border border-white/8 bg-white/3">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${billingCycle === 'monthly' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${billingCycle === 'annual' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
                >
                  Annual
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#34d399]/15 text-[#34d399] border border-[#34d399]/25">−20%</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SUBSCRIPTION_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-2xl border p-5 transition-all ${
                    plan.current ? 'border-[#7c3aed]/50 shadow-[0_0_40px_rgba(124,58,237,0.15)]' : 'border-white/8 hover:border-white/16'
                  }`}
                  style={{
                    background: plan.current ? 'rgba(124,58,237,0.08)' : 'rgba(255,255,255,0.02)',
                  }}
                >
                  {plan.current && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#7c3aed] text-[10px] font-bold text-white whitespace-nowrap">
                      Current Plan
                    </div>
                  )}
                  <div className="w-5 h-0.5 rounded-full mb-3" style={{ background: plan.color }} />
                  <h3 className="text-base font-bold text-white mb-1">{plan.name}</h3>
                  <div className="mb-4">
                    {plan.price === 0 ? (
                      <span className="text-2xl font-extrabold text-white">Free</span>
                    ) : (
                      <div className="flex items-end gap-1">
                        <span className="text-2xl font-extrabold text-white">
                          ${billingCycle === 'annual' ? Math.round(plan.price * 0.8) : plan.price}
                        </span>
                        <span className="text-white/35 text-xs mb-1">/mo</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5 mb-5 flex-1">
                    <div className="flex items-center gap-2 text-xs text-white/55">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      {plan.minutes}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/55">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      {plan.personas} personas
                    </div>
                  </div>
                  <button
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      plan.current
                        ? 'bg-white/6 text-white/40 cursor-default border border-white/8' :'text-white hover:opacity-90 border border-white/12 hover:bg-white/5'
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current ? 'Current plan' : plan.price === 0 ? 'Downgrade' : 'Upgrade'}
                  </button>
                </div>
              ))}
            </div>

            {/* Danger zone */}
            <div className="rounded-2xl border border-red-500/15 p-5" style={{ background: 'rgba(239,68,68,0.04)' }}>
              <h3 className="text-sm font-semibold text-white mb-1">Cancel Subscription</h3>
              <p className="text-xs text-white/40 mb-4">Your plan will remain active until the end of the billing period. Credits do not expire.</p>
              <button className="px-4 py-2 rounded-xl text-sm font-semibold text-red-400 border border-red-500/20 hover:bg-red-500/8 transition-all">
                Cancel plan
              </button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
