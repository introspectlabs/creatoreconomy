'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

type LoginRole = 'audience' | 'creator';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<LoginRole>('creator');
  const [email, setEmail] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (role === 'audience' && (!email || !password)) {
      setError('Please fill in all fields.');
      return;
    }
    if (role === 'creator' && !subdomain) {
      setError('Please enter your subdomain.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    router.push(role === 'audience' ? '/audience-dashboard' : '/home-dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'radial-gradient(ellipse at 50% 40%, #1a2535 0%, #0d1520 60%, #0a1018 100%)' }}>
      <PublicHeader />

      <main className="flex-1 flex items-center justify-center px-4 pt-20 pb-10">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-white/10 p-10 shadow-2xl" style={{ background: 'rgba(15, 22, 35, 0.85)', backdropFilter: 'blur(20px)' }}>
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img
                src="/assets/images/image-1775312226237.png"
                alt="PersonaMatrix Logo"
                className="h-16 w-auto object-contain"
              />
            </div>

            {/* Role toggle */}
            <div className="flex rounded-xl overflow-hidden border border-white/10 mb-7 p-1 gap-1" style={{ background: 'rgba(10,15,25,0.6)' }}>
              <button
                type="button"
                onClick={() => { setRole('audience'); setError(''); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center justify-center gap-1.5 ${
                  role === 'audience' ?'bg-[#6b7ff0] text-white shadow-md' :'text-white/40 hover:text-white/70'
                }`}
              >
                🎧 Audience
              </button>
              <button
                type="button"
                onClick={() => { setRole('creator'); setError(''); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center justify-center gap-1.5 ${
                  role === 'creator' ?'bg-[#7c3aed] text-white shadow-md' :'text-white/40 hover:text-white/70'
                }`}
              >
                🚀 Creator/Org
              </button>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-center mb-1.5" style={{ color: '#7b8ff7' }}>
              {role === 'audience' ? 'Welcome back' : 'Enter your organization'}
            </h1>
            <p className="text-center text-white/50 text-sm mb-7">
              {role === 'audience' ? 'Sign in to your audience account' : 'Continue to your workspace'}
            </p>

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

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {role === 'audience' ? (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-white">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-4 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#6b7ff0]/60 transition-all duration-150"
                      style={{ background: 'rgba(10, 15, 25, 0.8)', border: '1px solid rgba(255,255,255,0.12)' }}
                      autoComplete="email"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-white">Password</label>
                    <input
                      type="password"
                      placeholder="Your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-4 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#6b7ff0]/60 transition-all duration-150"
                      style={{ background: 'rgba(10, 15, 25, 0.8)', border: '1px solid rgba(255,255,255,0.12)' }}
                      autoComplete="current-password"
                    />
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white">Subdomain</label>
                  <input
                    type="text"
                    placeholder="Enter your subdomain"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#7b8ff7]/60 transition-all duration-150"
                    style={{ background: 'rgba(10, 15, 25, 0.8)', border: '1px solid rgba(255,255,255,0.12)' }}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl font-semibold text-white/90 text-base disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-150"
                style={{
                  background: role === 'audience' ? 'rgba(107,127,240,0.75)' : 'rgba(100, 90, 200, 0.7)',
                  border: role === 'audience' ? '1px solid rgba(107,127,240,0.4)' : '1px solid rgba(130, 110, 220, 0.4)',
                }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                      <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Loading…
                  </>
                ) : (
                  'Continue'
                )}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-white/60">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-white font-semibold underline hover:text-white/80 transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
