// app/api/recommendations/[id]/route.ts
// API endpoint for fetching a recommendation by UUID

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { FetchRecommendationResponse, RecommendationRecord } from '@/types/recommendations';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid recommendation ID format',
        } as FetchRecommendationResponse,
        { status: 400 }
      );
    }

    // Fetch recommendation from database
    const { data, error } = await supabase
      .from('recommendations')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error || !data) {
      return NextResponse.json(
        {
          success: false,
          error: 'Recommendation not found',
        } as FetchRecommendationResponse,
        { status: 404 }
      );
    }

    // Increment view count asynchronously (don't wait for it)
    supabase.rpc('increment_recommendation_view_count', {
      recommendation_id: id,
    }).then(() => {
      // View count incremented successfully
    }).catch((err) => {
      // Log but don't fail the request
      console.error('Failed to increment view count:', err);
    });

    // Transform database record to API response format
    const recommendation: RecommendationRecord = {
      id: data.id,
      createdAt: data.created_at,
      recipientRelationship: data.recipient_relationship,
      occasion: data.occasion,
      budgetMin: data.budget_min,
      budgetMax: data.budget_max,
      interests: data.interests,
      thingsToAvoid: data.things_to_avoid,
      giftPhilosophy: data.gift_philosophy,
      aiRecommendations: data.ai_recommendations,
      viewCount: data.view_count,
      lastViewedAt: data.last_viewed_at,
    };

    return NextResponse.json({
      success: true,
      recommendation,
    } as FetchRecommendationResponse);

  } catch (error) {
    console.error('Error fetching recommendation:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      } as FetchRecommendationResponse,
      { status: 500 }
    );
  }
}
