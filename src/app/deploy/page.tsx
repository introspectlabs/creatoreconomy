'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';

const deployOptions = [
  {
    id: 'web',
    title: 'Web Embed',
    desc: 'Add your AI persona to any website with a JS snippet',
    icon: '💻',
    color: '#7c3aed',
    primary: false,
  },
  {
    id: 'shopify',
    title: 'Shopify Plugin',
    desc: 'Install directly into your Shopify store — recommended for D2C brands',
    icon: '🛍️',
    color: '#14b8a6',
    primary: true,
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    desc: 'Connect your WhatsApp Business number to deploy on WhatsApp',
    icon: '📱',
    color: '#34d399',
    primary: false,
  },
];

const webSnippet = `<!-- PersonaMatrix AI Widget -->
<script>
  window.PersonaMatrix = {
    personaId: "glow-ai",
    position: "bottom-right",
    theme: "dark"
  };
</script>
<script src="https://cdn.personamatrix.ai/widget.js" async></script>`;

const shopifySnippet = `{% comment %} PersonaMatrix Shopify App {% endcomment %}
{{ 'personamatrix.js' | asset_url | script_tag }}
<script>
  PersonaMatrix.init({ personaId: "glow-ai" });
</script>`;

export default function DeployPage() {
  const [activeChannel, setActiveChannel] = useState<'web' | 'shopify' | 'whatsapp'>('shopify');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const snippet = activeChannel === 'shopify' ? shopifySnippet : webSnippet;

  return (
    <AppLayout>
      <Topbar
        title="Deploy"
        subtitle="Get your AI salesperson live on your store"
      />

      {/* Channel selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {deployOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setActiveChannel(opt.id as 'web' | 'shopify' | 'whatsapp')}
            className={`relative flex flex-col gap-3 p-5 rounded-2xl border text-left transition-all ${
              activeChannel === opt.id
                ? 'border-white/20 bg-white/6' :'border-white/8 bg-white/[0.03] hover:border-white/15'
            }`}
          >
            {opt.primary && (
              <span className="absolute top-3 right-3 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#14b8a6]/20 text-[#14b8a6] border border-[#14b8a6]/30">
                Recommended
              </span>
            )}
            <div className="flex items-center gap-3">
              <span className="text-2xl">{opt.icon}</span>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ml-auto ${
                  activeChannel === opt.id ? 'border-white bg-white' : 'border-white/20'
                }`}
              >
                {activeChannel === opt.id && (
                  <div className="w-2 h-2 rounded-full bg-[#0a0c12]" />
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{opt.title}</p>
              <p className="text-xs text-white/45 mt-0.5 leading-relaxed">{opt.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Code snippet */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
            <div>
              <h2 className="text-sm font-semibold text-white">
                {activeChannel === 'shopify' ? 'Shopify Installation' : activeChannel === 'web' ? 'Web Embed Code' : 'WhatsApp Setup'}
              </h2>
              <p className="text-xs text-white/40 mt-0.5">
                {activeChannel === 'shopify'
                  ? 'Add to your Shopify theme.liquid file'
                  : activeChannel === 'web' ?'Paste before the closing </body> tag' :'Connect your WhatsApp Business number'}
              </p>
            </div>
            {activeChannel !== 'whatsapp' && (
              <button
                onClick={() => handleCopy(snippet)}
                className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  copied
                    ? 'border-[#34d399]/40 text-[#34d399] bg-[#34d399]/10'
                    : 'border-white/10 text-white/55 hover:text-white hover:border-white/25'
                }`}
              >
                {copied ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy Code
                  </>
                )}
              </button>
            )}
          </div>

          {activeChannel !== 'whatsapp' ? (
            <div className="p-5">
              <pre
                className="text-xs text-[#a78bfa] leading-relaxed overflow-x-auto p-4 rounded-xl"
                style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.15)' }}
              >
                {snippet}
              </pre>
            </div>
          ) : (
            <div className="p-5 flex flex-col gap-4">
              <div className="p-4 rounded-xl border border-[#34d399]/20 bg-[#34d399]/6">
                <p className="text-sm font-medium text-white mb-1">Connect WhatsApp Business</p>
                <p className="text-xs text-white/50 leading-relaxed mb-3">
                  Link your WhatsApp Business number to deploy your AI persona on WhatsApp. Requires WhatsApp Business API access.
                </p>
                <button className="text-xs px-4 py-2 rounded-lg border border-[#34d399]/40 text-[#34d399] hover:bg-[#34d399]/10 transition-all">
                  Connect WhatsApp →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Deployment checklist */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Deployment Checklist</h2>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Persona created', done: true },
                { label: 'Shopify catalog synced', done: true },
                { label: 'Persona tested in chat', done: false },
                { label: 'Embed code installed', done: false },
                { label: 'Domain restriction set', done: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      item.done ? 'border-[#34d399] bg-[#34d399]' : 'border-white/20'
                    }`}
                  >
                    {item.done && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm ${item.done ? 'text-white/60 line-through' : 'text-white'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
            <h2 className="text-sm font-semibold text-white mb-3">Quick Links</h2>
            <div className="flex flex-col gap-2">
              {[
                { href: '/chat/glow-ai', label: 'Test Persona in Chat', icon: '💬' },
                { href: '/embeds', label: 'Manage Embeds & Widgets', icon: '🔌' },
                { href: '/analytics', label: 'View Conversion Analytics', icon: '📊' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/6 hover:border-white/15 hover:bg-white/4 transition-all group"
                >
                  <span>{link.icon}</span>
                  <span className="text-sm text-white/60 group-hover:text-white transition-colors">{link.label}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto text-white/20 group-hover:text-white/50 transition-colors">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
