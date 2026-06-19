'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

const capabilities = [
  {
    icon: '📦',
    title: 'Inventory Management',
    description: 'Real-time stock monitoring, automated reorder triggers, and multi-location sync across Shopify and warehouse systems.',
    color: '#8b5cf6',
    features: ['Low-stock alerts', 'Auto reorder triggers', 'Multi-location sync', 'SKU-level tracking'],
  },
  {
    icon: '🚚',
    title: 'Order Processing & Tracking',
    description: 'End-to-end order management — from confirmation to delivery. Handles returns, exchanges, and fulfillment queries automatically.',
    color: '#06b6d4',
    features: ['Order status updates', 'Return & exchange flows', 'Delivery ETA tracking', 'Fulfillment escalation'],
  },
  {
    icon: '💬',
    title: '24/7 Customer Support',
    description: 'AI agents trained on your product catalog, policies, and FAQs — delivering instant, accurate support across web chat and WhatsApp.',
    color: '#f97316',
    features: ['Product Q&A', 'Policy & FAQ handling', 'WhatsApp & web chat', 'Escalation to human agents'],
  },
  {
    icon: '🎯',
    title: 'Personalized Recommendations',
    description: 'Behavior-driven product recommendations that increase average order value and conversion rates through contextual upsell and cross-sell.',
    color: '#14b8a6',
    features: ['Purchase history analysis', 'Browse behavior signals', 'Upsell & cross-sell', 'Abandoned cart recovery'],
  },
];

const agentDemos = [
  {
    name: 'ShopBot — Product Discovery',
    color: '#95bf47',
    messages: [
      { role: 'user' as const, text: "I'm looking for a gift for my mom — she loves cooking." },
      { role: 'ai' as const, text: "Perfect! Based on trending gifting choices, I'd recommend our Cast Iron Skillet Set (⭐ 4.9, 2.3k reviews) or the Smart Herb Garden Kit — both are bestsellers in the cooking category. Budget range?" },
      { role: 'user' as const, text: 'Around $80–100.' },
      { role: 'ai' as const, text: "The Herb Garden Kit at $89 is a great fit — it's in stock, ships in 2 days, and comes with a gift wrap option. I can add it to your cart with a 10% first-order discount. Want to proceed?" },
    ],
  },
  {
    name: 'SupportBot — Customer Service',
    color: '#f97316',
    messages: [
      { role: 'user' as const, text: "I received the wrong item in my order #SH-48291." },
      { role: 'ai' as const, text: "I'm sorry about that! I've pulled up your order — you ordered the Blue Denim Jacket (Size M) but received a different item. I'll initiate a free return and ship the correct item today. No need to send anything back first." },
      { role: 'user' as const, text: 'How long will the replacement take?' },
      { role: 'ai' as const, text: "The correct jacket will arrive within 2 business days via express shipping — at no extra cost. I've also added a $15 store credit to your account as an apology. Is there anything else I can help with?" },
    ],
  },
  {
    name: 'StockSync — Inventory Agent',
    color: '#8b5cf6',
    messages: [
      { role: 'user' as const, text: "Which SKUs are running low this week?" },
      { role: 'ai' as const, text: "3 SKUs are below reorder threshold: Blue Denim Jacket (S/M — 4 units left), Wireless Earbuds Pro (11 units), and Yoga Mat Bundle (7 units). All 3 have high sell-through rates — recommend restocking within 48 hours." },
      { role: 'user' as const, text: 'Go ahead and trigger reorders for all three.' },
      { role: 'ai' as const, text: "Done! Purchase orders sent to your suppliers. Estimated restock: Jacket in 3 days, Earbuds in 5 days, Yoga Mat in 2 days. I've also flagged the Earbuds for a safety stock increase given the 40% sales spike last week." },
    ],
  },
];

const integrationSteps = [
  {
    step: '01',
    title: 'Install Shopify App',
    desc: 'Add PersonaMatrix from the Shopify App Store. One-click install connects your store data, product catalog, and order history.',
    color: '#95bf47',
  },
  {
    step: '02',
    title: 'Configure Your Agent',
    desc: 'Select agent type (support, discovery, inventory), upload your brand guidelines, and fine-tune persona behavior for your store.',
    color: '#f97316',
  },
  {
    step: '03',
    title: 'Deploy to Channels',
    desc: 'Embed on your storefront, activate on WhatsApp Business, or connect via API. Go live in under 30 minutes.',
    color: '#06b6d4',
  },
];

const metrics = [
  { value: '70%', label: 'Reduction in support tickets', icon: '📉' },
  { value: '3.2×', label: 'Higher conversion vs static chat', icon: '📈' },
  { value: '24/7', label: 'Always-on customer coverage', icon: '⏰' },
  { value: '<30s', label: 'Average response time', icon: '⚡' },
];

