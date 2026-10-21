import { ImageResponse } from "next/og";
import { positioning } from "@/data/site";

export const dynamic = "force-static";

export const alt = `Radhika Daithankar. ${positioning.statement}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ffffff",
        color: "#0a0a0a",
        width: "100%",
        height: "100%",
        padding: "58px 64px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
        }}
      >
        <span>Radhika Daithankar</span>
        <span style={{ color: "#2b4bff" }}>Pune, India</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 88,
          lineHeight: 1.08,
          letterSpacing: "-5px",
        }}
      >
        <span>Radhika</span>
        <span style={{ color: "#2b4bff" }}>Daithankar.</span>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #e6e6e6",
          paddingTop: 25,
          fontSize: 21,
        }}
      >
        {positioning.statement}
      </div>
    </div>,
    size,
  );
}
