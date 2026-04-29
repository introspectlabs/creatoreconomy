'use client';

import React, { useState, useEffect } from 'react';
import { X, Database, Radio, Plug, Code2, Brain, MessageSquare, Globe, Mic, Calendar, FileText, File, RefreshCw, ExternalLink, AlertCircle, CheckCircle2, Clock, ChevronRight, Layers } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import { Persona } from './personaData';
import Icon from '@/components/ui/AppIcon';

const avatarColors: Record<string, string> = {
  AS: 'from-purple-500 to-violet-600',
  SB: 'from-blue-500 to-cyan-600',
  MH: 'from-rose-500 to-pink-600',
  KV: 'from-teal-500 to-emerald-600',
  PF: 'from-amber-500 to-orange-600',
  DC: 'from-indigo-500 to-blue-600',
  LA: 'from-slate-500 to-gray-600',
  ZR: 'from-fuchsia-500 to-purple-600',
  OM: 'from-red-500 to-rose-600',
  ET: 'from-green-500 to-teal-600',
  NC: 'from-sky-500 to-blue-600',
  MW: 'from-violet-500 to-indigo-600',
};

const tabs = [
  { id: 'tab-overview', label: 'Overview', icon: Brain },
  { id: 'tab-knowledge', label: 'Knowledge', icon: Database },
  { id: 'tab-channels', label: 'Channels', icon: Radio },
  { id: 'tab-services', label: 'Services', icon: Plug },
  { id: 'tab-embeds', label: 'Embeds', icon: Code2 },
];

type KnowledgeSyncStatus = 'synced' | 'failed' | 'processing' | 'pending';

interface KnowledgeChunk {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'txt' | 'csv' | 'url' | 'notion';
  syncStatus: KnowledgeSyncStatus;
  chunks: number;
  lastSync: string;
  size?: string;
  sourceUrl?: string;
}

