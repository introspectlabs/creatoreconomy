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
    personaName: 'FinanceCoach — Priya',
    conversationId: 'CONV-8821',
    status: 'resolved',
    channel: 'Web Widget',
    created: 'Apr 5, 2026 2:34 PM',
    duration: '17 min',
    messageCount: 14,
    messages: [
      { id: 'm1', role: 'user', content: "Hi, I want to start investing but don't know where to begin.", timestamp: '2:34 PM' },
      { id: 'm2', role: 'assistant', content: "Welcome! Great that you're starting your investment journey. I'd recommend beginning with SIPs in index funds — low cost, diversified, and beginner-friendly. Could you tell me your monthly savings capacity and investment horizon?", timestamp: '2:34 PM' },
      { id: 'm3', role: 'user', content: 'I can save about ₹10,000 per month and I have a 5-year horizon.', timestamp: '2:36 PM' },
      { id: 'm4', role: 'assistant', content: "Perfect! With ₹10,000/month over 5 years at a conservative 12% CAGR, you could build a corpus of ~₹8.2 lakhs. I'd suggest splitting: ₹6,000 in a Nifty 50 index fund and ₹4,000 in a mid-cap fund. Want me to walk you through Module 3 of the course which covers this in detail?", timestamp: '2:36 PM' },
      { id: 'm5', role: 'user', content: 'Yes, please share the module link.', timestamp: '2:40 PM' },
      { id: 'm6', role: 'assistant', content: "Here's the link to Module 3: 'Building Your First Portfolio'. You can also book a 1:1 session with Priya to get a personalised plan. Anything else I can help with?", timestamp: '2:41 PM' },
    ],
  },
  {
    id: 'conv-002',
    name: 'Rahul Verma',
    userEmail: 'rahul@techcorp.io',
    personaId: 'PER-1002',
    personaName: 'CourseGuide — Jordan',
    conversationId: 'CONV-8820',
    status: 'escalated',
    channel: 'Web Widget',
    created: 'Apr 5, 2026 1:10 PM',
    duration: '18 min',
    messageCount: 9,
    messages: [
      { id: 'm1', role: 'user', content: 'I purchased the course but cannot access Module 5.', timestamp: '1:10 PM' },
      { id: 'm2', role: 'assistant', content: "I'm sorry to hear that, Rahul. Let me check your enrollment status. Can you confirm the email address you used to purchase?", timestamp: '1:10 PM' },
      { id: 'm3', role: 'user', content: 'rahul@techcorp.io', timestamp: '1:12 PM' },
      { id: 'm4', role: 'assistant', content: "I can see your enrollment. It looks like Module 5 unlocks after completing Module 4's quiz. I'm escalating this to Jordan's support team to verify your progress. You should hear back within 2 hours.", timestamp: '1:13 PM' },
    ],
  },
  {
    id: 'conv-003',
    name: 'Aisha Patel',
    userEmail: 'aisha@startup.co',
    personaId: 'PER-1003',
    personaName: 'Coach Dani',
    conversationId: 'CONV-8819',
    status: 'resolved',
    channel: 'WhatsApp',
    created: 'Apr 4, 2026 10:05 AM',
    duration: '17 min',
    messageCount: 11,
    messages: [
      { id: 'm1', role: 'user', content: 'I feel stuck in my career and don\'t know what to do next.', timestamp: '10:05 AM' },
      { id: 'm2', role: 'assistant', content: "I hear you, Aisha. Feeling stuck is actually a sign that you're ready for the next level. Let's start with a quick clarity exercise — what does your ideal workday look like in 2 years?", timestamp: '10:05 AM' },
      { id: 'm3', role: 'user', content: 'I want to be running my own business, working on my own terms.', timestamp: '10:07 AM' },
      { id: 'm4', role: 'assistant', content: "That's a powerful vision! The gap between where you are and where you want to be is your coaching roadmap. I'd recommend booking a 1:1 breakthrough session with Dani — she specialises in exactly this transition.", timestamp: '10:08 AM' },
    ],
  },
  {
    id: 'conv-004',
    name: 'Marcus Johnson',
    userEmail: 'marcus@gmail.com',
    personaId: 'PER-1001',
    personaName: 'FinanceCoach — Priya',
    conversationId: 'CONV-8818',
    status: 'ongoing',
    channel: 'Web Widget',
    created: 'Apr 4, 2026 3:45 PM',
    duration: 'Active',
    messageCount: 6,
    messages: [
      { id: 'm1', role: 'user', content: 'What is the difference between options and futures?', timestamp: '3:45 PM' },
      { id: 'm2', role: 'assistant', content: "Great question! Options give you the right (but not obligation) to buy/sell at a set price, while futures are binding contracts. Options are generally better for beginners due to limited downside. Module 7 of the course covers this with live trade examples.", timestamp: '3:45 PM' },
      { id: 'm3', role: 'user', content: 'Which module should I start with if I\'m a beginner?', timestamp: '3:48 PM' },
      { id: 'm4', role: 'assistant', content: "Start with Module 1: 'Stock Market Fundamentals', then Module 2: 'Reading Charts'. Don't skip to derivatives until you've completed those — it'll make everything click much faster.", timestamp: '3:49 PM' },
    ],
  },
  {
    id: 'conv-005',
    name: 'Yuki Tanaka',
    userEmail: 'yuki@globalco.jp',
    personaId: 'PER-1002',
    personaName: 'CourseGuide — Jordan',
    conversationId: 'CONV-8817',
    status: 'resolved',
    channel: 'Web Widget',
    created: 'Apr 4, 2026 9:00 AM',
    duration: '14 min',
    messageCount: 8,
    messages: [
      { id: 'm1', role: 'user', content: 'Is there a certificate after completing the course?', timestamp: '9:00 AM' },
      { id: 'm2', role: 'assistant', content: "Yes! You'll receive a verified completion certificate after finishing all modules and passing the final assessment. The certificate is shareable on LinkedIn and recognised by our industry partners.", timestamp: '9:00 AM' },
    ],
  },
  {
    id: 'conv-006',
    name: 'Carlos Rivera',
    userEmail: 'carlos@latam.mx',
    personaId: 'PER-1004',
    personaName: 'MindsetPro — Ravi',
    conversationId: 'CONV-8816',
    status: 'resolved',
    channel: 'WhatsApp',
    created: 'Apr 3, 2026 11:30 AM',
    duration: '18 min',
    messageCount: 16,
    messages: [
      { id: 'm1', role: 'user', content: 'I struggle with procrastination. Any advice?', timestamp: '11:30 AM' },
      { id: 'm2', role: 'assistant', content: "Procrastination is usually fear in disguise — fear of failure, judgment, or not being good enough. Ravi's 'Identity Shift' framework helps you rewire this at the root. Want me to share the first exercise?", timestamp: '11:30 AM' },
      { id: 'm3', role: 'user', content: 'Yes please.', timestamp: '11:32 AM' },
      { id: 'm4', role: 'assistant', content: "Here's Exercise 1: Write down 3 things you've been avoiding. Next to each, write the fear underneath it. Then ask: 'What would I do if I knew I couldn't fail?' This is from Week 2 of the Mindset Mastery program.", timestamp: '11:33 AM' },
    ],
  },
  {
    id: 'conv-007',
    name: 'Sophie Laurent',
    userEmail: 'sophie@paris.fr',
    personaId: 'PER-1003',
    personaName: 'Coach Dani',
    conversationId: 'CONV-8815',
    status: 'resolved',
    channel: 'Web Widget',
    created: 'Apr 3, 2026 9:15 AM',
    duration: '12 min',
    messageCount: 10,
    messages: [
      { id: 'm1', role: 'user', content: 'How long does a coaching program with Dani last?', timestamp: '9:15 AM' },
      { id: 'm2', role: 'assistant', content: "Dani offers 3 formats: a 4-week intensive, a 3-month transformation program, and ongoing monthly retainer coaching. Most clients see breakthrough results in the 3-month program. Would you like to book a free discovery call?", timestamp: '9:15 AM' },
    ],
  },
  {
    id: 'conv-008',
    name: 'David Kim',
    userEmail: 'david@seoul.kr',
    personaId: 'PER-1001',
    personaName: 'FinanceCoach — Priya',
    conversationId: 'CONV-8814',
    status: 'escalated',
    channel: 'Web Widget',
    created: 'Apr 2, 2026 4:20 PM',
    duration: '25 min',
    messageCount: 18,
    messages: [
      { id: 'm1', role: 'user', content: 'I lost money following a tip from the course. I want a refund.', timestamp: '4:20 PM' },
      { id: 'm2', role: 'assistant', content: "I'm really sorry to hear about your experience, David. The course teaches frameworks, not specific trade tips — but I understand your frustration. I'm escalating this to Priya's support team who will review your case and respond within 24 hours.", timestamp: '4:20 PM' },
    ],
  },
  {
    id: 'conv-009',
    name: 'Emma Wilson',
    userEmail: 'emma@london.uk',
    personaId: 'PER-1002',
    personaName: 'CourseGuide — Jordan',
    conversationId: 'CONV-8813',
    status: 'resolved',
    channel: 'Web Widget',
    created: 'Apr 2, 2026 2:00 PM',
    duration: '9 min',
    messageCount: 7,
    messages: [
      { id: 'm1', role: 'user', content: 'Is there a free trial or preview of the course?', timestamp: '2:00 PM' },
      { id: 'm2', role: 'assistant', content: "Yes! You can access the first 3 modules for free — no credit card required. Just sign up and start learning. If you love it, you can unlock the full course at any time.", timestamp: '2:00 PM' },
    ],
  },
  {
    id: 'conv-010',
    name: "Liam O'Brien",
    userEmail: 'liam@dublin.ie',
    personaId: 'PER-1004',
    personaName: 'MindsetPro — Ravi',
    conversationId: 'CONV-8812',
    status: 'ongoing',
    channel: 'WhatsApp',
    created: 'Apr 1, 2026 11:00 AM',
    duration: 'Active',
    messageCount: 4,
    messages: [
      { id: 'm1', role: 'user', content: 'How is this different from therapy?', timestamp: '11:00 AM' },
      { id: 'm2', role: 'assistant', content: "Great question. Therapy focuses on healing the past; Ravi's mindset coaching focuses on building the future. It's action-oriented, goal-driven, and designed for high performers who want to break through mental blocks and perform at their peak.", timestamp: '11:00 AM' },
    ],
  },
  {
    id: 'conv-011',
    name: 'Fatima Al-Hassan',
    userEmail: 'fatima@dubai.ae',
    personaId: 'PER-1003',
    personaName: 'Coach Dani',
    conversationId: 'CONV-8811',
    status: 'resolved',
    channel: 'Web Widget',
    created: 'Apr 1, 2026 8:30 AM',
    duration: '11 min',
    messageCount: 9,
    messages: [
      { id: 'm1', role: 'user', content: 'Do you offer group coaching sessions?', timestamp: '8:30 AM' },
      { id: 'm2', role: 'assistant', content: "Yes! Dani runs a monthly group coaching cohort called 'The Breakthrough Circle' — 8 people max, 4 live sessions, plus a private community. The next cohort starts May 15. Want me to add you to the waitlist?", timestamp: '8:30 AM' },
    ],
  },
];

