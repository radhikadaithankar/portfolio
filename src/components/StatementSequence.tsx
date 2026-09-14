"use client";

import { motion, useScroll, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { useCalmMotion, useProgress } from "@/lib/motion";
import { Reveal } from "./Reveal";

type Props = {
  statements: string[];
  tone?: "dark" | "light";
  /** Extra vertical scroll per statement, in vh. */
  perStatement?: number;
  className?: string;
  align?: "left" | "center";
  size?: string;
};

/**
 * Large statements, one at a time, held in the centre of the viewport while
 * the visitor scrolls. Falls back to a stacked reveal for reduced motion / touch.
 */
export function StatementSequence({ statements, tone = "dark", perStatement = 90, className, align = "left", size }: Props) {
  const { calm } = useCalmMotion();
  const text = tone === "dark" ? "text-ink" : "text-ivory";
  const sizeClass = size ?? "text-[13vw] sm:text-[10vw] md:text-[7.2vw]";
  const alignClass = align === "center" ? "text-center items-center" : "";

  if (calm) {
    return (
      <div className={`flex flex-col gap-16 px-5 py-24 sm:px-8 md:px-12 ${className ?? ""}`}>
        {statements.map((s, i) => (
          <Reveal key={s} delay={i * 0.05} amount={0.4}>
            <p className={`display ${sizeClass} ${text} ${align === "center" ? "text-center" : ""}`}>{s}</p>
          </Reveal>
        ))}
      </div>
    );
  }

  return <Pinned statements={statements} text={text} perStatement={perStatement} className={className} sizeClass={sizeClass} alignClass={alignClass} />;
}

function Pinned({
  statements,
  text,
  perStatement,
  className,
  sizeClass,
  alignClass,
}: {
  statements: string[];
  text: string;
  perStatement: number;
  className?: string;
  sizeClass: string;
  alignClass: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} style={{ height: `${statements.length * perStatement + 40}vh` }} className={`relative ${className ?? ""}`}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-5 sm:px-8 md:px-12">
        <div className={`relative flex w-full flex-col ${alignClass}`}>
          {statements.map((s, i) => (
            <Statement key={s} text={s} index={i} count={statements.length} progress={scrollYProgress} className={`display ${sizeClass} ${text}`} />
          ))}
          <p className={`display invisible ${sizeClass}`} aria-hidden>
            {statements.reduce((a, b) => (a.length > b.length ? a : b))}
          </p>
        </div>
      </div>
    </div>
  );
}

function Statement({ text, index, count, progress, className }: { text: string; index: number; count: number; progress: MotionValue<number>; className: string }) {
  const step = 1 / count;
  const start = index * step;
  const end = start + step;
  const isFirst = index === 0;
  const isLast = index === count - 1;
  // Fade-out of one statement completes exactly where the next begins, so they never overlap.
  const range = [start, start + step * 0.18, end - step * 0.14, end];
  const opacity = useProgress(progress, range, [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]);
  const y = useProgress(progress, range, [isFirst ? 0 : 40, 0, 0, isLast ? 0 : -40]);
  return (
    <motion.p className={`absolute inset-x-0 ${className}`} style={{ opacity, y }}>
      {text}
    </motion.p>
  );
}
