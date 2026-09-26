import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ReadingRecord, UserProfile } from '../types';
import { getReadingsForUser, deleteReading } from '../utils/storage';
import { TarotCardVisual } from './TarotCardVisual';
import { audioFx } from '../utils/audio';
import {
  ArrowLeft,
  Calendar,
  Compass,
  Trash2,
  ChevronRight,
  Sparkles,
  History,
  X,
  Bot
} from 'lucide-react';

interface ReadingHistoryViewProps {
  user: UserProfile;
  onBack: () => void;
  onExit: () => void;
}

export const ReadingHistoryView: React.FC<ReadingHistoryViewProps> = ({
  user,
  onBack,
  onExit
}) => {
  const [readings, setReadings] = useState<ReadingRecord[]>([]);
  const [selectedReading, setSelectedReading] = useState<ReadingRecord | null>(null);

  useEffect(() => {
    const list = getReadingsForUser(user.id);
    setReadings(list);
  }, [user.id]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteReading(id);
    setReadings(prev => prev.filter(r => r.id !== id));
    if (selectedReading?.id === id) {
      setSelectedReading(null);
    }
    audioFx.playCardSelectSound();
  };

  return (
    <div className="min-h-screen bg-[#050711] text-slate-100 flex flex-col justify-between p-4 sm:p-6 relative overflow-x-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

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
              Previous Readings Archive
            </h2>
            <div className="text-[11px] text-slate-400 font-sans">
              Seeker: <strong className="text-amber-300">{user.name}</strong> • {readings.length} Recorded Readings
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

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 max-w-6xl w-full mx-auto my-6">
        {readings.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 p-8 max-w-lg mx-auto">
            <History className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-xl font-cinzel font-bold text-slate-300">
              No Readings Recorded Yet
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Complete any tarot spread and tap "Save Reading" to preserve your reading in your sacred history.
            </p>
            <button
              onClick={onBack}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-cinzel font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Start First Reading
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {readings.map((r) => (
              <div
                key={r.id}
                onClick={() => {
                  setSelectedReading(r);
                  audioFx.playCardSelectSound();
                }}
                className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-amber-500/30 hover:border-amber-400 transition-all shadow-lg hover:shadow-amber-500/10 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-[10px] uppercase font-cinzel text-amber-400/80 px-2 py-0.5 rounded-full border border-amber-500/20">
                      {r.cards.length} Cards
                    </span>
                  </div>

                  <h4 className="font-cinzel font-bold text-base text-amber-200 group-hover:text-amber-100">
                    {r.spreadName}
                  </h4>

                  {r.question && (
                    <div className="my-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs italic text-slate-300 line-clamp-2">
                      "{r.question}"
                    </div>
                  )}

                  {/* Cards thumbnail ribbon */}
                  <div className="flex items-center gap-1.5 my-3 overflow-x-hidden">
                    {r.cards.slice(0, 5).map((dc, i) => (
                      <div
                        key={i}
                        className="px-2 py-1 rounded bg-slate-800/80 text-[10px] text-slate-300 border border-slate-700 truncate max-w-[90px]"
                      >
                        {dc.card.name}
                      </div>
                    ))}
                    {r.cards.length > 5 && (
                      <span className="text-[10px] text-slate-400">+{r.cards.length - 5}</span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-amber-400 font-cinzel flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Inspect Reading</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>

                  <button
                    onClick={(e) => handleDelete(r.id, e)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* READING INSPECTION MODAL */}
      <AnimatePresence>
        {selectedReading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto custom-scrollbar relative flex flex-col justify-between"
            >
              <button
                onClick={() => setSelectedReading(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/50 border border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <div className="flex items-center gap-2 text-xs uppercase font-cinzel text-amber-400 tracking-widest mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(selectedReading.createdAt).toLocaleString()}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-amber-200">
                  {selectedReading.spreadName}
                </h3>

                {selectedReading.question && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 text-xs italic text-amber-200">
                    <strong className="not-italic text-amber-400 font-cinzel uppercase block text-[10px]">Inquiry:</strong>
                    "{selectedReading.question}"
                  </div>
                )}

                {/* Cards Drawn */}
                <div className="my-6">
                  <h4 className="text-xs uppercase font-cinzel tracking-wider text-slate-400 mb-3">
                    Cards in Spread:
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {selectedReading.cards.map((dc, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-950 border border-amber-500/30 flex flex-col items-center text-center"
                      >
                        <span className="text-[10px] font-cinzel text-amber-400 mb-1 truncate w-full">
                          {dc.positionName}
                        </span>
                        <TarotCardVisual
                          card={dc.card}
                          isReversed={dc.isReversed}
                          size="sm"
                        />
                        <span className="text-xs font-cinzel font-bold text-slate-200 mt-2 truncate w-full">
                          {dc.card.name}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {dc.isReversed ? 'Reversed' : 'Upright'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interpretation */}
                {selectedReading.aiSynthesis && (
                  <div className="p-5 rounded-2xl bg-slate-950/80 border border-indigo-500/30">
                    <div className="flex items-center gap-2 text-indigo-400 font-cinzel font-bold text-sm mb-3">
                      <Bot className="w-4 h-4" />
                      <span>Saved Reading Synthesis</span>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                      {selectedReading.aiSynthesis}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedReading(null)}
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-cinzel font-bold text-xs uppercase tracking-wider"
                >
                  Close Record
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="relative z-10 text-center py-2 text-xs text-slate-500 font-cinzel">
        ✦ The Mystic Cards • Reading Archives ✦
      </div>
    </div>
  );
};
