'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { personas } from '@/app/persona-library/components/personaData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  mode?: 'text' | 'voice' | 'avatar';
  media?: MessageMedia[];
}

interface MessageMedia {
  type: 'image' | 'video';
  url: string;
  alt?: string;
  thumbnail?: string;
  platform?: 'youtube' | 'vimeo' | 'other';
  videoId?: string;
  seekPoints?: SeekPoint[];
}

interface SeekPoint {
  label: string;
  seconds: number;
}

interface ChatSession {
  id: string;
  title: string;
  preview: string;
  timestamp: Date;
  messages: Message[];
  mode: 'text' | 'voice' | 'avatar';
}

type ChatMode = 'text' | 'voice' | 'avatar';

const FREE_MESSAGE_LIMIT = 5;

const statusColors: Record<string, string> = {
  active: '#00f5c4',
  training: '#f59e0b',
  draft: '#6b7280',
  paused: '#ef4444',
  archived: '#6b7280'
};

const MOCK_HISTORY: ChatSession[] = [
{
  id: 'h1',
  title: 'Product features deep dive',
  preview: 'Can you explain the main features...',
  timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  mode: 'text',
  messages: []
},
{
  id: 'h2',
  title: 'Pricing & plans',
  preview: 'What are the available pricing tiers?',
  timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  mode: 'voice',
  messages: []
},
{
  id: 'h3',
  title: 'Onboarding walkthrough',
  preview: 'Help me get started with the platform',
  timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
  mode: 'avatar',
  messages: []
},
{
  id: 'h4',
  title: 'Integration questions',
  preview: 'How do I connect my CRM?',
  timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
  mode: 'text',
  messages: []
}];


function getYouTubeEmbedUrl(videoId: string, startSeconds?: number): string {
  const base = `https://www.youtube.com/embed/${videoId}`;
  return startSeconds ? `${base}?start=${startSeconds}&autoplay=1` : base;
}

function getYouTubeWatchUrl(videoId: string, startSeconds: number): string {
  return `https://www.youtube.com/watch?v=${videoId}&t=${startSeconds}s`;
}

function formatSeekTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function VideoEmbed({ media }: {media: MessageMedia;}) {
  const [playing, setPlaying] = useState(false);
  const [seekTo, setSeekTo] = useState<number | undefined>(undefined);

  if (media.platform === 'youtube' && media.videoId) {
    const embedUrl = playing ?
    getYouTubeEmbedUrl(media.videoId, seekTo) :
    null;

    return (
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
        {playing && embedUrl ?
        <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
            <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={media.alt || 'YouTube video'} />

          </div> :

        <div
          className="relative cursor-pointer group"
          style={{ paddingBottom: '56.25%', height: 0, background: '#000' }}
          onClick={() => setPlaying(true)}>

            {media.thumbnail ?
          <img
            src={media.thumbnail}
            alt={media.alt || 'Video thumbnail'}
            className="absolute inset-0 w-full h-full object-cover" /> :


          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(0,245,196,0.1))' }}>

                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" fill="rgba(255,255,255,0.4)" stroke="none" />
                </svg>
              </div>
          }
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all">
              <div
              className="w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ background: 'rgba(255,0,0,0.9)', boxShadow: '0 4px 20px rgba(255,0,0,0.4)' }}>

                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
            <div
            className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold text-white"
            style={{ background: 'rgba(255,0,0,0.9)' }}>

              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              YouTube
            </div>
          </div>
        }

        {/* Seek Points */}
        {media.seekPoints && media.seekPoints.length > 0 &&
        <div className="px-3 py-2.5" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Jump to
            </p>
            <div className="flex flex-wrap gap-1.5">
              {media.seekPoints.map((sp, i) =>
            <a
              key={i}
              href={getYouTubeWatchUrl(media.videoId!, sp.seconds)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (playing) {
                  e.preventDefault();
                  setSeekTo(sp.seconds);
                  setPlaying(false);
                  setTimeout(() => setPlaying(true), 50);
                }
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'rgba(255,0,0,0.12)',
                border: '1px solid rgba(255,0,0,0.25)',
                color: '#ff6b6b'
              }}>

                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px' }}>{formatSeekTime(sp.seconds)}</span>
                  {sp.label}
                </a>
            )}
            </div>
          </div>
        }
      </div>);

  }

  // Generic video (non-YouTube)
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
      <video
        src={media.url}
        controls
        className="w-full"
        style={{ maxHeight: '280px', background: '#000' }}
        poster={media.thumbnail}>

        Your browser does not support the video tag.
      </video>
      {media.seekPoints && media.seekPoints.length > 0 &&
      <div className="px-3 py-2.5" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Jump to
          </p>
          <div className="flex flex-wrap gap-1.5">
            {media.seekPoints.map((sp, i) =>
          <a
            key={i}
            href={`${media.url}#t=${sp.seconds}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all hover:scale-105"
            style={{
              background: 'rgba(124,58,237,0.15)',
              border: '1px solid rgba(124,58,237,0.3)',
              color: '#a78bfa'
            }}>

                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px' }}>{formatSeekTime(sp.seconds)}</span>
                {sp.label}
              </a>
          )}
          </div>
        </div>
      }
    </div>);

}

function MultimodalContent({ msg }: {msg: Message;}) {
  const hasMedia = msg.media && msg.media.length > 0;
  const images = msg.media?.filter((m) => m.type === 'image') || [];
  const videos = msg.media?.filter((m) => m.type === 'video') || [];

  return (
    <div className="flex flex-col gap-2">
      {/* Images grid */}
      {images.length > 0 &&
      <div className={`grid gap-1.5 ${images.length === 1 ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-2'}`}>
          {images.map((img, i) =>
        <a key={i} href={img.url} target="_blank" rel="noopener noreferrer" className="block rounded-xl overflow-hidden group">
              <img
            src={img.url}
            alt={img.alt || `Image ${i + 1}`}
            className="w-full object-cover transition-transform group-hover:scale-105"
            style={{ maxHeight: images.length === 1 ? '220px' : '140px' }} />

            </a>
        )}
        </div>
      }

      {/* Videos */}
      {videos.map((vid, i) =>
      <VideoEmbed key={i} media={vid} />
      )}

      {/* Text content */}
      {msg.content &&
      <p className="text-sm leading-relaxed" style={{ color: msg.role === 'user' ? 'white' : 'rgba(255,255,255,0.85)' }}>
          {msg.content}
        </p>
      }
    </div>);

}

function formatRelativeTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  return `${days}d ago`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const ModeIcon = ({ mode, size = 16 }: {mode: ChatMode;size?: number;}) => {
  if (mode === 'text') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>);

  }
  if (mode === 'voice') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>);

  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <rect x="4" y="14" width="16" height="8" rx="2" />
    </svg>);

};

