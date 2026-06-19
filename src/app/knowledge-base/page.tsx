import React from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import KnowledgeBaseClient from './components/KnowledgeBaseClient';

export default function KnowledgeBasePage() {
  return (
    <AppLayout>
      <Topbar
        title="Knowledge Base"
        subtitle="Upload your courses, coaching frameworks, finance guides, and content — ground your persona in your expertise"
      />
      <KnowledgeBaseClient />
    </AppLayout>
  );
}
