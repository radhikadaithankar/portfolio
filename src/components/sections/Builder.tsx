"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { disciplines } from "@/data/site";
import { useCalmMotion, useMediaQuery } from "@/lib/motion";
import { Lines, Reveal } from "../Reveal";
import { SectionMark } from "../SectionMark";

/**
 * Section 04. A horizontal journey through disciplines, driven by vertical
 * scroll on desktop. On touch and small screens it falls back to a vertical
 * sequence so nothing depends on precision scrolling.
 */
export function Builder() {
  const { calm } = useCalmMotion();
  const wide = useMediaQuery("(min-width: 768px)");
  const horizontal = wide && !calm;

  return (
    <section className="relative bg-sand/50">
      <div className="px-5 pt-32 sm:px-8 md:px-12 md:pt-44">
        <SectionMark number="04" title="The builder" />
        <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
          <Lines
            as="h2"
            lines={["I LEARN", "BY BUILDING."]}
            className="display text-[15vw] text-ink sm:text-[12vw] md:col-span-7 md:text-[8vw]"
            lineClassName={(i) => (i === 1 ? "display-italic text-terracotta" : "")}
          />
          <Reveal className="md:col-span-4 md:col-start-9" delay={0.2}>
            <p className="measure font-serif text-xl leading-relaxed text-brown">
              Each discipline was less a career step than a new instrument. Nothing was left behind; the next one was simply
              added, and the sound changed.
            </p>
          </Reveal>
        </div>
      </div>

      {horizontal ? <HorizontalTrack /> : <VerticalTrack />}
    </section>
  );
}

const PANEL_VW = 62;
const GAP_VW = 4;

function HorizontalTrack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = disciplines.length;
  const total = n * PANEL_VW + (n - 1) * GAP_VW + 12; // panels + gaps + trailing padding, in vw
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${Math.max(total - 100, 0)}vw`]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} style={{ height: `${n * 90}vh` }} className="relative mt-20">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div className="flex items-stretch pl-12" style={{ x, gap: `${GAP_VW}vw` }}>
          {disciplines.map((d, i) => (
            <Panel key={d.name} d={d} i={i} />
          ))}
        </motion.div>
        <div className="mx-12 mt-14 flex items-center gap-6">
          <span className="eyebrow text-brown/70">Web → Leadership</span>
          <div className="relative h-px flex-1 bg-ink/15">
            <motion.span className="absolute inset-y-0 left-0 w-full origin-left bg-terracotta" style={{ scaleX: progressScale }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Panel({ d, i }: { d: (typeof disciplines)[number]; i: number }) {
  return (
    <article className="relative flex shrink-0 flex-col justify-between border-l border-ink/15 pl-8" style={{ width: `${PANEL_VW}vw`, minHeight: "52vh" }}>
      <div className="flex items-baseline justify-between">
        <span className="display text-[9vw] text-terracotta/70">{d.index}</span>
        <span className="eyebrow text-brown/70">It gave her · {d.gave}</span>
      </div>
      <div>
        <h3 className="display text-[5.4vw] text-ink">{d.name}</h3>
        <p className="measure mt-6 font-serif text-xl leading-relaxed text-brown">{d.line}</p>
      </div>
      {i < disciplines.length - 1 && (
        <span className="absolute -right-[2vw] top-1/2 hidden -translate-y-1/2 text-brown/40 lg:block" aria-hidden>
          →
        </span>
      )}
    </article>
  );
}

function VerticalTrack() {
  return (
    <ol className="mt-16 flex flex-col px-5 pb-28 sm:px-8 md:px-12">
      {disciplines.map((d, i) => (
        <Reveal key={d.name} delay={i * 0.05} amount={0.25}>
          <li className="grid gap-4 border-t border-ink/15 py-10 md:grid-cols-12">
            <div className="flex items-baseline justify-between md:col-span-3 md:block">
              <span className="display text-[14vw] text-terracotta/70 md:text-[5vw]">{d.index}</span>
              <span className="eyebrow text-brown/70 md:mt-4 md:block">Gave her · {d.gave}</span>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <h3 className="display text-[9vw] text-ink sm:text-[7vw] md:text-[3.6vw]">{d.name}</h3>
              <p className="mt-4 max-w-lg font-serif text-lg leading-relaxed text-brown">{d.line}</p>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
