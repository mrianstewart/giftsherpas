// app/recommendations/[id]/page.tsx
// Results page displaying AI-generated gift recommendations

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { RecommendationRecord, Recommendation, OffBeatPath } from '@/types/recommendations';

export default function RecommendationPage() {
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<RecommendationRecord | null>(null);

  useEffect(() => {
    async function fetchRecommendation() {
      try {
        const response = await fetch(`/api/recommendations/${id}`);
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to load recommendations');
        }

        setRecommendation(data.recommendation);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendation();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
            <h2 className="text-xl font-semibold text-slate-900">
              Our Sherpa is finding the perfect gifts...
            </h2>
            <p className="mt-2 text-slate-600">
              We're exploring the trails to find something truly special
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !recommendation) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="rounded-lg bg-red-50 p-8 text-center">
            <h2 className="text-xl font-semibold text-red-900">
              Oops! We hit a snag
            </h2>
            <p className="mt-2 text-red-700">{error || 'Recommendation not found'}</p>
            <Link
              href="/find"
              className="mt-4 inline-block rounded-md bg-red-600 px-6 py-2 text-white hover:bg-red-700"
            >
              Try Again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { aiRecommendations } = recommendation;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Your Gift Recommendations
          </h1>
          <p className="mt-2 text-slate-600">
            For {recommendation.recipientRelationship} • {recommendation.occasion}
          </p>
          {recommendation.budgetMin && recommendation.budgetMax && (
            <p className="text-sm text-slate-500">
              Budget: £{recommendation.budgetMin}–£{recommendation.budgetMax}
            </p>
          )}
        </div>

        {/* Personal Note */}
        {aiRecommendations.personalNote && (
          <div className="mb-8 rounded-lg bg-emerald-50 p-6">
            <p className="text-slate-700 italic">"{aiRecommendations.personalNote}"</p>
          </div>
        )}

        {/* Summit (Main Recommendation) */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-3xl">🏔️</span>
            <h2 className="text-2xl font-bold text-slate-900">The Summit</h2>
          </div>
          <p className="mb-6 text-slate-600">Our strongest recommendation</p>
          <RecommendationCard recommendation={aiRecommendations.summit} featured />
        </section>

        {/* Alternative Routes */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-3xl">🥾</span>
            <h2 className="text-2xl font-bold text-slate-900">Alternative Routes</h2>
          </div>
          <p className="mb-6 text-slate-600">Solid backup options</p>
          <div className="space-y-4">
            {aiRecommendations.alternatives.map((alt, index) => (
              <RecommendationCard key={index} recommendation={alt} />
            ))}
          </div>
        </section>

        {/* Off the Beaten Path */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-3xl">🌲</span>
            <h2 className="text-2xl font-bold text-slate-900">Off the Beaten Path</h2>
          </div>
          <p className="mb-6 text-slate-600">
            Not your typical gift—sometimes the best presents aren't things
          </p>
          <OffBeatPathCard offBeatPath={aiRecommendations.offBeatPath} />
        </section>

        {/* Actions */}
        <div className="flex justify-center gap-4 border-t border-slate-200 pt-8">
          <Link
            href="/find"
            className="rounded-md border-2 border-slate-300 px-6 py-3 text-slate-700 hover:border-slate-400"
          >
            Start Over
          </Link>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied! Share this with others or save it for later.');
            }}
            className="rounded-md bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
          >
            Share These Ideas
          </button>
        </div>

        {/* View count */}
        <p className="mt-8 text-center text-xs text-slate-400">
          These recommendations have been viewed {recommendation.viewCount} time
          {recommendation.viewCount !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}

function RecommendationCard({
  recommendation,
  featured = false,
}: {
  recommendation: Recommendation;
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border-2 p-6 ${
        featured
          ? 'border-emerald-600 bg-emerald-50'
          : 'border-slate-200 bg-white'
      }`}
    >
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-xl font-semibold text-slate-900">
          {recommendation.title}
        </h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          {recommendation.priceRange}
        </span>
      </div>

      <p className="mb-3 text-slate-700">{recommendation.description}</p>

      <div className="mb-4 rounded-md bg-white/50 p-3">
        <p className="text-sm font-medium text-slate-600">Why this works:</p>
        <p className="mt-1 text-sm text-slate-700">{recommendation.reasoning}</p>
      </div>

      <button
        className={`w-full rounded-md px-4 py-2 font-medium ${
          featured
            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
            : 'bg-slate-900 text-white hover:bg-slate-800'
        }`}
      >
        Find This Gift →
      </button>

      {recommendation.category && (
        <p className="mt-2 text-xs text-slate-500">
          Category: {recommendation.category}
        </p>
      )}
    </div>
  );
}

function OffBeatPathCard({ offBeatPath }: { offBeatPath: OffBeatPath }) {
  const approachEmoji: Record<string, string> = {
    experience: '🎭',
    donation: '💝',
    'time-gift': '⏰',
    'skill-share': '🎓',
    other: '✨',
  };

  return (
    <div className="rounded-lg border-2 border-amber-600 bg-amber-50 p-6">
      <div className="mb-3 flex items-start gap-3">
        <span className="text-3xl">{approachEmoji[offBeatPath.approach] || '✨'}</span>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-slate-900">
            {offBeatPath.title}
          </h3>
          <p className="text-sm capitalize text-amber-800">
            {offBeatPath.approach.replace('-', ' ')} gift
          </p>
        </div>
      </div>

      <p className="mb-3 text-slate-700">{offBeatPath.description}</p>

      <div className="mb-4 rounded-md bg-white/50 p-3">
        <p className="text-sm font-medium text-slate-600">Why consider this:</p>
        <p className="mt-1 text-sm text-slate-700">{offBeatPath.reasoning}</p>
      </div>

      {offBeatPath.suggestedAction && (
        <div className="rounded-md bg-amber-100 p-3">
          <p className="text-sm font-medium text-amber-900">Next step:</p>
          <p className="mt-1 text-sm text-amber-800">{offBeatPath.suggestedAction}</p>
        </div>
      )}
    </div>
  );
}
