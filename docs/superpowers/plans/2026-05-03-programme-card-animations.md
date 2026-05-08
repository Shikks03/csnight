# Programme Card Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the jarring instant layout-swap in The Programme section with a fluid FLIP-animated expand/collapse, and add rich hover feedback on the Act cards.

**Architecture:** All changes are confined to `app/components/ProgramFlow.tsx`. The conditional layout branch (ternary between 3-col grid and flex-col) is deleted and replaced with a single persistent `grid grid-cols-1 md:grid-cols-3` wrapped in a `LayoutGroup`. Each `ActCard` becomes a `motion.div` with `layout` so Framer Motion computes FLIP transitions automatically. Moment rows gain `AnimatePresence` + staggered `motion.div` enter/exit.

**Tech Stack:** Next.js 15 App Router, `motion` v12 (`motion/react`), React 19, Tailwind CSS v4, TypeScript

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `app/components/ProgramFlow.tsx` | Modify | All changes — layout, hover, moment stagger |

No new files. No new dependencies (`motion` is already installed).

---

### Task 1: Persistent Grid + LayoutGroup + ActCard Root → `motion.div`

Remove the conditional layout branch. Always render a single `grid grid-cols-1 md:grid-cols-3` wrapped in `<LayoutGroup>`. Refactor `ActCard` off `forwardRef` and convert its root element to `motion.div` with `layout`. Open card gets `md:col-span-3`.

**Files:**
- Modify: `app/components/ProgramFlow.tsx`

- [ ] **Step 1: Update imports**

Replace the current import line at the top of `ProgramFlow.tsx`:

```tsx
import { useState, useRef, forwardRef } from "react";
```

With:

```tsx
import { useState, useRef } from "react";
import type { Ref } from "react";
import { motion, LayoutGroup } from "motion/react";
```

- [ ] **Step 2: Replace the conditional layout branch with a single persistent grid**

Find this block in `ProgramFlow` (lines 101–139):

```tsx
{/* Act cards — layout switches when one is open */}
{openIndex === null ? (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {actGroups.map((act, i) => (
      <ActCard
        key={act.numeral}
        act={act}
        index={i}
        isOpen={false}
        onToggle={handleToggle}
        ref={(el) => { cardRefs.current[i] = el; }}
      />
    ))}
  </div>
) : (
  <div className="flex flex-col gap-6">
    <ActCard
      act={actGroups[openIndex]}
      index={openIndex}
      isOpen={true}
      onToggle={handleToggle}
      ref={(el) => { cardRefs.current[openIndex] = el; }}
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {actGroups
        .map((act, i) => ({ act, i }))
        .filter(({ i }) => i !== openIndex)
        .map(({ act, i }) => (
          <ActCard
            key={act.numeral}
            act={act}
            index={i}
            isOpen={false}
            onToggle={handleToggle}
            ref={(el) => { cardRefs.current[i] = el; }}
          />
        ))}
    </div>
  </div>
)}
```

Replace it with:

```tsx
{/* Act cards — persistent grid, FLIP-animated via LayoutGroup */}
<LayoutGroup>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {actGroups.map((act, i) => (
      <ActCard
        key={act.numeral}
        act={act}
        index={i}
        isOpen={openIndex === i}
        onToggle={handleToggle}
        ref={(el) => { cardRefs.current[i] = el; }}
      />
    ))}
  </div>
</LayoutGroup>
```

- [ ] **Step 3: Refactor `ActCard` — drop `forwardRef`, accept `ref` as a prop, convert root to `motion.div`**

Replace the entire `ActCard` declaration (from `const ActCard = forwardRef<...>` through the closing `});`) with a direct function component. Change:

```tsx
const ActCard = forwardRef<
  HTMLDivElement,
  { act: Act; index: number; isOpen: boolean; onToggle: (i: number) => void }
>(function ActCard({ act, index, isOpen, onToggle }, ref) {
  return (
    <div
      ref={ref}
      onClick={() => onToggle(index)}
      className={`
        group border cursor-pointer transition-all duration-300
        ${isOpen
          ? "border-[#C89B3C]/70"
          : "border-[#C89B3C]/40 md:hover:border-[#C89B3C]/70 md:hover:-translate-y-px"
        }
      `}
      style={{ background: "#0C1829" }}
    >
```

