import { Reveal } from "./Reveal";

export function About() {
  return (
    <section
      id="about"
      className="relative py-16 sm:py-24 md:py-32 px-4 bg-[#080F1B] overflow-hidden"
    >

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <Reveal><div className="text-center mb-14 md:mb-20">
          <p
            className="text-[11px] tracking-[0.2em] sm:text-xs sm:tracking-[0.35em] uppercase mb-4"
            style={{ color: "#C89B3C", fontFamily: "Cinzel, serif" }}
          >
            — An Exclusive Evening —
          </p>
          <h2
            className="text-4xl sm:text-6xl md:text-8xl mb-6 relative inline-block"
            style={{
              fontFamily: "Cinzel, serif",
              color: "#C89B3C",
              fontWeight: 700,
              textShadow: `0 0 40px rgba(200, 155, 60, 0.5), 2px 2px 4px rgba(0, 0, 0, 0.8)`,
            }}
          >
            About the Night
            <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-linear-to-r from-transparent via-[#C89B3C] to-transparent" />
          </h2>
        </div></Reveal>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 md:gap-16 items-start">
          {/* Left Column — Invitation Letter */}
          <Reveal delay={0.1}><div className="space-y-8 relative">
            <div className="relative">
              <p
                className="drop-cap-p text-xl md:text-2xl leading-relaxed text-pretty"
                style={{ color: "#F5EDD8", fontFamily: "Cinzel, serif" }}
              >
                CS Night is not just another university event—it&apos;s the most prestigious grand ball of the year,
                exclusively crafted for Computer Science students and their distinguished guests.
              </p>
            </div>

            <p className="text-lg md:text-xl leading-relaxed" style={{ color: "#F5EDD8" }}>
              Step into an evening where elegance meets innovation, where the brightest minds in CS gather under crystal
              chandeliers to celebrate community, achievement, and the timeless art of connection.
            </p>

            <p
              className="text-lg md:text-xl leading-relaxed italic"
              style={{ color: "#C89B3C", fontFamily: "Cinzel, serif" }}
            >
              Behind every mask lies a story waiting to unfold. This is your invitation to be part of something
              unforgettable—a night where tradition and technology dance together in perfect harmony.
            </p>

            {/* Pearl Divider */}
            <div className="flex items-center gap-3 py-6">
              <div className="flex-1 h-px bg-linear-to-r from-transparent to-[#C89B3C]/50" />
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#F5EDD8] shadow-[0_0_10px_rgba(245,237,216,0.6)]"
                  style={{ opacity: 0.3 + i * 0.15 }}
                />
              ))}
              <div className="flex-1 h-px bg-linear-to-l from-transparent to-[#C89B3C]/50" />
            </div>

            {/* Limited Seats Card */}
            <div
              className="relative overflow-hidden"
              style={{ border: "1px solid rgba(200,155,60,0.35)", background: "rgba(200,155,60,0.04)" }}
            >
              {/* Corner accents */}
              <svg className="absolute top-0 left-0 w-8 h-8" viewBox="0 0 100 100">
                <path d="M0,0 L60,0 L60,10 L10,10 L10,60 L0,60 Z" fill="#C89B3C" opacity="0.6" />
              </svg>
              <svg className="absolute bottom-0 right-0 w-8 h-8" viewBox="0 0 100 100">
                <path d="M100,100 L40,100 L40,90 L90,90 L90,40 L100,40 Z" fill="#C89B3C" opacity="0.6" />
              </svg>

              <div className="px-5 py-5 gap-4 sm:px-8 sm:py-6 sm:gap-6 flex items-center">
                {/* Icon */}
                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 border border-[#C89B3C]/50 flex items-center justify-center bg-[#C89B3C]/10">
                  <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="#C89B3C" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                  </svg>
                </div>

                {/* Text */}
                <div>
                  <p
                    className="text-[11px] tracking-[0.2em] sm:text-xs sm:tracking-[0.35em] uppercase mb-1"
                    style={{ color: "#8BA3BF" }}
                  >
                    Capacity
                  </p>
                  <p
                    className="text-2xl leading-tight"
                    style={{ fontFamily: "Cinzel, serif", color: "#C89B3C", fontWeight: 700 }}
                  >
                    220 Seats Only
                  </p>
                  <p
                    className="text-sm mt-1 italic"
                    style={{ color: "#F5EDD8", opacity: 0.7, fontFamily: "Cinzel, serif" }}
                  >
                    170 CS Students · 50 External Participants
                  </p>
                </div>
              </div>
            </div>

            {/* First Come, First Served Card */}
            <div
              className="relative overflow-hidden"
              style={{ border: "1px solid rgba(200,155,60,0.35)", background: "rgba(200,155,60,0.04)" }}
            >
              {/* Corner accents */}
              <svg className="absolute top-0 left-0 w-8 h-8" viewBox="0 0 100 100">
                <path d="M0,0 L60,0 L60,10 L10,10 L10,60 L0,60 Z" fill="#C89B3C" opacity="0.6" />
              </svg>
              <svg className="absolute bottom-0 right-0 w-8 h-8" viewBox="0 0 100 100">
                <path d="M100,100 L40,100 L40,90 L90,90 L90,40 L100,40 Z" fill="#C89B3C" opacity="0.6" />
              </svg>

              <div className="px-5 py-5 gap-4 sm:px-8 sm:py-6 sm:gap-6 flex items-center">
                {/* Icon */}
                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 border border-[#C89B3C]/50 flex items-center justify-center bg-[#C89B3C]/10">
                  <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="#C89B3C" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>

                {/* Text */}
                <div>
                  <p className="text-[11px] tracking-[0.2em] sm:text-xs sm:tracking-[0.35em] uppercase mb-1" style={{ color: "#8BA3BF" }}>
                    Priority
                  </p>
                  <p
                    className="text-2xl leading-tight"
                    style={{ fontFamily: "Cinzel, serif", color: "#C89B3C", fontWeight: 700 }}
                  >
                    First Come, First Served
                  </p>
                  <p
                    className="text-sm mt-1 italic"
                    style={{ color: "#F5EDD8", opacity: 0.7, fontFamily: "Cinzel, serif" }}
                  >
                    Reserve early to secure your place
                  </p>
                </div>
              </div>
            </div>
          </div></Reveal>

          {/* Right Column — Formal Invitation Card */}
          <Reveal delay={0.2}><div className="relative lg:sticky lg:top-8 lg:-mt-8">
            <div
              className="relative bg-linear-to-b from-[#0D1A2A] via-[#0A1628] to-[#0D1A2A] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
              style={{ border: "1px solid rgba(200,155,60,0.4)" }}
            >
              {/* Inner glow */}
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(200,155,60,0.08)] pointer-events-none" />

              {/* Top decorative band */}
              <div className="h-1 w-full bg-linear-to-r from-transparent via-[#C89B3C] to-transparent" />

              {/* Corner Flourishes */}
              <svg className="absolute top-0 left-0 w-12 h-12" viewBox="0 0 100 100">
                <path d="M0,0 L60,0 L60,8 L8,8 L8,60 L0,60 Z" fill="#C89B3C" opacity="0.7" />
              </svg>
              <svg className="absolute top-0 right-0 w-12 h-12" viewBox="0 0 100 100">
                <path d="M100,0 L40,0 L40,8 L92,8 L92,60 L100,60 Z" fill="#C89B3C" opacity="0.7" />
              </svg>
              <svg className="absolute bottom-0 left-0 w-12 h-12" viewBox="0 0 100 100">
                <path d="M0,100 L60,100 L60,92 L8,92 L8,40 L0,40 Z" fill="#C89B3C" opacity="0.7" />
              </svg>
              <svg className="absolute bottom-0 right-0 w-12 h-12" viewBox="0 0 100 100">
                <path d="M100,100 L40,100 L40,92 L92,92 L92,40 L100,40 Z" fill="#C89B3C" opacity="0.7" />
              </svg>

              {/* Card content — centered invitation typography */}
              <div className="px-6 py-10 sm:px-10 sm:py-12 text-center space-y-0">
                <p
                  className="text-[11px] tracking-[0.2em] sm:text-xs sm:tracking-[0.35em] uppercase mb-6"
                  style={{ color: "#8BA3BF", fontFamily: "Cinzel, serif" }}
                >
                  The ACM-CS Community
                </p>
                <p
                  className="text-sm italic mb-2"
                  style={{ color: "#F5EDD8", fontFamily: "Cinzel, serif", opacity: 0.8 }}
                >
                  cordially invites you to
                </p>

                <h3
                  className="text-4xl tracking-wider my-5"
                  style={{
                    fontFamily: "Cinzel, serif",
                    color: "#C89B3C",
                    fontWeight: 700,
                    textShadow: "0 0 30px rgba(200, 155, 60, 0.5)",
                  }}
                >
                  CS Night 2026
                </h3>

                {/* Ornamental divider */}
                <div className="flex items-center justify-center gap-3 my-6">
                  <div className="w-16 h-px bg-linear-to-r from-transparent to-[#C89B3C]/60" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-[#C89B3C]" />
                  <div className="w-16 h-px bg-linear-to-l from-transparent to-[#C89B3C]/60" />
                </div>

                <p
                  className="text-base italic mb-8"
                  style={{ color: "#F5EDD8", fontFamily: "Cinzel, serif", opacity: 0.75 }}
                >
                  A Masquerade Grand Ball
                </p>

                {/* Details block */}
                <div className="space-y-5 border-t border-b border-[#C89B3C]/20 py-8 my-2">
                  <div>
                    <p className="text-[11px] tracking-[0.2em] sm:text-xs sm:tracking-[0.35em] uppercase mb-1" style={{ color: "#8BA3BF" }}>Date</p>
                    <p
                      className="text-2xl"
                      style={{ color: "#F5EDD8", fontFamily: "Cinzel, serif", fontWeight: 600 }}
                    >
                      June 27, 2026
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-px bg-[#C89B3C]/30" />
                    <div className="w-1 h-1 rounded-full bg-[#C89B3C]/50" />
                    <div className="w-10 h-px bg-[#C89B3C]/30" />
                  </div>

                  <div>
                    <p className="text-[11px] tracking-[0.2em] sm:text-xs sm:tracking-[0.35em] uppercase mb-1" style={{ color: "#8BA3BF" }}>Time</p>
                    <p
                      className="text-2xl"
                      style={{ color: "#F5EDD8", fontFamily: "Cinzel, serif", fontWeight: 600 }}
                    >
                      4:30 – 9:00 PM
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-px bg-[#C89B3C]/30" />
                    <div className="w-1 h-1 rounded-full bg-[#C89B3C]/50" />
                    <div className="w-10 h-px bg-[#C89B3C]/30" />
                  </div>

                  <div>
                    <p className="text-[11px] tracking-[0.2em] sm:text-xs sm:tracking-[0.35em] uppercase mb-1" style={{ color: "#8BA3BF" }}>Doors Open</p>
                    <p
                      className="text-2xl"
                      style={{ color: "#F5EDD8", fontFamily: "Cinzel, serif", fontWeight: 600 }}
                    >
                      3:20 PM
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-px bg-[#C89B3C]/30" />
                    <div className="w-1 h-1 rounded-full bg-[#C89B3C]/50" />
                    <div className="w-10 h-px bg-[#C89B3C]/30" />
                  </div>

                  <div>
                    <p className="text-[11px] tracking-[0.2em] sm:text-xs sm:tracking-[0.35em] uppercase mb-1" style={{ color: "#8BA3BF" }}>Venue</p>
                    <p
                      className="text-2xl"
                      style={{ color: "#F5EDD8", fontFamily: "Cinzel, serif", fontWeight: 600 }}
                    >
                      FEU Tech — 17th Floor Gymnasium
                    </p>
                  </div>
                </div>

                {/* Dress Code */}
                <div className="pt-6">
                  <p className="text-[11px] tracking-[0.2em] sm:text-xs sm:tracking-[0.35em] uppercase mb-3" style={{ color: "#8BA3BF" }}>
                    Dress Code
                  </p>
                  <p
                    className="text-2xl"
                    style={{
                      fontFamily: "Cinzel, serif",
                      color: "#C89B3C",
                      fontWeight: 700,
                      textShadow: "0 0 20px rgba(200, 155, 60, 0.4)",
                    }}
                  >
                    Formal Attire
                  </p>
                  <p
                    className="text-base mt-1 italic"
                    style={{ color: "#F5EDD8", fontFamily: "Cinzel, serif", opacity: 0.7 }}
                  >
                    Masks Required
                  </p>
                </div>
              </div>

              {/* Bottom decorative band */}
              <div className="h-1 w-full bg-linear-to-r from-transparent via-[#C89B3C] to-transparent" />
            </div>
          </div></Reveal>
        </div>
      </div>
    </section>
  );
}