function MockChatDemo({ messages, persona, color }: { messages: { role: 'user' | 'ai'; text: string }[]; persona: string; color: string }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const startDemo = () => {
    setVisibleCount(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying) return;
    if (visibleCount >= messages.length) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => setVisibleCount((v) => v + 1), 900);
    return () => clearTimeout(timer);
  }, [isPlaying, visibleCount, messages.length]);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d0f18] overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-white/[0.02]">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: `linear-gradient(135deg, ${color}, #3b82f6)` }}>
          AI
        </div>
        <div>
          <p className="text-sm font-medium text-white">{persona}</p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#95bf47] animate-pulse" />
            <span className="text-xs text-white/40">Shopify Connected</span>
          </div>
        </div>
        <div className="ml-auto flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
      </div>
      <div className="p-4 space-y-3 min-h-[180px]">
        {messages.slice(0, visibleCount).map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`} style={{ animation: 'fadeSlideUp 0.3s ease-out' }}>
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'text-white rounded-br-sm' : 'bg-white/8 text-white/85 rounded-bl-sm border border-white/8'}`}
              style={msg.role === 'user' ? { background: color } : {}}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isPlaying && visibleCount < messages.length && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl bg-white/8 border border-white/8 flex gap-1">
              {[0, 1, 2].map((i) => <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
            </div>
          </div>
        )}
        {!isPlaying && visibleCount === 0 && (
          <div className="flex items-center justify-center h-28 text-white/30 text-sm">Click "Try Demo" to preview</div>
        )}
      </div>
      <div className="px-4 py-3 border-t border-white/8 flex items-center gap-3">
        <div className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-sm text-white/30">Type a message...</div>
        <button onClick={startDemo} className="px-4 py-2 rounded-xl text-sm font-semibold text-white flex-shrink-0" style={{ background: color }}>
          {isPlaying ? 'Playing...' : visibleCount > 0 ? 'Replay' : 'Try Demo'}
        </button>
      </div>
    </div>
  );
}

