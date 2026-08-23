"use client";

import { track } from "@vercel/analytics";

type Props = {
  href: string;
  /** Which booking path this is, e.g. "schedule-group", "blue-moon-private". */
  event: string;
  /** Extra detail for the event, e.g. the class name or date. */
  detail?: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * An outbound booking link that reports the click to Vercel Analytics.
 *
 * Every booking on this site happens on someone else's system (WellnessLiving,
 * ClassPass, MindBody), so once a visitor leaves we can't see whether they
 * booked. Counting the click is the only signal available for the page's
 * primary action, and without it there is no way to tell whether a change to
 * the schedule or the hero actually helped.
 *
 * `track` is a no-op off Vercel, which matches how <Analytics /> is gated in
 * layout.tsx, so local runs stay silent.
 */
export default function BookingLink({
  href,
  event,
  detail,
  className,
  children,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("booking_click", detail ? { event, detail } : { event })}
    >
      {children}
    </a>
  );
}
