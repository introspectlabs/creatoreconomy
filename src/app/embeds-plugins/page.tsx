import React from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import EmbedsPluginsClient from './components/EmbedsPluginsClient';

export default function EmbedsPluginsPage() {
  return (
    <AppLayout>
      <Topbar
        title="Embeds & Plugins"
        subtitle="Deploy personas into external websites and apps via embeddable JS widgets"
      />
      <EmbedsPluginsClient />
    </AppLayout>
  );
}