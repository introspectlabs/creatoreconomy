'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Video, Mic, Users, ChevronRight, ChevronLeft, Check, Upload, Play, X, Plus, Sparkles, Link2, Unlink2, Search, AlertCircle, Camera, Volume2, Star, ArrowRight, CheckCircle2, Clock, Zap } from 'lucide-react';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';


/* ─── Types ─────────────────────────────────────────── */
type WizardMode = 'choose' | 'replica' | 'stock';
type ReplicaStep = 'video' | 'voice' | 'details' | 'confirm';

interface StockAvatar {
  id: string;
  name: string;
  style: string;
  gender: string;
  thumbnail: string;
  thumbnailAlt: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  tags: string[];
}

interface CreatedAvatar {
  id: string;
  name: string;
  type: 'replica' | 'stock';
  status: 'ready' | 'training' | 'draft';
  thumbnail: string;
  thumbnailAlt: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  voice: string;
  attachedPersona?: string;
  createdAt: string;
}

interface Persona {
  id: string;
  name: string;
  role: string;
}

/* ─── Mock Data ──────────────────────────────────────── */
const stockAvatars: StockAvatar[] = [
{
  id: 's1', name: 'Aria', style: 'Professional', gender: 'Female',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_123050df3-1772207174903.png",
  thumbnailAlt: 'Professional woman with warm smile, stock avatar',
  accent: 'text-purple-400', accentBg: 'bg-purple-500/15', accentBorder: 'border-purple-500/30',
  tags: ['Business', 'Formal', 'English']
},
{
  id: 's2', name: 'Marcus', style: 'Confident', gender: 'Male',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_11a2e4a58-1763295038790.png",
  thumbnailAlt: 'Confident man in business attire, stock avatar',
  accent: 'text-blue-400', accentBg: 'bg-blue-500/15', accentBorder: 'border-blue-500/30',
  tags: ['Sales', 'Casual', 'English']
},
{
  id: 's3', name: 'Zoe', style: 'Friendly', gender: 'Female',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1b47d599d-1763299033167.png",
  thumbnailAlt: 'Friendly young woman smiling, stock avatar',
  accent: 'text-teal-400', accentBg: 'bg-teal-500/15', accentBorder: 'border-teal-500/30',
  tags: ['Support', 'Warm', 'Multilingual']
},
{
  id: 's4', name: 'Kai', style: 'Authoritative', gender: 'Male',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1a9f87946-1763296338448.png",
  thumbnailAlt: 'Authoritative man with glasses, stock avatar',
  accent: 'text-amber-400', accentBg: 'bg-amber-500/15', accentBorder: 'border-amber-500/30',
  tags: ['Technical', 'Expert', 'English']
},
{
  id: 's5', name: 'Sofia', style: 'Empathetic', gender: 'Female',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1cf3a64ed-1772790260162.png",
  thumbnailAlt: 'Empathetic woman with gentle expression, stock avatar',
  accent: 'text-rose-400', accentBg: 'bg-rose-500/15', accentBorder: 'border-rose-500/30',
  tags: ['Healthcare', 'Calm', 'Multilingual']
},
{
  id: 's6', name: 'Liam', style: 'Casual', gender: 'Male',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1cb74451b-1772790261242.png",
  thumbnailAlt: 'Casual young man with friendly demeanor, stock avatar',
  accent: 'text-cyan-400', accentBg: 'bg-cyan-500/15', accentBorder: 'border-cyan-500/30',
  tags: ['Retail', 'Casual', 'English']
}];


const elevenLabsVoices = [
{ id: 'v1', name: 'Rachel', style: 'Calm & Professional', gender: 'Female', preview: true },
{ id: 'v2', name: 'Adam', style: 'Deep & Authoritative', gender: 'Male', preview: true },
{ id: 'v3', name: 'Bella', style: 'Warm & Friendly', gender: 'Female', preview: true },
{ id: 'v4', name: 'Josh', style: 'Energetic & Clear', gender: 'Male', preview: true },
{ id: 'v5', name: 'Domi', style: 'Confident & Direct', gender: 'Female', preview: true },
{ id: 'v6', name: 'Elli', style: 'Soft & Gentle', gender: 'Female', preview: false }];


const mockPersonas: Persona[] = [
{ id: 'p1', name: 'ZaraSkin Sales Agent', role: 'D2C Skincare' },
{ id: 'p2', name: 'NutriBlend Store Bot', role: 'D2C Nutrition' },
{ id: 'p3', name: 'StyleHouse Fashion Bot', role: 'D2C Fashion' },
{ id: 'p4', name: 'GlowUp Beauty Agent', role: 'D2C Beauty' }];


