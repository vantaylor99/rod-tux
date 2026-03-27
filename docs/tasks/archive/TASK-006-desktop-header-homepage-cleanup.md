# TASK-006: Desktop Header And Homepage Visual Cleanup

- Status: DONE
- Priority: P1

## Why this matters
The homepage currently has several visible desktop regressions that make the storefront feel broken instead of polished.

## User-visible problem
- Condensed desktop header can show duplicate account/profile icons.
- Desktop hero shows a large gray band and a stray background image while the intended WebM treatment reads too small.
- Featured product media on the left feels disproportionately large relative to the rest of the page.
- The "Why Rodtux" image card still has excess white space above and below the rod.
- A visible line appears where the footer begins.

## Scope
- Fix the duplicate icon issue in the desktop header.
- Restore a coherent desktop hero presentation so the intended media is readable and stray background artifacts are removed.
- Rebalance the featured product media scale on desktop.
- Tighten the "Why Rodtux" image card framing.
- Remove the visible footer seam/line.

## Out of scope
- Mobile drawer behavior unless a regression is introduced while fixing shared header code
- New homepage sections or content
- Product page, collection page, or footer redesign beyond the visible seam fix

## Likely files to touch
- `assets/base.css`
- `assets/desktop-optimizations.css`
- `sections/header.liquid`
- `sections/hero.liquid`
- `sections/featured-product.liquid`

## Acceptance criteria
- Desktop nav no longer shows duplicate profile/account icons in the reduced header state.
- Desktop hero no longer shows the large gray band or stray background asset, and the primary hero media reads intentionally.
- Featured product media feels proportionate to the adjacent copy on desktop.
- "Why Rodtux" image card no longer has obvious extra white space above/below the rod.
- Footer seam is no longer visible.

## QA checklist
- Re-test homepage on desktop after changes.
- Re-check mobile header/drawer quickly for regression.
- Confirm no new horizontal overflow.

## Implementation log
- Claimed by Codex on 2026-03-26.
- Confirmed in Playwright that the condensed desktop header showed both `.account-popover` and `.account-drawer` at the same time, which produced the duplicate profile icons.
- Confirmed the desktop homepage hero was rendering its background image layer behind an undersized WebM, which created the gray/stray-image look and made the primary media feel tiny.
- Confirmed the featured product media block and the "Why Rodtux" image block were both over-allocating vertical space on desktop.
- Confirmed the footer seam was coming from the footer utilities divider line.
- Updated `sections/header.liquid` so the desktop condensed state keeps the account drawer hidden and only shows one account control.
- Updated `assets/desktop-optimizations.css` to remove the desktop homepage hero background layer, enlarge the first-home hero WebM, and reduce the heavy white fade treatment so the hero reads intentionally.
- Updated `sections/featured-product.liquid` to reduce the desktop featured media column emphasis and constrain the product image more tightly.
- Updated `assets/base.css` to tighten the desktop "Why Rodtux" image card framing.
- Updated `sections/footer-utilities.liquid` to remove the visible divider seam at the footer start.

## Files touched
- `sections/header.liquid`
- `assets/desktop-optimizations.css`
- `sections/featured-product.liquid`
- `assets/base.css`
- `sections/footer-utilities.liquid`
- `docs/tasks/QUEUE.md`
- `docs/tasks/TASK-006-desktop-header-homepage-cleanup.md`

## Testing / QA notes
- Verified on `http://127.0.0.1:9292/` with MCP Playwright at `2048x935`:
  - homepage hero background layer computed to `display: none`,
  - the hero video expanded from a tiny asset-sized box to roughly `1344x756`,
  - the hero kept no horizontal overflow,
  - the featured product media reduced from roughly `928x480` inside a `1060px` card to roughly `672x320` inside a `925px` card,
  - the "Why Rodtux" image now uses more of its card height with tighter top/bottom whitespace,
  - and the footer utilities border-top computed to `0px none`.
- Verified the condensed desktop header after scroll:
  - `data-condensed="true"` and `data-sticky-state="active"` still worked,
  - and only one account control remained visible in the right header cluster.
- Re-tested mobile at `390x844`:
  - mobile menu still opened above the page,
  - hit-testing inside the drawer still returned menu content,
  - and there was no new horizontal overflow.
- Observed only expected preview noise in console: blocked `shop.app` frame/CSP noise, missing local `favicon.ico`, and transient Shopify hot-reload reconnect messages.

## Acceptance criteria
- [x] Desktop nav no longer shows duplicate profile/account icons in the reduced header state.
- [x] Desktop hero no longer shows the large gray band or stray background asset, and the primary hero media reads intentionally.
- [x] Featured product media feels proportionate to the adjacent copy on desktop.
- [x] "Why Rodtux" image card no longer has obvious extra white space above/below the rod.
- [x] Footer seam is no longer visible.

## Remaining risks
- The first-home desktop hero now relies on homepage-specific overrides in `assets/desktop-optimizations.css`, so if the hero media source or transparent-header treatment changes again later, that hero should be revalidated as a unit rather than tuned piecemeal.
