"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Hairline that fills across the top of the page as you scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[85] h-px origin-left bg-terracotta"
      style={{ scaleX }}
    />
  );
}
