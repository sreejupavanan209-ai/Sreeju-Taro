import { SpreadDefinition } from '../types';

export const SPREADS: SpreadDefinition[] = [
  // 1. SINGLE CARD READING
  {
    id: 'single-card',
    type: 'single',
    name: 'Single Card Reading',
    subtitle: 'Immediate Oracle & Daily Insight',
    description: 'A focused, concise transmission from the cosmos. Perfect for a quick answer, core theme of the moment, or meditative reflection.',
    cardCount: 1,
    category: 'Quick',
    positions: [
      {
        index: 0,
        name: 'The Core Oracle',
        description: 'The central energy, message, or cosmic guidance surrounding your inquiry right now.'
      }
    ]
  },

  // 2. HOW'S YOUR DAY?
  {
    id: 'daily-spread',
    type: 'daily',
    name: "How's Your Day?",
    subtitle: 'Daily Energy, Challenges & Guidance',
    description: 'A dedicated three-fold daily oracle designed to attune your awareness to today’s prevailing currents, potential traps, and highest wisdom.',
    cardCount: 3,
    category: 'Daily',
    positions: [
      {
        index: 0,
        name: 'Today’s Energy',
        description: 'The ambient vibrational frequency, mood, and dominant spirit influencing your day.'
      },
      {
        index: 1,
        name: 'Challenges to Navigate',
        description: 'Internal resistance, external distractions, or unexpected tests that may arise.'
      },
      {
        index: 2,
        name: 'Divine Guidance',
        description: 'The highest perspective, recommended action, and spiritual compass for peace and victory.'
      }
    ]
  },

  // 3. 3-CARD SPREADS (Various sub-options)
  {
    id: 'three-past-present-future',
    type: 'three-card',
    subType: 'Past, Present, Future',
    name: 'Past, Present & Future',
    subtitle: 'Timeline of Becoming',
    description: 'Trace the unbroken thread of cause and effect through your temporal timeline.',
    cardCount: 3,
    category: 'Quick',
    positions: [
      {
        index: 0,
        name: 'The Past',
        description: 'Foundational forces, prior choices, and karmic roots shaping this moment.'
      },
      {
        index: 1,
        name: 'The Present',
        description: 'Current dynamics, conscious reality, and the active state of your life right now.'
      },
      {
        index: 2,
        name: 'The Future',
        description: 'The emergent outcome if present momentum and spiritual trajectory continue unchanged.'
      }
    ]
  },
  {
    id: 'three-mind-body-spirit',
    type: 'three-card',
    subType: 'Mind, Body, Spirit',
    name: 'Mind, Body & Spirit',
    subtitle: 'Holistic Triad of Alignment',
    description: 'Harmonize your mental, physical, and spiritual energetic centers.',
    cardCount: 3,
    category: 'Quick',
    positions: [
      {
        index: 0,
        name: 'Mind (Air)',
        description: 'Your thoughts, belief systems, mental clarity, and intellectual focus.'
      },
      {
        index: 1,
        name: 'Body (Earth)',
        description: 'Physical vitality, somatic sensations, material world, and daily habits.'
      },
      {
        index: 2,
        name: 'Spirit (Ether/Fire)',
        description: 'Higher intuition, sacred connection, purpose, and soul evolution.'
      }
    ]
  },
  {
    id: 'three-situation-obstacle-advice',
    type: 'three-card',
    subType: 'Situation, Obstacle, Advice',
    name: 'Situation, Obstacle & Advice',
    subtitle: 'The Clarity Triad',
    description: 'Break through confusion by identifying what is really happening and how to triumph.',
    cardCount: 3,
    category: 'Quick',
    positions: [
      {
        index: 0,
        name: 'The Situation',
        description: 'The true essence of the matter, stripped of illusions.'
      },
      {
        index: 1,
        name: 'The Obstacle',
        description: 'What stands in your way—whether an external friction or internal doubt.'
      },
      {
        index: 2,
        name: 'The Advice',
        description: 'The ideal remedy, psychological mindset, or strategic maneuver to take.'
      }
    ]
  },
  {
    id: 'three-relationship-dynamic',
    type: 'three-card',
    subType: 'You, Partner, The Dynamic',
    name: 'You, Partner & The Dynamic',
    subtitle: 'Relational Resonance',
    description: 'Understand the alchemy between two souls and the bridge connecting them.',
    cardCount: 3,
    category: 'Quick',
    positions: [
      {
        index: 0,
        name: 'Your Energy',
        description: 'What you bring into the relationship, your emotional posture, and unspoken needs.'
      },
      {
        index: 1,
        name: 'Their Energy',
        description: 'Their perspective, emotional state, and subconscious intentions toward you.'
      },
      {
        index: 2,
        name: 'The Relational Alchemy',
        description: 'The collective soul contract, future trajectory, and shared karmic dynamic.'
      }
    ]
  },
  {
    id: 'three-embrace-release-step',
    type: 'three-card',
    subType: 'Embrace, Release, Next Step',
    name: 'Embrace, Release & Next Step',
    subtitle: 'Spiritual Cleanse & Awakening',
    description: 'Clear emotional clutter and step forward into empowered alignment.',
    cardCount: 3,
    category: 'Quick',
    positions: [
      {
        index: 0,
        name: 'What to Embrace',
        description: 'Gifts, attitudes, or truths you must welcome into your heart with open arms.'
      },
      {
        index: 1,
        name: 'What to Release',
        description: 'Outdated habits, lingering grievances, or expired attachments to shed.'
      },
      {
        index: 2,
        name: 'Your Next Step',
        description: 'The exact physical or spiritual action to initiate next.'
      }
    ]
  },

  // 4. 4-CARD FOCUSED LIFE SPREADS (Relationships, Marriage, Career Worth, Current Life)
  {
    id: 'four-past-relationship-return',
    type: 'four-card',
    subType: 'Past Relationship',
    name: 'Will My Past Relationship Return?',
    subtitle: '4-Card Ex Reconciliation Oracle',
    description: 'Unveil whether your ex-partner will return, what they are currently feeling, the primary obstacle, and the ultimate outcome.',
    cardCount: 4,
    category: 'Specialized',
    positions: [
      { index: 0, name: '1. Breakup Root & Past Bond', description: 'The core reason for the separation and the lasting soul connection.' },
      { index: 1, name: '2. Their Current Feelings for You', description: 'What your ex is truly feeling, missing, or struggling with right now.' },
      { index: 2, name: '3. The Major Block or Catalyst', description: 'The pivotal obstacle holding them back, or the catalyst that could bridge you together.' },
      { index: 3, name: '4. Final Outcome: Will They Return?', description: 'The definitive answer: whether you will reconcile or if your highest destiny is to move on.' }
    ]
  },
  {
    id: 'four-marriage-problem',
    type: 'four-card',
    subType: 'Marriage Problem',
    name: 'Marriage Problem & Harmony Spread',
    subtitle: '4-Card Marital Crisis & Solution',
    description: 'Pinpoint the true root of conflict with your spouse, what both partners need, and how to heal the marriage.',
    cardCount: 4,
    category: 'Specialized',
    positions: [
      { index: 0, name: '1. Root Cause of Marital Conflict', description: 'The unspoken friction, resentment, or external pressure troubling your marriage.' },
      { index: 1, name: '2. Your Emotional Need & Role', description: 'What your heart is deeply needing and how your reactions impact the union.' },
      { index: 2, name: '3. Your Spouse’s True Perspective', description: 'What your husband or wife is silently experiencing and craving from you.' },
      { index: 3, name: '4. Solution & Marriage Future', description: 'The exact action needed to restore love, trust, and the long-term marital outlook.' }
    ]
  },
  {
    id: 'four-job-worth',
    type: 'four-card',
    subType: 'Job Worth',
    name: 'Is My Job Worth It?',
    subtitle: '4-Card Career Worth & Value Evaluation',
    description: 'Direct guidance on whether your current job is worth your time, energy, and stress, or if better opportunities await.',
    cardCount: 4,
    category: 'Specialized',
    positions: [
      { index: 0, name: '1. Current Work Reality & Return', description: 'What this job is actually providing you in growth, money, and satisfaction.' },
      { index: 1, name: '2. The Hidden Cost & Toll', description: 'The physical, mental, or emotional price you are paying by staying here.' },
      { index: 2, name: '3. Better Opportunities Ahead', description: 'What new career doors, promotions, or better offers exist outside this role.' },
      { index: 3, name: '4. The Verdict: Stay or Move On?', description: 'Clear oracle counsel on whether to persevere, ask for more, or make your exit.' }
    ]
  },
  {
    id: 'four-life-currently',
    type: 'four-card',
    subType: 'Life Currently',
    name: 'How Is My Life Currently?',
    subtitle: '4-Card Present Life Snapshot',
    description: 'A comprehensive check-in on where you stand today across your mind, heart, worldly stability, and where you are headed.',
    cardCount: 4,
    category: 'Specialized',
    positions: [
      { index: 0, name: '1. Mind & Mental Clarity', description: 'Your current headspace, stress level, and mental focus today.' },
      { index: 1, name: '2. Heart & Emotional Life', description: 'Your emotional wellbeing, vulnerability, and relationship state.' },
      { index: 2, name: '3. Career, Money & Security', description: 'The health of your finances, work momentum, and material foundation.' },
      { index: 3, name: '4. Current Life Trajectory', description: 'Where your collective choices and destiny are steering you over the coming weeks.' }
    ]
  },

  // 5. HORSESHOE SPREADS (7 cards each: General, Relationship, Career)
  {
    id: 'horseshoe-general',
    type: 'horseshoe',
    subType: 'General',
    name: 'Horseshoe Spread: General',
    subtitle: '7-Card Panoramic Destiny Arc',
    description: 'A classic 7-card arc revealing the full spectrum of your current life situation from past influences to the ultimate outcome.',
    cardCount: 7,
    category: 'Comprehensive',
    positions: [
      { index: 0, name: '1. Past Influences', description: 'Events and karmic seeds that established the present situation.' },
      { index: 1, name: '2. Present Standing', description: 'Where you stand right now mentally, emotionally, and materially.' },
      { index: 2, name: '3. Hidden Influences', description: 'Unseen factors, subconscious drives, or things happening behind the scenes.' },
      { index: 3, name: '4. Obstacles & Tests', description: 'The primary stumbling block or challenge testing your resolve.' },
      { index: 4, name: '5. External Atmosphere', description: 'People, environments, and social influences shaping your path.' },
      { index: 5, name: '6. Recommended Action', description: 'The wise course of action you should adopt.' },
      { index: 6, name: '7. Final Resolution', description: 'The ultimate synthesis and manifestation if advice is followed.' }
    ]
  },
  {
    id: 'horseshoe-relationship',
    type: 'horseshoe',
    subType: 'Relationship',
    name: 'Horseshoe Spread: Relationship',
    subtitle: '7-Card Sacred Union & Romance Arc',
    description: 'Examine love, emotional intimacy, soul contracts, and the future trajectory of your heart.',
    cardCount: 7,
    category: 'Comprehensive',
    positions: [
      { index: 0, name: '1. Past Romantic Patterns', description: 'Prior wounds, patterns, or history coloring this connection.' },
      { index: 1, name: '2. Where You Stand in Love', description: 'Your current feelings, vulnerability, and heart-space.' },
      { index: 2, name: '3. The Partner’s Perspective', description: 'What they secretly think, desire, or feel in their heart.' },
      { index: 3, name: '4. The Core Friction / Test', description: 'The misunderstanding, fear, or obstacle testing the bond.' },
      { index: 4, name: '5. External Pressures', description: 'Family, friends, distances, or societal factors affecting the union.' },
      { index: 5, name: '6. Healing Action', description: 'How to communicate, forgive, or nurture this connection.' },
      { index: 6, name: '7. Relationship Future', description: 'The long-term potential and emotional destiny of this union.' }
    ]
  },
  {
    id: 'horseshoe-career',
    type: 'horseshoe',
    subType: 'Career',
    name: 'Horseshoe Spread: Career & Wealth',
    subtitle: '7-Card Professional Mastery Arc',
    description: 'Illuminate professional ambitions, business ventures, financial abundance, and leadership potential.',
    cardCount: 7,
    category: 'Comprehensive',
    positions: [
      { index: 0, name: '1. Past Accomplishments', description: 'Skills honed, milestones achieved, and previous career foundations.' },
      { index: 1, name: '2. Current Professional Status', description: 'Your active workload, current role, and immediate reputation.' },
      { index: 2, name: '3. Hidden Opportunities / Talents', description: 'Untapped talents, lucrative openings, or unseen alliances.' },
      { index: 3, name: '4. Immediate Professional Hurdle', description: 'Workplace politics, skill gaps, or financial constraints.' },
      { index: 4, name: '5. Workplace Environment & Allies', description: 'Colleagues, leadership, industry climate, and external support.' },
      { index: 5, name: '6. Strategic Move', description: 'The exact career or financial tactic you should execute now.' },
      { index: 6, name: '7. Professional Destiny', description: 'The pinnacle of success, status, or fulfillment awaiting you.' }
    ]
  },

  // 5. CROSS SPREAD (Celtic Cross - 10 cards)
  {
    id: 'cross-spread',
    type: 'celtic-cross',
    name: 'The Celtic Cross Spread',
    subtitle: 'The 10-Card Master Oracle',
    description: 'The ancient and revered 10-card cross layout providing an exhaustive, multidimensional map of your destiny, psychology, and spiritual transformation.',
    cardCount: 10,
    category: 'Comprehensive',
    positions: [
      { index: 0, name: '1. The Heart of the Matter', description: 'The core energy, situation, or theme occupying your soul.' },
      { index: 1, name: '2. The Crossing Force', description: 'The challenge or opposing energy intersecting your journey.' },
      { index: 2, name: '3. The Root / Subconscious', description: 'Deep primal drives, unhealed origins, and underlying foundation.' },
      { index: 3, name: '4. The Crown / Conscious Mind', description: 'Your conscious goals, ideals, and highest aspirations.' },
      { index: 4, name: '5. The Past Foundation', description: 'Recent events that gave birth to this chapter and are fading away.' },
      { index: 5, name: '6. The Near Future', description: 'What approaches on the immediate horizon over the next few weeks.' },
      { index: 6, name: '7. Self & Attitude', description: 'Your internal posture, self-worth, and how you perceive your power.' },
      { index: 7, name: '8. The External Environment', description: 'How other people, your home, and external conditions interact with you.' },
      { index: 8, name: '9. Hopes & Fears', description: 'Your secret wishes alongside the subconscious fears haunting you.' },
      { index: 9, name: '10. The Ultimate Resolution', description: 'The definitive culmination and karmic resolution of the journey.' }
    ]
  },

  // 6. PAST LIFE SPREAD
  {
    id: 'past-life-spread',
    type: 'past-life',
    name: 'Past Life Tarot Spread',
    subtitle: 'Karmic Origins & Soul Memory',
    description: 'A sacred 5-card portal revealing ancient incarnations, unfulfilled vows, karmic soul ties, and the lessons your soul came to complete in this lifetime.',
    cardCount: 5,
    category: 'Soul & Karma',
    positions: [
      { index: 0, name: '1. Soul Identity & Era', description: 'Who your soul was in a significant prior incarnation and the era you navigated.' },
      { index: 1, name: '2. Past Life Lesson', description: 'The major spiritual trial, lesson, or virtue your soul mastered or struggled with.' },
      { index: 2, name: '3. Karmic Debt / Unspoken Vow', description: 'Subconscious vows (poverty, silence, sacrifice) or karma carried into this body.' },
      { index: 3, name: '4. Ancient Soul Ties', description: 'Karmic companions or souls reincarnated with you in this current chapter.' },
      { index: 4, name: '5. Present Life Karmic Resolution', description: 'How to release the ancient knot and step into full soul liberation today.' }
    ]
  },

  // 7. FUTURE LIFE SPREAD
  {
    id: 'future-life-spread',
    type: 'future-life',
    name: 'Future Life Spread',
    subtitle: 'Destiny Arc & Soul Evolution',
    description: 'A visionary 5-card transmission casting light onto the future trajectory of your soul, forthcoming spiritual milestones, and eternal destiny.',
    cardCount: 5,
    category: 'Soul & Karma',
    positions: [
      { index: 0, name: '1. The Emerging Soul Calling', description: 'The transcendent frequency and mission calling your soul forward.' },
      { index: 1, name: '2. The Threshold of Evolution', description: 'The major initiation or spiritual crossing that will transform your destiny.' },
      { index: 2, name: '3. Latent Supernatural Gifts', description: 'Spiritual gifts, psychic senses, or divine talents ready to awaken.' },
      { index: 3, name: '4. Future Guardians & Allies', description: 'Teachers, soul tribe members, and cosmic guides waiting to meet you.' },
      { index: 4, name: '5. The Highest Horizon', description: 'The ultimate legacy, enlightenment, and soul victory waiting in your timeline.' }
    ]
  }
];

export function getSpreadById(id: string): SpreadDefinition | undefined {
  return SPREADS.find(s => s.id === id);
}
