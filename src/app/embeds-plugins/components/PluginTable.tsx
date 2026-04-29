'use client';

import React, { useState } from 'react';
import { Copy, Settings, Trash2, Globe, MessageSquare, Mic, Video, Search, CheckCheck, X, ExternalLink, ToggleLeft, ToggleRight } from 'lucide-react';
import { toast } from 'sonner';

interface Plugin {
  id: string;
  personaName: string;
  personaSubCategory: string;
  types: string[];
  domain: string;
  status: string;
  sessions: number;
  created: string;
}

const initialPlugins: Plugin[] = [
  { id: 'plugin-001', personaName: 'ZaraSkin Sales Agent', personaSubCategory: 'D2C Skincare', types: ['Chat', 'Voice'], domain: 'zaraskin.com', status: 'live', sessions: 4820, created: 'Mar 15, 2026' },
  { id: 'plugin-002', personaName: 'NutriBlend Store Bot', personaSubCategory: 'D2C Nutrition', types: ['Chat'], domain: 'nutriblend.in', status: 'live', sessions: 9100, created: 'Feb 10, 2026' },
  { id: 'plugin-003', personaName: 'FitFuel Voice Agent', personaSubCategory: 'D2C Fitness Supplements', types: ['Voice', 'Avatar'], domain: 'fitfuel.com', status: 'live', sessions: 3200, created: 'Mar 1, 2026' },
  { id: 'plugin-004', personaName: 'TheoGear Product Concierge', personaSubCategory: 'D2C Everyday Carry', types: ['Avatar', 'Chat'], domain: 'theogear.com', status: 'live', sessions: 1890, created: 'Feb 20, 2026' },
  { id: 'plugin-005', personaName: 'GlowUp Beauty Agent', personaSubCategory: 'D2C Beauty', types: ['Chat', 'Voice', 'Avatar'], domain: 'glowup.in', status: 'live', sessions: 6100, created: 'Dec 14, 2025' },
  { id: 'plugin-006', personaName: 'StyleHouse Fashion Bot', personaSubCategory: 'D2C Fashion', types: ['Chat'], domain: 'stylehouse.co', status: 'paused', sessions: 2440, created: 'Feb 5, 2026' },
  { id: 'plugin-007', personaName: 'LuxeScent Fragrance Bot', personaSubCategory: 'D2C Fragrance', types: ['Voice'], domain: 'luxescent.com', status: 'live', sessions: 1210, created: 'Mar 20, 2026' },
  { id: 'plugin-008', personaName: 'GlobalShop Multilingual', personaSubCategory: 'D2C Global Commerce', types: ['Avatar', 'Voice'], domain: 'globalshop.io', status: 'live', sessions: 3400, created: 'Mar 15, 2026' },
  { id: 'plugin-009', personaName: 'StreamGuide — Crime Drama', personaSubCategory: 'OTT Content Discovery', types: ['Chat'], domain: 'streamguide.tv', status: 'live', sessions: 1840, created: 'Apr 2, 2026' },
  { id: 'plugin-010', personaName: 'ZaraSkin Sales Agent', personaSubCategory: 'D2C Skincare', types: ['Chat', 'Avatar'], domain: 'zaraskin.com/landing', status: 'live', sessions: 2800, created: 'Mar 28, 2026' },
];

const typeConfig: Record<string, { icon: React.ReactNode; label: string; color: string; bg: string }> = {
  Chat: { icon: <MessageSquare size={10} />, label: 'Chat', color: 'text-blue-400', bg: 'bg-blue-500/15' },
  Voice: { icon: <Mic size={10} />, label: 'Voice', color: 'text-purple-400', bg: 'bg-purple-500/15' },
  Avatar: { icon: <Video size={10} />, label: 'Avatar', color: 'text-teal-400', bg: 'bg-teal-500/15' },
};

