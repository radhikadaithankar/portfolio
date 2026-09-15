"use client";

import { motion } from "framer-motion";
import { evaradh } from "@/data/site";
import { EASE } from "@/lib/motion";
import { SectionMark } from "../SectionMark";

export function Evaradh() {
  return (
    <section id="evaradh" className="relative bg-burgundy text-ivory">
      <div className="grain pointer-events-none absolute inset-0 overflow-hidden opacity-50" aria-hidden />
      <div className="relative pad pt-28 md:pt-40">
        <SectionMark number="04" title="Evaradh" tone="light" />

        <motion.h2
          className="display mt-8 text-[16vw] text-peach sm:text-[13vw] md:text-[11vw]"
          initial={{ opacity: 0, letterSpacing: "0.14em" }}
          whileInView={{ opacity: 1, letterSpacing: "-0.03em" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.5, ease: EASE }}
        >
          {evaradh.name}
        </motion.h2>
        <p className="mt-6 max-w-lg font-serif text-xl leading-snug text-sand md:text-2xl">{evaradh.line}</p>

        <dl className="mt-16 grid gap-8 border-t border-ivory/15 pb-28 pt-10 sm:grid-cols-3 md:mt-20 md:pb-40">
          {evaradh.status.map((s) => (
            <div key={s.label}>
              <dt className="eyebrow text-sand/65">{s.label}</dt>
              <dd className="mt-3 font-serif text-xl text-ivory md:text-2xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
