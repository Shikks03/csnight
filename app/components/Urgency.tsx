"use client";
import { Crown, Users, Shirt } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";

const items: { icon: LucideIcon; title: string; subtitle: string }[] = [
  { icon: Crown, title: "One Night Only", subtitle: "June 27 — an evening that happens once" },
  { icon: Users, title: "Limited Seats", subtitle: "Exclusivity by design. Reserve yours now." },
  { icon: Shirt, title: "Dress to Impress", subtitle: "Formal attire. Fit mandatory. Elegance expected." },
];

export function Urgency() {
  const scrollToTickets = () => {
    document.getElementById("tickets")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 sm:py-28 md:py-40 px-4 bg-gradient-to-b from-black via-black to-[#0A1628] overflow-hidden">
      {/* Spotlight */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_50%_65%,rgba(200,155,60,0.07)_0%,transparent_55%)]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Message */}
        <Reveal><div className="text-center mb-12 md:mb-20">
          <h2
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight"
            style={{
              fontFamily: "Cinzel, serif",
              color: "#C89B3C",
              fontWeight: 700,
              textShadow: `0 0 60px rgba(200, 155, 60, 0.6), 0 0 30px rgba(200, 155, 60, 0.4), 2px 2px 8px rgba(0, 0, 0, 0.9)`,
            }}
          >
            The night of a lifetime —
          </h2>
          <p
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl italic"
            style={{
              fontFamily: "Cinzel, serif",
              color: "#F5EDD8",
              textShadow: "2px 2px 30px rgba(0,0,0,0.9)",
            }}
          >
            don&apos;t watch it from the outside.
          </p>

          <div className="flex items-center justify-center gap-4 mt-12">
            <div className="w-16 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-[#C89B3C] to-[#C89B3C]" />
            <div className="w-4 h-4 rotate-45 bg-[#C89B3C] shadow-[0_0_20px_rgba(200,155,60,0.8)]" />
            <div className="w-16 sm:w-32 h-[2px] bg-gradient-to-l from-transparent via-[#C89B3C] to-[#C89B3C]" />
          </div>
        </div></Reveal>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-20">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={index} delay={index * 0.1} className="h-full">
              <div className="group text-center relative h-full flex flex-col">
                <div className="absolute inset-0 border-2 border-[#C89B3C]/30 group-hover:border-[#C89B3C] transition-colors duration-500" />
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(200,155,60,0.05)] group-hover:shadow-[inset_0_0_60px_rgba(200,155,60,0.15)] transition-shadow duration-500" />

                <div className="relative p-8 pt-12 flex flex-col flex-1 items-center">
                  <div className="inline-block mb-6 relative">
                    <div className="w-20 h-20 border-[3px] border-[#C89B3C] flex items-center justify-center bg-gradient-to-br from-[#C89B3C]/20 to-transparent group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-10 h-10" style={{ color: "#C89B3C" }} />
                    </div>
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-[#F5EDD8]" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-[#F5EDD8]" />
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-[#F5EDD8]" />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-[#F5EDD8]" />
                  </div>

                  <h3
                    className="text-3xl mb-4 tracking-wide"
                    style={{ fontFamily: "Cinzel, serif", color: "#C89B3C", fontWeight: 700 }}
                  >
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#C89B3C]" />
                    ))}
                  </div>

                  <p className="text-lg leading-relaxed px-4 mt-auto" style={{ color: "#F5EDD8" }}>
                    {item.subtitle}
                  </p>
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>

        {/* CTA Button */}
        <Reveal delay={0.25}><div className="text-center relative">
          <div className="inline-block relative">
            <div className="absolute -inset-3 sm:-inset-8 border border-[#C89B3C]/30 pointer-events-none" />
            <button
              onClick={scrollToTickets}
              className="group relative px-8 py-5 sm:px-16 sm:py-8 bg-gradient-to-b from-[#C89B3C] to-[#8B6914] overflow-hidden transition-all duration-700 hover:shadow-[0_0_80px_rgba(200,155,60,0.8)] hover:scale-105 cursor-pointer"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              <span className="relative z-10 text-lg tracking-[0.12em] sm:text-2xl sm:tracking-[0.2em] md:text-3xl uppercase text-[#0D1A2A] font-bold">
                Reserve your seat now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="absolute inset-0 border-2 border-[#FFD700]/50 group-hover:border-[#FFD700] transition-colors duration-500" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 mt-16">
            <div className="w-14 sm:w-24 h-[2px] bg-gradient-to-r from-transparent to-[#C89B3C]/50" />
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#F5EDD8] shadow-[0_0_10px_rgba(245,237,216,0.6)]"
                style={{ opacity: 0.3 + (2 - Math.abs(2 - i)) * 0.15 }}
              />
            ))}
            <div className="w-14 sm:w-24 h-[2px] bg-gradient-to-l from-transparent to-[#C89B3C]/50" />
          </div>
        </div></Reveal>
      </div>
    </section>
  );
}
