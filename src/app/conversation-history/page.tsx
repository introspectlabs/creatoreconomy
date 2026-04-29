'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import {
  Search,
  Filter,
  ChevronDown,
  MessageSquare,
  User,
  Brain,
  Radio,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  RefreshCw,
  SlidersHorizontal,
  X,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  name: string;
  userEmail: string;
  personaId: string;
  personaName: string;
  conversationId: string;
  status: 'resolved' | 'ongoing' | 'escalated';
  channel: string;
  created: string;
  duration: string;
  messageCount: number;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: 'conv-001',
    name: 'Priya Sharma',
    userEmail: 'priya@gmail.com',
    personaId: 'PER-1001',
    personaName: 'ZaraSkin Sales Agent',
    conversationId: 'CONV-8821',
    status: 'resolved',
    channel: 'Web Widget',
    created: 'Apr 5, 2026 2:34 PM',
    duration: '17 min',
    messageCount: 14,
    messages: [
      { id: 'm1', role: 'user', content: "Hi, I'm looking for a moisturizer for combination skin — something lightweight.", timestamp: '2:34 PM' },
      { id: 'm2', role: 'assistant', content: "Hi Priya! For combination skin, I'd recommend our Hydra-Balance Gel Moisturizer — it's oil-free, non-comedogenic, and loved by 4,200+ customers. It's ₹899 and ships in 2 days. Want me to add it to your cart?", timestamp: '2:34 PM' },
      { id: 'm3', role: 'user', content: 'Does it work for sensitive skin too? I have some redness.', timestamp: '2:36 PM' },
      { id: 'm4', role: 'assistant', content: "Yes! It's fragrance-free and dermatologist-tested for sensitive skin. For redness, I'd also suggest pairing it with our Calm & Repair Serum — together they're ₹1,499 as a bundle (save ₹200). Want the bundle?", timestamp: '2:36 PM' },
      { id: 'm5', role: 'user', content: 'Yes, add the bundle please.', timestamp: '2:40 PM' },
      { id: 'm6', role: 'assistant', content: "Done! Bundle added to cart. Use code GLOW10 for an extra 10% off your first order. Anything else I can help with?", timestamp: '2:41 PM' },
    ],
  },
  {
    id: 'conv-002',
    name: 'Rahul Verma',
    userEmail: 'rahul@gmail.com',
    personaId: 'PER-1002',
    personaName: 'NutriBlend Store Bot',
    conversationId: 'CONV-8820',
    status: 'escalated',
    channel: 'WhatsApp',
    created: 'Apr 5, 2026 1:10 PM',
    duration: '18 min',
    messageCount: 9,
    messages: [
      { id: 'm1', role: 'user', content: 'I ordered the whey protein 3 days ago but it still shows processing.', timestamp: '1:10 PM' },
      { id: 'm2', role: 'assistant', content: "I'm sorry for the delay, Rahul. Let me check your order status. Can you share your order ID?", timestamp: '1:10 PM' },
      { id: 'm3', role: 'user', content: 'Order #NB-20482', timestamp: '1:12 PM' },
      { id: 'm4', role: 'assistant', content: "I can see order #NB-20482 is in our warehouse queue — there was a brief stock delay on the 2kg Chocolate variant. I'm escalating this to our fulfillment team to prioritize your shipment. You'll get a tracking update within 2 hours.", timestamp: '1:13 PM' },
    ],
  },
  {
    id: 'conv-003',
    name: 'Aisha Patel',
    userEmail: 'aisha@gmail.com',
    personaId: 'PER-1003',
    personaName: 'StyleHouse Fashion Bot',
    conversationId: 'CONV-8819',
    status: 'resolved',
    channel: 'Web Widget',
    created: 'Apr 5, 2026 11:22 AM',
    duration: '12 min',
    messageCount: 8,
    messages: [
      { id: 'm1', role: 'user', content: "What's the size guide for the linen co-ord set?", timestamp: '11:22 AM' },
      { id: 'm2', role: 'assistant', content: "Great choice! The Linen Co-ord Set runs true to size. For a relaxed fit, go one size up. What's your usual size?", timestamp: '11:22 AM' },
      { id: 'm3', role: 'user', content: 'I usually wear M but I have broader shoulders.', timestamp: '11:24 AM' },
      { id: 'm4', role: 'assistant', content: "I'd recommend the L for the top and M for the pants — the set is sold as separates so you can mix sizes. The L top has a 42\" chest and relaxed shoulder seam. Want me to add both to your cart?", timestamp: '11:25 AM' },
    ],
  },
  {
    id: 'conv-004',
    name: 'Marcus Johnson',
    userEmail: 'marcus@enterprise.com',
    personaId: 'PER-1001',
    personaName: 'SalesBot Pro',
    conversationId: 'CONV-8818',
    status: 'ongoing',
    channel: 'Web Widget',
    created: 'Apr 4, 2026 3:45 PM',
    duration: 'Active',
    messageCount: 6,
    messages: [
      { id: 'm1', role: 'user', content: 'Can you compare your product to Intercom?', timestamp: '3:45 PM' },
      { id: 'm2', role: 'assistant', content: "Great question! Unlike Intercom which focuses on customer messaging, PersonaMatrix specializes in AI persona deployment with deep knowledge base integration. Here's a quick comparison...", timestamp: '3:45 PM' },
      { id: 'm3', role: 'user', content: 'What about pricing differences?', timestamp: '3:48 PM' },
      { id: 'm4', role: 'assistant', content: 'PersonaMatrix starts at $99/month vs Intercom at $74/month, but we offer unlimited AI personas and deeper customization. For enterprise, we typically come in 30% lower.', timestamp: '3:49 PM' },
    ],
  },
  {
    id: 'conv-005',
    name: 'Yuki Tanaka',
    userEmail: 'yuki@globalco.jp',
    personaId: 'PER-1002',
    personaName: 'Support Agent',
    conversationId: 'CONV-8817',
    status: 'resolved',
    channel: 'API',
    created: 'Apr 4, 2026 9:00 AM',
    duration: '14 min',
    messageCount: 8,
    messages: [
      { id: 'm1', role: 'user', content: 'What languages does the API support?', timestamp: '9:00 AM' },
      { id: 'm2', role: 'assistant', content: 'Our API supports 42 languages including Japanese, Chinese, Korean, and all major European languages. Responses are automatically localized based on the user\'s input language.', timestamp: '9:00 AM' },
    ],
  },
  {
    id: 'conv-006',
    name: 'Carlos Rivera',
    userEmail: 'carlos@latam.mx',
    personaId: 'PER-1003',
    personaName: 'Onboarding Guide',
    conversationId: 'CONV-8816',
    status: 'resolved',
    channel: 'Web Widget',
    created: 'Apr 3, 2026 11:30 AM',
    duration: '18 min',
    messageCount: 16,
    messages: [
      { id: 'm1', role: 'user', content: 'How do I integrate with my existing CRM?', timestamp: '11:30 AM' },
      { id: 'm2', role: 'assistant', content: 'We support native integrations with Salesforce, HubSpot, Zoho, and Pipedrive. For other CRMs, you can use our REST API or Zapier connector. Which CRM are you using?', timestamp: '11:30 AM' },
      { id: 'm3', role: 'user', content: 'We use Zoho CRM.', timestamp: '11:32 AM' },
      { id: 'm4', role: 'assistant', content: "Great choice! For Zoho CRM, go to Settings → Integrations → Zoho CRM. Click 'Connect' and authorize with your Zoho credentials. Sync takes about 5 minutes.", timestamp: '11:33 AM' },
    ],
  },
  {
    id: 'conv-007',
    name: 'Sophie Laurent',
    userEmail: 'sophie@paris.fr',
    personaId: 'PER-1004',
    personaName: 'HR Assistant',
    conversationId: 'CONV-8815',
    status: 'resolved',
    channel: 'PersonaMatrix',
    created: 'Apr 3, 2026 9:15 AM',
    duration: '12 min',
    messageCount: 10,
    messages: [
      { id: 'm1', role: 'user', content: 'What is the vacation policy?', timestamp: '9:15 AM' },
      { id: 'm2', role: 'assistant', content: 'Our vacation policy provides 20 days of paid time off per year, plus 10 public holidays. You can carry over up to 5 days to the next year. Would you like more details?', timestamp: '9:15 AM' },
    ],
  },
  {
    id: 'conv-008',
    name: 'David Kim',
    userEmail: 'david@seoul.kr',
    personaId: 'PER-1002',
    personaName: 'Support Agent',
    conversationId: 'CONV-8814',
    status: 'escalated',
    channel: 'PersonaMatrix',
    created: 'Apr 2, 2026 4:20 PM',
    duration: '25 min',
    messageCount: 18,
    messages: [
      { id: 'm1', role: 'user', content: 'I cannot access my account after password reset.', timestamp: '4:20 PM' },
      { id: 'm2', role: 'assistant', content: "I'm sorry to hear that. Let me help you regain access. Can you confirm the email address associated with your account?", timestamp: '4:20 PM' },
      { id: 'm3', role: 'user', content: 'david@seoul.kr', timestamp: '4:22 PM' },
      { id: 'm4', role: 'assistant', content: "I've located your account. It appears there's a 2FA issue. I'm escalating this to our security team who will contact you within 1 hour.", timestamp: '4:23 PM' },
    ],
  },
  {
    id: 'conv-009',
    name: 'Emma Wilson',
    userEmail: 'emma@london.uk',
    personaId: 'PER-1001',
    personaName: 'SalesBot Pro',
    conversationId: 'CONV-8813',
    status: 'resolved',
    channel: 'PersonaMatrix',
    created: 'Apr 2, 2026 2:00 PM',
    duration: '9 min',
    messageCount: 7,
    messages: [
      { id: 'm1', role: 'user', content: 'Do you offer a free trial?', timestamp: '2:00 PM' },
      { id: 'm2', role: 'assistant', content: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required. Would you like me to set one up for you?', timestamp: '2:00 PM' },
    ],
  },
  {
    id: 'conv-010',
    name: 'Liam O\'Brien',
    userEmail: 'liam@dublin.ie',
    personaId: 'PER-1003',
    personaName: 'Onboarding Guide',
    conversationId: 'CONV-8812',
    status: 'ongoing',
    channel: 'API',
    created: 'Apr 1, 2026 11:00 AM',
    duration: 'Active',
    messageCount: 4,
    messages: [
      { id: 'm1', role: 'user', content: 'How do I upload documents to the knowledge base?', timestamp: '11:00 AM' },
      { id: 'm2', role: 'assistant', content: 'You can upload documents via the Knowledge Base section. Supported formats: PDF, DOCX, TXT, CSV, and Markdown. Max file size is 50MB per document.', timestamp: '11:00 AM' },
    ],
  },
  {
    id: 'conv-011',
    name: 'Fatima Al-Hassan',
    userEmail: 'fatima@dubai.ae',
    personaId: 'PER-1004',
    personaName: 'HR Assistant',
    conversationId: 'CONV-8811',
    status: 'resolved',
    channel: 'Web Widget',
    created: 'Apr 1, 2026 8:30 AM',
    duration: '11 min',
    messageCount: 9,
    messages: [
      { id: 'm1', role: 'user', content: 'How do I submit an expense report?', timestamp: '8:30 AM' },
      { id: 'm2', role: 'assistant', content: 'To submit an expense report, go to the HR portal → Expenses → New Report. Fill in the details, attach receipts, and submit for manager approval.', timestamp: '8:30 AM' },
    ],
  },
  {
    id: 'conv-012',
    name: 'Noah Müller',
    userEmail: 'noah@berlin.de',
    personaId: 'PER-1002',
    personaName: 'Support Agent',
    conversationId: 'CONV-8810',
    status: 'resolved',
    channel: 'PersonaMatrix',
    created: 'Mar 31, 2026 3:10 PM',
    duration: '8 min',
    messageCount: 6,
    messages: [
      { id: 'm1', role: 'user', content: 'Is there a mobile app available?', timestamp: '3:10 PM' },
      { id: 'm2', role: 'assistant', content: 'Yes! Our mobile app is available on iOS and Android. Search for "PersonaMatrix" in the App Store or Google Play. It supports all core features including persona management and conversation monitoring.', timestamp: '3:10 PM' },
    ],
  },
];

