"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "@/lib/motion";
import { useReducedMotion } from "@/lib/motion-preference";

/** Transform the visual rather than moving the card's text or hit targets. */
export function CardTilt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    // A whole-tile link can sit above the visual, so listen on the tile.
    const host = element.closest<HTMLElement>("article") ?? element;
    let frame = 0;
    let x = 0;
    let y = 0;
    function reset() {
      cancelAnimationFrame(frame);
      frame = 0;
      element?.removeAttribute("data-tilting");
      for (const name of ["--tilt-x", "--tilt-y", "--glare-x", "--glare-y"])
        element?.style.removeProperty(name);
    }
    function move(event: PointerEvent) {
      if (!fine.matches || event.pointerType !== "mouse") return;
      const box = element!.getBoundingClientRect();
      x = Math.max(
        -1,
        Math.min(1, ((event.clientX - box.left) / box.width) * 2 - 1),
      );
      y = Math.max(
        -1,
        Math.min(1, ((event.clientY - box.top) / box.height) * 2 - 1),
      );
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        element!.dataset.tilting = "true";
        element!.style.setProperty("--tilt-x", `${-y * motion.tilt}deg`);
        element!.style.setProperty("--tilt-y", `${x * motion.tilt}deg`);
        element!.style.setProperty("--glare-x", `${(x + 1) * 50}%`);
        element!.style.setProperty("--glare-y", `${(y + 1) * 50}%`);
      });
    }
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerleave", reset);
    host.addEventListener("pointercancel", reset);
    host.addEventListener("focusin", reset);
    fine.addEventListener("change", reset);
    return () => {
      reset();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", reset);
      host.removeEventListener("pointercancel", reset);
      host.removeEventListener("focusin", reset);
      fine.removeEventListener("change", reset);
    };
  }, [reduced]);
  return (
    <div className="project-tilt" ref={ref}>
      {children}
    </div>
  );
}
