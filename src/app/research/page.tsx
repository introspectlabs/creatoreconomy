'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

function AnimatedGradientOrb({ className }: { className: string }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 animate-pulse-slow pointer-events-none ${className}`}
    />
  );
}

// ── DIAGRAM COMPONENTS ──

function DiagramNode({ x, y, width, label, sublabel, color, shape = 'rect' }: {
  x: number; y: number; width: number; label: string; sublabel?: string; color: string; shape?: 'rect' | 'diamond' | 'rounded' | 'cylinder';
}) {
  const height = sublabel ? 48 : 36;
  const rx = shape === 'rounded' ? 18 : 4;

  if (shape === 'diamond') {
    const hw = width / 2;
    const hh = 28;
    return (
      <g>
        <polygon
          points={`${x},${y - hh} ${x + hw},${y} ${x},${y + hh} ${x - hw},${y}`}
          fill={`${color}18`}
          stroke={color}
          strokeWidth="1.5"
        />
        <text x={x} y={y + 4} textAnchor="middle" fill={color} fontSize="10" fontWeight="600">{label}</text>
      </g>
    );
  }

  if (shape === 'cylinder') {
    const rx2 = width / 2;
    const ry = 8;
    return (
      <g>
        <rect x={x - rx2} y={y - height / 2} width={width} height={height} rx={4} fill={`${color}18`} stroke={color} strokeWidth="1.5" />
        <ellipse cx={x} cy={y - height / 2} rx={rx2} ry={ry} fill={`${color}25`} stroke={color} strokeWidth="1.5" />
        <text x={x} y={y + (sublabel ? -6 : 4)} textAnchor="middle" fill={color} fontSize="10" fontWeight="600">{label}</text>
        {sublabel && <text x={x} y={y + 10} textAnchor="middle" fill={`${color}99`} fontSize="9">{sublabel}</text>}
      </g>
    );
  }

  return (
    <g>
      <rect x={x - width / 2} y={y - height / 2} width={width} height={height} rx={rx} fill={`${color}18`} stroke={color} strokeWidth="1.5" />
      <text x={x} y={y + (sublabel ? -6 : 4)} textAnchor="middle" fill={color} fontSize="10" fontWeight="600">{label}</text>
      {sublabel && <text x={x} y={y + 10} textAnchor="middle" fill={`${color}99`} fontSize="9">{sublabel}</text>}
    </g>
  );
}

function DiagramCard({ title, figureNum, description, color, children, height = 340 }: {
  title: string; figureNum: string; description: string; color: string; children: React.ReactNode; height?: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0d0f18]">
      <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between" style={{ background: `linear-gradient(90deg, ${color}12, transparent)` }}>
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full border" style={{ color, borderColor: `${color}40`, background: `${color}15` }}>
              {figureNum}
            </span>
            <h3 className="text-sm font-bold text-white">{title}</h3>
          </div>
          <p className="text-[11px] text-white/35 leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="p-4 w-full">
        <svg
          width="100%"
          viewBox={`0 0 560 ${height}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ display: 'block', maxWidth: '100%' }}
        >
          {children}
        </svg>
      </div>
    </div>
  );
}

// Fig. A — Video-Native RAG Architecture
function FigureVRAG() {
  const c = { blue: '#3b82f6', teal: '#14b8a6', green: '#34d399', amber: '#f59e0b', purple: '#7c3aed' };
  return (
    <DiagramCard
      figureNum="Fig. A"
      title="Video-Native RAG Architecture"
      description="Frame-level extraction across visual, audio, and semantic signals — linked temporally into a knowledge graph and surfaced via the persona layer."
      color={c.blue}
      height={320}
    >
      <defs>
        <marker id="arrA-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={c.blue} /></marker>
        <marker id="arrA-teal" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={c.teal} /></marker>
        <marker id="arrA-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={c.green} /></marker>
        <marker id="arrA-amber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={c.amber} /></marker>
        <marker id="arrA-purple" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={c.purple} /></marker>
      </defs>

      {/* Video Input */}
      <DiagramNode x={280} y={36} width={140} label="Video Input" color={c.blue} shape="rounded" />
      <line x1={280} y1={56} x2={280} y2={80} stroke={c.blue} strokeWidth="1.5" markerEnd="url(#arrA-blue)" />

      {/* Fork to extraction */}
      <line x1={280} y1={80} x2={120} y2={80} stroke={c.blue} strokeWidth="1.2" />
      <line x1={280} y1={80} x2={440} y2={80} stroke={c.blue} strokeWidth="1.2" />
      <line x1={120} y1={80} x2={120} y2={104} stroke={c.teal} strokeWidth="1.5" markerEnd="url(#arrA-teal)" />
      <line x1={280} y1={80} x2={280} y2={104} stroke={c.amber} strokeWidth="1.5" markerEnd="url(#arrA-amber)" />
      <line x1={440} y1={80} x2={440} y2={104} stroke={c.green} strokeWidth="1.5" markerEnd="url(#arrA-green)" />

      <DiagramNode x={120} y={128} width={130} label="Frame Extraction" sublabel="Visual signals" color={c.teal} />
      <DiagramNode x={280} y={128} width={130} label="Audio Extraction" sublabel="Speech + sound" color={c.amber} />
      <DiagramNode x={440} y={128} width={130} label="Semantic Signals" sublabel="Entities + topics" color={c.green} />

      {/* Converge to semantic understanding */}
      <line x1={120} y1={152} x2={120} y2={190} stroke={c.teal} strokeWidth="1.5" markerEnd="url(#arrA-teal)" />
      <line x1={280} y1={152} x2={280} y2={190} stroke={c.amber} strokeWidth="1.5" markerEnd="url(#arrA-amber)" />
      <line x1={440} y1={152} x2={440} y2={190} stroke={c.green} strokeWidth="1.5" markerEnd="url(#arrA-green)" />

      <rect x={50} y={190} width={460} height={38} rx={6} fill={`${c.blue}18`} stroke={c.blue} strokeWidth="1.5" />
      <text x={280} y={208} textAnchor="middle" fill={c.blue} fontSize="11" fontWeight="700">Temporal Semantic Understanding</text>
      <text x={280} y={222} textAnchor="middle" fill={`${c.blue}80`} fontSize="9">Scene linking · Timeline indexing · Cross-modal alignment</text>

      <line x1={280} y1={228} x2={280} y2={252} stroke={c.purple} strokeWidth="1.5" markerEnd="url(#arrA-purple)" />

      <DiagramNode x={180} y={272} width={140} label="Knowledge Graph" color={c.purple} />
      <line x1={260} y1={272} x2={340} y2={272} stroke={c.purple} strokeWidth="1.5" markerEnd="url(#arrA-purple)" />
      <DiagramNode x={420} y={272} width={140} label="Persona Layer" sublabel="Conversation" color={c.purple} />
    </DiagramCard>
  );
}