const allPersonas = ['All Personas', 'SalesBot Pro', 'Support Agent', 'Onboarding Guide', 'HR Assistant'];
const allChannels = ['All Channels', 'Web Widget', 'PersonaMatrix', 'API'];
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
  'PersonaMatrix': 'bg-teal-500/10 text-teal-300 border-teal-500/20',
};

const PAGE_SIZE = 8;

function FilterSelect({ icon: IconComponent, options, value, onChange }: {
  icon: React.ElementType;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all cursor-pointer min-w-[140px]">
      {IconComponent && <IconComponent size={13} className="text-white/40 flex-shrink-0" />}
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

export default function ConversationsPage() {
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
        title="Conversations"
        subtitle="Track and review all conversations between users and personas"
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

      {/* Mobile Card List */}
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
                className="rounded-2xl border border-white/8 p-4 cursor-pointer hover:border-white/15 hover:bg-white/[0.03] transition-all"
                style={{ background: 'rgba(255,255,255,0.02)' }}
                onClick={() => setSelectedConv(conv)}
              >
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

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[11px] font-600 text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-lg">
                    {conv.personaId}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Brain size={11} className="text-purple-400/60 flex-shrink-0" />
                    <span className="text-xs text-white/60">{conv.personaName}</span>
                  </div>
                  <span className={`text-[10px] font-500 px-2.5 py-1 rounded-full border ${channelColors[conv.channel] || 'bg-white/5 text-white/40 border-white/10'}`}>
                    {conv.channel}
                  </span>
                </div>

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
                  <div onClick={(e) => e.stopPropagation()}>
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
              </div>
            );
          })
        )}
      </div>

      {/* Desktop Table */}
      <div
        className="hidden md:block rounded-2xl border border-white/8 overflow-hidden mb-4"
        style={{ background: 'rgba(255,255,255,0.02)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px]">
            <thead>
              <tr className="border-b border-white/8">
                {[
                  { label: 'User', width: 'w-[180px]' },
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
                      className={`border-b border-white/5 transition-colors hover:bg-white/3 cursor-pointer ${idx === paginated.length - 1 ? 'border-b-0' : ''}`}
                      onClick={() => setSelectedConv(conv)}
                    >
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

                      <td className="px-4 py-3.5">
                        <span className="text-[11px] font-600 text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-lg">
                          {conv.personaId}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <Brain size={11} className="text-purple-400/60 flex-shrink-0" />
                          <span className="text-xs text-white/60 truncate">{conv.personaName}</span>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="text-[11px] font-500 text-white/45 font-mono">{conv.conversationId}</span>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-500 ${status.bg}`}>
                          <StatusIcon size={10} className={status.color} />
                          <span className={status.color}>{status.label}</span>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className={`text-[10px] font-500 px-2.5 py-1 rounded-full border ${channelColors[conv.channel] || 'bg-white/5 text-white/40 border-white/10'}`}>
                          {conv.channel}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5 text-[10px] text-white/40">
                          <Calendar size={10} className="flex-shrink-0" />
                          <span>{conv.created}</span>
                        </div>
                      </td>

                      <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
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
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setSelectedConv(conv)}
                              className="text-[10px] font-500 text-white/50 hover:text-white px-2.5 py-1 rounded-lg bg-white/4 border border-white/8 hover:border-white/20 transition-all"
                            >
                              View
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(conv.id)}
                              className="w-7 h-7 rounded-lg bg-white/4 border border-white/8 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/20 transition-all group"
                            >
                              <Trash2 size={12} className="text-white/30 group-hover:text-red-400 transition-colors" />
                            </button>
                          </div>
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

      {selectedConv && (
        <ConversationModal conv={selectedConv} onClose={() => setSelectedConv(null)} />
      )}
    </AppLayout>
  );
}
