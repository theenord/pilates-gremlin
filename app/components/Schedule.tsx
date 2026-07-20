import {
  FaApple,
  FaGooglePlay,
  FaChevronDown,
  FaMoon,
} from "react-icons/fa6";
import { MdSelfImprovement } from "react-icons/md";
import {
  upcomingClasses,
  FIRST_FREE_URL,
  NEAUMIX_SITE,
  NEAUMIX_APP_IOS,
  NEAUMIX_APP_ANDROID,
  CLASSPASS_STUDIO_URL,
  CLASSPASS_REFERRAL_URL,
  BLUE_MOON_BOOK_URL,
  BLUE_MOON_SITE,
  MINDBODY_APP_IOS,
  MINDBODY_APP_ANDROID,
  blueMoonAvailability,
} from "../site-data";

const BLUE_MOON_LOCATION = "Blue Moon Pilates · Mission Viejo";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const fmtDate = (d: Date) => `${MONTHS[d.getMonth()]} ${d.getDate()}`;

// The calendar date lives in the WellnessLiving booking link (…dt=YYYY-MM-DD…),
// which is the source of truth for each class.
function classDate(href: string): Date {
  const m = href.match(/dt=(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return new Date(NaN);
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

// The booking link's dt is the class start in UTC
// (…dt=YYYY-MM-DD+HH%3AMM%3ASS…). Return that instant in epoch ms so a class can
// be dropped from the schedule once it has started. NaN if the link can't be
// parsed (caller keeps such entries rather than hiding them).
function classStartMs(href: string): number {
  const m = href.match(
    /dt=(\d{4})-(\d{2})-(\d{2})[+ ](\d{2})(?::|%3A)(\d{2})(?::|%3A)(\d{2})/,
  );
  if (!m) return NaN;
  return Date.UTC(
    Number(m[1]),
    Number(m[2]) - 1,
    Number(m[3]),
    Number(m[4]),
    Number(m[5]),
    Number(m[6]),
  );
}

type ScheduleRow = {
  kind: "group" | "private";
  day: string;
  /** Sub-label under the day, e.g. "July 6". */
  dateLabel: string;
  time: string;
  location: string;
  href: string;
  /** Epoch ms for chronological sorting. */
  sort: number;
};

export default function Schedule() {
  // Reckoned once so the whole render agrees on "now". The page uses ISR
  // (revalidate) so this advances roughly hourly on the deployed site.
  const nowMs = Date.now();

  // Group mat classes at Neaumix Fit, dated from their booking links. Drop any
  // class whose start time has already passed so "Next up" always points at a
  // genuinely upcoming class; keep links we can't parse rather than hiding them.
  const groupRows: ScheduleRow[] = upcomingClasses
    .filter((session) => {
      const start = classStartMs(session.href);
      return Number.isNaN(start) || start > nowMs;
    })
    .map((session) => {
      const date = classDate(session.href);
      const [day] = session.date.split(", ");
      return {
        kind: "group",
        day,
        dateLabel: fmtDate(date),
        time: session.time,
        location: session.location,
        href: session.href,
        sort: date.getTime(),
      };
    });

  // Blue Moon private availability is weekly; surface the actual dates from
  // today through the last group class so the week reads in order. Starting at
  // today (not the first group class) keeps this week's remaining private days
  // visible even when the next group class is still days away.
  //
  // Reckon "today" in the studios' time zone (both are in California). The site
  // is built on Vercel in UTC, so a plain `new Date()` rolls over to tomorrow
  // hours before California does and would drop that day's private slot.
  const today = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
  );
  today.setHours(0, 0, 0, 0);
  const groupTimes = groupRows.map((r) => r.sort);
  const windowStart = groupTimes.length
    ? new Date(Math.min(today.getTime(), ...groupTimes))
    : today;
  const windowEnd = groupTimes.length
    ? new Date(Math.max(...groupTimes))
    : new Date(today.getTime() + 13 * 86_400_000);

  const slotByDay = new Map(blueMoonAvailability.map((s) => [s.day, s]));
  const privateRows: ScheduleRow[] = [];
  for (
    let d = new Date(windowStart);
    d <= windowEnd;
    d = new Date(d.getTime() + 86_400_000)
  ) {
    if (d <= today) continue; // only surface upcoming (after today) availability
    const slot = slotByDay.get(DAY_NAMES[d.getDay()]);
    if (!slot) continue;
    privateRows.push({
      kind: "private",
      day: slot.day,
      dateLabel: fmtDate(d),
      time: slot.time,
      location: BLUE_MOON_LOCATION,
      href: BLUE_MOON_BOOK_URL,
      sort: d.getTime(),
    });
  }

  // One schedule across both studios, in true date order.
  const schedule = [...groupRows, ...privateRows].sort((a, b) => a.sort - b.sort);

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
          Practice with me this week
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink/75">
          Group mat classes at Neaumix Fit in Lake Forest and private,
          comprehensive sessions at Blue Moon Pilates in Mission Viejo. Book
          whichever fits your week.
        </p>
      </div>

      {/* Two studios, side by side - Blue Moon (left) · Neaumix Fit (right) */}
      <div className="reveal mt-8 grid items-stretch gap-6 lg:grid-cols-2 lg:[grid-template-rows:auto_auto_1fr]">
        {/* Blue Moon Pilates - private sessions. Subgrid shares the row tracks
            with the Neaumix card so the buttons line up exactly. */}
        <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-accent/60 bg-gradient-to-br from-secondary/25 to-background p-6 shadow-sm sm:p-8 lg:row-span-3 lg:grid lg:gap-6 lg:[grid-template-rows:subgrid]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary/15 blur-2xl"
          />
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/30 text-primary">
              <FaMoon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Now available
              </span>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:min-h-[2.4em]">
                Now part of the Blue Moon Pilates family
              </h3>
              <p className="mt-2 text-ink/75">
                One-on-one sessions in Mission Viejo on the full apparatus:
                reformer, tower, chair, and more. The complete Pilates system,
                shaped entirely around your body and goals.
              </p>
            </div>
          </div>

          <div className="lg:self-start">
            <a
              href={BLUE_MOON_BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center whitespace-nowrap rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Book a private session
            </a>
            <div className="mt-2.5 flex flex-wrap gap-2">
              <a
                href={MINDBODY_APP_IOS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <FaApple className="h-3.5 w-3.5" aria-hidden="true" /> App Store
              </a>
              <a
                href={MINDBODY_APP_ANDROID}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <FaGooglePlay className="h-3 w-3" aria-hidden="true" /> Google
                Play
              </a>
            </div>
          </div>

          <div className="flex flex-col border-t border-ink/10 pt-4 lg:h-full lg:justify-between">
            <p className="text-xs leading-relaxed text-ink/75">
              In the app: Appointments → Intro Offers or Private Training →
              choose your session.
            </p>
            <a
              href={BLUE_MOON_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs font-semibold text-primary hover:text-primary/80"
            >
              About the studio
            </a>
          </div>
        </div>

        {/* Neaumix Fit - group classes / first class free */}
        <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-accent/60 bg-gradient-to-br from-secondary/25 to-accent/30 p-6 shadow-sm sm:p-8 lg:row-span-3 lg:grid lg:gap-6 lg:[grid-template-rows:subgrid]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary/15 blur-2xl"
          />
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/30 text-primary">
              <MdSelfImprovement className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                New here?
              </span>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:min-h-[2.4em]">
                Your first class is free
              </h3>
              <p className="mt-2 text-ink/75">
                New clients can book a complimentary intro class through the
                Neaumix Fit app or online booking.
              </p>
            </div>
          </div>

          <div className="lg:self-start">
            <a
              href={FIRST_FREE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center whitespace-nowrap rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Book your free class
            </a>
            <div className="mt-2.5 flex flex-wrap gap-2">
              <a
                href={NEAUMIX_APP_IOS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <FaApple className="h-3.5 w-3.5" aria-hidden="true" /> App Store
              </a>
              <a
                href={NEAUMIX_APP_ANDROID}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <FaGooglePlay className="h-3 w-3" aria-hidden="true" /> Google
                Play
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-ink/10 pt-4 lg:h-full lg:justify-between">
            <details className="disclosure">
              <summary className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/80 hover:text-primary">
                Class policies
                <FaChevronDown
                  className="disclosure-caret h-3 w-3"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-2 text-xs leading-relaxed text-ink/75">
                Free intro class for new clients only, booked and managed through
                Neaumix Fit. Ages 16+. Grip socks required; please arrive 10
                minutes early. Cancel at least 12 hours before class to avoid
                fees (late cancel $10, no-show $15); for safety, arrivals more
                than 10 minutes late cannot join. Classes, pricing, and policies
                are set by Neaumix Fit and may change. Current terms apply at the
                time of booking.
              </p>
            </details>
            <a
              href={NEAUMIX_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-semibold text-primary hover:text-primary/80"
            >
              About the studio
            </a>
          </div>
        </div>
      </div>

      {/* Unified weekly schedule - both studios, in weekday order. Group mat
          classes use the filled primary card; private availability windows use
          a muted, outlined card so a "9:00 AM - 1:00 PM" window doesn't read as
          a single class. */}
      {schedule.length > 0 && (
        <ul className="reveal mt-8 space-y-3">
          {schedule.map((row, i) => {
            const isNext = i === 0;
            const isPrivate = row.kind === "private";
            const kindLabel = isPrivate ? "Private availability" : "Group mat";
            const cardClass = isPrivate
              ? "border border-dashed border-primary/40 bg-secondary/10"
              : "border border-accent/60 bg-white/70 shadow-sm";
            return (
              <li
                key={`${row.kind}-${row.sort}-${row.time}`}
                className={`flex flex-col gap-4 rounded-2xl px-5 py-5 sm:flex-row sm:items-center sm:justify-between ${cardClass}`}
              >
                <div className="flex items-baseline gap-4">
                  <div className="min-w-28">
                    {isNext && (
                      <span className="mb-1 inline-block rounded-full bg-secondary/30 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-primary">
                        Next up
                      </span>
                    )}
                    <p className="font-display text-xl font-semibold leading-tight text-ink">
                      {row.day}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-ink/75">
                      {row.dateLabel}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-ink">
                      {isPrivate ? `Appointments ${row.time}` : row.time}
                    </p>
                    {isPrivate && (
                      <p className="text-xs text-ink/60">
                        By appointment. Reserve your preferred start time.
                      </p>
                    )}
                    <p className="text-sm text-ink/70">{row.location}</p>
                    <span
                      className={`mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-primary ${
                        isPrivate ? "bg-white/70 ring-1 ring-primary/20" : "bg-secondary/20"
                      }`}
                    >
                      {isPrivate && (
                        <FaMoon className="h-2.5 w-2.5" aria-hidden="true" />
                      )}
                      {kindLabel}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2.5 sm:items-end">
                  <a
                    href={row.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {row.kind === "group" ? "Join" : "Book"}
                  </a>

                  {row.kind === "group" && (
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
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

    </section>
  );
}
