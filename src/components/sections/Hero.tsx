"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { facts, identity, portraits } from "@/data/site";
import { useCalmMotion } from "@/lib/motion";
import { Portrait } from "../Portrait";

export function Hero({ hasPortrait }: { hasPortrait: boolean }) {
  const { calm } = useCalmMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, calm ? 0 : 120]);
  const typeY = useTransform(scrollY, [0, 900], [0, calm ? 0 : -60]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const dx = useSpring(mx, { stiffness: 40, damping: 20 });
  const dy = useSpring(my, { stiffness: 40, damping: 20 });
  const onMove = (e: React.MouseEvent) => {
    if (calm) return;
    const { innerWidth, innerHeight } = window;
    mx.set(((e.clientX / innerWidth) - 0.5) * -20);
    my.set(((e.clientY / innerHeight) - 0.5) * -14);
  };

  const nameLines = [identity.firstName.toUpperCase(), identity.lastName.toUpperCase()];

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32 md:pt-36" onMouseMove={onMove}>
      <motion.div className="relative z-10 px-5 sm:px-8 md:px-12" style={{ y: typeY }}>
        <p className="eyebrow mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-brown/80 md:mb-12">
          <span>{identity.currentRole}</span>
          <span className="text-terracotta">·</span>
          <span>{identity.location}</span>
        </p>

        <h1 className="display text-[15vw] text-ink sm:text-[13.5vw] md:text-[12vw] lg:text-[11vw]">
          {nameLines.map((line, i) => (
            <span
              key={line}
              className={`block ${i === 1 ? "display-italic pl-[0.18em] text-terracotta" : ""}`}
            >
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-10 max-w-3xl font-serif text-2xl leading-[1.25] text-ink sm:text-3xl md:mt-14 md:w-[58vw] md:text-[2.5vw]">
          {identity.headline}
        </p>
      </motion.div>

      <motion.div
        className="relative mx-5 mt-12 aspect-[4/5] w-[78vw] max-w-[440px] sm:mx-8 sm:w-[58vw] md:absolute md:right-[-3vw] md:top-[9rem] md:mx-0 md:mt-0 md:aspect-[4/5.4] md:w-[34vw] md:max-w-none lg:w-[31vw]"
        style={{ y: imageY }}
      >
        <motion.div className="h-full w-full" style={{ x: dx, y: dy }}>
          <Portrait src={portraits.hero} available={hasPortrait} alt={`${identity.fullName}, portrait`} className="h-full w-full" />
        </motion.div>
      </motion.div>

      <div className="relative z-10 px-5 sm:px-8 md:px-12">
        <p className="measure mt-12 leading-relaxed text-brown md:mt-16 md:w-[42vw] md:text-lg">{identity.intro}</p>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/10 pt-8 md:mt-24 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="eyebrow text-brown/70">{f.label}</dt>
              <dd className="mt-3 font-serif text-xl leading-tight text-ink md:text-2xl">{f.value}</dd>
              <dd className="mt-1 text-sm text-brown">{f.note}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 flex items-center gap-4 pb-16 md:mt-20 md:pb-24">
          <span className="eyebrow text-brown/60">Scroll</span>
          <motion.span
            className="block h-px w-16 origin-left bg-terracotta"
            animate={calm ? undefined : { scaleX: [0, 1, 1, 0], x: [0, 0, 0, 64] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 1] }}
          />
        </div>
      </div>
    </section>
  );
}
