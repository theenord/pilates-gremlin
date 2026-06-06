<!-- BEGIN:nextjs-agent-rules -->
# Next.js version: pinned to stable 15.x

This project is pinned to **Next.js 15.5.19** (App Router, webpack build) — not the
latest 16.x. The pin is deliberate: Next 16.2.7 built successfully but returned a
sitewide `404: NOT_FOUND` on Vercel (the build output didn't map to routes on
Vercel's builder, even though `next start` worked locally). Pinning to stable 15.x
resolved it.

Guidance:
- Stay on the `15.x` line. Do **not** bump `next` or `eslint-config-next` to 16+
  without re-testing a real Vercel deployment first.
- Production builds use webpack (`next build`). Do not add `--turbopack` to the
  build script — Turbopack is for `next dev` only here.
- This is a stable, well-documented release; standard Next.js 15 App Router APIs
  and conventions apply. Check the official docs at https://nextjs.org/docs when
  unsure (this version does not ship docs under `node_modules/`).
<!-- END:nextjs-agent-rules -->
