import {
  ChallengeInfo,
  FullNumerologyReport,
  NumerologyBreakdown,
  PersonalMonthInfo,
  PersonalYearInfo,
  PinnacleInfo,
  UserProfile
} from '../types';

// Pythagorean letter values
const PYTHAGOREAN_MAP: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9
};

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

// Helper to reduce numbers, respecting Master Numbers 11, 22, 33
export function reduceNumber(n: number, allowMaster = true): { num: number; isMaster: boolean } {
  if (n <= 9) return { num: n, isMaster: false };
  if (allowMaster && (n === 11 || n === 22 || n === 33)) {
    return { num: n, isMaster: true };
  }

  let sum = n;
  while (sum > 9) {
    if (allowMaster && (sum === 11 || sum === 22 || sum === 33)) {
      return { num: sum, isMaster: true };
    }
    const digits = sum.toString().split('').map(Number);
    sum = digits.reduce((acc, d) => acc + d, 0);
  }

  if (allowMaster && (sum === 11 || sum === 22 || sum === 33)) {
    return { num: sum, isMaster: true };
  }
  return { num: sum, isMaster: false };
}

// Master number descriptions
const NUMBER_PROFILES: Record<number, {
  title: string;
  meaning: string;
  strengths: string[];
  shadow: string[];
  keywords: string[];
}> = {
  1: {
    title: 'The Sovereign Pioneer',
    meaning: 'The energy of original creation, unbridled independence, pioneering spirit, and executive leadership. You are born to initiate, trailblaze untrodden ground, and carve your own destiny.',
    strengths: ['Leadership', 'Originality', 'Unyielding Will', 'Self-Reliance', 'Courage'],
    shadow: ['Impatience', 'Stubborn Pride', 'Isolation', 'Dominating Tendencies'],
    keywords: ['Initiative', 'Autonomy', 'Innovation', 'Mastery']
  },
  2: {
    title: 'The Sacred Peacemaker',
    meaning: 'The vibration of sensitive intuition, divine diplomacy, harmony, and compassionate partnership. You are the sacred bridge that heals division and creates empathetic equilibrium.',
    strengths: ['Deep Intuition', 'Diplomacy', 'Graceful Cooperation', 'Empathetic Heart', 'Patience'],
    shadow: ['Over-sensitivity', 'Fear of Conflict', 'Codependency', 'Indecision'],
    keywords: ['Harmony', 'Empathy', 'Balance', 'Union']
  },
  3: {
    title: 'The Inspired Creator',
    meaning: 'The frequency of joyful self-expression, artistic brilliance, infectious optimism, and social charisma. You channel celestial inspiration into words, art, laughter, and uplifting wisdom.',
    strengths: ['Artistic Eloquence', 'Magnetic Optimism', 'Wit & Charm', 'Inspiration', 'Creative Play'],
    shadow: ['Scattered Energy', 'Superficiality', 'Mood Swings', 'Procrastination'],
    keywords: ['Expression', 'Enthusiasm', 'Artistry', 'Joy']
  },
  4: {
    title: 'The Master Builder',
    meaning: 'The rock-solid foundation of discipline, practical craftsmanship, systematic order, and unshakable loyalty. You transform abstract dreams into tangible, enduring monuments of success.',
    strengths: ['Pragmatic Discipline', 'Reliability', 'Structure & Organization', 'Patience', 'Honesty'],
    shadow: ['Rigidity', 'Resistance to Change', 'Overworking', 'Excessive Caution'],
    keywords: ['Foundation', 'Discipline', 'Stability', 'Legacy']
  },
  5: {
    title: 'The Free Catalyst',
    meaning: 'The dynamic pulse of boundless freedom, adventure, sensory exploration, and rapid progressive evolution. You thrive on change, break stifling dogmas, and awaken the world to new horizons.',
    strengths: ['Versatility', 'Magnetic Curiosity', 'Fearless Adaptability', 'Charisma', 'Quick Wit'],
    shadow: ['Restlessness', 'Impulsiveness', 'Inconsistency', 'Sensory Excess'],
    keywords: ['Freedom', 'Adventure', 'Change', 'Evolution']
  },
  6: {
    title: 'The Cosmic Nurturer',
    meaning: 'The archetypal vibration of unconditional love, domestic sanctum, healing stewardship, and radiant artistic harmony. You are called to nurture families, heal communities, and cultivate beauty.',
    strengths: ['Compassionate Care', 'Artistic Refinement', 'Protective Loyalty', 'Healing Presence', 'Responsibility'],
    shadow: ['Martyr Complex', 'Interfering Control', 'Self-Sacrifice', 'Perfectionism'],
    keywords: ['Love', 'Nurture', 'Sanctuary', 'Responsibility']
  },
  7: {
    title: 'The Mystical Sage',
    meaning: 'The spiritual seeker of esoteric mysteries, analytical brilliance, sacred solitude, and transcendent truth. You penetrate beyond surface illusions to unearth the hidden laws of nature and cosmos.',
    strengths: ['Philosophical Depth', 'Intuitive Analysis', 'Spiritual Wisdom', 'Intellectual Acumen', 'Discerning Mind'],
    shadow: ['Aloof Cynicism', 'Social Paranoia', 'Secretiveness', 'Emotional Detachment'],
    keywords: ['Introspection', 'Wisdom', 'Esotericism', 'Truth']
  },
  8: {
    title: 'The Celestial Sovereign',
    meaning: 'The cosmic engine of material manifestation, executive power, financial mastery, and karmic balance. You wield high authority to mobilize resources and bring immense abundance into the physical realm.',
    strengths: ['Strategic Vision', 'Financial Mastery', 'Executive Authority', 'Resilience', 'Karmic Fairness'],
    shadow: ['Ruthlessness', 'Material Obsession', 'Control Issues', 'Workaholic Tendency'],
    keywords: ['Abundance', 'Authority', 'Manifestation', 'Power']
  },
  9: {
    title: 'The Universal Humanitarian',
    meaning: 'The enlightened culmination of all numbers. Compassionate broad-mindedness, selfless humanitarian service, philosophical idealism, and cosmic love for all beings across earthly boundaries.',
    strengths: ['Universal Empathy', 'Artistic Vision', 'Altruism', 'Spiritual Forgiveness', 'Global Mindset'],
    shadow: ['Emotional Burnout', 'Resentment of Ingratitude', 'Escapism', 'Disillusionment'],
    keywords: ['Compassion', 'Completion', 'Cosmic Love', 'Altruism']
  },
  11: {
    title: 'Master Number 11: The Cosmic Illuminator',
    meaning: 'A high-voltage spiritual channel. You are gifted with instantaneous psychic downloads, intuitive illumination, and poetic genius to be an inspiring lighthouse guiding souls out of darkness.',
    strengths: ['Psychic Intuition', 'Inspirational Vision', 'Charismatic Catalyst', 'Elevated Consciousness', 'Spiritual Light'],
    shadow: ['Nervous Tension', 'Extreme Anxiety', 'Self-Doubt', 'Overwhelmed by Energy'],
    keywords: ['Illumination', 'Intuition', 'Visionary', 'Transcendence']
  },
  22: {
    title: 'Master Number 22: The Master Architect',
    meaning: 'The most powerful manifesting vibration in numerology. You possess the spiritual vision of the 11 merged with the practical genius of the 4, capable of constructing global systems and institutions that serve humanity.',
    strengths: ['Monumental Vision', 'Practical Genius', 'Global Impact', 'Manifesting Might', 'Unstoppable Tenacity'],
    shadow: ['Crushing Pressure', 'Fear of Grand Failure', 'Domineering Perfectionism'],
    keywords: ['Architecture', 'Monumental Success', 'Manifestation', 'Global Vision']
  },
  33: {
    title: 'Master Number 33: The Master Healer',
    meaning: 'The Christ Consciousness vibration of universal healing, boundless agape love, and spiritual altruism. Your soul has incarnated to uplift collective human consciousness through gentle, sacrificial grace.',
    strengths: ['Universal Compassion', 'Supreme Healing Aura', 'Spiritual Mentorship', 'Unconditional Grace', 'Divine Inspiration'],
    shadow: ['Bearing the World’s Pain', 'Self-Destructive Sacrifice', 'Emotional Exhaustion'],
    keywords: ['Universal Love', 'Sacred Healer', 'Spiritual Teacher', 'Grace']
  }
};

