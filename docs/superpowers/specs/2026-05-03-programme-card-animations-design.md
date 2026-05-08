# Programme Card Animations — Design Spec
**Date:** 2026-05-03
**Component:** `app/components/ProgramFlow.tsx`

## Overview

Animate the three Act cards in The Programme section using the `motion` library (Framer Motion v12). Goal: replace the jarring instant layout-swap on click with a fluid, choreographed expand, and add richer hover feedback.

## Dependency

`motion` v12 is already installed (`"motion": "^12.38.0"` in `package.json`). No new dependency needed. Import from `"motion/react"`:

```ts
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
```

## Layout Animation

- **Persistent grid:** Remove the conditional layout switch (`openIndex === null ? 3-col : 1-full + 2-col`). Always render a single `grid grid-cols-1 md:grid-cols-3` container.
- **Open card:** When a card is clicked, apply `md:col-span-3` (full width on desktop). `motion.div` with `layout` on each card handles the FLIP — measuring before/after bounding boxes and animating position and size.
- **Sibling cards (desktop):** With `md:col-span-3` on the open card, the two remaining cards drop to the next row and each occupy one column of the 3-col grid. This is the intended layout — no special handling needed. On mobile (single column), all cards already stack vertically so `col-span` changes have no visual effect.
- **Sibling cards (animation):** All three cards carry `layout` so they animate smoothly to their new row position as the open card expands.
- **Coordination:** Wrap the grid `div` in a `<LayoutGroup>` so all three cards participate in the same FLIP pass.
- **`ActCard` ref refactor:** The project is on React 19, where `ref` is a regular prop. Remove the `forwardRef` wrapper and accept `ref` directly in the props interface as `ref?: React.Ref<HTMLDivElement>` (using `React.Ref`, not `RefObject`, to accept both ref callbacks and ref objects — matching how `cardRefs.current[i] = el` is used today). Pass it to the root `motion.div` as `ref={ref}`.

## Hover State

The card-level `motion.div` uses the **string form** `whileHover="hover"` so Framer Motion propagates the `"hover"` gesture state to all child `motion` elements:

```ts
variants={{
  hover: { y: -8, boxShadow: "0 0 30px rgba(200,155,60,0.25)" },
}}
whileHover="hover"
```

- `y: -8` — lift off the surface
- `boxShadow: "0 0 30px rgba(200,155,60,0.25)"` — warm gold ambient glow
- Border brightness: existing CSS transition (`border-[#C89B3C]/40` → `/70`) retained via existing `group` + CSS hover classes
- **Numeral scale:** The numeral `<p>` is converted to a `motion.p` with `variants={{ hover: { scale: 1.05 } }}`. No `whileHover` needed on the numeral — the parent's string-form `whileHover="hover"` propagates automatically.

## Tap Feedback

Omitted to avoid conflicts with the layout animation. The FLIP expand itself provides sufficient visual response to a click.

## Transition Config

A single `transition` prop on each card's `motion.div` uses namespaced keys to serve both layout and hover/tap without conflict:

```ts
transition={{
  layout: { type: "spring", stiffness: 300, damping: 30 },
  default: { duration: 0.2, ease: "easeOut" },
}}
```

- `transition.layout` — controls the FLIP spring (spring, stiffness 300, damping 30)
- `transition.default` — controls hover easing (0.2s ease-out)

## Moments Reveal (Stagger)

When a card opens, moment rows animate in sequentially:
- The existing `grid-rows` CSS trick container (`grid transition-[grid-template-rows]`) remains as the height-reveal mechanism.
- Inside that container, replace each moment row `div` with a `motion.div`:
  - `initial={{ opacity: 0, y: 8 }}`
  - `animate={{ opacity: 1, y: 0 }}`
  - `exit={{ opacity: 0, y: 8 }}`
  - `transition={{ duration: 0.2, delay: index * 0.05 }}`
  - `key={mi}` (required for `AnimatePresence` to track items)
- Moment rows are **conditionally rendered** — render them only when `isOpen` is true (`{isOpen && act.moments.map(...)}`). This makes them actually unmount on collapse, so `AnimatePresence` can fire the `exit` animation.
- `AnimatePresence initial={false}` wraps the conditionally-rendered list. It sits directly inside the overflow-hidden inner `div` of the `grid-rows` container. `initial={false}` prevents enter animations on first mount. No `mode` prop — rows enter/exit independently. The CSS `grid-rows` height collapse runs concurrently and clips the exit animation naturally via `overflow-hidden`.

Explicit JSX structure inside the moments container:
```tsx
<div className="overflow-hidden">
  <div className="px-8 pb-8">
    <AnimatePresence initial={false}>
      {isOpen && act.moments.map((moment, mi) => (
        <motion.div
          key={mi}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, delay: mi * 0.05 }}
          className="py-4 border-t border-[#C89B3C]/20 first:border-t-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* existing moment row content */}
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
</div>
```

## What Does Not Change

- Data (`moments`, `actGroups`) — untouched
- Mobile accordion behaviour and scroll-into-view logic — retained
- All text, colours, and typography — untouched
- The `grid-rows` CSS height-reveal trick for the moments container — retained
