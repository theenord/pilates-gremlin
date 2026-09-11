"use client";

import { FaXmark } from "react-icons/fa6";

type Props = {
  /** sessionStorage key the dismissal is recorded under. */
  storageKey: string;
};

/**
 * Close button for the event banner.
 *
 * The dismissal is recorded in sessionStorage, not localStorage, so it lasts
 * exactly one visit: closing the banner keeps it shut while someone is here,
 * and it is back the next time they come to the site. An annual fundraiser is
 * worth asking about more than once, and a visitor who dismissed it in March
 * should not be the reason they never hear about it again.
 *
 * Hiding is left to CSS: this flips `data-event-banner` on <html> and
 * globals.css takes the band down. That keeps the banner itself a server
 * component with no state to hydrate, and means the same attribute handles
 * both "just closed it" and "closed it earlier this visit".
 */
export default function EventBannerDismiss({ storageKey }: Props) {
  return (
    <button
      type="button"
      aria-label="Dismiss announcement"
      onClick={() => {
        try {
          window.sessionStorage.setItem(storageKey, "1");
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
