import type { IconType } from "react-icons";
import {
  FaCalendarCheck,
  FaPatreon,
  FaPeopleGroup,
} from "react-icons/fa6";
import { MdSelfImprovement } from "react-icons/md";

// External booking URLs reused across the site.
export const BOOK_GROUP_URL =
  "https://www.wellnessliving.com/explore/locations/open-gym/us-ca-lake_forest/neaumixfit-lake_forest/";
export const NEAUMIX_SITE =
  "https://www.neaumixfit.com/locations/lake-forest";

// ClassPass: the studio's live schedule (for existing members) and Cecily's
// personal referral link (for newcomers - earns her credit, gives them bonus
// credits). The studio page is the closest ClassPass gets to a per-class link.
export const CLASSPASS_STUDIO_URL =
  "https://classpass.com/studios/neaumix-fit-lake-forest";
export const CLASSPASS_REFERRAL_URL =
  "https://classpass.com/invite/P1DVEBQ519?placement=VenueDetails";

// First-class-free offer (run and managed by Neaumix Fit on WellnessLiving)
// plus the Neaumix Fit app stores.
export const FIRST_FREE_URL =
  "https://www.wellnessliving.com/rs/catalog-view.html?k_business=663178&id_sale=1&k_id=3515671";
export const NEAUMIX_APP_IOS =
  "https://apps.apple.com/us/app/neaumix-fit-franchise/id6447298547";
export const NEAUMIX_APP_ANDROID =
  "https://play.google.com/store/apps/details?id=neaumix.fit.newport";

export type UpcomingClass = {
  /** Human-readable date, e.g. "Sunday, June 7" */
  date: string;
  /** Class name as Neaumix lists it, e.g. "Mat Pilates", "Reformer Pilates".
   *  Shown as the card's badge - Cecily teaches both formats. */
  name: string;
  /** Class start time, e.g. "9:00 AM". Shown on WellnessLiving under
   *  "Purchase Options Available" (loads via JS, so update by hand). */
  time: string;
  location: string;
  /** Direct WellnessLiving booking link for this specific date. */
  href: string;
};

// Upcoming Cecily-taught classes at Neaumix Fit. Dates/links come straight from
// the WellnessLiving booking pages; remove past entries as they pass.
// kClass identifies the individual class instance, NOT the weekly recurrence -
// consecutive Saturdays can carry different ids, and ids sometimes do repeat
// across dates (Sep 5 and Sep 12 are both 18417087; Sep 6 and Sep 13 are both
// 17697614). Always read each date's id off the live schedule; never copy one
// forward to next week. Times move too, so verify those per date as well.
// Note the studio's schedule widget paginates - a day's later classes can sit
// on page 2, so check every page before concluding a class doesn't exist.
// dt is the start in UTC, so an afternoon class carries the *next* day's date
// (a 5:30 PM PDT class is 00:30Z) - that is correct, and Schedule.tsx converts
// it back to the Pacific calendar date.
export const upcomingClasses: UpcomingClass[] = [
  {
    date: "Sunday, August 30",
    name: "Mat Pilates",
    time: "7:30-8:15 AM",
    location: "Neaumix Fit · Lake Forest",
    href: "https://www.wellnessliving.com/explore/locations/open-gym/us-ca-lake_forest/neaumixfit-lake_forest/schedule/classes/mat-pilates-436632807869/book/?dt=2026-08-30+14%3A30%3A00&kClass=17697614",
  },
  // One-off: Cecily picked up Aug 30's three morning reformer slots last
  // minute. On Sep 6 and Sep 13 those same 8:30/9:30/10:30 classes are Sky's,
  // so this is not the weekly pattern - her standing slots are Saturday
  // 11:00 AM mat and Sunday 7:30 AM mat.
  {
    date: "Sunday, August 30",
    name: "Reformer Pilates",
    time: "8:30-9:15 AM",
    location: "Neaumix Fit · Lake Forest",
    href: "https://www.wellnessliving.com/explore/locations/open-gym/us-ca-lake_forest/neaumixfit-lake_forest/schedule/classes/reformer-pilates-436632767675/book/?dt=2026-08-30+15%3A30%3A00&kClass=18574694",
  },
  {
    date: "Sunday, August 30",
    name: "Reformer Pilates",
    time: "9:30-10:15 AM",
    location: "Neaumix Fit · Lake Forest",
    href: "https://www.wellnessliving.com/explore/locations/open-gym/us-ca-lake_forest/neaumixfit-lake_forest/schedule/classes/reformer-pilates-436632767675/book/?dt=2026-08-30+16%3A30%3A00&kClass=18574692",
  },
  {
    date: "Sunday, August 30",
    name: "Reformer Pilates",
    time: "10:30-11:15 AM",
    location: "Neaumix Fit · Lake Forest",
    href: "https://www.wellnessliving.com/explore/locations/open-gym/us-ca-lake_forest/neaumixfit-lake_forest/schedule/classes/reformer-pilates-436632767675/book/?dt=2026-08-30+17%3A30%3A00&kClass=18574690",
  },
  {
    date: "Saturday, September 5",
    name: "Mat Pilates",
    time: "11:00-11:45 AM",
    location: "Neaumix Fit · Lake Forest",
    href: "https://www.wellnessliving.com/explore/locations/open-gym/us-ca-lake_forest/neaumixfit-lake_forest/schedule/classes/mat-pilates-436632807869/book/?dt=2026-09-05+18%3A00%3A00&kClass=18417087",
  },
  {
    date: "Sunday, September 6",
    name: "Mat Pilates",
    time: "7:30-8:15 AM",
    location: "Neaumix Fit · Lake Forest",
    href: "https://www.wellnessliving.com/explore/locations/open-gym/us-ca-lake_forest/neaumixfit-lake_forest/schedule/classes/mat-pilates-436632807869/book/?dt=2026-09-06+14%3A30%3A00&kClass=17697614",
  },
  {
    date: "Saturday, September 12",
    name: "Mat Pilates",
    time: "11:00-11:45 AM",
    location: "Neaumix Fit · Lake Forest",
    href: "https://www.wellnessliving.com/explore/locations/open-gym/us-ca-lake_forest/neaumixfit-lake_forest/schedule/classes/mat-pilates-436632807869/book/?dt=2026-09-12+18%3A00%3A00&kClass=18417087",
  },
  {
    date: "Sunday, September 13",
    name: "Mat Pilates",
    time: "7:30-8:15 AM",
    location: "Neaumix Fit · Lake Forest",
    href: "https://www.wellnessliving.com/explore/locations/open-gym/us-ca-lake_forest/neaumixfit-lake_forest/schedule/classes/mat-pilates-436632807869/book/?dt=2026-09-13+14%3A30%3A00&kClass=17697614",
  },
];