function VoiceChatView({ persona, initials, onBack }: {persona: any;initials: string;onBack: () => void;}) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceMessages, setVoiceMessages] = useState<{role: 'user' | 'assistant';text: string;}[]>([
  { role: 'assistant', text: `Hey! I'm ${persona.name}. Tap the mic and start talking — I'm listening.` }]
  );

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      if (transcript.trim()) {
        const userText = transcript;
        setVoiceMessages((prev) => [...prev, { role: 'user', text: userText }]);
        setTranscript('');
        setIsSpeaking(true);
        setTimeout(() => {
          setVoiceMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: `Got it! As ${persona.name}, I heard you say: "${userText}". Connect me to a knowledge base for real AI-powered voice responses.`
          }]
          );
          setIsSpeaking(false);
        }, 2000);
      }
    } else {
      setIsListening(true);
      let t = '';
      const words = ['Hello', 'there,', 'how', 'can', 'I', 'help', 'you', 'today?'];
      let i = 0;
      const interval = setInterval(() => {
        if (i < words.length) {
          t += (i > 0 ? ' ' : '') + words[i];
          setTranscript(t);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 300);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-full py-8 px-4">
      <div className="flex flex-col items-center gap-4 mt-4">
        <div className="relative">
          {(isListening || isSpeaking) &&
          <>
              <div
              className="absolute inset-0 rounded-full"
              style={{
                background: isListening ?
                'radial-gradient(circle, rgba(0,245,196,0.15) 0%, transparent 70%)' :
                'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
                animationName: 'ping',
                animationDuration: '1.5s',
                animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
                animationIterationCount: 'infinite',
                transform: 'scale(2)'
              }} />

              <div
              className="absolute inset-0 rounded-full"
              style={{
                background: isListening ?
                'radial-gradient(circle, rgba(0,245,196,0.1) 0%, transparent 70%)' :
                'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
                animationName: 'ping',
                animationDuration: '1.5s',
                animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
                animationIterationCount: 'infinite',
                animationDelay: '0.5s',
                transform: 'scale(2.5)'
              }} />

            </>
          }
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center text-white text-3xl font-black relative z-10"
            style={{
              background: isListening ?
              'linear-gradient(135deg, #00f5c4, #0ea5e9)' :
              isSpeaking ?
              'linear-gradient(135deg, #a855f7, #ec4899)' :
              'linear-gradient(135deg, #7c3aed, #3b82f6)',
              boxShadow: isListening ?
              '0 0 60px rgba(0,245,196,0.5), 0 0 120px rgba(0,245,196,0.2)' :
              isSpeaking ?
              '0 0 60px rgba(168,85,247,0.5), 0 0 120px rgba(168,85,247,0.2)' :
              '0 0 40px rgba(124,58,237,0.4)',
              transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)'
            }}>

            {initials.slice(0, 1)}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold text-white">{persona.name}</h2>
          <p className="text-sm mt-1" style={{ color: isListening ? '#00f5c4' : isSpeaking ? '#a855f7' : 'rgba(255,255,255,0.4)' }}>
            {isListening ? '● Listening...' : isSpeaking ? '◆ Speaking...' : 'Tap mic to speak'}
          </p>
        </div>

        <div className="flex items-center gap-1 h-10">
          {Array.from({ length: 20 }).map((_, i) =>
          <div
            key={i}
            className="w-1 rounded-full"
            style={{
              height: isListening || isSpeaking ? `${Math.random() * 32 + 8}px` : '4px',
              background: isListening ? '#00f5c4' : isSpeaking ? '#a855f7' : 'rgba(255,255,255,0.15)',
              transition: 'height 0.15s ease'
            }} />

          )}
        </div>
      </div>

      {transcript &&
      <div
        className="w-full max-w-sm px-4 py-3 rounded-2xl text-sm text-white/80 text-center"
        style={{ background: 'rgba(0,245,196,0.08)', border: '1px solid rgba(0,245,196,0.2)' }}>

          &ldquo;{transcript}&rdquo;
        </div>
      }

      <div className="w-full max-w-sm space-y-2 max-h-40 overflow-y-auto">
        {voiceMessages.slice(-3).map((m, i) =>
        <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div
            className="px-3 py-2 rounded-xl text-xs max-w-[85%]"
            style={{
              background: m.role === 'user' ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.06)',
              border: m.role === 'user' ? '1px solid rgba(124,58,237,0.4)' : '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.8)'
            }}>

              {m.text}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={toggleListening}
        className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: isListening ?
          'linear-gradient(135deg, #00f5c4, #0ea5e9)' :
          'linear-gradient(135deg, #7c3aed, #3b82f6)',
          boxShadow: isListening ?
          '0 0 40px rgba(0,245,196,0.6)' :
          '0 0 30px rgba(124,58,237,0.5)'
        }}>

        {isListening ?
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg> :

        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        }
      </button>
    </div>);

}

