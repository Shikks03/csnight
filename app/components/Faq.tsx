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
