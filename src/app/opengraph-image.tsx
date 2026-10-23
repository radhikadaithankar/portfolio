import { ImageResponse } from "next/og";
import { positioning } from "@/data/site";

export const dynamic = "force-static";

export const alt = `Radhika Daithankar. ${positioning.statement}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Mocha page, latte card and burgundy accents, matching the site. */
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: 40,
        background: "#d4b89d",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "48px 56px",
          borderRadius: 36,
          background: "#fff8e7",
          color: "#2a0e16",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
          }}
        >
          <span style={{ fontWeight: 700 }}>Radhika Daithankar ✳</span>
          <span
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 999,
              background: "#5a1226",
              color: "#fff8e7",
              fontSize: 20,
            }}
          >
            AI engineer · Pune, India
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 112,
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: "-6px",
          }}
        >
          <span>Radhika</span>
          <span style={{ color: "#5a1226" }}>Daithankar.</span>
        </div>
        <div
          style={{
            display: "flex",
            paddingTop: 22,
            borderTop: "1px solid #2a0e1629",
            fontSize: 28,
            color: "#4f3731",
          }}
        >
          {positioning.statement}
        </div>
      </div>
    </div>,
    size,
  );
}
