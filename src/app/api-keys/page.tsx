import React from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import ApiKeysClient from './components/ApiKeysClient';

export default function ApiKeysPage() {
  return (
    <AppLayout>
      <Topbar
        title="API Keys"
        subtitle="Manage API keys for programmatic access — generate, revoke, and monitor usage per key"
      />
      <ApiKeysClient />
    </AppLayout>
  );
}
