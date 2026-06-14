import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      {/* Soft coastal gradient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-secondary/30 via-background to-background"
      />

      {/* Soft decorative glow behind the portrait */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/4 -z-10 hidden h-[28rem] w-[28rem] rounded-full bg-secondary/40 blur-3xl lg:block"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-28">
        <div className="flex flex-col items-start gap-6 text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3.5 py-1 text-sm font-medium tracking-wide text-primary">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
            Lake Forest · Orange County
          </span>

          <h1
            id="hero-heading"
            className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            Pilates&nbsp;Gremlin
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-ink/75 sm:text-xl">
            Cultivate Diversity&nbsp;|&nbsp;Good Posture&nbsp;|&nbsp;Pilates as a System
          </p>

          <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#upcoming-classes"
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
          <div className="group relative mx-auto w-full max-w-sm lg:max-w-none">
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
              {/* Gentle bottom fade to ground the image */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/10 via-transparent to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
