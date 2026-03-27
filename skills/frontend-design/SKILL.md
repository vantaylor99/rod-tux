---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces and polished storefront UI improvements for this Shopify theme. Use when working on visual design direction, layout refinement, responsive behavior, section composition, typography, color systems, motion, merchandising presentation, UX cleanup, or building/styling pages, sections, components, and web UI across Liquid, JSON templates, CSS, JavaScript, and theme assets.
---

# Frontend Design

Create intentional, production-grade frontend work that feels designed rather than generated. Favor real implementation over abstract critique: inspect the current structure, commit to a clear aesthetic point of view, and ship the design in working Liquid, CSS, JavaScript, and schema settings where appropriate.

## Workflow

1. Inspect the current implementation before proposing changes.
2. Understand the purpose, audience, constraints, and what should feel memorable.
3. Choose a bold aesthetic direction and carry it through typography, spacing, motion, color, composition, and interaction details.
4. Identify the page surface involved:
   - Global shell: `layout/theme.liquid`, `assets/base.css`, related global assets.
   - Homepage and landing composition: `templates/*.json`, section files in `sections/`.
   - Product and collection UX: product, collection, card, media, and recommendation sections plus related JS/CSS assets.
5. Decide whether the request needs:
   - A focused visual polish to an existing section.
   - A stronger art direction shift across multiple sections.
   - New schema settings so merchants can tune the result in the theme editor.
6. Implement the design directly. Avoid leaving the work as a plan unless the user explicitly asked for concepts only.
7. Verify responsive behavior, accessibility basics, and theme-editor usability.

## Design Thinking

Before coding, determine:
- Purpose: what the interface needs to accomplish and who it serves.
- Tone: choose a strong direction such as editorial, organic, industrial, playful, brutalist, refined luxury, retro-futurist, or another clear point of view.
- Constraints: framework, performance, accessibility, maintainability, and existing theme patterns.
- Differentiation: decide what one or two memorable qualities should make the design feel specific to this context.

Commit to a direction. Bold maximalism and restrained minimalism both work when executed precisely.

## Aesthetic Rules

Build interfaces that are:
- Production-grade and functional.
- Visually distinctive and memorable.
- Cohesive, with a clear aesthetic thesis.
- Refined in small details, not only broad layout.

Focus on:
- Typography: choose characterful fonts and pairings that support the concept. Avoid default-feeling stacks when a better option exists.
- Color and theme: define a deliberate palette with strong hierarchy. Use CSS variables for consistency.
- Motion: favor a few meaningful reveal, hover, transition, or scroll moments over scattered animation noise.
- Spatial composition: use asymmetry, overlap, contrast in scale, controlled density, or generous whitespace when it supports the concept.
- Backgrounds and surfaces: add atmosphere with gradients, textures, grain, borders, shadows, transparency, or pattern systems that fit the brand story.

Avoid:
- Generic AI-looking layouts or predictable hero/card compositions.
- Purple-on-white default aesthetics and overused generic font choices.
- Design choices that feel interchangeable with any random landing page.
- Adding visual complexity that is not backed by a clear concept.

## Shopify Theme Rules

For this repo, preserve the advantages of the theme architecture while pushing design quality:
- Reuse and upgrade existing sections before creating new ones.
- Put merchant-facing content and presentation controls into schema settings when reuse is likely.
- Prefer CSS and Liquid for presentation work; add JavaScript only when interaction truly needs it.
- Keep markup semantic and keep theme editor controls understandable.
- Make the mobile experience intentional first, then refine larger breakpoints.

## Implementation Guidance

Use the smallest stable surface for each change:
- Section-specific styling: keep CSS near the section if the theme already follows that pattern; otherwise add concise global rules in shared CSS assets.
- New homepage composition: prefer editing `templates/index.json` and section schema/settings before inventing a custom one-off structure.
- Reusable merchandising modules: update or extend an existing section such as `hero`, `featured-product`, `media-with-content`, `product-list`, or `collection-list` before creating a new section from scratch.
- Interaction changes: reuse existing theme scripts and custom elements patterns found in `assets/*.js`.

When adding settings:
- Give merchants practical toggles like alignment, emphasis, color theme, spacing, image position, eyebrow text, or CTA treatment.
- Keep setting names plain and short.
- Choose defaults that make the section look good immediately.

## Execution Standard

Match implementation complexity to the concept:
- If the direction is maximalist or expressive, support it with enough code detail to feel finished.
- If the direction is minimalist or refined, remove noise and make spacing, type, and proportion do the work.

Do not converge on the same design language every time. Vary theme, font personality, composition style, and motion choices based on the request and the product context.

## Repo Notes

Read `references/shopify-theme-design.md` when you need repo-specific guidance about file locations, safe edit patterns, and theme-editor-friendly design work in this codebase.

## Output Expectations

Ship concrete code changes plus a short explanation of the visual rationale, affected files, and anything the merchant should adjust in the theme editor.
