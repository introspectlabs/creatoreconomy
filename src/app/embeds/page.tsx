'use client';
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import Link from 'next/link';

interface Embed {
  id: string;
  name: string;
  persona: string;
  channel: string;
  channelIcon: string;
  domain: string;
  status: 'active' | 'paused';
  views: number;
  chats: number;
  deployedAt: string;
}

const embeds: Embed[] = [
  {
    id: 'e1',
    name: 'Glow AI — Website',
    persona: 'Aria Sales',
    channel: 'Web Embed',
    channelIcon: '💻',
    domain: 'glowskincare.com',
    status: 'active',
    views: 4821,
    chats: 312,
    deployedAt: 'Mar 15, 2026',
  },
  {
    id: 'e2',
    name: 'Glow AI — Shopify',
    persona: 'Aria Sales',
    channel: 'Shopify Plugin',
    channelIcon: '🛍️',
    domain: 'glowskincare.myshopify.com',
    status: 'active',
    views: 2140,
    chats: 198,
    deployedAt: 'Mar 20, 2026',
  },
  {
    id: 'e3',
    name: 'Blog Widget',
    persona: 'Nova Customer Success',
    channel: 'Web Embed',
    channelIcon: '💻',
    domain: 'blog.glowskincare.com',
    status: 'paused',
    views: 0,
    chats: 0,
    deployedAt: 'Feb 10, 2026',
  },
  {
    id: 'e4',
    name: 'Support WhatsApp',
    persona: 'Support Bot v2',
    channel: 'WhatsApp',
    channelIcon: '📱',
    domain: '+1 (555) 012-3456',
    status: 'active',
    views: 1340,
    chats: 890,
    deployedAt: 'Apr 1, 2026',
  },
];

const snippetFor = (embed: Embed) => `<!-- PersonaMatrix AI Widget -->
<script>
  window.PersonaMatrix = {
    personaId: "${embed.id}",
    position: "bottom-right",
    theme: "dark",
    allowedDomains: ["${embed.domain}"]
  };
</script>
<script src="https://cdn.personamatrix.ai/widget.js" async></script>`;

function EmbedDetailModal({ embed, onClose }: { embed: Embed; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const snippet = snippetFor(embed);

  const handleCopy = () => {
    navigator.clipboard?.writeText(snippet)?.then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: 'rgba(12,14,22,0.99)', border: '1px solid rgba(255,255,255,0.10)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
          <div className="flex items-center gap-3">
            <span className="text-xl">{embed.channelIcon}</span>
            <div>
              <p className="text-sm font-semibold text-white">{embed.name}</p>
              <p className="text-xs text-white/40 font-mono mt-0.5">{embed.domain}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 p-5 border-b border-white/6">
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3 text-center">
            <p className="text-[10px] text-white/35 uppercase tracking-wider mb-1">Persona</p>
            <p className="text-xs font-medium text-white">{embed.persona}</p>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3 text-center">
            <p className="text-[10px] text-white/35 uppercase tracking-wider mb-1">Views</p>
            <p className="text-sm font-semibold text-white">{embed.views.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3 text-center">
            <p className="text-[10px] text-white/35 uppercase tracking-wider mb-1">Chats</p>
            <p className="text-sm font-semibold text-white">{embed.chats.toLocaleString()}</p>
          </div>
        </div>

        {/* Embed code (only for web/shopify) */}
        {embed.channel !== 'WhatsApp' && embed.channel !== 'Slack' && (
          <div className="p-5 border-b border-white/6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-white">Embed Code</p>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  copied
                    ? 'border-[#34d399]/40 text-[#34d399] bg-[#34d399]/10'
                    : 'border-white/10 text-white/55 hover:text-white hover:border-white/25'
                }`}
              >
                {copied ? '✓ Copied!' : 'Copy Code'}
              </button>
            </div>
            <pre
              className="text-xs text-[#a78bfa] leading-relaxed overflow-x-auto p-3 rounded-xl"
              style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.12)' }}
            >
              {snippet}
            </pre>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 p-5">
          <button className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs text-white/55 hover:text-white hover:border-white/25 transition-all">
            {embed.status === 'active' ? 'Pause Embed' : 'Resume Embed'}
          </button>
          <button className="flex-1 py-2.5 rounded-xl border border-red-500/20 text-xs text-red-400/70 hover:text-red-400 hover:bg-red-500/8 transition-all">
            Delete Embed
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EmbedsPage() {
  const [selectedEmbed, setSelectedEmbed] = useState<Embed | null>(null);
  const [embedList, setEmbedList] = useState<Embed[]>(embeds);

  const activeCount = embedList.filter((e) => e.status === 'active').length;
  const totalViews = embedList.reduce((sum, e) => sum + e.views, 0);
  const totalChats = embedList.reduce((sum, e) => sum + e.chats, 0);

  return (
    <AppLayout>
      <Topbar
        title="Embeds"
        subtitle="Manage all your deployed AI persona channels"
        action={
          <Link
            href="/deploy"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white btn-primary flex items-center gap-2"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 2L11 13" /><path d="M22 2L15 22l-4-9-9-4 20-7z" />
            </svg>
            New Deployment
          </Link>
        }
      />

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Active Embeds', value: activeCount, icon: '🟢' },
          { label: 'Total Views', value: totalViews.toLocaleString(), icon: '👁️' },
          { label: 'Total Chats', value: totalChats.toLocaleString(), icon: '💬' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 flex items-center gap-3">
            <span className="text-xl">{stat.icon}</span>
            <div>
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/40">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Embeds table */}
      <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
          <h2 className="text-sm font-semibold text-white">Deployed Channels</h2>
          <span className="text-xs text-white/30">{embedList.length} total</span>
        </div>

        {embedList.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-4xl mb-3">🚀</div>
            <p className="text-sm font-medium text-white mb-1">No deployments yet</p>
            <p className="text-xs text-white/40 mb-5">Deploy your first persona to a channel to get started.</p>
            <Link
              href="/deploy"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary"
            >
              Deploy Your First Persona
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {['Embed', 'Persona', 'Channel', 'Domain / Contact', 'Status', 'Views', 'Chats', ''].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-[10px] font-semibold text-white/35 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {embedList.map((embed) => (
                  <tr key={embed.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-medium text-white">{embed.name}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">{embed.deployedAt}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-xs text-white/55">{embed.persona}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{embed.channelIcon}</span>
                        <span className="text-xs text-white/55">{embed.channel}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-xs text-white/45 font-mono">{embed.domain}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          embed.status === 'active' ?'bg-[#34d399]/15 text-[#34d399] border-[#34d399]/25' :'bg-white/8 text-white/35 border-white/10'
                        }`}
                      >
                        {embed.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-white tabular-nums">{embed.views.toLocaleString()}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-white tabular-nums">{embed.chats.toLocaleString()}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => setSelectedEmbed(embed)}
                        className="text-xs text-white/35 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Empty state CTA if no active embeds */}
      {activeCount === 0 && embedList.length > 0 && (
        <div className="mt-4 rounded-2xl border border-[#7c3aed]/20 bg-[#7c3aed]/5 p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white mb-0.5">All embeds are paused</p>
            <p className="text-xs text-white/40">Resume an existing embed or deploy a new one to go live.</p>
          </div>
          <Link
            href="/deploy"
            className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold text-white btn-primary"
          >
            New Deployment
          </Link>
        </div>
      )}

      {selectedEmbed && (
        <EmbedDetailModal embed={selectedEmbed} onClose={() => setSelectedEmbed(null)} />
      )}
    </AppLayout>
  );
}
