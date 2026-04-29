'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  Brain,
  Sparkles,
  Film,
  Database,
  MessagesSquare,
  BarChart2,
  Radio,
  Plug,
  Building2,
  CodeXml,
  Key,
  BookOpen,
  CircleUser,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Receipt,
  Menu,
  X,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  group: string;
  badge?: string;
}

const navItems: NavItem[] = [
  // WORKSPACE
  { href: '/home-dashboard', icon: LayoutDashboard, label: 'Home', group: 'workspace' },
  { href: '/persona-library', icon: Brain, label: 'Persona Library', group: 'workspace', badge: '12' },
  { href: '/avatar-studio', icon: Sparkles, label: 'Avatar Studio', group: 'workspace' },
  { href: '/video-generation', icon: Film, label: 'Video Generation', group: 'workspace' },
  { href: '/knowledge-base', icon: Database, label: 'Knowledge Base', group: 'workspace' },
  { href: '/conversation-history', icon: MessagesSquare, label: 'Conversation History', group: 'workspace' },
  { href: '/analytics', icon: BarChart2, label: 'Analytics', group: 'workspace' },
  // DEPLOY
  { href: '/channels-page', icon: Radio, label: 'Channels', group: 'deploy', badge: '2' },
  { href: '/services-page', icon: Plug, label: 'Services', group: 'deploy' },
  // MANAGE
  { href: '/organization-rbac', icon: Building2, label: 'Organization', group: 'manage' },
  { href: '/embeds-plugins', icon: CodeXml, label: 'Embeds / Plugins', group: 'manage' },
  { href: '/api-keys', icon: Key, label: 'API Keys', group: 'manage' },
  { href: '/api-docs', icon: BookOpen, label: 'API Docs', group: 'manage' },
  { href: '/creator-profile-editor', icon: CircleUser, label: 'Creator Profile', group: 'manage' },
];

const groupLabels: Record<string, string> = {
  workspace: 'WORKSPACE',
  deploy: 'DEPLOY',
  manage: 'MANAGE',
};

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const groups = ['workspace', 'deploy', 'manage'];

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <aside
      className={`flex flex-col h-full transition-all duration-300 ease-in-out ${
        !isMobile && (collapsed ? 'w-16' : 'w-60')
      } ${isMobile ? 'w-72' : ''}`}
      style={{
        background: 'rgba(10, 12, 18, 0.98)',
        backdropFilter: 'blur(24px)',
        borderRight: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 px-3 border-b border-white/5 ${!isMobile && collapsed ? 'justify-center' : 'gap-2.5'}`}>
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <AppLogo src="/assets/images/image-1775312226237.png" size={48} />
        </div>
        {isMobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 space-y-0.5">
        {groups.map((group) => {
          const items = navItems.filter((i) => i.group === group);
          if (items.length === 0) return null;
          return (
            <div key={`group-${group}`} className="mb-4">
              {(!collapsed || isMobile) && (
                <p className="text-[10px] font-600 tracking-widest text-white/50 px-3 mb-2 uppercase">
                  {groupLabels[group]}
                </p>
              )}
              {items.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                const Icon = item.icon;
                return (
                  <Link
                    key={`nav-${item.href}`}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-150 group relative ${
                      isActive
                        ? 'nav-active text-white' :'text-white/50 hover:text-white/80 hover:bg-white/5'
                    }`}
                    title={(!isMobile && collapsed) ? item.label : undefined}
                  >
                    <Icon
                      size={18}
                      className={`flex-shrink-0 transition-colors ${
                        isActive ? 'text-purple-400' : 'text-white/40 group-hover:text-white/70'
                      }`}
                    />
                    {(!collapsed || isMobile) && (
                      <span className="text-sm font-medium truncate flex-1">{item.label}</span>
                    )}
                    {(!collapsed || isMobile) && item.badge && (
                      <span className="text-[10px] font-600 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full px-1.5 py-0.5 tabular-nums">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Collapse Toggle — desktop only */}
      {!isMobile && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mx-2 mb-2 flex items-center justify-center h-8 rounded-lg border border-white/8 text-white/30 hover:text-white/60 hover:bg-white/5 transition-all duration-150"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={14} /> : (
            <span className="flex items-center gap-2 text-xs px-2">
              <ChevronLeft size={14} />
              <span>Collapse</span>
            </span>
          )}
        </button>
      )}

      {/* User Footer */}
      <div className="border-t border-white/5 p-2">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className={`w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/5 transition-all duration-150 ${(!isMobile && collapsed) ? 'justify-center' : ''}`}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
            <User size={13} className="text-white" />
          </div>
          {(!collapsed || isMobile) && (
            <>
              <div className="flex-1 text-left min-w-0">
                <p className="text-xs font-600 text-white/80 truncate">Arjun Mehta</p>
                <p className="text-[10px] text-white/55 truncate">Admin</p>
              </div>
              <ChevronDown size={12} className="text-white/30 flex-shrink-0" />
            </>
          )}
        </button>

        {userMenuOpen && (!collapsed || isMobile) && (
          <div className="mt-1 rounded-xl border border-white/10 overflow-hidden" style={{ background: 'rgba(20,22,30,0.98)' }}>
            <Link href="/billing" onClick={() => setUserMenuOpen(false)} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-all">
              <Receipt size={13} /> Billing
            </Link>
            <Link href="/settings" onClick={() => setUserMenuOpen(false)} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-all">
              <Settings size={13} /> Settings
            </Link>
            <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all">
              <LogOut size={13} /> Sign Out
            </button>
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile hamburger button */}
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
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <div
        className={`lg:hidden fixed left-0 top-0 h-screen z-50 transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent isMobile={true} />
      </div>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed left-0 top-0 h-screen z-40 transition-all duration-300 ease-in-out ${
          collapsed ? 'w-16' : 'w-60'
        }`}
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