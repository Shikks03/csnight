"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/faq";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#0A1628] py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-4xl md:text-5xl text-center mb-4"
          style={{ fontFamily: "Playfair Display, serif", color: "#C89B3C", fontWeight: 700 }}
        >
          Frequently Asked Questions
        </h2>

        {/* Gold rule */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="flex-1 max-w-[120px] h-[1px] bg-gradient-to-r from-transparent to-[#C89B3C]" />
          <div className="w-2 h-2 rotate-45 bg-[#C89B3C]" />
          <div className="flex-1 max-w-[120px] h-[1px] bg-gradient-to-l from-transparent to-[#C89B3C]" />
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="border border-[#C89B3C]/30 overflow-hidden"
            >
              <button
                id={`faq-btn-${i}`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-[#C89B3C]/5"
                aria-expanded={openIndex === i}
                aria-controls={`faq-panel-${i}`}
              >
                <span
                  className="text-base md:text-lg font-medium pr-4"
                  style={{ fontFamily: "Playfair Display, serif", color: "#F5EDD8" }}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="text-xl flex-shrink-0 transition-transform duration-200"
                  style={{
                    color: "#C89B3C",
                    transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
                hidden={openIndex !== i}
                className="px-6 pb-5 border-t border-[#C89B3C]/20"
              >
                <p
                  className="text-base leading-relaxed pt-4"
                  style={{ color: "#8BA3BF", fontFamily: "Inter, sans-serif" }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
