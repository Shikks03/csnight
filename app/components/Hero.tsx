"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Script from "next/script";

export function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (!isRevealed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isRevealed]);

  // Once the envelope is dismissed, fire hero:revealed so hero.js sets up ScrollTrigger
  // with body.overflow already restored (so GSAP measures scroll metrics correctly).
  useEffect(() => {
    if (isRevealed) {
      window.dispatchEvent(new Event('hero:revealed'));
    }
  }, [isRevealed]);

  const scrollToTickets = () => {
    document.getElementById("tickets")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      setIsRevealed(true);
      window.scrollTo({ top: 0 });
    }, 2800);
  };

  return (
    <>
      {/* Envelope Overlay Sequence */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050B14] overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
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
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  A Masquerade Grand Ball
                </div>
                <div
                  className="text-3xl tracking-widest text-[#C89B3C] font-bold"
                  style={{ fontFamily: "Playfair Display, serif" }}
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

      {/* Canvas Hero Section — pinned by GSAP ScrollTrigger */}
      <div id="hero-section">
        <canvas id="hero-canvas" />

        {/* Loading indicator — hidden by hero.js once all frames are loaded */}
        <div id="hero-loading">Loading... 0%</div>

        {/* Overlay — faded in by hero.js after preload completes */}
        <div id="hero-overlay">
          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto flex flex-col items-center">
            <p
              className="text-lg md:text-2xl mb-8 italic tracking-wide uppercase"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#F5EDD8",
                letterSpacing: "0.3em",
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              A Masquerade Grand Ball
            </p>

            <h1
              className="text-7xl md:text-[10rem] lg:text-[12rem] mb-6 tracking-wider leading-none"
              style={{
                fontFamily: "Playfair Display, serif",
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
              className="text-base md:text-xl mb-12 tracking-[0.15em] uppercase opacity-80"
              style={{ fontFamily: "Playfair Display, serif", color: "#F5EDD8" }}
            >
              June 27, 2026
            </p>

            <button
              onClick={scrollToTickets}
              className="group relative px-12 py-5 bg-transparent border-2 overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(200,155,60,0.4),_inset_0_0_20px_rgba(200,155,60,0.2)] cursor-pointer pointer-events-auto"
              style={{
                fontFamily: "Playfair Display, serif",
                borderColor: "#C89B3C",
                color: "#C89B3C",
              }}
            >
              <span className="relative z-10 text-lg md:text-xl tracking-[0.2em] uppercase font-semibold">
                RSVP Now
              </span>
              <div className="absolute inset-0 bg-[#C89B3C]/10 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce opacity-70">
            <div
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "#C89B3C", fontFamily: "Playfair Display, serif" }}
            >
              Scroll
            </div>
            <div className="w-[1px] h-10 bg-gradient-to-b from-[#C89B3C] to-transparent" />
          </div>
        </div>
      </div>

      <Script src="/hero.js" strategy="afterInteractive" />
    </>
  );
}
