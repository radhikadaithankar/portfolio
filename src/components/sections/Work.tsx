"use client";

import { motion } from "framer-motion";
import { experiments, platform } from "@/data/site";
import { useCalmMotion } from "@/lib/motion";
import { Lines, Reveal } from "../Reveal";
import { SectionMark } from "../SectionMark";
import { Motif } from "./Motifs";
import { ProductDemo } from "./ProductDemo";

export function Work() {
  return (
    <section id="work" className="relative bg-cream">
      <div className="px-5 pt-28 sm:px-8 md:px-12 md:pt-36">
        <SectionMark number="01" title="Work" />
        <Lines
          as="h2"
          lines={["WORK."]}
          className="display mt-8 text-[18vw] text-ink sm:text-[13vw] md:text-[10vw]"
        />
      </div>

      <article className="mt-16 md:mt-24" aria-labelledby="platform-title">
        <div className="px-5 sm:px-8 md:px-12">
          <div className="grid gap-6 border-t border-ink/10 pt-8 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <p className="eyebrow text-terracotta">Project {platform.number}</p>
              <p className="eyebrow mt-2 text-brown/70">{platform.kicker}</p>
              <ul className="mt-8 hidden flex-col gap-2 md:flex">
                {platform.stack.map((s) => (
                  <li key={s} className="text-sm text-brown">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="md:col-span-9">
              <h3 id="platform-title" className="display text-[9.5vw] text-ink sm:text-[7vw] md:text-[5vw]">
                {platform.title}
              </h3>
              <p className="mt-5 max-w-xl font-serif text-xl text-brown md:text-2xl">{platform.oneLine}</p>
            </div>
          </div>
        </div>

        <WorkflowMarquee />

        <div className="px-5 pt-16 sm:px-8 md:px-12 md:pt-24">
          <ProductDemo />
        </div>
      </article>

      <div className="px-5 pb-28 pt-20 sm:px-8 md:px-12 md:pb-36 md:pt-28">
        <p className="eyebrow mb-2 text-brown/70">More projects</p>
        <div className="flex flex-col">
          {experiments.map((c, i) => (
            <ProjectRow key={c.number} chapter={c} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
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
    <div className="mt-16 md:mt-20" aria-label={`Workflows: ${items.join(", ")}`}>
      {row(1, 70)}
      {row(-1, 85)}
      <div className="border-t border-ink/10" />
    </div>
  );
}

function ProjectRow({ chapter, flip }: { chapter: (typeof experiments)[number]; flip: boolean }) {
  return (
    <article className="group grid gap-8 border-t border-ink/10 py-12 md:grid-cols-12 md:py-16" aria-labelledby={`project-${chapter.number}`}>
      <Reveal className={`md:col-span-2 ${flip ? "md:order-3 md:col-start-11" : ""}`}>
        <p className="eyebrow text-terracotta">{chapter.number}</p>
        <p className="eyebrow mt-2 text-brown/70">{chapter.kicker}</p>
      </Reveal>

      <Reveal className={`md:col-span-5 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-3"}`} delay={0.1}>
        <h3
          id={`project-${chapter.number}`}
          className="display text-[9vw] text-ink transition-colors duration-700 group-hover:text-terracotta sm:text-[6vw] md:text-[3.2vw]"
        >
          {chapter.title}
        </h3>
        <p className="mt-4 font-serif text-lg text-brown md:text-xl">{chapter.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {chapter.tools.map((t) => (
            <li key={t} className="rounded-full border border-ink/15 px-3 py-1 text-xs tracking-wide text-brown">
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
