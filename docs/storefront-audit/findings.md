# Findings

Priority order is based on storefront risk, user impact, and how directly the issue blocks shopping.

## 1. Mobile drawer opens behind hero content instead of above the page
- Severity: Critical
- Affected viewport(s): Mobile
- Symptom: Opening the hamburger menu shows only a shallow drawer shell near the top while the hero image/video and CTA remain visually and interactively in front of it. In Playwright, points inside the visible drawer area still resolve to hero elements underneath.
- Business/UX impact: Navigation becomes unreliable on mobile, which directly blocks browsing, product discovery, and conversion.
- Likely root cause:
  - Header is heavily restyled inline in `sections/header.liquid`, including custom floating card styling and stacking behavior.
  - The drawer itself is fixed and intended to sit on a high layer, but the customized header/homepage layering is breaking the expected stacking order.
  - Homepage hero still receives hit-testing in the open-drawer area, confirming a real z-index/stacking context problem rather than a cosmetic issue alone.
- Likely files:
  - `sections/header.liquid:303-388`
  - `sections/header.liquid:1214-1353`
  - `snippets/header-drawer.liquid:822-883`
  - `assets/header-drawer.js:69-88`
  - `assets/base.css:995-1007`
- Confidence level: High
- Recommended fix direction:
  - Make drawer layering authoritative again before other mobile polish work.
  - Reduce or isolate custom header stacking/condensed overrides so the drawer/backdrop can sit above hero and page content.
  - Re-test hit targets with the menu open, not just visual appearance.

## 2. Desktop header is not tucked over the hero; hero starts below the nav
- Severity: High
- Affected viewport(s): Desktop
- Symptom: The homepage hero begins below the floating nav card, leaving a visible top gap. The owner expectation is that the background should continue behind the nav.
- Business/UX impact: The above-the-fold experience looks unfinished and less premium than a polished ecommerce storefront.
- Likely root cause:
  - Transparent header on home is disabled in section settings.
  - The theme already has transparent-header support, but the homepage is configured to use a standard compact header instead.
- Likely files:
  - `sections/header-group.json:66-80`
  - `sections/header.liquid:17-26`
  - `assets/base.css:995-1007`
  - `layout/theme.liquid:72-95`
- Confidence level: High
- Recommended fix direction:
  - Re-enable transparent-home header behavior deliberately and then adjust hero offset/padding so the nav overlays the hero without obscuring important content.

## 3. Desktop hero media layout is being forced by conflicting custom overrides
- Severity: High
- Affected viewport(s): Desktop
- Symptom: The hero uses a separate header above it today, but custom CSS is already trying to push the first hero video lower, center it, and protect it from gradient overlap. This creates fragile behavior and will likely break once the header is made transparent as requested.
- Business/UX impact: The storefront hero is the primary brand/sales surface. Fragile layout rules here make regressions likely and slow future iteration.
- Likely root cause:
  - `assets/desktop-optimizations.css` overrides the hero media fitting, gradient, and section spacing independently of the base hero implementation.
  - The first hero is further special-cased by `first-of-type` selectors, which tightly couples homepage rendering to document order.
- Likely files:
  - `assets/desktop-optimizations.css:7-128`
  - `sections/hero.liquid:474-566`
  - `sections/hero.liquid:624-725`
  - `templates/index.json:150-182`
- Confidence level: High
- Recommended fix direction:
  - Consolidate hero behavior into a clearer single source of truth.
  - Remove or reduce order-dependent overrides and tune the hero against the intended transparent/sticky header state.

## 4. Mobile hero crops the message and media too aggressively
- Severity: High
- Affected viewport(s): Mobile
- Symptom: The mobile hero fills the full 390x481 hero area with oversized cropped media. The “Wrap Your Rod” message is mostly cut off, and the header/menu area crowds the composition.
- Business/UX impact: The first impression is hard to parse, weakening product understanding and reducing CTA clarity on the highest-risk viewport.
- Likely root cause:
  - Homepage hero uses desktop transparent video in slot 1 while mobile is configured to use images, but the mobile composition is still constrained by the current hero container sizing and homepage-specific overrides.
  - The hero section is using `section_height = large`, custom mobile media, and `stack_media_on_mobile = true`, but the current CSS still produces a tightly cropped composition.
- Likely files:
  - `templates/index.json:151-181`
  - `sections/hero.liquid:39-118`
  - `sections/hero.liquid:533-566`
  - `sections/hero.liquid:707-715`
  - `assets/desktop-optimizations.css:7-25`
