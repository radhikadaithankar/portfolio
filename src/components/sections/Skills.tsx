"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { toolbox } from "@/data/site";
import { EASE, useCalmMotion } from "@/lib/motion";
import { Lines } from "../Reveal";
import { SectionMark } from "../SectionMark";

export function Skills() {
  const [open, setOpen] = useState(0);
  const { touch } = useCalmMotion();
  const current = toolbox[open];

  return (
    <section id="skills" className="relative bg-cream">
      <div className="px-5 pt-28 sm:px-8 md:px-12 md:pt-36">
        <SectionMark number="03" title="Skills" />
        <Lines as="h2" lines={["SKILLS."]} className="display mt-8 text-[16vw] text-ink sm:text-[12vw] md:text-[8vw]" />

        <div className="mt-16 grid gap-10 pb-28 md:grid-cols-12 md:pb-36">
          <ul className="flex flex-col md:col-span-5" role="tablist" aria-label="Skill categories">
            {toolbox.map((cat, i) => {
              const on = i === open;
              return (
                <li key={cat.name} className="border-t border-ink/10 last:border-b">
                  <button
                    role="tab"
                    aria-selected={on}
                    aria-controls={`drawer-${i}`}
                    onClick={() => setOpen(i)}
                    onMouseEnter={() => !touch && setOpen(i)}
                    className="group flex w-full items-baseline justify-between gap-6 py-5 text-left"
                    data-cursor="Open"
                  >
                    <span className={`display text-[10vw] transition-colors duration-500 sm:text-[6vw] md:text-[3.2vw] ${on ? "text-terracotta" : "text-ink/45 group-hover:text-ink"}`}>
                      {cat.name}
                    </span>
                    <span className={`eyebrow ${on ? "text-ink" : "text-ink/40"}`}>{cat.items.length}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.ul
                        className="flex flex-wrap gap-3 overflow-hidden pb-6 md:hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                      >
                        {cat.items.map((item) => (
                          <li key={item} className="rounded-full border border-ink/15 bg-ivory px-4 py-2 font-serif text-base text-ink">
                            {item}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <div className="relative hidden min-h-[400px] md:col-span-6 md:col-start-7 md:block" id={`drawer-${open}`} role="tabpanel">
            <div className="absolute inset-0 rounded-sm bg-sand/50" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.ul
                key={current.name}
                className="absolute inset-8 flex flex-wrap content-start gap-x-4 gap-y-5"
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                {current.items.map((item, i) => (
                  <Tool key={item} label={item} index={i} />
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

const TILTS = [-2.5, 1.5, -1, 2.5, -1.5, 1, -2, 2];

function Tool({ label, index }: { label: string; index: number }) {
  const tilt = TILTS[index % TILTS.length];
  return (
    <motion.li
      className="select-none"
      variants={{
        hidden: { opacity: 0, y: 24, rotate: tilt * 3 },
        show: { opacity: 1, y: 0, rotate: tilt, transition: { duration: 0.7, ease: EASE, delay: index * 0.06 } },
      }}
      whileHover={{ rotate: 0, y: -6, scale: 1.04 }}
      style={{ marginTop: (index % 3) * 8 }}
    >
      <span className="block border border-ink/15 bg-ivory px-6 py-4 font-serif text-2xl text-ink shadow-[0_12px_30px_-20px_rgba(58,42,36,0.6)]">
        {label}
      </span>
    </motion.li>
  );
}