export function getNumberDetails(n: number) {
  return NUMBER_PROFILES[n] || NUMBER_PROFILES[n % 9 || 9];
}

// Robust Pythagorean Date of Birth parser
export function parseDateOfBirth(dateStr: string): {
  day: number;
  month: number;
  year: number;
  digits: number[];
  formatted: string;
} {
  const clean = (dateStr || '').trim();
  const parts = clean.split(/[\/\-\.]/).map(p => parseInt(p, 10)).filter(p => !isNaN(p));
  let day = 1;
  let month = 1;
  let year = 1990;

  if (parts.length === 3) {
    if (parts[0] > 1000) {
      // YYYY-MM-DD format
      year = parts[0];
      month = parts[1];
      day = parts[2];
    } else if (parts[2] > 1000) {
      // DD/MM/YYYY or MM/DD/YYYY format
      year = parts[2];
      if (parts[0] > 12) {
        day = parts[0];
        month = parts[1];
      } else if (parts[1] > 12) {
        month = parts[0];
        day = parts[1];
      } else {
        // Standard DD/MM/YYYY
        day = parts[0];
        month = parts[1];
      }
    } else {
      day = parts[0];
      month = parts[1];
      year = parts[2] < 100 ? (parts[2] > 30 ? 1900 + parts[2] : 2000 + parts[2]) : parts[2];
    }
  }

  // Ensure sensible bounds
  day = Math.min(Math.max(day, 1), 31);
  month = Math.min(Math.max(month, 1), 12);
  if (year < 1000) year = 1990;

  const dd = day.toString().padStart(2, '0');
  const mm = month.toString().padStart(2, '0');
  const yyyy = year.toString();

  // Sequential digits in Day + Month + Year order: e.g. 20/10/1996 -> [2, 0, 1, 0, 1, 9, 9, 6]
  const digits = [...dd.split(''), ...mm.split(''), ...yyyy.split('')].map(Number);

  return {
    day,
    month,
    year,
    digits,
    formatted: `${dd}/${mm}/${yyyy}`
  };
}

