# Acceptance tests for MVP

- [ ] Fresh `npm install` + `npm run dev` works.
- [ ] TypeScript typecheck, ESLint and production `next build` pass.
- [ ] Hero displays a coherent premium 3-box scene with distinct materials and correct Hebrew text.
- [ ] Each case opens on click/tap and shows the matching ring, watch or diamond illustration/image.
- [ ] Pressing the same box closes it; selecting a second box closes the first.
- [ ] No duplicate objects, ghost layers, stuck open lids or animation race conditions on rapid clicking.
- [ ] Dynamic collection copy switches correctly, including CTA label/behavior.
- [ ] User can operate boxes by keyboard (Tab, Enter or Space) and close via Escape.
- [ ] Visible focus indicator and accessibility names work.
- [ ] `prefers-reduced-motion` makes content usable with little/no animation.
- [ ] No horizontal page overflow at widths 360px, 390px, 430px, 768px, 1280px, 1440px.
- [ ] Touch works on simulated mobile and (later) a real phone.
- [ ] Buttons are accessible on mobile and copy remains legible.
- [ ] CTA leads to a real section; if contact is not configured, it is clearly presented as demo rather than a live submission.
- [ ] No fake reviews, fake inventory, unsupported claims, stock logos, or proprietary photos without rights.
- [ ] No error console logs in normal navigation; no hydration errors.
- [ ] SEO title/description, viewport and language/RTL semantics exist.
- [ ] PR is created without modifying other repositories or merging into main.
- [ ] README documents deployment steps and all remaining assumptions/limitations.

## Suggested browser smoke flow
1. Load landing → see 3 boxes in default closed state.
2. Open ring; verify selected panel says טבעות יהלומים.
3. Open watch; verify ring closes and watch panel says שעוני יוקרה.
4. Open diamond; verify it has its own visual and copy.
5. Escape closes.
6. On mobile, tap all three and verify no overflow.
7. Keyboard test focus and activation.
8. Test contact section/CTA.
