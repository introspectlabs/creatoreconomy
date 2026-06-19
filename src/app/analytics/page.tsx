'use client';
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

type Domain = 'All' | 'Finance' | 'Education' | 'Coaching';

const domainColors: Record<string, { text: string; bg: string; border: string; chart: string }> = {
  Finance:   { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', chart: '#34d399' },
  Education: { text: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/25',    chart: '#60a5fa' },
  Coaching:  { text: 'text-orange-400',  bg: 'bg-orange-500/10',  border: 'border-orange-500/25',  chart: '#fb923c' },
};

const conversationData = [
  { date: 'Apr 23', Finance: 22, Education: 10, Coaching: 6 },
  { date: 'Apr 24', Finance: 30, Education: 14, Coaching: 8 },
  { date: 'Apr 25', Finance: 26, Education: 12, Coaching: 6 },
  { date: 'Apr 26', Finance: 36, Education: 16, Coaching: 9 },
  { date: 'Apr 27', Finance: 44, Education: 18, Coaching: 11 },
  { date: 'Apr 28', Finance: 34, Education: 15, Coaching: 9 },
  { date: 'Apr 29', Finance: 48, Education: 22, Coaching: 12 },
];

const topQuestions = [
  { question: 'How do I start investing with ₹10,000?', count: 142, conversion: '12%', domain: 'Finance' },
  { question: "What's the difference between SIP and lump sum?", count: 98, conversion: '18%', domain: 'Finance' },
  { question: 'Which module covers options trading strategies?', count: 87, conversion: '9%', domain: 'Education' },
  { question: 'How do I book a 1:1 coaching session?', count: 76, conversion: '24%', domain: 'Coaching' },
  { question: 'Is the course suitable for complete beginners?', count: 64, conversion: '16%', domain: 'Education' },
  { question: "Can I get a refund if the course doesn't work for me?", count: 58, conversion: '8%', domain: 'Education' },
  { question: 'Do you offer a community or group coaching?', count: 51, conversion: '22%', domain: 'Coaching' },
  { question: 'What is the Identity Shift framework?', count: 44, conversion: '19%', domain: 'Coaching' },
  { question: 'How do I build a diversified portfolio?', count: 39, conversion: '14%', domain: 'Finance' },
];

const engagementData = [
  { date: 'Apr 23', Finance: 6.2, Education: 5.1, Coaching: 8.4 },
  { date: 'Apr 24', Finance: 7.8, Education: 6.3, Coaching: 9.2 },
  { date: 'Apr 25', Finance: 7.1, Education: 5.8, Coaching: 8.8 },
  { date: 'Apr 26', Finance: 8.4, Education: 6.9, Coaching: 10.1 },
  { date: 'Apr 27', Finance: 9.2, Education: 7.4, Coaching: 11.3 },
  { date: 'Apr 28', Finance: 8.1, Education: 6.8, Coaching: 10.5 },
  { date: 'Apr 29', Finance: 9.8, Education: 7.9, Coaching: 12.1 },
];

const domainBreakdown = [
  { domain: 'Finance' as const, personas: 2, chats: 1284, engagement: '9.2%', topPersona: 'FinanceCoach — Priya', emoji: '📈' },
  { domain: 'Education' as const, personas: 1, chats: 642, engagement: '7.8%', topPersona: 'CourseGuide — Jordan', emoji: '🎓' },
  { domain: 'Coaching' as const, personas: 2, chats: 358, engagement: '11.4%', topPersona: 'Coach Dani', emoji: '🧭' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 px-3 py-2 text-xs" style={{ background: 'rgba(14,16,24,0.97)' }}>
      <p className="text-white/50 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: <span className="font-semibold text-white">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');
  const [domainFilter, setDomainFilter] = useState<Domain>('All');

  const filteredQuestions = domainFilter === 'All'
    ? topQuestions
    : topQuestions.filter((q) => q.domain === domainFilter);

  const summaryMetrics = [
    { label: 'Total Audience Chats', value: '3,284', change: '+22% vs last month', color: '#7c3aed', trend: 'up' },
    { label: 'Personas Active', value: '5', change: 'Across Finance, Education & Coaching', color: '#14b8a6', trend: 'neutral' },
    { label: 'Avg Engagement Rate', value: '9.1%', change: '+2.4% this month', color: '#34d399', trend: 'up' },
  ];

  return (
    <AppLayout>
      <Topbar title="Analytics" subtitle="Audience conversations, top questions, and engagement metrics — each persona focused on a single domain" />

      {/* Domain breakdown strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {domainBreakdown.map((d) => {
          const cfg = domainColors[d.domain];
          return (
            <div key={d.domain} className={`p-4 rounded-2xl border ${cfg.border} ${cfg.bg} flex items-center gap-4`}>
              <span className="text-2xl flex-shrink-0">{d.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold ${cfg.text}`}>{d.domain}</span>
                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${cfg.border} ${cfg.text}`}>
                    {d.personas} personas
                  </span>
                </div>
                <p className="text-sm font-bold text-white">{d.chats.toLocaleString()} chats</p>
                <p className="text-[10px] text-white/40 truncate">{d.topPersona} · {d.engagement} eng.</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Time range */}
      <div className="flex items-center gap-2 mb-6">
        {(['7d', '30d'] as const).map((r) => (
          <button
            key={r}
            onClick={() => setTimeRange(r)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              timeRange === r
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-white/40 hover:text-white/70 border border-white/8 hover:border-white/15'
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
          <h2 className="text-sm font-semibold text-white mb-1">Audience Conversations by Domain</h2>
          <p className="text-xs text-white/35 mb-4">Chats across Finance, Education, and Coaching personas</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={conversationData}>
              <defs>
                {(['Finance', 'Education', 'Coaching'] as const).map((d) => (
                  <linearGradient key={d} id={`grad${d}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={domainColors[d].chart} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={domainColors[d].chart} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              {(['Finance', 'Education', 'Coaching'] as const).map((d) => (
                <Area key={d} type="monotone" dataKey={d} name={d} stroke={domainColors[d].chart} fill={`url(#grad${d})`} strokeWidth={2} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement chart */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-semibold text-white">Engagement Rate by Domain</h2>
            <span className="text-[10px] text-white/35 border border-white/10 px-2 py-0.5 rounded-full">
              Chat → Course/Booking click
            </span>
          </div>
          <p className="text-xs text-white/35 mb-4">Coaching leads engagement; Finance drives volume</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip content={<CustomTooltip />} />
              {(['Finance', 'Education', 'Coaching'] as const).map((d) => (
                <Bar key={d} dataKey={d} name={d} fill={domainColors[d].chart} radius={[3, 3, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top questions with domain filter */}
      <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/6 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-sm font-semibold text-white">Top Audience Questions</h2>
            <p className="text-xs text-white/40 mt-0.5">Most asked questions across all creator personas and domains</p>
          </div>
          <div className="flex items-center gap-1.5">
            {(['All', 'Finance', 'Education', 'Coaching'] as Domain[]).map((d) => {
              const cfg = d !== 'All' ? domainColors[d] : null;
              return (
                <button
                  key={d}
                  onClick={() => setDomainFilter(d)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border ${
                    domainFilter === d
                      ? cfg
                        ? `${cfg.text} ${cfg.bg} ${cfg.border}`
                        : 'bg-white/10 text-white border-white/20' :'text-white/35 border-white/8 hover:text-white/60'
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
        <div className="divide-y divide-white/5">
          {filteredQuestions.map((q, i) => {
            const cfg = domainColors[q.domain];
            return (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/2 transition-colors">
                <span className="text-xs font-bold text-white/20 w-5 flex-shrink-0">{i + 1}</span>
                <p className="flex-1 text-sm text-white/75 min-w-0 truncate">{q.question}</p>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border hidden sm:inline ${cfg.text} ${cfg.bg} ${cfg.border}`}>
                    {q.domain}
                  </span>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-semibold text-white">{q.count}</p>
                    <p className="text-[10px] text-white/30">asked</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-[#34d399]">{q.conversion}</p>
                    <p className="text-[10px] text-white/30">engagement</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
