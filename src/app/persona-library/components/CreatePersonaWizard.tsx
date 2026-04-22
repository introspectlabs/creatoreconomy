'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Brain, FileText, BookOpen, Database, Eye, AlertCircle, File, Search, Link, Unlink, Sparkles, Zap, ChevronDown, ChevronUp, Globe, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const STEPS = [
  { id: 1, label: 'Name', icon: Brain },
  { id: 2, label: 'System Prompt', icon: FileText },
  { id: 3, label: 'Context', icon: BookOpen },
  { id: 4, label: 'Knowledge Base', icon: Database },
  { id: 5, label: 'Confirm', icon: Eye },
];

type KBFileStatus = 'READY' | 'PROCESSING' | 'FAILED';

interface KBFile {
  id: string;
  name: string;
  size: string;
  type: string;
  status: KBFileStatus;
}

interface WizardData {
  name: string;
  role: string;
  systemPrompt: string;
  systemContext: string;
  kbFiles: KBFile[];
  isPublic: boolean;
}

interface CreatePersonaWizardProps {
  onClose: () => void;
}

const statusConfig: Record<KBFileStatus, { badge: string; label: string }> = {
  READY: { badge: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25', label: 'READY' },
  PROCESSING: { badge: 'bg-amber-500/15 text-amber-400 border border-amber-500/25', label: 'PROCESSING' },
  FAILED: { badge: 'bg-red-500/15 text-red-400 border border-red-500/25', label: 'FAILED' },
};

// Quick Start Templates
const QUICK_START_TEMPLATES = [
  {
    id: 'real-estate',
    title: 'Real Estate Agent',
    icon: '🏠',
    prompt: `You are a knowledgeable and friendly real estate assistant. Your role is to help clients navigate the property buying, selling, and renting process with confidence.

You assist with:
- Property searches based on budget, location, and preferences
- Explaining mortgage options, interest rates, and financing
- Scheduling property viewings and open houses
- Providing neighborhood insights, school ratings, and local amenities
- Guiding clients through offers, negotiations, and closing processes

Always be empathetic to clients' needs, provide accurate market data, and recommend consulting a licensed agent for legal and contractual matters. Keep responses concise, helpful, and professional.`,
  },
  {
    id: 'customer-support',title: 'Customer Support',icon: '🎧',
    prompt: `You are a helpful and empathetic customer support representative. Your primary goal is to resolve customer issues quickly and leave them satisfied.

Your responsibilities:
- Listen carefully to customer concerns and acknowledge their frustration
- Provide clear, step-by-step solutions to common issues
- Escalate complex problems to the appropriate team when needed
- Follow up to ensure issues are fully resolved
- Maintain a positive, professional tone at all times

Always prioritize customer satisfaction, be transparent about limitations, and never make promises you cannot keep. If you don't know the answer, say so and offer to find out.`,
  },
  {
    id: 'sales-assistant',
    title: 'Sales Assistant',
    icon: '💼',
    prompt: `You are a persuasive yet consultative sales assistant. Your goal is to understand customer needs and match them with the right products or services.

Your approach:
- Ask qualifying questions to understand the customer's pain points and goals
- Present relevant product features and benefits tailored to their needs
- Handle objections with empathy and data-backed responses
- Guide prospects through the sales funnel without being pushy
- Provide pricing information, demos, and trial options when appropriate

Focus on building long-term relationships, not just closing deals. Always be honest about what your product can and cannot do.`,
  },
  {
    id: 'hr-assistant',title: 'HR Assistant',icon: '👥',
    prompt: `You are a professional HR assistant designed to support employees and managers with human resources queries and processes.

You help with:
- Answering questions about company policies, benefits, and procedures
- Guiding employees through onboarding and offboarding processes
- Providing information on leave policies, payroll, and performance reviews
- Assisting with job postings, interview scheduling, and candidate screening
- Offering guidance on workplace conflict resolution and escalation paths

Always maintain strict confidentiality, refer sensitive matters to HR professionals, and ensure compliance with labor laws and company policies.`,
  },
  {
    id: 'tech-support',title: 'Tech Support',icon: '🔧',
    prompt: `You are a patient and knowledgeable technical support specialist. Your mission is to help users troubleshoot and resolve technical issues efficiently.

Your expertise includes:
- Diagnosing software, hardware, and connectivity issues
- Providing step-by-step troubleshooting guides
- Explaining technical concepts in simple, jargon-free language
- Escalating unresolved issues to senior engineers with full context
- Documenting solutions for future reference

Always confirm the issue is fully resolved before closing a ticket. Be patient with non-technical users and adapt your communication style to their level of expertise.`,
  },
  {
    id: 'healthcare',title: 'Healthcare Assistant',icon: '🏥',
    prompt: `You are a compassionate healthcare information assistant. Your role is to provide general health information and help patients navigate healthcare services.

You assist with:
- Answering general health and wellness questions
- Helping patients understand medical terminology and diagnoses
- Scheduling appointments and managing healthcare records
- Providing information on medications, dosages, and side effects
- Guiding patients to appropriate specialists and resources

Always emphasize that you provide general information only and encourage users to consult qualified healthcare professionals for medical advice, diagnosis, or treatment. Patient privacy and safety are your top priorities.`,
  },
];

// Library files sourced from the knowledge base
const LIBRARY_FILES: KBFile[] = [
  { id: 'kb-1', name: 'Product_FAQ_v3.pdf', size: '2.4 MB', type: 'pdf', status: 'READY' },
  { id: 'kb-2', name: 'Sales_Playbook_2024.docx', size: '1.1 MB', type: 'docx', status: 'READY' },
  { id: 'kb-4', name: 'Technical_Specs_API_v2.txt', size: '340 KB', type: 'txt', status: 'READY' },
  { id: 'kb-6', name: 'Brand_Voice_Guidelines.pdf', size: '3.2 MB', type: 'pdf', status: 'READY' },
  { id: 'kb-7', name: 'Onboarding_Checklist.docx', size: '780 KB', type: 'docx', status: 'READY' },
  { id: 'kb-8', name: 'Pricing_Tiers_2024.csv', size: '120 KB', type: 'csv', status: 'READY' },
  { id: 'kb-9', name: 'Support_Escalation_Policy.pdf', size: '1.6 MB', type: 'pdf', status: 'READY' },
  { id: 'kb-10', name: 'API_Integration_Guide.md', size: '95 KB', type: 'md', status: 'READY' },
];

export default function CreatePersonaWizard({ onClose }: CreatePersonaWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [kbSearch, setKbSearch] = useState('');
  const [enhancing, setEnhancing] = useState(false);
  const [showTemplates, setShowTemplates] = useState(true);

  const [data, setData] = useState<WizardData>({
    name: '',
    role: '',
    systemPrompt: '',
    systemContext: '',
    kbFiles: [],
    isPublic: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof WizardData, string>>>({});

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const validateStep = (s: number): boolean => {
    if (s === 1) {
      if (!data.name.trim()) {
        setErrors({ name: 'Persona name is required' });
        return false;
      }
      if (data.name.trim().length < 2) {
        setErrors({ name: 'Name must be at least 2 characters' });
        return false;
      }
    }
    if (s === 2) {
      if (!data.systemPrompt.trim()) {
        setErrors({ systemPrompt: 'System prompt is required' });
        return false;
      }
    }
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, 5));
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  };

  const isLinked = (id: string) => data.kbFiles.some((f) => f.id === id);

  const toggleLink = (file: KBFile) => {
    if (isLinked(file.id)) {
      setData((prev) => ({ ...prev, kbFiles: prev.kbFiles.filter((f) => f.id !== file.id) }));
      toast.success(`"${file.name}" unlinked`);
    } else {
      setData((prev) => ({ ...prev, kbFiles: [...prev.kbFiles, file] }));
      toast.success(`"${file.name}" linked`);
    }
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success(`Persona "${data.name}" created successfully`);
      onClose();
      router.push('/persona-library');
    }, 1500);
  };

  const handleTemplateClick = (template: typeof QUICK_START_TEMPLATES[0]) => {
    setData((p) => ({ ...p, systemPrompt: template.prompt }));
    setErrors({});
    toast.success(`"${template.title}" template applied`);
  };

  const handleEnhancePrompt = () => {
    if (!data.systemPrompt.trim()) {
      toast.error('Please write a system prompt first before enhancing');
      return;
    }
    setEnhancing(true);
    // Simulate AI enhancement
    setTimeout(() => {
      const enhanced = data.systemPrompt.trim() + `\n\n**Communication Style:**\n- Use clear, concise language tailored to the user's expertise level\n- Be proactive in offering relevant follow-up suggestions\n- Maintain a consistent, professional tone throughout all interactions\n- When uncertain, acknowledge limitations and suggest alternative resources`;
      setData((p) => ({ ...p, systemPrompt: enhanced }));
      setEnhancing(false);
      toast.success('Prompt enhanced successfully');
    }, 1800);
  };

  const getFileTypeColor = (type: string) => {
    if (type === 'pdf') return 'text-red-400 bg-red-500/10';
    if (type === 'docx') return 'text-blue-400 bg-blue-500/10';
    if (type === 'csv') return 'text-emerald-400 bg-emerald-500/10';
    if (type === 'md') return 'text-purple-400 bg-purple-500/10';
    return 'text-white/50 bg-white/5';
  };

  const filteredLibrary = LIBRARY_FILES.filter((f) =>
    f.name.toLowerCase().includes(kbSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl glass border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Brain size={16} className="text-purple-400" />
            </div>
            <div>
              <h2 className="text-sm font-700 text-white">Create New Persona</h2>
              <p className="text-[11px] text-white/35">Step {step} of {STEPS.length}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <X size={14} />
          </button>
        </div>

        {/* Step Indicators */}
        <div className="px-6 py-4 border-b border-white/8 flex-shrink-0">
          <div className="flex items-center gap-1">
            {STEPS.map((s, idx) => {
              const StepIcon = s.icon;
              const isCompleted = step > s.id;
              const isCurrent = step === s.id;
              return (
                <React.Fragment key={s.id}>
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-purple-500 text-white'
                          : isCurrent
                          ? 'bg-purple-500/20 border border-purple-500/50 text-purple-400' :'bg-white/5 border border-white/10 text-white/20'
                      }`}
                    >
                      {isCompleted ? <Check size={12} /> : <StepIcon size={12} />}
                    </div>
                    <span className={`text-[9px] font-500 hidden sm:block ${isCurrent ? 'text-purple-400' : isCompleted ? 'text-white/50' : 'text-white/20'}`}>
                      {s.label}
                    </span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className={`flex-1 h-px mx-1 transition-all ${step > s.id ? 'bg-purple-500/50' : 'bg-white/8'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">

          {/* Step 1: Persona Name */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-base font-700 text-white mb-1">Persona Name</h3>
                <p className="text-xs text-white/40">Give your persona a unique, descriptive name that reflects its purpose.</p>
              </div>
              <div>
                <label className="block text-xs font-500 text-white/50 mb-2">Name <span className="text-red-400">*</span></label>
                <input
                  autoFocus
                  value={data.name}
                  onChange={(e) => { setData((p) => ({ ...p, name: e.target.value })); setErrors({}); }}
                  placeholder="e.g. Aria Sales, Support Bot v2, Maya HR..."
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-white placeholder-white/20 outline-none transition-all ${
                    errors.name ? 'border-red-500/50 focus:border-red-500/70' : 'border-white/8 focus:border-purple-500/50 focus:bg-white/7'
                  }`}
                />
                {errors.name && <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1"><AlertCircle size={11} />{errors.name}</p>}
              </div>
              <div>
                <label className="block text-xs font-500 text-white/50 mb-2">Role <span className="text-white/20">(optional)</span></label>
                <input
                  value={data.role}
                  onChange={(e) => setData((p) => ({ ...p, role: e.target.value }))}
                  placeholder="e.g. Sales Representative, Customer Support Agent, HR Assistant..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-sm text-white placeholder-white/20 outline-none focus:border-purple-500/50 focus:bg-white/7 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-500 text-white/50 mb-2">Description <span className="text-white/20">(optional)</span></label>
                <textarea
                  value={data.systemContext}
                  onChange={(e) => setData((p) => ({ ...p, systemContext: e.target.value }))}
                  placeholder="Brief description of what this persona does..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-sm text-white placeholder-white/20 outline-none focus:border-purple-500/50 focus:bg-white/7 transition-all resize-none"
                />
              </div>
              {/* Public / Private toggle */}
              <div>
                <label className="block text-xs font-500 text-white/50 mb-2">Visibility</label>
                <div className="flex items-stretch gap-3">
                  <button
                    type="button"
                    onClick={() => setData((p) => ({ ...p, isPublic: false }))}
                    className={`flex-1 flex flex-col items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                      !data.isPublic
                        ? 'bg-purple-500/15 border-purple-500/40 text-white' :'bg-white/4 border-white/8 text-white/40 hover:bg-white/6'
                    }`}
                  >
                    <Lock size={16} className={!data.isPublic ? 'text-purple-400' : 'text-white/25'} />
                    <div className="text-center">
                      <p className="text-xs font-600">Private</p>
                      <p className="text-[10px] text-white/35 mt-0.5">Only accessible via embed or API key</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setData((p) => ({ ...p, isPublic: true }))}
                    className={`flex-1 flex flex-col items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                      data.isPublic
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-white' :'bg-white/4 border-white/8 text-white/40 hover:bg-white/6'
                    }`}
                  >
                    <Globe size={16} className={data.isPublic ? 'text-emerald-400' : 'text-white/25'} />
                    <div className="text-center">
                      <p className="text-xs font-600">Public</p>
                      <p className="text-[10px] text-white/35 mt-0.5">Gets a shareable /chat/[slug] URL</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: System Prompt */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-base font-700 text-white mb-1">System Prompt</h3>
                <p className="text-xs text-white/40">Define the core instructions that shape how this persona thinks and responds.</p>
              </div>
              <div>
                <label className="block text-xs font-500 text-white/50 mb-2">System Prompt <span className="text-red-400">*</span></label>
                {/* Textarea with Enhance button */}
                <div className="relative">
                  <textarea
                    autoFocus
                    value={data.systemPrompt}
                    onChange={(e) => { setData((p) => ({ ...p, systemPrompt: e.target.value })); setErrors({}); }}
                    placeholder={`You are a helpful AI assistant named ${data.name || 'Persona'}. Your role is to...\n\nBe concise, professional, and always...\n\nWhen asked about..., you should...`}
                    rows={10}
                    className={`w-full px-4 py-3 pb-12 rounded-xl bg-white/5 border text-sm text-white placeholder-white/20 outline-none transition-all font-mono leading-relaxed resize-none ${
                      errors.systemPrompt ? 'border-red-500/50 focus:border-red-500/70' : 'border-white/8 focus:border-purple-500/50 focus:bg-white/7'
                    }`}
                  />
                  {/* Enhance Prompt button inside textarea area */}
                  <div className="absolute bottom-3 right-3">
                    <button
                      type="button"
                      onClick={handleEnhancePrompt}
                      disabled={enhancing}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[11px] font-600 hover:bg-purple-500/30 hover:border-purple-500/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {enhancing ? (
                        <>
                          <div className="w-3 h-3 border-2 border-purple-400/40 border-t-purple-400 rounded-full animate-spin" />
                          Enhancing...
                        </>
                      ) : (
                        <>
                          <Sparkles size={11} />
                          Enhance Prompt
                        </>
                      )}
                    </button>
                  </div>
                </div>
                {errors.systemPrompt && <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1"><AlertCircle size={11} />{errors.systemPrompt}</p>}
                <p className="text-[11px] text-white/25 mt-1.5">{data.systemPrompt.length} characters</p>
              </div>

              {/* Quick Start Templates */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setShowTemplates((v) => !v)}
                  className="flex items-center justify-between w-full"
                >
                  <div className="flex items-center gap-2">
                    <Zap size={13} className="text-amber-400" />
                    <span className="text-xs font-600 text-white/70">Quick Start Templates</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20 font-500">
                      {QUICK_START_TEMPLATES.length}
                    </span>
                  </div>
                  {showTemplates ? (
                    <ChevronUp size={13} className="text-white/30" />
                  ) : (
                    <ChevronDown size={13} className="text-white/30" />
                  )}
                </button>

                {showTemplates && (
                  <div className="grid grid-cols-2 gap-2">
                    {QUICK_START_TEMPLATES.map((template) => (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => handleTemplateClick(template)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/4 border border-white/8 hover:bg-white/7 hover:border-purple-500/30 transition-all text-left group"
                      >
                        <span className="text-base flex-shrink-0">{template.icon}</span>
                        <span className="text-xs font-500 text-white/60 group-hover:text-white/90 transition-colors leading-tight">
                          {template.title}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {showTemplates && (
                  <p className="text-[11px] text-white/25">Click a template to populate the system prompt. You can edit it afterwards.</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: System Context */}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-base font-700 text-white mb-1">System Context</h3>
                <p className="text-xs text-white/40">Provide background information, company details, or domain-specific context the persona should always be aware of.</p>
              </div>
              <div>
                <label className="block text-xs font-500 text-white/50 mb-2">Context <span className="text-white/20">(optional)</span></label>
                <textarea
                  autoFocus
                  value={data.systemContext}
                  onChange={(e) => setData((p) => ({ ...p, systemContext: e.target.value }))}
                  placeholder={`Company: Acme Corp\nIndustry: SaaS / B2B\nProduct: CRM platform for mid-market companies\n\nKey facts:\n- Founded in 2018\n- 500+ enterprise customers\n- Pricing starts at $99/month\n\nTone: Professional, friendly, solution-oriented`}
                  rows={10}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-sm text-white placeholder-white/20 outline-none focus:border-purple-500/50 focus:bg-white/7 transition-all font-mono leading-relaxed resize-none"
                />
                <p className="text-[11px] text-white/25 mt-1.5">{data.systemContext.length} characters</p>
              </div>
            </div>
          )}

          {/* Step 4: Knowledge Base Library Picker */}
          {step === 4 && (
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-base font-700 text-white mb-1">Knowledge Base</h3>
                <p className="text-xs text-white/40">Link files from your knowledge base library to give this persona domain-specific knowledge.</p>
              </div>

              {/* Linked count badge */}
              {data.kbFiles.length > 0 && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <Link size={13} className="text-purple-400 flex-shrink-0" />
                  <p className="text-xs text-purple-300 font-500">
                    {data.kbFiles.length} file{data.kbFiles.length > 1 ? 's' : ''} linked to this persona
                  </p>
                </div>
              )}

              {/* Search */}
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  value={kbSearch}
                  onChange={(e) => setKbSearch(e.target.value)}
                  placeholder="Search knowledge base files..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-sm text-white placeholder-white/25 outline-none focus:border-purple-500/40 transition-all"
                />
              </div>

              {/* Library file list */}
              <div className="flex flex-col gap-2">
                {filteredLibrary.length === 0 ? (
                  <p className="text-xs text-white/25 text-center py-4">No files match your search.</p>
                ) : (
                  filteredLibrary.map((f) => {
                    const linked = isLinked(f.id);
                    const typeColors = getFileTypeColor(f.type);
                    const sc = statusConfig[f.status];
                    return (
                      <div
                        key={f.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                          linked
                            ? 'bg-purple-500/8 border-purple-500/25' :'bg-white/4 border-white/8 hover:bg-white/6'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${typeColors}`}>
                          <File size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-500 text-white truncate">{f.name}</p>
                          <p className="text-[11px] text-white/30">{f.size}</p>
                        </div>
                        <span className={`text-[10px] font-600 px-2 py-0.5 rounded-full flex-shrink-0 ${sc.badge}`}>{sc.label}</span>
                        <button
                          onClick={() => toggleLink(f)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-600 transition-all flex-shrink-0 ${
                            linked
                              ? 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20' :'bg-purple-500/15 border border-purple-500/25 text-purple-400 hover:bg-purple-500/25'
                          }`}
                        >
                          {linked ? (
                            <><Unlink size={11} /> Unlink</>
                          ) : (
                            <><Link size={11} /> Link</>
                          )}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {data.kbFiles.length === 0 && (
                <p className="text-xs text-white/25 text-center py-1">No files linked — you can skip this step and link files later.</p>
              )}
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-base font-700 text-white mb-1">Review & Confirm</h3>
                <p className="text-xs text-white/40">Review your persona configuration before creating it.</p>
              </div>

              <div className="flex flex-col gap-3">
                {/* Name */}
                <div className="p-4 rounded-xl bg-white/4 border border-white/8">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain size={13} className="text-purple-400" />
                    <span className="text-[11px] font-600 text-white/40 uppercase tracking-wider">Persona Name</span>
                  </div>
                  <p className="text-sm font-600 text-white">{data.name}</p>
                </div>

                {/* Visibility */}
                <div className="p-4 rounded-xl bg-white/4 border border-white/8">
                  <div className="flex items-center gap-2 mb-2">
                    {data.isPublic ? <Globe size={13} className="text-emerald-400" /> : <Lock size={13} className="text-white/40" />}
                    <span className="text-[11px] font-600 text-white/40 uppercase tracking-wider">Visibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-600 px-2 py-0.5 rounded-full border ${
                      data.isPublic
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :'bg-white/5 border-white/10 text-white/40'
                    }`}>
                      {data.isPublic ? '🌐 Public' : '🔒 Private'}
                    </span>
                    {data.isPublic && data.name && (
                      <span className="text-[11px] text-white/30 font-mono">/chat/{data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}</span>
                    )}
                  </div>
                </div>

                {/* System Prompt */}
                <div className="p-4 rounded-xl bg-white/4 border border-white/8">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={13} className="text-blue-400" />
                    <span className="text-[11px] font-600 text-white/40 uppercase tracking-wider">System Prompt</span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed line-clamp-3">
                    {data.systemPrompt || <span className="text-white/25 italic">Not provided</span>}
                  </p>
                  <p className="text-[10px] text-white/25 mt-1">{data.systemPrompt.length} chars</p>
                </div>

                {/* Context */}
                <div className="p-4 rounded-xl bg-white/4 border border-white/8">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={13} className="text-amber-400" />
                    <span className="text-[11px] font-600 text-white/40 uppercase tracking-wider">System Context</span>
                  </div>
                  {data.systemContext ? (
                    <p className="text-xs text-white/60 leading-relaxed line-clamp-2">{data.systemContext}</p>
                  ) : (
                    <p className="text-xs text-white/25 italic">Not provided</p>
                  )}
                </div>

                {/* Knowledge Base */}
                <div className="p-4 rounded-xl bg-white/4 border border-white/8">
                  <div className="flex items-center gap-2 mb-2">
                    <Database size={13} className="text-emerald-400" />
                    <span className="text-[11px] font-600 text-white/40 uppercase tracking-wider">Knowledge Base</span>
                  </div>
                  {data.kbFiles.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {data.kbFiles.map((f) => (
                        <span key={f.id} className="text-[11px] px-2 py-0.5 rounded-full bg-white/8 text-white/50 border border-white/10 flex items-center gap-1">
                          <Link size={9} className="text-purple-400" />
                          {f.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-white/25 italic">No files linked</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/8 flex-shrink-0">
          <button
            onClick={step === 1 ? onClose : handleBack}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-sm font-500 text-white/50 hover:text-white hover:bg-white/5 transition-all"
          >
            <ChevronLeft size={14} />
            {step === 1 ? 'Cancel' : 'Back'}
          </button>

          <div className="flex items-center gap-2">
            {step < 5 ? (
              <>
                {(step === 3 || step === 4) && (
                  <button
                    onClick={handleNext}
                    className="px-4 py-2.5 rounded-xl text-sm font-500 text-white/40 hover:text-white/60 transition-all"
                  >
                    Skip
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-600 text-white"
                >
                  Next <ChevronRight size={14} />
                </button>
              </>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="btn-primary flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-600 text-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Check size={14} /> Create Persona
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
