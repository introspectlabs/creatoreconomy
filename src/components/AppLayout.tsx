import React from 'react';
import Sidebar from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen radial-bg">
      <Sidebar />
      {/* Desktop: offset by sidebar width. Mobile: no offset (sidebar is a drawer overlay) */}
      <main className="flex-1 min-h-screen transition-all duration-300 lg:ml-60" id="main-content">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 pt-16 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}