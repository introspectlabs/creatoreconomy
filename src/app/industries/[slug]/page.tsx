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
      {
        title: 'Symptom Triage Assistant',
        description:
          'A first-response AI that helps patients assess symptom urgency and routes them to the right care level — reducing unnecessary ER visits.',
        capabilities: ['Symptom assessment', 'Urgency routing', 'Appointment booking'],
        channels: ['Web', 'WhatsApp', 'Voice (SIP)'],
        demoPersona: 'CareNavigator',
        demoMessages: [
          { role: 'user', text: "I've had a headache for 3 days and some neck stiffness." },
          { role: 'ai', text: "I want to make sure you're okay. Neck stiffness combined with a persistent headache can sometimes indicate something that needs prompt attention. Are you also experiencing fever, sensitivity to light, or nausea?" },
          { role: 'user', text: 'A little light sensitivity, yes.' },
          { role: 'ai', text: "Please seek medical attention today — not an emergency room necessarily, but an urgent care visit is recommended. I can help you find the nearest clinic and book an appointment right now." },
        ],
      },
    ],
  },
  education: {
    name: 'Education',
    tagline: 'From inquiry to enrollment — guided by AI',
    description:
      'PersonaMatrix transforms course content, lecture videos, placement data, and FAQs into an AI-powered admission and student lifecycle platform — guiding students from discovery to enrollment and beyond.',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.3)',
    useCases: [
      {
        title: 'AI Admission Counselor',
        description:
          'Improves conversion from inquiry to enrollment by delivering personalized course recommendations based on student background, goals, and career aspirations. Reduces drop-offs by engaging students at every step with data-driven insights on career outcomes and ROI. Guides students with data-driven insights on career outcomes and ROI.',
        capabilities: ['Course recommendations', 'Career path guidance', 'ROI & placement data'],
        channels: ['Web Chat', 'WhatsApp', 'Voice'],
        demoPersona: 'AdmissionBot',
        demoMessages: [
          { role: 'user', text: "I'm a commerce graduate interested in data analytics. Which course is right for me?" },
          { role: 'ai', text: "Great fit! Our PG Program in Data Analytics is designed for non-engineering backgrounds. 87% of our commerce graduates land roles in business intelligence and product analytics within 3 months. Average salary jump is 2.4x. Want me to walk you through the curriculum and placement stats?" },
          { role: 'user', text: 'Yes, and what about the MBA in Business Analytics?' },
          { role: 'ai', text: "The PG in Data Analytics is more technical — Python, SQL, Power BI — and faster (6 months vs 18 months for the MBA). The MBA suits those targeting management roles, while the PG is better if you want hands-on analyst roles. Based on your profile, I'd recommend the PG. Shall I connect you with an alumni who made the same choice?" },
        ],
      },
      {
        title: 'Enrollment Funnel Assistant',
        description:
          'Tracks student intent across every touchpoint, identifies drop-offs in the application journey, and re-engages prospects automatically with personalized nudges. Ensures no prospective student is lost due to delayed responses.',
        capabilities: ['Program comparison', 'Application guidance', 'Drop-off re-engagement'],
        channels: ['Web', 'WhatsApp', 'Email'],
        demoPersona: 'EnrollGuide',
        demoMessages: [
          { role: 'user', text: "I started the application last week but got stuck on the essay section." },
          { role: 'ai', text: "I noticed you paused at Step 3 — the Statement of Purpose. Here's a simple framework: 3 sentences on your background, 2 on why this program, 1 on your career goal. Want me to share a sample SOP from a successful applicant in a similar profile?" },
          { role: 'user', text: 'That would really help. Also, when is the next intake?' },
          { role: 'ai', text: "Next intake is July 15th — applications close June 30th, so you have 3 weeks. I'm sending you the SOP sample now. If you complete your application today, you'll also qualify for the early-bird scholarship worth ₹25,000." },
        ],
      },
      {
        title: 'AI Course Tutor',
        description:
          'A personalized learning assistant available 24/7 that improves student engagement and retention by answering questions, explaining concepts, and generating practice problems. Transforms static course content into interactive learning experiences.',
        capabilities: ['Concept explanation', 'Practice generation', 'Progress tracking'],
        channels: ['LMS Embed', 'Web', 'WhatsApp'],
        demoPersona: 'Prof. Ada (Physics)',
        demoMessages: [
          { role: 'user', text: "I don't understand why objects fall at the same rate regardless of mass." },
          { role: 'ai', text: "Great question — this trips up a lot of students. Gravity pulls harder on heavier objects, but heavier objects also resist acceleration more (inertia). These two effects cancel out perfectly, so all objects accelerate at 9.8 m/s² in a vacuum. Want to see the math?" },
          { role: 'user', text: 'Yes, show me the equation.' },
          { role: 'ai', text: "F = ma, and F_gravity = mg. So: mg = ma → g = a. Mass cancels! That's why a feather and a hammer fall together on the Moon (no air resistance). Try this: what would happen if you doubled the mass?" },
        ],
      },
    ],
  },
  'real-estate': {
    name: 'Real Estate',
    tagline: 'Smarter property journeys, faster closings',
    description:
      'PersonaMatrix transforms real estate content — brochures, walkthrough videos, pricing sheets, and CRM data — into an AI Property Advisor that understands buyer intent, enables conversational property discovery, and leverages video and CRM intelligence to guide users from inquiry to site visit.',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.3)',
    useCases: [
      {
        title: 'AI Property Advisor',
        description:
          'Delivers faster property discovery and better matching by understanding buyer intent — budget, location, urgency — and recommending best-fit properties instantly. Guides buyers through objection handling and decision-making, and schedules site visits without manual follow-up. Recommends best-fit properties instantly and guides buyers to schedule site visits.',
        capabilities: ['Intent-based recommendations', 'Objection handling', 'Site visit scheduling'],
        channels: ['Web Chat', 'WhatsApp', 'Voice'],
        demoPersona: 'HomeFind AI',
        demoMessages: [
          { role: 'user', text: "I'm looking for a 3-bedroom home near good schools, budget around ₹80L." },
          { role: 'ai', text: "Based on your budget and school preference, I've shortlisted 3 properties in Whitefield and Sarjapur — both are top-rated school zones. The closest match is a 3BHK at ₹78L with a large garden and 2 covered parking spots. Want me to schedule a site visit this weekend?" },
          { role: 'user', text: 'Yes, Saturday afternoon works. Also, is the price negotiable?' },
          { role: 'ai', text: "The builder has offered a 2% flexibility on ready-to-move units — so you could potentially close at ₹76.4L. I've booked a site visit for Saturday at 2 PM with our advisor Priya. I'll send you the property brochure, location map, and a checklist of what to verify during the visit." },
        ],
      },
      {
        title: 'Lead Scoring & Qualification Bot',
        description:
          'Identifies high-intent buyers by automatically engaging inbound leads and qualifying their financing readiness and purchase timeline. Prioritizes leads as hot, warm, or cold so sales teams focus only on high-value prospects — improving sales efficiency and reducing time wasted on unqualified inquiries.',
        capabilities: ['Hot/warm/cold lead scoring', 'Financing pre-check', 'Conversion trend insights'],
        channels: ['Web', 'WhatsApp', 'Facebook Messenger'],
        demoPersona: 'LeadQual',
        demoMessages: [
          { role: 'user', text: "I saw your listing on MG Road. Is it still available?" },
          { role: 'ai', text: "Yes, the MG Road property is still available! It's a 4BHK listed at ₹1.2Cr. Are you looking to buy in the next 1–3 months, or still in the early research phase?" },
          { role: 'user', text: "We're ready to move. Pre-approved for ₹1.3Cr." },
          { role: 'ai', text: "Excellent — you're a hot lead and in a strong position. I'm flagging you for our senior advisor right now. In the meantime, would you like a full property report including recent comparable sales and neighborhood insights?" },
        ],
      },
      {
        title: 'Virtual Tour & FAQ Guide',
        description:
          'Delivers real-time answers to buyer questions during virtual property tours — covering listings, neighborhoods, and amenities with consistent, scalable engagement. Handles unlimited concurrent buyer interactions across chat, voice, and WhatsApp without additional staffing.',
        capabilities: ['Virtual tour narration', 'Neighborhood insights', 'Instant FAQ'],
        channels: ['Web', 'WhatsApp', 'Voice'],
        demoPersona: 'TourGuide AI',
        demoMessages: [
          { role: 'user', text: "What are the maintenance charges for this apartment?" },
          { role: 'ai', text: "Maintenance is ₹4/sq ft per month — for a 1,200 sq ft unit that's ₹4,800/month. This covers 24/7 security, gym, swimming pool, and landscaping. There's also a one-time sinking fund deposit of ₹50,000. Want a full breakdown of all charges?" },
          { role: 'user', text: "How's the connectivity to the tech park?" },
          { role: 'ai', text: "Very convenient — the property is 4 km from Electronic City Phase 1 and 6 km from Whitefield IT hub. There's a dedicated shuttle service from the complex. Average commute during peak hours is 20–25 minutes. Want me to show the route on a map?" },
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

  const tryDemoLabel = slug === 'creator-economy' ? 'Talk to an AI Creator' : slug === 'education' ? 'Get Course Recommendations' : 'Find Your Ideal Property';

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
            Click "Try Demo" to see a live preview
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="px-4 py-3 border-t border-white/8 flex items-center gap-3">
        <div className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-sm text-white/30">
          Type a message...
        </div>
        <button
          onClick={startDemo}
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white btn-primary flex-shrink-0"
        >
          {isPlaying ? 'Playing...' : visibleCount > 0 ? 'Replay' : tryDemoLabel}
        </button>
      </div>
    </div>
  );
}

function UseCaseCard({ useCase, color, isFirst, slug }: { useCase: UseCase; color: string; isFirst: boolean; slug?: string }) {
  const [expanded, setExpanded] = useState(isFirst);

  const primaryCTALabel = slug === 'creator-economy' ? 'Experience the Persona' : slug === 'education' ? 'Try Admission Counselor AI' : 'Try AI Property Advisor';

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
              {slug === 'real-estate' && (
                <p className="text-sm font-medium mt-4 max-w-2xl leading-relaxed" style={{ color: industry.color }}>
                  Powered by multimodal AI that understands buyer intent, preferences, and decision context.
                </p>
              )}
              {slug === 'creator-economy' && (
                <p className="text-sm font-medium mt-4 max-w-2xl leading-relaxed" style={{ color: industry.color }}>
                  Powered by video-first multimodal AI with memory, context, and personality. Be present for every fan, without being online.
                </p>
              )}
              {slug === 'education' && (
                <p className="text-sm font-medium mt-4 max-w-2xl leading-relaxed" style={{ color: industry.color }}>
                  Powered by multimodal AI that understands student intent, goals, and decision context.
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
                    {
                      capability: 'Audience Engagement',
                      traditional: 'Scheduled posts, delayed replies, limited reach',
                      pm: 'AI persona engages every fan instantly, 24/7, in your voice and style',
                    },
                    {
                      capability: 'Monetization Potential',
                      traditional: 'Ad revenue, sponsorships — dependent on algorithm',
                      pm: 'Conversational monetization from courses, content, and expertise on demand',
                    },
                    {
                      capability: 'Personalization',
                      traditional: 'Generic broadcasts to entire audience',
                      pm: 'Personalized 1:1 conversations tailored to each fan\'s interests and history',
                    },
                    {
                      capability: 'Availability',
                      traditional: 'Only when you\'re online or posting',
                      pm: 'Always-on AI persona available across all channels, every hour of the day',
                    },
                    {
                      capability: 'Interaction Depth',
                      traditional: 'Comments, likes, and surface-level engagement',
                      pm: 'Deep, contextual conversations that build loyalty and drive action',
                    },
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

      {/* Why PersonaMatrix for Real Estate — Comparison Table */}
      {slug === 'real-estate' && (
        <section className="py-16 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10">
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Differentiation</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Why PersonaMatrix for Real Estate</h2>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="text-left px-6 py-4 text-white/40 font-semibold uppercase tracking-widest text-xs w-1/3">Capability</th>
                    <th className="text-left px-6 py-4 text-white/40 font-semibold uppercase tracking-widest text-xs w-1/3">Traditional CRM / Tools</th>
                    <th className="text-left px-6 py-4 font-semibold uppercase tracking-widest text-xs w-1/3 rounded-t-xl" style={{ color: '#10b981', background: 'rgba(16,185,129,0.08)' }}>PersonaMatrix</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      capability: 'Property Discovery',
                      traditional: 'Manual search filters, static listings',
                      pm: 'Conversational AI that understands intent and recommends best-fit properties instantly',
                    },
                    {
                      capability: 'Lead Qualification',
                      traditional: 'Form fills, manual follow-up calls',
                      pm: 'Automated scoring — identifies hot, warm, cold leads in real time',
                    },
                    {
                      capability: 'Customer Engagement',
                      traditional: 'Email blasts, delayed responses, scripted responses',
                      pm: 'Personalized, real-time conversations across chat, voice, and WhatsApp',
                    },
                    {
                      capability: 'Follow-ups',
                      traditional: 'Scheduled reminders, agent-dependent',
                      pm: 'Proactive AI-driven follow-ups triggered by buyer behavior and intent signals',
                    },
                    {
                      capability: 'Channels',
                      traditional: 'Website forms or phone calls only',
                      pm: 'Web, WhatsApp, Voice, Facebook Messenger — all from one platform',
                    },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/6 last:border-0">
                      <td className="px-6 py-4 text-white/70 font-medium">{row.capability}</td>
                      <td className="px-6 py-4 text-white/40">{row.traditional}</td>
                      <td className="px-6 py-4 font-medium" style={{ color: '#10b981', background: 'rgba(16,185,129,0.05)' }}>{row.pm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Business Impact — Real Estate */}
      {slug === 'real-estate' && (
        <section className="py-16 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8">
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Outcomes</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Business Impact</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '📈', text: 'Increase qualified leads by engaging every inbound inquiry instantly — no lead left behind.' },
                { icon: '🏠', text: 'Improve site visit conversion rates with AI-guided property matching and instant scheduling.' },
                { icon: '⚡', text: 'Reduce response time from hours to seconds across all buyer touchpoints.' },
                { icon: '🤝', text: 'Accelerate deal closures by keeping buyers engaged and informed throughout the decision journey.' },
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

      {/* Business Impact — Education */}
      {slug === 'education' && (
        <section className="py-16 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8">
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Outcomes</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Business Impact</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '📈', text: 'Increase enrollment conversion rates by guiding every prospective student from inquiry to application with personalized AI support.' },
                { icon: '🎯', text: 'Reduce admission drop-offs by automatically re-engaging students who pause or abandon the application journey.' },
                { icon: '📚', text: 'Improve student engagement and retention with 24/7 AI tutoring that transforms static content into interactive learning.' },
                { icon: '💰', text: 'Reduce operational and support costs by automating counseling, FAQs, and enrollment guidance at scale.' },
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

      {/* Student Lifecycle AI — Education */}
      {slug === 'education' && (
        <section className="py-12 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Student Lifecycle AI</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  PersonaMatrix provides continuous AI guidance across the entire student journey — from the moment a student discovers your institution to long after they enroll.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-3xl mx-auto px-6 text-center">
          {slug === 'creator-economy' && (
            <p className="text-xs font-medium text-white/40 mb-4">
              Deploy your AI persona across websites, apps, and messaging platforms in minutes.
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {slug === 'creator-economy' ? 'Build Your AI Persona' : `Ready to build for ${industry.name}?`}
          </h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">
            {slug === 'creator-economy' ?'Start free and launch your AI creator persona in minutes. No technical skills required.'
              : `Start with a pre-configured ${industry.name} persona template and go live in under 30 minutes.`}
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
          {slug === 'education' && (
            <p className="mt-6 text-xs text-white/30">
              Enterprise-ready, scalable, and built for modern education institutions.
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
