"use client";
import React from "react";
import { Mail, Facebook, Instagram, ExternalLink } from "lucide-react";
import { Reveal } from "./Reveal";

const LinkedInIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const socials = [
  { Icon: Facebook,    label: "Facebook",  href: "https://www.facebook.com/feutechACM" },
  { Icon: Instagram,   label: "Instagram", href: "https://www.instagram.com/feutechacm/" },
  { Icon: LinkedInIcon, label: "LinkedIn", href: "https://www.linkedin.com/company/feutechacm/posts/?feedView=all" },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 px-4 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #060D1A 0%, #0A1628 100%)" }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,155,60,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(200,155,60,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "700px",
          height: "500px",
          background: "radial-gradient(ellipse, rgba(200,155,60,0.07) 0%, transparent 65%)",
        }}
      />

      <Reveal className="relative z-10 max-w-2xl mx-auto">

        {/* ── Section header ── */}
        <div className="mb-16">
          <p
            className="text-[11px] tracking-[0.55em] mb-5"
            style={{ color: "#C89B3C", fontFamily: "monospace" }}
          >
            // CONTACT
          </p>
          <h2
            className="text-5xl sm:text-6xl leading-tight"
            style={{ fontFamily: "Cinzel, serif", color: "#F5EDD8", fontWeight: 600 }}
          >
            Reach out.
          </h2>

          {/* Ornamental rule */}
          <div className="flex items-center gap-3 mt-8">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(200,155,60,0.7), transparent)" }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: "#C89B3C" }} />
            <div className="w-1.5 h-1.5 rotate-45 border" style={{ borderColor: "#C89B3C" }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: "#C89B3C" }} />
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, rgba(200,155,60,0.7), transparent)" }} />
          </div>
        </div>

        {/* ── Event Head card ── */}
        <div className="mb-5">
          <p
            className="text-[10px] tracking-[0.45em] mb-3 uppercase"
            style={{ color: "#8BA3BF", fontFamily: "monospace" }}
          >
            // EVENT HEAD
          </p>

          <div
            className="relative p-5 flex items-center justify-between transition-all duration-300"
            style={{
              border: "1px solid rgba(200,155,60,0.28)",
              background: "rgba(10,22,40,0.65)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2" style={{ borderColor: "rgba(200,155,60,0.55)" }} />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2" style={{ borderColor: "rgba(200,155,60,0.55)" }} />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2" style={{ borderColor: "rgba(200,155,60,0.55)" }} />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2" style={{ borderColor: "rgba(200,155,60,0.55)" }} />

            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-base font-bold"
                style={{
                  background: "linear-gradient(135deg, rgba(200,155,60,0.22), rgba(200,155,60,0.06))",
                  border: "1px solid rgba(200,155,60,0.45)",
                  color: "#C89B3C",
                  fontFamily: "Cinzel, serif",
                }}
              >
                S
              </div>
              <div>
                <p style={{ color: "#F5EDD8", fontFamily: "Cinzel, serif", fontWeight: 600 }} className="text-base leading-tight">
                  Shikkari Jerard Ipil
                </p>
                <p style={{ color: "#8BA3BF" }} className="text-sm mt-0.5">
                  Event Head
                </p>
              </div>
            </div>

            <a
              href="https://www.facebook.com/Shiksss.shiksss/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[11px] tracking-[0.18em] px-3.5 py-2 transition-all duration-300 hover:bg-[#C89B3C]/10 hover:border-[#C89B3C]/55 active:bg-[#C89B3C]/10 active:border-[#C89B3C]/55 whitespace-nowrap"
              style={{
                color: "#C89B3C",
                fontFamily: "Cinzel, serif",
                border: "1px solid rgba(200,155,60,0.3)",
              }}
            >
              View profile
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ── contact.config.ts card ── */}
        <div
          className="overflow-hidden"
          style={{
            border: "1px solid rgba(200,155,60,0.28)",
            background: "rgba(6,13,26,0.85)",
          }}
        >
          {/* Traffic-light header bar */}
          <div
            className="flex items-center gap-2 px-5 py-3"
            style={{
              borderBottom: "1px solid rgba(200,155,60,0.13)",
              background: "rgba(10,22,40,0.55)",
            }}
          >
            <span className="w-3 h-3 rounded-full" style={{ background: "rgba(255,95,87,0.85)" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "rgba(255,189,46,0.85)" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "rgba(40,201,64,0.85)" }} />
            <span
              className="ml-2 text-xs select-none"
              style={{ color: "#8BA3BF", fontFamily: "monospace" }}
            >
              contact.config.ts
            </span>
          </div>

          {/* Card body */}
          <div className="p-6 sm:p-8 space-y-7">

            {/* EMAIL row */}
            <div className="flex items-start gap-4">
              <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#C89B3C" }} />
              <div>
                <p
                  className="text-[10px] tracking-[0.4em] mb-1.5 uppercase"
                  style={{ color: "#C89B3C", fontFamily: "monospace" }}
                >
                  // EMAIL
                </p>
                <a
                  href="mailto:acm.feu.it@gmail.com"
                  className="transition-colors duration-200 hover:text-[#C89B3C] active:text-[#C89B3C] text-[15px]"
                  style={{ color: "#F5EDD8", fontFamily: "monospace" }}
                >
                  acm.feu.it@gmail.com
                </a>
                <p
                  className="text-xs italic mt-1"
                  style={{ color: "#8BA3BF", fontFamily: "monospace" }}
                >
                  // General inquiries, registration
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px" style={{ background: "rgba(200,155,60,0.1)" }} />

            {/* SOCIAL row */}
            <div>
              <p
                className="text-[10px] tracking-[0.4em] mb-4 uppercase"
                style={{ color: "#C89B3C", fontFamily: "monospace" }}
              >
                // SOCIAL
              </p>
              <div className="flex flex-wrap gap-3">
                {socials.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm px-4 py-2.5 transition-all duration-300 hover:bg-[#C89B3C]/10 hover:border-[#C89B3C]/55 active:bg-[#C89B3C]/10 active:border-[#C89B3C]/55"
                    style={{
                      color: "#F5EDD8",
                      fontFamily: "monospace",
                      border: "1px solid rgba(200,155,60,0.3)",
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "#C89B3C" }} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

      </Reveal>
    </section>
  );
}
