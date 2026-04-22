'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, ChevronRight, Copy, CheckCheck, MessageSquare, Mic, Video, Globe } from 'lucide-react';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';


const STEPS = [
  { id: 'step-persona', label: 'Select Persona', number: 1 },
  { id: 'step-type', label: 'Choose Type', number: 2 },
  { id: 'step-configure', label: 'Configure UI', number: 3 },
  { id: 'step-domain', label: 'Domain Restriction', number: 4 },
  { id: 'step-generate', label: 'Generate Code', number: 5 },
];

const personaOptions = [
  { id: 'persona-001', name: 'Aria Sales', status: 'active' },
  { id: 'persona-002', name: 'Support Bot v2', status: 'active' },
  { id: 'persona-004', name: 'Kai Voice Agent', status: 'active' },
  { id: 'persona-006', name: 'Demo Concierge', status: 'active' },
  { id: 'persona-008', name: 'Zara Retail', status: 'active' },
  { id: 'persona-011', name: 'Nova Customer Success', status: 'active' },
];

const typeOptions = [
  { id: 'type-chat', label: 'Chat', desc: 'Floating chat widget with text interface', icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-500/15', border: 'border-blue-500/30' },
  { id: 'type-voice', label: 'Voice', desc: 'Voice-first widget with push-to-talk', icon: Mic, color: 'text-purple-400', bg: 'bg-purple-500/15', border: 'border-purple-500/30' },
  { id: 'type-avatar', label: 'Avatar', desc: 'Video avatar with lip-sync via Heygen/Tavus', icon: Video, color: 'text-teal-400', bg: 'bg-teal-500/15', border: 'border-teal-500/30' },
];

export default function CreatePluginWizard({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPersona, setSelectedPersona] = useState('');
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [config, setConfig] = useState({
    theme: 'dark',
    position: 'bottom-right',
    widgetType: 'floating',
    welcomeMessage: 'Hi! How can I help you today?',
  });
  const [domains, setDomains] = useState('');
  const [copied, setCopied] = useState(false);

  const persona = personaOptions.find((p) => p.id === selectedPersona);
  const personaId = selectedPersona || 'persona-001';

  const embedCode = `<script src="https://cdn.personamatrix.ai/widget.js" defer></script>
<script>
  PersonaMatrix.init({
    personaId: "${personaId}",
    apiKey: "pk_live_xxxxxxxxxxxxxxxx",
    type: "${selectedType.length > 0 ? selectedType.join(', ') : 'chat'}",
    position: "${config.position}",
    theme: "${config.theme}",
    widgetType: "${config.widgetType}",
    welcomeMessage: "${config.welcomeMessage}",
    allowedDomains: [${domains ? domains.split('\n').map(d => `"${d.trim()}"`).join(', ') : '"*"'}]
  });
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast.success('Embed code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const canNext = () => {
    if (currentStep === 0) return !!selectedPersona;
    if (currentStep === 1) return selectedType.length > 0;
    return true;
  };

  const handleFinish = () => {
    // Backend integration: POST /api/plugins to save plugin config
    toast.success('Plugin created and deployed successfully');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: 'rgba(12,14,22,0.99)', border: '1px solid rgba(255,255,255,0.10)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/6">
          <div>
            <h2 className="text-base font-700 text-white">Create Plugin</h2>
            <p className="text-xs text-white/35 mt-0.5">Step {currentStep + 1} of {STEPS.length} — {STEPS[currentStep].label}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all">
            <X size={14} />
          </button>
        </div>

        {/* Step Indicators */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className={`flex items-center gap-2 ${i <= currentStep ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-700 flex-shrink-0 transition-all ${
                  i < currentStep ? 'bg-emerald-500 text-white' :
                  i === currentStep ? 'bg-purple-500 text-white': 'bg-white/10 text-white/40'
                }`}>
                  {i < currentStep ? <Check size={12} /> : s.number}
                </div>
                <span className={`text-[11px] font-500 hidden sm:block ${i === currentStep ? 'text-white' : 'text-white/35'}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px max-w-8 ${i < currentStep ? 'bg-emerald-500/40' : 'bg-white/10'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        <div className="px-6 py-6 min-h-64">
          {/* Step 1: Select Persona */}
          {currentStep === 0 && (
            <div>
              <p className="text-xs text-white/40 mb-4">Choose the AI persona to deploy in this plugin</p>
              <div className="grid grid-cols-2 gap-2">
                {personaOptions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPersona(p.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      selectedPersona === p.id
                        ? 'border-purple-500/50 bg-purple-500/10' :'border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-700 flex-shrink-0">
                      {p.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-600 text-white truncate">{p.name}</p>
                      <p className="text-[10px] text-emerald-400 capitalize">{p.status}</p>
                    </div>
                    {selectedPersona === p.id && <Check size={13} className="text-purple-400 ml-auto flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Choose Type */}
          {currentStep === 1 && (
            <div>
              <p className="text-xs text-white/40 mb-4">Select the interaction type for this widget</p>
              <div className="grid grid-cols-3 gap-3">
                {typeOptions.map((t) => {
                  const Icon = t.icon;
                  const isSelected = selectedType.includes(t.label.toLowerCase());
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        const val = t.label.toLowerCase();
                        setSelectedType(prev =>
                          prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
                        );
                      }}
                      className={`flex flex-col items-center p-4 rounded-xl border text-center transition-all relative ${
                        isSelected
                          ? `${t.border} ${t.bg}`
                          : 'border-white/8 bg-white/3 hover:bg-white/6'
                      }`}
                    >
                      <div className={`absolute top-2 right-2 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'border-purple-500 bg-purple-500' : 'border-white/20 bg-transparent'
                      }`}>
                        {isSelected && <Check size={10} className="text-white" />}
                      </div>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                        isSelected ? t.bg : 'bg-white/8'
                      }`}>
                        <Icon size={20} className={isSelected ? t.color : 'text-white/40'} />
                      </div>
                      <p className="text-sm font-600 text-white mb-1">{t.label}</p>
                      <p className="text-[11px] text-white/40 leading-snug">{t.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Configure UI */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <p className="text-xs text-white/40 mb-4">Customize the widget appearance and behavior</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-500 text-white/60 block mb-2">Theme</label>
                  <div className="flex gap-2">
                    {['dark', 'light'].map((t) => (
                      <button
                        key={`theme-${t}`}
                        onClick={() => setConfig({ ...config, theme: t })}
                        className={`flex-1 py-2 rounded-lg border text-xs font-500 capitalize transition-all ${
                          config.theme === t
                            ? 'border-purple-500/50 bg-purple-500/15 text-purple-300' :'border-white/8 text-white/40 hover:bg-white/5'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-500 text-white/60 block mb-2">Position</label>
                  <div className="flex gap-2">
                    {['bottom-right', 'bottom-left'].map((pos) => (
                      <button
                        key={`pos-${pos}`}
                        onClick={() => setConfig({ ...config, position: pos })}
                        className={`flex-1 py-2 rounded-lg border text-[11px] font-500 transition-all ${
                          config.position === pos
                            ? 'border-purple-500/50 bg-purple-500/15 text-purple-300' :'border-white/8 text-white/40 hover:bg-white/5'
                        }`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-500 text-white/60 block mb-2">Widget Type</label>
                  <div className="flex gap-2">
                    {['floating', 'inline'].map((wt) => (
                      <button
                        key={`wt-${wt}`}
                        onClick={() => setConfig({ ...config, widgetType: wt })}
                        className={`flex-1 py-2 rounded-lg border text-xs font-500 capitalize transition-all ${
                          config.widgetType === wt
                            ? 'border-purple-500/50 bg-purple-500/15 text-purple-300' :'border-white/8 text-white/40 hover:bg-white/5'
                        }`}
                      >
                        {wt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs font-500 text-white/60 block mb-2">Welcome Message</label>
                <input
                  value={config.welcomeMessage}
                  onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/8 text-sm text-white placeholder-white/25 outline-none focus:border-purple-500/50 transition-all"
                />
              </div>
            </div>
          )}

          {/* Step 4: Domain Restriction */}
          {currentStep === 3 && (
            <div>
              <p className="text-xs text-white/40 mb-4">Restrict this widget to specific domains (one per line). Leave empty to allow all domains.</p>
              <div className="flex items-start gap-2 mb-3">
                <Globe size={14} className="text-white/30 mt-3 flex-shrink-0" />
                <textarea
                  value={domains}
                  onChange={(e) => setDomains(e.target.value)}
                  placeholder={`docs.yoursite.com\napp.yoursite.com\nblog.yoursite.com`}
                  rows={5}
                  className="flex-1 px-3 py-2.5 rounded-xl bg-white/5 border border-white/8 text-sm text-white placeholder-white/20 outline-none focus:border-purple-500/50 transition-all font-mono resize-none"
                />
              </div>
              <p className="text-[11px] text-white/25">Wildcard subdomains not supported. Use exact domain names.</p>
            </div>
          )}

          {/* Step 5: Generate Code */}
          {currentStep === 4 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs font-600 text-white mb-0.5">Your embed code is ready</p>
                  <p className="text-[11px] text-white/35">Paste this before the closing &lt;/body&gt; tag</p>
                </div>
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-500 transition-all ${
                    copied
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' :'border-white/15 text-white/60 hover:bg-white/8'
                  }`}
                >
                  {copied ? <CheckCheck size={12} /> : <Copy size={12} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="code-block p-4 overflow-x-auto">
                <pre className="text-xs font-mono leading-relaxed">
                  <span className="text-blue-400">&lt;script</span>
                  <span className="text-white/60"> src=</span>
                  <span className="text-emerald-400">&quot;https://cdn.personamatrix.ai/widget.js&quot;</span>
                  <span className="text-white/60"> defer</span>
                  <span className="text-blue-400">&gt;&lt;/script&gt;</span>
                  {'\n'}
                  <span className="text-blue-400">&lt;script&gt;</span>
                  {'\n  '}
                  <span className="text-purple-400">PersonaMatrix</span>
                  <span className="text-white/70">.init(&#123;</span>
                  {'\n    '}
                  <span className="text-sky-300">personaId</span>
                  <span className="text-white/50">: </span>
                  <span className="text-emerald-400">&quot;{personaId}&quot;</span>
                  <span className="text-white/50">,</span>
                  {'\n    '}
                  <span className="text-sky-300">apiKey</span>
                  <span className="text-white/50">: </span>
                  <span className="text-emerald-400">&quot;pk_live_xxxxxxxxxxxxxxxx&quot;</span>
                  <span className="text-white/50">,</span>
                  {'\n    '}
                  <span className="text-sky-300">position</span>
                  <span className="text-white/50">: </span>
                  <span className="text-emerald-400">&quot;{config.position}&quot;</span>
                  <span className="text-white/50">,</span>
                  {'\n    '}
                  <span className="text-sky-300">theme</span>
                  <span className="text-white/50">: </span>
                  <span className="text-emerald-400">&quot;{config.theme}&quot;</span>
                  {'\n  '}
                  <span className="text-white/70">&#125;);</span>
                  {'\n'}
                  <span className="text-blue-400">&lt;/script&gt;</span>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/6">
          <button
            onClick={() => currentStep > 0 ? setCurrentStep(currentStep - 1) : onClose()}
            className="px-4 py-2 rounded-xl border border-white/10 text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all"
          >
            {currentStep === 0 ? 'Cancel' : 'Back'}
          </button>
          {currentStep < STEPS.length - 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canNext()}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-600 text-white transition-all ${
                canNext() ? 'btn-primary' : 'bg-white/8 text-white/30 cursor-not-allowed'
              }`}
            >
              Continue <ChevronRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="btn-primary flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-600 text-white"
            >
              <Check size={14} /> Deploy Plugin
            </button>
          )}
        </div>
      </div>
    </div>
  );
}