- Confidence level: Medium-High
- Recommended fix direction:
  - Rebalance the mobile hero independently from desktop.
  - Validate whether the correct mobile assets are being used, then tune height, object-fit/object-position, content spacing, and overlay behavior for legibility first.

## 5. Feature/guarantee area feels clipped and compressed, especially on mobile
- Severity: Medium-High
- Affected viewport(s): Mobile, some desktop polish impact
- Symptom: In the “Why Rodtux” / guarantee area, the first card’s visual/title treatment feels cut off and the second card is cramped. The owner-reported “Perfect Fit Guarantee” issue is consistent with the current stacked card layout.
- Business/UX impact: Key trust content looks lower quality and harder to scan, which weakens confidence in the product.
- Likely root cause:
  - Strong homepage-specific card styling with `overflow: hidden`, large absolute-positioned text, and dense stacked spacing.
  - The feature grid section depends on the generic section renderer plus homepage-only CSS, so small spacing mismatches cascade quickly.
- Likely files:
  - `templates/index.json:283-478`
  - `assets/base.css:4997-5090`
  - `sections/section.liquid`
- Confidence level: Medium
- Recommended fix direction:
  - Treat this as a section-spacing/card-layout task, not a header task.
  - Rework mobile card heights, padding, and internal alignment before touching unrelated homepage sections.

## 6. “What you need to know” visually blends into neighboring sections
- Severity: Medium
- Affected viewport(s): Both, stronger on desktop
- Symptom: The “What you need to know” accordion block sits directly between neighboring cards with almost no visual reset. It reads as part of the surrounding white-card stack instead of as a distinct informational section.
- Business/UX impact: Information hierarchy is weak, making the homepage feel less intentional and less premium.
- Likely root cause:
  - Zero inter-section spacing between homepage sections.
  - Similar translucent white card treatments are reused across consecutive sections.
  - The accordion container styling is subtle relative to adjacent cards.
- Likely files:
  - `assets/base.css:5110-5135`
  - `assets/base.css:4962-4969`
  - `templates/index.json:972-1175`
- Confidence level: High
- Recommended fix direction:
  - Introduce deliberate section rhythm and stronger separation, not just local accordion tweaks.
  - Adjust spacing, background contrast, and border/shadow repetition so each section reads distinctly.

## 7. Homepage sections are chained together with zero section gaps
- Severity: Medium
- Affected viewport(s): Both
- Symptom: Every major homepage section currently begins exactly where the previous one ends. That makes the page read like one long continuous block despite multiple different content intents.
- Business/UX impact: The homepage feels crowded and less polished than common ecommerce landing pages.
- Likely root cause:
  - Section-level spacing is being handled almost entirely inside each section card rather than between sections.
  - Homepage-specific CSS removes background differences while keeping the same overall page canvas.
- Likely files:
  - `assets/base.css:4962-5290`
  - `templates/index.json:3223-3234`
- Confidence level: High
- Recommended fix direction:
  - Add intentional vertical rhythm between major homepage sections and define clearer transitions between product, trust, FAQ, reviews, and CTA content.

## 8. Header section currently contains an unstable high-risk customization surface
- Severity: Medium
- Affected viewport(s): Both
- Symptom: The local dev log shows recent upload failures for `sections/header.liquid` due to Liquid syntax issues during active header iteration. The current file contains a corrected data attribute, but this area remains especially fragile.
- Business/UX impact: Header work is already unstable; hot reload and future edits can fail unexpectedly.
- Likely root cause:
  - Header has been iterated heavily and now mixes theme defaults, custom data attributes, and large inline styles/scripts.
- Likely files:
  - `sections/header.liquid:303-307`
  - `theme-dev.log`
- Confidence level: High
- Recommended fix direction:
  - Keep header implementation work tightly scoped.
  - Validate Liquid syntax after each header change before moving on to visual QA.

## 9. Homepage customization is spread across too many layers for safe iteration
- Severity: Medium
- Affected viewport(s): Both
- Symptom: Homepage behavior is controlled by JSON section settings, generic section rendering, large homepage-specific `base.css` overrides, a second `desktop-optimizations.css` layer, inline header styles, and custom header scripts.
- Business/UX impact: Future changes are slower, more error-prone, and more likely to create duplicate work across agents.
- Likely root cause:
  - Custom storefront styling was layered onto theme primitives rather than consolidated around a smaller set of components.
- Likely files:
  - `templates/index.json`
  - `assets/base.css`
  - `assets/desktop-optimizations.css`
  - `sections/header.liquid`
  - `sections/hero.liquid`
- Confidence level: High
- Recommended fix direction:
  - Use the task queue below to serialize work and keep each implementation pass constrained to one problem area.

