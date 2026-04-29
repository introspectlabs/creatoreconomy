'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLayout from '@/components/AppLayout';
import Topbar from '@/components/Topbar';

type Step = 'details' | 'knowledge' | 'review';

interface PersonaForm {
  name: string;
  type: 'shopping-assistant' | 'founder-persona';
  tone: 'friendly' | 'expert' | 'premium';
  knowledgeSource: 'shopify' | 'upload' | 'both';
  shopifyConnected: boolean;
  uploadedFiles: string[];
}

const toneOptions = [
  { value: 'friendly', label: 'Friendly', desc: 'Warm, approachable, conversational', emoji: '😊' },
  { value: 'expert', label: 'Expert', desc: 'Knowledgeable, precise, authoritative', emoji: '🎓' },
  { value: 'premium', label: 'Premium', desc: 'Sophisticated, exclusive, refined', emoji: '✨' },
] as const;

const typeOptions = [
  {
    value: 'shopping-assistant',
    label: 'Shopping Assistant',
    desc: 'Helps visitors find products, compare options, and complete purchases',
    emoji: '🛍️',
    recommended: true,
  },
  {
    value: 'founder-persona',
    label: 'Founder Persona',
    desc: 'Represents the brand founder — shares story, values, and vision',
    emoji: '👤',
    recommended: false,
  },
] as const;

export default function CreatePersonaPage() {
  const [step, setStep] = useState<Step>('details');
  const [form, setForm] = useState<PersonaForm>({
    name: '',
    type: 'shopping-assistant',
    tone: 'friendly',
    knowledgeSource: 'shopify',
    shopifyConnected: false,
    uploadedFiles: [],
  });

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
              <p className="text-sm text-white/45">Give your AI persona a name and personality.</p>
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

            {/* Type */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-white/60 uppercase tracking-wider">Persona Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {typeOptions.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setForm({ ...form, type: t.value })}
                    className={`relative flex flex-col gap-2 p-4 rounded-xl border text-left transition-all ${
                      form.type === t.value
                        ? 'border-[#7c3aed]/50 bg-[#7c3aed]/10'
                        : 'border-white/8 bg-white/3 hover:border-white/15'
                    }`}
                  >
                    {t.recommended && (
                      <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#14b8a6]/20 text-[#14b8a6] border border-[#14b8a6]/30">
                        Default
                      </span>
                    )}
                    <span className="text-2xl">{t.emoji}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.label}</p>
                      <p className="text-xs text-white/45 mt-0.5 leading-relaxed">{t.desc}</p>
                    </div>
                  </button>
                ))}
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
              <p className="text-sm text-white/45">Tell your AI what to know about your products and brand.</p>
            </div>

            {/* Shopify sync */}
            <div
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                form.knowledgeSource === 'shopify' || form.knowledgeSource === 'both'
                  ? 'border-[#14b8a6]/40 bg-[#14b8a6]/8' :'border-white/8 bg-white/3 hover:border-white/15'
              }`}
              onClick={() => setForm({ ...form, knowledgeSource: form.knowledgeSource === 'upload' ? 'both' : 'shopify' })}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🛍️</span>
                  <div>
                    <p className="text-sm font-semibold text-white">Auto-sync Shopify</p>
                    <p className="text-xs text-white/45">Recommended · Syncs your full product catalog automatically</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  form.knowledgeSource === 'shopify' || form.knowledgeSource === 'both'
                    ? 'border-[#14b8a6] bg-[#14b8a6]' :'border-white/20'
                }`}>
                  {(form.knowledgeSource === 'shopify' || form.knowledgeSource === 'both') && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>
              {(form.knowledgeSource === 'shopify' || form.knowledgeSource === 'both') && (
                <button
                  onClick={(e) => { e.stopPropagation(); setForm({ ...form, shopifyConnected: !form.shopifyConnected }); }}
                  className={`mt-2 text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    form.shopifyConnected
                      ? 'border-[#34d399]/40 text-[#34d399] bg-[#34d399]/10'
                      : 'border-[#14b8a6]/40 text-[#14b8a6] hover:bg-[#14b8a6]/10'
                  }`}
                >
                  {form.shopifyConnected ? '✓ Shopify Connected' : 'Connect Shopify Store →'}
                </button>
              )}
            </div>

            {/* Upload */}
            <div
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                form.knowledgeSource === 'upload' || form.knowledgeSource === 'both'
                  ? 'border-[#7c3aed]/40 bg-[#7c3aed]/8' :'border-white/8 bg-white/3 hover:border-white/15'
              }`}
              onClick={() => setForm({ ...form, knowledgeSource: form.knowledgeSource === 'shopify' ? 'both' : 'upload' })}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📄</span>
                  <div>
                    <p className="text-sm font-semibold text-white">Upload PDFs / Docs</p>
                    <p className="text-xs text-white/45">Product guides, FAQs, brand docs, videos (optional)</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  form.knowledgeSource === 'upload' || form.knowledgeSource === 'both'
                    ? 'border-[#7c3aed] bg-[#7c3aed]' :'border-white/20'
                }`}>
                  {(form.knowledgeSource === 'upload' || form.knowledgeSource === 'both') && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={handleBack} className="px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all">
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
                { label: 'Type', value: typeOptions.find((t) => t.value === form.type)?.label || '' },
                { label: 'Tone', value: toneOptions.find((t) => t.value === form.tone)?.label || '' },
                {
                  label: 'Knowledge',
                  value:
                    form.knowledgeSource === 'shopify'
                      ? 'Shopify sync'
                      : form.knowledgeSource === 'upload' ?'File uploads' :'Shopify sync + File uploads',
                },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                  <span className="text-sm text-white/45">{row.label}</span>
                  <span className="text-sm font-medium text-white">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl border border-[#14b8a6]/20 bg-[#14b8a6]/6">
              <p className="text-xs text-[#5eead4] leading-relaxed">
                🚀 After creating, you can test your persona in chat, then deploy it to your website or Shopify store.
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={handleBack} className="px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all">
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
