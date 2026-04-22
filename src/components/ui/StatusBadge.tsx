import React from 'react';

type StatusType = 'active' | 'draft' | 'training' | 'paused' | 'archived' | 'connected' | 'disconnected' | 'processing' | 'ready' | 'failed' | 'pending' | 'invited';

const statusConfig: Record<StatusType, { label: string; bg: string; text: string; dot: string }> = {
  active: { label: 'Active', bg: 'bg-emerald-500/15', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  draft: { label: 'Draft', bg: 'bg-white/8', text: 'text-white/50', dot: 'bg-white/30' },
  training: { label: 'Training', bg: 'bg-blue-500/15', text: 'text-blue-400', dot: 'bg-blue-400' },
  paused: { label: 'Paused', bg: 'bg-amber-500/15', text: 'text-amber-400', dot: 'bg-amber-400' },
  archived: { label: 'Archived', bg: 'bg-white/5', text: 'text-white/30', dot: 'bg-white/20' },
  connected: { label: 'Connected', bg: 'bg-emerald-500/15', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  disconnected: { label: 'Not Connected', bg: 'bg-white/8', text: 'text-white/40', dot: 'bg-white/25' },
  processing: { label: 'Processing', bg: 'bg-blue-500/15', text: 'text-blue-400', dot: 'bg-blue-400' },
  ready: { label: 'Ready', bg: 'bg-emerald-500/15', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  failed: { label: 'Failed', bg: 'bg-red-500/15', text: 'text-red-400', dot: 'bg-red-400' },
  pending: { label: 'Pending', bg: 'bg-amber-500/15', text: 'text-amber-400', dot: 'bg-amber-400' },
  invited: { label: 'Invited', bg: 'bg-purple-500/15', text: 'text-purple-400', dot: 'bg-purple-400' },
};

interface StatusBadgeProps {
  status: StatusType;
  showDot?: boolean;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, showDot = true, size = 'sm' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const sizeClasses = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-500 ${config.bg} ${config.text} ${sizeClasses}`}>
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${config.dot} ${status === 'active' || status === 'connected' ? 'status-dot-active' : ''}`} />
      )}
      {config.label}
    </span>
  );
}