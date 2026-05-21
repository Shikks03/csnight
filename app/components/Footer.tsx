import React from "react";
import { Facebook, Instagram } from "lucide-react";
import { Reveal } from "./Reveal";

const LinkedInIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const socials = [
  { Icon: Facebook, href: "https://www.facebook.com/feutechACM" },
  { Icon: Instagram, href: "https://www.instagram.com/feutechacm/" },
  { Icon: LinkedInIcon, href: "https://www.linkedin.com/company/feutechacm/posts/?feedView=all" },
];

const navLinks = ["About", "Tickets", "FAQ", "Contact", "Handbook"];

export function Footer() {
  return (
    <footer className="relative bg-black pt-16 pb-10 sm:pt-20 sm:pb-12 md:pt-24 px-4 overflow-hidden">

      {/* Top Ornamental Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent" />
      {/* Ambient glow behind title */}
      <div
        className="absolute top-16 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "700px",
          height: "350px",
          background: "radial-gradient(ellipse at top, rgba(200,155,60,0.07) 0%, transparent 65%)",
        }}
      />

      <Reveal className="max-w-7xl mx-auto relative z-10">
        {/* Logo & Tagline */}
        <div className="text-center mb-12 md:mb-20">
          <div
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-6"
            style={{
              fontFamily: "Cinzel, serif",
              color: "#C89B3C",
              fontWeight: 700,
              textShadow: `0 0 80px rgba(200, 155, 60, 0.6), 0 0 40px rgba(200, 155, 60, 0.4), 2px 2px 8px rgba(0, 0, 0, 0.9)`,
              WebkitTextStroke: "1px rgba(139, 90, 0, 0.3)",
            }}
          >
            CS NIGHT
          </div>
          <p
            className="text-xl sm:text-2xl md:text-3xl italic mb-8"
            style={{ color: "#F5EDD8", fontFamily: "Cinzel, serif" }}
          >
            One night. A thousand memories.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-16 sm:w-24 h-[2px] bg-gradient-to-r from-transparent via-[#C89B3C] to-[#C89B3C]" />
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#F5EDD8] shadow-[0_0_10px_rgba(245,237,216,0.6)]"
                style={{ opacity: 0.3 + (2 - Math.abs(2 - i)) * 0.15 }}
              />
            ))}
            <div className="w-16 sm:w-24 h-[2px] bg-gradient-to-l from-transparent via-[#C89B3C] to-[#C89B3C]" />
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-16">
          {socials.map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="group relative w-12 h-12 sm:w-16 sm:h-16 border-[3px] border-[#C89B3C] flex items-center justify-center transition-all duration-500 hover:bg-[#C89B3C] hover:scale-110 hover:shadow-[0_0_40px_rgba(200,155,60,0.8)] active:bg-[#C89B3C] active:scale-110"
            >
              <Icon className="w-7 h-7 transition-colors duration-500 group-hover:text-[#0D1A2A] group-active:text-[#0D1A2A]" style={{ color: "#C89B3C" }} />
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-[#F5EDD8] opacity-50" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-[#F5EDD8] opacity-50" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-[#F5EDD8] opacity-50" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-[#F5EDD8] opacity-50" />
            </a>
          ))}
        </div>

        {/* Nav Links */}
        <div className="text-center mb-12">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-8 text-base">
            {navLinks.map((link, i) => (
              <span key={i} className="flex items-center gap-4">
                <a
                  href={link === "Handbook" ? "https://drive.google.com/file/d/1dh7xJAXCiE-ESUq8xlgnXEcx8Gx9K98f/view" : `#${link.toLowerCase()}`}
                  target={link === "Handbook" ? "_blank" : undefined}
                  rel={link === "Handbook" ? "noopener noreferrer" : undefined}
                  className="py-2 uppercase tracking-[0.2em] transition-all duration-300 hover:text-[#C89B3C] hover:tracking-[0.3em] active:text-[#C89B3C]"
                  style={{ color: "#F5EDD8", fontFamily: "Cinzel, serif" }}
                >
                  {link}
                </a>
                {i < navLinks.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-[#C89B3C]" />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Pearl Divider */}
        <div className="flex items-center gap-2 mb-12 max-w-4xl mx-auto">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#C89B3C]/50" />
          {[...Array(11)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#F5EDD8] shadow-[0_0_8px_rgba(245,237,216,0.5)]"
              style={{ opacity: 0.2 + (5 - Math.abs(5 - i)) * 0.1 }}
            />
          ))}
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#C89B3C]/50" />
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-lg mb-3" style={{ color: "#F5EDD8", fontFamily: "Cinzel, serif" }}>
            Organized by the FEU Tech <span style={{ color: "#C89B3C" }}>ACM</span> Student Chapter
          </p>
          <p className="text-sm uppercase tracking-[0.2em]" style={{ color: "#C89B3C", opacity: 0.7 }}>
            © 2026 CS Night · All rights reserved
          </p>
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C89B3C]/30" />
            <div className="w-2 h-2 rotate-45 bg-[#C89B3C]/30" />
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C89B3C]/30" />
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
