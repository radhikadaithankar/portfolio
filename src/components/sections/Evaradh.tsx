"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { evaradh } from "@/data/site";
import { EASE, useCalmMotion } from "@/lib/motion";
import { Lines, Reveal } from "../Reveal";
import { SectionMark } from "../SectionMark";

/** Section 08. Not a landing page. The beginning of a company, told honestly. */
export function Evaradh() {
  const { calm } = useCalmMotion();
  return (
    <section id="evaradh" className="relative">
      {/* The becoming: PROBLEM → ... → EVARADH */}
      <div className="relative bg-burgundy text-ivory">
        <div className="grain pointer-events-none absolute inset-0 overflow-hidden opacity-60" aria-hidden />
        <div className="relative px-5 pt-28 sm:px-8 md:px-12 md:pt-36">
          <SectionMark number="08" title="Evaradh" tone="light" />
        </div>
        {calm ? <CalmSequence /> : <ScrollSequence />}
      </div>

      {/* Vision, philosophy, manifesto */}
      <div className="relative bg-ivory px-5 pt-28 sm:px-8 md:px-12 md:pt-40">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow text-terracotta">What it is</p>
            <p className="mt-6 font-serif text-2xl leading-snug text-ink md:text-3xl">{evaradh.vision}</p>
            <p className="mt-8 max-w-md leading-relaxed text-brown">{evaradh.note}</p>
          </Reveal>
          <div className="md:col-span-7 md:col-start-6">
            <p className="eyebrow mb-6 text-brown/70">How it thinks</p>
            <Lines
              as="p"
              lines={evaradh.philosophy}
              className="display text-[13vw] text-ink sm:text-[10vw] md:text-[6.4vw]"
              lineClassName={(i) => (i === 1 ? "display-italic text-terracotta" : "")}
            />
            <Reveal className="mt-10 max-w-xl" delay={0.3}>
              <p className="font-serif text-xl italic leading-relaxed text-brown">{evaradh.belief}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-32 grid gap-12 border-t border-ink/10 pt-16 md:mt-44 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-terracotta">Manifesto</p>
            <p className="mt-3 font-serif text-lg italic text-brown">Written before there is anything to sell. On purpose.</p>
          </Reveal>
          <div className="md:col-span-8 md:col-start-5">
            <ol className="flex flex-col gap-6">
              {evaradh.manifesto.map((line, i) => (
                <motion.li
                  key={i}
                  className="flex gap-6 border-l border-terracotta/40 pl-6 font-serif text-2xl leading-snug text-ink md:text-[2.1vw] md:leading-[1.25]"
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                >
                  {line}
                </motion.li>
              ))}
            </ol>
            <Reveal className="mt-20" amount={0.5}>
              <p className="display text-[13vw] text-terracotta sm:text-[10vw] md:text-[6.6vw]">{evaradh.closing}</p>
              <p className="mt-6 max-w-md font-serif text-lg italic text-brown">A long-term, company-building journey, described from its first page.</p>
            </Reveal>
          </div>
        </div>
        <div className="h-32 md:h-44" />
      </div>
    </section>
  );
}

function ScrollSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = evaradh.sequence;
  const n = words.length;
  const lineScale = useTransform(scrollYProgress, [0, 0.92], [0, 1]);
  const glow = useTransform(scrollYProgress, [0.82, 1], [0, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0.86, 0.96], [0, 1]);

  return (
    <div ref={ref} style={{ height: `${n * 85 + 30}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-5 sm:px-8 md:px-12">
        {/* Warm light that rises as the company arrives */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[70vh]"
          style={{
            opacity: glow,
            background: "radial-gradient(80% 60% at 50% 100%, rgba(230,190,163,0.55) 0%, rgba(230,190,163,0) 70%)",
          }}
          aria-hidden
        />
        <div className="relative flex items-center justify-between">
          <Counter progress={scrollYProgress} count={n} />
          <span className="eyebrow text-sand/70">How a company begins</span>
        </div>
        <div className="relative mt-8 h-[22vw] md:h-[14vw]">
          {words.map((w, i) => (
            <SequenceWord key={w} word={w} index={i} count={n} progress={scrollYProgress} />
          ))}
        </div>
        <div className="relative mt-10 h-px w-full bg-ivory/15">
          <motion.span className="absolute inset-y-0 left-0 w-full origin-left bg-peach" style={{ scaleX: lineScale }} />
        </div>
        <motion.p
          className="relative mt-6 max-w-lg font-serif text-lg italic text-sand"
          style={{ opacity: captionOpacity }}
        >
          Not an announcement. A direction.
        </motion.p>
      </div>
    </div>
  );
}

function SequenceWord({ word, index, count, progress }: { word: string; index: number; count: number; progress: MotionValue<number> }) {
  const step = 0.9 / count;
  const start = index * step;
  const end = start + step;
  const last = index === count - 1;
  const opacity = useTransform(progress, [start - 0.02, start + 0.03, last ? 2 : end - 0.03, last ? 3 : end + 0.01], [0, 1, 1, 0]);
  const y = useTransform(progress, [start - 0.02, start + 0.03, end - 0.03, end + 0.01], ["40%", "0%", "0%", last ? "0%" : "-40%"]);
  const letterSpacing = useTransform(progress, [start - 0.02, start + 0.05], ["0.08em", "-0.03em"]);
  return (
    <motion.p
      className={`display absolute inset-0 flex items-center text-[16vw] md:text-[11.5vw] ${last ? "text-peach" : "text-ivory"}`}
      style={{ opacity, y, letterSpacing }}
    >
      {word}
      {index < count - 1 && <span className="ml-6 hidden font-serif text-[3vw] font-light text-sand/60 md:inline">→</span>}
    </motion.p>
  );
}

function Counter({ progress, count }: { progress: MotionValue<number>; count: number }) {
  const index = useTransform(progress, (v) => String(Math.min(count, Math.floor((v / 0.9) * count) + 1)).padStart(2, "0"));
  return (
    <span className="eyebrow text-sand/70">
      <motion.span>{index}</motion.span> / {String(count).padStart(2, "0")}
    </span>
  );
}

function CalmSequence() {
  return (
    <div className="px-5 pb-28 pt-16 sm:px-8 md:px-12">
      <ol className="flex flex-col gap-3">
        {evaradh.sequence.map((w, i) => (
          <Reveal key={w} delay={i * 0.05} amount={0.4}>
            <li className={`display text-[13vw] sm:text-[10vw] ${i === evaradh.sequence.length - 1 ? "text-peach" : "text-ivory"}`}>{w}</li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
