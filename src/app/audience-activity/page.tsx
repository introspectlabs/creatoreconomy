'use client';
import React, { useState } from 'react';

import { Clock, Bell, Filter } from 'lucide-react';
import AudienceLayout from '@/components/AudienceLayout';

interface ActivityItem {
  id: string;
  type: 'chat' | 'follow' | 'unfollow' | 'content' | 'credit';
  persona: string;
  message: string;
  time: string;
  emoji: string;
  date: string;
}

const ACTIVITY: ActivityItem[] = [
  { id: '1', type: 'chat', persona: 'Alex the Mentor', message: 'You asked about React performance optimization', time: '2h ago', emoji: '💬', date: 'Today' },
  { id: '2', type: 'content', persona: 'FitCoach Maya', message: 'New workout plan available for you', time: '5h ago', emoji: '🔔', date: 'Today' },
  { id: '3', type: 'follow', persona: 'Chef Ravi', message: 'You started following Chef Ravi', time: '1d ago', emoji: '✅', date: 'Yesterday' },
  { id: '4', type: 'chat', persona: 'Dr. Wellness', message: 'You completed a 10-min mindfulness session', time: '2d ago', emoji: '🧘', date: 'Yesterday' },
  { id: '5', type: 'credit', persona: 'System', message: 'You purchased 30 chat credits', time: '3d ago', emoji: '💳', date: '3 days ago' },
  { id: '6', type: 'chat', persona: 'Investor Priya', message: 'You discussed index fund strategies', time: '5d ago', emoji: '📈', date: '5 days ago' },
  { id: '7', type: 'follow', persona: 'Alex the Mentor', message: 'You started following Alex the Mentor', time: '1w ago', emoji: '✅', date: 'Last week' },
  { id: '8', type: 'unfollow', persona: 'Storyteller Sam', message: 'You unfollowed Storyteller Sam', time: '1w ago', emoji: '❌', date: 'Last week' },
];

const FILTER_OPTIONS = ['All', 'Chats', 'Following', 'Credits', 'Content'];

const typeColorMap: Record<string, string> = {
  chat: 'bg-[#6b7ff0]/15 text-[#6b7ff0]',
  follow: 'bg-green-500/15 text-green-400',
  unfollow: 'bg-red-500/15 text-red-400',
  content: 'bg-amber-500/15 text-amber-400',
  credit: 'bg-[#7c3aed]/15 text-[#a78bfa]',
};

export default function AudienceActivityPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = ACTIVITY.filter((a) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Chats') return a.type === 'chat';
    if (activeFilter === 'Following') return a.type === 'follow' || a.type === 'unfollow';
    if (activeFilter === 'Credits') return a.type === 'credit';
    if (activeFilter === 'Content') return a.type === 'content';
    return true;
  });

  const grouped = filtered.reduce<Record<string, ActivityItem[]>>((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});

  return (
    <AudienceLayout topbarTitle="Activity" topbarIcon={Clock}>
      <div className="px-4 sm:px-6 py-6 max-w-3xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Activity Feed</h2>
            <p className="text-white/40 text-sm mt-1">Your recent actions and updates</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/50">
            <Filter size={12} />
            <span>Filter</span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6" style={{ scrollbarWidth: 'none' }}>
          {FILTER_OPTIONS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === f
                  ? 'bg-[#6b7ff0] text-white'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Activity groups */}
        <div className="flex flex-col gap-6">
          {Object.entries(grouped).map(([date, items]) => (
            <div key={date}>
              <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest mb-3">{date}</p>
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 p-4 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/5 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl flex-shrink-0">{item.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-semibold text-white truncate">{item.persona}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColorMap[item.type] || 'bg-white/10 text-white/40'}`}>
                          {item.type}
                        </span>
                      </div>
                      <p className="text-xs text-white/50 leading-snug">{item.message}</p>
                    </div>
                    <span className="text-[10px] text-white/25 flex-shrink-0 mt-0.5">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
              <Bell size={28} className="text-white/20" />
            </div>
            <p className="text-white/40 text-sm">No activity found for this filter.</p>
          </div>
        )}
      </div>
    </AudienceLayout>
  );
}
