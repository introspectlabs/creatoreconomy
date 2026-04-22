import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';
import { Toaster } from 'sonner';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'PersonaMatrix — Enterprise AI Persona Management Platform',
  description: 'Create, deploy, and manage AI personas with knowledge bases, communication channels, and external AI service integrations from a single dashboard.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="radial-bg min-h-screen">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.10)',
              color: '#f0f0f8',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            },
          }}
        />

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fcreatoreco2029back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.18" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></body>
    </html>
  );
}