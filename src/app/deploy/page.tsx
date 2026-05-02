'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';

const personas = [
  { id: 'finance-priya', name: 'FinanceCoach — Priya', role: 'Finance Creator', initials: 'FP', color: 'from-purple-500 to-blue-500' },
  { id: 'course-jordan', name: 'CourseGuide — Jordan', role: 'Course Builder', initials: 'CJ', color: 'from-teal-500 to-emerald-500' },
  { id: 'coach-dani', name: 'Coach Dani', role: 'Life Coach', initials: 'CD', color: 'from-orange-500 to-pink-500' },
  { id: 'mindset-ravi', name: 'MindsetPro — Ravi', role: 'Mindset Coach', initials: 'MR', color: 'from-blue-500 to-cyan-500' },
  { id: 'priya-trades', name: 'Priya Trades', role: 'Trading Educator', initials: 'PT', color: 'from-pink-500 to-rose-500' },
  { id: 'marcus-wealth', name: 'Marcus Wealth', role: 'Wealth Creator', initials: 'MW', color: 'from-violet-500 to-purple-500' },
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
    id: 'whatsapp',
    title: 'WhatsApp',
    desc: 'Let your audience chat with your persona on WhatsApp Business',
    icon: '📱',
    tag: 'Popular',
    color: 'border-emerald-500/40 bg-emerald-500/8',
    activeColor: 'border-emerald-500/60 bg-emerald-500/15',
  },
  {
    id: 'course-platform',
    title: 'Course Platform',
    desc: 'Embed inside your Teachable, Kajabi, or Thinkific course',
    icon: '🎓',
    tag: 'Recommended',
    color: 'border-teal-500/40 bg-teal-500/8',
    activeColor: 'border-teal-500/60 bg-teal-500/15',
  },
  {
    id: 'slack',
    title: 'Community / Slack',
    desc: 'Add your persona as a bot in your creator community or Slack group',
    icon: '💬',
    tag: 'Beta',
    color: 'border-amber-500/40 bg-amber-500/8',
    activeColor: 'border-amber-500/60 bg-amber-500/15',
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
        subtitle="Get your creator persona live — on your site, course platform, or WhatsApp"
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
              {personas.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPersona(p.id)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                    selectedPersona === p.id
                      ? 'border-[#7c3aed]/50 bg-[#7c3aed]/10'
                      : 'border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/5'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {p.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                    <p className="text-xs text-white/40 mt-0.5">{p.role}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
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
              ))}
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
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${persona?.color} flex items-center justify-center text-white text-[10px] font-bold`}>
                  {persona?.initials}
                </div>
                <span className="text-xs text-white/50">Deploying <span className="text-white font-medium">{persona?.name}</span></span>
              </div>
              <h2 className="text-base font-semibold text-white mb-1">Where do you want to deploy?</h2>
              <p className="text-xs text-white/40">Choose one channel for this deployment. You can add more later.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChannel(ch.id)}
                  className={`relative flex flex-col gap-3 p-4 rounded-2xl border text-left transition-all ${
                    selectedChannel === ch.id
                      ? ch.activeColor
                      : 'border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/5'
                  }`}
                >
                  {ch.tag && (
                    <span className={`absolute top-3 right-3 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                      ch.tag === 'Recommended' ? 'bg-[#14b8a6]/20 text-[#14b8a6] border border-[#14b8a6]/30' :
                      ch.tag === 'Popular'? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {ch.tag}
                    </span>
                  )}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{ch.icon}</span>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ml-auto ${
                        selectedChannel === ch.id ? 'border-white bg-white' : 'border-white/20'
                      }`}
                    >
                      {selectedChannel === ch.id && (
                        <div className="w-2 h-2 rounded-full bg-[#0a0c12]" />
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{ch.title}</p>
                    <p className="text-xs text-white/45 mt-0.5 leading-relaxed">{ch.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(0)}
                className="px-4 py-2.5 rounded-xl text-sm text-white/40 hover:text-white transition-colors"
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
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${persona?.color} flex items-center justify-center text-white text-[10px] font-bold`}>
                  {persona?.initials}
                </div>
                <span className="text-xs text-white/50">
                  <span className="text-white font-medium">{persona?.name}</span>
                  <span className="mx-1.5 text-white/20">→</span>
                  <span className="text-white font-medium">{channel?.icon} {channel?.title}</span>
                </span>
              </div>
              <h2 className="text-base font-semibold text-white mb-1">Configure your deployment</h2>
              <p className="text-xs text-white/40">Set up options and copy the embed code to go live.</p>
            </div>

            <div className="space-y-4 mb-6">
              {/* WhatsApp special case */}
              {selectedChannel === 'whatsapp' && (
                <div className="rounded-2xl border border-[#34d399]/20 bg-[#34d399]/6 p-5">
                  <p className="text-sm font-semibold text-white mb-1">Connect WhatsApp Business</p>
                  <p className="text-xs text-white/50 leading-relaxed mb-4">
                    Link your WhatsApp Business number to deploy <strong className="text-white/70">{persona?.name}</strong>. Requires WhatsApp Business API access.
                  </p>
                  <div className="flex flex-col gap-3">
                    <div>
                      <label className="text-xs text-white/40 block mb-1.5">Phone Number</label>
                      <input
                        type="text"
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#34d399]/40 transition-all"
                      />
                    </div>
                    <button className="self-start text-xs px-4 py-2 rounded-lg border border-[#34d399]/40 text-[#34d399] hover:bg-[#34d399]/10 transition-all font-medium">
                      Connect WhatsApp →
                    </button>
                  </div>
                </div>
              )}

              {/* Community / Slack special case */}
              {selectedChannel === 'slack' && (
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/6 p-5">
                  <p className="text-sm font-semibold text-white mb-1">Connect Community / Slack</p>
                  <p className="text-xs text-white/50 leading-relaxed mb-4">
                    Authorize PersonaMatrix to add <strong className="text-white/70">{persona?.name}</strong> as a bot in your creator community or Slack workspace.
                  </p>
                  <button className="self-start text-xs px-4 py-2 rounded-lg border border-amber-500/40 text-amber-400 hover:bg-amber-500/10 transition-all font-medium">
                    Add to Slack →
                  </button>
                </div>
              )}

              {/* Web / Course Platform config */}
              {(selectedChannel === 'web' || selectedChannel === 'course-platform') && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-white/50 block mb-2">Theme</label>
                      <div className="flex gap-2">
                        {['dark', 'light'].map((t) => (
                          <button
                            key={t}
                            onClick={() => setConfig({ ...config, theme: t })}
                            className={`flex-1 py-2 rounded-lg border text-xs font-medium capitalize transition-all ${
                              config.theme === t
                                ? 'border-[#7c3aed]/50 bg-[#7c3aed]/15 text-[#a78bfa]'
                                : 'border-white/8 text-white/40 hover:bg-white/5'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    {selectedChannel === 'web' && (
                      <div>
                        <label className="text-xs font-medium text-white/50 block mb-2">Position</label>
                        <div className="flex gap-2">
                          {['bottom-right', 'bottom-left'].map((pos) => (
                            <button
                              key={pos}
                              onClick={() => setConfig({ ...config, position: pos })}
                              className={`flex-1 py-2 rounded-lg border text-[11px] font-medium transition-all ${
                                config.position === pos
                                  ? 'border-[#7c3aed]/50 bg-[#7c3aed]/15 text-[#a78bfa]'
                                  : 'border-white/8 text-white/40 hover:bg-white/5'
                              }`}
                            >
                              {pos === 'bottom-right' ? '↘ Right' : '↙ Left'}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-white/50 block mb-2">Domain Restriction <span className="text-white/25 font-normal">(optional)</span></label>
                    <input
                      type="text"
                      value={config.domain}
                      onChange={(e) => setConfig({ ...config, domain: e.target.value })}
                      placeholder="yourcoursesite.com"
                      className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#7c3aed]/40 transition-all"
                    />
                    <p className="text-[10px] text-white/25 mt-1.5">Only allow the widget to load on this domain.</p>
                  </div>

                  {/* Embed code */}
                  <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/6">
                      <div>
                        <p className="text-xs font-semibold text-white">
                          {selectedChannel === 'course-platform' ? 'Course Platform Embed Code' : 'Embed Code'}
                        </p>
                        <p className="text-[10px] text-white/35 mt-0.5">
                          {selectedChannel === 'course-platform'
                            ? 'Add to your course platform custom code section' :'Paste before the closing </body> tag'}
                        </p>
                      </div>
                      <button
                        onClick={handleCopy}
                        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${
                          copied
                            ? 'border-[#34d399]/40 text-[#34d399] bg-[#34d399]/10'
                            : 'border-white/10 text-white/55 hover:text-white hover:border-white/25'
                        }`}
                      >
                        {copied ? (
                          <>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                            Copy Code
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-4">
                      <pre
                        className="text-xs text-[#a78bfa] leading-relaxed overflow-x-auto p-3 rounded-xl"
                        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.12)' }}
                      >
                        {snippet}
                      </pre>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl text-sm text-white/40 hover:text-white transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleDeploy}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold btn-primary text-white flex items-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 2L11 13" /><path d="M22 2L15 22l-4-9-9-4 20-7z" />
                </svg>
                Deploy Now
              </button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
