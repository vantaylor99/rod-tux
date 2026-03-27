# Component Map

## Header / Nav
- Primary section:
  - `sections/header.liquid`
- Section settings:
  - `sections/header-group.json`
- Theme shell and header height/offset bootstrapping:
  - `layout/theme.liquid`
- Header behavior script:
  - `assets/header.js`
- Related snippets:
  - `snippets/header-row.liquid`
  - `snippets/header-actions.liquid`
  - `blocks/_header-logo.liquid`

## Mobile Drawer / Hamburger
- Drawer markup and styles:
  - `snippets/header-drawer.liquid`
- Drawer behavior:
  - `assets/header-drawer.js`
- Menu behavior:
  - `assets/header-menu.js`
- Header menu mode switching:
  - `layout/theme.liquid:97-105`
  - `assets/header.js:117-124`

## Hero Media
- Hero section implementation:
  - `sections/hero.liquid`
- Homepage hero settings/content:
  - `templates/index.json:12-182`
- Global hero/homepage overrides:
  - `assets/base.css`
- Additional desktop-specific hero overrides:
  - `assets/desktop-optimizations.css`

## Homepage Sections
- Homepage composition/order:
  - `templates/index.json`
- Generic section renderer used by several homepage blocks:
  - `sections/section.liquid`
- Product feature section:
  - `sections/featured-product.liquid`
  - `blocks/_featured-product.liquid`
  - `blocks/_media-without-appearance.liquid`
- Homepage-specific styling:
  - `assets/base.css:4962-5313`

## Global CSS / Breakpoints
- Main global stylesheet:
  - `assets/base.css`
- Extra desktop override layer:
  - `assets/desktop-optimizations.css`
- Stylesheet loading order:
  - `snippets/stylesheets.liquid`

## Z-Index / Overflow / Sticky / Transparent Header
- Transparent-header offset rules:
  - `assets/base.css:995-1007`
- Header transparent/sticky logic:
  - `sections/header.liquid:17-44`
  - `assets/header.js`
- Drawer layer and positioning:
  - `snippets/header-drawer.liquid:822-883`
- Hero pointer-events/media wrappers:
  - `sections/hero.liquid:724-730`

## Key Homepage IDs From `templates/index.json`
- Hero:
  - `hero_p9CmMG`
- Featured product:
  - `featured_product_reef`
- Why Rodtux / guarantee:
  - `section_feature_grid`
- What you need to know:
  - `section_wnk`
- Trust strip:
  - `section_trust`
- Reviews:
  - `section_reviews`
- How it works:
  - `section_how`
- Social:
  - `section_social`
- Final CTA:
  - `section_x8mrnx`

