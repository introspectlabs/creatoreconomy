'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ZoomIn, ZoomOut, Maximize2, Info } from 'lucide-react';
import { personas, Persona } from '@/app/persona-library/components/personaData';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Node {
  id: string;
  label: string;
  type: 'persona' | 'channel' | 'service' | 'knowledge';
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  pulsePhase: number;
}

interface Edge {
  source: string;
  target: string;
  strength: number;
  color: string;
  animated: boolean;
}

interface TooltipState {
  node: Node;
  x: number;
  y: number;
}

// ─── Color Maps ───────────────────────────────────────────────────────────────
const NODE_COLORS: Record<string, string> = {
  persona:   '#a855f7',
  channel:   '#3b82f6',
  service:   '#14b8a6',
  knowledge: '#f59e0b',
};

const EDGE_COLORS: Record<string, string> = {
  channel:   'rgba(59,130,246,0.45)',
  service:   'rgba(20,184,166,0.45)',
  knowledge: 'rgba(245,158,11,0.35)',
};

const AVATAR_GRADIENTS: Record<string, [string, string]> = {
  AS: ['#a855f7', '#7c3aed'],
  SB: ['#3b82f6', '#06b6d4'],
  MH: ['#f43f5e', '#ec4899'],
  KV: ['#14b8a6', '#10b981'],
  PF: ['#f59e0b', '#f97316'],
  DC: ['#6366f1', '#3b82f6'],
  LA: ['#64748b', '#94a3b8'],
  ZR: ['#d946ef', '#a855f7'],
  OM: ['#ef4444', '#f43f5e'],
  ET: ['#22c55e', '#14b8a6'],
  NC: ['#0ea5e9', '#3b82f6'],
  MW: ['#8b5cf6', '#6366f1'],
};

