// components/guide/FAQSection.tsx
// Wrapper for FAQ section (server component)

import { FAQItem } from './FAQItem';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <div className="my-8 space-y-3">
      <h2 className="mb-6 text-3xl font-bold text-slate-900">
        Frequently Asked Questions
      </h2>
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}
