import React from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import ServicesGrid from './components/ServicesGrid';

export default function ServicesPage() {
  return (
    <AppLayout>
      <Topbar
        title="Services"
        subtitle="Connect AI voice, video, and omnichannel services to power your D2C AI Sales Agents"
      />
      <ServicesGrid />
    </AppLayout>
  );
}