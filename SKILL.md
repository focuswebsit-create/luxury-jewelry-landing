---
name: luxury-box-reveal
description: Design, implement and QA an accessible mobile-first luxury jewelry landing page with premium interactive box opening and product reveals.
---

# Luxury Box Reveal Experience

Use this project skill whenever implementing, editing or reviewing the landing page's hero, jewelry boxes, reveal animation, mobile behavior or visual quality.

## Art direction
- Think premium editorial product cinematography, not a catalog grid or gimmicky particle effect.
- Material identity: ring box = espresso velvet; watch = charcoal leather with precision hardware; diamond = warm stone/ivory display case.
- One dominant active box, tasteful product spotlight, warm shadows, a few controlled reflection glints.
- Keep backgrounds spacious and hierarchy editorial. Never sacrifice readability for aesthetics.

## Interaction state machine
- Model exactly 4 states: `none | ring | watch | diamond`.
- `select(kind)`: if the kind is already selected, close it; otherwise move from previous to the new kind. Ensure interrupted motions do not leave impossible intermediate states.
- Source of truth must be React state; visual transforms should derive from state rather than ad hoc manual DOM mutations.
- Opening sequence: lift/anticipation (minimal) → lid/door reveal → product spotlight/scale → product details and CTA.
- Closing sequence: details recede → product lowers → lid closes → active visuals reset.
- Respect reduced motion: immediate state switch, no kinetic 3D, preserve context and information.

## Architecture
- Use data-driven reusable components: `LuxuryBox`, `JewelryObject`, `CollectionsStage`, `CollectionInfo`, `ContactCTA`, plus a clear demo catalog model.
- Prioritize semantic buttons over div-onClick; use `aria-pressed` or equivalent valid semantics and visible `:focus-visible`.
- `Motion` or CSS transform for 3D lid is usually enough. Make layers, perspective and z-index explicit; don't use true 3D simply to impress.
- Keep all category data in a single typed source.
- Consider loading images after first interaction; never render giant remote unoptimized image files.

## Quality gates
- No scrolling trap, click blockers, hover-only interactions, keyboard-inaccessible boxes, wrong RTL alignment, horizontal page overflow or transparent product over unreadable text.
- Mobile 360–430px: distinguish all 3 categories, tap, swap, close, see their content without excessive scroll. CTA reachable and not clipped.
- Desktop 1280–1440px: intentional balance and generous whitespace, no overlapping headline and stage.
- Test: open each box, switch ring→watch→diamond, close, Escape, tab focus, reduced motion, CTA behavior, reload, no unexpected console errors.
- Check build/typecheck/lint and ideally Playwright smoke tests.
- No invented product facts or live integrations. Clear demo status.

## Deliverable behavior
Build the feature end-to-end, verify it, describe limitations accurately, and only then offer next-step improvements. Reference relevant project docs.
