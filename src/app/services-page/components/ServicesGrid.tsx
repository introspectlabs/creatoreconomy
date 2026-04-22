'use client';

import React, { useState } from 'react';
import { Mic, Video, Globe, Waves, AlertTriangle, Settings, RefreshCw, ArrowRight, ExternalLink, Calendar, X, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';


const services = [
  {
    id: 'svc-elevenlabs',
    name: 'ElevenLabs',
    tagline: 'AI Voice Generation',
    desc: 'Realistic text-to-speech voices for persona conversations — supports 29 languages and custom voice cloning',
    icon: Mic,
    status: 'connected',
    health: 'degraded',
    color: 'text-violet-400',
    iconBg: 'bg-violet-500/15',
    borderColor: 'border-violet-500/25',
    apiKeyMasked: 'sk_••••••••••••••••3a9f',
    quota: { used: 87, total: 100, unit: 'k chars/mo' },
    usedBy: 9,
    latency: '310ms',
    callsToday: '4,820',
  },
  {
    id: 'svc-heygen',
    name: 'Heygen',
    tagline: 'AI Video Avatar',
    desc: 'Generate lip-synced video avatars from text — deploy photorealistic personas in video chat and embeds',
    icon: Video,
    status: 'connected',
    health: 'operational',
    color: 'text-blue-400',
    iconBg: 'bg-blue-500/15',
    borderColor: 'border-blue-500/20',
    apiKeyMasked: 'hg_••••••••••••••••7c2d',
    quota: { used: 34, total: 100, unit: 'video mins/mo' },
    usedBy: 3,
    latency: '88ms',
    callsToday: '142',
  },
  {
    id: 'svc-tavus',
    name: 'Tavus',
    tagline: 'Personalized Video AI',
    desc: 'Create personalized video messages at scale using AI-cloned avatars — ideal for sales and onboarding',
    icon: Waves,
    status: 'connected',
    health: 'operational',
    color: 'text-teal-400',
    iconBg: 'bg-teal-500/15',
    borderColor: 'border-teal-500/20',
    apiKeyMasked: 'tv_••••••••••••••••1b8e',
    quota: { used: 21, total: 50, unit: 'videos/mo' },
    usedBy: 2,
    latency: '65ms',
    callsToday: '38',
  },
  {
    id: 'svc-omnidimension',
    name: 'Omnidimension',
    tagline: 'Omnichannel AI Infrastructure',
    desc: 'Unified messaging infrastructure connecting personas across SMS, email, push, and custom channels',
    icon: Globe,
    status: 'connected',
    health: 'operational',
    color: 'text-emerald-400',
    iconBg: 'bg-emerald-500/15',
    borderColor: 'border-emerald-500/20',
    apiKeyMasked: 'od_••••••••••••••••9f4a',
    quota: { used: 52, total: 200, unit: 'k events/mo' },
    usedBy: 3,
    latency: '55ms',
    callsToday: '9,410',
  },
];

const disconnectedServices = [
  {
    id: 'svc-openai',
    name: 'OpenAI',
    tagline: 'Foundation Model',
    desc: 'Use GPT-4o as the reasoning engine powering persona responses',
    icon: Waves,
    color: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
  },
  {
    id: 'svc-anthropic',
    name: 'Anthropic Claude',
    tagline: 'Foundation Model',
    desc: 'Use Claude 3.5 Sonnet for nuanced, long-context persona conversations',
    icon: Waves,
    color: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
  },
  {
    id: 'svc-calcom',
    name: 'Cal.com',
    tagline: 'Scheduling & Calendar',
    desc: 'Allow personas to check availability and book meetings on your behalf — creating a seamless scheduling experience for your clients',
    icon: Calendar,
    color: 'text-sky-400',
    iconBg: 'bg-sky-500/10',
  },
];

const healthStyle = (h: string) => {
  if (h === 'operational') return { badge: 'bg-emerald-500/15 text-emerald-400', dot: 'bg-emerald-400', label: 'Operational' };
  if (h === 'degraded') return { badge: 'bg-amber-500/15 text-amber-400', dot: 'bg-amber-400', label: 'Degraded' };
  return { badge: 'bg-red-500/15 text-red-400', dot: 'bg-red-400', label: 'Incident' };
};

interface ConnectModalProps {
  service: { id: string; name: string; tagline: string; color: string; iconBg: string; icon: React.ElementType } | null;
  onClose: () => void;
  onConnect: (serviceId: string, apiKey: string) => void;
}

function ConnectModal({ service, onClose, onConnect }: ConnectModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [connecting, setConnecting] = useState(false);

  if (!service) return null;

  const ServiceIcon = service.icon;

  const handleConnect = () => {
    if (!apiKey.trim()) {
      toast.error('Please enter an API key');
      return;
    }
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      onConnect(service.id, apiKey);
      onClose();
      toast.success(`${service.name} connected successfully`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative glass rounded-2xl border border-white/12 p-6 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl ${service.iconBg} flex items-center justify-center`}>
              <ServiceIcon size={20} className={service.color} />
            </div>
            <div>
              <h3 className="text-sm font-700 text-white">Connect {service.name}</h3>
              <p className={`text-[11px] font-500 ${service.color}`}>{service.tagline}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all"
          >
            <X size={14} />
          </button>
        </div>

        {/* API Key Input */}
        <div className="mb-4">
          <label className="text-xs text-white/40 mb-2 block">API Key</label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={`Enter your ${service.name} API key`}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 pr-10 text-xs text-white placeholder-white/25 focus:outline-none focus:border-purple-500/50 transition-all font-mono"
              onKeyDown={(e) => e.key === 'Enter' && handleConnect()}
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              {showKey ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
          </div>
          <p className="text-[10px] text-white/25 mt-1.5">
            Your key is encrypted and stored securely. It is never shared.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs font-500 text-white/50 hover:text-white hover:bg-white/5 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleConnect}
            disabled={connecting}
            className="flex-1 btn-primary flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-600 text-white disabled:opacity-60 transition-all"
          >
            {connecting ? (
              <>
                <RefreshCw size={12} className="animate-spin" /> Connecting…
              </>
            ) : (
              <>
                <CheckCircle size={12} /> Connect
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ServicesGrid() {
  const [refreshing, setRefreshing] = useState<string | null>(null);
  const [connectingService, setConnectingService] = useState<typeof disconnectedServices[0] | null>(null);

  const handleRefresh = (id: string) => {
    setRefreshing(id);
    // Backend integration: POST /api/services/:id/ping
    setTimeout(() => {
      setRefreshing(null);
      toast.success('Service status refreshed');
    }, 1400);
  };

  const handleDisconnect = (name: string) => {
    toast.error(`Disconnected ${name} — personas using this service will fall back to defaults`);
  };

  const handleConnected = (serviceId: string, apiKey: string) => {
    // Backend integration: POST /api/services/:id/connect { apiKey }
    console.log('Service connected:', serviceId);
  };

  return (
    <div>
      {connectingService && (
        <ConnectModal
          service={connectingService}
          onClose={() => setConnectingService(null)}
          onConnect={handleConnected}
        />
      )}

      <p className="text-xs text-white/35 uppercase tracking-wider font-500 mb-4">Connected Services</p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-5 mb-10">
        {services.map((svc) => {
          const Icon = svc.icon;
          const hs = healthStyle(svc.health);
          const quotaPct = Math.round((svc.quota.used / svc.quota.total) * 100);
          const quotaWarning = quotaPct >= 80;

          return (
            <div
              key={svc.id}
              className={`glass rounded-2xl border p-5 flex flex-col card-hover ${
                svc.health === 'degraded' ? 'border-amber-500/25' : svc.borderColor
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-2xl ${svc.iconBg} flex items-center justify-center`}>
                  <Icon size={20} className={svc.color} />
                </div>
                <div className="flex items-center gap-1.5">
                  {svc.health === 'degraded' && (
                    <AlertTriangle size={12} className="text-amber-400" />
                  )}
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-500 flex items-center gap-1.5 ${hs.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${hs.dot} ${svc.health === 'operational' ? 'status-dot-active' : ''}`} />
                    {hs.label}
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-700 text-white">{svc.name}</h3>
              <p className={`text-[11px] font-500 mb-2 ${svc.color}`}>{svc.tagline}</p>
              <p className="text-xs text-white/40 leading-snug mb-4 flex-1">{svc.desc}</p>

              {/* API Key */}
              <div className="bg-white/4 rounded-xl px-3 py-2 mb-3 flex items-center justify-between">
                <span className="text-[11px] text-white/30">API Key</span>
                <span className="text-[11px] font-mono text-white/55">{svc.apiKeyMasked}</span>
              </div>

              {/* Quota */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] text-white/35">Usage quota</span>
                  <span className={`text-[11px] font-600 tabular-nums ${quotaWarning ? 'text-amber-400' : 'text-white/55'}`}>
                    {svc.quota.used} / {svc.quota.total} {svc.quota.unit}
                  </span>
                </div>
                <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      quotaPct >= 90 ? 'bg-red-500' : quotaPct >= 75 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${quotaPct}%` }}
                  />
                </div>
                {quotaWarning && (
                  <p className="text-[10px] text-amber-400 mt-1 flex items-center gap-1">
                    <AlertTriangle size={9} /> Quota near limit — upgrade plan
                  </p>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: 'Personas', value: svc.usedBy.toString() },
                  { label: 'Calls today', value: svc.callsToday },
                  { label: 'Latency', value: svc.latency },
                ].map((stat) => (
                  <div key={`${svc.id}-stat-${stat.label}`} className="bg-white/4 rounded-xl p-2 text-center">
                    <p className="text-xs font-700 text-white tabular-nums">{stat.value}</p>
                    <p className="text-[10px] text-white/25 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-white/10 text-xs font-500 text-white/60 hover:text-white hover:bg-white/5 transition-all">
                  <Settings size={12} /> Manage
                </button>
                <button
                  onClick={() => handleRefresh(svc.id)}
                  className="w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all"
                  title="Refresh service status"
                >
                  <RefreshCw size={12} className={refreshing === svc.id ? 'animate-spin' : ''} />
                </button>
                <button
                  onClick={() => handleDisconnect(svc.name)}
                  className="w-8 h-8 rounded-xl border border-red-500/15 flex items-center justify-center text-red-400/30 hover:text-red-400 hover:bg-red-500/8 transition-all"
                  title={`Disconnect ${svc.name}`}
                >
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-white/35 uppercase tracking-wider font-500 mb-4">Available Integrations</p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-5">
        {disconnectedServices.map((svc) => {
          const Icon = svc.icon;
          return (
            <div key={svc.id} className="glass rounded-2xl border border-white/8 p-5 flex flex-col opacity-65 hover:opacity-90 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-2xl ${svc.iconBg} flex items-center justify-center`}>
                  <Icon size={20} className={svc.color} />
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/8 text-white/30">Not Connected</span>
              </div>
              <h3 className="text-sm font-700 text-white">{svc.name}</h3>
              <p className={`text-[11px] font-500 mb-2 ${svc.color}`}>{svc.tagline}</p>
              <p className="text-xs text-white/40 leading-snug mb-5 flex-1">{svc.desc}</p>
              <button
                onClick={() => setConnectingService(svc)}
                className="btn-primary flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-600 text-white"
              >
                Connect <ArrowRight size={12} />
              </button>
            </div>
          );
        })}
        <div className="rounded-2xl border border-dashed border-white/10 p-5 flex flex-col items-center justify-center text-center min-h-52 hover:border-purple-500/30 transition-all cursor-pointer group">
          <div className="w-10 h-10 rounded-2xl bg-white/4 flex items-center justify-center mb-3 group-hover:bg-purple-500/10 transition-all">
            <Globe size={18} className="text-white/20 group-hover:text-purple-400 transition-colors" />
          </div>
          <p className="text-sm font-600 text-white/30 group-hover:text-white/60 transition-colors">Request Integration</p>
          <p className="text-xs text-white/20 mt-1">Suggest a new AI service</p>
        </div>
      </div>
    </div>
  );
}