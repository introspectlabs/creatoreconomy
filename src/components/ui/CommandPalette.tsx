'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, LayoutDashboard, Brain, Code2, Radio, Plug, Building2, X, ArrowRight } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const commands = [
  { id: 'cmd-dashboard', label: 'Go to Home Dashboard', icon: LayoutDashboard, href: '/home-dashboard', category: 'Navigation' },
  { id: 'cmd-personas', label: 'Persona Library', icon: Brain, href: '/persona-library', category: 'Navigation' },
  { id: 'cmd-channels', label: 'Channels', icon: Radio, href: '/channels-page', category: 'Navigation' },
  { id: 'cmd-services', label: 'Services', icon: Plug, href: '/services-page', category: 'Navigation' },
  { id: 'cmd-embeds', label: 'Embeds / Plugins', icon: Code2, href: '/embeds-plugins', category: 'Navigation' },
  { id: 'cmd-org', label: 'Organization', icon: Building2, href: '/organization-rbac', category: 'Navigation' },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback((href: string) => {
    router.push(href);
    onClose();
    setQuery('');
  }, [router, onClose]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg mx-4 rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: 'rgba(14,16,24,0.98)', border: '1px solid rgba(255,255,255,0.12)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8">
          <Search size={16} className="text-white/40 flex-shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, actions..."
            className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
          />
          <button onClick={onClose} className="text-white/30 hover:text-white/60 transition-colors">
            <X size={14} />
          </button>
        </div>
        <div className="py-2 max-h-80 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-white/30 text-sm py-8">No results found</p>
          ) : (
            filtered.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => handleSelect(cmd.href)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-all group text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/80 group-hover:text-white transition-colors">{cmd.label}</p>
                    <p className="text-[11px] text-white/30">{cmd.category}</p>
                  </div>
                  <ArrowRight size={13} className="text-white/20 group-hover:text-white/50 transition-colors" />
                </button>
              );
            })
          )}
        </div>
        <div className="px-4 py-2.5 border-t border-white/5 flex items-center gap-4">
          <span className="text-[10px] text-white/25 flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded bg-white/8 font-mono text-[10px]">↵</kbd> select
          </span>
          <span className="text-[10px] text-white/25 flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded bg-white/8 font-mono text-[10px]">esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}