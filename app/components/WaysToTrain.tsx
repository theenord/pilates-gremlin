import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { trainingLinks } from "../site-data";

export default function WaysToTrain() {
  return (
    <section
      id="classes"
      aria-labelledby="ways-heading"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="reveal mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Ways to train
        </span>
        <h2
          id="ways-heading"
          className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          In studio, on demand, or out in the community
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink/75">
          Pick the way that fits your week.
        </p>
      </div>

      <ul className="reveal d1 mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {trainingLinks.map(({ title, description, href, Icon, tone, actions }) => {
          const cardBase =
            "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-accent/60 bg-white/70 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md";
          const topBar = (
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary to-secondary transition-transform duration-300 group-hover:scale-x-100"
            />
          );
          const icon = (
            <span
              className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${tone}`}
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
          );

          // Card with multiple actions (e.g. ClassPass): render buttons.
          if (actions && actions.length > 0) {
            return (
              <li key={title}>
                <div className={cardBase}>
                  {topBar}
                  {icon}
                  <span className="font-display text-lg font-semibold text-ink">
                    {title}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-ink/70">
                    {description}
                  </span>
                  <div className="mt-auto flex flex-wrap gap-2.5 pt-5">
                    {actions.map((action) => (
                      <a
                        key={action.href + action.label}
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          action.variant === "primary"
                            ? "flex-1 rounded-full bg-primary px-3 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            : "flex-1 rounded-full border border-accent px-3 py-2.5 text-center text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        }
                      >
                        {action.label}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            );
          }

          // Standard single-link card.
          return (
            <li key={title}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardBase} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
              >
                {topBar}
                {icon}
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
          );
        })}
      </ul>
    </section>
  );
}
