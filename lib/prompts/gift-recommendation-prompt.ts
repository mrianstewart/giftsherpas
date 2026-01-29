// lib/prompts/gift-recommendation-prompt.ts
// Claude prompt template for generating structured gift recommendations

import { GiftFinderFormData } from '@/types/recommendations';

export function buildGiftRecommendationPrompt(formData: GiftFinderFormData): string {
  const {
    recipientRelationship,
    occasion,
    budgetMin,
    budgetMax,
    interests,
    thingsToAvoid,
    giftPhilosophy,
  } = formData;

  const budgetString = budgetMin && budgetMax
    ? `£${budgetMin}-£${budgetMax}`
    : budgetMin
    ? `around £${budgetMin}`
    : 'flexible budget';

  const interestsString = interests.length > 0
    ? interests.join(', ')
    : 'not specified';

  const avoidString = thingsToAvoid || 'nothing specific mentioned';

  const philosophyContext = buildPhilosophyContext(giftPhilosophy);

  return `You are GiftSherpas' AI guide, helping someone find the perfect gift. You're warm, thoughtful, and genuinely invested in helping them make someone happy—like asking a friend who always knows what to get.

**Context:**
- Shopping for: ${recipientRelationship}
- Occasion: ${occasion}
- Budget: ${budgetString}
- Their interests: ${interestsString}
- Things to avoid: ${avoidString}
${philosophyContext}

**Your task:**
Generate 4 thoughtful gift recommendations using the GiftSherpas "trail framework":
1. **The Summit** (1 recommendation): Your strongest, most confident suggestion
2. **Alternative Routes** (2 recommendations): Solid backup options with different angles
3. **Off the Beaten Path** (1 recommendation): A non-traditional approach (experience, donation, time-gift, etc.)

**Quality standards:**
- Avoid obvious personalized accessories (mugs, t-shirts, keychains with names)
- Look for tangential connections to interests, not just literal matches
- Consider the relationship depth and occasion formality
- Respect the budget without being cheap
- Each recommendation needs genuine reasoning, not generic praise
- Use conversational but polished language (you're knowledgeable, not stuffy)

**Critical: Output format**
You MUST respond with ONLY valid JSON in this exact structure (no markdown, no preamble, no explanation):

{
  "summit": {
    "title": "Specific product/experience name",
    "description": "2-3 sentence description of what it is",
    "reasoning": "Why this works perfectly for their situation (reference their interests, relationship, occasion)",
    "priceRange": "£XX-£YY or specific price",
    "category": "experience|book|gadget|food|wellness|home|other"
  },
  "alternatives": [
    {
      "title": "Alternative option 1 name",
      "description": "What it is",
      "reasoning": "Why this also works (different angle from summit)",
      "priceRange": "£XX-£YY",
      "category": "category"
    },
    {
      "title": "Alternative option 2 name",
      "description": "What it is",
      "reasoning": "Why this works (different angle from both above)",
      "priceRange": "£XX-£YY",
      "category": "category"
    }
  ],
  "offBeatPath": {
    "title": "Non-traditional approach name",
    "description": "What this alternative looks like",
    "reasoning": "Why someone might prefer this over a physical gift",
    "approach": "experience|donation|time-gift|skill-share|other",
    "suggestedAction": "Specific next step they should take"
  },
  "personalNote": "One warm sentence acknowledging their situation or the relationship (optional but encouraged)"
}

**Examples of good reasoning:**
- "Since they're into trail running and you mentioned they've been training for a marathon, this book by ultrarunner Scott Jurek blends their athletic interests with the storytelling they love"
- "For a minimalist who values experiences over things, this is a gift that won't add clutter but creates a memory"

**Examples of bad reasoning:**
- "This is perfect for anyone who loves reading" (too generic)
- "Great quality and good reviews" (doesn't connect to their specific context)

Remember: You're not just listing products, you're being a thoughtful guide who understands why a particular gift will resonate with this specific person and situation.

Generate the JSON now:`;
}

function buildPhilosophyContext(philosophy: GiftFinderFormData['giftPhilosophy']): string {
  const parts: string[] = [];

  if (philosophy.preferExperiences !== undefined) {
    parts.push(
      philosophy.preferExperiences
        ? '- Gift preference: Lean toward experiences over physical items'
        : '- Gift preference: Physical items are fine'
    );
  }

  if (philosophy.giftStyle) {
    const styleMap = {
      subtle: 'Subtle, understated gifts preferred',
      direct: 'Direct, obvious gifts are fine',
      either: 'No strong preference on gift style',
    };
    parts.push(`- Gift style: ${styleMap[philosophy.giftStyle]}`);
  }

  if (philosophy.values && philosophy.values.length > 0) {
    parts.push(`- Values: ${philosophy.values.join(', ')}`);
  }

  return parts.length > 0 ? parts.join('\n') : '';
}

// Validation function to ensure Claude's response is valid JSON
export function validateRecommendationJSON(response: string): boolean {
  try {
    const parsed = JSON.parse(response);

    // Check required fields
    if (!parsed.summit || !parsed.alternatives || !parsed.offBeatPath) {
      return false;
    }

    // Check summit structure
    if (!parsed.summit.title || !parsed.summit.description || !parsed.summit.reasoning) {
      return false;
    }

    // Check alternatives is array with at least 2 items
    if (!Array.isArray(parsed.alternatives) || parsed.alternatives.length < 2) {
      return false;
    }

    // Check each alternative has required fields
    for (const alt of parsed.alternatives) {
      if (!alt.title || !alt.description || !alt.reasoning) {
        return false;
      }
    }

    // Check off beat path structure
    if (!parsed.offBeatPath.title || !parsed.offBeatPath.description ||
        !parsed.offBeatPath.reasoning || !parsed.offBeatPath.approach) {
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
}
