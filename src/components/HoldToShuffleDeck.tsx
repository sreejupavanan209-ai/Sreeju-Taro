import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DrawnCard, SpreadDefinition, TarotCard, UserProfile } from '../types';
import { getFullDeck } from '../data/tarotCards';
import { TarotCardVisual } from './TarotCardVisual';
import { audioFx } from '../utils/audio';
import { Sparkles, ArrowLeft, RefreshCw, CheckCircle2, Hand } from 'lucide-react';

interface HoldToShuffleDeckProps {
  spread: SpreadDefinition;
  user: UserProfile;
  customQuestion?: string;
  onReadingReady: (drawnCards: DrawnCard[], question?: string) => void;
  onBack: () => void;
  onExit: () => void;
}

export const HoldToShuffleDeck: React.FC<HoldToShuffleDeckProps> = ({
  spread,
  customQuestion,
  onReadingReady,
  onBack,
  onExit
}) => {
  // Complete deck state
  const [deck, setDeck] = useState<TarotCard[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [hasShuffled, setHasShuffled] = useState(false);
  const [shuffleTicks, setShuffleTicks] = useState(0);

  // Selected card indices from the deck
  const [selectedDeckIndices, setSelectedDeckIndices] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const shuffleIntervalRef = useRef<number | null>(null);

  // Initialize deck on mount
  useEffect(() => {
    const full = getFullDeck();
    setDeck(full);
  }, []);

  // Shuffle continuous animation tick
  const startShuffling = useCallback(() => {
    if (isShuffling) return;
    setIsShuffling(true);
    audioFx.startShuffleSound();

    shuffleIntervalRef.current = window.setInterval(() => {
      setShuffleTicks((prev) => prev + 1);
      // Continuous random card swapping
      setDeck((current) => {
        const next = [...current];
        for (let i = 0; i < 4; i++) {
          const a = Math.floor(Math.random() * next.length);
          const b = Math.floor(Math.random() * next.length);
          const temp = next[a];
          next[a] = next[b];
          next[b] = temp;
        }
        return next;
      });
    }, 60);
  }, [isShuffling]);

  const stopShuffling = useCallback(() => {
    if (!isShuffling) return;
    setIsShuffling(false);
    audioFx.stopShuffleSound();

    if (shuffleIntervalRef.current) {
      clearInterval(shuffleIntervalRef.current);
      shuffleIntervalRef.current = null;
    }

    setHasShuffled(true);
    audioFx.playCardSelectSound();
  }, [isShuffling]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (shuffleIntervalRef.current) {
        clearInterval(shuffleIntervalRef.current);
      }
      audioFx.stopShuffleSound();
    };
  }, []);

  // Card Selection Handler
  const handleSelectCard = (index: number) => {
    if (!hasShuffled) return;

    if (selectedDeckIndices.includes(index)) {
      // Deselect
      setSelectedDeckIndices(prev => prev.filter(i => i !== index));
      audioFx.playCardSelectSound();
      return;
    }

    if (selectedDeckIndices.length < spread.cardCount) {
      setSelectedDeckIndices(prev => [...prev, index]);
      audioFx.playCardSelectSound();
    }
  };

  // Trigger Reading Generation
  const handleGetReading = () => {
    if (selectedDeckIndices.length !== spread.cardCount) return;
    setIsGenerating(true);
    audioFx.playMysticChime();

    // Map selected indices to DrawnCard objects with upright/reversed determination
    const drawn: DrawnCard[] = selectedDeckIndices.map((deckIndex, posIndex) => {
      const card = deck[deckIndex];
      // 25% chance of reversed card for authentic tarot reading depth
      const isReversed = Math.random() < 0.25;
      const positionDef = spread.positions[posIndex] || {
        index: posIndex,
        name: `Position ${posIndex + 1}`,
        description: 'Cosmic influence'
      };

      return {
        positionIndex: posIndex,
        positionName: positionDef.name,
        card,
        isReversed
      };
    });

    setTimeout(() => {
      onReadingReady(drawn, customQuestion);
    }, 400);
  };

  const remainingToSelect = spread.cardCount - selectedDeckIndices.length;

  return (
    <div className="min-h-screen bg-[#050711] text-slate-100 flex flex-col justify-between p-4 sm:p-6 relative select-none overflow-x-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & Navigation */}
      <div className="relative z-10 max-w-6xl w-full mx-auto flex items-center justify-between pb-4 border-b border-amber-500/20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs uppercase font-cinzel tracking-wider px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-amber-300 hover:border-amber-400/50 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <div>
            <h2 className="text-amber-400 font-cinzel font-bold text-base sm:text-lg tracking-wider">
              {spread.name}
            </h2>
            <div className="text-[11px] text-slate-400 font-cormorant italic">
              {customQuestion ? `Inquiry: "${customQuestion}"` : spread.subtitle}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExit}
            className="text-xs uppercase font-cinzel tracking-widest px-3 py-1.5 rounded-lg border border-rose-500/40 bg-rose-950/20 text-rose-300 hover:bg-rose-950/50 hover:border-rose-400 transition-colors cursor-pointer"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Main Tarot Interaction Area */}
      <div className="relative z-10 flex-1 max-w-6xl w-full mx-auto flex flex-col items-center justify-center my-4">
        {/* Instruction Badge */}
        <div className="text-center mb-4">
          {!hasShuffled ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-cinzel font-bold tracking-wider animate-pulse"
            >
              <Hand className="w-4 h-4 text-amber-400" />
              <span>HOLD TO SHUFFLE</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/40 text-indigo-200 text-xs sm:text-sm font-cinzel"
            >
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>
                {remainingToSelect > 0
                  ? `Select ${remainingToSelect} more ${remainingToSelect === 1 ? 'card' : 'cards'} from the row below`
                  : 'All cards selected! Reveal your oracle below'}
              </span>
            </motion.div>
          )}

          <p className="text-xs text-slate-400 font-serif italic mt-1.5">
            {!hasShuffled
              ? 'Press and hold down on the deck bundle below to rapidly shuffle the cards'
              : `Spread requires ${spread.cardCount} cards. Select your intuitive choices.`}
          </p>
        </div>

        {/* Selected Slots Preview (Top Dock) */}
        <div className="w-full max-w-4xl mb-6">
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            {spread.positions.map((pos, pidx) => {
              const selectedIdx = selectedDeckIndices[pidx];
              const isFilled = selectedIdx !== undefined;

              return (
                <div
                  key={pidx}
                  className="flex flex-col items-center"
                >
                  <div className="text-[10px] sm:text-xs font-cinzel text-amber-400/90 mb-1 max-w-[80px] sm:max-w-[100px] text-center truncate">
                    {pos.name}
                  </div>
                  <div
                    className={`w-16 h-24 sm:w-20 sm:h-32 rounded-lg border-2 flex items-center justify-center transition-all duration-300 relative ${
                      isFilled
                        ? 'border-amber-400 bg-amber-950/40 shadow-lg shadow-amber-500/20'
                        : 'border-dashed border-slate-700 bg-slate-950/40'
                    }`}
                  >
                    {isFilled ? (
                      <div className="w-full h-full p-1 flex flex-col items-center justify-center">
                        <TarotCardVisual isFaceDown size="sm" className="w-full h-full" />
                        <span className="absolute bottom-1 text-[9px] font-bold text-amber-300 font-cinzel">
                          #{pidx + 1}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs font-cinzel text-slate-600">
                        {pidx + 1}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SHUFFLE / SPREAD INTERACTION AREA */}
        {!hasShuffled ? (
          /* Deck Bundle: Press and Hold to Shuffle */
          <div
            onPointerDown={startShuffling}
            onPointerUp={stopShuffling}
            onPointerLeave={stopShuffling}
            onPointerCancel={stopShuffling}
            className="relative w-72 h-80 sm:w-80 sm:h-96 flex items-center justify-center cursor-grab active:cursor-grabbing p-4 rounded-3xl group"
          >
            {/* Pulsing Aura */}
            <div
              className={`absolute inset-0 rounded-3xl transition-all duration-300 ${
                isShuffling
                  ? 'bg-amber-500/20 ring-4 ring-amber-400/80 shadow-[0_0_50px_rgba(245,158,11,0.5)]'
                  : 'bg-slate-900/40 border border-amber-500/30 group-hover:border-amber-400/60'
              }`}
            />

            {/* Simulated 3D Deck Bundle Stack with Rapid Shuffling Animation */}
            <div className="relative w-40 h-60 sm:w-48 sm:h-72 flex items-center justify-center">
              {Array.from({ length: 12 }).map((_, i) => {
                // When shuffling, rapidly jitter and fan out cards
                const randomAngle = isShuffling
                  ? (Math.sin(shuffleTicks * 0.8 + i * 2) * 18).toFixed(1)
                  : (i - 6) * 1.2;
                const randomX = isShuffling
                  ? (Math.cos(shuffleTicks * 0.9 + i * 1.5) * 45).toFixed(1)
                  : (i - 6) * 1.5;
                const randomY = isShuffling
                  ? (Math.sin(shuffleTicks * 1.1 + i * 2) * 20).toFixed(1)
                  : i * -1.5;

                return (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: parseFloat(randomAngle.toString()),
                      x: parseFloat(randomX.toString()),
                      y: parseFloat(randomY.toString()),
                      scale: isShuffling ? 1.05 : 1
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: isShuffling ? 400 : 120,
                      damping: 15
                    }}
                    className="absolute shadow-2xl pointer-events-none"
                    style={{ zIndex: i }}
                  >
                    <TarotCardVisual isFaceDown size="md" />
                  </motion.div>
                );
              })}
            </div>

            {/* Floating Banner */}
            <div className="absolute -bottom-2 px-5 py-2 rounded-full bg-slate-950 border border-amber-400 text-amber-300 font-cinzel text-xs font-bold tracking-widest uppercase shadow-xl flex items-center gap-2">
              <RefreshCw className={`w-3.5 h-3.5 ${isShuffling ? 'animate-spin' : ''}`} />
              <span>{isShuffling ? 'SHUFFLING RAPIDLY...' : 'PRESS & HOLD TO SHUFFLE'}</span>
            </div>
          </div>
        ) : (
          /* Cards Arranged Neatly in a Row / Fan Ribbon */
          <div className="w-full max-w-5xl">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-cinzel text-amber-300">
                Pick Your Cards ({selectedDeckIndices.length} / {spread.cardCount} Selected)
              </span>
              <button
                onClick={() => {
                  setHasShuffled(false);
                  setSelectedDeckIndices([]);
                  audioFx.playCardSelectSound();
                }}
                className="text-[11px] text-slate-400 hover:text-amber-300 underline font-serif cursor-pointer"
              >
                Shuffle Again
              </button>
            </div>

            {/* Horizontal Scrollable Ribbon */}
            <div className="w-full overflow-x-auto py-6 px-2 custom-scrollbar">
              <div className="flex items-center gap-2 sm:gap-3 min-w-max pb-2">
                {deck.slice(0, 36).map((_, idx) => {
                  const isSelected = selectedDeckIndices.includes(idx);
                  const selectedOrder = selectedDeckIndices.indexOf(idx);

                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectCard(idx)}
                      className={`relative transition-all duration-300 transform cursor-pointer ${
                        isSelected ? '-translate-y-4 scale-105' : 'hover:-translate-y-2'
                      }`}
                    >
                      <TarotCardVisual
                        isFaceDown
                        size="sm"
                        selected={isSelected}
                      />
                      {isSelected && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-500 border border-white text-slate-950 font-bold text-xs flex items-center justify-center shadow-lg font-cinzel z-20">
                          {selectedOrder + 1}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* GET YOUR READING Button */}
        <div className="mt-6 h-14 flex items-center justify-center">
          <AnimatePresence>
            {hasShuffled && selectedDeckIndices.length === spread.cardCount && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 15 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleGetReading}
                disabled={isGenerating}
                className="relative px-10 py-4 rounded-full overflow-hidden shadow-2xl shadow-amber-500/40 cursor-pointer group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700" />
                <div className="absolute inset-0 shimmer-gold opacity-60" />
                <div className="relative flex items-center gap-3 text-slate-950 font-cinzel font-extrabold text-sm sm:text-base tracking-widest uppercase">
                  <Sparkles className="w-5 h-5 text-slate-950 animate-spin [animation-duration:8s]" />
                  <span>{isGenerating ? 'DIVINING ARCANA...' : 'GET YOUR READING'}</span>
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-2 text-xs text-slate-500 font-cinzel">
        ✦ The Mystic Cards • Intuitive Card Selection ✦
      </div>
    </div>
  );
};
