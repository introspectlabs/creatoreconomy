'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

const ecommercePersonas = [
  {
    name: 'ShopBot — Product Discovery Agent',
    role: 'E-commerce Sales AI',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.12)',
    border: 'rgba(249,115,22,0.3)',
    emoji: '🛍️',
    description: 'Guides shoppers from browse to buy with personalized product recommendations based on behavior and context.',
    demoMessages: [
      { role: 'user' as const, text: "I'm looking for a gift for my mom — she loves cooking." },
      { role: 'ai' as const, text: "Perfect! Based on trending gifting choices, I'd recommend our Cast Iron Skillet Set (⭐ 4.9, 2.3k reviews) or the Smart Herb Garden Kit — both are bestsellers in the cooking category. Budget range?" },
      { role: 'user' as const, text: 'Around $80–100.' },
      { role: 'ai' as const, text: "The Herb Garden Kit at $89 is a great fit — it's in stock, ships in 2 days, and comes with a gift wrap option. I can add it to your cart with a 10% first-order discount. Want to proceed?" },
    ],
  },
  {
    name: 'OrderTrack — Post-Purchase Agent',
    role: 'Order & Fulfillment AI',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.12)',
    border: 'rgba(6,182,212,0.3)',
    emoji: '📦',
    description: 'Handles order tracking, returns, and fulfillment queries end-to-end — reducing support tickets by 70%.',
    demoMessages: [
      { role: 'user' as const, text: "Where's my order #SH-48291? It was supposed to arrive yesterday." },
      { role: 'ai' as const, text: "I found your order — it's currently at the local distribution center and is out for delivery today. Expected delivery window: 2–6 PM. You'll get an SMS when it's 30 minutes away." },
      { role: 'user' as const, text: "What if I'm not home? Can I reschedule?" },
      { role: 'ai' as const, text: "Absolutely! I can reschedule to tomorrow between 10 AM–2 PM, or you can redirect it to a nearby pickup point. Which do you prefer?" },
    ],
  },
  {
    name: 'StockSync — Inventory Agent',
    role: 'Inventory Management AI',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.12)',
    border: 'rgba(139,92,246,0.3)',
    emoji: '📊',
    description: 'Monitors stock levels in real time, triggers reorder alerts, and syncs inventory across Shopify and warehouse systems.',
    demoMessages: [
      { role: 'user' as const, text: "Which SKUs are running low this week?" },
      { role: 'ai' as const, text: "3 SKUs are below reorder threshold: Blue Denim Jacket (S/M — 4 units left), Wireless Earbuds Pro (11 units), and Yoga Mat Bundle (7 units). All 3 have high sell-through rates — recommend restocking within 48 hours." },
      { role: 'user' as const, text: 'Go ahead and trigger reorders for all three.' },
      { role: 'ai' as const, text: "Done! Purchase orders sent to your suppliers. Estimated restock: Jacket in 3 days, Earbuds in 5 days, Yoga Mat in 2 days. I've also flagged the Earbuds for a safety stock increase given the 40% sales spike last week." },
    ],
  },
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
            <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
            <span className="text-xs text-white/40">Online</span>
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
            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'text-white rounded-br-sm' : 'bg-white/8 text-white/85 rounded-bl-sm border border-white/8'}`} style={msg.role === 'user' ? { background: color } : {}}>
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

export default function IndustriesPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0c12] text-white">
      <PublicHeader />

      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-15 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #7c3aed 0%, #3b82f6 50%, transparent 70%)',
            transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/60 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse" />
              Creator Economy · E-commerce Use Cases
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              AI Personas for{' '}
              <span className="bg-gradient-to-r from-[#7c3aed] via-[#f97316] to-[#06b6d4] bg-clip-text text-transparent">
                Creators & Commerce
              </span>
            </h1>
            <p className="text-base sm:text-lg text-white/50 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto">
              Turn your content and commerce workflows into intelligent AI personas — from creator audience engagement to Shopify-powered e-commerce automation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#creator-economy" className="px-6 py-3 rounded-xl font-semibold text-white text-sm btn-primary w-full sm:w-auto text-center">
                Explore Use Cases
              </a>
              <Link href="/register" className="px-6 py-3 rounded-xl font-semibold text-sm text-white/70 border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200 w-full sm:w-auto text-center">
                Book Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Economy Section */}
      <section id="creator-economy" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 text-xs text-[#7c3aed] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed]" />
            Industry
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Creator Economy</h2>
          <p className="text-white/50 max-w-xl leading-relaxed">
            Turn your videos, knowledge, and expertise into an interactive AI persona that engages your audience 24/7, monetizes your content, and scales your personal brand.
          </p>
        </div>

        {/* Creator Economy card with demo */}
        <div className="rounded-2xl border border-[#7c3aed]/25 bg-[#7c3aed]/5 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: info */}
            <div className="p-8 lg:p-10 flex flex-col justify-between gap-8 border-b lg:border-b-0 lg:border-r border-white/8">
              <div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(124,58,237,0.15)', color: '#7c3aed' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
                    <path d="M10 8l6 4-6 4V8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Your AI, Always Available</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  Create a digital version of yourself that answers questions, shares insights, and interacts with your audience in your voice and style. Scale your presence without increasing your time.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    { icon: '🎬', label: 'Voice & style replication from your video content' },
                    { icon: '💬', label: 'Audience Q&A, fan engagement, and community building' },
                    { icon: '💰', label: 'Conversational monetization of courses and expertise' },
                    { icon: '🔀', label: 'Deploy across Web, WhatsApp, Voice, and API' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
                      <p className="text-sm text-white/60">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Link href="/industries/creator-economy" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary">
                  View All Use Cases
                </Link>
                <Link href="/register" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white/70 border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200">
                  Book Demo
                </Link>
              </div>
            </div>

            {/* Right: demo */}
            <div className="p-8 lg:p-10">
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Live Preview</p>
              <MockChatDemo
                persona="Creator AI Persona"
                color="#7c3aed"
                messages={[
                  { role: 'user', text: "Hey! I loved your last video on productivity. What's your #1 tip for deep work?" },
                  { role: 'ai', text: "Great question! My #1 tip is time-blocking with a hard stop — I schedule 90-minute deep work sessions with zero notifications. The key is treating them like meetings you can't cancel. Want me to walk you through my exact morning routine?" },
                  { role: 'user', text: 'Yes! And do you have a course on this?' },
                  { role: 'ai', text: "I do! My 'Deep Work Mastery' course covers the full system — from environment design to habit stacking. Over 12,000 students have used it to reclaim 2+ hours daily. I can share the curriculum and a free preview module right now." },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* E-commerce Use Cases */}
      <section className="py-16 sm:py-20 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#f97316]/30 bg-[#f97316]/10 text-xs text-[#f97316] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
              E-commerce Use Cases
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Shopify-Powered AI Agents</h2>
            <p className="text-white/50 max-w-xl leading-relaxed">
              Fine-tuned personas for e-commerce workflows — from product discovery to inventory management. Integrate as a Shopify app and deploy digital teammates across your store.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {ecommercePersonas.map((persona) => (
              <div
                key={persona.name}
                className="rounded-2xl border overflow-hidden flex flex-col"
                style={{ borderColor: persona.border, background: persona.bg }}
              >
                <div className="p-6 border-b border-white/8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{persona.emoji}</span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: persona.color }}>{persona.role}</p>
                      <h3 className="font-bold text-white text-sm">{persona.name}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">{persona.description}</p>
                </div>
                <div className="p-4 flex-1">
                  <MockChatDemo persona={persona.name} color={persona.color} messages={persona.demoMessages} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shopify-ecommerce" className="px-6 py-3 rounded-xl font-semibold text-white text-sm btn-primary">
              Explore Shopify Integration
            </Link>
            <Link href="/register" className="px-6 py-3 rounded-xl font-semibold text-sm text-white/70 border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200">
              Book Demo
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 border-t border-white/6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl blur-3xl opacity-20 bg-gradient-to-r from-[#7c3aed] to-[#f97316] pointer-events-none" />
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12 md:p-16">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Build Your First AI Persona
              </h2>
              <p className="text-white/50 text-base sm:text-lg mb-8 sm:mb-10 max-w-lg mx-auto">
                Start with high-impact use cases that drive real revenue — for creators and commerce alike.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register" className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-white text-sm btn-primary w-full sm:w-auto text-center">
                  Start Free
                </Link>
                <Link href="/register" className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-sm text-white/70 border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200 w-full sm:w-auto text-center">
                  Book Demo
                </Link>
              </div>
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
