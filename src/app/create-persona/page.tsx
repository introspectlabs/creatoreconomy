'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';
import { ChevronDown, ChevronUp, Zap, FileText } from 'lucide-react';

type Step = 'details' | 'knowledge' | 'review';

interface PersonaForm {
  name: string;
  tone: 'friendly' | 'expert' | 'premium';
  prompt: string;
  attachedKbIds: string[];
}

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

// Mock KB documents for attachment
const kbDocuments = [
  { id: 'kb-1', name: 'Product_FAQ_v3.pdf', type: 'pdf', size: '2.4 MB' },
  { id: 'kb-2', name: 'Sales_Playbook_2024.docx', type: 'docx', size: '1.1 MB' },
  { id: 'kb-4', name: 'Competitor_Analysis_Q4.csv', type: 'csv', size: '890 KB' },
  { id: 'kb-6', name: 'Brand_Voice_Guidelines.pdf', type: 'pdf', size: '3.2 MB' },
];

export default function CreatePersonaPage() {
  const [step, setStep] = useState<Step>('details');
  const [form, setForm] = useState<PersonaForm>({
    name: '',
    tone: 'friendly',
    prompt: '',
    attachedKbIds: [],
  });
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);

  const steps: { key: Step; label: string; num: string }[] = [
    { key: 'details', label: 'Persona Details', num: '1' },
    { key: 'knowledge', label: 'Knowledge Source', num: '2' },
    { key: 'review', label: 'Review & Create', num: '3' },
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

  return (
    <AppLayout>
      <Topbar
        title="Create Persona"
        subtitle="Build your AI sales persona in 3 simple steps"
      />

      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-8 max-w-lg">
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

      <div className="max-w-2xl">
        {/* Step 1: Details */}
        {step === 'details' && (
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 flex flex-col gap-6">
            <div>
              <h2 className="text-base font-semibold text-white mb-1">Persona Details</h2>
              <p className="text-sm text-white/45">Give your AI persona a name, personality, and behaviour.</p>
            </div>

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

            {/* Type — Shopping Assistant only */}
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

            {/* Prompt / System Instructions */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-white/60 uppercase tracking-wider">System Prompt / Instructions</label>
                <span className="text-[10px] text-white/30">Optional</span>
              </div>

              {/* Quick Start Templates */}
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
          </div>
        )}

        {/* Step 2: Knowledge */}
        {step === 'knowledge' && (
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 flex flex-col gap-6">
            <div>
              <h2 className="text-base font-semibold text-white mb-1">Knowledge Source</h2>
              <p className="text-sm text-white/45">Attach documents from your Knowledge Base to power this persona.</p>
            </div>

            {/* Attach from Knowledge Base */}
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
                        doc.type === 'docx'? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'
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
          </div>
        )}

        {/* Step 3: Review */}
        {step === 'review' && (
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 flex flex-col gap-6">
            <div>
              <h2 className="text-base font-semibold text-white mb-1">Review & Create</h2>
              <p className="text-sm text-white/45">Confirm your persona settings before creating.</p>
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

            <div className="p-4 rounded-xl border border-[#14b8a6]/20 bg-[#14b8a6]/6">
              <p className="text-xs text-[#5eead4] leading-relaxed">
                🚀 After creating, you can test your persona in chat, then deploy it to your website or Shopify store.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all"
              >
                ← Back
              </button>
              <Link href="/dashboard" className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary">
                Create Persona ✨
              </Link>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