To:

```tsx
function ActCard({
  act,
  index,
  isOpen,
  onToggle,
  ref,
}: {
  act: Act;
  index: number;
  isOpen: boolean;
  onToggle: (i: number) => void;
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <motion.div
      ref={ref}
      layout
      onClick={() => onToggle(index)}
      className={`
        group border cursor-pointer
        ${isOpen
          ? "border-[#C89B3C]/70 md:col-span-3"
          : "border-[#C89B3C]/40 md:hover:border-[#C89B3C]/70"
        }
      `}
      style={{ background: "#0C1829" }}
    >
```

Also close the component correctly — replace the final `});` with `}`.

> Note: `md:hover:-translate-y-px` is intentionally dropped — the `motion.div` `variants` hover handles the lift via `y: -8`. The CSS border hover class is preserved.

- [ ] **Step 4: Start dev server and verify layout**

```powershell
npm run dev
```

Open `http://localhost:3000` and navigate to The Programme section. Verify:
- All three cards render in a row (3-col grid)
- Clicking a card expands it to full width (`md:col-span-3`) — siblings drop to the next row
- Clicking again collapses back to 3-col

No animation yet — that's fine.

- [ ] **Step 5: Commit**

```powershell
git add app/components/ProgramFlow.tsx
git commit -m "feat(program): persistent grid + LayoutGroup + ActCard motion.div with layout"
```

---

### Task 2: Hover Animations + Transition Config

Add the gold glow / lift hover effect to the card root and the scale effect to the numeral. Add the namespaced transition config so layout spring and hover easing don't conflict. Remove the now-redundant CSS hover translate classes.

**Files:**
- Modify: `app/components/ProgramFlow.tsx`

- [ ] **Step 1: Add `variants`, `whileHover`, and `transition` to the card `motion.div`**

On the `motion.div` in `ActCard`, add these props (alongside the existing `layout` and `className`):

```tsx
variants={{
  hover: { y: -8, boxShadow: "0 0 30px rgba(200,155,60,0.25)" },
}}
whileHover="hover"
transition={{
  layout: { type: "spring", stiffness: 300, damping: 30 },
  default: { duration: 0.2, ease: "easeOut" },
}}
```

The full updated `motion.div` opening tag should look like:

```tsx
<motion.div
  ref={ref}
  layout
  onClick={() => onToggle(index)}
  className={`
    group border cursor-pointer
    ${isOpen
      ? "border-[#C89B3C]/70 md:col-span-3"
      : "border-[#C89B3C]/40 md:hover:border-[#C89B3C]/70"
    }
  `}
  style={{ background: "#0C1829" }}
  variants={{
    hover: { y: -8, boxShadow: "0 0 30px rgba(200,155,60,0.25)" },
  }}
  whileHover="hover"
  transition={{
    layout: { type: "spring", stiffness: 300, damping: 30 },
    default: { duration: 0.2, ease: "easeOut" },
  }}
>
```

- [ ] **Step 2: Convert the desktop numeral `<p>` to `motion.p` with hover scale variant**

Find the desktop numeral paragraph inside the `{/* Card header — desktop */}` block:

```tsx
<p
  className="text-7xl leading-none mb-4"
  style={{ fontFamily: "Playfair Display, serif", color: "#C89B3C" }}
>
  {act.numeral}
</p>
```

Replace with:

```tsx
<motion.p
  className="text-7xl leading-none mb-4"
  style={{ fontFamily: "Playfair Display, serif", color: "#C89B3C" }}
  variants={{ hover: { scale: 1.05 } }}
>
  {act.numeral}
</motion.p>
```

No `whileHover` needed — the parent card's string-form `whileHover="hover"` propagates automatically.

- [ ] **Step 3: Verify hover in browser**

