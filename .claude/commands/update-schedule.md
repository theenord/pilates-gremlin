---
description: Refresh the Neaumix class schedule — drop past classes, add ~2 weeks ahead, verify links live
---

Update the Neaumix Fit classes Cecily teaches in `app/site-data.ts` (the
`upcomingClasses` array). Do the following:

1. **Determine the window.** Use today's date. Remove every dated entry in
   `upcomingClasses` whose class date is on or before today — **regardless of
   weekday** (weekend or weekday, drop anything that has passed). Then ensure the
   list covers the next **~2 weeks in advance**.

   **Rule: nothing is ever removed before its END time.** A class or window
   stays on the schedule for its full duration — an 11:00–11:45 AM class drops
   at 11:45 (not 11:00), a 9:00 AM – 1:00 PM window drops after 1:00 PM, an
   11:00 AM – 12:45 PM window drops after 12:45. Never drop something at its
   start time or at the start of its day.

   Note: the live site already auto-hides finished group classes at render time
   (`Schedule.tsx` filters `upcomingClasses` by start + duration parsed from the
   `time` range, and the page uses `export const revalidate = 900` for 15-minute
   ISR so a just-ended class doesn't linger long). This command's job
   is still to physically prune passed entries from the data and add fresh future
   ones — the render-time filter is only a between-runs safety net, and the list
   goes empty on its own if it isn't replenished.

2. **Schedule shape.** Cecily's classes only — **identify her rows by the
   instructor name in the widget**, not by weekday or time. The other instructors
   at the studio (Alex, Alexa, Alondra, Hannah, Jessica, Madison, My Linh, Sara,
   Sky, Taff) run the rest of the timetable; none of their classes belong here.

   She teaches more than one format, each with its own URL slug:
   - **Mat Pilates** — `mat-pilates-436632807869`
   - **Reformer Pilates** — `reformer-pilates-436632767675`

   The *usual* pattern — a starting expectation, not a source of truth:
   - **Saturday** — typically 11:00-11:45 AM PDT mat (`dt` at `18:00:00` UTC)
   - **Sunday** — typically 7:30-8:15 AM PDT mat (`dt` at `14:30:00` UTC)
   - **Weekdays** — she has picked up afternoon reformer blocks (e.g. Friday
     2026-08-07 ran 3:30 / 4:30 / 5:30 PM). Do not assume weekend-only; scan
     every day in the window.

   **`kClass` is NOT stable — it identifies one class instance, not the weekly
   recurrence.** Two consecutive Saturdays can carry different ids (2026-08-08
   was `18172097`; 2026-08-15 was `18417087`). Never reuse an id from another
   date, never copy last week's forward, and never guess one. Read every id off
   the live schedule for that specific date (step 3). Ids sometimes *do* repeat
   across dates (Sundays 2026-08-09 and 2026-08-16 were both `17697614`) — that
   is only ever something you confirm from the widget, never something you
   assume.

   **Times move too.** Individual dates get one-off starts (2026-08-08 ran
   7:00-7:45 AM while Saturdays either side stayed at 11:00). Take each date's
   time from the live widget rather than assuming the usual slot, and don't
   generalize a one-off into the pattern above — if a date deviates, add a brief
   comment on that entry saying it's a one-off.

   During Pacific Daylight Time the UTC offset is +7h, so 11:00 AM =
   `18:00:00Z` and 7:30 AM = `14:30:00Z`. **If any date falls in Pacific
   Standard Time (early Nov–mid Mar), the offset is +8h** — recompute the `dt`
   UTC times accordingly. Always derive `dt` from the time the widget actually
   reports for that date.

   **Afternoon classes roll over into the next UTC day, and that is correct.**
   At +7h, a 5:00 PM PDT class or later lands past midnight UTC — Cecily's
   5:30 PM Friday 2026-08-07 reformer is `dt=2026-08-08+00%3A30%3A00`. Write the
   `dt` the widget reports even though its date reads as the following day, and
   keep the human-readable `date` field on the real Pacific day ("Friday, August
   7"). `Schedule.tsx` converts the UTC instant back to California time in
   `classDate()`, so the card renders under the right day. Do **not** "fix" a
   rolled-over `dt` by decrementing it — that would point at a different class.

3. **Verify links live online** (do not just assume). Open the WellnessLiving
   studio schedule and confirm each new date's booking link. The schedule widget
   is date-navigable via a URL param:
   `https://www.wellnessliving.com/explore/locations/open-gym/us-ca-lake_forest/neaumixfit-lake_forest/?date=YYYY-MM-DDT12:00:00.000Z&page=1`
   Load it, wait a few seconds for JS, then read booking links with the browser
   `javascript_tool`. This pairs each id with its class name, time, and
   instructor by walking up a few parents and reading the row text, and reports
   the slug and the pager state:
   ```js
   await new Promise(r=>setTimeout(r,6000));
   const L=Array.from(document.querySelectorAll('a')).filter(a=>a.href&&a.href.includes('kClass'));
   ({pager:(document.body.innerText||'').replace(/\s+/g,' ').match(/Page \d+ of \d+/)?.[0],
     rows:L.map(a=>{const u=new URL(a.href);let n=a;for(let i=0;i<4&&n.parentElement;i++)n=n.parentElement;
     return {dt:u.searchParams.get('dt'),kClass:u.searchParams.get('kClass'),
     slug:u.pathname.split('/').filter(Boolean).slice(-2)[0],
     ctx:(n.innerText||'').replace(/\s+/g,' ').trim().slice(0,90)}})})
   ```
   (Full hrefs are blocked by the extension for privacy; pull `dt`/`kClass`/
   `pathname` individually as above.)

   **The widget paginates — page 1 is not the whole day.** It shows only ~5
   classes per page and the rest sit on page 2+, so a day's later classes are
   invisible to a page-1-only query. Cecily's 5:30 PM Friday reformer was on
   page 2 while the 3:30 and 4:30 were on page 1. **Always read the
   `Page N of M` marker and load every page** (`&page=2`, `&page=3`, …) before
   concluding a day has no Cecily class or that you have all of them. A day with
   no marker is a single page. Silently missing a class is the most likely way
   this command goes wrong — it produces no error, just an absent entry.

   Verify every date you write, including ones already in the file: an existing
   entry's id can be wrong or go stale.

   **If a date's booking window isn't open yet, do not add it.** Dates more than
   roughly two weeks out render with `CLOSED` instead of `BOOK` and emit **no**
   `kClass` links at all, so the query returns no rows. That is not a signal to
   fall back on a guessed id — a fabricated `kClass` 404s for whoever clicks it.
   Skip the date, and say in the summary that coverage stops short of ~2 weeks
   because booking hasn't opened, so the command can be re-run in a few days.
   `document.body.innerText` still shows the day's class list, which is a fine
   way to confirm the expected time without a bookable link.

   If Chrome isn't connected, connect it and carry on (`list_connected_browsers`,
   then `select_browser`) — don't stop and report the schedule as unverifiable.
   There is no non-browser fallback: the schedule is client-rendered, so a plain
   HTTP fetch of the page contains zero `kClass` links.

4. **Write the entries.** Each `href` follows the existing pattern, with `+` for
   the space and `%3A` for colons in `dt`:
   `.../mat-pilates-436632807869/book/?dt=2026-08-15+18%3A00%3A00&kClass=18417087`
   `.../reformer-pilates-436632767675/book/?dt=2026-08-07+22%3A30%3A00&kClass=18320965`

   Fields:
   - `date` — human-readable Pacific day, e.g. `"Saturday, August 15"`,
     `"Friday, August 7"`. The weekday here is what renders on the card, so it
     must match the real Pacific date even when `dt` has rolled over.
   - `name` — the class name exactly as the widget lists it, `"Mat Pilates"` or
     `"Reformer Pilates"`. This is the card's badge; getting it wrong labels a
     reformer class as mat.
   - `time` — the displayed range (`"11:00-11:45 AM"`, `"3:30-4:15 PM"`).
   - `location` — `"Neaumix Fit · Lake Forest"`.

   Keep the array in chronological order for readability (rendering sorts on the
   parsed start instant regardless, so several classes on one day order by time
   on their own).

   The `href` **must** keep a `dt=YYYY-MM-DD+HH%3AMM%3ASS` parameter —
   `Schedule.tsx` parses the date and start instant back out of it
   (`classDate`/`classStartMs`) to sort and auto-hide classes. A URL without a
   parseable `dt` (e.g. the `?date=…` schedule-widget link) breaks rendering, so
   it is not a usable substitute when a booking link is unavailable.

5. **Leave the Blue Moon data alone.** The Mon–Wed `blueMoonAvailability` block
   is a standing weekly schedule — do NOT edit or delete days from it, and do
   not add dated entries for those weekdays. `Schedule.tsx` projects it onto the
   real upcoming dates on its own, for every week the group classes span, so
   asking for "Monday, Tuesday, Wednesday" needs no data change at all. Finished
   weekdays drop automatically: today's day is kept until its window's **end**
   time has passed in California time (Monday 9:00 AM – 1:00 PM stays visible
   all morning and drops after 1:00 PM). So mid-morning Monday you still see
   Monday/Tuesday/Wednesday; Monday afternoon leaves Tuesday/Wednesday — and it
   resets each week on its own.

6. **Check your work, then report.** Run `npx tsc --noEmit -p tsconfig.json`.
   If you want to see it rendered, **check for a running `next dev` first**
   (`Get-CimInstance Win32_Process -Filter "Name='node.exe'"`) — `npm run build`
   and `next dev` share the `.next` directory, and building underneath a live
   dev server corrupts it into `Cannot find module` runtime errors. Either read
   the already-running dev server at localhost:3000, or stop it, and if it has
   already broken: kill it, delete `.next`, restart.

   Then show a summary table of the dates/links verified — with each date's live
   time, class name, and `kClass` — and call out any date you could not verify or
   chose to skip. Then ask whether to commit + push.
