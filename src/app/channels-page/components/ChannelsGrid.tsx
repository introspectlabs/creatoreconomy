'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { MessageCircle, Globe, Settings, RefreshCw, X, CheckCircle, Clock, PauseCircle, FileEdit, Plus, AlertCircle, Trash2, Copy, Check, Search, ChevronDown, ChevronUp, Edit2 } from 'lucide-react';
import { toast } from 'sonner';
import { personas } from '@/app/persona-library/components/personaData';

// ─── Types ────────────────────────────────────────────────────────────────────

type ChannelType = 'text-chat' | 'web-embed';

interface PersonaAssignment {
  personaId: string;
  embedKey: string; // unique per persona within this channel type
}

interface ChannelGroup {
  type: ChannelType;
  name: string;
  provider: string;
  status: 'connected' | 'disconnected' | 'error';
  webhookUrl: string;
  apiVersion: string | null;
  assignments: PersonaAssignment[];
  messagesDay: string;
  uptime: string;
  lastEvent: string;
}

// ─── Design tokens per channel type ──────────────────────────────────────────

const CHANNEL_META: Record<ChannelType, {
  icon: React.ElementType;
  color: string;
  iconBg: string;
  borderColor: string;
  accentBorder: string;
}> = {
  'text-chat': {
    icon: MessageCircle,
    color: 'text-teal-400',
    iconBg: 'bg-teal-500/15',
    borderColor: 'border-teal-500/20',
    accentBorder: 'border-teal-500/30',
  },
  'web-embed': {
    icon: Globe,
    color: 'text-purple-400',
    iconBg: 'bg-purple-500/15',
    borderColor: 'border-purple-500/20',
    accentBorder: 'border-purple-500/30',
  },
};

// ─── Initial Data ─────────────────────────────────────────────────────────────

