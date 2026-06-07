import { upcomingClasses } from "../site-data";

export default function IntroBand() {
  return (
    <section
      aria-labelledby="intro-heading"
      className="border-y border-accent/60 bg-accent/25"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
        <h2
          id="intro-heading"
          className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
        >
          Pilates at Neaumix Fit in Lake Forest
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink/75">
          Pilates Gremlin teaches mat Pilates at{" "}
          <span className="font-medium text-ink">Neaumix Fit</span> in Lake
          Forest, California, serving movers across Orange County, from Mission
          Viejo and Laguna Hills to Irvine, Tustin, and Costa Mesa.
        </p>

        {upcomingClasses.length > 0 && (
          <div className="mx-auto mt-8 max-w-xl">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
              Upcoming Classes
            </h3>
            <ul className="mt-3 space-y-3">
              {upcomingClasses.map((session) => (
                <li
                  key={session.href}
                  className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-accent/60 bg-background/70 px-4 py-3 text-left shadow-sm sm:flex-row"
                >
                  <div className="text-center sm:text-left">
                    <p className="text-base font-semibold text-ink">
                      {session.date}
                      <span className="font-normal text-ink/70">
                        {" · "}
                        {session.time}
                      </span>
                    </p>
                    <p className="text-sm text-ink/70">{session.location}</p>
                  </div>
                  <a
                    href={session.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Book
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/*
          ===========================================================
          PERSONAL BIO PLACEHOLDER
          Replace this comment with your bio. Keep it 2-4 short
          sentences for the best layout. (Do not leave this empty;
          the paragraph above is the generic intro band copy.)
          ===========================================================
        */}
      </div>
    </section>
  );
}
