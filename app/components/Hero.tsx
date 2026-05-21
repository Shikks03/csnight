"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Script from "next/script";

type Phase = "envelope" | "loading" | "revealed";

const LOADING_PHRASES = [
  "Lighting the chandeliers...",
  "Preparing the masquerade...",
  "Setting the grand stage...",
  "Adorning the ballroom...",
  "Welcoming the guests...",
];

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: (i * 37 + 11) % 97,
  size: i % 3 === 0 ? 4 : i % 3 === 1 ? 3 : 2,
  opacity: 0.12 + (i % 5) * 0.06,
  duration: 5 + (i % 7),
  delay: -(i * 0.8),
}));

function LoadingParticles() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#C89B3C]"
          style={{
            left: `${p.x}%`,
            bottom: "-4px",
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: -720,
            opacity: [p.opacity, p.opacity * 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("envelope");
  const [loadProgress, setLoadProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [heroMode, setHeroMode] = useState<"pending" | "canvas" | "poster">("pending");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const loadProgressRef = useRef(0);
  const loadStartRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)");
    setHeroMode(mq.matches ? "poster" : "canvas");
  }, []);

  // Block scroll until main page is revealed
  useEffect(() => {
    document.body.style.overflow = phase !== "revealed" ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  // Signal hero.js to init ScrollTrigger once envelope is gone
  useEffect(() => {
    if (phase === "revealed") {
      (window as any).__heroRevealed = true;
      window.dispatchEvent(new Event("hero:revealed"));
    }
  }, [phase]);

  // Track frame-load progress from hero.js; seed from global to catch missed events
  useEffect(() => {
    const heroLoad = (window as any).__heroLoad;
    if (heroLoad) {
      const pct = heroLoad.complete ? 100 : (heroLoad.percent || 0);
      setLoadProgress(pct);
      loadProgressRef.current = pct;
    }
    const onProgress = (e: Event) => {
      const pct = (e as CustomEvent<{ percent: number }>).detail.percent;
      setLoadProgress(pct);
      loadProgressRef.current = pct;
    };
    const onComplete = () => {
      setLoadProgress(100);
      loadProgressRef.current = 100;
    };
    window.addEventListener("hero:loadProgress", onProgress);
    window.addEventListener("hero:loadComplete", onComplete);
    return () => {
      window.removeEventListener("hero:loadProgress", onProgress);
      window.removeEventListener("hero:loadComplete", onComplete);
    };
  }, []);

  // Ease displayProgress toward real asset progress; reveal once loaded + 600ms min elapsed
  useEffect(() => {
    if (phase !== "loading") return;
    if (heroMode === "poster") {
      loadProgressRef.current = 100;
      setLoadProgress(100);
    }
    setDisplayProgress(0);
    loadStartRef.current = Date.now();
    let display = 0;
    let raf: number;
    let revealTimeout: ReturnType<typeof setTimeout>;
    let done = false;

    // Safety net: force completion after 15s so the page never hangs permanently
    const safetyTimer = setTimeout(() => {
      setLoadProgress(100);
      loadProgressRef.current = 100;
    }, 15000);

    const tick = () => {
      if (done) return;
      const target = loadProgressRef.current;
      const elapsed = Date.now() - loadStartRef.current;
      const diff = target - display;
      display = Math.abs(diff) < 0.5 ? target : display + diff * 0.12;
      setDisplayProgress(Math.round(display));
      if (target >= 100 && elapsed >= 600 && display >= 100) {
        done = true;
        revealTimeout = setTimeout(() => setPhase("revealed"), 300);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(revealTimeout);
      clearTimeout(safetyTimer);
    };
  }, [phase]);

  // Cycle loading phrases while waiting
  useEffect(() => {
    if (phase !== "loading") return;
    setPhraseIndex(0);
    const id = setInterval(() => {
      setPhraseIndex(i => (i + 1) % LOADING_PHRASES.length);
    }, 2400);
    return () => clearInterval(id);
  }, [phase]);

  const scrollToTickets = () => {
    document.getElementById("tickets")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      setPhase("loading");
      window.scrollTo({ top: 0 });
    }, 2800);
  };

  return (
    <>
      {/* Persistent backdrop — stays opaque until main page is ready, then fades away */}
      <AnimatePresence>
        {phase !== "revealed" && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[99] bg-[#050B14]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
          >
            {/* ── Envelope content ── */}
            <AnimatePresence>
              {phase === "envelope" && (
                <motion.div
                  key="envelope-content"
                  className="absolute inset-0 flex items-center justify-center overflow-hidden"
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                >
                  <motion.div
                    className="relative w-[90%] max-w-xl aspect-[3/2] cursor-pointer group"
                    onClick={handleOpen}
                    animate={
                      isOpen
                        ? { scale: 4, y: "40vh", opacity: 0 }
                        : { scale: 1, y: 0, opacity: 1 }
                    }
                    transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
                  >
                    {/* Back of Envelope */}
                    <div className="absolute inset-0 bg-[#0A141F] shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-sm" />

                    {/* Card inside */}
                    <motion.div
                      className="absolute inset-2 bg-[#0A1628] border-2 border-[#C89B3C]/50 flex flex-col items-center pt-8 z-[5] shadow-inner"
                      animate={isOpen ? { y: "-65%" } : { y: 0 }}
                      transition={{ duration: 0.9, delay: 0.6, ease: "backOut" }}
                    >
                      <div
                        className="text-sm italic text-[#F5EDD8] mb-2 opacity-80"
                        style={{ fontFamily: "Cinzel, serif" }}
                      >
                        A Masquerade Grand Ball
                      </div>
                      <div
                        className="text-3xl tracking-widest text-[#C89B3C] font-bold"
                        style={{ fontFamily: "Cinzel, serif" }}
                      >
                        CS NIGHT
                      </div>
                      <div className="w-12 h-[1px] bg-[#C89B3C]/50 mt-3" />
                    </motion.div>

                    {/* Left Flap */}
                    <div
                      className="absolute top-0 left-0 bottom-0 w-1/2 bg-[#0D1A2A] border-r border-[#C89B3C]/20 z-10 drop-shadow-md"
                      style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
                    />

                    {/* Right Flap */}
                    <div
                      className="absolute top-0 right-0 bottom-0 w-1/2 bg-[#0D1A2A] border-l border-[#C89B3C]/20 z-10 drop-shadow-md"
                      style={{ clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }}
                    />

                    {/* Bottom Flap */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[60%] bg-[#112236] border-t border-[#C89B3C]/30 z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.4)]"
                      style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
                    />

                    {/* Top Flap */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-[55%] bg-[#142840] border-b border-[#C89B3C]/40 shadow-[0_5px_15px_rgba(0,0,0,0.4)] origin-top"
                      style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                      initial={{ zIndex: 20 }}
                      animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />

                    {/* Gold Seal */}
                    <motion.div
                      className="absolute top-[55%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-[#E5C06B] via-[#C89B3C] to-[#8B6914] rounded-full shadow-[0_0_20px_rgba(200,155,60,0.6)] flex items-center justify-center border-2 border-[#FFE8A1]/50 z-30"
                      animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="font-serif text-[#4A3500] text-lg font-bold tracking-tighter">CS</span>
                    </motion.div>

                    {/* Hint Text */}
                    {!isOpen && (
                      <motion.div className="absolute -bottom-12 left-0 right-0 text-center text-[#C89B3C] tracking-[0.2em] uppercase text-xs animate-pulse font-serif">
                        Tap to Open Invitation
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Loading screen content ── */}
            <AnimatePresence>
              {phase === "loading" && (
                <motion.div
                  key="loading-content"
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <LoadingParticles />

                  {/* Corner accents */}
                  <span className="absolute top-6 left-6 w-8 h-8 border-t border-l border-[#C89B3C]/30" />
                  <span className="absolute top-6 right-6 w-8 h-8 border-t border-r border-[#C89B3C]/30" />
                  <span className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-[#C89B3C]/30" />
                  <span className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-[#C89B3C]/30" />

                  <div className="flex flex-col items-center gap-12 w-full max-w-sm px-10 mx-auto">
                    {/* Top ornament */}
                    <div className="flex items-center gap-4 w-full">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C89B3C]/50" />
                      <div className="w-2 h-2 rotate-45 bg-[#C89B3C]/60" />
                      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C89B3C]/50" />
                    </div>

                    {/* Seal + title */}
                    <div className="flex flex-col items-center gap-5">
                      <motion.div
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E5C06B] via-[#C89B3C] to-[#8B6914] flex items-center justify-center border border-[#FFE8A1]/30"
                        animate={{
                          boxShadow: [
                            "0 0 48px rgba(200,155,60,0.4)",
                            "0 0 72px rgba(200,155,60,0.85), 0 0 120px rgba(200,155,60,0.25)",
                            "0 0 48px rgba(200,155,60,0.4)",
                          ],
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <span
                          className="text-3xl font-bold tracking-tight text-[#2A1800]"
                          style={{ fontFamily: "Cinzel, serif" }}
                        >
                          CS
                        </span>
                      </motion.div>
                      <p
                        className="text-xs tracking-[0.35em] uppercase text-[#8BA3BF]/60"
                        style={{ fontFamily: "Cinzel, serif" }}
                      >
                        A Masquerade Grand Ball
                      </p>
                      <div
                        className="text-5xl font-bold tracking-widest text-[#C89B3C]"
                        style={{ fontFamily: "Cinzel, serif" }}
                      >
                        CS NIGHT
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full flex flex-col gap-3">
                      <div className="relative h-px w-full bg-[#C89B3C]/15 overflow-visible">
                        <motion.div
                          className="absolute top-0 left-0 h-px bg-gradient-to-r from-[#C89B3C]/60 to-[#C89B3C]"
                          style={{ width: `${displayProgress}%` }}
                          transition={{ duration: 0 }}
                        />
                        <motion.div
                          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#C89B3C] shadow-[0_0_12px_rgba(200,155,60,0.9),0_0_5px_rgba(255,232,161,0.6)]"
                          style={{ left: `${Math.min(displayProgress, 99.5)}%` }}
                          transition={{ duration: 0 }}
                        />
                      </div>

                      <div className="flex items-center justify-center h-6 overflow-hidden">
                        {displayProgress >= 100 ? (
                          <motion.p
                            key="ready"
                            className="text-xs tracking-[0.25em] uppercase text-[#C89B3C]/80 text-center"
                            style={{ fontFamily: "Cinzel, serif" }}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            Step into the night
                          </motion.p>
                        ) : (
                          <AnimatePresence mode="wait">
                            <motion.p
                              key={phraseIndex}
                              className="text-xs tracking-[0.2em] uppercase text-[#C89B3C]/60 text-center italic"
                              style={{ fontFamily: "Cinzel, serif" }}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                              {LOADING_PHRASES[phraseIndex]}
                            </motion.p>
                          </AnimatePresence>
                        )}
                      </div>
                    </div>

                    {/* Bottom ornament */}
                    <div className="flex items-center gap-4 w-full">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C89B3C]/50" />
                      <div className="w-2 h-2 rotate-45 bg-[#C89B3C]/60" />
                      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C89B3C]/50" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canvas Hero Section — pinned by GSAP ScrollTrigger */}
      <div id="hero-section">
        {heroMode === "poster" ? (
          <img
            src="/frames/frame_0001.webp"
            alt="CS Night — A Masquerade Grand Ball"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <canvas id="hero-canvas" />
        )}
        <div
          id="hero-overlay"
          style={phase === "revealed"
            ? { opacity: 1, transform: "translateY(0)" }
            : undefined}
        >
          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto flex flex-col items-center">
            <p
              className="text-base sm:text-lg md:text-2xl mb-8 italic tracking-[0.2em] sm:tracking-[0.3em] uppercase"
              style={{
                fontFamily: "Cinzel, serif",
                color: "#F5EDD8",
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              A Masquerade Grand Ball
            </p>

            <h1
              className="text-6xl sm:text-7xl md:text-[10rem] lg:text-[12rem] mb-6 tracking-wider leading-none"
              style={{
                fontFamily: "Cinzel, serif",
                fontWeight: 700,
                color: "#C89B3C",
                textShadow: `
                  0 0 60px rgba(200, 155, 60, 0.4),
                  2px 2px 4px rgba(0, 0, 0, 0.8),
                  -1px -1px 0px rgba(255, 215, 100, 0.2)
                `,
              }}
            >
              CS NIGHT
            </h1>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-4 mb-4 w-full max-w-md">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#C89B3C]" />
              <div className="w-2 h-2 rotate-45 bg-[#C89B3C]" />
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#C89B3C]" />
            </div>

            <p
              className="text-sm sm:text-base md:text-xl mb-12 tracking-[0.15em] uppercase opacity-80"
              style={{ fontFamily: "Cinzel, serif", color: "#F5EDD8" }}
            >
              June 27, 2026
            </p>

            <a
              href="https://forms.gle/DqDEvQLoxq3rhti56"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block px-8 py-4 sm:px-12 sm:py-5 bg-transparent border-2 overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(200,155,60,0.4),_inset_0_0_20px_rgba(200,155,60,0.2)] pointer-events-auto"
              style={{
                fontFamily: "Cinzel, serif",
                borderColor: "#C89B3C",
                color: "#C89B3C",
              }}
            >
              <span className="relative z-10 text-lg md:text-xl tracking-[0.2em] uppercase font-semibold">
                Reserve your Seat
              </span>
              <div className="absolute inset-0 bg-[#C89B3C]/10 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce opacity-70">
            <div
              className="text-[11px] uppercase tracking-[0.2em]"
              style={{ color: "#C89B3C", fontFamily: "Cinzel, serif" }}
            >
              Scroll
            </div>
            <div className="w-[1px] h-10 bg-gradient-to-b from-[#C89B3C] to-transparent" />
          </div>
        </div>
      </div>

      {heroMode === "canvas" && <Script src="/hero.js" strategy="afterInteractive" />}
    </>
  );
}
