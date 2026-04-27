'use client';

import React, { useState } from 'react';
import { Plus, Code2, Eye, ShoppingBag, Zap, BarChart2, MessageSquare, Package, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import PluginTable from './PluginTable';
import CreatePluginWizard from './CreatePluginWizard';
import Icon from '@/components/ui/AppIcon';


const shopifyPlugins = [
  {
    icon: ShoppingBag,
    name: 'Shopify Product Advisor',
    description: 'Embed a conversational product discovery agent on your Shopify storefront. Guides shoppers to the right product using intent-based recommendations.',
    color: '#95bf47',
    status: 'Available',
    tags: ['Product Discovery', 'Recommendations', 'Web Chat'],
  },
  {
    icon: Package,
    name: 'Order & Fulfillment Bot',
    description: 'Automates order tracking, return requests, and fulfillment queries. Reduces support tickets by handling post-purchase conversations end-to-end.',
    color: '#06b6d4',
    status: 'Available',
    tags: ['Order Tracking', 'Returns', 'Customer Support'],
  },
  {
    icon: RefreshCw,
    name: 'Inventory Sync Agent',
    description: 'Monitors stock levels in real time, triggers reorder alerts, and syncs inventory data across Shopify and your warehouse systems.',
    color: '#8b5cf6',
    status: 'Available',
    tags: ['Inventory', 'Stock Alerts', 'Shopify API'],
  },
  {
    icon: MessageSquare,
    name: '24/7 Customer Support Agent',
    description: 'A persona trained on your product catalog, FAQs, and policies — delivers instant, accurate support across web chat and WhatsApp.',
    color: '#f97316',
    status: 'Available',
    tags: ['Support', 'WhatsApp', 'FAQ Automation'],
  },
  {
    icon: Zap,
    name: 'Abandoned Cart Recovery',
    description: 'Re-engages shoppers who left items in their cart with personalized follow-up messages and incentive offers via WhatsApp or web chat.',
    color: '#f59e0b',
    status: 'Beta',
    tags: ['Cart Recovery', 'WhatsApp', 'Conversion'],
  },
  {
    icon: BarChart2,
    name: 'Personalized Upsell Agent',
    description: 'Analyzes purchase history and browsing behavior to surface relevant upsell and cross-sell opportunities at the right moment in the buyer journey.',
    color: '#14b8a6',
    status: 'Beta',
    tags: ['Upsell', 'Cross-sell', 'Personalization'],
  },
];

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
      {/* Shopify Plugin Options */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'rgba(149,191,71,0.15)' }}>
                <ShoppingBag size={13} style={{ color: '#95bf47' }} />
              </div>
              <h2 className="text-base font-bold text-white">Shopify Plugin Options</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#95bf47]/10 text-[#95bf47] border border-[#95bf47]/20">
                Shopify App
              </span>
            </div>
            <p className="text-xs text-white/40">
              Install as a Shopify app and deploy AI agents across your store — product discovery, support, inventory, and more.
            </p>
          </div>
          <Link
            href="/shopify-ecommerce"
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-[#95bf47] hover:text-[#95bf47]/80 transition-colors"
          >
            View full integration
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shopifyPlugins?.map((plugin) => {
            const Icon = plugin?.icon;
            return (
              <div
                key={plugin?.name}
                className="rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/12 transition-all duration-200 p-5 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${plugin?.color}18`, color: plugin?.color }}
                    >
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white leading-tight">{plugin?.name}</p>
                    </div>
                  </div>
                  <span
                    className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      plugin?.status === 'Available' ?'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}
                  >
                    {plugin?.status}
                  </span>
                </div>
                <p className="text-xs text-white/50 leading-relaxed flex-1">{plugin?.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {plugin?.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 border border-white/8 text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setWizardOpen(true)}
                  className="w-full py-2 rounded-lg text-xs font-semibold border border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-200"
                >
                  Install Plugin
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-xl border border-[#95bf47]/20 bg-[#95bf47]/5 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(149,191,71,0.15)', color: '#95bf47' }}>
            <ShoppingBag size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white mb-0.5">Shopify App Integration</p>
            <p className="text-xs text-white/50">
              Install the PersonaMatrix Shopify app to connect your store data, sync product catalogs, and deploy AI agents directly from your Shopify admin.
            </p>
          </div>
          <Link
            href="/shopify-ecommerce"
            className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold text-white btn-primary"
          >
            Learn More
          </Link>
        </div>
      </div>
      {wizardOpen && (
        <CreatePluginWizard onClose={() => setWizardOpen(false)} />
      )}
    </div>
  );
}