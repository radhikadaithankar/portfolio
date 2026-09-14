"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { founder, identity, portraits } from "@/data/site";
import { EASE, useCalmMotion } from "@/lib/motion";
import { Lines, Reveal } from "../Reveal";
import { Portrait } from "../Portrait";
import { SectionMark } from "../SectionMark";

/** Section 09. Back to her. */
export function Founder({ hasPortrait }: { hasPortrait: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { calm } = useCalmMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [calm ? 0 : -60, calm ? 0 : 60]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream">
      <div className="px-5 pt-32 sm:px-8 md:px-12 md:pt-44">
        <SectionMark number="09" title="The founder" />
      </div>
      <div className="mt-12 grid gap-12 md:grid-cols-12">
        <motion.div className="relative md:col-span-6 lg:col-span-5" style={{ y: imgY }}>
          <div className="relative ml-[-5vw] aspect-[4/5] w-[88vw] sm:w-[70vw] md:ml-0 md:w-full md:aspect-[3/4]">
            <Portrait src={portraits.founder} available={hasPortrait} alt={`${identity.fullName}, editorial portrait`} className="h-full w-full" variant="founder" />
            <div className="absolute -bottom-6 -right-4 hidden h-40 w-32 bg-sand/80 md:block" aria-hidden />
          </div>
          <p className="eyebrow mt-6 pl-5 text-brown/70 sm:pl-8 md:pl-0">{identity.fullName} · {identity.currentRole}</p>
        </motion.div>

        <div className="px-5 sm:px-8 md:col-span-6 md:col-start-7 md:px-0 md:pr-12">
          <Lines
            as="h2"
            lines={["THE WOMAN", "BEHIND", "THE WORK."]}
            className="display text-[14vw] text-ink sm:text-[11vw] md:text-[6.2vw]"
            lineClassName={(i) => (i === 1 ? "display-italic pl-[0.3em] text-terracotta" : "")}
          />
          <div className="mt-12 space-y-6">
            {founder.story.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="max-w-xl font-serif text-xl leading-relaxed text-ink/90">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16" amount={0.5}>
            <p className="eyebrow mb-6 text-brown/70">The movement</p>
            <ol className="flex flex-col gap-3">
              {founder.movement.map((m, i) => (
                <motion.li
                  key={m}
                  className="flex items-center gap-5"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.18, duration: 0.8, ease: EASE }}
                >
                  <span className="display text-[1.4rem] text-terracotta/70">{i + 1}</span>
                  <span className={`font-serif text-2xl md:text-3xl ${i === founder.movement.length - 1 ? "italic text-terracotta" : "text-ink"}`}>{m}</span>
                  {i < founder.movement.length - 1 && <span className="h-px flex-1 bg-ink/10" />}
                </motion.li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
      <div className="h-32 md:h-44" />
    </section>
  );
}