export default function ShopifyEcommercePage() {
  return (
    <div className="min-h-screen bg-[#0a0c12] text-white">
      <PublicHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #95bf47 0%, #06b6d4 50%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-8 pointer-events-none" style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#95bf47]/20 bg-[#95bf47]/8 text-xs text-[#95bf47] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#95bf47] animate-pulse" />
              Shopify App · E-commerce AI Agents
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              AI Digital Teammates{' '}
              <span className="bg-gradient-to-r from-[#95bf47] via-[#06b6d4] to-[#f97316] bg-clip-text text-transparent">
                for Your Shopify Store
              </span>
            </h1>
            <p className="text-base sm:text-lg text-white/50 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto">
              Persona-driven AI agents deeply connected to Shopify APIs — managing inventory, processing orders, delivering 24/7 support, and generating personalized recommendations at scale.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="px-6 py-3 rounded-xl font-semibold text-white text-sm btn-primary w-full sm:w-auto text-center">
                Install Shopify App
              </Link>
              <a href="#demos" className="px-6 py-3 rounded-xl font-semibold text-sm text-white/70 border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200 w-full sm:w-auto text-center">
                See Live Demos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 text-center">
                <div className="text-3xl mb-2">{m.icon}</div>
                <div className="text-3xl font-black text-white mb-1" style={{ background: 'linear-gradient(135deg, #95bf47, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{m.value}</div>
                <p className="text-xs text-white/40 leading-snug">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is the Shopify Integration */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Shopify App</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Personas as Digital Teammates
              </h2>
              <p className="text-white/50 leading-relaxed mb-6">
                The PersonaMatrix Shopify app transforms your store into an intelligent commerce platform. Each AI agent is a "digital teammate" — deeply connected to your Shopify APIs, trained on your product catalog, and capable of reasoning across inventory, orders, and customer context.
              </p>
              <p className="text-white/50 leading-relaxed mb-8">
                By combining persona-driven reasoning with commerce workflows, the system enables scalable, intelligent automation that enhances customer experience while reducing operational overhead.
              </p>
              <div className="space-y-3">
                {[
                  { icon: '🔗', text: 'Deep Shopify API integration — products, orders, inventory, customers' },
                  { icon: '🧠', text: 'Persona memory across sessions — agents remember customer context' },
                  { icon: '⚡', text: 'Real-time data sync — stock levels, order status, pricing' },
                  { icon: '🌐', text: 'Multi-channel — web chat, WhatsApp, voice, and API' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <span className="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
                    <p className="text-sm text-white/60">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[#95bf47]/20 bg-[#95bf47]/5 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(149,191,71,0.15)', color: '#95bf47' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">PersonaMatrix for Shopify</p>
                  <p className="text-xs text-white/40">Available on Shopify App Store</p>
                </div>
                <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Live</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Shopify API', status: 'Connected', color: '#95bf47' },
                  { label: 'Product Catalog Sync', status: 'Active', color: '#95bf47' },
                  { label: 'Order Management', status: 'Active', color: '#95bf47' },
                  { label: 'Customer Data', status: 'Active', color: '#95bf47' },
                  { label: 'WhatsApp Channel', status: 'Active', color: '#06b6d4' },
                  { label: 'Web Chat Widget', status: 'Active', color: '#06b6d4' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/6 last:border-0">
                    <span className="text-sm text-white/60">{item.label}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                      <span className="text-xs font-medium" style={{ color: item.color }}>{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Capabilities</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">What Your AI Agents Can Do</h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto">
              Four core capability areas — each powered by a fine-tuned persona connected to your Shopify data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap) => (
              <div key={cap.title} className="rounded-2xl border border-white/8 bg-white/[0.02] p-7 hover:bg-white/[0.04] hover:border-white/12 transition-all duration-200">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-3xl flex-shrink-0">{cap.icon}</span>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">{cap.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{cap.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cap.features.map((f) => (
                    <span key={f} className="px-3 py-1 rounded-full text-xs font-medium border" style={{ background: `${cap.color}12`, borderColor: `${cap.color}25`, color: cap.color }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Agent Demos */}
      <section id="demos" className="py-20 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Live Demos</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">See Your Digital Teammates in Action</h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto">
              Click "Try Demo" on any agent to see a live preview of how it handles real e-commerce scenarios.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {agentDemos.map((demo) => (
              <div key={demo.name} className="flex flex-col gap-3">
                <div className="flex items-center gap-2 px-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: demo.color }} />
                  <p className="text-sm font-semibold text-white">{demo.name}</p>
                </div>
                <MockChatDemo persona={demo.name} color={demo.color} messages={demo.messages} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Integrate */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Setup</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Go Live in Under 30 Minutes</h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto">Three steps from install to a fully deployed AI agent on your Shopify store.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-[#95bf47] to-[#06b6d4] opacity-30" />
            <div className="hidden md:block absolute top-12 left-2/3 right-0 h-px bg-gradient-to-r from-[#06b6d4] to-[#f97316] opacity-30" />

            {integrationSteps.map((step) => (
              <div key={step.step} className="relative rounded-2xl p-8 border border-white/8 bg-white/[0.02] flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${step.color}22`, color: step.color }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 8 12 12 14 14" />
                    </svg>
                  </div>
                  <span className="text-4xl font-black opacity-10 leading-none" style={{ color: step.color }}>{step.step}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Differentiation</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Why PersonaMatrix for Shopify</h2>
            <p className="text-sm text-white/40">See how AI digital teammates compare to traditional e-commerce tools.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left px-6 py-4 text-white/40 font-semibold uppercase tracking-widest text-xs w-1/3">Capability</th>
                  <th className="text-left px-6 py-4 text-white/40 font-semibold uppercase tracking-widest text-xs w-1/3">Traditional Shopify Tools</th>
                  <th className="text-left px-6 py-4 font-semibold uppercase tracking-widest text-xs w-1/3 rounded-t-xl" style={{ color: '#95bf47', background: 'rgba(149,191,71,0.08)' }}>PersonaMatrix + Shopify</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { capability: 'Customer Support', traditional: 'Ticket queues, delayed responses, scripted chatbots', pm: 'AI agent trained on your catalog — instant, accurate, 24/7 across chat and WhatsApp' },
                  { capability: 'Product Discovery', traditional: 'Search filters and static product pages', pm: 'Conversational AI that understands intent and recommends best-fit products in real time' },
                  { capability: 'Inventory Management', traditional: 'Manual stock checks, delayed alerts', pm: 'Real-time monitoring with automated reorder triggers and multi-location sync' },
                  { capability: 'Order Management', traditional: 'Email notifications, manual follow-ups', pm: 'End-to-end order handling — tracking, returns, exchanges — fully automated' },
                  { capability: 'Personalization', traditional: 'Rule-based product recommendations', pm: 'Behavior-driven, context-aware recommendations that increase AOV and conversion' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/6 last:border-0">
                    <td className="px-6 py-4 text-white/70 font-medium">{row.capability}</td>
                    <td className="px-6 py-4 text-white/40">{row.traditional}</td>
                    <td className="px-6 py-4 font-medium" style={{ color: '#95bf47', background: 'rgba(149,191,71,0.05)' }}>{row.pm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 border-t border-white/6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl blur-3xl opacity-15 pointer-events-none" style={{ background: 'linear-gradient(135deg, #95bf47, #06b6d4)' }} />
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12 md:p-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#95bf47]/20 bg-[#95bf47]/8 text-xs text-[#95bf47] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#95bf47]" />
                Available on Shopify App Store
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Deploy Your First AI Agent
              </h2>
              <p className="text-white/50 text-base sm:text-lg mb-8 sm:mb-10 max-w-lg mx-auto">
                Install the PersonaMatrix Shopify app and go live with an AI digital teammate in under 30 minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register" className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-white text-sm btn-primary w-full sm:w-auto text-center">
                  Install Shopify App
                </Link>
                <Link href="/register" className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-sm text-white/70 border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200 w-full sm:w-auto text-center">
                  Book Demo
                </Link>
              </div>
              <p className="mt-6 text-xs text-white/30">Free to install · No credit card required · 14-day trial</p>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />

      <style jsx>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
