'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import PersonaTopologyClient from '../components/PersonaTopologyClient';

export default function PersonaTopologyPage({ params }: { params: { personaId: string } }) {
  return (
    <div className="flex min-h-screen radial-bg">
      <Sidebar />
      <main className="flex-1 ml-60 flex flex-col min-h-screen overflow-hidden">
        <PersonaTopologyClient personaId={params.personaId} />
      </main>
    </div>
  );
}
