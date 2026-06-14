import { socialLinks } from "../site-data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-accent/60 bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-6 lg:px-8">
        <p className="font-display text-lg font-semibold tracking-tight text-ink">
          Pilates Gremlin
        </p>
        <p className="max-w-md text-sm text-ink/75">
          Mat Pilates at Neaumix Fit in Lake Forest, serving Orange County.
        </p>

        <ul className="flex items-center gap-3">
          {socialLinks.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent text-ink/70 transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
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
