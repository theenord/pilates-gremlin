"use client";

import { FaXmark } from "react-icons/fa6";

const DAY_MS = 86_400_000;

type Props = {
  /** localStorage key the dismissal is recorded under. */
  storageKey: string;
  /** How long the dismissal sticks, in days. */
  days: number;
};

/**
 * Close button for the event banner.
 *
 * It stores the instant the dismissal *expires* rather than the instant it
 * happened, so the read side (the blocking script in EventBanner) is a single
 * comparison and the window length lives in one place, in site-data.
 *
 * Hiding is left to CSS: this flips `data-event-banner` on <html> and
 * globals.css takes the band down. That keeps the banner itself a server
 * component with no state to hydrate, and means the same attribute handles
 * both "just closed it" and "closed it last Tuesday".
 */
export default function EventBannerDismiss({ storageKey, days }: Props) {
  return (
    <button
      type="button"
      aria-label="Dismiss announcement"
      onClick={() => {
        try {
          window.localStorage.setItem(
            storageKey,
            String(Date.now() + days * DAY_MS)
          );
        } catch {
          // Private mode, or storage blocked. The banner still closes for this
          // page view; it just comes back on the next one.
        }
        document.documentElement.setAttribute("data-event-banner", "dismissed");
      }}
      className="absolute right-1.5 top-1.5 inline-flex h-9 w-9 items-center justify-center rounded-full text-rose-ink transition-colors hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-deep sm:right-2.5 sm:top-2.5"
    >
      <FaXmark className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
