import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserProfile, ReadingRecord } from '../types';
import { getAllProfiles, getReadingsForUser, saveUserProfile, setActiveProfileId } from '../utils/storage';
import { Sparkles, UserPlus, History, Clock, Calendar, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';
import { audioFx } from '../utils/audio';

interface HomeScreenProps {
  onUserSelected: (user: UserProfile) => void;
  onOpenHistory: (user: UserProfile) => void;
  onExit: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onUserSelected,
  onOpenHistory,
  onExit
}) => {
  const [mode, setMode] = useState<'select' | 'new-user' | 'previous-user'>('select');
  const [profiles] = useState<UserProfile[]>(getAllProfiles());
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(profiles[0] || null);

  // New User Form State
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dateOfBirth: '',
    timeOfBirth: '12:00'
  });
  const [formError, setFormError] = useState('');

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    const ageNum = parseInt(formData.age, 10);
    if (!formData.age || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      setFormError('Please enter a valid age.');
      return;
    }
    if (!formData.dateOfBirth) {
      setFormError('Please select your date of birth.');
      return;
    }

    const newProfile: UserProfile = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: formData.name.trim(),
      age: ageNum,
      dateOfBirth: formData.dateOfBirth,
      timeOfBirth: formData.timeOfBirth || '12:00',
      createdAt: new Date().toISOString()
    };

    saveUserProfile(newProfile);
    audioFx.playMysticChime();
    onUserSelected(newProfile);
  };

  const handleSelectPreviousUser = (profile: UserProfile) => {
    setActiveProfileId(profile.id);
    audioFx.playMysticChime();
    onUserSelected(profile);
  };

  return (
    <div className="min-h-screen bg-[#050711] text-slate-100 flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
      {/* Background celestial glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with EXIT and Download */}
      <div className="relative z-10 max-w-5xl w-full mx-auto flex items-center justify-between py-2 border-b border-amber-500/20">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-cinzel font-bold text-lg tracking-wider">THE MYSTIC CARDS</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onExit}
            className="text-xs uppercase font-cinzel tracking-widest px-3 py-1.5 rounded-lg border border-amber-500/30 text-amber-300/80 hover:text-amber-300 hover:border-amber-400/70 transition-all cursor-pointer"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 max-w-3xl w-full mx-auto flex flex-col items-center justify-center my-6">
        {mode === 'select' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-cinzel mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Welcome to the Celestial Sanctuary
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-500 mb-3">
              Who Enters the Circle?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-cormorant italic max-w-md mx-auto mb-10">
              Choose your path to consult the tarot archetypes and align with your Pythagorean destiny.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-xl mx-auto">
              {/* Option 1: New User */}
              <button
                onClick={() => {
                  audioFx.playCardSelectSound();
                  setMode('new-user');
                }}
                className="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-indigo-950/60 border border-amber-500/40 hover:border-amber-400 transition-all duration-300 shadow-xl hover:shadow-amber-500/20 text-left flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-amber-400/70 font-cinzel">First Time</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-cinzel text-amber-200 group-hover:text-amber-100 mb-1">
                    New User
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Enter your birth details to generate your personal astrological numerology and begin readings.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Register Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </button>

              {/* Option 2: Previous User */}
              <button
                onClick={() => {
                  audioFx.playCardSelectSound();
                  setMode('previous-user');
                }}
                className="group relative p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/80 border border-indigo-500/40 hover:border-amber-400 transition-all duration-300 shadow-xl hover:shadow-indigo-500/20 text-left flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition-transform">
                    <History className="w-6 h-6" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-indigo-300/70 font-cinzel">
                    {profiles.length} Saved {profiles.length === 1 ? 'Seeker' : 'Seekers'}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-cinzel text-indigo-200 group-hover:text-amber-100 mb-1">
                    Previous User
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Identify your saved profile, retrieve reading records, and continue your spiritual journey.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-indigo-500/20 flex items-center text-xs font-semibold text-indigo-300 group-hover:translate-x-1 transition-transform">
                  <span>Resume Readings</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {/* New User Form Screen */}
        {mode === 'new-user' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-slate-900/80 backdrop-blur-md rounded-2xl border border-amber-500/40 p-6 sm:p-8 shadow-2xl"
          >
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest text-amber-400/80 font-cinzel">Registration & Inscription</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-amber-200 mt-1">
                Enter Your Personal Details
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Required for precise Pythagorean numerology and personal tarot synthesis.
              </p>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-lg bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-cinzel tracking-wider text-amber-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sreeju Pavanan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30 focus:border-amber-400 focus:outline-hidden text-sm text-slate-100 placeholder-slate-500"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Used to calculate your Destiny, Soul Urge & Personality numbers.</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-cinzel tracking-wider text-amber-300 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    placeholder="e.g. 28"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30 focus:border-amber-400 focus:outline-hidden text-sm text-slate-100 placeholder-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-cinzel tracking-wider text-amber-300 mb-1">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30 focus:border-amber-400 focus:outline-hidden text-sm text-slate-100"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-cinzel tracking-wider text-amber-300 mb-1">
                  Time of Birth (Optional / For Astrological Calibration)
                </label>
                <input
                  type="time"
                  value={formData.timeOfBirth}
                  onChange={(e) => setFormData({ ...formData, timeOfBirth: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30 focus:border-amber-400 focus:outline-hidden text-sm text-slate-100"
                />
              </div>

              <div className="pt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setMode('select')}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-cinzel tracking-wider text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 font-cinzel font-bold text-slate-950 text-xs uppercase tracking-widest shadow-lg hover:shadow-amber-500/30 hover:scale-[1.01] transition-all cursor-pointer"
                >
                  Begin Journey
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Previous User Screen */}
        {mode === 'previous-user' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl bg-slate-900/80 backdrop-blur-md rounded-2xl border border-indigo-500/40 p-6 sm:p-8 shadow-2xl"
          >
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-cinzel">Seeker Archives</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-amber-200 mt-1">
                Select Returning Seeker
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Check whether you have previously completed tarot readings and access all saved records.
              </p>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1 custom-scrollbar mb-6">
              {profiles.map((p) => {
                const userReadings: ReadingRecord[] = getReadingsForUser(p.id);
                const isSelected = selectedUser?.id === p.id;

                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedUser(p);
                      audioFx.playCardSelectSound();
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-950/40 border-amber-400 ring-1 ring-amber-400'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-indigo-900/60 border border-amber-500/40 flex items-center justify-center font-cinzel font-bold text-amber-300">
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-cinzel font-bold text-sm text-slate-200 flex items-center gap-2">
                          <span>{p.name}</span>
                          <span className="text-xs font-sans text-slate-400 font-normal">({p.age} yrs)</span>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-3 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-amber-400/70" />
                            {p.dateOfBirth}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-indigo-400/70" />
                            {p.timeOfBirth || '12:00'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 border border-indigo-500/30 text-indigo-300">
                        <CheckCircle2 className="w-3 h-3 text-indigo-400" />
                        <span>{userReadings.length} {userReadings.length === 1 ? 'Reading' : 'Readings'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => setMode('select')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-cinzel tracking-wider text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Back
              </button>

              {selectedUser && (
                <>
                  <button
                    type="button"
                    onClick={() => onOpenHistory(selectedUser)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-indigo-500/50 bg-indigo-950/30 text-xs font-cinzel tracking-wider text-indigo-300 hover:bg-indigo-900/50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>View Records ({getReadingsForUser(selectedUser.id).length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => selectedUser && handleSelectPreviousUser(selectedUser)}
                    className="flex-1 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 font-cinzel font-bold text-slate-950 text-xs uppercase tracking-widest shadow-lg hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Enter as {selectedUser.name.split(' ')[0]}</span>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-2 text-xs text-slate-500 font-cinzel">
        ✦ The Mystic Cards • Tarot Spreads & Pythagorean Numerology ✦
      </div>
    </div>
  );
};
