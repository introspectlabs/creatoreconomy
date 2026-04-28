import React from 'react';
import Link from 'next/link';
import { Brain, Radio, Database, Code2, ArrowRight } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const actions = [
  {
    id: 'qa-persona',
    icon: Brain,
    title: 'Build Your AI Persona',
    desc: 'Create a finance, coaching, course, or D2C persona trained on your content and voice',
    href: '/persona-library',
    color: 'from-purple-500/20 to-purple-600/10',
    border: 'border-purple-500/20',
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-400',
  },
  {
    id: 'qa-knowledge',
    icon: Database,
    title: 'Upload Your Content',
    desc: 'Add course modules, coaching frameworks, finance guides, or product FAQs to train your persona',
    href: '/knowledge-base',
    color: 'from-teal-500/15 to-teal-600/5',
    border: 'border-teal-500/20',
    iconBg: 'bg-teal-500/20',
    iconColor: 'text-teal-400',
  },
  {
    id: 'qa-channel',
    icon: Radio,
    title: 'Connect a Channel',
    desc: 'Deploy your persona on WhatsApp, Web Chat, or your course platform',
    href: '/channels-page',
    color: 'from-blue-500/15 to-blue-600/5',
    border: 'border-blue-500/20',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    id: 'qa-embed',
    icon: Code2,
    title: 'Embed on Your Site',
    desc: 'Add a chat widget to your landing page, course portal, or D2C storefront',
    href: '/embeds-plugins',
    color: 'from-indigo-500/15 to-indigo-600/5',
    border: 'border-indigo-500/20',
    iconBg: 'bg-indigo-500/20',
    iconColor: 'text-indigo-400',
  },
];

export default function QuickActions() {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-600 text-white">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions?.map((a) => {
          const Icon = a?.icon;
          return (
            <Link
              key={a?.id}
              href={a?.href}
              className={`group relative rounded-xl border p-4 bg-gradient-to-br ${a?.color} ${a?.border} hover:scale-[1.02] transition-all duration-200 hover:shadow-lg`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${a?.iconBg}`}>
                <Icon size={17} className={a?.iconColor} />
              </div>
              <p className="text-sm font-600 text-white mb-1">{a?.title}</p>
              <p className="text-[12px] text-white/45 leading-snug">{a?.desc}</p>
              <ArrowRight size={14} className="absolute top-4 right-4 text-white/20 group-hover:text-white/50 transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}