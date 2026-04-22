import React from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import KnowledgeBaseClient from './components/KnowledgeBaseClient';

export default function KnowledgeBasePage() {
  return (
    <AppLayout>
      <Topbar
        title="Knowledge Base"
        subtitle="Upload and manage documents that power your personas — ground responses in your own data"
      />
      <KnowledgeBaseClient />
    </AppLayout>
  );
}
