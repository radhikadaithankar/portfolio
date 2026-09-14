"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { identity } from "@/data/site";
import { EASE } from "@/lib/motion";

const TOTAL_MS = 2100;

/**
 * Cinematic opening. Names are visible in CSS from the first paint, and a CSS
 * animation lifts the ivory curtain after ~2s even if JavaScript is slow —
 * so the page can never get stuck as a blank white screen. Click, wheel or
 * a key also skip it.
 */
export function Intro() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const skip = () => setOpen(false);
    const timer = window.setTimeout(skip, TOTAL_MS);
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchstart", skip, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="intro"
          className="intro-curtain fixed inset-0 z-[90] flex cursor-pointer items-center justify-center overflow-hidden bg-ivory"
          onClick={() => setOpen(false)}
          aria-label="Skip introduction"
          role="button"
          tabIndex={-1}
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.9, ease: EASE } }}
        >
          <div className="grain pointer-events-none absolute inset-0 overflow-hidden" />
          <div className="relative flex flex-col items-center px-6 text-center">
            <span className="intro-name display text-[13vw] leading-none text-ink sm:text-[9vw]">{identity.firstName.toUpperCase()}</span>
            <span className="intro-surname display display-italic text-[13vw] leading-none text-terracotta sm:text-[9vw]">{identity.lastName}</span>
            <span className="intro-skip eyebrow mt-10 text-brown/70">Click anywhere to skip</span>
          </div>
          <span className="intro-progress absolute bottom-0 left-0 h-px w-full bg-terracotta/60" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
