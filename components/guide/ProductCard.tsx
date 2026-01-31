// components/guide/ProductCard.tsx
// Reusable product card component for MDX guides

'use client';

interface ProductCardProps {
  title: string;
  priceRange: string;
  description: string;
  reasoning: string;
  category?: string;
  buyLink?: string;
}

export function ProductCard({
  title,
  priceRange,
  description,
  reasoning,
  category,
  buyLink,
}: ProductCardProps) {
  return (
    <div className="my-6 rounded-lg border-2 border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <span className="ml-3 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 whitespace-nowrap">
          {priceRange}
        </span>
      </div>

      <p className="mb-3 text-slate-700">{description}</p>

      <div className="mb-4 rounded-md bg-emerald-50 p-3">
        <p className="text-sm font-medium text-slate-600">Why this works:</p>
        <p className="mt-1 text-sm text-slate-700">{reasoning}</p>
      </div>

      <button
        className="w-full rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-800 transition-colors"
        onClick={() => {
          if (buyLink) {
            window.open(buyLink, '_blank', 'noopener,noreferrer');
          }
        }}
      >
        Find This Gift →
      </button>

      {category && (
        <p className="mt-2 text-xs text-slate-500">Category: {category}</p>
      )}
    </div>
  );
}
