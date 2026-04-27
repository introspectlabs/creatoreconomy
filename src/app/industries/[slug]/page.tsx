'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

interface UseCase {
  title: string;
  description: string;
  capabilities: string[];
  channels: string[];
  demoPersona: string;
  demoMessages: { role: 'user' | 'ai'; text: string }[];
}

interface IndustryData {
  name: string;
  tagline: string;
  description: string;
  color: string;
  bg: string;
  border: string;
  useCases: UseCase[];
}

const industryData: Record<string, IndustryData> = {
  'creator-economy': {
    name: 'Creator Economy',
    tagline: 'Turn Your Content into a Scalable AI Persona',
    description:
      'PersonaMatrix transforms your videos, knowledge, and expertise into an interactive AI persona that your audience can chat with, learn from, and engage with 24/7.',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.12)',
    border: 'rgba(124,58,237,0.3)',
    useCases: [
      {
        title: 'Your AI, Always Available',
        description:
          'Create a digital version of yourself that answers questions, shares insights, and interacts with your audience in your voice and style. Scale your presence without increasing your time.',
        capabilities: ['Voice & style replication', 'Audience Q&A', '24/7 availability'],
        channels: ['Web Chat', 'WhatsApp', 'API'],
        demoPersona: 'Creator AI Persona',
        demoMessages: [
          { role: 'user', text: "Hey! I loved your last video on productivity. What's your #1 tip for deep work?" },
          { role: 'ai', text: "Great question! My #1 tip is time-blocking with a hard stop — I schedule 90-minute deep work sessions with zero notifications. The key is treating them like meetings you can't cancel. Want me to walk you through my exact morning routine?" },
          { role: 'user', text: 'Yes! And do you have a course on this?' },
          { role: 'ai', text: "I do! My 'Deep Work Mastery' course covers the full system — from environment design to habit stacking. Over 12,000 students have used it to reclaim 2+ hours daily. I can share the curriculum and a free preview module right now." },
        ],
      },
      {
        title: 'Monetize What You Already Know',
        description:
          'Turn your videos, courses, and expertise into a conversational AI experience that users can learn from interactively. Unlock new revenue streams from your existing content.',
        capabilities: ['Course monetization', 'Interactive learning', 'Content-to-AI pipeline'],
        channels: ['Web', 'WhatsApp', 'LMS Embed'],
        demoPersona: 'Knowledge AI',
        demoMessages: [
          { role: 'user', text: "I want to learn photography but don't know where to start." },
          { role: 'ai', text: "Perfect starting point! Based on your level, I'd recommend beginning with the 'Foundations of Light' module — it's the most impactful first step. 94% of beginners who start here complete the full course. Want me to unlock the first lesson for you?" },
          { role: 'user', text: 'How much does the full course cost?' },
          { role: 'ai', text: "The full Photography Masterclass is $149, but I can offer you a 7-day free trial right now — no credit card needed. You'll get access to 40+ lessons, live Q&A sessions, and a private community. Ready to start?" },
        ],
      },
      {
        title: 'Engage Every Fan, Instantly',
        description:
          'Deliver personalized conversations and responses across web, WhatsApp, and other channels. Build deeper relationships and stronger communities.',
        capabilities: ['Personalized responses', 'Community engagement', 'Multi-channel reach'],
        channels: ['Web', 'WhatsApp', 'API Integrations'],
        demoPersona: 'Fan Engagement AI',
        demoMessages: [
          { role: 'user', text: "I've been following you for 2 years. When's your next live stream?" },
          { role: 'ai', text: "That means so much — thank you for 2 years of support! 🙌 Next live stream is this Saturday at 7 PM EST. I'm covering 'Building a 6-Figure Creator Business' — topics you've been asking about. Want me to send you a reminder 30 minutes before?" },
          { role: 'user', text: 'Yes please! Also, can I get early access to your new ebook?' },
          { role: 'ai', text: "Absolutely — loyal fans get first access! I'm sending you the early-access link right now. It drops publicly next week, but you'll have it today. There's also a bonus chapter exclusive to early readers. Enjoy! 🎉" },
        ],
      },
    ],
  },
  'ott-streaming': {
    name: 'OTT & Streaming',
    tagline: 'Supercharge Viewer Engagement with AI Personas',
    description:
      'PersonaMatrix brings your content to life — enabling viewers to interact with characters, explore storylines, and get personalized recommendations through AI personas trained on your video library.',
    color: '#14b8a6',
    bg: 'rgba(20,184,166,0.12)',
    border: 'rgba(20,184,166,0.3)',
    useCases: [
      {
        title: 'Interactive Character Personas',
        description:
          'Let viewers chat with AI versions of their favorite characters — answering questions in character, sharing backstory, and deepening the narrative experience beyond the screen.',
        capabilities: ['In-character responses', 'Storyline exploration', 'Persona memory'],
        channels: ['Web Chat', 'Mobile App', 'API'],
        demoPersona: 'Detective Sarah Mitchell',
        demoMessages: [
          { role: 'user', text: "Sarah, how did you figure out Victor was the suspect so early?" },
          { role: 'ai', text: "It was the timeline inconsistency in his alibi — he claimed to be at the diner at 9 PM, but the security footage showed his car leaving 40 minutes earlier. Small detail, but those are the ones that crack cases. What made you notice it?" },
          { role: 'user', text: "I didn't catch that! Can you walk me through the evidence from episode 3?" },
          { role: 'ai', text: "Of course. In episode 3, we found three key pieces: the partial fingerprint on the window latch, the phone records showing two calls to an unknown number, and the witness who placed him near the warehouse. Want me to break down how each piece connects?" },
        ],
      },
      {
        title: 'Personalized Content Discovery',
        description:
          'An AI persona that knows your viewing history and preferences — surfacing the right content at the right time and keeping viewers engaged across your entire catalog.',
        capabilities: ['Viewing history analysis', 'Smart recommendations', 'Catalog navigation'],
        channels: ['Web', 'Mobile App', 'Smart TV'],
        demoPersona: 'StreamGuide AI',
        demoMessages: [
          { role: 'user', text: "I just finished Season 2 of Dark Matter. What should I watch next?" },
          { role: 'ai', text: "Based on your watch history, you'll love 'Severance' — same psychological tension and mind-bending plot twists. You've also been watching a lot of sci-fi thrillers lately, so 'Pantheon' is another strong match. Want me to add both to your watchlist?" },
          { role: 'user', text: "Yes! Also, are there any new releases this week I'd like?" },
          { role: 'ai', text: "Two new releases match your taste profile: 'The Peripheral' Season 2 dropped yesterday — you rated the first season 4.5 stars — and 'Constellation' is a new psychological thriller that's trending in your genre. Starting either one now?" },
        ],
      },
      {
        title: 'Viewer Retention & Loyalty',
        description:
          'Keep viewers coming back with AI-powered engagement — episode recaps, behind-the-scenes insights, cast Q&As, and exclusive content delivered through conversational personas.',
        capabilities: ['Episode recaps', 'Behind-the-scenes access', 'Loyalty rewards'],
        channels: ['Web Chat', 'WhatsApp', 'Push Notifications'],
        demoPersona: 'ShowInsider AI',
        demoMessages: [
          { role: 'user', text: "I missed last week's episode of The Crown. Can you give me a quick recap?" },
          { role: 'ai', text: "Of course! Episode 6 focused on the tension between the Palace and the press following the Fayed relationship. Key moments: the private meeting between Diana and her advisors, the leaked memo that caused a diplomatic incident, and the cliffhanger ending with the phone call. Ready to watch Episode 7?" },
          { role: 'user', text: "Yes! Is there any behind-the-scenes content for this season?" },
          { role: 'ai', text: "Great news — you're a Premium subscriber, so you have access to the full 'Making of Season 6' documentary, 3 cast interviews, and the director's commentary for every episode. I've added them all to your library. The cast interview with the lead actress is especially worth watching first." },
        ],
      },
    ],
  },
  healthcare: {
    name: 'Healthcare',
    tagline: 'Informed patients, better outcomes',
    description:
      'AI personas that help patients understand conditions, navigate care pathways, and access clinical knowledge — with compliance guardrails built in.',
    color: '#14b8a6',
    bg: 'rgba(20,184,166,0.12)',
    border: 'rgba(20,184,166,0.3)',
    useCases: [
      {
        title: 'Patient Education Persona',
        description:
          'A knowledgeable, empathetic AI that explains diagnoses, medications, and procedures in plain language — trained on your clinical content library.',
        capabilities: ['Plain-language explanations', 'Medication guidance', 'Compliance guardrails'],
        channels: ['Web Portal', 'WhatsApp', 'Voice'],
        demoPersona: 'HealthGuide',
        demoMessages: [
          { role: 'user', text: "My doctor mentioned I have Type 2 diabetes. What does that actually mean?" },
          { role: 'ai', text: "Type 2 diabetes means your body isn't using insulin effectively, causing blood sugar to stay elevated. The good news: it's highly manageable with lifestyle changes and, if needed, medication. Would you like me to explain what your daily routine might look like?" },
          { role: 'user', text: 'Yes please, and what foods should I avoid?' },
          { role: 'ai', text: "Focus on reducing refined carbs and sugary drinks — those spike blood sugar fastest. I'll share a simple food guide. But first, has your doctor mentioned an HbA1c target for you?" },
        ],
      },
    ],
  },
};

