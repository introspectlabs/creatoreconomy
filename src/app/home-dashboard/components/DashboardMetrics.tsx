import React from 'react';
import { Brain, MessageSquare, Database, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Coins, ShoppingBag } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const metrics = [
  {
    id: 'metric-personas',
    label: 'Active AI Sales Agents',
    value: '4',
    change: '+1 this week',
    trend: 'up',
    icon: Brain,
    color: 'purple',
    alert: false,
  },
  {
    id: 'metric-messages',
    label: 'Product Conversations (24h)',
    value: '3,218',
    change: '+22.6% vs yesterday',
    trend: 'up',
    icon: MessageSquare,
    color: 'blue',
    alert: false,
  },
  {
    id: 'metric-conversions',
    label: 'Conversion Rate',
    value: '18.3%',
    change: '+2.1% this week',
    trend: 'up',
    icon: CheckCircle,
    color: 'emerald',
    alert: false,
  },
  {
    id: 'metric-aov',
    label: 'Avg Order Value',
    value: '₹2,840',
    change: '+₹320 vs last week',
    trend: 'up',
    icon: ShoppingBag,
    color: 'teal',
    alert: false,
  },
  {
    id: 'metric-tokens',
    label: 'Tokens Used (24h)',
    value: '1.4M',
    change: '71% of daily quota',
    trend: 'warning',
    icon: Coins,
    color: 'amber',
    alert: true,
  },
  {
    id: 'metric-knowledge',
    label: 'Product Catalog Chunks',
    value: '12,540',
    change: '1 source failed sync',
    trend: 'warning',
    icon: Database,
    color: 'rose',
    alert: true,
  },
];

const colorMap: Record<string, { icon: string; bg: string; border: string }> = {
  purple:  { icon: 'text-purple-400',  bg: 'bg-purple-500/10',  border: 'border-purple-500/20'  },
  blue:    { icon: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20'    },
  teal:    { icon: 'text-teal-400',    bg: 'bg-teal-500/10',    border: 'border-teal-500/20'    },
  emerald: { icon: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  amber:   { icon: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/25'   },
  rose:    { icon: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/25'    },
};

export default function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {metrics.map((m) => {
        const Icon = m.icon;
        const c = colorMap[m.color];
        return (
          <div
            key={m.id}
            className={`relative rounded-2xl border p-4 card-hover ${
              m.alert
                ? 'bg-amber-500/5 border-amber-500/25'
                : `glass ${c.border}`
            }`}
          >
            {m.alert && (
              <div className="absolute top-3 right-3">
                <AlertTriangle size={12} className="text-amber-400" />
              </div>
            )}
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 ${c.bg}`}>
              <Icon size={16} className={c.icon} />
            </div>
            <p className="text-[11px] font-500 text-white/40 uppercase tracking-wider mb-1">{m.label}</p>
            <p className="text-2xl font-700 text-white tabular-nums">{m.value}</p>
            <div className="flex items-center gap-1 mt-1.5">
              {m.trend === 'up' && <TrendingUp size={11} className="text-emerald-400 flex-shrink-0" />}
              {m.trend === 'down' && <TrendingDown size={11} className="text-rose-400 flex-shrink-0" />}
              {m.trend === 'warning' && <AlertTriangle size={11} className="text-amber-400 flex-shrink-0" />}
              <p className={`text-[11px] truncate ${
                m.trend === 'up' ? 'text-emerald-400' :
                m.trend === 'down' ? 'text-rose-400' :
                m.trend === 'warning'? 'text-amber-400' : 'text-white/35'
              }`}>
                {m.change}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}