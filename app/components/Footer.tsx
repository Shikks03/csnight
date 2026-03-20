import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const socials = [
  { Icon: Facebook, href: "https://facebook.com" },
  { Icon: Instagram, href: "https://instagram.com" },
  { Icon: Twitter, href: "https://twitter.com" },
  { Icon: Mail, href: "mailto:csnight@university.edu" },
];

const navLinks = ["About", "Tickets", "FAQ", "Contact"];

export function Footer() {
  return (
    <footer className="relative bg-black pt-24 pb-12 px-4 overflow-hidden">
      {/* Curtain Closure */}
      <div className="absolute inset-0 z-0 opacity-30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1747605975912-9349d22c6e19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* Top Ornamental Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Logo & Tagline */}
        <div className="text-center mb-16">
          <h2
            className="text-7xl md:text-8xl lg:text-9xl mb-6"
            style={{
              fontFamily: "Playfair Display, serif",
              color: "#C89B3C",
              fontWeight: 700,
              textShadow: `0 0 80px rgba(200, 155, 60, 0.6), 0 0 40px rgba(200, 155, 60, 0.4), 2px 2px 8px rgba(0, 0, 0, 0.9)`,
              WebkitTextStroke: "1px rgba(139, 90, 0, 0.3)",
            }}
          >
            CS NIGHT
          </h2>
          <p
            className="text-2xl md:text-3xl italic mb-8"
            style={{ color: "#F5EDD8", fontFamily: "Playfair Display, serif" }}
          >
            One night. A thousand memories.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#C89B3C] to-[#C89B3C]" />
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#F5EDD8] shadow-[0_0_10px_rgba(245,237,216,0.6)]"
                style={{ opacity: 0.3 + (2 - Math.abs(2 - i)) * 0.15 }}
              />
            ))}
            <div className="w-24 h-[2px] bg-gradient-to-l from-transparent via-[#C89B3C] to-[#C89B3C]" />
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-8 mb-16">
          {socials.map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="group relative w-16 h-16 border-[3px] border-[#C89B3C] flex items-center justify-center transition-all duration-500 hover:bg-[#C89B3C] hover:scale-110 hover:shadow-[0_0_40px_rgba(200,155,60,0.8)]"
            >
              <Icon className="w-7 h-7 transition-colors duration-500 group-hover:text-[#0D1A2A]" style={{ color: "#C89B3C" }} />
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-[#F5EDD8] opacity-50" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-[#F5EDD8] opacity-50" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-[#F5EDD8] opacity-50" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-[#F5EDD8] opacity-50" />
            </a>
          ))}
        </div>

        {/* Nav Links */}
        <div className="text-center mb-12">
          <div className="flex flex-wrap justify-center gap-8 text-base">
            {navLinks.map((link, i) => (
              <span key={i} className="flex items-center gap-8">
                <a
                  href={`#${link.toLowerCase()}`}
                  className="uppercase tracking-[0.2em] transition-all duration-300 hover:text-[#C89B3C] hover:tracking-[0.3em]"
                  style={{ color: "#F5EDD8", fontFamily: "Playfair Display, serif" }}
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
          <p className="text-lg mb-3" style={{ color: "#F5EDD8", fontFamily: "Playfair Display, serif" }}>
            Organized by the Association for Computing Machinery
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
      </div>
    </footer>
  );
}
