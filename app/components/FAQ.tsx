import { FaChevronDown } from "react-icons/fa6";

type QA = { question: string; answer: string };

// Friendly, plain-language answers. Keep these in sync with the FAQPage
// structured data emitted below so search engines see the same copy.
const faqs: QA[] = [
  {
    question: "What should I bring to class?",
    answer: "Grip socks and water. Mats and all equipment are provided.",
  },
  {
    question: "What is the difference between mat and comprehensive Pilates?",
    answer:
      "Mat Pilates uses your own body weight on a mat, so it is simple, accessible, and a great place to start. Comprehensive Pilates adds the full range of Pilates apparatus, like the Reformer and Cadillac/Tower, which use springs for added resistance and support. Both build strength and control, and both are offered here.",
  },
  {
    question: "I have an injury, or I am pregnant. Can I still join?",
    answer:
      "Absolutely. Classes are welcoming to every body, and movements can be modified so that everyone can participate safely. Just give a heads up before class so the workout can be tailored to you.",
  },
  {
    question: "I am brand new to Pilates. Is that okay?",
    answer:
      "Yes! Beginners are always welcome. Every exercise has options for every level.",
  },
  {
    question: "How do I book a class?",
    answer:
      "Use the booking links on this site. Group classes book through WellnessLiving or ClassPass, and privates at Blue Moon book through MindBody.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-t border-accent/60 bg-background"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Good to know
          </span>
          <h2
            id="faq-heading"
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/75">
            A few things people usually want to know before their first class.
          </p>
        </div>

        <ul className="reveal d1 mt-10 space-y-3">
          {faqs.map(({ question, answer }) => (
            <li key={question}>
              <details className="disclosure group rounded-2xl border border-accent/60 bg-white/70 p-5 shadow-sm transition-colors open:border-primary/40 sm:p-6">
                <summary className="flex items-center justify-between gap-4 font-display text-lg font-semibold text-ink">
                  {question}
                  <FaChevronDown
                    className="disclosure-caret h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 leading-relaxed text-ink/75">{answer}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
