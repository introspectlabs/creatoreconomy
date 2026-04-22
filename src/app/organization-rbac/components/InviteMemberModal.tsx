'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Mail, Shield, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type RoleName = 'Admin' | 'Developer' | 'Analyst' | 'Viewer';

interface InviteFormData {
  email: string;
  role: RoleName;
}

const roleOptions: { value: RoleName; desc: string }[] = [
  { value: 'Admin', desc: 'Full access including billing and org management' },
  { value: 'Developer', desc: 'Build personas, manage channels and integrations' },
  { value: 'Analyst', desc: 'Read-only access to personas and analytics' },
  { value: 'Viewer', desc: 'View-only access to persona list and status' },
];

export default function InviteMemberModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<InviteFormData>({
    defaultValues: { role: 'Developer' },
  });

  const selectedRole = watch('role');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const onSubmit = async (data: InviteFormData) => {
    setLoading(true);
    // Backend integration: POST /api/organization/invite { email, role }
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success(`Invitation sent to ${data.email} as ${data.role}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: 'rgba(12,14,22,0.99)', border: '1px solid rgba(255,255,255,0.10)' }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/6">
          <div>
            <h2 className="text-base font-700 text-white">Invite Team Member</h2>
            <p className="text-xs text-white/35 mt-0.5">Send an email invitation to join your workspace</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all">
            <X size={14} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-500 text-white/60 mb-1.5">
              Email address <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
                })}
                autoFocus
                type="email"
                placeholder="colleague@yourcompany.com"
                className={`w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border text-sm text-white placeholder-white/20 outline-none transition-all ${
                  errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/8 focus:border-purple-500/50'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-xs font-500 text-white/60 mb-1.5">
              Assign role <span className="text-red-400">*</span>
            </label>
            <div className="space-y-2">
              {roleOptions.map((opt) => (
                <button
                  key={`inviterole-${opt.value}`}
                  type="button"
                  onClick={() => setValue('role', opt.value)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    selectedRole === opt.value
                      ? 'border-purple-500/40 bg-purple-500/10' :'border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    selectedRole === opt.value ? 'bg-purple-500/20' : 'bg-white/5'
                  }`}>
                    <Shield size={13} className={selectedRole === opt.value ? 'text-purple-400' : 'text-white/30'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-600 text-white">{opt.value}</p>
                    <p className="text-[11px] text-white/35 truncate">{opt.desc}</p>
                  </div>
                  {selectedRole === opt.value && <Check size={13} className="text-purple-400 flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-600 text-white disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Mail size={14} /> Send Invite
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}