import React from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import ChannelsGrid from './components/ChannelsGrid';

export default function ChannelsPage() {
  return (
    <AppLayout>
      <Topbar
        title="Channels"
        subtitle="Connect your D2C AI Sales Agents to WhatsApp, Web Chat, and your storefront channels"
      />
      <ChannelsGrid />
    </AppLayout>
  );
}