import React from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import AvatarStudioClient from './components/AvatarStudioClient';

export default function AvatarStudioPage() {
  return (
    <AppLayout>
      <Topbar
        title="Avatar Studio"
        subtitle="Create brand-face avatars for your D2C AI Sales Agents — upload a training video or pick a stock avatar"
      />
      <AvatarStudioClient />
    </AppLayout>
  );
}
