'use client';

import React, { useState, useEffect } from 'react';
import {
  Key,
  Plus,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Activity,
  Zap,
  Clock,
  Shield,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

type KeyStatus = 'ACTIVE' | 'REVOKED';

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  secret: string;
  status: KeyStatus;
  createdAt: string;
  lastUsed: string;
  totalRequests: number;
  requestsToday: number;
  requestsThisMonth: number;
  scopes: string[];
  environment: 'production' | 'development' | 'staging';
}

const initialKeys: ApiKey[] = [
  {
    id: 'key-1',
    name: 'Production App',
    prefix: 'pm_live',
    secret: 'pm_live_sk_4xK9mN2pQrT7vWzY1bCdEfGhIjLo',
    status: 'ACTIVE',
    createdAt: 'Jan 12, 2025',
    lastUsed: '2 minutes ago',
    totalRequests: 142830,
    requestsToday: 1247,
    requestsThisMonth: 38920,
    scopes: ['personas:read', 'personas:write', 'channels:read'],
    environment: 'production',
  },
  {
    id: 'key-2',
    name: 'Staging Integration',
    prefix: 'pm_stg',
    secret: 'pm_stg_sk_8aB3cD5eF6gH7iJ9kLmNoPqRsTuV',
    status: 'ACTIVE',
    createdAt: 'Feb 3, 2025',
    lastUsed: '1 hour ago',
    totalRequests: 28410,
    requestsToday: 342,
    requestsThisMonth: 9870,
    scopes: ['personas:read', 'knowledge-base:read'],
    environment: 'staging',
  },
  {
    id: 'key-3',
    name: 'Local Dev',
    prefix: 'pm_dev',
    secret: 'pm_dev_sk_2wX4yZ6aB8cD0eF1gH3iJ5kL7mNo',
    status: 'ACTIVE',
    createdAt: 'Mar 1, 2025',
    lastUsed: '3 days ago',
    totalRequests: 5620,
    requestsToday: 0,
    requestsThisMonth: 1230,
    scopes: ['personas:read', 'personas:write', 'channels:read', 'channels:write', 'knowledge-base:read', 'knowledge-base:write'],
    environment: 'development',
  },
  {
    id: 'key-4',
    name: 'Legacy Widget',
    prefix: 'pm_live',
    secret: 'pm_live_sk_9pQ1rS3tU5vW7xY9zA1bC3dE5fGh',
    status: 'REVOKED',
    createdAt: 'Nov 20, 2024',
    lastUsed: '2 months ago',
    totalRequests: 89200,
    requestsToday: 0,
    requestsThisMonth: 0,
    scopes: ['personas:read'],
    environment: 'production',
  },
];