// Fig. B — Persona Identity Graph (retained from Fig. 3)
function FigurePersonaGraph() {
  const c = { purple: '#7c3aed', blue: '#3b82f6', amber: '#f59e0b', red: '#ef4444', teal: '#14b8a6' };
  return (
    <DiagramCard
      figureNum="Fig. B"
      title="Persona Identity Graph"
      description="Persistent identity modeling across sessions and content sources — relationship-aware entity mapping with temporal continuity."
      color={c.purple}
      height={360}
    >
      <defs>
        <marker id="arrB-purple" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={c.purple} /></marker>
        <marker id="arrB-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={c.blue} /></marker>
        <marker id="arrB-amber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={c.amber} /></marker>
        <marker id="arrB-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={c.red} /></marker>
        <marker id="arrB-teal" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={c.teal} /></marker>
      </defs>

      {/* Root */}
      <rect x={155} y={20} width={250} height={36} rx={18} fill={`${c.purple}20`} stroke={c.purple} strokeWidth="2" />
      <text x={280} y={43} textAnchor="middle" fill={c.purple} fontSize="11" fontWeight="700">Persona Identity Graph</text>

      {/* Branches */}
      <line x1={280} y1={56} x2={280} y2={84} stroke={c.purple} strokeWidth="1.5" />
      <line x1={280} y1={84} x2={100} y2={84} stroke={c.purple} strokeWidth="1.5" />
      <line x1={280} y1={84} x2={460} y2={84} stroke={c.purple} strokeWidth="1.5" />
      <line x1={100} y1={84} x2={100} y2={112} stroke={c.blue} strokeWidth="1.5" markerEnd="url(#arrB-blue)" />
      <line x1={220} y1={84} x2={220} y2={112} stroke={c.amber} strokeWidth="1.5" markerEnd="url(#arrB-amber)" />
      <line x1={340} y1={84} x2={340} y2={112} stroke={c.red} strokeWidth="1.5" markerEnd="url(#arrB-red)" />
      <line x1={460} y1={84} x2={460} y2={112} stroke={c.teal} strokeWidth="1.5" markerEnd="url(#arrB-teal)" />

      <DiagramNode x={100} y={140} width={130} label="Entity Nodes" sublabel="Concepts & attributes" color={c.blue} />
      <DiagramNode x={240} y={140} width={130} label="Memory Edges" sublabel="Temporal links" color={c.amber} />
      <DiagramNode x={370} y={140} width={130} label="Relationship Map" sublabel="Cross-context links" color={c.red} />
      <DiagramNode x={490} y={140} width={110} label="Evidence Refs" sublabel="Video + doc sources" color={c.teal} />

      {/* Temporal continuity boundary */}
      <rect x={20} y={195} width={520} height={50} rx={8} fill="none" stroke="#ffffff15" strokeWidth="1.5" strokeDasharray="6,4" />
      <text x={280} y={215} textAnchor="middle" fill="#ffffff30" fontSize="9" fontWeight="600">TEMPORAL CONTINUITY — CROSS-SESSION PERSISTENCE</text>
      <text x={280} y={233} textAnchor="middle" fill="#ffffff20" fontSize="9">Identity preserved across content sources · Prevents context drift between sessions</text>

      <line x1={280} y1={245} x2={280} y2={273} stroke={c.purple} strokeWidth="1.5" markerEnd="url(#arrB-purple)" />
      <rect x={110} y={273} width={340} height={36} rx={6} fill={`${c.purple}15`} stroke={c.purple} strokeWidth="1.5" />
      <text x={280} y={296} textAnchor="middle" fill={c.purple} fontSize="11" fontWeight="700">Persona-Aware Retrieval Engine</text>
    </DiagramCard>
  );
}

