'use client';

import React, { useState } from 'react';
import { Plus, Users, Shield } from 'lucide-react';
import MembersTable from './MembersTable';
import RolesPanel from './RolesPanel';
import InviteMemberModal from './InviteMemberModal';
import Icon from '@/components/ui/AppIcon';


export default function OrganizationClient() {
  const [tab, setTab] = useState<'members' | 'roles'>('members');
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <div>
      {/* Tab Bar + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-1 bg-white/5 border border-white/8 rounded-xl p-1 overflow-x-auto">
          {([
            { id: 'members', label: 'Members', icon: Users },
            { id: 'roles', label: 'Roles & Permissions', icon: Shield },
          ] as const).map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={`orgtab-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs font-500 transition-all whitespace-nowrap ${
                  tab === t.id
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :'text-white/40 hover:text-white/70'
                }`}
              >
                <Icon size={13} />
                {t.label}
              </button>
            );
          })}
        </div>
        {tab === 'members' && (
          <button
            onClick={() => setInviteOpen(true)}
            className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-600 text-white self-start sm:self-auto"
          >
            <Plus size={15} /> Invite Member
          </button>
        )}
      </div>

      {tab === 'members' ? <MembersTable /> : <RolesPanel />}

      {inviteOpen && <InviteMemberModal onClose={() => setInviteOpen(false)} />}
    </div>
  );
}