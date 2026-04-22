'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Type, Play, Download, Sparkles, Film, Clock, ChevronDown, X, Image as ImageIcon, Wand2, Mic, Zap, CheckCircle2, RotateCcw, Settings2, Subtitles, MonitorPlay, Loader2, Search } from 'lucide-react';

type GenerationStatus = 'idle' | 'queued' | 'processing' | 'done' | 'error';

interface VideoJob {
  id: string;
  title: string;
  duration: string;
  status: GenerationStatus;
  thumbnail: string;
  thumbnailAlt: string;
  createdAt: string;
  resolution: string;
}

const recentJobs: VideoJob[] = [
{
  id: 'vj-1',
  title: 'Product Launch Announcement',
  duration: '0:42',
  status: 'done',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_160961408-1772142864212.png",
  thumbnailAlt: 'Professional presenter in front of product launch backdrop',
  createdAt: '2 hours ago',
  resolution: '1080p'
},
{
  id: 'vj-2',
  title: 'Onboarding Welcome Video',
  duration: '1:15',
  status: 'done',
  thumbnail: "https://images.unsplash.com/photo-1622131074683-27a8334c5837",
  thumbnailAlt: 'Friendly avatar welcoming new users in office setting',
  createdAt: '1 day ago',
  resolution: '720p'
},
{
  id: 'vj-3',
  title: 'Q3 Sales Summary',
  duration: '2:08',
  status: 'processing',
  thumbnail: '',
  thumbnailAlt: '',
  createdAt: 'Just now',
  resolution: '1080p'
}];


const libraryVoices = [
  { id: 'v1', name: 'Rachel', accent: 'American English', gender: 'Female', type: 'library' as const },
  { id: 'v2', name: 'Adam', accent: 'British English', gender: 'Male', type: 'library' as const },
  { id: 'v3', name: 'Priya', accent: 'Indian English', gender: 'Female', type: 'library' as const },
  { id: 'v4', name: 'Luca', accent: 'Italian English', gender: 'Male', type: 'library' as const },
  { id: 'v5', name: 'Sofia', accent: 'Spanish', gender: 'Female', type: 'library' as const },
  { id: 'v6', name: 'James', accent: 'Australian English', gender: 'Male', type: 'library' as const },
  { id: 'v7', name: 'Mei', accent: 'Mandarin English', gender: 'Female', type: 'library' as const },
  { id: 'v8', name: 'Carlos', accent: 'Latin American', gender: 'Male', type: 'library' as const },
];

const clonedVoices = [
  { id: 'cv1', name: 'My Voice Clone', accent: 'Custom', gender: 'Male', type: 'cloned' as const },
  { id: 'cv2', name: 'Brand Voice', accent: 'Custom', gender: 'Female', type: 'cloned' as const },
];

const avatarVoices = [...libraryVoices, ...clonedVoices];


const resolutionOptions = ['720p', '1080p'];
const aspectRatios = ['16:9', '9:16'];
const languages = ['English', 'Spanish', 'French', 'German', 'Hindi', 'Japanese'];

