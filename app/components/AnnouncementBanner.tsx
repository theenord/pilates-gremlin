import { FaArrowRightLong, FaWandMagicSparkles } from "react-icons/fa6";
import { announcement } from "../site-data";

/**
 * Slim gradient strip above the nav, driven by `announcement` in site-data.
 *
 * It expires on its own: once the announcement's `untilUtc` instant passes the
 * banner stops rendering, so a dated message ("this Sunday") never outlives the
 * thing it points at. The page's 15-minute ISR (`revalidate` in page.tsx)
 * bounds how long a just-expired banner lingers, the same way finished classes
 * drop off the schedule. An unparseable `untilUtc` keeps the banner up rather
 * than silently hiding it.
 */
export default function AnnouncementBanner() {
  if (!announcement) return null;

  const endsMs = Date.parse(announcement.untilUtc);
  if (!Number.isNaN(endsMs) && endsMs <= Date.now()) return null;

  return (
    <aside
      aria-label="Announcement"
      className="announce-bar relative overflow-hidden text-white"
    >
      <a
        href={announcement.href}
        className="group relative z-10 mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2.5 text-center focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white sm:px-6 lg:px-8"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white ring-1 ring-inset ring-white/25">
          <FaWandMagicSparkles className="h-3 w-3" aria-hidden="true" />
          {announcement.eyebrow}
        </span>

        <span className="font-display text-sm italic tracking-wide text-white sm:text-base">
          {announcement.text}
        </span>

        <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.16em] text-white/90 underline-offset-4 transition-colors group-hover:text-white group-hover:underline">
          {announcement.cta}
          <FaArrowRightLong
            className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </a>
    </aside>
  );
}
