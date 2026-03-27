# Shopify Theme Design Notes

## File Map

- Global shell and shared CSS live in `layout/theme.liquid` and `assets/base.css`.
- Page composition is controlled by `templates/*.json`.
- Most visual work happens in `sections/*.liquid`.
- Interactive behavior usually lives in `assets/*.js`.
- Small reusable markup patterns often live in `snippets/`.

## Safe Design Strategy

1. Reuse an existing section before creating a new one.
2. Put merchant-facing content and presentation choices into section schema settings.
3. Keep section markup semantic and avoid wrapping everything in unnecessary containers.
4. Use CSS custom properties or scoped selectors when introducing a new visual system.
5. Preserve responsive behavior for mobile first, then refine larger breakpoints.

## Common Targets In This Repo

- Strong first impression: `sections/hero.liquid`, `sections/slideshow.liquid`, `sections/layered-slideshow.liquid`, `templates/index.json`
- Merchandising blocks: `sections/featured-product.liquid`, `sections/product-list.liquid`, `sections/collection-list.liquid`, `sections/media-with-content.liquid`
- Navigation and brand framing: `sections/header.liquid`, `sections/footer.liquid`, `sections/marquee.liquid`
- Product detail UX: `sections/product-information.liquid`, `sections/featured-product-information.liquid`, product card assets/scripts

## What Good Looks Like

- Product story is obvious within the first screenful.
- Typography and spacing create hierarchy without relying on excessive copy.
- Calls to action are prominent but not noisy.
- Cards, media, and collections feel part of the same system.
- Merchant settings are understandable in the theme editor.

## When To Add New Settings

Add settings when a merchant is likely to reuse the pattern with different content, alignment, background treatment, or CTA style. Avoid settings for one-off cosmetic details that would make the editor noisy.
