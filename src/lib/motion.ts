import type { CSSProperties } from "react";

/** Shared timing for CSS, Web Animations and the optional 3D scene. */
export const motion = {
  duration: { fast: 180, chapter: 280, standard: 360, reveal: 640 },
  ease: "cubic-bezier(.22,1,.36,1)",
  stagger: 70,
  maxStagger: 210,
  rise: 18,
  parallax: 8,
  tilt: 3.5,
  damping: 6,
  idleSpeed: 0.36,
} as const;

export const motionStyles = {
  ...Object.fromEntries(
    Object.entries(motion.duration).map(([name, value]) => [
      `--motion-${name}`,
      `${value}ms`,
    ]),
  ),
  "--motion-ease": motion.ease,
} as CSSProperties;
