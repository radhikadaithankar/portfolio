"use client";

import { motion } from "framer-motion";
import { education, roles } from "@/data/site";
import { EASE } from "@/lib/motion";
import { Lines, Reveal } from "../Reveal";
import { SectionMark } from "../SectionMark";

export function Experience() {
  return (
    <section id="experience" className="relative bg-ivory">
      <div className="pad pt-28 md:pt-40">
        <SectionMark number="02" title="Experience" />
        <Lines as="h2" lines={["EXPERIENCE."]} className="display mt-8 text-[13vw] text-ink sm:text-[10vw] md:text-[7.5vw]" />

        <ol className="mt-14 flex flex-col md:mt-16">
          {roles.map((r) => (
            <RoleRow key={`${r.company}-${r.period}`} r={r} />
          ))}
        </ol>

        <div className="mt-16 grid gap-10 border-t border-ink/10 pb-28 pt-12 md:mt-24 md:grid-cols-12 md:pb-40">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-terracotta">Education</p>
          </Reveal>
          <div className="flex flex-col md:col-span-8 md:col-start-5">
            {education.map((e, i) => (
              <Reveal key={e.degree} delay={i * 0.08}>
                <div className="grid gap-2 border-t border-ink/10 py-7 sm:grid-cols-12 sm:gap-6">
                  <span className="eyebrow pt-1 text-brown/70 sm:col-span-3">{e.period}</span>
                  <div className="sm:col-span-9">
                    <h3 className="font-serif text-2xl leading-snug text-ink md:text-[1.85rem]">{e.degree}</h3>
                    <p className="mt-1 text-sm text-brown">
                      {e.school} · {e.place}
                    </p>
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
      className="group grid gap-3 border-t border-ink/10 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-9"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <span className="eyebrow text-brown/70 md:col-span-3">{r.period}</span>
      <div className="md:col-span-5">
        <h3 className="display text-[8vw] text-ink transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-2 sm:text-[4.6vw] md:text-[2.4vw]">
          {r.title}
        </h3>
        <p className="mt-1 font-serif text-lg text-brown">{r.company}</p>
      </div>
      <ul className="flex flex-wrap gap-2 md:col-span-4 md:justify-end">
        {r.tags.map((t) => (
          <li
            key={t}
            className="h-fit rounded-full border border-ink/15 px-3 py-1 text-xs tracking-wide text-brown transition-colors duration-500 group-hover:border-terracotta/40"
          >
            {t}
          </li>
        ))}
      </ul>
    </motion.li>
  );
}
