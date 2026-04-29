import React from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import PersonaLibraryClient from './components/PersonaLibraryClient';

export default function PersonaLibraryPage() {
  return (
    <AppLayout>
      <Topbar
        title="AI Sales Agents"
        subtitle="12 agents · 9 active · 2 in training · 1 draft — D2C brand AI agents trained on your product catalog"
      />
      <PersonaLibraryClient />
    </AppLayout>
  );
}