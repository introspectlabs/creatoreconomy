'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Command, X, CheckCheck } from 'lucide-react';
import CommandPalette from './ui/CommandPalette';

interface TopbarProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const notifications = [
  {
    id: 1,
    title: 'Persona "Aria" updated',
    description: 'Knowledge base sync completed successfully.',
    time: '2 min ago',
    read: false,
  },
  {
    id: 2,
    title: 'New API key generated',
    description: 'A new API key was created for your account.',
    time: '1 hr ago',
    read: false,
  },
  {
    id: 3,
    title: 'Video generation complete',
    description: 'Your video "Product Demo v2" is ready to view.',
    time: '3 hr ago',
    read: true,
  },
  {
    id: 4,
    title: 'Billing invoice available',
    description: 'Your April 2026 invoice is ready for download.',
    time: 'Yesterday',
    read: true,
  },
];

export default function Topbar({ title, subtitle, action }: TopbarProps) {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [readIds, setReadIds] = useState<number[]>(notifications.filter(n => n.read).map(n => n.id));
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !readIds.includes(n.id)).length;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(true);
      }
      if (e.key === 'Escape') {
        setCmdOpen(false);
        setNotifOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    if (notifOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notifOpen]);

  const markAllRead = () => setReadIds(notifications.map(n => n.id));

  return (
    <>
      <div className="flex items-start justify-between mb-6 sm:mb-8 gap-3 pl-12 lg:pl-0">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-700 text-white tracking-tight truncate">{title}</h1>
          {subtitle && <p className="text-xs sm:text-sm text-white/45 mt-1 line-clamp-2">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setCmdOpen(true)}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-xl border border-white/8 text-white/35 hover:text-white/60 hover:bg-white/5 transition-all text-xs"
          >
            <Search size={13} />
            <span className="hidden sm:inline">Search</span>
            <span className="hidden md:flex items-center gap-1 text-[10px] bg-white/8 rounded px-1 py-0.5">
              <Command size={9} /> K
            </span>
          </button>

          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(prev => !prev)}
              aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
              className="relative w-9 h-9 rounded-xl border border-white/8 flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/5 transition-all flex-shrink-0"
            >
              <Bell size={15} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 border border-[#0a0c12]" />
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-11 w-80 sm:w-96 bg-[#13151f] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-600 text-white">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] bg-purple-500/20 text-purple-400 rounded-full px-2 py-0.5 font-500">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="flex items-center gap-1 text-[11px] text-white/40 hover:text-purple-400 transition-colors"
                      >
                        <CheckCheck size={12} />
                        <span>Mark all read</span>
                      </button>
                    )}
                    <button
                      onClick={() => setNotifOpen(false)}
                      className="text-white/30 hover:text-white/60 transition-colors ml-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>

                {/* Notification List */}
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map(n => {
                    const isRead = readIds.includes(n.id);
                    return (
                      <div
                        key={n.id}
                        onClick={() => setReadIds(prev => prev.includes(n.id) ? prev : [...prev, n.id])}
                        className={`flex items-start gap-3 px-4 py-3 border-b border-white/5 cursor-pointer transition-colors hover:bg-white/4 ${isRead ? 'opacity-50' : ''}`}
                      >
                        <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${isRead ? 'bg-white/15' : 'bg-purple-500'}`} />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-500 text-white truncate">{n.title}</p>
                          <p className="text-[11px] text-white/40 mt-0.5 line-clamp-2">{n.description}</p>
                          <p className="text-[10px] text-white/25 mt-1">{n.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="px-4 py-2.5 text-center">
                  <button className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {action}
        </div>
      </div>
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}