function MockChatDemo({ messages, persona, slug }: { messages: { role: 'user' | 'ai'; text: string }[]; persona: string; slug?: string }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const startDemo = () => {
    setVisibleCount(0);
    setIsPlaying(true);
  };

  const tryDemoLabel =
    slug === 'creator-economy' ? 'Talk to an AI Creator' :
    slug === 'ott-streaming'? 'Try Live Demo' : 'Try Demo';

  useEffect(() => {
    if (!isPlaying) return;
    if (visibleCount >= messages.length) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setVisibleCount((v) => v + 1);
    }, 900);
    return () => clearTimeout(timer);
  }, [isPlaying, visibleCount, messages.length]);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d0f18] overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-white/[0.02]">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] flex items-center justify-center text-xs font-bold text-white">
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

      {/* Messages */}
      <div className="p-4 space-y-3 min-h-[200px]">
        {messages.slice(0, visibleCount).map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            style={{ animation: 'fadeSlideUp 0.3s ease-out' }}
          >
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' ?'bg-[#7c3aed] text-white rounded-br-sm' :'bg-white/8 text-white/85 rounded-bl-sm border border-white/8'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isPlaying && visibleCount < messages.length && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl bg-white/8 border border-white/8 flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
        {!isPlaying && visibleCount === 0 && (
          <div className="flex items-center justify-center h-32 text-white/30 text-sm">
            Click &quot;Try Demo&quot; to see a live preview
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="px-4 py-3 border-t border-white/8 flex items-center gap-3">
        <div className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-sm text-white/30">
          Type a message...
        </div>
        {slug === 'ott-streaming' ? (
          <a
            href="https://personamatrix-uxe3i53.public.builtwithrocket.new/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white btn-primary flex-shrink-0"
          >
            Try Live Demo
          </a>
        ) : (
          <button
            onClick={startDemo}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white btn-primary flex-shrink-0"
          >
            {isPlaying ? 'Playing...' : visibleCount > 0 ? 'Replay' : tryDemoLabel}
          </button>
        )}
      </div>
    </div>
  );
}

function UseCaseCard({ useCase, color, isFirst, slug }: { useCase: UseCase; color: string; isFirst: boolean; slug?: string }) {
  const [expanded, setExpanded] = useState(isFirst);

  const primaryCTALabel =
    slug === 'creator-economy' ? 'Experience the Persona' :
    slug === 'ott-streaming'? 'Build Your OTT Persona' : 'Get Started';

  return (
    <div
      className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden transition-all duration-300"
      style={{ borderColor: expanded ? `${color}40` : undefined }}
    >
      <button
        className="w-full text-left p-6 flex items-start gap-4"
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
          style={{ background: `${color}22`, color }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white text-lg mb-1">{useCase.title}</h3>
          <p className="text-sm text-white/50 leading-relaxed">{useCase.description}</p>
        </div>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className={`flex-shrink-0 mt-1 text-white/30 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {expanded && (
        <div className="px-6 pb-6 space-y-6">
          {/* Capabilities + Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Capabilities</p>
              <div className="flex flex-wrap gap-2">
                {useCase.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="px-3 py-1 rounded-full text-xs font-medium border"
                    style={{ background: `${color}15`, borderColor: `${color}30`, color }}
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Channels</p>
              <div className="flex flex-wrap gap-2">
                {useCase.channels.map((ch) => (
                  <span
                    key={ch}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/60"
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Demo */}
          <div>
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Live Preview</p>
            <MockChatDemo messages={useCase.demoMessages} persona={useCase.demoPersona} slug={slug} />
          </div>

          {/* CTAs */}
          <div className="flex gap-3">
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary"
            >
              {primaryCTALabel}
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white/70 border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              Try Sample
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function IndustryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const industry = industryData[slug];

  if (!industry) {
    return (
      <div className="min-h-screen bg-[#0a0c12] text-white flex items-center justify-center">
        <PublicHeader />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Industry not found</h1>
          <Link href="/industries" className="text-[#7c3aed] hover:underline">
            ← Back to Industries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c12] text-white">
      <PublicHeader />

      {/* Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-full pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${industry.color}18 0%, transparent 60%)`,
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Industries
          </Link>

          <div className="flex items-start gap-5 mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: industry.bg, color: industry.color, border: `1px solid ${industry.border}` }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <div>
              <div
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: industry.color }}
              >
                {industry.name}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
                {industry.tagline}
              </h1>
              <p className="text-lg text-white/50 max-w-2xl leading-relaxed">{industry.description}</p>
              {slug === 'creator-economy' && (
                <p className="text-sm font-medium mt-4 max-w-2xl leading-relaxed" style={{ color: industry.color }}>
                  Powered by video-first multimodal AI with memory, context, and personality. Be present for every fan, without being online.
                </p>
              )}
              {slug === 'ott-streaming' && (
                <p className="text-sm font-medium mt-4 max-w-2xl leading-relaxed" style={{ color: industry.color }}>
                  Powered by persona intelligence that understands your content at the scene, character, and storyline level — turning passive viewers into active participants.
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl font-semibold text-white text-sm btn-primary"
            >
              Get Started
            </Link>
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl font-semibold text-sm text-white/70 border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              Book Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Why PersonaMatrix for Creator Economy — Comparison Table */}
      {slug === 'creator-economy' && (
        <section className="py-16 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10">
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Differentiation</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Why PersonaMatrix for Creators</h2>
              <p className="text-sm text-white/40 mt-2">See how creators can engage and scale their audience in real time.</p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="text-left px-6 py-4 text-white/40 font-semibold uppercase tracking-widest text-xs w-1/3">Capability</th>
                    <th className="text-left px-6 py-4 text-white/40 font-semibold uppercase tracking-widest text-xs w-1/3">Traditional Creator Tools</th>
                    <th className="text-left px-6 py-4 font-semibold uppercase tracking-widest text-xs w-1/3 rounded-t-xl" style={{ color: '#7c3aed', background: 'rgba(124,58,237,0.08)' }}>PersonaMatrix</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { capability: 'Audience Engagement', traditional: 'Scheduled posts, delayed replies, limited reach', pm: 'AI persona engages every fan instantly, 24/7, in your voice and style' },
                    { capability: 'Monetization Potential', traditional: 'Ad revenue, sponsorships — dependent on algorithm', pm: 'Conversational monetization from courses, content, and expertise on demand' },
                    { capability: 'Personalization', traditional: 'Generic broadcasts to entire audience', pm: "Personalized 1:1 conversations tailored to each fan's interests and history" },
                    { capability: 'Availability', traditional: "Only when you're online or posting", pm: 'Always-on AI persona available across all channels, every hour of the day' },
                    { capability: 'Interaction Depth', traditional: 'Comments, likes, and surface-level engagement', pm: 'Deep, contextual conversations that build loyalty and drive action' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/6 last:border-0">
                      <td className="px-6 py-4 text-white/70 font-medium">{row.capability}</td>
                      <td className="px-6 py-4 text-white/40">{row.traditional}</td>
                      <td className="px-6 py-4 font-medium" style={{ color: '#7c3aed', background: 'rgba(124,58,237,0.05)' }}>{row.pm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Why PersonaMatrix for OTT — Comparison Table */}
      {slug === 'ott-streaming' && (
        <section className="py-16 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10">
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Differentiation</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Why PersonaMatrix for OTT Platforms</h2>
              <p className="text-sm text-white/40 mt-2">Transform passive viewing into active, personalized engagement.</p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="text-left px-6 py-4 text-white/40 font-semibold uppercase tracking-widest text-xs w-1/3">Capability</th>
                    <th className="text-left px-6 py-4 text-white/40 font-semibold uppercase tracking-widest text-xs w-1/3">Traditional Streaming Tools</th>
                    <th className="text-left px-6 py-4 font-semibold uppercase tracking-widest text-xs w-1/3 rounded-t-xl" style={{ color: '#14b8a6', background: 'rgba(20,184,166,0.08)' }}>PersonaMatrix</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { capability: 'Viewer Engagement', traditional: 'Passive watching, static recommendations', pm: 'Interactive AI personas that viewers can converse with about content, characters, and storylines' },
                    { capability: 'Content Discovery', traditional: 'Algorithm-based carousels, limited personalization', pm: 'Conversational discovery — viewers describe what they want and get instant, contextual recommendations' },
                    { capability: 'Character Connection', traditional: 'No direct interaction with show characters', pm: 'AI character personas that respond in-character, deepening emotional investment and loyalty' },
                    { capability: 'Retention', traditional: 'Push notifications and email reminders', pm: 'Proactive AI engagement — recaps, teasers, and personalized nudges that bring viewers back' },
                    { capability: 'Data Insights', traditional: 'View counts and completion rates only', pm: 'Rich conversational data revealing what viewers love, question, and want more of' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/6 last:border-0">
                      <td className="px-6 py-4 text-white/70 font-medium">{row.capability}</td>
                      <td className="px-6 py-4 text-white/40">{row.traditional}</td>
                      <td className="px-6 py-4 font-medium" style={{ color: '#14b8a6', background: 'rgba(20,184,166,0.05)' }}>{row.pm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Business Impact — Creator Economy */}
      {slug === 'creator-economy' && (
        <section className="py-16 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8">
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Outcomes</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Business Impact</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '🚀', text: 'Engage thousands of fans simultaneously — without being online.' },
                { icon: '💰', text: 'Generate new revenue from your content and expertise through conversational AI experiences.' },
                { icon: '🔁', text: 'Increase audience retention and loyalty with personalized, always-on interactions.' },
                { icon: '📈', text: 'Scale your personal brand without scaling your effort or time.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border border-white/8 bg-white/[0.02]">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <p className="text-white/70 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Business Impact — OTT */}
      {slug === 'ott-streaming' && (
        <section className="py-16 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8">
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Outcomes</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Business Impact</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '📺', text: 'Increase watch time and session depth by turning passive viewers into active participants.' },
                { icon: '🎭', text: 'Build deeper character and storyline connections that drive subscription renewals and word-of-mouth.' },
                { icon: '🔍', text: 'Improve content discovery and catalog utilization with conversational AI recommendations.' },
                { icon: '📊', text: 'Unlock rich viewer intent data from conversations to inform content strategy and acquisition decisions.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border border-white/8 bg-white/[0.02]">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <p className="text-white/70 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Use Cases */}
      <section className="py-16 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Use Cases</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {slug === 'creator-economy' ? 'How Creators Use PersonaMatrix' : 'How OTT Platforms Use PersonaMatrix'}
            </h2>
          </div>
          <div className="space-y-4">
            {industry.useCases.map((useCase, i) => (
              <UseCaseCard
                key={useCase.title}
                useCase={useCase}
                color={industry.color}
                isFirst={i === 0}
                slug={slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-3xl mx-auto px-6 text-center">
          {slug === 'creator-economy' && (
            <p className="text-xs font-medium text-white/40 mb-4">
              Deploy your AI persona across websites, apps, and messaging platforms in minutes.
            </p>
          )}
          {slug === 'ott-streaming' && (
            <p className="text-xs font-medium text-white/40 mb-4">
              Launch your first OTT persona in under 30 minutes — no engineering required.
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {slug === 'creator-economy' ? 'Build Your AI Persona' : 'Engage Your Viewers with AI'}
          </h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">
            {slug === 'creator-economy' ?'Start free and launch your AI creator persona in minutes. No technical skills required.' :'Start with a pre-configured OTT persona template and go live in under 30 minutes.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-3.5 rounded-xl font-semibold text-white text-sm btn-primary"
            >
              {slug === 'creator-economy' ? 'Build Your AI Persona' : 'Start Free'}
            </Link>
            <Link
              href="/register"
              className="px-8 py-3.5 rounded-xl font-semibold text-sm text-white/70 border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              {slug === 'creator-economy' ? 'Request Demo' : 'Explore Other Industries'}
            </Link>
          </div>
          {slug === 'creator-economy' && (
            <p className="mt-6 text-xs text-white/30">
              Create your first persona — free, no credit card required.
            </p>
          )}
          {slug === 'ott-streaming' && (
            <p className="mt-6 text-xs text-white/30">
              Enterprise-ready, scalable, and built for modern streaming platforms.
            </p>
          )}
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
