'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import PersonaTopologyClient from '../components/PersonaTopologyClient';

export default async function PersonaTopologyPage({ params }: { params: Promise<{ personaId: string }> }) {
  const { personaId } = await params;
  return (
    <div className="flex min-h-screen radial-bg">
      <Sidebar />
      <main className="flex-1 ml-60 flex flex-col min-h-screen overflow-hidden">
        <PersonaTopologyClient personaId={personaId} />
      </main>
    </div>
  );
}
