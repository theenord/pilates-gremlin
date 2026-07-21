---
description: Refresh the weekend class schedule — drop past classes, add ~2 weeks ahead, verify links live
---

Update the Neaumix Fit weekend mat classes in `app/site-data.ts` (the
`upcomingClasses` array). Do the following:

1. **Determine the window.** Use today's date. Remove every dated entry in
   `upcomingClasses` whose class date is on or before today — **regardless of
   weekday** (weekend or weekday, drop anything that has passed). Then ensure the
   list covers the next **~2 weeks in advance**. Neaumix currently runs
   weekend-only, but if weekday dated classes exist, the same drop-when-passed
   rule applies to them.

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

2. **Schedule shape.** Neaumix Fit weekend classes only:
   - **Saturday** — 11:00-11:45 AM PDT (`kClass=18172097`, `dt` at `18:00:00` UTC)
   - **Sunday** — 7:30-8:15 AM PDT (`kClass=17697614`, `dt` at `14:30:00` UTC)

   `kClass` is a stable recurring-class ID (same value every week for that
   weekday). During Pacific Daylight Time the UTC offset is +7h, so 11:00 AM =
   `18:00:00Z` and 7:30 AM = `14:30:00Z`. **If any date falls in Pacific
   Standard Time (early Nov–mid Mar), the offset is +8h** — recompute the `dt`
   UTC times accordingly.

3. **Verify links live online** (do not just assume). Open the WellnessLiving
   studio schedule and confirm each new date's booking link. The schedule widget
   is date-navigable via a URL param:
   `https://www.wellnessliving.com/explore/locations/open-gym/us-ca-lake_forest/neaumixfit-lake_forest/?date=YYYY-MM-DDT12:00:00.000Z&page=1`
   Load it, wait a few seconds for JS, then read booking links with the browser
   `javascript_tool`:
   ```js
   Array.from(document.querySelectorAll('a')).filter(a=>a.href&&a.href.includes('kClass')).map(a=>{const u=new URL(a.href);return {dt:u.searchParams.get('dt'),kClass:u.searchParams.get('kClass')}})
   ```
   (Full hrefs are blocked by the extension for privacy; pull `dt`/`kClass`
   individually as above.) Confirm the Saturday `kClass` and Sunday `kClass`
   still match before writing them.

4. **Write the entries.** Each `href` follows the existing pattern, with `+` for
   the space and `%3A` for colons in `dt`:
   `.../mat-pilates-436632807869/book/?dt=2026-08-01+18%3A00%3A00&kClass=18172097`
   `date` is human-readable, e.g. `"Saturday, August 1"`. `time` is the range
   (`"11:00-11:45 AM"` / `"7:30-8:15 AM"`). `location` is
   `"Neaumix Fit · Lake Forest"`.

5. **Leave the Blue Moon data alone.** The Mon–Wed `blueMoonAvailability` block
   is a standing weekly schedule — do NOT edit or delete days from it. Finished
   weekdays are dropped automatically at render time: `Schedule.tsx` computes the
   real upcoming dates for each Blue Moon weekday, and today's day is kept until
   its window's **end** time has passed in California time (Monday 9:00 AM –
   1:00 PM stays visible all morning and drops after 1:00 PM). So mid-morning
   Monday you still see Monday/Tuesday/Wednesday; Monday afternoon leaves
   Tuesday/Wednesday — and it resets each week on its own.

6. When done, show a summary table of the dates/links verified and ask whether
   to commit + push.
