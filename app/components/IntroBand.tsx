export default function IntroBand() {
  return (
    <section
      aria-labelledby="intro-heading"
      className="border-y border-accent/60 bg-accent/25"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
        <h2
          id="intro-heading"
          className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
        >
          Pilates at Neaumix Fit in Lake Forest
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink/75">
          Pilates Gremlin teaches mat Pilates at{" "}
          <span className="font-medium text-ink">Neaumix Fit</span> in Lake
          Forest, California, serving movers across Orange County, from Mission
          Viejo and Laguna Hills to Irvine, Tustin, and Costa Mesa.
        </p>

        {/*
          ===========================================================
          PERSONAL BIO PLACEHOLDER
          Replace this comment with your bio. Keep it 2-4 short
          sentences for the best layout. (Do not leave this empty;
          the paragraph above is the generic intro band copy.)
          ===========================================================
        */}
      </div>
    </section>
  );
}
