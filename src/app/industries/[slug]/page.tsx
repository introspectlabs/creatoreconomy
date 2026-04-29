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
  'finance-trading': {
    name: 'Finance & Trading Creators',
    tagline: 'Scale Your Trading Knowledge Without Scaling Your Time',
    description:
      'PersonaMatrix turns your trading strategies, market analysis, and investment frameworks into an AI persona your followers can learn from 24/7 — in your voice, with your insights.',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.3)',
    useCases: [
      {
        title: 'Your AI Trading Mentor, Always On',
        description:
          'Create an AI version of yourself that answers questions about your strategies, explains market concepts, and shares your frameworks — without you being available around the clock.',
        capabilities: ['Strategy Q&A in your voice', 'Market concept explanations', '24/7 follower engagement'],
        channels: ['Web Chat', 'WhatsApp', 'API'],
        demoPersona: 'Finance Creator AI',
        demoMessages: [
          { role: 'user', text: "Hey! I saw your video on options trading. What's the safest strategy for beginners?" },
          { role: 'ai', text: "Great question! For beginners, I always recommend starting with covered calls — you already own the stock, so your risk is capped. It's the strategy I used in my first year to generate consistent income without big downside exposure. Want me to walk you through a real example from my portfolio?" },
          { role: 'user', text: 'Yes! And do you have a course that covers this in depth?' },
          { role: 'ai', text: "I do — my 'Options Income Blueprint' covers covered calls, cash-secured puts, and the wheel strategy with real trade examples. Over 8,000 students have used it to generate their first options income. I can share the full curriculum and a free preview module right now." },
        ],
      },
      {
        title: 'Monetize Your Market Analysis',
        description:
          'Turn your daily market commentary, watchlists, and trade setups into a paid AI experience. Followers pay to access your AI for deeper analysis and personalized guidance.',
        capabilities: ['Course preview conversations', 'Enrollment Q&A', 'Upsell to premium tiers'],
        channels: ['Web', 'WhatsApp', 'Landing Page Embed'],
        demoPersona: 'Course Sales AI',
        demoMessages: [
          { role: 'user', text: "I want to learn web development but I'm a complete beginner. Is your course right for me?" },
          { role: 'ai', text: "Absolutely — my course was designed specifically for complete beginners. We start from zero: no prior coding experience needed. By the end, you'll have built 5 real projects you can show employers. 94% of my students with no background complete the course and land their first freelance project within 3 months. Want me to share the full curriculum?" },
          { role: 'user', text: 'How much does it cost and is there a free trial?' },
          { role: 'ai', text: "The full course is $199, but I offer a 7-day free trial — you get access to the first 3 modules with no credit card required. If you love it, you continue. If not, no charge. I can start your trial right now. Ready?" },
        ],
      },
      {
        title: 'Reduce Support & Boost Completion',
        description:
          'Most students drop out because they get stuck and don\'t get help fast enough. Your AI tutor answers instantly — keeping students moving forward and dramatically improving completion rates.',
        capabilities: ['Instant homework help', 'Progress check-ins', 'Completion rate improvement'],
        channels: ['Web Chat', 'Email Follow-up', 'LMS Integration'],
        demoPersona: 'Student Success AI',
        demoMessages: [
          { role: 'user', text: "I haven't logged in for 2 weeks. I feel like I'm falling behind and might quit." },
          { role: 'ai', text: "I'm glad you reached out — this is exactly the moment most students give up, but you don't have to. You've already completed 60% of the course, which is the hardest part. The remaining modules are shorter and more hands-on. Let's get you back on track: I'll create a 15-minute daily plan that fits your schedule. Can you commit to 15 minutes today?" },
          { role: 'user', text: "Yes, I can do 15 minutes. Where should I start?" },
          { role: 'ai', text: "Perfect. Start with Module 4, Lesson 2 — it's a quick 12-minute video and you'll build something you can actually use. I'll check in with you tomorrow to see how it went. You're closer to the finish line than you think. Go get it! 🚀" },
        ],
      },
    ],
  },
  'education-courses': {
    name: 'Education & Course Creators',
    tagline: 'Turn Your Course Content Into an Interactive AI Tutor',
    description:
      'PersonaMatrix transforms your lessons, videos, and expertise into an AI that students can learn from interactively — reducing your support load while increasing course completion and sales.',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.12)',
    border: 'rgba(59,130,246,0.3)',
    useCases: [
      {
        title: 'AI Tutor From Your Course Content',
        description:
          'Your students get instant answers from your actual course material — no more waiting for office hours or digging through modules. Your AI explains concepts in your teaching style.',
        capabilities: ['Lesson Q&A from your content', 'Concept explanations in your style', 'Student support automation'],
        channels: ['Web Chat', 'LMS Embed', 'WhatsApp'],
        demoPersona: 'Course AI Tutor',
        demoMessages: [
          { role: 'user', text: "I'm stuck on Module 3 — I don't understand how compound interest actually works." },
          { role: 'ai', text: "No worries — this trips up a lot of students! Compound interest is interest earned on both your original money AND the interest you've already earned. Think of it as a snowball rolling downhill — it gets bigger as it picks up more snow. In Module 3, I use the example of $1,000 at 10% annually: after year 1 you have $1,100, but year 2 you earn 10% on $1,100 not $1,000. Want me to walk through the full calculation from the lesson?" },
          { role: 'user', text: 'Yes! And is there a formula I should memorize?' },
          { role: 'ai', text: "The formula is A = P(1 + r/n)^(nt) — I cover this in detail in the Module 3 worksheet with 5 practice problems. I've also got a shortcut called the 'Rule of 72' that lets you estimate doubling time in your head. Want me to explain that too?" },
        ],
      },
      {
        title: 'Sell More Courses Through Conversations',
        description:
          'Your AI persona answers prospective students\' questions, shares course previews, and guides them to enroll — turning curious visitors into paying students automatically.',
        capabilities: ['Course preview conversations', 'Enrollment Q&A', 'Upsell to premium tiers'],
        channels: ['Web', 'WhatsApp', 'Landing Page Embed'],
        demoPersona: 'Course Sales AI',
        demoMessages: [
          { role: 'user', text: "I want to learn web development but I'm a complete beginner. Is your course right for me?" },
          { role: 'ai', text: "Absolutely — my course was designed specifically for complete beginners. We start from zero: no prior coding experience needed. By the end, you'll have built 5 real projects you can show employers. 94% of my students with no background complete the course and land their first freelance project within 3 months. Want me to share the full curriculum?" },
          { role: 'user', text: 'How much does it cost and is there a free trial?' },
          { role: 'ai', text: "The full course is $199, but I offer a 7-day free trial — you get access to the first 3 modules with no credit card required. If you love it, you continue. If not, no charge. I can start your trial right now. Ready?" },
        ],
      },
      {
        title: 'Reduce Support & Boost Completion',
        description:
          'Most students drop out because they get stuck and don\'t get help fast enough. Your AI tutor answers instantly — keeping students moving forward and dramatically improving completion rates.',
        capabilities: ['Instant homework help', 'Progress check-ins', 'Completion rate improvement'],
        channels: ['Web Chat', 'Email Follow-up', 'LMS Integration'],
        demoPersona: 'Student Success AI',
        demoMessages: [
          { role: 'user', text: "I haven't logged in for 2 weeks. I feel like I'm falling behind and might quit." },
          { role: 'ai', text: "I'm glad you reached out — this is exactly the moment most students give up, but you don't have to. You've already completed 60% of the course, which is the hardest part. The remaining modules are shorter and more hands-on. Let's get you back on track: I'll create a 15-minute daily plan that fits your schedule. Can you commit to 15 minutes today?" },
          { role: 'user', text: "Yes, I can do 15 minutes. Where should I start?" },
          { role: 'ai', text: "Perfect. Start with Module 4, Lesson 2 — it's a quick 12-minute video and you'll build something you can actually use. I'll check in with you tomorrow to see how it went. You're closer to the finish line than you think. Go get it! 🚀" },
        ],
      },
    ],
  },
  'coaches': {
    name: 'Coaches — Fitness, Career & Business',
    tagline: 'Scale Your Coaching Without Burning Out',
    description:
      'PersonaMatrix lets you handle client intake, share your frameworks, and keep clients engaged between sessions — so you can focus on high-value coaching work instead of repetitive questions.',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.3)',
    useCases: [
      {
        title: 'Automate Client Intake & Onboarding',
        description:
          'Your AI handles the first conversation with every potential client — qualifying them, explaining your programs, and booking discovery calls — so you only spend time with the right people.',
        capabilities: ['Lead qualification', 'Program explanation', 'Discovery call booking'],
        channels: ['Web Chat', 'WhatsApp', 'Landing Page'],
        demoPersona: 'Coaching Intake AI',
        demoMessages: [
          { role: 'user', text: "I'm interested in your business coaching. What do you offer?" },
          { role: 'ai', text: "Great to meet you! I work with founders and executives who want to scale from 6 to 7 figures without working more hours. My 90-day program covers revenue strategy, team building, and systems. Before I tell you more — what's your biggest challenge right now: revenue growth, team issues, or time management?" },
          { role: 'user', text: "Definitely revenue. I'm stuck at $30k/month and can't seem to break through." },
          { role: 'ai', text: "That's a very common ceiling — and it's almost always a positioning and offer problem, not a hustle problem. I've helped 40+ founders break through exactly this. I'd love to get you on a 30-minute strategy call with me to map out your specific path. I have slots this Thursday and Friday — which works better?" },
        ],
      },
      {
        title: 'Keep Clients Engaged Between Sessions',
        description:
          'Clients get the most value when they stay consistent. Your AI reinforces your frameworks, answers questions between sessions, and keeps clients accountable — extending your impact without your time.',
        capabilities: ['Framework Q&A', 'Accountability check-ins', 'Between-session support'],
        channels: ['WhatsApp', 'Web Chat', 'App Embed'],
        demoPersona: 'Fitness Coach AI',
        demoMessages: [
          { role: 'user', text: "I skipped the gym 3 days this week. I feel terrible about it." },
          { role: 'ai', text: "First — don't beat yourself up. Missing 3 days doesn't undo your progress. What matters is what you do today. Remember what we talked about in our last session: consistency over perfection. One missed week doesn't define your journey. What's one thing that got in the way this week? Let's solve that together." },
          { role: 'user', text: "Work got crazy. I just didn't have energy after long days." },
          { role: 'ai', text: "That's real — and it's exactly why we built your 20-minute 'low energy' workout option. It's in your program under Week 4. On high-stress days, that's your go-to. It keeps the habit alive without draining you further. Can you commit to that version tomorrow morning before work starts?" },
        ],
      },
      {
        title: 'Deliver Your Frameworks at Scale',
        description:
          'Your coaching methodology is your most valuable asset. Your AI teaches your frameworks to hundreds of clients simultaneously — giving everyone the benefit of your expertise without you repeating yourself.',
        capabilities: ['Framework teaching', 'Methodology Q&A', 'Scalable group coaching'],
        channels: ['Web', 'WhatsApp', 'Community Embed'],
        demoPersona: 'Career Coach AI',
        demoMessages: [
          { role: 'user', text: "I found you on Instagram. What makes your skincare different from other brands?" },
          { role: 'ai', text: "Love that you found us! The big difference: we formulate everything without the 12 most common irritants — no parabens, sulfates, synthetic fragrance, or alcohol. Our founder started the brand after struggling with sensitive skin for years and couldn't find anything that worked. Every product is dermatologist-tested and we publish all our ingredient sourcing. What's your main skin concern? I'll point you to exactly the right product." },
          { role: 'user', text: "I have dry skin and some redness around my nose." },
          { role: 'ai', text: "That combination is really common — dry skin often triggers redness as your skin tries to compensate. Our Barrier Repair Serum was made for exactly this: it rebuilds your skin's moisture barrier and calms redness within 2 weeks. 89% of customers with your skin type see visible improvement. I can set you up with a starter kit that includes the serum plus our gentle cleanser — it's 20% off for first-time customers." },
        ],
      },
    ],
  },
  'd2c-commerce': {
    name: 'D2C Founders & Commerce Creators',
    tagline: 'Give Every Customer a Personal Shopping Assistant',
    description:
      'PersonaMatrix creates an AI that knows your products inside out — answering questions, handling objections, and guiding buyers from discovery to checkout automatically.',
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.12)',
    border: 'rgba(236,72,153,0.3)',
    useCases: [
      {
        title: 'AI That Sells Your Products 24/7',
        description:
          'Your AI knows every product detail, handles common objections, and guides customers to the right purchase — even when you\'re asleep. No more lost sales from unanswered questions.',
        capabilities: ['Product Q&A', 'Objection handling', '24/7 purchase guidance'],
        channels: ['Web Chat', 'WhatsApp', 'Shopify Embed'],
        demoPersona: 'D2C Sales AI',
        demoMessages: [
          { role: 'user', text: "I'm looking for a protein powder but I'm lactose intolerant. Do any of yours work for me?" },
          { role: 'ai', text: "Absolutely — our Plant Power Blend is 100% dairy-free and perfect for lactose intolerance. It's made from pea and rice protein, gives you 25g of protein per serving, and has no artificial sweeteners. It's our #1 seller for customers with dietary restrictions. Would you like the chocolate or vanilla flavor? Both are equally popular." },
          { role: 'user', text: "Chocolate sounds good. How does it taste compared to whey protein?" },
          { role: 'ai', text: "Most customers say it's actually creamier than whey — we use coconut milk powder for texture. We have a 94% satisfaction rate and a 30-day money-back guarantee, so there's zero risk. I can add the chocolate Plant Power Blend to your cart right now with free shipping on your first order. Ready?" },
        ],
      },
      {
        title: 'Reduce Returns & Support Tickets',
        description:
          'Most returns happen because customers bought the wrong product. Your AI asks the right questions upfront, recommends the perfect fit, and dramatically reduces costly returns and support volume.',
        capabilities: ['Pre-purchase guidance', 'Size & fit recommendations', 'Return reduction'],
        channels: ['Web', 'WhatsApp', 'Product Page Widget'],
        demoPersona: 'Product Advisor AI',
        demoMessages: [
          { role: 'user', text: "I want to buy the running shoes but I'm not sure which size to get. I'm usually a 10 but sometimes a 10.5." },
          { role: 'ai', text: "Great question — our running shoes run slightly narrow, so if you're between sizes, I always recommend going up. For a 10/10.5, I'd suggest the 10.5. Also, are you planning to use them for road running or trail? That affects which model I'd recommend for you." },
          { role: 'user', text: "Road running, mostly 5k distances." },
          { role: 'ai', text: "Perfect — for road 5k, our CloudStride model in size 10.5 is your best match. It's our most cushioned road shoe and the top choice for distances under 10k. It comes with free returns if the fit isn't right, but 97% of customers who follow my sizing guide keep their first order. Want me to add the 10.5 CloudStride to your cart?" },
        ],
      },
      {
        title: 'Turn Followers Into Repeat Buyers',
        description:
          'Your content builds trust — your AI converts that trust into sales. Engage your social audience with an AI that knows your brand story, your products, and how to turn a curious follower into a loyal customer.',
        capabilities: ['Brand story conversations', 'Follower-to-customer conversion', 'Repeat purchase campaigns'],
        channels: ['Web', 'WhatsApp', 'Instagram Link'],
        demoPersona: 'Brand Commerce AI',
        demoMessages: [
          { role: 'user', text: "I found you on Instagram. What makes your skincare different from other brands?" },
          { role: 'ai', text: "Love that you found us! The big difference: we formulate everything without the 12 most common irritants — no parabens, sulfates, synthetic fragrance, or alcohol. Our founder started the brand after struggling with sensitive skin for years and couldn't find anything that worked. Every product is dermatologist-tested and we publish all our ingredient sourcing. What's your main skin concern? I'll point you to exactly the right product." },
          { role: 'user', text: "I have dry skin and some redness around my nose." },
          { role: 'ai', text: "That combination is really common — dry skin often triggers redness as your skin tries to compensate. Our Barrier Repair Serum was made for exactly this: it rebuilds your skin's moisture barrier and calms redness within 2 weeks. 89% of customers with your skin type see visible improvement. I can set you up with a starter kit that includes the serum plus our gentle cleanser — it's 20% off for first-time customers." },
        ],
      },
    ],
  },
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
};

