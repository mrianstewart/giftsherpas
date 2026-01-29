// app/page.tsx
// GiftSherpas landing page

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="mx-auto max-w-5xl px-4 py-20 text-center">
        <h1 className="mb-6 text-5xl font-bold text-slate-900 sm:text-6xl">
          Your AI Gift Guide
        </h1>
        <p className="mx-auto mb-4 max-w-2xl text-xl text-slate-600">
          Never stress about gift-giving again. Our AI Sherpa finds thoughtful,
          personalised recommendations in minutes.
        </p>
        <p className="mb-8 text-slate-500">
          No signup required • Completely free • Shareable results
        </p>

        <Link
          href="/find"
          className="inline-block rounded-lg bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-emerald-700"
        >
          Find the Perfect Gift
        </Link>
      </div>

      {/* How It Works */}
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
          How It Works
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
              💬
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              Tell Us About Them
            </h3>
            <p className="text-slate-600">
              Share who you're shopping for, the occasion, and what they're into.
              Takes less than 2 minutes.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
              🤖
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              AI Does the Heavy Lifting
            </h3>
            <p className="text-slate-600">
              Our AI Sherpa analyses their interests and finds gifts that actually
              make sense—not just generic bestsellers.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
              🎁
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              Get Curated Recommendations
            </h3>
            <p className="text-slate-600">
              Receive 3-4 thoughtful options with reasoning for why they'll love it.
              Share the results or keep them for later.
            </p>
          </div>
        </div>
      </div>

      {/* Trails Framework Preview */}
      <div className="bg-slate-100 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Multiple Trails to the Perfect Gift
          </h2>
          <p className="mb-12 text-center text-slate-600">
            Every recommendation includes an "Off the Beaten Path" option—because
            sometimes the best gifts aren't things.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">🏔️</span>
                <h3 className="text-lg font-semibold text-slate-900">
                  The Summit
                </h3>
              </div>
              <p className="text-slate-600">
                Our strongest, most confident recommendation based on everything
                you've shared.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">🥾</span>
                <h3 className="text-lg font-semibold text-slate-900">
                  Alternative Routes
                </h3>
              </div>
              <p className="text-slate-600">
                Solid backup options that take different approaches to the same goal.
              </p>
            </div>

            <div className="rounded-lg bg-amber-50 p-6 md:col-span-2">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">🌲</span>
                <h3 className="text-lg font-semibold text-slate-900">
                  Off the Beaten Path
                </h3>
              </div>
              <p className="text-slate-600">
                A non-traditional option—experiences, donations, or time gifts. For
                when physical stuff isn't the answer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold text-slate-900">
          Ready to find the perfect gift?
        </h2>
        <p className="mb-8 text-slate-600">
          Takes 2 minutes. No signup. Completely free.
        </p>
        <Link
          href="/find"
          className="inline-block rounded-lg bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-emerald-700"
        >
          Start Finding Gifts
        </Link>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        <p>&copy; 2025 GiftSherpas. Your AI guide to thoughtful gift-giving.</p>
      </footer>
    </div>
  );
}