const allPersonas = ['All Personas', 'SalesBot Pro', 'Support Agent', 'Onboarding Guide', 'HR Assistant'];
const allChannels = ['All Channels', 'PersonaMatrix'];
const statusOptions = ['All Status', 'resolved', 'ongoing', 'escalated'];

const statusConfig = {
  resolved: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', label: 'Resolved' },
  ongoing: { icon: AlertCircle, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', label: 'Ongoing' },
  escalated: { icon: XCircle, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', label: 'Escalated' },
};

const channelColors: Record<string, string> = {
  'Web Widget': 'bg-purple-500/10 text-purple-300 border-purple-500/20',
  'Slack': 'bg-green-500/10 text-green-300 border-green-500/20',
  'Email': 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  'API': 'bg-orange-500/10 text-orange-300 border-orange-500/20',
};

const PAGE_SIZE = 8;

function FilterSelect({ icon: IconComp, options, value, onChange }: {
  icon: React.ElementType;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all cursor-pointer min-w-[140px]">
      {IconComp && <IconComp size={13} className="text-white/40 flex-shrink-0" />}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-xs text-white/70 outline-none cursor-pointer flex-1 appearance-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-[#0e1018] text-white/80">{opt}</option>
        ))}
      </select>
      <ChevronDown size={11} className="text-white/30 flex-shrink-0" />
    </div>
  );
}

