"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { positioning } from "@/data/site";
import { useReducedMotion } from "@/lib/motion-preference";

/** The introduction, lit word by word as it scrolls through the viewport. */
export function Statement() {
  const host = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const words = positioning.supporting.split(" ");

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    if (reduced) {
      element.style.setProperty("--p", "1");
      return;
    }
    let frame = 0;
    function update() {
      frame = 0;
      const box = element!.getBoundingClientRect();
      const p =
        (innerHeight * 0.8 - box.top) / (box.height + innerHeight * 0.3);
      element!.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(3));
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduced]);

  return (
    <section className="v-statement" aria-label="Introduction">
      <div className="shell">
        <p className="eyebrow">Hello</p>
        <p
          className="v-statement-text"
          ref={host}
          style={{ "--n": words.length } as CSSProperties}
        >
          {words.map((word, index) => (
            <span
              key={index}
              style={{ "--w": index / words.length } as CSSProperties}
            >
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
