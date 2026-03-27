# Desktop Homepage Audit

Viewport tested: `1440x1200`

## Header
- The header renders as a compact white floating pill above the hero instead of overlaying the hero.
- There is visible whitespace between the top of the viewport and the start of the hero composition.
- This conflicts with the intended polished ecommerce look and with the owner request that the background image tuck behind the nav.
- Relevant code:
  - `sections/header-group.json:66-80`
  - `sections/header.liquid:17-26`
  - `assets/base.css:995-1007`

## Hero
- The hero is visually strong, but it is being managed by layered overrides rather than a clean component configuration.
- The transparent WebM, background image, gradient, CTA placement, and header relationship are all coupled.
- Current render shows the nav above the hero, not integrated with it.
- The first hero has custom `first-of-type` CSS in `assets/desktop-optimizations.css`, which is brittle if homepage order changes.
- Relevant code:
  - `templates/index.json:150-182`
  - `sections/hero.liquid:474-566`
  - `sections/hero.liquid:624-725`
  - `assets/desktop-optimizations.css:40-98`

## Featured Product
- The product card reads clearly, but it begins immediately after the hero with no section break.
- The section itself looks usable, but it inherits the homepage-wide “one continuous stack” issue.

## Why Rodtux / Guarantee
- The first card has a dramatic image treatment; the second card contains the trust promises.
- The section is serviceable on desktop, but the trust card feels tight for the amount of copy and looks like it was sized to fit a custom aesthetic first and content second.
- This section also transitions directly into the FAQ block without enough visual reset.
- Relevant code:
  - `templates/index.json:283-971`
  - `assets/base.css:4997-5090`

## What You Need To Know
- The accordion content appears visually attached to the sections above and below it because the backgrounds, borders, and spacing are too similar.
- The section title is present, but the block lacks enough separation from the adjacent cards.
- Relevant code:
  - `templates/index.json:972-1175`
  - `assets/base.css:5110-5135`

## Trust Bar
- The icons and copy are readable, but the row is very compressed and visually slight relative to the neighboring sections.
- Because there is no inter-section spacing, it functions more like a continuation of the FAQ block than a standalone reassurance band.

## Reviews
- Reviews are readable and fit a standard ecommerce trust pattern.
- The section works better than most of the homepage, though it still inherits the page-wide lack of spacing rhythm.
- Relevant code:
  - `templates/index.json:1454-2244`
  - `assets/base.css:5138-5180`
  - `assets/desktop-optimizations.css:275-311`

## How It Works
- The heading is clear, but the step cards are visually sparse and their imagery feels under-filled at desktop.
- The section is functional, though not especially polished yet.
- Relevant code:
  - `templates/index.json:2245-2587`
  - `assets/base.css:5182-5241`
  - `assets/desktop-optimizations.css:313-383`

## Social + Final CTA
- Social links are simple and readable.
- The final CTA card is clean, but the page arrives there without much sectional pacing.
- Footer works, though it is visually plain and currently lower priority than the header/hero/mobile issues.

## Desktop Summary
- Most important desktop issue: the header/hero relationship is wrong for the intended design.
- Next desktop issue: homepage sections need better separation and more deliberate rhythm.
- The current desktop page is not broken end-to-end, but it feels custom-styled in a fragile way rather than intentionally systemized.

