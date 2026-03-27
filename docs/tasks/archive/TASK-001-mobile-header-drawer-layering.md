# TASK-001: Mobile Header Drawer Layering And Menu Clipping

- Status: DONE
- Priority: P1

## Why this matters
Mobile visitors need reliable navigation before any other homepage optimization can matter.

## User-visible problem
The hamburger menu opens, but the drawer appears behind hero content and does not behave like a real overlay.

## Scope
- Fix mobile drawer layering, visibility, and interaction behavior.
- Ensure the open menu visually covers the page content it is supposed to cover.
- Ensure taps inside the open menu hit menu content, not underlying hero elements.
- Preserve existing menu links and general header feature set.

## Out of scope
- Hero composition improvements
- Desktop transparent-header work
- Mid-page homepage spacing cleanup
- Footer or non-header redesign

## Likely files to touch
- `sections/header.liquid`
- `snippets/header-drawer.liquid`
- `assets/header-drawer.js`
- `assets/header.js`
- `assets/base.css`

## Acceptance criteria
- On mobile, tapping the hamburger opens a drawer that appears above hero/page content.
- Hero CTA and hero media are no longer visually or interactively in front of the drawer.
- Drawer close behavior still works.
- Navigation links remain accessible and readable.
- No new Liquid syntax errors are introduced in header files.

## Implementation notes / root cause
- Audit evidence points to custom header stacking overrides colliding with the theme drawer layer.
- See:
  - `sections/header.liquid:303-388`
  - `sections/header.liquid:1214-1353`
  - `snippets/header-drawer.liquid:822-883`
  - `assets/header-drawer.js:69-88`
  - `assets/base.css:995-1007`

## QA checklist
- Test mobile viewport around `390x844`.
- Open hamburger from top of homepage.
- Confirm menu content sits above hero visually.
- Confirm menu links are tappable.
- Confirm close button works.
- Confirm no console errors beyond existing Shopify preview/CSP noise.

## Implementation log
- Claimed by Codex on 2026-03-26.
- Root cause confirmed in Playwright: the custom mobile header row was clipping the drawer and acting as its containing block, so hit-tests inside the open menu still resolved to hero content underneath.
- Updated `assets/header-drawer.js` to toggle a drawer-open state class on the top header row only while the main mobile drawer is open.
- Updated `sections/header.liquid` mobile styles so the top row temporarily drops clipping and `backdrop-filter` while the drawer is open, allowing the existing fixed drawer to attach to the viewport and overlay page content correctly.

## Files touched
- `assets/header-drawer.js`
- `sections/header.liquid`
- `docs/tasks/QUEUE.md`
- `docs/tasks/TASK-001-mobile-header-drawer-layering.md`

## Testing / QA notes
- Verified on `http://127.0.0.1:9292/` at `390x844` with MCP Playwright.
- Reproduced the original bug before the fix: after opening the menu, `document.elementFromPoint(...)` inside the visible drawer area returned `.hero__container`, confirming hero content was still in front interactively.
- Re-tested after the fix: with the drawer open, the row gained the temporary open-state class, computed `overflow` became `visible`, computed `backdrop-filter` became `none`, and the drawer rect moved to viewport origin (`top: 0`, `left: 0`).
- Confirmed post-fix hit-testing inside the open drawer returned menu elements (`.menu-drawer__menu-item-text`, `.menu-drawer__navigation`) instead of hero content.
- Confirmed the close button works and restores the original header row glass styling/state.
- Confirmed tapping the `Catalog` link from the open mobile drawer navigates to `/collections/all`, demonstrating menu content is tappable above page content.
- Observed only expected preview noise in console: missing `favicon.ico`, blocked `shop.app` frame/CSP noise, and transient Shopify hot-reload reconnect messages.

## Acceptance criteria
- [x] On mobile, tapping the hamburger opens a drawer that appears above hero/page content.
- [x] Hero CTA and hero media are no longer visually or interactively in front of the drawer.
- [x] Drawer close behavior still works.
- [x] Navigation links remain accessible and readable.
- [x] No new Liquid syntax errors were introduced in header files during preview sync.

## Remaining risks
- The fix intentionally scopes the glass-effect override to mobile open-drawer state only; if future header redesign work changes the row structure again, this drawer-open class should be revalidated as part of that later task rather than expanded here.

## Handoff notes for the next agent
- After this task is done, move to `TASK-002` unless the task file documents a blocker that changes priority.
