# FAQ Ornate Accordion Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the plain FAQ accordion with a dramatic Ornate Accordion featuring SVG corner brackets, Framer Motion animations, gold glow on active items, scroll-triggered stagger entrance, and a theatrical section background.

**Architecture:** Single-component rewrite of `app/components/Faq.tsx`. All animation uses `motion/react` (already installed). No new packages. The `lib/faq.ts` data file is unchanged.

**Tech Stack:** Next.js 15 App Router, Tailwind CSS v4, `motion/react` (Framer Motion v12), TypeScript

---

## File Map

| File | Change |
|---|---|
| `app/components/Faq.tsx` | Full rewrite — all animations and visual design |
| `.gitignore` | Add `.superpowers/` entry |

---

### Task 1: Update .gitignore

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add `.superpowers/` to .gitignore**

Open `.gitignore` and add this line in the `# os` section (at the bottom):

```
# superpowers brainstorm artifacts
.superpowers/
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: ignore .superpowers brainstorm artifacts"
```

---

### Task 2: Rewrite Faq.tsx — Background, Particles & Heading Animation

**Files:**
- Modify: `app/components/Faq.tsx`

The current file uses a `hidden` attribute toggle with no animations. Replace the entire file with the scaffold below, which adds:
- Radial gradient spotlight from above
- 6 floating gold particles using `motion.div` with infinite Y-drift
- Heading ornament animated entrance (`scaleX` from 0)

- [ ] **Step 1: Replace the entire contents of `app/components/Faq.tsx` with this**

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FAQ_ITEMS } from "@/lib/faq";

