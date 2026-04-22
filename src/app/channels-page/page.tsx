import React from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import ChannelsGrid from './components/ChannelsGrid';

export default function ChannelsPage() {
  return (
    <AppLayout>
      <Topbar
        title="Channels"
        subtitle="Connect AI personas to real-world communication endpoints"
      />
      <ChannelsGrid />
    </AppLayout>
  );
}