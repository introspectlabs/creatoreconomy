'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import { MoreVertical, Pencil, Pause, Play, Trash2, X, AlertTriangle } from 'lucide-react';

const metrics = [
  {
    label: 'Active Personas',
    value: '2',
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
    label: 'Conversations (30d)',
    value: '1,284',
    change: '+18% vs last month',
    trend: 'up',
    color: '#14b8a6',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: 'Conversion Rate',
    value: '8.4%',
    change: '+2.1% this month',
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
    label: 'Channels Active',
    value: '2',
    change: 'Web + WhatsApp',
    trend: 'neutral',
    color: '#0ea5e9',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
      </svg>
    ),
  },
];

interface Persona {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'paused' | 'draft';
  conversations: number;
  conversion: string;
  channel: string;
  emoji: string;
}

const initialPersonas: Persona[] = [
  {
    id: 'glow-ai',
    name: 'Glow AI',
    type: 'Shopping Assistant',
    status: 'active',
    conversations: 842,
    conversion: '9.2%',
    channel: 'Web + WhatsApp',
    emoji: '🧴',
  },
  {
    id: 'support-ai',
    name: 'Support AI',
    type: 'Shopping Assistant',
    status: 'draft',
    conversations: 0,
    conversion: '—',
    channel: 'Not deployed',
    emoji: '💬',
  },
];

const recentActivity = [
  { text: 'Glow AI answered 48 questions today', time: '2h ago', color: '#14b8a6' },
  { text: '3 visitors converted via Glow AI', time: '4h ago', color: '#34d399' },
  { text: 'WhatsApp channel connected', time: 'Yesterday', color: '#7c3aed' },
  { text: 'Shopify catalog synced — 124 products', time: '2 days ago', color: '#0ea5e9' },
];