With dev server running, hover over each Act card and confirm:
- Card lifts (`y: -8`) smoothly
- Warm gold ambient glow appears around the card
- Roman numeral scales up slightly
- Existing CSS border-color transition still fires (the `group` classes on the border handle this)
- FLIP expand still works correctly after hovering

- [ ] **Step 4: Commit**

```powershell
git add app/components/ProgramFlow.tsx
git commit -m "feat(program): hover lift + gold glow + numeral scale via variant propagation"
```

---

### Task 3: Moment Rows — AnimatePresence + Stagger

Make moment rows conditionally rendered (so they actually unmount on collapse) and animate each row in/out with a stagger. `AnimatePresence initial={false}` wraps the list.

**Files:**
- Modify: `app/components/ProgramFlow.tsx`

- [ ] **Step 1: Add `AnimatePresence` to imports**

Update the motion import line:

```tsx
import { motion, LayoutGroup, AnimatePresence } from "motion/react";
```

- [ ] **Step 2: Replace the moments container content with conditionally-rendered `motion.div` rows**

Find the moments grid-rows container block (the `{/* Expanded moment rows */}` comment and everything inside it):

```tsx
{/* Expanded moment rows — animated with grid-rows trick */}
<div
  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
  }`}
>
  <div className="overflow-hidden">
    <div className="px-8 pb-8">
      {act.moments.map((moment, mi) => (
        <div
          key={mi}
          className="py-4 border-t border-[#C89B3C]/20 first:border-t-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Desktop moment row */}
          ...
          {/* Mobile moment row */}
          ...
        </div>
      ))}
    </div>
  </div>
</div>
```

Replace only the inner `<div className="px-8 pb-8">` and its children (keep the outer `grid` div and `overflow-hidden` div intact):

```tsx
{/* Expanded moment rows — animated with grid-rows trick */}
<div
  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
  }`}
>
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
            {/* Desktop moment row */}
            <div className="hidden md:flex items-baseline gap-4">
              <p
                className="text-xs uppercase tracking-[0.25em] shrink-0 w-36"
                style={{ color: "#C89B3C", fontFamily: "Playfair Display, serif" }}
              >
                {moment.timeRange}
              </p>
              <div>
                <p
                  className="text-base font-semibold"
                  style={{ color: "#F5EDD8", fontFamily: "Playfair Display, serif" }}
                >
                  {moment.title}
                </p>
                <p
                  className="text-sm italic mt-0.5"
                  style={{ color: "#F5EDD8", fontFamily: "Playfair Display, serif", opacity: 0.6 }}
                >
                  {moment.description}
                </p>
              </div>
            </div>
            {/* Mobile moment row */}
            <div className="md:hidden">
              <p
                className="text-xs uppercase tracking-[0.25em] mb-1"
                style={{ color: "#C89B3C", fontFamily: "Playfair Display, serif" }}
              >
                {moment.timeRange}
              </p>
              <p
                className="text-base font-semibold"
                style={{ color: "#F5EDD8", fontFamily: "Playfair Display, serif" }}
              >
                {moment.title}
              </p>
              <p
                className="text-sm italic mt-0.5"
                style={{ color: "#F5EDD8", fontFamily: "Playfair Display, serif", opacity: 0.6 }}
              >
                {moment.description}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </div>
</div>
```

- [ ] **Step 3: TypeScript check**

```powershell
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Verify stagger in browser**

With dev server running:
1. Click an Act card → rows fan in sequentially (stagger 50ms apart), each sliding up from y:8
2. Click to collapse → rows fade and slide back down; CSS `grid-rows` height collapses concurrently
3. Open a different card → previous card's rows exit, new rows stagger in
4. On mobile: accordion behaviour still works; scroll-into-view still fires

- [ ] **Step 5: Final TypeScript check**

```powershell
npx tsc --noEmit
```

Expected: exit 0, no errors.

- [ ] **Step 6: Commit**

```powershell
git add app/components/ProgramFlow.tsx
git commit -m "feat(program): staggered moment rows with AnimatePresence enter/exit"
```
