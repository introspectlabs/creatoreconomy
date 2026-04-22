'use client';

import React, { useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Copy, CheckCheck, Code2, Smartphone, Monitor, Tablet,
  Globe, Zap, Shield, Layers, RefreshCw, ExternalLink, ChevronDown,
  MessageSquare, Mic, Video, Palette, Settings2, Eye
} from 'lucide-react';
import { toast } from 'sonner';
import PersonaMatrixWidget, { WidgetConfig } from '../components/PersonaMatrixWidget';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';

const VIEWPORTS = [
  { id: 'desktop', label: 'Desktop', icon: Monitor, width: '100%' },
  { id: 'tablet', label: 'Tablet', icon: Tablet, width: '768px' },
  { id: 'mobile', label: 'Mobile', icon: Smartphone, width: '375px' },
] as const;

function buildEmbedCode(cfg: WidgetConfig, variant: string): string {
  const base = `https://cdn.personamatrix.ai/widget.js`;
  const opts = JSON.stringify({
    personaId: cfg.personaId,
    apiKey: 'pk_live_xxxxxxxxxxxxxxxx',
    personaName: cfg.personaName,
    greeting: cfg.greeting,
    theme: cfg.theme,
    position: cfg.position,
    modes: cfg.modes,
  }, null, 2);

  if (variant === 'html') {
    return `<!-- PersonaMatrix Widget -->
<script src="${base}" defer></script>
<script>
  window.PersonaMatrix = window.PersonaMatrix || {};
  window.PersonaMatrix.queue = window.PersonaMatrix.queue || [];
  window.PersonaMatrix.queue.push(function() {
    PersonaMatrix.init(${opts});
  });
</script>`;
  }
  if (variant === 'react') {
    return `// Install: npm install @personamatrix/widget
import { PersonaMatrixWidget } from '@personamatrix/widget';

export default function App() {
  return (
    <PersonaMatrixWidget
      personaId="${cfg.personaId}"
      apiKey="pk_live_xxxxxxxxxxxxxxxx"
      personaName="${cfg.personaName}"
      theme="${cfg.theme}"
      position="${cfg.position}"
      modes={${JSON.stringify(cfg.modes)}}
      onMessage={(msg) => console.log('Message:', msg)}
      onOpen={() => console.log('Widget opened')}
    />
  );
}`;
  }
  if (variant === 'nextjs') {
    return `// app/layout.tsx
'use client';
import dynamic from 'next/dynamic';

const PersonaMatrixWidget = dynamic(
  () => import('@personamatrix/widget'),
  { ssr: false }
);

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <PersonaMatrixWidget
          personaId="${cfg.personaId}"
          apiKey="pk_live_xxxxxxxxxxxxxxxx"
          theme="${cfg.theme}"
          position="${cfg.position}"
          modes={${JSON.stringify(cfg.modes)}}
        />
      </body>
    </html>
  );
}`;
  }
  if (variant === 'shopify') {
    return `<!-- Add to theme.liquid before </body> -->
<script src="${base}" defer></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    PersonaMatrix.init({
      personaId: "${cfg.personaId}",
      apiKey: "pk_live_xxxxxxxxxxxxxxxx",
      theme: "${cfg.theme}",
      position: "${cfg.position}",
      modes: ${JSON.stringify(cfg.modes)},
      metadata: {
        customerId: "{{ customer.id }}",
        customerEmail: "{{ customer.email }}",
        cartTotal: "{{ cart.total_price | money }}"
      }
    });
  });
</script>`;
  }
  if (variant === 'wordpress') {
    return `<?php
// Add to functions.php
function personamatrix_widget() {
  ?>
  <script src="${base}" defer></script>
  <script>
    PersonaMatrix.init({
      personaId: "${cfg.personaId}",
      apiKey: "pk_live_xxxxxxxxxxxxxxxx",
      theme: "${cfg.theme}",
      position: "${cfg.position}",
      modes: ${JSON.stringify(cfg.modes)}
    });
  </script>
  <?php
}
add_action('wp_footer', 'personamatrix_widget');`;
  }
  return `// Full SDK usage
import PersonaMatrix from '@personamatrix/sdk';
import Icon from '@/components/ui/AppIcon';


const pm = new PersonaMatrix({
  personaId: "${cfg.personaId}",
  apiKey: "pk_live_xxxxxxxxxxxxxxxx",
});

// Open/close programmatically
pm.open();
pm.close();
pm.toggle();

// Send a message
pm.sendMessage("Hello from SDK");

// Listen to events
pm.on('message', (msg) => console.log(msg));
pm.on('open', () => console.log('Widget opened'));
pm.on('close', () => console.log('Widget closed'));
pm.on('modeChange', (mode) => console.log('Mode:', mode));

// Analytics forwarding
pm.on('analytics', (event) => {
  gtag('event', event.name, event.properties);
});

// Destroy
pm.destroy();`;
}

