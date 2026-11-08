# FIRST CLAUDE CODE MESSAGE — COPY THIS ENTIRE PROMPT

You are the lead creative developer, interaction designer, and QA engineer for a new standalone repository named `luxury-jewelry-landing`.

**Build now; do not stop at a plan or a mockup.** Read `CLAUDE.md`, `docs/BRAND_AND_DESIGN.md`, `docs/INTERACTIONS.md`, `docs/COPY_HE.md`, `docs/TECH_AND_DELIVERY.md`, `docs/QA_CHECKLIST.md`, `docs/ASSETS.md`, and `data/collections.json`. If available, use the `luxury-box-reveal` project skill from `.claude/skills/luxury-box-reveal/SKILL.md`. Inspect `preview/index.html` as a **concept reference**. It is not the final application.

## Product
Create an exceptionally polished, interactive luxury jewelry landing page in **Hebrew / RTL** for three collections: diamond rings, luxury watches, and diamonds/gemstones. The signature experience is 3 jewel/watch boxes on a spacious ivory editorial stage. Each box opens elegantly to reveal its featured object with subtle lighting and refined details. It should feel memorable and premium, not generic and not like a photo slideshow.

## Signature scene
- Desktop: asymmetric editorial hero copy balanced with a cinematic stage containing 3 actual interactive boxes, each with a distinct material, shape and reveal.
- Mobile: boxes remain tappable at comfortable sizes. Use a carefully optimized compact stage or swipeable carousel; no clipped boxes, inaccessible CTAs, or horizontal page overflow.
- Rings: velvet clamshell lid opens on a hinge, revealing a diamond ring.
- Watches: leather/wood watch presentation case opens smoothly, revealing a watch.
- Diamonds: a refined light-coloured display case lifts/opens, revealing a faceted gemstone.
- The selected object becomes the visual focal point via subtle lift/scale, warm spotlight and a small amount of sparkle, **not** flashy particle spam.
- Only one box open at a time. Click the open box to close; selecting another closes the previous one and opens the new one without glitches. Support Escape and keyboard activation, and provide a clear visible focus indication.
- Product/category info changes smoothly and has a legitimate CTA (e.g. scroll to consultation/contact section). No invented phone number or fake success message.
- Use cinematic motion, depth, soft shadows, precise easing, responsive performance, accessible `prefers-reduced-motion` fallback.

## Visual style
Creative art direction: warm ivory/off-white canvas, deep charcoal ink, exceptionally restrained champagne-gold accents, light pastel glow behind the boxes, elegant serif editorial headers paired with readable Hebrew sans-serif. No gaudy gold, no generic black-and-gold stock template, no autoplay videos, no overbearing animation.

## Full landing architecture
1. Navigation: temporary brand wordmark + collections/about/contact anchors.
2. Hero: premium headline, subtle subtitle and the interactive 3-box scene.
3. Dynamic collection detail bar/panel with current category and a CTA.
4. "The story" or craftsmanship section; avoid false heritage or unsupported gemstone claims.
5. One concise conversion/contact section (working anchor, placeholder contact message or a form only if real backend configured).
6. Footer and relevant accessibility metadata.
Use the provided Hebrew content as an editable starting point. Do not claim real stock, prices, provenance, warranties, or certifications.

## Implementation
- Next.js App Router + TypeScript, Tailwind CSS, Motion for React for sequencing and shared transitions. Use CSS 3D for box mechanics when sufficient; Three.js / React Three Fiber only if worth the additional cost, and provide a non-WebGL fallback.
- Create reusable box and reveal components and data-driven categories; do not hardcode content in large monolithic JSX.
- Respect hydration and SSR limitations. Optimize mobile. Avoid layout shifts. Ensure semantic buttons, accessible names, sensible ARIA and reduced-motion treatment.
- Begin with original code-generated placeholder SVG product illustrations if licensed photos/3D assets do not exist. The prototype must still look intentional. Document what assets are needed for photorealism in a later phase.
- Do not install arbitrary third-party skills or MCP servers. The project skill is enough.
- Keep this repository entirely isolated from `interactive-fashion-store`, AutoMind or other projects.

## Required execution and proof
1. Inspect repo, initialize/configure Next.js without overwriting reference docs or preview.
2. Implement the full working page and interactive transitions.
3. Run typecheck, lint and production build.
4. Add Playwright or equivalent smoke tests and test at desktop + mobile viewports. Validate open → switch → close, keyboard, CTA and non-overflow.
5. If the environment supports browser screenshots, inspect the actual rendered page and fix visual problems, especially mobile. Report honestly what could not be tested.
6. Add clear `README.md` instructions with commands and deployment guidance.
7. Commit on a new feature branch and push. Open a PR into `main`, but do **not** merge it automatically. If permissions fail, report the exact GitHub access failure and preserve local work.
8. Return the PR URL, what passed, preview instructions, and any missing product/brand assets.

## Definition of done
A real, production-buildable, appealing landing page where every box opens, reveals a distinguishable relevant product, controls work on mobile, the page tells one coherent story in Hebrew, and the project has automated verification. No nonfunctional checkout, misleading CTAs, or invented customer data.

Proceed to implementation immediately.
