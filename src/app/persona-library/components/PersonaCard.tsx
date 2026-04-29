'use client';

import React, { useState } from 'react';
import { MessageSquare, Database, ArrowRight, Network, Pencil, Trash2, MoreVertical, FlaskConical, PauseCircle, PlayCircle, Share2, Globe, Lock, Copy, Check as CheckIcon } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import { Persona } from './personaData';

const channelIcon = (ch: string) => {
  const map: Record<string, string> = {
    WhatsApp: '📱',
    'Web Chat': '💬',
    'Voice AI': '🎙️',
    API: '⚡',
  };
  return map[ch] || '🔗';
};

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

interface PersonaCardProps {
  persona: Persona;
  view: 'grid' | 'list';
  onClick: () => void;
  onTopologyClick: (e: React.MouseEvent) => void;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  onTest: (e: React.MouseEvent) => void;
  onPause: (e: React.MouseEvent) => void;
  onTogglePublic: (e: React.MouseEvent) => void;
}

export default function PersonaCard({ persona, view, onClick, onTopologyClick, onEdit, onDelete, onTest, onPause, onTogglePublic }: PersonaCardProps) {
  const gradient = avatarColors[persona.avatar] || 'from-purple-500 to-blue-500';
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/chat/${persona.slug}`
    : `https://personamat4842.builtwithrocket.new/chat/${persona.slug}`;

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleCopyShareLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(shareUrl);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  const handleEdit = (e: React.MouseEvent) => {
    setMenuOpen(false);
    onEdit(e);
  };

  const handleDelete = (e: React.MouseEvent) => {
    setMenuOpen(false);
    onDelete(e);
  };

  const handlePause = (e: React.MouseEvent) => {
    setMenuOpen(false);
    onPause(e);
  };

  const handleTogglePublic = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    onTogglePublic(e);
  };

  if (view === 'list') {
    return (
      <div
        onClick={onClick}
        className="glass rounded-xl border border-white/8 px-4 py-3 flex items-center gap-4 hover:border-purple-500/25 hover:bg-white/5 transition-all cursor-pointer group"
      >
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xs font-700 flex-shrink-0`}>
          {persona.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-sm font-600 text-white truncate">{persona.name}</p>
            <StatusBadge status={persona.status} />
            {/* Public/Private badge */}
            <span className={`flex items-center gap-1 text-[10px] font-500 px-1.5 py-0.5 rounded-full border flex-shrink-0 ${
              persona.isPublic
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :'bg-white/5 border-white/10 text-white/30'
            }`}>
              {persona.isPublic ? <Globe size={9} /> : <Lock size={9} />}
              {persona.isPublic ? 'Public' : 'Private'}
            </span>
          </div>
          <p className="text-[10px] font-500 text-purple-400/80 mb-0.5">{persona.subCategory}</p>
          <p className="text-xs text-white/40 truncate">{persona.description}</p>
          {/* Shareable URL for public personas */}
          {persona.isPublic && (
            <div className="flex items-center gap-1.5 mt-1" onClick={(e) => e.stopPropagation()}>
              <span className="text-[10px] text-white/25 font-mono truncate max-w-[200px]">{shareUrl}</span>
              <button
                onClick={handleCopyUrl}
                title="Copy URL"
                className={`flex-shrink-0 p-0.5 rounded transition-all ${urlCopied ? 'text-teal-400' : 'text-white/25 hover:text-white/60'}`}
              >
                {urlCopied ? <CheckIcon size={10} /> : <Copy size={10} />}
              </button>
            </div>
          )}
        </div>
        <div className="hidden lg:flex items-center gap-4 text-xs text-white/35">
          <span className="tabular-nums">{persona.knowledgeChunks.toLocaleString()} chunks</span>
          <span className="tabular-nums">{persona.messagesTotal.toLocaleString()} msgs</span>
          <span>{persona.lastActive}</span>
        </div>
        <div className="flex items-center gap-1">
          {persona.channels.slice(0, 3).map((ch) => (
            <span key={`${persona.id}-ch-${ch}`} className="text-sm" title={ch}>{channelIcon(ch)}</span>
          ))}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onTest(e); }}
          title="Test this persona"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-purple-500/15 border border-purple-500/25 text-purple-300 text-[11px] font-500 hover:bg-purple-500/30 transition-all flex-shrink-0 opacity-0 group-hover:opacity-100"
        >
          <FlaskConical size={11} />
          Test
        </button>
        {/* Public/Private toggle button */}
        <button
          onClick={handleTogglePublic}
          title={persona.isPublic ? 'Make Private' : 'Make Public'}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-500 transition-all flex-shrink-0 opacity-0 group-hover:opacity-100 ${
            persona.isPublic
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400' :'bg-white/5 border border-white/10 text-white/40 hover:bg-emerald-500/10 hover:border-emerald-500/20 hover:text-emerald-400'
          }`}
        >
          {persona.isPublic ? <Globe size={11} /> : <Lock size={11} />}
          {persona.isPublic ? 'Public' : 'Private'}
        </button>
        <button
          onClick={handleCopyShareLink}
          title={copied ? 'Link copied!' : 'Copy shareable chat link'}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-500 transition-all flex-shrink-0 opacity-0 group-hover:opacity-100 ${
            copied
              ? 'bg-teal-500/15 border border-teal-500/25 text-teal-300' :'bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10'
          }`}
        >
          <Share2 size={11} />
          {copied ? 'Copied!' : 'Share'}
        </button>
        {(persona.status === 'active' || persona.status === 'paused') && (
          <button
            onClick={(e) => { e.stopPropagation(); onPause(e); }}
            title={persona.status === 'paused' ? 'Resume Persona' : 'Pause Persona'}
            className={`p-1.5 rounded-lg transition-all flex-shrink-0 ${
              persona.status === 'paused' ?'text-green-400 hover:text-green-300 hover:bg-green-500/10' :'text-white/25 hover:text-amber-400 hover:bg-amber-500/10'
            }`}
          >
            {persona.status === 'paused' ? <PlayCircle size={14} /> : <PauseCircle size={14} />}
          </button>
        )}
        <button
          onClick={onTopologyClick}
          title="View Network Topology"
          className="p-1.5 rounded-lg text-white/25 hover:text-purple-400 hover:bg-purple-500/10 transition-all flex-shrink-0"
        >
          <Network size={14} />
        </button>
        <button
          onClick={handleEdit}
          title="Edit Persona"
          className="p-1.5 rounded-lg text-white/25 hover:text-blue-400 hover:bg-blue-500/10 transition-all flex-shrink-0"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={handleDelete}
          title="Delete Persona"
          className="p-1.5 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
        >
          <Trash2 size={14} />
        </button>
        <ArrowRight size={14} className="text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="glass rounded-2xl border border-white/8 p-4 card-hover cursor-pointer group relative"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-700`}>
          {persona.avatar}
        </div>
        <div className="flex items-center gap-1">
          <StatusBadge status={persona.status} />
          {/* Public/Private toggle pill */}
          <button
            onClick={handleTogglePublic}
            title={persona.isPublic ? 'Click to make Private' : 'Click to make Public'}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-600 border transition-all ${
              persona.isPublic
                ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400' :'bg-white/5 border-white/10 text-white/30 hover:bg-emerald-500/10 hover:border-emerald-500/20 hover:text-emerald-400'
            }`}
          >
            {persona.isPublic ? <Globe size={9} /> : <Lock size={9} />}
            {persona.isPublic ? 'Public' : 'Private'}
          </button>
          <div className="relative">
            <button
              onClick={handleMenuToggle}
              title="More options"
              className="p-1 rounded-lg text-white/25 hover:text-white/70 hover:bg-white/8 transition-all"
            >
              <MoreVertical size={14} />
            </button>
            {menuOpen && (
              <div
                className="absolute right-0 top-7 z-20 w-44 rounded-xl border border-white/10 overflow-hidden shadow-xl"
                style={{ background: 'rgba(18,20,30,0.98)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleEdit}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-white/70 hover:text-white hover:bg-white/8 transition-all"
                >
                  <Pencil size={12} className="text-blue-400" />
                  Edit Persona
                </button>
                <div className="h-px bg-white/6 mx-2" />
                <button
                  onClick={handleTogglePublic}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-white/70 hover:text-white hover:bg-white/8 transition-all"
                >
                  {persona.isPublic ? (
                    <><Lock size={12} className="text-amber-400" /> Make Private</>
                  ) : (
                    <><Globe size={12} className="text-emerald-400" /> Make Public</>
                  )}
                </button>
                <div className="h-px bg-white/6 mx-2" />
                <button
                  onClick={handleCopyShareLink}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-white/70 hover:text-white hover:bg-white/8 transition-all"
                >
                  <Share2 size={12} className={copied ? 'text-teal-400' : 'text-white/40'} />
                  {copied ? 'Link Copied!' : 'Copy Chat Link'}
                </button>
                {(persona.status === 'active' || persona.status === 'paused') && (
                  <>
                    <div className="h-px bg-white/6 mx-2" />
                    <button
                      onClick={handlePause}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-white/70 hover:text-white hover:bg-white/8 transition-all"
                    >
                      {persona.status === 'paused' ? (
                        <>
                          <PlayCircle size={12} className="text-green-400" />
                          Resume Persona
                        </>
                      ) : (
                        <>
                          <PauseCircle size={12} className="text-amber-400" />
                          Pause Persona
                        </>
                      )}
                    </button>
                  </>
                )}
                <div className="h-px bg-white/6 mx-2" />
                <button
                  onClick={handleDelete}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/8 transition-all"
                >
                  <Trash2 size={12} />
                  Delete Persona
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <h3 className="text-sm font-600 text-white mb-0.5 truncate">{persona.name}</h3>
      <p className="text-[10px] font-500 text-purple-400/80 mb-1">{persona.subCategory}</p>
      <p className="text-xs text-white/40 leading-snug line-clamp-2 mb-3">{persona.description}</p>

      {/* Shareable URL for public personas */}
      {persona.isPublic && (
        <div
          className="flex items-center gap-2 mb-3 px-2.5 py-2 rounded-lg bg-emerald-500/8 border border-emerald-500/15"
          onClick={(e) => e.stopPropagation()}
        >
          <Globe size={10} className="text-emerald-400 flex-shrink-0" />
          <span className="text-[10px] text-white/40 font-mono truncate flex-1">/chat/{persona.slug}</span>
          <button
            onClick={handleCopyUrl}
            title="Copy shareable URL"
            className={`flex-shrink-0 flex items-center gap-1 text-[10px] font-500 transition-all ${urlCopied ? 'text-teal-400' : 'text-white/30 hover:text-white/70'}`}
          >
            {urlCopied ? <><CheckIcon size={10} /> Copied</> : <><Copy size={10} /> Copy</>}
          </button>
        </div>
      )}

      <div className="flex items-center gap-3 mb-3 text-xs text-white/35">
        <span className="flex items-center gap-1">
          <Database size={10} className="text-white/25" />
          <span className="tabular-nums">{persona.knowledgeChunks.toLocaleString()}</span>
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare size={10} className="text-white/25" />
          <span className="tabular-nums">{persona.messagesTotal.toLocaleString()}</span>
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-1">
          {persona.channels.slice(0, 4).map((ch) => (
            <span key={`${persona.id}-grid-ch-${ch}`} className="text-sm" title={ch}>{channelIcon(ch)}</span>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onTest(e); }}
            title="Test this persona"
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-500/15 border border-purple-500/20 text-purple-300 text-[10px] font-500 hover:bg-purple-500/25 transition-all opacity-0 group-hover:opacity-100"
          >
            <FlaskConical size={10} /> Test
          </button>
        </div>
      </div>
    </div>
  );
}