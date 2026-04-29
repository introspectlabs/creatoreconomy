'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import { MoreVertical, Pause, Play, Trash2, X, AlertTriangle, ChevronDown, ChevronUp, Zap, FileText, Pencil } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 'details' | 'knowledge' | 'review';

interface PersonaForm {
  name: string;
  tone: 'friendly' | 'expert' | 'premium';
  prompt: string;
  attachedKbIds: string[];
}

interface Persona {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'paused' | 'draft';
  conversations: number;
  conversion: string;
  channel: string;
  emoji: string;
  tone: 'friendly' | 'expert' | 'premium';
  prompt: string;
  attachedKbIds: string[];
}

// ─── Static data ──────────────────────────────────────────────────────────────

const toneOptions = [
  { value: 'friendly', label: 'Friendly', desc: 'Warm, approachable, conversational', emoji: '😊' },
  { value: 'expert', label: 'Expert', desc: 'Knowledgeable, precise, authoritative', emoji: '🎓' },
  { value: 'premium', label: 'Premium', desc: 'Sophisticated, exclusive, refined', emoji: '✨' },
] as const;

interface QuickTemplate {
  id: string;
  label: string;
  icon: string;
  prompt: string;
}

const quickTemplates: QuickTemplate[] = [
  {
    id: 'tone-behaviour',
    label: 'Tone & Behaviour',
    icon: '🎭',
    prompt: `You are a friendly and helpful shopping assistant for our D2C brand. Always greet customers warmly, use a conversational tone, and be empathetic to their needs. Avoid being pushy — focus on helping customers find the right product for them. Use simple, clear language and keep responses concise.`,
  },
  {
    id: 'capabilities',
    label: 'Capabilities',
    icon: '⚡',
    prompt: `You can help customers with: (1) Finding the right product based on their needs and preferences, (2) Comparing products and explaining differences, (3) Answering questions about ingredients, materials, or specifications, (4) Checking product availability and pricing, (5) Explaining shipping, returns, and policies, (6) Recommending bundles or complementary products.`,
  },
  {
    id: 'call-flow',
    label: 'Call Flow',
    icon: '🔄',
    prompt: `Follow this conversation flow: 1) Greet the customer and ask how you can help. 2) Understand their need or problem. 3) Ask 1-2 clarifying questions if needed. 4) Recommend 1-3 relevant products with brief explanations. 5) Handle objections or questions. 6) Guide them toward adding to cart or completing purchase. 7) Offer post-purchase support if needed.`,
  },
  {
    id: 'objectives',
    label: 'Objectives',
    icon: '🎯',
    prompt: `Primary objective: Help customers find and purchase the right product. Secondary objectives: (1) Increase average order value through relevant upsells, (2) Reduce cart abandonment by addressing concerns proactively, (3) Build brand trust through accurate, helpful information, (4) Collect customer preferences to personalize recommendations. Always prioritize customer satisfaction over immediate sales.`,
  },
];

const kbDocuments = [
  { id: 'kb-1', name: 'Product_FAQ_v3.pdf', type: 'pdf', size: '2.4 MB' },
  { id: 'kb-2', name: 'Sales_Playbook_2024.docx', type: 'docx', size: '1.1 MB' },
  { id: 'kb-4', name: 'Competitor_Analysis_Q4.csv', type: 'csv', size: '890 KB' },
  { id: 'kb-6', name: 'Brand_Voice_Guidelines.pdf', type: 'pdf', size: '3.2 MB' },
];

const initialPersonas: Persona[] = [
  {
    id: 'glow-ai',
    name: 'Glow AI',
    type: 'Shopping Assistant',
    status: 'active',
    conversations: 842,
    conversion: '9.2%',
    channel: 'Web + WhatsApp',
    emoji: '🧴',
    tone: 'friendly',
    prompt: '',
    attachedKbIds: ['kb-1'],
  },
  {
    id: 'support-ai',
    name: 'Support AI',
    type: 'Shopping Assistant',
    status: 'draft',
    conversations: 0,
    conversion: '—',
    channel: 'Not deployed',
    emoji: '💬',
    tone: 'expert',
    prompt: '',
    attachedKbIds: [],
  },
];

// ─── Edit Wizard ──────────────────────────────────────────────────────────────

interface EditWizardProps {
  persona: Persona;
  onSave: (updated: Persona) => void;
  onClose: () => void;
}

