import {
  FaApple,
  FaGooglePlay,
  FaChevronDown,
} from "react-icons/fa6";
import {
  upcomingClasses,
  FIRST_FREE_URL,
  NEAUMIX_APP_IOS,
  NEAUMIX_APP_ANDROID,
  CLASSPASS_STUDIO_URL,
  CLASSPASS_REFERRAL_URL,
} from "../site-data";

export default function Schedule() {
  return (
    <section
      id="upcoming-classes"
      aria-labelledby="schedule-heading"
      className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="reveal max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          On the schedule
        </span>
        <h2
          id="schedule-heading"
          className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Upcoming classes
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink/75">
          Mat Pilates at Neaumix Fit. Reserve your spot directly, or book with
          ClassPass.
        </p>
      </div>

      {/* First class free banner */}
      <div className="reveal relative mt-8 overflow-hidden rounded-3xl border border-accent/60 bg-gradient-to-br from-secondary/25 to-accent/30 p-6 shadow-sm sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary/15 blur-2xl"
        />
        <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              New here?
            </span>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
              Your first class is free
            </h3>
            <p className="mt-2 max-w-md text-ink/75">
              New clients can book a complimentary intro class through the
              Neaumix Fit app or online booking.
            </p>
          </div>
          <div className="flex flex-nowrap items-center gap-3">
            <a
              href={FIRST_FREE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Book your free class
            </a>
            <a
              href={NEAUMIX_APP_IOS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <FaApple className="h-4 w-4" aria-hidden="true" /> App Store
            </a>
            <a
              href={NEAUMIX_APP_ANDROID}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <FaGooglePlay className="h-3.5 w-3.5" aria-hidden="true" /> Google
              Play
            </a>
          </div>
        </div>
        <p className="relative mt-5 border-t border-ink/10 pt-4 text-xs leading-relaxed text-ink/75">
          Free intro class for new clients only, booked and managed through
          Neaumix Fit. Ages 16+. Grip socks required; please arrive 10 minutes
          early. Cancel at least 12 hours before class to avoid fees (late
          cancel $10, no-show $15); for safety, arrivals more than 10 minutes
          late cannot join. Classes, pricing, and policies are set by Neaumix
          Fit and may change. Current terms apply at the time of booking.
        </p>
      </div>

      {/* Upcoming classes list */}
      {upcomingClasses.length > 0 && (
        <ul className="reveal mt-8 divide-y divide-accent/60 border-t border-accent/60">
          {upcomingClasses.map((session, i) => {
            const [day, ...rest] = session.date.split(", ");
            const datePart = rest.join(", ");
            return (
              <li
                key={session.href}
                className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-baseline gap-4">
                  <div className="min-w-28">
                    {i === 0 && (
                      <span className="mb-1 inline-block rounded-full bg-secondary/30 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-primary">
                        Next up
                      </span>
                    )}
                    <p className="font-display text-xl font-semibold leading-tight text-ink">
                      {day}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-ink/75">
                      {datePart}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-ink">{session.time}</p>
                    <p className="text-sm text-ink/70">{session.location}</p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2.5 sm:items-end">
                  <a
                    href={session.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Join
                  </a>

                  <details className="cp-options">
                    <summary className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80">
                      Using ClassPass?
                      <FaChevronDown
                        className="cp-caret h-3 w-3"
                        aria-hidden="true"
                      />
                    </summary>
                    <div className="cp-menu absolute left-0 z-20 mt-2 flex w-64 flex-col gap-1 rounded-2xl border border-accent/60 bg-white p-2 shadow-xl sm:left-auto sm:right-0">
                      <a
                        href={CLASSPASS_STUDIO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col gap-0.5 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-secondary/15"
                      >
                        <span className="text-sm font-semibold text-ink">
                          I&apos;m a member
                        </span>
                        <span className="text-xs text-ink/75">
                          Book this class on ClassPass
                        </span>
                      </a>
                      <a
                        href={CLASSPASS_REFERRAL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col gap-0.5 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-secondary/15"
                      >
                        <span className="text-sm font-semibold text-ink">
                          New to ClassPass
                        </span>
                        <span className="text-xs text-ink/75">
                          Join and get 20 bonus credits
                        </span>
                      </a>
                    </div>
                  </details>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
