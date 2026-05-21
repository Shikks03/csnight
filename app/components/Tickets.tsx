import { Reveal } from "./Reveal";

const RESERVATION_LINK = "https://forms.gle/DqDEvQLoxq3rhti56";

type Tier = {
  name: string;
  price: string;
  qualification: string;
  featured: boolean;
  badge?: string;
};

const tiers: Tier[] = [
  {
    name: "ACM Member",
    price: "₱899",
    qualification: "FEU Tech student with active ACM membership (cross-checked with our membership database)",
    featured: false,
    badge: "Best Value",
  },
  {
    name: "Non-ACM CS Student",
    price: "₱999",
    qualification: "Enrolled FEU Tech CS student but not an ACM member.",
    featured: false,
  },
  {
    name: "External Participant",
    price: "₱1,099",
    qualification: "Alumni, plus-ones, students from other schools or programs.",
    featured: false,
  },
];

function TierIcon({ index }: { index: number }) {
  if (index === 0) return (
    <svg viewBox="0 0 48 36" fill="none" className="w-12 h-9" aria-hidden="true">
      <path d="M5 30L5 26L43 26L43 30L5 30Z" fill="#C89B3C" opacity="0.8" />
      <path d="M5 26L10 8L17 22L24 4L31 22L38 8L43 26Z" fill="#C89B3C" opacity="0.9" />
      <circle cx="10" cy="8" r="3" fill="#C89B3C" />
      <circle cx="24" cy="4" r="3" fill="#C89B3C" />
      <circle cx="38" cy="8" r="3" fill="#C89B3C" />
    </svg>
  );
  if (index === 1) return (
    <svg viewBox="0 0 48 38" fill="none" className="w-12 h-10" aria-hidden="true">
      <polygon points="24,6 44,16 24,26 4,16" fill="#C89B3C" opacity="0.9" />
      <path d="M12 21L12 31C12 31 18 36 24 36C30 36 36 31 36 31L36 21" stroke="#C89B3C" strokeWidth="2.5" fill="none" opacity="0.75" />
      <line x1="44" y1="16" x2="44" y2="28" stroke="#C89B3C" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" aria-hidden="true">
      <circle cx="24" cy="24" r="18" stroke="#C89B3C" strokeWidth="1.5" opacity="0.35" />
      <circle cx="24" cy="24" r="10" stroke="#C89B3C" strokeWidth="1" opacity="0.2" />
      <polygon points="24,5 27,21 24,27 21,21" fill="#C89B3C" opacity="0.9" />
      <polygon points="24,43 21,27 24,21 27,27" fill="#C89B3C" opacity="0.45" />
      <polygon points="5,24 21,21 27,24 21,27" fill="#C89B3C" opacity="0.45" />
      <polygon points="43,24 27,27 21,24 27,21" fill="#C89B3C" opacity="0.9" />
      <circle cx="24" cy="24" r="2.5" fill="#C89B3C" />
    </svg>
  );
}

