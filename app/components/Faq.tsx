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

              </motion.div>
            );
          })}
        </div>

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

      </div>
    </section>
  );
}
