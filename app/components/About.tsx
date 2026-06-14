export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="reveal text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Meet your instructor
        </span>
        <h2
          id="about-heading"
          className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
        >
          Pilates is for every body
        </h2>
      </div>

      <div className="reveal d1 mx-auto mt-8 max-w-2xl space-y-5 text-left text-lg leading-relaxed text-ink/75">
        <p>
          My love for movement began with dance and has evolved into a deep
          appreciation for Pilates as a powerful system for strength, control,
          alignment, and body awareness. I teach movement that is intelligent,
          supportive, challenging, and rooted in curiosity, offering virtual and
          in-person private and group sessions across mat, Reformer,
          Cadillac/Tower, and additional apparatus.
        </p>
        <p>
          I believe Pilates is for every body and not just a certain age, size,
          background, or fitness level. I&apos;m passionate about cultivating
          more diverse, accessible, and inclusive wellness spaces where every
          client feels seen, welcomed, supported, and empowered.
        </p>
        <p>
          Whether your goal is to build strength, improve mobility, support
          injury recovery, enhance athletic performance, or simply feel more at
          home in your body, I&apos;m here to guide you. My goal is to help you
          move better, feel stronger, and build lasting trust in your body
          through thoughtful movement and intentional practice.
        </p>
      </div>

      <p className="reveal d2 mt-8 text-center font-display text-2xl font-semibold italic text-primary">
        Let&apos;s get down!
      </p>
    </section>
  );
}