function ConversationModal({ conv, onClose }: { conv: Conversation; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-white/10 overflow-hidden"
        style={{ background: 'rgba(14,16,24,0.98)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-600 text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">{conv.personaId}</span>
              <span className="text-xs font-600 text-white/80">{conv.personaName}</span>
            </div>
            <p className="text-[10px] text-white/35">
              Conversation with <span className="text-white/55">{conv.name}</span> · {conv.conversationId} · {conv.created}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <X size={13} className="text-white/50" />
          </button>
        </div>

        {/* Meta Row */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-white/6 flex-wrap">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-500 ${statusConfig[conv.status].bg}`}>
            {React.createElement(statusConfig[conv.status].icon, { size: 11, className: statusConfig[conv.status].color })}
            <span className={statusConfig[conv.status].color}>{statusConfig[conv.status].label}</span>
          </div>
          <span className={`text-[10px] font-500 px-2.5 py-1 rounded-full border ${channelColors[conv.channel] || 'bg-white/5 text-white/40 border-white/10'}`}>
            {conv.channel}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-white/35">
            <Clock size={10} />
            <span>{conv.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-white/35">
            <MessageSquare size={10} />
            <span>{conv.messageCount} messages</span>
          </div>
        </div>

        {/* Messages */}
        <div className="px-5 py-4 space-y-3 max-h-[420px] overflow-y-auto">
          {conv.messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'assistant' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                msg.role === 'user' ? 'bg-white/10 border border-white/10' : 'bg-purple-500/20 border border-purple-500/30'
              }`}>
                {msg.role === 'user'
                  ? <User size={11} className="text-white/50" />
                  : <Brain size={11} className="text-purple-400" />
                }
              </div>
              <div className={`max-w-[78%] ${msg.role === 'assistant' ? 'items-end' : ''}`}>
                <div className={`px-3.5 py-2.5 rounded-xl text-xs leading-relaxed ${
                  msg.role === 'user' ?'bg-white/6 text-white/70 rounded-tl-sm' :'bg-purple-500/10 border border-purple-500/15 text-white/75 rounded-tr-sm'
                }`}>
                  {msg.content}
                </div>
                <p className="text-[9px] text-white/25 mt-1 px-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ConversationHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPersona, setSelectedPersona] = useState('All Personas');
  const [selectedChannel, setSelectedChannel] = useState('All Channels');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const hasActiveFilters =
    selectedPersona !== 'All Personas' ||
    selectedChannel !== 'All Channels' ||
    selectedStatus !== 'All Status' ||
    dateFrom !== '' ||
    dateTo !== '' ||
    searchQuery !== '';

  const clearFilters = () => {
    setSelectedPersona('All Personas');
    setSelectedChannel('All Channels');
    setSelectedStatus('All Status');
    setDateFrom('');
    setDateTo('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const filtered = conversations.filter((conv) => {
    const matchPersona = selectedPersona === 'All Personas' || conv.personaName === selectedPersona;
    const matchChannel = selectedChannel === 'All Channels' || conv.channel === selectedChannel;
    const matchStatus = selectedStatus === 'All Status' || conv.status === selectedStatus;
    const matchSearch =
      searchQuery === '' ||
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.personaId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.personaName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.conversationId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchPersona && matchChannel && matchStatus && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleDelete = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setDeleteConfirmId(null);
    if (paginated.length === 1 && currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const pageNumbers = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <AppLayout>
      <Topbar
        title="Conversation History"
        subtitle="Browse and review all user conversations across personas and channels"
      />

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Conversations', value: '1,284', icon: MessageSquare, color: 'text-purple-400' },
          { label: 'Unique Users', value: '342', icon: User, color: 'text-blue-400' },
          { label: 'Avg. Duration', value: '14.2 min', icon: Clock, color: 'text-emerald-400' },
          { label: 'Resolution Rate', value: '94.7%', icon: CheckCircle, color: 'text-amber-400' },
        ].map((stat) => {
          const StatIcon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-3 px-3 sm:px-4 py-3 rounded-xl border border-white/6"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                <StatIcon size={15} className={stat.color} />
              </div>
              <div className="min-w-0">
                <p className="text-base font-600 text-white/85">{stat.value}</p>
                <p className="text-[10px] text-white/35 leading-tight">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter Bar */}
      <div
        className="rounded-2xl border border-white/8 mb-5 overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.02)' }}
      >
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 flex-wrap">
          {/* Search */}
          <div className="flex items-center gap-2 flex-1 min-w-0 px-3 py-2 rounded-xl border border-white/10 bg-white/5">
            <Search size={13} className="text-white/35 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="bg-transparent text-xs text-white/70 placeholder-white/25 outline-none flex-1 min-w-0"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}>
                <X size={11} className="text-white/30 hover:text-white/60" />
              </button>
            )}
          </div>

          {/* Toggle Filters */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-500 transition-all flex-shrink-0 ${
              showFilters || hasActiveFilters
                ? 'border-purple-500/40 bg-purple-500/10 text-purple-300' :'border-white/10 bg-white/5 text-white/50 hover:text-white/70'
            }`}
          >
            <SlidersHorizontal size={13} />
            <span className="hidden xs:inline">Filters</span>
            {hasActiveFilters && (
              <span className="w-4 h-4 rounded-full bg-purple-500 text-white text-[9px] flex items-center justify-center">!</span>
            )}
          </button>

          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/8 bg-white/4 text-xs text-white/45 hover:text-white/65 transition-all">
              <RefreshCw size={12} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/8 bg-white/4 text-xs text-white/45 hover:text-white/65 transition-all">
              <Download size={12} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="border-t border-white/6 px-3 sm:px-4 py-3 flex flex-wrap items-center gap-2 sm:gap-3">
            <FilterSelect icon={Brain} options={allPersonas} value={selectedPersona} onChange={(v) => { setSelectedPersona(v); setCurrentPage(1); }} />
            <FilterSelect icon={Radio} options={allChannels} value={selectedChannel} onChange={(v) => { setSelectedChannel(v); setCurrentPage(1); }} />
            <FilterSelect icon={Filter} options={statusOptions} value={selectedStatus} onChange={(v) => { setSelectedStatus(v); setCurrentPage(1); }} />

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 bg-white/5">
                <Calendar size={12} className="text-white/35 flex-shrink-0" />
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="bg-transparent text-xs text-white/60 outline-none w-24 sm:w-28"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
              <span className="text-white/25 text-xs">to</span>
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 bg-white/5">
                <Calendar size={12} className="text-white/35 flex-shrink-0" />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="bg-transparent text-xs text-white/60 outline-none w-24 sm:w-28"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-500/20 bg-red-500/8 text-xs text-red-400/70 hover:text-red-400 transition-all ml-auto"
              >
                <X size={11} />
                Clear all
              </button>
            )}
          </div>
        )}
      </div>

      {/* Mobile Card List — visible on mobile/tablet only */}
      <div className="md:hidden space-y-3 mb-4">
        {paginated.length === 0 ? (
          <div
            className="rounded-2xl border border-white/8 px-4 py-16 text-center"
            style={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center">
                <MessageSquare size={20} className="text-white/20" />
              </div>
              <p className="text-sm font-500 text-white/40">No conversations found</p>
              <p className="text-xs text-white/25">Try adjusting your filters or search query</p>
            </div>
          </div>
        ) : (
          paginated.map((conv) => {
            const status = statusConfig[conv.status];
            const StatusIcon = status.icon;
            const isDeleting = deleteConfirmId === conv.id;
            return (
              <div
                key={conv.id}
                className="rounded-2xl border border-white/8 p-4"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                {/* Card Top Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/40 to-blue-500/40 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-600 text-white/70">
                        {conv.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-500 text-white/80 truncate">{conv.name}</p>
                      <p className="text-[10px] text-white/35 truncate">{conv.userEmail}</p>
                    </div>
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-500 flex-shrink-0 ${status.bg}`}>
                    <StatusIcon size={10} className={status.color} />
                    <span className={status.color}>{status.label}</span>
                  </div>
                </div>

                {/* Card Meta */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <button
                    onClick={() => setSelectedConv(conv)}
                    className="text-[11px] font-600 text-purple-400 hover:text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 px-2.5 py-1 rounded-lg transition-all"
                  >
                    {conv.personaId}
                  </button>
                  <div className="flex items-center gap-1.5">
                    <Brain size={11} className="text-purple-400/60 flex-shrink-0" />
                    <span className="text-xs text-white/60">{conv.personaName}</span>
                  </div>
                  <span className={`text-[10px] font-500 px-2.5 py-1 rounded-full border ${channelColors[conv.channel] || 'bg-white/5 text-white/40 border-white/10'}`}>
                    {conv.channel}
                  </span>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 text-[10px] text-white/35">
                    <div className="flex items-center gap-1">
                      <Calendar size={10} />
                      <span>{conv.created}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={10} />
                      <span>{conv.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare size={10} />
                      <span>{conv.messageCount}</span>
                    </div>
                  </div>
                  {isDeleting ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(conv.id)}
                        className="text-[10px] font-600 text-red-400 hover:text-red-300 px-2 py-1 rounded-lg bg-red-500/10 border border-red-500/20 transition-all"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="text-[10px] text-white/40 hover:text-white/60 px-2 py-1 rounded-lg bg-white/5 border border-white/8 transition-all"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(conv.id)}
                      className="w-7 h-7 rounded-lg bg-white/4 border border-white/8 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/20 transition-all group"
                    >
                      <Trash2 size={12} className="text-white/30 group-hover:text-red-400 transition-colors" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop Table — hidden on mobile */}
      <div
        className="hidden md:block rounded-2xl border border-white/8 overflow-hidden mb-4"
        style={{ background: 'rgba(255,255,255,0.02)' }}
      >
        {/* Table Header */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px]">
            <thead>
              <tr className="border-b border-white/8">
                {[
                  { label: 'Name', width: 'w-[180px]' },
                  { label: 'Persona ID', width: 'w-[110px]' },
                  { label: 'Persona Name', width: 'w-[140px]' },
                  { label: 'Conversation ID', width: 'w-[130px]' },
                  { label: 'Status', width: 'w-[110px]' },
                  { label: 'Channel', width: 'w-[110px]' },
                  { label: 'Created', width: 'w-[160px]' },
                  { label: '', width: 'w-[60px]' },
                ].map((col) => (
                  <th
                    key={col.label}
                    className={`${col.width} px-4 py-3 text-left text-[10px] font-600 text-white/35 uppercase tracking-wider`}
                  >
                    {col.label && (
                      <div className="flex items-center gap-1">
                        {col.label}
                        {col.label !== '' && <ArrowUpDown size={9} className="text-white/20" />}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center">
                        <MessageSquare size={20} className="text-white/20" />
                      </div>
                      <p className="text-sm font-500 text-white/40">No conversations found</p>
                      <p className="text-xs text-white/25">Try adjusting your filters or search query</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((conv, idx) => {
                  const status = statusConfig[conv.status];
                  const StatusIcon = status.icon;
                  const isDeleting = deleteConfirmId === conv.id;

                  return (
                    <tr
                      key={conv.id}
                      className={`border-b border-white/5 transition-colors hover:bg-white/3 ${idx === paginated.length - 1 ? 'border-b-0' : ''}`}
                    >
                      {/* Name */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500/40 to-blue-500/40 border border-white/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-600 text-white/70">
                              {conv.name.split(' ').map((n) => n[0]).join('')}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-500 text-white/80 truncate">{conv.name}</p>
                            <p className="text-[10px] text-white/35 truncate">{conv.userEmail}</p>
                          </div>
                        </div>
                      </td>

                      {/* Persona ID — clickable */}
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => setSelectedConv(conv)}
                          className="text-[11px] font-600 text-purple-400 hover:text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 px-2.5 py-1 rounded-lg transition-all"
                        >
                          {conv.personaId}
                        </button>
                      </td>

                      {/* Persona Name */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <Brain size={11} className="text-purple-400/60 flex-shrink-0" />
                          <span className="text-xs text-white/60 truncate">{conv.personaName}</span>
                        </div>
                      </td>

                      {/* Conversation ID */}
                      <td className="px-4 py-3.5">
                        <span className="text-[11px] font-500 text-white/45 font-mono">{conv.conversationId}</span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-500 ${status.bg}`}>
                          <StatusIcon size={10} className={status.color} />
                          <span className={status.color}>{status.label}</span>
                        </div>
                      </td>

                      {/* Channel */}
                      <td className="px-4 py-3.5">
                        <span className={`text-[10px] font-500 px-2.5 py-1 rounded-full border ${channelColors[conv.channel] || 'bg-white/5 text-white/40 border-white/10'}`}>
                          {conv.channel}
                        </span>
                      </td>

                      {/* Created */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5 text-[10px] text-white/40">
                          <Calendar size={10} className="flex-shrink-0" />
                          <span>{conv.created}</span>
                        </div>
                      </td>

                      {/* Delete */}
                      <td className="px-4 py-3.5">
                        {isDeleting ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(conv.id)}
                              className="text-[10px] font-600 text-red-400 hover:text-red-300 px-2 py-1 rounded-lg bg-red-500/10 border border-red-500/20 transition-all"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="text-[10px] text-white/40 hover:text-white/60 px-2 py-1 rounded-lg bg-white/5 border border-white/8 transition-all"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(conv.id)}
                            className="w-7 h-7 rounded-lg bg-white/4 border border-white/8 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/20 transition-all group"
                          >
                            <Trash2 size={12} className="text-white/30 group-hover:text-red-400 transition-colors" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-[11px] text-white/35">
            Showing <span className="text-white/55 font-500">{(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)}</span> of{' '}
            <span className="text-white/55 font-500">{filtered.length}</span> conversations
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-7 h-7 rounded-lg border border-white/8 bg-white/4 flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/8 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={13} />
            </button>

            {pageNumbers().map((page, i) =>
              page === '...' ? (
                <span key={`ellipsis-${i}`} className="text-white/25 text-xs px-1">…</span>
              ) : (
                <button
                  key={page}
                  onClick={() => goToPage(page as number)}
                  className={`w-7 h-7 rounded-lg border text-xs font-500 transition-all ${
                    currentPage === page
                      ? 'border-purple-500/40 bg-purple-500/20 text-purple-300' :'border-white/8 bg-white/4 text-white/45 hover:text-white/70 hover:bg-white/8'
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-7 h-7 rounded-lg border border-white/8 bg-white/4 flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/8 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      )}

      {/* Conversation Detail Modal */}
      {selectedConv && (
        <ConversationModal conv={selectedConv} onClose={() => setSelectedConv(null)} />
      )}
    </AppLayout>
  );
}