const TypeBadges = ({ types }: { types: string[] }) => (
  <div className="flex items-center gap-1 flex-wrap">
    {types.map((t) => {
      const cfg = typeConfig[t] ?? typeConfig['Chat'];
      return (
        <span key={t} className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-500 ${cfg.bg} ${cfg.color}`}>
          {cfg.icon}
          {t}
        </span>
      );
    })}
  </div>
);

const statusStyle = (s: string) => {
  if (s === 'live') return 'bg-emerald-500/15 text-emerald-400';
  if (s === 'paused') return 'bg-amber-500/15 text-amber-400';
  return 'bg-white/8 text-white/35';
};

interface ManageModalProps {
  plugin: Plugin;
  onClose: () => void;
  onStatusToggle: (id: string) => void;
}

function ManageModal({ plugin, onClose, onStatusToggle }: ManageModalProps) {
  const embedCode = `<script src="https://cdn.personamatrix.ai/widget.js"></script>\n<script>PersonaMatrix.init({ personaId: "${plugin.id}", apiKey: "pk_live_xxx", types: [${plugin.types.map(t => `"${t.toLowerCase()}"`).join(', ')}], position: "bottom-right", theme: "dark" });</script>`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast.success('Embed code copied');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative glass rounded-2xl w-full max-w-lg p-5 sm:p-6 border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-base font-600 text-white">{plugin.personaName}</h2>
            <p className="text-[11px] font-500 text-purple-400/80 mt-0.5">{plugin.personaSubCategory}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <Globe size={11} className="text-white/30" />
              <span className="text-xs text-white/40 font-mono">{plugin.domain}</span>
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all">
            <X size={14} />
          </button>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
          <div className="glass rounded-xl p-2.5 sm:p-3">
            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Types</p>
            <TypeBadges types={plugin.types} />
          </div>
          <div className="glass rounded-xl p-2.5 sm:p-3">
            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Sessions</p>
            <span className="text-xs text-white/70 tabular-nums">{plugin.sessions.toLocaleString()}</span>
          </div>
          <div className="glass rounded-xl p-2.5 sm:p-3">
            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Status</p>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-500 capitalize ${statusStyle(plugin.status)}`}>
              {plugin.status}
            </span>
          </div>
        </div>

        {/* Embed code */}
        <div className="mb-5">
          <p className="text-xs text-white/40 mb-2">Embed Code</p>
          <div className="bg-black/30 rounded-xl p-3 border border-white/8">
            <pre className="text-[10px] text-white/50 font-mono whitespace-pre-wrap break-all leading-relaxed">{embedCode}</pre>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-white/6 border border-white/8 text-xs text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            {copied ? <CheckCheck size={12} className="text-emerald-400" /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy Embed Code'}
          </button>
          <button
            onClick={() => { onStatusToggle(plugin.id); onClose(); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border text-xs font-500 transition-all ${
              plugin.status === 'live' ?'bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20' :'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
            }`}
          >
            {plugin.status === 'live' ? <ToggleLeft size={12} /> : <ToggleRight size={12} />}
            {plugin.status === 'live' ? 'Pause Plugin' : 'Resume Plugin'}
          </button>
          <a
            href={`https://${plugin.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:w-9 h-9 flex items-center justify-center rounded-xl bg-white/6 border border-white/8 text-white/40 hover:text-white hover:bg-white/10 transition-all gap-2 text-xs"
            title="Open domain"
          >
            <ExternalLink size={12} />
            <span className="sm:hidden">Open Domain</span>
          </a>
        </div>
      </div>
    </div>
  );
}

interface DeleteConfirmProps {
  plugin: Plugin;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteConfirm({ plugin, onConfirm, onCancel }: DeleteConfirmProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative glass rounded-2xl w-full max-w-sm p-6 border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 mx-auto mb-4">
          <Trash2 size={20} className="text-red-400" />
        </div>
        <h2 className="text-base font-600 text-white text-center mb-1">Delete Plugin</h2>
        <p className="text-xs text-white/40 text-center mb-1">
          Are you sure you want to delete <span className="text-white/70 font-500">{plugin.personaName}</span>?
        </p>
        <p className="text-[11px] text-white/25 text-center mb-5 font-mono">{plugin.domain}</p>
        <p className="text-xs text-red-400/70 text-center mb-5">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl bg-white/6 border border-white/8 text-xs text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-xl bg-red-500/15 border border-red-500/25 text-xs text-red-400 hover:bg-red-500/25 transition-all font-500"
          >
            Delete Plugin
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PluginTable() {
  const [plugins, setPlugins] = useState<Plugin[]>(initialPlugins);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [managingPlugin, setManagingPlugin] = useState<Plugin | null>(null);
  const [deletingPlugin, setDeletingPlugin] = useState<Plugin | null>(null);

  const filtered = plugins.filter((p) =>
    p.personaName.toLowerCase().includes(search.toLowerCase()) ||
    p.domain.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (id: string) => {
    const plugin = plugins.find((p) => p.id === id);
    const types = plugin?.types.map(t => `"${t.toLowerCase()}"`).join(', ') ?? '"chat"';
    navigator.clipboard.writeText(`<script src="https://cdn.personamatrix.ai/widget.js"></script>\n<script>PersonaMatrix.init({ personaId: "${id}", apiKey: "pk_live_xxx", types: [${types}], position: "bottom-right", theme: "dark" });</script>`);
    setCopiedId(id);
    toast.success('Embed code copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleStatusToggle = (id: string) => {
    setPlugins((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === 'live' ? 'paused' : 'live' } : p
      )
    );
    const plugin = plugins.find((p) => p.id === id);
    if (plugin) {
      toast.success(`Plugin ${plugin.status === 'live' ? 'paused' : 'resumed'} successfully`);
    }
  };

  const handleDelete = () => {
    if (!deletingPlugin) return;
    setPlugins((prev) => prev.filter((p) => p.id !== deletingPlugin.id));
    toast.success(`Plugin "${deletingPlugin.personaName}" deleted`);
    setDeletingPlugin(null);
  };

  return (
    <>
      <div className="glass rounded-2xl overflow-hidden">
        {/* Search bar */}
        <div className="px-4 sm:px-5 py-4 border-b border-white/6 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search plugins..."
              className="w-full pl-8 pr-4 py-2 rounded-lg bg-white/5 border border-white/8 text-xs text-white placeholder-white/25 outline-none focus:border-purple-500/40 transition-all"
            />
          </div>
          <span className="text-xs text-white/30 whitespace-nowrap">{filtered.length} plugins</span>
        </div>

        {/* Mobile Card List */}
        <div className="md:hidden divide-y divide-white/4">
          {filtered.map((p) => (
            <div key={p.id} className="p-4 flex flex-col gap-3">
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-500 text-white truncate">{p.personaName}</p>
                  <p className="text-[10px] font-500 text-purple-400/70 mt-0.5">{p.personaSubCategory}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Globe size={10} className="text-white/25 flex-shrink-0" />
                    <span className="text-xs text-white/50 font-mono truncate">{p.domain}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-500 capitalize ${statusStyle(p.status)}`}>
                    {p.status}
                  </span>
                </div>
              </div>

              {/* Types + sessions */}
              <div className="flex items-center justify-between">
                <TypeBadges types={p.types} />
                <span className="text-xs text-white/50 tabular-nums">{p.sessions.toLocaleString()} sessions</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(p.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/8 text-xs text-white/40 hover:text-white hover:bg-white/8 transition-all"
                >
                  {copiedId === p.id ? <CheckCheck size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  {copiedId === p.id ? 'Copied' : 'Copy Code'}
                </button>
                <button
                  onClick={() => setManagingPlugin(p)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/8 text-xs text-white/40 hover:text-white hover:bg-white/8 transition-all"
                >
                  <Settings size={12} />
                  Manage
                </button>
                <button
                  onClick={() => setDeletingPlugin(p)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-red-500/20 text-red-400/40 hover:text-red-400 hover:bg-red-500/8 transition-all flex-shrink-0"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['Persona', 'Types', 'Domain', 'Status', 'Sessions', 'Created', 'Actions'].map((h) => (
                  <th key={`th-${h}`} className="text-left px-5 py-3 text-[11px] font-500 text-white/30 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr
                  key={p.id}
                  className={`border-b border-white/4 hover:bg-white/3 transition-all group ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}
                >
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-500 text-white">{p.personaName}</p>
                    <p className="text-[10px] font-500 text-purple-400/70 mt-0.5">{p.personaSubCategory}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <TypeBadges types={p.types} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Globe size={11} className="text-white/25" />
                      <span className="text-xs text-white/60 font-mono">{p.domain}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-500 capitalize ${statusStyle(p.status)}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-white/60 tabular-nums">{p.sessions.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs text-white/35">{p.created}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopy(p.id)}
                        className="w-7 h-7 rounded-lg border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all"
                        title="Copy embed code"
                      >
                        {copiedId === p.id ? <CheckCheck size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      </button>
                      <button
                        onClick={() => setManagingPlugin(p)}
                        className="w-7 h-7 rounded-lg border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all"
                        title="Manage plugin"
                      >
                        <Settings size={12} />
                      </button>
                      <button
                        onClick={() => setDeletingPlugin(p)}
                        className="w-7 h-7 rounded-lg border border-red-500/20 flex items-center justify-center text-red-400/40 hover:text-red-400 hover:bg-red-500/8 transition-all"
                        title="Delete plugin — this cannot be undone"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {managingPlugin && (
        <ManageModal
          plugin={managingPlugin}
          onClose={() => setManagingPlugin(null)}
          onStatusToggle={handleStatusToggle}
        />
      )}

      {deletingPlugin && (
        <DeleteConfirm
          plugin={deletingPlugin}
          onConfirm={handleDelete}
          onCancel={() => setDeletingPlugin(null)}
        />
      )}
    </>
  );
}