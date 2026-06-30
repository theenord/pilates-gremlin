import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      {/* Breathing gradient field (parallax via SiteMotion) */}
      <div
        aria-hidden="true"
        id="breath-field"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <span
          className="breath-orb"
          style={{
            width: "34rem",
            height: "34rem",
            top: "-8rem",
            right: "-6rem",
            background:
              "radial-gradient(circle, var(--color-primary) 0%, transparent 68%)",
            opacity: 0.5,
          }}
        />
        <span
          className="breath-orb"
          style={{
            width: "30rem",
            height: "30rem",
            top: "6rem",
            right: "14rem",
            background:
              "radial-gradient(circle, var(--color-secondary) 0%, transparent 68%)",
            opacity: 0.55,
            animationDelay: "-4.5s",
          }}
        />
        <span
          className="breath-orb"
          style={{
            width: "24rem",
            height: "24rem",
            bottom: "-6rem",
            left: "-4rem",
            background:
              "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
            opacity: 0.55,
            animationDelay: "-2s",
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-28">
        <div className="flex flex-col items-start gap-6 text-left">
          <span className="hero-rise hero-rise-1 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3.5 py-1 text-sm font-medium tracking-wide text-primary">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
            Lake Forest · Mission Viejo · Orange County
          </span>

          <h1
            id="hero-heading"
            className="hero-rise hero-rise-2 font-display text-5xl font-semibold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            Pilates{" "}
            <em className="shimmer-word font-normal not-italic md:italic">
              Gremlin
            </em>
          </h1>

          <p className="hero-rise hero-rise-3 max-w-md font-display text-lg italic leading-relaxed text-ink/70 sm:text-xl">
            Cultivate Diversity · Good Posture · Pilates as a System
          </p>

          <div className="hero-rise hero-rise-4 mt-2 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#upcoming-classes"
              data-magnetic
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Join a Group Class
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-primary px-6 py-3 text-base font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Book a Private Session
            </a>
          </div>
        </div>

        {/* Brand portrait */}
        <div className="order-first lg:order-last">
          <div
            id="hero-media"
            className="hero-rise-media group relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            {/* Layered accent frame for an editorial, high-end feel */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-tr from-accent/50 via-secondary/30 to-transparent"
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-accent/20 shadow-2xl ring-1 ring-ink/5">
              <Image
                src="/hero.png"
                alt="Pilates Gremlin, a Pilates instructor in Lake Forest, Orange County"
                fill
                priority
                sizes="(max-width: 1024px) 24rem, 32rem"
                className="object-cover object-[center_25%]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/10 via-transparent to-transparent"
              />
            </div>

            {/* Floating badge - both studios, kept light */}
            <div className="badge-bob absolute -left-4 bottom-8 rounded-2xl bg-white/95 px-4 py-3 shadow-xl ring-1 ring-ink/5 backdrop-blur">
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="ring-spin h-4 w-4 shrink-0 rounded-full border-2 border-secondary border-t-primary"
                />
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary">
                  Now teaching
                </span>
              </span>
              <p className="mt-2 text-xs leading-snug">
                <span className="font-display font-semibold text-ink">
                  Group mat
                </span>
                <span className="text-ink/55"> · Neaumix Fit</span>
              </p>
              <p className="text-xs leading-snug">
                <span className="font-display font-semibold text-ink">
                  Comprehensive Pilates
                </span>
                <span className="text-ink/55"> · Blue Moon</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
