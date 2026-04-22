'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { User, Bell, Shield, Key, Globe, Palette, Save, Camera } from 'lucide-react';

interface SettingsTab {
  id: string;
  label: string;
  icon: React.ElementType;
}

const tabs: SettingsTab[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'api', label: 'API & Integrations', icon: Key },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'localization', label: 'Localization', icon: Globe },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto overflow-x-hidden">
        {/* Header */}
        <div className="mb-5 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Settings</h1>
          <p className="text-white/50 text-sm mt-1">Manage your account preferences and configurations</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Tab Nav — horizontal scroll on mobile/tablet, vertical on desktop */}
          <div className="lg:w-52 lg:flex-shrink-0 w-full overflow-x-auto">
            <nav className="flex lg:flex-col gap-1 pb-1 lg:pb-0 scrollbar-hide min-w-max lg:min-w-0 lg:w-full">
              {tabs.map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 lg:py-2.5 rounded-lg text-xs sm:text-sm transition-all whitespace-nowrap flex-shrink-0 lg:flex-shrink lg:w-full ${
                      activeTab === tab.id
                        ? 'bg-primary/15 text-primary border border-primary/20' :'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <TabIcon size={14} className="flex-shrink-0" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content Panel */}
          <div className="flex-1 min-w-0 overflow-x-hidden">
            <div className="rounded-2xl border border-white/10 p-4 sm:p-6" style={{ background: 'rgba(255,255,255,0.03)' }}>

              {/* ── Profile ── */}
              {activeTab === 'profile' && (
                <div className="space-y-5 sm:space-y-6">
                  <h2 className="text-base font-semibold text-white">Profile Information</h2>

                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold">
                        A
                      </div>
                      <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
                        <Camera size={11} className="text-white/70" />
                      </button>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Arjun Mehta</p>
                      <p className="text-xs text-white/40">Admin</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs text-white/50 mb-1.5">First Name</label>
                      <input
                        type="text"
                        defaultValue="Arjun"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-1.5">Last Name</label>
                      <input
                        type="text"
                        defaultValue="Mehta"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <label className="block text-xs text-white/50 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        defaultValue="arjun@personamatrix.ai"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <label className="block text-xs text-white/50 mb-1.5">Organization</label>
                      <input
                        type="text"
                        defaultValue="PersonaMatrix Inc."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <label className="block text-xs text-white/50 mb-1.5">Bio</label>
                      <textarea
                        rows={3}
                        defaultValue="AI persona builder and product strategist."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ── Notifications ── */}
              {activeTab === 'notifications' && (
                <div className="space-y-1">
                  <h2 className="text-base font-semibold text-white mb-4">Notification Preferences</h2>
                  {[
                    { label: 'Email Notifications', desc: 'Receive updates via email', defaultChecked: true },
                    { label: 'Persona Activity Alerts', desc: 'Get notified when personas are triggered', defaultChecked: true },
                    { label: 'Knowledge Base Sync', desc: 'Alerts when knowledge sync completes or fails', defaultChecked: false },
                    { label: 'Billing & Usage', desc: 'Invoices and usage threshold alerts', defaultChecked: true },
                    { label: 'Product Updates', desc: 'New features and announcements', defaultChecked: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-4 py-3 border-b border-white/5 last:border-0">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-white">{item.label}</p>
                        <p className="text-xs text-white/40 mt-0.5 leading-snug">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 ml-2">
                        <input type="checkbox" defaultChecked={item.defaultChecked} className="sr-only peer" />
                        <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Security ── */}
              {activeTab === 'security' && (
                <div className="space-y-5 sm:space-y-6">
                  <h2 className="text-base font-semibold text-white">Security Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-white/50 mb-1.5">Current Password</label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-1.5">New Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-1.5">Confirm New Password</label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                      <div className="min-w-0">
                        <p className="text-sm text-white">Two-Factor Authentication</p>
                        <p className="text-xs text-white/40 mt-0.5">Add an extra layer of security to your account</p>
                      </div>
                      <button className="px-3 py-1.5 rounded-lg border border-primary/30 text-primary text-xs hover:bg-primary/10 transition-all self-start sm:self-auto flex-shrink-0">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── API & Integrations ── */}
              {activeTab === 'api' && (
                <div className="space-y-5 sm:space-y-6">
                  <h2 className="text-base font-semibold text-white">API & Integrations</h2>
                  <div className="space-y-3">
                    {[
                      { name: 'OpenAI', status: 'Connected', color: 'text-green-400' },
                      { name: 'Gemini', status: 'Not Connected', color: 'text-white/40' },
                      { name: 'Anthropic', status: 'Not Connected', color: 'text-white/40' },
                      { name: 'Notion', status: 'Connected', color: 'text-green-400' },
                      { name: 'Stripe', status: 'Not Connected', color: 'text-white/40' },
                    ].map((integration) => (
                      <div key={integration.name} className="flex items-center justify-between gap-3 p-3 rounded-xl border border-white/[0.08] bg-white/[0.03]">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                            <Key size={14} className="text-white/40" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-white">{integration.name}</p>
                            <p className={`text-xs ${integration.color}`}>{integration.status}</p>
                          </div>
                        </div>
                        <button className="px-3 py-1.5 rounded-lg border border-white/10 text-white/50 text-xs hover:border-primary/30 hover:text-primary transition-all flex-shrink-0">
                          {integration.status === 'Connected' ? 'Manage' : 'Connect'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Appearance ── */}
              {activeTab === 'appearance' && (
                <div className="space-y-5 sm:space-y-6">
                  <h2 className="text-base font-semibold text-white">Appearance</h2>
                  <div>
                    <p className="text-xs text-white/50 mb-3">Theme Mode</p>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {['Dark', 'Light', 'System'].map((theme) => (
                        <button
                          key={theme}
                          className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                            theme === 'Dark' ?'border-primary/40 bg-primary/10 text-primary' :'border-white/10 text-white/50 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {theme}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-3">Sidebar Style</p>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {['Compact', 'Default', 'Expanded'].map((style) => (
                        <button
                          key={style}
                          className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                            style === 'Default' ?'border-primary/40 bg-primary/10 text-primary' :'border-white/10 text-white/50 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Localization ── */}
              {activeTab === 'localization' && (
                <div className="space-y-5 sm:space-y-6">
                  <h2 className="text-base font-semibold text-white">Localization</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs text-white/50 mb-1.5">Language</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-all">
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-1.5">Timezone</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-all">
                        <option>Asia/Kolkata (IST)</option>
                        <option>UTC</option>
                        <option>America/New_York (EST)</option>
                        <option>Europe/London (GMT)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-1.5">Date Format</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-all">
                        <option>DD/MM/YYYY</option>
                        <option>MM/DD/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-1.5">Currency</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-all">
                        <option>INR (₹)</option>
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={handleSave}
                  className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    saved
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' :'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  <Save size={14} />
                  {saved ? 'Saved!' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
