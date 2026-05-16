import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A1628",
        }}
      >
        <span
          style={{
            color: "#C89B3C",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "-1px",
          }}
        >
          CS
        </span>
      </div>
    ),
    { ...size }
  );
}