const initialAvatars: CreatedAvatar[] = [
{
  id: 'ca1', name: 'ZaraSkin — Brand Face', type: 'replica', status: 'ready',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_15a9eef26-1777435375891.png",
  thumbnailAlt: 'Custom replica avatar for ZaraSkin D2C skincare brand',
  accent: 'text-purple-400', accentBg: 'bg-purple-500/15', accentBorder: 'border-purple-500/30',
  voice: 'ElevenLabs — Rachel', attachedPersona: 'ZaraSkin Sales Agent', createdAt: '2 days ago'
},
{
  id: 'ca2', name: 'NutriBlend — Store Host', type: 'stock', status: 'ready',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1b1237fe4-1777435374992.png",
  thumbnailAlt: 'Stock avatar for NutriBlend nutrition D2C store',
  accent: 'text-blue-400', accentBg: 'bg-blue-500/15', accentBorder: 'border-blue-500/30',
  voice: 'ElevenLabs — Adam', createdAt: '5 days ago'
},
{
  id: 'ca3', name: 'StyleHouse — Fashion Guide', type: 'replica', status: 'training',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1b426e5ea-1772129317776.png",
  thumbnailAlt: 'Replica avatar for StyleHouse fashion D2C brand in training',
  accent: 'text-teal-400', accentBg: 'bg-teal-500/15', accentBorder: 'border-teal-500/30',
  voice: 'ElevenLabs — Bella', createdAt: '1 hour ago'
}];


