import React from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import EmbedsPluginsClient from './components/EmbedsPluginsClient';

export default function EmbedsPluginsPage() {
  return (
    <AppLayout>
      <Topbar
        title="Embeds & Plugins"
        subtitle="Deploy your D2C AI Sales Agents on product pages, landing pages, and storefronts via embeddable widgets"
      />
      <EmbedsPluginsClient />
    </AppLayout>
  );
}