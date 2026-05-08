'use client';

import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Don't attach anything on touch-primary devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handlePointerLeave = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      setPos(null);
    };

    // Belt-and-suspenders: any touch clears the glow
    const handleTouch = () => setPos(null);

    window.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('touchstart', handleTouch, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  if (!pos) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        background: `radial-gradient(100px circle at ${pos.x}px ${pos.y}px, rgba(200,155,60,0.3), transparent)`,
      }}
    />
  );
}
