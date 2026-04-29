'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import { Globe, Database, Brain, RefreshCw, TrendingUp, AlertTriangle, Activity, BarChart2, Layers, Zap, ArrowUpRight,  } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Icon from '@/components/ui/AppIcon';


// ── Mock Data ──────────────────────────────────────────────────────────────────

const summaryMetrics = [
  {
    id: 'sm-1',
    label: 'Product Sources Indexed',
    value: '14',
    change: '+3 this week',
    trend: 'up',
    icon: Globe,
    color: 'blue',
  },
  {
    id: 'sm-2',
    label: 'Total Product Pages',
    value: '8,241',
    change: '+1,204 since last sync',
    trend: 'up',
    icon: Layers,
    color: 'purple',
  },
  {
    id: 'sm-3',
    label: 'Catalog Chunks',
    value: '24,891',
    change: '1 source failed sync',
    trend: 'warning',
    icon: Database,
    color: 'amber',
  },
  {
    id: 'sm-4',
    label: 'Agents Covered',
    value: '11 / 12',
    change: '1 agent missing catalog',
    trend: 'warning',
    icon: Brain,
    color: 'rose',
  },
  {
    id: 'sm-5',
    label: 'Avg Sync Duration',
    value: '4m 12s',
    change: '-38s vs last week',
    trend: 'up',
    icon: Zap,
    color: 'teal',
  },
  {
    id: 'sm-6',
    label: 'Sync Success Rate',
    value: '96.4%',
    change: '+0.8% this month',
    trend: 'up',
    icon: Activity,
    color: 'emerald',
  },
];

