"use client";

import { useEffect } from "react";

/**
 * Progressive-enhancement layer for the page. Renders the scroll-progress bar
 * and wires up motion effects on mount. Everything here is optional polish:
 * with JS off, content is fully visible and links still work.
 */
export default function SiteMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Mark the page ready so reveal targets can hide before animating in.
    root.classList.add("js-motion");

    const progress = document.getElementById("scroll-progress");
    const breathField = document.getElementById("breath-field");
    const heroMedia = document.getElementById("hero-media");

    // Scroll-reveal
    let observer: IntersectionObserver | null = null;
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!reduce && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              observer?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el) => observer?.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("in"));
    }

    // Progress bar + parallax
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      if (!reduce) {
        if (breathField)
          breathField.style.transform = `translateY(${y * 0.18}px)`;
        if (heroMedia && y > 0 && y < window.innerHeight)
          heroMedia.style.transform = `translateY(${y * -0.06}px)`;
      }
      ticking = false;
    };
    const onScrollRaf = () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScrollRaf, { passive: true });
    onScroll();

    // Magnetic primary buttons (fine pointers only)
    const magnetCleanups: Array<() => void> = [];
    if (!reduce && window.matchMedia("(pointer:fine)").matches) {
      document
        .querySelectorAll<HTMLElement>("[data-magnetic]")
        .forEach((btn) => {
          const move = (e: MouseEvent) => {
            const r = btn.getBoundingClientRect();
            const mx = e.clientX - r.left - r.width / 2;
            const my = e.clientY - r.top - r.height / 2;
            btn.style.transform = `translate(${mx * 0.15}px, ${my * 0.25 - 2}px)`;
          };
          const reset = () => {
            btn.style.transform = "";
          };
          btn.addEventListener("mousemove", move);
          btn.addEventListener("mouseleave", reset);
          magnetCleanups.push(() => {
            btn.removeEventListener("mousemove", move);
            btn.removeEventListener("mouseleave", reset);
          });
        });
    }

    // ClassPass disclosures: one open at a time, close on outside click
    const cpMenus = Array.from(
      document.querySelectorAll<HTMLDetailsElement>(".cp-options")
    );
    const onToggle = (d: HTMLDetailsElement) => () => {
      if (d.open) {
        cpMenus.forEach((o) => {
          if (o !== d) o.open = false;
        });
      }
    };
    const toggleHandlers = cpMenus.map((d) => {
      const handler = onToggle(d);
      d.addEventListener("toggle", handler);
      return { d, handler };
    });
    const onDocClick = (e: MouseEvent) => {
      cpMenus.forEach((d) => {
        if (d.open && !d.contains(e.target as Node)) d.open = false;
      });
    };
    document.addEventListener("click", onDocClick);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScrollRaf);
      magnetCleanups.forEach((fn) => fn());
      toggleHandlers.forEach(({ d, handler }) =>
        d.removeEventListener("toggle", handler)
      );
      document.removeEventListener("click", onDocClick);
      root.classList.remove("js-motion");
    };
  }, []);

  return <div className="progress-bar" id="scroll-progress" aria-hidden="true" />;
}
