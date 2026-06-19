'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';

type Domain = 'Finance' | 'Education' | 'Coaching';

const domainColors: Record<Domain, { text: string; bg: string; border: string; emoji: string }> = {
  Finance:   { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', emoji: '📈' },
  Education: { text: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/25',    emoji: '🎓' },
  Coaching:  { text: 'text-orange-400',  bg: 'bg-orange-500/10',  border: 'border-orange-500/25',  emoji: '🧭' },
};

const personas = [
  { id: 'finance-priya',  name: 'FinanceCoach — Priya',  domain: 'Finance' as Domain,   initials: 'FP', color: 'from-purple-500 to-blue-500'   },
  { id: 'course-jordan',  name: 'CourseGuide — Jordan',  domain: 'Education' as Domain, initials: 'CJ', color: 'from-teal-500 to-emerald-500'  },
  { id: 'coach-dani',     name: 'Coach Dani',            domain: 'Coaching' as Domain,  initials: 'CD', color: 'from-orange-500 to-pink-500'   },
  { id: 'mindset-ravi',   name: 'MindsetPro — Ravi',     domain: 'Coaching' as Domain,  initials: 'MR', color: 'from-blue-500 to-cyan-500'     },
  { id: 'priya-trades',   name: 'Priya Trades',          domain: 'Finance' as Domain,   initials: 'PT', color: 'from-pink-500 to-rose-500'     },
  { id: 'marcus-wealth',  name: 'Marcus Wealth',         domain: 'Finance' as Domain,   initials: 'MW', color: 'from-violet-500 to-purple-500' },
];

const channels = [
  {
    id: 'web',
    title: 'Web Embed',
    desc: 'Add a floating chat widget to your website, landing page, or course portal',
    icon: '💻',
    tag: null,
    color: 'border-purple-500/40 bg-purple-500/8',
    activeColor: 'border-purple-500/60 bg-purple-500/15',
  },
  {
    id: 'text-chat',
    title: 'Text Chat',
    desc: 'Deploy a hosted text chat page your audience can access directly via link',
    icon: '💬',
    tag: 'Recommended',
    color: 'border-teal-500/40 bg-teal-500/8',
    activeColor: 'border-teal-500/60 bg-teal-500/15',
  },
];

const STEPS = ['Select Persona', 'Choose Channel', 'Configure & Deploy'];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((label, i) => (
        <React.Fragment key={label}>
          <div className="flex items-center gap-2.5">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                i < current
                  ? 'bg-[#34d399] text-[#0a0c12]'
                  : i === current
                  ? 'bg-[#7c3aed] text-white'
                  : 'bg-white/8 text-white/30'
              }`}
            >
              {i < current ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`text-xs font-medium hidden sm:block ${
                i === current ? 'text-white' : i < current ? 'text-white/50' : 'text-white/25'
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`flex-1 h-px mx-3 max-w-16 transition-all ${
                i < current ? 'bg-[#34d399]/40' : 'bg-white/10'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function DeployPage() {
  const [step, setStep] = useState(0);
  const [selectedPersona, setSelectedPersona] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('');
  const [config, setConfig] = useState({ theme: 'dark', position: 'bottom-right', domain: '' });
  const [copied, setCopied] = useState(false);
  const [deployed, setDeployed] = useState(false);

  const persona = personas.find((p) => p.id === selectedPersona);
  const channel = channels.find((c) => c.id === selectedChannel);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://personamat4842.builtwithrocket.new';
  const publicChatUrl = selectedPersona ? `${siteUrl}/chat/${selectedPersona}` : '';

  const webSnippet = `<!-- PersonaMatrix Creator Widget -->
<script>
  window.PersonaMatrix = {
    personaId: "${selectedPersona || 'your-persona-id'}",
    position: "${config.position}",
    theme: "${config.theme}",
    allowedDomains: ["${config.domain || 'yourdomain.com'}"]
  };
</script>
<script src="https://cdn.personamatrix.ai/widget.js" async></script>`;

  const coursePlatformSnippet = `<!-- PersonaMatrix Course Widget -->
<script>
  window.PersonaMatrix = {
    personaId: "${selectedPersona || 'your-persona-id'}",
    theme: "${config.theme}",
    context: "course"
  };
</script>
<script src="https://cdn.personamatrix.ai/widget.js" async></script>`;

  const snippet = selectedChannel === 'course-platform' ? coursePlatformSnippet : webSnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(publicChatUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDeploy = () => {
    setDeployed(true);
  };

  if (deployed) {
    return (
      <AppLayout>
        <Topbar title="Deploy" subtitle="Get your creator persona live on your channels" />
        <div className="max-w-lg mx-auto text-center py-16">
          <div className="w-16 h-16 rounded-full bg-[#34d399]/15 border border-[#34d399]/30 flex items-center justify-center mx-auto mb-5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Deployment Successful!</h2>
          <p className="text-sm text-white/45 mb-2">
            <span className="text-white font-medium">{persona?.name}</span> is now live on{' '}
            <span className="text-white font-medium">{channel?.title}</span>
          </p>
          {persona && (
            <div className="flex items-center justify-center gap-1.5 mb-2">
              {(() => {
                const cfg = domainColors[persona.domain];
                return (
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cfg.text} ${cfg.bg} ${cfg.border}`}>
                    {cfg.emoji} {persona.domain}
                  </span>
                );
              })()}
            </div>
          )}
          {config.domain && (
            <p className="text-xs text-white/30 font-mono mb-8">{config.domain}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/embeds"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary"
            >
              View All Embeds
            </Link>
            <button
              onClick={() => { setStep(0); setSelectedPersona(''); setSelectedChannel(''); setDeployed(false); }}
              className="px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all"
            >
              Deploy Another
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Topbar
        title="Deploy"
        subtitle="Get your creator persona live — on your site or as a hosted chat"
        action={
          <Link href="/embeds" className="text-xs text-white/40 hover:text-white transition-colors flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
            Manage Embeds
          </Link>
        }
      />

      <div className="max-w-2xl mx-auto">
        <StepIndicator current={step} />

        {/* Step 0: Select Persona */}
        {step === 0 && (
          <div>
            <div className="mb-5">
              <h2 className="text-base font-semibold text-white mb-1">Which creator persona do you want to deploy?</h2>
              <p className="text-xs text-white/40">Select the AI persona that will engage your audience.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {personas.map((p) => {
                const cfg = domainColors[p.domain];
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPersona(p.id)}
                    className={`flex items-start gap-3 p-4 rounded-2xl border text-left transition-all ${
                      selectedPersona === p.id
                        ? 'border-[#7c3aed]/50 bg-[#7c3aed]/10'
                        : 'border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                      {p.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white truncate mb-1">{p.name}</p>
                      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${cfg.text} ${cfg.bg} ${cfg.border}`}>
                        {cfg.emoji} {p.domain}
                      </span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                        selectedPersona === p.id ? 'border-[#7c3aed] bg-[#7c3aed]' : 'border-white/20'
                      }`}
                    >
                      {selectedPersona === p.id && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-end">
              <button
                disabled={!selectedPersona}
                onClick={() => setStep(1)}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  selectedPersona
                    ? 'btn-primary text-white' : 'bg-white/5 text-white/25 cursor-not-allowed border border-white/8'
                }`}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Choose Channel */}
        {step === 1 && (
          <div>
            <div className="mb-5">
              <h2 className="text-base font-semibold text-white mb-1">Where do you want to deploy?</h2>
              <p className="text-xs text-white/40">Choose the channel where your audience will chat with <span className="text-white">{persona?.name}</span>.</p>
              {persona && (
                <div className="flex items-center gap-1.5 mt-2">
                  {(() => {
                    const cfg = domainColors[persona.domain];
                    return (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cfg.text} ${cfg.bg} ${cfg.border}`}>
                        {cfg.emoji} {persona.domain}
                      </span>
                    );
                  })()}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {channels.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedChannel(c.id)}
                  className={`flex items-start gap-3 p-4 rounded-2xl border text-left transition-all ${
                    selectedChannel === c.id ? c.activeColor : `${c.color} hover:opacity-90`
                  }`}
                >
                  <span className="text-2xl flex-shrink-0">{c.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-white">{c.title}</p>
                      {c.tag && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/10 text-white/60 border border-white/15">
                          {c.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/45 leading-relaxed">{c.desc}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                      selectedChannel === c.id ? 'border-white bg-white' : 'border-white/20'
                    }`}
                  >
                    {selectedChannel === c.id && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0a0c12" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Public URL preview when Text Chat is selected */}
            {selectedChannel === 'text-chat' && selectedPersona && (
              <div className="mb-6 rounded-2xl border border-teal-500/25 bg-teal-500/8 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-teal-400">🔗</span>
                  <p className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Public Chat URL</p>
                </div>
                <p className="text-xs text-white/50 mb-3">Your audience can access <span className="text-white font-medium">{persona?.name}</span> directly at:</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-white/10 bg-black/30">
                    <p className="text-xs font-mono text-teal-300 truncate">{publicChatUrl}</p>
                  </div>
                  <button
                    onClick={handleCopyUrl}
                    className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-semibold border border-teal-500/30 text-teal-400 hover:bg-teal-500/15 transition-all"
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                  <a
                    href={publicChatUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-semibold border border-white/10 text-white/50 hover:text-white hover:border-white/25 transition-all"
                  >
                    Open ↗
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(0)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all"
              >
                ← Back
              </button>
              <button
                disabled={!selectedChannel}
                onClick={() => setStep(2)}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  selectedChannel
                    ? 'btn-primary text-white' : 'bg-white/5 text-white/25 cursor-not-allowed border border-white/8'
                }`}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Configure & Deploy */}
        {step === 2 && (
          <div>
            <div className="mb-5">
              <h2 className="text-base font-semibold text-white mb-1">Configure & Deploy</h2>
              <p className="text-xs text-white/40">
                Deploying <span className="text-white">{persona?.name}</span> to <span className="text-white">{channel?.title}</span>
              </p>
              {persona && (
                <div className="flex items-center gap-1.5 mt-2">
                  {(() => {
                    const cfg = domainColors[persona.domain];
                    return (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cfg.text} ${cfg.bg} ${cfg.border}`}>
                        {cfg.emoji} {persona.domain}
                      </span>
                    );
                  })()}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 mb-4 flex flex-col gap-4">
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Allowed Domain</label>
                  <input
                    type="text"
                    value={config.domain}
                    onChange={(e) => setConfig({ ...config, domain: e.target.value })}
                    placeholder="yourdomain.com"
                    className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#7c3aed]/50 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Theme</label>
                  <div className="flex gap-2">
                    {['dark', 'light'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setConfig({ ...config, theme: t })}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all capitalize ${
                          config.theme === t
                            ? 'border-[#7c3aed]/50 bg-[#7c3aed]/10 text-white'
                            : 'border-white/8 text-white/40 hover:text-white/70'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                {selectedChannel === 'web' && (
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Widget Position</label>
                    <div className="flex gap-2 flex-wrap">
                      {['bottom-right', 'bottom-left', 'top-right'].map((pos) => (
                        <button
                          key={pos}
                          onClick={() => setConfig({ ...config, position: pos })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            config.position === pos
                              ? 'border-[#7c3aed]/50 bg-[#7c3aed]/10 text-white'
                              : 'border-white/8 text-white/40 hover:text-white/70'
                          }`}
                        >
                          {pos}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Embed Snippet</label>
                  <div className="relative">
                    <pre className="px-4 py-3 rounded-xl border border-white/8 bg-black/30 text-[11px] text-white/60 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                      {snippet}
                    </pre>
                    <button
                      onClick={handleCopy}
                      className="absolute top-2 right-2 px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-white/10 text-white/50 hover:text-white hover:border-white/25 transition-all bg-black/40"
                    >
                      {copied ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Public URL section for Text Chat in configure step */}
                {selectedChannel === 'text-chat' && (
                  <div className="rounded-xl border border-teal-500/25 bg-teal-500/8 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-teal-400">🔗</span>
                      <p className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Persona Public URL</p>
                    </div>
                    <p className="text-xs text-white/50 mb-3">Share this link with your audience to start chatting with <span className="text-white font-medium">{persona?.name}</span>:</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-white/10 bg-black/30">
                        <p className="text-xs font-mono text-teal-300 truncate">{publicChatUrl}</p>
                      </div>
                      <button
                        onClick={handleCopyUrl}
                        className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-semibold border border-teal-500/30 text-teal-400 hover:bg-teal-500/15 transition-all"
                      >
                        {copied ? '✓ Copied' : 'Copy'}
                      </button>
                      <a
                        href={publicChatUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-semibold border border-white/10 text-white/50 hover:text-white hover:border-white/25 transition-all"
                      >
                        Open ↗
                      </a>
                    </div>
                  </div>
                )}
              </>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all"
              >
                ← Back
              </button>
              <button
                onClick={handleDeploy}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary"
              >
                🚀 Deploy Persona
              </button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
