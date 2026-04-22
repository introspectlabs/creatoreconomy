'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, MessageSquare, Phone, Video, Send, Mic, MicOff, PhoneOff, PhoneCall, Bot, User } from 'lucide-react';
import { Persona } from './personaData';
import Icon from '@/components/ui/AppIcon';


const avatarColors: Record<string, string> = {
  AS: 'from-purple-500 to-violet-600',
  SB: 'from-blue-500 to-cyan-600',
  MH: 'from-rose-500 to-pink-600',
  KV: 'from-teal-500 to-emerald-600',
  PF: 'from-amber-500 to-orange-600',
  DC: 'from-indigo-500 to-blue-600',
  LA: 'from-slate-500 to-gray-600',
  ZR: 'from-fuchsia-500 to-purple-600',
  OM: 'from-red-500 to-rose-600',
  ET: 'from-green-500 to-teal-600',
  NC: 'from-sky-500 to-blue-600',
  MW: 'from-violet-500 to-indigo-600',
};

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  time: string;
}

type TestMode = 'chat' | 'voice' | 'avatar';

interface PersonaTestPanelProps {
  persona: Persona;
  onClose: () => void;
}

const mockResponses = [
  "Hello! I\'m ready to assist you. How can I help you today?",
  "That's a great question. Based on my knowledge base, I can provide detailed information on that topic.",
  "I understand your concern. Let me walk you through the best approach for this situation.",
  "Absolutely! Here\'s what I recommend based on the context you\'ve provided.",
  "I\'ve processed your request. Here\'s a comprehensive response tailored to your needs.",
];

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function PersonaTestPanel({ persona, onClose }: PersonaTestPanelProps) {
  const [mode, setMode] = useState<TestMode>('chat');
  const gradient = avatarColors[persona.avatar] || 'from-purple-500 to-blue-500';

  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', role: 'assistant', text: `Hi! I'm ${persona.name}. ${persona.description}. How can I help you today?`, time: getTime() },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Voice state
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active' | 'ended'>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const callTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Avatar state
  const [avatarMessages, setAvatarMessages] = useState<Message[]>([
    { id: 'av-init', role: 'assistant', text: `Welcome! I'm ${persona.name} in avatar mode. I can engage in rich visual conversations. What would you like to discuss?`, time: getTime() },
  ]);
  const [avatarInput, setAvatarInput] = useState('');
  const [avatarTyping, setAvatarTyping] = useState(false);
  const [avatarSpeaking, setAvatarSpeaking] = useState(false);
  const avatarEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    avatarEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [avatarMessages, avatarTyping]);

  useEffect(() => {
    return () => {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const sendChatMessage = () => {
    if (!inputText.trim()) return;
    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', text: inputText.trim(), time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    setTimeout(() => {
      const reply = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: 'assistant', text: reply, time: getTime() }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const startCall = () => {
    setCallStatus('connecting');
    setTimeout(() => {
      setCallStatus('active');
      setCallDuration(0);
      callTimerRef.current = setInterval(() => setCallDuration((d) => d + 1), 1000);
    }, 1500);
  };

  const endCall = () => {
    if (callTimerRef.current) clearInterval(callTimerRef.current);
    setCallStatus('ended');
    setTimeout(() => { setCallStatus('idle'); setCallDuration(0); }, 2000);
  };

  const formatDuration = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const sendAvatarMessage = () => {
    if (!avatarInput.trim()) return;
    const userMsg: Message = { id: `av-u-${Date.now()}`, role: 'user', text: avatarInput.trim(), time: getTime() };
    setAvatarMessages((prev) => [...prev, userMsg]);
    setAvatarInput('');
    setAvatarTyping(true);
    setAvatarSpeaking(false);
    setTimeout(() => {
      const reply = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setAvatarMessages((prev) => [...prev, { id: `av-a-${Date.now()}`, role: 'assistant', text: reply, time: getTime() }]);
      setAvatarTyping(false);
      setAvatarSpeaking(true);
      setTimeout(() => setAvatarSpeaking(false), 3000);
    }, 1400 + Math.random() * 600);
  };

  const modes: { id: TestMode; label: string; icon: React.ElementType }[] = [
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'voice', label: 'Voice Call', icon: Phone },
    { id: 'avatar', label: 'Avatar', icon: Video },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden flex flex-col shadow-2xl"
        style={{ background: 'rgba(12,14,22,0.99)', border: '1px solid rgba(255,255,255,0.08)', height: '600px' }}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-700`}>
                {persona.avatar}
              </div>
              <div>
                <h2 className="text-sm font-700 text-white">{persona.name}</h2>
                <p className="text-[11px] text-white/40">Admin Test Panel</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all">
              <X size={14} />
            </button>
          </div>
          {/* Mode Tabs */}
          <div className="flex items-center gap-1 bg-white/4 rounded-xl p-1">
            {modes.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setMode(id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-500 transition-all ${
                  mode === id
                    ? 'bg-purple-500/25 text-purple-300 border border-purple-500/30' :'text-white/40 hover:text-white/70'
                }`}
              >
                <Icon size={12} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Mode */}
        {mode === 'chat' && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? `bg-gradient-to-br ${gradient}` : 'bg-white/10'}`}>
                    {msg.role === 'assistant' ? <Bot size={12} className="text-white" /> : <User size={12} className="text-white/70" />}
                  </div>
                  <div className={`max-w-[75%] rounded-2xl px-3 py-2 ${msg.role === 'user' ? 'bg-purple-500/20 border border-purple-500/20' : 'bg-white/5 border border-white/6'}`}>
                    <p className="text-xs text-white/85 leading-relaxed">{msg.text}</p>
                    <p className="text-[10px] text-white/25 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-end gap-2">
                  <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <Bot size={12} className="text-white" />
                  </div>
                  <div className="bg-white/5 border border-white/6 rounded-2xl px-3 py-2.5">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="px-5 pb-5 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2 mt-4">
                <input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                  placeholder="Type a test message..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-sm text-white placeholder-white/25 outline-none focus:border-purple-500/50 transition-all"
                />
                <button
                  onClick={sendChatMessage}
                  disabled={!inputText.trim()}
                  className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 hover:bg-purple-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Voice Call Mode */}
        {mode === 'voice' && (
          <div className="flex-1 flex flex-col items-center justify-center px-5 py-8 gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl font-700 shadow-2xl`}>
                {persona.avatar}
              </div>
              {callStatus === 'active' && (
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0c0e16] flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </span>
              )}
            </div>

            <div className="text-center">
              <p className="text-base font-700 text-white">{persona.name}</p>
              <p className="text-sm text-white/40 mt-1">
                {callStatus === 'idle' && 'Ready to connect'}
                {callStatus === 'connecting' && 'Connecting...'}
                {callStatus === 'active' && formatDuration(callDuration)}
                {callStatus === 'ended' && 'Call ended'}
              </p>
            </div>

            {callStatus === 'active' && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-xs text-emerald-400">Voice call active — simulated</p>
              </div>
            )}

            {callStatus === 'connecting' && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <p className="text-xs text-amber-400">Establishing connection...</p>
              </div>
            )}

            <div className="flex items-center gap-4">
              {callStatus === 'active' && (
                <button
                  onClick={() => setIsMuted((m) => !m)}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isMuted ? 'bg-red-500/20 border border-red-500/30 text-red-400' : 'bg-white/8 border border-white/10 text-white/60 hover:text-white'}`}
                >
                  {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
              )}

              {(callStatus === 'idle' || callStatus === 'ended') && (
                <button
                  onClick={startCall}
                  className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/30 transition-all"
                >
                  <PhoneCall size={22} />
                </button>
              )}

              {(callStatus === 'connecting' || callStatus === 'active') && (
                <button
                  onClick={endCall}
                  className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-all"
                >
                  <PhoneOff size={22} />
                </button>
              )}
            </div>

            <p className="text-[11px] text-white/25 text-center max-w-xs">
              This is a simulated voice call test. In production, this connects to the configured voice service ({persona.voice}).
            </p>
          </div>
        )}

        {/* Avatar Discussion Mode */}
        {mode === 'avatar' && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {/* Avatar Video Placeholder */}
              <div className="rounded-2xl overflow-hidden mb-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="h-36 flex flex-col items-center justify-center gap-3 relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl font-700`}>
                    {persona.avatar}
                  </div>
                  {avatarSpeaking && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '100ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '200ms' }} />
                      <span className="text-[10px] text-purple-300 ml-1">Speaking...</span>
                    </div>
                  )}
                  {!avatarSpeaking && (
                    <p className="text-[11px] text-white/30">Avatar Preview — {persona.name}</p>
                  )}
                </div>
              </div>

              {/* Messages */}
              {avatarMessages.map((msg) => (
                <div key={msg.id} className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? `bg-gradient-to-br ${gradient}` : 'bg-white/10'}`}>
                    {msg.role === 'assistant' ? <Video size={11} className="text-white" /> : <User size={12} className="text-white/70" />}
                  </div>
                  <div className={`max-w-[75%] rounded-2xl px-3 py-2 ${msg.role === 'user' ? 'bg-purple-500/20 border border-purple-500/20' : 'bg-white/5 border border-white/6'}`}>
                    <p className="text-xs text-white/85 leading-relaxed">{msg.text}</p>
                    <p className="text-[10px] text-white/25 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
              {avatarTyping && (
                <div className="flex items-end gap-2">
                  <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <Video size={11} className="text-white" />
                  </div>
                  <div className="bg-white/5 border border-white/6 rounded-2xl px-3 py-2.5">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={avatarEndRef} />
            </div>
            <div className="px-5 pb-5 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2 mt-4">
                <input
                  value={avatarInput}
                  onChange={(e) => setAvatarInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendAvatarMessage()}
                  placeholder="Talk to the avatar..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-sm text-white placeholder-white/25 outline-none focus:border-purple-500/50 transition-all"
                />
                <button
                  onClick={sendAvatarMessage}
                  disabled={!avatarInput.trim()}
                  className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 hover:bg-purple-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
