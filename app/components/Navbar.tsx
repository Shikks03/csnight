"use client";
import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "top-0 bg-[#050B14]/90 backdrop-blur-md border-b border-[#C89B3C]/20 py-3"
          : "top-4 md:top-8 bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex flex-col items-start group cursor-pointer"
        >
          <span
            className="text-2xl font-bold tracking-widest leading-none transition-colors duration-300 group-hover:text-[#E5C06B]"
            style={{ fontFamily: "Playfair Display, serif", color: "#C89B3C" }}
          >
            CS NIGHT
          </span>
          <span
            className="text-[10px] uppercase tracking-[0.3em] leading-none mt-0.5"
            style={{ color: "#F5EDD8", opacity: 0.6 }}
          >
            A Masquerade Grand Ball
          </span>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {["about", "experience", "tickets"].map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-xs uppercase tracking-[0.25em] transition-all duration-300 hover:text-[#C89B3C] cursor-pointer"
              style={{ fontFamily: "Playfair Display, serif", color: "#F5EDD8" }}
            >
              {link === "experience" ? "What Awaits" : link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("tickets")}
            className="group relative px-7 py-2.5 bg-transparent border-2 overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(200,155,60,0.4)] cursor-pointer"
            style={{
              borderColor: "#C89B3C",
              fontFamily: "Playfair Display, serif",
              color: "#C89B3C",
            }}
          >
            <span className="relative z-10 text-xs tracking-[0.2em] uppercase font-semibold">
              RSVP
            </span>
            <div className="absolute inset-0 bg-[#C89B3C]/10 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block h-[1px] bg-[#C89B3C] transition-all duration-300 ${
                i === 1 && menuOpen ? "opacity-0 w-4" : "w-6"
              } ${i === 0 && menuOpen ? "rotate-45 translate-y-2" : ""} ${
                i === 2 && menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#050B14]/95 backdrop-blur-md border-t border-[#C89B3C]/20 px-6 py-8 flex flex-col gap-6">
          {["about", "experience", "tickets"].map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-left text-sm uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[#C89B3C] cursor-pointer"
              style={{ fontFamily: "Playfair Display, serif", color: "#F5EDD8" }}
            >
              {link === "experience" ? "What Awaits" : link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("tickets")}
            className="self-start px-8 py-3 border-2 border-[#C89B3C] text-[#C89B3C] text-xs tracking-[0.2em] uppercase cursor-pointer"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            RSVP
          </button>
        </div>
      )}
    </nav>
  );
}