// Fig. C — Memory-Isolated Retrieval System (retained from Fig. 4)
function FigureIsolatedRetrieval() {
  const c = { green: '#34d399', blue: '#3b82f6', teal: '#14b8a6', amber: '#f59e0b', purple: '#7c3aed' };
  return (
    <DiagramCard
      figureNum="Fig. C"
      title="Memory-Isolated Retrieval System"
      description="Isolated retrieval pipelines per user with controlled context flow — reducing token expansion while preserving multi-tenant knowledge separation."
      color={c.green}
      height={360}
    >
      <defs>
        <marker id="arrC-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={c.green} /></marker>
        <marker id="arrC-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={c.blue} /></marker>
        <marker id="arrC-teal" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={c.teal} /></marker>
        <marker id="arrC-amber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={c.amber} /></marker>
        <marker id="arrC-purple" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={c.purple} /></marker>
      </defs>

      {/* Shared knowledge base */}
      <rect x={155} y={20} width={250} height={36} rx={6} fill={`${c.blue}18`} stroke={c.blue} strokeWidth="1.5" />
      <text x={280} y={43} textAnchor="middle" fill={c.blue} fontSize="11" fontWeight="700">Shared Knowledge Base</text>

      <line x1={280} y1={56} x2={280} y2={84} stroke={c.blue} strokeWidth="1.5" markerEnd="url(#arrC-blue)" />

      {/* Retrieval Engine */}
      <rect x={130} y={84} width={300} height={36} rx={6} fill={`${c.green}18`} stroke={c.green} strokeWidth="2" />
      <text x={280} y={107} textAnchor="middle" fill={c.green} fontSize="12" fontWeight="700">Context-Aware Memory Activation</text>

      {/* Fork to isolated pipelines */}
      <line x1={280} y1={120} x2={280} y2={140} stroke={c.green} strokeWidth="1.5" />
      <line x1={280} y1={140} x2={100} y2={140} stroke={c.green} strokeWidth="1.5" />
      <line x1={280} y1={140} x2={460} y2={140} stroke={c.green} strokeWidth="1.5" />
      <line x1={100} y1={140} x2={100} y2={168} stroke={c.teal} strokeWidth="1.5" markerEnd="url(#arrC-teal)" />
      <line x1={280} y1={140} x2={280} y2={168} stroke={c.amber} strokeWidth="1.5" markerEnd="url(#arrC-amber)" />
      <line x1={460} y1={140} x2={460} y2={168} stroke={c.blue} strokeWidth="1.5" markerEnd="url(#arrC-blue)" />

      {/* Isolated pipelines */}
      <rect x={30} y={168} width={140} height={50} rx={6} fill={`${c.teal}15`} stroke={c.teal} strokeWidth="1.5" />
      <text x={100} y={188} textAnchor="middle" fill={c.teal} fontSize="10" fontWeight="700">User A Pipeline</text>
      <text x={100} y={204} textAnchor="middle" fill={`${c.teal}99`} fontSize="9">Isolated context</text>

      <rect x={210} y={168} width={140} height={50} rx={6} fill={`${c.amber}15`} stroke={c.amber} strokeWidth="1.5" />
      <text x={280} y={188} textAnchor="middle" fill={c.amber} fontSize="10" fontWeight="700">User B Pipeline</text>
      <text x={280} y={204} textAnchor="middle" fill={`${c.amber}99`} fontSize="9">Isolated context</text>

      <rect x={390} y={168} width={140} height={50} rx={6} fill={`${c.blue}15`} stroke={c.blue} strokeWidth="1.5" />
      <text x={460} y={188} textAnchor="middle" fill={c.blue} fontSize="10" fontWeight="700">User N Pipeline</text>
      <text x={460} y={204} textAnchor="middle" fill={`${c.blue}99`} fontSize="9">Isolated context</text>

      {/* Isolation boundary */}
      <rect x={20} y={158} width={520} height={70} rx={8} fill="none" stroke="#ffffff10" strokeWidth="1.5" strokeDasharray="5,4" />
      <text x={280} y={248} textAnchor="middle" fill="#ffffff25" fontSize="9">ISOLATION BOUNDARY — NO CROSS-TENANT CONTEXT LEAKAGE</text>

      {/* Converge to controlled output */}
      <line x1={100} y1={218} x2={100} y2={268} stroke={c.teal} strokeWidth="1.5" markerEnd="url(#arrC-teal)" />
      <line x1={280} y1={218} x2={280} y2={268} stroke={c.amber} strokeWidth="1.5" markerEnd="url(#arrC-amber)" />
      <line x1={460} y1={218} x2={460} y2={268} stroke={c.blue} strokeWidth="1.5" markerEnd="url(#arrC-blue)" />

      <rect x={60} y={268} width={440} height={36} rx={6} fill={`${c.purple}15`} stroke={c.purple} strokeWidth="1.5" />
      <text x={280} y={286} textAnchor="middle" fill={c.purple} fontSize="11" fontWeight="700">Token-Efficient Context Hydration</text>
      <text x={280} y={300} textAnchor="middle" fill={`${c.purple}80`} fontSize="9">Minimal token expansion · Controlled context flow per inference</text>
    </DiagramCard>
  );
}

// Fig. D — Multimodal Knowledge Graph (retained from Fig. 2)
function FigureKnowledgeGraph() {
  const c = { blue: '#3b82f6', teal: '#14b8a6', green: '#34d399', amber: '#f59e0b' };
  return (
    <DiagramCard
      figureNum="Fig. D"
      title="Multimodal Knowledge Graph Construction"
      description="Integration of video, text, audio, and metadata into a unified graph — cross-modal entity linking for graph-driven reasoning over flat embeddings."
      color={c.blue}
      height={380}
    >
      <defs>
        <marker id="arrD-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={c.blue} /></marker>
        <marker id="arrD-teal" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={c.teal} /></marker>
        <marker id="arrD-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={c.green} /></marker>
        <marker id="arrD-amber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={c.amber} /></marker>
      </defs>

      {/* Source nodes */}
      <DiagramNode x={80} y={50} width={100} label="Video" sublabel="Frames / Scenes" color={c.green} />
      <DiagramNode x={200} y={50} width={100} label="Documents" sublabel="Text / PDF" color={c.blue} />
      <DiagramNode x={320} y={50} width={100} label="Audio" sublabel="Speech / Sound" color={c.amber} />
      <DiagramNode x={440} y={50} width={100} label="Metadata" sublabel="Tags / Timestamps" color={c.teal} />

      <line x1={80} y1={70} x2={80} y2={108} stroke={c.green} strokeWidth="1.5" markerEnd="url(#arrD-green)" />
      <line x1={200} y1={70} x2={200} y2={108} stroke={c.blue} strokeWidth="1.5" markerEnd="url(#arrD-blue)" />
      <line x1={320} y1={70} x2={320} y2={108} stroke={c.amber} strokeWidth="1.5" markerEnd="url(#arrD-amber)" />
      <line x1={440} y1={70} x2={440} y2={108} stroke={c.teal} strokeWidth="1.5" markerEnd="url(#arrD-teal)" />

      <rect x={30} y={108} width={500} height={36} rx={6} fill={`${c.blue}15`} stroke={c.blue} strokeWidth="1.5" />
      <text x={280} y={131} textAnchor="middle" fill={c.blue} fontSize="11" fontWeight="700">Multimodal Ingestion Pipeline</text>

      <line x1={280} y1={144} x2={280} y2={172} stroke={c.blue} strokeWidth="1.5" markerEnd="url(#arrD-blue)" />

      <rect x={60} y={172} width={400} height={44} rx={6} fill={`${c.teal}15`} stroke={c.teal} strokeWidth="1.5" />
      <text x={280} y={190} textAnchor="middle" fill={c.teal} fontSize="11" fontWeight="700">Cross-Modal Entity Linking</text>
      <text x={280} y={207} textAnchor="middle" fill={`${c.teal}99`} fontSize="9">Entity resolution · Semantic alignment · Relationship extraction</text>

      <line x1={280} y1={216} x2={280} y2={244} stroke={c.teal} strokeWidth="1.5" markerEnd="url(#arrD-teal)" />

      <rect x={60} y={244} width={400} height={44} rx={6} fill={`${c.amber}15`} stroke={c.amber} strokeWidth="1.5" />
      <text x={280} y={262} textAnchor="middle" fill={c.amber} fontSize="11" fontWeight="700">Graph Construction Engine</text>
      <text x={280} y={278} textAnchor="middle" fill={`${c.amber}99`} fontSize="9">Node creation · Edge weighting · Temporal indexing</text>

      <line x1={280} y1={288} x2={280} y2={316} stroke={c.green} strokeWidth="1.5" markerEnd="url(#arrD-green)" />

      <rect x={60} y={316} width={400} height={36} rx={6} fill={`${c.green}15`} stroke={c.green} strokeWidth="1.5" />
      <text x={280} y={339} textAnchor="middle" fill={c.green} fontSize="11" fontWeight="700">Unified Knowledge Graph — Graph-Driven Reasoning</text>
    </DiagramCard>
  );
}

