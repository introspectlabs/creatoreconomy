'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/creators', label: 'Creators' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/pricing', label: 'Pricing' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0c12]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_32px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <img
            src="/assets/images/image-1775312226237.png"
            alt="PersonaMatrix Logo"
            className="h-10 sm:h-14 md:h-16 w-auto object-contain max-w-[160px] sm:max-w-[200px] md:max-w-[240px]"
          />
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                pathname === link.href
                  ? 'text-white bg-white/8'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-150"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white btn-primary"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0c12]/95 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                pathname === link.href ? 'text-white bg-white/8' : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <Link href="/login" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white">Login</Link>
            <Link href="/register" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary text-center">Get Started</Link>
          </div>
        </div>
      )}
    </header>
  );
}
