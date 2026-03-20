# Cursor Glow Effect Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a gold radial glow that follows the cursor across every page of the CS Night website.

**Architecture:** A single `'use client'` React component tracks mouse position and renders a fixed, full-viewport `div` with a dynamic `radial-gradient`. It is mounted once in `app/layout.tsx` so it covers the entire site without touching any other component.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript 5

**Spec:** `docs/superpowers/specs/2026-03-20-cursor-glow-design.md`

---

### Task 1: Create the CursorGlow component

**Files:**
- Create: `app/components/CursorGlow.tsx`

- [ ] **Step 1: Create the file with the following content**

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(200,155,60,0.08), transparent)`,
      }}
    />
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit** *(skip if git is not initialized)*

```bash
git add app/components/CursorGlow.tsx
git commit -m "feat: add CursorGlow client component"
```

---

### Task 2: Integrate into layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Import CursorGlow and add it to `<body>`**

Open `app/layout.tsx`. The current body is `<body>{children}</body>`. Change it to:

```tsx
import CursorGlow from './components/CursorGlow';

// ... inside RootLayout:
<body>
  <CursorGlow />
  {children}
</body>
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit** *(skip if git is not initialized)*

```bash
git add app/layout.tsx
git commit -m "feat: mount CursorGlow in root layout"
```

---

### Task 3: Verify in browser

- [ ] **Step 1: Start dev server**

Run: `npm run dev`

- [ ] **Step 2: Open the site and move the cursor**

Open `http://localhost:3000` in a browser. Move the mouse around.

Expected:
- A soft gold glow follows the cursor across the dark navy background
- The glow is subtle — visible but not overwhelming
- All buttons, links, and text remain fully clickable
- No layout shift or scroll disruption

- [ ] **Step 3: Check edge cases**

- Move cursor to page edges — glow should clip naturally without overflow scrollbars
- Scroll the page — glow should stay fixed to viewport (not scroll with content)
- On mobile/touch: glow stays off-screen (invisible). This is acceptable per spec.

- [ ] **Step 4: Stop dev server and confirm build passes**

Run: `npm run build`
Expected: build completes with no errors
