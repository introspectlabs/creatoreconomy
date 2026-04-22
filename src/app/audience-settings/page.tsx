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
  User,
  Bell,
  Shield,
  Palette,
  Camera,
  Save,
  Users,
} from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';


const FREE_CHAT_LIMIT = 5;

const audienceNavItems = [
  { href: '/audience-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/audience-following', icon: Heart, label: 'Following' },
  { href: '/audience-discover', icon: Compass, label: 'Discover' },
  { href: '/audience-chats', icon: MessageSquare, label: 'My Chats' },
  { href: '/audience-activity', icon: Clock, label: 'Activity' },
  { href: '/audience-credits', icon: CreditCard, label: 'My Credits' },
  { href: '/audience-trending', icon: TrendingUp, label: 'Trending' },
];

interface SettingsTab {
  id: string;
  label: string;
  icon: React.ElementType;
}

const tabs: SettingsTab[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

function AudienceSidebar({ mobileOpen, setMobileOpen, credits }: {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  credits: number;
}) {
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const freeChatsUsed = 4;

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
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
          >
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

        <div className="mt-3 pt-3 border-t border-white/5">
          <p className="text-[10px] font-semibold tracking-widest text-white/50 px-3 mb-2 uppercase">Account</p>
          <Link
            href="/audience-settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-150 group ${
              pathname === '/audience-settings' ?'bg-[#6b7ff0]/15 text-white border border-[#6b7ff0]/20' :'text-white/50 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            <Settings
              size={17}
              className={`flex-shrink-0 transition-colors ${pathname === '/audience-settings' ? 'text-[#6b7ff0]' : 'text-white/40 group-hover:text-white/70'}`}
            />
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
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/5 transition-all duration-150"
        >
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
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
        style={{ background: 'rgba(10,12,18,0.9)', backdropFilter: 'blur(12px)' }}
        aria-label="Open menu"
      >
        <Menu size={16} />
      </button>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}
      <div className={`lg:hidden fixed left-0 top-0 h-screen z-50 transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent isMobile={true} />
      </div>
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

export default function AudienceSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTheme, setActiveTheme] = useState('Dark');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen text-white flex" style={{ background: '#0a0c12' }}>
      <AudienceSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} credits={0} />

      <main className="flex-1 min-h-screen lg:ml-60">
        {/* Topbar */}
        <div
          className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 sm:px-6 border-b border-white/5"
          style={{ background: 'rgba(10,12,18,0.95)', backdropFilter: 'blur(16px)' }}
        >
          <div className="flex items-center gap-3 pl-10 lg:pl-0">
            <Settings size={16} className="text-[#6b7ff0]" />
            <h1 className="text-sm font-bold text-white">Settings</h1>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all duration-150"
            style={{ background: saved ? 'rgba(34,197,94,0.2)' : 'linear-gradient(135deg, #6b7ff0 0%, #7c3aed 100%)' }}
          >
            <Save size={13} />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        <div className="px-4 sm:px-6 py-6 max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Account Settings</h2>
            <p className="text-white/55 text-sm mt-1">Manage your audience profile and preferences</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Tab nav */}
            <div className="lg:w-48 lg:flex-shrink-0 w-full overflow-x-auto">
              <nav className="flex lg:flex-col gap-1 pb-1 lg:pb-0 scrollbar-hide min-w-max lg:min-w-0 lg:w-full">
                {tabs.map((tab) => {
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm transition-all whitespace-nowrap flex-shrink-0 lg:flex-shrink lg:w-full ${
                        activeTab === tab.id
                          ? 'bg-[#6b7ff0]/15 text-[#6b7ff0] border border-[#6b7ff0]/20'
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <TabIcon size={14} className="flex-shrink-0" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="rounded-2xl border border-white/10 p-5 sm:p-6" style={{ background: 'rgba(255,255,255,0.03)' }}>

                {/* Profile */}
                {activeTab === 'profile' && (
                  <div className="space-y-5">
                    <h3 className="text-base font-semibold text-white">Profile Information</h3>
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6b7ff0] to-[#7c3aed] flex items-center justify-center text-white text-xl font-bold">
                          A
                        </div>
                        <button aria-label="Change profile photo" className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
                          <Camera size={11} className="text-white/70" />
                        </button>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Audience User</p>
                        <p className="text-xs text-[#6b7ff0]">Audience Member</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="first-name" className="block text-xs text-white/50 mb-1.5">First Name</label>
                        <input
                          id="first-name"
                          type="text"
                          defaultValue="Alex"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#6b7ff0]/50 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="last-name" className="block text-xs text-white/50 mb-1.5">Last Name</label>
                        <input
                          id="last-name"
                          type="text"
                          defaultValue="Johnson"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#6b7ff0]/50 transition-all"
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-2">
                        <label htmlFor="email-address" className="block text-xs text-white/50 mb-1.5">Email Address</label>
                        <input
                          id="email-address"
                          type="email"
                          defaultValue="audience@example.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#6b7ff0]/50 transition-all"
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-2">
                        <label htmlFor="display-name" className="block text-xs text-white/50 mb-1.5">Display Name</label>
                        <input
                          id="display-name"
                          type="text"
                          defaultValue="@alexj"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#6b7ff0]/50 transition-all"
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-2">
                        <label htmlFor="bio" className="block text-xs text-white/50 mb-1.5">Bio</label>
                        <textarea
                          id="bio"
                          rows={3}
                          defaultValue="Passionate about AI personas and interactive experiences."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#6b7ff0]/50 transition-all resize-none"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/8">
                      <h4 className="text-sm font-semibold text-white mb-3">Interests</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Education', 'Health', 'Finance', 'Entertainment', 'Food', 'Technology'].map((interest) => (
                          <button
                            key={interest}
                            className="px-3 py-1.5 rounded-full text-xs font-medium border border-[#6b7ff0]/30 bg-[#6b7ff0]/10 text-[#6b7ff0] hover:bg-[#6b7ff0]/20 transition-all"
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications */}
                {activeTab === 'notifications' && (
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-white mb-4">Notification Preferences</h3>
                    {[
                      { label: 'New Content from Followed Creators', desc: 'Get notified when creators you follow post new content', defaultChecked: true },
                      { label: 'Chat Replies', desc: 'Notifications when a persona responds to your chat', defaultChecked: true },
                      { label: 'Credit Balance Alerts', desc: 'Alert when credits are running low (below 5)', defaultChecked: true },
                      { label: 'New Creators in Your Interests', desc: 'Discover new personas matching your interests', defaultChecked: false },
                      { label: 'Weekly Activity Summary', desc: 'A weekly digest of your activity and recommendations', defaultChecked: false },
                      { label: 'Promotional Offers', desc: 'Special deals on credit packs and new features', defaultChecked: false },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between gap-4 py-3 border-b border-white/5 last:border-0">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-white">{item.label}</p>
                          <p className="text-xs text-white/40 mt-0.5 leading-snug">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 ml-2">
                          <input type="checkbox" defaultChecked={item.defaultChecked} className="sr-only peer" />
                          <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#6b7ff0]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Security */}
                {activeTab === 'security' && (
                  <div className="space-y-5">
                    <h3 className="text-base font-semibold text-white">Security Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-xs text-white/50 mb-1.5">Current Password</label>
                        <input
                          id="current-password"
                          type="password"
                          placeholder="Enter current password"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#6b7ff0]/50 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="new-password" className="block text-xs text-white/50 mb-1.5">New Password</label>
                        <input
                          id="new-password"
                          type="password"
                          placeholder="Enter new password"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#6b7ff0]/50 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-xs text-white/50 mb-1.5">Confirm New Password</label>
                        <input
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm new password"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#6b7ff0]/50 transition-all"
                        />
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/8">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                        <div>
                          <p className="text-sm text-white">Two-Factor Authentication</p>
                          <p className="text-xs text-white/40 mt-0.5">Add an extra layer of security to your account</p>
                        </div>
                        <button className="px-3 py-1.5 rounded-xl border border-[#6b7ff0]/30 text-[#6b7ff0] text-xs hover:bg-[#6b7ff0]/10 transition-all self-start sm:self-auto flex-shrink-0">
                          Enable 2FA
                        </button>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/8">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                        <div>
                          <p className="text-sm text-red-400">Delete Account</p>
                          <p className="text-xs text-white/40 mt-0.5">Permanently delete your account and all data</p>
                        </div>
                        <button className="px-3 py-1.5 rounded-xl border border-red-500/30 text-red-400 text-xs hover:bg-red-500/10 transition-all self-start sm:self-auto flex-shrink-0">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Appearance */}
                {activeTab === 'appearance' && (
                  <div className="space-y-5">
                    <h3 className="text-base font-semibold text-white">Appearance</h3>
                    <div>
                      <p className="text-xs text-white/50 mb-3">Theme Mode</p>
                      <div className="flex flex-wrap gap-2">
                        {['Dark', 'Light', 'System'].map((theme) => (
                          <button
                            key={theme}
                            onClick={() => setActiveTheme(theme)}
                            className={`px-4 py-2 rounded-xl border text-sm transition-all ${
                              activeTheme === theme
                                ? 'border-[#6b7ff0]/40 bg-[#6b7ff0]/10 text-[#6b7ff0]'
                                : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white'
                            }`}
                          >
                            {theme}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/8">
                      <p className="text-xs text-white/50 mb-3">Accent Color</p>
                      <div className="flex gap-3">
                        {[
                          { color: '#6b7ff0', label: 'Indigo' },
                          { color: '#7c3aed', label: 'Purple' },
                          { color: '#06b6d4', label: 'Cyan' },
                          { color: '#10b981', label: 'Emerald' },
                          { color: '#f59e0b', label: 'Amber' },
                        ].map((c) => (
                          <button
                            key={c.color}
                            title={c.label}
                            className="w-8 h-8 rounded-full border-2 border-white/20 hover:border-white/60 transition-all"
                            style={{ background: c.color }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/8">
                      <p className="text-xs text-white/50 mb-3">Content Density</p>
                      <div className="flex gap-2">
                        {['Compact', 'Default', 'Comfortable'].map((density) => (
                          <button
                            key={density}
                            className={`px-4 py-2 rounded-xl border text-xs transition-all ${
                              density === 'Default' ?'border-[#6b7ff0]/40 bg-[#6b7ff0]/10 text-[#6b7ff0]' :'border-white/10 text-white/50 hover:border-white/20 hover:text-white'
                            }`}
                          >
                            {density}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-150"
                  style={{ background: saved ? 'rgba(34,197,94,0.3)' : 'linear-gradient(135deg, #6b7ff0 0%, #7c3aed 100%)' }}
                >
                  <Save size={14} />
                  {saved ? 'Saved!' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
