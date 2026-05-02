'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    router.push('/home-dashboard');
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #12192b 0%, #0a0e1a 55%, #060810 100%)' }}
    >
      <PublicHeader />

      <main className="flex-1 flex items-center justify-center px-4 pt-20 pb-12">
        <div className="w-full max-w-[420px]">
          {/* Card */}
          <div
            className="rounded-2xl border border-white/10 p-10 shadow-2xl relative overflow-hidden"
            style={{ background: 'rgba(12, 18, 32, 0.88)', backdropFilter: 'blur(24px)' }}
          >
            {/* Ambient glow */}
            <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-[#6b7ff0]/12 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-44 h-44 rounded-full bg-[#7c3aed]/8 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Logo */}
              <div className="flex justify-center mb-7">
                <img
                  src="/assets/images/image-1775312226237.png"
                  alt="PersonaMatrix Logo"
                  className="h-14 w-auto object-contain"
                />
              </div>

              {/* Heading */}
              <h1 className="text-2xl font-bold text-center text-white mb-1.5">Welcome back</h1>
              <p className="text-center text-white/45 text-sm mb-8">Sign in to your creator dashboard</p>

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
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white/80">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none transition-all duration-150"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    autoComplete="email"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-white/80">Password</label>
                    <button
                      type="button"
                      className="text-xs text-[#6b7ff0] hover:text-[#a78bfa] transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3.5 pr-11 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none transition-all duration-150"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    >
                      {showPassword ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-semibold text-white text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-150 mt-1"
                  style={{
                    background: 'linear-gradient(135deg, #6b7ff0 0%, #7c3aed 100%)',
                    boxShadow: '0 4px 20px rgba(107,127,240,0.25)',
                  }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="15" height="15" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                        <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      Signing in…
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-xs text-white/25">or</span>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              {/* SSO hint */}
              <button
                type="button"
                className="w-full py-3 rounded-xl text-sm font-medium text-white/50 border border-white/10 hover:bg-white/5 hover:text-white/70 transition-all duration-150 flex items-center justify-center gap-2"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                Continue with SSO
              </button>

              {/* Creator persona tags */}
              <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
                {['Finance Educators', 'Coaches', 'Course Creators'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-[10px] font-medium text-white/30 border border-white/8"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-center text-sm text-white/45">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-[#6b7ff0] font-semibold hover:text-[#a78bfa] transition-colors">
                  Start free trial
                </Link>
              </p>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-white/20">
            By signing in you agree to our{' '}
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
