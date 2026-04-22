'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Heart,
  Compass,
  MessageSquare,
  Clock,
  CreditCard,
  TrendingUp,
  Settings,
  LogOut,
  ChevronDown,
  X,
  Menu,
  Users,
} from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';


const FREE_CHAT_LIMIT = 5;

export const audienceNavItems = [
  { href: '/audience-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/audience-following', icon: Heart, label: 'Following' },
  { href: '/audience-discover', icon: Compass, label: 'Discover' },
  { href: '/audience-chats', icon: MessageSquare, label: 'My Chats' },
  { href: '/audience-activity', icon: Clock, label: 'Activity' },
  { href: '/audience-credits', icon: CreditCard, label: 'My Credits' },
  { href: '/audience-trending', icon: TrendingUp, label: 'Trending' },
];

interface AudienceLayoutProps {
  children: React.ReactNode;
  credits?: number;
  freeChatsUsed?: number;
  topbarTitle?: string;
  topbarIcon?: React.ElementType;
  topbarRight?: React.ReactNode;
}

export default function AudienceLayout({
  children,
  credits = 0,
  freeChatsUsed = 4,
  topbarTitle = 'Audience',
  topbarIcon: TopbarIcon,
  topbarRight,
}: AudienceLayoutProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
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
      <div className="flex items-center h-16 px-4 border-b border-white/5 gap-2.5">
        <AppLogo src="/assets/images/image-1775312226237.png" size={48} />
        {isMobile && (
          <button onClick={() => setMobileOpen(false)} className="ml-auto p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-all">
            <X size={16} />
          </button>
        )}
      </div>

      <div className="mx-3 mt-3 mb-1 px-3 py-2 rounded-xl bg-[#6b7ff0]/10 border border-[#6b7ff0]/20 flex items-center gap-2">
        <Users size={13} className="text-[#6b7ff0] flex-shrink-0" />
        <span className="text-xs font-semibold text-[#6b7ff0]">Audience Account</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        <p className="text-[10px] font-semibold tracking-widest text-white/50 px-3 mb-2 uppercase">Menu</p>
        {audienceNavItems.map((item) => {
          const isActive = pathname === item.href;
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
              <Icon size={17} className={`flex-shrink-0 transition-colors ${isActive ? 'text-[#6b7ff0]' : 'text-white/40 group-hover:text-white/70'}`} />
              <span className="text-sm font-medium truncate flex-1">{item.label}</span>
              {item.label === 'My Credits' && (
                <span className="text-[10px] font-bold bg-[#7c3aed]/20 text-[#a78bfa] border border-[#7c3aed]/30 rounded-full px-1.5 py-0.5">{credits}</span>
              )}
            </Link>
          );
        })}

        <div className="mt-3 pt-3 border-t border-white/5">
          <p className="text-[10px] font-semibold tracking-widest text-white/50 px-3 mb-2 uppercase">Account</p>
          <Link
            href="/audience-settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-150 group ${
              pathname === '/audience-settings' ?'bg-[#6b7ff0]/15 text-white border border-[#6b7ff0]/20' :'text-white/50 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            <Settings size={17} className={`flex-shrink-0 transition-colors ${pathname === '/audience-settings' ? 'text-[#6b7ff0]' : 'text-white/40 group-hover:text-white/70'}`} />
            <span className="text-sm font-medium truncate flex-1">Settings</span>
          </Link>
        </div>
      </nav>

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
      </div>

      <div className="border-t border-white/5 p-2">
        <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/5 transition-all duration-150">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6b7ff0] to-[#7c3aed] flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-white">A</span>
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-xs font-semibold text-white/80 truncate">Audience User</p>
            <p className="text-[10px] text-white/55 truncate">audience@example.com</p>
          </div>
          <ChevronDown size={12} className="text-white/30 flex-shrink-0" />
        </button>
        {userMenuOpen && (
          <div className="mt-1 rounded-xl border border-white/10 overflow-hidden" style={{ background: 'rgba(20,22,30,0.98)' }}>
            <Link href="/audience-settings" onClick={() => setUserMenuOpen(false)} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-all">
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
    <div className="min-h-screen text-white flex" style={{ background: '#0a0c12' }}>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
        style={{ background: 'rgba(10,12,18,0.9)', backdropFilter: 'blur(12px)' }}
        aria-label="Open menu"
      >
        <Menu size={16} />
      </button>
      {mobileOpen && <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />}
      <div className={`lg:hidden fixed left-0 top-0 h-screen z-50 transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent isMobile={true} />
      </div>
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen z-40 w-60" style={{ background: 'rgba(10, 12, 18, 0.95)', backdropFilter: 'blur(24px)', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
        <SidebarContent isMobile={false} />
      </aside>

      <main className="flex-1 min-h-screen lg:ml-60">
        <div
          className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 sm:px-6 border-b border-white/5"
          style={{ background: 'rgba(10,12,18,0.95)', backdropFilter: 'blur(16px)' }}
        >
          <div className="flex items-center gap-3 pl-10 lg:pl-0">
            {TopbarIcon && <TopbarIcon size={16} className="text-[#6b7ff0]" />}
            <h1 className="text-sm font-bold text-white">{topbarTitle}</h1>
          </div>
          {topbarRight && <div className="flex items-center gap-2">{topbarRight}</div>}
        </div>
        {children}
      </main>
    </div>
  );
}
