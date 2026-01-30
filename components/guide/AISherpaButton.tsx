// components/guide/AISherpaButton.tsx
// CTA button to link to the AI gift finder from guides

import Link from 'next/link';

interface AISherpaButtonProps {
  text?: string;
}

export function AISherpaButton({
  text = "Still stuck? Let our AI find the perfect gift",
}: AISherpaButtonProps) {
  return (
    <div className="my-8 rounded-lg bg-gradient-to-r from-emerald-50 to-emerald-100 p-8 text-center border-2 border-emerald-200">
      <p className="mb-4 text-lg font-semibold text-slate-900">{text}</p>
      <Link
        href="/find"
        className="inline-block rounded-lg bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-emerald-700 transition-colors"
      >
        Try Our Gift Finder
      </Link>
      <p className="mt-3 text-sm text-slate-600">
        Takes 2 minutes • No signup required • Completely free
      </p>
    </div>
  );
}
