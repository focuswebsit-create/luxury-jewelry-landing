# Technical & Delivery Scope

## Recommended stack
- Next.js App Router; TypeScript strict mode.
- Tailwind CSS and CSS transforms for the box mechanics.
- Motion for React for state-driven entrances/layout changes, without depending on heavyweight WebGL by default.
- Typed local collection data from `data/collections.json` or a matching TypeScript module.
- Playwright browser smoke tests where the environment permits it.

## Component sketch
```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    Header.tsx
    RevealStage.tsx
    LuxuryBox.tsx
    JewelIllustration.tsx
    CollectionDetail.tsx
    EditorialSection.tsx
    ContactSection.tsx
  data/
    collections.ts
  lib/
    brand.ts
```
This is a suggestion; adapt if architecture benefits.

## Data contract
Each collection has `id`, Hebrew/English labels, short Hebrew copy, visual/material tokens, product asset reference and CTA configuration. User-supplied images should replace placeholders without redesigning components.

## Performance constraints
- Keep animations on transforms and opacity when possible, avoiding reflow-heavy animation.
- Avoid giant texture files and 3D dependencies unless required by visual quality.
- Support mobile, touch, keyboard, and reduced motion.
- No external font or image fetch should break local development.

## Git workflow
- Create a feature branch, e.g. `claude/jewelry-reveal-mvp`.
- Commit work; push branch; open PR into `main`; **do not merge without user approval**.
- If repo permissions are insufficient, preserve code and report exact reason and commands needed to retry.

## Required validation
At minimum:
```
npm run typecheck
npm run lint
npm run build
```
Add a `test:smoke` script using Playwright or a comparable tool, and run after a production build when feasible. Tests should cover interaction and mobile/desktop viewports.

## Deployment
Target Vercel, importing the standalone GitHub repository; initial demo should require **no environment variables**. Configure a real WhatsApp number or submission destination later, with appropriate privacy/consent rules. Do not create imaginary endpoints.

## MVP is a landing page, not commerce
No Shopify integration, checkout, customer payments or live stock for MVP. Later integrations require an explicit separate phase and real credentials, kept server-side.
