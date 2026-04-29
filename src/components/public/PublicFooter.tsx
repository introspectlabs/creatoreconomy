import React from 'react';
import Link from 'next/link';

export default function PublicFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#0a0c12]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <img
                src="/assets/images/image-1775312226237.png"
                alt="PersonaMatrix Logo"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-white/55 leading-relaxed">
              AI sales personas for D2C brands — engage visitors, answer questions, and drive conversions 24/7.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-white/55 uppercase tracking-widest">Product</span>
              <Link href="/" className="text-sm text-white/50 hover:text-white transition-colors">Home</Link>
              <Link href="/how-it-works" className="text-sm text-white/50 hover:text-white transition-colors">How It Works</Link>
              <Link href="/pricing" className="text-sm text-white/50 hover:text-white transition-colors">Pricing</Link>
              <Link href="/guest-chat" className="text-sm text-white/50 hover:text-white transition-colors">Try Demo</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-white/55 uppercase tracking-widest">Platform</span>
              <Link href="/dashboard" className="text-sm text-white/50 hover:text-white transition-colors">Dashboard</Link>
              <Link href="/create-persona" className="text-sm text-white/50 hover:text-white transition-colors">Create Persona</Link>
              <Link href="/deploy" className="text-sm text-white/50 hover:text-white transition-colors">Deploy</Link>
              <Link href="/analytics" className="text-sm text-white/50 hover:text-white transition-colors">Analytics</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-white/55 uppercase tracking-widest">Legal</span>
              <Link href="#" className="text-sm text-white/50 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-sm text-white/50 hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/6 flex items-center justify-between">
          <p className="text-xs text-white/55">© Introspect Labs. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
            <span className="text-xs text-white/50">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
