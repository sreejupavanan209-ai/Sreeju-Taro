/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DrawnCard, SpreadDefinition, UserProfile } from './types';
import { getActiveProfile } from './utils/storage';
import { OpeningScreen } from './components/OpeningScreen';
import { HomeScreen } from './components/HomeScreen';
import { MainFeaturesMenu } from './components/MainFeaturesMenu';
import { HoldToShuffleDeck } from './components/HoldToShuffleDeck';
import { ReadingResultView } from './components/ReadingResultView';
import { NumerologyView } from './components/NumerologyView';
import { AITarotConsultation } from './components/AITarotConsultation';
import { PaidTarotReadingModal } from './components/PaidTarotReadingModal';
import { ReadingHistoryView } from './components/ReadingHistoryView';
import { SPREADS } from './data/spreads';

type ScreenState = 
  | 'opening'
  | 'home'
  | 'main-menu'
  | 'hold-to-shuffle'
  | 'reading-result'
  | 'numerology'
  | 'ai-guidance'
  | 'paid-reading'
  | 'history';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('opening');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Active spread & reading session
  const [activeSpread, setActiveSpread] = useState<SpreadDefinition>(SPREADS[0]);
  const [customQuestion, setCustomQuestion] = useState<string | undefined>(undefined);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);

  // Load existing active profile on startup
  useEffect(() => {
    const existing = getActiveProfile();
    if (existing) {
      setCurrentUser(existing);
    }
  }, []);

  // Handlers
  const handleOpeningComplete = () => {
    setCurrentScreen('home');
  };

  const handleUserSelected = (user: UserProfile) => {
    setCurrentUser(user);
    setCurrentScreen('main-menu');
  };

  const handleOpenSpread = (spread: SpreadDefinition, question?: string) => {
    setActiveSpread(spread);
    setCustomQuestion(question);
    setCurrentScreen('hold-to-shuffle');
  };

  const handleReadingReady = (cards: DrawnCard[], question?: string) => {
    setDrawnCards(cards);
    setCustomQuestion(question);
    setCurrentScreen('reading-result');
  };

  const handleExit = () => {
    // Return to opening screen or home
    if (currentScreen === 'main-menu' || currentScreen === 'home') {
      setCurrentScreen('opening');
    } else {
      setCurrentScreen('main-menu');
    }
  };

  return (
    <main className="min-h-screen bg-[#050711] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* 1. Opening Screen with Animated Deck Spread */}
      {currentScreen === 'opening' && (
        <OpeningScreen onComplete={handleOpeningComplete} />
      )}

      {/* 2. Home Screen (New User / Previous User) */}
      {currentScreen === 'home' && (
        <HomeScreen
          onUserSelected={handleUserSelected}
          onOpenHistory={(user) => {
            setCurrentUser(user);
            setCurrentScreen('history');
          }}
          onExit={() => setCurrentScreen('opening')}
        />
      )}

      {/* 3. Main Features Menu (All 10 Spreads & Features) */}
      {currentScreen === 'main-menu' && currentUser && (
        <MainFeaturesMenu
          user={currentUser}
          onSelectSpread={handleOpenSpread}
          onOpenNumerology={() => setCurrentScreen('numerology')}
          onOpenAIFeature={() => setCurrentScreen('ai-guidance')}
          onOpenPaidReading={() => setCurrentScreen('paid-reading')}
          onOpenHistory={() => setCurrentScreen('history')}
          onBackToHome={() => setCurrentScreen('home')}
          onExit={handleExit}
        />
      )}

      {/* 4. Tarot Card Selection System: Hold to Shuffle */}
      {currentScreen === 'hold-to-shuffle' && currentUser && (
        <HoldToShuffleDeck
          spread={activeSpread}
          user={currentUser}
          customQuestion={customQuestion}
          onReadingReady={handleReadingReady}
          onBack={() => setCurrentScreen('main-menu')}
          onExit={handleExit}
        />
      )}

      {/* 5. Reading Result View */}
      {currentScreen === 'reading-result' && currentUser && (
        <ReadingResultView
          spread={activeSpread}
          user={currentUser}
          drawnCards={drawnCards}
          customQuestion={customQuestion}
          onBack={() => setCurrentScreen('main-menu')}
          onExit={handleExit}
          onViewHistory={() => setCurrentScreen('history')}
        />
      )}

      {/* 6. Pythagorean Numerology & Yearly/Monthly Section */}
      {currentScreen === 'numerology' && currentUser && (
        <NumerologyView
          user={currentUser}
          onBack={() => setCurrentScreen('main-menu')}
          onExit={handleExit}
        />
      )}

      {/* 7. AI Tarot Guidance Inquiry */}
      {currentScreen === 'ai-guidance' && currentUser && (
        <AITarotConsultation
          user={currentUser}
          onProceedToShuffle={(spread, question) => {
            setActiveSpread(spread);
            setCustomQuestion(question);
            setCurrentScreen('hold-to-shuffle');
          }}
          onBack={() => setCurrentScreen('main-menu')}
          onExit={handleExit}
        />
      )}

      {/* 8. Paid 1-Hour Tarot Reading (₹299 WhatsApp) */}
      {currentScreen === 'paid-reading' && currentUser && (
        <PaidTarotReadingModal
          user={currentUser}
          onBack={() => setCurrentScreen('main-menu')}
          onExit={handleExit}
        />
      )}

      {/* 9. Previous Readings Archive / History */}
      {currentScreen === 'history' && currentUser && (
        <ReadingHistoryView
          user={currentUser}
          onBack={() => setCurrentScreen(currentUser ? 'main-menu' : 'home')}
          onExit={handleExit}
        />
      )}
    </main>
  );
}
