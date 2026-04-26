import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Activity } from 'lucide-react';

const services = [
  { id: 'sh-elevenlabs', name: 'ElevenLabs', status: 'degraded', latency: '310ms' },
  { id: 'sh-heygen', name: 'Heygen', status: 'operational', latency: '88ms' },
  { id: 'sh-tavus', name: 'Tavus', status: 'operational', latency: '65ms' },
  { id: 'sh-omnidim', name: 'Omnidimension', status: 'operational', latency: '55ms' },
  { id: 'sh-ragindex', name: 'RAG Indexer', status: 'incident', latency: '—' },
];

const statusIcon = (s: string) => {
  if (s === 'operational') return <CheckCircle size={13} className="text-emerald-400" />;
  if (s === 'degraded') return <AlertTriangle size={13} className="text-amber-400" />;
  return <XCircle size={13} className="text-red-400" />;
};

const statusLabel = (s: string) => {
  if (s === 'operational') return 'text-emerald-400';
  if (s === 'degraded') return 'text-amber-400';
  return 'text-red-400';
};

export default function SystemHealth() {
  return (
    <div className="glass rounded-2xl p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-white/40" />
          <h3 className="text-sm font-600 text-white">System Health</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 status-dot-active" />
          <span className="text-[11px] text-amber-400">1 incident</span>
        </div>
      </div>
      <div className="space-y-2.5">
        {services.map((s) => (
          <div key={s.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {statusIcon(s.status)}
              <span className="text-xs text-white/65">{s.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-mono tabular-nums ${s.latency === '—' ? 'text-white/25' : 'text-white/40'}`}>
                {s.latency}
              </span>
              <span className={`text-[10px] capitalize ${statusLabel(s.status)}`}>{s.status}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-white/5">
        <p className="text-[11px] text-white/25">All times in UTC+5:30 · Auto-refreshes every 60s</p>
      </div>
    </div>
  );
}