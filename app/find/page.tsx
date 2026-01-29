// app/find/page.tsx
// Multi-step gift finder form

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GiftFinderFormData, FormStep } from '@/types/recommendations';

const FORM_STEPS: FormStep[] = [
  'relationship',
  'occasion',
  'budget',
  'interests',
  'avoid',
  'philosophy',
];

export default function GiftFinderPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<GiftFinderFormData>({
    recipientRelationship: '',
    occasion: '',
    interests: [],
    giftPhilosophy: {},
  });

  const handleNext = () => {
    if (currentStep < FORM_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate recommendations');
      }

      // Redirect to results page
      router.push(`/recommendations/${data.recommendationId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsSubmitting(false);
    }
  };

  const canProceed = (): boolean => {
    const step = FORM_STEPS[currentStep];
    switch (step) {
      case 'relationship':
        return formData.recipientRelationship.length > 0;
      case 'occasion':
        return formData.occasion.length > 0;
      case 'budget':
        return true; // Budget is optional
      case 'interests':
        return true; // Interests are optional
      case 'avoid':
        return true; // Optional
      case 'philosophy':
        return true; // Optional
      default:
        return false;
    }
  };

  const progressPercentage = ((currentStep + 1) / FORM_STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-emerald-600 transition-all duration-300 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="mt-2 text-center text-sm text-slate-600">
            Step {currentStep + 1} of {FORM_STEPS.length}
          </p>
        </div>

        {/* Form Step Content */}
        <div className="rounded-lg bg-white p-8 shadow-lg">
          {FORM_STEPS[currentStep] === 'relationship' && (
            <RelationshipStep formData={formData} setFormData={setFormData} />
          )}
          {FORM_STEPS[currentStep] === 'occasion' && (
            <OccasionStep formData={formData} setFormData={setFormData} />
          )}
          {FORM_STEPS[currentStep] === 'budget' && (
            <BudgetStep formData={formData} setFormData={setFormData} />
          )}
          {FORM_STEPS[currentStep] === 'interests' && (
            <InterestsStep formData={formData} setFormData={setFormData} />
          )}
          {FORM_STEPS[currentStep] === 'avoid' && (
            <AvoidStep formData={formData} setFormData={setFormData} />
          )}
          {FORM_STEPS[currentStep] === 'philosophy' && (
            <PhilosophyStep formData={formData} setFormData={setFormData} />
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0 || isSubmitting}
              className="rounded-md px-6 py-2 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
              className="rounded-md bg-emerald-600 px-6 py-2 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Generating...
                </span>
              ) : currentStep === FORM_STEPS.length - 1 ? (
                'Get Recommendations'
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step Components

function RelationshipStep({
  formData,
  setFormData,
}: {
  formData: GiftFinderFormData;
  setFormData: (data: GiftFinderFormData) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">
        Who are you shopping for?
      </h2>
      <p className="text-slate-600">
        Tell us about your relationship with the recipient
      </p>
      <input
        type="text"
        value={formData.recipientRelationship}
        onChange={(e) =>
          setFormData({ ...formData, recipientRelationship: e.target.value })
        }
        placeholder="e.g., My dad, My best friend, My colleague"
        className="w-full rounded-md border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        autoFocus
      />
      <p className="text-sm text-slate-500">
        Be specific if it helps—"my tech-loving dad" or "my minimalist sister"
      </p>
    </div>
  );
}

function OccasionStep({
  formData,
  setFormData,
}: {
  formData: GiftFinderFormData;
  setFormData: (data: GiftFinderFormData) => void;
}) {
  const commonOccasions = [
    'Birthday',
    'Christmas',
    'Anniversary',
    "Father's Day",
    "Mother's Day",
    'Thank you',
    'Just because',
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">
        What's the occasion?
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {commonOccasions.map((occasion) => (
          <button
            key={occasion}
            onClick={() => setFormData({ ...formData, occasion })}
            className={`rounded-md border-2 px-4 py-3 text-left transition-colors ${
              formData.occasion === occasion
                ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            {occasion}
          </button>
        ))}
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-slate-500">or</span>
        </div>
      </div>
      <input
        type="text"
        value={
          commonOccasions.includes(formData.occasion) ? '' : formData.occasion
        }
        onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
        placeholder="Enter a different occasion"
        className="w-full rounded-md border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
}

