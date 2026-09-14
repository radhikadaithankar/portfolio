"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import type { Chapter } from "@/data/site";
import { EASE, useCalmMotion } from "@/lib/motion";

/** Abstract, warm diagrams: one per experiment. Drawn, not photographed. */
export function Motif({ kind }: { kind: Chapter["motif"] }) {
  switch (kind) {
    case "layers":
      return <Layers />;
    case "noise":
      return <Noise />;
    case "arm":
      return <Arm />;
    case "hand":
      return <Hand />;
  }
}

const view = { once: true, amount: 0.4 };

/* Residual blocks vs a plain stack: depth with shortcuts. */
function Layers() {
  const rows = 7;
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
      {Array.from({ length: rows }).map((_, i) => (
        <motion.rect
          key={i}
          x={40 + i * 6}
          y={40 + i * 30}
          width={200 - i * 12}
          height={18}
          rx={2}
          fill={i % 2 ? "#d9b8a1" : "#b2624a"}
          fillOpacity={0.9 - i * 0.06}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={view}
          transition={{ delay: i * 0.08, duration: 0.8, ease: EASE }}
        />
      ))}
      {[0, 2, 4].map((i) => (
        <motion.path
          key={i}
          d={`M${250 + i * 4} ${49 + i * 30} C 320 ${49 + i * 30}, 320 ${109 + i * 30}, ${250 + (i + 2) * 4 - 12} ${109 + i * 30}`}
          fill="none"
          stroke="#6e4d3c"
          strokeWidth="1.2"
          strokeDasharray="3 4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={view}
          transition={{ delay: 0.8 + i * 0.15, duration: 1, ease: EASE }}
        />
      ))}
      <text x="40" y="272" fontSize="10" fill="#6e4d3c" fontFamily="var(--font-manrope)" letterSpacing="2">
        RESIDUAL CONNECTIONS
      </text>
    </svg>
  );
}

/* Noise resolving into a digit: the generator finding its subject. */
function Noise() {
  const { reduced } = useCalmMotion();
  const N = 12;
  const target = useMemo(() => {
    // A soft "3", drawn on a 12x12 grid.
    const rows = [
      "............",
      "....######..",
      "...#.....##.",
      "..........#.",
      ".........##.",
      "......####..",
      ".........##.",
      "..........#.",
      "..........#.",
      "...#.....##.",
      "....######..",
      "............",
    ];
    return rows.map((r) => r.split("").map((c) => c === "#"));
  }, []);
  const cells = useMemo(() => {
    const out: { x: number; y: number; on: boolean; noise: number }[] = [];
    let s = 7;
    for (let y = 0; y < N; y++)
      for (let x = 0; x < N; x++) {
        s = (s * 9301 + 49297) % 233280;
        out.push({ x, y, on: target[y][x], noise: s / 233280 });
      }
    return out;
  }, [target]);
  const size = 300 / N;
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
      {cells.map((c) => (
        <motion.rect
          key={`${c.x}-${c.y}`}
          x={50 + c.x * size}
          y={c.y * size}
          width={size - 2}
          height={size - 2}
          rx={1}
          fill="#3a2a24"
          initial={{ opacity: c.noise * 0.7 }}
          whileInView={{ opacity: c.on ? 0.9 : 0.05 }}
          viewport={view}
          transition={{ duration: reduced ? 0 : 1.6, delay: 0.4 + c.noise * 0.8, ease: EASE }}
        />
      ))}
      <text x="50" y="296" fontSize="10" fill="#6e4d3c" fontFamily="var(--font-manrope)" letterSpacing="2">
        NOISE → SAMPLE
      </text>
    </svg>
  );
}

/* A robot arm, and the square it is trying to draw. */
function Arm() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
      <rect x="20" y="250" width="90" height="14" rx="2" fill="#d9b8a1" />
      <motion.g
        initial={{ rotate: -8 }}
        whileInView={{ rotate: 0 }}
        viewport={view}
        transition={{ duration: 1.4, ease: EASE }}
        style={{ originX: "65px", originY: "250px" }}
      >
        <line x1="65" y1="250" x2="120" y2="120" stroke="#6e4d3c" strokeWidth="10" strokeLinecap="round" />
        <line x1="120" y1="120" x2="240" y2="90" stroke="#6e4d3c" strokeWidth="8" strokeLinecap="round" />
        <line x1="240" y1="90" x2="270" y2="150" stroke="#b2624a" strokeWidth="6" strokeLinecap="round" />
        <circle cx="120" cy="120" r="9" fill="#f7f2ea" stroke="#6e4d3c" strokeWidth="3" />
        <circle cx="240" cy="90" r="8" fill="#f7f2ea" stroke="#6e4d3c" strokeWidth="3" />
      </motion.g>
      <motion.path
        d="M270 150 H350 V230 H270 Z"
        fill="none"
        stroke="#b2624a"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={view}
        transition={{ delay: 0.6, duration: 2, ease: "easeInOut" }}
      />
      <text x="20" y="290" fontSize="10" fill="#6e4d3c" fontFamily="var(--font-manrope)" letterSpacing="2">
        CARTESIAN PATH · AUTONOMOUS DRAWING
      </text>
    </svg>
  );
}

/* A gesture becomes a direction. */
function Hand() {
  const dirs = [
    { d: "M200 60 L200 20", label: "forward" },
    { d: "M240 100 L280 100", label: "right" },
    { d: "M200 140 L200 180", label: "back" },
    { d: "M160 100 L120 100", label: "left" },
  ];
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
      <motion.circle
        cx="200"
        cy="100"
        r="34"
        fill="#d9b8a1"
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={view}
        transition={{ duration: 0.8, ease: EASE }}
        style={{ originX: "200px", originY: "100px" }}
      />
      <motion.path
        d="M186 108 C184 96, 188 84, 196 82 L196 104 L200 76 C202 72, 208 72, 208 78 L206 104 L212 84 C214 80, 220 80, 219 86 L214 106 C222 110, 222 120, 214 124 L192 124 C186 122, 184 116, 186 108 Z"
        fill="#3a2a24"
        initial={{ opacity: 0, rotate: -12 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={view}
        transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
        style={{ originX: "200px", originY: "100px" }}
      />
      {dirs.map((a, i) => (
        <motion.g key={a.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={view} transition={{ delay: 0.9 + i * 0.15 }}>
          <path d={a.d} stroke="#b2624a" strokeWidth="2" strokeLinecap="round" markerEnd="url(#arrow)" />
        </motion.g>
      ))}
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#b2624a" />
        </marker>
      </defs>
      {/* Wheelchair silhouette */}
      <motion.g initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={view} transition={{ delay: 1.4, duration: 1, ease: EASE }}>
        <circle cx="330" cy="236" r="26" fill="none" stroke="#6e4d3c" strokeWidth="3" />
        <circle cx="290" cy="248" r="10" fill="none" stroke="#6e4d3c" strokeWidth="3" />
        <path d="M312 208 L312 176 L340 176 M312 208 L342 208" fill="none" stroke="#6e4d3c" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
      <text x="20" y="290" fontSize="10" fill="#6e4d3c" fontFamily="var(--font-manrope)" letterSpacing="2">
        GESTURE → DIRECTION
      </text>
    </svg>
  );
}
