"use client";

import { motion } from "framer-motion";
import { experiments, platform } from "@/data/site";
import { EASE, useCalmMotion } from "@/lib/motion";
import { Lines, Reveal } from "../Reveal";
import { SectionMark } from "../SectionMark";
import { Motif } from "./Motifs";
import { ProductDemo } from "./ProductDemo";

/** Section 01. Five projects, CV order. The school platform is featured first; the demo lives inside it. */
export function Projects() {
  return (
    <section id="projects" className="relative bg-cream">
      <div className="pad pt-28 md:pt-40">
        <SectionMark number="01" title="Projects" />
        <Lines as="h2" lines={["PROJECTS."]} className="display mt-8 text-[16vw] text-ink sm:text-[12vw] md:text-[9vw]" />
      </div>

      <article className="mt-14 md:mt-20" aria-labelledby="project-01">
        <div className="pad">
          <div className="grid gap-6 border-t border-ink/10 pt-8 md:grid-cols-12 md:gap-8 md:pt-10">
            <Reveal className="md:col-span-3">
              <p className="eyebrow text-terracotta">{platform.number}</p>
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
              <h3
                id="project-01"
                className="display max-w-[18ch] text-[9vw] leading-[0.96] text-ink sm:text-[6.4vw] md:text-[4.2vw] lg:text-[3.6vw]"
              >
                {platform.title}
              </h3>
              <p className="mt-5 max-w-xl font-serif text-xl text-brown md:text-2xl">{platform.oneLine}</p>
            </div>
          </div>
        </div>

        <WorkflowMarquee />

        <div className="pad pt-14 md:pt-20">
          <div className="rounded-sm bg-ivory/70 p-5 shadow-[0_24px_60px_-48px_rgba(58,42,36,0.45)] sm:p-8 md:p-10">
            <ProductDemo />
          </div>
        </div>
      </article>

      <div className="pad pb-28 pt-16 md:pb-40 md:pt-24">
        <div className="flex flex-col">
          {experiments.map((c) => (
            <ProjectRow key={c.number} chapter={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowMarquee() {
  const { calm } = useCalmMotion();
  const items = platform.workflows;
  return (
    <div className="mt-12 border-y border-ink/10 md:mt-16" aria-label={`Workflows: ${items.join(", ")}`}>
      <div className="flex overflow-hidden py-5">
        <motion.div
          className="flex shrink-0 items-center gap-10 pr-10"
          animate={calm ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        >
          {[...items, ...items].map((w, i) => (
            <span key={i} className="flex items-center gap-10 font-serif text-2xl text-ink/75 md:text-[1.85rem]">
              {w}
              <span className="h-1.5 w-1.5 rounded-full bg-terracotta/70" />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ProjectRow({ chapter }: { chapter: (typeof experiments)[number] }) {
  return (
    <article
      className="group grid gap-6 border-t border-ink/10 py-12 md:grid-cols-12 md:items-start md:gap-8 md:py-16"
      aria-labelledby={`project-${chapter.number}`}
    >
      <Reveal className="md:col-span-2">
        <p className="eyebrow text-terracotta">{chapter.number}</p>
        <p className="eyebrow mt-2 text-brown/70">{chapter.kicker}</p>
      </Reveal>

      <Reveal className="md:col-span-6" delay={0.08}>
        <h3
          id={`project-${chapter.number}`}
          className="display max-w-[16ch] text-[8.5vw] leading-[0.98] text-ink transition-colors duration-500 group-hover:text-terracotta sm:text-[5.5vw] md:text-[2.8vw]"
        >
          {chapter.title}
        </h3>
        <p className="mt-4 max-w-lg font-serif text-lg text-brown md:text-xl">{chapter.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {chapter.tools.map((t) => (
            <li
              key={t}
              className="rounded-full border border-ink/15 px-3 py-1 text-xs tracking-wide text-brown transition-colors duration-500 group-hover:border-terracotta/40 group-hover:text-ink"
            >
              {t}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="md:col-span-4" delay={0.16} amount={0.2}>
        <motion.div
          className="relative aspect-[4/3] overflow-hidden rounded-sm bg-sand/55 p-4 shadow-[0_30px_60px_-40px_rgba(58,42,36,0.35)]"
          whileHover={{ y: -6, rotate: 0.6 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Motif kind={chapter.motif} />
        </motion.div>
      </Reveal>
    </article>
  );
}
