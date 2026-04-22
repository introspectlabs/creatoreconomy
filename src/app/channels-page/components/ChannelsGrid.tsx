'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { MessageCircle, Phone, Settings, RefreshCw, X, CheckCircle, Clock, PauseCircle, FileEdit, Plus, AlertCircle, Trash2, Hash, Copy, Check, Search, ChevronDown, ChevronUp, Edit2,  } from 'lucide-react';
import { toast } from 'sonner';
import { personas } from '@/app/persona-library/components/personaData';

// ─── Types ────────────────────────────────────────────────────────────────────

type ChannelType = 'whatsapp' | 'sip';

interface PersonaNumberAssignment {
  personaId: string;
  phoneNumber: string; // unique per persona within this channel type
}

interface ChannelGroup {
  type: ChannelType;
  name: string;
  provider: string;
  status: 'connected' | 'disconnected' | 'error';
  webhookUrl: string;
  apiVersion: string | null;
  assignments: PersonaNumberAssignment[];
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
  whatsapp: {
    icon: MessageCircle,
    color: 'text-emerald-400',
    iconBg: 'bg-emerald-500/15',
    borderColor: 'border-emerald-500/20',
    accentBorder: 'border-emerald-500/30',
  },
  sip: {
    icon: Phone,
    color: 'text-purple-400',
    iconBg: 'bg-purple-500/15',
    borderColor: 'border-purple-500/20',
    accentBorder: 'border-purple-500/30',
  },
};

// ─── Initial Data ─────────────────────────────────────────────────────────────