// Complete calculation
export function calculateNumerology(profile: UserProfile): FullNumerologyReport {
  const { name, dateOfBirth } = profile;
  const parsedDate = parseDateOfBirth(dateOfBirth);
  const birthYear = parsedDate.year;
  const birthMonth = parsedDate.month;
  const birthDay = parsedDate.day;

  // 1. LIFE PATH NUMBER (Pythagorean full digit-by-digit sum)
  // e.g. 20/10/1996 -> 2 + 0 + 1 + 0 + 1 + 9 + 9 + 6 = 28 -> 2 + 8 = 10 -> 1 + 0 = 1
  const digits = parsedDate.digits;
  const digitExpr = digits.join(' + ');
  const sum1 = digits.reduce((acc, d) => acc + d, 0);

  let current = sum1;
  const steps: string[] = [`${digitExpr} = ${sum1}`];
  let isMasterLP = false;

  if (current === 11 || current === 22 || current === 33) {
    isMasterLP = true;
    steps.push(`(${current} Master Number)`);
  } else {
    while (current > 9) {
      const stepDigits = current.toString().split('').map(Number);
      const nextSum = stepDigits.reduce((acc, d) => acc + d, 0);
      steps.push(`${stepDigits.join(' + ')} = ${nextSum}`);
      current = nextSum;
      if (current === 11 || current === 22 || current === 33) {
        isMasterLP = true;
        steps.push(`(${current} Master Number)`);
        break;
      }
    }
  }

  const lifePathNumber = current;
  const lpDetails = getNumberDetails(lifePathNumber);
  const lifePathBreakdown: NumerologyBreakdown = {
    number: lifePathNumber,
    isMaster: isMasterLP,
    name: 'Life Path Number',
    title: lpDetails.title,
    calculation: steps.join(' → '),
    meaning: lpDetails.meaning,
    strengths: lpDetails.strengths,
    shadowAspects: lpDetails.shadow,
    keywords: lpDetails.keywords
  };

  const redMonth = reduceNumber(birthMonth, true);
  const redDay = reduceNumber(birthDay, true);
  const redYear = reduceNumber(birthYear, true);
  const lifePath = { num: lifePathNumber, isMaster: isMasterLP };

  // 2. DESTINY (EXPRESSION) NUMBER
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
  let expressionSum = 0;
  for (const ch of cleanName) {
    expressionSum += PYTHAGOREAN_MAP[ch] || 0;
  }
  const destiny = reduceNumber(expressionSum, true);
  const destinyDetails = getNumberDetails(destiny.num);
  const destinyBreakdown: NumerologyBreakdown = {
    number: destiny.num,
    isMaster: destiny.isMaster,
    name: 'Destiny (Expression) Number',
    title: destinyDetails.title,
    calculation: `Sum of all letters in "${name.trim()}" = ${expressionSum} → ${destiny.num}`,
    meaning: `Reveals your inherent cosmic talents, vocational gifts, and the ultimate destiny your soul is equipped to fulfill in this lifetime. ${destinyDetails.meaning}`,
    strengths: destinyDetails.strengths,
    shadowAspects: destinyDetails.shadow,
    keywords: destinyDetails.keywords
  };

  // 3. SOUL URGE (HEART'S DESIRE) NUMBER
  let soulSum = 0;
  for (const ch of cleanName) {
    if (VOWELS.has(ch)) {
      soulSum += PYTHAGOREAN_MAP[ch] || 0;
    }
  }
  const soulUrge = reduceNumber(soulSum, true);
  const soulDetails = getNumberDetails(soulUrge.num);
  const soulUrgeBreakdown: NumerologyBreakdown = {
    number: soulUrge.num,
    isMaster: soulUrge.isMaster,
    name: "Soul Urge (Heart's Desire)",
    title: soulDetails.title,
    calculation: `Sum of vowels in "${name.trim()}" = ${soulSum} → ${soulUrge.num}`,
    meaning: `The deepest subconscious yearnings, hidden emotional needs, and what your soul secretly hungers for behind all worldly personas. ${soulDetails.meaning}`,
    strengths: soulDetails.strengths,
    shadowAspects: soulDetails.shadow,
    keywords: soulDetails.keywords
  };

  // 4. PERSONALITY NUMBER
  let personalitySum = 0;
  for (const ch of cleanName) {
    if (!VOWELS.has(ch)) {
      personalitySum += PYTHAGOREAN_MAP[ch] || 0;
    }
  }
  const personality = reduceNumber(personalitySum, true);
  const persDetails = getNumberDetails(personality.num);
  const personalityBreakdown: NumerologyBreakdown = {
    number: personality.num,
    isMaster: personality.isMaster,
    name: 'Personality Number',
    title: persDetails.title,
    calculation: `Sum of consonants in "${name.trim()}" = ${personalitySum} → ${personality.num}`,
    meaning: `The outer armor, aura, first impressions, and magnetic presence you radiate to acquaintances and the outer world. ${persDetails.meaning}`,
    strengths: persDetails.strengths,
    shadowAspects: persDetails.shadow,
    keywords: persDetails.keywords
  };

  // 5. MATURITY (POWER) NUMBER
  const maturityRaw = lifePath.num + destiny.num;
  const maturity = reduceNumber(maturityRaw, true);
  const matDetails = getNumberDetails(maturity.num);
  const maturityBreakdown: NumerologyBreakdown = {
    number: maturity.num,
    isMaster: maturity.isMaster,
    name: 'Maturity (Power) Number',
    title: matDetails.title,
    calculation: `Life Path (${lifePath.num}) + Destiny (${destiny.num}) = ${maturityRaw} → ${maturity.num}`,
    meaning: `The emergent power and synthesis of your soul that ripens after age 35–45, guiding your legacy and senior years. ${matDetails.meaning}`,
    strengths: matDetails.strengths,
    shadowAspects: matDetails.shadow,
    keywords: matDetails.keywords
  };

  // 6. ATTITUDE (SUN) NUMBER
  const attitudeRaw = birthMonth + birthDay;
  const attitude = reduceNumber(attitudeRaw, false);
  const attDetails = getNumberDetails(attitude.num);
  const attitudeBreakdown: NumerologyBreakdown = {
    number: attitude.num,
    isMaster: false,
    name: 'Attitude (Sun) Number',
    title: attDetails.title,
    calculation: `Birth Month (${birthMonth}) + Birth Day (${birthDay}) = ${attitudeRaw} → ${attitude.num}`,
    meaning: `Your instinctive defense mechanism, general outlook on daily events, and the lens through which you immediately react to challenges. ${attDetails.meaning}`,
    strengths: attDetails.strengths,
    shadowAspects: attDetails.shadow,
    keywords: attDetails.keywords
  };

  // 7. PINNACLES (4 Great Life Eras)
  const baseLP = lifePath.isMaster ? reduceNumber(lifePath.num, false).num : lifePath.num;
  const firstPinnacleEndAge = 36 - baseLP;

  // 1st Pinnacle: Month + Day
  const p1 = reduceNumber(redMonth.num + redDay.num, true);
  // 2nd Pinnacle: Day + Year
  const p2 = reduceNumber(redDay.num + redYear.num, true);
  // 3rd Pinnacle: P1 + P2
  const p3 = reduceNumber(p1.num + p2.num, true);
  // 4th Pinnacle: Month + Year
  const p4 = reduceNumber(redMonth.num + redYear.num, true);

  const pinnacles: PinnacleInfo[] = [
    {
      pinnacleNumber: 1,
      number: p1.num,
      isMaster: p1.isMaster,
      ageSpan: `Birth to Age ${firstPinnacleEndAge}`,
      theme: getNumberDetails(p1.num).title,
      guidance: `During your formative years, you are absorbing foundational lessons of ${getNumberDetails(p1.num).keywords.join(', ')}. Cultivate patience with self.`
    },
    {
      pinnacleNumber: 2,
      number: p2.num,
      isMaster: p2.isMaster,
      ageSpan: `Age ${firstPinnacleEndAge + 1} to Age ${firstPinnacleEndAge + 9}`,
      theme: getNumberDetails(p2.num).title,
      guidance: `A productive 9-year cycle dedicated to establishing career, relationships, and mastery over ${getNumberDetails(p2.num).keywords[0]}.`
    },
    {
      pinnacleNumber: 3,
      number: p3.num,
      isMaster: p3.isMaster,
      ageSpan: `Age ${firstPinnacleEndAge + 10} to Age ${firstPinnacleEndAge + 18}`,
      theme: getNumberDetails(p3.num).title,
      guidance: `The harvest era where your hard work synthesizes into public authority and creative legacy under ${getNumberDetails(p3.num).keywords[1]}.`
    },
    {
      pinnacleNumber: 4,
      number: p4.num,
      isMaster: p4.isMaster,
      ageSpan: `Age ${firstPinnacleEndAge + 19}+ Onward`,
      theme: getNumberDetails(p4.num).title,
      guidance: `The golden spiritual culmination. You radiate wisdom, guide younger generations, and embody ${getNumberDetails(p4.num).keywords[2]}.`
    }
  ];

  // 8. CHALLENGES (4 Soul Hurdles)
  const c1Num = Math.abs(redMonth.num - redDay.num);
  const c2Num = Math.abs(redDay.num - redYear.num);
  const c3Num = Math.abs(c1Num - c2Num); // Main Life Challenge
  const c4Num = Math.abs(redMonth.num - redYear.num);

  const getChallengeDescription = (num: number) => {
    switch (num) {
      case 0: return { lesson: 'The Choice Challenge (No Specific Curse)', remedy: 'You have broad spiritual freedom; avoid complacency and take deliberate initiative.' };
      case 1: return { lesson: 'Overcoming Self-Doubt and Subjugation', remedy: 'Learn to stand firmly in your own authority without needing validation or resorting to aggression.' };
      case 2: return { lesson: 'Hypersensitivity and Fear of Disapproval', remedy: 'Set firm emotional boundaries and do not let others’ mood swings dictate your inner peace.' };
      case 3: return { lesson: 'Scattered Focus & Emotional Suppression', remedy: 'Speak your authentic truth and direct your creative passions into structured outlets.' };
      case 4: return { lesson: 'Impatience, Chaos or Rigid Stubbornness', remedy: 'Embrace daily routine, physical health, and methodical discipline without feeling trapped.' };
      case 5: return { lesson: 'Fear of Commitment vs. Reckless Escapism', remedy: 'Find true internal freedom through self-mastery rather than fleeing responsibilities.' };
      case 6: return { lesson: 'Perfectionism and Meddling in Loved Ones', remedy: 'Love others as they are without demanding unrealistic ideals or playing the martyr.' };
      case 7: return { lesson: 'Aloof Isolation, Skepticism & Pride', remedy: 'Balance intellectual rigor with emotional warmth; trust the unseen divine intelligence.' };
      case 8: return { lesson: 'Material Anxiety, Greed or Fear of Power', remedy: 'Recognize that true abundance flows when ethical stewardship guides your ambition.' };
      default: return { lesson: 'General Integration Lesson', remedy: 'Cultivate balance and self-awareness across daily endeavors.' };
    }
  };

  const challenges: ChallengeInfo[] = [
    {
      challengeNumber: 1,
      number: c1Num,
      ageSpan: `Youth Era (Birth to Age ${firstPinnacleEndAge})`,
      lesson: getChallengeDescription(c1Num).lesson,
      remedy: getChallengeDescription(c1Num).remedy
    },
    {
      challengeNumber: 2,
      number: c2Num,
      ageSpan: `Middle Era (Age ${firstPinnacleEndAge + 1} to ${firstPinnacleEndAge + 9})`,
      lesson: getChallengeDescription(c2Num).lesson,
      remedy: getChallengeDescription(c2Num).remedy
    },
    {
      challengeNumber: 3,
      number: c3Num,
      ageSpan: 'Main Lifetime Challenge (All Years)',
      lesson: getChallengeDescription(c3Num).lesson,
      remedy: getChallengeDescription(c3Num).remedy
    },
    {
      challengeNumber: 4,
      number: c4Num,
      ageSpan: `Culmination Era (Age ${firstPinnacleEndAge + 10}+)`,
      lesson: getChallengeDescription(c4Num).lesson,
      remedy: getChallengeDescription(c4Num).remedy
    }
  ];

  // 9. YEARLY & MONTHLY NUMEROLOGY
  const currentCalYear = new Date().getFullYear();
  const getPersonalYearForecast = (targetYear: number): PersonalYearInfo => {
    const rawPy = redMonth.num + redDay.num + reduceNumber(targetYear, false).num;
    const py = reduceNumber(rawPy, false).num;

    const forecasts: Record<number, { theme: string; desc: string; focus: string[]; opps: string[]; prec: string[] }> = {
      1: {
        theme: 'A Year of Bold New Beginnings & Pioneering Seeds',
        desc: 'The start of an entirely new 9-year cycle! The cosmic slate is wiped clean. It is time to launch bold projects, take leaps of faith, and redefine who you are.',
        focus: ['Initiative & Independence', 'Planting Long-Term Projects', 'Self-Confidence'],
        opps: ['Starting a business or career shift', 'Total personal makeover', 'Solo leadership roles'],
        prec: ['Avoid procrastination or waiting for permission', 'Resist looking back at the prior cycle']
      },
      2: {
        theme: 'A Year of Patience, Sacred Partnerships & Gentle Growth',
        desc: 'The seeds you planted last year are germinating beneath the soil. Move with diplomacy, deepen intimate bonds, and allow organic timing to unfold.',
        focus: ['Collaboration & Alliances', 'Emotional Intelligence', 'Nurturing Growth'],
        opps: ['Romantic commitments or deep friendships', 'Diplomatic negotiations', 'Psychic and intuitive growth'],
        prec: ['Avoid rushing results', 'Do not compromise your core values to keep false peace']
      },
      3: {
        theme: 'A Year of Joy, Creative Expansion & Social Brilliance',
        desc: 'A vibrant, light-filled chapter. Your voice, creative talents, and personal magnetism are at their peak. Express your artistic essence and expand your circle.',
        focus: ['Artistic Expression', 'Networking & Joyful Play', 'Communication & Writing'],
        opps: ['Public speaking or media ventures', 'Creative artistic breakthroughs', 'Celebrations and travel'],
        prec: ['Beware of scattering energy over too many trivial projects', 'Keep financial track of spontaneous splurges']
      },
      4: {
        theme: 'A Year of Foundation Building, Discipline & Hard Work',
        desc: 'A year of practical craftsmanship. Put systems in place, organize finances, attend to physical health, and build an unshakeable bedrock for future prosperity.',
        focus: ['Hard Work & Organization', 'Health & Bodily Vitality', 'Legal & Financial Security'],
        opps: ['Purchasing property or home renovations', 'Securing stable contracts', 'Mastering a technical craft'],
        prec: ['Do not cut corners', 'Avoid feeling bogged down by routine; remind yourself of the cathedral you are building']
      },
      5: {
        theme: 'A Year of Dynamic Change, Freedom & Unexpected Horizons',
        desc: 'The midpoint of your 9-year cycle arrives like a fresh gale-force wind! Stagnation breaks open. Expect spontaneous travel, surprise shifts, and exciting adventures.',
        focus: ['Embracing Transformation', 'Travel & Sensory Exploration', 'Breaking Outdated Routines'],
        opps: ['Overseas travel or relocation', 'Viral marketing or progressive career pivots', 'Reinventing your lifestyle'],
        prec: ['Avoid impulsive recklessness or burnouts', 'Keep your core responsibilities anchored while exploring']
      },
      6: {
        theme: 'A Year of Hearth, Sacred Duty, Healing & Domestic Love',
        desc: 'The focus shifts directly to family, home sanctuary, heart-to-heart commitments, and community stewardship. Love, marriage, and aesthetic beautification flourish.',
        focus: ['Domestic Harmony & Family', 'Healing Relationships', 'Beautifying Living Space'],
        opps: ['Marriage, welcoming children, or deepening love', 'Home redesign or sanctuary creation', 'Community leadership and counseling'],
        prec: ['Avoid excessive codependency or meddling', 'Do not sacrifice your wellbeing entirely for others']
      },
      7: {
        theme: 'A Sabbatical Year of Solitude, Inner Wisdom & Sacred Truth',
        desc: 'A profoundly spiritual year. Step back from frantic worldly chasing. Dedicate time to study, meditation, rest, and uncovering esoteric secrets about your soul.',
        focus: ['Spiritual Study & Meditation', 'Rest & Soul Recovery', 'Intellectual Specialization'],
        opps: ['Spiritual retreats and esoteric mastery', 'Writing a book or deep research', 'Healing deep subconscious wounds'],
        prec: ['Avoid pushing hard for material expansion', 'Resist feelings of loneliness; view solitude as sacred sanctuary']
      },
      8: {
        theme: 'A Year of Financial Harvest, Manifestation & High Authority',
        desc: 'The powerhouse year of the cycle! All the seeds cultivated since Year 1 now bear immense tangible fruit. Step into executive authority, financial prosperity, and executive leadership.',
        focus: ['Financial Growth & Investments', 'Career Promotion & Executive Mastery', 'Karmic Balance & Justice'],
        opps: ['Major financial windfalls or raises', 'Leading major organizations', 'Acquiring valuable assets'],
        prec: ['Operate with utmost ethical integrity', 'Remember that generosity amplifies abundance']
      },
      9: {
        theme: 'A Year of Completion, Forgiveness & Grand Graduation',
        desc: 'The grand finale of your 9-year cycle. Clean house mentally, emotionally, and physically. Release expired connections, forgive old debts, and prepare for rebirth.',
        focus: ['Closure & Completion', 'Universal Compassion & Forgiveness', 'Charitable Service & Letting Go'],
        opps: ['Finishing long-standing projects', 'Profound spiritual liberation from past burdens', 'Worldwide humanitarian impact'],
        prec: ['Do not cling to things that are naturally departing', 'Avoid beginning 10-year commitments; wait for Year 1']
      }
    };

    const data = forecasts[py] || forecasts[1];
    return {
      year: targetYear,
      personalYearNumber: py,
      theme: data.theme,
      description: data.desc,
      focusAreas: data.focus,
      favorableFor: data.opps,
      precautions: data.prec
    };
  };

  const currentPersonalYear = getPersonalYearForecast(currentCalYear);
  const upcomingYears: PersonalYearInfo[] = [
    currentPersonalYear,
    getPersonalYearForecast(currentCalYear + 1),
    getPersonalYearForecast(currentCalYear + 2),
    getPersonalYearForecast(currentCalYear + 3),
    getPersonalYearForecast(currentCalYear + 4),
    getPersonalYearForecast(currentCalYear + 5)
  ];

  // Month by Month analysis for current Personal Year
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthlyForecast: PersonalMonthInfo[] = monthNames.map((mName, idx) => {
    const calMonth = idx + 1;
    const rawPm = currentPersonalYear.personalYearNumber + calMonth;
    const pm = reduceNumber(rawPm, false).num;

    const pmThemes: Record<number, { theme: string; forecast: string }> = {
      1: { theme: 'New Initiatives & Fresh Momentum', forecast: 'An energizing month to launch new ideas, take decisive action, and initiate self-directed plans.' },
      2: { theme: 'Diplomacy, Patience & Partnerships', forecast: 'Focus on cooperation, delicate discussions, and trusting intuitive timing rather than pushing.' },
      3: { theme: 'Creative Bloom, Social Joy & Expression', forecast: 'A buoyant social window. Ideal for creative projects, presentations, and reconnecting with loved ones.' },
      4: { theme: 'Focus, Order & Foundation Work', forecast: 'A grounded, practical month to organize records, optimize daily health routines, and execute plans methodically.' },
      5: { theme: 'Excitement, Adaptability & Progress', forecast: 'Quick transitions and dynamic surprises. Embrace flexibility and welcome spontaneous travel or new perspectives.' },
      6: { theme: 'Family Harmony, Service & Home Sanctuary', forecast: 'Attention turns to family matters, emotional support, domestic comfort, and beautifying your living space.' },
      7: { theme: 'Soul Reflection, Research & Inner Peace', forecast: 'A quieter introspective window. Perfect for meditation, studying new concepts, and trusting your inner compass.' },
      8: { theme: 'Manifestation, Financial Focus & Empowerment', forecast: 'High vibrational energy for material results, business negotiations, decisive executive moves, and rewards.' },
      9: { theme: 'Culmination, Cleansing & Compassionate Release', forecast: 'Tie up loose ends, release burdens, declutter your environment, and celebrate milestones reached.' }
    };

    const mData = pmThemes[pm] || pmThemes[1];
    return {
      month: calMonth,
      monthName: mName,
      personalMonthNumber: pm,
      theme: mData.theme,
      vibrationalForecast: mData.forecast
    };
  });

  // 10. LIFE SUMMARY: Family, Career & Marriage / Spouse Dynamics
  const lifeSummary = generateLifeSummary(lifePath.num);

  return {
    lifePath: lifePathBreakdown,
    destiny: destinyBreakdown,
    soulUrge: soulUrgeBreakdown,
    personality: personalityBreakdown,
    maturity: maturityBreakdown,
    attitude: attitudeBreakdown,
    pinnacles,
    challenges,
    currentPersonalYear,
    upcomingYears,
    monthlyForecast,
    lifeSummary
  };
}

