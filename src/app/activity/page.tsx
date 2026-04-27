import React from 'react';
import AppLayout from '@/components/AppLayout';
import { Brain, Radio, Database, Code2, Plug, CheckCircle, XCircle, Info } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const allActivities = [
  { id: 'act-001', type: 'success', icon: Brain,    title: 'Persona "Aria Sales" activated',                   time: '2 min ago',  date: 'Today' },
  { id: 'act-002', type: 'warning', icon: Database, title: 'Knowledge sync failed — "Product Docs v3"',        time: '14 min ago', date: 'Today' },
  { id: 'act-003', type: 'success', icon: Radio,    title: 'WhatsApp channel reconnected',                     time: '1 hr ago',   date: 'Today' },
  { id: 'act-004', type: 'info',    icon: Code2,    title: 'New embed deployed on docs.acme.io',               time: '2 hr ago',   date: 'Today' },
  { id: 'act-005', type: 'warning', icon: Plug,     title: 'ElevenLabs quota at 87%',                          time: '3 hr ago',   date: 'Today' },
  { id: 'act-006', type: 'success', icon: Brain,    title: 'Persona "Support Bot v2" training complete',       time: '5 hr ago',   date: 'Today' },
  { id: 'act-007', type: 'info',    icon: Database, title: '3,200 new chunks indexed from Notion',             time: '7 hr ago',   date: 'Today' },
  { id: 'act-008', type: 'success', icon: Radio,    title: 'WhatsApp channel "Support Line" connected',         time: '9 hr ago',   date: 'Today' },
  { id: 'act-009', type: 'info',    icon: Brain,    title: 'Persona "HR Assistant" created',                   time: '11 hr ago',  date: 'Today' },
  { id: 'act-010', type: 'warning', icon: Code2,    title: 'Embed script on shop.acme.io returned 404',        time: '1 day ago',  date: 'Yesterday' },
  { id: 'act-011', type: 'success', icon: Database, title: 'Website crawl completed — 512 pages indexed',      time: '1 day ago',  date: 'Yesterday' },
  { id: 'act-012', type: 'success', icon: Plug,     title: 'OpenAI API key validated and saved',               time: '1 day ago',  date: 'Yesterday' },
  { id: 'act-013', type: 'info',    icon: Brain,    title: 'Persona "Aria Sales" updated — new voice model',   time: '2 days ago', date: '2 days ago' },
  { id: 'act-014', type: 'warning', icon: Database, title: 'PDF upload failed — file size exceeded 50MB',      time: '2 days ago', date: '2 days ago' },
  { id: 'act-015', type: 'success', icon: Radio,    title: 'WhatsApp Business API verified',                   time: '3 days ago', date: '3 days ago' },
];

const typeConfig: Record<string, { color: string; bg: string; StatusIcon: React.ElementType }> = {
  success: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', StatusIcon: CheckCircle },
  warning: { color: 'text-amber-400',   bg: 'bg-amber-500/10',   StatusIcon: XCircle     },
  info:    { color: 'text-blue-400',    bg: 'bg-blue-500/10',    StatusIcon: Info         },
};

const grouped = allActivities.reduce<Record<string, typeof allActivities>>((acc, a) => {
  if (!acc[a.date]) acc[a.date] = [];
  acc[a.date].push(a);
  return acc;
}, {});

export default function ActivityPage() {
  return (
    <AppLayout>
      <div className="pt-14 lg:pt-0 px-0 max-w-3xl mx-auto">
        <div className="mb-6 pl-12 lg:pl-0">
          <h1 className="text-xl font-700 text-white">All Activity</h1>
          <p className="text-sm text-white/40 mt-1">Full log of system events, persona actions, and channel updates</p>
        </div>

        <div className="space-y-6">
          {Object.entries(grouped).map(([date, items]) => (
            <div key={date}>
              <p className="text-[11px] font-600 text-white/30 uppercase tracking-widest mb-3">{date}</p>
              <div className="glass rounded-2xl divide-y divide-white/5">
                {items.map((a) => {
                  const Icon = a.icon;
                  const cfg = typeConfig[a.type];
                  return (
                    <div key={a.id} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-white/[0.02] transition-colors">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${cfg.bg}`}>
                        <Icon size={14} className={cfg.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-white/80 leading-snug">{a.title}</p>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-white/30 flex-shrink-0 mt-0.5 whitespace-nowrap">{a.time}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
