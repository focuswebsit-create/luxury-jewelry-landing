# Functional motion specification

## States and triggers
Store `activeBox = null | 'ring' | 'watch' | 'diamond'` in React state.

| Action | Expected result |
| --- | --- |
| Page loads | All boxes closed; default invitation shown |
| Click/tap a closed box | That box opens; matching jewel appears, detail panel updates |
| Click/tap already-open box | It closes; default invitation returns |
| Click/tap a different box | Old one closes and new one opens; no overlapping layers |
| Escape | Close selected box, optionally restore focus |
| Tab / Enter / Space | All cases are focusable operable buttons |
| Mobile tap | Same as desktop, no hover required |
| Reduced-motion preference | Instant or minimal transition, fully functional |

## Choreography (guidelines, not hard-coded delays)
1. User initiates: response must be immediate enough to feel connected to the tap.
2. Tiny box anticipation (lift 4–8px / light shift).
3. Hinged lid rotates around physically plausible hinge, using perspective and backface settings. For the diamond case, a lift or drawer may be better; do not use identical motion on every object.
4. Jewel gains prominence with subtle scale/focus. Provide convincing gold, steel and crystal treatments using actual artwork, photos or meshes when available.
5. Detail panel crossfades content only after the reveal is underway; controls remain responsive.
6. Closing reverses layers reliably with no ghost images.

## Proposed mechanics
- Ring case: clamshell. Dim espresso velvet, inside cushion, elegant lid hinge.
- Watch case: charcoal leather rectangular case, lid lifts, watch presented on a pillow.
- Diamond case: light warm-stone display case with lid sliding upward or folding back, crystal facets emphasized.

## Layers for CSS 3D / Motion
`stage` → `box` → `outerShell` → `innerPadding` → `jewel` → `lid` → `glow/reflect`. Use `transform-style: preserve-3d`, `perspective`, stable transform origins, correct stacking, and tested z-index.

## Accessibility and behavior
- One active open state, not uncontrolled independent booleans.
- Buttons with visible names e.g. 'פתיחת קופסת טבעות'; update description/ARIA pressed for state.
- Visible focus ring; sufficient contrast; avoid motion-triggered nausea.
- Pause/avoid background continuous animations; no sound autoplay.
- If the main CTA is unconfigured, route to an informative on-page contact section or show truthful demo status; no fake lead submission.
- Ensure no content is made exclusively visible on hover.

## Mobile differences
- 360–430px viewport: all controls are accessible, captions readable, touch area at least approximately 44px (recommendation), detail panel wraps gracefully.
- Consider swipeable boxes if a row becomes too small, but keep explicit indicators and keyboard support.
- Avoid sticky overlays swallowing scroll.

## What makes it premium
Refined shadows, exact lid hinge, soft restrained light, large readable copy, consistent timing and compelling *real* product assets once supplied. Sparkles are optional accents, not the centerpiece.
