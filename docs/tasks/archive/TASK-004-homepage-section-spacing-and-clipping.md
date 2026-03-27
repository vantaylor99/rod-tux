# TASK-004: Homepage Section Spacing And Content Clipping Cleanup

- Status: DONE
- Priority: P2

## Why this matters
Several homepage sections currently read like one continuous stack, and trust/FAQ content does not feel cleanly separated.

## User-visible problem
- “Perfect Fit Guarantee” area feels clipped/compressed.
- “What you need to know” visually combines with neighboring sections.
- Section rhythm is weak across the homepage.

## Scope
- Improve spacing and separation between homepage sections.
- Clean up clipping/compression in the feature/guarantee area.
- Strengthen FAQ/accordion section separation from adjacent blocks.

## Out of scope
- Drawer layering
- Mobile hero media fit
- Desktop transparent header behavior
- Net-new homepage content

## Likely files to touch
- `templates/index.json`
- `assets/base.css`
- `sections/section.liquid`
- `sections/featured-product.liquid`

## Acceptance criteria
- “Why Rodtux” / guarantee content no longer feels cut off.
- “What you need to know” reads as its own section.
- Homepage gains clearer vertical rhythm between major content groups.
- No unrelated section styles are destabilized.

## Implementation notes / root cause
- Strong homepage-specific overrides currently live in `assets/base.css:4997-5290`.
- Keep Shopify-generated JSON edits minimal and focused.

## QA checklist
- Review both desktop and mobile homepage after changes.
- Check feature grid, FAQ, trust strip, reviews, and “How it Works”.
- Confirm there is no new horizontal overflow.

## Implementation log
- Claimed by Codex on 2026-03-26.
- Confirmed in Playwright that the homepage major sections were stacked with effectively zero vertical separation on both mobile and desktop, so trust, FAQ, reviews, and "How it Works" read like one continuous block.
- Confirmed the "Perfect Fit Guarantee" card had a real mobile clipping bug: the guarantee copy extended below the card while the card shell remained `overflow: hidden`.
- Updated `assets/base.css` to add homepage-only section spacing between the major homepage content groups.
- Updated `assets/base.css` with a mobile-only feature-grid override so the guarantee card stops using fill-height behavior on stacked layouts, aligns content from the top, and fully contains its copy.
- Slightly increased the FAQ shell separation on mobile through the homepage-specific `assets/base.css` styling already used for this task.

## Files touched
- `assets/base.css`
- `docs/tasks/QUEUE.md`
- `docs/tasks/TASK-004-homepage-section-spacing-and-clipping.md`

## Testing / QA notes
- Verified on `http://127.0.0.1:9292/` with MCP Playwright at `390x844`.
- Reproduced the original problem before the fix:
  - `__section_feature_grid`, `__section_wnk`, `__section_trust`, `__section_reviews`, and `__section_how` all had `gapToNext` effectively `0`,
  - the guarantee card content shell used `overflow: hidden`,
  - and the final guarantee copy rendered below the card's bottom edge on mobile.
- Re-tested after the fix at `390x844`:
  - the guarantee card computed to `flex: 0 0 auto`,
  - the card height expanded to fit its content (`551.743px` in preview),
  - the final guarantee paragraph bottom matched the content bottom instead of extending below the shell,
  - and homepage section gaps measured at roughly `35px` between the major mobile sections.
- Verified there was still no new horizontal overflow on mobile (`document.body.scrollWidth - window.innerWidth` stayed negative in preview).
- Verified on `http://127.0.0.1:9292/` with MCP Playwright at `1440x1200`:
  - homepage gaps between the featured product, feature grid, FAQ, trust, reviews, "How it Works", and social sections measured at roughly `76px`,
  - and the desktop "Why Rodtux" feature-grid cards remained side by side at matched heights.
- Observed only expected preview noise in console: blocked `shop.app` frame/CSP noise and transient Shopify hot-reload reconnect messages.

## Acceptance criteria
- [x] "Why Rodtux" / guarantee content no longer feels cut off.
- [x] "What you need to know" reads as its own section.
- [x] Homepage gains clearer vertical rhythm between major content groups.
- [x] No unrelated section styles are destabilized.

## Remaining risks
- The homepage spacing is intentionally implemented with homepage-specific ID targeting in `assets/base.css`, so if the homepage section order or section IDs change in Shopify later, this spacing rhythm should be revalidated instead of assumed.

## Handoff notes for the next agent
- After this task, the remaining work should mostly be a regression/polish pass in `TASK-005`.
