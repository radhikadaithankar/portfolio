"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { identity, portraits } from "@/data/site";
import { EASE, useCalmMotion } from "@/lib/motion";
import { Lines } from "../Reveal";
import { Portrait } from "../Portrait";

export function Hero({ hasPortrait }: { hasPortrait: boolean }) {
  const { calm } = useCalmMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, calm ? 0 : 140]);
  const typeY = useTransform(scrollY, [0, 900], [0, calm ? 0 : -80]);

  // Cursor-reactive drift for the photograph, desktop only.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const dx = useSpring(mx, { stiffness: 40, damping: 20 });
  const dy = useSpring(my, { stiffness: 40, damping: 20 });
  const onMove = (e: React.MouseEvent) => {
    if (calm) return;
    const { innerWidth, innerHeight } = window;
    mx.set(((e.clientX / innerWidth) - 0.5) * -24);
    my.set(((e.clientY / innerHeight) - 0.5) * -16);
  };

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden pt-28 sm:pt-32 md:pt-36" onMouseMove={onMove}>
      {/* Photograph: oversized, bleeding past the right edge. */}
      <motion.div
        className="pointer-events-none absolute -right-[18vw] top-[8vh] h-[62vh] w-[78vw] sm:-right-[10vw] sm:w-[58vw] md:right-[-6vw] md:top-[6vh] md:h-[88vh] md:w-[44vw] lg:w-[40vw]"
        style={{ y: imageY }}
      >
        <motion.div className="h-full w-full" style={{ x: dx, y: dy }}>
          <Portrait src={portraits.hero} available={hasPortrait} alt={`${identity.fullName}, portrait`} className="h-full w-full" delay={0.35} />
        </motion.div>
        <motion.span
          className="eyebrow absolute -left-3 bottom-8 hidden origin-bottom-left -rotate-90 text-brown/70 md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          Portrait · {identity.location}
        </motion.span>
      </motion.div>

      {/* Type sitting on top of, and slightly over, the image. */}
      <motion.div className="relative z-10 px-5 sm:px-8 md:px-12" style={{ y: typeY }}>
        <motion.p
          className="eyebrow mb-8 text-brown/80 md:mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
        >
          Issue 01 &mdash; A digital portrait
        </motion.p>

        <Lines
          as="h1"
          lines={identity.statement}
          animateOnMount
          delay={3}
          className="display text-[17.5vw] text-ink sm:text-[15vw] md:text-[12.5vw] lg:text-[11vw]"
          lineClassName={(i) => (i === 1 ? "display-italic pl-[0.35em] text-terracotta" : i === 2 ? "pl-[0.12em]" : "")}
        />

        <div className="mt-[8vh] grid grid-cols-1 gap-8 md:mt-[10vh] md:grid-cols-12 md:items-end">
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1, ease: EASE }}
          >
            <p className="font-serif text-2xl tracking-[0.12em] text-ink sm:text-3xl">{identity.fullName.toUpperCase()}</p>
            <p className="eyebrow mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-brown/80">
              {identity.disciplines.map((d, i) => (
                <span key={d} className="flex items-center gap-3">
                  {d}
                  {i < identity.disciplines.length - 1 && <span className="text-terracotta">·</span>}
                </span>
              ))}
            </p>
          </motion.div>
          <motion.p
            className="measure font-serif text-lg leading-relaxed text-brown md:col-span-4 md:col-start-7 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: EASE }}
          >
            {identity.supportingLine}
          </motion.p>
        </div>

        <motion.div
          className="mt-14 flex items-center gap-4 pb-14 md:mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <span className="eyebrow text-brown/60">Scroll</span>
          <motion.span
            className="block h-px w-16 origin-left bg-terracotta"
            animate={calm ? undefined : { scaleX: [0, 1, 1, 0], x: [0, 0, 0, 64] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 1] }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