const statusConfig: Record<GenerationStatus, {label: string;color: string;bg: string;border: string;}> = {
  idle: { label: 'Draft', color: 'text-white/40', bg: 'bg-white/5', border: 'border-white/10' },
  queued: { label: 'Queued', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  processing: { label: 'Processing', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  done: { label: 'Ready', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  error: { label: 'Failed', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' }
};

export default function VideoGenerationClient() {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [scriptText, setScriptText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(avatarVoices[0]);
  const [resolution, setResolution] = useState('1080p');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [subtitles, setSubtitles] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>('idle');
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');
  const [voiceDialogOpen, setVoiceDialogOpen] = useState(false);
  const [voiceSearch, setVoiceSearch] = useState('');
  const [voiceTab, setVoiceTab] = useState<'library' | 'cloned'>('library');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (voiceDialogOpen) {
          setVoiceDialogOpen(false);
          setVoiceSearch('');
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [voiceDialogOpen]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleGenerate = () => {
    if (!photoFile || !scriptText.trim()) return;
    setGenerationStatus('queued');
    setTimeout(() => setGenerationStatus('processing'), 1200);
    setTimeout(() => setGenerationStatus('done'), 5000);
  };

  const handleReset = () => {
    setPhotoFile(null);
    setPhotoPreview('');
    setScriptText('');
    setGenerationStatus('idle');
  };

  const filteredVoices = (voiceTab === 'library' ? libraryVoices : clonedVoices).filter(
    (v) => v.name.toLowerCase().includes(voiceSearch.toLowerCase()) || v.accent.toLowerCase().includes(voiceSearch.toLowerCase())
  );

  const canGenerate = !!photoFile && scriptText.trim().length > 0 && generationStatus === 'idle';

  return (
    <div className="min-h-screen p-4 sm:p-6 space-y-4 sm:space-y-6" style={{ background: 'transparent' }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5 mb-1 flex-wrap">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/30 to-pink-500/20 border border-violet-500/25 flex items-center justify-center flex-shrink-0">
              <Film size={16} className="text-violet-400" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">Video Generation</h1>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/25 uppercase tracking-wider">
              HeyGen Powered
            </span>
          </div>
          <p className="text-sm text-white/40 ml-0 sm:ml-10">Convert a photo + script into a talking-head MP4 video</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl border border-white/8 self-start" style={{ background: 'rgba(255,255,255,0.03)' }}>
          {(['create', 'history'] as const).map((tab) =>
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 capitalize ${
            activeTab === tab ?
            'bg-violet-500/20 text-violet-300 border border-violet-500/25' :
            'text-white/40 hover:text-white/70'}`
            }>
              {tab === 'create' ? 'New Video' : 'History'}
            </button>
          )}
        </div>
      </div>

      {activeTab === 'create' ?
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          {/* Left Column — Inputs */}
          <div className="lg:col-span-7 space-y-4">
            {/* Photo Upload */}
            <div
            className="rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer group"
            style={{ borderColor: photoPreview ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => !photoPreview && fileInputRef.current?.click()}>
            
              {photoPreview ?
            <div className="relative p-3 flex items-center gap-4">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-violet-500/30">
                    <img src={photoPreview} alt="Uploaded avatar photo" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{photoFile?.name}</p>
                    <p className="text-xs text-white/40 mt-0.5">{photoFile ? (photoFile.size / 1024).toFixed(1) + ' KB' : ''} · Image ready</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <CheckCircle2 size={13} className="text-emerald-400" />
                      <span className="text-xs text-emerald-400">Photo uploaded successfully</span>
                    </div>
                  </div>
                  <button
                onClick={(e) => {e.stopPropagation();setPhotoFile(null);setPhotoPreview('');}}
                className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                
                    <X size={13} />
                  </button>
                </div> :

            <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/15 transition-all">
                    <ImageIcon size={22} className="text-violet-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-white/70">Drop a photo here or <span className="text-violet-400 underline underline-offset-2">browse</span></p>
                    <p className="text-xs text-white/30 mt-1">JPG, PNG, WEBP · Max 10 MB · Face clearly visible</p>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    {['Front-facing', 'Good lighting', 'No sunglasses'].map((tip) =>
                <span key={tip} className="flex items-center gap-1 text-[10px] text-white/30">
                        <CheckCircle2 size={10} className="text-violet-400/60" /> {tip}
                      </span>
                )}
                  </div>
                </div>
            }
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </div>

            {/* Script Input */}
            <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/6">
                <div className="flex items-center gap-2">
                  <Type size={14} className="text-violet-400" />
                  <span className="text-sm font-medium text-white/80">Script / Text</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/30">{scriptText.length} / 2000</span>
                  <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-xs text-violet-300 hover:bg-violet-500/15 transition-all">
                    <Wand2 size={11} /> AI Assist
                  </button>
                </div>
              </div>
              <textarea
              value={scriptText}
              onChange={(e) => setScriptText(e.target.value.slice(0, 2000))}
              placeholder="Type or paste the script your avatar will speak. Be natural — short sentences work best for realistic lip-sync..."
              rows={7}
              className="w-full bg-transparent px-4 py-3 text-sm text-white/80 placeholder-white/20 resize-none outline-none leading-relaxed" />
            
              {scriptText.length > 0 &&
            <div className="px-4 py-2 border-t border-white/5 flex items-center gap-4">
                  <span className="text-xs text-white/30">Est. duration:</span>
                  <span className="text-xs text-white/60 font-medium">~{Math.ceil(scriptText.split(' ').length / 2.5)}s</span>
                </div>
            }
            </div>

            {/* Voice Row */}
            <div>
              {/* Voice Selector */}
              <div>
                <label className="block text-xs text-white/40 mb-1.5 ml-1">Avatar Voice</label>
                <button
                  onClick={() => setVoiceDialogOpen(true)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-white/10 text-sm text-white/70 hover:border-violet-500/30 hover:text-white transition-all"
                  style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="flex items-center gap-2">
                    <Mic size={14} className="text-violet-400" />
                    <span>{selectedVoice.name}</span>
                    <span className="text-xs text-white/30">· {selectedVoice.accent}</span>
                    {selectedVoice.type === 'cloned' && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">Cloned</span>
                    )}
                  </div>
                  <ChevronDown size={13} className="text-white/30" />
                </button>
              </div>
            </div>

            {/* Voice Dialog */}
            {voiceDialogOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setVoiceDialogOpen(false)}>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                <div
                  className="relative w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                  style={{ background: 'rgba(14,16,24,0.98)' }}
                  onClick={(e) => e.stopPropagation()}>
                  {/* Dialog Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                    <div className="flex items-center gap-2">
                      <Mic size={16} className="text-violet-400" />
                      <span className="text-sm font-semibold text-white">Select Avatar Voice</span>
                    </div>
                    <button onClick={() => setVoiceDialogOpen(false)} className="p-1.5 rounded-lg hover:bg-white/8 text-white/40 hover:text-white transition-all">
                      <X size={15} />
                    </button>
                  </div>

                  {/* Search */}
                  <div className="px-5 pt-4 pb-3">
                    <div className="relative">
                      <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                      <input
                        type="text"
                        placeholder="Search voices..."
                        value={voiceSearch}
                        onChange={(e) => setVoiceSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 rounded-xl border border-white/10 bg-white/4 text-sm text-white/70 placeholder-white/25 focus:outline-none focus:border-violet-500/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-1 px-5 pb-3">
                    <button
                      onClick={() => setVoiceTab('library')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${voiceTab === 'library' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' : 'text-white/40 hover:text-white/70 hover:bg-white/5'}`}>
                      Library Voices
                    </button>
                    <button
                      onClick={() => setVoiceTab('cloned')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${voiceTab === 'cloned' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' : 'text-white/40 hover:text-white/70 hover:bg-white/5'}`}>
                      Cloned Voices
                      <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded-full bg-white/10 text-white/40">{clonedVoices.length}</span>
                    </button>
                  </div>

                  {/* Voice List */}
                  <div className="px-5 pb-5 max-h-72 overflow-y-auto space-y-1">
                    {filteredVoices.length === 0 ? (
                      <div className="py-8 text-center text-sm text-white/30">No voices found</div>
                    ) : (
                      filteredVoices.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => { setSelectedVoice(v); setVoiceDialogOpen(false); setVoiceSearch(''); }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${selectedVoice.id === v.id ? 'bg-violet-500/15 border border-violet-500/30 text-violet-300' : 'hover:bg-white/5 text-white/60 border border-transparent'}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${v.gender === 'Female' ? 'bg-pink-500/20 text-pink-300' : 'bg-blue-500/20 text-blue-300'}`}>
                              {v.name.charAt(0)}
                            </div>
                            <div className="text-left">
                              <div className="font-medium text-white/80 text-xs">{v.name}</div>
                              <div className="text-[11px] text-white/35">{v.accent} · {v.gender}</div>
                            </div>
                          </div>
                          {selectedVoice.id === v.id && <CheckCircle2 size={14} className="text-violet-400 flex-shrink-0" />}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-4">
            {/* Output Settings */}
            <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6">
                <Settings2 size={14} className="text-violet-400" />
                <span className="text-sm font-medium text-white/80">Output Settings</span>
              </div>
              <div className="p-4 space-y-4">
                {/* Resolution */}
                <div>
                  <label className="text-xs text-white/40 block mb-2">Resolution</label>
                  <div className="flex gap-2">
                    {resolutionOptions.map((r) =>
                  <button
                    key={r}
                    onClick={() => setResolution(r)}
                    className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-all ${
                    resolution === r ?
                    'bg-violet-500/15 border-violet-500/30 text-violet-300' :
                    'border-white/8 text-white/40 hover:border-white/15 hover:text-white/60'}`
                    }>
                    
                        {r}
                      </button>
                  )}
                  </div>
                </div>

                {/* Aspect Ratio */}
                <div>
                  <label className="text-xs text-white/40 block mb-2">Aspect Ratio</label>
                  <div className="flex gap-2">
                    {aspectRatios.map((ar) =>
                  <button
                    key={ar}
                    onClick={() => setAspectRatio(ar)}
                    className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-all ${
                    aspectRatio === ar ?
                    'bg-violet-500/15 border-violet-500/30 text-violet-300' :
                    'border-white/8 text-white/40 hover:border-white/15 hover:text-white/60'}`
                    }>
                    
                        {ar}
                      </button>
                  )}
                  </div>
                </div>

                {/* remove Subtitles Toggle */}
              </div>
            </div>

            {/* Preview Panel */}
            <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6">
                <MonitorPlay size={14} className="text-violet-400" />
                <span className="text-sm font-medium text-white/80">Preview</span>
              </div>
              <div className="p-4">
                <div
                className="relative rounded-xl overflow-hidden flex items-center justify-center"
                style={{
                  aspectRatio: aspectRatio === '9:16' ? '9/16' : '16/9',
                  maxHeight: '220px',
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                
                  {photoPreview ?
                <>
                      <img src={photoPreview} alt="Avatar preview" className="w-full h-full object-cover opacity-60" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        {generationStatus === 'processing' ?
                    <div className="flex flex-col items-center gap-2">
                            <Loader2 size={28} className="text-violet-400 animate-spin" />
                            <span className="text-xs text-white/60">Generating video…</span>
                          </div> :
                    generationStatus === 'done' ?
                    <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                              <Play size={20} className="text-emerald-400 ml-0.5" />
                            </div>
                            <span className="text-xs text-emerald-400 font-medium">Video ready</span>
                          </div> :

                    <div className="flex flex-col items-center gap-1.5">
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                              <Play size={16} className="text-white/30 ml-0.5" />
                            </div>
                            <span className="text-xs text-white/30">Generate to preview</span>
                          </div>
                    }
                      </div>
                    </> :

                <div className="flex flex-col items-center gap-2 text-center px-4">
                      <Film size={28} className="text-white/15" />
                      <span className="text-xs text-white/25">Upload a photo to see preview</span>
                    </div>
                }
                </div>

                {/* Resolution badge */}
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[10px] text-white/30">{resolution} · {aspectRatio}</span>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="space-y-2">
              {generationStatus === 'done' ?
            <div className="space-y-2">
                  <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-semibold hover:bg-emerald-500/20 transition-all">
                    <Download size={16} /> Download MP4
                  </button>
                  <button onClick={handleReset} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/8 text-white/40 text-sm hover:text-white/60 hover:bg-white/5 transition-all">
                    <RotateCcw size={14} /> Start New
                  </button>
                </div> :
            generationStatus === 'processing' || generationStatus === 'queued' ?
            <button disabled className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400/60 text-sm font-semibold cursor-not-allowed">
                  <Loader2 size={16} className="animate-spin" />
                  {generationStatus === 'queued' ? 'Queued…' : 'Generating…'}
                </button> :

            <button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              canGenerate ?
              'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white shadow-lg shadow-violet-500/20' :
              'bg-white/5 border border-white/8 text-white/25 cursor-not-allowed'}`
              }>
              
                  <Sparkles size={16} />
                  Generate Video
                </button>
            }

              {!photoFile && !scriptText &&
            <p className="text-center text-[11px] text-white/25">Upload a photo and add a script to generate</p>
            }
            </div>
          </div>
        </div> : (

      /* History Tab */
      <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/40">{recentJobs.length} videos generated</p>
            <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Clear history</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentJobs.map((job) => {
            const s = statusConfig[job.status];
            return (
              <div key={job.id} className="rounded-2xl border border-white/8 overflow-hidden group hover:border-violet-500/25 transition-all duration-200" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-black/40 overflow-hidden">
                    {job.thumbnail ?
                  <img src={job.thumbnail} alt={job.thumbnailAlt} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" /> :

                  <div className="w-full h-full flex items-center justify-center">
                        <Loader2 size={24} className="text-violet-400 animate-spin" />
                      </div>
                  }
                    {job.status === 'done' &&
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center">
                          <Play size={16} className="text-white ml-0.5" />
                        </div>
                      </div>
                  }
                    <div className="absolute top-2 right-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${s.color} ${s.bg} ${s.border}`}>
                        {s.label}
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 rounded-md px-1.5 py-0.5">
                      <Clock size={9} className="text-white/50" />
                      <span className="text-[10px] text-white/60">{job.duration}</span>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-3">
                    <p className="text-sm font-medium text-white/80 truncate">{job.title}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[11px] text-white/30">{job.createdAt}</span>
                      <span className="text-[11px] text-white/30">{job.resolution}</span>
                    </div>
                    {job.status === 'done' &&
                  <button className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs text-white/50 hover:text-white hover:bg-white/8 transition-all">
                        <Download size={11} /> Download MP4
                      </button>
                  }
                  </div>
                </div>);

          })}
          </div>
        </div>)
      }

      {/* HeyGen Attribution Banner */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/6" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <Zap size={14} className="text-violet-400 flex-shrink-0" />
        <p className="text-xs text-white/30">
          Powered by <span className="text-violet-400 font-medium">HeyGen API</span> — realistic talking-head video synthesis with lip-sync, voice cloning, and multi-language support.
        </p>
        <span className="ml-auto text-[10px] text-white/20 whitespace-nowrap">v2.0 · Instant generation</span>
      </div>
    </div>);

}