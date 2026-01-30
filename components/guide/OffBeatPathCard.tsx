// components/guide/OffBeatPathCard.tsx
// Card for non-traditional gift options in MDX guides

type ApproachType = 'experience' | 'donation' | 'time-gift' | 'skill-share' | 'other';

interface OffBeatPathCardProps {
  title: string;
  description: string;
  reasoning: string;
  approach: ApproachType;
}

const approachEmoji: Record<ApproachType, string> = {
  experience: '🎭',
  donation: '💝',
  'time-gift': '⏰',
  'skill-share': '🎓',
  other: '✨',
};

const approachLabel: Record<ApproachType, string> = {
  experience: 'Experience Gift',
  donation: 'Charitable Donation',
  'time-gift': 'Time Gift',
  'skill-share': 'Skill Share',
  other: 'Alternative Gift',
};

export function OffBeatPathCard({
  title,
  description,
  reasoning,
  approach,
}: OffBeatPathCardProps) {
  return (
    <div className="my-6 rounded-lg border-2 border-amber-600 bg-amber-50 p-6 shadow-sm">
      <div className="mb-3 flex items-start gap-3">
        <span className="text-3xl" aria-hidden="true">
          {approachEmoji[approach] || '✨'}
        </span>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-amber-800">{approachLabel[approach]}</p>
        </div>
      </div>

      <p className="mb-3 text-slate-700">{description}</p>

      <div className="rounded-md bg-white/50 p-3">
        <p className="text-sm font-medium text-slate-600">Why consider this:</p>
        <p className="mt-1 text-sm text-slate-700">{reasoning}</p>
      </div>
    </div>
  );
}
