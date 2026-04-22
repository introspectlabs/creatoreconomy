'use client';

import React, { useState } from 'react';
import { Download, Search, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Invoice {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: 'paid' | 'pending' | 'failed';
  period: string;
}

const invoices: Invoice[] = [
  { id: 'INV-2026-004', date: 'Apr 1, 2026', description: 'Pro Plan — Monthly', amount: '$99.00', status: 'paid', period: 'Apr 2026' },
  { id: 'INV-2026-003', date: 'Mar 1, 2026', description: 'Pro Plan — Monthly', amount: '$99.00', status: 'paid', period: 'Mar 2026' },
  { id: 'INV-2026-002', date: 'Feb 1, 2026', description: 'Pro Plan — Monthly', amount: '$99.00', status: 'paid', period: 'Feb 2026' },
  { id: 'INV-2026-001', date: 'Jan 1, 2026', description: 'Pro Plan — Monthly', amount: '$99.00', status: 'paid', period: 'Jan 2026' },
  { id: 'INV-2025-012', date: 'Dec 1, 2025', description: 'Pro Plan — Monthly', amount: '$99.00', status: 'paid', period: 'Dec 2025' },
  { id: 'INV-2025-011', date: 'Nov 1, 2025', description: 'Pro Plan — Monthly', amount: '$99.00', status: 'failed', period: 'Nov 2025' },
  { id: 'INV-2025-010', date: 'Oct 1, 2025', description: 'Starter Plan — Monthly', amount: '$29.00', status: 'paid', period: 'Oct 2025' },
  { id: 'INV-2025-009', date: 'Sep 1, 2025', description: 'Starter Plan — Monthly', amount: '$29.00', status: 'paid', period: 'Sep 2025' },
];

const statusConfig = {
  paid: { label: 'Paid', icon: CheckCircle, classes: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  pending: { label: 'Pending', icon: Clock, classes: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  failed: { label: 'Failed', icon: XCircle, classes: 'bg-red-500/10 text-red-400 border-red-500/20' },
};

export default function InvoiceClient() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'failed'>('all');

  const filtered = invoices.filter((inv) => {
    const matchSearch =
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.description.toLowerCase().includes(search.toLowerCase()) ||
      inv.period.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || inv.status === filter;
    return matchSearch && matchFilter;
  });

  const totalPaid = invoices
    .filter((i) => i.status === 'paid')
    .reduce((sum, i) => sum + parseFloat(i.amount.replace('$', '')), 0);

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Invoices</h1>
          <p className="text-sm text-white/40 mt-1">Download and review all your billing history.</p>
        </div>
        <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 text-xs sm:text-sm hover:bg-white/8 hover:text-white/80 transition-all whitespace-nowrap">
          <Download size={14} /> Export All
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: 'Total Paid', value: `$${totalPaid.toFixed(2)}`, sub: `${invoices.filter(i => i.status === 'paid').length} invoices`, color: 'text-emerald-400' },
          { label: 'Pending', value: `${invoices.filter(i => i.status === 'pending').length}`, sub: 'Awaiting payment', color: 'text-yellow-400' },
          { label: 'Failed', value: `${invoices.filter(i => i.status === 'failed').length}`, sub: 'Requires attention', color: 'text-red-400' },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-xs text-white/40 uppercase tracking-widest">{card.label}</p>
            <p className={`text-2xl font-bold mt-1 ${card.color}`}>{card.value}</p>
            <p className="text-xs text-white/30 mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Search size={14} className="text-white/30 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search invoices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-white placeholder-white/25 outline-none w-full"
          />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl overflow-x-auto" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {(['all', 'paid', 'pending', 'failed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all whitespace-nowrap flex-shrink-0 ${filter === f ? 'bg-purple-500/25 text-purple-300' : 'text-white/40 hover:text-white/60'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-white/30 text-sm">No invoices found.</div>
        ) : (
          filtered.map((inv) => {
            const cfg = statusConfig[inv.status];
            const StatusIcon = cfg.icon;
            return (
              <div key={inv.id} className="rounded-2xl p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText size={13} className="text-white/25 flex-shrink-0" />
                    <span className="text-xs font-mono text-white/70 truncate">{inv.id}</span>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border flex-shrink-0 ${cfg.classes}`}>
                    <StatusIcon size={10} />
                    {cfg.label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/70">{inv.description}</p>
                    <p className="text-xs text-white/40 mt-0.5">{inv.date}</p>
                  </div>
                  <p className="text-sm font-semibold text-white">{inv.amount}</p>
                </div>
                <div className="pt-2 border-t border-white/5">
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-white/40 border border-white/10 hover:text-white/70 hover:bg-white/5 transition-all">
                    <Download size={11} /> Download PDF
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['Invoice', 'Date', 'Description', 'Amount', 'Status', ''].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-semibold text-white/30 uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-white/30 text-sm">No invoices found.</td>
              </tr>
            ) : (
              filtered.map((inv, idx) => {
                const cfg = statusConfig[inv.status];
                const StatusIcon = cfg.icon;
                return (
                  <tr
                    key={inv.id}
                    className="transition-colors hover:bg-white/[0.02]"
                    style={{ borderBottom: idx < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileText size={13} className="text-white/25 flex-shrink-0" />
                        <span className="text-xs font-mono text-white/70">{inv.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-white/50">{inv.date}</td>
                    <td className="px-4 py-3 text-xs text-white/70">{inv.description}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-white">{inv.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cfg.classes}`}>
                        <StatusIcon size={10} />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-white/40 border border-white/10 hover:text-white/70 hover:bg-white/5 transition-all">
                        <Download size={11} /> PDF
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