// ─── Build graph from persona ─────────────────────────────────────────────────
function buildGraph(persona: Persona, allPersonas: Persona[], cx: number, cy: number) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const nodeMap = new Map<string, Node>();

  const addNode = (n: Node) => {
    nodes.push(n);
    nodeMap.set(n.id, n);
  };

  // Central persona node
  const centerNode: Node = {
    id: persona.id,
    label: persona.name,
    type: 'persona',
    x: cx,
    y: cy,
    vx: 0,
    vy: 0,
    radius: 32,
    color: NODE_COLORS.persona,
    alpha: 1,
    pulsePhase: 0,
  };
  addNode(centerNode);

  // Channel nodes
  persona.channels.forEach((ch, i) => {
    const angle = (i / Math.max(persona.channels.length, 1)) * Math.PI * 2 - Math.PI / 2;
    const dist = 160;
    const n: Node = {
      id: `ch-${ch}`,
      label: ch,
      type: 'channel',
      x: cx + Math.cos(angle) * dist + (Math.random() - 0.5) * 20,
      y: cy + Math.sin(angle) * dist + (Math.random() - 0.5) * 20,
      vx: 0, vy: 0,
      radius: 20,
      color: NODE_COLORS.channel,
      alpha: 0,
      pulsePhase: Math.random() * Math.PI * 2,
    };
    addNode(n);
    edges.push({ source: persona.id, target: n.id, strength: 1, color: EDGE_COLORS.channel, animated: true });
  });

  // Service nodes
  persona.services.forEach((svc, i) => {
    const angle = (i / Math.max(persona.services.length, 1)) * Math.PI * 2 + Math.PI / 4;
    const dist = 200;
    const n: Node = {
      id: `svc-${svc}`,
      label: svc,
      type: 'service',
      x: cx + Math.cos(angle) * dist + (Math.random() - 0.5) * 20,
      y: cy + Math.sin(angle) * dist + (Math.random() - 0.5) * 20,
      vx: 0, vy: 0,
      radius: 22,
      color: NODE_COLORS.service,
      alpha: 0,
      pulsePhase: Math.random() * Math.PI * 2,
    };
    addNode(n);
    edges.push({ source: persona.id, target: n.id, strength: 0.8, color: EDGE_COLORS.service, animated: true });
  });

  // Knowledge node
  if (persona.knowledgeChunks > 0) {
    const n: Node = {
      id: `kb-${persona.id}`,
      label: `${persona.knowledgeChunks.toLocaleString()} chunks`,
      type: 'knowledge',
      x: cx + 240 + (Math.random() - 0.5) * 30,
      y: cy - 80 + (Math.random() - 0.5) * 30,
      vx: 0, vy: 0,
      radius: 18,
      color: NODE_COLORS.knowledge,
      alpha: 0,
      pulsePhase: Math.random() * Math.PI * 2,
    };
    addNode(n);
    edges.push({ source: persona.id, target: n.id, strength: 0.6, color: EDGE_COLORS.knowledge, animated: false });
  }

  // Related personas (share channels or services)
  const related = allPersonas.filter((p) => {
    if (p.id === persona.id) return false;
    const sharedCh = p.channels.some((c) => persona.channels.includes(c));
    const sharedSvc = p.services.some((s) => persona.services.includes(s));
    return sharedCh || sharedSvc;
  }).slice(0, 4);

  related.forEach((rel, i) => {
    const angle = (i / Math.max(related.length, 1)) * Math.PI * 2 + Math.PI;
    const dist = 280;
    const n: Node = {
      id: `rel-${rel.id}`,
      label: rel.name,
      type: 'persona',
      x: cx + Math.cos(angle) * dist + (Math.random() - 0.5) * 30,
      y: cy + Math.sin(angle) * dist + (Math.random() - 0.5) * 30,
      vx: 0, vy: 0,
      radius: 22,
      color: '#7c3aed',
      alpha: 0,
      pulsePhase: Math.random() * Math.PI * 2,
    };
    addNode(n);
    // Connect via shared channels/services
    rel.channels.forEach((ch) => {
      if (persona.channels.includes(ch) && nodeMap.has(`ch-${ch}`)) {
        edges.push({ source: n.id, target: `ch-${ch}`, strength: 0.4, color: 'rgba(124,58,237,0.25)', animated: false });
      }
    });
    rel.services.forEach((svc) => {
      if (persona.services.includes(svc) && nodeMap.has(`svc-${svc}`)) {
        edges.push({ source: n.id, target: `svc-${svc}`, strength: 0.4, color: 'rgba(124,58,237,0.25)', animated: false });
      }
    });
  });

  return { nodes, edges };
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PersonaTopologyClient({ personaId }: { personaId: string }) {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const transformRef = useRef({ x: 0, y: 0, scale: 1 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragNodeRef = useRef<Node | null>(null);
  const tickRef = useRef(0);

  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [zoom, setZoom] = useState(1);
  const [persona, setPersona] = useState<Persona | null>(null);
  const [ready, setReady] = useState(false);

  // ── Init ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const p = personas.find((x) => x.id === personaId) || personas[0];
    setPersona(p);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const { nodes, edges } = buildGraph(p, personas, cx, cy);
    nodesRef.current = nodes;
    edgesRef.current = edges;

    setTimeout(() => setReady(true), 100);
  }, [personaId]);

  // ── Resize ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // ── Force simulation helpers ──────────────────────────────────────────────
  const applyForces = useCallback(() => {
    const nodes = nodesRef.current;
    const edges = edgesRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;

    // Repulsion
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const minDist = (a.radius + b.radius) * 3.5;
        if (dist < minDist) {
          const force = (minDist - dist) / dist * 0.08;
          a.vx -= dx * force;
          a.vy -= dy * force;
          b.vx += dx * force;
          b.vy += dy * force;
        }
      }
    }

    // Attraction along edges
    edges.forEach((e) => {
      const a = nodes.find((n) => n.id === e.source);
      const b = nodes.find((n) => n.id === e.target);
      if (!a || !b) return;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const ideal = (a.radius + b.radius) * 4;
      const force = (dist - ideal) / dist * 0.03 * e.strength;
      if (a.id !== (persona?.id || '')) { a.vx += dx * force; a.vy += dy * force; }
      if (b.id !== (persona?.id || '')) { b.vx += dx * force; b.vy += dy * force; }
    });

    // Center gravity for non-center nodes
    nodes.forEach((n) => {
      if (n.id === (persona?.id || '')) return;
      n.vx += (W / 2 - n.x) * 0.001;
      n.vy += (H / 2 - n.y) * 0.001;
    });

    // Integrate + dampen
    nodes.forEach((n) => {
      if (n.id === (persona?.id || '') && dragNodeRef.current?.id !== n.id) return;
      n.x += n.vx;
      n.y += n.vy;
      n.vx *= 0.85;
      n.vy *= 0.85;
      // Boundary
      n.x = Math.max(n.radius + 10, Math.min(W - n.radius - 10, n.x));
      n.y = Math.max(n.radius + 10, Math.min(H - n.radius - 10, n.y));
    });
  }, [persona]);

  // ── Draw ──────────────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, W * dpr, H * dpr);

    const t = transformRef.current;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.translate(t.x, t.y);
    ctx.scale(t.scale, t.scale);

    const nodes = nodesRef.current;
    const edges = edgesRef.current;
    tickRef.current += 0.02;
    const tick = tickRef.current;

    // Fade in nodes
    nodes.forEach((n) => {
      if (n.alpha < 1) n.alpha = Math.min(1, n.alpha + 0.025);
    });

    // ── Background grid ──
    ctx.save();
    ctx.globalAlpha = 0.04;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 0.5;
    const gridSize = 60;
    for (let x = -200; x < W + 200; x += gridSize) {
      ctx.beginPath(); ctx.moveTo(x, -200); ctx.lineTo(x, H + 200); ctx.stroke();
    }
    for (let y = -200; y < H + 200; y += gridSize) {
      ctx.beginPath(); ctx.moveTo(-200, y); ctx.lineTo(W + 200, y); ctx.stroke();
    }
    ctx.restore();

    // ── Edges ──
    edges.forEach((e) => {
      const a = nodes.find((n) => n.id === e.source);
      const b = nodes.find((n) => n.id === e.target);
      if (!a || !b) return;
      const alpha = Math.min(a.alpha, b.alpha);

      ctx.save();
      ctx.globalAlpha = alpha * 0.8;

      if (e.animated) {
        // Dashed animated edge
        const dashOffset = (tick * 20) % 20;
        ctx.setLineDash([6, 6]);
        ctx.lineDashOffset = -dashOffset;
        ctx.strokeStyle = e.color;
        ctx.lineWidth = 1.5;
      } else {
        ctx.setLineDash([3, 5]);
        ctx.strokeStyle = e.color;
        ctx.lineWidth = 1;
      }

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      // Slight curve
      const mx = (a.x + b.x) / 2 + (b.y - a.y) * 0.1;
      const my = (a.y + b.y) / 2 - (b.x - a.x) * 0.1;
      ctx.quadraticCurveTo(mx, my, b.x, b.y);
      ctx.stroke();

      // Animated particle along edge
      if (e.animated) {
        const progress = (tick * 0.4 + e.source.charCodeAt(0) * 0.01) % 1;
        const t2 = progress;
        const px = (1 - t2) * (1 - t2) * a.x + 2 * (1 - t2) * t2 * mx + t2 * t2 * b.x;
        const py = (1 - t2) * (1 - t2) * a.y + 2 * (1 - t2) * t2 * my + t2 * t2 * b.y;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = e.color.replace('0.45', '1').replace('0.35', '1');
        ctx.fill();
      }

      ctx.restore();
    });

    // ── Nodes ──
    nodes.forEach((n) => {
      ctx.save();
      ctx.globalAlpha = n.alpha;

      const pulse = Math.sin(tick * 2 + n.pulsePhase) * 0.15 + 0.85;

      // Glow
      const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 3);
      glow.addColorStop(0, n.color + '40');
      glow.addColorStop(1, n.color + '00');
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius * 3 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Ring (for persona nodes)
      if (n.type === 'persona') {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + 5 * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = n.color + '60';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Main circle
      const grad = ctx.createRadialGradient(n.x - n.radius * 0.3, n.y - n.radius * 0.3, 0, n.x, n.y, n.radius);
      if (n.type === 'persona' && AVATAR_GRADIENTS[n.label.slice(0, 2)]) {
        const [c1, c2] = AVATAR_GRADIENTS[n.label.slice(0, 2)] || [n.color, n.color];
        grad.addColorStop(0, c1);
        grad.addColorStop(1, c2);
      } else {
        grad.addColorStop(0, n.color + 'cc');
        grad.addColorStop(1, n.color + '88');
      }
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Border
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.strokeStyle = n.color + 'aa';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Label
      ctx.fillStyle = '#ffffff';
      ctx.font = `${n.type === 'persona' ? '600 ' : '500 '}${Math.max(9, n.radius * 0.38)}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (n.type === 'persona') {
        // Avatar initials inside
        const initials = n.label.split(' ').map((w: string) => w[0]).join('').slice(0, 2);
        ctx.fillText(initials, n.x, n.y);
      }

      // Label below node
      ctx.font = `500 ${Math.max(9, n.radius * 0.32)}px Inter, sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      const maxW = n.radius * 4;
      let labelText = n.label;
      if (ctx.measureText(labelText).width > maxW) {
        while (ctx.measureText(labelText + '…').width > maxW && labelText.length > 0) {
          labelText = labelText.slice(0, -1);
        }
        labelText += '…';
      }
      ctx.fillText(labelText, n.x, n.y + n.radius + 12);

      ctx.restore();
    });

    ctx.restore();
  }, []);

  // ── Animation loop ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return;
    const loop = () => {
      applyForces();
      draw();
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [ready, applyForces, draw]);

  // ── Mouse interactions ────────────────────────────────────────────────────
  const canvasToWorld = (cx: number, cy: number, rect: DOMRect) => {
    const t = transformRef.current;
    return {
      x: (cx - rect.left - t.x) / t.scale,
      y: (cy - rect.top - t.y) / t.scale,
    };
  };

  const hitTest = (wx: number, wy: number) =>
    nodesRef.current.find((n) => Math.hypot(n.x - wx, n.y - wy) <= n.radius + 6) || null;

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const { x, y } = canvasToWorld(e.clientX, e.clientY, rect);
    const hit = hitTest(x, y);
    if (hit) {
      dragNodeRef.current = hit;
    } else {
      isDraggingRef.current = true;
      dragStartRef.current = { x: e.clientX - transformRef.current.x, y: e.clientY - transformRef.current.y };
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const { x, y } = canvasToWorld(e.clientX, e.clientY, rect);

    if (dragNodeRef.current) {
      dragNodeRef.current.x = x;
      dragNodeRef.current.y = y;
      dragNodeRef.current.vx = 0;
      dragNodeRef.current.vy = 0;
      setTooltip(null);
      return;
    }

    if (isDraggingRef.current) {
      transformRef.current.x = e.clientX - dragStartRef.current.x;
      transformRef.current.y = e.clientY - dragStartRef.current.y;
      setTooltip(null);
      return;
    }

    const hit = hitTest(x, y);
    if (hit) {
      setTooltip({ node: hit, x: e.clientX - rect.left, y: e.clientY - rect.top });
      canvasRef.current!.style.cursor = 'pointer';
    } else {
      setTooltip(null);
      canvasRef.current!.style.cursor = 'grab';
    }
  };

  const onMouseUp = () => {
    dragNodeRef.current = null;
    isDraggingRef.current = false;
  };

  const onWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    const newScale = Math.max(0.3, Math.min(3, transformRef.current.scale * factor));
    transformRef.current.scale = newScale;
    setZoom(newScale);
  };

  const handleZoom = (dir: 'in' | 'out') => {
    const factor = dir === 'in' ? 1.2 : 0.8;
    const newScale = Math.max(0.3, Math.min(3, transformRef.current.scale * factor));
    transformRef.current.scale = newScale;
    setZoom(newScale);
  };

  const handleReset = () => {
    transformRef.current = { x: 0, y: 0, scale: 1 };
    setZoom(1);
  };

  // ── Legend data ───────────────────────────────────────────────────────────
  const legend = [
    { color: NODE_COLORS.persona,   label: 'Persona' },
    { color: NODE_COLORS.channel,   label: 'Channel' },
    { color: NODE_COLORS.service,   label: 'Service' },
    { color: NODE_COLORS.knowledge, label: 'Knowledge' },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#0a0c12]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/persona-library')}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            <span>Persona Library</span>
          </button>
          {persona && (
            <>
              <span className="text-white/20">/</span>
              <span className="text-white font-600 text-sm">{persona.name}</span>
              <span className="text-white/30 text-xs">— Network Topology</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <button onClick={() => handleZoom('out')} className="p-2 rounded-lg bg-white/5 border border-white/8 text-white/50 hover:text-white hover:bg-white/10 transition-all">
            <ZoomOut size={14} />
          </button>
          <span className="text-xs text-white/40 tabular-nums w-12 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => handleZoom('in')} className="p-2 rounded-lg bg-white/5 border border-white/8 text-white/50 hover:text-white hover:bg-white/10 transition-all">
            <ZoomIn size={14} />
          </button>
          <button onClick={handleReset} className="p-2 rounded-lg bg-white/5 border border-white/8 text-white/50 hover:text-white hover:bg-white/10 transition-all" title="Reset view">
            <Maximize2 size={14} />
          </button>
        </div>
      </div>

      {/* Canvas area */}
      <div className="relative flex-1 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ cursor: 'grab', background: 'radial-gradient(ellipse at 50% 40%, #1a0a2e 0%, #0a0c12 70%)' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onWheel={onWheel}
        />

        {/* Legend */}
        <div className="absolute bottom-6 left-6 glass rounded-xl border border-white/8 px-4 py-3 flex flex-col gap-2">
          <p className="text-[10px] text-white/40 uppercase tracking-wider font-600 mb-1">Legend</p>
          {legend.map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: l.color, boxShadow: `0 0 6px ${l.color}` }} />
              <span className="text-xs text-white/60">{l.label}</span>
            </div>
          ))}
        </div>

        {/* Hint */}
        <div className="absolute bottom-6 right-6 glass rounded-xl border border-white/8 px-3 py-2 flex items-center gap-2">
          <Info size={12} className="text-white/30" />
          <span className="text-[11px] text-white/35">Drag nodes · Scroll to zoom · Pan canvas</span>
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute pointer-events-none glass rounded-xl border border-white/10 px-3 py-2.5 text-xs shadow-xl"
            style={{ left: tooltip.x + 16, top: tooltip.y - 10, zIndex: 50 }}
          >
            <p className="font-600 text-white mb-1">{tooltip.node.label}</p>
            <p className="text-white/50 capitalize">{tooltip.node.type}</p>
          </div>
        )}

        {/* Loading overlay */}
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0a0c12]/80">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
              <p className="text-sm text-white/50">Building topology graph…</p>
            </div>
          </div>
        )}
      </div>

      {/* Stats bar */}
      {persona && (
        <div className="flex items-center gap-6 px-6 py-3 border-t border-white/8 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-xs text-white/40">Nodes: <span className="text-white/70">{nodesRef.current.length}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs text-white/40">Edges: <span className="text-white/70">{edgesRef.current.length}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            <span className="text-xs text-white/40">Channels: <span className="text-white/70">{persona.channels.length}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs text-white/40">Knowledge: <span className="text-white/70">{persona.knowledgeChunks.toLocaleString()} chunks</span></span>
          </div>
        </div>
      )}
    </div>
  );
}
