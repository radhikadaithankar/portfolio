"use client";

import { motion } from "framer-motion";
import { education, roles } from "@/data/site";
import { EASE } from "@/lib/motion";
import { Lines, Reveal } from "../Reveal";
import { SectionMark } from "../SectionMark";

/** Section 02. Roles in reverse chronological order, then education. */
export function Experience() {
  return (
    <section id="experience" className="relative bg-ivory">
      <div className="px-5 pt-32 sm:px-8 md:px-12 md:pt-44">
        <SectionMark number="02" title="Experience" />
        <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
          <Lines
            as="h2"
            lines={["WHERE I'VE", "WORKED."]}
            className="display text-[15vw] text-ink sm:text-[12vw] md:col-span-7 md:text-[8vw]"
            lineClassName={(i) => (i === 1 ? "display-italic pl-[0.3em] text-brown" : "")}
          />
          <Reveal className="md:col-span-4 md:col-start-9" delay={0.2}>
            <p className="measure font-serif text-xl leading-relaxed text-brown">
              Five roles since 2021, from web development through data analytics and data science to technology leadership. Most recent first.
            </p>
          </Reveal>
        </div>

        <ol className="mt-20 flex flex-col">
          {roles.map((r) => (
            <RoleRow key={`${r.company}-${r.period}`} r={r} />
          ))}
        </ol>

        <div className="mt-28 grid gap-10 border-t border-ink/10 pb-32 pt-12 md:grid-cols-12 md:pb-40">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-terracotta">Education</p>
            <p className="mt-3 font-serif text-lg text-brown">Two degrees: computer science, then artificial intelligence.</p>
          </Reveal>
          <div className="flex flex-col gap-8 md:col-span-8 md:col-start-5">
            {education.map((e, i) => (
              <Reveal key={e.degree} delay={i * 0.1}>
                <div className="grid gap-3 border-t border-ink/10 pt-6 sm:grid-cols-12">
                  <span className="eyebrow text-brown/70 sm:col-span-3">{e.period}</span>
                  <div className="sm:col-span-9">
                    <h3 className="font-serif text-2xl text-ink md:text-3xl">{e.degree}</h3>
                    <p className="mt-1 text-sm text-brown">
                      {e.school} · {e.place}
                    </p>
                    <p className="mt-3 max-w-lg leading-relaxed text-ink/80">{e.focus}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoleRow({ r }: { r: (typeof roles)[number] }) {
  return (
    <motion.li
      className="group grid gap-4 border-t border-ink/10 py-10 md:grid-cols-12 md:gap-8 md:py-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className="md:col-span-3">
        <span className="eyebrow text-brown/70">{r.period}</span>
      </div>
      <div className="md:col-span-6">
        <h3 className="display text-[9vw] text-ink transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-3 sm:text-[6.5vw] md:text-[3.4vw]">
          {r.title}
        </h3>
        <p className="mt-2 font-serif text-xl text-brown">{r.company}</p>
        <p className="mt-5 max-w-xl leading-relaxed text-ink/80">{r.line}</p>
      </div>
      <ul className="flex flex-wrap gap-2 md:col-span-3 md:justify-end md:content-start">
        {r.tags.map((t) => (
          <li key={t} className="h-fit rounded-full border border-ink/15 px-3 py-1 text-xs tracking-wide text-brown">
            {t}
          </li>
        ))}
      </ul>
    </motion.li>
  );
}
