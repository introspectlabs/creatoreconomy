import React from 'react';
import AppLayout from '@/components/AppLayout';
import DashboardMetrics from './components/DashboardMetrics';
import DashboardChart from './components/DashboardChart';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import SystemHealth from './components/SystemHealth';
import Topbar from '@/components/Topbar';

export default function HomeDashboardPage() {
  return (
    <AppLayout>
      <Topbar
        title="Welcome back, Arjun"
        subtitle="Manage creator personas, OTT content, and audience engagement — last updated Apr 27, 2026 at 7:33 AM"
      />
      <DashboardMetrics />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        <div className="col-span-1 xl:col-span-2 min-w-0">
          <DashboardChart />
        </div>
        <div className="col-span-1 min-w-0">
          <ActivityFeed />
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        <div className="col-span-1 xl:col-span-2 min-w-0">
          <QuickActions />
        </div>
        <div className="col-span-1 min-w-0">
          <SystemHealth />
        </div>
      </div>
    </AppLayout>
  );
}