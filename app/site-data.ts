import type { IconType } from "react-icons";
import {
  FaCalendarCheck,
  FaInstagram,
  FaPatreon,
  FaPeopleGroup,
} from "react-icons/fa6";
import { MdSelfImprovement } from "react-icons/md";
import { SiSubstack } from "react-icons/si";

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
  /** Class start time, e.g. "9:00 AM". Shown on WellnessLiving under
   *  "Purchase Options Available" (loads via JS, so update by hand). */
  time: string;
  location: string;
  /** Direct WellnessLiving booking link for this specific date. */
  href: string;
};

// Upcoming mat classes at Neaumix Fit. Dates/links come straight from the
// WellnessLiving booking pages; remove past entries as they pass.
export const upcomingClasses: UpcomingClass[] = [
  {
    date: "Saturday, July 18",
    time: "11:00-11:45 AM",
    location: "Neaumix Fit · Lake Forest",
    href: "https://www.wellnessliving.com/explore/locations/open-gym/us-ca-lake_forest/neaumixfit-lake_forest/schedule/classes/mat-pilates-436632807869/book/?dt=2026-07-18+18%3A00%3A00&kClass=18172097",
  },
  {
    date: "Sunday, July 19",
    time: "7:30-8:15 AM",
    location: "Neaumix Fit · Lake Forest",
    href: "https://www.wellnessliving.com/explore/locations/open-gym/us-ca-lake_forest/neaumixfit-lake_forest/schedule/classes/mat-pilates-436632807869/book/?dt=2026-07-19+14%3A30%3A00&kClass=17697614",
  },
  {
    date: "Saturday, July 25",
    time: "11:00-11:45 AM",
    location: "Neaumix Fit · Lake Forest",
    href: "https://www.wellnessliving.com/explore/locations/open-gym/us-ca-lake_forest/neaumixfit-lake_forest/schedule/classes/mat-pilates-436632807869/book/?dt=2026-07-25+18%3A00%3A00&kClass=18172097",
  },
  {
    date: "Sunday, July 26",
    time: "7:30-8:15 AM",
    location: "Neaumix Fit · Lake Forest",
    href: "https://www.wellnessliving.com/explore/locations/open-gym/us-ca-lake_forest/neaumixfit-lake_forest/schedule/classes/mat-pilates-436632807869/book/?dt=2026-07-26+14%3A30%3A00&kClass=17697614",
  },
];

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

// "Ways to Train / Links" cards.
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
  {
    title: "Substack",
    description: "Read notes on movement, posture, and the gremlin life.",
    href: "https://substack.com/@thepilatesgremlin",
    Icon: SiSubstack,
    tone: "bg-accent/40 text-ink",
  },
  {
    title: "Instagram",
    description: "Follow along for tips, reels, and class updates.",
    href: "https://www.instagram.com/thepilatesgremlin",
    Icon: FaInstagram,
    tone: "bg-secondary/20 text-primary",
  },
];
