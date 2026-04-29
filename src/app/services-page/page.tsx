import React from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import ServicesGrid from './components/ServicesGrid';

export default function ServicesPage() {
  return (
    <AppLayout>
      <Topbar
        title="Services"
        subtitle="Integrate external AI capabilities — voice, video, and omnichannel infrastructure"
      />
      <ServicesGrid />
    </AppLayout>
  );
}