export default function ResearchPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0c12] text-white overflow-x-hidden">
      <PublicHeader />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center pt-16 overflow-hidden"
      >
        <AnimatedGradientOrb className="w-[700px] h-[700px] bg-[#7c3aed] -top-48 -left-48" />
        <AnimatedGradientOrb className="w-[500px] h-[500px] bg-[#3b82f6] bottom-0 right-0" />
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(124,58,237,0.07), transparent 60%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#34d399]/40 bg-[#34d399]/10 mb-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-[#34d399] text-xs font-semibold tracking-widest uppercase">Patent Published</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            <span className="text-white">Reinventing Knowledge</span>
            <br />
            <span
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #34d399 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              as Living Intelligence
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/55 max-w-3xl mx-auto leading-relaxed mb-4">
            PersonaMatrix is a <strong className="text-white/80 font-semibold">video-native, multimodal AI platform</strong> that transforms content into interactive, memory-driven personas with causal reasoning — the foundational architecture behind a new class of knowledge interaction systems.
          </p>

          <p className="text-[14px] text-white/45 max-w-3xl mx-auto leading-relaxed mb-8">
            Unlike traditional AI systems, PersonaMatrix enables querying any moment within a video or knowledge source as structured, interactive intelligence rather than simple text retrieval.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {[
              { label: 'Video-First Intelligence', color: '#3b82f6' },
              { label: 'Multimodal Understanding', color: '#7c3aed' },
              { label: 'Persona-Based AI', color: '#a78bfa' },
              { label: 'Causal Reasoning', color: '#34d399' },
            ].map((tag) => (
              <span
                key={tag.label}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border"
                style={{ color: tag.color, borderColor: `${tag.color}40`, background: `${tag.color}12` }}
              >
                {tag.label}
              </span>
            ))}
          </div>

          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-3 rounded-2xl border border-[#34d399]/20 bg-[#34d399]/5 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
              <span className="text-[#34d399] text-xs font-semibold uppercase tracking-wider">Published</span>
            </div>
            <span className="text-white/20 text-xs">|</span>
            <span className="text-white/60 text-xs">Publication Date: <span className="text-white/80 font-medium">27 March 2025</span></span>
            <span className="text-white/20 text-xs">|</span>
            <div className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
              <span className="text-white/60 text-xs">Status: <span className="text-[#60a5fa] font-medium">Awaiting Examination</span></span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
              <span className="text-sm text-white/60">17 Patent Claims</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-[#60a5fa]" />
              <span className="text-sm text-white/60">21 Technical Modules</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-[#a78bfa]" />
              <span className="text-sm text-white/60">6 Core Innovations</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── POSITIONING STATEMENT BANNER ── */}
      <section className="relative py-10 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-[#7c3aed]/25 bg-gradient-to-r from-[#7c3aed]/8 via-[#3b82f6]/5 to-[#14b8a6]/5 px-8 py-6 text-center">
            <p className="text-[15px] md:text-base text-white/70 leading-relaxed max-w-4xl mx-auto">
              <span className="text-white font-semibold">PersonaMatrix</span> is a video-native, multimodal AI platform that transforms content into interactive, memory-driven personas with causal reasoning — enabling a new class of knowledge systems that understand not just <em>what</em> is in content, but <em>why</em> it matters.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: RESEARCH POSITIONING ── */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#a78bfa] mb-4">Research Positioning</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            Reinventing Knowledge as Living Intelligence
          </h2>
          <p className="text-white/55 text-[15px] leading-relaxed max-w-3xl mb-6">
            PersonaMatrix introduces a new class of AI systems that transform video, documents, and human knowledge into persistent, identity-aware, conversational entities.
          </p>
          <p className="text-white/45 text-[14px] leading-relaxed max-w-3xl mb-12">
            Unlike traditional AI systems that rely on shallow text retrieval, PersonaMatrix enables deep, structured understanding of content with continuity, temporal reasoning, and causal interaction — making knowledge not just retrievable, but truly alive.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                label: 'Video-Native Knowledge Representation',
                desc: 'Content is understood at the frame, scene, and semantic level — not reduced to flat text transcripts. Every visual moment becomes queryable intelligence.',
                color: '#3b82f6',
              },
              {
                label: 'Identity-Preserving AI Personas',
                desc: 'Personas maintain consistent identity across sessions, content sources, and interaction modalities — enabling continuity that mirrors human memory.',
                color: '#7c3aed',
              },
              {
                label: 'Memory-Isolated Retrieval Systems',
                desc: 'Each user and tenant operates within a fully isolated memory context, preventing cross-contamination and enabling enterprise-grade knowledge privacy.',
                color: '#14b8a6',
              },
            ].map((concept) => (
              <div
                key={concept.label}
                className="rounded-xl border border-white/8 p-5 bg-white/[0.02]"
                style={{ borderLeft: `2px solid ${concept.color}60` }}
              >
                <div className="w-2 h-2 rounded-full mb-3" style={{ background: concept.color }} />
                <h3 className="text-sm font-bold text-white mb-2 leading-snug">{concept.label}</h3>
                <p className="text-[12px] text-white/40 leading-relaxed">{concept.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSIGHT LINE ── */}
      <div className="max-w-5xl mx-auto px-6 py-2 text-center">
        <p className="text-[13px] text-white/25 italic">Knowledge is no longer consumed. It is interacted with.</p>
      </div>

      {/* ── SECTION 2: PROBLEM STATEMENT ── */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#ef4444] mb-4">Problem Statement</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Limitations of Existing AI Systems
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-2xl mb-10">
            Current AI systems were built for text. The world runs on video. This fundamental mismatch creates four critical gaps that PersonaMatrix is engineered to close.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                num: '01',
                problem: 'Video is unqueryable',
                text: 'Video is the most information-dense format in existence — yet existing AI systems cannot natively understand it. They rely on lossy transcripts, discarding 90% of the signal.',
                advantage: 'PersonaMatrix processes video natively at the frame, audio, and semantic level.',
                color: '#ef4444',
              },
              {
                num: '02',
                problem: 'RAG is fragmented by design',
                text: 'Traditional Retrieval-Augmented Generation depends on disconnected text chunks. Structural context, temporal flow, and cross-document relationships are permanently lost.',
                advantage: 'PersonaMatrix uses graph-driven retrieval that preserves structure and temporal continuity.',
                color: '#f59e0b',
              },
              {
                num: '03',
                problem: 'AI has no persistent identity',
                text: 'Every session starts from zero. AI systems are stateless — they cannot remember who you are, what you\'ve discussed, or how your understanding has evolved over time.',
                advantage: 'PersonaMatrix personas maintain persistent identity and memory across all sessions.',
                color: '#f59e0b',
              },
              {
                num: '04',
                problem: 'No temporal or causal reasoning',
                text: 'Existing systems cannot reason across time — they cannot understand sequences, causality, or the evolution of events within long-form video or multi-session interactions.',
                advantage: 'PersonaMatrix models temporal causality and event propagation across content.',
                color: '#ef4444',
              },
            ].map((item) => (
              <div
                key={item.num}
                className="rounded-xl border border-white/8 p-5 bg-white/[0.02] flex flex-col gap-3"
              >
                <div className="flex items-start gap-4">
                  <span className="text-[11px] font-black tracking-widest shrink-0 mt-0.5" style={{ color: `${item.color}60` }}>{item.num}</span>
                  <div>
                    <p className="text-[13px] font-bold text-white/80 mb-1">{item.problem}</p>
                    <p className="text-[12px] text-white/45 leading-relaxed">{item.text}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 pl-7 pt-1 border-t border-white/5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5 shrink-0" style={{ color: '#34d399' }}>
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-[11px] text-[#34d399]/70 leading-relaxed font-medium">{item.advantage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: CORE RESEARCH AREAS ── */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#60a5fa] mb-4">Core Research Areas</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Core Research Areas
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-2xl mb-14">
            Five interlocking research domains form the technical foundation of PersonaMatrix — each solving a distinct limitation of existing AI architectures.
          </p>

          {/* Research Area 1 */}
          <div className="mb-16">
            <div className="flex items-start gap-4 mb-3">
              <span className="text-[11px] font-black tracking-widest text-[#3b82f660] mt-1">01</span>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Video-Native RAG Architecture</h3>
                <p className="text-[13px] text-[#3b82f6]/70 mb-3 font-medium">Converts raw video into structured, queryable intelligence by extracting meaning at every temporal layer.</p>
                <ul className="space-y-1.5">
                  {[
                    'Frame-level extraction across visual, audio, and semantic signals',
                    'Temporal linking across scenes and timelines',
                    'Fine-grained querying of long-duration video content',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/50">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5 shrink-0" style={{ color: '#3b82f6' }}>
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="pl-7 mb-4 space-y-1.5">
              <p className="text-[12px] text-white/50"><span className="text-white/70 font-semibold">What this shows:</span> A pipeline that converts raw video into structured, temporally-indexed intelligence through frame, audio, and semantic extraction.</p>
              <p className="text-[12px] text-white/50"><span className="text-white/70 font-semibold">Why it matters:</span> Unlike transcript-based retrieval, this architecture preserves visual grounding and temporal context — enabling queries no text-only system can answer.</p>
            </div>
            <FigureVRAG />
          </div>

          {/* Research Area 2 */}
          <div className="mb-16">
            <div className="flex items-start gap-4 mb-3">
              <span className="text-[11px] font-black tracking-widest text-[#7c3aed60] mt-1">02</span>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Persona Identity Graph</h3>
                <p className="text-[13px] text-[#7c3aed]/70 mb-3 font-medium">Models a persistent, relationship-aware identity for each persona — so it remembers, evolves, and stays coherent across every interaction.</p>
                <ul className="space-y-1.5">
                  {[
                    'Persistent identity modeling across sessions and content sources',
                    'Relationship-aware entity mapping',
                    'Cross-context persona continuity',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/50">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5 shrink-0" style={{ color: '#7c3aed' }}>
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="pl-7 mb-4 space-y-1.5">
              <p className="text-[12px] text-white/50"><span className="text-white/70 font-semibold">What this shows:</span> A graph structure mapping how a persona's knowledge, relationships, and memory are organized and preserved across time and content sources.</p>
              <p className="text-[12px] text-white/50"><span className="text-white/70 font-semibold">Why it matters:</span> Traditional AI systems are stateless — this graph enables identity continuity and cross-session coherence that no flat retrieval model can replicate.</p>
            </div>
            <FigurePersonaGraph />
          </div>

          {/* Research Area 3 */}
          <div className="mb-16">
            <div className="flex items-start gap-4 mb-3">
              <span className="text-[11px] font-black tracking-widest text-[#34d39960] mt-1">03</span>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Memory-Isolated Retrieval System</h3>
                <p className="text-[13px] text-[#34d399]/70 mb-3 font-medium">Ensures every user retrieves only from their own knowledge context — enabling multi-tenant AI without cross-contamination.</p>
                <ul className="space-y-1.5">
                  {[
                    'Context-aware memory activation',
                    'Reduction of token expansion during inference',
                    'Multi-tenant user-specific knowledge isolation',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/50">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5 shrink-0" style={{ color: '#34d399' }}>
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="pl-7 mb-4 space-y-1.5">
              <p className="text-[12px] text-white/50"><span className="text-white/70 font-semibold">What this shows:</span> Isolated retrieval pipelines per user, each activating only the relevant memory context from a shared knowledge base.</p>
              <p className="text-[12px] text-white/50"><span className="text-white/70 font-semibold">Why it matters:</span> Shared-context pipelines leak data and inflate token usage — memory isolation solves both problems at the architecture level.</p>
            </div>
            <FigureIsolatedRetrieval />
          </div>

          {/* ── INSIGHT LINE ── */}
          <div className="text-center py-4 mb-8">
            <p className="text-[13px] text-white/25 italic">From static content to persistent intelligence.</p>
          </div>

          {/* Research Area 4 */}
          <div className="mb-16">
            <div className="flex items-start gap-4 mb-3">
              <span className="text-[11px] font-black tracking-widest text-[#f59e0b60] mt-1">04</span>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Multimodal Knowledge Graph Construction</h3>
                <p className="text-[13px] text-[#f59e0b]/70 mb-3 font-medium">Unifies video, text, audio, and metadata into a single reasoning graph — replacing flat vector search with structured, relational intelligence.</p>
                <ul className="space-y-1.5">
                  {[
                    'Integration of video, text, audio, and metadata',
                    'Cross-modal entity linking',
                    'Graph-driven reasoning instead of flat embeddings',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/50">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5 shrink-0" style={{ color: '#f59e0b' }}>
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="pl-7 mb-4 space-y-1.5">
              <p className="text-[12px] text-white/50"><span className="text-white/70 font-semibold">What this shows:</span> Four modalities — video, documents, audio, and metadata — fused into a single unified knowledge graph through cross-modal entity linking.</p>
              <p className="text-[12px] text-white/50"><span className="text-white/70 font-semibold">Why it matters:</span> Flat embeddings lose relational structure — graph-driven reasoning enables cross-modal inference that single-modality systems cannot perform.</p>
            </div>
            <FigureKnowledgeGraph />
          </div>

          {/* Research Area 5 */}
          <div>
            <div className="flex items-start gap-4 mb-6">
              <span className="text-[11px] font-black tracking-widest text-[#14b8a660] mt-1">05</span>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Conversational Knowledge Interface</h3>
                <p className="text-[13px] text-[#14b8a6]/70 mb-3 font-medium">Delivers knowledge through natural conversation — via text, voice, or avatar — grounded in structured graph intelligence rather than generative guesswork.</p>
                <ul className="space-y-1.5">
                  {[
                    'Interaction via text, voice, and avatar',
                    'Responses grounded in structured knowledge',
                    'Natural and context-aware interaction',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/50">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5 shrink-0" style={{ color: '#14b8a6' }}>
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rounded-2xl border border-white/8 p-6 bg-white/[0.02]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Text Interface', desc: 'Structured query-response grounded in knowledge graph', color: '#14b8a6' },
                  { label: 'Voice Interface', desc: 'Real-time speech interaction with persona-aware context', color: '#3b82f6' },
                  { label: 'Avatar Interface', desc: 'Visual persona layer decoupled from reasoning engine', color: '#7c3aed' },
                ].map((iface) => (
                  <div key={iface.label} className="rounded-xl border border-white/8 p-4" style={{ borderTop: `2px solid ${iface.color}50` }}>
                    <div className="text-sm font-bold mb-1.5" style={{ color: iface.color }}>{iface.label}</div>
                    <p className="text-[12px] text-white/40 leading-relaxed">{iface.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEW SECTION: CAUSAL VIDEO INTELLIGENCE ── */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#f59e0b] mb-4">Causal Reasoning</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            Causal Video Intelligence
          </h2>
          <p className="text-white/55 text-[15px] leading-relaxed max-w-3xl mb-4">
            PersonaMatrix doesn&apos;t just understand <em>what</em> happens in video — it understands <em>why</em> it happens. By modeling temporal causality and event propagation, the system can trace how actions lead to outcomes and simulate alternative scenarios.
          </p>
          <p className="text-white/40 text-[14px] leading-relaxed max-w-3xl mb-12">
            This moves AI from passive observation to active causal comprehension — enabling counterfactual reasoning, predictive analysis, and explainable intelligence grounded in real-world video evidence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Temporal Causality',
                desc: 'Models cause-and-effect relationships across time — understanding how earlier events drive later outcomes within video sequences.',
                color: '#f59e0b',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                ),
              },
              {
                title: 'Interaction Modeling',
                desc: 'Tracks how entities, objects, and agents interact within scenes — building a structured map of relationships and dependencies.',
                color: '#3b82f6',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 0 0 7.75"/>
                  </svg>
                ),
              },
              {
                title: 'Event Propagation',
                desc: 'Traces how a single event cascades through a sequence — identifying downstream effects and critical inflection points in video content.',
                color: '#7c3aed',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                ),
              },
              {
                title: 'Counterfactual Reasoning',
                desc: 'Answers "what if" questions by simulating alternative outcomes — enabling scenario analysis, risk modeling, and explainable AI decisions.',
                color: '#34d399',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/8 p-5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200"
                style={{ borderTop: `2px solid ${item.color}50` }}
              >
                <div className="mb-3" style={{ color: item.color }}>{item.icon}</div>
                <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                <p className="text-[12px] text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW SECTION: APPLIED INTELLIGENCE ── */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#60a5fa] mb-4">Industry Applications</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Applied Intelligence
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-2xl mb-12">
            PersonaMatrix&apos;s video-native, identity-aware infrastructure unlocks transformative capabilities across high-value industries where existing AI systems fall short.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                industry: 'Creator Economy',
                tagline: 'Turn content into a 24/7 interactive AI persona',
                desc: 'Creators deploy AI personas trained on their video library — fans can ask questions, explore content, and engage in personalized conversations that mirror the creator\'s voice, style, and expertise at any hour.',
                color: '#7c3aed',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/><path d="M10 8l6 4-6 4V8z"/>
                  </svg>
                ),
              },
              {
                industry: 'Education & Course Creators',
                tagline: 'Turn course content into an interactive AI tutor',
                desc: 'Course creators deploy AI personas trained on their lessons and videos — students get instant answers, personalized guidance, and support between sessions, dramatically improving completion rates and course sales.',
                color: '#3b82f6',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                ),
              },
              {
                industry: 'Coaches & D2C Brands',
                tagline: 'Scale expertise and commerce without scaling time',
                desc: 'Coaches and D2C brands deploy AI personas that handle client intake, answer product questions, and guide buyers from discovery to purchase — delivering personalized experiences at scale without additional headcount.',
                color: '#f59e0b',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.industry}
                className="rounded-2xl border border-white/8 p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}30` }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: item.color }}>{item.industry}</p>
                    <h3 className="text-sm font-bold text-white leading-snug">{item.tagline}</h3>
                  </div>
                </div>
                <p className="text-[12px] text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: PATENT INNOVATION ── */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#34d399] mb-4">Patent Innovation</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Patent-Backed Core Innovations
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-2xl mb-3">
            Patent filed for a video-native, persona-driven multimodal knowledge architecture with persistent identity and hybrid retrieval.
          </p>
          <p className="text-white/55 text-[14px] leading-relaxed max-w-3xl mb-10">
            These innovations define a new class of video-native, identity-aware knowledge systems designed for deep understanding, continuity, and efficient retrieval.
          </p>
          <p className="text-[#34d399]/60 text-sm font-medium leading-relaxed max-w-2xl mb-10">
            Building a defensible infrastructure layer for the future of knowledge interaction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              { num: '01', title: 'Ultra-Deep Video RAG', desc: 'Video Retrieval-Augmented Generation with frame-level temporal indexing and scene-aware querying — a foundational layer no existing system replicates.', color: '#3b82f6' },
              { num: '02', title: 'Identity-Preserving Persona Modeling', desc: 'Persistent persona identity across temporal contexts, sessions, and content sources — enabling AI that truly knows who it is and who it\'s talking to.', color: '#7c3aed' },
              { num: '03', title: 'Memory-Isolated Multi-Tenant Knowledge', desc: 'Fully isolated knowledge systems per user and tenant with zero cross-contamination — enterprise-grade privacy at the architecture level.', color: '#34d399' },
              { num: '04', title: 'Token-Efficient Context Hydration', desc: 'Patented mechanism for controlled, minimal-token context activation during inference — reducing cost while increasing precision.', color: '#f59e0b' },
              { num: '05', title: 'Persona-Based Interaction Layer', desc: 'Interaction architecture grounding every response in structured knowledge via persona identity — eliminating hallucination at the system level.', color: '#14b8a6' },
            ].map((claim) => (
              <div
                key={claim.num}
                className="group relative rounded-xl border border-white/8 p-5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-200 overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 w-px h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(180deg, ${claim.color}, transparent)` }}
                />
                <div className="flex items-start gap-3">
                  <span className="text-[11px] font-black tracking-widest shrink-0 mt-0.5" style={{ color: `${claim.color}60` }}>{claim.num}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1.5 leading-snug">{claim.title}</h4>
                    <p className="text-[12px] text-white/40 leading-relaxed">{claim.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-[#34d399]/20 bg-[#34d399]/5 px-6 py-4">
            <div className="flex items-start gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" className="mt-0.5 shrink-0">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <p className="text-[13px] text-[#34d399]/80 leading-relaxed">
                Patent filed for a video-native, persona-driven multimodal knowledge architecture with persistent identity and hybrid retrieval. <strong className="text-[#34d399]">Building a defensible infrastructure layer for the future of knowledge interaction.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSIGHT LINE ── */}
      <div className="max-w-5xl mx-auto px-6 py-2 text-center">
        <p className="text-[13px] text-white/25 italic">Every query is a conversation with structured memory, not a search through flat text.</p>
      </div>

      {/* ── SECTION 5: TECHNICAL DIFFERENTIATION ── */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#f59e0b] mb-4">Technical Differentiation</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Technical Differentiation
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-2xl mb-10">
            A direct comparison of PersonaMatrix&apos;s architectural capabilities against the current state of AI systems — across the dimensions that matter most for real-world knowledge applications.
          </p>

          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'linear-gradient(90deg, rgba(124,58,237,0.15), rgba(59,130,246,0.08), transparent)' }}>
                    <th className="text-left px-6 py-4 text-white/60 font-semibold text-xs uppercase tracking-wider">Dimension</th>
                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#a78bfa] animate-pulse" />
                        <span className="text-[#a78bfa] font-bold text-sm">PersonaMatrix</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-white/40 font-medium text-xs">Traditional Systems</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      dimension: 'Video Understanding',
                      pm: 'Video-native, frame-level understanding of visual, audio, and semantic signals',
                      trad: 'Transcript-based text retrieval — discards 90% of video signal',
                      highlight: true,
                    },
                    {
                      dimension: 'Persona Intelligence',
                      pm: 'Identity-aware personas with persistent memory and cross-session continuity',
                      trad: 'Stateless responses — no identity, no memory, no continuity',
                      highlight: false,
                    },
                    {
                      dimension: 'Retrieval Method',
                      pm: 'Graph-driven reasoning over structured, relational knowledge',
                      trad: 'Flat vector search over disconnected embeddings',
                      highlight: true,
                    },
                    {
                      dimension: 'Memory Persistence',
                      pm: 'Temporal continuity with memory-isolated, user-specific knowledge systems',
                      trad: 'Session-based ephemeral memory — resets on every interaction',
                      highlight: false,
                    },
                    {
                      dimension: 'Causal Reasoning',
                      pm: 'Temporal causality modeling with counterfactual and event propagation',
                      trad: 'No causal reasoning — pattern matching without understanding',
                      highlight: true,
                    },
                    {
                      dimension: 'Context Efficiency',
                      pm: 'Token-efficient context hydration — precision retrieval at minimal cost',
                      trad: 'Token-heavy full-history pipelines — expensive and imprecise',
                      highlight: false,
                    },
                  ].map((row, i) => (
                    <tr
                      key={row.dimension}
                      className={`border-t border-white/5 transition-colors duration-150 hover:bg-white/[0.02] ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}
                    >
                      <td className="px-6 py-4 text-white/50 text-xs font-semibold uppercase tracking-wider">{row.dimension}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] mt-1.5 shrink-0" />
                          <span className={`text-[13px] font-medium ${row.highlight ? 'text-white/90' : 'text-white/75'}`}>{row.pm}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/15 mt-1.5 shrink-0" />
                          <span className="text-[13px] text-white/30 line-through decoration-white/20">{row.trad}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: SYSTEM ARCHITECTURE OVERVIEW ── */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#60a5fa] mb-4">System Architecture</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-10">
            System Architecture Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                layer: 'Ingestion Layer',
                items: ['Video', 'Documents', 'Audio Streams'],
                color: '#3b82f6',
                desc: 'Raw content entry points across all modalities',
              },
              {
                layer: 'Processing Layer',
                items: ['Extraction', 'Chunking', 'Embeddings'],
                color: '#f59e0b',
                desc: 'Content decomposition and semantic encoding',
              },
              {
                layer: 'Knowledge Layer',
                items: ['Vector Database', 'Graph Database'],
                color: '#34d399',
                desc: 'Dual-store architecture for retrieval and reasoning',
              },
              {
                layer: 'Persona Layer',
                items: ['Identity Modeling', 'Memory Systems'],
                color: '#7c3aed',
                desc: 'Persistent identity and memory-isolated management',
              },
              {
                layer: 'Interaction Layer',
                items: ['Chat API', 'Voice API', 'Avatar API'],
                color: '#14b8a6',
                desc: 'Multimodal interface endpoints for end-user interaction',
              },
            ].map((mod) => (
              <div
                key={mod.layer}
                className="rounded-2xl border border-white/8 p-5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: mod.color, boxShadow: `0 0 8px ${mod.color}80` }} />
                  <span className="text-xs font-bold tracking-wider uppercase" style={{ color: mod.color }}>{mod.layer}</span>
                </div>
                <p className="text-[11px] text-white/35 mb-3 leading-relaxed">{mod.desc}</p>
                <ul className="flex flex-col gap-1.5">
                  {mod.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5 shrink-0" style={{ color: mod.color }}>
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-[13px] text-white/55 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: RESEARCH IMPACT ── */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#a78bfa] mb-4">Research Impact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            Towards a New Knowledge Interface
          </h2>
          <p className="text-white/55 text-[15px] leading-relaxed max-w-3xl mb-4">
            PersonaMatrix redefines how humans interact with knowledge by converting passive content into active, conversational intelligence.
          </p>
          <p className="text-white/45 text-[14px] leading-relaxed max-w-3xl mb-12">
            It enables scalable digital representation of expertise, improves accessibility of complex information, and bridges the gap between content consumption and identity-aware, graph-driven interaction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: 'Scalable Expertise Representation',
                desc: 'Any domain expert\'s knowledge — encoded in video, documents, or sessions — can be represented as a persistent, queryable AI persona.',
                color: '#7c3aed',
              },
              {
                title: 'Accessible Complex Information',
                desc: 'Dense technical content becomes conversationally accessible without loss of precision or structural integrity.',
                color: '#3b82f6',
              },
              {
                title: 'Active Knowledge Interaction',
                desc: 'Passive content consumption is replaced by structured, grounded, identity-aware dialogue with knowledge systems.',
                color: '#14b8a6',
              },
            ].map((impact) => (
              <div
                key={impact.title}
                className="rounded-xl border border-white/8 p-5 bg-white/[0.02]"
                style={{ borderTop: `2px solid ${impact.color}50` }}
              >
                <h3 className="text-sm font-bold text-white mb-2 leading-snug">{impact.title}</h3>
                <p className="text-[12px] text-white/40 leading-relaxed">{impact.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW SECTION: WHY NOW ── */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#34d399] mb-4">Market Timing</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Why Now
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-2xl mb-12">
            Four converging forces have created a narrow window for a video-native, identity-aware platform to define a new category.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                num: '01',
                title: 'Explosion of Video Content',
                desc: 'Over 500 hours of video are uploaded to YouTube every minute. Enterprise video libraries are growing at 40% annually. The world\'s most valuable knowledge is locked in video — and completely unqueryable by existing AI.',
                color: '#3b82f6',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                  </svg>
                ),
              },
              {
                num: '02',
                title: 'Limitations of Traditional RAG',
                desc: 'The RAG paradigm has hit a ceiling. Fragmented text chunks, flat vector search, and stateless retrieval cannot meet the demands of complex, multi-session, multimodal knowledge applications. A new architecture is required.',
                color: '#ef4444',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                ),
              },
              {
                num: '03',
                title: 'Rise of Multimodal AI',
                desc: 'Foundation models are becoming natively multimodal. The infrastructure layer — ingestion, structuring, retrieval, and persona modeling — has not kept pace. PersonaMatrix fills this critical gap with a patented architecture.',
                color: '#7c3aed',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                  </svg>
                ),
              },
              {
                num: '04',
                title: 'Demand for Human-Like Interaction',
                desc: 'Users expect AI that remembers them, understands context, and responds with continuity. The era of stateless, one-shot AI is ending. Persistent, identity-aware personas are the next interface paradigm.',
                color: '#34d399',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4h4a4 4 0 0 0 4 4v2"/><circle cx="6" cy="18" r="3"/>
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.num}
                className="rounded-xl border border-white/8 p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200"
                style={{ borderLeft: `2px solid ${item.color}50` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}30` }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-black tracking-widest" style={{ color: `${item.color}60` }}>{item.num}</span>
                      <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    </div>
                    <p className="text-[12px] text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="relative rounded-3xl border border-white/10 p-12 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(59,130,246,0.08) 50%, rgba(20,184,166,0.06) 100%)' }}
          >
            <div className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#34d399]/30 bg-[#34d399]/10 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                <span className="text-[#34d399] text-xs font-semibold tracking-wider uppercase">Patent Published</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Build on Patented Architecture
              </h2>
              <p className="text-white/45 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
                PersonaMatrix is built on this foundational technology. Every persona you create runs on memory-isolated, graph-driven retrieval and identity-aware intelligence — all protected by patent.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/register" className="px-6 py-3 rounded-xl text-sm font-semibold text-white btn-primary">
                  Request Technical Walkthrough
                </Link>
                <Link href="/persona-library" className="px-6 py-3 rounded-xl text-sm font-semibold text-white/80 border border-[#7c3aed]/40 bg-[#7c3aed]/10 hover:bg-[#7c3aed]/20 hover:border-[#7c3aed]/60 transition-all duration-150">
                  Explore Research Collaboration
                </Link>
                <Link href="/developers" className="px-6 py-3 rounded-xl text-sm font-semibold text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all duration-150">
                  View Patent Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
