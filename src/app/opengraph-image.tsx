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
        background: "#f7f4ed",
        color: "#33262c",
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
        <span style={{ color: "#a75037" }}>Pune, India</span>
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
        <span style={{ color: "#a75037" }}>Daithankar.</span>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #e2d8c9",
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
