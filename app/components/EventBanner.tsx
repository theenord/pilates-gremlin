import Image from "next/image";
import { FaLocationDot, FaRibbon } from "react-icons/fa6";
import BookingLink from "./BookingLink";
import EventBannerDismiss from "./EventBannerDismiss";
import { eventBanner } from "../site-data";

/**
 * Full-width blush band at the very top of every page, for one dated event.
 * Driven by `eventBanner` in site-data; renders nothing when that is null.
 *
 * Two independent ways it goes away:
 *
 * 1. Time. Once `untilUtc` passes the component stops rendering, so a banner
 *    for "Sunday, October 4" cannot outlive the class it points at. The check
 *    runs on the server, and page.tsx's 15-minute ISR bounds how long an
 *    expired banner lingers, the same way finished classes drop off the
 *    schedule. An unparseable `untilUtc` keeps the banner up rather than
 *    silently hiding it, matching AnnouncementBanner.
 * 2. The visitor. EventBannerDismiss records an expiry stamp in localStorage
 *    and flips `data-event-banner` on <html>; globals.css hides the band.
 *
 * The dismissal deliberately avoids React state. Reading localStorage during
 * render would either mismatch hydration or flash the banner back at people
 * who already closed it, so the check below is a blocking script that runs
 * while the browser is still parsing, before this markup is painted. Only the
 * close button ships JavaScript; the band is server-rendered.
 */
export default function EventBanner() {
  if (!eventBanner) return null;

  const endsMs = Date.parse(eventBanner.untilUtc);
  if (!Number.isNaN(endsMs) && endsMs <= Date.now()) return null;

  const { dismissKey } = eventBanner;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `try{var v=localStorage.getItem(${JSON.stringify(
            dismissKey
          )});if(v&&Date.now()<+v){document.documentElement.setAttribute("data-event-banner","dismissed")}}catch(e){}`,
        }}
      />

      <section
        role="region"
        aria-label="Announcement"
        className="event-banner relative"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3.5 pr-12 sm:px-6 sm:pr-14 lg:px-8 lg:pr-14 md:flex-row md:items-center md:justify-between md:gap-6 md:py-3">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* The studio mark gets its own white chip. The lockup is pale
                coastal blue, which goes muddy straight on the blush wash, and
                a brand mark reads as a brand mark when it sits on its own
                ground rather than floating in someone else's color. */}
            <span className="flex shrink-0 items-center justify-center rounded-xl bg-white px-2.5 py-2 shadow-sm ring-1 ring-inset ring-white sm:px-3">
              {/* alt is empty on purpose: the studio name sits in text directly
                  below, so giving the mark its own label would just make a
                  screen reader say "Blue Moon Pilates" twice. The artwork ships
                  on a white ground, which is why the chip is pure white rather
                  than the translucent white used elsewhere. */}
              <Image
                src="/blue-moon-pilates.png"
                alt=""
                width={520}
                height={409}
                sizes="96px"
                className="h-auto w-16 sm:w-24"
              />
            </span>

            <div className="min-w-0">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-rose-ink">
                {eventBanner.label}
              </p>
              <p className="font-display text-base leading-snug text-ink sm:text-lg">
                {eventBanner.headline}
              </p>

              {/* Where and what, on one wrapping line. */}
              <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-0.5 text-xs leading-snug text-ink/75 sm:text-sm">
                <span className="inline-flex items-start gap-1.5 font-semibold text-ink">
                  <FaLocationDot
                    className="mt-[0.28em] h-3 w-3 shrink-0 text-rose-ink"
                    aria-hidden="true"
                  />
                  {eventBanner.venue}
                  <span className="font-normal text-ink/75">
                    {"·"} {eventBanner.city}
                  </span>
                </span>
                <span className="inline-flex items-start gap-1.5">
                  <FaRibbon
                    className="mt-[0.28em] h-3 w-3 shrink-0 text-rose-ink"
                    aria-hidden="true"
                  />
                  {eventBanner.subtext}
                </span>
              </p>
            </div>
          </div>

          {/* Button and pill sit side by side once there is room, and stack
              with a full-width button on phones. */}
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center md:shrink-0">
            <BookingLink
              href={eventBanner.href}
              event="fundraiser-mat-class"
              detail={eventBanner.label}
              className="flex w-full items-center justify-center whitespace-nowrap rounded-full bg-rose-ink px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-deep sm:w-auto"
            >
              {eventBanner.cta}
            </BookingLink>
            <span className="whitespace-nowrap rounded-full bg-white px-3 py-1 text-[0.7rem] font-semibold text-rose-ink ring-1 ring-inset ring-rose-line">
              {eventBanner.badge}
            </span>
          </div>
        </div>

        <EventBannerDismiss
          storageKey={dismissKey}
          days={eventBanner.dismissDays}
        />
      </section>
    </>
  );
}
