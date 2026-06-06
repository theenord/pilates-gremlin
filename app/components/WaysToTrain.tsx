import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { trainingLinks } from "../site-data";

export default function WaysToTrain() {
  return (
    <section
      id="classes"
      aria-labelledby="classes-heading"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="classes-heading"
          className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Ways to Train
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink/75">
          In studio, on demand, or out in the community. Pick the way that fits
          your week.
        </p>
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {trainingLinks.map(({ title, description, href, Icon, tone }) => (
          <li key={title}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-accent/60 bg-white/70 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${tone}`}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
                {title}
                <FaArrowUpRightFromSquare
                  className="h-3.5 w-3.5 text-ink/40 transition-colors group-hover:text-primary"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-2 text-sm leading-relaxed text-ink/70">
                {description}
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
