'use client';
import React from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import Link from 'next/link';

const currentPlan = {
  name: 'Growth',
  price: '₹14,999',
  period: '/month',
  renewsOn: 'May 29, 2026',
  personas: { used: 3, total: 5 },
  conversations: { used: 1284, total: 5000 },
  channels: 'Web + WhatsApp',
};

const invoices = [
  { id: 'INV-2026-04', date: 'Apr 1, 2026', amount: '₹14,999', status: 'paid' },
  { id: 'INV-2026-03', date: 'Mar 1, 2026', amount: '₹14,999', status: 'paid' },
  { id: 'INV-2026-02', date: 'Feb 1, 2026', amount: '₹3,999', status: 'paid' },
];

export default function BillingPage() {
  return (
    <AppLayout>
      <Topbar title="Billing" subtitle="Manage your plan and usage" />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Current plan */}
        <div className="xl:col-span-2 flex flex-col gap-5">
          <div className="rounded-2xl border border-[#7c3aed]/30 bg-[#7c3aed]/6 p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-base font-bold text-white">{currentPlan?.name} Plan</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#34d399]/20 text-[#34d399] border border-[#34d399]/30">
                    Active
                  </span>
                </div>
                <p className="text-xs text-white/45">Renews on {currentPlan?.renewsOn}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-white">{currentPlan?.price}</p>
                <p className="text-xs text-white/40">{currentPlan?.period}</p>
              </div>
            </div>

            {/* Usage bars */}
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-white/50">Personas</span>
                  <span className="text-xs font-semibold text-white">
                    {currentPlan?.personas?.used} / {currentPlan?.personas?.total}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a78bfa]"
                    style={{ width: `${(currentPlan?.personas?.used / currentPlan?.personas?.total) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-white/50">Conversations this month</span>
                  <span className="text-xs font-semibold text-white">
                    {currentPlan?.conversations?.used?.toLocaleString()} / {currentPlan?.conversations?.total?.toLocaleString()}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#14b8a6] to-[#34d399]"
                    style={{ width: `${(currentPlan?.conversations?.used / currentPlan?.conversations?.total) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/50">Channels</span>
                <span className="text-xs font-semibold text-white">{currentPlan?.channels}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-5 pt-5 border-t border-white/8">
              <Link href="/pricing" className="px-4 py-2 rounded-xl text-sm font-semibold text-white btn-primary">
                Upgrade Plan
              </Link>
              <button className="px-4 py-2 rounded-xl text-sm font-medium border border-white/10 text-white/55 hover:text-white hover:border-white/25 transition-all">
                Cancel Plan
              </button>
            </div>
          </div>

          {/* Invoices */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/6">
              <h2 className="text-sm font-semibold text-white">Invoices</h2>
            </div>
            <div className="divide-y divide-white/5">
              {invoices?.map((inv) => (
                <div key={inv?.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/2 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{inv?.id}</p>
                    <p className="text-xs text-white/40">{inv?.date}</p>
                  </div>
                  <p className="text-sm font-semibold text-white">{inv?.amount}</p>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#34d399]/15 text-[#34d399] border border-[#34d399]/25">
                    {inv?.status}
                  </span>
                  <button className="text-xs text-white/40 hover:text-white transition-colors">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="flex flex-col gap-4">
          <div
            className="rounded-2xl border border-white/10 p-5"
            style={{ background: 'linear-gradient(135deg, rgba(20,184,166,0.10) 0%, rgba(124,58,237,0.08) 100%)' }}
          >
            <h3 className="text-sm font-bold text-white mb-2">Upgrade to Enterprise</h3>
            <p className="text-xs text-white/50 leading-relaxed mb-4">
              Unlimited personas, all channels, custom Shopify integrations, and a dedicated account manager.
            </p>
            <Link href="/pricing" className="block text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary">
              View Enterprise Plans
            </Link>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Payment Method</h3>
            <div className="flex items-center gap-3 p-3 rounded-xl border border-white/8 bg-white/3">
              <div className="w-8 h-5 rounded bg-gradient-to-r from-[#1a1f6e] to-[#2d3a9e] flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">VISA</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-white">•••• •••• •••• 4242</p>
                <p className="text-[10px] text-white/40">Expires 12/27</p>
              </div>
              <button className="text-[10px] text-white/40 hover:text-white transition-colors">Update</button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