// A short, timed announcement strip above the nav. Self-expiring: the banner
// stops rendering once `untilUtc` passes, so a "this Sunday" message can't
// linger into Monday - set `untilUtc` to the END of the last thing being
// announced (the 10:30-11:15 AM PDT reformer ends at 18:15Z). Set the whole
// export to null when there is nothing to announce.
export type Announcement = {
  /** Small pill to the left, e.g. "Just added". */
  eyebrow: string;
  text: string;
  /** Link label, e.g. "See the times". */
  cta: string;
  /** On-page anchor. Schedule.tsx renders a "#day-YYYY-MM-DD" id on the first
   *  still-listed row of each California day, so pointing at a day lands on the
   *  classes being announced and keeps working as that day's earlier classes
   *  finish and drop off. "#upcoming-classes" is the whole-section fallback. */
  href: string;
  /** UTC instant the banner stops rendering, "YYYY-MM-DDTHH:MM:SSZ". */
  untilUtc: string;
};

export const announcement: Announcement | null = {
  eyebrow: "Just added",
  text: "3 reformer classes added for today",
  cta: "See the times",
  href: "#day-2026-08-30",
  untilUtc: "2026-08-30T18:15:00Z",
};

// Blue Moon Pilates - private one-on-one sessions in Mission Viejo.
// Direct https MindBody booking link for Blue Moon (studio id 3357). All
// external links must be https; the old get.mndbdy.ly shortener was http-only.
export const BLUE_MOON_BOOK_URL =
  "https://clients.mindbodyonline.com/classic/ws?studioid=3357&stype=-9";
export const BLUE_MOON_SITE = "https://bluemoonpilates.com/";
// Blue Moon books through the MindBody app.
export const MINDBODY_APP_IOS =
  "https://apps.apple.com/us/app/mindbody-fitness-wellness/id689501356";
export const MINDBODY_APP_ANDROID =
  "https://play.google.com/store/apps/details?id=com.mindbodyonline.connect";

export type PrivateSlot = { day: string; time: string };

export const blueMoonAvailability: PrivateSlot[] = [
  { day: "Monday", time: "9:00 AM - 1:00 PM" },
  { day: "Tuesday", time: "9:00 AM - 1:00 PM" },
  { day: "Wednesday", time: "9:00 AM - 12:00 PM" },
];

export type TrainingAction = {
  label: string;
  href: string;
  /** "primary" renders a filled button, "ghost" an outlined one. */
  variant: "primary" | "ghost";
};

export type TrainingLink = {
  title: string;
  description: string;
  href: string;
  Icon: IconType;
  /* Tailwind classes for the icon tile background + foreground */
  tone: string;
  /** When present, the card shows these buttons instead of being one big link. */
  actions?: TrainingAction[];
};

// "Ways to Train" cards. Booking and practice channels only. Instagram and
// Substack deliberately live in the footer instead: they are not ways to train,
// and duplicating them here diluted a grid meant to route people into a class.
export const trainingLinks: TrainingLink[] = [
  {
    title: "Group Mat Classes",
    description: "Join a mat class at Neaumix Fit in Lake Forest.",
    href: BOOK_GROUP_URL,
    Icon: MdSelfImprovement,
    tone: "bg-primary/10 text-primary",
  },
  {
    title: "Book on ClassPass",
    description:
      "New here? Join with 20 bonus credits. Already a member? Jump straight to the schedule.",
    href: CLASSPASS_STUDIO_URL,
    Icon: FaCalendarCheck,
    tone: "bg-secondary/20 text-primary",
    actions: [
      {
        label: "Join with bonus credits",
        href: CLASSPASS_REFERRAL_URL,
        variant: "primary",
      },
      {
        label: "See the schedule",
        href: CLASSPASS_STUDIO_URL,
        variant: "ghost",
      },
    ],
  },
  {
    title: "On-Demand Classes",
    description: "Practice anytime with on-demand sessions on Patreon.",
    href: "https://www.patreon.com/ThePilatesGremlin",
    Icon: FaPatreon,
    tone: "bg-accent/40 text-ink",
  },
  {
    title: "Local Fitness Events",
    description: "Find pop-ups and community workouts on Sweatpals.",
    href: "https://sweatpals.com/host/The_Pilates_Gremlin",
    Icon: FaPeopleGroup,
    tone: "bg-primary/10 text-primary",
  },
];
