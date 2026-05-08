# Program Flow Redesign — Design Spec

**Date:** 2026-05-03
**Component:** `app/components/ProgramFlow.tsx`
**Status:** Approved, ready for implementation planning

## Problem

The current ProgramFlow renders all 20 schedule items as an alternating vertical timeline. The result is ~2,800px of repetitive scrolling that fights the "elegant, simplistic" feel the rest of the site cultivates. On mobile (≥50% of expected visitors) the problem is worse: 20 stacked cards with no hierarchy.

The section has two jobs:
1. **Set the mood** — convey the arc of the evening at a glance
2. **Reference** — let curious visitors look up specific moments (when's dinner? when's the raffle?)

The current design optimises for neither. It buries the arc under detail, and forces scroll-hunting for any reference lookup.

## Solution: Three Acts

Group the 20 moments into three thematic acts. Render the default state as three Act cards (one per act). Each card expands in place to reveal its moments on tap/click. Default state fits in roughly one screen on desktop and three compact stacked cards on mobile.

This maps onto how an evening actually feels in memory ("the welcome part / dinner part / dance part") and makes the expand interaction opt-in: drilling into detail rewards curiosity without forcing it on every visitor.

## Act Grouping

Three acts, balanced 6 / 7 / 7 moments. Cotillion stays in Act II as the closing flourish of the formal portion (it precedes the open dance floor, so it reads as ceremony rather than party).

### Act I — The Welcome
- Time range: 3:20 – 5:35 PM
- Mood line: *"Doors open. The night begins."*
- Moments (6): Doors Open · Opening Video · Opening Ceremony · Welcome & Program Overview · Opening Remarks · Ice Breaker

### Act II — The Feast & the Honours
- Time range: 5:35 – 7:30 PM
- Mood line: *"A feast, then the moments that matter."*
- Moments (7): Live Performance · Buffet Dinner · Post-Dinner Intermission · Ice Breaker 2 · Awarding Segment · ACM Turnover Ceremony · Cotillion

### Act III — After Dark
- Time range: 7:30 – 10:00 PM
- Mood line: *"Lights down, music up — the floor is yours."*
- Moments (7): Dance Floor Opens · Evening Intermission · Special Mentions · Best Couple & Group Outfit · Raffle Draw · Closing Remarks · Safe Travels

The 20 moment objects (timeRange, title, description) carry over verbatim from the existing component — no copy rewriting.

## Visual Design

### Section heading (unchanged)
- Eyebrow: `— June 27, 2026 —` (Playfair gold, tracking-[0.4em])
- H2: `The Programme` (Playfair gold, 5xl/7xl, weight 700)
- Subhead: `Twenty moments. One unforgettable evening.` (Playfair italic cream/70)

### Act card — collapsed state
Visual language matches existing `ActCard`: `border border-[#C89B3C]/40` on `#0C1829` background. No drop shadows in default state — keep it quiet.

Card contents, top to bottom on **desktop**:
- Roman numeral (`I`, `II`, `III`) — Playfair, large (~7xl), gold, the visual anchor
- Time range — uppercase tracking-[0.25em] gold (matches existing label style)
- Act title — Playfair, 2xl/3xl, gold, weight 700
- Mood line — Playfair italic, cream/70
- Hairline gold divider
- Affordance: `View moments ↓` (small, gold, tracking-wide)

On **mobile** (< 768px): the Roman numeral sits **inline-left** of the time range rather than stacked above it (creates a horizontal "I — 3:20 PM" rhythm and saves vertical space). Numeral scales to ~5xl. Title drops to xl. The whole card is the tap target; the explicit `View moments ↓` is replaced by a small chevron `›` on the right that rotates 90° on expand.

### Act card — expanded state
- Card grows in place. Other cards stay where they are (just pushed down).
- Inside: a single column of moment rows, each `time · title · short description`, separated by hairline gold dividers (`border-[#C89B3C]/20`).
- On **mobile**, each moment's time and title stack onto two lines per row, keeping line lengths readable.
- Top-right `× Close` (small, gold) collapses the card.
- Smooth height transition (~300ms ease).

### Layout
- Desktop (≥ 768px): three cards in a row, equal width, within the existing `max-w-5xl` container.
- Mobile: cards stacked vertically, full width.
- When one card is expanded on desktop, it grows to full width and the row reflows so the remaining two cards sit below it side by side. (Single-column layout on mobile; no reflow gymnastics needed.)

## Interaction

- **Click/tap an act card** → expands in place; only one act open at a time. Tapping a different card collapses the current one and opens the new one.
- **Click/tap × Close** → collapses the open card.
- **On expand (mobile)**: smooth-scroll so the expanded card's header sits near the top of the viewport. Without this, users tap and feel like nothing happened because the new content is below the fold.
- **On expand (desktop)**: no auto-scroll needed since the expanded card stays in roughly the same position.
- **Hover affordances**: subtle border brighten (`/40` → `/70`) and 1px lift on desktop. None on touch devices (drop the existing pulse rings — they add nothing on touch and complicate the simpler design).

State held in the component as a single `useState<number | null>` — index of the open act, or null. No external library.

## Files

- **Modified:** `app/components/ProgramFlow.tsx` — full rewrite of render logic; 20-item array stays but is grouped into three acts (either as nested data or via index ranges).
- **No other files affected.** The component is self-contained and called from `app/page.tsx` with no props.

## Out of Scope

- Copy rewrites for the 20 moments (kept verbatim).
- Section heading copy.
- Any change to surrounding sections (Experience, Transition, Urgency).
- A "view all moments at once" mode — the expand/collapse is the only way to see detail. If a visitor wants the whole list, they open all three in sequence.

## Success Criteria

- Default state of the section fits within ~1 viewport on a 1440px desktop and shows three compact stacked cards on a 390px iPhone viewport.
- Tapping an act on mobile reveals its moments and the visitor can read them without losing the context of which act they're in.
- Visual language (colours, fonts, borders, spacing scale) is indistinguishable from the surrounding sections — the redesign should feel like it was always there.
