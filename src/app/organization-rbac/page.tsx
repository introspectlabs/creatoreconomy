import React from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import OrganizationClient from './components/OrganizationClient';

export default function OrganizationRBACPage() {
  return (
    <AppLayout>
      <Topbar
        title="Organization"
        subtitle="Manage team members, roles, and access permissions"
      />
      <OrganizationClient />
    </AppLayout>
  );
}