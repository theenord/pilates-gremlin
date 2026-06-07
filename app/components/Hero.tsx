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

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        <div className="flex flex-col items-start gap-6 text-left">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Lake Forest · Orange County
          </span>

          <h1
            id="hero-heading"
            className="font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl"
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

        {/* Brand headshot */}
        <div className="order-first lg:order-last">
          <div className="relative mx-auto aspect-square w-full max-w-[12rem] overflow-hidden rounded-full border border-accent/60 bg-accent/30 shadow-xl lg:max-w-[14rem]">
            <Image
              src="/profile.jpg"
              alt="Pilates Gremlin, a Pilates instructor in Lake Forest, Orange County"
              fill
              priority
              sizes="(max-width: 1024px) 12rem, 14rem"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
