'use client';
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import Link from 'next/link';

const widgets = [
  {
    id: 'w1',
    name: 'Glow AI Widget',
    persona: 'Glow AI',
    domain: 'glowskincare.com',
    status: 'active',
    views: 4821,
    chats: 312,
  },
  {
    id: 'w2',
    name: 'Shopify Bubble',
    persona: 'Glow AI',
    domain: 'glowskincare.myshopify.com',
    status: 'active',
    views: 2140,
    chats: 198,
  },
  {
    id: 'w3',
    name: 'Blog Widget',
    persona: 'Founder Persona',
    domain: 'blog.glowskincare.com',
    status: 'inactive',
    views: 0,
    chats: 0,
  },
];

const snippet = `<!-- PersonaMatrix AI Widget -->
<script>
  window.PersonaMatrix = {
    personaId: "glow-ai",
    position: "bottom-right",
    theme: "dark",
    allowedDomains: ["glowskincare.com"]
  };
</script>
<script src="https://cdn.personamatrix.ai/widget.js" async></script>`;

export default function EmbedsPage() {
  const [copied, setCopied] = useState(false);
  const [domain, setDomain] = useState('');

  const handleCopy = () => {
    navigator.clipboard?.writeText(snippet)?.then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <AppLayout>
      <Topbar
        title="Embeds"
        subtitle="Manage your AI widget deployments"
        action={
          <Link href="/deploy" className="px-4 py-2 rounded-xl text-sm font-semibold text-white btn-primary flex items-center gap-2">
            + New Embed
          </Link>
        }
      />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* Widget preview */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Widget Preview</h2>
          <div
            className="relative rounded-xl overflow-hidden border border-white/8 bg-[#0d0f1a] flex items-center justify-center"
            style={{ minHeight: 220 }}
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#7c3aed] flex items-center justify-center text-xl mx-auto mb-3">
                🧴
              </div>
              <p className="text-xs text-white/40">Widget preview</p>
              <p className="text-[10px] text-white/25 mt-1">Glow AI · bottom-right</p>
            </div>
            {/* Simulated widget bubble */}
            <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#7c3aed] flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Script + domain restriction */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
            <div>
              <h2 className="text-sm font-semibold text-white">Embed Script</h2>
              <p className="text-xs text-white/40 mt-0.5">Paste before &lt;/body&gt; on your site</p>
            </div>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-all ${
                copied
                  ? 'border-[#34d399]/40 text-[#34d399] bg-[#34d399]/10'
                  : 'border-white/10 text-white/55 hover:text-white hover:border-white/25'
              }`}
            >
              {copied ? '✓ Copied!' : 'Copy Script'}
            </button>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <pre
              className="text-xs text-[#a78bfa] leading-relaxed overflow-x-auto p-3 rounded-xl"
              style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.15)' }}
            >
              {snippet}
            </pre>

            {/* Domain restriction */}
            <div>
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider block mb-2">
                Domain Restriction
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e?.target?.value)}
                  placeholder="yourdomain.com"
                  className="flex-1 px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-xs text-white placeholder-white/25 focus:outline-none focus:border-[#7c3aed]/50 transition-all"
                />
                <button className="px-3 py-2 rounded-lg text-xs font-medium border border-white/10 text-white/55 hover:text-white hover:border-white/25 transition-all">
                  Add
                </button>
              </div>
              <p className="text-[10px] text-white/30 mt-1.5">Only allow the widget to load on specified domains.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Widgets table */}
      <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/6">
          <h2 className="text-sm font-semibold text-white">Active Embeds</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['Widget', 'Persona', 'Domain', 'Status', 'Views', 'Chats', '']?.map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold text-white/35 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {widgets?.map((w) => (
                <tr key={w?.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-medium text-white">{w?.name}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-xs text-white/55">{w?.persona}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-xs text-white/55 font-mono">{w?.domain}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        w?.status === 'active' ?'bg-[#34d399]/15 text-[#34d399] border-[#34d399]/25' :'bg-white/8 text-white/35 border-white/10'
                      }`}
                    >
                      {w?.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm text-white">{w?.views?.toLocaleString()}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm text-white">{w?.chats?.toLocaleString()}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="text-xs text-white/40 hover:text-white transition-colors">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
