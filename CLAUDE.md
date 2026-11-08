# Project instructions for Claude Code

## Project mission
Build a premium, Hebrew RTL, mobile-first, one-page jewelry and watches landing experience featuring three interactive luxury boxes: rings, watches, and diamonds. The box-opening experience is the primary interaction. This project is separate from any other repository.

## Mandatory references
Read `CLAUDE_START_PROMPT.md` and all relevant documents in `docs/` before coding. Treat `docs/QA_CHECKLIST.md` as acceptance criteria. See `preview/index.html` for a self-contained visual concept; use it as direction, not a final implementation. Follow `.claude/skills/luxury-box-reveal/SKILL.md` when available.

## Non-negotiables
- Brand MAISON ÉCLAT is **temporary demonstration content**, not a claim of trademark or domain availability.
- Build a working Next.js/React app, not a slide deck, static screenshot, iframe of preview, or HTML pasted into a page.
- Persian? No: language is Hebrew `lang="he"` and `dir="rtl"`, with occasional small English editorial labels.
- Accessible click/touch/keyboard experience; respect `prefers-reduced-motion`.
- Product images may be original inline SVG illustrations while real assets are unavailable. Label illustrations/demo content clearly.
- No real payments, fake checkout, unconfigured WhatsApp destinations, fake testimonials, or invented certification claims.
- No secrets or API tokens in the repo or client bundles.
- Protect existing default branch. Create a feature branch and PR; do not merge without approval.
- Ensure build, lint and typecheck pass. Add tests for opening/closing, category change and mobile interactions.
- Keep dependencies small. Prefer semantic HTML, CSS 3D + Motion. Only use WebGL/React Three Fiber if justified, with a mobile/performance fallback.

## Deliverables
Working source, typed demo data, reusable components, tests, README, env example if actually needed, preview/deploy instructions, PR, and honest testing report describing tested vs untested conditions.
