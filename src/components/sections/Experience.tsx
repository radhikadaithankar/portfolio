"use client";

import { motion } from "framer-motion";
import { education, roles } from "@/data/site";
import { EASE } from "@/lib/motion";
import { Lines, Reveal } from "../Reveal";
import { SectionMark } from "../SectionMark";

export function Experience() {
  return (
    <section id="experience" className="relative bg-ivory">
      <div className="px-5 pt-28 sm:px-8 md:px-12 md:pt-36">
        <SectionMark number="02" title="Experience" />
        <Lines
          as="h2"
          lines={["EXPERIENCE."]}
          className="display mt-8 text-[14vw] text-ink sm:text-[11vw] md:text-[8vw]"
        />

        <ol className="mt-16 flex flex-col">
          {roles.map((r) => (
            <RoleRow key={`${r.company}-${r.period}`} r={r} />
          ))}
        </ol>

        <div className="mt-20 grid gap-10 border-t border-ink/10 pb-28 pt-12 md:grid-cols-12 md:pb-36">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-terracotta">Education</p>
          </Reveal>
          <div className="flex flex-col gap-8 md:col-span-8 md:col-start-5">
            {education.map((e, i) => (
              <Reveal key={e.degree} delay={i * 0.08}>
                <div className="grid gap-3 border-t border-ink/10 pt-6 sm:grid-cols-12">
                  <span className="eyebrow text-brown/70 sm:col-span-3">{e.period}</span>
                  <div className="sm:col-span-9">
                    <h3 className="font-serif text-2xl text-ink">{e.degree}</h3>
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
      className="group grid gap-3 border-t border-ink/10 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <span className="eyebrow text-brown/70 md:col-span-3">{r.period}</span>
      <div className="md:col-span-5">
        <h3 className="display text-[8vw] text-ink sm:text-[5vw] md:text-[2.6vw]">{r.title}</h3>
        <p className="mt-1 font-serif text-lg text-brown">{r.company}</p>
      </div>
      <ul className="flex flex-wrap gap-2 md:col-span-4 md:justify-end">
        {r.tags.map((t) => (
          <li key={t} className="h-fit rounded-full border border-ink/15 px-3 py-1 text-xs tracking-wide text-brown">
            {t}
          </li>
        ))}
      </ul>
    </motion.li>
  );
}
