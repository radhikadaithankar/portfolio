"use client";

import { motion, useScroll, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { worlds } from "@/data/site";
import { useCalmMotion, useProgress } from "@/lib/motion";
import { Lines, Reveal } from "../Reveal";
import { SectionMark } from "../SectionMark";

/**
 * Section 01. The worlds she has moved through, shown as an evolution rather
 * than a tag cloud: each one arrives, is held, and settles into a ledger of
 * layers while the next one takes the stage. They resolve into BUILDING.
 */
export function Person() {
  const { calm } = useCalmMotion();
  return (
    <section id="story" className="relative bg-ivory">
      <div className="px-5 pt-32 sm:px-8 md:px-12 md:pt-44">
        <SectionMark number="01" title="The person" />
        <Lines
          as="h2"
          lines={["I'VE NEVER", "REALLY FIT", "INTO ONE BOX."]}
          className="display mt-10 text-[12vw] text-ink sm:text-[11vw] md:text-[9.5vw]"
          lineClassName={(i) => (i === 1 ? "display-italic pl-[0.4em] text-brown" : "")}
        />
        <Reveal className="mt-12 grid gap-6 md:grid-cols-12" delay={0.2}>
          <p className="measure font-serif text-xl leading-relaxed text-brown md:col-span-5 md:col-start-7">
            Computer science taught me how machines think. Artificial intelligence taught me how they learn. Data taught me to ask
            better questions, software taught me to answer them, and products taught me who I was answering for. Leadership and
            entrepreneurship are what happened when I stopped waiting for someone else to build the thing.
          </p>
        </Reveal>
      </div>

      {calm ? <StaticWorlds /> : <ScrollWorlds />}
    </section>
  );
}

/** Portion of the pinned scroll spent cycling through the worlds; the rest is BUILDING. */
const CYCLE = 0.84;

function ScrollWorlds() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = worlds.length;
  const buildingOpacity = useProgress(scrollYProgress, [0.86, 0.94], [0, 1]);
  const buildingScale = useProgress(scrollYProgress, [0.86, 1], [0.92, 1]);
  const stageOpacity = useProgress(scrollYProgress, [0.82, 0.88], [1, 0]);
  const lineScale = useProgress(scrollYProgress, [0, CYCLE], [0, 1]);

  return (
    <div ref={ref} style={{ height: `${(n + 2) * 70}vh` }} className="relative mt-24">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="relative grid w-full grid-cols-12 items-center px-5 sm:px-8 md:px-12">
          {/* Ledger of layers */}
          <ol className="relative col-span-12 mb-10 flex flex-col gap-2 md:col-span-3 md:mb-0">
            <motion.span className="absolute -left-4 top-0 hidden h-full w-px origin-top bg-terracotta md:block" style={{ scaleY: lineScale }} />
            {worlds.map((w, i) => (
              <LedgerItem key={w} label={w} index={i} count={n} progress={scrollYProgress} />
            ))}
          </ol>

          {/* Stage */}
          <motion.div className="col-span-12 md:col-span-9" style={{ opacity: stageOpacity }}>
            <div className="relative h-[28vw] md:h-[16vw]">
              {worlds.map((w, i) => (
                <StageWord key={w} label={w} index={i} count={n} progress={scrollYProgress} />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-x-5 top-1/2 -translate-y-1/2 text-right sm:inset-x-8 md:inset-x-12"
            style={{ opacity: buildingOpacity, scale: buildingScale }}
          >
            <p className="eyebrow mb-4 text-terracotta">All of it, at once</p>
            <p className="display text-[18vw] text-ink md:text-[13vw]">BUILDING.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StageWord({ label, index, count, progress }: { label: string; index: number; count: number; progress: MotionValue<number> }) {
  const step = CYCLE / count;
  const start = index * step;
  const end = start + step;
  const fade = step * 0.16;
  const first = index === 0;
  // Each word fully fades out before the next one fades in, so they never overlap.
  const range = [start, start + fade, end - fade, end];
  const opacity = useProgress(progress, range, [first ? 1 : 0, 1, 1, 0]);
  const y = useProgress(progress, range, [first ? "0%" : "60%", "0%", "0%", "-60%"]);
  const parts = label.split(" ");
  return (
    <motion.p className="display absolute inset-0 flex flex-col justify-center text-[9.5vw] text-ink md:text-[7.2vw]" style={{ opacity, y }}>
      {parts.map((p, i) => (
        <span key={i} className={i === parts.length - 1 && parts.length > 1 ? "display-italic pl-[0.4em] text-terracotta" : ""}>
          {p}
        </span>
      ))}
    </motion.p>
  );
}

function LedgerItem({ label, index, count, progress }: { label: string; index: number; count: number; progress: MotionValue<number> }) {
  const step = CYCLE / count;
  const start = index * step;
  const range = [start, start + 0.03];
  const opacity = useProgress(progress, range, [index === 0 ? 1 : 0.28, 1]);
  const x = useProgress(progress, range, [index === 0 ? 12 : 0, 12]);
  return (
    <motion.li className="eyebrow flex items-center gap-3 text-ink" style={{ opacity, x }}>
      <span className="text-terracotta/70">0{index + 1}</span>
      {label}
    </motion.li>
  );
}

function StaticWorlds() {
  return (
    <div className="mt-20 px-5 pb-24 sm:px-8 md:px-12">
      <ol className="flex flex-col">
        {worlds.map((w, i) => (
          <Reveal key={w} delay={i * 0.05} y={20}>
            <li className="display flex items-baseline gap-4 border-t border-ink/10 py-4 text-[9vw] text-ink sm:text-[7vw]">
              <span className="eyebrow text-terracotta/70">0{i + 1}</span>
              {w}
            </li>
          </Reveal>
        ))}
      </ol>
      <Reveal className="mt-10 text-right">
        <p className="eyebrow mb-3 text-terracotta">All of it, at once</p>
        <p className="display text-[16vw] text-ink sm:text-[12vw]">BUILDING.</p>
      </Reveal>
    </div>
  );
}
