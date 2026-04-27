'use client';

import React, { useState } from 'react';
import { Plus, Code2, Eye } from 'lucide-react';
import Link from 'next/link';
import PluginTable from './PluginTable';
import CreatePluginWizard from './CreatePluginWizard';

export default function EmbedsPluginsClient() {
  const [wizardOpen, setWizardOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="glass rounded-xl px-3 py-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 status-dot-active" />
            <span className="text-xs text-white/60">34 plugins deployed</span>
          </div>
          <div className="glass rounded-xl px-3 py-2 flex items-center gap-2">
            <Code2 size={12} className="text-purple-400" />
            <span className="text-xs text-white/60">12 domains whitelisted</span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/embeds-plugins/plugin-preview"
            className="glass flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-500 text-white/70 hover:text-white border border-white/8 hover:border-white/20 transition-all"
          >
            <Eye size={14} className="text-purple-400" />
            <span className="hidden sm:inline">Preview Widget</span>
            <span className="sm:hidden">Preview</span>
          </Link>
          <button
            onClick={() => setWizardOpen(true)}
            className="btn-primary flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-600 text-white"
          >
            <Plus size={15} /> <span className="hidden sm:inline">Create Plugin</span><span className="sm:hidden">Create</span>
          </button>
        </div>
      </div>

      <PluginTable />

      {wizardOpen && (
        <CreatePluginWizard onClose={() => setWizardOpen(false)} />
      )}
    </div>
  );
}