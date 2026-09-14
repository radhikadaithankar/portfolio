"use client";

import { motion } from "framer-motion";
import { evaradh } from "@/data/site";
import { EASE } from "@/lib/motion";
import { Reveal } from "../Reveal";
import { SectionMark } from "../SectionMark";

/** Section 04. The company, stated plainly: what it is, where it stands, how it will work. */
export function Evaradh() {
  return (
    <section id="evaradh" className="relative bg-burgundy text-ivory">
      <div className="grain pointer-events-none absolute inset-0 overflow-hidden opacity-60" aria-hidden />
      <div className="relative px-5 pt-32 sm:px-8 md:px-12 md:pt-44">
        <SectionMark number="04" title="Evaradh" tone="light" />

        <motion.h2
          className="display mt-10 text-[17vw] text-peach sm:text-[14vw] md:text-[12vw]"
          initial={{ opacity: 0, letterSpacing: "0.12em" }}
          whileInView={{ opacity: 1, letterSpacing: "-0.03em" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          {evaradh.name}
        </motion.h2>
        <Reveal delay={0.3}>
          <p className="eyebrow mt-4 text-sand/80">A technology company, in progress</p>
        </Reveal>

        <div className="mt-20 grid gap-12 border-t border-ivory/15 pt-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="eyebrow text-peach">What it is</p>
            <p className="mt-6 font-serif text-2xl leading-snug md:text-3xl">{evaradh.what}</p>
          </Reveal>
          <Reveal className="md:col-span-5 md:col-start-8" delay={0.15}>
            <p className="eyebrow text-peach">Where it stands</p>
            <p className="mt-6 font-serif text-2xl leading-snug md:text-3xl">{evaradh.stage}</p>
          </Reveal>
        </div>

        <div className="mt-24 border-t border-ivory/15 pt-12 md:mt-32">
          <Reveal>
            <p className="eyebrow text-peach">How it will work</p>
          </Reveal>
          <ol className="mt-10 grid gap-10 md:grid-cols-3">
            {evaradh.approach.map((a, i) => (
              <motion.li
                key={a.step}
                className="border-l border-peach/40 pl-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
              >
                <span className="display text-4xl text-peach/70">{a.step}</span>
                <h3 className="mt-4 font-serif text-2xl leading-tight md:text-3xl">{a.title}</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-sand/85">{a.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-24 md:mt-32">
          <dl className="grid gap-8 border-t border-ivory/15 pb-32 pt-10 sm:grid-cols-3 md:pb-44">
            {evaradh.status.map((s) => (
              <div key={s.label}>
                <dt className="eyebrow text-sand/70">{s.label}</dt>
                <dd className="mt-3 font-serif text-xl text-ivory md:text-2xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
