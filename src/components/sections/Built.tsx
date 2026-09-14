"use client";

import { motion } from "framer-motion";
import { experiments, platform } from "@/data/site";
import { useCalmMotion } from "@/lib/motion";
import { Lines, Reveal, Words } from "../Reveal";
import { SectionMark } from "../SectionMark";
import { Motif } from "./Motifs";
import { ProductDemo } from "./ProductDemo";

export function Built() {
  return (
    <section id="work" className="relative bg-cream">
      <div className="px-5 pt-32 sm:px-8 md:px-12 md:pt-44">
        <SectionMark number="02" title="Things I've built" />
        <Lines
          as="h2"
          lines={["THINGS", "I'VE BUILT."]}
          className="display mt-10 text-[17vw] text-ink sm:text-[13vw] md:text-[11vw]"
          lineClassName={(i) => (i === 1 ? "display-italic pl-[0.25em] text-terracotta" : "")}
        />
      </div>

      <PlatformChapter />

      <div className="px-5 pb-32 pt-24 sm:px-8 md:px-12 md:pt-40">
        <Reveal className="mb-16 grid gap-6 md:grid-cols-12 md:items-end">
          <p className="eyebrow text-brown/70 md:col-span-3">Experiments</p>
          <p className="measure font-serif text-2xl leading-snug text-ink md:col-span-6 md:col-start-5">
            Before the platform, there were experiments: smaller questions about learning, seeing and moving, each one answered by
            building something and watching what it did.
          </p>
        </Reveal>
        <div className="flex flex-col">
          {experiments.map((c, i) => (
            <ExperimentChapter key={c.number} chapter={c} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformChapter() {
  return (
    <article className="mt-24 md:mt-36" aria-labelledby="platform-title">
      <div className="px-5 sm:px-8 md:px-12">
        <div className="grid gap-8 border-t border-ink/10 pt-8 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-terracotta">Chapter {platform.number}</p>
            <p className="eyebrow mt-2 text-brown/70">{platform.kicker}</p>
          </Reveal>
          <div className="md:col-span-9">
            <h3 id="platform-title" className="display text-[9.5vw] text-ink sm:text-[7.5vw] md:text-[5.6vw]">
              <Words text={platform.title} stagger={0.05} />
            </h3>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <Reveal>
                <p className="eyebrow mb-4 text-brown/70">The problem</p>
                <p className="font-serif text-xl leading-relaxed text-ink">{platform.problem}</p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="eyebrow mb-4 text-brown/70">The system</p>
                <p className="font-serif text-xl leading-relaxed text-ink">{platform.system}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <WorkflowMarquee />

      <div className="px-5 pt-20 sm:px-8 md:px-12 md:pt-28">
        <Reveal className="mb-12 md:mb-16">
          <p className="eyebrow text-brown/70">Three details, made touchable</p>
          <p className="mt-3 max-w-2xl font-serif text-2xl leading-snug text-ink md:text-3xl">
            The part I am proudest of is not the size of the system. It is the small decisions that make it trustworthy.
          </p>
        </Reveal>
        <ProductDemo />

        <div className="mt-24 grid gap-8 border-t border-ink/10 pt-10 md:grid-cols-12 md:mt-32">
          <Reveal className="md:col-span-5">
            <p className="eyebrow mb-4 text-brown/70">Appointments</p>
            <p className="font-serif text-xl leading-relaxed text-ink">{platform.appointments}</p>
          </Reveal>
          <Reveal className="md:col-span-5 md:col-start-8" delay={0.15}>
            <p className="eyebrow mb-4 text-brown/70">Underneath</p>
            <p className="font-serif text-xl leading-relaxed text-ink">{platform.ai}</p>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

function WorkflowMarquee() {
  const { calm } = useCalmMotion();
  const items = platform.workflows;
  const row = (dir: 1 | -1, speed: number) => (
    <div className="flex overflow-hidden whitespace-nowrap border-t border-ink/10 py-5">
      <motion.div
        className="flex shrink-0 items-center gap-10 pr-10"
        animate={calm ? undefined : { x: dir === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-serif text-2xl text-ink/80 md:text-3xl">
            {w}
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta/70" />
          </span>
        ))}
      </motion.div>
    </div>
  );
  return (
    <div className="mt-20 md:mt-28" aria-label="Workflows covered by the platform">
      {row(1, 70)}
      {row(-1, 85)}
      <div className="border-t border-ink/10" />
    </div>
  );
}

function ExperimentChapter({ chapter, flip }: { chapter: (typeof experiments)[number]; flip: boolean }) {
  return (
    <article className="group grid gap-8 border-t border-ink/10 py-14 md:grid-cols-12 md:py-20" aria-labelledby={`exp-${chapter.number}`}>
      <Reveal className={`md:col-span-2 ${flip ? "md:order-3 md:col-start-11" : ""}`}>
        <p className="eyebrow text-terracotta">Chapter {chapter.number}</p>
        <p className="eyebrow mt-2 text-brown/70">{chapter.kicker}</p>
      </Reveal>

      <Reveal className={`md:col-span-5 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-3"}`} delay={0.1}>
        <h3 id={`exp-${chapter.number}`} className="display text-[9vw] text-ink transition-colors duration-700 group-hover:text-terracotta sm:text-[6.5vw] md:text-[3.6vw]">
          {chapter.title}
        </h3>
        <p className="mt-5 font-serif text-xl italic leading-snug text-brown">{chapter.summary}</p>
        <div className="mt-6 space-y-4">
          {chapter.detail.map((d, i) => (
            <p key={i} className="max-w-xl leading-relaxed text-ink/80">
              {d}
            </p>
          ))}
        </div>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          {chapter.tools.map((t) => (
            <li key={t} className="eyebrow text-brown/70">
              {t}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className={`md:col-span-4 ${flip ? "md:order-2 md:col-start-7" : "md:col-start-9"}`} delay={0.2} amount={0.2}>
        <motion.div
          className="relative aspect-[4/3] overflow-hidden rounded-sm bg-sand/60 p-4 shadow-[0_30px_60px_-40px_rgba(58,42,36,0.35)]"
          whileHover={{ rotate: flip ? -1.2 : 1.2, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Motif kind={chapter.motif} />
        </motion.div>
      </Reveal>
    </article>
  );
}
