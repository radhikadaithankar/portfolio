"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { identity } from "@/data/site";
import { EASE } from "@/lib/motion";

const TOTAL_MS = 2100;

/**
 * Cinematic opening: the first name arrives quietly, the surname answers it,
 * the two drift apart and the ivory curtain lifts. Any click or key skips it.
 */
export function Intro() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(!reduced);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setTimeout(() => setOpen(false), TOTAL_MS);
    const skip = () => setOpen(false);
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchstart", skip, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[90] flex cursor-pointer items-center justify-center bg-ivory"
          onClick={() => setOpen(false)}
          aria-label="Skip introduction"
          role="button"
          tabIndex={-1}
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.9, ease: EASE } }}
          style={{ clipPath: "inset(0 0 0% 0)" }}
        >
          <div className="grain absolute inset-0 overflow-hidden" />
          <div className="relative flex flex-col items-center px-6 text-center">
            <motion.span
              className="display text-[13vw] leading-none text-ink sm:text-[9vw]"
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: [24, 0, 0, -40], filter: "blur(0px)", x: [0, 0, 0, "-18vw"] }}
              transition={{ duration: 1.9, times: [0, 0.3, 0.7, 1], ease: EASE }}
            >
              {identity.firstName.toUpperCase()}
            </motion.span>
            <motion.span
              className="display display-italic text-[13vw] leading-none text-terracotta sm:text-[9vw]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: [0, 0, 1, 1], y: [24, 24, 0, 40], x: [0, 0, 0, "18vw"] }}
              transition={{ duration: 1.9, times: [0, 0.25, 0.5, 1], ease: EASE }}
            >
              {identity.lastName}
            </motion.span>
            <motion.span
              className="eyebrow mt-10 text-brown/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 0] }}
              transition={{ duration: 1.9, times: [0, 0.55, 0.75, 1] }}
            >
              Click anywhere to skip
            </motion.span>
          </div>
          <motion.div
            className="absolute bottom-0 left-0 h-px w-full origin-left bg-terracotta/60"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: TOTAL_MS / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