function MockChatDemo({ messages, persona, slug }: { messages: { role: 'user' | 'ai'; text: string }[]; persona: string; slug?: string }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const startDemo = () => {
    setVisibleCount(0);
    setIsPlaying(true);
  };

  const tryDemoLabel = 'Try Demo';

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

      <div className="px-4 py-3 border-t border-white/8 flex items-center gap-3">
        <div className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-sm text-white/30">
          Type a message...
        </div>
        <button
          onClick={startDemo}
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white btn-primary shrink-0"
        >
          {isPlaying ? 'Playing…' : tryDemoLabel}
        </button>
      </div>
    </div>
  );
}

export default function IndustrySlugPage() {
  const params = useParams();
  const slug = params['slug'] as string;
  const industry = industryData[slug];

  if (!industry) {
    return (
      <div className="min-h-screen bg-[#0a0c12] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Industry not found</h1>
          <Link href="/industries" className="text-[#7c3aed] hover:underline">← Back to Industries</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c12] text-white">
      <PublicHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${industry.color} 0%, transparent 70%)` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Link href="/industries" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            All Creator Verticals
          </Link>

          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium mb-6"
              style={{ borderColor: industry.border, background: industry.bg, color: industry.color }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: industry.color }} />
              Creator Economy
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
              {industry.tagline}
            </h1>
            <p className="text-base sm:text-lg text-white/50 leading-relaxed mb-8 max-w-2xl">
              {industry.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="px-6 py-3 rounded-xl font-semibold text-white text-sm btn-primary w-fit">
                Get Started Free
              </Link>
              <Link href="/pricing" className="px-6 py-3 rounded-xl font-semibold text-sm text-white/70 border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200 w-fit">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Use Cases</p>
          <h2 className="text-3xl font-bold text-white">How {industry.name} use PersonaMatrix</h2>
        </div>

        <div className="flex flex-col gap-16">
          {industry.useCases.map((useCase, i) => (
            <div key={useCase.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-start ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex flex-col gap-5">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold w-fit"
                  style={{ background: industry.bg, color: industry.color, border: `1px solid ${industry.border}` }}
                >
                  Use Case {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-2xl font-bold text-white">{useCase.title}</h3>
                <p className="text-white/55 leading-relaxed">{useCase.description}</p>

                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold text-white/30 uppercase tracking-wider">Capabilities</p>
                  <ul className="flex flex-col gap-2">
                    {useCase.capabilities.map((cap) => (
                      <li key={cap} className="flex items-center gap-2 text-sm text-white/60">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="6" fill="rgba(255,255,255,0.06)" />
                          <path d="M4.5 7l2 2 3-3" stroke={industry.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {useCase.channels.map((ch) => (
                    <span
                      key={ch}
                      className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-white/50"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              <MockChatDemo messages={useCase.demoMessages} persona={useCase.demoPersona} slug={slug} />
            </div>
          ))}
        </div>
      </section>

      {/* Shopify Integration — D2C only */}
      {slug === 'd2c-commerce' && (
        <section className="py-16 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Section header */}
            <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-4"
                  style={{ borderColor: 'rgba(236,72,153,0.3)', background: 'rgba(236,72,153,0.12)', color: '#ec4899' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  Shopify Integration
                </div>
                <h2 className="text-3xl font-bold text-white">Connect Your Shopify Store</h2>
                <p className="text-white/50 mt-3 max-w-xl leading-relaxed">
                  D2C founders can plug PersonaMatrix directly into their Shopify store. Your AI learns your product catalog, handles customer questions, and guides shoppers to checkout — all without leaving your store.
                </p>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#96bf48]/10 border border-[#96bf48]/25 text-[#96bf48] text-sm font-semibold">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.337 23.979l7.453-1.667S19.948 7.486 19.93 7.348c-.018-.139-.14-.231-.264-.231-.122 0-2.293-.046-2.293-.046s-1.527-1.485-1.688-1.643v18.551zM12.396 6.9s-.937-.275-2.473-.275c-3.937 0-5.836 2.469-5.836 4.896 0 2.696 1.763 4.01 3.395 5.133 1.27.867 1.688 1.47 1.688 2.258 0 .9-.72 1.413-1.895 1.413-1.31 0-2.55-.418-2.55-.418l-.464 2.143s1.12.418 1.96.418c.74 0 1.3-.32 1.3-.97 0-2.14-2.57-2.01-2.57-4.87 0-2.51 1.8-4.94 5.42-4.94.7 0 1.82.23 1.82.23z"/>
                  </svg>
                  Shopify Compatible
                </span>
              </div>
            </div>

            {/* How it works steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
              {[
                {
                  step: '01',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                  ),
                  title: 'Connect Your Store',
                  desc: 'Link your Shopify store to PersonaMatrix in one click. No coding required.',
                },
                {
                  step: '02',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4 7h16M4 12h10M4 17h7" />
                      <circle cx="19" cy="17" r="3" />
                    </svg>
                  ),
                  title: 'AI Learns Your Catalog',
                  desc: 'Your product names, descriptions, prices, and variants are automatically loaded into your AI.',
                },
                {
                  step: '03',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  ),
                  title: 'Customers Chat & Buy',
                  desc: 'Shoppers ask questions, get recommendations, and are guided to the right product — all in chat.',
                },
                {
                  step: '04',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  ),
                  title: 'Track & Optimise',
                  desc: 'See which questions drive the most sales and improve your AI over time from your dashboard.',
                },
              ].map(({ step, icon, title, desc }) => (
                <div key={step} className="relative rounded-2xl border border-white/8 bg-white/[0.03] p-6 flex flex-col gap-4 hover:border-[#ec4899]/30 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[#ec4899]"
                      style={{ background: 'rgba(236,72,153,0.12)', border: '1px solid rgba(236,72,153,0.2)' }}>
                      {icon}
                    </div>
                    <span className="text-3xl font-black text-white/5">{step}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
                    <p className="text-xs text-white/45 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: feature list */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 flex flex-col gap-6">
                <h3 className="text-lg font-bold text-white">What your AI can do inside Shopify</h3>
                <ul className="flex flex-col gap-4">
                  {[
                    { label: 'Answer product questions instantly', detail: 'Ingredients, sizing, materials, compatibility — your AI knows it all.' },
                    { label: 'Recommend the right product', detail: 'Based on what the customer tells you, the AI suggests the best match from your catalog.' },
                    { label: 'Handle objections & close sales', detail: 'Price concerns, comparison questions, return policy — your AI responds confidently.' },
                    { label: 'Upsell & cross-sell naturally', detail: 'Suggest bundles, accessories, or complementary products in a conversational way.' },
                    { label: 'Reduce support tickets', detail: 'Common post-purchase questions (shipping, tracking, returns) are answered automatically.' },
                  ].map(({ label, detail }) => (
                    <li key={label} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(236,72,153,0.15)', border: '1px solid rgba(236,72,153,0.25)' }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5 3.5-4" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/85">{label}</p>
                        <p className="text-xs text-white/40 mt-0.5 leading-relaxed">{detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: embed preview card */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 flex flex-col gap-6">
                <h3 className="text-lg font-bold text-white">Embed anywhere in your store</h3>
                <p className="text-sm text-white/45 leading-relaxed">
                  Add your AI as a chat widget on any page — product pages, collection pages, the cart, or the homepage. Customers get help exactly where they need it.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { page: 'Product Page', desc: 'Answer questions before the customer bounces', badge: 'Most Popular' },
                    { page: 'Collection Page', desc: 'Help shoppers narrow down the right product', badge: '' },
                    { page: 'Cart Page', desc: 'Reduce abandonment with last-minute reassurance', badge: '' },
                    { page: 'Homepage', desc: 'Greet new visitors and guide them to bestsellers', badge: '' },
                  ].map(({ page, desc, badge }) => (
                    <div key={page} className="flex items-center gap-4 px-4 py-3 rounded-xl border border-white/6 bg-white/[0.03]">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#ec4899' }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white/80">{page}</span>
                          {badge && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                              style={{ background: 'rgba(236,72,153,0.15)', color: '#ec4899' }}>
                              {badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/35 mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-4 border-t border-white/6">
                  <p className="text-xs text-white/30 leading-relaxed">
                    Installation takes under 5 minutes. Copy a single script tag into your Shopify theme — no developer needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to build your AI persona?</h2>
          <p className="text-white/50 mb-8">
            Join creators already using PersonaMatrix to scale their audience and income.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="px-6 py-3 rounded-xl font-semibold text-white text-sm btn-primary">
              Get Started Free
            </Link>
            <Link href="/industries" className="px-6 py-3 rounded-xl font-semibold text-sm text-white/70 border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200">
              ← All Creator Verticals
            </Link>
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
