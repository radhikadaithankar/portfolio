"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { about, identity, portraits } from "@/data/site";
import { useCalmMotion } from "@/lib/motion";
import { Lines } from "../Reveal";
import { Portrait } from "../Portrait";
import { SectionMark } from "../SectionMark";

export function About({ hasPortrait }: { hasPortrait: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { calm } = useCalmMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [calm ? 0 : -60, calm ? 0 : 60]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-cream">
      <div className="px-5 pt-28 sm:px-8 md:px-12 md:pt-36">
        <SectionMark number="05" title="About" />
      </div>
      <div className="mt-10 grid gap-12 md:grid-cols-12">
        <motion.div className="relative md:col-span-5" style={{ y: imgY }}>
          <div className="relative ml-[-5vw] aspect-[4/5] w-[88vw] sm:w-[70vw] md:ml-0 md:aspect-[3/4] md:w-full">
            <Portrait src={portraits.founder} available={hasPortrait} alt={`${identity.fullName}, portrait`} className="h-full w-full" variant="founder" />
          </div>
        </motion.div>

        <div className="px-5 pb-28 sm:px-8 md:col-span-6 md:col-start-7 md:px-0 md:pr-12 md:pb-36">
          <Lines
            as="h2"
            lines={["ABOUT."]}
            className="display text-[15vw] text-ink sm:text-[11vw] md:text-[7vw]"
          />
          <p className="mt-8 max-w-md font-serif text-xl leading-relaxed text-ink/90">{about.line}</p>
          <ul className="mt-10 flex flex-wrap gap-3">
            {about.interests.map((m) => (
              <li key={m} className="rounded-full border border-ink/15 bg-ivory px-4 py-2 font-serif text-base text-ink">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