const initialChannelGroups: ChannelGroup[] = [
  {
    type: 'whatsapp',
    name: 'WhatsApp Business',
    provider: 'Meta Business API',
    status: 'connected',
    webhookUrl: 'https://api.personamatrix.ai/webhooks/whatsapp',
    apiVersion: 'v18.0',
    messagesDay: '2,841',
    uptime: '99.8%',
    lastEvent: '2 min ago',
    assignments: [
      { personaId: 'persona-003', phoneNumber: '+91 98765 43210' },
      { personaId: 'persona-008', phoneNumber: '+91 98765 43211' },
      { personaId: 'persona-011', phoneNumber: '+1 415 555 0101' },
      { personaId: 'persona-012', phoneNumber: '+1 415 555 0102' },
    ],
  },
  {
    type: 'sip',
    name: 'SIP / Voice',
    provider: 'Twilio SIP',
    status: 'connected',
    webhookUrl: 'https://api.personamatrix.ai/webhooks/sip',
    apiVersion: null,
    messagesDay: '312',
    uptime: '99.2%',
    lastEvent: '22 min ago',
    assignments: [
      { personaId: 'persona-004', phoneNumber: '+1 415 555 0142' },
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

// Collect all phone numbers already in use across all groups (excluding a specific assignment being edited)
function getAllUsedNumbers(
  groups: ChannelGroup[],
  excludeGroupType?: ChannelType,
  excludePersonaId?: string
): string[] {
  const used: string[] = [];
  for (const g of groups) {
    for (const a of g.assignments) {
      if (g.type === excludeGroupType && a.personaId === excludePersonaId) continue;
      used.push(a.phoneNumber);
    }
  }
  return used;
}

// ─── Add / Edit Assignment Modal ──────────────────────────────────────────────

interface AssignmentModalProps {
  channelGroup: ChannelGroup;
  allGroups: ChannelGroup[];
  editingAssignment?: PersonaNumberAssignment | null;
  onClose: () => void;
  onSave: (assignment: PersonaNumberAssignment) => void;
}

function AssignmentModal({ channelGroup, allGroups, editingAssignment, onClose, onSave }: AssignmentModalProps) {
  const isEdit = !!editingAssignment;
  const [selectedPersonaId, setSelectedPersonaId] = useState(editingAssignment?.personaId ?? '');
  const [phoneNumber, setPhoneNumber] = useState(editingAssignment?.phoneNumber ?? '');
  const [phoneError, setPhoneError] = useState('');
  const [personaSearch, setPersonaSearch] = useState('');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const usedNumbers = getAllUsedNumbers(allGroups, channelGroup.type, editingAssignment?.personaId);
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

  const validatePhone = (val: string) => {
    if (!val.trim()) { setPhoneError('Phone number is required'); return false; }
    if (usedNumbers.includes(val.trim())) {
      setPhoneError('This number is already assigned to another persona');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleSave = () => {
    if (!selectedPersonaId) { toast.error('Please select a persona'); return; }
    if (!validatePhone(phoneNumber)) return;
    onSave({ personaId: selectedPersonaId, phoneNumber: phoneNumber.trim() });
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
                        ? 'bg-white/3 border-white/6 cursor-default' :'bg-white/3 border-white/6 hover:border-white/15'
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

          {/* Phone number */}
          <div>
            <label className="text-xs text-white/50 mb-1.5 block">
              Phone Number
              <span className="ml-1.5 text-[10px] text-amber-400/70">· Unique per persona</span>
            </label>
            <input
              value={phoneNumber}
              onChange={(e) => { setPhoneNumber(e.target.value); if (phoneError) validatePhone(e.target.value); }}
              onBlur={() => validatePhone(phoneNumber)}
              placeholder="+1 415 555 0100"
              className={`w-full bg-white/5 border rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none placeholder:text-white/20 ${
                phoneError ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'
              }`}
            />
            {phoneError && (
              <p className="flex items-center gap-1 text-[11px] text-red-400 mt-1.5">
                <AlertCircle size={11} /> {phoneError}
              </p>
            )}
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSave}
              disabled={!selectedPersonaId}
              className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-600 text-white transition-all"
            >
              {isEdit ? 'Save Changes' : 'Assign Persona'}
            </button>
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs font-500 text-white/60 hover:text-white hover:bg-white/5 transition-all">
              Cancel
            </button>
          </div>
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
  const [apiVersion, setApiVersion] = useState(channelGroup.apiVersion ?? '');
  const [copied, setCopied] = useState(false);
  const meta = CHANNEL_META[channelGroup.type];
  const ChannelIcon = meta.icon;

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onUpdate({ ...channelGroup, webhookUrl, apiVersion: apiVersion || null });
    toast.success('Channel configuration saved');
    onClose();
  };

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
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-purple-500/50"
              />
              <button
                onClick={handleCopy}
                className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all shrink-0"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              </button>
            </div>
          </div>
          {channelGroup.apiVersion !== undefined && (
            <div>
              <label className="text-xs text-white/50 mb-1.5 block">API Version</label>
              <input
                value={apiVersion}
                onChange={(e) => setApiVersion(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-purple-500/50"
              />
            </div>
          )}
          <div className="flex gap-2 pt-1">
            <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-600 text-white transition-all">
              Save Changes
            </button>
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs font-500 text-white/60 hover:text-white hover:bg-white/5 transition-all">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Remove Assignment Confirm ────────────────────────────────────────────────

interface RemoveConfirmProps {
  personaId: string;
  phoneNumber: string;
  onClose: () => void;
  onConfirm: () => void;
}

function RemoveConfirm({ personaId, phoneNumber, onClose, onConfirm }: RemoveConfirmProps) {
  const p = personas.find((x) => x.id === personaId);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative glass rounded-2xl border border-white/10 w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-sm font-700 text-white mb-1">Remove Assignment</h3>
        <p className="text-[11px] text-white/40">{p?.name}</p>
        <p className="text-[11px] text-white/40 mb-4">
          Remove <span className="text-white font-600">{p?.name}</span> from number{' '}
          <span className="font-mono text-white/70">{phoneNumber}</span>? This frees the number for reassignment.
        </p>
        <div className="flex gap-2">
          <button onClick={onConfirm} className="flex-1 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-xs font-600 text-red-400 transition-all">
            Remove
          </button>
          <button onClick={onClose} className="flex-1 py-2 rounded-xl border border-white/10 text-xs font-500 text-white/60 hover:text-white hover:bg-white/5 transition-all">
            Cancel
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
  onAddAssignment: () => void;
  onEditAssignment: (assignment: PersonaNumberAssignment) => void;
  onRemoveAssignment: (assignment: PersonaNumberAssignment) => void;
}

function ChannelGroupCard({
  group,
  allGroups,
  refreshing,
  onRefresh,
  onConfigure,
  onAddAssignment,
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
      if (!p) return false;
      return (
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        a.phoneNumber.includes(search)
      );
    }),
    [group.assignments, search]
  );

  return (
    <div className={`glass rounded-2xl border ${meta.borderColor} overflow-hidden`}>
      {/* Group Header */}
      <div className="flex items-center gap-4 p-4 border-b border-white/6">
        <div className={`w-10 h-10 rounded-xl ${meta.iconBg} flex items-center justify-center shrink-0`}>
          <ChannelIcon size={18} className={meta.color} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-700 text-white">{group.name}</p>
            <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/12 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Connected
            </span>
          </div>
          <div className="flex items-center gap-3 mt-0.5 flex-wrap">
            <span className="text-[11px] text-white/35">{group.provider}</span>
            <span className="text-[11px] text-white/25">·</span>
            <span className="text-[11px] text-white/35 tabular-nums">{group.messagesDay} msgs/day</span>
            <span className="text-[11px] text-white/25">·</span>
            <span className="text-[11px] text-white/35">{group.uptime} uptime</span>
          </div>
        </div>

        {/* Header actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-wrap justify-end">
          <span className={`text-[11px] font-500 px-2.5 py-1 rounded-lg ${meta.iconBg} ${meta.color} hidden sm:inline`}>
            {group.assignments.length} persona{group.assignments.length !== 1 ? 's' : ''}
          </span>
          <button
            onClick={onAddAssignment}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-purple-600/20 border border-purple-500/25 text-[11px] font-500 text-purple-300 hover:bg-purple-600/30 transition-all"
          >
            <Plus size={11} /> <span className="hidden sm:inline">Assign</span><span className="sm:hidden">+</span>
          </button>
          <button
            onClick={onConfigure}
            className="w-7 h-7 rounded-xl border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all"
            title="Configure channel"
          >
            <Settings size={11} />
          </button>
          <button
            onClick={onRefresh}
            className="w-7 h-7 rounded-xl border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all"
          >
            <RefreshCw size={11} className={refreshing ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="w-7 h-7 rounded-xl border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all"
          >
            {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
          </button>
        </div>
      </div>

      {/* Persona list */}
      {expanded && (
        <div className="p-4">
          {/* Search */}
          {group.assignments.length > 4 && (
            <div className="flex items-center gap-1.5 bg-white/4 border border-white/8 rounded-xl px-2.5 py-1.5 mb-3">
              <Search size={11} className="text-white/25 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or number…"
                className="flex-1 bg-transparent text-[11px] text-white placeholder:text-white/20 focus:outline-none"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-white/20 hover:text-white/50">
                  <X size={10} />
                </button>
              )}
            </div>
          )}

          {group.assignments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-10 h-10 rounded-xl bg-white/4 flex items-center justify-center mb-3">
                <ChannelIcon size={16} className="text-white/15" />
              </div>
              <p className="text-sm font-600 text-white/40">No personas assigned</p>
              <p className="text-xs text-white/25 mt-1 mb-4">Add your first persona to start routing conversations</p>
              <button
                onClick={() => setAssigningGroup(groups[0])}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-600 text-white transition-all"
              >
                <Plus size={13} /> Add Persona
              </button>
            </div>
          ) : (
            <>
              {/* Column headers */}
              <div className="grid grid-cols-[1fr_auto_auto] gap-3 px-3 mb-2">
                <span className="text-[10px] text-white/25 uppercase tracking-wider font-500">Persona</span>
                <span className="text-[10px] text-white/25 uppercase tracking-wider font-500 text-right min-w-[130px]">Number</span>
                <span className="text-[10px] text-white/25 uppercase tracking-wider font-500 text-right min-w-[60px]">Actions</span>
              </div>

              <div className="space-y-1.5">
                {filteredAssignments.map((assignment) => {
                  const p = personas.find((x) => x.id === assignment.personaId);
                  if (!p) return null;
                  return (
                    <div
                      key={assignment.personaId}
                      className="grid grid-cols-[1fr_auto_auto] gap-3 items-center px-3 py-2.5 rounded-xl bg-white/3 border border-white/6 hover:border-white/12 transition-all group"
                    >
                      {/* Persona info */}
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center text-[9px] font-700 text-purple-300 shrink-0">
                          {p.avatar}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[12px] font-600 text-white/85 truncate">{p.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {statusIcon(p.status)}
                            <span className="text-[10px] text-white/30 capitalize">{p.status}</span>
                            <span className="text-[10px] text-white/15">·</span>
                            <span className="text-[10px] text-white/25 truncate">{p.description}</span>
                          </div>
                        </div>
                      </div>

                      {/* Phone number */}
                      <div className="flex items-center gap-1.5 min-w-[130px] justify-end">
                        <Hash size={9} className="text-white/20 shrink-0" />
                        <span className="text-[11px] font-mono text-white/65 tabular-nums">{assignment.phoneNumber}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 min-w-[60px] justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEditAssignment(assignment)}
                          className="w-6 h-6 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/8 transition-all"
                          title="Edit number"
                        >
                          <Edit2 size={9} />
                        </button>
                        <button
                          onClick={() => onRemoveAssignment(assignment)}
                          className="w-6 h-6 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/8 hover:border-red-500/20 transition-all"
                          title="Remove assignment"
                        >
                          <Trash2 size={9} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {search && filteredAssignments.length === 0 && (
                <p className="text-[11px] text-white/25 text-center py-4">No results for "{search}"</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ChannelsGrid() {
  const [groups, setGroups] = useState<ChannelGroup[]>(initialChannelGroups);
  const [refreshing, setRefreshing] = useState<ChannelType | null>(null);

  // Modal states
  const [assigningGroup, setAssigningGroup] = useState<ChannelGroup | null>(null);
  const [editingAssignment, setEditingAssignment] = useState<{ group: ChannelGroup; assignment: PersonaNumberAssignment } | null>(null);
  const [removingAssignment, setRemovingAssignment] = useState<{ group: ChannelGroup; assignment: PersonaNumberAssignment } | null>(null);
  const [configuringGroup, setConfiguringGroup] = useState<ChannelGroup | null>(null);

  const handleRefresh = (type: ChannelType) => {
    setRefreshing(type);
    setTimeout(() => { setRefreshing(null); toast.success('Channel status refreshed'); }, 1200);
  };

  const handleUpdateGroup = (updated: ChannelGroup) => {
    setGroups((prev) => prev.map((g) => (g.type === updated.type ? updated : g)));
  };

  const handleSaveAssignment = (groupType: ChannelType, assignment: PersonaNumberAssignment, isEdit: boolean) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.type !== groupType) return g;
        if (isEdit) {
          return {
            ...g,
            assignments: g.assignments.map((a) =>
              a.personaId === assignment.personaId ? assignment : a
            ),
          };
        }
        return { ...g, assignments: [...g.assignments, assignment] };
      })
    );
    toast.success(isEdit ? 'Assignment updated' : `Persona assigned to ${assignment.phoneNumber}`);
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
  };

  const totalAssignments = groups.reduce((sum, g) => sum + g.assignments.length, 0);

  // All persona IDs assigned across all groups
  const allAssignedIds = new Set(groups.flatMap((g) => g.assignments.map((a) => a.personaId)));
  const unassignedPersonas = personas.filter((p) => !allAssignedIds.has(p.id) && p.status !== 'draft');

  return (
    <div>
      {/* Modals */}
      {assigningGroup && (
        <AssignmentModal
          channelGroup={assigningGroup}
          allGroups={groups}
          onClose={() => setAssigningGroup(null)}
          onSave={(a) => {
            handleSaveAssignment(assigningGroup.type, a, false);
            setAssigningGroup(null);
          }}
        />
      )}
      {editingAssignment && (
        <AssignmentModal
          channelGroup={editingAssignment.group}
          allGroups={groups}
          editingAssignment={editingAssignment.assignment}
          onClose={() => setEditingAssignment(null)}
          onSave={(a) => {
            handleSaveAssignment(editingAssignment.group.type, a, true);
            setEditingAssignment(null);
          }}
        />
      )}
      {removingAssignment && (
        <RemoveConfirm
          personaId={removingAssignment.assignment.personaId}
          phoneNumber={removingAssignment.assignment.phoneNumber}
          onClose={() => setRemovingAssignment(null)}
          onConfirm={() => {
            handleRemoveAssignment(removingAssignment.group.type, removingAssignment.assignment.personaId);
            setRemovingAssignment(null);
          }}
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

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-700 text-white">Channels</h2>
          <p className="text-xs text-white/40 mt-0.5">
            {groups.length} channel type{groups.length !== 1 ? 's' : ''} · {totalAssignments} persona assignment{totalAssignments !== 1 ? 's' : ''} · Each persona has a unique number
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-500/6 border border-amber-500/15 mb-6">
        <Hash size={14} className="text-amber-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-600 text-amber-300">Unique number per persona</p>
          <p className="text-[11px] text-white/40 mt-0.5">
            Every persona must have its own dedicated phone number. Numbers cannot be shared across personas — this ensures clean conversation routing and compliance with WhatsApp Business and SIP provider policies.
          </p>
        </div>
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
            onAddAssignment={() => setAssigningGroup(group)}
            onEditAssignment={(a) => setEditingAssignment({ group, assignment: a })}
            onRemoveAssignment={(a) => setRemovingAssignment({ group, assignment: a })}
          />
        ))}
      </div>
    </div>
  );
}