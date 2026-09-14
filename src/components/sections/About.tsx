"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { about, identity, portraits } from "@/data/site";
import { useCalmMotion } from "@/lib/motion";
import { Lines, Reveal } from "../Reveal";
import { Portrait } from "../Portrait";
import { SectionMark } from "../SectionMark";

/** Section 05. A short first-person biography next to a portrait. */
export function About({ hasPortrait }: { hasPortrait: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { calm } = useCalmMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [calm ? 0 : -60, calm ? 0 : 60]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-cream">
      <div className="px-5 pt-32 sm:px-8 md:px-12 md:pt-44">
        <SectionMark number="05" title="About" />
      </div>
      <div className="mt-12 grid gap-12 md:grid-cols-12">
        <motion.div className="relative md:col-span-6 lg:col-span-5" style={{ y: imgY }}>
          <div className="relative ml-[-5vw] aspect-[4/5] w-[88vw] sm:w-[70vw] md:ml-0 md:aspect-[3/4] md:w-full">
            <Portrait src={portraits.founder} available={hasPortrait} alt={`${identity.fullName}, portrait`} className="h-full w-full" variant="founder" />
            <div className="absolute -bottom-6 -right-4 hidden h-40 w-32 bg-sand/80 md:block" aria-hidden />
          </div>
          <p className="eyebrow mt-6 pl-5 text-brown/70 sm:pl-8 md:pl-12">
            {identity.fullName} · {identity.currentRole}
          </p>
        </motion.div>

        <div className="px-5 sm:px-8 md:col-span-6 md:col-start-7 md:px-0 md:pr-12">
          <Lines
            as="h2"
            lines={["ABOUT", "ME."]}
            className="display text-[15vw] text-ink sm:text-[12vw] md:text-[7vw]"
            lineClassName={(i) => (i === 1 ? "display-italic pl-[0.3em] text-terracotta" : "")}
          />
          <div className="mt-12 space-y-6">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="max-w-xl font-serif text-xl leading-relaxed text-ink/90">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16" amount={0.5}>
            <p className="eyebrow mb-6 text-brown/70">Interested in</p>
            <ul className="flex flex-wrap gap-3">
              {about.interests.map((m) => (
                <li key={m} className="rounded-full border border-ink/15 bg-ivory px-4 py-2 font-serif text-base text-ink">
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
      <div className="h-32 md:h-44" />
    </section>
  );
}
