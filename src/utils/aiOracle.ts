import { DrawnCard, SpreadDefinition, UserProfile } from '../types';

export interface AIAnalysisRequest {
  question?: string;
  user: UserProfile;
  spread: SpreadDefinition;
  drawnCards: DrawnCard[];
}

export async function generateAITarotGuidance(params: AIAnalysisRequest): Promise<string> {
  const { question, user, spread, drawnCards } = params;

  // Check if GEMINI_API_KEY is available in browser or process environment
  const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
    (typeof import.meta !== 'undefined' && (import.meta as unknown as { env: Record<string, string> }).env?.VITE_GEMINI_API_KEY) ||
    '';

  const cardSummaries = drawnCards.map((dc, i) => {
    const orientation = dc.isReversed ? 'Reversed' : 'Upright';
    return `[Card #${i + 1} - Position: ${dc.positionName}]: ${dc.card.name} (${orientation})
- Element: ${dc.card.element} | Celestial Guide: ${dc.card.celestialAffinity}
- Meaning: ${dc.isReversed ? dc.card.reversedMeaning : dc.card.uprightMeaning}
- Archetype Advice: ${dc.card.advice}`;
  }).join('\n\n');

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are an intuitive master tarot reader. Readers do not have time for long, overwhelming text or academic history. Be concise, direct, warm, and highly practical.

Seeker Details:
- Name: ${user.name}
- Age: ${user.age}
- Date of Birth: ${user.dateOfBirth}

Spread: "${spread.name}" (${spread.subtitle})
Seeker's Question or Focus: ${question ? `"${question}"` : 'Where life is heading and immediate guidance'}

Cards Drawn:
${cardSummaries}

CRITICAL FORMATTING INSTRUCTIONS (STRICT BREVITY):
1. PART I: INDIVIDUAL CARD READINGS
   - For EACH card in order, write only 2-3 direct, punchy sentences explaining EXACTLY what this card is telling the seeker regarding their question and this position. No filler!
   - Format:
     ### Card [Number]: [Card Name] ([Orientation]) — [Position Name]
     **What this card is telling you:** [Direct 2-sentence interpretation answering their question/position].

2. PART II: OVERALL SUMMARY & OUTCOME
   - ### Overall Summary & Final Outcome
   - 2 concise, clear paragraphs explaining the collective answer to their question and the final outcome.

3. SACRED QUOTE
   - End with a single short, memorable quote (1-2 lines) directly reflecting the core spiritual lesson of this reading.
   - Format:
     > "[Inspiring Quote]"`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      if (response && response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('AI call fallback to mystical synthesis engine:', err);
    }
  }

  // Resilient High-Grade Mystical Synthesis Engine
  return synthesizeMysticalReading(params);
}

function synthesizeMysticalReading(params: AIAnalysisRequest): string {
  const { question, user, spread, drawnCards } = params;
  const firstName = user.name.split(' ')[0] || user.name;
  const cardFinal = drawnCards[drawnCards.length - 1];

  const sections: string[] = [];

  // Opening
  sections.push(`### ✦ Guidance for ${firstName}
${question ? `Regarding your question: **"${question.trim()}"**` : `Under the **${spread.name}**`}, here is the direct message of your cards.`);

  // PART I: Individual Card Messages (Concise & Direct)
  sections.push(`### ✦ Individual Card Readings`);

  drawnCards.forEach((dc, i) => {
    const orient = dc.isReversed ? 'Reversed' : 'Upright';
    const coreMeaning = dc.isReversed ? dc.card.reversedMeaning : dc.card.uprightMeaning;
    
    sections.push(`**Card ${i + 1}: ${dc.card.name} (${orient}) — ${dc.positionName}**
**What this card is telling you:** In this position, ${dc.card.name} signals ${coreMeaning.toLowerCase()} ${dc.isReversed ? 'Be mindful of internalized tension or rushing.' : 'Trust this positive momentum.'} Take this to heart: "${dc.card.advice}"`);
  });

  // PART II: Overall Summary
  sections.push(`### ✦ Overall Summary & Final Outcome
Looking at all ${drawnCards.length} cards together, the collective message is clear: your current situation is actively shifting toward clarity and resolution. What previously felt uncertain is stabilizing as you align with your true priorities.`);

  sections.push(`The final outcome card, **${cardFinal.card.name}** (${cardFinal.isReversed ? 'Reversed' : 'Upright'}), indicates that ${
    cardFinal.isReversed
      ? 'patience and self-reflection are your greatest allies right now. Give the situation time to settle before making sudden moves.'
      : 'favorable developments and positive breakthroughs are on their way. Move forward with courage and an open heart.'
  }`);

  // Small quote according to the meaning
  const quote = cardFinal.isReversed
    ? '"In the quiet space of patience, clarity is born and true destiny unfolds."'
    : '"When you trust the journey with an open heart, the universe opens doors you never imagined."';

  sections.push(`> ${quote}`);

  return sections.join('\n\n');
}
