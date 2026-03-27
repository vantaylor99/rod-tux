# Mobile Homepage Audit

Viewport tested: `390x844`

## Header
- The mobile header is compact and visible, but the hamburger menu implementation is currently the most urgent issue on the site.
- When opened, the drawer shell appears, but the hero remains in front visually and interactively.
- Playwright hit-testing inside the open menu area still returned `.hero__container` and the hero CTA instead of menu content.
- Relevant code:
  - `sections/header.liquid:303-388`
  - `sections/header.liquid:1328-1353`
  - `snippets/header-drawer.liquid:822-883`
  - `assets/header-drawer.js:69-88`

## Hero
- The hero is too large and too cropped on mobile.
- The “Wrap Your Rod” composition is mostly cut off, so the first screen reads more like a background crop than a strong sales message.
- Header and hero feel crowded together.
- The hero occupies `390x481` at this viewport, which is large relative to the amount of usable message visible.
- Relevant code:
  - `templates/index.json:150-182`
  - `sections/hero.liquid:39-118`
  - `sections/hero.liquid:707-715`

## Featured Product
- Product information remains usable, but the section is very long on mobile and arrives immediately after the oversized hero.
- This contributes to a heavy, top-loaded experience.

## Why Rodtux / Guarantee
- This area is the weakest mid-page section on mobile.
- The first card image/title treatment feels clipped.
- The second card’s stacked trust items feel compressed and not comfortably spaced.
- This matches the owner report that the “Perfect Fit Guarantee” section is cut off.
- Relevant code:
  - `templates/index.json:283-971`
  - `assets/base.css:4997-5090`

## What You Need To Know
- The accordion block is too visually close to the sections around it.
- On mobile it reads like part of one tall white stack instead of a distinct FAQ/info section.
- Relevant code:
  - `templates/index.json:972-1175`
  - `assets/base.css:5110-5135`

## Trust / Reviews / How It Works
- Reviews remain readable, but the page is still dense because every section touches the next.
- “How It Works” step cards are very tall and airy relative to their content, producing unnecessary scroll cost.
- Relevant code:
  - `assets/base.css:5138-5241`
  - `assets/desktop-optimizations.css` is desktop-focused, so mobile cleanup likely belongs in `base.css` or section styles rather than there.

## Footer / CTA
- Final CTA works, but the footer becomes small and visually weak after a long scroll.
- Lower priority than fixing mobile navigation and hero.

## Mobile Summary
- Most urgent mobile issue: the drawer must become a true overlay above the page.
- Second mobile issue: the hero needs a dedicated mobile composition with better visibility and less crop.
- Third mobile issue: mid-page sections need spacing and card-height cleanup so the homepage feels intentional rather than compressed.

