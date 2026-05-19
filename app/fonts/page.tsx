import type { Metadata } from "next";
import Link from "next/link";
import "./fonts-preview.css";

export const metadata: Metadata = {
  title: "Font Preview — CS Night 2026",
  robots: { index: false, follow: false },
};

interface Pairing {
  id: number;
  badge: string | null;
  label: string;
  name: string;
  description: string;
  headingFont: string;
  bodyFont: string;
  note: string;
}

const pairings: Pairing[] = [
  {
    id: 1,
    badge: "★ Recommended",
    label: "Option 1",
    name: "Cinzel + Montserrat",
    description: "Roman engraved capitals · Ceremonial invitation aesthetic",
    headingFont: "'Cinzel', serif",
    bodyFont: "'Montserrat', sans-serif",
    note: "Cinzel renders as elegant small-caps — its chiselled letterforms look stunning in gold on dark backgrounds.",
  },
  {
    id: 2,
    badge: "★ Most Dramatic",
    label: "Option 2",
    name: "Bodoni Moda + Jost",
    description: "Extreme thick/thin contrast · Vogue / theatrical luxury",
    headingFont: "'Bodoni Moda', serif",
    bodyFont: "'Jost', sans-serif",
    note: "Bodoni Moda's hairline strokes create maximum drama — most impactful at large display sizes.",
  },
  {
    id: 3,
    badge: null,
    label: "Option 3",
    name: "Poiret One + Didact Gothic",
    description: "1920s Art Deco geometric · Great Gatsby masquerade",
    headingFont: "'Poiret One', sans-serif",
    bodyFont: "'Didact Gothic', sans-serif",
    note: "Poiret One is a single-weight display font — works best for hero titles only, not body copy.",
  },
  {
    id: 4,
    badge: null,
    label: "Option 4",
    name: "Cormorant + Montserrat",
    description: "High-fashion delicate serif · Safe, elegant upgrade",
    headingFont: "'Cormorant', serif",
    bodyFont: "'Montserrat', sans-serif",
    note: "Most similar to your current pairing but noticeably more refined and couture.",
  },
  {
    id: 5,
    badge: null,
    label: "Option 5",
    name: "Cormorant Garamond + Libre Baskerville",
    description: "All-serif · Old-world heirloom invitation formality",
    headingFont: "'Cormorant Garamond', serif",
    bodyFont: "'Libre Baskerville', serif",
    note: "All-serif pairing — maximum printed-invitation prestige, slightly denser on screen.",
  },
];

const current: Pairing = {
  id: 0,
  badge: null,
  label: "Current",
  name: "Playfair Display + Inter",
  description: "Classic elegant serif · The widely-used default",
  headingFont: "'Playfair Display', serif",
  bodyFont: "'Inter', sans-serif",
  note: "The most common 'elegant' pairing — functional but generic for a masquerade grand ball.",
};

export default function FontsPreviewPage() {
  return (
    <div
      style={{
        backgroundColor: "#0A1628",
        minHeight: "100vh",
        color: "#F5EDD8",
      }}
    >
      {/* Page header */}
      <div
        style={{
          borderBottom: "1px solid rgba(200,155,60,0.2)",
          padding: "1.5rem 2rem",
          position: "sticky",
          top: 0,
          backgroundColor: "rgba(10,22,40,0.95)",
          backdropFilter: "blur(12px)",
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                color: "#C89B3C",
                textTransform: "uppercase",
                marginBottom: "0.3rem",
              }}
            >
              CS Night 2026 · Dev Preview
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.4rem",
                color: "#F5EDD8",
                fontWeight: 600,
              }}
            >
              Font Style Preview
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.78rem",
                color: "#8BA3BF",
                marginTop: "0.2rem",
              }}
            >
              Scroll to compare all 5 options with your actual event content.
            </p>
          </div>
          <Link
            href="/"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.78rem",
              color: "#8BA3BF",
              border: "1px solid rgba(139,163,191,0.25)",
              padding: "0.4rem 1.1rem",
              borderRadius: "6px",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            ← Back to Site
          </Link>
        </div>
      </div>

      {/* Cards */}
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "2.5rem 2rem 1rem",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        {pairings.map((p) => (
          <PairingCard key={p.id} pairing={p} />
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          maxWidth: "860px",
          margin: "3rem auto 0",
          padding: "0 2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(139,163,191,0.2))",
            }}
          />
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "#8BA3BF",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Current pairing for comparison
          </p>
          <div
            style={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(to left, transparent, rgba(139,163,191,0.2))",
            }}
          />
        </div>
      </div>

      {/* Current pairing */}
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "0 2rem 4rem",
          opacity: 0.55,
        }}
      >
        <PairingCard pairing={current} dim />
      </div>
    </div>
  );
}

