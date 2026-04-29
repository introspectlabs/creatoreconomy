import React from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import PersonaLibraryClient from './components/PersonaLibraryClient';

export default function PersonaLibraryPage() {
  return (
    <AppLayout>
      <Topbar
        title="Persona Library"
        subtitle="12 personas · 9 active · 2 in training · 1 draft"
      />
      <PersonaLibraryClient />
    </AppLayout>
  );
}