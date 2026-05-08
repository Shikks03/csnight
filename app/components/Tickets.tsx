import { Check, Sparkles } from "lucide-react";

const RESERVATION_LINK = "https://forms.gle/YOUR_LINK";

const tiers = [
  {
    name: "ACM Member",
    price: "₱899",
    features: [
      "Full event access",
      "Masquerade reception",
      "Formal dinner included",
      "Grand ball entry",
      "Commemorative gift",
    ],
    highlighted: false,
    badge: null,
  },
  {
    name: "External Participant",
    price: "₱1,099",
    features: [
      "Full event access",
      "Masquerade reception",
      "Formal dinner included",
      "Grand ball entry",
      "Commemorative gift",
      "VIP guest privileges",
    ],
    highlighted: true,
    badge: "Limited seats",
  },
  {
    name: "Non-ACM CS Student",
    price: "₱999",
    features: [
      "Full event access",
      "Masquerade reception",
      "Formal dinner included",
      "Grand ball entry",
      "Commemorative gift",
      "Priority seating",
    ],
    highlighted: false,
    badge: null,
  },
];

export function Tickets() {
  return (
    <section
      id="tickets"
      className="relative py-40 px-4 bg-gradient-to-b from-[#0A1628] via-[#0D1A2A] to-black overflow-hidden"
    >
      {/* Opera House Ambiance */}
      <div className="absolute inset-0 z-0 opacity-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1759336153678-62c16336c872?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-24">
          <h2
            className="text-7xl md:text-9xl mb-8 relative inline-block"
            style={{
              fontFamily: "Playfair Display, serif",
              color: "#C89B3C",
              fontWeight: 700,
              textShadow: `0 0 60px rgba(200, 155, 60, 0.6), 2px 2px 8px rgba(0, 0, 0, 0.9)`,
            }}
          >
            Tickets
            <div className="absolute -bottom-3 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent" />
          </h2>
          <p
            className="text-2xl md:text-3xl mt-12 italic max-w-3xl mx-auto leading-relaxed"
            style={{ color: "#F5EDD8", fontFamily: "Playfair Display, serif" }}
          >
            Secure your place at the most prestigious event of the year
          </p>
        </div>

        {/* Pricing Triptych */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative flex flex-col bg-gradient-to-b from-[#0D1A2A] via-[#0A1628] to-[#0D1A2A] transition-all duration-700 ${
                tier.highlighted
                  ? "lg:scale-110 lg:-translate-y-8 shadow-[0_40px_100px_rgba(200,155,60,0.4)]"
                  : "hover:scale-105 hover:shadow-[0_30px_80px_rgba(200,155,60,0.2)]"
              }`}
              style={{ border: tier.highlighted ? "3px solid #C89B3C" : "2px solid #C89B3C" }}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                  <div className="relative px-8 py-3 bg-gradient-to-r from-[#C89B3C] via-[#FFD700] to-[#C89B3C] shadow-[0_0_40px_rgba(200,155,60,0.8)]">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#0D1A2A]" />
                      <span className="text-sm uppercase tracking-[0.2em] font-bold text-[#0D1A2A]">
                        {tier.badge}
                      </span>
                      <Sparkles className="w-5 h-5 text-[#0D1A2A]" />
                    </div>
                    <div className="absolute top-0 left-0 w-0 h-0 border-t-[12px] border-t-[#8B6914] border-r-[12px] border-r-transparent" />
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[12px] border-t-[#8B6914] border-l-[12px] border-l-transparent" />
                  </div>
                </div>
              )}

              {/* Ornate Corners */}
              <svg className="absolute top-0 left-0 w-12 h-12 -translate-x-[2px] -translate-y-[2px]" viewBox="0 0 100 100">
                <path d="M0,0 L100,0 L100,15 L15,15 L15,100 L0,100 Z" fill="#C89B3C" opacity={tier.highlighted ? "1" : "0.6"} />
              </svg>
              <svg className="absolute top-0 right-0 w-12 h-12 translate-x-[2px] -translate-y-[2px]" viewBox="0 0 100 100">
                <path d="M100,0 L0,0 L0,15 L85,15 L85,100 L100,100 Z" fill="#C89B3C" opacity={tier.highlighted ? "1" : "0.6"} />
              </svg>
              <svg className="absolute bottom-0 left-0 w-12 h-12 -translate-x-[2px] translate-y-[2px]" viewBox="0 0 100 100">
                <path d="M0,100 L100,100 L100,85 L15,85 L15,0 L0,0 Z" fill="#C89B3C" opacity={tier.highlighted ? "1" : "0.6"} />
              </svg>
              <svg className="absolute bottom-0 right-0 w-12 h-12 translate-x-[2px] translate-y-[2px]" viewBox="0 0 100 100">
                <path d="M100,100 L0,100 L0,85 L85,85 L85,0 L100,0 Z" fill="#C89B3C" opacity={tier.highlighted ? "1" : "0.6"} />
              </svg>

              {/* Inner glow */}
              <div
                className={`absolute inset-0 pointer-events-none ${
                  tier.highlighted
                    ? "shadow-[inset_0_0_80px_rgba(200,155,60,0.15)]"
                    : "shadow-[inset_0_0_40px_rgba(200,155,60,0.05)]"
                }`}
              />

              <div className="relative p-10 pt-16 flex flex-col flex-1">
                {/* Tier Name */}
                <div className="text-center mb-8">
                  <h3
                    className="text-2xl md:text-3xl mb-6 tracking-wide uppercase"
                    style={{ fontFamily: "Playfair Display, serif", color: "#F5EDD8", fontWeight: 600 }}
                  >
                    {tier.name}
                  </h3>

                  <div className="flex items-center justify-center gap-2 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#C89B3C]"
                        style={{ opacity: 0.3 + (2 - Math.abs(2 - i)) * 0.2 }}
                      />
                    ))}
                  </div>

                  <p
                    className="text-6xl md:text-7xl mb-2"
                    style={{
                      fontFamily: "Playfair Display, serif",
                      color: "#C89B3C",
                      fontWeight: 700,
                      textShadow: tier.highlighted
                        ? "0 0 40px rgba(200, 155, 60, 0.6)"
                        : "0 0 20px rgba(200, 155, 60, 0.3)",
                    }}
                  >
                    {tier.price}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-10 flex-1">
                  <ul className="space-y-4">
                    {tier.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3">
                        <div className="w-6 h-6 border-2 border-[#C89B3C] flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#C89B3C]/10">
                          <Check className="w-4 h-4" style={{ color: "#C89B3C" }} />
                        </div>
                        <span className="text-lg leading-relaxed" style={{ color: "#F5EDD8" }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Reserve Button */}
                <a
                  href={RESERVATION_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-5 border-[3px] text-center transition-all duration-500 relative overflow-hidden group ${
                    tier.highlighted
                      ? "bg-gradient-to-r from-[#C89B3C] to-[#8B6914] border-[#C89B3C] text-[#0D1A2A] hover:shadow-[0_0_50px_rgba(200,155,60,0.8)]"
                      : "bg-transparent border-[#C89B3C] text-[#C89B3C] hover:bg-gradient-to-r hover:from-[#C89B3C] hover:to-[#8B6914] hover:text-[#0D1A2A] hover:shadow-[0_0_40px_rgba(200,155,60,0.6)]"
                  }`}
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  <span className="relative z-10 text-xl tracking-[0.2em] uppercase font-bold">
                    Reserve a seat
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="border-t-2 border-b-2 border-[#C89B3C]/30 py-8 px-12">
            <p className="text-lg mb-3 italic" style={{ color: "#F5EDD8", fontFamily: "Playfair Display, serif" }}>
              All tickets include full access to the masquerade reception, formal dinner, and grand ball.
            </p>
            <p className="text-base" style={{ color: "#C89B3C" }}>
              Payment details and tier selection will be provided in the reservation form.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 mt-16">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#C89B3C]/50" />
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#F5EDD8] shadow-[0_0_10px_rgba(245,237,216,0.6)]"
                style={{ opacity: 0.3 + (4 - Math.abs(4 - i)) * 0.12 }}
              />
            ))}
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#C89B3C]/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
