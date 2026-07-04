import type { ComponentType, SVGProps } from "react";
import { CLASSPASS_STUDIO_URL } from "../site-data";

// Inline SVG social icons - kept dependency-free (no icon library) so the
// footer owns its own marks. Each is decorative; the link carries the label.
type IconProps = SVGProps<SVGSVGElement>;

function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SubstackIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4 3.5h16V6H4zM4 8h16v2.5H4zM4 12.6 12 17l8-4.4V21l-8-4.4L4 21z" />
    </svg>
  );
}

function PatreonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="15" cy="9.2" r="6" />
      <rect x="3" y="3.2" width="3.4" height="17.6" />
    </svg>
  );
}

function ClassPassIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 1 0 6.93 17.2l-2.8-2.83A6 6 0 1 1 16.03 8.8l2.87-2.86A9.96 9.96 0 0 0 12 2z" />
    </svg>
  );
}

function SweatpalsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="8.5" cy="8" r="3.2" />
      <circle cx="16.8" cy="9" r="2.6" />
      <path d="M2.5 19.2c0-3.1 2.7-5.2 6-5.2s6 2.1 6 5.2v.6H2.5z" />
      <path d="M15.4 14.1c2.7.1 4.6 1.9 4.6 4.4v1.3h-3.1c.1-2-.5-3.9-1.5-5.7z" />
    </svg>
  );
}

const footerSocials: {
  label: string;
  href: string;
  Icon: ComponentType<IconProps>;
}[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/thepilatesgremlin",
    Icon: InstagramIcon,
  },
  {
    label: "Substack",
    href: "https://substack.com/@thepilatesgremlin",
    Icon: SubstackIcon,
  },
  {
    label: "Patreon",
    href: "https://www.patreon.com/ThePilatesGremlin",
    Icon: PatreonIcon,
  },
  {
    label: "ClassPass",
    href: CLASSPASS_STUDIO_URL,
    Icon: ClassPassIcon,
  },
  {
    label: "Sweatpals",
    href: "https://sweatpals.com/host/The_Pilates_Gremlin",
    Icon: SweatpalsIcon,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-accent/60 bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-6 lg:px-8">
        <p className="font-display text-lg font-semibold tracking-tight text-ink">
          Pilates Gremlin
        </p>
        <p className="max-w-md text-sm text-ink/75">
          Mat Pilates at Neaumix Fit in Lake Forest and private sessions at Blue
          Moon Pilates in Mission Viejo, serving Orange County.
        </p>

        <ul className="flex items-center gap-3">
          {footerSocials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent text-ink/70 transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Icon className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>

        <p className="text-sm text-ink/70">
          © {year} Pilates Gremlin. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
