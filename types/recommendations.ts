// types/recommendations.ts
// Type definitions for GiftSherpas recommendation system

export interface GiftFinderFormData {
  recipientRelationship: string;
  occasion: string;
  budgetMin?: number;
  budgetMax?: number;
  interests: string[];
  thingsToAvoid?: string;
  giftPhilosophy: {
    preferExperiences?: boolean; // true = experiences, false = physical items
    giftStyle?: 'subtle' | 'direct' | 'either';
    values?: string[]; // e.g., ['sustainability', 'local', 'handmade']
  };
}

export interface Recommendation {
  title: string;
  description: string;
  reasoning: string;
  priceRange: string;
  buyLink?: string; // Optional for MVP (placeholder or affiliate link)
  category?: string; // e.g., 'experience', 'book', 'gadget'
}

export interface OffBeatPath {
  title: string;
  description: string;
  reasoning: string;
  approach: 'experience' | 'donation' | 'time-gift' | 'skill-share' | 'other';
  suggestedAction?: string; // What they should actually do
}

export interface AIRecommendations {
  summit: Recommendation; // The main, strongest recommendation
  alternatives: Recommendation[]; // 2-3 alternative routes
  offBeatPath: OffBeatPath; // Non-traditional option
  personalNote?: string; // Optional personal message from the AI Sherpa
}

export interface RecommendationRecord {
  id: string; // UUID
  createdAt: string;
  recipientRelationship: string;
  occasion: string;
  budgetMin?: number;
  budgetMax?: number;
  interests: string[];
  thingsToAvoid?: string;
  giftPhilosophy: GiftFinderFormData['giftPhilosophy'];
  aiRecommendations: AIRecommendations;
  viewCount: number;
  lastViewedAt: string;
}

// API Response types
export interface GenerateRecommendationsRequest {
  formData: GiftFinderFormData;
}

export interface GenerateRecommendationsResponse {
  success: boolean;
  recommendationId?: string; // UUID to redirect to
  error?: string;
}

export interface FetchRecommendationResponse {
  success: boolean;
  recommendation?: RecommendationRecord;
  error?: string;
}

// Form step types for multi-step form
export type FormStep =
  | 'relationship'
  | 'occasion'
  | 'budget'
  | 'interests'
  | 'avoid'
  | 'philosophy'
  | 'review';

export interface FormStepConfig {
  id: FormStep;
  title: string;
  description?: string;
  optional?: boolean;
}
