"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { toolbox } from "@/data/site";
import { EASE, useCalmMotion } from "@/lib/motion";
import { Lines, Reveal } from "../Reveal";
import { SectionMark } from "../SectionMark";

/**
 * Section 06. Five drawers. Open one and its tools are laid out on the table
 * like objects: slightly turned, unevenly spaced, ready to be picked up.
 */
export function Toolbox() {
  const [open, setOpen] = useState(0);
  const { touch } = useCalmMotion();
  const current = toolbox[open];

  return (
    <section className="relative bg-cream">
      <div className="px-5 pt-32 sm:px-8 md:px-12 md:pt-44">
        <SectionMark number="06" title="The toolbox" />
        <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
          <Lines
            as="h2"
            lines={["WHAT I", "REACH FOR."]}
            className="display text-[15vw] text-ink sm:text-[12vw] md:col-span-6 md:text-[8vw]"
            lineClassName={(i) => (i === 1 ? "display-italic text-brown" : "")}
          />
          <Reveal className="md:col-span-4 md:col-start-9" delay={0.2}>
            <p className="measure font-serif text-xl leading-relaxed text-brown">
              No percentages. A tool is either in the box because it has been useful, or it is not in the box.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-10 pb-32 md:grid-cols-12 md:pb-40">
          {/* Drawers */}
          <ul className="flex flex-col md:col-span-5" role="tablist" aria-label="Toolbox categories">
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
                    className="group flex w-full flex-col items-start gap-1 py-5 text-left sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    data-cursor="Open"
                  >
                    <span className={`display text-[11vw] transition-colors duration-500 sm:text-[7vw] md:text-[4vw] ${on ? "text-terracotta" : "text-ink/45 group-hover:text-ink"}`}>
                      {cat.name}
                    </span>
                    <span className={`eyebrow transition-colors duration-500 sm:shrink-0 sm:text-right ${on ? "text-ink" : "text-ink/40"}`}>{cat.hint}</span>
                  </button>
                  {/* Mobile: drawer contents inline below the label */}
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

          {/* Table */}
          <div className="relative hidden min-h-[440px] md:col-span-6 md:col-start-7 md:block" id={`drawer-${open}`} role="tabpanel">
            <div className="absolute inset-0 rounded-sm bg-sand/50" aria-hidden />
            <div className="absolute inset-x-8 top-8 flex items-baseline justify-between">
              <span className="eyebrow text-brown/70">{current.name}</span>
              <span className="font-serif text-sm italic text-brown/70">{current.items.length} things</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.ul
                key={current.name}
                className="absolute inset-x-8 bottom-8 top-24 flex flex-wrap content-start gap-x-4 gap-y-5"
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
