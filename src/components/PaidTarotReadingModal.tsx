import React from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';
import {
  ArrowLeft,
  MessageCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Send,
  Zap,
  HelpCircle
} from 'lucide-react';
import { audioFx } from '../utils/audio';

interface PaidTarotReadingModalProps {
  user: UserProfile;
  onBack: () => void;
  onExit: () => void;
}

export const PaidTarotReadingModal: React.FC<PaidTarotReadingModalProps> = ({
  user,
  onBack,
  onExit
}) => {
  const WHATSAPP_PHONE = '971569453580'; // +971 56 945 3580
  const message = encodeURIComponent(
    `Hello! I would like to book a 1-Hour Paid Tarot Reading (₹299).\n\nMy Details:\n• Name: ${user.name}\n• Age: ${user.age}\n• Date of Birth: ${user.dateOfBirth}\n\nPlease let me know your available slots.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;

  const handleWhatsAppClick = () => {
    audioFx.playMysticChime();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#050711] text-slate-100 flex flex-col justify-between p-4 sm:p-6 relative overflow-x-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & Navigation */}
      <div className="relative z-10 max-w-4xl w-full mx-auto flex items-center justify-between pb-4 border-b border-amber-500/20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs uppercase font-cinzel tracking-wider px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-amber-300 hover:border-amber-400/50 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Spreads</span>
          </button>
          <div>
            <h2 className="text-amber-400 font-cinzel font-bold text-base sm:text-lg tracking-wider">
              Paid Tarot Reading
            </h2>
            <div className="text-[11px] text-slate-400 font-sans">
              1-on-1 Personal Master Consultation
            </div>
          </div>
        </div>

        <button
          onClick={onExit}
          className="text-xs uppercase font-cinzel tracking-widest px-3 py-1.5 rounded-lg border border-rose-500/40 bg-rose-950/20 text-rose-300 hover:bg-rose-950/50 hover:border-rose-400 transition-colors cursor-pointer"
        >
          Exit
        </button>
      </div>

      {/* Main Consultation Card */}
      <div className="relative z-10 flex-1 max-w-2xl w-full mx-auto my-6 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/95 via-emerald-950/20 to-slate-950/95 border-2 border-emerald-500/50 shadow-2xl backdrop-blur-md"
        >
          {/* Header Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-cinzel mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Private 1-on-1 Consultation</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-amber-200 to-emerald-400">
              1-Hour Tarot Reading
            </h3>
            <div className="mt-3 flex items-center justify-center gap-3">
              <span className="text-3xl sm:text-4xl font-black font-cinzel text-amber-300">
                ₹299
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider border border-slate-700">
                Full 60 Minutes
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-2">
              Experience an intimate, unhurried reading with a master practitioner who interprets your unique life questions with precision.
            </p>
          </div>

          {/* Included Features List */}
          <div className="space-y-3 bg-slate-950/70 p-5 rounded-2xl border border-emerald-500/30 mb-6">
            <span className="text-xs uppercase font-cinzel tracking-wider text-amber-300 font-bold block mb-1">
              What's Included in Your 1-Hour Session:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Unlimited questions across love, career & spiritual path</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Live WhatsApp voice/chat or scheduled video call</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>High-resolution photos of all spread layouts drawn</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Integration of your Pythagorean numerology blueprint</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Personalized crystal, herbal & spiritual remedy guidance</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>100% confidential and compassionate safe space</span>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp Contact Details */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center mb-6">
            <span className="text-[11px] text-emerald-300 font-cinzel uppercase tracking-wider block">
              Direct Contact Number
            </span>
            <span className="text-lg font-mono font-bold text-white tracking-wider">
              +971 56 945 3580
            </span>
          </div>

          {/* Primary CTA: Text Your Tarot Reader */}
          <button
            onClick={handleWhatsAppClick}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-cinzel font-bold text-sm sm:text-base uppercase tracking-widest shadow-xl shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer group"
          >
            <MessageCircle className="w-6 h-6 text-slate-950 fill-current group-hover:rotate-12 transition-transform" />
            <span>Text Your Tarot Reader</span>
          </button>

          <p className="text-center text-[11px] text-slate-400 mt-3 font-cormorant italic">
            Opens WhatsApp directly with your seeker profile details prepared.
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-2 text-xs text-slate-500 font-cinzel">
        ✦ The Mystic Cards • Professional Consultations ✦
      </div>
    </div>
  );
};
