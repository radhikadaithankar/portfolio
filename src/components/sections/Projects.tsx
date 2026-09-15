"use client";

import { motion } from "framer-motion";
import { experiments } from "@/data/site";
import { EASE } from "@/lib/motion";
import { Lines, Reveal } from "../Reveal";
import { SectionMark } from "../SectionMark";
import { Motif } from "./Motifs";

/** Section 01. Five projects in CV order, each the same kind of row. */
export function Projects() {
  return (
    <section id="projects" className="relative bg-cream">
      <div className="pad pt-28 md:pt-40">
        <SectionMark number="01" title="Projects" />
        <Lines as="h2" lines={["PROJECTS."]} className="display mt-8 text-[16vw] text-ink sm:text-[12vw] md:text-[9vw]" />

        <div className="mt-14 flex flex-col pb-28 md:mt-16 md:pb-40">
          {experiments.map((c) => (
            <ProjectRow key={c.number} chapter={c} />
          ))}
        </div>
      </div>
    </section>
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
        <p className="mt-4 max-w-lg font-serif text-lg leading-snug text-ink md:text-xl">{chapter.summary}</p>
        <p className="mt-4 max-w-lg leading-relaxed text-brown">{chapter.detail}</p>
        {chapter.notes && (
          <ul className="mt-5 max-w-lg space-y-2">
            {chapter.notes.map((n) => (
              <li key={n} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-terracotta" />
                {n}
              </li>
            ))}
          </ul>
        )}
        <ul className="mt-6 flex flex-wrap gap-2">
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
