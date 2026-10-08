"use client";

import { setReducedMotion, useReducedMotion } from "@/lib/motion-preference";

export function MotionToggle() {
  const reduced = useReducedMotion();
  return (
    <button
      className="motion-toggle"
      type="button"
      aria-pressed={reduced}
      onClick={() => setReducedMotion(!reduced)}
    >
      Reduce motion <span aria-hidden="true">{reduced ? "On" : "Off"}</span>
    </button>
  );
}
