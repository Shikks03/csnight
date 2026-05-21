import { Sparkles, Wine, Music } from "lucide-react";
import { Reveal } from "./Reveal";
import type { LucideIcon } from "lucide-react";

const experiences: { icon: LucideIcon; title: string; description: string; number: string }[] = [
  {
    icon: Sparkles,
    title: "Masquerade Reception",
    description: "Arrive in mystery. Mingle with intrigue. Make your entrance unforgettable.",
    number: "I",
  },
  {
    icon: Wine,
    title: "Formal Dinner & Program",
    description: "Exquisite cuisine, heartfelt awards, and moments that elevate the evening.",
    number: "II",
  },
  {
    icon: Music,
    title: "Dance Floor & Social Night",
    description: "Dance under the stars. Create connections that last beyond the music.",
    number: "III",
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="relative py-16 sm:py-24 md:py-32 px-4 bg-[#060E1A] overflow-hidden"
    >
      {/* Central radial glow behind cards */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 65% at 50% 55%, rgba(200,155,60,0.06) 0%, transparent 70%)" }}
      />
      {/* Corner vignettes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 120% 120% at 50% 50%, transparent 38%, rgba(2,5,12,0.45) 100%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <Reveal><div className="text-center mb-12 md:mb-24">
          <h2
            className="text-4xl sm:text-6xl md:text-8xl mb-6 relative inline-block"
            style={{
              fontFamily: "Cinzel, serif",
              color: "#C89B3C",
              fontWeight: 700,
              textShadow: `0 0 40px rgba(200, 155, 60, 0.5), 2px 2px 4px rgba(0, 0, 0, 0.8)`,
            }}
          >
            What Awaits You
            <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent" />
          </h2>
          <p
            className="text-xl md:text-2xl mt-8 italic max-w-3xl mx-auto"
            style={{ color: "#F5EDD8", fontFamily: "Cinzel, serif" }}
          >
            Three acts. One unforgettable evening.
          </p>
        </div></Reveal>

        {/* Triptych Cards */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {experiences.map((experience, index) => {
            const Icon = experience.icon;
            return (
              <Reveal key={index} delay={index * 0.12}>
              <div
                className="group relative bg-gradient-to-b from-[#0A1628] to-[#0D1A2A] transition-all duration-700 hover:shadow-[0_30px_90px_rgba(200,155,60,0.3)] hover:-translate-y-4 active:shadow-[0_30px_90px_rgba(200,155,60,0.3)] active:-translate-y-2"
                style={{
                  border: "2px solid",
                  borderImage: "linear-gradient(180deg, #C89B3C, #8B6914) 1",
                }}
              >
                {/* Theatrical Number */}
                <div
                  className="absolute -top-4 -left-4 w-12 h-12 sm:-top-6 sm:-left-6 sm:w-16 sm:h-16 flex items-center justify-center border-2 border-[#C89B3C] bg-[#0D1A2A] shadow-[0_0_30px_rgba(200,155,60,0.6)]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 80%, 80% 100%, 0 100%)" }}
                >
                  <span
                    className="text-3xl"
                    style={{ fontFamily: "Cinzel, serif", color: "#C89B3C", fontWeight: 700 }}
                  >
                    {experience.number}
                  </span>
                </div>

                <div className="p-10 pt-12">
                  {/* Icon Container */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div className="w-24 h-24 border-[3px] border-[#C89B3C] flex items-center justify-center bg-gradient-to-br from-[#C89B3C]/20 to-transparent group-hover:scale-110 transition-transform duration-700 group-hover:rotate-45">
                        <Icon
                          className="w-12 h-12 group-hover:rotate-[-45deg] transition-transform duration-700"
                          style={{ color: "#C89B3C" }}
                        />
                      </div>
                      <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-[#F5EDD8]" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-[#F5EDD8]" />
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-[#F5EDD8]" />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-[#F5EDD8]" />
                    </div>
                  </div>

                  <h3
                    className="text-3xl mb-6 text-center leading-tight"
                    style={{ fontFamily: "Cinzel, serif", color: "#C89B3C", fontWeight: 700 }}
                  >
                    {experience.title}
                  </h3>

                  {/* Dot Divider */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#C89B3C]"
                        style={{ opacity: 0.3 + i * 0.15 }}
                      />
                    ))}
                  </div>

                  <p className="text-center text-lg leading-relaxed" style={{ color: "#F5EDD8" }}>
                    {experience.description}
                  </p>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shadow-[inset_0_0_60px_rgba(200,155,60,0.1)]" />

                {/* Bottom Corner */}
                <div className="absolute bottom-4 right-4 w-12 h-12 opacity-30">
                  <svg viewBox="0 0 100 100">
                    <path d="M0,100 L100,100 L100,0" stroke="#C89B3C" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>

        {/* Pearl Divider */}
        <Reveal delay={0.1}><div className="flex items-center justify-center gap-3 mt-20">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#C89B3C]/50" />
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-[#F5EDD8] shadow-[0_0_10px_rgba(245,237,216,0.6)]"
              style={{ opacity: 0.3 + (3 - Math.abs(3 - i)) * 0.15 }}
            />
          ))}
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#C89B3C]/50" />
        </div></Reveal>
      </div>
    </section>
  );
}
