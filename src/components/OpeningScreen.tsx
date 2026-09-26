import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TarotCardVisual } from './TarotCardVisual';
import { Sparkles, Compass } from 'lucide-react';
import { audioFx } from '../utils/audio';

interface OpeningScreenProps {
  onComplete: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onComplete }) => {
  const [animationStage, setAnimationStage] = useState<'title' | 'deck-appear' | 'spreading' | 'ready'>('title');

  useEffect(() => {
    // 1. Title appears
    const timer1 = setTimeout(() => {
      setAnimationStage('deck-appear');
      audioFx.playCardSelectSound();
    }, 1200);

    // 2. Deck bundle spreads across the screen
    const timer2 = setTimeout(() => {
      setAnimationStage('spreading');
      audioFx.playMysticChime();
    }, 2400);

    // 3. Ready to proceed
    const timer3 = setTimeout(() => {
      setAnimationStage('ready');
    }, 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // 9 cards for spreading animation fan
  const spreadingCards = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div className="relative min-h-screen w-full bg-[#050711] overflow-hidden flex flex-col items-center justify-between p-6 select-none">
      {/* Background Starfield & Celestial Aurora */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(79,70,229,0.15)_0%,_rgba(15,23,42,0.6)_50%,_rgba(5,7,17,1)_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Decorative Constellations */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Top Header Glyph */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 pt-4 flex items-center gap-2 text-amber-400/70 text-xs tracking-widest uppercase font-cinzel"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Ancient Wisdom • Celestial Oracle</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
      </motion.div>

      {/* Central Hero Section: Title & Cards */}
      <div className="relative z-10 flex-1 w-full max-w-4xl flex flex-col items-center justify-center text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="text-xs sm:text-sm tracking-[0.3em] uppercase text-amber-400/90 font-cinzel font-semibold mb-2 flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-amber-400/60" />
            Oracle of Arcana & Cosmos
            <span className="w-8 h-[1px] bg-amber-400/60" />
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 font-cinzel drop-shadow-[0_0_25px_rgba(245,158,11,0.4)]">
            THE MYSTIC CARDS
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300/80 font-cormorant max-w-lg mx-auto italic">
            Where the sacred numbers of Pythagoras meet the timeless archetype of the Tarot
          </p>
        </motion.div>

        {/* Animated Tarot Card Bundle & Majestic Spread */}
        <div className="relative h-64 sm:h-72 w-full max-w-2xl flex items-center justify-center my-4">
          <AnimatePresence>
            {animationStage !== 'title' && (
              <div className="relative w-full h-full flex items-center justify-center">
                {spreadingCards.map((idx) => {
                  const centerIndex = 4;
                  const offset = idx - centerIndex;
                  const isSpread = animationStage === 'spreading' || animationStage === 'ready';

                  // Spreading configuration: arc fan calculation
                  const targetX = isSpread ? offset * (window.innerWidth < 640 ? 32 : 55) : 0;
                  const targetY = isSpread ? Math.abs(offset) * 12 : 0;
                  const targetRotate = isSpread ? offset * 7 : (idx - centerIndex) * 2;
                  const targetScale = isSpread && offset === 0 ? 1.08 : 0.95;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 50, scale: 0.7 }}
                      animate={{
                        opacity: 1,
                        x: targetX,
                        y: targetY,
                        rotate: targetRotate,
                        scale: targetScale,
                        zIndex: 10 + (offset === 0 ? 10 : 5 - Math.abs(offset))
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 70,
                        damping: 14,
                        delay: isSpread ? idx * 0.06 : 0
                      }}
                      className="absolute cursor-pointer filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                    >
                      <TarotCardVisual isFaceDown size="md" />
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Enter Sanctuary Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: animationStage === 'ready' ? 1 : 0.8, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 flex flex-col items-center gap-3"
        >
          <button
            onClick={() => {
              audioFx.playMysticChime();
              onComplete();
            }}
            className="group relative px-8 py-3.5 rounded-full overflow-hidden transition-all duration-300 shadow-xl cursor-pointer"
          >
            {/* Shimmering gold border & gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 shimmer-gold opacity-50" />
            <div className="relative flex items-center gap-2.5 font-cinzel font-bold text-slate-950 text-sm tracking-widest uppercase">
              <Compass className="w-4 h-4 text-slate-950 group-hover:rotate-45 transition-transform" />
              <span>Enter Sanctuary</span>
            </div>
          </button>
          <span className="text-xs text-amber-300/60 font-serif italic">
            Click to cross the celestial threshold
          </span>
        </motion.div>
      </div>

      {/* Bottom Subtitle / Sacred Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-10 pb-2 text-center text-[11px] text-slate-500 tracking-wider font-cinzel"
      >
        ✦ 78 Sacred Keys • Pythagorean Matrix • Divine Counsel ✦
      </motion.div>
    </div>
  );
};
