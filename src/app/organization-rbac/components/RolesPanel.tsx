'use client';

import React, { useState } from 'react';
import { Shield, Code2, BarChart2, Settings, Brain, Database, Radio, Plug, Building2 } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


type RoleName = 'Admin' | 'Developer' | 'Analyst' | 'Viewer';

interface Permission {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  roles: Record<RoleName, boolean>;
}

const permissions: Permission[] = [
  {
    id: 'perm-personas-view', label: 'View Personas', icon: Brain, description: 'See persona list and details',
    roles: { Admin: true, Developer: true, Analyst: true, Viewer: true },
  },
  {
    id: 'perm-personas-manage', label: 'Manage Personas', icon: Brain, description: 'Create, edit, and delete personas',
    roles: { Admin: true, Developer: true, Analyst: false, Viewer: false },
  },
  {
    id: 'perm-knowledge-view', label: 'View Knowledge Base', icon: Database, description: 'Browse indexed documents and sources',
    roles: { Admin: true, Developer: true, Analyst: true, Viewer: false },
  },
  {
    id: 'perm-knowledge-manage', label: 'Manage Knowledge Base', icon: Database, description: 'Upload, delete, and sync knowledge sources',
    roles: { Admin: true, Developer: true, Analyst: false, Viewer: false },
  },
  {
    id: 'perm-channels-view', label: 'View Channels', icon: Radio, description: 'See channel connection status',
    roles: { Admin: true, Developer: true, Analyst: true, Viewer: true },
  },
  {
    id: 'perm-channels-manage', label: 'Manage Channels', icon: Radio, description: 'Connect and configure channels',
    roles: { Admin: true, Developer: true, Analyst: false, Viewer: false },
  },
  {
    id: 'perm-services-manage', label: 'Manage Services', icon: Plug, description: 'Connect and configure external AI services',
    roles: { Admin: true, Developer: false, Analyst: false, Viewer: false },
  },
  {
    id: 'perm-embeds-manage', label: 'Manage Embeds', icon: Code2, description: 'Create and deploy plugin embed codes',
    roles: { Admin: true, Developer: true, Analyst: false, Viewer: false },
  },
  {
    id: 'perm-analytics-view', label: 'View Analytics', icon: BarChart2, description: 'Access usage reports and metrics',
    roles: { Admin: true, Developer: true, Analyst: true, Viewer: false },
  },
  {
    id: 'perm-org-manage', label: 'Manage Organization', icon: Building2, description: 'Invite members and manage roles',
    roles: { Admin: true, Developer: false, Analyst: false, Viewer: false },
  },
  {
    id: 'perm-settings', label: 'Workspace Settings', icon: Settings, description: 'Edit workspace name, billing, API keys',
    roles: { Admin: true, Developer: false, Analyst: false, Viewer: false },
  },
];

const roleDescriptions: Record<RoleName, { desc: string; color: string; bg: string; border: string }> = {
  Admin: { desc: 'Full access to all features, settings, and member management', color: 'text-purple-300', bg: 'bg-purple-500/15', border: 'border-purple-500/30' },
  Developer: { desc: 'Build and manage personas, channels, and integrations — no billing or org access', color: 'text-blue-300', bg: 'bg-blue-500/15', border: 'border-blue-500/30' },
  Analyst: { desc: 'Read-only access to personas, channels, and analytics data', color: 'text-teal-300', bg: 'bg-teal-500/15', border: 'border-teal-500/30' },
  Viewer: { desc: 'Can only view persona list and channel status — no edit capabilities', color: 'text-white/50', bg: 'bg-white/8', border: 'border-white/15' },
};

const roles: RoleName[] = ['Admin', 'Developer', 'Analyst', 'Viewer'];

export default function RolesPanel() {
  const [selectedRole, setSelectedRole] = useState<RoleName>('Admin');

  return (
    <div>
      {/* Role Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {roles.map((role) => {
          const rd = roleDescriptions[role];
          const permCount = permissions.filter((p) => p.roles[role]).length;
          return (
            <button
              key={`rolecard-${role}`}
              onClick={() => setSelectedRole(role)}
              className={`text-left p-4 rounded-2xl border transition-all ${
                selectedRole === role
                  ? `${rd.bg} ${rd.border}`
                  : 'glass border-white/8 hover:border-white/15'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${rd.bg}`}>
                <Shield size={16} className={rd.color} />
              </div>
              <p className={`text-sm font-700 mb-1 ${selectedRole === role ? rd.color : 'text-white'}`}>{role}</p>
              <p className="text-[11px] text-white/35 leading-snug mb-2">{rd.desc}</p>
              <p className="text-[11px] text-white/25">{permCount} permissions</p>
            </button>
          );
        })}
      </div>

      {/* Permissions Matrix */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-sm font-600 text-white">Permission Matrix</h3>
          <div className="flex items-center gap-1.5 flex-wrap">
            {roles.map((r) => (
              <span
                key={`permhead-${r}`}
                className={`text-[11px] px-2.5 py-1 rounded-full border font-500 ${
                  r === selectedRole
                    ? `${roleDescriptions[r].bg} ${roleDescriptions[r].color} ${roleDescriptions[r].border}`
                    : 'bg-white/5 text-white/30 border-white/8'
                }`}
              >
                {r}
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3 text-[11px] font-500 text-white/30 uppercase tracking-wider">Permission</th>
                {roles.map((r) => (
                  <th key={`colhead-${r}`} className="text-center px-4 py-3 text-[11px] font-500 text-white/30 uppercase tracking-wider">{r}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((perm, i) => {
                const Icon = perm.icon;
                return (
                  <tr key={perm.id} className={`border-b border-white/4 ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <Icon size={13} className="text-white/30 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-600 text-white/80">{perm.label}</p>
                          <p className="text-[11px] text-white/30">{perm.description}</p>
                        </div>
                      </div>
                    </td>
                    {roles.map((role) => (
                      <td key={`${perm.id}-${role}`} className="px-4 py-3.5 text-center">
                        <div className={`inline-flex items-center justify-center w-5 h-5 rounded-md transition-all ${
                          perm.roles[role]
                            ? role === selectedRole
                              ? 'bg-purple-500/30 border border-purple-500/50' :'bg-emerald-500/15 border border-emerald-500/25' :'bg-white/4 border border-white/8'
                        }`}>
                          {perm.roles[role] ? (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M2 5l2.5 2.5L8 2.5" stroke={role === selectedRole ? '#a78bfa' : '#34d399'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : (
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <path d="M2 2l4 4M6 2L2 6" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}