/* ─── Status helpers ─────────────────────────────────── */
const statusStyle = (s: string) => {
  if (s === 'ready') return { badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20', dot: 'bg-emerald-400', label: 'Ready' };
  if (s === 'training') return { badge: 'bg-amber-500/15 text-amber-400 border-amber-500/20', dot: 'bg-amber-400', label: 'Training' };
  return { badge: 'bg-white/8 text-white/35 border-white/10', dot: 'bg-white/25', label: 'Draft' };
};

/* ─── Wizard Steps ───────────────────────────────────── */
const replicaSteps: {key: ReplicaStep;label: string;icon: React.ElementType;}[] = [
{ key: 'video', label: 'Training Video', icon: Video },
{ key: 'voice', label: 'Voice Clone', icon: Mic },
{ key: 'details', label: 'Details', icon: Sparkles },
{ key: 'confirm', label: 'Confirm', icon: CheckCircle2 }];


/* ─── Main Component ─────────────────────────────────── */
export default function AvatarStudioClient() {
  const [mode, setMode] = useState<WizardMode>('choose');
  const [replicaStep, setReplicaStep] = useState<ReplicaStep>('video');
  const [avatars, setAvatars] = useState<CreatedAvatar[]>(initialAvatars);
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);
  const [attachModalOpen, setAttachModalOpen] = useState(false);
  const [attachTarget, setAttachTarget] = useState<string | null>(null);

  // Replica wizard state
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoDragging, setVideoDragging] = useState(false);
  const [voiceMode, setVoiceMode] = useState<'clone' | 'stock'>('stock');
  const [voiceFile, setVoiceFile] = useState<File | null>(null);
  const [selectedVoiceId, setSelectedVoiceId] = useState('v1');
  const [previewingVoice, setPreviewingVoice] = useState<string | null>(null);
  const [replicaName, setReplicaName] = useState('');
  const [replicaPersona, setReplicaPersona] = useState('');
  const [stockSearch, setStockSearch] = useState('');
  const [selectedStockId, setSelectedStockId] = useState<string | null>(null);
  const [stockVoiceId, setStockVoiceId] = useState('v1');
  const [stockPersona, setStockPersona] = useState('');
  const [stockName, setStockName] = useState('');

  const videoInputRef = useRef<HTMLInputElement>(null);
  const voiceInputRef = useRef<HTMLInputElement>(null);

  /* ── Handlers ── */
  const handleVideoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setVideoDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) setVideoFile(file);else
    toast.error('Please upload a video file (MP4, MOV, WebM)');
  };

  const handleVideoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setVideoFile(file);
  };

  const handleVoiceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setVoiceFile(file);
  };

  const handlePreviewVoice = (id: string) => {
    setPreviewingVoice(id);
    setTimeout(() => setPreviewingVoice(null), 2500);
  };

  const handleReplicaNext = () => {
    const steps: ReplicaStep[] = ['video', 'voice', 'details', 'confirm'];
    const idx = steps.indexOf(replicaStep);
    if (replicaStep === 'video' && !videoFile) {toast.error('Please upload a training video');return;}
    if (replicaStep === 'details' && !replicaName.trim()) {toast.error('Please enter a replica name');return;}
    if (idx < steps.length - 1) setReplicaStep(steps[idx + 1]);
  };

  const handleReplicaBack = () => {
    const steps: ReplicaStep[] = ['video', 'voice', 'details', 'confirm'];
    const idx = steps.indexOf(replicaStep);
    if (idx > 0) setReplicaStep(steps[idx - 1]);else
    setMode('choose');
  };

  const handleCreateReplica = () => {
    const voice = elevenLabsVoices.find((v) => v.id === selectedVoiceId);
    const newAvatar: CreatedAvatar = {
      id: `ca-${Date.now()}`,
      name: replicaName || 'My Replica',
      type: 'replica',
      status: 'training',
      thumbnail: 'https://img.rocket.new/generatedImages/rocket_gen_img_1609857c9-1772204969936.png',
      thumbnailAlt: `Custom replica avatar ${replicaName}`,
      accent: 'text-purple-400', accentBg: 'bg-purple-500/15', accentBorder: 'border-purple-500/30',
      voice: `ElevenLabs — ${voice?.name || 'Rachel'}`,
      attachedPersona: replicaPersona || undefined,
      createdAt: 'just now'
    };
    setAvatars((prev) => [newAvatar, ...prev]);
    toast.success('Replica submitted for training — usually takes 10–30 min');
    setMode('choose');
    setReplicaStep('video');
    setVideoFile(null);
    setVoiceFile(null);
    setReplicaName('');
    setReplicaPersona('');
  };

  const handleAddStock = () => {
    const stock = stockAvatars.find((s) => s.id === selectedStockId);
    if (!stock) return;
    const voice = elevenLabsVoices.find((v) => v.id === stockVoiceId);
    const newAvatar: CreatedAvatar = {
      id: `ca-${Date.now()}`,
      name: stockName || `${stock.name} — Stock`,
      type: 'stock',
      status: 'ready',
      thumbnail: stock.thumbnail,
      thumbnailAlt: stock.thumbnailAlt,
      accent: stock.accent, accentBg: stock.accentBg, accentBorder: stock.accentBorder,
      voice: `ElevenLabs — ${voice?.name || 'Rachel'}`,
      attachedPersona: stockPersona || undefined,
      createdAt: 'just now'
    };
    setAvatars((prev) => [newAvatar, ...prev]);
    toast.success(`Stock avatar "${stock.name}" added to your library`);
    setMode('choose');
    setSelectedStockId(null);
    setStockVoiceId('v1');
    setStockPersona('');
    setStockName('');
  };

  const handleAttach = (avatarId: string, personaName: string) => {
    setAvatars((prev) => prev.map((a) => a.id === avatarId ? { ...a, attachedPersona: personaName } : a));
    toast.success(`Avatar attached to "${personaName}"`);
    setAttachModalOpen(false);
    setAttachTarget(null);
  };

  const handleDetach = (avatarId: string) => {
    setAvatars((prev) => prev.map((a) => a.id === avatarId ? { ...a, attachedPersona: undefined } : a));
    toast.success('Avatar detached from persona');
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && attachModalOpen) {
        setAttachModalOpen(false);
        setAttachTarget(null);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [attachModalOpen]);

  const filteredStock = stockAvatars.filter((s) =>
  s.name.toLowerCase().includes(stockSearch.toLowerCase()) ||
  s.style.toLowerCase().includes(stockSearch.toLowerCase()) ||
  s.tags.some((t) => t.toLowerCase().includes(stockSearch.toLowerCase()))
  );

  const stepIndex = replicaSteps.findIndex((s) => s.key === replicaStep);

  /* ── Render ── */
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-full min-h-0">

      {/* ── Left: Avatar Library ── */}
      <div className="lg:w-64 lg:flex-shrink-0 flex flex-col gap-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-white/35 uppercase tracking-wider font-500">Your Avatars</p>
          <span className="text-[10px] text-white/25 bg-white/5 px-2 py-0.5 rounded-full">{avatars.length}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        {avatars.map((av) => {
            const ss = statusStyle(av.status);
            const isSelected = selectedAvatarId === av.id;
            return (
              <div
                key={av.id}
                onClick={() => setSelectedAvatarId(isSelected ? null : av.id)}
                className={`glass rounded-2xl border p-3.5 cursor-pointer transition-all duration-150 ${
                isSelected ? `${av.accentBorder} shadow-lg` : 'border-white/8 hover:border-white/15'}`
                }>
              
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <img src={av.thumbnail} alt={av.thumbnailAlt} className="w-10 h-10 rounded-xl object-cover" />
                  {av.status === 'training' &&
                    <div className="absolute inset-0 rounded-xl bg-black/50 flex items-center justify-center">
                      <div className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                    }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-600 text-white truncate">{av.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-600 uppercase tracking-wide ${
                      av.type === 'replica' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`
                      }>
                      {av.type === 'replica' ? 'Tavus' : 'Stock'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2.5">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-500 flex items-center gap-1 border ${ss.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${ss.dot}`} />
                  {ss.label}
                </span>
                {av.attachedPersona ?
                  <span className="text-[10px] text-white/40 truncate max-w-[80px]">{av.attachedPersona}</span> :

                  <span className="text-[10px] text-white/20">No persona</span>
                  }
              </div>

              {isSelected &&
                <div className="mt-3 pt-3 border-t border-white/8 flex gap-2">
                  {av.attachedPersona ?
                  <button
                    onClick={(e) => {e.stopPropagation();handleDetach(av.id);}}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-white/10 text-[10px] text-white/40 hover:text-rose-400 hover:border-rose-500/30 transition-all">
                  
                      <Unlink2 size={10} /> Detach
                    </button> :

                  <button
                    onClick={(e) => {e.stopPropagation();setAttachTarget(av.id);setAttachModalOpen(true);}}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-purple-500/30 text-[10px] text-purple-400 hover:bg-purple-500/10 transition-all">
                  
                      <Link2 size={10} /> Attach Persona
                    </button>
                  }
                </div>
                }
            </div>);

          })}
        </div>
      </div>

      {/* ── Center/Right: Main Panel ── */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">

        {/* ── Mode: Choose ── */}
        {mode === 'choose' &&
        <div className="flex flex-col gap-6 h-full">
            {/* Header */}
            <div className="glass rounded-2xl border border-white/8 p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Sparkles size={16} className="text-purple-400" />
                </div>
                <div>
                  <h2 className="text-base font-700 text-white">Create New Avatar</h2>
                  <p className="text-xs text-white/40">Choose how you want to build your Tavus-powered avatar</p>
                </div>
              </div>
            </div>

            {/* Two paths */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 flex-1">
              {/* Replica path */}
              <button
              onClick={() => setMode('replica')}
              className="glass rounded-2xl border border-white/8 hover:border-purple-500/40 p-6 sm:p-8 flex flex-col gap-4 text-left transition-all duration-200 hover:bg-purple-500/5 group">
              
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-all">
                    <Video size={22} className="text-purple-400" />
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-purple-500/15 text-purple-400 font-600 border border-purple-500/25">
                    Tavus Replica
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-700 text-white mb-1.5">Create Custom Replica</h3>
                  <p className="text-sm text-white/45 leading-relaxed">
                    Upload a training video to generate a photorealistic digital twin. Clone your voice with ElevenLabs or pick a stock voice.
                  </p>
                </div>
                <div className="flex flex-col gap-2 mt-auto">
                  {[
                { icon: Video, text: 'Training video upload (2–5 min)' },
                { icon: Mic, text: 'ElevenLabs voice clone or stock' },
                { icon: Clock, text: 'Training takes 10–30 min' }].
                map(({ icon: Icon, text }) =>
                <div key={text} className="flex items-center gap-2 text-xs text-white/40">
                      <Icon size={11} className="text-purple-400 flex-shrink-0" />
                      {text}
                    </div>
                )}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-600 text-purple-400 mt-1">
                  Get started <ArrowRight size={13} />
                </div>
              </button>

              {/* Stock path */}
              <button
              onClick={() => setMode('stock')}
              className="glass rounded-2xl border border-white/8 hover:border-blue-500/40 p-6 sm:p-8 flex flex-col gap-4 text-left transition-all duration-200 hover:bg-blue-500/5 group">
              
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-all">
                    <Users size={22} className="text-blue-400" />
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-blue-500/15 text-blue-400 font-600 border border-blue-500/25">
                    Stock Avatar
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-700 text-white mb-1.5">Pick Stock Avatar</h3>
                  <p className="text-sm text-white/45 leading-relaxed">
                    Choose from Tavus's library of pre-built avatars. Pair with an ElevenLabs voice and attach to any persona instantly.
                  </p>
                </div>
                <div className="flex flex-col gap-2 mt-auto">
                  {[
                { icon: Star, text: '6 professional stock avatars' },
                { icon: Mic, text: 'ElevenLabs voice selection' },
                { icon: Zap, text: 'Ready to use immediately' }].
                map(({ icon: Icon, text }) =>
                <div key={text} className="flex items-center gap-2 text-xs text-white/40">
                      <Icon size={11} className="text-blue-400 flex-shrink-0" />
                      {text}
                    </div>
                )}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-600 text-blue-400 mt-1">
                  Browse avatars <ArrowRight size={13} />
                </div>
              </button>
            </div>

            {/* Tavus attribution */}
            <div className="glass rounded-xl border border-white/6 px-4 py-3 flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-white/8 flex items-center justify-center flex-shrink-0">
                <Video size={12} className="text-white/50" />
              </div>
              <p className="text-xs text-white/35">
                Powered by <span className="text-white/55 font-600">Tavus</span> for photorealistic video generation ·
                Voice cloning by <span className="text-white/55 font-600">ElevenLabs</span>
              </p>
            </div>
          </div>
        }

        {/* ── Mode: Replica Wizard ── */}
        {mode === 'replica' &&
        <div className="flex flex-col gap-4 h-full">
            {/* Wizard header */}
            <div className="glass rounded-2xl border border-white/8 p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <button
                  onClick={handleReplicaBack}
                  className="w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all flex-shrink-0">
                  
                    <ChevronLeft size={15} />
                  </button>
                  <div>
                    <h2 className="text-sm font-700 text-white">Create Tavus Replica</h2>
                    <p className="text-xs text-white/35">Step {stepIndex + 1} of {replicaSteps.length}</p>
                  </div>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/25 font-600 hidden sm:inline">
                  Tavus · ElevenLabs
                </span>
              </div>

              {/* Step progress */}
              <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1">
                {replicaSteps.map((step, i) => {
                const StepIcon = step.icon;
                const done = i < stepIndex;
                const active = i === stepIndex;
                return (
                  <React.Fragment key={step.key}>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-600 transition-all ${
                    active ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                    done ? 'bg-emerald-500/15 text-emerald-400' : 'text-white/25'}`
                    }>
                        {done ? <Check size={11} /> : <StepIcon size={11} />}
                        <span className="hidden sm:inline">{step.label}</span>
                      </div>
                      {i < replicaSteps.length - 1 &&
                    <div className={`flex-1 h-px ${done ? 'bg-emerald-500/30' : 'bg-white/8'}`} />
                    }
                    </React.Fragment>);

              })}
              </div>
            </div>

            {/* Step content */}
            <div className="glass rounded-2xl border border-white/8 p-4 sm:p-6 flex-1 overflow-y-auto">

              {/* Step 1: Training Video */}
              {replicaStep === 'video' &&
            <div className="flex flex-col gap-5">
                  <div>
                    <h3 className="text-base font-700 text-white mb-1">Upload Training Video</h3>
                    <p className="text-sm text-white/40">
                      Record yourself speaking naturally for 2–5 minutes. Tavus uses this to generate your photorealistic replica.
                    </p>
                  </div>

                  {/* Drop zone */}
                  <div
                onDragOver={(e) => {e.preventDefault();setVideoDragging(true);}}
                onDragLeave={() => setVideoDragging(false)}
                onDrop={handleVideoDrop}
                onClick={() => videoInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${
                videoDragging ? 'border-purple-500/60 bg-purple-500/10' : videoFile ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-white/15 hover:border-purple-500/40 hover:bg-purple-500/5'}`
                }>
                
                    <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={handleVideoInput} />
                    {videoFile ?
                <>
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                          <CheckCircle2 size={26} className="text-emerald-400" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-600 text-white">{videoFile.name}</p>
                          <p className="text-xs text-white/40 mt-1">{(videoFile.size / 1024 / 1024).toFixed(1)} MB · Ready to upload</p>
                        </div>
                        <button
                    onClick={(e) => {e.stopPropagation();setVideoFile(null);}}
                    className="text-xs text-white/35 hover:text-rose-400 transition-colors flex items-center gap-1">
                    
                          <X size={11} /> Remove
                        </button>
                      </> :

                <>
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                          <Upload size={24} className="text-white/30" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-600 text-white">Drop your training video here</p>
                          <p className="text-xs text-white/35 mt-1">or click to browse · MP4, MOV, WebM</p>
                        </div>
                      </>
                }
                  </div>

                  {/* Tips */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                { icon: Camera, title: 'Good lighting', desc: 'Face well-lit, no harsh shadows' },
                { icon: Mic, title: 'Clear audio', desc: 'Quiet room, speak naturally' },
                { icon: Video, title: '2–5 minutes', desc: 'Longer = better replica quality' }].
                map(({ icon: Icon, title, desc }) =>
                <div key={title} className="rounded-xl bg-white/3 border border-white/6 p-3 flex flex-col gap-1.5">
                        <Icon size={14} className="text-purple-400" />
                        <p className="text-xs font-600 text-white/70">{title}</p>
                        <p className="text-[11px] text-white/35">{desc}</p>
                      </div>
                )}
                  </div>
                </div>
            }

              {/* Step 2: Voice Clone */}
              {replicaStep === 'voice' &&
            <div className="flex flex-col gap-5">
                  <div>
                    <h3 className="text-base font-700 text-white mb-1">Configure Voice</h3>
                    <p className="text-sm text-white/40">Clone your own voice with ElevenLabs or choose a stock voice for your replica.</p>
                  </div>

                  {/* Toggle */}
                  <div className="flex gap-2 p-1 glass rounded-xl border border-white/8 w-fit">
                    {(['stock', 'clone'] as const).map((m) =>
                <button
                  key={m}
                  onClick={() => setVoiceMode(m)}
                  className={`px-4 py-2 rounded-lg text-xs font-600 transition-all ${
                  voiceMode === m ? 'bg-purple-500/25 text-purple-300 border border-purple-500/30' : 'text-white/40 hover:text-white/60'}`
                  }>
                  
                        {m === 'stock' ? '🎙 Stock Voice' : '🧬 Clone My Voice'}
                      </button>
                )}
                  </div>

                  {voiceMode === 'stock' &&
              <div className="flex flex-col gap-2">
                      <p className="text-xs text-white/40 font-500 uppercase tracking-wider">ElevenLabs Voice Library</p>
                      {elevenLabsVoices.map((v) =>
                <button
                  key={v.id}
                  onClick={() => setSelectedVoiceId(v.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  selectedVoiceId === v.id ?
                  'bg-purple-500/15 border-purple-500/30 text-white' : 'border-white/8 text-white/50 hover:border-white/15 hover:text-white/70'}`
                  }>
                  
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    selectedVoiceId === v.id ? 'bg-purple-500/25' : 'bg-white/5'}`
                    }>
                              <Volume2 size={13} className={selectedVoiceId === v.id ? 'text-purple-400' : 'text-white/30'} />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-600">{v.name}</p>
                              <p className="text-[11px] text-white/35">{v.style} · {v.gender}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {v.preview &&
                    <button
                      onClick={(e) => {e.stopPropagation();handlePreviewVoice(v.id);}}
                      className="w-7 h-7 rounded-lg bg-white/5 hover:bg-purple-500/20 flex items-center justify-center transition-all">
                      
                                {previewingVoice === v.id ?
                      <div className="w-3 h-3 border border-purple-400 border-t-transparent rounded-full animate-spin" /> :
                      <Play size={10} className="text-white/40" />
                      }
                              </button>
                    }
                            {selectedVoiceId === v.id && <Check size={13} className="text-purple-400" />}
                          </div>
                        </button>
                )}
                    </div>
              }

                  {voiceMode === 'clone' &&
              <div className="flex flex-col gap-4">
                      <div className="rounded-xl bg-amber-500/8 border border-amber-500/20 p-4 flex gap-3">
                        <AlertCircle size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-600 text-amber-300">Voice Clone Requirements</p>
                          <p className="text-xs text-white/40 mt-1">Upload at least 1 minute of clean audio. ElevenLabs will generate a voice model matching your speech patterns.</p>
                        </div>
                      </div>

                      <div
                  onClick={() => voiceInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-all ${
                  voiceFile ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-white/15 hover:border-purple-500/40 hover:bg-purple-500/5'}`
                  }>
                  
                        <input ref={voiceInputRef} type="file" accept="audio/*" className="hidden" onChange={handleVoiceInput} />
                        {voiceFile ?
                  <>
                            <CheckCircle2 size={24} className="text-emerald-400" />
                            <p className="text-sm font-600 text-white">{voiceFile.name}</p>
                            <p className="text-xs text-white/35">{(voiceFile.size / 1024 / 1024).toFixed(1)} MB</p>
                          </> :

                  <>
                            <Mic size={24} className="text-white/25" />
                            <p className="text-sm font-600 text-white">Upload voice sample</p>
                            <p className="text-xs text-white/35">MP3, WAV, M4A · Min 1 minute</p>
                          </>
                  }
                      </div>
                    </div>
              }
                </div>
            }

              {/* Step 3: Details */}
              {replicaStep === 'details' &&
            <div className="flex flex-col gap-5">
                  <div>
                    <h3 className="text-base font-700 text-white mb-1">Replica Details</h3>
                    <p className="text-sm text-white/40">Name your replica and optionally attach it to a persona.</p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-xs font-600 text-white/50 uppercase tracking-wider block mb-2">Replica Name *</label>
                      <input
                    type="text"
                    value={replicaName}
                    onChange={(e) => setReplicaName(e.target.value)}
                    placeholder="e.g. Alex — Sales Rep"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all" />
                  
                    </div>

                    <div>
                      <label className="text-xs font-600 text-white/50 uppercase tracking-wider block mb-2">Attach to Persona <span className="text-white/25 normal-case font-400">(optional)</span></label>
                      <div className="flex flex-col gap-2">
                        <button
                      onClick={() => setReplicaPersona('')}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-sm transition-all ${
                      replicaPersona === '' ? 'border-white/20 bg-white/5 text-white/60' : 'border-white/8 text-white/35 hover:border-white/15'}`
                      }>
                      
                          <div className="w-5 h-5 rounded-full border-2 border-white/20 flex items-center justify-center">
                            {replicaPersona === '' && <div className="w-2 h-2 rounded-full bg-white/60" />}
                          </div>
                          Skip for now
                        </button>
                        {mockPersonas.map((p) =>
                    <button
                      key={p.id}
                      onClick={() => setReplicaPersona(p.name)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-sm transition-all ${
                      replicaPersona === p.name ?
                      'border-purple-500/30 bg-purple-500/10 text-white' : 'border-white/8 text-white/45 hover:border-white/15 hover:text-white/70'}`
                      }>
                      
                            <div className="w-5 h-5 rounded-full border-2 border-purple-500/40 flex items-center justify-center">
                              {replicaPersona === p.name && <div className="w-2 h-2 rounded-full bg-purple-400" />}
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-600">{p.name}</p>
                              <p className="text-[11px] text-white/35">{p.role}</p>
                            </div>
                          </button>
                    )}
                      </div>
                    </div>
                  </div>
                </div>
            }

              {/* Step 4: Confirm */}
              {replicaStep === 'confirm' &&
            <div className="flex flex-col gap-5">
                  <div>
                    <h3 className="text-base font-700 text-white mb-1">Review & Submit</h3>
                    <p className="text-sm text-white/40">Confirm your replica configuration before submitting to Tavus for training.</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {[
                { label: 'Replica Name', value: replicaName || '—', icon: Sparkles },
                { label: 'Training Video', value: videoFile?.name || '—', icon: Video },
                { label: 'Voice', value: voiceMode === 'clone' ? `Clone — ${voiceFile?.name || 'uploaded'}` : `ElevenLabs — ${elevenLabsVoices.find((v) => v.id === selectedVoiceId)?.name}`, icon: Mic },
                { label: 'Attached Persona', value: replicaPersona || 'None', icon: Users }].
                map(({ label, value, icon: Icon }) =>
                <div key={label} className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/6">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center flex-shrink-0">
                          <Icon size={14} className="text-purple-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] text-white/35 uppercase tracking-wider font-500">{label}</p>
                          <p className="text-sm font-600 text-white truncate">{value}</p>
                        </div>
                      </div>
                )}
                  </div>

                  <div className="rounded-xl bg-purple-500/8 border border-purple-500/20 p-4 flex gap-3">
                    <Clock size={14} className="text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-600 text-purple-300">Training Time</p>
                      <p className="text-xs text-white/40 mt-0.5">Tavus typically takes 10–30 minutes to generate your replica. You'll be notified when it's ready.</p>
                    </div>
                  </div>
                </div>
            }
            </div>

            {/* Wizard footer */}
            <div className="flex items-center justify-between">
              <button
              onClick={handleReplicaBack}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-sm font-500 text-white/45 hover:text-white hover:bg-white/5 transition-all">
              
                <ChevronLeft size={14} /> Back
              </button>
              {replicaStep !== 'confirm' ?
            <button
              onClick={handleReplicaNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-sm font-600 text-white">
              
                  Continue <ChevronRight size={14} />
                </button> :

            <button
              onClick={handleCreateReplica}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-sm font-600 text-white">
              
                  <Sparkles size={14} /> Submit for Training
                </button>
            }
            </div>
          </div>
        }

        {/* ── Mode: Stock Avatar ── */}
        {mode === 'stock' &&
        <div className="flex flex-col gap-4 h-full">
            {/* Header */}
            <div className="glass rounded-2xl border border-white/8 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
              <div className="flex items-center gap-3">
                <button
                onClick={() => {setMode('choose');setSelectedStockId(null);}}
                className="w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all flex-shrink-0">
                
                  <ChevronLeft size={15} />
                </button>
                <div>
                  <h2 className="text-sm font-700 text-white">Stock Avatar Library</h2>
                  <p className="text-xs text-white/35">Pick an avatar, assign a voice, attach to persona</p>
                </div>
              </div>
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                type="text"
                value={stockSearch}
                onChange={(e) => setStockSearch(e.target.value)}
                placeholder="Search avatars…"
                className="bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-white/25 focus:outline-none focus:border-blue-500/40 w-full sm:w-44 transition-all" />
              
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
              {/* Avatar grid */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredStock.map((av) =>
                <button
                  key={av.id}
                  onClick={() => setSelectedStockId(av.id)}
                  className={`glass rounded-2xl border p-4 flex flex-col gap-3 text-left transition-all ${
                  selectedStockId === av.id ?
                  `${av.accentBorder} shadow-lg bg-white/3` :
                  'border-white/8 hover:border-white/18'}`
                  }>
                  
                      <div className="relative">
                        <img src={av.thumbnail} alt={av.thumbnailAlt} className="w-full aspect-square rounded-xl object-cover" />
                        {selectedStockId === av.id &&
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                    }
                      </div>
                      <div>
                        <p className="text-sm font-700 text-white">{av.name}</p>
                        <p className={`text-xs font-500 ${av.accent}`}>{av.style}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {av.tags.slice(0, 2).map((tag) =>
                      <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/6 text-white/35 font-500">{tag}</span>
                      )}
                        </div>
                      </div>
                    </button>
                )}
                </div>
              </div>

              {/* Config panel */}
              {selectedStockId &&
            <div className="lg:w-64 lg:flex-shrink-0 flex flex-col gap-4">
                  <div className="glass rounded-2xl border border-white/8 p-5 flex flex-col gap-4 flex-1 overflow-y-auto">
                    <p className="text-xs font-600 text-white/50 uppercase tracking-wider">Configure Avatar</p>

                    {/* Name */}
                    <div>
                      <label className="text-[11px] text-white/35 block mb-1.5">Display Name</label>
                      <input
                    type="text"
                    value={stockName}
                    onChange={(e) => setStockName(e.target.value)}
                    placeholder={`${stockAvatars.find((s) => s.id === selectedStockId)?.name} — Stock`}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-blue-500/40 transition-all" />
                  
                    </div>

                    {/* Voice */}
                    <div>
                      <label className="text-[11px] text-white/35 block mb-1.5">ElevenLabs Voice</label>
                      <div className="flex flex-col gap-1.5">
                        {elevenLabsVoices.slice(0, 4).map((v) =>
                    <button
                      key={v.id}
                      onClick={() => setStockVoiceId(v.id)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs border transition-all ${
                      stockVoiceId === v.id ?
                      'bg-blue-500/15 border-blue-500/30 text-white' : 'border-white/8 text-white/40 hover:border-white/15'}`
                      }>
                      
                          <span>{v.name}</span>
                          {stockVoiceId === v.id && <Check size={11} className="text-blue-400" />}
                        </button>
                    )}
                      </div>
                    </div>

                    {/* Persona */}
                    <div>
                      <label className="text-[11px] text-white/35 block mb-1.5">Attach to Persona <span className="text-white/20">(optional)</span></label>
                      <div className="flex flex-col gap-1.5">
                        <button
                      onClick={() => setStockPersona('')}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs border transition-all ${
                      stockPersona === '' ? 'border-white/20 text-white/50 bg-white/4' : 'border-white/8 text-white/30 hover:border-white/15'}`
                      }>
                      
                          <div className="w-3 h-3 rounded-full border border-white/25 flex items-center justify-center">
                            {stockPersona === '' && <div className="w-1.5 h-1.5 rounded-full bg-white/50" />}
                          </div>
                          None
                        </button>
                        {mockPersonas.map((p) =>
                    <button
                      key={p.id}
                      onClick={() => setStockPersona(p.name)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs border transition-all text-left ${
                      stockPersona === p.name ?
                      'border-blue-500/30 bg-blue-500/10 text-white' : 'border-white/8 text-white/40 hover:border-white/15 hover:text-white/70'}`
                      }>
                      
                            <div className="w-3 h-3 rounded-full border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                              {stockPersona === p.name && <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                            </div>
                            <span className="truncate">{p.name}</span>
                          </button>
                    )}
                      </div>
                    </div>
                  </div>

                  <button
                onClick={handleAddStock}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-primary text-sm font-600 text-white">
                
                    <Plus size={14} /> Add to Library
                  </button>
                </div>
            }
            </div>
          </div>
        }
      </div>

      {/* ── New Avatar Button (floating) ── */}
      {mode === 'choose' &&
      <div className="absolute bottom-6 right-6">
          {/* intentionally empty — handled by the two cards */}
        </div>
      }

      {/* ── Attach Persona Modal ── */}
      {attachModalOpen && attachTarget &&
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glass rounded-2xl border border-white/12 p-6 w-96 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-700 text-white">Attach to Persona</h3>
              <button
              onClick={() => {setAttachModalOpen(false);setAttachTarget(null);}}
              className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
              
                <X size={13} />
              </button>
            </div>
            <p className="text-xs text-white/40">Select a persona to attach this avatar to.</p>
            <div className="flex flex-col gap-2">
              {mockPersonas.map((p) =>
            <button
              key={p.id}
              onClick={() => handleAttach(attachTarget, p.name)}
              className="flex items-center justify-between p-3.5 rounded-xl border border-white/8 hover:border-purple-500/30 hover:bg-purple-500/8 text-sm text-white/60 hover:text-white transition-all">
              
                  <div className="text-left">
                    <p className="font-600 text-white">{p.name}</p>
                    <p className="text-[11px] text-white/35">{p.role}</p>
                  </div>
                  <ChevronRight size={14} className="text-white/25" />
                </button>
            )}
            </div>
          </div>
        </div>
      }
    </div>);

}