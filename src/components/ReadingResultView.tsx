import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DrawnCard, ReadingRecord, SpreadDefinition, UserProfile } from '../types';
import { TarotCardVisual } from './TarotCardVisual';
import { generateAITarotGuidance } from '../utils/aiOracle';
import { saveReading } from '../utils/storage';
import { audioFx } from '../utils/audio';
import {
  Sparkles,
  ArrowLeft,
  BookmarkCheck,
  Bookmark,
  Share2,
  Check,
  Compass,
  Layers,
  ChevronDown,
  Info,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Eye,
  Scroll,
  HelpCircle,
  CheckCircle2,
  MessageCircle,
  Phone,
  Quote
} from 'lucide-react';

interface ReadingResultViewProps {
  spread: SpreadDefinition;
  user: UserProfile;
  drawnCards: DrawnCard[];
  customQuestion?: string;
  onBack: () => void;
  onExit: () => void;
  onViewHistory: () => void;
}

export const ReadingResultView: React.FC<ReadingResultViewProps> = ({
  spread,
  user,
  drawnCards,
  customQuestion,
  onBack,
  onExit,
  onViewHistory
}) => {
  const WHATSAPP_PHONE = '971569453580';
  const DISPLAY_PHONE = '+971 56 945 3580';
  const whatsappMsg = encodeURIComponent(
    `Hello! I just completed my "${spread.name}" tarot reading on The Mystic Cards.\n\n` +
    `• Seeker: ${user.name} (DOB: ${user.dateOfBirth})\n` +
    (customQuestion ? `• Question: "${customQuestion}"\n` : '') +
    `• Cards Drawn: ${drawnCards.map(c => c.card.name).join(', ')}\n\n` +
    `I would like to book a personal 1-on-1 reading with you on WhatsApp.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${whatsappMsg}`;

  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'both' | 'individual' | 'overall'>('both');
  const [interpretation, setInterpretation] = useState<string>('');
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(true);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const individualSectionRef = useRef<HTMLDivElement>(null);
  const overallSectionRef = useRef<HTMLDivElement>(null);

  // Sequential card reveal animation on mount
  useEffect(() => {
    drawnCards.forEach((_, idx) => {
      setTimeout(() => {
        setRevealedIndices(prev => [...prev, idx]);
        audioFx.playCardSelectSound();
      }, (idx + 1) * 320);
    });

    // Synthesize reading / call AI
    const synthesize = async () => {
      setIsLoadingAI(true);
      try {
        const text = await generateAITarotGuidance({
          question: customQuestion,
          user,
          spread,
          drawnCards
        });
        setInterpretation(text);
        audioFx.playMysticChime();
      } catch (err) {
        console.error('Synthesis error:', err);
      } finally {
        setIsLoadingAI(false);
      }
    };

    const aiTimer = setTimeout(() => {
      synthesize();
    }, drawnCards.length * 320 + 200);

    return () => clearTimeout(aiTimer);
  }, [drawnCards, customQuestion, spread, user]);

  // Save Reading to Storage
  const handleSaveReading = () => {
    if (isSaved) return;

    const newRecord: ReadingRecord = {
      id: `reading-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId: user.id,
      userName: user.name,
      createdAt: new Date().toISOString(),
      spreadType: spread.type,
      spreadSubType: spread.subType,
      spreadName: spread.name,
      question: customQuestion,
      cards: drawnCards,
      aiSynthesis: interpretation
    };

    saveReading(newRecord);
    setIsSaved(true);
    audioFx.playMysticChime();
  };

  const handleShare = () => {
    const text = `The Mystic Cards - ${spread.name} for ${user.name}\n` +
      `Question: ${customQuestion || 'General Reading'}\n\n` +
      `INDIVIDUAL CARD READINGS:\n` +
      drawnCards.map((dc, i) => `${i + 1}. [${dc.positionName}] ${dc.card.name} (${dc.isReversed ? 'Reversed' : 'Upright'})\n   - Meaning: ${dc.isReversed ? dc.card.reversedMeaning : dc.card.uprightMeaning}\n   - Advice: ${dc.card.advice}`).join('\n\n') +
      `\n\nOVERALL OUTCOME:\n` + interpretation;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToCard = (index: number) => {
    setActiveCardIndex(index);
    audioFx.playCardSelectSound();
    const element = document.getElementById(`individual-card-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Elemental Count & Dignity calculation
  const elementCounts: Record<string, number> = { Fire: 0, Water: 0, Air: 0, Earth: 0, Spirit: 0 };
  let reversedCount = 0;
  drawnCards.forEach(dc => {
    if (elementCounts[dc.card.element] !== undefined) {
      elementCounts[dc.card.element]++;
    }
    if (dc.isReversed) reversedCount++;
  });

  const dominantElement = Object.entries(elementCounts).reduce((max, curr) => curr[1] > max[1] ? curr : max, ['Spirit', 0]);

  const outcomeCard = drawnCards[drawnCards.length - 1];

  return (
    <div className="min-h-screen bg-[#050711] text-slate-100 flex flex-col justify-between p-4 sm:p-6 relative overflow-x-hidden">
      {/* Background Celestial Glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation Bar */}
      <div className="relative z-10 max-w-6xl w-full mx-auto flex items-center justify-between pb-4 border-b border-amber-500/20">
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
              {spread.name} ({drawnCards.length} Cards)
            </h2>
            <div className="text-[11px] text-slate-400 font-cormorant italic">
              Seeker: <strong className="text-amber-200">{user.name}</strong> • {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-xs font-cinzel tracking-wider px-3 py-1.5 rounded-lg border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
            title="Copy reading summary"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
          </button>

          {/* Save Reading Button */}
          <button
            onClick={handleSaveReading}
            className={`flex items-center gap-1.5 text-xs font-cinzel tracking-wider px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
              isSaved
                ? 'bg-emerald-950/70 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                : 'bg-amber-950/50 border-amber-400/70 text-amber-300 hover:bg-amber-900/60'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{isSaved ? 'Saved' : 'Save Reading'}</span>
          </button>

          <button
            onClick={onExit}
            className="text-xs uppercase font-cinzel tracking-widest px-3 py-1.5 rounded-lg border border-rose-500/40 bg-rose-950/20 text-rose-300 hover:bg-rose-950/50 hover:border-rose-400 transition-colors cursor-pointer"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 max-w-6xl w-full mx-auto my-6 space-y-8">
        {/* User Question Banner if provided */}
        {customQuestion && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-indigo-950/30 border border-amber-500/40 shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Compass className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-cinzel tracking-wider text-amber-400/90 font-bold">Seeker's Question</span>
                <p className="text-base font-serif italic text-amber-100 mt-0.5">"{customQuestion}"</p>
              </div>
            </div>
            <div className="hidden sm:block text-right">
              <span className="text-[10px] uppercase font-cinzel tracking-wider text-slate-400">Spread Focus</span>
              <div className="text-xs text-amber-300 font-cinzel font-semibold">{spread.subtitle}</div>
            </div>
          </div>
        )}

        {/* SECTION 1: THE SPREAD REVEAL (Interactive Card Ribbon / Array) */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-950/80 border border-amber-500/30 shadow-2xl">
          <div className="text-center mb-5">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-cinzel font-semibold">The Sacred Draw</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-amber-200 mt-1">
              Revealed Alignment ({drawnCards.length} Cards)
            </h3>
            <p className="text-xs text-slate-400 font-cormorant italic max-w-lg mx-auto mt-1">
              Every card has been drawn from the 78-card Rider-Waite deck. Below you will find both the individual card interpretations and the unified outcome.
            </p>
          </div>

          {/* Cards Display Grid with Original Photos */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap py-2">
            {drawnCards.map((dc, idx) => {
              const isRevealed = revealedIndices.includes(idx);
              const isSelected = activeCardIndex === idx;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: idx * 0.12 }}
                  onClick={() => scrollToCard(idx)}
                  className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                    isSelected ? 'scale-105 z-20' : 'hover:scale-102 opacity-95 hover:opacity-100'
                  }`}
                >
                  {/* Position Badge */}
                  <div className="text-[10px] sm:text-[11px] font-cinzel font-bold text-amber-300 text-center mb-1.5 px-2 py-0.5 rounded-full bg-slate-900 border border-amber-500/30 max-w-[130px] truncate">
                    #{idx + 1} {dc.positionName}
                  </div>

                  {/* Card Visual with Original Photo */}
                  <div className="relative">
                    {isRevealed ? (
                      <TarotCardVisual
                        card={dc.card}
                        isReversed={dc.isReversed}
                        size={drawnCards.length > 6 ? 'sm' : 'md'}
                        selected={isSelected}
                      />
                    ) : (
                      <TarotCardVisual
                        isFaceDown
                        size={drawnCards.length > 6 ? 'sm' : 'md'}
                      />
                    )}
                  </div>

                  {/* Card Name and Orientation */}
                  <div className="mt-2 text-center max-w-[125px]">
                    <div className="text-xs font-cinzel font-bold text-slate-100 truncate">
                      {dc.card.name}
                    </div>
                    <div className="text-[10px]">
                      {dc.isReversed ? (
                        <span className="text-rose-400 font-semibold">Reversed</span>
                      ) : (
                        <span className="text-emerald-400 font-semibold">Upright</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Filter Navigation Tabs */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-center gap-2">
            <button
              onClick={() => setViewMode('both')}
              className={`px-4 py-1.5 rounded-xl font-cinzel text-xs tracking-wider transition-all cursor-pointer ${
                viewMode === 'both'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400/50'
              }`}
            >
              All Readings (Individual + Overall)
            </button>
            <button
              onClick={() => {
                setViewMode('individual');
                individualSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-1.5 rounded-xl font-cinzel text-xs tracking-wider transition-all cursor-pointer ${
                viewMode === 'individual'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400/50'
              }`}
            >
              Individual Cards (1 to {drawnCards.length})
            </button>
            <button
              onClick={() => {
                setViewMode('overall');
                overallSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-1.5 rounded-xl font-cinzel text-xs tracking-wider transition-all cursor-pointer ${
                viewMode === 'overall'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400/50'
              }`}
            >
              Overall Outcome & Synthesis
            </button>
          </div>
        </div>

        {/* SECTION 2: INDIVIDUAL CARD READINGS (Every card 1 by 1) */}
        {(viewMode === 'both' || viewMode === 'individual') && (
          <div ref={individualSectionRef} className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
              <div className="flex items-center gap-2.5">
                <Scroll className="w-5 h-5 text-amber-400" />
                <div>
                  <span className="text-[10px] uppercase font-cinzel tracking-widest text-amber-400/90 font-bold">
                    PART I · CARD-BY-CARD WISDOM
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-200">
                    Individual Readings for All {drawnCards.length} Cards
                  </h3>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-cinzel hidden sm:inline">
                {drawnCards.length} Positions Analyzed
              </span>
            </div>

            {/* Grid of Individual Cards */}
            <div className="grid grid-cols-1 gap-6">
              {drawnCards.map((dc, idx) => {
                const isOutcomeCard = idx === drawnCards.length - 1;

                return (
                  <motion.div
                    key={dc.card.id + dc.positionName + idx}
                    id={`individual-card-${idx}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className={`p-5 sm:p-6 rounded-3xl border transition-all ${
                      activeCardIndex === idx
                        ? 'bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-950 border-amber-400 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/50'
                        : 'bg-slate-950/80 border-slate-800 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
                      {/* Left: Original Tarot Card Photo */}
                      <div className="shrink-0 flex flex-col items-center">
                        <TarotCardVisual
                          card={dc.card}
                          isReversed={dc.isReversed}
                          size="md"
                          className="shadow-2xl"
                        />
                        <div className="mt-2 text-center">
                          <span className={`text-[10px] uppercase font-cinzel font-bold px-2 py-0.5 rounded-full border ${
                            dc.isReversed
                              ? 'bg-rose-950/80 text-rose-300 border-rose-500/30'
                              : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                          }`}>
                            {dc.isReversed ? 'Reversed' : 'Upright'}
                          </span>
                        </div>
                      </div>

                      {/* Right: Detailed Card Reading */}
                      <div className="flex-1 w-full text-center sm:text-left">
                        {/* Position Header */}
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                          <span className="px-3 py-1 rounded-full text-xs font-cinzel font-bold uppercase tracking-wider bg-amber-500/20 border border-amber-400/50 text-amber-200">
                            Card #{idx + 1} • Position: {dc.positionName}
                          </span>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-cinzel uppercase tracking-wider bg-indigo-950/80 border border-indigo-500/30 text-indigo-300">
                            {dc.card.element} Element • {dc.card.celestialAffinity}
                          </span>
                          {isOutcomeCard && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-cinzel uppercase tracking-wider bg-purple-950/80 border border-purple-400/50 text-purple-300">
                              Final Outcome Card
                            </span>
                          )}
                        </div>

                        {/* Card Title & Roman Numeral */}
                        <h4 className="text-xl sm:text-2xl font-cinzel font-extrabold text-amber-100 flex items-center justify-center sm:justify-start gap-2">
                          <span>{dc.card.name}</span>
                          {dc.card.romanNumeral && (
                            <span className="text-amber-400/60 text-base font-serif">({dc.card.romanNumeral})</span>
                          )}
                        </h4>

                        {/* Direct Card Message (Concise & Focused on Question/Position) */}
                        <div className="mt-3 space-y-2.5">
                          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/30">
                            <span className="text-[11px] uppercase tracking-wider text-amber-300 font-cinzel font-bold block mb-1">
                              ✦ What This Card Is Saying To You:
                            </span>
                            <p className="text-sm text-slate-100 leading-relaxed font-sans">
                              {dc.isReversed ? dc.card.reversedMeaning : dc.card.uprightMeaning}
                            </p>
                          </div>

                          <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-serif flex items-center gap-2">
                            <strong className="font-cinzel text-[11px] text-amber-300 uppercase tracking-wider shrink-0">Advice:</strong>
                            <span className="italic">"{dc.card.advice}"</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 3: OVERALL READING & FINAL OUTCOME */}
        {(viewMode === 'both' || viewMode === 'overall') && (
          <div ref={overallSectionRef} className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/95 via-indigo-950/40 to-slate-950 border border-amber-500/50 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Section Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-amber-500/20 mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-md">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-cinzel tracking-widest text-amber-400/90 font-bold">
                      PART II · OVERALL SUMMARY
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-amber-200">
                      Overall Outcome & Collective Summary
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-lg border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
                    title="Copy full reading"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Elemental Dignities & Energy Summary Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-amber-500/20 text-center">
                  <div className="text-[10px] uppercase font-cinzel tracking-wider text-slate-400">Total Cards</div>
                  <div className="text-xl font-cinzel font-bold text-amber-300 mt-0.5">{drawnCards.length}</div>
                  <div className="text-[10px] text-slate-400">{spread.name}</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-amber-500/20 text-center">
                  <div className="text-[10px] uppercase font-cinzel tracking-wider text-slate-400">Dominant Element</div>
                  <div className="text-xl font-cinzel font-bold text-amber-300 mt-0.5">{dominantElement[0]}</div>
                  <div className="text-[10px] text-slate-400">{dominantElement[1]} of {drawnCards.length} cards</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-amber-500/20 text-center">
                  <div className="text-[10px] uppercase font-cinzel tracking-wider text-slate-400">Orientation</div>
                  <div className="text-xl font-cinzel font-bold text-emerald-400 mt-0.5">
                    {drawnCards.length - reversedCount} Upright
                  </div>
                  <div className="text-[10px] text-rose-400">{reversedCount} Reversed</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-amber-500/20 text-center">
                  <div className="text-[10px] uppercase font-cinzel tracking-wider text-slate-400">Outcome Anchor</div>
                  <div className="text-sm font-cinzel font-bold text-amber-200 truncate mt-1">
                    {outcomeCard?.card.name}
                  </div>
                  <div className="text-[10px] text-amber-400/80">{outcomeCard?.isReversed ? 'Reversed' : 'Upright'}</div>
                </div>
              </div>

              {/* The Overall Reading Narrative */}
              {isLoadingAI ? (
                <div className="py-14 flex flex-col items-center justify-center text-center">
                  <Sparkles className="w-10 h-10 text-amber-400 animate-spin [animation-duration:4s] mb-4" />
                  <div className="font-cinzel text-amber-300 font-bold text-base tracking-wider">
                    Weaving the Collective Outcome...
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-md">
                    Synthesizing elemental balance, archetypal trajectories, and your birth chart into an overall oracle prophecy.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-sm text-slate-200 leading-relaxed font-sans">
                  {interpretation.split('\n\n').map((paragraph, pIdx) => {
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h4
                          key={pIdx}
                          className="font-cinzel font-bold text-amber-300 text-lg sm:text-xl mt-5 pt-3 border-t border-amber-500/20 flex items-center gap-2"
                        >
                          <span>{paragraph.replace('### ', '')}</span>
                        </h4>
                      );
                    }
                    if (paragraph.startsWith('> ') || paragraph.startsWith('"') && paragraph.endsWith('"')) {
                      const cleanQuote = paragraph.replace(/^>\s*/, '').replace(/^"|"$/g, '');
                      return (
                        <div
                          key={pIdx}
                          className="my-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-indigo-950/40 to-amber-500/10 border-2 border-amber-400/40 text-center shadow-lg"
                        >
                          <span className="text-[10px] font-cinzel uppercase tracking-widest text-amber-400 block mb-1">
                            ✦ Spiritual Mandate & Quote ✦
                          </span>
                          <p className="text-base sm:text-lg font-serif italic text-amber-100 font-medium">
                            "{cleanQuote}"
                          </p>
                        </div>
                      );
                    }
                    return (
                      <p key={pIdx} className="text-slate-200 whitespace-pre-line leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              )}

              {/* Direct WhatsApp Contact Banner for Personal Readings */}
              <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-amber-950/40 border-2 border-emerald-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-cinzel tracking-widest text-emerald-400 font-bold block">
                      Direct Personal 1-on-1 Tarot Consultation
                    </span>
                    <h4 className="text-base sm:text-lg font-cinzel font-bold text-amber-200">
                      WhatsApp: <span className="text-emerald-300 font-mono tracking-normal">{DISPLAY_PHONE}</span>
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Need deeper guidance on your relationships, marriage, or career? Message our master reader directly on WhatsApp for an exclusive personalized session.
                    </p>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioFx.playMysticChime()}
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-cinzel font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-emerald-500/30 flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Bottom Action Footer */}
              <div className="mt-8 pt-6 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400 font-cormorant italic text-center sm:text-left">
                  This reading is permanently recorded with all {drawnCards.length} original card photos.
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={onViewHistory}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-indigo-500/40 bg-indigo-950/40 text-indigo-300 font-cinzel text-xs tracking-wider hover:bg-indigo-900/50 transition-colors cursor-pointer"
                  >
                    View History
                  </button>

                  <button
                    onClick={handleSaveReading}
                    className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-cinzel font-bold text-xs uppercase tracking-widest shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isSaved
                        ? 'bg-emerald-600 text-slate-950 font-bold'
                        : 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 hover:brightness-110'
                    }`}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    <span>{isSaved ? 'Reading Saved' : 'Save Reading'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-3 text-xs text-slate-500 font-cinzel">
        ✦ The Mystic Cards • Celestial Sanctuary • Complete 78 Cards Alignment ✦
      </div>
    </div>
  );
};