const INTEGRATION_TABS = [
  { id: 'html', label: 'HTML', color: '#E8A020' },
  { id: 'react', label: 'React', color: '#61DAFB' },
  { id: 'nextjs', label: 'Next.js', color: '#fff' },
  { id: 'shopify', label: 'Shopify', color: '#96BF48' },
  { id: 'wordpress', label: 'WordPress', color: '#21759B' },
  { id: 'sdk', label: 'SDK', color: '#7B6FD4' },
];

function ConfigPanel({ config, onChange }: { config: WidgetConfig; onChange: (c: Partial<WidgetConfig>) => void }) {
  const toggleMode = (mode: 'chat' | 'voice' | 'avatar') => {
    const current = config.modes ?? ['chat'];
    const next = current.includes(mode) ? current.filter(m => m !== mode) : [...current, mode];
    if (next.length === 0) return;
    onChange({ modes: next });
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-500 text-white/50 block mb-2">Persona Name</label>
        <input
          value={config.personaName ?? ''}
          onChange={e => onChange({ personaName: e.target.value })}
          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-sm text-white outline-none focus:border-amber-500/40 transition-all"
          placeholder="AI Assistant"
        />
      </div>
      <div>
        <label className="text-xs font-500 text-white/50 block mb-2">Greeting Message</label>
        <textarea
          value={config.greeting ?? ''}
          onChange={e => onChange({ greeting: e.target.value })}
          rows={2}
          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-sm text-white outline-none focus:border-amber-500/40 transition-all resize-none"
          placeholder="Hi! How can I help you?"
        />
      </div>
      <div>
        <label className="text-xs font-500 text-white/50 block mb-2">Theme</label>
        <div className="flex gap-2">
          {(['dark', 'light'] as const).map(t => (
            <button key={t} onClick={() => onChange({ theme: t })}
              className={`flex-1 py-2 rounded-xl border text-xs font-500 capitalize transition-all ${config.theme === t ? 'border-amber-500/50 bg-amber-500/10 text-amber-300' : 'border-white/8 text-white/40 hover:bg-white/5'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs font-500 text-white/50 block mb-2">Position</label>
        <div className="flex gap-2">
          {(['bottom-right', 'bottom-left'] as const).map(p => (
            <button key={p} onClick={() => onChange({ position: p })}
              className={`flex-1 py-2 rounded-xl border text-[11px] font-500 transition-all ${config.position === p ? 'border-amber-500/50 bg-amber-500/10 text-amber-300' : 'border-white/8 text-white/40 hover:bg-white/5'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs font-500 text-white/50 block mb-2">Chat Modes</label>
        <div className="flex gap-2">
          {([
            { id: 'chat' as const, icon: MessageSquare, color: 'text-blue-400', activeBg: 'bg-blue-500/15', activeBorder: 'border-blue-500/40' },
            { id: 'voice' as const, icon: Mic, color: 'text-purple-400', activeBg: 'bg-purple-500/15', activeBorder: 'border-purple-500/40' },
            { id: 'avatar' as const, icon: Video, color: 'text-teal-400', activeBg: 'bg-teal-500/15', activeBorder: 'border-teal-500/40' },
          ]).map(m => {
            const active = config.modes?.includes(m.id) ?? false;
            const Icon = m.icon;
            return (
              <button key={m.id} onClick={() => toggleMode(m.id)}
                className={`flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-xl border text-[11px] font-500 capitalize transition-all ${active ? `${m.activeBg} ${m.activeBorder} ${m.color}` : 'border-white/8 text-white/30 hover:bg-white/5'}`}>
                <Icon size={14} />
                {m.id}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Inner page component (uses useSearchParams) ──────────────────────────────
function PluginPreviewInner() {
  const searchParams = useSearchParams();
  const personaId = searchParams.get('personaId') ?? 'persona-001';

  const [config, setConfig] = useState<WidgetConfig>({
    personaId,
    personaName: 'Aria — AI Sales Advisor',
    personaRole: 'Powered by PersonaMatrix',
    greeting: "Hi there! 👋 I'm Aria, your AI Sales Advisor. I can help you find the perfect solution, answer questions, and guide you through our offerings. What can I help you with today?",
    suggestedPrompts: [
      'What are your pricing plans?',
      'How does the AI persona work?',
      'Can I try a demo?',
      'What integrations do you support?',
    ],
    theme: 'dark',
    position: 'bottom-right',
    modes: ['chat', 'voice', 'avatar'],
  });

  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeIntegration, setActiveIntegration] = useState('html');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'config'>('preview');
  const [widgetKey, setWidgetKey] = useState(0);

  const handleConfigChange = useCallback((partial: Partial<WidgetConfig>) => {
    setConfig(prev => ({ ...prev, ...partial }));
    setWidgetKey(k => k + 1);
  }, []);

  const embedCode = buildEmbedCode(config, activeIntegration);

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const currentViewport = VIEWPORTS.find(v => v.id === viewport)!;

  return (
    <AppLayout>
      <Topbar title="Plugin Preview" subtitle="Live preview and embed code generator for your AI persona widget" />

      <div className="flex flex-col gap-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <Link href="/embeds-plugins" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-all">
            <ArrowLeft size={14} /> Back to Plugins
          </Link>
          <div className="flex items-center gap-2">
            <div className="glass rounded-xl p-1 flex items-center gap-1">
              {([
                { id: 'preview' as const, label: 'Preview', icon: Eye },
                { id: 'code' as const, label: 'Embed Code', icon: Code2 },
                { id: 'config' as const, label: 'Configure', icon: Settings2 },
              ]).map(tab => {
                const Icon = tab.icon;
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-500 transition-all ${activeTab === tab.id ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                    <Icon size={12} />{tab.label}
                  </button>
                );
              })}
            </div>
            <button onClick={() => setWidgetKey(k => k + 1)}
              className="glass flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-white/50 hover:text-white transition-all" title="Reset widget">
              <RefreshCw size={12} /> Reset
            </button>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap gap-2">
          {[
            { icon: Shield, label: 'Shadow DOM Isolated', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
            { icon: Zap, label: 'Lazy Loaded', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
            { icon: Globe, label: 'Cross-Platform', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
            { icon: Layers, label: 'WebGL Orb', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
            { icon: Palette, label: 'Theme Support', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
          ].map(f => {
            const Icon = f.icon;
            return (
              <div key={f.label} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-500 ${f.bg} ${f.border} ${f.color}`}>
                <Icon size={10} />{f.label}
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Panel */}
          <div className="xl:col-span-2 space-y-4">

            {/* Preview Tab */}
            {activeTab === 'preview' && (
              <div className="glass rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/6">
                  <div className="flex items-center gap-1">
                    {VIEWPORTS.map(vp => {
                      const Icon = vp.icon;
                      return (
                        <button key={vp.id} onClick={() => setViewport(vp.id as typeof viewport)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-500 transition-all ${viewport === vp.id ? 'bg-white/10 text-white border border-white/15' : 'text-white/35 hover:text-white hover:bg-white/5'}`}>
                          <Icon size={12} />{vp.label}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-white/30 font-mono">{currentViewport.width}</span>
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-black/20">
                  <div className="mx-auto transition-all duration-300 relative" style={{ width: currentViewport.width, maxWidth: '100%' }}>
                    {/* Browser chrome */}
                    <div className="rounded-t-xl px-4 py-2.5 flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                      </div>
                      <div className="flex-1 flex items-center gap-2 px-3 py-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <Globe size={10} className="text-white/25" />
                        <span className="text-[10px] text-white/30 font-mono">yourwebsite.com</span>
                      </div>
                      <ExternalLink size={11} className="text-white/20" />
                    </div>

                    {/* Simulated page */}
                    <div className="relative rounded-b-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f1117 0%, #13151f 100%)', minHeight: '420px', border: '1px solid rgba(255,255,255,0.06)', borderTop: 'none' }}>
                      <div className="p-6 space-y-4">
                        <div className="h-6 rounded-lg bg-white/5 w-2/3" />
                        <div className="h-4 rounded-lg bg-white/3 w-full" />
                        <div className="h-4 rounded-lg bg-white/3 w-5/6" />
                        <div className="h-4 rounded-lg bg-white/3 w-4/5" />
                        <div className="grid grid-cols-3 gap-3 mt-6">
                          {[1, 2, 3].map(i => <div key={i} className="h-24 rounded-xl bg-white/3 border border-white/5" />)}
                        </div>
                        <div className="h-4 rounded-lg bg-white/3 w-3/4" />
                        <div className="h-4 rounded-lg bg-white/3 w-full" />
                      </div>
                      {/* Live widget */}
                      <div className="absolute inset-0 pointer-events-auto">
                        <PersonaMatrixWidget key={widgetKey} config={config} defaultOpen={false} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
                  <p className="text-[11px] text-white/30">Click the orb in the bottom corner to open the widget</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] text-emerald-400">Live Preview</span>
                  </div>
                </div>
              </div>
            )}

            {/* Code Tab */}
            {activeTab === 'code' && (
              <div className="glass rounded-2xl overflow-hidden">
                <div className="flex items-center gap-1 px-4 py-3 border-b border-white/6 overflow-x-auto">
                  {INTEGRATION_TABS.map(tab => (
                    <button key={tab.id} onClick={() => setActiveIntegration(tab.id)}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-500 transition-all ${activeIntegration === tab.id ? 'bg-white/10 border border-white/15' : 'text-white/35 hover:text-white hover:bg-white/5'}`}
                      style={{ color: activeIntegration === tab.id ? tab.color : undefined }}>
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
                    <span className="text-[11px] text-white/30 font-mono">
                      {activeIntegration === 'html' && 'index.html'}
                      {activeIntegration === 'react' && 'App.tsx'}
                      {activeIntegration === 'nextjs' && 'app/layout.tsx'}
                      {activeIntegration === 'shopify' && 'theme.liquid'}
                      {activeIntegration === 'wordpress' && 'functions.php'}
                      {activeIntegration === 'sdk' && 'widget-sdk.ts'}
                    </span>
                    <button onClick={handleCopy}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-500 transition-all ${copied ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' : 'border-white/10 text-white/50 hover:text-white hover:bg-white/8'}`}>
                      {copied ? <CheckCheck size={11} /> : <Copy size={11} />}
                      {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                  <div className="p-5 overflow-x-auto" style={{ background: '#0d1117', maxHeight: '420px', overflowY: 'auto' }}>
                    <pre className="text-xs font-mono text-white/70 leading-relaxed whitespace-pre">{embedCode}</pre>
                  </div>
                </div>
                <div className="px-5 py-4 border-t border-white/5">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
                    <Zap size={13} className="text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-500 text-amber-300 mb-1">Integration Note</p>
                      <p className="text-[11px] text-white/40 leading-relaxed">
                        {activeIntegration === 'html' && "Place this snippet before the closing </body> tag. The widget loads asynchronously and won't block page rendering."}
                        {activeIntegration === 'react' && 'Install via npm. The component is tree-shakeable and lazy-loads heavy modules (WebGL, voice) on demand.'}
                        {activeIntegration === 'nextjs' && 'Use dynamic import with ssr: false to prevent hydration issues. The widget auto-detects Next.js environment.'}
                        {activeIntegration === 'shopify' && 'Add to your theme.liquid file. Customer data is automatically passed for personalized conversations.'}
                        {activeIntegration === 'wordpress' && 'Add to functions.php or use a custom plugin. Compatible with all major WordPress themes.'}
                        {activeIntegration === 'sdk' && 'Full programmatic control via the SDK. Supports custom events, analytics forwarding, and deep integration.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Config Tab */}
            {activeTab === 'config' && (
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-5">
                  <Settings2 size={14} className="text-amber-400" />
                  <h3 className="text-sm font-600 text-white">Widget Configuration</h3>
                </div>
                <ConfigPanel config={config} onChange={handleConfigChange} />
              </div>
            )}
          </div>

          {/* Right Panel */}
          <div className="space-y-4">
            <div className="glass rounded-2xl p-5">
              <h3 className="text-sm font-600 text-white mb-4 flex items-center gap-2">
                <Zap size={13} className="text-amber-400" /> Widget Specs
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Bundle Size', value: '~18KB gzipped', color: 'text-emerald-400' },
                  { label: 'Load Strategy', value: 'Async + Lazy', color: 'text-blue-400' },
                  { label: 'Style Isolation', value: 'Shadow DOM', color: 'text-purple-400' },
                  { label: 'CSS Conflicts', value: 'Zero', color: 'text-emerald-400' },
                  { label: 'Browser Support', value: 'IE11+ / ES5', color: 'text-amber-400' },
                  { label: 'Mobile Ready', value: 'Fully Responsive', color: 'text-teal-400' },
                  { label: 'Accessibility', value: 'WCAG 2.1 AA', color: 'text-pink-400' },
                  { label: 'WebGL Fallback', value: 'CSS Animation', color: 'text-white/60' },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-xs text-white/40">{s.label}</span>
                    <span className={`text-xs font-500 ${s.color}`}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <h3 className="text-sm font-600 text-white mb-4 flex items-center gap-2">
                <Globe size={13} className="text-blue-400" /> Platform Support
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'Plain HTML / Vanilla JS', status: 'Native', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                  { name: 'React / Next.js', status: 'NPM Package', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                  { name: 'Shopify', status: 'Liquid Tag', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                  { name: 'WordPress', status: 'PHP Hook', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                  { name: 'Webflow', status: 'Custom Code', color: 'text-purple-400', bg: 'bg-purple-500/10' },
                  { name: 'Wix / Squarespace', status: 'Embed Block', color: 'text-amber-400', bg: 'bg-amber-500/10' },
                  { name: 'Vue / Angular', status: 'Web Component', color: 'text-teal-400', bg: 'bg-teal-500/10' },
                ].map(p => (
                  <div key={p.name} className="flex items-center justify-between py-1.5 border-b border-white/4 last:border-0">
                    <span className="text-xs text-white/60">{p.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-500 ${p.bg} ${p.color}`}>{p.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <h3 className="text-sm font-600 text-white mb-4 flex items-center gap-2">
                <Code2 size={13} className="text-purple-400" /> SDK Methods
              </h3>
              <div className="space-y-2">
                {[
                  { method: 'PersonaMatrix.init(config)', desc: 'Initialize widget' },
                  { method: 'PersonaMatrix.open()', desc: 'Open chat panel' },
                  { method: 'PersonaMatrix.close()', desc: 'Close chat panel' },
                  { method: 'PersonaMatrix.toggle()', desc: 'Toggle open/close' },
                  { method: 'PersonaMatrix.setMode(mode)', desc: 'Switch chat mode' },
                  { method: 'PersonaMatrix.sendMessage(text)', desc: 'Send programmatic message' },
                  { method: 'PersonaMatrix.on(event, cb)', desc: 'Subscribe to events' },
                  { method: 'PersonaMatrix.destroy()', desc: 'Remove widget' },
                ].map(m => (
                  <div key={m.method} className="py-1.5 border-b border-white/4 last:border-0">
                    <p className="text-[11px] font-mono text-amber-300">{m.method}</p>
                    <p className="text-[10px] text-white/35 mt-0.5">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <h3 className="text-sm font-600 text-white mb-4 flex items-center gap-2">
                <ChevronDown size={13} className="text-teal-400" /> Analytics Events
              </h3>
              <div className="space-y-1.5">
                {[
                  'widget_opened', 'widget_closed', 'message_sent',
                  'message_received', 'voice_started', 'voice_ended',
                  'avatar_session_started', 'mode_changed', 'prompt_clicked',
                ].map(e => (
                  <div key={e} className="px-2.5 py-1.5 rounded-lg bg-white/3 border border-white/5">
                    <span className="text-[11px] font-mono text-teal-300">{e}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// ─── Root export with Suspense boundary ──────────────────────────────────────
export default function PluginPreviewPage() {
  return (
    <Suspense fallback={
      <AppLayout>
        <Topbar title="Plugin Preview" subtitle="Loading..." />
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
        </div>
      </AppLayout>
    }>
      <PluginPreviewInner />
    </Suspense>
  );
}
