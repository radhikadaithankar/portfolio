"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

type PortraitProps = {
  src: string;
  available: boolean;
  alt: string;
  className?: string;
  /** Delay before the masked reveal begins, in seconds. */
  delay?: number;
  variant?: "hero" | "founder";
  priority?: boolean;
};

/**
 * Editorial portrait slot. Renders the real photograph when it exists in /public,
 * otherwise a warm sunlit-paper composition that reads as an intentional image.
 */
export function Portrait({ src, available, alt, className, delay = 0, variant = "hero" }: PortraitProps) {
  return (
    <motion.div
      className={`grain relative overflow-hidden ${className ?? ""}`}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.6, ease: EASE, delay }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 2.2, ease: EASE, delay }}
      >
        {available ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <Placeholder variant={variant} />
        )}
      </motion.div>
    </motion.div>
  );
}

function Placeholder({ variant }: { variant: "hero" | "founder" }) {
  return (
    <div className="paper-light relative h-full w-full" role="img" aria-label="Sunlit paper and architecture, placeholder for a portrait">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id={`arch-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f7ede0" stopOpacity="0.9" />
            <stop offset="1" stopColor="#c99a80" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id={`light-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff6e8" stopOpacity="0.85" />
            <stop offset="1" stopColor="#fff6e8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {variant === "hero" ? (
          <>
            <path d="M120 820 V420 A180 180 0 0 1 480 420 V820 Z" fill={`url(#arch-${variant})`} />
            <path d="M-40 0 L260 0 L120 820 L-40 820 Z" fill={`url(#light-${variant})`} />
            <rect x="0" y="0" width="600" height="800" fill="none" />
            <path d="M0 640 H600" stroke="#6e4d3c" strokeOpacity="0.18" />
            <path d="M0 655 H600" stroke="#6e4d3c" strokeOpacity="0.1" />
            <circle cx="470" cy="150" r="70" fill="#fff4e4" fillOpacity="0.55" />
          </>
        ) : (
          <>
            <rect x="60" y="120" width="480" height="720" rx="240" fill={`url(#arch-${variant})`} />
            <path d="M600 0 L600 320 L200 820 L0 820 Z" fill={`url(#light-${variant})`} />
            <path d="M0 200 H600" stroke="#6e4d3c" strokeOpacity="0.14" />
            <circle cx="130" cy="130" r="56" fill="#fff4e4" fillOpacity="0.5" />
          </>
        )}
      </svg>
    </div>
  );
}