const envConfig = {
  production: { label: 'Production', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  staging: { label: 'Staging', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  development: { label: 'Development', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
};

const statusConfig = {
  ACTIVE: { label: 'ACTIVE', badge: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25', dot: 'bg-emerald-400' },
  REVOKED: { label: 'REVOKED', badge: 'bg-red-500/15 text-red-400 border border-red-500/25', dot: 'bg-red-400' },
};

function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

interface GenerateModalProps {
  onClose: () => void;
  onGenerate: (name: string, env: ApiKey['environment'], scopes: string[]) => void;
}

const ALL_SCOPES = [
  'personas:read',
  'personas:write',
  'channels:read',
  'channels:write',
  'knowledge-base:read',
  'knowledge-base:write',
  'embeds:read',
  'embeds:write',
];

function GenerateModal({ onClose, onGenerate }: GenerateModalProps) {
  const [name, setName] = useState('');
  const [env, setEnv] = useState<ApiKey['environment']>('development');
  const [selectedScopes, setSelectedScopes] = useState<string[]>(['personas:read']);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const toggleScope = (scope: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error('Please enter a key name');
      return;
    }
    if (selectedScopes.length === 0) {
      toast.error('Select at least one scope');
      return;
    }
    onGenerate(name.trim(), env, selectedScopes);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 p-6 flex flex-col gap-5"
        style={{ background: 'rgba(14,16,24,0.98)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 flex items-center justify-center">
              <Key size={15} className="text-purple-400" />
            </div>
            <h2 className="text-sm font-700 text-white">Generate New API Key</h2>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white/70 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Key Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-600 text-white/50">Key Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Production App, Mobile Client..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>

        {/* Environment */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-600 text-white/50">Environment</label>
          <div className="grid grid-cols-3 gap-2">
            {(['production', 'staging', 'development'] as const).map((e) => {
              const cfg = envConfig[e];
              return (
                <button
                  key={e}
                  onClick={() => setEnv(e)}
                  className={`py-2 rounded-xl border text-xs font-600 transition-all ${
                    env === e
                      ? `${cfg.bg} ${cfg.color} ${cfg.border}`
                      : 'bg-white/3 border-white/8 text-white/40 hover:text-white/60 hover:bg-white/5'
                  }`}
                >
                  {cfg.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scopes */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-600 text-white/50">Permissions / Scopes</label>
          <div className="grid grid-cols-2 gap-1.5">
            {ALL_SCOPES.map((scope) => {
              const active = selectedScopes.includes(scope);
              return (
                <button
                  key={scope}
                  onClick={() => toggleScope(scope)}
                  className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-xs transition-all text-left ${
                    active
                      ? 'bg-purple-500/15 border-purple-500/30 text-purple-300' :'bg-white/3 border-white/8 text-white/40 hover:text-white/60 hover:bg-white/5'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0 border ${active ? 'bg-purple-500 border-purple-500' : 'border-white/20'}`}>
                    {active && <CheckCircle2 size={9} className="text-white" />}
                  </div>
                  {scope}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-white/50 hover:text-white/70 hover:bg-white/5 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-sm font-600 text-white transition-all"
          >
            Generate Key
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ApiKeysClient() {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [newKeyValue, setNewKeyValue] = useState<string | null>(null);

  const totalRequests = keys.reduce((a, k) => a + k.totalRequests, 0);
  const activeKeys = keys.filter((k) => k.status === 'ACTIVE').length;
  const todayRequests = keys.reduce((a, k) => a + k.requestsToday, 0);
  const monthRequests = keys.reduce((a, k) => a + k.requestsThisMonth, 0);

  const toggleReveal = (id: string) => {
    setRevealedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCopy = (id: string, value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedKey(id);
      toast.success('API key copied to clipboard');
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  const handleRevoke = (id: string, name: string) => {
    setKeys((prev) => prev.map((k) => k.id === id ? { ...k, status: 'REVOKED' as KeyStatus } : k));
    toast.error(`"${name}" has been revoked`);
  };

  const handleGenerate = (name: string, env: ApiKey['environment'], scopes: string[]) => {
    const prefix = env === 'production' ? 'pm_live' : env === 'staging' ? 'pm_stg' : 'pm_dev';
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomPart = Array.from({ length: 28 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const secret = `${prefix}_sk_${randomPart}`;

    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      name,
      prefix,
      secret,
      status: 'ACTIVE',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastUsed: 'Never',
      totalRequests: 0,
      requestsToday: 0,
      requestsThisMonth: 0,
      scopes,
      environment: env,
    };

    setKeys((prev) => [newKey, ...prev]);
    setNewKeyValue(secret);
    setRevealedKeys((prev) => new Set([...prev, newKey.id]));
    setShowGenerateModal(false);
    toast.success(`"${name}" API key generated`);
  };

  const maskKey = (secret: string) => {
    const parts = secret.split('_sk_');
    if (parts.length === 2) return `${parts[0]}_sk_${'•'.repeat(16)}${parts[1].slice(-4)}`;
    return `${'•'.repeat(20)}${secret.slice(-4)}`;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Active Keys', value: activeKeys.toString(), icon: Key, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Total Requests', value: formatNumber(totalRequests), icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: "Today's Requests", value: formatNumber(todayRequests), icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'This Month', value: formatNumber(monthRequests), icon: Clock, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        ].map((stat) => {
          const StatIcon = stat.icon;
          return (
            <div key={stat.label} className="glass rounded-2xl border border-white/8 p-3 sm:p-4 flex items-center gap-3">
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                <StatIcon size={16} className={stat.color} />
              </div>
              <div className="min-w-0">
                <p className="text-base sm:text-lg font-700 text-white tabular-nums">{stat.value}</p>
                <p className="text-[10px] sm:text-[11px] text-white/35 leading-tight">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Key Banner */}
      {newKeyValue && (
        <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/8 p-4 flex items-start gap-3">
          <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-600 text-emerald-300 mb-1">API key generated — copy it now</p>
            <p className="text-xs text-white/40 mb-3">This is the only time you'll see the full key. Store it securely.</p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-black/30 rounded-xl border border-white/10 px-3 py-2">
              <code className="text-xs text-emerald-300 font-mono flex-1 break-all">{newKeyValue}</code>
              <button
                onClick={() => handleCopy('new', newKeyValue)}
                className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-600 transition-all flex-shrink-0"
              >
                {copiedKey === 'new' ? <CheckCircle2 size={12} /> : <Copy size={12} />}
                {copiedKey === 'new' ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <button onClick={() => setNewKeyValue(null)} className="text-white/30 hover:text-white/60 transition-colors flex-shrink-0">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Keys Section */}
      <div className="glass rounded-2xl border border-white/8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-white/6">
          <div className="flex items-center gap-2.5">
            <Shield size={16} className="text-purple-400" />
            <h2 className="text-sm font-700 text-white">API Keys</h2>
            <span className="text-[11px] bg-white/8 text-white/40 rounded-full px-2 py-0.5 tabular-nums">{keys.length}</span>
          </div>
          <button
            onClick={() => setShowGenerateModal(true)}
            className="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-600 text-white transition-all"
          >
            <Plus size={13} />
            <span className="hidden sm:inline">Generate Key</span>
            <span className="sm:hidden">New Key</span>
          </button>
        </div>

        {/* Mobile Card List */}
        <div className="md:hidden divide-y divide-white/4">
          {keys.map((key) => {
            const isRevealed = revealedKeys.has(key.id);
            const isCopied = copiedKey === key.id;
            const statusCfg = statusConfig[key.status];
            const envCfg = envConfig[key.environment];
            const isRevoked = key.status === 'REVOKED';

            return (
              <div key={key.id} className={`p-4 flex flex-col gap-3 ${isRevoked ? 'opacity-50' : ''}`}>
                {/* Top row: name + badges */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-sm font-600 text-white">{key.name}</span>
                    <p className="text-[10px] text-white/25">Created {key.createdAt}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg border text-[11px] font-600 ${envCfg.bg} ${envCfg.color} ${envCfg.border}`}>
                      {envCfg.label}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[11px] font-600 ${statusCfg.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot} ${key.status === 'ACTIVE' ? 'animate-pulse' : ''}`} />
                      {statusCfg.label}
                    </span>
                  </div>
                </div>

                {/* Key value */}
                <div className="flex items-center gap-1.5 bg-white/5 rounded-xl px-3 py-2">
                  <code className="text-[11px] font-mono text-white/40 flex-1 truncate">
                    {isRevealed ? key.secret : maskKey(key.secret)}
                  </code>
                  <button
                    onClick={() => toggleReveal(key.id)}
                    className="text-white/25 hover:text-white/60 transition-colors flex-shrink-0"
                  >
                    {isRevealed ? <EyeOff size={12} /> : <Eye size={12} />}
                  </button>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-white/30">Total</span>
                    <span className="text-xs font-600 text-white tabular-nums">{formatNumber(key.totalRequests)}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-white/30">Today</span>
                    <span className="text-xs text-white/50 tabular-nums">{formatNumber(key.requestsToday)}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-white/30">Last Used</span>
                    <span className="text-xs text-white/45">{key.lastUsed}</span>
                  </div>
                </div>

                {/* Scopes */}
                <div className="flex flex-wrap gap-1">
                  {key.scopes.slice(0, 3).map((scope) => (
                    <span key={scope} className="text-[10px] bg-white/5 border border-white/8 text-white/40 rounded-md px-1.5 py-0.5">
                      {scope}
                    </span>
                  ))}
                  {key.scopes.length > 3 && (
                    <span className="text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-md px-1.5 py-0.5">
                      +{key.scopes.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(key.id, key.secret)}
                    disabled={isRevoked}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-[11px] font-600 transition-all ${
                      isCopied
                        ? 'bg-emerald-500/15 border-emerald-500/25 text-emerald-400'
                        : isRevoked
                        ? 'bg-white/3 border-white/8 text-white/20 cursor-not-allowed' :'bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/8'
                    }`}
                  >
                    {isCopied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
                    {isCopied ? 'Copied' : 'Copy Key'}
                  </button>
                  {!isRevoked ? (
                    <button
                      onClick={() => handleRevoke(key.id, key.name)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-red-500/20 bg-red-500/8 text-red-400/70 hover:text-red-400 hover:bg-red-500/15 text-[11px] font-600 transition-all"
                    >
                      <Trash2 size={12} />
                      Revoke
                    </button>
                  ) : (
                    <span className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/8 bg-white/3 text-white/20 text-[11px] font-600">
                      <AlertCircle size={12} />
                      Revoked
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3 text-[11px] font-600 text-white/30 uppercase tracking-wider">Name / Key</th>
                <th className="text-left px-4 py-3 text-[11px] font-600 text-white/30 uppercase tracking-wider">Environment</th>
                <th className="text-left px-4 py-3 text-[11px] font-600 text-white/30 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-[11px] font-600 text-white/30 uppercase tracking-wider">Usage</th>
                <th className="text-left px-4 py-3 text-[11px] font-600 text-white/30 uppercase tracking-wider">Last Used</th>
                <th className="text-left px-4 py-3 text-[11px] font-600 text-white/30 uppercase tracking-wider">Scopes</th>
                <th className="px-4 py-3 text-[11px] font-600 text-white/30 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {keys.map((key) => {
                const isRevealed = revealedKeys.has(key.id);
                const isCopied = copiedKey === key.id;
                const statusCfg = statusConfig[key.status];
                const envCfg = envConfig[key.environment];
                const isRevoked = key.status === 'REVOKED';

                return (
                  <tr key={key.id} className={`group transition-colors hover:bg-white/2 ${isRevoked ? 'opacity-50' : ''}`}>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-sm font-600 text-white">{key.name}</span>
                        <div className="flex items-center gap-1.5">
                          <code className="text-[11px] font-mono text-white/40 bg-white/5 rounded-lg px-2 py-0.5 max-w-[220px] truncate">
                            {isRevealed ? key.secret : maskKey(key.secret)}
                          </code>
                          <button
                            onClick={() => toggleReveal(key.id)}
                            className="text-white/25 hover:text-white/60 transition-colors flex-shrink-0"
                            title={isRevealed ? 'Hide key' : 'Reveal key'}
                          >
                            {isRevealed ? <EyeOff size={12} /> : <Eye size={12} />}
                          </button>
                        </div>
                        <p className="text-[10px] text-white/25">Created {key.createdAt}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-lg border text-[11px] font-600 ${envCfg.bg} ${envCfg.color} ${envCfg.border}`}>
                        {envCfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[11px] font-600 ${statusCfg.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot} ${key.status === 'ACTIVE' ? 'animate-pulse' : ''}`} />
                        {statusCfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                          <Activity size={11} className="text-white/30" />
                          <span className="text-xs font-600 text-white tabular-nums">{formatNumber(key.totalRequests)}</span>
                          <span className="text-[10px] text-white/30">total</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Zap size={11} className="text-amber-400/60" />
                          <span className="text-[11px] text-white/50 tabular-nums">{formatNumber(key.requestsToday)} today</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={11} className="text-blue-400/60" />
                          <span className="text-[11px] text-white/50 tabular-nums">{formatNumber(key.requestsThisMonth)} / mo</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs text-white/45">{key.lastUsed}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {key.scopes.slice(0, 3).map((scope) => (
                          <span key={scope} className="text-[10px] bg-white/5 border border-white/8 text-white/40 rounded-md px-1.5 py-0.5">
                            {scope}
                          </span>
                        ))}
                        {key.scopes.length > 3 && (
                          <span className="text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-md px-1.5 py-0.5">
                            +{key.scopes.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 justify-end">
                        <button
                          onClick={() => handleCopy(key.id, key.secret)}
                          disabled={isRevoked}
                          title="Copy API key"
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-600 transition-all ${
                            isCopied
                              ? 'bg-emerald-500/15 border-emerald-500/25 text-emerald-400'
                              : isRevoked
                              ? 'bg-white/3 border-white/8 text-white/20 cursor-not-allowed' :'bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/8 hover:border-white/15'
                          }`}
                        >
                          {isCopied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
                          {isCopied ? 'Copied' : 'Copy'}
                        </button>
                        {!isRevoked && (
                          <button
                            onClick={() => handleRevoke(key.id, key.name)}
                            title="Revoke key"
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-red-500/20 bg-red-500/8 text-red-400/70 hover:text-red-400 hover:bg-red-500/15 hover:border-red-500/30 text-[11px] font-600 transition-all"
                          >
                            <Trash2 size={12} />
                            Revoke
                          </button>
                        )}
                        {isRevoked && (
                          <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/8 bg-white/3 text-white/20 text-[11px] font-600">
                            <AlertCircle size={12} />
                            Revoked
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {keys.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
              <Key size={22} className="text-white/20" />
            </div>
            <p className="text-sm text-white/30">No API keys yet</p>
            <button
              onClick={() => setShowGenerateModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-600 text-white transition-all"
            >
              <Plus size={13} />
              Generate your first key
            </button>
          </div>
        )}
      </div>

      {showGenerateModal && (
        <GenerateModal
          onClose={() => setShowGenerateModal(false)}
          onGenerate={handleGenerate}
        />
      )}
    </div>
  );
}
