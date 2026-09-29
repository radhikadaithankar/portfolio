import type { Metadata } from "next";
import { Suspense } from "react";
import { DesignPreview } from "./DesignDirections";

export const metadata: Metadata = {
  title: "Portfolio design directions | Radhika",
  robots: { index: false, follow: false },
};
export default function Designs() {
  return (
    <Suspense fallback={<p className="shell">Loading design previews…</p>}>
      <DesignPreview />
    </Suspense>
  );
}