function PairingCard({ pairing, dim = false }: { pairing: Pairing; dim?: boolean }) {
  const borderAlpha = dim ? "0.15" : "0.3";
  const border = `1px solid rgba(200,155,60,${borderAlpha})`;

  return (
    <div
      style={{
        border,
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: dim ? "none" : "0 0 40px rgba(200,155,60,0.04)",
      }}
    >
      {/* Card meta header */}
      <div
        style={{
          backgroundColor: "rgba(200,155,60,0.05)",
          borderBottom: border,
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              color: "#8BA3BF",
              textTransform: "uppercase",
              marginBottom: "0.25rem",
            }}
          >
            {pairing.label}
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.05rem",
              fontWeight: 600,
              color: "#C89B3C",
              marginBottom: "0.2rem",
            }}
          >
            {pairing.name}
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.78rem",
              color: "#8BA3BF",
            }}
          >
            {pairing.description}
          </p>
        </div>
        {pairing.badge && (
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 500,
              color: "#C89B3C",
              backgroundColor: "rgba(200,155,60,0.12)",
              border: "1px solid rgba(200,155,60,0.3)",
              padding: "0.25rem 0.85rem",
              borderRadius: "20px",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {pairing.badge}
          </span>
        )}
      </div>

      {/* Typography specimen */}
      <div
        style={{
          padding: "3rem 2.5rem",
          backgroundColor: "rgba(5,11,20,0.5)",
          textAlign: "center",
        }}
      >
        {/* Main hero heading */}
        <div
          style={{
            fontFamily: pairing.headingFont,
            fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
            fontWeight: 700,
            color: "#C89B3C",
            letterSpacing: "0.06em",
            lineHeight: 1.05,
            marginBottom: "0.6rem",
          }}
        >
          CS Night 2026
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: pairing.headingFont,
            fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
            fontWeight: 400,
            color: "#F5EDD8",
            letterSpacing: "0.12em",
            marginBottom: "0.8rem",
          }}
        >
          A Masquerade Grand Ball
        </div>

        {/* Date / location */}
        <div
          style={{
            fontFamily: pairing.bodyFont,
            fontSize: "0.72rem",
            fontWeight: 400,
            color: "#8BA3BF",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "2rem",
          }}
        >
          June 27, 2026 &middot; FEU Tech Manila
        </div>

        {/* Gold ornamental divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "2rem",
            maxWidth: "400px",
            margin: "0 auto 2rem",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(200,155,60,0.5))",
            }}
          />
          <span style={{ color: "#C89B3C", fontSize: "0.85rem" }}>✦</span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(to left, transparent, rgba(200,155,60,0.5))",
            }}
          />
        </div>

        {/* Body paragraph */}
        <p
          style={{
            fontFamily: pairing.bodyFont,
            fontSize: "0.92rem",
            lineHeight: 1.8,
            color: "#F5EDD8",
            maxWidth: "480px",
            margin: "0 auto 2.5rem",
          }}
        >
          Join FEU Tech ACM&apos;s most prestigious celebration — an evening of
          mystery, elegance, and unforgettable memories beneath the stars.
        </p>

        {/* CTA row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontFamily: pairing.bodyFont,
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#C89B3C",
              border: "1px solid #C89B3C",
              padding: "0.7rem 2.2rem",
              borderRadius: "4px",
              display: "inline-block",
            }}
          >
            Reserve a Seat
          </div>
          <span
            style={{
              fontFamily: pairing.bodyFont,
              fontSize: "0.85rem",
              color: "#8BA3BF",
            }}
          >
            from{" "}
            <span style={{ color: "#C89B3C", fontWeight: 600 }}>₱899</span>
            {" "}· ACM Members
          </span>
        </div>

        {/* Ticket tier sample */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            marginTop: "2rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { tier: "ACM", price: "₱899" },
            { tier: "Non-ACM CS", price: "₱999" },
            { tier: "External", price: "₱1,099" },
          ].map((t) => (
            <div
              key={t.tier}
              style={{
                border: "1px solid rgba(200,155,60,0.2)",
                borderRadius: "8px",
                padding: "0.6rem 1.2rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: pairing.bodyFont,
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#8BA3BF",
                  marginBottom: "0.25rem",
                }}
              >
                {t.tier}
              </div>
              <div
                style={{
                  fontFamily: pairing.headingFont,
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  color: "#C89B3C",
                }}
              >
                {t.price}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note footer */}
      <div
        style={{
          padding: "0.7rem 1.5rem",
          backgroundColor: "rgba(200,155,60,0.03)",
          borderTop: border,
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.72rem",
            color: "#8BA3BF",
            fontStyle: "italic",
          }}
        >
          ℹ {pairing.note}
        </p>
      </div>
    </div>
  );
}