function EditPersonaWizard({ persona, onSave, onClose }: EditWizardProps) {
  const [step, setStep] = useState<Step>('details');
  const [form, setForm] = useState<PersonaForm>({
    name: persona.name,
    tone: persona.tone,
    prompt: persona.prompt,
    attachedKbIds: persona.attachedKbIds,
  });
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);

  const steps: { key: Step; label: string; num: string }[] = [
    { key: 'details', label: 'Persona Details', num: '1' },
    { key: 'knowledge', label: 'Knowledge Source', num: '2' },
    { key: 'review', label: 'Review & Save', num: '3' },
  ];

  const currentStepIdx = steps.findIndex((s) => s.key === step);

  const handleNext = () => {
    if (step === 'details') setStep('knowledge');
    else if (step === 'knowledge') setStep('review');
  };

  const handleBack = () => {
    if (step === 'knowledge') setStep('details');
    else if (step === 'review') setStep('knowledge');
  };

  const injectTemplate = (template: QuickTemplate) => {
    setForm((prev) => ({
      ...prev,
      prompt: prev.prompt ? `${prev.prompt}\n\n${template.prompt}` : template.prompt,
    }));
  };

  const toggleKbDoc = (id: string) => {
    setForm((prev) => ({
      ...prev,
      attachedKbIds: prev.attachedKbIds.includes(id)
        ? prev.attachedKbIds.filter((k) => k !== id)
        : [...prev.attachedKbIds, id],
    }));
  };

  const handleSave = () => {
    onSave({
      ...persona,
      name: form.name.trim(),
      tone: form.tone,
      prompt: form.prompt,
      attachedKbIds: form.attachedKbIds,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0f0d1a] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 sticky top-0 bg-[#0f0d1a] z-10">
          <div>
            <h2 className="text-sm font-semibold text-white">Edit Persona</h2>
            <p className="text-xs text-white/40 mt-0.5">Update settings for {persona.name}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-white/8 text-white/35 hover:text-white flex items-center justify-center transition-all"
          >
            <X size={14} />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-0 px-6 py-4 border-b border-white/5">
          {steps.map((s, i) => (
            <React.Fragment key={s.key}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    s.key === step
                      ? 'bg-[#7c3aed] text-white'
                      : currentStepIdx > i
                      ? 'bg-[#34d399] text-white'
                      : 'bg-white/8 text-white/30'
                  }`}
                >
                  {currentStepIdx > i ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : s.num}
                </div>
                <span className={`text-sm font-medium hidden sm:inline ${s.key === step ? 'text-white' : 'text-white/35'}`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-3 ${currentStepIdx > i ? 'bg-[#34d399]/40' : 'bg-white/8'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step content */}
        <div className="p-6 flex flex-col gap-6">
          {/* Step 1: Details */}
          {step === 'details' && (
            <>
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Persona Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Glow AI, Shop Assistant, Aria..."
                  className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#7c3aed]/50 focus:bg-white/8 transition-all"
                />
              </div>

              {/* Type */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Persona Type</label>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-[#7c3aed]/40 bg-[#7c3aed]/8">
                  <span className="text-2xl">🛍️</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">Shopping Assistant</p>
                    <p className="text-xs text-white/45 mt-0.5">Helps visitors find products, compare options, and complete purchases</p>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#14b8a6]/20 text-[#14b8a6] border border-[#14b8a6]/30">
                    Default
                  </span>
                </div>
              </div>

              {/* Tone */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Tone</label>
                <div className="grid grid-cols-3 gap-3">
                  {toneOptions.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setForm({ ...form, tone: t.value })}
                      className={`flex flex-col gap-1.5 p-3 rounded-xl border text-left transition-all ${
                        form.tone === t.value
                          ? 'border-[#7c3aed]/50 bg-[#7c3aed]/10'
                          : 'border-white/8 bg-white/3 hover:border-white/15'
                      }`}
                    >
                      <span className="text-xl">{t.emoji}</span>
                      <p className="text-xs font-semibold text-white">{t.label}</p>
                      <p className="text-[10px] text-white/40 leading-relaxed">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-white/60 uppercase tracking-wider">System Prompt / Instructions</label>
                  <span className="text-[10px] text-white/30">Optional</span>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-white/45">Quick Start Templates — click to inject into prompt:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickTemplates.map((tpl) => (
                      <div key={tpl.id} className="rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden">
                        <button
                          onClick={() => setExpandedTemplate(expandedTemplate === tpl.id ? null : tpl.id)}
                          className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/4 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">{tpl.icon}</span>
                            <span className="text-xs font-medium text-white/70">{tpl.label}</span>
                          </div>
                          {expandedTemplate === tpl.id ? (
                            <ChevronUp size={13} className="text-white/30" />
                          ) : (
                            <ChevronDown size={13} className="text-white/30" />
                          )}
                        </button>
                        {expandedTemplate === tpl.id && (
                          <div className="px-3 pb-3 flex flex-col gap-2">
                            <p className="text-[11px] text-white/40 leading-relaxed line-clamp-3">{tpl.prompt}</p>
                            <button
                              onClick={() => { injectTemplate(tpl); setExpandedTemplate(null); }}
                              className="flex items-center gap-1.5 self-start px-2.5 py-1.5 rounded-lg bg-[#7c3aed]/15 border border-[#7c3aed]/30 text-[11px] font-semibold text-[#a78bfa] hover:bg-[#7c3aed]/25 transition-all"
                            >
                              <Zap size={11} />
                              Inject Template
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <textarea
                  value={form.prompt}
                  onChange={(e) => setForm({ ...form, prompt: e.target.value })}
                  placeholder="Define how your AI persona should behave, what it knows, and how it should respond to customers..."
                  rows={6}
                  className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#7c3aed]/50 focus:bg-white/8 transition-all resize-none leading-relaxed"
                />
                <p className="text-[11px] text-white/30">
                  {form.prompt.length} characters · You can combine multiple templates and customize further
                </p>
              </div>

              <button
                onClick={handleNext}
                disabled={!form.name.trim()}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white btn-primary disabled:opacity-40 disabled:cursor-not-allowed self-start"
              >
                Continue →
              </button>
            </>
          )}

          {/* Step 2: Knowledge */}
          {step === 'knowledge' && (
            <>
              <div>
                <h3 className="text-base font-semibold text-white mb-1">Knowledge Source</h3>
                <p className="text-sm text-white/45">Attach documents from your Knowledge Base to power this persona.</p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-white/40" />
                  <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Attach from Knowledge Base</label>
                </div>
                <div className="flex flex-col gap-2">
                  {kbDocuments.map((doc) => {
                    const isAttached = form.attachedKbIds.includes(doc.id);
                    return (
                      <button
                        key={doc.id}
                        onClick={() => toggleKbDoc(doc.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                          isAttached
                            ? 'border-[#7c3aed]/40 bg-[#7c3aed]/8'
                            : 'border-white/8 bg-white/[0.02] hover:border-white/15'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          doc.type === 'pdf' ? 'bg-red-500/10 text-red-400' :
                          doc.type === 'docx' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          <FileText size={13} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white truncate">{doc.name}</p>
                          <p className="text-[10px] text-white/35">{doc.size}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isAttached ? 'border-[#7c3aed] bg-[#7c3aed]' : 'border-white/20'
                        }`}>
                          {isAttached && (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <Link href="/knowledge-base" className="text-xs text-[#7c3aed] hover:text-[#a78bfa] transition-colors self-start">
                  Manage Knowledge Base →
                </Link>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all"
                >
                  ← Back
                </button>
                <button onClick={handleNext} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary">
                  Continue →
                </button>
              </div>
            </>
          )}

          {/* Step 3: Review */}
          {step === 'review' && (
            <>
              <div>
                <h3 className="text-base font-semibold text-white mb-1">Review & Save</h3>
                <p className="text-sm text-white/45">Confirm your updated persona settings.</p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Name', value: form.name || '(unnamed)' },
                  { label: 'Type', value: 'Shopping Assistant 🛍️' },
                  { label: 'Tone', value: toneOptions.find((t) => t.value === form.tone)?.label || '' },
                  {
                    label: 'KB Docs Attached',
                    value: form.attachedKbIds.length > 0 ? `${form.attachedKbIds.length} document(s)` : 'None',
                  },
                  {
                    label: 'System Prompt',
                    value: form.prompt.trim() ? `${form.prompt.slice(0, 60)}${form.prompt.length > 60 ? '...' : ''}` : 'Not set',
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-start justify-between py-2.5 border-b border-white/5 last:border-0 gap-4"
                  >
                    <span className="text-sm text-white/45 flex-shrink-0">{row.label}</span>
                    <span className="text-sm font-medium text-white text-right">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSave}
                  disabled={!form.name.trim()}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary disabled:opacity-40"
                >
                  Save Changes ✨
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PersonasPage() {
  const [personas, setPersonas] = useState<Persona[]>(initialPersonas);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null);

  const handleTogglePause = (id: string) => {
    setPersonas((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === 'active' ? 'paused' : 'active' } : p
      )
    );
    setOpenMenuId(null);
  };

  const handleDelete = (id: string) => {
    setPersonas((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirmId(null);
    setOpenMenuId(null);
  };

  const handleEditOpen = (persona: Persona) => {
    setEditingPersona(persona);
    setOpenMenuId(null);
  };

  const handleEditSave = (updated: Persona) => {
    setPersonas((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditingPersona(null);
  };

  const statusStyle = (status: Persona['status']) => {
    if (status === 'active') return 'bg-[#34d399]/15 text-[#34d399] border-[#34d399]/25';
    if (status === 'paused') return 'bg-amber-500/15 text-amber-400 border-amber-500/25';
    return 'bg-white/8 text-white/40 border-white/10';
  };

  return (
    <AppLayout>
      <Topbar
        title="Personas"
        subtitle="Manage your AI sales personas"
        action={
          <Link
            href="/create-persona"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white btn-primary flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create Persona
          </Link>
        }
      />

      <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
          <h2 className="text-sm font-semibold text-white">Your Personas</h2>
          <span className="text-xs text-white/35">{personas.length} persona{personas.length !== 1 ? 's' : ''}</span>
        </div>

        {personas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center text-3xl">🤖</div>
            <div className="text-center">
              <p className="text-sm font-medium text-white/60">No personas yet</p>
              <p className="text-xs text-white/30 mt-1">Create your first AI sales persona to get started</p>
            </div>
            <Link href="/create-persona" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary">
              Create Persona
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {personas.map((p) => (
              <div key={p.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/3 transition-colors relative">
                <div className="w-10 h-10 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center text-xl flex-shrink-0">
                  {p.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium text-white truncate">{p.name}</p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${statusStyle(p.status)}`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-white/40">{p.type} · {p.channel}</p>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-0.5">
                  <p className="text-sm font-semibold text-white">{p.conversations.toLocaleString()}</p>
                  <p className="text-[10px] text-white/35">conversations</p>
                </div>
                <div className="hidden md:flex flex-col items-end gap-0.5">
                  <p className="text-sm font-semibold text-[#34d399]">{p.conversion}</p>
                  <p className="text-[10px] text-white/35">conversion</p>
                </div>
                <div className="flex gap-2 flex-shrink-0 items-center">
                  <Link
                    href={`/chat/${p.id}`}
                    className="text-[11px] px-2.5 py-1.5 rounded-lg border border-white/10 text-white/55 hover:text-white hover:border-white/25 transition-all"
                  >
                    Test
                  </Link>
                  <Link
                    href="/deploy"
                    className="text-[11px] px-2.5 py-1.5 rounded-lg border border-[#7c3aed]/30 text-[#a78bfa] hover:bg-[#7c3aed]/10 transition-all"
                  >
                    Deploy
                  </Link>
                  {/* More menu */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === p.id ? null : p.id)}
                      className="w-7 h-7 rounded-lg border border-white/8 text-white/35 hover:text-white hover:border-white/20 flex items-center justify-center transition-all"
                    >
                      <MoreVertical size={13} />
                    </button>
                    {openMenuId === p.id && (
                      <div className="absolute right-0 top-9 z-20 w-44 rounded-xl border border-white/10 bg-[#1a1025] shadow-2xl overflow-hidden">
                        <button
                          onClick={() => handleEditOpen(p)}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <Pencil size={13} />
                          Edit Persona
                        </button>
                        <button
                          onClick={() => handleTogglePause(p.id)}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {p.status === 'active' ? <Pause size={13} /> : <Play size={13} />}
                          {p.status === 'active' ? 'Pause Persona' : 'Resume Persona'}
                        </button>
                        <div className="border-t border-white/8" />
                        <button
                          onClick={() => { setDeleteConfirmId(p.id); setOpenMenuId(null); }}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/8 transition-colors"
                        >
                          <Trash2 size={13} />
                          Delete Persona
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Click outside to close menu */}
      {openMenuId && (
        <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm mx-4 rounded-2xl border border-white/10 bg-[#1a1025] p-6 flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={18} className="text-red-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Delete Persona</h3>
                <p className="text-xs text-white/50 mt-1 leading-relaxed">
                  This will permanently delete the persona and all its conversation history. This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-white/60 hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Persona Wizard */}
      {editingPersona && (
        <EditPersonaWizard
          persona={editingPersona}
          onSave={handleEditSave}
          onClose={() => setEditingPersona(null)}
        />
      )}
    </AppLayout>
  );
}
