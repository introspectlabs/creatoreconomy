import React from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import KnowledgeBaseClient from './components/KnowledgeBaseClient';

export default function KnowledgeBasePage() {
  return (
    <AppLayout>
      <Topbar
        title="Product Catalog"
        subtitle="Upload product feeds, SKU data, FAQs, and brand content to train your D2C AI Sales Agents"
      />
      <KnowledgeBaseClient />
    </AppLayout>
  );
}
