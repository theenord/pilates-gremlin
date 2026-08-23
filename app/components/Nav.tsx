"use client";

import { useEffect, useRef, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Classes", href: "#upcoming-classes" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dismiss the mobile menu the two ways people expect: Escape, or a click
  // anywhere outside it. Focus returns to the toggle so keyboard users are not
  // dropped back at the top of the page.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? "border-accent/60 bg-background/90 shadow-sm backdrop-blur-md"
          : "border-transparent bg-background/70 backdrop-blur-md"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <a
          href="#home"
          className="flex items-center gap-2.5 rounded-md font-display text-lg font-bold tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <span
            aria-hidden="true"
            className="h-7 w-7 rounded-full bg-gradient-to-br from-secondary to-primary ring-2 ring-inset ring-white/55"
          />
          Pilates&nbsp;Gremlin
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-md text-sm font-medium text-ink/80 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#upcoming-classes"
            data-magnetic
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-5"
          >
            Join a Class
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            ref={toggleRef}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-md p-2 text-ink transition-colors hover:bg-accent/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
          >
            {open ? (
              <FaXmark className="h-5 w-5" aria-hidden="true" />
            ) : (
              <FaBars className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div id="mobile-menu" className="border-t border-accent/60 md:hidden">
          <ul className="mx-auto flex w-full max-w-6xl flex-col px-4 py-2 sm:px-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 text-base font-medium text-ink/90 transition-colors hover:bg-accent/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
