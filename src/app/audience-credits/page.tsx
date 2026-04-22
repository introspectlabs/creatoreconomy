'use client';
import React, { useState } from 'react';
import { CreditCard, ShoppingCart, Check, Zap, Sparkles, Clock } from 'lucide-react';
import AudienceLayout from '@/components/AudienceLayout';

interface CreditPack {
  id: string;
  chats: number;
  price: number;
  label: string;
  popular?: boolean;
  perChat: string;
}

const CREDIT_PACKS: CreditPack[] = [
  { id: 'p1', chats: 10, price: 2, label: '10 Chats', perChat: '$0.20' },
  { id: 'p2', chats: 30, price: 5, label: '30 Chats', perChat: '$0.17', popular: true },
  { id: 'p3', chats: 100, price: 15, label: '100 Chats', perChat: '$0.15' },
  { id: 'p4', chats: 300, price: 39, label: '300 Chats', perChat: '$0.13' },
];

const TRANSACTION_HISTORY = [
  { id: 't1', type: 'purchase', label: '30 Chat Credits', amount: '+30', price: '$5.00', date: '3 days ago', icon: '💳' },
  { id: 't2', type: 'usage', label: 'Chat with Alex the Mentor', amount: '-1', price: '', date: '2h ago', icon: '💬' },
  { id: 't3', type: 'usage', label: 'Chat with Dr. Wellness', amount: '-1', price: '', date: '2d ago', icon: '💬' },
  { id: 't4', type: 'free', label: 'Free chat bonus', amount: '+5', price: 'Free', date: '1w ago', icon: '🎁' },
];

export default function AudienceCreditsPage() {
  const [credits, setCredits] = useState(28);
  const [selected, setSelected] = useState('p2');
  const [showSuccess, setShowSuccess] = useState(false);

  const pack = CREDIT_PACKS.find((p) => p.id === selected)!;

  const handlePurchase = () => {
    setCredits((v) => v + pack.chats);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <AudienceLayout topbarTitle="My Credits" topbarIcon={CreditCard} credits={credits}>
      <div className="px-4 sm:px-6 py-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">My Credits</h2>
          <p className="text-white/55 text-sm mt-1">Buy chat credits — no subscription, pay as you go</p>
        </div>

        {/* Success banner */}
        {showSuccess && (
          <div className="mb-5 px-5 py-4 rounded-2xl border border-green-500/30 bg-green-500/10 flex items-center gap-3">
            <Check size={16} className="text-green-400 flex-shrink-0" />
            <p className="text-sm font-semibold text-green-300">Purchase successful! {pack.chats} credits added to your account.</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: balance + buy */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Balance card */}
            <div
              className="rounded-2xl border border-[#6b7ff0]/20 p-6 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(107,127,240,0.15) 0%, rgba(124,58,237,0.10) 100%)' }}
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#7c3aed]/10 blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard size={15} className="text-[#6b7ff0]" />
                  <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Current Balance</p>
                </div>
                <p className="text-5xl font-extrabold text-white mb-1">{credits}</p>
                <p className="text-sm text-white/40">chat credits available</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
                  <Zap size={12} className="text-[#6b7ff0]" />
                  <span>1 credit = 1 chat message with any creator</span>
                </div>
              </div>
            </div>

            {/* Buy credits */}
            <div className="rounded-2xl border border-white/10 p-5" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <ShoppingCart size={14} className="text-[#6b7ff0]" />
                Buy Credits
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {CREDIT_PACKS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelected(p.id)}
                    className={`relative flex flex-col items-start p-4 rounded-xl border transition-all duration-150 text-left ${
                      selected === p.id
                        ? 'border-[#6b7ff0] bg-[#6b7ff0]/10'
                        : 'border-white/10 bg-white/3 hover:bg-white/6 hover:border-white/20'
                    }`}
                  >
                    {p.popular && (
                      <span className="absolute -top-2 left-3 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#7c3aed] text-white">POPULAR</span>
                    )}
                    <p className="text-sm font-bold text-white mb-0.5">{p.label}</p>
                    <p className="text-xl font-extrabold text-[#6b7ff0]">${p.price}</p>
                    <p className="text-[10px] text-white/55 mt-0.5">{p.perChat} per chat</p>
                    {selected === p.id && (
                      <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#6b7ff0] flex items-center justify-center">
                        <Check size={10} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Order summary */}
              <div className="mb-4 px-4 py-3 rounded-xl bg-white/4 border border-white/8">
                <div className="flex items-center justify-between text-xs text-white/50 mb-1">
                  <span>{pack.label}</span>
                  <span>${pack.price}.00</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-white border-t border-white/8 pt-2 mt-2">
                  <span>Total</span>
                  <span>${pack.price}.00</span>
                </div>
              </div>

              <button
                onClick={handlePurchase}
                className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all duration-150 flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #6b7ff0 0%, #7c3aed 100%)' }}
              >
                <Sparkles size={15} />
                Buy {pack.label} — ${pack.price}
              </button>
              <p className="text-center text-[10px] text-white/25 mt-3">Secure checkout · No recurring charges</p>
            </div>
          </div>

          {/* Right: transaction history */}
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-white/10 p-5" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Clock size={14} className="text-[#6b7ff0]" />
                Transaction History
              </h3>
              <div className="flex flex-col gap-3">
                {TRANSACTION_HISTORY.map((t) => (
                  <div key={t.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                    <span className="text-lg flex-shrink-0">{t.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{t.label}</p>
                      <p className="text-[10px] text-white/30">{t.date}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={`text-xs font-bold ${t.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{t.amount}</p>
                      {t.price && <p className="text-[10px] text-white/30">{t.price}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div className="rounded-2xl border border-white/10 p-5" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <h3 className="text-sm font-bold text-white mb-3">How Credits Work</h3>
              <div className="flex flex-col gap-3">
                {[
                  { emoji: '🎁', text: '5 free chats when you sign up' },
                  { emoji: '💬', text: '1 credit = 1 chat with any persona' },
                  { emoji: '♾️', text: 'Credits never expire' },
                  { emoji: '🚫', text: 'No subscription required' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-xs text-white/50">
                    <span>{item.emoji}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AudienceLayout>
  );
}
