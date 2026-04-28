'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

const codeSnippets = {
  embed: `<script src="https://cdn.personamatrix.ai/widget.js"></script>
<script>
  PersonaMatrix.init({
    personaId: "abc123",
    theme: "dark",
    position: "bottom-right"
  });
</script>`,
  rest: `curl -X POST https://api.personamatrix.ai/v1/chat \\
  -H "Authorization: Bearer pm_sk_..." \ -H"Content-Type: application/json" \\
  -d '{
    "personaId": "abc123",
    "message": "What are your pricing plans?",
    "sessionId": "user_session_xyz"
  }'`,
  webhook: `// Webhook payload example
{
  "event": "message.received",
  "personaId": "abc123",
  "sessionId": "user_session_xyz",
  "message": {
    "role": "user",
    "content": "Hello!",
    "timestamp": "2026-04-03T19:30:25Z"
  }
}`,
};

function CodeBlock({ code, lang = 'html' }: { code: string; lang?: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="code-block relative group">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8">
        <span className="text-xs text-white/30 font-mono">{lang}</span>
        <button
          onClick={copy}
          className="text-xs text-white/30 hover:text-white transition-colors flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <path d="M8 4V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono text-white/70 overflow-x-auto leading-relaxed whitespace-pre">{code}</pre>
    </div>
  );
}

const apiFeatures = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'REST APIs',
    desc: 'Full CRUD for personas, knowledge bases, sessions, and analytics. OpenAPI spec included.',
    color: '#7c3aed',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    title: 'Webhooks',
    desc: 'Real-time event delivery for messages, sessions, escalations, and persona state changes.',
    color: '#3b82f6',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Real-time Streaming',
    desc: 'Server-sent events for token-by-token streaming. Build fluid, low-latency chat UIs.',
    color: '#14b8a6',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: 'Multi-tenant Support',
    desc: 'Namespace personas per organization. Full RBAC, audit logs, and isolated data planes.',
    color: '#7c3aed',
  },
];

export default function DevelopersPage() {
  const [activeTab, setActiveTab] = React.useState<'embed' | 'rest' | 'webhook'>('embed');

  return (
    <div className="min-h-screen bg-[#0a0c12] text-white overflow-x-hidden">
      <PublicHeader />

      {/* Hero */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#10b981]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 mb-6">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <polyline points="2 6 5 9 10 3" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs font-medium text-[#10b981]">Developer Platform</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              Embed your{' '}
              <span className="text-gradient">AI Sales Agent</span>
            </h1>
            <p className="text-base sm:text-lg text-white/55 leading-relaxed max-w-xl mb-8">
              REST APIs, embeddable widgets, Shopify plugins, and real-time streaming. Everything you need to deploy your AI Sales Agent on any channel — web, WhatsApp, or voice.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link href="/register" className="px-5 sm:px-6 py-3 rounded-xl font-semibold text-white btn-primary text-sm">
                Get API Keys
              </Link>
              <a href="#" className="px-5 sm:px-6 py-3 rounded-xl font-semibold text-white/70 border border-white/12 hover:border-white/25 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm">
                Read the Docs →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* API & SDK Overview */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            <div>
              <p className="text-xs font-semibold text-[#3b82f6] uppercase tracking-widest mb-4">SDK & Embed</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
                Drop in a widget.<br />Or go full API.
              </h2>
              <p className="text-white/50 leading-relaxed mb-8">
                Two lines of code to embed a fully branded AI chat widget. Or use our REST API for complete control over the conversation experience.
              </p>

              {/* Tab switcher */}
              <div className="flex gap-1 p-1 glass rounded-xl border border-white/8 w-fit mb-4 overflow-x-auto max-w-full">
                {(['embed', 'rest', 'webhook'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 whitespace-nowrap ${
                      activeTab === tab
                        ? 'bg-[#7c3aed] text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]'
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {tab === 'embed' ? 'Embed' : tab === 'rest' ? 'REST API' : 'Webhooks'}
                  </button>
                ))}
              </div>

              <CodeBlock
                code={codeSnippets[activeTab]}
                lang={activeTab === 'embed' ? 'html' : activeTab === 'rest' ? 'bash' : 'json'}
              />
            </div>

            {/* Stats / highlights */}
            <div className="flex flex-col gap-4">
              <div className="glass-elevated rounded-2xl p-5 sm:p-6 border border-white/8">
                <div className="text-3xl sm:text-4xl font-extrabold text-gradient mb-1">{'<'}2ms</div>
                <div className="text-sm text-white/50">Median API response latency (p50)</div>
              </div>
              <div className="glass-elevated rounded-2xl p-5 sm:p-6 border border-white/8">
                <div className="text-3xl sm:text-4xl font-extrabold text-gradient mb-1">99.9%</div>
                <div className="text-sm text-white/50">Uptime SLA on all API endpoints</div>
              </div>
              <div className="glass-elevated rounded-2xl p-5 sm:p-6 border border-white/8">
                <div className="text-3xl sm:text-4xl font-extrabold text-gradient mb-1">50+</div>
                <div className="text-sm text-white/50">API endpoints across personas, channels, and analytics</div>
              </div>
              <div className="glass-elevated rounded-2xl p-5 sm:p-6 border border-white/8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#14b8a6]/20 border border-[#14b8a6]/30 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="1.8">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">SOC 2 Type II</div>
                  <div className="text-xs text-white/40">Certified. All data encrypted at rest and in transit.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Features */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-xs font-semibold text-[#7c3aed] uppercase tracking-widest mb-3">Platform Features</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">The full developer toolkit</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {apiFeatures.map((f) => (
              <div key={f.title} className="glass-elevated rounded-2xl p-5 sm:p-6 border border-white/8 card-hover flex flex-col gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${f.color}25`, border: `1px solid ${f.color}30` }}
                >
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1.5">{f.title}</h3>
                  <p className="text-xs text-white/45 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-elevated rounded-3xl border border-white/10 p-8 sm:p-14 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/8 to-[#7c3aed]/8 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">Ready to integrate?</h2>
              <p className="text-white/50 mb-8">Get your API keys and start building in minutes. No approval process.</p>
              <Link href="/register" className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-white btn-primary text-sm inline-block shadow-[0_0_24px_rgba(124,58,237,0.35)]">
                Get API Keys →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
