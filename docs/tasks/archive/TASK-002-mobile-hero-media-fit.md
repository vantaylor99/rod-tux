# TASK-002: Mobile Hero Media Fit And First-Screen Legibility

- Status: DONE
- Priority: P1

## Why this matters
The hero is the first sales impression on mobile and currently wastes that space with oversized crop and weak message visibility.

## User-visible problem
The hero WebM/image composition is too large on mobile and cannot be seen properly. The first-screen message is cropped and hard to understand.

## Scope
- Improve mobile-only hero composition and visibility.
- Validate mobile media selection and fallback behavior.
- Tune sizing, fit, positioning, and CTA spacing for mobile.

## Out of scope
- Mobile drawer layering
- Desktop header transparency work
- Mid-page section spacing
- Full homepage redesign

## Likely files to touch
- `sections/hero.liquid`
- `templates/index.json`
- `assets/base.css`

## Acceptance criteria
- Mobile hero message is substantially more legible on first load.
- Primary media is visible without feeling randomly cropped.
- CTA remains visible and does not crowd the header.
- Desktop hero is not regressed.

## Implementation notes / root cause
- Relevant current config and logic:
  - `templates/index.json:150-182`
  - `sections/hero.liquid:39-118`
  - `sections/hero.liquid:533-566`
  - `sections/hero.liquid:707-715`
- Keep JSON edits minimal and only where required by the fix.

## QA checklist
- Test at `390x844` and one additional narrow mobile width if possible.
- Check first-load hero, scroll behavior, and CTA visibility.
- Re-open homepage after hot reload to confirm stable render.
- Check desktop once after changes.

## Implementation log
- Claimed by Codex on 2026-03-26.
- Confirmed in Playwright that mobile was rendering a `390x481` first hero with an aggressively cropped media treatment and the CTA sitting low because empty hero blocks were still consuming layout space.
- Confirmed the homepage hero is configured with `custom_mobile_media: true` and mobile media types set to images, but no explicit mobile image assets are saved in `templates/index.json`, so mobile fallback behavior had to be handled in the section logic rather than by adding unrelated theme-editor data.
- Updated `sections/hero.liquid` so mobile image fallback can safely reference the desktop image asset when the merchant has configured mobile image slots but left them empty, and strengthened the mobile wrapper visibility rules so desktop/mobile hero wrappers respect the intended breakpoint behavior even with downstream CSS overrides.
- Updated `assets/base.css` with a homepage/mobile-only hero treatment that:
  - collapses empty hero group/marquee blocks so they stop pushing the CTA down,
  - anchors the CTA at the bottom of the hero content stack,
  - constrains the first hero to a shorter mobile first-screen height,
  - and uses a contained desktop hero video presentation on mobile for the homepage hero so the “Wrap Your Rod” composition is visible instead of being randomly cropped.

## Files touched
- `sections/hero.liquid`
- `assets/base.css`
- `docs/tasks/QUEUE.md`
- `docs/tasks/TASK-002-mobile-hero-media-fit.md`

## Testing / QA notes
- Verified on `http://127.0.0.1:9292/` with MCP Playwright.
- Reproduced the original issue at `390x844`:
  - hero rendered at `390x481`,
  - media was a cropped video,
  - the CTA sat deep in the frame,
  - and empty hero blocks/marquee were still occupying space.
- Re-tested at `390x844` after the fix:
  - hero container height dropped to `416px`,
  - empty hero group and empty marquee both computed to `display: none`,
  - hero content wrapper computed `justify-content: flex-end`,
  - desktop hero wrapper was intentionally shown for this homepage hero on mobile,
  - mobile wrapper was hidden,
  - and the visible media computed `object-fit: contain` with a top-aligned composition.
- Re-tested at `360x800`:
  - hero remained `416px` tall,
  - CTA remained fully visible and clear of the header,
  - and the “Wrap Your Rod” composition remained substantially more readable than before.
- Re-opened the homepage after hot reload to confirm stable rendering.
- Checked desktop at `1280x900`:
  - desktop hero still used its normal desktop media behavior (`object-fit: cover` / bottom-weighted positioning from the existing desktop layer),
  - so no desktop regression was introduced by the mobile-only homepage rules.
- Observed only expected preview noise in console: blocked `shop.app` frame/CSP noise and transient Shopify hot-reload reconnect messages.

## Acceptance criteria
- [x] Mobile hero message is substantially more legible on first load.
- [x] Primary media is visible without feeling randomly cropped.
- [x] CTA remains visible and does not crowd the header.
- [x] Desktop hero is not regressed.

## Remaining risks
- The homepage hero still relies on the desktop transparent video because no explicit mobile hero image assets are currently saved in the homepage JSON; the section now handles that fallback more safely, but if curated mobile assets are added later they should be revalidated against this mobile-only hero treatment.

## Handoff notes for the next agent
- After this task, `TASK-003` and `TASK-004` become safer because hero/mobile behavior will be more stable.
