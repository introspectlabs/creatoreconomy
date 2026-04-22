'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppLayout from '@/components/AppLayout';
import { User, Briefcase, Award, Shield, Globe, MapPin, Plus, X, Save, Eye, ChevronRight, CheckCircle, Upload } from 'lucide-react';


interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  url: string;
}

interface SocialLink {
  platform: string;
  url: string;
  verified: boolean;
}

interface ProfileData {
  displayName: string;
  username: string;
  tagline: string;
  bio: string;
  location: string;
  website: string;
  expertise: string[];
  certifications: Certification[];
  socialLinks: SocialLink[];
  trustSignals: {
    identityVerified: boolean;
    copyrightDeclaration: boolean;
  };
}

const INITIAL_DATA: ProfileData = {
  displayName: 'PersonaMatrix Labs',
  username: 'personamatrix',
  tagline: 'Building AI personas that actually understand your business',
  bio: `We're a team of AI engineers and product designers obsessed with making AI conversations feel genuinely human. Since 2024, we've trained over 50 specialized AI personas across sales, support, HR, finance, and education — each grounded in real domain knowledge, not generic prompts.\n\nOur personas are used by 200+ companies worldwide to handle millions of conversations monthly. Every persona we build goes through rigorous knowledge curation, voice calibration, and real-world testing before going live.`,
  location: 'San Francisco, CA',
  website: 'https://personamatrix.ai',
  expertise: [
    'Enterprise Sales Automation',
    'Customer Support AI',
    'HR & People Operations',
    'Financial Services',
    'E-commerce & Retail',
    'Voice AI & IVR',
  ],
  certifications: [
    { id: '1', name: 'OpenAI Partner', issuer: 'OpenAI', year: '2024', url: '' },
    { id: '2', name: 'ElevenLabs Certified', issuer: 'ElevenLabs', year: '2024', url: '' },
    { id: '3', name: 'AWS Advanced Partner', issuer: 'Amazon Web Services', year: '2025', url: '' },
    { id: '4', name: 'ISO 27001', issuer: 'ISO', year: '2025', url: '' },
  ],
  socialLinks: [
    { platform: 'linkedin', url: 'https://linkedin.com/company/personamatrix', verified: true },
    { platform: 'youtube', url: 'https://youtube.com/@personamatrix', verified: false },
    { platform: 'twitter', url: '', verified: false },
  ],
  trustSignals: {
    identityVerified: true,
    copyrightDeclaration: true,
  },
};

type SectionType = 'about' | 'expertise' | 'certifications' | 'social' | 'trust';

const sections: { id: SectionType; label: string; icon: React.ElementType; desc: string }[] = [
  { id: 'about', label: 'About Me', icon: User, desc: 'Display name, bio, location, website' },
  { id: 'expertise', label: 'Areas of Expertise', icon: Briefcase, desc: 'Skills and domain knowledge tags' },
  { id: 'certifications', label: 'Certifications', icon: Award, desc: 'Professional credentials and badges' },
  { id: 'social', label: 'Social Profiles', icon: Globe, desc: 'Linked and verified social accounts' },
  { id: 'trust', label: 'Trust & Verification', icon: Shield, desc: 'Identity and content authenticity' },
];

