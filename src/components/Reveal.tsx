"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  amount?: number;
};

/** Fades and lifts a block into view the first time it scrolls in. */
export function Reveal({ children, delay = 0, y = 28, className, once = true, amount = 0.3 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const lineVariants: Variants = {
  hidden: { y: "108%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1, ease: EASE, delay: i * 0.1 },
  }),
};

type LinesProps = {
  lines: string[];
  className?: string;
  lineClassName?: string | ((i: number) => string);
  as?: "h1" | "h2" | "h3" | "p" | "div";
  delay?: number;
  once?: boolean;
  amount?: number;
  animateOnMount?: boolean;
};

/** Each line rises out of a clipped box; the editorial "masked" type reveal. */
export function Lines({
  lines,
  className,
  lineClassName,
  as = "div",
  delay = 0,
  once = true,
  amount = 0.4,
  animateOnMount = false,
}: LinesProps) {
  const Tag = motion[as];
  const inView = animateOnMount ? { animate: "show" as const } : { whileInView: "show" as const, viewport: { once, amount } };
  return (
    <Tag className={className} initial="hidden" {...inView}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block origin-left ${typeof lineClassName === "function" ? lineClassName(i) : lineClassName ?? ""}`}
            variants={lineVariants}
            custom={i + delay}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Splits text into words that fade upward with a gentle stagger. */
export function Words({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.5 }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            aria-hidden
            variants={{
              hidden: { opacity: 0, y: "60%" },
              show: { opacity: 1, y: "0%", transition: { duration: 0.8, ease: EASE, delay: delay + i * stagger } },
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
