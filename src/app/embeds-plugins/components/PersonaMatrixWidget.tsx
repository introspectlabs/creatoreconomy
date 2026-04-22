'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Mic, MicOff, Video, MessageSquare, ChevronDown, Sparkles, Wifi, WifiOff, Volume2, VolumeX, Maximize2, Minimize2, Zap, Bot, PhoneOff, AlertCircle, Loader2, History, X, Clock, User } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface WidgetConfig {
  personaId: string;
  apiKey?: string;
  personaName?: string;
  personaAvatar?: string;
  personaRole?: string;
  greeting?: string;
  suggestedPrompts?: string[];
  theme?: 'dark' | 'light';
  position?: 'bottom-right' | 'bottom-left';
  primaryColor?: string;
  modes?: ('chat' | 'voice' | 'avatar')[];
  onMessage?: (msg: { role: string; content: string }) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onModeChange?: (mode: string) => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  mode?: 'chat' | 'voice' | 'avatar';
}

// ─── Glowing Orbit Launcher ───────────────────────────────────────────────────
function GlowingOrbitLauncher({ isActive, isListening, size = 64 }: {
  isActive: boolean;
  isListening: boolean;
  size?: number;
}) {
  const isMini = size <= 40;
  const faceSize = isMini ? size * 0.72 : size * 0.68;
  const orbit1R = isMini ? size * 0.44 : size * 0.42;
  const orbit2R = isMini ? size * 0.50 : size * 0.49;
  const center = size / 2;

  // ── Micro-expression state ──
  const [microExpr, setMicroExpr] = React.useState<'none' | 'eyebrow' | 'smile' | 'smileWide'>('none');

  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    function scheduleNext() {
      // Random delay between 4s and 9s
      const delay = 4000 + Math.random() * 5000;
      timeout = setTimeout(() => {
        const expressions: Array<'eyebrow' | 'smile' | 'smileWide'> = ['eyebrow', 'smile', 'smileWide'];
        const pick = expressions[Math.floor(Math.random() * expressions.length)];
        setMicroExpr(pick);
        // Hold expression for 1.2–2s then reset
        setTimeout(() => {
          setMicroExpr('none');
          scheduleNext();
        }, 1200 + Math.random() * 800);
      }, delay);
    }
    scheduleNext();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Outer ambient glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: isListening
            ? 'radial-gradient(circle, rgba(232,160,32,0.45) 0%, rgba(123,111,212,0.25) 55%, transparent 75%)'
            : 'radial-gradient(circle, rgba(232,160,32,0.28) 0%, rgba(123,111,212,0.15) 55%, transparent 75%)',
          animation: 'pmGlowPulse 3s ease-in-out infinite',
        }}
      />

      {/* SVG orbit rings */}
      <svg
        className="absolute inset-0"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8A020" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#7B6FD4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="orbitGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#E8A020" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7B6FD4" stopOpacity="0.0" />
          </linearGradient>
          <filter id="orbitGlow">
            <feGaussianBlur stdDeviation={isMini ? '0.8' : '1.2'} result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Orbit ring 1 — rotates clockwise */}
        <g style={{ transformOrigin: `${center}px ${center}px`, animation: 'pmOrbit1 4s linear infinite' }}>
          <circle
            cx={center}
            cy={center}
            r={orbit1R}
            fill="none"
            stroke="url(#orbitGrad1)"
            strokeWidth={isMini ? '1.2' : '1.5'}
            strokeDasharray={`${orbit1R * 1.6} ${orbit1R * 4.7}`}
            strokeLinecap="round"
            filter="url(#orbitGlow)"
            opacity={isActive ? 1 : 0.75}
          />
          <circle
            cx={center + orbit1R}
            cy={center}
            r={isMini ? 1.5 : 2}
            fill="#E8A020"
            filter="url(#orbitGlow)"
            opacity={0.95}
          />
        </g>

        {/* Orbit ring 2 — rotates counter-clockwise, tilted */}
        <g style={{ transformOrigin: `${center}px ${center}px`, animation: 'pmOrbit2 5.5s linear infinite' }}>
          <ellipse
            cx={center}
            cy={center}
            rx={orbit2R}
            ry={orbit2R * 0.38}
            fill="none"
            stroke="url(#orbitGrad2)"
            strokeWidth={isMini ? '1' : '1.2'}
            strokeDasharray={`${orbit2R * 1.2} ${orbit2R * 5}`}
            strokeLinecap="round"
            filter="url(#orbitGlow)"
            opacity={isActive ? 0.9 : 0.6}
          />
          <ellipse
            cx={center + orbit2R}
            cy={center}
            rx={isMini ? 1.2 : 1.8}
            ry={isMini ? 1.2 : 1.8}
            fill="#4ECDC4"
            filter="url(#orbitGlow)"
            opacity={0.9}
          />
        </g>

        {/* Listening pulse rings */}
        {isListening && (
          <>
            <circle cx={center} cy={center} r={orbit2R + (isMini ? 3 : 5)} fill="none" stroke="rgba(232,160,32,0.35)" strokeWidth="1"
              style={{ animation: 'pmListenPulse 1.4s ease-out infinite' }} />
            <circle cx={center} cy={center} r={orbit2R + (isMini ? 6 : 9)} fill="none" stroke="rgba(232,160,32,0.18)" strokeWidth="0.8"
              style={{ animation: 'pmListenPulse 1.4s ease-out 0.5s infinite' }} />
          </>
        )}
      </svg>

      {/* ── Shoulder sway + breathing wrapper ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          animation: 'pmShoulderSway 7s ease-in-out infinite',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* ── Head tilt + idle float wrapper ── */}
        <div
          style={{
            animation: 'pmIdleFloat 4s ease-in-out infinite, pmHeadTilt 9s ease-in-out infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* ── Breathing chest scale wrapper ── */}
          <div
            style={{
              width: faceSize,
              height: faceSize,
              animation: 'pmBreathing 3.8s ease-in-out infinite',
              borderRadius: '50%',
              border: isActive
                ? `${isMini ? 1.5 : 2}px solid rgba(232,160,32,0.7)`
                : `${isMini ? 1 : 1.5}px solid rgba(232,160,32,0.4)`,
              boxShadow: isActive
                ? `0 0 ${isMini ? 8 : 14}px rgba(232,160,32,0.55), 0 0 ${isMini ? 20 : 32}px rgba(123,111,212,0.25)`
                : `0 0 ${isMini ? 5 : 10}px rgba(232,160,32,0.3)`,
              overflow: 'hidden',
              flexShrink: 0,
              position: 'relative',
            }}
          >
            {/* Real photo */}
            <img
              src="/assets/images/persona_real_face.png"
              alt="AI Persona"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
                borderRadius: '50%',
              }}
            />

            {/* ── Micro-expression: eyebrow raise overlay ── */}
            {microExpr === 'eyebrow' && (
              <div
                style={{
                  position: 'absolute',
                  top: '20%',
                  left: '8%',
                  width: '84%',
                  height: '12%',
                  pointerEvents: 'none',
                  animation: 'pmEyebrowRaise 0.35s ease-out forwards',
                }}
              >
                {/* Left brow lift */}
                <div style={{
                  position: 'absolute',
                  left: '6%',
                  top: 0,
                  width: '36%',
                  height: '40%',
                  borderRadius: '50% 50% 0 0',
                  background: 'rgba(60,30,10,0.18)',
                  transform: 'translateY(-2px)',
                }} />
                {/* Right brow lift */}
                <div style={{
                  position: 'absolute',
                  right: '6%',
                  top: 0,
                  width: '36%',
                  height: '40%',
                  borderRadius: '50% 50% 0 0',
                  background: 'rgba(60,30,10,0.18)',
                  transform: 'translateY(-2px)',
                }} />
              </div>
            )}

            {/* ── Micro-expression: gentle smile ── */}
            {(microExpr === 'smile' || microExpr === 'smileWide') && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '22%',
                  left: '25%',
                  width: '50%',
                  height: '10%',
                  pointerEvents: 'none',
                  animation: 'pmSmileIn 0.3s ease-out forwards',
                }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '0 0 50% 50%',
                  background: microExpr === 'smileWide' ?'rgba(232,160,32,0.22)' :'rgba(232,160,32,0.14)',
                  boxShadow: '0 2px 6px rgba(232,160,32,0.15)',
                }} />
              </div>
            )}

            {/* Subtle shimmer overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(123,111,212,0.08) 100%)',
                animation: 'pmShimmer 6s ease-in-out infinite',
                pointerEvents: 'none',
              }}
            />

            {/* Listening active glow ring */}
            {isListening && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '2px solid rgba(232,160,32,0.6)',
                  animation: 'pmListenPulse 1.4s ease-out infinite',
                  pointerEvents: 'none',
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Active indicator dot */}
      {isActive && !isMini && (
        <div
          className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full border-2 border-[#0b0d14]"
          style={{
            background: '#22c55e',
            boxShadow: '0 0 6px rgba(34,197,94,0.7)',
            zIndex: 3,
          }}
        />
      )}
    </div>
  );
}

