// app/api/generate-recommendations/route.ts
// API endpoint for generating AI gift recommendations

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import {
  GiftFinderFormData,
  GenerateRecommendationsResponse,
  AIRecommendations,
} from '@/types/recommendations';
import {
  buildGiftRecommendationPrompt,
  validateRecommendationJSON,
} from '@/lib/prompts/gift-recommendation-prompt';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const formData: GiftFinderFormData = body.formData;

    // Validate required fields
    if (!formData.recipientRelationship || !formData.occasion) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: recipientRelationship and occasion are required',
        } as GenerateRecommendationsResponse,
        { status: 400 }
      );
    }

    // Build prompt for Claude
    const prompt = buildGiftRecommendationPrompt(formData);

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      temperature: 1,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract text response
    const responseText = message.content
      .filter((block) => block.type === 'text')
      .map((block) => (block as { type: 'text'; text: string }).text)
      .join('\n');

    // Clean potential markdown formatting
    const cleanedResponse = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    // Validate JSON structure
    if (!validateRecommendationJSON(cleanedResponse)) {
      console.error('Invalid JSON from Claude:', cleanedResponse);
      return NextResponse.json(
        {
          success: false,
          error: 'AI generated invalid response format. Please try again.',
        } as GenerateRecommendationsResponse,
        { status: 500 }
      );
    }

    // Parse the recommendations
    const aiRecommendations: AIRecommendations = JSON.parse(cleanedResponse);

    // Save to database
    const { data, error } = await supabase
      .from('recommendations')
      .insert({
        recipient_relationship: formData.recipientRelationship,
        occasion: formData.occasion,
        budget_min: formData.budgetMin,
        budget_max: formData.budgetMax,
        interests: formData.interests,
        things_to_avoid: formData.thingsToAvoid,
        gift_philosophy: formData.giftPhilosophy,
        ai_recommendations: aiRecommendations,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to save recommendations. Please try again.',
        } as GenerateRecommendationsResponse,
        { status: 500 }
      );
    }

    // Return the UUID for redirect
    return NextResponse.json({
      success: true,
      recommendationId: data.id,
    } as GenerateRecommendationsResponse);

  } catch (error) {
    console.error('Error generating recommendations:', error);

    // Handle specific error types
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        {
          success: false,
          error: 'AI service temporarily unavailable. Please try again.',
        } as GenerateRecommendationsResponse,
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again.',
      } as GenerateRecommendationsResponse,
      { status: 500 }
    );
  }
}
