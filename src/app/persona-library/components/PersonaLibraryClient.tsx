'use client';

import React, { useState } from 'react';
import { Search, Grid3X3, List, Plus, Brain } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PersonaCard from './PersonaCard';
import PersonaDetailDrawer from './PersonaDetailDrawer';
import { personas as initialPersonas, Persona } from './personaData';
import CreatePersonaWizard from './CreatePersonaWizard';
import PersonaTestPanel from './PersonaTestPanel';

export default function PersonaLibraryClient() {
  const router = useRouter();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [personaList, setPersonaList] = useState<Persona[]>(initialPersonas);
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Persona | null>(null);
  const [testPersona, setTestPersona] = useState<Persona | null>(null);

  const filtered = personaList.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleTopologyClick = (e: React.MouseEvent, personaId: string) => {
    e.stopPropagation();
    router.push(`/persona-topology/${personaId}`);
  };

  const handleEdit = (e: React.MouseEvent, persona: Persona) => {
    e.stopPropagation();
    setEditingPersona(persona);
    setShowWizard(true);
  };

  const handleDelete = (e: React.MouseEvent, persona: Persona) => {
    e.stopPropagation();
    setDeleteConfirm(persona);
  };

  const handlePause = (e: React.MouseEvent, persona: Persona) => {
    e.stopPropagation();
    setPersonaList((prev) =>
      prev.map((p) =>
        p.id === persona.id
          ? { ...p, status: p.status === 'paused' ? 'active' : 'paused' }
          : p
      )
    );
  };

  const handleTogglePublic = (e: React.MouseEvent, persona: Persona) => {
    e.stopPropagation();
    setPersonaList((prev) =>
      prev.map((p) =>
        p.id === persona.id ? { ...p, isPublic: !p.isPublic } : p
      )
    );
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      setPersonaList((prev) => prev.filter((p) => p.id !== deleteConfirm.id));
      if (selectedPersona?.id === deleteConfirm.id) setSelectedPersona(null);
      setDeleteConfirm(null);
    }
  };

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1 sm:max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search personas..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-sm text-white placeholder-white/25 outline-none focus:border-purple-500/50 focus:bg-white/7 transition-all"
            />
          </div>
          <button
            onClick={() => setShowWizard(true)}
            className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-600 text-white self-start sm:self-auto sm:ml-auto">
            <Plus size={15} /> New Persona
          </button>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-white/5 border border-white/8 rounded-xl p-1 overflow-x-auto max-w-full">
            {(['all', 'active', 'training', 'draft', 'paused'] as const).map((s) => (
              <button
                key={`filter-${s}`}
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-500 transition-all capitalize whitespace-nowrap ${
                  statusFilter === s
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :'text-white/40 hover:text-white/70'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 bg-white/5 border border-white/8 rounded-xl p-1">
            <button
              onClick={() => setView('grid')}
              aria-label="Grid view"
              className={`p-1.5 rounded-lg transition-all ${view === 'grid' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
            >
              <Grid3X3 size={14} />
            </button>
            <button
              onClick={() => setView('list')}
              aria-label="List view"
              className={`p-1.5 rounded-lg transition-all ${view === 'list' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
            >
              <List size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="glass rounded-2xl flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4">
            <Brain size={24} className="text-purple-400" />
          </div>
          <h3 className="text-base font-600 text-white mb-2">No personas found</h3>
          <p className="text-sm text-white/40 max-w-xs mb-5">
            No personas match your current filters. Try adjusting the search or status filter.
          </p>
          <button
            onClick={() => setShowWizard(true)}
            className="btn-primary px-4 py-2 rounded-xl text-sm font-600 text-white flex items-center gap-2">
            <Plus size={14} /> Create your first persona
          </button>
        </div>
      ) : (
        <div className={view === 'grid' ?'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4' :'flex flex-col gap-3'
        }>
          {filtered.map((p) => (
            <div key={p.id} className="relative group/wrap">
              <PersonaCard
                persona={p}
                view={view}
                onClick={() => setSelectedPersona(p)}
                onTopologyClick={(e) => handleTopologyClick(e, p.id)}
                onEdit={(e) => handleEdit(e, p)}
                onDelete={(e) => handleDelete(e, p)}
                onTest={(e) => { e.stopPropagation(); setTestPersona(p); }}
                onPause={(e) => handlePause(e, p)}
                onTogglePublic={(e) => handleTogglePublic(e, p)}
              />
            </div>
          ))}
        </div>
      )}

      {selectedPersona && (
        <PersonaDetailDrawer
          persona={selectedPersona}
          onClose={() => setSelectedPersona(null)}
        />
      )}

      {showWizard && (
        <CreatePersonaWizard
          onClose={() => { setShowWizard(false); setEditingPersona(null); }}
        />
      )}

      {testPersona && (
        <PersonaTestPanel
          persona={testPersona}
          onClose={() => setTestPersona(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div
            className="relative w-full max-w-sm rounded-2xl p-6 shadow-2xl"
            style={{ background: 'rgba(12,14,22,0.99)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4 mx-auto">
              <Brain size={20} className="text-red-400" />
            </div>
            <h3 className="text-base font-700 text-white text-center mb-2">Delete Persona?</h3>
            <p className="text-sm text-white/50 text-center mb-6">
              Are you sure you want to delete <span className="text-white font-600">{deleteConfirm.name}</span>? This action cannot be undone.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-sm text-red-400 hover:bg-red-500/30 transition-all font-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}