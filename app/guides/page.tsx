import Link from 'next/link';

export const metadata = {
  title: 'Gift Guides - Expert Curated Recommendations | GiftSherpas',
  description: 'Expert gift guides for every occasion and recipient. Thoughtfully curated recommendations beyond the obvious, from minimalists to new parents.',
};

const guides = [
  {
    title: 'Gifts for Dad Who Has Everything',
    slug: 'gifts-for-dad-who-has-everything',
    description: 'Thoughtful gifts that go beyond ties and tools. For dads who are sorted, financially comfortable, and hard to surprise.',
    category: 'Recipient',
  },
  {
    title: 'Gifts for Mum',
    slug: 'gifts-for-mum',
    description: 'Gifts that acknowledge her as a person, not just a parent. Self-care, experiences, and small luxuries she won\'t buy herself.',
    category: 'Recipient',
  },
  {
    title: 'Thoughtful Gifts for Her',
    slug: 'gifts-for-her',
    description: 'Gift ideas for the women in your life that go beyond stereotypes. From experiences to quality essentials that show genuine care.',
    category: 'Recipient',
  },
  {
    title: 'Thoughtful Gifts for Him',
    slug: 'gifts-for-him',
    description: 'Gift ideas that go beyond generic tools and gadgets. Thoughtful recommendations based on actual interests and daily life.',
    category: 'Recipient',
  },
  {
    title: 'Gifts for Couples',
    slug: 'gifts-for-couples',
    description: 'Gift ideas that create shared experiences and enhance their home life together. Beyond generic "his and hers" items.',
    category: 'Recipient',
  },
  {
    title: 'Gifts for Teenagers',
    slug: 'gifts-for-teenagers',
    description: 'Gifts teenagers will actually use and appreciate. From tech to experiences that respect their independence and taste.',
    category: 'Recipient',
  },
  {
    title: 'Gifts for New Parents',
    slug: 'gifts-for-new-parents',
    description: 'Practical support for exhausted humans. Meal delivery, cleaning services, and self-care—not another baby outfit.',
    category: 'Recipient',
  },
  {
    title: 'Gifts for Minimalists',
    slug: 'gifts-for-minimalists',
    description: 'Experiences, consumables, and quality items that respect their "less is more" philosophy. No clutter, just value.',
    category: 'Recipient',
  },
  {
    title: 'Gifts for Book Lovers',
    slug: 'gifts-for-book-lovers',
    description: 'Beyond just buying books. Reading lights, literary experiences, and carefully chosen titles that enhance their reading life.',
    category: 'Recipient',
  },
  {
    title: 'Gifts for Coffee Lovers',
    slug: 'gifts-for-coffee-lovers',
    description: 'From brewing equipment to specialty beans, gifts that elevate their daily coffee ritual and deepen their appreciation.',
    category: 'Recipient',
  },
  {
    title: 'Gifts for Gardeners',
    slug: 'gifts-for-gardeners',
    description: 'Quality tools, plants, and experiences for gardeners from beginners to enthusiasts. Gifts that enhance their growing.',
    category: 'Recipient',
  },
  {
    title: 'Anniversary Gifts',
    slug: 'anniversary-gifts',
    description: 'Meaningful anniversary gifts beyond traditional lists. From first year to golden jubilee, gifts that honour your relationship.',
    category: 'Occasion',
  },
  {
    title: 'Retirement Gifts',
    slug: 'retirement-gifts',
    description: 'Retirement gifts that honour the transition beyond generic clocks. Acknowledge their career while supporting their future.',
    category: 'Occasion',
  },
  {
    title: 'Last Minute Gift Ideas',
    slug: 'last-minute-gift-ideas',
    description: 'Fast delivery and instant digital gifts that don\'t look rushed. Same-day options and creative alternatives when time is tight.',
    category: 'Occasion',
  },
  {
    title: 'Secret Santa Gifts',
    slug: 'secret-santa-gifts',
    description: 'Secret Santa gifts people actually want within typical budgets. Avoid novelty tat and find gifts that work for colleagues.',
    category: 'Occasion',
  },
  {
    title: 'Unique Experience Gifts',
    slug: 'unique-experience-gifts',
    description: 'Memorable experiences beyond generic vouchers. From hot air balloons to foraging courses, properly thought-through adventures.',
    category: 'Type',
  },
  {
    title: 'Sustainable & Eco-Friendly Gifts',
    slug: 'sustainable-eco-friendly-gifts',
    description: 'Eco-friendly gifts that make a real difference. Beyond greenwashing to genuinely sustainable, desirable options.',
    category: 'Type',
  },
  {
    title: 'Gifts Under £50',
    slug: 'gifts-under-50',
    description: 'Budget-friendly gifts that feel special, not cheap. Consumable luxuries and quality items that punch above their price.',
    category: 'Budget',
  },
];

const categoryColors = {
  'Recipient': 'bg-emerald-100 text-emerald-800',
  'Occasion': 'bg-blue-100 text-blue-800',
  'Type': 'bg-purple-100 text-purple-800',
  'Budget': 'bg-amber-100 text-amber-800',
};

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Expert Gift Guides
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-emerald-50">
            Thoughtfully curated recommendations that go beyond the obvious. No generic listicles—just genuine advice for finding gifts that actually land well.
          </p>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group relative rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-emerald-500 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-3">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${categoryColors[guide.category as keyof typeof categoryColors]}`}>
                      {guide.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {guide.title}
                  </h2>
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    {guide.description}
                  </p>
                </div>
                <svg
                  className="ml-4 h-5 w-5 flex-shrink-0 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-4xl px-6 pb-24">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 text-center shadow-lg sm:p-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Can't find what you're looking for?
          </h2>
          <p className="mt-4 text-lg text-emerald-50">
            Our AI gift finder asks the right questions to get you personalised recommendations in minutes.
          </p>
          <Link
            href="/find"
            className="mt-8 inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-emerald-600 shadow-lg transition-all hover:bg-emerald-50 hover:shadow-xl"
          >
            Try Our AI Gift Finder →
          </Link>
          <p className="mt-4 text-sm text-emerald-100">
            Takes 2 minutes • No signup required • Completely free
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-slate-600">
            Need help with gift ideas?{' '}
            <Link href="/" className="text-emerald-600 hover:text-emerald-700 underline">
              Back to homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
