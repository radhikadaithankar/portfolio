"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion-preference";

type Stat = { value: number; label: string; note: string };

/** Counts up once when scrolled into view; static with reduced motion. */
export function Stats({
  stats,
  className = "stats",
}: {
  stats: Stat[];
  className?: string;
}) {
  const host = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = host.current;
    if (!element || reduced) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const run = (now: number) => {
          const t = Math.min((now - start) / 1400, 1);
          setProgress(1 - Math.pow(1 - t, 4));
          if (t < 1) frame = requestAnimationFrame(run);
        };
        frame = requestAnimationFrame(run);
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [reduced]);

  const shown = reduced ? 1 : progress;
  return (
    <ul className={className} ref={host}>
      {stats.map((stat) => (
        <li key={stat.label}>
          <strong>
            <span className="sr-only">{stat.value}</span>
            <span aria-hidden="true">
              {String(Math.round(stat.value * shown)).padStart(2, "0")}
            </span>
          </strong>
          <span className="stat-label">{stat.label}</span>
          <span className="stat-note">{stat.note}</span>
        </li>
      ))}
    </ul>
  );
}