const PARTICLES = [
  { top: "12%", left: "5%",  size: 3, opacity: 0.15, duration: 4.0, delay: 0.0 },
  { top: "28%", left: "92%", size: 2, opacity: 0.10, duration: 5.0, delay: 0.8 },
  { top: "55%", left: "8%",  size: 2, opacity: 0.12, duration: 3.5, delay: 1.5 },
  { top: "70%", left: "88%", size: 3, opacity: 0.10, duration: 6.0, delay: 0.4 },
  { top: "85%", left: "15%", size: 2, opacity: 0.08, duration: 4.5, delay: 1.2 },
  { top: "40%", left: "95%", size: 2, opacity: 0.10, duration: 5.5, delay: 2.0 },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative bg-[#0A1628] py-24 px-4 overflow-hidden">

      {/* Theatrical spotlight from above */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "800px",
          height: "500px",
          background: "radial-gradient(ellipse at top, rgba(200,155,60,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Floating gold particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: "#C89B3C",
            opacity: p.opacity,
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl text-center mb-4"
          style={{ fontFamily: "Playfair Display, serif", color: "#C89B3C", fontWeight: 700 }}
        >
          Frequently Asked Questions
        </h2>

        {/* Gold ornament — animates in on scroll */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-16"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex-1 max-w-[120px] h-[1px] bg-gradient-to-r from-transparent to-[#C89B3C]" />
          <div className="w-2 h-2 rotate-45 bg-[#C89B3C]" />
          <div className="flex-1 max-w-[120px] h-[1px] bg-gradient-to-l from-transparent to-[#C89B3C]" />
        </motion.div>

        {/* FAQ accordion — placeholder, filled in Task 3 */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border border-[#C89B3C]/30 px-6 py-5">
              <span style={{ color: "#F5EDD8", fontFamily: "Playfair Display, serif" }}>
                {item.question}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors. If it fails, check that `motion` imports are `from "motion/react"` (not `from "framer-motion"`).

- [ ] **Step 3: Commit**

```bash
git add app/components/Faq.tsx
git commit -m "feat(faq): add section background, particles, and heading entrance animation"
```

---

### Task 3: Accordion Cards — Entrance Stagger + SVG Corners + Dynamic Border States

**Files:**
- Modify: `app/components/Faq.tsx`

Replace the placeholder accordion div (the `space-y-3` block and everything inside it) with full card markup. Each card gets:
- `motion.div` with `whileInView` stagger entrance
- 4 SVG corner brackets (identical treatment to the Tickets section)
- Dynamic border color and box-shadow based on `openIndex`

- [ ] **Step 1: Replace the `{/* FAQ accordion — placeholder */}` block with this**

Find this in `app/components/Faq.tsx`:
```tsx
        {/* FAQ accordion — placeholder, filled in Task 3 */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border border-[#C89B3C]/30 px-6 py-5">
              <span style={{ color: "#F5EDD8", fontFamily: "Playfair Display, serif" }}>
                {item.question}
              </span>
            </div>
          ))}
        </div>
```

Replace it with:
```tsx
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                className="relative overflow-hidden"
                style={{
                  border: isOpen ? "1px solid #C89B3C" : "1px solid rgba(200,155,60,0.3)",
                  boxShadow: isOpen
                    ? "0 0 25px rgba(200,155,60,0.3), inset 0 0 40px rgba(200,155,60,0.06)"
                    : "none",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
              >
                {/* SVG corner brackets */}
                <svg className="absolute top-0 left-0 w-4 h-4 -translate-x-px -translate-y-px pointer-events-none" viewBox="0 0 100 100">
                  <path d="M0,0 L100,0 L100,20 L20,20 L20,100 L0,100 Z" fill="#C89B3C" opacity={isOpen ? "1" : "0.5"} />
                </svg>
                <svg className="absolute top-0 right-0 w-4 h-4 translate-x-px -translate-y-px pointer-events-none" viewBox="0 0 100 100">
                  <path d="M100,0 L0,0 L0,20 L80,20 L80,100 L100,100 Z" fill="#C89B3C" opacity={isOpen ? "1" : "0.5"} />
                </svg>
                <svg className="absolute bottom-0 left-0 w-4 h-4 -translate-x-px translate-y-px pointer-events-none" viewBox="0 0 100 100">
                  <path d="M0,100 L100,100 L100,80 L20,80 L20,0 L0,0 Z" fill="#C89B3C" opacity={isOpen ? "1" : "0.5"} />
                </svg>
                <svg className="absolute bottom-0 right-0 w-4 h-4 translate-x-px translate-y-px pointer-events-none" viewBox="0 0 100 100">
                  <path d="M100,100 L0,100 L0,80 L80,80 L80,0 L100,0 Z" fill="#C89B3C" opacity={isOpen ? "1" : "0.5"} />
                </svg>

                {/* Button placeholder — filled in Task 4 */}
                <button
                  id={`faq-btn-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span
                    className="text-base md:text-lg font-medium pr-4 transition-colors duration-300"
                    style={{
                      fontFamily: "Playfair Display, serif",
                      color: isOpen ? "#C89B3C" : "#F5EDD8",
                    }}
                  >
                    {item.question}
                  </span>
                  <span aria-hidden="true" style={{ color: "#C89B3C", fontSize: "1.25rem" }}>
                    +
                  </span>
                </button>

                {/* Answer panel placeholder — filled in Task 4 */}
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  hidden={!isOpen}
                  className="px-6 pb-5 border-t border-[#C89B3C]/20"
                >
                  <p className="text-base leading-relaxed pt-4" style={{ color: "#8BA3BF", fontFamily: "Inter, sans-serif" }}>
                    {item.answer}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </div>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add app/components/Faq.tsx
git commit -m "feat(faq): add card entrance stagger, SVG corners, and dynamic border/glow states"
```

---

### Task 4: AnimatePresence Accordion + Button Shimmer + Icon Rotation

**Files:**
- Modify: `app/components/Faq.tsx`

This task replaces the `hidden`-attribute answer panel with `AnimatePresence` + smooth height animation, adds the shimmer sweep to the button, and animates the `+` icon rotation.

- [ ] **Step 1: Replace the button placeholder block**

Find this block inside the `FAQ_ITEMS.map(...)`:
```tsx
                {/* Button placeholder — filled in Task 4 */}
                <button
                  id={`faq-btn-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span
                    className="text-base md:text-lg font-medium pr-4 transition-colors duration-300"
                    style={{
                      fontFamily: "Playfair Display, serif",
                      color: isOpen ? "#C89B3C" : "#F5EDD8",
                    }}
                  >
                    {item.question}
                  </span>
                  <span aria-hidden="true" style={{ color: "#C89B3C", fontSize: "1.25rem" }}>
                    +
                  </span>
                </button>
```

Replace with:
```tsx
                <button
                  id={`faq-btn-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="relative w-full flex items-center justify-between px-6 py-5 text-left overflow-hidden group"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  {/* Shimmer sweep on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C89B3C]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

                  <span
                    className="relative z-10 text-base md:text-lg font-medium pr-4 transition-colors duration-300"
                    style={{
                      fontFamily: "Playfair Display, serif",
                      color: isOpen ? "#C89B3C" : "#F5EDD8",
                    }}
                  >
                    {item.question}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    aria-hidden="true"
                    className="relative z-10 flex-shrink-0 text-xl"
                    style={{ color: "#C89B3C", display: "inline-block" }}
                  >
                    +
                  </motion.span>
                </button>
```

- [ ] **Step 2: Replace the answer panel placeholder block**

Find:
```tsx
                {/* Answer panel placeholder — filled in Task 4 */}
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  hidden={!isOpen}
                  className="px-6 pb-5 border-t border-[#C89B3C]/20"
                >
                  <p className="text-base leading-relaxed pt-4" style={{ color: "#8BA3BF", fontFamily: "Inter, sans-serif" }}>
                    {item.answer}
                  </p>
                </div>
```

Replace with:
```tsx
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-6 pb-5 border-t border-[#C89B3C]/20">
                        <p
                          className="text-base leading-relaxed pt-4"
                          style={{ color: "#8BA3BF", fontFamily: "Inter, sans-serif" }}
                        >
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add app/components/Faq.tsx
git commit -m "feat(faq): add AnimatePresence accordion, button shimmer, and icon rotation"
```

---

### Task 5: Footer Ornamental Dots + Final Visual Check

**Files:**
- Modify: `app/components/Faq.tsx`

Add the graduating-opacity dot row below the accordion (matches Tickets section). Then run dev server and verify everything looks correct in the browser.

- [ ] **Step 1: Add the footer dots below the `space-y-3` accordion div**

Find the closing `</div>` of the `space-y-3` accordion div and add the following immediately after it (still inside `<div className="max-w-3xl mx-auto relative z-10">`):

```tsx
        {/* Footer ornamental dots */}
        <div className="flex items-center justify-center gap-3 mt-12">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#C89B3C]/50" />
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[#F5EDD8] shadow-[0_0_10px_rgba(245,237,216,0.6)]"
              style={{ opacity: 0.3 + (3 - Math.abs(3 - i)) * 0.15 }}
            />
          ))}
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#C89B3C]/50" />
        </div>
```

- [ ] **Step 2: Build check**

```bash
npm run build
```

Expected: clean build, no errors.

- [ ] **Step 3: Start dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:3000` and scroll to the FAQ section. Verify:
- Section has a subtle gold spotlight glow from above
- 6 tiny gold dots float gently in the background
- Gold rule ornament animates in (expands from center) as you scroll to the section
- FAQ cards cascade in with a stagger delay as you scroll past them
- Each card has tiny SVG corner brackets
- Hovering a closed card shows a shimmer sweep across the button
- Clicking a card: border turns full gold, corners brighten, inner glow appears, answer slides open smoothly
- The `+` icon rotates 45° to form `×` when the item opens
- Clicking the open card: answer slides closed smoothly, border returns to dim gold, corners dim
- Ornamental dot row appears below the last card

- [ ] **Step 4: Final commit**

```bash
git add app/components/Faq.tsx
git commit -m "feat(faq): add footer ornamental dots — ornate accordion redesign complete"
```
