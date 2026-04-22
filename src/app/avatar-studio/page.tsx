import React from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import AvatarStudioClient from './components/AvatarStudioClient';

export default function AvatarStudioPage() {
  return (
    <AppLayout>
      <Topbar
        title="Avatar Studio"
        subtitle="Create Tavus-powered replicas from training video & ElevenLabs voice, or pick a stock avatar to attach to any persona"
      />
      <AvatarStudioClient />
    </AppLayout>
  );
}
