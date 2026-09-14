"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useCalmMotion } from "@/lib/motion";

/** A small warm dot that follows the pointer and swells over interactive elements. Desktop only. */
export function Cursor() {
  const { calm } = useCalmMotion();
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    if (calm) return;
    document.documentElement.classList.add("has-custom-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement | null)?.closest("a, button, [data-cursor]") as HTMLElement | null;
      setActive(!!el);
      setLabel(el?.dataset.cursor ?? null);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [calm, x, y]);

  if (calm) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-terracotta text-ivory mix-blend-multiply"
        animate={{ width: label ? 76 : active ? 44 : 10, height: label ? 76 : active ? 44 : 10, opacity: active ? 0.85 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        {label && <span className="eyebrow !text-[0.55rem] !tracking-[0.2em]">{label}</span>}
      </motion.div>
    </motion.div>
  );
}
