# Cursor Glow Effect — Design Spec

**Date:** 2026-03-20
**Status:** Approved

## Overview

Add a subtle gold radial glow that follows the cursor across the entire page, enhancing the dark navy atmosphere of the CS Night website.

## Design Decisions

- **Color:** Gold (`#C89B3C`) at ~8% opacity, matching the site's accent color
- **Size:** Moderate — ~500px radial spread, clearly visible but elegant
- **Approach:** React client component (`CursorGlow`) mounted in `layout.tsx`

## Component Spec

**File:** `app/components/CursorGlow.tsx` (alongside existing components `Hero.tsx`, `Navbar.tsx`, etc. — all components live in `app/components/` in this project)

- `'use client'` directive
- Tracks `mousemove` on `window` via `useEffect`; the effect returns a cleanup function that removes the listener to prevent memory leaks
- Stores cursor position in `useState<{ x: number; y: number }>`, initialized off-screen (`{ x: -1000, y: -1000 }`) so the glow is invisible before the first mouse move
- Renders a `div` with styles applied via an inline `style` prop (required because the gradient center is dynamic). The background value uses a template literal:
  ```
  `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(200,155,60,0.08), transparent)`
  ```
- Full style shape:
  - `position: 'fixed'`
  - `inset: 0`
  - `pointerEvents: 'none'` — prevents the overlay from blocking any clicks or hovers
  - `zIndex: 9999` — sits above all page content; safe because `pointerEvents: 'none'` makes it fully non-interactive and visually the 8% opacity glow is imperceptible over text
  - `background`: template literal above

## Integration

**File:** `app/layout.tsx`

The current layout is minimal — `<body>{children}</body>` with no wrappers. Add `<CursorGlow />` as the first child directly inside `<body>`:

```tsx
<body>
  <CursorGlow />
  {children}
</body>
```

No other files need modification.

## Constraints

- **No SSR output** — component is client-only; glow starts off-screen until first `mousemove`
- **Zero layout impact** — `position: fixed` and `pointerEvents: 'none'` ensure no interference with scrolling, layout, or interactivity despite the high z-index
- **Mobile/touch devices** — no `mousemove` events fire on touch-primary devices; the glow remains off-screen. No touch fallback is required.
- **No new dependencies required**
