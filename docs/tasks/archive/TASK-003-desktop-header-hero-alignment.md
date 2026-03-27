# TASK-003: Desktop Header Transparency And Hero Top-Edge Alignment

- Status: DONE
- Priority: P1

## Why this matters
The desktop homepage should feel polished and premium. Right now the header and hero are visually disconnected.

## User-visible problem
On desktop, the background image does not reach the very top of the screen. The hero should tuck behind the nav bar, and the nav/hero relationship should look intentional.

## Scope
- Reconcile transparent/sticky header behavior with the homepage hero.
- Align top-edge background behavior with the owner request.
- Ensure desktop hero media is not obscured by nav or CTA after the overlay behavior is corrected.

## Out of scope
- Mobile drawer fixes
- Mobile hero composition
- Mid-page spacing cleanup unless strictly required for regression prevention

## Likely files to touch
- `sections/header-group.json`
- `sections/header.liquid`
- `sections/hero.liquid`
- `assets/base.css`
- `assets/desktop-optimizations.css`

## Acceptance criteria
- Desktop hero/background reaches the top of the viewport behind the nav.
- Header appears intentionally over the hero rather than detached above it.
- Hero media remains readable and important content is not hidden by nav/buttons.
- Sticky behavior still functions.

## Implementation notes / root cause
- Relevant code:
  - `sections/header-group.json:66-80`
  - `sections/header.liquid:17-44`
  - `assets/base.css:995-1007`
  - `assets/desktop-optimizations.css:40-98`

## QA checklist
- Test desktop at `1440x1200`.
- Check initial load and after scrolling enough to trigger condensed/sticky behavior.
- Confirm hero CTA and media remain visible.
- Confirm header does not create new overlap bugs.

## Implementation log
- Claimed by Codex on 2026-03-26.
- Confirmed in Playwright at `1440x1200` that the homepage header was not in the transparent-home path (`transparent` attribute missing), and the hero started `99.375px` below the top of the viewport instead of continuing behind the nav.
- Re-enabled homepage transparent header behavior in `sections/header-group.json`.
- Updated `assets/desktop-optimizations.css` with a desktop-only transparent-home offset for the first hero content wrapper so the hero background reaches the top behind the nav while CTA/content stay clear of the overlaid header during initial and sticky/condensed states.

## Files touched
- `sections/header-group.json`
- `assets/desktop-optimizations.css`
- `docs/tasks/QUEUE.md`
- `docs/tasks/TASK-003-desktop-header-hero-alignment.md`

## Testing / QA notes
- Verified on `http://127.0.0.1:9292/` with MCP Playwright at `1440x1200`.
- Reproduced the original problem before the fix:
  - homepage header had no transparent-home state,
  - first main section started at `99.375px`,
  - hero also started at `99.375px`,
  - and the nav/hero relationship read as detached instead of layered.
- Re-tested after the fix on initial load:
  - header rendered with `transparent="not-sticky"` and `sticky="always"`,
  - first main section top became `0`,
  - hero top became `0`,
  - hero content wrapper picked up desktop transparent offset padding (`123px` computed in preview),
  - and the CTA stayed well below the header (`ctaUnderHeader: false`).
- Re-tested after scrolling far enough to trigger condensed/sticky behavior:
  - `stickyState` became `active`,
  - `data-condensed` became `true`,
  - condensed header remained over the hero,
  - and the CTA still remained below the nav with no new overlap bug.
- Observed only expected preview noise in console: blocked `shop.app` frame/CSP noise and transient Shopify hot-reload reconnect messages.

## Acceptance criteria
- [x] Desktop hero/background reaches the top of the viewport behind the nav.
- [x] Header appears intentionally over the hero rather than detached above it.
- [x] Hero media remains readable and important content is not hidden by nav/buttons.
- [x] Sticky behavior still functions.

## Remaining risks
- The desktop hero still depends on the existing broad hero-media rules in `assets/desktop-optimizations.css`, so any future rework to the first-hero video framing should be revalidated together with this transparent-header overlay rather than changed independently.

## Handoff notes for the next agent
- Once this is done, the homepage should have a much stronger above-the-fold structure. Next move is section spacing cleanup in `TASK-004`.
