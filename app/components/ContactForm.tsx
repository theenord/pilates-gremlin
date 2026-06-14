"use client";

import { useState, type FormEvent } from "react";

// ============================================================================
// FORMSPREE SETUP
// Replace YOUR_FORM_ID below with your real Formspree form ID.
// 1. Create a form at https://formspree.io
// 2. Copy the endpoint it gives you (looks like https://formspree.io/f/abcdwxyz)
// 3. Paste the ID (the part after /f/) in place of YOUR_FORM_ID.
// Submissions are emailed to you by Formspree; no email address appears on the site.
// ============================================================================
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xojzevaj";

const reasons = [
  "Questions about pilates",
  "Book a private session",
  "General inquiry",
  "Something else",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-accent bg-white px-4 py-2.5 text-ink shadow-sm transition-colors placeholder:text-ink/40 focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-accent/60 bg-secondary/15"
    >
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="text-center">
          <h2
            id="contact-heading"
            className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            Get in Touch
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink/75">
            Questions, private sessions, or just saying hi? Send a note and
            I&apos;ll get back to you.
          </p>
        </div>

        {status === "success" ? (
          <div
            role="status"
            className="mt-10 rounded-2xl border border-primary/30 bg-white p-8 text-center shadow-sm"
          >
            <p className="font-display text-xl font-semibold text-ink">
              Thank you! Your message is on its way.
            </p>
            <p className="mt-2 text-ink/70">
              I&apos;ll be in touch soon. In the meantime, feel free to book a
              class above.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6 rounded-2xl border border-accent/60 bg-white/70 p-6 shadow-sm sm:p-8"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-ink"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className={`mt-1.5 ${fieldClass}`}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-ink"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={`mt-1.5 ${fieldClass}`}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-ink"
              >
                Phone{" "}
                <span className="font-normal text-ink/70">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className={`mt-1.5 ${fieldClass}`}
              />
            </div>

            <fieldset>
              <legend className="text-sm font-medium text-ink">
                Reason for reaching out?
              </legend>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {reasons.map((reason, i) => (
                  <label
                    key={reason}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-accent bg-white px-4 py-3 text-sm text-ink transition-colors hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={reason}
                      defaultChecked={i === 0}
                      className="h-4 w-4 accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    />
                    {reason}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-ink"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className={`mt-1.5 resize-y ${fieldClass}`}
              />
            </div>

            {status === "error" && (
              <p
                role="alert"
                className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                Something went wrong sending your message. Please try again in a
                moment.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {status === "submitting" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