const knowledgeByPersona: Record<string, KnowledgeChunk[]> = {
  'persona-001': [
    { id: 'kc-1', name: 'Product_FAQ_v3.pdf', type: 'pdf', syncStatus: 'synced', chunks: 142, lastSync: '2 hr ago', size: '2.4 MB' },
    { id: 'kc-2', name: 'Sales_Playbook_2024.docx', type: 'docx', syncStatus: 'synced', chunks: 67, lastSync: '1 day ago', size: '1.1 MB' },
    { id: 'kc-3', name: 'Brand_Voice_Guidelines.pdf', type: 'pdf', syncStatus: 'failed', chunks: 0, lastSync: '3 days ago', size: '3.2 MB' },
  ],
  'persona-002': [
    { id: 'kc-4', name: 'Notion Workspace', type: 'notion', syncStatus: 'synced', chunks: 3200, lastSync: '2 hr ago', sourceUrl: 'https://notion.so' },
    { id: 'kc-5', name: 'Product Docs v3', type: 'pdf', syncStatus: 'failed', chunks: 0, lastSync: '14 min ago', size: '8.1 MB' },
    { id: 'kc-6', name: 'FAQ Document.pdf', type: 'pdf', syncStatus: 'synced', chunks: 1420, lastSync: '1 day ago', size: '1.8 MB' },
  ],
  'persona-003': [
    { id: 'kc-7', name: 'HR_Policy_2026.pdf', type: 'pdf', syncStatus: 'synced', chunks: 210, lastSync: '5 hr ago', size: '4.2 MB' },
    { id: 'kc-8', name: 'Onboarding_Checklist.docx', type: 'docx', syncStatus: 'synced', chunks: 88, lastSync: '2 days ago', size: '900 KB' },
  ],
  'persona-004': [
    { id: 'kc-9', name: 'Technical_Specs_API_v2.txt', type: 'txt', syncStatus: 'synced', chunks: 28, lastSync: '3 days ago', size: '340 KB' },
    { id: 'kc-10', name: 'IVR_Scripts.docx', type: 'docx', syncStatus: 'processing', chunks: 0, lastSync: 'Just now', size: '560 KB' },
  ],
  'persona-005': [
    { id: 'kc-11', name: 'Finance_Handbook.pdf', type: 'pdf', syncStatus: 'processing', chunks: 0, lastSync: 'Just now', size: '2.1 MB' },
  ],
  'persona-006': [
    { id: 'kc-12', name: 'Product_Tour_Script.pdf', type: 'pdf', syncStatus: 'synced', chunks: 95, lastSync: '1 day ago', size: '1.5 MB' },
    { id: 'kc-13', name: 'Feature_Overview.docx', type: 'docx', syncStatus: 'synced', chunks: 54, lastSync: '2 days ago', size: '780 KB' },
  ],
  'persona-008': [
    { id: 'kc-14', name: 'Product_Catalog_2026.pdf', type: 'pdf', syncStatus: 'synced', chunks: 4200, lastSync: '30 min ago', size: '12.4 MB' },
    { id: 'kc-15', name: 'Order_Tracking_Guide.txt', type: 'txt', syncStatus: 'synced', chunks: 38, lastSync: '1 day ago', size: '120 KB' },
    { id: 'kc-16', name: 'Returns_Policy.pdf', type: 'pdf', syncStatus: 'failed', chunks: 0, lastSync: '4 days ago', size: '800 KB' },
    { id: 'kc-17', name: 'https://shop.acme.io/faq', type: 'url', syncStatus: 'synced', chunks: 62, lastSync: '6 hr ago', sourceUrl: 'https://shop.acme.io/faq' },
  ],
  'persona-009': [
    { id: 'kc-18', name: 'Runbook_v4.pdf', type: 'pdf', syncStatus: 'synced', chunks: 310, lastSync: '2 days ago', size: '5.6 MB' },
    { id: 'kc-19', name: 'Alert_Definitions.csv', type: 'csv', syncStatus: 'synced', chunks: 180, lastSync: '3 days ago', size: '450 KB' },
  ],
  'persona-010': [
    { id: 'kc-20', name: 'Sports_Content_Library.pdf', type: 'pdf', syncStatus: 'processing', chunks: 0, lastSync: 'Just now', size: '9.2 MB' },
    { id: 'kc-21', name: 'Match_Highlights_2026.docx', type: 'docx', syncStatus: 'pending', chunks: 0, lastSync: 'Pending', size: '2.3 MB' },
  ],
  'persona-011': [
    { id: 'kc-22', name: 'Customer_Success_Playbook.pdf', type: 'pdf', syncStatus: 'synced', chunks: 220, lastSync: '4 hr ago', size: '3.1 MB' },
    { id: 'kc-23', name: 'NPS_Templates.docx', type: 'docx', syncStatus: 'synced', chunks: 45, lastSync: '1 day ago', size: '640 KB' },
    { id: 'kc-24', name: 'https://success.acme.io/docs', type: 'url', syncStatus: 'synced', chunks: 88, lastSync: '8 hr ago', sourceUrl: 'https://success.acme.io/docs' },
  ],
  'persona-012': [
    { id: 'kc-25', name: 'Multilingual_Greetings.pdf', type: 'pdf', syncStatus: 'synced', chunks: 130, lastSync: '1 day ago', size: '1.9 MB' },
    { id: 'kc-26', name: 'Onboarding_Translations.docx', type: 'docx', syncStatus: 'synced', chunks: 95, lastSync: '2 days ago', size: '1.2 MB' },
  ],
};

const syncStatusConfig: Record<KnowledgeSyncStatus, { label: string; badge: string; icon: React.ElementType; dot: string }> = {
  synced: { label: 'Synced', badge: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25', icon: CheckCircle2, dot: 'bg-emerald-400' },
  failed: { label: 'Failed', badge: 'bg-red-500/15 text-red-400 border border-red-500/25', icon: AlertCircle, dot: 'bg-red-400' },
  processing: { label: 'Processing', badge: 'bg-amber-500/15 text-amber-400 border border-amber-500/25', icon: Clock, dot: 'bg-amber-400 animate-pulse' },
  pending: { label: 'Pending', badge: 'bg-white/10 text-white/40 border border-white/10', icon: Clock, dot: 'bg-white/30' },
};

const fileTypeConfig: Record<string, { color: string; bg: string; label: string }> = {
  pdf: { color: 'text-red-400', bg: 'bg-red-500/10', label: 'PDF' },
  docx: { color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'DOCX' },
  txt: { color: 'text-white/50', bg: 'bg-white/5', label: 'TXT' },
  csv: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'CSV' },
  url: { color: 'text-cyan-400', bg: 'bg-cyan-500/10', label: 'URL' },
  notion: { color: 'text-purple-400', bg: 'bg-purple-500/10', label: 'NOTION' },
};

