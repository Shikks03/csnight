import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "CS Night 2026 — A Masquerade Grand Ball";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A1628",
          padding: "60px",
        }}
      >
        {/* Gold top rule */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "#C89B3C",
          }}
        />
        {/* Gold bottom rule */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "#C89B3C",
          }}
        />

        {/* Event title */}
        <div
          style={{
            color: "#C89B3C",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "0.08em",
            lineHeight: 1,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          CS NIGHT 2026
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: 200,
            height: 2,
            background: "#C89B3C",
            marginBottom: 24,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            color: "#F5EDD8",
            fontSize: 36,
            letterSpacing: "0.05em",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          A Masquerade Grand Ball
        </div>

        {/* Date/venue */}
        <div
          style={{
            color: "#8BA3BF",
            fontSize: 24,
            letterSpacing: "0.1em",
            textAlign: "center",
          }}
        >
          June 27, 2026 · FEU Tech
        </div>
      </div>
    ),
    { ...size }
  );
}
