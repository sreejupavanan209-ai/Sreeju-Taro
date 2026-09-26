import React, { useState } from 'react';
import { TarotCard } from '../types';

interface TarotCardVisualProps {
  card?: TarotCard;
  isReversed?: boolean;
  isFaceDown?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  showPhoto?: boolean;
}

export const TarotCardVisual: React.FC<TarotCardVisualProps> = ({
  card,
  isReversed = false,
  isFaceDown = false,
  size = 'md',
  className = '',
  onClick,
  selected = false,
  showPhoto = true
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-24 h-38 text-xs',
    md: 'w-36 h-58 text-xs',
    lg: 'w-48 h-78 text-sm',
    hero: 'w-64 h-98 text-base'
  }[size];

  // Element color accents
  const elementColors: Record<string, { border: string; glow: string; text: string; bg: string }> = {
    Fire: { border: 'border-amber-500/80', glow: 'shadow-amber-500/20', text: 'text-amber-400', bg: 'from-amber-950/40' },
    Water: { border: 'border-cyan-500/80', glow: 'shadow-cyan-500/20', text: 'text-cyan-400', bg: 'from-cyan-950/40' },
    Air: { border: 'border-indigo-400/80', glow: 'shadow-indigo-400/20', text: 'text-indigo-300', bg: 'from-indigo-950/40' },
    Earth: { border: 'border-emerald-500/80', glow: 'shadow-emerald-500/20', text: 'text-emerald-400', bg: 'from-emerald-950/40' },
    Spirit: { border: 'border-purple-400/80', glow: 'shadow-purple-400/20', text: 'text-purple-300', bg: 'from-purple-950/40' }
  };

  const elem = card ? elementColors[card.element] || elementColors.Spirit : elementColors.Spirit;

  if (isFaceDown || !card) {
    return (
      <div
        onClick={onClick}
        className={`relative ${sizeClasses} rounded-xl bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 border-2 ${
          selected ? 'border-amber-400 shadow-xl shadow-amber-500/40 scale-105' : 'border-amber-600/50 hover:border-amber-400/80'
        } p-1.5 shadow-2xl transition-all duration-300 cursor-pointer select-none overflow-hidden ${className}`}
      >
        {/* Ornate Gold Border Inner */}
        <div className="w-full h-full rounded-lg border border-amber-500/40 flex flex-col items-center justify-between p-2 relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950/80 to-black">
          {/* Corner celestial runes */}
          <div className="absolute top-1 left-1 text-[10px] text-amber-500/60 font-serif">✦</div>
          <div className="absolute top-1 right-1 text-[10px] text-amber-500/60 font-serif">✦</div>
          <div className="absolute bottom-1 left-1 text-[10px] text-amber-500/60 font-serif">✦</div>
          <div className="absolute bottom-1 right-1 text-[10px] text-amber-500/60 font-serif">✦</div>

          <div className="text-[10px] tracking-widest uppercase text-amber-400/80 font-cinzel">Arcana</div>

          {/* Central Sacred Geometry Motif */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border border-amber-500/40 border-dashed animate-spin [animation-duration:35s]" />
            {/* Diamond */}
            <div className="absolute w-12 h-12 border border-amber-400/40 rotate-45" />
            <div className="absolute w-12 h-12 border border-indigo-400/30 rotate-12" />
            {/* Golden Eye / Mystic Sun */}
            <div className="relative text-2xl sm:text-3xl text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">
              ✧
            </div>
          </div>

          <div className="text-[9px] tracking-widest text-amber-500/70 font-cinzel">Mystic Cards</div>
        </div>

        {/* Shimmer light bar overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-400/10 to-transparent pointer-events-none" />
      </div>
    );
  }

  // Face-Up Card with Original Photo Artwork
  const hasPhoto = showPhoto && card.imageUrl && !imageError;

  return (
    <div
      onClick={onClick}
      className={`relative ${sizeClasses} rounded-xl bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 border-2 ${
        elem.border
      } p-1 shadow-2xl transition-all duration-300 select-none overflow-hidden ${
        selected ? 'ring-2 ring-amber-400 scale-105 shadow-amber-500/30' : ''
      } ${className}`}
    >
      <div
        className={`w-full h-full rounded-lg border border-amber-500/40 flex flex-col justify-between overflow-hidden relative bg-slate-950 ${
          isReversed ? 'rotate-180' : ''
        }`}
      >
        {/* Top Header Badge */}
        <div className="relative z-10 flex items-center justify-between px-2 py-0.5 bg-slate-950/90 border-b border-amber-500/30">
          <span className="font-cinzel font-bold text-amber-300 text-[11px] sm:text-xs tracking-wider">
            {card.romanNumeral || card.number}
          </span>
          <span className="text-[11px] text-amber-300 font-bold" title={`Element: ${card.element}`}>
            {card.symbolGlyph}
          </span>
        </div>

        {/* Center: The Original Tarot Photo */}
        <div className="flex-1 w-full h-full relative overflow-hidden flex items-center justify-center bg-black">
          {hasPhoto ? (
            <img
              src={card.imageUrl}
              alt={card.name}
              onError={() => setImageError(true)}
              loading="lazy"
              className="w-full h-full object-cover object-center filter saturate-[1.08] contrast-[1.05]"
            />
          ) : (
            /* Elegant Fallback Archetype Graphic */
            <div className="flex flex-col items-center justify-center p-2 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-b from-amber-500/20 to-indigo-950/80 border border-amber-500/40 flex items-center justify-center shadow-inner mb-2">
                <span className="text-3xl filter drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]">
                  {card.symbolGlyph}
                </span>
              </div>
              <span className="text-[10px] text-amber-300/80 uppercase font-cinzel">
                {card.celestialAffinity}
              </span>
            </div>
          )}

          {/* Subtle gold vignette overlay around image */}
          <div className="absolute inset-0 ring-1 ring-inset ring-amber-500/20 pointer-events-none" />
        </div>

        {/* Bottom Title Bar */}
        <div className="relative z-10 px-1 py-1 bg-slate-950/95 border-t border-amber-500/30 text-center">
          <div className="font-cinzel font-bold text-[10px] sm:text-[11px] text-amber-100 tracking-wide truncate">
            {card.name}
          </div>
          {isReversed && (
            <div className="text-[8px] sm:text-[9px] uppercase tracking-widest text-rose-400 font-bold">
              Reversed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