export default function CreatorProfileEditorPage() {
  const [activeSection, setActiveSection] = useState<SectionType>('about');
  const [data, setData] = useState<ProfileData>(INITIAL_DATA);
  const [newExpertise, setNewExpertise] = useState('');
  const [saved, setSaved] = useState(false);
  const [newCert, setNewCert] = useState({ name: '', issuer: '', year: '', url: '' });
  const [showAddCert, setShowAddCert] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const addExpertise = () => {
    const trimmed = newExpertise.trim();
    if (trimmed && !data.expertise.includes(trimmed)) {
      setData((prev) => ({ ...prev, expertise: [...prev.expertise, trimmed] }));
      setNewExpertise('');
    }
  };

  const removeExpertise = (tag: string) => {
    setData((prev) => ({ ...prev, expertise: prev.expertise.filter((e) => e !== tag) }));
  };

  const addCertification = () => {
    if (!newCert.name.trim()) return;
    const cert: Certification = { ...newCert, id: Date.now().toString() };
    setData((prev) => ({ ...prev, certifications: [...prev.certifications, cert] }));
    setNewCert({ name: '', issuer: '', year: '', url: '' });
    setShowAddCert(false);
  };

  const removeCertification = (id: string) => {
    setData((prev) => ({ ...prev, certifications: prev.certifications.filter((c) => c.id !== id) }));
  };

  const updateSocialLink = (platform: string, url: string) => {
    setData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((s) => s.platform === platform ? { ...s, url, verified: false } : s),
    }));
  };

  const platformIcon = (platform: string) => {
    if (platform === 'linkedin') return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
    if (platform === 'youtube') return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    );
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
      </svg>
    );
  };

  const platformLabel = (platform: string) => {
    return platform.charAt(0).toUpperCase() + platform.slice(1);
  };

  return (
    <AppLayout>
      <div className="min-h-screen" style={{ background: '#080a10' }}>
        {/* Header */}
        <div
          className="sticky top-0 z-20 px-6 py-4 flex items-center justify-between"
          style={{ background: 'rgba(8,10,16,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-base font-semibold text-white">Creator Profile Editor</h1>
              <div className="flex items-center gap-1.5 text-xs text-white/35 mt-0.5">
                <span>Public profile</span>
                <ChevronRight size={10} />
                <span className="text-purple-400">@{data.username}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/creator/${data.username}`}
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all"
            >
              <Eye size={13} />
              Preview
            </Link>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all"
              style={{ background: saved ? 'rgba(20,184,166,0.8)' : 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
            >
              {saved ? <CheckCircle size={13} /> : <Save size={13} />}
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="flex max-w-5xl mx-auto px-6 py-8 gap-6">
          {/* Left Nav */}
          <div className="w-56 flex-shrink-0">
            <div
              className="rounded-2xl overflow-hidden sticky top-24"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {sections.map((sec) => {
                const SectionIcon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSection(sec.id)}
                    className={`w-full flex items-start gap-3 px-4 py-3.5 text-left transition-all border-b border-white/5 last:border-0 ${
                      isActive ? 'bg-purple-500/10' : 'hover:bg-white/4'
                    }`}
                  >
                    <SectionIcon
                      size={15}
                      className={`mt-0.5 flex-shrink-0 ${isActive ? 'text-purple-400' : 'text-white/30'}`}
                    />
                    <div>
                      <p className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-white/50'}`}>{sec.label}</p>
                      <p className="text-[10px] text-white/25 mt-0.5 leading-tight">{sec.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {/* ── ABOUT ME ── */}
            {activeSection === 'about' && (
              <div className="space-y-5">
                <SectionHeader title="About Me" desc="This information appears on your public creator profile." />

                <FormCard>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Display Name" required>
                      <input
                        type="text"
                        value={data.displayName}
                        onChange={(e) => setData((p) => ({ ...p, displayName: e.target.value }))}
                        className="form-input"
                        placeholder="Your name or brand"
                      />
                    </FormField>
                    <FormField label="Username" hint="Cannot be changed after signup">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <span className="text-white/30">@</span>
                        <span className="text-white/50">{data.username}</span>
                      </div>
                    </FormField>
                  </div>

                  <FormField label="Tagline" hint="One-line description shown under your name">
                    <input
                      type="text"
                      value={data.tagline}
                      onChange={(e) => setData((p) => ({ ...p, tagline: e.target.value }))}
                      className="form-input"
                      placeholder="What you do in one sentence"
                      maxLength={120}
                    />
                    <p className="text-[10px] text-white/25 mt-1 text-right">{data.tagline.length}/120</p>
                  </FormField>

                  <FormField label="Bio" hint="Describe your background, experience, and what makes your personas unique">
                    <textarea
                      value={data.bio}
                      onChange={(e) => setData((p) => ({ ...p, bio: e.target.value }))}
                      rows={6}
                      className="form-input resize-none"
                      placeholder="Tell your audience who you are..."
                    />
                    <p className="text-[10px] text-white/25 mt-1 text-right">{data.bio.length} characters</p>
                  </FormField>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Location">
                      <div className="relative">
                        <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
                        <input
                          type="text"
                          value={data.location}
                          onChange={(e) => setData((p) => ({ ...p, location: e.target.value }))}
                          className="form-input pl-8"
                          placeholder="City, Country"
                        />
                      </div>
                    </FormField>
                    <FormField label="Website">
                      <div className="relative">
                        <Globe size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
                        <input
                          type="url"
                          value={data.website}
                          onChange={(e) => setData((p) => ({ ...p, website: e.target.value }))}
                          className="form-input pl-8"
                          placeholder="https://yoursite.com"
                        />
                      </div>
                    </FormField>
                  </div>
                </FormCard>

                {/* Avatar Upload */}
                <FormCard>
                  <h3 className="text-sm font-semibold text-white mb-4">Profile Avatar</h3>
                  <div className="flex items-center gap-5">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-black flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)' }}
                    >
                      {data.displayName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <button
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border border-white/12 text-white/60 hover:text-white hover:border-white/25 transition-all"
                      >
                        <Upload size={13} />
                        Upload Image
                      </button>
                      <p className="text-[10px] text-white/25 mt-1.5">PNG, JPG up to 2MB. Recommended: 400×400px</p>
                    </div>
                  </div>
                </FormCard>
              </div>
            )}

            {/* ── EXPERTISE ── */}
            {activeSection === 'expertise' && (
              <div className="space-y-5">
                <SectionHeader title="Areas of Expertise" desc="Add tags that describe your domain knowledge. These appear as pills on your public profile." />

                <FormCard>
                  <h3 className="text-sm font-semibold text-white mb-1">Current Tags</h3>
                  <p className="text-xs text-white/35 mb-4">{data.expertise.length} tags added</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {data.expertise.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{
                          background: 'rgba(124,58,237,0.12)',
                          border: '1px solid rgba(124,58,237,0.25)',
                          color: '#c4b5fd',
                        }}
                      >
                        {tag}
                        <button
                          onClick={() => removeExpertise(tag)}
                          className="ml-0.5 text-purple-400/50 hover:text-red-400 transition-colors"
                        >
                          <X size={11} />
                        </button>
                      </div>
                    ))}
                    {data.expertise.length === 0 && (
                      <p className="text-xs text-white/25 italic">No expertise tags yet. Add some below.</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newExpertise}
                      onChange={(e) => setNewExpertise(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addExpertise()}
                      className="form-input flex-1"
                      placeholder="e.g. Machine Learning, Sales Automation..."
                    />
                    <button
                      onClick={addExpertise}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
                    >
                      <Plus size={13} />
                      Add
                    </button>
                  </div>
                  <p className="text-[10px] text-white/25 mt-2">Press Enter or click Add. Max 20 tags recommended.</p>
                </FormCard>

                {/* Suggested tags */}
                <FormCard>
                  <h3 className="text-sm font-semibold text-white mb-3">Suggested Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Natural Language Processing', 'Conversational AI', 'Prompt Engineering',
                      'RAG Systems', 'LLM Fine-tuning', 'Customer Experience',
                      'B2B SaaS', 'Healthcare AI', 'Legal Tech', 'EdTech',
                    ].filter((t) => !data.expertise.includes(t)).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setData((p) => ({ ...p, expertise: [...p.expertise, tag] }))}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/8 text-white/40 hover:text-white/70 hover:border-white/20 transition-all"
                      >
                        <Plus size={10} />
                        {tag}
                      </button>
                    ))}
                  </div>
                </FormCard>
              </div>
            )}

            {/* ── CERTIFICATIONS ── */}
            {activeSection === 'certifications' && (
              <div className="space-y-5">
                <SectionHeader title="Certifications" desc="Add professional credentials, partnerships, and badges that build audience trust." />

                <FormCard>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white">Your Certifications</h3>
                      <p className="text-xs text-white/35 mt-0.5">{data.certifications.length} credentials added</p>
                    </div>
                    <button
                      onClick={() => setShowAddCert(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition-all"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
                    >
                      <Plus size={13} />
                      Add Certification
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.certifications.map((cert) => (
                      <div
                        key={cert.id}
                        className="flex items-center gap-4 p-4 rounded-xl"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)' }}
                        >
                          <Award size={16} className="text-amber-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white/85">{cert.name}</p>
                          <p className="text-xs text-white/35 mt-0.5">{cert.issuer} · {cert.year}</p>
                          {cert.url && (
                            <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-purple-400 hover:text-purple-300 mt-0.5 block truncate">
                              {cert.url}
                            </a>
                          )}
                        </div>
                        <button
                          onClick={() => removeCertification(cert.id)}
                          className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                    {data.certifications.length === 0 && (
                      <div className="text-center py-8">
                        <Award size={28} className="text-white/10 mx-auto mb-2" />
                        <p className="text-xs text-white/25">No certifications added yet</p>
                      </div>
                    )}
                  </div>
                </FormCard>

                {/* Add Certification Form */}
                {showAddCert && (
                  <FormCard>
                    <h3 className="text-sm font-semibold text-white mb-4">Add New Certification</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Certification Name" required>
                        <input
                          type="text"
                          value={newCert.name}
                          onChange={(e) => setNewCert((p) => ({ ...p, name: e.target.value }))}
                          className="form-input"
                          placeholder="e.g. AWS Solutions Architect"
                        />
                      </FormField>
                      <FormField label="Issuing Organization" required>
                        <input
                          type="text"
                          value={newCert.issuer}
                          onChange={(e) => setNewCert((p) => ({ ...p, issuer: e.target.value }))}
                          className="form-input"
                          placeholder="e.g. Amazon Web Services"
                        />
                      </FormField>
                      <FormField label="Year Obtained">
                        <input
                          type="text"
                          value={newCert.year}
                          onChange={(e) => setNewCert((p) => ({ ...p, year: e.target.value }))}
                          className="form-input"
                          placeholder="e.g. 2025"
                          maxLength={4}
                        />
                      </FormField>
                      <FormField label="Credential URL" hint="Optional — link to verify the credential">
                        <input
                          type="url"
                          value={newCert.url}
                          onChange={(e) => setNewCert((p) => ({ ...p, url: e.target.value }))}
                          className="form-input"
                          placeholder="https://..."
                        />
                      </FormField>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={addCertification}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
                      >
                        <Plus size={13} />
                        Add Certification
                      </button>
                      <button
                        onClick={() => { setShowAddCert(false); setNewCert({ name: '', issuer: '', year: '', url: '' }); }}
                        className="px-4 py-2 rounded-xl text-xs font-medium border border-white/10 text-white/40 hover:text-white/70 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </FormCard>
                )}
              </div>
            )}

            {/* ── SOCIAL PROFILES ── */}
            {activeSection === 'social' && (
              <div className="space-y-5">
                <SectionHeader title="Social Profiles" desc="Link your social accounts to verify your identity and build audience trust." />

                <FormCard>
                  <div className="space-y-4">
                    {data.socialLinks.map((social) => (
                      <div key={social.platform}>
                        <FormField
                          label={platformLabel(social.platform)}
                          hint={social.verified ? '✓ Verified' : 'Not yet verified'}
                        >
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                              {platformIcon(social.platform)}
                            </div>
                            <input
                              type="url"
                              value={social.url}
                              onChange={(e) => updateSocialLink(social.platform, e.target.value)}
                              className="form-input pl-8 pr-24"
                              placeholder={`https://${social.platform}.com/yourprofile`}
                            />
                            {social.url && (
                              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                {social.verified ? (
                                  <span className="flex items-center gap-1 text-[10px] text-teal-400 font-semibold">
                                    <CheckCircle size={11} /> Verified
                                  </span>
                                ) : (
                                  <button className="text-[10px] text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                                    Verify →
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </FormField>
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-5 p-4 rounded-xl flex items-start gap-3"
                    style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}
                  >
                    <Shield size={15} className="text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-white/70">Why link social profiles?</p>
                      <p className="text-[11px] text-white/40 mt-1 leading-relaxed">
                        Verified social links confirm your identity to audiences, reduce impersonation risk, and unlock the "Verified Creator" badge on your public profile.
                      </p>
                    </div>
                  </div>
                </FormCard>
              </div>
            )}

            {/* ── TRUST & VERIFICATION ── */}
            {activeSection === 'trust' && (
              <div className="space-y-5">
                <SectionHeader title="Trust & Verification" desc="Complete these steps to earn trust badges displayed on your public profile." />

                <FormCard>
                  <h3 className="text-sm font-semibold text-white mb-4">Verification Status</h3>
                  <div className="space-y-3">
                    {[
                      {
                        key: 'identityVerified',
                        label: 'Identity Verified',
                        desc: 'Government ID or business registration confirmed',
                        badge: 'Verified Creator badge',
                        done: data.trustSignals.identityVerified,
                        action: 'Submit ID',
                      },
                      {
                        key: 'copyrightDeclaration',
                        label: 'Copyright Declaration',
                        desc: 'You have declared ownership of all uploaded knowledge content',
                        badge: 'Authentic Knowledge badge',
                        done: data.trustSignals.copyrightDeclaration,
                        action: 'Declare',
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-start gap-4 p-4 rounded-xl"
                        style={{
                          background: item.done ? 'rgba(20,184,166,0.06)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${item.done ? 'rgba(20,184,166,0.2)' : 'rgba(255,255,255,0.07)'}`,
                        }}
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{
                            background: item.done ? 'rgba(20,184,166,0.15)' : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${item.done ? 'rgba(20,184,166,0.3)' : 'rgba(255,255,255,0.08)'}`,
                          }}
                        >
                          {item.done
                            ? <CheckCircle size={16} className="text-teal-400" />
                            : <Shield size={16} className="text-white/25" />
                          }
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-semibold text-white/80">{item.label}</p>
                            {item.done && (
                              <span
                                className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                                style={{ background: 'rgba(20,184,166,0.15)', color: '#14b8a6', border: '1px solid rgba(20,184,166,0.3)' }}
                              >
                                Completed
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-white/35 mt-0.5">{item.desc}</p>
                          <p className="text-[10px] text-purple-400 mt-1">Unlocks: {item.badge}</p>
                        </div>
                        {!item.done && (
                          <button
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white flex-shrink-0 transition-all"
                            style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
                          >
                            {item.action}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </FormCard>

                {/* Trust score */}
                <FormCard>
                  <h3 className="text-sm font-semibold text-white mb-4">Profile Completeness</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'About Me filled', done: !!data.bio && !!data.displayName },
                      { label: 'Tagline added', done: !!data.tagline },
                      { label: 'Location set', done: !!data.location },
                      { label: 'Website linked', done: !!data.website },
                      { label: 'Expertise tags added', done: data.expertise.length > 0 },
                      { label: 'Certifications added', done: data.certifications.length > 0 },
                      { label: 'Social profile linked', done: data.socialLinks.some((s) => !!s.url) },
                      { label: 'Identity verified', done: data.trustSignals.identityVerified },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background: item.done ? 'rgba(20,184,166,0.15)' : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${item.done ? 'rgba(20,184,166,0.4)' : 'rgba(255,255,255,0.1)'}`,
                          }}
                        >
                          {item.done && (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="3">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-xs ${item.done ? 'text-white/60' : 'text-white/25'}`}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/6">
                    {(() => {
                      const items = [
                        !!data.bio && !!data.displayName, !!data.tagline, !!data.location, !!data.website,
                        data.expertise.length > 0, data.certifications.length > 0,
                        data.socialLinks.some((s) => !!s.url), data.trustSignals.identityVerified,
                      ];
                      const pct = Math.round((items.filter(Boolean).length / items.length) * 100);
                      return (
                        <>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-white/40">Profile strength</span>
                            <span className="text-xs font-semibold text-white">{pct}%</span>
                          </div>
                          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${pct}%`,
                                background: pct >= 80 ? 'linear-gradient(90deg, #14b8a6, #3b82f6)' : 'linear-gradient(90deg, #7c3aed, #3b82f6)',
                              }}
                            />
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </FormCard>
              </div>
            )}

          </div>
        </div>
      </div>

      <style jsx>{`
        .form-input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border-radius: 0.75rem;
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.75);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          outline: none;
          transition: border-color 0.15s;
        }
        .form-input:focus {
          border-color: rgba(124,58,237,0.5);
          background: rgba(124,58,237,0.05);
        }
        .form-input::placeholder {
          color: rgba(255,255,255,0.2);
        }
      `}</style>
    </AppLayout>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-1">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="text-sm text-white/40 mt-0.5">{desc}</p>
    </div>
  );
}

function FormCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-6 space-y-4"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {children}
    </div>
  );
}

function FormField({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-semibold text-white/60">
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
        {hint && <span className="text-[10px] text-white/25">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