function AvatarChatView({ persona, initials }: {persona: any;initials: string;}) {
  const [messages, setMessages] = useState<Message[]>([
  {
    id: '0',
    role: 'assistant',
    content: `Hey! I'm ${persona.name}. I'm your avatar-powered AI companion. Ask me anything and I'll respond with full avatar interaction!`,
    timestamp: new Date(),
    mode: 'avatar'
  }]
  );
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [avatarSpeaking, setAvatarSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
      mode: 'avatar'
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      setAvatarSpeaking(true);
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `As ${persona.name}, I'm responding via avatar mode. Connect Tavus or HeyGen to enable real video avatar responses. This is a demo interaction!`,
        timestamp: new Date(),
        mode: 'avatar'
      };
      setMessages((prev) => [...prev, reply]);
      setLoading(false);
      setTimeout(() => setAvatarSpeaking(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className="relative mx-4 mt-4 rounded-2xl overflow-hidden flex-shrink-0"
        style={{
          height: '220px',
          background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(0,245,196,0.08))',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-black"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #00f5c4)',
                boxShadow: avatarSpeaking ?
                '0 0 60px rgba(0,245,196,0.6), 0 0 120px rgba(0,245,196,0.3)' :
                '0 0 40px rgba(124,58,237,0.4)',
                transition: 'box-shadow 0.3s ease'
              }}>

              {initials}
            </div>
            {avatarSpeaking &&
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-0.5">
                {[0, 1, 2, 3, 4].map((i) =>
              <div
                key={i}
                className="w-1 rounded-full"
                style={{
                  height: `${8 + Math.random() * 16}px`,
                  background: '#00f5c4'
                }} />

              )}
              </div>
            }
          </div>
        </div>

        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', color: '#00f5c4' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f5c4]" />
          Avatar Live
        </div>

        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold"
        style={{ background: 'rgba(124,58,237,0.3)', border: '1px solid rgba(124,58,237,0.4)', color: 'rgba(255,255,255,0.8)' }}>
          Powered by Tavus
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-3 px-4 py-4" style={{ minHeight: 0 }}>
        {messages.map((msg) =>
        <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.role === 'assistant' &&
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #00f5c4)' }}>

                {initials.slice(0, 1)}
              </div>
          }
            <div className={`flex flex-col gap-1 max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div
              className="px-3 py-2.5 rounded-xl text-sm leading-relaxed"
              style={
              msg.role === 'user' ?
              { background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: 'white', borderRadius: '16px 16px 4px 16px' } :
              { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)', borderRadius: '16px 16px 16px 4px' }
              }>

                {msg.content}
              </div>
              <span className="text-[10px] text-white/20 px-1">{formatTime(msg.timestamp)}</span>
            </div>
          </div>
        )}
        {loading &&
        <div className="flex gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #00f5c4)' }}>
              {initials.slice(0, 1)}
            </div>
            <div className="px-3 py-2.5 rounded-xl flex items-center gap-1"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {[0, 150, 300].map((delay) =>
            <span key={delay} className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: `${delay}ms` }} />
            )}
            </div>
          </div>
        }
        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 pb-4 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {if (e.key === 'Enter') sendMessage();}}
          placeholder={`Chat with ${persona.name}'s avatar…`}
          className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          disabled={loading} />

        <button
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          className="w-11 h-11 rounded-xl flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #00f5c4)' }}>

          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 18 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>);

}

function getPersonaPrompts(persona: { slug: string; description: string; name: string }): string[] {
  const slug = persona.slug.toLowerCase();
  const desc = persona.description.toLowerCase();

  if (slug.includes('concierge') || slug.includes('onrent') || desc.includes('tour') || desc.includes('rental')) {
    return [
      'Show me a product tour 🎬',
      'How do I get started with OnRent?',
      'What are the key features?',
      'Walk me through the onboarding steps',
    ];
  }
  if (slug.includes('sales') || desc.includes('sales') || desc.includes('leads') || desc.includes('demo')) {
    return [
      'Tell me about your pricing plans',
      'Can you book a demo for me?',
      'What problems do you solve?',
      'How does the free trial work?',
    ];
  }
  if (slug.includes('support') || desc.includes('support') || desc.includes('ticket') || desc.includes('faq')) {
    return [
      'I need help with my account',
      'How do I reset my password?',
      'Track my recent order',
      'Escalate to a human agent',
    ];
  }
  if (slug.includes('hr') || desc.includes('hr') || desc.includes('onboarding') || desc.includes('leave')) {
    return [
      'How do I apply for leave?',
      'What is the remote work policy?',
      'Walk me through onboarding steps',
      'Who do I contact for payroll queries?',
    ];
  }
  if (slug.includes('voice') || desc.includes('voice') || desc.includes('call')) {
    return [
      'How does the voice agent work?',
      'Can you handle inbound calls?',
      'What languages do you support?',
      'Set up an outbound campaign',
    ];
  }
  if (slug.includes('research') || desc.includes('research') || desc.includes('analys')) {
    return [
      'Summarise the latest market trends',
      'Compare top competitors in this space',
      'Give me a SWOT analysis',
      'What data sources do you use?',
    ];
  }
  if (slug.includes('content') || desc.includes('content') || desc.includes('blog') || desc.includes('copy')) {
    return [
      'Write a LinkedIn post for me',
      'Generate 5 blog title ideas',
      'Create a product description',
      'Draft an email newsletter',
    ];
  }
  // Generic fallback
  return [
    `What can you help me with?`,
    'Tell me about yourself',
    'Show me what you can do',
    'Get me started quickly',
  ];
}

interface ClickablePromptsProps {
  persona: { slug: string; description: string; name: string };
  onSelect: (prompt: string) => void;
}

function ClickablePrompts({ persona, onSelect }: ClickablePromptsProps) {
  const prompts = getPersonaPrompts(persona);

  return (
    <div className="px-3 sm:px-4 pb-3">
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-2.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
        Suggested prompts
      </p>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => onSelect(prompt)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 hover:scale-105 active:scale-95 text-left"
            style={{
              background: 'rgba(124,58,237,0.1)',
              border: '1px solid rgba(124,58,237,0.25)',
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.8)" strokeWidth="2.5" className="flex-shrink-0">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PersonaChatPage() {
  const params = useParams();
  const slug = params['persona-slug'] as string;
  const persona = personas.find((p) => p.slug === slug);

  const [mode, setMode] = useState<ChatMode>('text');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory] = useState<ChatSession[]>(MOCK_HISTORY);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [messageCount, setMessageCount] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (persona) {
      const isConcierge = persona.slug === 'demo-concierge';
      setMessages([
      {
        id: '0',
        role: 'assistant',
        content: `Hey! I'm ${persona.name} ✦ ${persona.description}. You have ${FREE_MESSAGE_LIMIT} free messages. What's on your mind?`,
        timestamp: new Date(),
        mode: 'text',
        media: isConcierge ? [
        {
          type: 'video',
          url: '',
          platform: 'youtube',
          videoId: 'N0vqEgL70fA',
          alt: 'OnRent Demo Concierge — product tour introduction video',
          thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1b9a63fe0-1765276611891.png",
          seekPoints: [
          { label: 'Welcome', seconds: 0 },
          { label: 'Key Features', seconds: 30 },
          { label: 'Getting Started', seconds: 60 }]

        }] :
        undefined
      }]
      );
      setMessageCount(0);
      setLimitReached(false);
      setShowSignUpPrompt(false);
    }
  }, [persona?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading || !persona || limitReached) return;

    const newCount = messageCount + 1;
    setMessageCount(newCount);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
      mode: 'text'
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const isLimit = newCount >= FREE_MESSAGE_LIMIT;
      const isNearLimit = newCount === FREE_MESSAGE_LIMIT - 1;

      // Cycle through multimodal response demos
      const isConcierge = persona.slug === 'demo-concierge';

      const conciergeResponses: Partial<Message>[] = [
      {
        content: `Great question! Let me walk you through that with a quick video clip — I've marked the key chapters so you can jump straight to what matters most:`,
        media: [
        {
          type: 'video',
          url: '',
          platform: 'youtube',
          videoId: 'N0vqEgL70fA',
          alt: 'OnRent Demo Concierge — key features walkthrough',
          thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1a0df884d-1766743183482.png",
          seekPoints: [
          { label: 'Overview', seconds: 0 },
          { label: 'Core Features', seconds: 30 },
          { label: 'Setup Guide', seconds: 60 },
          { label: 'Pro Tips', seconds: 90 }]
        }]
      },
      {
        content: `Here's a step-by-step tutorial clip that covers exactly what you need. Use the chapter markers to skip ahead:`,
        media: [
        {
          type: 'video',
          url: '',
          platform: 'youtube',
          videoId: 'LXb3EKWsInQ',
          alt: 'Full onboarding tutorial with chapter markers',
          thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_113e83763-1769665855852.png",
          seekPoints: [
          { label: 'Intro', seconds: 0 },
          { label: 'Dashboard Tour', seconds: 120 },
          { label: 'Integrations', seconds: 240 },
          { label: 'Advanced Settings', seconds: 360 },
          { label: 'Q&A', seconds: 480 }]
        }]
      },
      {
        content: `I've put together a visual guide for this. Watch the clip and check out the screenshots below for a quick reference:`,
        media: [
        {
          type: 'video',
          url: '',
          platform: 'youtube',
          videoId: 'N0vqEgL70fA',
          alt: 'OnRent visual guide — product tour video clip',
          thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_15284c409-1772202942077.png",
          seekPoints: [
          { label: 'Start Here', seconds: 0 },
          { label: 'Key Concepts', seconds: 45 },
          { label: 'Live Demo', seconds: 90 }]
        },
        {
          type: 'image',
          url: "https://img.rocket.new/generatedImages/rocket_gen_img_194625d93-1772217102353.png",
          alt: 'AI interface dashboard showing analytics and data visualization panels'
        }]
      }];

      const demoResponses: Partial<Message>[] = [
      {
        content: `Thanks for reaching out! As ${persona.name}, I'm here to help. Here's a quick overview video to get you started:`,
        media: [
        {
          type: 'video',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          platform: 'youtube',
          videoId: 'dQw4w9WgXcQ',
          alt: 'Getting started overview',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
          seekPoints: [
          { label: 'Introduction', seconds: 0 },
          { label: 'Key Features', seconds: 45 },
          { label: 'How to Use', seconds: 90 }]

        }]

      },
      {
        content: `Great question! Here are some visual examples that illustrate what I mean:`,
        media: [
        {
          type: 'image',
          url: "https://img.rocket.new/generatedImages/rocket_gen_img_194625d93-1772217102353.png",
          alt: 'AI interface dashboard showing analytics and data visualization panels'
        },
        {
          type: 'image',
          url: "https://img.rocket.new/generatedImages/rocket_gen_img_1eefab1f7-1772308560750.png",
          alt: 'Futuristic AI robot with glowing blue eyes representing digital intelligence'
        }]

      },
      {
        content: `Here's a comprehensive tutorial that covers exactly what you're asking about, with key chapters you can jump to directly:`,
        media: [
        {
          type: 'image',
          url: "https://img.rocket.new/generatedImages/rocket_gen_img_110953098-1772091052591.png",
          alt: 'Data analytics dashboard with charts and graphs on a dark background'
        },
        {
          type: 'video',
          url: '',
          platform: 'youtube',
          videoId: 'LXb3EKWsInQ',
          alt: 'Full tutorial walkthrough',
          thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_15645ad03-1768333471233.png",
          seekPoints: [
          { label: 'Overview', seconds: 30 },
          { label: 'Setup', seconds: 120 },
          { label: 'Advanced Tips', seconds: 300 },
          { label: 'Q&A', seconds: 480 }]

        }]

      }];

      const activeResponses = isConcierge ? conciergeResponses : demoResponses;
      const demoIndex = (newCount - 1) % activeResponses.length;

      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: isLimit ?
        `You've reached the free message limit! Sign up free to continue chatting with ${persona.name} with unlimited messages. 🚀` :
        activeResponses[demoIndex].content || `Thanks for reaching out! As ${persona.name}, I'm here to help. 🚀`,
        media: isLimit ? undefined : activeResponses[demoIndex].media,
        timestamp: new Date(),
        mode: 'text'
      };
      setMessages((prev) => [...prev, reply]);
      setLoading(false);

      if (isLimit) {
        setLimitReached(true);
      } else if (isNearLimit) {
        setShowSignUpPrompt(true);
      }
    }, 1200);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSession = (session: ChatSession) => {
    setActiveSession(session.id);
    setMode(session.mode);
    setShowHistory(false);
  };

  if (!persona) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.15) 0%, #080a10 60%)' }}>

        <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-[#080a10]/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center">
            <Link href="/">
              <img src="/assets/images/image-1775312226237.png" alt="PersonaMatrix" className="h-10 w-auto object-contain" />
            </Link>
          </div>
        </div>
        <div className="text-center mt-14">
          <h1 className="text-xl font-bold text-white mb-2">Persona Not Found</h1>
          <p className="text-white/40 text-sm mb-6">The persona <span className="font-mono text-white/60">/{slug}</span> doesn&apos;t exist.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>
            Back to PersonaMatrix
          </Link>
        </div>
      </div>);

  }

  const statusColor = statusColors[persona.status] || '#6b7280';
  const isAvailable = persona.status === 'active';
  const initials = persona.avatar;
  const remainingMessages = Math.max(0, FREE_MESSAGE_LIMIT - messageCount);
  const progressPct = messageCount / FREE_MESSAGE_LIMIT * 100;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'radial-gradient(ellipse at 50% -20%, rgba(124,58,237,0.2) 0%, rgba(8,10,16,1) 55%)' }}>

      {/* Animated background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />


      {/* Glow blobs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="fixed bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(0,245,196,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/6 bg-[#080a10]/70 backdrop-blur-2xl">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 h-14 flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <img src="/assets/images/image-1775312226237.png" alt="PersonaMatrix" className="h-8 sm:h-9 w-auto object-contain" />
          </Link>

          {/* Desktop buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: showHistory ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.04)',
                border: showHistory ? '1px solid rgba(124,58,237,0.4)' : '1px solid rgba(255,255,255,0.08)',
                color: showHistory ? '#a78bfa' : 'rgba(255,255,255,0.5)'
              }}>

              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M12 7v5l4 2" />
              </svg>
              History
            </button>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: copied ? '#00f5c4' : 'rgba(255,255,255,0.5)'
              }}>

              {copied ?
              <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>Copied!</> :

              <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>Share</>
              }
            </button>

            <Link
              href="/register"
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #00f5c4)' }}>

              Create Persona ✦
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex flex-col items-center justify-center gap-0.5 px-2.5 py-1.5 rounded-xl text-[10px] font-semibold transition-all active:scale-95"
              style={{
                background: showHistory ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.06)',
                border: showHistory ? '1px solid rgba(124,58,237,0.5)' : '1px solid rgba(255,255,255,0.1)',
                color: showHistory ? '#a78bfa' : 'rgba(255,255,255,0.55)',
                minWidth: '52px'
              }}>

              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M12 7v5l4 2" />
              </svg>
              History
            </button>

            <button
              onClick={handleCopyLink}
              className="flex flex-col items-center justify-center gap-0.5 px-2.5 py-1.5 rounded-xl text-[10px] font-semibold transition-all active:scale-95"
              style={{
                background: copied ? 'rgba(0,245,196,0.15)' : 'rgba(255,255,255,0.06)',
                border: copied ? '1px solid rgba(0,245,196,0.4)' : '1px solid rgba(255,255,255,0.1)',
                color: copied ? '#00f5c4' : 'rgba(255,255,255,0.55)',
                minWidth: '52px'
              }}>

              {copied ?
              <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                  Copied!
                </> :

              <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                  Share
                </>
              }
            </button>

            <Link
              href="/register"
              className="flex flex-col items-center justify-center gap-0.5 px-2.5 py-1.5 rounded-xl text-[10px] font-bold text-white transition-all active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #00f5c4)',
                minWidth: '52px'
              }}>

              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M20 21a8 8 0 10-16 0" />
                <line x1="12" y1="14" x2="12" y2="20" />
                <line x1="9" y1="17" x2="15" y2="17" />
              </svg>
              Create
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile History Overlay Drawer */}
      {showHistory &&
      <div className="fixed inset-0 z-40 sm:hidden">
          <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowHistory(false)} />

          <div
          className="absolute top-14 left-0 right-0 bottom-0 flex flex-col overflow-hidden"
          style={{ background: 'rgba(8,10,16,0.97)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>

            <div className="flex items-center justify-between px-4 py-3 border-b border-white/6">
              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Chat History
              </h3>
              <button
              onClick={() => setShowHistory(false)}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,0.4)' }}>

                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
              <button
              onClick={() => {setActiveSession(null);setShowHistory(false);}}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all hover:bg-white/5 group"
              style={{ border: '1px dashed rgba(124,58,237,0.4)' }}>

                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(124,58,237,0.2)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-purple-400">New Chat</span>
              </button>

              {chatHistory.map((session) =>
            <button
              key={session.id}
              onClick={() => loadSession(session)}
              className="w-full flex items-start gap-3 px-4 py-3 rounded-xl text-left transition-all hover:bg-white/5"
              style={{
                background: activeSession === session.id ? 'rgba(124,58,237,0.12)' : 'transparent',
                border: activeSession === session.id ? '1px solid rgba(124,58,237,0.3)' : '1px solid rgba(255,255,255,0.05)'
              }}>

                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: session.mode === 'voice' ? 'rgba(0,245,196,0.15)' :
                session.mode === 'avatar' ? 'rgba(168,85,247,0.15)' : 'rgba(255,255,255,0.06)',
                color: session.mode === 'voice' ? '#00f5c4' : session.mode === 'avatar' ? '#a855f7' : 'rgba(255,255,255,0.4)'
              }}>

                    <ModeIcon mode={session.mode} size={12} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white/70 truncate">{session.title}</p>
                    <p className="text-xs text-white/35 truncate mt-0.5">{session.preview}</p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      {formatRelativeTime(session.timestamp)}
                    </p>
                  </div>
                </button>
            )}
            </div>
          </div>
        </div>
      }

      {/* Main layout */}
      <div className="flex flex-1 max-w-4xl mx-auto w-full pt-14" style={{ minHeight: '100vh' }}>

        {/* History Sidebar — desktop only */}
        <div
          className="hidden sm:block flex-shrink-0 border-r border-white/6 overflow-hidden transition-all duration-300"
          style={{
            width: showHistory ? '260px' : '0px',
            opacity: showHistory ? 1 : 0
          }}>

          {showHistory &&
          <div className="w-[260px] h-full flex flex-col pt-4 pb-4">
              <div className="px-4 mb-3">
                <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Chat History
                </h3>
              </div>

              <div className="flex-1 overflow-y-auto px-2 space-y-1">
                <button
                onClick={() => {setActiveSession(null);setShowHistory(false);}}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all hover:bg-white/5 group"
                style={{ border: '1px dashed rgba(124,58,237,0.3)' }}>

                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(124,58,237,0.2)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-purple-400">New Chat</span>
                </button>

                {chatHistory.map((session) =>
              <button
                key={session.id}
                onClick={() => loadSession(session)}
                className="w-full flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all hover:bg-white/5"
                style={{
                  background: activeSession === session.id ? 'rgba(124,58,237,0.12)' : 'transparent',
                  border: activeSession === session.id ? '1px solid rgba(124,58,237,0.25)' : '1px solid transparent'
                }}>

                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: session.mode === 'voice' ? 'rgba(0,245,196,0.15)' :
                session.mode === 'avatar' ? 'rgba(168,85,247,0.15)' : 'rgba(255,255,255,0.06)',
                color: session.mode === 'voice' ? '#00f5c4' : session.mode === 'avatar' ? '#a855f7' : 'rgba(255,255,255,0.4)'
              }}>

                    <ModeIcon mode={session.mode} size={12} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white/70 truncate">{session.title}</p>
                    <p className="text-[10px] text-white/30 truncate mt-0.5">{session.preview}</p>
                    <p className="text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>
                      {formatRelativeTime(session.timestamp)}
                    </p>
                  </div>
                </button>
              )}
              </div>
            </div>
          }
        </div>

        {/* Chat Panel */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Persona Header */}
          <div className="px-3 sm:px-4 pt-4 sm:pt-5 pb-3 sm:pb-4">
            <div
              className="rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(0,245,196,0.05) 100%)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(12px)'
              }}>

              {/* Avatar */}
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm sm:text-base flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #00f5c4)',
                  boxShadow: '0 0 24px rgba(124,58,237,0.4)'
                }}>

                {initials}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-sm sm:text-base font-black text-white tracking-tight">{persona.name}</h1>
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest"
                    style={{
                      background: `${statusColor}15`,
                      color: statusColor,
                      border: `1px solid ${statusColor}30`
                    }}>

                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
                    {persona.status}
                  </span>
                </div>
                <p className="text-xs text-white/40 mt-0.5 truncate">{persona.description}</p>
                {persona.whatsappNumber &&
                <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    {persona.whatsappNumber &&
                  <a
                    href={`https://wa.me/${persona.whatsappNumber.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-semibold transition-opacity hover:opacity-80"
                    style={{ color: '#25d366' }}>

                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22 12 11 17l-4-9 9-4 11 13-4 9z" />
                        </svg>
                        WhatsApp
                      </a>
                  }
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-300/80">
                      {Math.floor((persona.knowledgeChunks || 120) / 40)} Documents
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-300/80">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      {Math.floor((persona.knowledgeChunks || 120) / 60)} Web Pages
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 border border-cyan-500/20 text-cyan-300/80">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                      {(persona.knowledgeChunks || 120).toLocaleString()} Chunks
                    </span>
                  </div>
                }
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-1.5 sm:gap-2 mt-3 overflow-x-auto pb-0.5">
              {(['text', 'voice', 'avatar'] as ChatMode[]).map((m) =>
              <button
                key={m}
                onClick={() => setMode(m)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
                style={{
                  background: mode === m ?
                  m === 'voice' ? 'linear-gradient(135deg, rgba(0,245,196,0.2), rgba(14,165,233,0.2))' :
                  m === 'avatar' ? 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))' : 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(59,130,246,0.15))' : 'rgba(255,255,255,0.04)',
                  border: mode === m ?
                  m === 'voice' ? '1px solid rgba(0,245,196,0.4)' :
                  m === 'avatar' ? '1px solid rgba(168,85,247,0.4)' : '1px solid rgba(124,58,237,0.4)' : '1px solid rgba(255,255,255,0.07)',
                  color: mode === m ?
                  m === 'voice' ? '#00f5c4' : m === 'avatar' ? '#c084fc' : '#a78bfa' : 'rgba(255,255,255,0.35)'
                }}>

                  <ModeIcon mode={m} size={12} />
                  {m === 'text' ? 'Text Chat' : m === 'voice' ? 'Voice Chat' : 'Avatar Chat'}
                </button>
              )}
            </div>
          </div>

          {/* Mode Content */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-3 px-3 sm:px-4 py-4" style={{ minHeight: 0 }}>
            {mode === 'voice' ?
            <div className="flex-1" style={{ minHeight: '400px' }}>
                <VoiceChatView persona={persona} initials={initials} onBack={() => setMode('text')} />
              </div> :
            mode === 'avatar' ?
            <div className="flex-1" style={{ minHeight: '400px' }}>
                <AvatarChatView persona={persona} initials={initials} />
              </div> :

            <>
                {/* Text messages */}
                <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4" style={{ minHeight: 0 }}>
                  {messages.map((msg) =>
                <div key={msg.id} className={`flex gap-2 sm:gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {msg.role === 'assistant' &&
                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0 mt-0.5"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #00f5c4)', boxShadow: '0 0 12px rgba(124,58,237,0.3)' }}>

                          {initials.slice(0, 1)}
                        </div>
                  }
                      <div className={`flex flex-col gap-1 max-w-[82%] sm:max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div
                      className="px-3 py-2.5 rounded-xl text-sm leading-relaxed"
                      style={
                      msg.role === 'user' ?
                      { background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: 'white', borderRadius: '18px 18px 4px 18px' } :
                      { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)', borderRadius: '18px 18px 18px 4px' }
                      }>

                {msg.media && msg.media.length > 0 ?
                      <MultimodalContent msg={msg} /> :

                      msg.content
                      }
                        </div>
                        <span className="text-[10px] text-white/20 px-1">{formatTime(msg.timestamp)}</span>
                      </div>
                    </div>
                )}

                  {loading &&
                <div className="flex gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #00f5c4)' }}>
                        {initials.slice(0, 1)}
                      </div>
                      <div className="px-3 py-2.5 rounded-xl flex items-center gap-1"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        {[0, 150, 300].map((delay) =>
                    <span key={delay} className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                    )}
                      </div>
                    </div>
                }

                  {/* Soft sign-up nudge (1 message left) */}
                  {showSignUpPrompt && !limitReached &&
                <div
                  className="mx-auto max-w-sm w-full rounded-2xl p-4 border border-[#7c3aed]/30 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
                  style={{ background: 'rgba(124,58,237,0.08)' }}>

                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.2)' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">1 message left</p>
                        <p className="text-xs text-white/45 mt-0.5">Sign up free to keep chatting with no limits</p>
                      </div>
                      <Link
                    href="/register"
                    className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>

                        Create free account
                      </Link>
                    </div>
                }

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Bar */}
                <div
                className="sticky bottom-0 left-0 right-0 border-t border-white/6 backdrop-blur-2xl"
                style={{ background: 'rgba(8,10,16,0.85)' }}>

                  {/* Clickable prompt suggestions — shown only before first user message */}
                  {!limitReached && messageCount === 0 && !loading && (
                    <ClickablePrompts
                      persona={persona}
                      onSelect={(prompt) => {
                        setInput(prompt);
                      }}
                    />
                  )}

                  <div className="px-3 sm:px-4 py-3">
                    {!isAvailable && !limitReached &&
                  <div className="mb-2 flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                        <span className="text-xs text-amber-400/80">
                          This persona is <strong>{persona.status}</strong> and may not respond.
                        </span>
                      </div>
                  }

                    {limitReached ? (
                  /* Hard limit reached — paywall CTA */
                  <div
                    className="rounded-2xl p-5 border border-[#7c3aed]/40 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
                    style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(59,130,246,0.08))' }}>

                        <div className="flex-1">
                          <p className="text-sm font-bold text-white">You&apos;ve used all {FREE_MESSAGE_LIMIT} free messages</p>
                          <p className="text-xs text-white/45 mt-1">Create a free account to continue — no credit card required.</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Link
                        href="/login"
                        className="px-4 py-2 rounded-xl text-sm font-medium text-white/70 border border-white/12 hover:text-white hover:bg-white/5 transition-all">

                            Log in
                          </Link>
                          <Link
                        href="/register"
                        className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>

                            Sign up free →
                          </Link>
                        </div>
                      </div>) :

                  <div className="flex items-center gap-2">
                        <div className="flex-1 relative">
                          <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {if (e.key === 'Enter' && !e.shiftKey) {e.preventDefault();sendMessage();}}}
                        placeholder={`Message ${persona.name}…`}
                        className="w-full px-4 py-3 pr-12 text-sm text-white placeholder-white/25 outline-none transition-all rounded-xl"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)'
                        }}
                        disabled={loading} />

                        </div>
                        <button
                      onClick={sendMessage}
                      disabled={!input.trim() || loading}
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #00f5c4)' }}>

                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 18 22 11 13 2 9 22 2" />
                          </svg>
                        </button>
                      </div>
                  }

                    {/* Free message progress bar */}
                    {!limitReached &&
                  <div className="mt-3 flex items-center gap-3">
                        <div className="flex-1 h-1 rounded-full bg-white/6 overflow-hidden">
                          <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${progressPct}%`,
                          background: progressPct >= 80 ? 'linear-gradient(90deg, #ef4444, #f97316)' : 'linear-gradient(90deg, #7c3aed, #00f5c4)'
                        }} />

                        </div>
                        <span className="text-[11px] text-white/30 flex-shrink-0">
                          {remainingMessages} free {remainingMessages === 1 ? 'message' : 'messages'} left
                        </span>
                      </div>
                  }

                    {!limitReached &&
                  <p className="text-center text-[10px] text-white/20 mt-2">
                        Powered by{' '}
                        <Link href="/" className="text-white/35 hover:text-white/60 transition-colors">PersonaMatrix</Link>
                        {' '}· AI responses may be inaccurate
                      </p>
                  }
                  </div>
                </div>
              </>
            }
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          from { transform: scaleY(0.4); }
          to { transform: scaleY(1); }
        }
        @keyframes avatarPulse {
          from { transform: scale(1); }
          to { transform: scale(1.04); }
        }
      `}</style>
    </div>);

}