// ─── CSS Fallback Orb (kept for reference, now uses same face-based design) ────
function FallbackOrb({ isActive, isListening }: { isActive: boolean; isListening: boolean }) {
  return <GlowingOrbitLauncher isActive={isActive} isListening={isListening} size={64} />;
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div
        className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #E8A020, #7B6FD4)' }}
      >
        <Bot size={12} className="text-white/60" />
      </div>
      <div
        className="px-3 py-2.5 rounded-2xl rounded-bl-sm"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: '#E8A020',
                animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Voice Visualizer ─────────────────────────────────────────────────────────
function VoiceVisualizer({ isActive }: { isActive: boolean }) {
  const bars = Array.from({ length: 16 }, (_, i) => i);
  return (
    <div className="flex items-center justify-center gap-0.5 w-full" style={{ height: 'clamp(36px, 8vw, 48px)' }}>
      {bars.map((i) => (
        <div
          key={i}
          className="flex-1 max-w-[6px] rounded-full transition-all"
          style={{
            background: isActive
              ? `rgba(232,160,32,${0.4 + Math.random() * 0.6})`
              : 'rgba(255,255,255,0.15)',
            height: isActive
              ? `${20 + Math.sin(i * 0.8) * 15 + Math.random() * 20}px`
              : '4px',
            animation: isActive ? `voiceBar ${0.4 + (i % 5) * 0.1}s ease-in-out infinite alternate` : 'none',
          }}
        />
      ))}
    </div>
  );
}

// ─── Avatar Stream Panel ──────────────────────────────────────────────────────
function AvatarPanel({ isStreaming, onStart, onEnd, personaName, isDark, textPrimary, textMuted, borderColor, surfaceBg, userMsgBg, messages, conversationUrl, isLoading, sessionError, isMuted, onToggleMute }: {
  isStreaming: boolean;
  onStart: () => void;
  onEnd: () => void;
  personaName: string;
  isDark: boolean;
  textPrimary: string;
  textMuted: string;
  borderColor: string;
  surfaceBg: string;
  userMsgBg: string;
  messages: Array<{ id: string; role: string; content: string }>;
  conversationUrl: string | null;
  isLoading: boolean;
  sessionError: string | null;
  isMuted: boolean;
  onToggleMute: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Video stream area */}
      <div
        className="relative rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, rgba(123,111,212,0.12), rgba(78,205,196,0.08))',
          border: `1px solid ${isStreaming ? 'rgba(78,205,196,0.4)' : borderColor}`,
          height: 'min(220px, 40vh)',
          boxShadow: isStreaming ? '0 0 24px rgba(78,205,196,0.15)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {isLoading ? (
          /* Loading state */
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={28} className="text-teal-400 animate-spin" />
            <p className="text-xs" style={{ color: textMuted }}>Starting avatar session…</p>
          </div>
        ) : sessionError ? (
          /* Error state */
          <div className="flex flex-col items-center gap-3 px-5 text-center">
            <AlertCircle size={24} className="text-red-400 flex-shrink-0" />
            <p className="text-xs text-red-400 leading-relaxed">{sessionError}</p>
            <button
              onClick={onStart}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-500 text-white transition-all"
              style={{ background: 'rgba(239,68,68,0.25)', border: '1px solid rgba(239,68,68,0.4)' }}
            >
              Retry
            </button>
          </div>
        ) : isStreaming && conversationUrl ? (
          <>
            {/* Live Tavus iframe */}
            <iframe
              src={conversationUrl}
              allow="camera; microphone; fullscreen; display-capture"
              className="absolute inset-0 w-full h-full border-none"
              title={`${personaName} avatar session`}
            />

            {/* LIVE badge */}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded-lg pointer-events-none" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', zIndex: 10 }}>
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              <span className="text-[10px] text-white/80 font-mono font-semibold tracking-wider">LIVE</span>
            </div>

            {/* Tavus badge */}
            <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-lg pointer-events-none" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', zIndex: 10 }}>
              <span className="text-[9px] text-white/50 font-mono">Tavus</span>
            </div>

            {/* Session controls */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between" style={{ zIndex: 10 }}>
              {/* Mute toggle */}
              <button
                onClick={onToggleMute}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-500 text-white transition-all"
                style={{
                  background: isMuted ? 'rgba(239,68,68,0.6)' : 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${isMuted ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.15)'}`,
                }}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MicOff size={10} /> : <Mic size={10} />}
                {isMuted ? 'Unmute' : 'Mute'}
              </button>

              {/* End session */}
              <button
                onClick={onEnd}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-500 text-white transition-all"
                style={{
                  background: 'rgba(239,68,68,0.7)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(239,68,68,0.4)',
                }}
                aria-label="End avatar session"
                title="End session"
              >
                <PhoneOff size={10} />
                End Session
              </button>
            </div>
          </>
        ) : (
          /* Idle state */
          <div className="flex flex-col items-center gap-3 px-4">
            {/* Persona avatar preview */}
            <div
              className="relative w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(123,111,212,0.25), rgba(78,205,196,0.15))',
                border: '1.5px solid rgba(123,111,212,0.4)',
                boxShadow: '0 0 20px rgba(123,111,212,0.2)',
              }}
            >
              <svg viewBox="0 0 40 44" style={{ width: 28, height: 28 }}>
                <circle cx="20" cy="12" r="8" fill="url(#idleGrad)" />
                <rect x="17" y="19" width="6" height="5" rx="2" fill="url(#idleGrad)" />
                <path d="M4 38 Q4 28 20 26 Q36 28 36 38 Z" fill="url(#idleGrad)" />
                <defs>
                  <linearGradient id="idleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7B6FD4" />
                    <stop offset="100%" stopColor="#4ECDC4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0b0d14] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs font-600 mb-0.5" style={{ color: textPrimary }}>{personaName}</p>
              <p className="text-[10px]" style={{ color: textMuted }}>AI Avatar · Ready to connect</p>
            </div>

            <button
              onClick={onStart}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-600 text-white transition-all"
              style={{
                background: 'linear-gradient(135deg, #7B6FD4, #4ECDC4)',
                boxShadow: '0 4px 16px rgba(123,111,212,0.4)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.03)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
            >
              <Video size={12} />
              Start Avatar Session
            </button>
            <p className="text-[9px]" style={{ color: textMuted }}>Powered by <span style={{ color: '#4ECDC4' }}>Tavus</span></p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Chat History Sidebar ─────────────────────────────────────────────────────
function ChatHistorySidebar({
  messages,
  isOpen,
  onClose,
  isDark,
  textPrimary,
  textMuted,
  borderColor,
  surfaceBg,
  userMsgBg,
  personaName,
}: {
  messages: Message[];
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  textPrimary: string;
  textMuted: string;
  borderColor: string;
  surfaceBg: string;
  userMsgBg: string;
  personaName: string;
}) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-10 flex flex-col"
      style={{
        background: isDark ? 'rgba(11,13,20,0.98)' : 'rgba(255,255,255,0.98)',
        animation: 'pmHistorySlideIn 0.22s cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      {/* Sidebar Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(232,160,32,0.08), rgba(123,111,212,0.06))'
            : 'linear-gradient(135deg, rgba(232,160,32,0.06), rgba(123,111,212,0.04))',
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <div className="flex items-center gap-2">
          <History size={14} style={{ color: '#E8A020' }} />
          <span className="text-sm font-600" style={{ color: textPrimary }}>Chat History</span>
          <span
            className="text-[10px] px-1.5 py-0.5 rounded-full"
            style={{ background: 'rgba(232,160,32,0.15)', color: '#E8A020', border: '1px solid rgba(232,160,32,0.25)' }}
          >
            {messages.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/8"
          aria-label="Close history"
        >
          <X size={13} style={{ color: textMuted }} />
        </button>
      </div>

      {/* Session label */}
      <div
        className="flex items-center gap-1.5 px-4 py-2 flex-shrink-0"
        style={{ borderBottom: `1px solid ${borderColor}` }}
      >
        <Clock size={10} style={{ color: textMuted }} />
        <span className="text-[10px]" style={{ color: textMuted }}>Current session</span>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-auto" style={{ animation: 'pulse-green 2s infinite' }} />
        <span className="text-[10px]" style={{ color: textMuted }}>Live</span>
      </div>

      {/* Messages list */}
      <div
        className="flex-1 overflow-y-auto py-3 px-3 space-y-2"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent' }}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 py-8">
            <MessageSquare size={24} style={{ color: textMuted, opacity: 0.4 }} />
            <p className="text-xs text-center" style={{ color: textMuted }}>No messages yet</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={msg.id}
              className="rounded-xl p-2.5 transition-all"
              style={{
                background: msg.role === 'user' ?'rgba(232,160,32,0.07)'
                  : surfaceBg,
                border: `1px solid ${msg.role === 'user' ? 'rgba(232,160,32,0.18)' : borderColor}`,
              }}
            >
              {/* Sender row */}
              <div className="flex items-center gap-1.5 mb-1.5">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: msg.role === 'user' ?'linear-gradient(135deg, #E8A020, #C98A10)' :'linear-gradient(135deg, #7B6FD4, #4ECDC4)',
                  }}
                >
                  {msg.role === 'user'
                    ? <User size={8} className="text-white" />
                    : <Bot size={8} className="text-white" />
                  }
                </div>
                <span className="text-[10px] font-600" style={{ color: msg.role === 'user' ? '#E8A020' : '#7B6FD4' }}>
                  {msg.role === 'user' ? 'You' : personaName}
                </span>
                {msg.mode && (
                  <span
                    className="text-[9px] px-1 py-0.5 rounded"
                    style={{ background: 'rgba(255,255,255,0.06)', color: textMuted }}
                  >
                    {msg.mode}
                  </span>
                )}
                <span className="text-[9px] ml-auto flex-shrink-0" style={{ color: textMuted }}>
                  {formatDate(msg.timestamp)}
                </span>
              </div>

              {/* Message content */}
              <p
                className="text-[11px] leading-relaxed line-clamp-3"
                style={{ color: textPrimary }}
              >
                {msg.content}
              </p>

              {/* Timestamp */}
              <div className="flex items-center gap-1 mt-1.5">
                <Clock size={8} style={{ color: textMuted }} />
                <span className="text-[9px]" style={{ color: textMuted }}>
                  {formatTime(msg.timestamp)}
                </span>
                <span className="text-[9px] ml-auto" style={{ color: textMuted }}>
                  #{idx + 1}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer stats */}
      <div
        className="flex items-center justify-between px-4 py-2 flex-shrink-0"
        style={{ borderTop: `1px solid ${borderColor}` }}
      >
        <span className="text-[10px]" style={{ color: textMuted }}>
          {messages.filter(m => m.role === 'user').length} sent · {messages.filter(m => m.role === 'assistant').length} received
        </span>
        <span className="text-[10px]" style={{ color: textMuted }}>
          Session only
        </span>
      </div>
    </div>
  );
}

// ─── Main Widget Component ────────────────────────────────────────────────────
export default function PersonaMatrixWidget({
  config,
  defaultOpen = false,
}: {
  config: WidgetConfig;
  defaultOpen?: boolean;
}) {
  const {
    personaName = 'AI Assistant',
    personaRole = 'Powered by PersonaMatrix',
    greeting = 'Hi there! 👋 How can I help you today?',
    suggestedPrompts = [
      'Tell me about your features',
      'How do I get started?',
      'What can you help me with?',
    ],
    theme = 'dark',
    position = 'bottom-right',
    modes = ['chat', 'voice', 'avatar'],
  } = config;

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeMode, setActiveMode] = useState<'chat' | 'voice' | 'avatar'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'assistant',
      content: greeting,
      timestamp: new Date(),
      mode: 'chat',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceMuted, setIsVoiceMuted] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isAvatarStreaming, setIsAvatarStreaming] = useState(false);
  const [tavusConversationId, setTavusConversationId] = useState<string | null>(null);
  const [tavusConversationUrl, setTavusConversationUrl] = useState<string | null>(null);
  const [tavusLoading, setTavusLoading] = useState(false);
  const [tavusError, setTavusError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [showPrompts, setShowPrompts] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showHistory, setShowHistory] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Check WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebglSupported(!!gl);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Unread count when closed
  useEffect(() => {
    if (!isOpen) {
      const assistantMsgs = messages.filter(m => m.role === 'assistant').length;
      setUnreadCount(Math.max(0, assistantMsgs - 1));
    } else {
      setUnreadCount(0);
    }
  }, [isOpen, messages]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setUnreadCount(0);
    config.onOpen?.();
    setTimeout(() => inputRef.current?.focus(), 300);
  }, [config]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    config.onClose?.();
  }, [config]);

  const handleModeChange = useCallback((mode: 'chat' | 'voice' | 'avatar') => {
    setActiveMode(mode);
    config.onModeChange?.(mode);
    if (mode !== 'voice') setIsListening(false);
    if (mode === 'voice') {
      setIsListening(false);
      setIsVoiceMuted(true);
    }
  }, [config, isAvatarStreaming, tavusConversationId]);

  const handleStartAvatarSession = useCallback(async () => {
    setTavusLoading(true);
    setTavusError(null);
    try {
      const res = await fetch('/api/tavus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          persona_id: config.personaId,
          conversation_name: `${config.personaName || 'AI Assistant'} Chat`,
          custom_greeting: config.greeting,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setTavusError(data?.error || 'Failed to start avatar session');
        setTavusLoading(false);
        return;
      }
      setTavusConversationId(data.conversation_id);
      setTavusConversationUrl(data.conversation_url);
      setIsAvatarStreaming(true);
    } catch {
      setTavusError('Network error — could not start avatar session');
    } finally {
      setTavusLoading(false);
    }
  }, [config]);

  const handleEndAvatarSession = useCallback(async () => {
    if (tavusConversationId) {
      try {
        await fetch('/api/tavus', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'end', conversation_id: tavusConversationId }),
        });
      } catch {
        // Silently ignore end errors
      }
    }
    setIsAvatarStreaming(false);
    setTavusConversationUrl(null);
    setTavusConversationId(null);
    setTavusError(null);
  }, [tavusConversationId]);

  const simulateResponse = useCallback((userMsg: string) => {
    setIsTyping(true);
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const responses = [
        `Great question! I'm here to help you with "${userMsg}". Let me provide you with the most relevant information based on my knowledge base.`,
        `Thanks for asking about "${userMsg}". I can assist you with that. Here's what I know from my training data and connected knowledge sources.`,
        `I understand you're asking about "${userMsg}". Based on my persona configuration, I can offer detailed guidance on this topic.`,
        `Absolutely! Regarding "${userMsg}" — I have comprehensive information that should help you make the best decision.`,
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];
      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        mode: activeMode,
      };
      setMessages(prev => [...prev, newMsg]);
      setIsTyping(false);
      config.onMessage?.({ role: 'assistant', content: response });
    }, delay);
  }, [activeMode, config]);

  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text || !isOnline) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
      mode: activeMode,
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setShowPrompts(false);
    config.onMessage?.({ role: 'user', content: text });
    simulateResponse(text);
  }, [inputValue, isOnline, activeMode, config, simulateResponse]);

  const handlePromptClick = useCallback((prompt: string) => {
    setInputValue(prompt);
    setShowPrompts(false);
    setTimeout(() => {
      const userMsg: Message = {
        id: `msg-${Date.now()}`,
        role: 'user',
        content: prompt,
        timestamp: new Date(),
        mode: activeMode,
      };
      setMessages(prev => [...prev, userMsg]);
      config.onMessage?.({ role: 'user', content: prompt });
      simulateResponse(prompt);
    }, 100);
  }, [activeMode, config, simulateResponse]);

  const handleVoiceToggle = useCallback(() => {
    if (isVoiceMuted) {
      setIsVoiceMuted(false);
      return;
    }
    setIsListening(prev => !prev);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        const voiceMsg: Message = {
          id: `msg-${Date.now()}`,
          role: 'user',
          content: '🎤 [Voice message transcribed]',
          timestamp: new Date(),
          mode: 'voice',
        };
        setMessages(prev => [...prev, voiceMsg]);
        simulateResponse('voice query');
      }, 3000);
    }
  }, [isListening, simulateResponse]);

  const positionClass = position === 'bottom-left' ? 'left-5' : 'right-5';
  const expandedWidth = isExpanded ? '480px' : '380px';
  const expandedHeight = isExpanded ? '620px' : '520px';

  const isDark = theme === 'dark';
  const bg = isDark ? 'rgba(11,13,20,0.97)' : 'rgba(255,255,255,0.97)';
  const textPrimary = isDark ? 'rgba(255,255,255,0.92)' : 'rgba(0,0,0,0.87)';
  const textMuted = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const surfaceBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
  const userMsgBg = 'linear-gradient(135deg, #E8A020, #C98A10)';
  const assistantMsgBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  return (
    <>
      {/* Keyframe styles injected inline */}
      <style>{`
        @keyframes pmWidgetSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pmBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes voiceBar {
          from { transform: scaleY(0.3); }
          to { transform: scaleY(1); }
        }
        @keyframes avatarPulse {
          0%, 100%  { transform: scale(1); box-shadow: 0 0 40px rgba(123,111,212,0.5); }
          50% { transform: scale(1.05); box-shadow: 0 0 60px rgba(123,111,212,0.7); }
        }
        @keyframes pmOrbFloat {
          0%, 100%  { transform: translateY(0px); }
          33% { transform: translateY(-1.5px) scale(1.008); }
          66% { transform: translateY(0.8px) scale(0.994); }
        }
        @keyframes pmRipple {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes pmOrbit1 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pmOrbit2 {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes pmIdleFloat {
          0%, 100%  { transform: translateY(0px) scale(1); }
          33% { transform: translateY(-1.5px) scale(1.008); }
          66% { transform: translateY(0.8px) scale(0.994); }
        }
        @keyframes pmGlowPulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes pmShimmer {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        @keyframes pmListenPulse {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes pmHeadTilt {
          0%   { opacity: 0; transform: rotate(0deg); }
          30%  { opacity: 1; transform: rotate(-2.5deg); }
          70%  { opacity: 1; transform: rotate(0deg); }
          100% { opacity: 0; transform: rotate(0deg); }
        }
        @keyframes pmShoulderSway {
          0%, 100%  { transform: translateX(0px); }
          25%       { transform: translateX(-1.2px); }
          75%       { transform: translateX(1.2px); }
        }
        @keyframes pmBreathing {
          0%, 100%  { transform: scale(1); }
          40%       { transform: scale(1.018); }
          60%       { transform: scale(1.012); }
        }
        @keyframes pmEyebrowRaise {
          0%   { opacity: 0; transform: translateY(0px); }
          30%  { opacity: 1; transform: translateY(-2.5px); }
          70%  { opacity: 1; transform: translateY(-2.5px); }
          100% { opacity: 0; transform: translateY(0px); }
        }
        @keyframes pmSmileIn {
          0%   { opacity: 0; transform: scaleX(0.6); }
          40%  { opacity: 1; transform: scaleX(1); }
          70%  { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0; transform: scaleX(0.6); }
        }
        @keyframes pmHistorySlideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* ── Launcher Button ── */}
      {!isOpen && (
        <div
          className={`fixed bottom-5 ${positionClass} z-[9999]`}
        >
          <button
            onClick={handleOpen}
            aria-label="Open AI Assistant"
            aria-haspopup="dialog"
            className="relative flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-transparent pm-orb-float"
            style={{ background: 'transparent', width: 72, height: 72 }}
          >
            {/* Ripple rings */}
            <div className="pm-ripple" />
            <div className="pm-ripple-2" />
            <div className="pm-ripple-3" />

            {/* Glowing Orbit with human face */}
            <GlowingOrbitLauncher isActive={true} isListening={isListening} size={72} />

            {/* Unread badge */}
            {unreadCount > 0 && (
              <div
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-700 text-white"
                style={{ background: '#E8A020', boxShadow: '0 2px 8px rgba(232,160,32,0.5)', zIndex: 10 }}
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </div>
            )}

            {/* Offline indicator */}
            {!isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center" style={{ zIndex: 10 }}>
                <WifiOff size={8} className="text-white" />
              </div>
            )}
          </button>
        </div>
      )}

      {/* ── Chat Panel ── */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI Assistant Chat"
          aria-modal="true"
          className={`fixed bottom-5 ${positionClass} z-[9999] flex flex-col rounded-2xl overflow-hidden`}
          style={{
            width: `min(${expandedWidth}, calc(100vw - 24px))`,
            height: `min(${expandedHeight}, calc(100dvh - 80px))`,
            background: bg,
            border: `1px solid ${borderColor}`,
            boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            animation: 'pmWidgetSlideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transition: 'width 0.3s ease, height 0.3s ease',
          }}
        >
          {/* ── Header ── */}
          <div
            className="flex items-center gap-2 px-3 py-2.5 flex-shrink-0"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(232,160,32,0.08), rgba(123,111,212,0.06))'
                : 'linear-gradient(135deg, rgba(232,160,32,0.06), rgba(123,111,212,0.04))',
              borderBottom: `1px solid ${borderColor}`,
            }}
          >
            {/* Orb mini */}
            <div className="flex-shrink-0">
              <GlowingOrbitLauncher isActive={true} isListening={isListening} size={32} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-600 truncate" style={{ color: textPrimary }}>
                  {personaName}
                </p>
                {isOnline && (
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" style={{ animation: 'pulse-green 2s infinite' }} />
                )}
              </div>
              <p className="text-[10px] truncate" style={{ color: textMuted }}>
                {isOnline ? personaRole : '⚠ Offline — reconnecting...'}
              </p>
            </div>

            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setShowHistory(h => !h)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-500 text-white transition-all"
                style={{
                  background: showHistory ? 'rgba(232,160,32,0.15)' : 'transparent',
                  border: showHistory ? '1px solid rgba(232,160,32,0.3)' : '1px solid transparent',
                }}
                title={showHistory ? 'Hide history' : 'Show history'}
              >
                <History size={13} />
                {isExpanded && <span className="hidden sm:inline">{showHistory ? 'Hide' : 'Show'}</span>}
              </button>

              {/* Mute toggle */}
              <button
                onClick={() => setIsMuted(m => !m)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-500 text-white transition-all"
                style={{
                  background: isMuted ? 'rgba(239,68,68,0.15)' : 'transparent',
                  border: isMuted ? '1px solid rgba(239,68,68,0.3)' : '1px solid transparent',
                }}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                {isExpanded && <span className="hidden sm:inline">{isMuted ? 'Unmute' : 'Mute'}</span>}
              </button>

              <button
                onClick={() => setIsExpanded(e => !e)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-500 text-white transition-all"
                style={{
                  background: isExpanded ? 'rgba(123,111,212,0.15)' : 'transparent',
                  border: isExpanded ? '1px solid rgba(123,111,212,0.3)' : '1px solid transparent',
                }}
                aria-label={isExpanded ? 'Minimize' : 'Expand'}
                title={isExpanded ? 'Minimize' : 'Expand'}
              >
                {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                {isExpanded && <span className="hidden sm:inline">{isExpanded ? 'Minimize' : 'Expand'}</span>}
              </button>

              <button
                onClick={handleClose}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-500 text-white transition-all"
                style={{
                  background: 'rgba(239,68,68,0.15)',
                  border: '1px solid rgba(239,68,68,0.4)',
                }}
                aria-label="Close chat"
                title="Close"
              >
                <ChevronDown size={14} />
                {isExpanded && <span className="hidden sm:inline">Close</span>}
              </button>
            </div>
          </div>

          {/* ── Mode Tabs ── */}
          {modes.length > 1 && (
            <div
              className="flex items-center gap-0.5 px-3 py-1.5 flex-shrink-0"
              style={{ borderBottom: `1px solid ${borderColor}` }}
              role="tablist"
              aria-label="Chat modes"
            >
              {modes.includes('chat') && (
                <button
                  role="tab"
                  aria-selected={activeMode === 'chat'}
                  onClick={() => handleModeChange('chat')}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-500 transition-all"
                  title={!isExpanded ? 'Chat' : undefined}
                  style={{
                    background: activeMode === 'chat' ? 'rgba(232,160,32,0.15)' : 'transparent',
                    color: activeMode === 'chat' ? '#E8A020' : textMuted,
                    border: activeMode === 'chat' ? '1px solid rgba(232,160,32,0.3)' : '1px solid transparent',
                  }}
                >
                  <MessageSquare size={11} />
                  {isExpanded && <span>Chat</span>}
                </button>
              )}
              {modes.includes('voice') && (
                <button
                  role="tab"
                  aria-selected={activeMode === 'voice'}
                  onClick={() => handleModeChange('voice')}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-500 transition-all"
                  title={!isExpanded ? 'Voice' : undefined}
                  style={{
                    background: activeMode === 'voice' ? 'rgba(123,111,212,0.15)' : 'transparent',
                    color: activeMode === 'voice' ? '#7B6FD4' : textMuted,
                    border: activeMode === 'voice' ? '1px solid rgba(123,111,212,0.3)' : '1px solid transparent',
                  }}
                >
                  <Mic size={11} />
                  {isExpanded && <span>Voice</span>}
                </button>
              )}
              {modes.includes('avatar') && (
                <button
                  role="tab"
                  aria-selected={activeMode === 'avatar'}
                  onClick={() => handleModeChange('avatar')}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-500 transition-all"
                  title={!isExpanded ? 'Avatar' : undefined}
                  style={{
                    background: activeMode === 'avatar' ? 'rgba(78,205,196,0.15)' : 'transparent',
                    color: activeMode === 'avatar' ? '#4ECDC4' : textMuted,
                    border: activeMode === 'avatar' ? '1px solid rgba(78,205,196,0.3)' : '1px solid transparent',
                  }}
                >
                  <Video size={11} />
                  {isExpanded && <span>Avatar</span>}
                </button>
              )}
            </div>
          )}

          {/* ── Offline Banner ── */}
          {!isOnline && (
            <div
              className="flex items-center gap-2 px-4 py-2 flex-shrink-0"
              style={{ background: 'rgba(239,68,68,0.1)', borderBottom: '1px solid rgba(239,68,68,0.2)' }}
              role="alert"
            >
              <WifiOff size={12} className="text-red-400 flex-shrink-0" />
              <p className="text-xs text-red-400 leading-relaxed">{sessionError}</p>
            </div>
          )}

          {/* ── Content Area ── */}
          <div className="flex-1 overflow-hidden flex flex-col min-h-0 relative">

            {/* Chat History Sidebar (overlay) */}
            <ChatHistorySidebar
              messages={messages}
              isOpen={showHistory}
              onClose={() => setShowHistory(false)}
              isDark={isDark}
              textPrimary={textPrimary}
              textMuted={textMuted}
              borderColor={borderColor}
              surfaceBg={surfaceBg}
              userMsgBg={userMsgBg}
              personaName={personaName}
            />

            {/* Chat Mode */}
            {activeMode === 'chat' && (
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto px-3 py-3 space-y-1"
                style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
                aria-live="polite"
                aria-label="Chat messages"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 mb-2.5 ${msg.role === 'user' ? 'flex-row-reverse pm-msg-user' : 'pm-msg-assistant'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div
                        className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #E8A020, #7B6FD4)' }}
                        aria-hidden="true"
                      >
                        <Bot size={12} className="text-white" />
                      </div>
                    )}
                    <div
                      className="max-w-[82%] px-2.5 py-2 rounded-2xl text-xs leading-relaxed"
                      style={{
                        background: msg.role === 'user' ? userMsgBg : assistantMsgBg,
                        color: msg.role === 'user' ? '#fff' : textPrimary,
                        border: msg.role === 'assistant' ? `1px solid ${borderColor}` : 'none',
                        borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isTyping && <TypingIndicator />}

                {/* Suggested Prompts */}
                {showPrompts && messages.length <= 1 && (
                  <div className="mt-2 space-y-1.5">
                    <p className="text-[11px] flex items-center gap-1" style={{ color: textMuted }}>
                      <Sparkles size={10} /> Suggested questions
                    </p>
                    {suggestedPrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handlePromptClick(prompt)}
                        className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs transition-all"
                        style={{
                          background: surfaceBg,
                          border: `1px solid ${borderColor}`,
                          color: textPrimary,
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(232,160,32,0.4)';
                          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(232,160,32,0.06)';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = borderColor;
                          (e.currentTarget as HTMLButtonElement).style.background = surfaceBg;
                        }}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Voice Mode */}
            {activeMode === 'voice' && (
              <div className="flex-1 flex flex-col items-center px-4 py-4 gap-4 overflow-y-auto min-h-0">
                <div
                  className="rounded-full flex-shrink-0"
                  style={{
                    border: `2px solid ${isListening && !isVoiceMuted ? 'rgba(123,111,212,0.6)' : 'transparent'}`,
                    boxShadow: isListening && !isVoiceMuted ? '0 0 40px rgba(123,111,212,0.4)' : 'none',
                    transition: 'all 0.3s ease',
                    borderRadius: '50%',
                  }}
                >
                  <GlowingOrbitLauncher isActive={isListening && !isVoiceMuted} isListening={isListening && !isVoiceMuted} size={80} />
                </div>

                <div className="text-center">
                  <p className="text-sm font-500 mb-0.5" style={{ color: textPrimary }}>
                    {isVoiceMuted ? 'Microphone muted' : isListening ? 'Listening...' : 'Tap to speak'}
                  </p>
                  <p className="text-xs" style={{ color: textMuted }}>
                    {isVoiceMuted ? 'Tap mic to unmute' : isListening ? 'Release to send' : 'Voice-powered conversation'}
                  </p>
                </div>

                <div className="w-full flex items-center justify-center">
                  <VoiceVisualizer isActive={isListening && !isVoiceMuted} />
                </div>

                <button
                  onClick={handleVoiceToggle}
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 flex-shrink-0"
                  aria-label={isVoiceMuted ? 'Unmute microphone' : isListening ? 'Stop recording' : 'Start recording'}
                  style={{
                    background: isVoiceMuted
                      ? 'rgba(239,68,68,0.15)'
                      : isListening
                      ? 'linear-gradient(135deg, #7B6FD4, #4ECDC4)'
                      : 'rgba(123,111,212,0.2)',
                    border: `2px solid ${isVoiceMuted ? 'rgba(239,68,68,0.4)' : isListening ? 'rgba(123,111,212,0.6)' : 'rgba(123,111,212,0.3)'}`,
                    boxShadow: isVoiceMuted ? 'none' : isListening ? '0 0 30px rgba(123,111,212,0.5)' : 'none',
                    transform: isListening && !isVoiceMuted ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {isVoiceMuted ? (
                    <MicOff size={22} style={{ color: 'rgba(239,68,68,0.8)' }} />
                  ) : isListening ? (
                    <Mic size={22} className="text-white" />
                  ) : (
                    <Mic size={22} style={{ color: '#7B6FD4' }} />
                  )}
                </button>

                {messages.length > 1 && (
                  <div
                    className="w-full rounded-xl p-2.5 max-h-28 overflow-y-auto flex-shrink-0"
                    style={{ background: surfaceBg, border: `1px solid ${borderColor}` }}
                  >
                    <p className="text-[11px] mb-1" style={{ color: textMuted }}>Last response</p>
                    <p className="text-xs" style={{ color: textPrimary }}>
                      {messages.filter(m => m.role === 'assistant').slice(-1)[0]?.content}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Avatar Mode */}
            {activeMode === 'avatar' && (
              <div className="flex-1 flex flex-col px-3 py-3 gap-3 overflow-y-auto min-h-0">
                <AvatarPanel
                  isStreaming={isAvatarStreaming}
                  onStart={handleStartAvatarSession}
                  onEnd={handleEndAvatarSession}
                  personaName={personaName}
                  isDark={isDark}
                  textPrimary={textPrimary}
                  textMuted={textMuted}
                  borderColor={borderColor}
                  surfaceBg={surfaceBg}
                  userMsgBg={userMsgBg}
                  messages={messages}
                  conversationUrl={tavusConversationUrl}
                  isLoading={tavusLoading}
                  sessionError={tavusError}
                  isMuted={isMuted}
                  onToggleMute={() => setIsMuted(m => !m)}
                />
              </div>
            )}
          </div>

          {/* ── Input Area ── */}
          {activeMode === 'chat' && (
            <div
              className="flex-shrink-0 px-2.5 py-2.5"
              style={{ borderTop: `1px solid ${borderColor}` }}
            >
              <div
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
                style={{
                  background: surfaceBg,
                  border: `1px solid ${borderColor}`,
                  transition: 'border-color 0.2s',
                }}
                onFocusCapture={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(232,160,32,0.4)';
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(232,160,32,0.06)';
                }}
                onBlurCapture={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = borderColor;
                  (e.currentTarget as HTMLDivElement).style.background = surfaceBg;
                }}
              >
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder={isOnline ? 'Type a message...' : 'Offline — reconnecting...'}
                  disabled={!isOnline}
                  aria-label="Message input"
                  className="flex-1 bg-transparent text-xs outline-none placeholder-opacity-40"
                  style={{ color: textPrimary, caretColor: '#E8A020', minWidth: 0 }}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || !isOnline}
                  aria-label="Send message"
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
                  style={{
                    background: inputValue.trim() && isOnline
                      ? 'linear-gradient(135deg, #E8A020, #C98A10)'
                      : 'rgba(255,255,255,0.06)',
                    opacity: inputValue.trim() && isOnline ? 1 : 0.4,
                    cursor: inputValue.trim() && isOnline ? 'pointer' : 'not-allowed',
                  }}
                >
                  <Send size={12} className="text-white" />
                </button>
              </div>

              <div className="flex items-center justify-between mt-1.5 px-1">
                <p className="text-[10px]" style={{ color: textMuted }}>
                  Powered by{' '}
                  <span style={{ color: '#E8A020' }}>PersonaMatrix</span>
                </p>
                <div className="flex items-center gap-1">
                  {isOnline ? (
                    <Wifi size={9} style={{ color: textMuted }} />
                  ) : (
                    <WifiOff size={9} className="text-red-400" />
                  )}
                  <Zap size={9} style={{ color: textMuted }} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
