import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SpreadDefinition, UserProfile } from '../types';
import { SPREADS } from '../data/spreads';
import { audioFx } from '../utils/audio';
import {
  ArrowLeft,
  Bot,
  Sparkles,
  Send,
  HelpCircle,
  Compass,
  Heart,
  Briefcase,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';

interface AITarotConsultationProps {
  user: UserProfile;
  onProceedToShuffle: (spread: SpreadDefinition, question: string) => void;
  onBack: () => void;
  onExit: () => void;
}

export const AITarotConsultation: React.FC<AITarotConsultationProps> = ({
  user,
  onProceedToShuffle,
  onBack,
  onExit
}) => {
  const [question, setQuestion] = useState('');
  const [selectedSpreadId, setSelectedSpreadId] = useState<string>('three-situation-obstacle-advice');
  const [error, setError] = useState('');

  const suggestedQuestions = [
    { text: 'What is the true soul lesson of my current relationship challenge?', category: 'Love', icon: Heart },
    { text: 'What energetic block is hindering my professional advancement?', category: 'Career', icon: Briefcase },
    { text: 'How can I best align with my highest soul destiny this season?', category: 'Spiritual', icon: Sparkles },
    { text: 'What hidden factors should I be mindful of before making my decision?', category: 'Clarity', icon: Compass }
  ];

  const handleSelectSuggestion = (q: string) => {
    setQuestion(q);
    setError('');
    audioFx.playCardSelectSound();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      setError('Please enter a question or topic for the AI oracle.');
      return;
    }

    const spread = SPREADS.find(s => s.id === selectedSpreadId) || SPREADS[0];
    audioFx.playMysticChime();
    onProceedToShuffle(spread, question.trim());
  };

  return (
    <div className="min-h-screen bg-[#050711] text-slate-100 flex flex-col justify-between p-4 sm:p-6 relative overflow-x-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

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
              AI Tarot Guidance
            </h2>
            <div className="text-[11px] text-slate-400 font-sans">
              Personalized Oracle for {user.name}
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

      {/* Main Form */}
      <div className="relative z-10 flex-1 max-w-3xl w-full mx-auto my-6 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-indigo-500/40 shadow-2xl backdrop-blur-md"
        >
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 mx-auto mb-3">
              <Bot className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-cinzel">Personalized Tarot Oracle</span>
            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-amber-200 mt-1">
              Ask Your Sacred Question
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
              The AI will directly interpret the drawn cards in the exact context of your question, birth resonance, and spread positions.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase font-cinzel tracking-wider text-amber-300 mb-1">
                Your Specific Inquiry or Focus
              </label>
              <textarea
                rows={3}
                placeholder="What is currently troubling your spirit, or what direction do you seek clarity on?"
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-indigo-500/40 focus:border-amber-400 focus:outline-hidden text-sm text-slate-100 placeholder-slate-500 resize-none"
              />
            </div>

            {/* Quick Inspiration Pills */}
            <div>
              <span className="text-[11px] uppercase font-cinzel tracking-wider text-slate-400 block mb-2">
                Or Tap an Inspiring Query:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestedQuestions.map((sq, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectSuggestion(sq.text)}
                    className="p-2.5 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-amber-400/60 hover:bg-slate-950 text-left text-xs text-slate-300 flex items-start gap-2 transition-all cursor-pointer group"
                  >
                    <sq.icon className="w-3.5 h-3.5 text-indigo-400 group-hover:text-amber-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{sq.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Select Spread for the Inquiry */}
            <div>
              <label className="block text-xs uppercase font-cinzel tracking-wider text-amber-300 mb-1">
                Select Spread for this Inquiry
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'single-card', name: 'Single Card', desc: 'Direct 1-Card Oracle', count: 1 },
                  { id: 'three-situation-obstacle-advice', name: 'Clarity Triad', desc: 'Situation, Obstacle, Advice', count: 3 },
                  { id: 'horseshoe-general', name: 'Horseshoe Arc', desc: 'Full 7-Card Overview', count: 7 }
                ].map((s) => {
                  const isSelected = selectedSpreadId === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedSpreadId(s.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-950/40 border-amber-400 ring-1 ring-amber-400'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-cinzel font-bold text-amber-200">
                        <span>{s.name}</span>
                        <span className="text-[10px] text-amber-400">{s.count} Cards</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{s.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-cinzel tracking-wider text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Back
              </button>

              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-amber-500 to-amber-600 font-cinzel font-bold text-slate-950 text-xs uppercase tracking-widest shadow-xl hover:shadow-amber-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Shuffle & Consult AI</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-2 text-xs text-slate-500 font-cinzel">
        ✦ The Mystic Cards • AI Tarot Intelligence ✦
      </div>
    </div>
  );
};
