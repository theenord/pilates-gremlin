import Image from "next/image";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { essentials } from "../essentials-data";

export default function PilatesEssentials() {
  return (
    <section
      id="essentials"
      aria-labelledby="essentials-heading"
      className="border-t border-accent/60 bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="essentials-heading"
            className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            Pilates Essentials
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/75">
            A few essentials I recommend and reach for in class and at home.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {essentials.map(({ title, blurb, image, width, height, url }) => (
            <li key={title}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-accent/60 bg-white/70 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <div className="flex aspect-square items-center justify-center bg-white p-6">
                  <Image
                    src={image}
                    alt={title}
                    width={width}
                    height={height}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22rem"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col border-t border-accent/60 p-5">
                  <span className="flex items-start justify-between gap-2 font-display text-lg font-semibold text-ink">
                    {title}
                    <FaArrowUpRightFromSquare
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-ink/40 transition-colors group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-ink/70">
                    {blurb}
                  </span>
                  <span className="mt-4 text-sm font-semibold text-primary">
                    View on Amazon
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
