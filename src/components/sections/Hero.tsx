"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { facts, identity, portraits } from "@/data/site";
import { EASE, useCalmMotion } from "@/lib/motion";
import { Portrait } from "../Portrait";

export function Hero({ hasPortrait }: { hasPortrait: boolean }) {
  const { calm } = useCalmMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, calm ? 0 : 56]);
  const typeY = useTransform(scrollY, [0, 900], [0, calm ? 0 : -24]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const dx = useSpring(mx, { stiffness: 44, damping: 22 });
  const dy = useSpring(my, { stiffness: 44, damping: 22 });
  const stillY = useTransform([dy, imageY], ([drag, scroll]) => Number(drag) + Number(scroll));
  const onMove = (e: React.MouseEvent) => {
    if (calm) return;
    const { innerWidth, innerHeight } = window;
    mx.set((e.clientX / innerWidth - 0.5) * -12);
    my.set((e.clientY / innerHeight - 0.5) * -8);
  };

  return (
    <section id="top" className="relative overflow-hidden" onMouseMove={onMove}>
      <div className="grid grid-cols-1 md:min-h-[100svh] md:grid-cols-12 md:grid-rows-[auto_1fr]">
        <motion.div className="pad pt-28 sm:pt-32 md:col-span-6 md:row-start-1 md:pb-6" style={{ y: typeY }}>
          <div className="flex items-baseline justify-between gap-6">
            <p className="eyebrow text-brown/70">{identity.discipline}</p>
            <p className="eyebrow text-right text-brown/55 md:hidden">{identity.location}</p>
          </div>
          <span className="mt-4 block h-px w-10 bg-terracotta" aria-hidden />

          <h1 className="hero-name mt-8 md:mt-12">
            <span className="display block text-[clamp(3.35rem,7vw,5.5rem)] text-ink">{identity.firstName}</span>
            <span className="display display-italic mt-[0.06em] block text-[clamp(2.85rem,6vw,4.65rem)] text-terracotta">
              {identity.lastName}
            </span>
          </h1>
        </motion.div>

        <figure
          className="mt-8 md:col-span-6 md:row-span-2 md:row-start-1 md:mt-0 md:min-h-[100svh]"
          aria-label={`${identity.fullName}, portrait`}
        >
          <div className="hero-plate flex h-full flex-col px-5 py-5 sm:px-8 md:px-8 md:pt-32 md:pb-8 lg:px-10">
            <p className="eyebrow mb-5 hidden text-right text-brown/55 md:block">{identity.location}</p>
            <div className="relative aspect-[4/5] w-full min-h-0 flex-1 overflow-hidden md:aspect-auto">
              <motion.div
                className="absolute inset-[-6%] h-[112%] w-[112%]"
                style={{ x: dx, y: stillY }}
                whileHover={calm ? undefined : { scale: 1.02 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <Portrait
                  src={portraits.hero}
                  available={hasPortrait}
                  alt={`${identity.fullName}, portrait`}
                  className="h-full w-full"
                />
              </motion.div>
            </div>
          </div>
        </figure>

        <motion.div
          className="pad flex flex-col justify-end pt-10 md:col-span-6 md:row-start-2 md:pt-0 md:pb-8"
          style={{ y: typeY }}
        >
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/10 pt-8">
            {facts.map((f) => (
              <div key={f.label} className="group">
                <dt className="eyebrow text-brown/65">{f.label}</dt>
                <dd className="mt-2.5 font-serif text-[1.35rem] leading-tight text-ink transition-colors duration-500 group-hover:text-terracotta md:text-[1.45rem]">
                  {f.value}
                </dd>
                {f.note && <dd className="mt-1 text-sm text-brown">{f.note}</dd>}
              </div>
            ))}
          </dl>

          <div className="mt-10 flex items-center gap-4 pb-12 md:mt-12 md:pb-2">
            <span className="eyebrow text-brown/55">Scroll</span>
            <motion.span
              className="block h-px w-16 origin-left bg-terracotta"
              animate={calm ? undefined : { scaleX: [0, 1, 1, 0], x: [0, 0, 0, 64] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 1] }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
