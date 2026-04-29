import React from 'react';
import Link from 'next/link';
import { Brain, Database, Plug, ShoppingBag, TrendingUp, Package, Tag } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const activities = [
  {
    id: 'act-001',
    type: 'success',
    icon: ShoppingBag,
    title: 'AI Sales Agent "ZaraSkin Bot" drove 12 product sales — ₹34,080 revenue',
    time: '3 min ago',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    id: 'act-002',
    type: 'warning',
    icon: Database,
    title: 'Product catalog sync failed — "Summer Collection 2026 — SKU batch 3"',
    time: '18 min ago',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    id: 'act-003',
    type: 'success',
    icon: TrendingUp,
    title: 'Conversion rate up 4.2% — "NutriBlend Store" AI agent upsell flow active',
    time: '1 hr ago',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    id: 'act-004',
    type: 'info',
    icon: Package,
    title: 'New product feed indexed — 248 SKUs added to "GlowUp Skincare" agent',
    time: '2 hr ago',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    id: 'act-005',
    type: 'warning',
    icon: Plug,
    title: 'ElevenLabs voice quota at 84% — WhatsApp agent responses may be delayed',
    time: '3 hr ago',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    id: 'act-006',
    type: 'success',
    icon: Brain,
    title: 'AI Sales Agent "FitFuel — Arjun" training complete — ready to deploy',
    time: '5 hr ago',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    id: 'act-007',
    type: 'info',
    icon: Tag,
    title: '3,200 new product chunks indexed from Shopify export — "StyleHouse" store',
    time: '7 hr ago',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
  },
];

export default function ActivityFeed() {
  return (
    <div className="glass rounded-2xl p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-600 text-white">Recent Activity</h3>
        <Link href="/activity" className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors">View all</Link>
      </div>
      <div className="space-y-3">
        {activities?.map((a) => {
          const Icon = a?.icon;
          return (
            <div key={a?.id} className="flex items-start gap-3 group">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${a?.bg}`}>
                <Icon size={13} className={a?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white/70 leading-snug">{a?.title}</p>
                <p className="text-[10px] text-white/30 mt-0.5">{a?.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}