export function Tickets() {
  return (
    <section
      id="tickets"
      className="relative py-20 sm:py-28 md:py-40 px-4 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #08101C, #040810 40%, #010307 100%)" }}
    >
      {/* Theatrical spotlight */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "1200px",
          height: "700px",
          background: "radial-gradient(ellipse at top, rgba(200,155,60,0.1) 0%, rgba(200,155,60,0.03) 35%, transparent 65%)",
        }}
      />
      {/* Ambient side glows */}
      <div
        className="absolute pointer-events-none"
        style={{ top: "30%", left: "5%", width: "500px", height: "600px", background: "radial-gradient(ellipse, rgba(200,155,60,0.05) 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        className="absolute pointer-events-none"
        style={{ top: "25%", right: "5%", width: "500px", height: "600px", background: "radial-gradient(ellipse, rgba(200,155,60,0.05) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="text-center mb-12 md:mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-transparent to-[#C89B3C]/60" />
              <span
                className="uppercase"
                style={{ color: "#C89B3C", fontFamily: "Cinzel, serif", fontSize: "0.7rem", letterSpacing: "0.35em" }}
              >
                An Evening to Remember
              </span>
              <div className="flex-1 max-w-[120px] h-px bg-gradient-to-l from-transparent to-[#C89B3C]/60" />
            </div>
            <h2
              className="text-5xl sm:text-7xl md:text-9xl mb-8 relative inline-block"
              style={{
                fontFamily: "Cinzel, serif",
                color: "#C89B3C",
                fontWeight: 700,
                textShadow: "0 0 60px rgba(200,155,60,0.6), 2px 2px 8px rgba(0,0,0,0.9)",
              }}
            >
              Tickets
              <div className="absolute -bottom-3 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent" />
            </h2>
            <p
              className="text-xl sm:text-2xl md:text-3xl mt-12 italic max-w-3xl mx-auto leading-relaxed"
              style={{ color: "#F5EDD8", fontFamily: "Cinzel, serif" }}
            >
              Secure your place at the most prestigious event of the year
            </p>
          </div>
        </Reveal>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {tiers.map((tier, index) => (
            <Reveal key={index} delay={index * 0.12}>
              <div
                className={`relative flex flex-col h-full transition-all duration-700 group cursor-pointer ${
                  tier.featured
                    ? "hover:scale-[1.03] hover:shadow-[0_40px_100px_rgba(200,155,60,0.35)]"
                    : "hover:scale-[1.02] hover:shadow-[0_24px_60px_rgba(200,155,60,0.2)]"
                }`}
                style={{
                  background: tier.featured
                    ? "linear-gradient(160deg, #0F2035 0%, #0A1628 50%, #0C1E33 100%)"
                    : "linear-gradient(to bottom, #0D1A2A, #0A1628, #0D1A2A)",
                  border: `2px solid ${tier.featured ? "#C89B3C" : "rgba(200,155,60,0.5)"}`,
                  boxShadow: tier.featured
                    ? "0 0 0 1px rgba(200,155,60,0.15), inset 0 0 80px rgba(200,155,60,0.1)"
                    : "inset 0 0 40px rgba(200,155,60,0.04)",
                }}
              >
                {/* Best Value badge */}
                {tier.badge && (
                  <div
                    className="absolute top-3 right-3 z-20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
                    style={{ fontFamily: "Cinzel, serif", background: "linear-gradient(135deg, #C89B3C, #8B6914)", color: "#0A1628" }}
                  >
                    {tier.badge}
                  </div>
                )}

                {/* Featured radial glow overlay */}
                {tier.featured && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 50% 25%, rgba(200,155,60,0.12) 0%, transparent 60%)" }}
                  />
                )}

                {/* Ornate corners */}
                <svg className="absolute top-0 left-0 w-10 h-10 sm:w-12 sm:h-12 -translate-x-[2px] -translate-y-[2px]" viewBox="0 0 100 100">
                  <path d="M0,0 L100,0 L100,15 L15,15 L15,100 L0,100 Z" fill="#C89B3C" opacity={tier.featured ? "0.75" : "0.5"} />
                </svg>
                <svg className="absolute top-0 right-0 w-10 h-10 sm:w-12 sm:h-12 translate-x-[2px] -translate-y-[2px]" viewBox="0 0 100 100">
                  <path d="M100,0 L0,0 L0,15 L85,15 L85,100 L100,100 Z" fill="#C89B3C" opacity={tier.featured ? "0.75" : "0.5"} />
                </svg>
                <svg className="absolute bottom-0 left-0 w-10 h-10 sm:w-12 sm:h-12 -translate-x-[2px] translate-y-[2px]" viewBox="0 0 100 100">
                  <path d="M0,100 L100,100 L100,85 L15,85 L15,0 L0,0 Z" fill="#C89B3C" opacity={tier.featured ? "0.75" : "0.5"} />
                </svg>
                <svg className="absolute bottom-0 right-0 w-10 h-10 sm:w-12 sm:h-12 translate-x-[2px] translate-y-[2px]" viewBox="0 0 100 100">
                  <path d="M100,100 L0,100 L0,85 L85,85 L85,0 L100,0 Z" fill="#C89B3C" opacity={tier.featured ? "0.75" : "0.5"} />
                </svg>

                {/* Hover inner glow */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: "inset 0 0 50px rgba(200,155,60,0.1)" }}
                />

                <div className={`relative flex flex-col flex-1 p-5 sm:p-8 ${tier.featured ? "pt-12 sm:pt-14" : "pt-10 sm:pt-12"}`}>
                  {/* Tier icon */}
                  <div
                    className="flex justify-center mb-4"
                    style={{ filter: "drop-shadow(0 0 8px rgba(200,155,60,0.4))" }}
                  >
                    <TierIcon index={index} />
                  </div>

                  {/* Tier name */}
                  <h3
                    className="text-center uppercase tracking-widest mb-5"
                    style={{
                      fontFamily: "Cinzel, serif",
                      color: tier.featured ? "#F5EDD8" : "#C8B99A",
                      fontWeight: 600,
                      fontSize: tier.featured ? "1.2rem" : "1rem",
                    }}
                  >
                    {tier.name}
                  </h3>

                  {/* Price */}
                  <div className="text-center mb-1">
                    <span
                      style={{
                        fontFamily: "Cinzel, serif",
                        color: "#C89B3C",
                        fontWeight: 700,
                        fontSize: tier.featured ? "clamp(2.5rem, 11vw, 4.5rem)" : "clamp(2rem, 9.5vw, 3.75rem)",
                        lineHeight: 1,
                        textShadow: tier.featured
                          ? "0 0 50px rgba(200,155,60,0.55), 0 0 100px rgba(200,155,60,0.2)"
                          : "0 0 20px rgba(200,155,60,0.3)",
                      }}
                    >
                      {tier.price}
                    </span>
                    <p
                      className="uppercase mt-2"
                      style={{ color: "#8BA3BF", fontFamily: "Cinzel, serif", fontSize: "0.65rem", letterSpacing: "0.3em" }}
                    >
                      per person
                    </p>
                  </div>

                  {/* Perforated tear line */}
                  <div className="relative my-6">
                    <div
                      className="hidden sm:block absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
                      style={{ left: "-26px", background: "#060D18", border: "2px solid rgba(200,155,60,0.2)" }}
                    />
                    <div className="border-t-2 border-dashed" style={{ borderColor: "rgba(200,155,60,0.28)" }} />
                    <div
                      className="hidden sm:block absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
                      style={{ right: "-26px", background: "#060D18", border: "2px solid rgba(200,155,60,0.2)" }}
                    />
                  </div>

                  {/* Qualification */}
                  <div className="flex-1 flex items-center mb-7">
                    <p
                      className="text-sm leading-relaxed text-center"
                      style={{ color: "#8BA3BF", fontFamily: "Inter, sans-serif" }}
                    >
                      {tier.qualification}
                    </p>
                  </div>

                  {/* CTA */}
                  <a
                    href={RESERVATION_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/btn block w-full py-4 sm:py-5 text-center transition-all duration-500 relative overflow-hidden ${
                      tier.featured
                        ? "hover:shadow-[0_0_60px_rgba(200,155,60,0.7)]"
                        : "hover:text-[#0A1628]"
                    }`}
                    style={{
                      fontFamily: "Cinzel, serif",
                      background: tier.featured ? "linear-gradient(135deg, #C89B3C, #9A7420)" : "transparent",
                      border: `2px solid ${tier.featured ? "#C89B3C" : "rgba(200,155,60,0.6)"}`,
                      color: tier.featured ? "#0A1628" : "#C89B3C",
                    }}
                  >
                    <span className="relative z-10 text-base sm:text-lg tracking-[0.2em] uppercase font-bold">
                      Reserve a seat
                    </span>
                    {!tier.featured && (
                      <div
                        className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 group-active/btn:opacity-100 transition-opacity duration-500"
                        style={{ background: "linear-gradient(135deg, #C89B3C, #8B6914)" }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover/btn:translate-x-full group-active/btn:translate-x-full transition-transform duration-1000" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Info Footer */}
        <Reveal delay={0.1}>
          <div className="text-center max-w-4xl mx-auto">
            <div
              className="relative py-6 sm:py-8 px-6 sm:px-12"
              style={{ border: "1px solid rgba(200,155,60,0.22)" }}
            >
              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45 bg-[#C89B3C] opacity-60" />
              <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45 bg-[#C89B3C] opacity-60" />
              <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rotate-45 bg-[#C89B3C] opacity-60" />
              <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rotate-45 bg-[#C89B3C] opacity-60" />
              <p className="text-base sm:text-lg mb-3 italic" style={{ color: "#F5EDD8", fontFamily: "Cinzel, serif" }}>
                All tickets include full access to the masquerade reception, formal dinner, and grand ball.
              </p>
              <p className="text-sm sm:text-base" style={{ color: "#C89B3C" }}>
                Payment details will be provided in the reservation form.
              </p>
              <a
                href="https://drive.google.com/file/d/1dh7xJAXCiE-ESUq8xlgnXEcx8Gx9K98f/view"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-xs uppercase tracking-[0.25em] transition-all duration-300 hover:opacity-70"
                style={{ color: "#C89B3C", fontFamily: "Cinzel, serif" }}
              >
                Read the Handbook →
              </a>
            </div>

            <div className="flex items-center justify-center gap-3 mt-16">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C89B3C]/50" />
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#F5EDD8] shadow-[0_0_10px_rgba(245,237,216,0.6)]"
                  style={{ opacity: 0.3 + (4 - Math.abs(4 - i)) * 0.12 }}
                />
              ))}
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C89B3C]/50" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