function BudgetStep({
  formData,
  setFormData,
}: {
  formData: GiftFinderFormData;
  setFormData: (data: GiftFinderFormData) => void;
}) {
  const budgetRanges = [
    { label: 'Under £25', min: 0, max: 25 },
    { label: '£25-£50', min: 25, max: 50 },
    { label: '£50-£100', min: 50, max: 100 },
    { label: '£100-£200', min: 100, max: 200 },
    { label: 'Over £200', min: 200, max: undefined },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">
        What's your budget?
      </h2>
      <p className="text-slate-600">
        This helps us suggest appropriate options (optional)
      </p>
      <div className="space-y-2">
        {budgetRanges.map((range) => (
          <button
            key={range.label}
            onClick={() =>
              setFormData({
                ...formData,
                budgetMin: range.min,
                budgetMax: range.max,
              })
            }
            className={`w-full rounded-md border-2 px-4 py-3 text-left transition-colors ${
              formData.budgetMin === range.min && formData.budgetMax === range.max
                ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
      <button
        onClick={() =>
          setFormData({ ...formData, budgetMin: undefined, budgetMax: undefined })
        }
        className="text-sm text-slate-600 hover:text-slate-900"
      >
        Skip - flexible budget
      </button>
    </div>
  );
}

function InterestsStep({
  formData,
  setFormData,
}: {
  formData: GiftFinderFormData;
  setFormData: (data: GiftFinderFormData) => void;
}) {
  const [interestInput, setInterestInput] = useState('');

  const handleAddInterest = () => {
    if (interestInput.trim() && !formData.interests.includes(interestInput.trim())) {
      setFormData({
        ...formData,
        interests: [...formData.interests, interestInput.trim()],
      });
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((i) => i !== interest),
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">
        What are they into?
      </h2>
      <p className="text-slate-600">
        Hobbies, interests, or things they've mentioned lately (optional)
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={interestInput}
          onChange={(e) => setInterestInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddInterest();
            }
          }}
          placeholder="e.g., photography, hiking, cooking"
          className="flex-1 rounded-md border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          onClick={handleAddInterest}
          className="rounded-md bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
        >
          Add
        </button>
      </div>
      {formData.interests.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {formData.interests.map((interest) => (
            <span
              key={interest}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800"
            >
              {interest}
              <button
                onClick={() => handleRemoveInterest(interest)}
                className="hover:text-emerald-900"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function AvoidStep({
  formData,
  setFormData,
}: {
  formData: GiftFinderFormData;
  setFormData: (data: GiftFinderFormData) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">
        Anything to avoid?
      </h2>
      <p className="text-slate-600">
        Allergies, preferences, or things they already have too much of (optional)
      </p>
      <textarea
        value={formData.thingsToAvoid || ''}
        onChange={(e) =>
          setFormData({ ...formData, thingsToAvoid: e.target.value })
        }
        placeholder="e.g., No food (allergies), already has too many books, doesn't like clutter"
        className="w-full rounded-md border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        rows={4}
      />
    </div>
  );
}

function PhilosophyStep({
  formData,
  setFormData,
}: {
  formData: GiftFinderFormData;
  setFormData: (data: GiftFinderFormData) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900">
        Final touches
      </h2>
      <p className="text-slate-600">
        Help us understand your gifting style (optional)
      </p>

      <div className="space-y-4">
        <div>
          <p className="mb-2 font-medium text-slate-700">
            Do they prefer experiences or physical items?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  giftPhilosophy: { ...formData.giftPhilosophy, preferExperiences: true },
                })
              }
              className={`flex-1 rounded-md border-2 px-4 py-2 ${
                formData.giftPhilosophy.preferExperiences === true
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                  : 'border-slate-200'
              }`}
            >
              Experiences
            </button>
            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  giftPhilosophy: { ...formData.giftPhilosophy, preferExperiences: false },
                })
              }
              className={`flex-1 rounded-md border-2 px-4 py-2 ${
                formData.giftPhilosophy.preferExperiences === false
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                  : 'border-slate-200'
              }`}
            >
              Physical items
            </button>
            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  giftPhilosophy: { ...formData.giftPhilosophy, preferExperiences: undefined },
                })
              }
              className={`flex-1 rounded-md border-2 px-4 py-2 ${
                formData.giftPhilosophy.preferExperiences === undefined
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                  : 'border-slate-200'
              }`}
            >
              Either
            </button>
          </div>
        </div>

        <div>
          <p className="mb-2 font-medium text-slate-700">Gift style?</p>
          <div className="flex gap-3">
            {(['subtle', 'direct', 'either'] as const).map((style) => (
              <button
                key={style}
                onClick={() =>
                  setFormData({
                    ...formData,
                    giftPhilosophy: { ...formData.giftPhilosophy, giftStyle: style },
                  })
                }
                className={`flex-1 rounded-md border-2 px-4 py-2 capitalize ${
                  formData.giftPhilosophy.giftStyle === style
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                    : 'border-slate-200'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
