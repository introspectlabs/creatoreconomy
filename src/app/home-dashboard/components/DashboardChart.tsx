'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,  } from 'recharts';

const data = [
  { date: 'Mar 21', whatsapp: 420, webchat: 310, api: 180 },
  { date: 'Mar 22', whatsapp: 380, webchat: 290, api: 210 },
  { date: 'Mar 23', whatsapp: 510, webchat: 340, api: 195 },
  { date: 'Mar 24', whatsapp: 460, webchat: 380, api: 240 },
  { date: 'Mar 25', whatsapp: 390, webchat: 290, api: 180 },
  { date: 'Mar 26', whatsapp: 340, webchat: 250, api: 160 },
  { date: 'Mar 27', whatsapp: 550, webchat: 420, api: 290 },
  { date: 'Mar 28', whatsapp: 620, webchat: 480, api: 320 },
  { date: 'Mar 29', whatsapp: 590, webchat: 450, api: 305 },
  { date: 'Mar 30', whatsapp: 680, webchat: 510, api: 350 },
  { date: 'Mar 31', whatsapp: 720, webchat: 530, api: 380 },
  { date: 'Apr 1', whatsapp: 650, webchat: 495, api: 340 },
  { date: 'Apr 2', whatsapp: 780, webchat: 560, api: 410 },
  { date: 'Apr 3', whatsapp: 840, webchat: 610, api: 440 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 p-3 shadow-2xl text-xs" style={{ background: 'rgba(14,16,24,0.98)' }}>
      <p className="text-white/50 mb-2 font-500">{label}</p>
      {payload.map((p: any) => (
        <div key={`tip-${p.dataKey}`} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-white/60 capitalize">{p.dataKey}:</span>
          <span className="text-white font-600 tabular-nums">{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default function DashboardChart() {
  return (
    <div className="glass rounded-2xl p-5 h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-600 text-white">Message Volume by Channel</h3>
          <p className="text-xs text-white/35 mt-0.5">Last 14 days — all channels</p>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-white/30 bg-white/5 border border-white/8 rounded-lg px-2.5 py-1.5">
          14 days
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradWhatsapp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradWebchat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradApi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="whatsapp" stroke="#7c3aed" strokeWidth={2} fill="url(#gradWhatsapp)" />
          <Area type="monotone" dataKey="webchat" stroke="#3b82f6" strokeWidth={2} fill="url(#gradWebchat)" />
          <Area type="monotone" dataKey="api" stroke="#14b8a6" strokeWidth={2} fill="url(#gradApi)" />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-3 pt-3 border-t border-white/5">
        {[
          { key: 'chart-whatsapp', label: 'WhatsApp', color: '#7c3aed' },
          { key: 'chart-webchat', label: 'Web Chat', color: '#3b82f6' },
          { key: 'chart-api', label: 'API', color: '#14b8a6' },
        ].map((l) => (
          <div key={l.key} className="flex items-center gap-1.5">
            <span className="w-2.5 h-1 rounded-full" style={{ background: l.color }} />
            <span className="text-[11px] text-white/40">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}