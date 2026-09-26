export interface UserProfile {
  id: string;
  name: string;
  age: number;
  dateOfBirth: string; // YYYY-MM-DD
  timeOfBirth: string; // HH:MM
  createdAt: string;
}

export type ArcanaType = 'major' | 'minor';
export type SuitType = 'wands' | 'cups' | 'swords' | 'pentacles';

export interface TarotCard {
  id: string;
  name: string;
  arcana: ArcanaType;
  suit?: SuitType;
  number: number;
  romanNumeral?: string;
  imageUrl?: string;
  uprightMeaning: string;
  reversedMeaning: string;
  keywords: string[];
  element: 'Fire' | 'Water' | 'Air' | 'Earth' | 'Spirit';
  celestialAffinity: string;
  description: string;
  advice: string;
  symbolGlyph: string;
}

export interface SpreadPosition {
  index: number;
  name: string;
  description: string;
}

export type SpreadType = 
  | 'single'
  | 'daily'
  | 'three-card'
  | 'four-card'
  | 'horseshoe'
  | 'celtic-cross'
  | 'past-life'
  | 'future-life';

export interface SpreadDefinition {
  id: string;
  type: SpreadType;
  subType?: string;
  name: string;
  subtitle: string;
  description: string;
  cardCount: number;
  category: 'Daily' | 'Quick' | 'Comprehensive' | 'Soul & Karma' | 'Specialized';
  positions: SpreadPosition[];
}

export interface DrawnCard {
  positionIndex: number;
  positionName: string;
  positionDescription?: string;
  card: TarotCard;
  isReversed: boolean;
}

export interface ReadingRecord {
  id: string;
  userId: string;
  userName: string;
  createdAt: string;
  spreadType: SpreadType;
  spreadSubType?: string;
  spreadName: string;
  question?: string;
  cards: DrawnCard[];
  aiSynthesis?: string;
  notes?: string;
}

export interface NumerologyBreakdown {
  number: number;
  isMaster: boolean;
  name: string;
  title: string;
  calculation: string;
  meaning: string;
  strengths: string[];
  shadowAspects: string[];
  keywords: string[];
}

export interface PinnacleInfo {
  pinnacleNumber: number;
  number: number;
  isMaster: boolean;
  ageSpan: string;
  theme: string;
  guidance: string;
}

export interface ChallengeInfo {
  challengeNumber: number;
  number: number;
  ageSpan: string;
  lesson: string;
  remedy: string;
}

export interface PersonalYearInfo {
  year: number;
  personalYearNumber: number;
  theme: string;
  description: string;
  focusAreas: string[];
  favorableFor: string[];
  precautions: string[];
}

export interface PersonalMonthInfo {
  month: number;
  monthName: string;
  personalMonthNumber: number;
  theme: string;
  vibrationalForecast: string;
}

export interface NumerologyLifeSummary {
  family: string;
  career: string;
  spouseMarriage: string;
}

export interface FullNumerologyReport {
  lifePath: NumerologyBreakdown;
  destiny: NumerologyBreakdown;
  soulUrge: NumerologyBreakdown;
  personality: NumerologyBreakdown;
  maturity: NumerologyBreakdown;
  attitude: NumerologyBreakdown;
  pinnacles: PinnacleInfo[];
  challenges: ChallengeInfo[];
  currentPersonalYear: PersonalYearInfo;
  upcomingYears: PersonalYearInfo[];
  monthlyForecast: PersonalMonthInfo[];
  lifeSummary: NumerologyLifeSummary;
}