interface DrawerProps {
  persona: Persona;
  onClose: () => void;
}

export default function PersonaDetailDrawer({ persona, onClose }: DrawerProps) {
  const [activeTab, setActiveTab] = useState('tab-overview');
  const [retrying, setRetrying] = useState<string | null>(null);
  const gradient = avatarColors[persona.avatar] || 'from-purple-500 to-blue-500';

  const knowledgeChunks = knowledgeByPersona[persona.id] || [];
  const totalChunks = knowledgeChunks.reduce((sum, k) => sum + k.chunks, 0);
  const syncedCount = knowledgeChunks.filter((k) => k.syncStatus === 'synced').length;
  const failedCount = knowledgeChunks.filter((k) => k.syncStatus === 'failed').length;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleRetrySync = (id: string) => {
    setRetrying(id);
    setTimeout(() => setRetrying(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-lg h-full overflow-y-auto"
        style={{ background: 'rgba(12,14,22,0.98)', borderLeft: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 px-6 pt-6 pb-4" style={{ background: 'rgba(12,14,22,0.98)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-700`}>
                {persona.avatar}
              </div>
              <div>
                <h2 className="text-base font-700 text-white">{persona.name}</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <StatusBadge status={persona.status} />
                  <span className="text-[11px] text-white/30">{persona.lastActive}</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all">
              <X size={14} />
            </button>
          </div>
          <div className="flex items-center gap-1">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-500 transition-all ${
                    activeTab === t.id
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :'text-white/40 hover:text-white/70 hover:bg-white/5'
                  }`}
                >
                  <Icon size={12} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {activeTab === 'tab-overview' && (
            <div className="space-y-5">
              <p className="text-sm text-white/60 leading-relaxed">{persona.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'ov-chunks', label: 'Knowledge Chunks', value: persona.knowledgeChunks.toLocaleString(), icon: Database },
                  { id: 'ov-msgs', label: 'Total Messages', value: persona.messagesTotal.toLocaleString(), icon: MessageSquare },
                  { id: 'ov-lang', label: 'Language', value: persona.language, icon: Globe },
                  { id: 'ov-voice', label: 'Voice', value: persona.voice, icon: Mic },
                  { id: 'ov-created', label: 'Created', value: persona.createdAt, icon: Calendar },
                  { id: 'ov-channels', label: 'Channels', value: `${persona.channels.length} connected`, icon: Radio },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="glass rounded-xl p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon size={11} className="text-white/30" />
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">{item.label}</p>
                      </div>
                      <p className="text-sm font-600 text-white truncate">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'tab-knowledge' && (
            <div className="space-y-4">
              {/* Summary bar */}
              {knowledgeChunks.length > 0 && (
                <div className="glass rounded-xl p-3 flex items-center gap-4">
                  <div className="flex items-center gap-2 flex-1">
                    <Layers size={13} className="text-purple-400" />
                    <span className="text-xs text-white/60">
                      <span className="text-white font-600">{totalChunks.toLocaleString()}</span> total chunks
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                      <span className="text-[11px] text-white/40">{syncedCount} synced</span>
                    </div>
                    {failedCount > 0 && (
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                        <span className="text-[11px] text-red-400">{failedCount} failed</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Knowledge chunk list */}
              {knowledgeChunks.length === 0 ? (
                <div className="text-center py-10">
                  <Database size={24} className="text-white/20 mx-auto mb-3" />
                  <p className="text-sm text-white/40">No knowledge sources linked</p>
                  <p className="text-xs text-white/25 mt-1">Go to Knowledge Base to assign files to this persona</p>
                </div>
              ) : (
                knowledgeChunks.map((chunk) => {
                  const status = syncStatusConfig[chunk.syncStatus];
                  const StatusIcon = status.icon;
                  const fileType = fileTypeConfig[chunk.type] || fileTypeConfig['txt'];
                  const isRetrying = retrying === chunk.id;

                  return (
                    <div key={chunk.id} className="glass rounded-xl p-4 group">
                      <div className="flex items-start gap-3">
                        {/* File type badge */}
                        <div className={`w-8 h-8 rounded-lg ${fileType.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <span className={`text-[9px] font-700 ${fileType.color}`}>{fileType.label}</span>
                        </div>

                        {/* Main info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <p className="text-xs font-600 text-white truncate">{chunk.name}</p>
                            {/* Sync status badge */}
                            <span className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 ${status.badge}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${status.dot} inline-block`} />
                              {status.label}
                            </span>
                          </div>

                          {/* Meta row */}
                          <div className="flex items-center gap-3 text-[11px] text-white/35">
                            {chunk.syncStatus === 'synced' && (
                              <span className="flex items-center gap-1">
                                <Layers size={10} className="text-white/25" />
                                {chunk.chunks.toLocaleString()} chunks
                              </span>
                            )}
                            {chunk.size && <span>{chunk.size}</span>}
                            <span className="flex items-center gap-1">
                              <Clock size={10} className="text-white/25" />
                              {chunk.lastSync}
                            </span>
                          </div>

                          {/* Failed error message */}
                          {chunk.syncStatus === 'failed' && (
                            <p className="text-[11px] text-red-400/70 mt-1.5">Sync failed — file may be corrupted or inaccessible</p>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                        {/* Open source file */}
                        {chunk.sourceUrl ? (
                          <a
                            href={chunk.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/80 text-[11px] transition-all"
                          >
                            <ExternalLink size={11} />
                            Open Source
                          </a>
                        ) : (
                          <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/80 text-[11px] transition-all">
                            <FileText size={11} />
                            View File
                          </button>
                        )}

                        {/* Retry sync for failed */}
                        {chunk.syncStatus === 'failed' && (
                          <button
                            onClick={() => handleRetrySync(chunk.id)}
                            disabled={isRetrying}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-[11px] transition-all disabled:opacity-50"
                          >
                            <RefreshCw size={11} className={isRetrying ? 'animate-spin' : ''} />
                            {isRetrying ? 'Retrying…' : 'Retry Sync'}
                          </button>
                        )}

                        {/* Re-sync for synced */}
                        {chunk.syncStatus === 'synced' && (
                          <button
                            onClick={() => handleRetrySync(chunk.id)}
                            disabled={isRetrying}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/70 text-[11px] transition-all disabled:opacity-50 ml-auto"
                          >
                            <RefreshCw size={11} className={isRetrying ? 'animate-spin' : ''} />
                            Re-sync
                          </button>
                        )}

                        {/* Go to KB link */}
                        <a
                          href="/knowledge-base"
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300 text-[11px] transition-all ml-auto"
                        >
                          Knowledge Base
                          <ChevronRight size={11} />
                        </a>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {activeTab === 'tab-channels' && (
            <div className="space-y-3">
              {persona.channels.length === 0 ? (
                <div className="text-center py-10">
                  <Radio size={24} className="text-white/20 mx-auto mb-3" />
                  <p className="text-sm text-white/40">No channels connected yet</p>
                  <p className="text-xs text-white/25 mt-1">Go to Channels to connect this persona</p>
                </div>
              ) : (
                persona.channels.map((ch) => (
                  <div key={`drawer-ch-${ch}`} className="glass rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{ch === 'WhatsApp' ? '📱' : ch === 'Web Chat' ? '💬' : ch === 'Voice AI' ? '🎙️' : '⚡'}</span>
                      <p className="text-sm font-500 text-white">{ch}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">Connected</span>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'tab-services' && (
            <div className="space-y-3">
              {persona.services.length === 0 ? (
                <div className="text-center py-10">
                  <Plug size={24} className="text-white/20 mx-auto mb-3" />
                  <p className="text-sm text-white/40">No services connected</p>
                </div>
              ) : (
                persona.services.map((svc) => (
                  <div key={`drawer-svc-${svc}`} className="glass rounded-xl p-3 flex items-center justify-between">
                    <p className="text-sm font-500 text-white">{svc}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">Active</span>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'tab-embeds' && (
            <div className="space-y-3">
              <div className="glass rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-600 text-white">docs.acme.io</p>
                  <p className="text-[11px] text-white/35 mt-0.5">Chat widget · 1,240 sessions</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">Live</span>
              </div>
              <div className="glass rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-600 text-white">app.acme.io</p>
                  <p className="text-[11px] text-white/35 mt-0.5">Inline widget · 840 sessions</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">Live</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}