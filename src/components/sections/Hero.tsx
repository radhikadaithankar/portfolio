"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { facts, identity, portraits } from "@/data/site";
import { EASE, useCalmMotion } from "@/lib/motion";
import { Portrait } from "../Portrait";

export function Hero({ hasPortrait }: { hasPortrait: boolean }) {
  const { calm } = useCalmMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, calm ? 0 : 100]);
  const typeY = useTransform(scrollY, [0, 900], [0, calm ? 0 : -48]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const dx = useSpring(mx, { stiffness: 40, damping: 20 });
  const dy = useSpring(my, { stiffness: 40, damping: 20 });
  const onMove = (e: React.MouseEvent) => {
    if (calm) return;
    const { innerWidth, innerHeight } = window;
    mx.set((e.clientX / innerWidth - 0.5) * -18);
    my.set((e.clientY / innerHeight - 0.5) * -12);
  };

  const nameLines = [identity.firstName.toUpperCase(), identity.lastName.toUpperCase()];

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32 md:min-h-[100svh] md:pt-36" onMouseMove={onMove}>
      <motion.div className="relative z-10 pad" style={{ y: typeY }}>
        <p className="eyebrow mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-brown/75 md:mb-12">
          <span>{identity.currentRole}</span>
          <span className="text-terracotta">·</span>
          <span>{identity.location}</span>
        </p>

        <h1 className="display hero-name text-[14vw] text-ink sm:text-[12vw] md:text-[10vw] lg:text-[9vw]">
          {nameLines.map((line, i) => (
            <span key={line} className={`block ${i === 1 ? "display-italic pl-[0.12em] text-terracotta" : ""}`}>
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-8 font-serif text-xl italic leading-snug text-ink sm:text-2xl md:mt-10 md:text-[1.85rem]">
          {identity.headline}
        </p>
      </motion.div>

      <motion.div
        className="relative mx-5 mt-10 aspect-[4/5] w-[82vw] max-w-[420px] sm:mx-8 sm:w-[56vw] md:absolute md:right-[-2vw] md:top-[8.5rem] md:mx-0 md:mt-0 md:aspect-[4/5.2] md:w-[32vw] md:max-w-none lg:right-[2vw] lg:w-[28vw] xl:right-[4vw]"
        style={{ y: imageY }}
        whileHover={calm ? undefined : { scale: 1.015 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <motion.div className="h-full w-full" style={{ x: dx, y: dy }}>
          <Portrait src={portraits.hero} available={hasPortrait} alt={`${identity.fullName}, portrait`} className="h-full w-full" />
        </motion.div>
        <p className="eyebrow pointer-events-none absolute bottom-4 left-4 hidden text-ivory/90 md:block">
          {identity.location}
        </p>
      </motion.div>

      <div className="relative z-10 pad">
        <dl className="mt-12 grid grid-cols-2 gap-x-5 gap-y-8 border-t border-ink/10 pt-8 md:mt-[4.5rem] md:w-[56vw] md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="group">
              <dt className="eyebrow text-brown/65">{f.label}</dt>
              <dd className="mt-3 font-serif text-xl leading-tight text-ink transition-colors duration-500 group-hover:text-terracotta md:text-[1.65rem]">
                {f.value}
              </dd>
              {f.note && <dd className="mt-1 text-sm text-brown">{f.note}</dd>}
            </div>
          ))}
        </dl>

        <div className="mt-12 flex items-center gap-4 pb-16 md:mt-16 md:pb-20">
          <span className="eyebrow text-brown/55">Scroll</span>
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
