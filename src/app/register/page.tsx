'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

type Step = 'account' | 'workspace';

const USE_CASES = [
  { id: 'finance', label: 'Finance & Advisory', emoji: '📈', description: 'Deliver market insights and strategy at scale' },
  { id: 'education', label: 'Education & Courses', emoji: '🎓', description: 'AI tutor for your students and learners' },
  { id: 'coaching', label: 'Coaching & Consulting', emoji: '💡', description: 'Scale client engagement with AI personas' },
  { id: 'content', label: 'Content Creator', emoji: '🎙️', description: 'Monetise your expertise with an AI twin' },
  { id: 'community', label: 'Community & Membership', emoji: '🤝', description: 'Engage your community 24/7 with AI' },
  { id: 'other', label: 'Other', emoji: '✦', description: 'Something else entirely' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('account');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [workspace, setWorkspace] = useState({
    organizationName: '',
    subdomain: '',
    useCase: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAccountNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setStep('workspace');
  };

  const handleWorkspaceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!workspace.organizationName || !workspace.subdomain) {
      setError('Please fill in your creator name and subdomain.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    router.push('/home-dashboard');
  };

  const StepPills = ({ current }: { current: 1 | 2 }) => (
    <div className="flex items-center justify-center gap-2 mb-7">
      {[
        { n: 1, label: 'Your Account' },
        { n: 2, label: 'Creator Profile' },
      ].map((s, i) => {
        const done = s.n < current;
        const active = s.n === current;
        return (
          <React.Fragment key={s.n}>
            {i > 0 && <div className="w-6 h-px bg-white/12" />}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                active
                  ? 'bg-[#6b7ff0]/15 text-[#6b7ff0] border-[#6b7ff0]/30'
                  : done
                  ? 'bg-[#6b7ff0]/10 text-[#6b7ff0]/60 border-[#6b7ff0]/20'
                  : 'bg-white/4 text-white/30 border-white/8'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  done
                    ? 'bg-[#6b7ff0] text-white'
                    : active
                    ? 'bg-[#6b7ff0]/25 text-[#6b7ff0]'
                    : 'bg-white/8 text-white/25'
                }`}
              >
                {done ? '✓' : s.n}
              </span>
              {s.label}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #12192b 0%, #0a0e1a 55%, #060810 100%)' }}
    >
      <PublicHeader />

      <main className="flex-1 flex items-center justify-center px-4 pt-20 pb-12">
        <div className="w-full max-w-[440px]">
          <div
            className="rounded-2xl border border-white/10 p-9 shadow-2xl relative overflow-hidden"
            style={{ background: 'rgba(12, 18, 32, 0.88)', backdropFilter: 'blur(24px)' }}
          >
            {/* Ambient glow */}
            <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-[#6b7ff0]/12 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-44 h-44 rounded-full bg-[#7c3aed]/8 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <img
                  src="/assets/images/image-1775312226237.png"
                  alt="PersonaMatrix Logo"
                  className="h-auto w-auto object-contain"
                  style={{ height: '52px' }}
                />
              </div>

              {/* Error */}
              {error && (
                <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M7 4v3M7 9.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {error}
                </div>
              )}

              {/* ── STEP 1: Account ── */}
              {step === 'account' && (
                <>
                  <StepPills current={1} />

                  <h1 className="text-2xl font-bold text-center text-white mb-1">Create your account</h1>
                  <p className="text-center text-white/40 text-sm mb-7">Build your AI persona — free to start</p>

                  <form onSubmit={handleAccountNext} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-white/70 uppercase tracking-wide">First Name</label>
                        <input
                          type="text"
                          placeholder="Jane"
                          value={form.firstName}
                          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                          className="w-full px-3.5 py-3 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none transition-all duration-150"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                          autoComplete="given-name"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-white/70 uppercase tracking-wide">Last Name</label>
                        <input
                          type="text"
                          placeholder="Smith"
                          value={form.lastName}
                          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                          className="w-full px-3.5 py-3 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none transition-all duration-150"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                          autoComplete="family-name"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-white/70 uppercase tracking-wide">Email</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none transition-all duration-150"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                        autoComplete="email"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-white/70 uppercase tracking-wide">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Min. 8 characters"
                          value={form.password}
                          onChange={(e) => setForm({ ...form, password: e.target.value })}
                          className="w-full px-3.5 py-3 pr-10 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none transition-all duration-150"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                        >
                          {showPassword ? (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                              <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                          ) : (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-2 w-full py-3.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all duration-150"
                      style={{
                        background: 'linear-gradient(135deg, #6b7ff0 0%, #7c3aed 100%)',
                        boxShadow: '0 4px 20px rgba(107,127,240,0.25)',
                      }}
                    >
                      Continue
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </form>

                  <p className="mt-6 text-center text-sm text-white/40">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#6b7ff0] font-semibold hover:text-[#a78bfa] transition-colors">
                      Sign in
                    </Link>
                  </p>
                </>
              )}

              {/* ── STEP 2: Creator Profile ── */}
              {step === 'workspace' && (
                <>
                  <StepPills current={2} />

                  <h1 className="text-2xl font-bold text-center text-white mb-1">Set up your creator profile</h1>
                  <p className="text-center text-white/40 text-sm mb-7">Your AI persona will live here</p>

                  <form onSubmit={handleWorkspaceSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-white/70 uppercase tracking-wide">Creator / Brand Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Arjun Sharma Finance"
                        value={workspace.organizationName}
                        onChange={(e) => setWorkspace({ ...workspace, organizationName: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none transition-all duration-150"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                        autoComplete="organization"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-white/70 uppercase tracking-wide">Profile URL</label>
                      <div
                        className="flex items-center rounded-xl overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      >
                        <input
                          type="text"
                          placeholder="arjun-finance"
                          value={workspace.subdomain}
                          onChange={(e) => setWorkspace({ ...workspace, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                          className="flex-1 px-3.5 py-3 bg-transparent text-white placeholder-white/25 text-sm focus:outline-none"
                          autoComplete="off"
                        />
                        <span className="px-3 text-xs text-white/25 border-l border-white/10 py-3 whitespace-nowrap">.personamatrix.ai</span>
                      </div>
                    </div>

                    {/* Use case */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-white/70 uppercase tracking-wide">
                        What best describes you? <span className="text-white/25 font-normal normal-case">(optional)</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {USE_CASES.map((uc) => (
                          <button
                            key={uc.id}
                            type="button"
                            onClick={() => setWorkspace({ ...workspace, useCase: workspace.useCase === uc.id ? '' : uc.id })}
                            className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all duration-150 ${
                              workspace.useCase === uc.id
                                ? 'bg-[#6b7ff0]/15 border-[#6b7ff0]/40 text-[#6b7ff0]'
                                : 'bg-white/3 border-white/8 text-white/50 hover:bg-white/6 hover:border-white/15 hover:text-white/70'
                            }`}
                          >
                            <span className="text-base flex-shrink-0">{uc.emoji}</span>
                            <span className="text-xs font-medium leading-tight">{uc.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 mt-2">
                      <button
                        type="button"
                        onClick={() => { setStep('account'); setError(''); }}
                        className="px-5 py-3 rounded-xl font-semibold text-white/40 border border-white/10 hover:text-white/70 hover:bg-white/5 text-sm transition-colors duration-150"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-3 rounded-xl font-semibold text-white text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-150"
                        style={{
                          background: 'linear-gradient(135deg, #6b7ff0 0%, #7c3aed 100%)',
                          boxShadow: '0 4px 20px rgba(107,127,240,0.22)',
                        }}
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin" width="15" height="15" viewBox="0 0 16 16" fill="none">
                              <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                              <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Creating profile…
                          </>
                        ) : (
                          'Launch My Persona'
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-white/20">
            By continuing you agree to our{' '}
            <span className="underline cursor-pointer hover:text-white/40 transition-colors">Terms of Service</span>
            {' '}and{' '}
            <span className="underline cursor-pointer hover:text-white/40 transition-colors">Privacy Policy</span>
          </p>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
