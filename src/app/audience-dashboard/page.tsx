'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Compass,
  Star,
  CreditCard,
  Settings,
  LogOut,
  ChevronDown,
  X,
  Menu,
  Zap,
  Bell,
  Clock,
  TrendingUp,
  Heart,
  Check,
  ShoppingCart,
  Sparkles,
} from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';


// ─── Types ────────────────────────────────────────────────────────────────────
interface Persona {
  id: string;
  name: string;
  creator: string;
  category: string;
  emoji: string;
  description: string;
  followers: string;
  isFollowing: boolean;
  isNew?: boolean;
  rating: number;
}

interface Activity {
  id: string;
  type: 'chat' | 'follow' | 'content';
  persona: string;
  message: string;
  time: string;
  emoji: string;
}

interface CreditPack {
  id: string;
  chats: number;
  price: number;
  label: string;
  popular?: boolean;
  perChat: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURED_PERSONAS: Persona[] = [
  {
    id: '1',
    name: 'Aria Sales',
    creator: 'PersonaMatrix',
    category: 'Sales',
    emoji: '🤝',
    description: 'Outbound sales assistant for SaaS leads — qualifies prospects and books demos.',
    followers: '28.4k',
    isFollowing: true,
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Support Bot v2',
    creator: 'PersonaMatrix',
    category: 'Support',
    emoji: '🛠️',
    description: 'Handles tier-1 support tickets, FAQ resolution, and escalation routing.',
    followers: '94.1k',
    isFollowing: false,
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Maya HR',
    creator: 'PersonaMatrix',
    category: 'HR',
    emoji: '👩‍💼',
    description: 'Internal HR assistant for policy Q&A, onboarding, and leave management.',
    followers: '7.8k',
    isFollowing: true,
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Kai Voice Agent',
    creator: 'PersonaMatrix',
    category: 'Voice',
    emoji: '🎙️',
    description: 'SIP-based voice IVR replacement with natural language understanding.',
    followers: '15.6k',
    isFollowing: false,
    rating: 4.8,
  },
  {
    id: '5',
    name: 'Demo Concierge',
    creator: 'PersonaMatrix',
    category: 'Onboarding',
    emoji: '🎯',
    description: 'Product tour guide for new trial users — walks through key features interactively.',
    followers: '4.3k',
    isFollowing: false,
    isNew: true,
    rating: 4.6,
  },
  {
    id: '6',
    name: 'Zara Retail',
    creator: 'PersonaMatrix',
    category: 'Retail',
    emoji: '🛍️',
    description: 'E-commerce shopping assistant with product discovery and order tracking.',
    followers: '41.2k',
    isFollowing: true,
    rating: 4.9,
  },
];

const PERSONA_SLUGS: Record<string, string> = {
  'Aria Sales': 'aria-sales',
  'Support Bot v2': 'support-bot-v2',
  'Maya HR': 'maya-hr',
  'Kai Voice Agent': 'kai-voice-agent',
  'Demo Concierge': 'demo-concierge',
  'Zara Retail': 'zara-retail',
  'Nova Customer Success': 'nova-customer-success',
  'Multilingual Welcome': 'multilingual-welcome',
};

const RECENT_ACTIVITY: Activity[] = [
  { id: '1', type: 'chat', persona: 'Aria Sales', message: 'You asked about SaaS lead qualification', time: '2h ago', emoji: '💬' },
  { id: '2', type: 'follow', persona: 'Zara Retail', message: 'You started following Zara Retail', time: '1d ago', emoji: '✅' },
  { id: '3', type: 'content', persona: 'Support Bot v2', message: 'New FAQ update available', time: '2d ago', emoji: '🔔' },
  { id: '4', type: 'chat', persona: 'Maya HR', message: 'You completed an onboarding Q&A session', time: '3d ago', emoji: '👩‍💼' },
];

const CATEGORIES = ['All', 'Sales', 'Support', 'HR', 'Voice', 'Onboarding', 'Retail'];

const CREDIT_PACKS: CreditPack[] = [
  { id: 'p1', chats: 10, price: 2, label: '10 Chats', perChat: '$0.20' },
  { id: 'p2', chats: 30, price: 5, label: '30 Chats', perChat: '$0.17', popular: true },
  { id: 'p3', chats: 100, price: 15, label: '100 Chats', perChat: '$0.15' },
  { id: 'p4', chats: 300, price: 39, label: '300 Chats', perChat: '$0.13' },
];

const FREE_CHAT_LIMIT = 5;

// ─── Audience Sidebar ─────────────────────────────────────────────────────────
const audienceNavItems = [
  { href: '/audience-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/audience-following', icon: Heart, label: 'Following' },
  { href: '/audience-discover', icon: Compass, label: 'Discover' },
  { href: '/audience-chats', icon: MessageSquare, label: 'My Chats' },
  { href: '/audience-activity', icon: Clock, label: 'Activity' },
  { href: '/audience-credits', icon: CreditCard, label: 'My Credits' },
  { href: '/audience-trending', icon: TrendingUp, label: 'Trending' },
];

function AudienceSidebar({ mobileOpen, setMobileOpen, freeChatsUsed, credits }: {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  freeChatsUsed: number;
  credits: number;
}) {
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <aside
      className={`flex flex-col h-full ${isMobile ? 'w-72' : 'w-60'}`}
      style={{
        background: 'rgba(10, 12, 18, 0.98)',
        backdropFilter: 'blur(24px)',
        borderRight: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-white/5 gap-2.5">
        <AppLogo src="/assets/images/image-1775312226237.png" size={48} />
        {isMobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Audience badge */}
      <div className="mx-3 mt-3 mb-1 px-3 py-2 rounded-xl bg-[#6b7ff0]/10 border border-[#6b7ff0]/20 flex items-center gap-2">
        <Users size={13} className="text-[#6b7ff0] flex-shrink-0" />
        <span className="text-xs font-semibold text-[#6b7ff0]">Audience Account</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        <p className="text-[10px] font-semibold tracking-widest text-white/25 px-3 mb-2 uppercase">Menu</p>
        {audienceNavItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/audience-dashboard' && pathname === '/audience-dashboard');
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-150 group ${
                isActive
                  ? 'bg-[#6b7ff0]/15 text-white border border-[#6b7ff0]/20'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <Icon
                size={17}
                className={`flex-shrink-0 transition-colors ${isActive ? 'text-[#6b7ff0]' : 'text-white/40 group-hover:text-white/70'}`}
              />
              <span className="text-sm font-medium truncate flex-1">{item.label}</span>
              {item.label === 'My Credits' && (
                <span className="text-[10px] font-bold bg-[#7c3aed]/20 text-[#a78bfa] border border-[#7c3aed]/30 rounded-full px-1.5 py-0.5">
                  {credits}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Free chats progress */}
      <div className="mx-3 mb-3 p-3 rounded-xl border border-white/8 bg-white/3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-white/50 font-medium">Free Chats</span>
          <span className="text-[11px] font-bold text-white">{freeChatsUsed}/{FREE_CHAT_LIMIT}</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(freeChatsUsed / FREE_CHAT_LIMIT) * 100}%`,
              background: freeChatsUsed >= FREE_CHAT_LIMIT ? '#ef4444' : 'linear-gradient(90deg, #6b7ff0, #7c3aed)',
            }}
          />
        </div>
        {freeChatsUsed >= FREE_CHAT_LIMIT && (
          <p className="text-[10px] text-red-400 mt-1">Limit reached — buy credits to continue</p>
        )}
      </div>

      {/* User footer */}
      <div className="border-t border-white/5 p-2">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/5 transition-all duration-150"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6b7ff0] to-[#7c3aed] flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-white">A</span>
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-xs font-semibold text-white/80 truncate">Audience User</p>
            <p className="text-[10px] text-white/35 truncate">audience@example.com</p>
          </div>
          <ChevronDown size={12} className="text-white/30 flex-shrink-0" />
        </button>
        {userMenuOpen && (
          <div className="mt-1 rounded-xl border border-white/10 overflow-hidden" style={{ background: 'rgba(20,22,30,0.98)' }}>
            <Link href="/settings" onClick={() => setUserMenuOpen(false)} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-all">
              <Settings size={13} /> Settings
            </Link>
            <Link href="/login" className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all">
              <LogOut size={13} /> Sign Out
            </Link>
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
        style={{ background: 'rgba(10,12,18,0.9)', backdropFilter: 'blur(12px)' }}
        aria-label="Open menu"
      >
        <Menu size={16} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed left-0 top-0 h-screen z-50 transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <SidebarContent isMobile={true} />
      </div>

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col fixed left-0 top-0 h-screen z-40 w-60"
        style={{
          background: 'rgba(10, 12, 18, 0.95)',
          backdropFilter: 'blur(24px)',
          borderRight: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <SidebarContent isMobile={false} />
      </aside>
    </>
  );
}

// ─── Buy Credits Modal ─────────────────────────────────────────────────────────
function BuyCreditsModal({ onClose, onPurchase }: { onClose: () => void; onPurchase: (chats: number) => void }) {
  const [selected, setSelected] = useState('p2');

  const pack = CREDIT_PACKS.find((p) => p.id === selected)!;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-2xl border border-white/10 p-6 z-10"
        style={{ background: 'rgba(14,16,24,0.98)' }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-all">
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/20 flex items-center justify-center">
            <ShoppingCart size={18} className="text-[#a78bfa]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Buy Chat Credits</h2>
            <p className="text-xs text-white/40">One-time purchase — no subscription</p>
          </div>
        </div>

        {/* Free limit notice */}
        <div className="mb-5 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
          <Zap size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-300/80 leading-relaxed">
            You&apos;ve used all <strong>5 free chats</strong>. Buy credits to keep chatting with your favourite creators.
          </p>
        </div>

        {/* Packs */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {CREDIT_PACKS.map((pack) => (
            <button
              key={pack.id}
              type="button"
              onClick={() => setSelected(pack.id)}
              className={`relative flex flex-col items-start p-4 rounded-xl border transition-all duration-150 text-left ${
                selected === pack.id
                  ? 'border-[#6b7ff0] bg-[#6b7ff0]/10'
                  : 'border-white/10 bg-white/3 hover:bg-white/6 hover:border-white/20'
              }`}
            >
              {pack.popular && (
                <span className="absolute -top-2 left-3 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#7c3aed] text-white">
                  POPULAR
                </span>
              )}
              <p className="text-sm font-bold text-white mb-0.5">{pack.label}</p>
              <p className="text-xl font-extrabold text-[#6b7ff0]">${pack.price}</p>
              <p className="text-[10px] text-white/35 mt-0.5">{pack.perChat} per chat</p>
              {selected === pack.id && (
                <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#6b7ff0] flex items-center justify-center">
                  <Check size={10} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Order summary */}
        <div className="mb-5 px-4 py-3 rounded-xl bg-white/4 border border-white/8">
          <div className="flex items-center justify-between text-xs text-white/50 mb-1">
            <span>{pack.label}</span>
            <span>${pack.price}.00</span>
          </div>
          <div className="flex items-center justify-between text-sm font-bold text-white border-t border-white/8 pt-2 mt-2">
            <span>Total</span>
            <span>${pack.price}.00</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => { onPurchase(pack.chats); onClose(); }}
          className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all duration-150 flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #6b7ff0 0%, #7c3aed 100%)' }}
        >
          <Sparkles size={15} />
          Buy {pack.label} — ${pack.price}
        </button>
        <p className="text-center text-[10px] text-white/25 mt-3">Secure checkout · No recurring charges</p>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AudienceDashboardPage() {
  const [personas, setPersonas] = useState<Persona[]>(FEATURED_PERSONAS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [freeChatsUsed, setFreeChatsUsed] = useState(4);
  const [credits, setCredits] = useState(0);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [notifications] = useState(3);

  const toggleFollow = (id: string) => {
    setPersonas((prev) => prev.map((p) => (p.id === id ? { ...p, isFollowing: !p.isFollowing } : p)));
  };

  const handleChatClick = (e: React.MouseEvent) => {
    if (freeChatsUsed >= FREE_CHAT_LIMIT && credits === 0) {
      e.preventDefault();
      setShowBuyModal(true);
    } else if (freeChatsUsed < FREE_CHAT_LIMIT) {
      setFreeChatsUsed((v) => v + 1);
    } else {
      setCredits((v) => Math.max(0, v - 1));
    }
  };

  const handlePurchase = (chats: number) => {
    setCredits((v) => v + chats);
  };

  const filtered = activeCategory === 'All' ? personas : personas.filter((p) => p.category === activeCategory);
  const following = personas.filter((p) => p.isFollowing);
  const freeRemaining = Math.max(0, FREE_CHAT_LIMIT - freeChatsUsed);

  return (
    <div className="min-h-screen text-white flex" style={{ background: '#0a0c12' }}>
      <AudienceSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        freeChatsUsed={freeChatsUsed}
        credits={credits}
      />

      {/* Main content */}
      <main className="flex-1 min-h-screen lg:ml-60">
        {/* Topbar */}
        <div
          className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 sm:px-6 border-b border-white/5"
          style={{ background: 'rgba(10,12,18,0.95)', backdropFilter: 'blur(16px)' }}
        >
          <div className="flex items-center gap-3 pl-10 lg:pl-0">
            <h1 className="text-sm font-bold text-white">Audience Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            {/* Credits chip */}
            <button
              onClick={() => setShowBuyModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#6b7ff0]/30 bg-[#6b7ff0]/10 hover:bg-[#6b7ff0]/20 transition-all duration-150"
            >
              <CreditCard size={13} className="text-[#6b7ff0]" />
              <span className="text-xs font-bold text-[#6b7ff0]">{credits} credits</span>
            </button>
            {/* Notifications */}
            <button className="relative w-8 h-8 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
              <Bell size={14} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#7c3aed] text-[9px] font-bold text-white flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-6 max-w-6xl mx-auto">
          {/* Welcome banner */}
          <div
            className="rounded-2xl border border-white/10 p-5 mb-6 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(107,127,240,0.15) 0%, rgba(124,58,237,0.10) 100%)' }}
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#7c3aed]/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-white mb-1">Welcome back! 👋</h2>
                <p className="text-sm text-white/50">
                  Following <span className="text-[#6b7ff0] font-semibold">{following.length} creators</span>
                  {freeRemaining > 0
                    ? ` · ${freeRemaining} free chat${freeRemaining !== 1 ? 's' : ''} remaining`
                    : credits > 0
                    ? ` · ${credits} credits available`
                    : ' · Buy credits to keep chatting'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-xl font-bold text-[#6b7ff0]">{following.length}</p>
                  <p className="text-[11px] text-white/40">Following</p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-xl font-bold text-white">{freeChatsUsed}</p>
                  <p className="text-[11px] text-white/40">Chats</p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-xl font-bold text-[#a78bfa]">{credits}</p>
                  <p className="text-[11px] text-white/40">Credits</p>
                </div>
              </div>
            </div>
          </div>

          {/* Free chat limit warning */}
          {freeChatsUsed >= FREE_CHAT_LIMIT && credits === 0 && (
            <div className="mb-6 px-5 py-4 rounded-2xl border border-amber-500/30 bg-amber-500/8 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-3 flex-1">
                <Zap size={18} className="text-amber-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-amber-300">You&apos;ve used all 5 free chats</p>
                  <p className="text-xs text-amber-300/60">Buy credits to continue chatting with creators — no subscription needed.</p>
                </div>
              </div>
              <button
                onClick={() => setShowBuyModal(true)}
                className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-500 hover:bg-amber-400 transition-colors duration-150"
              >
                Buy Credits
              </button>
            </div>
          )}

          {freeChatsUsed === FREE_CHAT_LIMIT - 1 && (
            <div className="mb-6 px-5 py-3 rounded-2xl border border-[#6b7ff0]/20 bg-[#6b7ff0]/8 flex items-center gap-3">
              <Bell size={15} className="text-[#6b7ff0] flex-shrink-0" />
              <p className="text-xs text-[#a5b4fc]">
                <strong>1 free chat left.</strong> After that, you&apos;ll need credits to keep chatting.{' '}
                <button onClick={() => setShowBuyModal(true)} className="underline hover:text-white transition-colors">
                  Buy credits now
                </button>
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main */}
            <div className="xl:col-span-3 flex flex-col gap-6">
              {/* Following strip */}
              {following.length > 0 && (
                <section id="following">
                  <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-4 rounded-full bg-[#6b7ff0]" />
                    Creators You Follow
                  </h2>
                  <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                    {following.map((p) => (
                      <Link
                        key={p.id}
                        href={`/chat/${PERSONA_SLUGS[p.name]}`}
                        onClick={handleChatClick}
                        className="flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/10 bg-white/4 hover:bg-[#6b7ff0]/10 hover:border-[#6b7ff0]/30 transition-all duration-150 w-28 text-center group"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#6b7ff0]/15 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                          {p.emoji}
                        </div>
                        <p className="text-xs font-semibold text-white leading-tight">{p.name}</p>
                        <span className="text-[10px] text-white/40">{p.creator}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Discover */}
              <section id="discover">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-4 rounded-full bg-[#7c3aed]" />
                    Discover Creators
                  </h2>
                </div>

                {/* Category filter */}
                <div className="flex gap-2 overflow-x-auto pb-2 mb-4" style={{ scrollbarWidth: 'none' }}>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                        activeCategory === cat
                          ? 'bg-[#6b7ff0] text-white'
                          : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Persona grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map((persona) => (
                    <div
                      key={persona.id}
                      className="relative flex flex-col gap-3 p-5 rounded-2xl border border-white/10 bg-white/4 hover:bg-white/6 transition-all duration-150 group"
                    >
                      {persona.isNew && (
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#7c3aed]/20 text-[#a78bfa] border border-[#7c3aed]/30">
                          NEW
                        </span>
                      )}
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#6b7ff0]/10 flex items-center justify-center text-2xl flex-shrink-0">
                          {persona.emoji}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-white truncate">{persona.name}</p>
                          <p className="text-xs text-white/40 truncate">by {persona.creator}</p>
                        </div>
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{persona.description}</p>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star size={11} fill="currentColor" />
                        <span className="text-[11px] font-semibold text-white/60">{persona.rating}</span>
                        <span className="text-[11px] text-white/30 ml-1">{persona.followers} followers</span>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-1">
                        <Link
                          href={`/chat/${PERSONA_SLUGS[persona.name]}`}
                          onClick={handleChatClick}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                            freeChatsUsed >= FREE_CHAT_LIMIT && credits === 0
                              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25' :'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {freeChatsUsed >= FREE_CHAT_LIMIT && credits === 0 ? (
                            <><CreditCard size={11} /> Buy to Chat</>
                          ) : (
                            <><MessageSquare size={11} /> Chat</>
                          )}
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleFollow(persona.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                            persona.isFollowing
                              ? 'bg-[#6b7ff0]/15 text-[#6b7ff0] border border-[#6b7ff0]/30 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20'
                              : 'bg-[#6b7ff0] text-white hover:bg-[#5a6ee0]'
                          }`}
                        >
                          {persona.isFollowing ? 'Following' : 'Follow'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right sidebar */}
            <div className="xl:col-span-1 flex flex-col gap-5">
              {/* Credits card */}
              <div id="credits" className="rounded-2xl border border-[#6b7ff0]/20 p-5 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(107,127,240,0.12) 0%, rgba(124,58,237,0.08) 100%)' }}>
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#6b7ff0]/10 blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard size={14} className="text-[#6b7ff0]" />
                    <p className="text-xs font-bold text-white">Chat Credits</p>
                  </div>
                  <p className="text-3xl font-extrabold text-white mb-0.5">{credits}</p>
                  <p className="text-xs text-white/40 mb-4">credits available</p>
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-[11px] text-white/40 mb-1.5">
                      <span>Free chats used</span>
                      <span>{freeChatsUsed}/{FREE_CHAT_LIMIT}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(freeChatsUsed / FREE_CHAT_LIMIT) * 100}%`,
                          background: freeChatsUsed >= FREE_CHAT_LIMIT ? '#ef4444' : 'linear-gradient(90deg, #6b7ff0, #7c3aed)',
                        }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setShowBuyModal(true)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white transition-all duration-150 flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #6b7ff0 0%, #7c3aed 100%)' }}
                  >
                    <ShoppingCart size={13} />
                    Buy Credits
                  </button>
                  <p className="text-center text-[10px] text-white/25 mt-2">No subscription · Pay as you go</p>
                </div>
              </div>

              {/* Recent activity */}
              <div id="activity" className="rounded-2xl border border-white/10 bg-white/4 p-5">
                <h3 className="text-xs font-bold text-white mb-4 flex items-center gap-2">
                  <Clock size={13} className="text-[#6b7ff0]" />
                  Recent Activity
                </h3>
                <div className="flex flex-col gap-3">
                  {RECENT_ACTIVITY.map((act) => (
                    <div key={act.id} className="flex items-start gap-3">
                      <span className="text-base flex-shrink-0 mt-0.5">{act.emoji}</span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{act.persona}</p>
                        <p className="text-[11px] text-white/40 leading-snug">{act.message}</p>
                        <p className="text-[10px] text-white/25 mt-0.5">{act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
                <h3 className="text-xs font-bold text-white mb-4">Quick Links</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'Browse All Creators', href: '/persona-library', emoji: '🔍' },
                    { label: 'Explore Services', href: '/services-page', emoji: '⚡' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/3 border border-white/8 hover:bg-[#6b7ff0]/10 hover:border-[#6b7ff0]/20 text-xs text-white/60 hover:text-white transition-all duration-150"
                    >
                      <span>{link.emoji}</span>
                      {link.label}
                      <svg className="ml-auto" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 6h6M7 4l2 2-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Buy Credits Modal */}
      {showBuyModal && (
        <BuyCreditsModal onClose={() => setShowBuyModal(false)} onPurchase={handlePurchase} />
      )}
    </div>
  );
}
