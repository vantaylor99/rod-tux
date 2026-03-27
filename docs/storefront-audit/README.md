# Storefront Audit

This audit covers the Shopify theme homepage in code and in a live local preview for a retail storefront selling fishing rod cases. The pass focused on layout, layering, responsive behavior, homepage section separation, and task scoping for future implementation work. No storefront UI fixes were made in this audit pass.

Tested environments:
- Local preview: `http://127.0.0.1:9292/`
- Desktop viewport: `1440x1200`
- Mobile viewport: `390x844`
- Mobile interaction tested: hamburger menu open state

Major problem areas:
- Mobile header drawer opens in the DOM but renders behind hero content
- Mobile hero media is oversized and crops the primary message badly
- Desktop header is not transparent over the hero, so the hero starts below the nav instead of tucking behind it
- Desktop hero media/button/header relationship is being managed by conflicting custom CSS
- Homepage mid-page sections have weak separation and some cards/content feel clipped or compressed
- Homepage styling logic is split across section files, `templates/index.json`, `assets/base.css`, and `assets/desktop-optimizations.css`

Detailed docs:
- `docs/storefront-audit/findings.md`
- `docs/storefront-audit/desktop-homepage.md`
- `docs/storefront-audit/mobile-homepage.md`
- `docs/storefront-audit/component-map.md`

