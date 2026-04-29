'use client';
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const conversationData = [
  { date: 'Apr 23', conversations: 38 },
  { date: 'Apr 24', conversations: 52 },
  { date: 'Apr 25', conversations: 44 },
  { date: 'Apr 26', conversations: 61 },
  { date: 'Apr 27', conversations: 73 },
  { date: 'Apr 28', conversations: 58 },
  { date: 'Apr 29', conversations: 82 },
];

const topQuestions = [
  { question: 'Do you have a moisturizer for oily skin?', count: 142, conversion: '12%' },
  { question: 'What\'s the difference between Hydra Boost and Matte Gel?', count: 98, conversion: '18%' },
  { question: 'Is this product good for sensitive skin?', count: 87, conversion: '9%' },
  { question: 'Do you offer free shipping?', count: 76, conversion: '6%' },
  { question: 'What\'s your return policy?', count: 64, conversion: '4%' },
  { question: 'Can I use Vitamin C serum with SPF?', count: 58, conversion: '15%' },
  { question: 'Do you have a bundle deal?', count: 51, conversion: '22%' },
];

const conversionData = [
  { date: 'Apr 23', rate: 6.2 },
  { date: 'Apr 24', rate: 7.8 },
  { date: 'Apr 25', rate: 7.1 },
  { date: 'Apr 26', rate: 8.4 },
  { date: 'Apr 27', rate: 9.2 },
  { date: 'Apr 28', rate: 8.1 },
  { date: 'Apr 29', rate: 9.8 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 px-3 py-2 text-xs" style={{ background: 'rgba(14,16,24,0.97)' }}>
      <p className="text-white/50 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: <span className="font-600 text-white">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');

  const summaryMetrics = [
    { label: 'Total Conversations', value: '1,284', change: '+18% vs last month', color: '#7c3aed', trend: 'up' },
    { label: 'Top Questions Asked', value: '642', change: 'Across all personas', color: '#14b8a6', trend: 'neutral' },
    { label: 'Conversion Rate (proxy)', value: '8.4%', change: '+2.1% this month', color: '#34d399', trend: 'up' },
  ];

  return (
    <AppLayout>
      <Topbar title="Analytics" subtitle="Conversations, top questions, and conversion metrics" />

      {/* Time range */}
      <div className="flex items-center gap-2 mb-6">
        {(['7d', '30d'] as const).map((r) => (
          <button
            key={r}
            onClick={() => setTimeRange(r)}
            className={`px-3 py-1.5 rounded-lg text-xs font-600 transition-all ${
              timeRange === r
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :'text-white/40 hover:text-white/70 border border-white/8 hover:border-white/15'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {summaryMetrics.map((m) => (
          <div key={m.label} className="p-5 rounded-2xl border border-white/8 bg-white/[0.03]">
            <p className="text-xs text-white/45 mb-2">{m.label}</p>
            <p className="text-2xl font-bold text-white mb-1">{m.value}</p>
            <p className={`text-xs ${m.trend === 'up' ? 'text-[#34d399]' : 'text-white/35'}`}>{m.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* Conversations chart */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Conversations Over Time</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={conversationData}>
              <defs>
                <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="conversations" name="Conversations" stroke="#7c3aed" fill="url(#convGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion proxy chart */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Conversion Rate (Proxy)</h2>
            <span className="text-[10px] text-white/35 border border-white/10 px-2 py-0.5 rounded-full">
              Chat → Product click
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="rate" name="Conversion %" fill="#14b8a6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top questions */}
      <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/6">
          <h2 className="text-sm font-semibold text-white">Top Questions</h2>
          <p className="text-xs text-white/40 mt-0.5">Most asked questions across all personas</p>
        </div>
        <div className="divide-y divide-white/5">
          {topQuestions.map((q, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/2 transition-colors">
              <span className="text-xs font-bold text-white/20 w-5 flex-shrink-0">{i + 1}</span>
              <p className="flex-1 text-sm text-white/75 min-w-0 truncate">{q.question}</p>
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-semibold text-white">{q.count}</p>
                  <p className="text-[10px] text-white/30">asked</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-[#34d399]">{q.conversion}</p>
                  <p className="text-[10px] text-white/30">conversion</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
