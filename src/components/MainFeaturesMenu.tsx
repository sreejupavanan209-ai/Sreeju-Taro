import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SpreadDefinition, UserProfile } from '../types';
import { SPREADS } from '../data/spreads';
import {
  Sparkles,
  Sun,
  LayoutGrid,
  Compass,
  Cross,
  Clock,
  Zap,
  Calculator,
  Bot,
  MessageCircle,
  History,
  X,
  ChevronRight,
  ArrowLeft,
  HeartHandshake,
  Download
} from 'lucide-react';
import { audioFx } from '../utils/audio';

interface MainFeaturesMenuProps {
  user: UserProfile;
  onSelectSpread: (spread: SpreadDefinition, question?: string) => void;
  onOpenNumerology: () => void;
  onOpenAIFeature: () => void;
  onOpenPaidReading: () => void;
  onOpenHistory: () => void;
  onBackToHome: () => void;
  onExit: () => void;
}

export const MainFeaturesMenu: React.FC<MainFeaturesMenuProps> = ({
  user,
  onSelectSpread,
  onOpenNumerology,
  onOpenAIFeature,
  onOpenPaidReading,
  onOpenHistory,
  onBackToHome,
  onExit
}) => {
  // Modal states for multi-option spreads
  const [showThreeCardModal, setShowThreeCardModal] = useState(false);
  const [showFourCardModal, setShowFourCardModal] = useState(false);
  const [showHorseshoeModal, setShowHorseshoeModal] = useState(false);

  // Filter spreads
  const threeCardSpreads = SPREADS.filter(s => s.type === 'three-card');
  const fourCardSpreads = SPREADS.filter(s => s.type === 'four-card');
  const horseshoeSpreads = SPREADS.filter(s => s.type === 'horseshoe');

  const handleLaunchSpread = (spreadId: string) => {
    const spread = SPREADS.find(s => s.id === spreadId);
    if (spread) {
      audioFx.playCardSelectSound();
      setShowThreeCardModal(false);
      setShowFourCardModal(false);
      setShowHorseshoeModal(false);
      onSelectSpread(spread);
    }
  };

  return (
    <div className="min-h-screen bg-[#050711] text-slate-100 flex flex-col justify-between p-4 sm:p-6 relative overflow-x-hidden">
      {/* Background celestial ambiance */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation Bar with Back and Exit */}
      <div className="relative z-10 max-w-6xl w-full mx-auto flex items-center justify-between pb-4 border-b border-amber-500/20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 text-xs uppercase font-cinzel tracking-wider px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-amber-300 hover:border-amber-400/50 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <div>
            <h1 className="text-amber-400 font-cinzel font-bold text-base sm:text-lg tracking-wider">
              THE MYSTIC CARDS
            </h1>
            <span className="text-[10px] text-slate-400 font-sans hidden sm:inline">
              Seeker: <strong className="text-amber-300">{user.name}</strong> ({user.dateOfBirth})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View Reading Records Button */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 text-xs font-cinzel tracking-wider px-3 py-1.5 rounded-lg border border-indigo-500/40 bg-indigo-950/40 text-indigo-300 hover:bg-indigo-900/60 hover:border-indigo-400 transition-colors cursor-pointer"
          >
            <History className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">My Readings</span>
          </button>

          {/* Explicit EXIT Button */}
          <button
            onClick={onExit}
            className="text-xs uppercase font-cinzel tracking-widest px-3 py-1.5 rounded-lg border border-rose-500/40 bg-rose-950/20 text-rose-300 hover:bg-rose-950/50 hover:border-rose-400 transition-colors cursor-pointer"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Main Grid: All 10 Features */}
      <div className="relative z-10 flex-1 max-w-6xl w-full mx-auto my-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-cinzel mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Select Your Sacred Consultation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-500">
            Sacred Tarot Spreads & Pythagorean Oracle
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-cormorant italic max-w-xl mx-auto mt-1">
            Choose from ancient spreads, mathematical soul numerology, or direct AI tarot guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* 1. Single Card Reading */}
          <button
            onClick={() => handleLaunchSpread('single-card')}
            className="group p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-indigo-950/40 border border-amber-500/30 hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/15 text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-cinzel uppercase tracking-widest text-amber-400/70 border border-amber-500/20 px-2 py-0.5 rounded-full">
                1 Card
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold font-cinzel text-amber-200 group-hover:text-amber-100">
                1. Single Card Reading
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                A simple one-card tarot reading providing immediate clarity and direct cosmic counsel.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-400">
              <span className="font-cinzel">Consult Oracle</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 2. How's Your Day? */}
          <button
            onClick={() => handleLaunchSpread('daily-spread')}
            className="group p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-indigo-950/40 border border-amber-500/30 hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/15 text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Sun className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-cinzel uppercase tracking-widest text-amber-400/70 border border-amber-500/20 px-2 py-0.5 rounded-full">
                3 Cards
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold font-cinzel text-amber-200 group-hover:text-amber-100">
                2. How's Your Day?
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Daily tarot spread with three sections: Energy, Challenges, and Divine Guidance.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-400">
              <span className="font-cinzel">View Daily Spread</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 3. 3-Card Spreads */}
          <button
            onClick={() => {
              audioFx.playCardSelectSound();
              setShowThreeCardModal(true);
            }}
            className="group p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-indigo-950/40 border border-amber-500/30 hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/15 text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-cinzel uppercase tracking-widest text-amber-400/70 border border-amber-500/20 px-2 py-0.5 rounded-full">
                5 Spread Types
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold font-cinzel text-amber-200 group-hover:text-amber-100">
                3. 3-Card Spreads
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Choose from Past/Present/Future, Mind/Body/Spirit, Situation/Obstacle/Advice, and more.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-400">
              <span className="font-cinzel">Select 3-Card Type</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 4. 4-Card Focused Life & Relationship Spreads */}
          <button
            onClick={() => {
              audioFx.playCardSelectSound();
              setShowFourCardModal(true);
            }}
            className="group p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 via-purple-950/20 to-slate-950 border border-purple-500/40 hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-cinzel uppercase tracking-widest text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full bg-purple-500/10">
                4 Cards • 4 Spreads
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold font-cinzel text-purple-200 group-hover:text-amber-100">
                4. 4-Card Life Spreads
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Will ex return, marriage problems & harmony, is my job worth it, and current life energy.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-purple-500/20 flex items-center justify-between text-xs text-purple-300 group-hover:text-amber-300">
              <span className="font-cinzel">Choose 4-Card Spread</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 5. Horseshoe Spread */}
          <button
            onClick={() => {
              audioFx.playCardSelectSound();
              setShowHorseshoeModal(true);
            }}
            className="group p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-indigo-950/40 border border-amber-500/30 hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/15 text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-cinzel uppercase tracking-widest text-amber-400/70 border border-amber-500/20 px-2 py-0.5 rounded-full">
                7 Cards
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold font-cinzel text-amber-200 group-hover:text-amber-100">
                4. Horseshoe Spread
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Panoramic 7-card arc with three categories: General, Relationship, and Career.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-400">
              <span className="font-cinzel">Choose Category</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 5. Cross Spread */}
          <button
            onClick={() => handleLaunchSpread('cross-spread')}
            className="group p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-indigo-950/40 border border-amber-500/30 hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/15 text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Cross className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-cinzel uppercase tracking-widest text-amber-400/70 border border-amber-500/20 px-2 py-0.5 rounded-full">
                10 Cards
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold font-cinzel text-amber-200 group-hover:text-amber-100">
                5. Cross Spread
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                The revered 10-card Celtic Cross uncovering conscious and subconscious soul dynamics.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-400">
              <span className="font-cinzel">Master 10-Card Spread</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 6. Past Life Spread */}
          <button
            onClick={() => handleLaunchSpread('past-life-spread')}
            className="group p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-purple-950/40 border border-purple-500/30 hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-purple-500/15 text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-cinzel uppercase tracking-widest text-purple-300/80 border border-purple-500/30 px-2 py-0.5 rounded-full">
                5 Cards
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold font-cinzel text-purple-200 group-hover:text-amber-100">
                6. Past Life Spread
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Dedicated karmic spread: soul origins, unfulfilled vows, past ties, and present healing.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-purple-500/20 flex items-center justify-between text-xs text-purple-300">
              <span className="font-cinzel">Unveil Past Karma</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 7. Future Life Spread */}
          <button
            onClick={() => handleLaunchSpread('future-life-spread')}
            className="group p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-cyan-950/40 border border-cyan-500/30 hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/15 text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-cinzel uppercase tracking-widest text-cyan-300/80 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                5 Cards
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold font-cinzel text-cyan-200 group-hover:text-amber-100">
                7. Future Life Spread
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Dedicated soul destiny spread: spiritual gifts, evolutionary threshold, and highest legacy.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-cyan-500/20 flex items-center justify-between text-xs text-cyan-300">
              <span className="font-cinzel">Explore Destiny Arc</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 8. Pythagorean Numerology */}
          <button
            onClick={() => {
              audioFx.playMysticChime();
              onOpenNumerology();
            }}
            className="group p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-amber-950/30 border border-amber-500/50 hover:border-amber-400 transition-all duration-300 shadow-xl hover:shadow-amber-500/20 text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-cinzel uppercase tracking-widest text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full bg-amber-500/10">
                Full Profile & Years
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold font-cinzel text-amber-200 group-hover:text-amber-100">
                8. Pythagorean Numerology
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Life Path, Destiny, Soul Urge, Personality, Maturity, Pinnacles, Challenges, Attitude & Yearly/Monthly forecasts.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-300">
              <span className="font-cinzel">Open Numerology Portal</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 9. AI Features */}
          <button
            onClick={() => {
              audioFx.playMysticChime();
              onOpenAIFeature();
            }}
            className="group p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-indigo-900/40 border border-indigo-400/50 hover:border-amber-400 transition-all duration-300 shadow-xl hover:shadow-indigo-500/20 text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition-transform">
                <Bot className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-cinzel uppercase tracking-widest text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full bg-indigo-500/10">
                Personalized AI
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold font-cinzel text-indigo-200 group-hover:text-amber-100">
                9. AI Features
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                AI Tarot Guidance: Ask your specific personal question and receive deep astrological card synthesis.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-indigo-500/20 flex items-center justify-between text-xs text-indigo-300">
              <span className="font-cinzel">Consult AI Oracle</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 10. Paid Tarot Reading (₹299) */}
          <button
            onClick={() => {
              audioFx.playMysticChime();
              onOpenPaidReading();
            }}
            className="group p-5 rounded-2xl bg-gradient-to-b from-emerald-950/50 via-slate-900/90 to-amber-950/40 border-2 border-emerald-500/50 hover:border-amber-400 transition-all duration-300 shadow-xl hover:shadow-emerald-500/20 text-left flex flex-col justify-between sm:col-span-2 lg:col-span-3 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-cinzel uppercase tracking-widest text-emerald-400 border border-emerald-500/40 px-2.5 py-0.5 rounded-full bg-emerald-500/10">
                    Professional Live Consultation
                  </span>
                  <h3 className="text-xl font-bold font-cinzel text-emerald-200 group-hover:text-amber-200 mt-1">
                    10. 1-Hour Paid Tarot Reading
                  </h3>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-amber-300 font-cinzel">₹299</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">60 Minutes Session</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2 pt-3 border-t border-emerald-500/20">
              <p className="text-xs text-slate-300">
                Connect directly with a professional tarot reader via WhatsApp (+971 56 945 3580). Full interactive spread & answers.
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-cinzel font-bold text-xs uppercase tracking-wider transition-colors shadow-lg">
                <MessageCircle className="w-4 h-4" />
                <span>Text Your Tarot Reader</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* MODAL: 3-Card Spread Sub-Options */}
      <AnimatePresence>
        {showThreeCardModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-slate-900 border border-amber-500/40 rounded-2xl p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setShowThreeCardModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-cinzel">Select Layout</span>
                <h3 className="text-2xl font-bold font-cinzel text-amber-200 mt-1">
                  Choose Your 3-Card Spread
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Each spread illuminates a distinct triad of consciousness.
                </p>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
                {threeCardSpreads.map((spread) => (
                  <div
                    key={spread.id}
                    onClick={() => handleLaunchSpread(spread.id)}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-amber-400/70 hover:bg-slate-950 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="font-cinzel font-bold text-amber-200 text-sm group-hover:text-amber-100">
                        {spread.name}
                      </h4>
                      <div className="text-[11px] text-amber-400/80 font-cinzel tracking-wider">
                        {spread.subtitle}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {spread.description}
                      </p>
                      <div className="flex gap-2 mt-2">
                        {spread.positions.map((pos, pidx) => (
                          <span
                            key={pidx}
                            className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700"
                          >
                            {pos.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform ml-3 shrink-0" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: 4-Card Spreads Selection */}
      <AnimatePresence>
        {showFourCardModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-slate-900 border border-purple-500/50 rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowFourCardModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-widest text-purple-400 font-cinzel">4-Card Focused Oracles</span>
                <h3 className="text-2xl font-bold font-cinzel text-amber-200 mt-1">
                  Select 4-Card Life Spread
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Targeted, precise 4-card spreads addressing relationships, marriage, career value, and present life energy.
                </p>
              </div>

              <div className="space-y-3">
                {fourCardSpreads.map((spread) => (
                  <div
                    key={spread.id}
                    onClick={() => handleLaunchSpread(spread.id)}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-purple-400/80 hover:bg-slate-950 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <div className="inline-block text-[10px] uppercase font-cinzel tracking-wider text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full mb-1 bg-purple-950/40">
                        {spread.subType || '4 Cards'}
                      </div>
                      <h4 className="font-cinzel font-bold text-amber-200 text-sm sm:text-base group-hover:text-amber-100">
                        {spread.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {spread.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-purple-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-transform ml-3 shrink-0" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: Horseshoe Spread Category Selection */}
      <AnimatePresence>
        {showHorseshoeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-slate-900 border border-amber-500/40 rounded-2xl p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setShowHorseshoeModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-cinzel">7-Card Horseshoe Arc</span>
                <h3 className="text-2xl font-bold font-cinzel text-amber-200 mt-1">
                  Select Horseshoe Category
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Choose the domain of inquiry for your 7-card destiny reading.
                </p>
              </div>

              <div className="space-y-3">
                {horseshoeSpreads.map((spread) => (
                  <div
                    key={spread.id}
                    onClick={() => handleLaunchSpread(spread.id)}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-amber-400/70 hover:bg-slate-950 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <div className="inline-block text-[10px] uppercase font-cinzel tracking-wider text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full mb-1">
                        {spread.subType || 'Category'}
                      </div>
                      <h4 className="font-cinzel font-bold text-amber-200 text-sm group-hover:text-amber-100">
                        {spread.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {spread.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform ml-3 shrink-0" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="relative z-10 text-center py-2 text-xs text-slate-500 font-cinzel">
        ✦ The Mystic Cards • Celestial Sanctuary ✦
      </div>
    </div>
  );
};
