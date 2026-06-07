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
    date: "Saturday, June 13",
    time: "11:00–11:45 AM",
    location: "Neaumix Fit · Lake Forest",
    href: "https://www.wellnessliving.com/explore/locations/open-gym/us-ca-lake_forest/neaumixfit-lake_forest/schedule/classes/mat-pilates-436632807869/book/?dt=2026-06-13+18%3A00%3A00&kClass=17697612",
  },
  {
    date: "Sunday, June 14",
    time: "7:30–8:15 AM",
    location: "Neaumix Fit · Lake Forest",
    href: "https://www.wellnessliving.com/explore/locations/open-gym/us-ca-lake_forest/neaumixfit-lake_forest/schedule/classes/mat-pilates-436632807869/book/?dt=2026-06-14+14%3A30%3A00&kClass=17697614",
  },
  {
    date: "Saturday, June 20",
    time: "11:00–11:45 AM",
    location: "Neaumix Fit · Lake Forest",
    href: "https://www.wellnessliving.com/explore/locations/open-gym/us-ca-lake_forest/neaumixfit-lake_forest/schedule/classes/mat-pilates-436632807869/book/?dt=2026-06-20+18%3A00%3A00&kClass=17697612",
  },
  {
    date: "Sunday, June 21",
    time: "7:30–8:15 AM",
    location: "Neaumix Fit · Lake Forest",
    href: "https://www.wellnessliving.com/explore/locations/open-gym/us-ca-lake_forest/neaumixfit-lake_forest/schedule/classes/mat-pilates-436632807869/book/?dt=2026-06-21+14%3A30%3A00&kClass=17697614",
  },
];

export type TrainingLink = {
  title: string;
  description: string;
  href: string;
  Icon: IconType;
  /* Tailwind classes for the icon tile background + foreground */
  tone: string;
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
    description: "Use your ClassPass credits to drop in.",
    href: "https://classpass.com/invite/SVQ47LEV14?placement=VenueDetails",
    Icon: FaCalendarCheck,
    tone: "bg-secondary/20 text-primary",
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

// Compact set reused in the footer.
export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/thepilatesgremlin",
    Icon: FaInstagram,
  },
  {
    label: "Patreon",
    href: "https://www.patreon.com/ThePilatesGremlin",
    Icon: FaPatreon,
  },
  {
    label: "Substack",
    href: "https://substack.com/@thepilatesgremlin",
    Icon: SiSubstack,
  },
  {
    label: "Sweatpals",
    href: "https://sweatpals.com/host/The_Pilates_Gremlin",
    Icon: FaPeopleGroup,
  },
] as const;
