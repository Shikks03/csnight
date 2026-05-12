/*
 * CS Night Hero — Scroll-Scrubbing Frame Sequence
 * ================================================
 *
 * SETUP: Extract frames from your video (run from project root):
 *   ffmpeg -i "path/to/video.mp4" -vf "fps=24,scale=1920:-1" public/frames/frame_%04d.webp
 *
 * Then count your frames and update FRAME_COUNT:
 *   PowerShell: (Get-ChildItem public/frames/*.webp).Count
 *   Bash:       ls public/frames/*.webp | wc -l
 *
 * CONFIG — adjust these two values to match your video:
 */
const FRAME_COUNT = 80;       // Total number of extracted frames
const SCROLL_DISTANCE = 750; // Pixels of scroll to play through all frames (higher = slower)
const BASE_PATH = '/frames/frame_';

(function () {
  /* ── State ──────────────────────────────────────────────────────── */
  let canvas, ctx, heroSection, loadingEl, overlayEl;
  let currentFrame = 0;
  const images = new Array(FRAME_COUNT);

  /* ── Helpers ────────────────────────────────────────────────────── */
  function padIndex(n) {
    return String(n + 1).padStart(4, '0');
  }

  /* ── Canvas sizing with DPR support ─────────────────────────────── */
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    // setTransform prevents scale from stacking on repeated calls
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /* ── Cover-fit draw (equivalent to object-fit: cover) ───────────── */
  function drawFrame(index) {
    const img = images[index];
    if (!img || !img.naturalWidth) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const ox = (w - img.naturalWidth * scale) / 2;
    const oy = (h - img.naturalHeight * scale) / 2;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, ox, oy, img.naturalWidth * scale, img.naturalHeight * scale);
    currentFrame = index;
  }

  /* ── Preload all frames with progress indicator ─────────────────── */
  function preloadFrames(onComplete) {
    let done = 0;
    let failed = 0;

    function onDone() {
      done++;
      const total = done + failed;
      const pct = Math.round((total / FRAME_COUNT) * 100);
      if (loadingEl) loadingEl.textContent = 'Loading... ' + pct + '%';
      window.dispatchEvent(new CustomEvent('hero:loadProgress', { detail: { percent: pct } }));
      if (total === FRAME_COUNT) {
        window.dispatchEvent(new Event('hero:loadComplete'));
        if (failed === FRAME_COUNT) {
          console.warn('[hero] All frames failed to load — showing static fallback');
          showFallback();
        } else {
          onComplete();
        }
      }
    }

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      images[i] = img;
      img.onload = onDone;
      img.onerror = () => {
        failed++;
        if (i === 0) console.warn('[hero] First frame 404 — check BASE_PATH and FRAME_COUNT');
        onDone();
      };
      img.src = BASE_PATH + padIndex(i) + '.webp';
    }
  }

  /* ── GSAP ScrollTrigger setup ───────────────────────────────────── */
  function initScrollTrigger() {
    gsap.registerPlugin(ScrollTrigger);

    const playhead = { frame: 0 };

    gsap.to(playhead, {
      frame: FRAME_COUNT - 1,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: '+=' + SCROLL_DISTANCE,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        onLeave: () => window.dispatchEvent(new Event('hero:scrollComplete')),
        onEnterBack: () => window.dispatchEvent(new Event('hero:scrollEnter')),
      },
      onUpdate: () => drawFrame(Math.round(playhead.frame)),
    });

    // Draw first frame immediately so canvas isn't blank
    drawFrame(0);
  }

  /* ── Static fallback if frames unavailable ──────────────────────── */
  function showFallback() {
    if (loadingEl) loadingEl.style.display = 'none';
    if (ctx) {
      ctx.fillStyle = '#050B14';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
    revealOverlay();
  }

  /* ── Fade in overlay text after load ────────────────────────────── */
  function revealOverlay() {
    if (!overlayEl) return;
    overlayEl.style.opacity = '1';
    overlayEl.style.transform = 'translateY(0)';
  }

  /* ── Main init ──────────────────────────────────────────────────── */
  function initHero() {
    canvas = document.getElementById('hero-canvas');
    heroSection = document.getElementById('hero-section');
    loadingEl = document.getElementById('hero-loading');
    overlayEl = document.getElementById('hero-overlay');

    if (!canvas || !heroSection) {
      console.warn('[hero] Required DOM elements (#hero-canvas, #hero-section) not found');
      return;
    }

    ctx = canvas.getContext('2d');
    resizeCanvas();

    window.addEventListener('resize', () => {
      resizeCanvas();
      drawFrame(currentFrame);
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });

    preloadFrames(() => {
      if (loadingEl) loadingEl.style.display = 'none';
      revealOverlay();
      // Wait for the envelope overlay to dismiss before setting up ScrollTrigger,
      // so that body.overflow is restored and GSAP can measure scroll metrics correctly.
      window.addEventListener('hero:revealed', function onRevealed() {
        window.removeEventListener('hero:revealed', onRevealed);
        initScrollTrigger();
      }, { once: true });
    });
  }

  /* ── Wait for GSAP + ScrollTrigger to be available ──────────────── */
  function waitForGSAP(callback) {
    if (window.gsap && window.ScrollTrigger) {
      callback();
    } else {
      setTimeout(() => waitForGSAP(callback), 50);
    }
  }

  /* ── Entry point ────────────────────────────────────────────────── */
  window.initHero = initHero;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => waitForGSAP(initHero));
  } else {
    waitForGSAP(initHero);
  }
})();
