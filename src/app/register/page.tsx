'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

type Role = 'audience' | 'creator' | null;
type Step = 'role' | 'account' | 'category' | 'social';

const CATEGORIES = [
  { id: 'finance-trading', label: 'Finance & Trading Creator', emoji: '📈', description: 'Share trading strategies, market analysis, and investment knowledge with your followers' },
  { id: 'education-courses', label: 'Education & Course Creator', emoji: '🎓', description: 'Turn your course content into an interactive AI tutor for your students' },
  { id: 'coach', label: 'Coach — Fitness, Career or Business', emoji: '💪', description: 'Scale your coaching with AI that handles intake, Q&A, and client engagement' },
  { id: 'd2c-commerce', label: 'D2C Brand / Commerce Creator', emoji: '🛍️', description: 'Give every customer a personal shopping assistant that knows your products' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>(null);
  const [step, setStep] = useState<Step>('role');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    organizationName: '',
    subdomain: '',
    email: '',
    password: '',
  });
  const [socialForm, setSocialForm] = useState({
    youtubeUrl: '',
    linkedinUrl: '',
  });
  const [audienceForm, setAudienceForm] = useState({ email: '', password: '' });
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValidUrl = (url: string) => {
    if (!url) return true;
    try { new URL(url); return true; } catch { return false; }
  };

  // ── Audience flow ──────────────────────────────────────────────
  const handleAudienceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!audienceForm.email || !audienceForm.password) {
      setError('Please fill in all fields.');
      return;
    }
    if (audienceForm.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    router.push('/audience-dashboard');
  };

  // ── Creator flow ───────────────────────────────────────────────
  const handleCreatorStepOne = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.firstName || !form.lastName || !form.organizationName || !form.subdomain || !form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setStep('category');
  };

  const handleCategoryNext = () => {
    if (!category) {
      setError('Please select a category to continue.');
      return;
    }
    setError('');
    setStep('social');
  };

  const handleCreatorSubmit = async () => {
    setError('');
    if (socialForm.youtubeUrl && !isValidUrl(socialForm.youtubeUrl)) {
      setError('Please enter a valid YouTube URL.');
      return;
    }
    if (socialForm.linkedinUrl && !isValidUrl(socialForm.linkedinUrl)) {
      setError('Please enter a valid LinkedIn URL.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    router.push('/home-dashboard');
  };

  // ── Shared helpers ─────────────────────────────────────────────
  const selectRole = (r: Role) => {
    setRole(r);
    setStep('account');
    setError('');
  };

  const goBack = () => {
    setError('');
    if (step === 'social') { setStep('category'); return; }
    if (step === 'category') { setStep('account'); return; }
    setStep('role');
    setRole(null);
  };

  // ── Step pills helper ──────────────────────────────────────────
  const StepPills = ({ current }: { current: 1 | 2 | 3 }) => (
    <div className="flex items-center justify-center gap-1.5 mb-6 overflow-x-auto pb-0.5">
      {[
        { n: 1, label: 'Account' },
        { n: 2, label: 'Category' },
        { n: 3, label: 'Socials' },
      ].map((s, i) => {
        const done = s.n < current;
        const active = s.n === current;
        return (
          <React.Fragment key={s.n}>
            {i > 0 && <div className="w-4 h-px bg-white/15 flex-shrink-0" />}
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border flex-shrink-0 ${
              active ? 'bg-[#6b7ff0]/20 text-[#6b7ff0] border-[#6b7ff0]/30' : 'bg-white/5 text-white/40 border-white/10'
            }`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                done ? 'bg-[#6b7ff0] text-white' : active ? 'bg-[#6b7ff0]/30 text-[#6b7ff0]' : 'bg-white/10 text-white/30'
              }`}>
                {done ? '✓' : s.n}
              </span>
              {s.label}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0c12] text-white flex flex-col">
      <PublicHeader />

      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-md">
          <div className="glass-elevated rounded-3xl border border-white/10 p-8 shadow-[0_32px_80px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#7c3aed]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-[#3b82f6]/10 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Logo */}
              <div className="flex items-center justify-center mb-6">
                <img
                  src="/assets/images/image-1775312226237.png"
                  alt="PersonaMatrix Logo"
                  className="h-16 w-auto object-contain"
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

              {/* ── STEP: Role Selection ── */}
              {step === 'role' && (
                <>
                  <h1 className="text-3xl font-extrabold text-[#6b7ff0] text-center mb-1.5">Create an account</h1>
                  <p className="text-sm text-white/50 text-center mb-8">How will you use PersonaMatrix?</p>

                  <div className="flex flex-col gap-4">
                    <button
                      type="button"
                      onClick={() => selectRole('audience')}
                      className="group flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/4 hover:bg-[#6b7ff0]/10 hover:border-[#6b7ff0]/40 text-left transition-all duration-150"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#6b7ff0]/15 flex items-center justify-center text-2xl flex-shrink-0">
                        🎧
                      </div>
                      <div>
                        <p className="text-base font-bold text-white group-hover:text-[#6b7ff0] transition-colors">I&apos;m an Audience</p>
                        <p className="text-xs text-white/40 mt-0.5 leading-relaxed">Follow creators, chat with AI personas, and discover content</p>
                      </div>
                      <svg className="ml-auto mt-1 flex-shrink-0 text-white/20 group-hover:text-[#6b7ff0]/60 transition-colors" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={() => selectRole('creator')}
                      className="group flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/4 hover:bg-[#7c3aed]/10 hover:border-[#7c3aed]/40 text-left transition-all duration-150"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#7c3aed]/15 flex items-center justify-center text-2xl flex-shrink-0">
                        🚀
                      </div>
                      <div>
                        <p className="text-base font-bold text-white group-hover:text-[#a78bfa] transition-colors">I&apos;m a Creator / Organization</p>
                        <p className="text-xs text-white/40 mt-0.5 leading-relaxed">Build AI personas, manage your workspace, and grow your audience</p>
                      </div>
                      <svg className="ml-auto mt-1 flex-shrink-0 text-white/20 group-hover:text-[#a78bfa]/60 transition-colors" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  <p className="mt-7 text-center text-sm text-white/50">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#6b7ff0] font-semibold hover:text-[#a78bfa] transition-colors">
                      Sign in
                    </Link>
                  </p>
                </>
              )}

              {/* ── STEP: Audience Account ── */}
              {step === 'account' && role === 'audience' && (
                <>
                  <button type="button" onClick={goBack} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 mb-5 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back
                  </button>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#6b7ff0]/15 flex items-center justify-center text-xl">🎧</div>
                    <div>
                      <h1 className="text-2xl font-extrabold text-[#6b7ff0]">Join as Audience</h1>
                      <p className="text-xs text-white/40">Simple sign-up — no org setup needed</p>
                    </div>
                  </div>

                  <form onSubmit={handleAudienceSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-white">Email</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={audienceForm.email}
                        onChange={(e) => setAudienceForm({ ...audienceForm, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#6b7ff0]/60 focus:bg-white/8 transition-all duration-150"
                        autoComplete="email"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-white">Password</label>
                      <input
                        type="password"
                        placeholder="Min. 8 characters"
                        value={audienceForm.password}
                        onChange={(e) => setAudienceForm({ ...audienceForm, password: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#6b7ff0]/60 focus:bg-white/8 transition-all duration-150"
                        autoComplete="new-password"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-2 w-full py-3 rounded-xl font-semibold text-white bg-[#6b7ff0] hover:bg-[#5a6ee0] text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors duration-150"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                            <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          Creating account…
                        </>
                      ) : (
                        'Create Audience Account'
                      )}
                    </button>
                  </form>

                  <p className="mt-6 text-center text-sm text-white/50">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#6b7ff0] font-semibold hover:text-[#a78bfa] transition-colors">
                      Sign in
                    </Link>
                  </p>
                </>
              )}

              {/* ── STEP: Creator Account ── */}
              {step === 'account' && role === 'creator' && (
                <>
                  <button type="button" onClick={goBack} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 mb-5 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back
                  </button>

                  <StepPills current={1} />

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/15 flex items-center justify-center text-xl">🚀</div>
                    <div>
                      <h1 className="text-2xl font-extrabold text-[#6b7ff0]">Creator / Organization</h1>
                      <p className="text-xs text-white/40">Set up your workspace</p>
                    </div>
                  </div>

                  <form onSubmit={handleCreatorStepOne} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-white">First Name</label>
                        <input
                          type="text"
                          placeholder="First name"
                          value={form.firstName}
                          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all duration-150"
                          autoComplete="given-name"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-white">Last Name</label>
                        <input
                          type="text"
                          placeholder="Last name"
                          value={form.lastName}
                          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all duration-150"
                          autoComplete="family-name"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-white">Organization Name</label>
                      <input
                        type="text"
                        placeholder="Enter your organization name"
                        value={form.organizationName}
                        onChange={(e) => setForm({ ...form, organizationName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all duration-150"
                        autoComplete="organization"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-white">Subdomain</label>
                      <div className="flex items-center rounded-xl bg-white/5 border border-white/10 overflow-hidden focus-within:border-[#7c3aed]/60 transition-all duration-150">
                        <input
                          type="text"
                          placeholder="yourname"
                          value={form.subdomain}
                          onChange={(e) => setForm({ ...form, subdomain: e.target.value })}
                          className="flex-1 px-4 py-3 bg-transparent text-white placeholder-white/30 text-sm focus:outline-none"
                          autoComplete="off"
                        />
                        <span className="px-3 text-xs text-white/30 border-l border-white/10 py-3">.personamatrix.ai</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-white">Email</label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all duration-150"
                        autoComplete="email"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-white">Password</label>
                      <input
                        type="password"
                        placeholder="Min. 8 characters"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all duration-150"
                        autoComplete="new-password"
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-2 w-full py-3 rounded-xl font-semibold text-white bg-[#7c3aed] hover:bg-[#6d28d9] text-sm flex items-center justify-center gap-2 transition-colors duration-150"
                    >
                      Continue
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </form>

                  <p className="mt-6 text-center text-sm text-white/50">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#6b7ff0] font-semibold hover:text-[#a78bfa] transition-colors">
                      Sign in
                    </Link>
                  </p>
                </>
              )}

              {/* ── STEP: Category ── */}
              {step === 'category' && (
                <>
                  <StepPills current={2} />

                  <h1 className="text-2xl font-extrabold text-[#6b7ff0] text-center mb-1.5">What best describes you?</h1>
                  <p className="text-sm text-white/50 text-center mb-6">We&apos;ll personalize your experience based on your use case</p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => { setCategory(cat.id); setError(''); }}
                        className={`relative flex flex-col items-start gap-2 p-4 rounded-2xl border text-left transition-all duration-150 ${
                          category === cat.id
                            ? 'bg-[#6b7ff0]/15 border-[#6b7ff0]/50 shadow-[0_0_0_1px_rgba(107,127,240,0.3)]'
                            : 'bg-white/4 border-white/10 hover:bg-white/7 hover:border-white/20'
                        }`}
                      >
                        <span className="text-2xl">{cat.emoji}</span>
                        <div>
                          <p className={`text-sm font-semibold mb-0.5 ${category === cat.id ? 'text-[#6b7ff0]' : 'text-white'}`}>
                            {cat.label}
                          </p>
                          <p className="text-[11px] text-white/40 leading-snug">{cat.description}</p>
                        </div>
                        {category === cat.id && (
                          <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#6b7ff0] flex items-center justify-center">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={goBack}
                      className="flex-1 py-3 rounded-xl font-semibold text-white/50 border border-white/10 hover:text-white hover:bg-white/5 text-sm transition-colors duration-150"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleCategoryNext}
                      disabled={loading}
                      className="flex-1 py-3 rounded-xl font-semibold text-white bg-[#7c3aed] hover:bg-[#6d28d9] text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors duration-150"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                            <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          Creating workspace…
                        </>
                      ) : (
                        'Create Workspace'
                      )}
                    </button>
                  </div>
                </>
              )}

              {/* ── STEP: Social Profiles ── */}
              {step === 'social' && (
                <>
                  <StepPills current={3} />

                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/15 flex items-center justify-center text-xl">🔗</div>
                    <div>
                      <h1 className="text-2xl font-extrabold text-[#6b7ff0]">Link Your Profiles</h1>
                      <p className="text-xs text-white/40">Verify your identity &amp; build audience trust</p>
                    </div>
                  </div>

                  {/* Trust info banner */}
                  <div className="mb-5 mt-3 px-4 py-3 rounded-xl bg-[#7c3aed]/8 border border-[#7c3aed]/20 flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <p className="text-xs text-white/50 leading-relaxed">
                      Linking your social profiles helps audiences verify your identity and builds trust in your AI personas. Both fields are optional but recommended.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* YouTube */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-white flex items-center gap-2">
                        <span className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'rgba(255,0,0,0.15)' }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="#ff4444">
                            <path d="M23.498 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </span>
                        YouTube Channel
                        <span className="text-[10px] text-white/30 font-normal ml-auto">Optional</span>
                      </label>
                      <div className="relative">
                        <input type="url" placeholder="https://youtube.com/@yourchannel"
                          value={socialForm.youtubeUrl}
                          onChange={(e) => setSocialForm({ ...socialForm, youtubeUrl: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-red-500/40 focus:bg-red-500/5 transition-all duration-150" />
                        {socialForm.youtubeUrl && isValidUrl(socialForm.youtubeUrl) && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* LinkedIn */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-white flex items-center gap-2">
                        <span className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'rgba(10,102,194,0.2)' }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="#0a66c2">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </span>
                        LinkedIn Profile
                        <span className="text-[10px] text-white/30 font-normal ml-auto">Optional</span>
                      </label>
                      <div className="relative">
                        <input type="url" placeholder="https://linkedin.com/in/yourprofile"
                          value={socialForm.linkedinUrl}
                          onChange={(e) => setSocialForm({ ...socialForm, linkedinUrl: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-blue-500/40 focus:bg-blue-500/5 transition-all duration-150" />
                        {socialForm.linkedinUrl && isValidUrl(socialForm.linkedinUrl) && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button type="button" onClick={goBack}
                      className="flex-1 py-3 rounded-xl font-semibold text-white/50 border border-white/10 hover:text-white hover:bg-white/5 text-sm transition-colors duration-150">
                      Back
                    </button>
                    <button type="button" onClick={handleCreatorSubmit} disabled={loading}
                      className="flex-1 py-3 rounded-xl font-semibold text-white bg-[#7c3aed] hover:bg-[#6d28d9] text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors duration-150">
                      {loading ? (
                        <><svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2" /><path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>Creating workspace…</>
                      ) : 'Create Workspace'}
                    </button>
                  </div>

                  <p className="mt-5 text-center text-xs text-white/30">
                    You can update social links anytime in your profile settings
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
