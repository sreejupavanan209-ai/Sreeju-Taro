import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, FullNumerologyReport } from '../types';
import { calculateNumerology } from '../utils/numerology';
import { audioFx } from '../utils/audio';
import {
  ArrowLeft,
  Sparkles,
  Calendar,
  Compass,
  Flame,
  Award,
  Shield,
  HelpCircle,
  Clock,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  Users,
  Briefcase,
  Heart,
  MessageCircle,
  Phone
} from 'lucide-react';

interface NumerologyViewProps {
  user: UserProfile;
  onBack: () => void;
  onExit: () => void;
}

export const NumerologyView: React.FC<NumerologyViewProps> = ({
  user,
  onBack,
  onExit
}) => {
  const WHATSAPP_PHONE = '971569453580';
  const DISPLAY_PHONE = '+971 56 945 3580';

  const [activeTab, setActiveTab] = useState<'profile' | 'yearly-monthly'>('profile');

  // Calculate full numerology profile from user's details
  const report: FullNumerologyReport = useMemo(() => {
    return calculateNumerology(user);
  }, [user]);

  const whatsappMsg = encodeURIComponent(
    `Hello! I just reviewed my Pythagorean Numerology Report on The Mystic Cards.\n\n` +
    `• Seeker: ${user.name} (DOB: ${user.dateOfBirth})\n` +
    `• Life Path: Number ${report.lifePath.number} (${report.lifePath.title})\n` +
    `• Destiny: Number ${report.destiny.number} (${report.destiny.title})\n\n` +
    `I would like to book a personal 1-on-1 numerology & life destiny consultation on WhatsApp.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${whatsappMsg}`;

  // Selected year for Yearly analysis
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(0);
  const activeYearForecast = report.upcomingYears[selectedYearIndex] || report.currentPersonalYear;

  // Selected month for Monthly analysis
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(new Date().getMonth());
  const activeMonthForecast = report.monthlyForecast[selectedMonthIndex] || report.monthlyForecast[0];

  return (
    <div className="min-h-screen bg-[#050711] text-slate-100 flex flex-col justify-between p-4 sm:p-6 relative overflow-x-hidden">
      {/* Celestial Background Aurora */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & Navigation */}
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
              Pythagorean Numerology
            </h2>
            <div className="text-[11px] text-slate-400 font-sans">
              Seeker: <strong className="text-amber-300">{user.name}</strong> • DOB: {user.dateOfBirth}
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

      {/* Main Container */}
      <div className="relative z-10 flex-1 max-w-6xl w-full mx-auto my-6">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => {
              setActiveTab('profile');
              audioFx.playCardSelectSound();
            }}
            className={`px-5 py-2.5 rounded-xl font-cinzel text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-slate-900/80 border border-slate-700 text-slate-300 hover:border-amber-500/40'
            }`}
          >
            Complete Numerology Profile
          </button>

          <button
            onClick={() => {
              setActiveTab('yearly-monthly');
              audioFx.playCardSelectSound();
            }}
            className={`px-5 py-2.5 rounded-xl font-cinzel text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'yearly-monthly'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-slate-900/80 border border-slate-700 text-slate-300 hover:border-amber-500/40'
            }`}
          >
            Yearly / Monthly Numerology
          </button>
        </div>

        {/* TAB 1: Complete Pythagorean Numerology Details */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* The 6 Core Vibrations */}
            <div>
              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-cinzel">Core Vibrations</span>
                <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-amber-200">
                  The Sacred Pythagorean Matrix
                </h3>
                <p className="text-xs text-slate-400 font-cormorant italic max-w-lg mx-auto mt-1">
                  Derived from your name and birth date using authentic Pythagorean frequency reduction.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* 1. Life Path */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/90 border border-amber-500/50 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase font-cinzel text-amber-400 font-bold">1. Life Path</span>
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center font-cinzel font-black text-xl text-amber-300">
                        {report.lifePath.number}
                      </div>
                    </div>
                    <h4 className="font-cinzel font-bold text-amber-200 text-sm">{report.lifePath.title}</h4>
                    <div className="text-[11px] text-amber-300/90 font-mono my-1.5 bg-slate-950/90 p-2 rounded-lg border border-amber-500/30 break-words leading-relaxed">
                      {report.lifePath.calculation}
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {report.lifePath.meaning}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-amber-500/20">
                    <span className="text-[10px] uppercase font-cinzel text-amber-400/80 block mb-1">Keywords</span>
                    <div className="flex flex-wrap gap-1">
                      {report.lifePath.keywords.map((k, i) => (
                        <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Destiny (Expression) */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/90 border border-amber-500/50 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase font-cinzel text-amber-400 font-bold">2. Destiny (Expression)</span>
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center font-cinzel font-black text-xl text-amber-300">
                        {report.destiny.number}
                      </div>
                    </div>
                    <h4 className="font-cinzel font-bold text-amber-200 text-sm">{report.destiny.title}</h4>
                    <div className="text-[10px] text-slate-400 font-mono my-1 bg-slate-950/80 p-1.5 rounded border border-slate-800 truncate">
                      {report.destiny.calculation}
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {report.destiny.meaning}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-amber-500/20">
                    <span className="text-[10px] uppercase font-cinzel text-amber-400/80 block mb-1">Vocational Powers</span>
                    <div className="flex flex-wrap gap-1">
                      {report.destiny.strengths.slice(0, 3).map((k, i) => (
                        <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Soul Urge */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/90 border border-indigo-500/50 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase font-cinzel text-indigo-300 font-bold">3. Soul Urge (Vowels)</span>
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center font-cinzel font-black text-xl text-indigo-300">
                        {report.soulUrge.number}
                      </div>
                    </div>
                    <h4 className="font-cinzel font-bold text-indigo-200 text-sm">{report.soulUrge.title}</h4>
                    <div className="text-[10px] text-slate-400 font-mono my-1 bg-slate-950/80 p-1.5 rounded border border-slate-800 truncate">
                      {report.soulUrge.calculation}
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {report.soulUrge.meaning}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-indigo-500/20">
                    <span className="text-[10px] uppercase font-cinzel text-indigo-300/80 block mb-1">Deepest Desires</span>
                    <div className="flex flex-wrap gap-1">
                      {report.soulUrge.keywords.map((k, i) => (
                        <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Personality */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/90 border border-indigo-500/50 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase font-cinzel text-indigo-300 font-bold">4. Personality (Consonants)</span>
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center font-cinzel font-black text-xl text-indigo-300">
                        {report.personality.number}
                      </div>
                    </div>
                    <h4 className="font-cinzel font-bold text-indigo-200 text-sm">{report.personality.title}</h4>
                    <div className="text-[10px] text-slate-400 font-mono my-1 bg-slate-950/80 p-1.5 rounded border border-slate-800 truncate">
                      {report.personality.calculation}
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {report.personality.meaning}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-indigo-500/20">
                    <span className="text-[10px] uppercase font-cinzel text-indigo-300/80 block mb-1">Outer Magnetic Field</span>
                    <div className="flex flex-wrap gap-1">
                      {report.personality.strengths.slice(0, 3).map((k, i) => (
                        <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. Maturity (Power Number) */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/90 border border-purple-500/50 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase font-cinzel text-purple-300 font-bold">5. Maturity (Power)</span>
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center font-cinzel font-black text-xl text-purple-300">
                        {report.maturity.number}
                      </div>
                    </div>
                    <h4 className="font-cinzel font-bold text-purple-200 text-sm">{report.maturity.title}</h4>
                    <div className="text-[10px] text-slate-400 font-mono my-1 bg-slate-950/80 p-1.5 rounded border border-slate-800 truncate">
                      {report.maturity.calculation}
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {report.maturity.meaning}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-purple-500/20">
                    <span className="text-[10px] uppercase font-cinzel text-purple-300/80 block mb-1">Ripened Legacy</span>
                    <div className="flex flex-wrap gap-1">
                      {report.maturity.keywords.map((k, i) => (
                        <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 6. Attitude (Sun Number) */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/90 border border-amber-500/50 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase font-cinzel text-amber-300 font-bold">6. Attitude (Sun Number)</span>
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center font-cinzel font-black text-xl text-amber-300">
                        {report.attitude.number}
                      </div>
                    </div>
                    <h4 className="font-cinzel font-bold text-amber-200 text-sm">{report.attitude.title}</h4>
                    <div className="text-[10px] text-slate-400 font-mono my-1 bg-slate-950/80 p-1.5 rounded border border-slate-800 truncate">
                      {report.attitude.calculation}
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {report.attitude.meaning}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-amber-500/20">
                    <span className="text-[10px] uppercase font-cinzel text-amber-300/80 block mb-1">Daily Reaction Lens</span>
                    <div className="flex flex-wrap gap-1">
                      {report.attitude.keywords.map((k, i) => (
                        <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pinnacles Section */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-amber-500/40 shadow-xl">
              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-cinzel">The Four Life Eras</span>
                <h3 className="text-2xl font-bold font-cinzel text-amber-200">
                  Pinnacles (Epochs of Evolution)
                </h3>
                <p className="text-xs text-slate-400">
                  Four major developmental cycles calculated from your birth date components.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {report.pinnacles.map((pin) => (
                  <div
                    key={pin.pinnacleNumber}
                    className="p-4 rounded-xl bg-slate-950/60 border border-amber-500/30 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-cinzel font-bold text-amber-400">
                          Pinnacle #{pin.pinnacleNumber}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {pin.ageSpan}
                        </span>
                      </div>
                      <div className="text-2xl font-black font-cinzel text-amber-300 mb-1">
                        Vibration: {pin.number}
                      </div>
                      <div className="text-xs font-bold text-slate-200 mb-1">
                        {pin.theme}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {pin.guidance}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges Section */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-rose-500/30 shadow-xl">
              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-widest text-rose-400 font-cinzel">Soul Hurdles & Karmic Lessons</span>
                <h3 className="text-2xl font-bold font-cinzel text-rose-200">
                  Challenges (Areas of Mastery)
                </h3>
                <p className="text-xs text-slate-400">
                  Subtracting birth cycles reveals where your spirit came to forge resilience.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {report.challenges.map((ch) => (
                  <div
                    key={ch.challengeNumber}
                    className="p-4 rounded-xl bg-slate-950/60 border border-rose-500/20 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-cinzel font-bold text-rose-400">
                          Challenge #{ch.challengeNumber} {ch.challengeNumber === 3 ? '(Main)' : ''}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {ch.ageSpan}
                        </span>
                      </div>
                      <div className="text-2xl font-black font-cinzel text-rose-300 mb-1">
                        Hurdle Number: {ch.number}
                      </div>
                      <div className="text-xs font-semibold text-slate-200 mb-1">
                        {ch.lesson}
                      </div>
                      <p className="text-xs text-slate-400 mt-2">
                        <strong className="text-rose-300">Spiritual Remedy: </strong>
                        {ch.remedy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 10. Sacred Life Summary: Family, Career & Wife/Husband (Marriage) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/95 via-indigo-950/40 to-slate-950 border-2 border-amber-500/50 shadow-2xl">
              <div className="text-center mb-8">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-cinzel font-bold">
                  Pythagorean Life Summary
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-cinzel text-amber-200 mt-1">
                  How's Your Family, Career & Marriage?
                </h3>
                <p className="text-xs text-slate-400 font-cormorant italic max-w-xl mx-auto mt-1">
                  A targeted synthesis of your Life Path {report.lifePath.number} frequency revealing how your vibration shapes your household, vocational destiny, and life partner.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Family */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-amber-500/30 flex flex-col justify-between hover:border-amber-400/60 transition-all shadow-lg">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-cinzel tracking-widest text-amber-400/80 font-bold block">
                          Domestic Harmony
                        </span>
                        <h4 className="font-cinzel font-bold text-amber-100 text-base">
                          👨‍👩‍👧‍👦 Family Life
                        </h4>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans mt-2">
                      {report.lifeSummary.family}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-amber-500/20 text-[11px] text-amber-300/80 font-cormorant italic">
                    ✦ Balance leadership and care with patient listening.
                  </div>
                </div>

                {/* 2. Career */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-amber-500/30 flex flex-col justify-between hover:border-amber-400/60 transition-all shadow-lg">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-cinzel tracking-widest text-amber-400/80 font-bold block">
                          Vocational Calling
                        </span>
                        <h4 className="font-cinzel font-bold text-amber-100 text-base">
                          💼 Career & Wealth
                        </h4>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans mt-2">
                      {report.lifeSummary.career}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-amber-500/20 text-[11px] text-amber-300/80 font-cormorant italic">
                    ✦ Align material goals with your highest soul values.
                  </div>
                </div>

                {/* 3. Wife / Husband & Marriage */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-amber-500/30 flex flex-col justify-between hover:border-amber-400/60 transition-all shadow-lg">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
                        <Heart className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-cinzel tracking-widest text-amber-400/80 font-bold block">
                          Sacred Partnership
                        </span>
                        <h4 className="font-cinzel font-bold text-amber-100 text-base">
                          💍 Wife / Husband & Marriage
                        </h4>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans mt-2">
                      {report.lifeSummary.spouseMarriage}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-amber-500/20 text-[11px] text-amber-300/80 font-cormorant italic">
                    ✦ Mutual respect and transparency keep romance eternal.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: Yearly / Monthly Numerology Section */}
        {activeTab === 'yearly-monthly' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Year Selector */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/40 shadow-xl">
              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-cinzel">Timeline Analysis</span>
                <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-amber-200">
                  Upcoming Year Analysis
                </h3>
                <p className="text-xs text-slate-400">
                  Select any upcoming year to preview its dominant Personal Year vibration and opportunities.
                </p>
              </div>

              {/* Year Buttons */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-6">
                {report.upcomingYears.map((yr, idx) => {
                  const isSelected = selectedYearIndex === idx;
                  return (
                    <button
                      key={yr.year}
                      onClick={() => {
                        setSelectedYearIndex(idx);
                        audioFx.playCardSelectSound();
                      }}
                      className={`px-4 py-2 rounded-xl font-cinzel text-xs sm:text-sm tracking-wider transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-bold ring-2 ring-amber-300 shadow-lg shadow-amber-500/30 scale-105'
                          : 'bg-slate-950/80 border border-slate-700 text-slate-300 hover:border-amber-400/60'
                      }`}
                    >
                      {yr.year} (Year {yr.personalYearNumber})
                    </button>
                  );
                })}
              </div>

              {/* Active Year Detailed Card */}
              <div className="p-6 rounded-xl bg-slate-950/80 border border-amber-500/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-amber-500/20 mb-4 gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-cinzel tracking-widest text-amber-400/80">
                      Forecast For Year {activeYearForecast.year}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-200">
                      {activeYearForecast.theme}
                    </h4>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-400/40 text-center shrink-0">
                    <span className="text-[10px] uppercase font-cinzel text-amber-400 block">Personal Year</span>
                    <span className="text-2xl font-black font-cinzel text-amber-300">#{activeYearForecast.personalYearNumber}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {activeYearForecast.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-amber-400 font-cinzel font-bold text-xs uppercase mb-2">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Important Themes</span>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                      {activeYearForecast.focusAreas.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-cinzel font-bold text-xs uppercase mb-2">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Opportunities</span>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                      {activeYearForecast.favorableFor.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-500/30">
                    <div className="flex items-center gap-1.5 text-rose-400 font-cinzel font-bold text-xs uppercase mb-2">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Challenges & Precautions</span>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                      {activeYearForecast.precautions.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Month-by-Month Analysis */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-indigo-500/40 shadow-xl">
              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-widest text-indigo-400 font-cinzel">Lunar & Calendar Cycles</span>
                <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-indigo-200">
                  Month-by-Month Analysis
                </h3>
                <p className="text-xs text-slate-400">
                  Select a month to see its vibrational theme and spiritual forecast for the active cycle.
                </p>
              </div>

              {/* Month Selector Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 mb-6">
                {report.monthlyForecast.map((m, idx) => {
                  const isSelected = selectedMonthIndex === idx;
                  return (
                    <button
                      key={m.month}
                      onClick={() => {
                        setSelectedMonthIndex(idx);
                        audioFx.playCardSelectSound();
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-400 text-white font-bold ring-2 ring-indigo-300 shadow-md'
                          : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-indigo-400/60'
                      }`}
                    >
                      <div className="text-xs font-cinzel truncate">{m.monthName}</div>
                      <div className="text-[10px] text-indigo-300 font-mono mt-0.5">PM #{m.personalMonthNumber}</div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Month Detail */}
              <div className="p-5 rounded-xl bg-slate-950/80 border border-indigo-500/30">
                <div className="flex items-center justify-between pb-3 border-b border-indigo-500/20 mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-cinzel tracking-widest text-indigo-400/80">
                      {activeMonthForecast.monthName} Forecast
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold font-cinzel text-indigo-200">
                      {activeMonthForecast.theme}
                    </h4>
                  </div>
                  <div className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 font-cinzel text-xs font-bold">
                    Personal Month {activeMonthForecast.personalMonthNumber}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeMonthForecast.vibrationalForecast}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* WhatsApp Personal Numerology Consultation Banner */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-amber-950/40 border-2 border-emerald-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-cinzel tracking-widest text-emerald-400 font-bold block">
                Personal 1-on-1 Numerology & Life Consultation
              </span>
              <h4 className="text-base sm:text-lg font-cinzel font-bold text-amber-200">
                WhatsApp: <span className="text-emerald-300 font-mono tracking-normal">{DISPLAY_PHONE}</span>
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Have specific questions about your birth matrix, name changes, or life milestones? Connect with our master consultant directly on WhatsApp.
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
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-2 text-xs text-slate-500 font-cinzel">
        ✦ The Mystic Cards • Pythagorean Numerological Calculations ✦
      </div>
    </div>
  );
};
