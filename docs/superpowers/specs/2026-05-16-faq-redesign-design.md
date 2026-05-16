# FAQ Section Redesign — Design Spec
**Date:** 2026-05-16
**Component:** `app/components/Faq.tsx`
**Data:** `lib/faq.ts` (unchanged)

## Goal
Replace the plain, unanimated FAQ accordion with a dramatic Ornate Accordion that matches the luxury masquerade aesthetic of the rest of the site (Tickets section corner brackets, Hero Framer Motion animations).

## Design Direction
**Ornate Accordion** — SVG corner brackets on each card, gold border glow on the active item, smooth Framer Motion height animation on open/close, stagger scroll-triggered entrance per card.

---

## Section Background
- Base: `#0A1628` (unchanged)
- Add radial gradient spotlight from above: `radial-gradient(ellipse at top, rgba(200,155,60,0.06) 0%, transparent 60%)` — matches Tickets section treatment
- 6 decorative floating gold dot particles scattered in the background via absolute positioning with a CSS `@keyframes float` animation (subtle vertical drift, opacity 0.1–0.25, varying sizes 2–4px, staggered delays)

## Heading Area
- "Frequently Asked Questions" — Playfair Display, `#C89B3C`, 700 weight (unchanged)
- Gold rule ornament (◆ with gradient lines) animates in on scroll: `scaleX: 0 → 1` via Framer Motion `whileInView`, `viewport={{ once: true }}`, 0.6s ease

## Card Entrance Animations
- Each FAQ card: `motion.div` with `whileInView={{ opacity: 1, y: 0 }}`, `initial={{ opacity: 0, y: 32 }}`, `viewport={{ once: true }}`
- Stagger delay: `transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}`
- Cards cascade in sequentially as user scrolls down

## Card Structure — Closed State
- Border: `1px solid rgba(200,155,60,0.3)`
- Background: `#0A1628`
- SVG corner brackets at 16px: same 4-path SVG as Tickets cards, gold at 50% opacity
- No box shadow

## Card Structure — Open/Active State
- Border: `1px solid #C89B3C`
- Box shadow: `0 0 25px rgba(200,155,60,0.3), inset 0 0 40px rgba(200,155,60,0.06)`
- SVG corner brackets: gold at 100% opacity
- Question text color: `#C89B3C` (gold) — transitions from `#F5EDD8`

## Button Row (Question)
- Layout: flex row, question text left, icon right (unchanged)
- Hover effect: a `motion.div` shimmer overlay (same technique as Tickets reserve button) — absolutely positioned, `translateX(-100%) → translateX(100%)` on hover over 0.8s
- Icon: `motion.span` wrapping `+`, `animate={{ rotate: openIndex === i ? 45 : 0 }}`, `transition={{ duration: 0.2 }}`

## Accordion Open/Close Animation
- Replace `hidden` attribute with `AnimatePresence` + `motion.div`
- `initial={{ height: 0, opacity: 0 }}`
- `animate={{ height: "auto", opacity: 1 }}`
- `exit={{ height: 0, opacity: 0 }}`
- `transition={{ duration: 0.35, ease: "easeInOut" }}`
- `overflow: hidden` on the motion div to clip during animation

## Answer Panel
- Separator: `border-t: 1px solid rgba(200,155,60,0.3)` (unchanged)
- Answer text: `#8BA3BF`, Inter, 14px/1.7 line-height (unchanged)
- Top padding on text: 16px

## Section Footer
- Below last card: ornamental dot row from Tickets section — gradient lines + 7 graduating-opacity dots centered
- Top margin: 48px

## Dependencies
- `motion/react` (Framer Motion) — already installed
- No new packages required

## Files to Change
- `app/components/Faq.tsx` — full rewrite of JSX and animation logic
- `.gitignore` — add `.superpowers/` if not present

## Accessibility
- `aria-expanded`, `aria-controls`, `aria-labelledby`, `role="region"` — all preserved from current implementation
- `hidden` attribute removal is safe: the panel stays in DOM during animation (height: 0, overflow: hidden), so screen readers still need `aria-expanded` on the button to communicate state — which is already present. No `aria-hidden` needed on the panel.