const initialChannelGroups: ChannelGroup[] = [
  {
    type: 'text-chat',
    name: 'Text Chat',
    provider: 'Hosted Chat Page',
    status: 'connected',
    webhookUrl: 'https://api.personamatrix.ai/webhooks/text-chat',
    apiVersion: null,
    messagesDay: '1,524',
    uptime: '99.9%',
    lastEvent: '1 min ago',
    assignments: [
      { personaId: 'persona-003', embedKey: 'tc-key-003' },
      { personaId: 'persona-008', embedKey: 'tc-key-008' },
    ],
  },
  {
    type: 'web-embed',
    name: 'Web Embed',
    provider: 'Widget CDN',
    status: 'connected',
    webhookUrl: 'https://api.personamatrix.ai/webhooks/web-embed',
    apiVersion: null,
    messagesDay: '3,210',
    uptime: '99.7%',
    lastEvent: '3 min ago',
    assignments: [
      { personaId: 'persona-011', embedKey: 'we-key-011' },
      { personaId: 'persona-012', embedKey: 'we-key-012' },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusIcon = (status: string) => {
  switch (status) {
    case 'active': return <CheckCircle size={11} className="text-emerald-400" />;
    case 'training': return <Clock size={11} className="text-amber-400" />;
    case 'paused': return <PauseCircle size={11} className="text-white/30" />;
    case 'draft': return <FileEdit size={11} className="text-white/30" />;
    default: return <CheckCircle size={11} className="text-emerald-400" />;
  }
};

function getAllUsedKeys(
  groups: ChannelGroup[],
  excludeGroupType?: ChannelType,
  excludePersonaId?: string
): string[] {
  const used: string[] = [];
  for (const g of groups) {
    for (const a of g.assignments) {
      if (g.type === excludeGroupType && a.personaId === excludePersonaId) continue;
      used.push(a.embedKey);
    }
  }
  return used;
}

// ─── Add / Edit Assignment Modal ──────────────────────────────────────────────

interface AssignmentModalProps {
  channelGroup: ChannelGroup;
  allGroups: ChannelGroup[];
  editingAssignment?: PersonaAssignment | null;
  onClose: () => void;
  onSave: (assignment: PersonaAssignment) => void;
}

function AssignmentModal({ channelGroup, allGroups, editingAssignment, onClose, onSave }: AssignmentModalProps) {
  const isEdit = !!editingAssignment;
  const [selectedPersonaId, setSelectedPersonaId] = useState(editingAssignment?.personaId ?? '');
  const [embedKey, setEmbedKey] = useState(editingAssignment?.embedKey ?? '');
  const [keyError, setKeyError] = useState('');
  const [personaSearch, setPersonaSearch] = useState('');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const usedKeys = getAllUsedKeys(allGroups, channelGroup.type, editingAssignment?.personaId);
  const assignedPersonaIds = new Set(channelGroup.assignments.map((a) => a.personaId));

  const availablePersonas = useMemo(() =>
    personas.filter((p) => {
      if (p.status === 'draft') return false;
      if (isEdit) return p.id === editingAssignment?.personaId || !assignedPersonaIds.has(p.id);
      return !assignedPersonaIds.has(p.id);
    }).filter((p) =>
      p.name.toLowerCase().includes(personaSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(personaSearch.toLowerCase())
    ),
    [personaSearch, isEdit]
  );

  const validateKey = (val: string) => {
    if (!val.trim()) { setKeyError('Embed key is required'); return false; }
    if (usedKeys.includes(val.trim())) {
      setKeyError('This key is already assigned to another persona');
      return false;
    }
    setKeyError('');
    return true;
  };

  const handleSave = () => {
    if (!selectedPersonaId) { toast.error('Please select a persona'); return; }
    if (!validateKey(embedKey)) return;
    onSave({ personaId: selectedPersonaId, embedKey: embedKey.trim() });
  };

  const meta = CHANNEL_META[channelGroup.type];
  const ChannelIcon = meta.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative glass rounded-2xl border border-white/10 w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl ${meta.iconBg} flex items-center justify-center`}>
              <ChannelIcon size={15} className={meta.color} />
            </div>
            <div>
              <h2 className="text-sm font-700 text-white">
                {isEdit ? 'Edit Assignment' : 'Assign Persona'}
              </h2>
              <p className="text-[11px] text-white/40">{channelGroup.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all">
            <X size={14} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Persona selector */}
          <div>
            <label className="text-xs text-white/50 mb-2 block">Select Persona</label>
            {!isEdit && (
              <div className="flex items-center gap-1.5 bg-white/4 border border-white/8 rounded-xl px-2.5 py-1.5 mb-2">
                <Search size={11} className="text-white/25 shrink-0" />
                <input
                  value={personaSearch}
                  onChange={(e) => setPersonaSearch(e.target.value)}
                  placeholder="Search personas…"
                  className="flex-1 bg-transparent text-[11px] text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
            )}
            <div className="max-h-44 overflow-y-auto space-y-1 pr-0.5">
              {availablePersonas.length === 0 ? (
                <p className="text-[11px] text-white/25 text-center py-4">
                  {isEdit ? 'No other personas available' : 'All personas already assigned'}
                </p>
              ) : (
                availablePersonas.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => !isEdit && setSelectedPersonaId(p.id)}
                    disabled={isEdit}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all text-left ${
                      selectedPersonaId === p.id
                        ? 'bg-purple-600/15 border-purple-500/30'
                        : isEdit
                        ? 'bg-white/3 border-white/6 cursor-default' : 'bg-white/3 border-white/6 hover:border-white/15'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center text-[9px] font-700 text-purple-300 shrink-0">
                      {p.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-600 text-white/80 truncate">{p.name}</p>
                      <p className="text-[10px] text-white/30 truncate">{p.description}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {statusIcon(p.status)}
                      <span className="text-[9px] text-white/30 capitalize">{p.status}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Embed Key */}
          <div>
            <label className="text-xs text-white/50 mb-1.5 block">
              Embed Key
              <span className="ml-1.5 text-[10px] text-amber-400/70">· Unique per persona</span>
            </label>
            <input
              value={embedKey}
              onChange={(e) => { setEmbedKey(e.target.value); if (keyError) validateKey(e.target.value); }}
              onBlur={() => validateKey(embedKey)}
              placeholder="e.g. tc-key-001"
              className={`w-full bg-white/5 border rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none placeholder:text-white/20 ${
                keyError ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'
              }`}
            />
            {keyError && (
              <p className="flex items-center gap-1 text-[11px] text-red-400 mt-1.5">
                <AlertCircle size={11} /> {keyError}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 p-5 border-t border-white/8">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-600 border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl text-xs font-600 bg-purple-600 hover:bg-purple-500 text-white transition-all"
          >
            {isEdit ? 'Save Changes' : 'Assign Persona'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Channel Config Modal ─────────────────────────────────────────────────────

interface ConfigModalProps {
  channelGroup: ChannelGroup;
  onClose: () => void;
  onUpdate: (updated: ChannelGroup) => void;
}

function ConfigModal({ channelGroup, onClose, onUpdate }: ConfigModalProps) {
  const [webhookUrl, setWebhookUrl] = useState(channelGroup.webhookUrl);
  const [copied, setCopied] = useState(false);
  const meta = CHANNEL_META[channelGroup.type];
  const ChannelIcon = meta.icon;

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSave = () => {
    onUpdate({ ...channelGroup, webhookUrl });
    toast.success('Channel configuration saved');
    onClose();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative glass rounded-2xl border border-white/10 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl ${meta.iconBg} flex items-center justify-center`}>
              <ChannelIcon size={15} className={meta.color} />
            </div>
            <div>
              <h2 className="text-sm font-700 text-white">Configure Channel</h2>
              <p className="text-[11px] text-white/40">{channelGroup.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all">
            <X size={14} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="text-xs text-white/50 mb-1.5 block">Webhook URL</label>
            <div className="flex gap-2">
              <input
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-purple-500/50"
              />
              <button
                onClick={handleCopy}
                className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all shrink-0"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 p-5 border-t border-white/8">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-600 border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded-xl text-xs font-600 bg-purple-600 hover:bg-purple-500 text-white transition-all">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Channel Group Card ───────────────────────────────────────────────────────

interface ChannelGroupCardProps {
  group: ChannelGroup;
  allGroups: ChannelGroup[];
  refreshing: boolean;
  onRefresh: () => void;
  onConfigure: () => void;
  onAssign: () => void;
  onEditAssignment: (assignment: PersonaAssignment) => void;
  onRemoveAssignment: (assignment: PersonaAssignment) => void;
}

function ChannelGroupCard({
  group,
  allGroups,
  refreshing,
  onRefresh,
  onConfigure,
  onAssign,
  onEditAssignment,
  onRemoveAssignment,
}: ChannelGroupCardProps) {
  const meta = CHANNEL_META[group.type];
  const ChannelIcon = meta.icon;
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(true);

  const filteredAssignments = useMemo(() =>
    group.assignments.filter((a) => {
      const p = personas.find((x) => x.id === a.personaId);
      return !search || p?.name.toLowerCase().includes(search.toLowerCase());
    }),
    [group.assignments, search]
  );

  return (
    <div className={`rounded-2xl border ${meta.borderColor} bg-white/[0.02] overflow-hidden`}>
      {/* Card Header */}
      <div className="flex items-center gap-4 p-4 border-b border-white/6">
        <div className={`w-10 h-10 rounded-xl ${meta.iconBg} flex items-center justify-center shrink-0`}>
          <ChannelIcon size={18} className={meta.color} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-sm font-700 text-white truncate">{group.name}</h3>
            <span className={`text-[9px] font-700 px-1.5 py-0.5 rounded-full ${
              group.status === 'connected' ?'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                : group.status === 'error' ?'bg-red-500/15 text-red-400 border border-red-500/20' :'bg-white/8 text-white/30 border border-white/10'
            }`}>
              {group.status}
            </span>
          </div>
          <p className="text-[11px] text-white/35 truncate">{group.provider}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onRefresh}
            className="w-7 h-7 rounded-xl border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all"
            title="Refresh status"
          >
            <RefreshCw size={11} className={refreshing ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={onConfigure}
            className="w-7 h-7 rounded-xl border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all"
            title="Configure channel"
          >
            <Settings size={11} />
          </button>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="w-7 h-7 rounded-xl border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all"
          >
            {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-white/6 border-b border-white/6">
        {[
          { label: 'Msgs / Day', value: group.messagesDay },
          { label: 'Uptime', value: group.uptime },
          { label: 'Last Event', value: group.lastEvent },
        ].map(({ label, value }) => (
          <div key={label} className="px-4 py-2.5 text-center">
            <p className="text-[10px] text-white/30 mb-0.5">{label}</p>
            <p className="text-xs font-700 text-white/70">{value}</p>
          </div>
        ))}
      </div>

      {/* Assignments */}
      {expanded && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-600 text-white/40 uppercase tracking-wider">
              Personas ({group.assignments.length})
            </p>
            <button
              onClick={onAssign}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-600 border border-white/10 text-white/50 hover:text-white hover:border-white/25 transition-all"
            >
              <Plus size={10} /> Assign
            </button>
          </div>

          {group.assignments.length > 3 && (
            <div className="flex items-center gap-1.5 bg-white/4 border border-white/8 rounded-xl px-2.5 py-1.5 mb-2">
              <Search size={11} className="text-white/25 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search assigned personas…"
                className="flex-1 bg-transparent text-[11px] text-white placeholder:text-white/20 focus:outline-none"
              />
            </div>
          )}

          {filteredAssignments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-10 h-10 rounded-xl bg-white/4 flex items-center justify-center mb-3">
                <ChannelIcon size={16} className="text-white/15" />
              </div>
              <p className="text-sm font-600 text-white/40">No personas assigned</p>
              <p className="text-[11px] text-white/20 mt-1">Assign a persona to activate this channel</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {filteredAssignments.map((assignment) => {
                const persona = personas.find((p) => p.id === assignment.personaId);
                if (!persona) return null;
                return (
                  <div
                    key={assignment.personaId}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/6 bg-white/[0.02] group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center text-[9px] font-700 text-purple-300 shrink-0">
                      {persona.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-600 text-white/80 truncate">{persona.name}</p>
                      <p className="text-[10px] text-white/30 font-mono truncate">{assignment.embedKey}</p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        onClick={() => onEditAssignment(assignment)}
                        className="w-6 h-6 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all"
                        title="Edit assignment"
                      >
                        <Edit2 size={9} />
                      </button>
                      <button
                        onClick={() => onRemoveAssignment(assignment)}
                        className="w-6 h-6 rounded-lg border border-red-500/20 flex items-center justify-center text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        title="Remove assignment"
                      >
                        <Trash2 size={9} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Remove Confirmation Modal ────────────────────────────────────────────────

interface RemoveModalProps {
  assignment: PersonaAssignment;
  channelName: string;
  onClose: () => void;
  onConfirm: () => void;
}

function RemoveModal({ assignment, channelName, onClose, onConfirm }: RemoveModalProps) {
  const persona = personas.find((p) => p.id === assignment.personaId);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative glass rounded-2xl border border-white/10 w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center shrink-0">
            <Trash2 size={15} className="text-red-400" />
          </div>
          <div>
            <h2 className="text-sm font-700 text-white">Remove Assignment</h2>
            <p className="text-[11px] text-white/40">{channelName}</p>
          </div>
        </div>
        <p className="text-xs text-white/50 mb-5 leading-relaxed">
          Remove <span className="text-white font-600">{persona?.name}</span> from this channel? This will disable their chat on this channel.
        </p>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-600 border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-xl text-xs font-600 bg-red-600 hover:bg-red-500 text-white transition-all">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ChannelsGrid() {
  const [groups, setGroups] = useState<ChannelGroup[]>(initialChannelGroups);
  const [refreshing, setRefreshing] = useState<ChannelType | null>(null);

  // Modal states
  const [assigningGroup, setAssigningGroup] = useState<ChannelGroup | null>(null);
  const [editingAssignment, setEditingAssignment] = useState<{ group: ChannelGroup; assignment: PersonaAssignment } | null>(null);
  const [removingAssignment, setRemovingAssignment] = useState<{ group: ChannelGroup; assignment: PersonaAssignment } | null>(null);
  const [configuringGroup, setConfiguringGroup] = useState<ChannelGroup | null>(null);

  const handleRefresh = (type: ChannelType) => {
    setRefreshing(type);
    setTimeout(() => { setRefreshing(null); toast.success('Channel status refreshed'); }, 1200);
  };

  const handleUpdateGroup = (updated: ChannelGroup) => {
    setGroups((prev) => prev.map((g) => (g.type === updated.type ? updated : g)));
  };

  const handleSaveAssignment = (groupType: ChannelType, assignment: PersonaAssignment, isEdit: boolean) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.type !== groupType) return g;
        if (isEdit) {
          return { ...g, assignments: g.assignments.map((a) => a.personaId === assignment.personaId ? assignment : a) };
        }
        return { ...g, assignments: [...g.assignments, assignment] };
      })
    );
    toast.success(isEdit ? 'Assignment updated' : 'Persona assigned');
    setAssigningGroup(null);
    setEditingAssignment(null);
  };

  const handleRemoveAssignment = (groupType: ChannelType, personaId: string) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.type === groupType
          ? { ...g, assignments: g.assignments.filter((a) => a.personaId !== personaId) }
          : g
      )
    );
    toast.success('Assignment removed');
    setRemovingAssignment(null);
  };

  const totalAssignments = groups.reduce((sum, g) => sum + g.assignments.length, 0);

  return (
    <div className="p-6">
      {/* Modals */}
      {assigningGroup && (
        <AssignmentModal
          channelGroup={assigningGroup}
          allGroups={groups}
          onClose={() => setAssigningGroup(null)}
          onSave={(assignment) => handleSaveAssignment(assigningGroup.type, assignment, false)}
        />
      )}
      {editingAssignment && (
        <AssignmentModal
          channelGroup={editingAssignment.group}
          allGroups={groups}
          editingAssignment={editingAssignment.assignment}
          onClose={() => setEditingAssignment(null)}
          onSave={(assignment) => handleSaveAssignment(editingAssignment.group.type, assignment, true)}
        />
      )}
      {removingAssignment && (
        <RemoveModal
          assignment={removingAssignment.assignment}
          channelName={removingAssignment.group.name}
          onClose={() => setRemovingAssignment(null)}
          onConfirm={() => handleRemoveAssignment(removingAssignment.group.type, removingAssignment.assignment.personaId)}
        />
      )}
      {configuringGroup && (
        <ConfigModal
          channelGroup={configuringGroup}
          onClose={() => setConfiguringGroup(null)}
          onUpdate={(updated) => {
            handleUpdateGroup(updated);
            setConfiguringGroup(null);
          }}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-700 text-white">Channels</h2>
          <p className="text-xs text-white/40 mt-0.5">
            {groups.length} channel type{groups.length !== 1 ? 's' : ''} · {totalAssignments} persona assignment{totalAssignments !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Info strip */}
      <div className="rounded-xl border border-teal-500/20 bg-teal-500/5 px-4 py-3 mb-6">
        <p className="text-xs font-600 text-teal-300">Text Chat &amp; Web Embed only</p>
        <p className="text-[11px] text-white/40 mt-0.5">
          Personas can be deployed via a hosted text chat page or as a web embed widget. Each persona receives a unique embed key for clean routing.
        </p>
      </div>

      {/* Channel Groups */}
      <div className="space-y-4 mb-8">
        {groups.map((group) => (
          <ChannelGroupCard
            key={group.type}
            group={group}
            allGroups={groups}
            refreshing={refreshing === group.type}
            onRefresh={() => handleRefresh(group.type)}
            onConfigure={() => setConfiguringGroup(group)}
            onAssign={() => setAssigningGroup(group)}
            onEditAssignment={(assignment) => setEditingAssignment({ group, assignment })}
            onRemoveAssignment={(assignment) => setRemovingAssignment({ group, assignment })}
          />
        ))}
      </div>
    </div>
  );
}