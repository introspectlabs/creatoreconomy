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
    prompt: `You are a knowledgeable and approachable creator persona. Always greet your audience warmly, use a conversational tone, and be empathetic to their questions. Focus on delivering genuine value from your expertise — whether in finance, coaching, or course content. Use clear, jargon-free language and keep responses concise and actionable.`,
  },
  {
    id: 'capabilities',
    label: 'Capabilities',
    icon: '⚡',
    prompt: `You can help your audience with: (1) Answering questions about your course content and curriculum, (2) Providing guidance based on your coaching frameworks, (3) Sharing finance tips, strategies, and insights from your content library, (4) Recommending the right course module or resource for their situation, (5) Explaining concepts from your videos, newsletters, or PDFs, (6) Directing them to book a 1:1 session or enroll in a course.`,
  },
  {
    id: 'call-flow',
    label: 'Conversation Flow',
    icon: '🔄',
    prompt: `Follow this conversation flow: 1) Greet the audience member and ask how you can help. 2) Understand their goal or challenge. 3) Ask 1-2 clarifying questions if needed. 4) Share relevant insights from your content or frameworks. 5) Recommend a specific course, module, or resource. 6) Invite them to take the next step — enroll, book a call, or join your community.`,
  },
  {
    id: 'objectives',
    label: 'Objectives',
    icon: '🎯',
    prompt: `Primary objective: Help your audience get real value from your expertise and content. Secondary objectives: (1) Guide them toward enrolling in your course or coaching program, (2) Build trust by delivering accurate, helpful information grounded in your content, (3) Increase engagement with your community and content library, (4) Collect audience questions to inform future content creation. Always prioritize genuine helpfulness over hard selling.`,
  },
];

const kbDocuments = [
  { id: 'kb-1', name: 'Course_Curriculum_v3.pdf', type: 'pdf', size: '2.4 MB' },
  { id: 'kb-2', name: 'Coaching_Framework_2024.docx', type: 'docx', size: '1.1 MB' },
  { id: 'kb-4', name: 'Finance_Newsletter_Archive.csv', type: 'csv', size: '890 KB' },
  { id: 'kb-6', name: 'Creator_Voice_Guidelines.pdf', type: 'pdf', size: '3.2 MB' },
];

const initialPersonas: Persona[] = [
  {
    id: 'finance-coach',
    name: 'FinanceCoach — Priya',
    type: 'Finance Creator',
    status: 'active',
    conversations: 842,
    conversion: '9.2%',
    channel: 'Web + WhatsApp',
    emoji: '📈',
    tone: 'expert',
    prompt: '',
    attachedKbIds: ['kb-1'],
  },
  {
    id: 'course-guide',
    name: 'CourseGuide — Jordan',
    type: 'Course Builder',
    status: 'draft',
    conversations: 0,
    conversion: '—',
    channel: 'Not deployed',
    emoji: '🎓',
    tone: 'friendly',
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
                  placeholder="e.g. FinanceCoach — Priya, CourseGuide — Jordan..."
                  className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#7c3aed]/50 focus:bg-white/8 transition-all"
                />
              </div>

              {/* Type */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Persona Type</label>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-[#7c3aed]/40 bg-[#7c3aed]/8">
                  <span className="text-2xl">🎓</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">Creator Persona</p>
                    <p className="text-xs text-white/45 mt-0.5">Engages your audience with your expertise — finance, coaching, or course content</p>
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
                  placeholder="Define how your AI persona should behave, what expertise it draws from, and how it should engage your audience..."
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
                <p className="text-sm text-white/45">Attach your content from the Knowledge Base to power this persona.</p>
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
                  { label: 'Type', value: 'Creator Persona 🎓' },
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
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleToggleStatus = (id: string) => {
    setPersonas((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === 'active' ? 'paused' : 'active' }
          : p
      )
    );
    setOpenMenuId(null);
  };

  const handleDelete = (id: string) => {
    setPersonas((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirmId(null);
    setOpenMenuId(null);
  };

  const handleSaveEdit = (updated: Persona) => {
    setPersonas((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditingPersona(null);
  };

  const statusColors: Record<string, string> = {
    active: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    paused: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    draft: 'bg-white/8 text-white/40 border-white/10',
  };

  return (
    <AppLayout>
      <Topbar
        title="Creator Personas"
        subtitle="Build and manage AI personas that engage your audience with your expertise"
        action={
          <Link
            href="/create-persona"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white btn-primary"
          >
            <span className="text-base leading-none">+</span>
            New Persona
          </Link>
        }
      />

      {personas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
            <span className="text-3xl">🎓</span>
          </div>
          <h3 className="text-base font-semibold text-white mb-2">No personas yet</h3>
          <p className="text-sm text-white/40 mb-6 max-w-xs">
            Create your first creator persona to start engaging your audience with your expertise.
          </p>
          <Link href="/create-persona" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary">
            Create Your First Persona
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {personas.map((persona) => (
            <div
              key={persona.id}
              className="relative rounded-2xl border border-white/8 bg-white/[0.03] p-5 hover:border-white/12 transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Emoji avatar */}
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center text-2xl flex-shrink-0">
                  {persona.emoji}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-sm font-semibold text-white">{persona.name}</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusColors[persona.status]}`}>
                      {persona.status}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 mb-3">{persona.type} · {persona.channel}</p>

                  <div className="flex items-center gap-5 flex-wrap">
                    <div>
                      <p className="text-xs font-semibold text-white tabular-nums">{persona.conversations.toLocaleString()}</p>
                      <p className="text-[10px] text-white/30">conversations</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">{persona.conversion}</p>
                      <p className="text-[10px] text-white/30">engagement rate</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setEditingPersona(persona)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/25 text-xs transition-all"
                  >
                    <Pencil size={12} />
                    Edit
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === persona.id ? null : persona.id)}
                      className="w-8 h-8 rounded-lg border border-white/8 text-white/35 hover:text-white hover:border-white/20 flex items-center justify-center transition-all"
                    >
                      <MoreVertical size={14} />
                    </button>
                    {openMenuId === persona.id && (
                      <div
                        className="absolute right-0 top-10 z-20 w-44 rounded-xl border border-white/10 overflow-hidden shadow-2xl"
                        style={{ background: 'rgba(18,20,28,0.98)' }}
                      >
                        <button
                          onClick={() => handleToggleStatus(persona.id)}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-all"
                        >
                          {persona.status === 'active' ? <Pause size={13} /> : <Play size={13} />}
                          {persona.status === 'active' ? 'Pause Persona' : 'Activate Persona'}
                        </button>
                        <button
                          onClick={() => { setDeleteConfirmId(persona.id); setOpenMenuId(null); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all"
                        >
                          <Trash2 size={13} />
                          Delete Persona
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Wizard Modal */}
      {editingPersona && (
        <EditPersonaWizard
          persona={editingPersona}
          onSave={handleSaveEdit}
          onClose={() => setEditingPersona(null)}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0f0d1a] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <AlertTriangle size={18} className="text-red-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Delete Persona</h3>
                <p className="text-xs text-white/40">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-white/60 mb-5">
              Are you sure you want to delete{' '}
              <span className="text-white font-medium">
                {personas.find((p) => p.id === deleteConfirmId)?.name}
              </span>
              ? All conversation history will be lost.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all"
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
    </AppLayout>
  );
}