export default function DashboardPage() {
  const [personas, setPersonas] = useState<Persona[]>(initialPersonas);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null);
  const [editName, setEditName] = useState('');

  const handleTogglePause = (id: string) => {
    setPersonas((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === 'active' ? 'paused' : 'active' }
          : p
      )
    );
    setOpenMenuId(null);
  };

  const handleDelete = (id: string) => {
    setPersonas((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirmId(null);
    setOpenMenuId(null);
  };

  const handleEditOpen = (persona: Persona) => {
    setEditingPersona(persona);
    setEditName(persona.name);
    setOpenMenuId(null);
  };

  const handleEditSave = () => {
    if (!editingPersona || !editName.trim()) return;
    setPersonas((prev) =>
      prev.map((p) => p.id === editingPersona.id ? { ...p, name: editName.trim() } : p)
    );
    setEditingPersona(null);
  };

  const statusStyle = (status: Persona['status']) => {
    if (status === 'active') return 'bg-[#34d399]/15 text-[#34d399] border-[#34d399]/25';
    if (status === 'paused') return 'bg-amber-500/15 text-amber-400 border-amber-500/25';
    return 'bg-white/8 text-white/40 border-white/10';
  };

  return (
    <AppLayout>
      <Topbar
        title="Dashboard"
        subtitle="Your AI salesperson, available 24/7"
        action={
          <Link href="/create-persona" className="px-4 py-2 rounded-xl text-sm font-semibold text-white btn-primary flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create Persona
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
        {/* Personas list */}
        <div className="xl:col-span-2">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
              <h2 className="text-sm font-semibold text-white">Your Personas</h2>
              <Link href="/create-persona" className="text-xs text-[#7c3aed] hover:text-[#a78bfa] transition-colors">
                + New Persona
              </Link>
            </div>
            <div className="divide-y divide-white/5">
              {personas?.map((p) => (
                <div key={p?.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/3 transition-colors relative">
                  <div className="w-10 h-10 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center text-xl flex-shrink-0">
                    {p?.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-medium text-white truncate">{p?.name}</p>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${statusStyle(p.status)}`}>
                        {p?.status}
                      </span>
                    </div>
                    <p className="text-xs text-white/40">{p?.type} · {p?.channel}</p>
                  </div>
                  <div className="hidden sm:flex flex-col items-end gap-0.5">
                    <p className="text-sm font-semibold text-white">{p?.conversations?.toLocaleString()}</p>
                    <p className="text-[10px] text-white/35">conversations</p>
                  </div>
                  <div className="hidden md:flex flex-col items-end gap-0.5">
                    <p className="text-sm font-semibold text-[#34d399]">{p?.conversion}</p>
                    <p className="text-[10px] text-white/35">conversion</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0 items-center">
                    <Link
                      href={`/chat/${p?.id}`}
                      className="text-[11px] px-2.5 py-1.5 rounded-lg border border-white/10 text-white/55 hover:text-white hover:border-white/25 transition-all"
                    >
                      Test
                    </Link>
                    <Link
                      href="/deploy"
                      className="text-[11px] px-2.5 py-1.5 rounded-lg border border-[#7c3aed]/30 text-[#a78bfa] hover:bg-[#7c3aed]/10 transition-all"
                    >
                      Deploy
                    </Link>
                    {/* More menu */}
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === p.id ? null : p.id)}
                        className="w-7 h-7 rounded-lg border border-white/8 text-white/35 hover:text-white hover:border-white/20 flex items-center justify-center transition-all"
                      >
                        <MoreVertical size={13} />
                      </button>
                      {openMenuId === p.id && (
                        <div className="absolute right-0 top-9 z-20 w-44 rounded-xl border border-white/10 bg-[#1a1025] shadow-2xl overflow-hidden">
                          <button
                            onClick={() => handleEditOpen(p)}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <Pencil size={13} />
                            Edit Persona
                          </button>
                          <button
                            onClick={() => handleTogglePause(p.id)}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {p.status === 'active' ? <Pause size={13} /> : <Play size={13} />}
                            {p.status === 'active' ? 'Pause Persona' : 'Resume Persona'}
                          </button>
                          <div className="border-t border-white/8" />
                          <button
                            onClick={() => { setDeleteConfirmId(p.id); setOpenMenuId(null); }}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/8 transition-colors"
                          >
                            <Trash2 size={13} />
                            Delete Persona
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity + Quick actions */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-2">
              {[
                { href: '/create-persona', label: 'Create New Persona', icon: '✨', color: '#7c3aed' },
                { href: '/deploy', label: 'Deploy to Shopify', icon: '🛍️', color: '#14b8a6' },
                { href: '/embeds', label: 'Get Embed Code', icon: '💻', color: '#0ea5e9' },
                { href: '/analytics', label: 'View Analytics', icon: '📊', color: '#34d399' },
                { href: '/knowledge-base', label: 'Knowledge Base', icon: '📚', color: '#f59e0b' },
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

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Recent Activity</h2>
            <div className="flex flex-col gap-3">
              {recentActivity?.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: a?.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/65 leading-relaxed">{a?.text}</p>
                    <p className="text-[10px] text-white/25 mt-0.5">{a?.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close menu */}
      {openMenuId && (
        <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm mx-4 rounded-2xl border border-white/10 bg-[#1a1025] p-6 flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={18} className="text-red-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Delete Persona</h3>
                <p className="text-xs text-white/50 mt-1 leading-relaxed">
                  This will permanently delete the persona and all its conversation history. This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-white/60 hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Persona Modal */}
      {editingPersona && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md mx-4 rounded-2xl border border-white/10 bg-[#1a1025] p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Edit Persona</h3>
              <button
                onClick={() => setEditingPersona(null)}
                className="w-7 h-7 rounded-lg border border-white/8 text-white/35 hover:text-white flex items-center justify-center transition-all"
              >
                <X size={13} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Persona Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#7c3aed]/50 transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Type</label>
              <div className="flex items-center gap-3 p-3 rounded-xl border border-[#7c3aed]/30 bg-[#7c3aed]/6">
                <span className="text-lg">🛍️</span>
                <span className="text-sm text-white">Shopping Assistant</span>
              </div>
            </div>
            <div className="p-3 rounded-xl border border-white/6 bg-white/[0.02]">
              <p className="text-xs text-white/40">
                For advanced edits (tone, prompt, knowledge base), use the full{' '}
                <Link href="/create-persona" className="text-[#7c3aed] hover:text-[#a78bfa]">Create Persona</Link> flow.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setEditingPersona(null)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-white/60 hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                disabled={!editName.trim()}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary disabled:opacity-40"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
