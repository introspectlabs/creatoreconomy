'use client';
import React from 'react';
import Link from 'next/link';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';

type Domain = 'Finance' | 'Education' | 'Coaching';

const domainColors: Record<Domain, { text: string; bg: string; border: string }> = {
  Finance:   { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25' },
  Education: { text: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/25'    },
  Coaching:  { text: 'text-orange-400',  bg: 'bg-orange-500/10',  border: 'border-orange-500/25'  },
};

const metrics = [
  {
    label: 'Active Personas',
    value: '3',
    change: '+1 this week',
    trend: 'up',
    color: '#7c3aed',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: 'Audience Chats (30d)',
    value: '3,284',
    change: '+22% vs last month',
    trend: 'up',
    color: '#14b8a6',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: 'Engagement Rate',
    value: '9.1%',
    change: '+2.4% this month',
    trend: 'up',
    color: '#34d399',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    label: 'Domains Covered',
    value: '3',
    change: 'Finance · Education · Coaching',
    trend: 'neutral',
    color: '#0ea5e9',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

const personasSummary = [
  {
    id: 'finance-priya',
    name: 'FinanceCoach — Priya',
    domain: 'Finance' as Domain,
    status: 'active',
    conversations: 1284,
    conversion: '9.2%',
    emoji: '📈',
  },
  {
    id: 'coach-dani',
    name: 'Coach Dani',
    domain: 'Coaching' as Domain,
    status: 'active',
    conversations: 842,
    conversion: '11.4%',
    emoji: '🧭',
  },
  {
    id: 'course-jordan',
    name: 'CourseGuide — Jordan',
    domain: 'Education' as Domain,
    status: 'draft',
    conversations: 0,
    conversion: '—',
    emoji: '🎓',
  },
];

const recentActivity = [
  { text: 'FinanceCoach — Priya answered 62 investor questions today', time: '1h ago', color: '#34d399' },
  { text: 'Coach Dani completed 8 audience coaching sessions', time: '2h ago', color: '#7c3aed' },
  { text: 'CourseGuide — Jordan persona created (draft)', time: '4h ago', color: '#14b8a6' },
  { text: 'Finance newsletter archive synced — 2,800 new chunks', time: '1 day ago', color: '#0ea5e9' },
];

export default function DashboardPage() {
  const statusStyle = (status: string) => {
    if (status === 'active') return 'bg-[#34d399]/15 text-[#34d399] border-[#34d399]/25';
    if (status === 'paused') return 'bg-amber-500/15 text-amber-400 border-amber-500/25';
    return 'bg-white/8 text-white/40 border-white/10';
  };

  return (
    <AppLayout>
      <Topbar
        title="Dashboard"
        subtitle="Your creator personas, each focused on a single domain, engaging your audience 24/7"
        action={
          <Link href="/create-persona" className="px-4 py-2 rounded-xl text-sm font-semibold text-white btn-primary flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Persona
          </Link>
        }
      />

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics?.map((m) => (
          <div key={m?.label} className="p-4 rounded-2xl border border-white/8 bg-white/[0.03] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/45">{m?.label}</span>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${m?.color}20`, color: m?.color }}>
                {m?.icon}
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{m?.value}</p>
              <p className={`text-xs mt-0.5 ${m?.trend === 'up' ? 'text-[#34d399]' : 'text-white/35'}`}>{m?.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Personas summary */}
        <div className="xl:col-span-2">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
              <h2 className="text-sm font-semibold text-white">Your Creator Personas</h2>
              <Link href="/personas" className="text-xs text-[#7c3aed] hover:text-[#a78bfa] transition-colors">
                View all →
              </Link>
            </div>
            <div className="divide-y divide-white/5">
              {personasSummary.map((p) => {
                const dc = domainColors[p.domain];
                return (
                  <div key={p.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/3 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center text-xl flex-shrink-0">
                      {p.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-sm font-medium text-white truncate">{p.name}</p>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${statusStyle(p.status)}`}>
                          {p.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${dc.text} ${dc.bg} ${dc.border}`}>
                          {p.domain}
                        </span>
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-0.5">
                      <p className="text-sm font-semibold text-white">{p.conversations.toLocaleString()}</p>
                      <p className="text-[10px] text-white/35">conversations</p>
                    </div>
                    <div className="hidden md:flex flex-col items-end gap-0.5">
                      <p className="text-sm font-semibold text-[#34d399]">{p.conversion}</p>
                      <p className="text-[10px] text-white/35">engagement</p>
                    </div>
                    <Link
                      href="/personas"
                      className="text-[11px] px-2.5 py-1.5 rounded-lg border border-white/10 text-white/55 hover:text-white hover:border-white/25 transition-all flex-shrink-0"
                    >
                      Manage
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Activity + Quick actions */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-2">
              {[
                { href: '/personas',       label: 'Manage Personas',    icon: '🎭', color: '#7c3aed' },
                { href: '/deploy',         label: 'Deploy to Channel',  icon: '🚀', color: '#14b8a6' },
                { href: '/embeds',         label: 'Manage Embeds',      icon: '💻', color: '#0ea5e9' },
                { href: '/analytics',      label: 'View Analytics',     icon: '📊', color: '#34d399' },
                { href: '/knowledge-base', label: 'Knowledge Base',     icon: '📚', color: '#f59e0b' },
                { href: '/conversations',  label: 'View Conversations', icon: '💬', color: '#a78bfa' },
              ]?.map((action) => (
                <Link
                  key={action?.href}
                  href={action?.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/6 hover:border-white/15 hover:bg-white/4 transition-all group"
                >
                  <span className="text-base">{action?.icon}</span>
                  <span className="text-sm text-white/65 group-hover:text-white transition-colors">{action?.label}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto text-white/20 group-hover:text-white/50 transition-colors">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Recent Activity</h2>
            <div className="flex flex-col gap-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: a.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/65 leading-relaxed">{a.text}</p>
                    <p className="text-[10px] text-white/30 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