function generateLifeSummary(num: number): { family: string; career: string; spouseMarriage: string } {
  const summaries: Record<number, { family: string; career: string; spouseMarriage: string }> = {
    1: {
      family: 'You are the natural anchor and courageous protector of your household. You teach your family resilience, self-reliance, and independent thinking. To keep warmth flowing, balance your leadership with patient listening and allow family members to make their own choices without feeling pressured.',
      career: 'Born for leadership, entrepreneurship, pioneering initiatives, and executive decision-making. You excel at launching new projects from scratch, heading organizations, or operating as an independent authority. Micromanagement drains you; creative sovereignty fuels your highest earnings.',
      spouseMarriage: 'In marriage, you seek a self-assured, supportive partner who respects your high aspirations and shares your integrity. Your union thrives when mutual respect comes first and you willingly soften your ego to share the steering wheel with your spouse.'
    },
    2: {
      family: 'You bring tenderness, emotional safety, and peaceful harmony into your domestic sanctuary. You are the mediator who dissolves family misunderstandings and ensures every loved one feels heard, cherished, and comforted.',
      career: 'Your cosmic strengths shine in diplomacy, counseling, mediation, strategic partnerships, healing professions, advisory roles, and collaborative projects. You have an unmatched instinct for reading people and negotiating win-win outcomes.',
      spouseMarriage: 'A deeply romantic, devoted, and empathetic companion. For a lifelong blissful marriage, you need a partner who provides verbal reassurance, gentle loyalty, and emotional stability. Avoid swallowing unspoken hurts; vocalize your needs with confidence.'
    },
    3: {
      family: 'You bring laughter, lightness, creative expression, and optimism to your family life. You make the home vibrant and welcoming, inspiring children and relatives to pursue artistic hobbies and celebrate life’s milestones.',
      career: 'You flourish in creative arts, communication, marketing, public speaking, media, writing, design, and entertainment. Your magnetic enthusiasm and wit open doors where rigid routine fails. Focus on completing what you initiate to maximize financial abundance.',
      spouseMarriage: 'You need an encouraging, playful partner who enjoys stimulating conversations, shared laughter, and emotional freedom. Marriage stays passionate when you and your spouse travel together, keep routine from becoming dull, and maintain transparent honesty.'
    },
    4: {
      family: 'You are the bedrock and fortress of your family. You provide unshakeable security, practical provisions, systematic organization, and deep generational loyalty that relatives can always depend upon.',
      career: 'Outstanding in management, finance, real estate, engineering, law, construction, accounting, and systematic operations. Your methodical work ethic, punctuality, and attention to detail earn you lasting respect and long-term financial security.',
      spouseMarriage: 'Steadfast, protective, and faithful spouse. You seek a trustworthy, grounded life partner who values commitment and shared goals. Express your affection through words and spontaneous gestures alongside practical deeds to keep romance vibrant.'
    },
    5: {
      family: 'You bring progressive thinking, excitement, and open-minded perspectives to family dynamics. You encourage loved ones to explore the world, try new experiences, and break free from outdated dogmas.',
      career: 'Thrives in dynamic, fast-moving environments: sales, travel, international business, technology innovation, journalism, and consulting. Monotonous desk routines suffocate your talents; variety and autonomy bring your greatest professional breakthroughs.',
      spouseMarriage: 'You need an adventurous, open-minded, and secure partner who has their own passions and allows you healthy space. Marriage thrives when both partners honor individual growth and regularly embark on exciting adventures together.'
    },
    6: {
      family: 'Family and domestic sanctuary are at the very core of your heart. You are the devoted caregiver, wise advisor, and healing presence who creates an aesthetically beautiful, emotionally warm home.',
      career: 'Exceptional in healthcare, education, counseling, social enterprise, interior design, culinary arts, hospitality, and ethical business stewardship. You turn any workplace into a cohesive, supportive community.',
      spouseMarriage: 'The quintessential devoted life partner. You give endless love, care, and loyalty. For marriage harmony, ensure you don’t over-sacrifice or become over-controlling out of worry; choose a partner who cherishes and reciprocates your generous affection.'
    },
    7: {
      family: 'You offer calm wisdom, intellectual depth, and philosophical guidance to your family. You prefer a quiet, tranquil home environment where you can recharge and engage in meaningful, soul-to-soul conversations.',
      career: 'Brilliant in analytical research, specialized science, IT architecture, philosophy, spiritual teaching, investigation, strategy, and solitary creative writing. You solve complex problems that baffle others.',
      spouseMarriage: 'You need an emotionally mature, thoughtful partner who respects your sacred need for quiet contemplation and mental space. Marriage reaches spiritual heights when founded on profound intellectual and soulful rapport.'
    },
    8: {
      family: 'You are the generous provider and executive guardian who works tirelessly to secure wealth, comfort, and opportunities for your lineage. You inspire ambition and high self-esteem in family members.',
      career: 'The powerhouse of commerce, executive authority, large-scale financial management, real estate investment, and corporate leadership. You naturally know how to transform resources into lasting tangible wealth.',
      spouseMarriage: 'You seek an equal partner of high caliber, strength, and elegance who respects your work drive. Make conscious time away from business to nurture intimate romance, vulnerable communication, and shared relaxation.'
    },
    9: {
      family: 'You are broad-minded, generous, and compassionate, creating a home filled with acceptance, moral principles, and cultural richness. You teach children global empathy and universal values.',
      career: 'Drawn to humanitarian leadership, international law, arts, philanthropy, counseling, publishing, environmental causes, and world-bettering endeavors. Money flows abundantly when aligned with higher soul purpose.',
      spouseMarriage: 'A soulful, romantic, and generous partner. You seek a true soulmate who shares your humanitarian heart and deep values. Guard against holding onto past romantic disappointments; offer your partner forgiveness and presence.'
    },
    11: {
      family: 'An intuitive, inspiring presence in the household. You sense emotional undercurrents before words are spoken, creating a spiritually elevated sanctuary for your loved ones.',
      career: 'Visionary artist, inspirational teacher, intuitive counselor, or transformative leader. You are designed to ignite the minds and hearts of others with breakthrough ideas.',
      spouseMarriage: 'Requires a sensitive, spiritually attuned spouse who provides a grounding anchor for your high vibrational frequency. Your marriage is a sacred union of mutual spiritual growth.'
    },
    22: {
      family: 'The architect of enduring family prosperity. You provide both grand vision and practical security, setting up generations to come for triumph and education.',
      career: 'The Master Builder. Capable of executing monumental projects, large corporations, global foundations, and community infrastructure with effortless mastery.',
      spouseMarriage: 'Needs a loyal, resilient partner who understands your grand destiny and provides a safe haven of peace where you can rest your heavy responsibilities.'
    },
    33: {
      family: 'The compassionate heart of the entire family network. You radiate unconditional love, emotional healing, and protective grace to everyone who enters your home.',
      career: 'Master Teacher and spiritual humanitarian. You excel in high-impact service, healing arts, counseling, and uplifting collective consciousness.',
      spouseMarriage: 'Blessed with deep capacity for unconditional devotion. Seek a kind, emotionally balanced partner who cherishes your gentle spirit and honors your calling.'
    }
  };

  return summaries[num] || summaries[num % 9 || 9];
}
