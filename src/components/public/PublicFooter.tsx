import React from 'react';
import Link from 'next/link';
import PersonaMatrixWidget from '@/app/embeds-plugins/components/PersonaMatrixWidget';

export default function PublicFooter() {
  return (
    <>
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
                Build and deploy AI personas across every channel — chat, voice, video, and APIs.
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-16">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold text-white/55 uppercase tracking-widest">Product</span>
                <Link href="/" className="text-sm text-white/50 hover:text-white transition-colors">Home</Link>
                <Link href="/creators" className="text-sm text-white/50 hover:text-white transition-colors">Creators</Link>
                <Link href="/pricing" className="text-sm text-white/50 hover:text-white transition-colors">Pricing</Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold text-white/55 uppercase tracking-widest">Explore</span>
                <Link href="/industries" className="text-sm text-white/50 hover:text-white transition-colors">Industries & Use Cases</Link>
                <Link href="/research" className="text-sm text-white/50 hover:text-white transition-colors">Research</Link>
                <Link href="/developers" className="text-sm text-white/50 hover:text-white transition-colors">Developers</Link>
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
      <PersonaMatrixWidget
        config={{
          personaId: 'public-guest',
          personaName: 'PersonaMatrix AI',
          personaRole: 'AI Assistant',
          greeting: 'Hi! I\'m your PersonaMatrix AI assistant. How can I help you today?',
          theme: 'dark',
          position: 'bottom-right',
          modes: ['chat', 'voice', 'avatar'],
        }}
      />
    </>
  );
}