const colorMap: Record<string, { icon: string; bg: string; border: string }> = {
  blue:    { icon: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20'    },
  purple:  { icon: 'text-purple-400',  bg: 'bg-purple-500/10',  border: 'border-purple-500/20'  },
  amber:   { icon: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/25'   },
  rose:    { icon: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/25'    },
  teal:    { icon: 'text-teal-400',    bg: 'bg-teal-500/10',    border: 'border-teal-500/20'    },
  emerald: { icon: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
};

const domainCrawlData = [
  { domain: 'zaraskin.com/products',    pages: 1240, chunks: 3820, status: 'healthy',  lastSync: '2h ago',   syncTime: '3m 44s' },
  { domain: 'nutriblend.in/catalog',    pages: 980,  chunks: 2910, status: 'healthy',  lastSync: '2h ago',   syncTime: '2m 58s' },
  { domain: 'stylehouse.co/collections', pages: 620, chunks: 1840, status: 'healthy',  lastSync: '6h ago',   syncTime: '1m 52s' },
  { domain: 'fitfuel.com/supplements',  pages: 410,  chunks: 1220, status: 'warning',  lastSync: '14h ago',  syncTime: '5m 10s' },
  { domain: 'glowup.in/beauty',         pages: 870,  chunks: 2580, status: 'healthy',  lastSync: '2h ago',   syncTime: '2m 34s' },
  { domain: 'theogear.com/shop',        pages: 120,  chunks: 360,  status: 'failed',   lastSync: '3 days ago', syncTime: '—'    },
  { domain: 'purehome.in/decor',        pages: 45,   chunks: 130,  status: 'healthy',  lastSync: '2h ago',   syncTime: '0m 28s' },
  { domain: 'luxescent.com/fragrances', pages: 88,   chunks: 260,  status: 'healthy',  lastSync: '2h ago',   syncTime: '0m 44s' },
];

const crawlTrendData = [
  { date: 'Mar 30', pages: 6800, chunks: 20400 },
  { date: 'Mar 31', pages: 7100, chunks: 21300 },
  { date: 'Apr 1',  pages: 7400, chunks: 22200 },
  { date: 'Apr 2',  pages: 7600, chunks: 22800 },
  { date: 'Apr 3',  pages: 7900, chunks: 23700 },
  { date: 'Apr 4',  pages: 8100, chunks: 24300 },
  { date: 'Apr 5',  pages: 8241, chunks: 24891 },
];

const chunkUsageData = [
  { hour: '00:00', retrieved: 420,  cached: 310 },
  { hour: '02:00', retrieved: 180,  cached: 140 },
  { hour: '04:00', retrieved: 90,   cached: 70  },
  { hour: '06:00', retrieved: 340,  cached: 260 },
  { hour: '08:00', retrieved: 1240, cached: 940 },
  { hour: '10:00', retrieved: 2100, cached: 1580 },
  { hour: '12:00', retrieved: 2480, cached: 1860 },
  { hour: '14:00', retrieved: 2260, cached: 1700 },
  { hour: '16:00', retrieved: 1980, cached: 1490 },
  { hour: '18:00', retrieved: 1540, cached: 1160 },
  { hour: '20:00', retrieved: 980,  cached: 740  },
  { hour: '22:00', retrieved: 620,  cached: 470  },
];

const topChunks = [
  { id: 'tc-1', source: 'ZaraSkin_Product_Catalog_v3.pdf',     hits: 4821, persona: 'ZaraSkin Sales Agent',    domain: 'zaraskin.com/products'    },
  { id: 'tc-2', source: 'NutriBlend_SKU_Feed_Apr2026.csv',     hits: 3640, persona: 'NutriBlend Store Bot',    domain: 'nutriblend.in/catalog'    },
  { id: 'tc-3', source: 'StyleHouse_Summer_Collection_2026.pdf', hits: 2980, persona: 'StyleHouse Fashion Bot', domain: 'stylehouse.co/collections' },
  { id: 'tc-4', source: 'FitFuel_Supplement_FAQ_v2.txt',       hits: 2410, persona: 'FitFuel Voice Agent',     domain: 'fitfuel.com/supplements'  },
  { id: 'tc-5', source: 'Brand_Voice_Guidelines_D2C.pdf',      hits: 1870, persona: 'ZaraSkin Sales Agent',    domain: 'zaraskin.com/products'    },
];

const personaCoverageData = [
  { name: 'ZaraSkin',    chunks: 9100, domains: 3, coverage: 94, status: 'healthy'  },
  { name: 'NutriBlend',  chunks: 12400, domains: 2, coverage: 88, status: 'healthy'  },
  { name: 'StyleHouse',  chunks: 8200, domains: 2, coverage: 82, status: 'healthy'  },
  { name: 'FitFuel',     chunks: 5240, domains: 1, coverage: 61, status: 'warning'  },
  { name: 'GlowUp',      chunks: 7840, domains: 3, coverage: 91, status: 'healthy'  },
  { name: 'TheoGear',    chunks: 4600, domains: 2, coverage: 75, status: 'healthy'  },
  { name: 'PureHome',    chunks: 8920, domains: 1, coverage: 48, status: 'warning'  },
  { name: 'BrewCraft',   chunks: 3400, domains: 2, coverage: 86, status: 'healthy'  },
  { name: 'ActiveWear',  chunks: 4200, domains: 3, coverage: 93, status: 'healthy'  },
  { name: 'LuxeScent',   chunks: 5100, domains: 1, coverage: 38, status: 'critical' },
  { name: 'GlobalShop',  chunks: 2800, domains: 2, coverage: 79, status: 'healthy'  },
  { name: 'StreamGuide', chunks: 0,    domains: 0, coverage: 0,  status: 'no-kb'   },
];

const syncHistoryData = [
  { date: 'Mar 30', success: 12, failed: 1, skipped: 1 },
  { date: 'Mar 31', success: 13, failed: 0, skipped: 1 },
  { date: 'Apr 1',  success: 11, failed: 2, skipped: 1 },
  { date: 'Apr 2',  success: 14, failed: 0, skipped: 0 },
  { date: 'Apr 3',  success: 13, failed: 1, skipped: 0 },
  { date: 'Apr 4',  success: 14, failed: 0, skipped: 0 },
  { date: 'Apr 5',  success: 13, failed: 1, skipped: 0 },
];

const syncDurationData = [
  { date: 'Mar 30', duration: 5.2 },
  { date: 'Mar 31', duration: 4.8 },
  { date: 'Apr 1',  duration: 6.1 },
  { date: 'Apr 2',  duration: 4.4 },
  { date: 'Apr 3',  duration: 4.9 },
  { date: 'Apr 4',  duration: 4.3 },
  { date: 'Apr 5',  duration: 4.2 },
];

const pieData = [
  { name: 'Healthy',  value: 9,  color: '#34d399' },
  { name: 'Warning',  value: 2,  color: '#fbbf24' },
  { name: 'Critical', value: 1,  color: '#f87171' },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function StatusDot({ status }: { status: string }) {
  const map: Record<string, string> = {
    healthy:  'bg-emerald-400',
    warning:  'bg-amber-400',
    failed:   'bg-rose-500',
    critical: 'bg-rose-500',
    'no-kb':  'bg-white/20',
  };
  return <span className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${map[status] ?? 'bg-white/20'}`} />;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    healthy:  'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    warning:  'bg-amber-500/15 text-amber-400 border-amber-500/25',
    failed:   'bg-rose-500/15 text-rose-400 border-rose-500/25',
    critical: 'bg-rose-500/15 text-rose-400 border-rose-500/25',
    'no-kb':  'bg-white/5 text-white/30 border-white/10',
  };
  const labels: Record<string, string> = {
    healthy: 'Healthy', warning: 'Warning', failed: 'Failed', critical: 'Critical', 'no-kb': 'No KB',
  };
  return (
    <span className={`text-[10px] font-600 px-2 py-0.5 rounded-full border ${map[status] ?? ''}`}>
      {labels[status] ?? status}
    </span>
  );
}

const CustomTooltipDark = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 px-3 py-2 text-xs" style={{ background: 'rgba(14,16,24,0.97)' }}>
      <p className="text-white/50 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>{p.name}: <span className="font-600 text-white">{p.value?.toLocaleString()}</span></p>
      ))}
    </div>
  );
};

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  return (
    <AppLayout>
      <Topbar title="Analytics" />

        <div className="space-y-6">

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-base sm:text-lg font-700 text-white">D2C Catalog & Agent Analytics</h1>
              <p className="text-xs text-white/40 mt-0.5">Product catalog sync stats, chunk usage, agent coverage, and source health</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {(['7d', '30d', '90d'] as const).map((r) => (
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
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-600 text-white/40 border border-white/8 hover:text-white/70 hover:border-white/15 transition-all">
                <RefreshCw size={12} /> Refresh
              </button>
            </div>
          </div>

          {/* Summary Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
            {summaryMetrics.map((m) => {
              const Icon = m.icon;
              const c = colorMap[m.color];
              return (
                <div
                  key={m.id}
                  className={`relative rounded-2xl border p-4 glass ${
                    m.trend === 'warning' ? 'border-amber-500/25 bg-amber-500/5' : c.border
                  }`}
                >
                  {m.trend === 'warning' && (
                    <AlertTriangle size={11} className="absolute top-3 right-3 text-amber-400" />
                  )}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 ${c.bg}`}>
                    <Icon size={16} className={c.icon} />
                  </div>
                  <p className="text-[10px] font-500 text-white/40 uppercase tracking-wider mb-1">{m.label}</p>
                  <p className="text-2xl font-700 text-white tabular-nums">{m.value}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    {m.trend === 'up' && <TrendingUp size={10} className="text-emerald-400 flex-shrink-0" />}
                    {m.trend === 'warning' && <AlertTriangle size={10} className="text-amber-400 flex-shrink-0" />}
                    <p className={`text-[10px] truncate ${m.trend === 'up' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {m.change}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 2: Crawl Trend + Chunk Usage */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

            {/* Crawl Growth Trend */}
            <div className="glass rounded-2xl border border-white/8 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-600 text-white">Crawl Growth</h2>
                  <p className="text-[11px] text-white/35 mt-0.5">Pages & chunks indexed over time</p>
                </div>
                <BarChart2 size={16} className="text-white/20" />
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={crawlTrendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradChunks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradPages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltipDark />} />
                  <Area type="monotone" dataKey="chunks" name="Chunks" stroke="#a78bfa" strokeWidth={2} fill="url(#gradChunks)" />
                  <Area type="monotone" dataKey="pages" name="Pages" stroke="#60a5fa" strokeWidth={2} fill="url(#gradPages)" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-400" /><span className="text-[11px] text-white/40">Chunks</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-400" /><span className="text-[11px] text-white/40">Pages</span></div>
              </div>
            </div>

            {/* Chunk Retrieval (24h) */}
            <div className="glass rounded-2xl border border-white/8 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-600 text-white">Chunk Retrieval (24h)</h2>
                  <p className="text-[11px] text-white/35 mt-0.5">Retrieved vs cache hits by hour</p>
                </div>
                <Database size={16} className="text-white/20" />
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chunkUsageData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={8} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="hour" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltipDark />} />
                  <Bar dataKey="retrieved" name="Retrieved" fill="#a78bfa" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="cached" name="Cached" fill="#34d399" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-400" /><span className="text-[11px] text-white/40">Retrieved</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /><span className="text-[11px] text-white/40">Cache Hits</span></div>
              </div>
            </div>
          </div>

          {/* Row 3: Domain Table + Top Chunks */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

            {/* Domain Crawl Table */}
            <div className="xl:col-span-2 glass rounded-2xl border border-white/8 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-600 text-white">Domain Crawl Stats</h2>
                  <p className="text-[11px] text-white/35 mt-0.5">Per-domain pages, chunks, and sync status</p>
                </div>
                <Globe size={16} className="text-white/20" />
              </div>
              <div className="overflow-x-auto -mx-1 px-1">
                <table className="w-full text-xs min-w-[480px]">
                  <thead>
                    <tr className="border-b border-white/6">
                      <th className="text-left text-[10px] font-600 text-white/30 uppercase tracking-wider pb-2 pr-4">Domain</th>
                      <th className="text-right text-[10px] font-600 text-white/30 uppercase tracking-wider pb-2 pr-4">Pages</th>
                      <th className="text-right text-[10px] font-600 text-white/30 uppercase tracking-wider pb-2 pr-4">Chunks</th>
                      <th className="text-left text-[10px] font-600 text-white/30 uppercase tracking-wider pb-2 pr-4">Last Sync</th>
                      <th className="text-left text-[10px] font-600 text-white/30 uppercase tracking-wider pb-2 pr-4">Duration</th>
                      <th className="text-left text-[10px] font-600 text-white/30 uppercase tracking-wider pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/4">
                    {domainCrawlData.map((d) => (
                      <tr key={d.domain} className="hover:bg-white/3 transition-colors">
                        <td className="py-2.5 pr-4">
                          <div className="flex items-center gap-2">
                            <StatusDot status={d.status} />
                            <span className="text-white/80 font-500">{d.domain}</span>
                          </div>
                        </td>
                        <td className="py-2.5 pr-4 text-right text-white/60 tabular-nums">{d.pages.toLocaleString()}</td>
                        <td className="py-2.5 pr-4 text-right text-white/60 tabular-nums">{d.chunks.toLocaleString()}</td>
                        <td className="py-2.5 pr-4 text-white/40">{d.lastSync}</td>
                        <td className="py-2.5 pr-4 text-white/40 tabular-nums">{d.syncTime}</td>
                        <td className="py-2.5"><StatusBadge status={d.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Chunks by Hits */}
            <div className="glass rounded-2xl border border-white/8 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-600 text-white">Top Chunks</h2>
                  <p className="text-[11px] text-white/35 mt-0.5">Most retrieved knowledge sources</p>
                </div>
                <ArrowUpRight size={16} className="text-white/20" />
              </div>
              <div className="space-y-3">
                {topChunks.map((c, idx) => (
                  <div key={c.id} className="flex items-start gap-3">
                    <span className="text-[11px] font-700 text-white/20 w-4 flex-shrink-0 mt-0.5 tabular-nums">{idx + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-500 text-white/80 truncate">{c.source}</p>
                      <p className="text-[10px] text-white/35 mt-0.5 truncate">{c.persona} · {c.domain}</p>
                      <div className="mt-1.5 h-1 rounded-full bg-white/8 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                          style={{ width: `${Math.round((c.hits / topChunks[0].hits) * 100)}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-[11px] font-600 text-white/50 tabular-nums flex-shrink-0">{c.hits.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 4: Persona Coverage */}
          <div className="glass rounded-2xl border border-white/8 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="text-sm font-600 text-white">Persona Knowledge Coverage</h2>
                <p className="text-[11px] text-white/35 mt-0.5">KB chunks assigned and coverage score per persona</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /><span className="text-[10px] text-white/35">Healthy ≥80%</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /><span className="text-[10px] text-white/35">Warning 40–79%</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-400" /><span className="text-[10px] text-white/35">Critical &lt;40%</span></div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3">
              {personaCoverageData.map((p) => {
                const barColor =
                  p.status === 'healthy' ? 'from-emerald-500 to-teal-500' :
                  p.status === 'warning' ? 'from-amber-500 to-yellow-500' :
                  p.status === 'critical'? 'from-rose-500 to-red-500' : 'from-white/10 to-white/5';
                const textColor =
                  p.status === 'healthy' ? 'text-emerald-400' :
                  p.status === 'warning' ? 'text-amber-400' :
                  p.status === 'critical'? 'text-rose-400' : 'text-white/25';
                return (
                  <div key={p.name} className="rounded-xl border border-white/8 bg-white/3 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-600 text-white/80">{p.name}</span>
                      <StatusBadge status={p.status} />
                    </div>
                    <p className={`text-2xl font-700 tabular-nums ${textColor}`}>{p.coverage}%</p>
                    <div className="mt-2 h-1.5 rounded-full bg-white/8 overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all`} style={{ width: `${p.coverage}%` }} />
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-white/30">{p.chunks.toLocaleString()} chunks</span>
                      <span className="text-[10px] text-white/30">{p.domains}d</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 5: Sync Performance */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

            {/* Sync Outcomes */}
            <div className="glass rounded-2xl border border-white/8 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-600 text-white">Sync Outcomes (7d)</h2>
                  <p className="text-[11px] text-white/35 mt-0.5">Success, failed, and skipped syncs per day</p>
                </div>
                <Activity size={16} className="text-white/20" />
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={syncHistoryData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={12} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltipDark />} />
                  <Bar dataKey="success" name="Success" fill="#34d399" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="failed" name="Failed" fill="#f87171" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="skipped" name="Skipped" fill="rgba(255,255,255,0.15)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /><span className="text-[11px] text-white/40">Success</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-400" /><span className="text-[11px] text-white/40">Failed</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-white/20" /><span className="text-[11px] text-white/40">Skipped</span></div>
              </div>
            </div>

            {/* Sync Duration Trend + Pie */}
            <div className="glass rounded-2xl border border-white/8 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-600 text-white">Sync Duration & Health</h2>
                  <p className="text-[11px] text-white/35 mt-0.5">Avg sync time (min) and domain health split</p>
                </div>
                <Zap size={16} className="text-white/20" />
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height={160}>
                    <LineChart data={syncDurationData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[3, 7]} />
                      <Tooltip content={<CustomTooltipDark />} />
                      <Line type="monotone" dataKey="duration" name="Duration (min)" stroke="#a78bfa" strokeWidth={2} dot={{ fill: '#a78bfa', r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col items-center gap-2 pt-2">
                  <PieChart width={100} height={100}>
                    <Pie data={pieData} cx={50} cy={50} innerRadius={28} outerRadius={44} dataKey="value" strokeWidth={0}>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className="space-y-1">
                    {pieData.map((p) => (
                      <div key={p.name} className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                        <span className="text-[10px] text-white/40">{p.name}: {p.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
    </AppLayout>
  );
}
