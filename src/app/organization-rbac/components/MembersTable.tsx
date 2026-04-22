'use client';

import React, { useState } from 'react';
import { Search, Trash2, Edit2, Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';

type MemberStatus = 'active' | 'invited' | 'suspended';
type MemberRole = 'Admin' | 'Developer' | 'Analyst' | 'Viewer';

interface Member {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  lastActive: string;
  joinedAt: string;
  avatarInitials: string;
  avatarColor: string;
}

const members: Member[] = [
  { id: 'member-001', name: 'Arjun Mehta', email: 'arjun@acme.io', role: 'Admin', status: 'active', lastActive: '2 min ago', joinedAt: 'Nov 1, 2025', avatarInitials: 'AM', avatarColor: 'from-purple-500 to-violet-600' },
  { id: 'member-002', name: 'Priya Sharma', email: 'priya@acme.io', role: 'Developer', status: 'active', lastActive: '1 hr ago', joinedAt: 'Nov 12, 2025', avatarInitials: 'PS', avatarColor: 'from-blue-500 to-cyan-600' },
  { id: 'member-003', name: 'Rohan Kapoor', email: 'rohan@acme.io', role: 'Developer', status: 'active', lastActive: '3 hr ago', joinedAt: 'Dec 4, 2025', avatarInitials: 'RK', avatarColor: 'from-teal-500 to-emerald-600' },
  { id: 'member-004', name: 'Neha Iyer', email: 'neha@acme.io', role: 'Analyst', status: 'active', lastActive: 'Yesterday', joinedAt: 'Jan 8, 2026', avatarInitials: 'NI', avatarColor: 'from-rose-500 to-pink-600' },
  { id: 'member-005', name: 'Vikram Singh', email: 'vikram@acme.io', role: 'Viewer', status: 'active', lastActive: '2 days ago', joinedAt: 'Feb 14, 2026', avatarInitials: 'VS', avatarColor: 'from-amber-500 to-orange-600' },
  { id: 'member-006', name: 'Ananya Bose', email: 'ananya@acme.io', role: 'Developer', status: 'invited', lastActive: 'Never', joinedAt: 'Mar 28, 2026', avatarInitials: 'AB', avatarColor: 'from-indigo-500 to-blue-600' },
  { id: 'member-007', name: 'Siddharth Nair', email: 'sid@acme.io', role: 'Analyst', status: 'active', lastActive: '5 hr ago', joinedAt: 'Jan 22, 2026', avatarInitials: 'SN', avatarColor: 'from-sky-500 to-blue-600' },
  { id: 'member-008', name: 'Kavya Reddy', email: 'kavya@acme.io', role: 'Viewer', status: 'invited', lastActive: 'Never', joinedAt: 'Apr 2, 2026', avatarInitials: 'KR', avatarColor: 'from-fuchsia-500 to-purple-600' },
  { id: 'member-009', name: 'Dev Malhotra', email: 'dev@acme.io', role: 'Developer', status: 'suspended', lastActive: '10 days ago', joinedAt: 'Dec 20, 2025', avatarInitials: 'DM', avatarColor: 'from-slate-500 to-gray-600' },
];

const roleStyle: Record<MemberRole, string> = {
  Admin: 'bg-purple-500/15 text-purple-300 border-purple-500/25',
  Developer: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
  Analyst: 'bg-teal-500/15 text-teal-300 border-teal-500/25',
  Viewer: 'bg-white/8 text-white/45 border-white/10',
};

const statusStyle: Record<MemberStatus, string> = {
  active: 'bg-emerald-500/15 text-emerald-400',
  invited: 'bg-purple-500/15 text-purple-400',
  suspended: 'bg-red-500/15 text-red-400',
};

const statusLabel: Record<MemberStatus, string> = {
  active: 'Active',
  invited: 'Invited',
  suspended: 'Suspended',
};

export default function MembersTable() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filtered = members.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || m.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleRemove = (name: string) => {
    toast.error(`Removed ${name} from the organization`);
    setOpenMenuId(null);
  };

  const handleResendInvite = (email: string) => {
    toast.success(`Invitation resent to ${email}`);
    setOpenMenuId(null);
  };

  return (
    <div>
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[
          { id: 'orgstat-total', label: 'Total Members', value: '9', color: 'text-white' },
          { id: 'orgstat-active', label: 'Active', value: '7', color: 'text-emerald-400' },
          { id: 'orgstat-invited', label: 'Pending Invite', value: '2', color: 'text-purple-400' },
          { id: 'orgstat-suspended', label: 'Suspended', value: '1', color: 'text-red-400' },
        ].map((s) => (
          <div key={s.id} className="glass rounded-xl p-3 sm:p-4">
            <p className="text-[10px] sm:text-[11px] text-white/35 uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-xl sm:text-2xl font-700 tabular-nums ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <div className="relative w-full sm:flex-1 sm:max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search members..."
            className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-sm text-white placeholder-white/25 outline-none focus:border-purple-500/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-1 bg-white/5 border border-white/8 rounded-xl p-1 overflow-x-auto w-full sm:w-auto">
          {(['all', 'Admin', 'Developer', 'Analyst', 'Viewer'] as const).map((r) => (
            <button
              key={`rolefilter-${r}`}
              onClick={() => setRoleFilter(r)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-500 transition-all capitalize whitespace-nowrap ${
                roleFilter === r
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :'text-white/40 hover:text-white/70'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden glass rounded-2xl overflow-hidden divide-y divide-white/4">
        {filtered.map((m) => (
          <div key={m.id} className="p-4 flex flex-col gap-3">
            {/* Member info */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${m.avatarColor} flex items-center justify-center text-white text-xs font-700 flex-shrink-0`}>
                  {m.avatarInitials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-600 text-white truncate">{m.name}</p>
                  <p className="text-xs text-white/35 truncate">{m.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className={`text-[11px] px-2.5 py-1 rounded-full border font-500 ${roleStyle[m.role]}`}>
                  {m.role}
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-500 ${statusStyle[m.status]}`}>
                  {statusLabel[m.status]}
                </span>
              </div>
            </div>

            {/* Meta row */}
            <div className="flex items-center justify-between text-xs text-white/35">
              <span className="flex items-center gap-1.5">
                <Clock size={11} className="text-white/20" />
                {m.lastActive}
              </span>
              <span>Joined {m.joinedAt}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/8 text-xs text-white/40 hover:text-white hover:bg-white/8 transition-all"
                title="Edit role"
              >
                <Edit2 size={12} />
                Edit Role
              </button>
              {m.status === 'invited' && (
                <button
                  onClick={() => handleResendInvite(m.email)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-purple-500/20 text-xs text-purple-400/70 hover:text-purple-400 hover:bg-purple-500/8 transition-all"
                >
                  <Mail size={12} />
                  Resend
                </button>
              )}
              <button
                onClick={() => handleRemove(m.name)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-red-500/20 text-xs text-red-400/50 hover:text-red-400 hover:bg-red-500/8 transition-all"
              >
                <Trash2 size={12} />
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
          <p className="text-xs text-white/30">{filtered.length} of {members.length} members</p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                {['Member', 'Role', 'Status', 'Last Active', 'Joined', 'Actions'].map((h) => (
                  <th key={`memth-${h}`} className="text-left px-5 py-3.5 text-[11px] font-500 text-white/30 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr
                  key={m.id}
                  className={`border-b border-white/4 hover:bg-white/3 transition-all group ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${m.avatarColor} flex items-center justify-center text-white text-xs font-700 flex-shrink-0`}>
                        {m.avatarInitials}
                      </div>
                      <div>
                        <p className="text-sm font-600 text-white">{m.name}</p>
                        <p className="text-xs text-white/35 flex items-center gap-1">
                          <Mail size={10} className="text-white/20" /> {m.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[11px] px-2.5 py-1 rounded-full border font-500 ${roleStyle[m.role]}`}>
                      {m.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-500 ${statusStyle[m.status]}`}>
                      {statusLabel[m.status]}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-white/40 flex items-center gap-1.5">
                      <Clock size={11} className="text-white/20" />
                      {m.lastActive}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-white/35">{m.joinedAt}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity relative">
                      <button
                        className="w-7 h-7 rounded-lg border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all"
                        title="Edit role"
                      >
                        <Edit2 size={12} />
                      </button>
                      {m.status === 'invited' && (
                        <button
                          onClick={() => handleResendInvite(m.email)}
                          className="w-7 h-7 rounded-lg border border-purple-500/20 flex items-center justify-center text-purple-400/50 hover:text-purple-400 hover:bg-purple-500/8 transition-all"
                          title="Resend invitation"
                        >
                          <Mail size={12} />
                        </button>
                      )}
                      <button
                        onClick={() => handleRemove(m.name)}
                        className="w-7 h-7 rounded-lg border border-red-500/20 flex items-center justify-center text-red-400/40 hover:text-red-400 hover:bg-red-500/8 transition-all"
                        title={`Remove ${m.name} — this cannot be undone`}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
          <p className="text-xs text-white/30">{filtered.length} of {members.length} members</p>
          <p className="text-xs text-white/20">Showing all results</p>
        </div>
      </div>
    </div>
  );
}