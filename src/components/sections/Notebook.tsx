"use client";

import { motion } from "framer-motion";
import { notebook } from "@/data/site";
import { EASE } from "@/lib/motion";
import { Lines, Reveal } from "../Reveal";
import { SectionMark } from "../SectionMark";

/** Section 03. A notebook spread: large words, small margin notes, a few marks. */
export function Notebook() {
  return (
    <section id="think" className="relative bg-ivory">
      <div className="px-5 pt-32 sm:px-8 md:px-12 md:pt-44">
        <SectionMark number="03" title="The notebook" />
        <div className="mt-10 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Lines
              as="h2"
              lines={["THINGS I'M", "THINKING", "ABOUT."]}
              className="display text-[15vw] text-ink sm:text-[12vw] md:text-[6.4vw]"
              lineClassName={(i) => (i === 1 ? "display-italic text-brown" : "")}
            />
            <Reveal className="mt-10 max-w-sm" delay={0.2}>
              <p className="font-serif text-lg italic leading-relaxed text-brown">
                Not a list of interests. More like the pages that keep getting returned to, with the same questions written
                slightly differently each time.
              </p>
            </Reveal>
          </div>

          <div className="relative md:col-span-6 md:col-start-7">
            <span className="absolute -left-6 top-0 hidden h-full w-px bg-rose/40 md:block" aria-hidden />
            <ol className="flex flex-col">
              {notebook.themes.map((t, i) => (
                <Entry key={t.word} index={i} word={t.word} note={t.note} />
              ))}
            </ol>
          </div>
        </div>

        <Reveal className="mt-24 grid gap-6 border-t border-ink/10 pb-32 pt-10 md:grid-cols-12 md:pb-40">
          <p className="eyebrow text-brown/70 md:col-span-3">In the margin</p>
          <p className="display display-italic text-[8vw] leading-[1.05] text-ink md:col-span-8 md:col-start-5 md:text-[3.4vw]">
            {notebook.statement}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Entry({ index, word, note }: { index: number; word: string; note: string }) {
  return (
    <motion.li
      className="group relative border-t border-ink/10 py-6 md:py-7"
      initial={{ opacity: 0, x: 12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.05 }}
    >
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-terracotta/60 font-serif text-[0.7rem] italic text-terracotta">
          {index + 1}
        </span>
        <motion.span
          className="display relative text-[10vw] text-ink transition-colors duration-500 group-hover:text-terracotta sm:text-[6vw] md:text-[3.2vw]"
          whileHover={{ x: 10 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {word}
          <svg className="absolute -bottom-1 left-0 h-2 w-full text-rose/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" viewBox="0 0 200 8" preserveAspectRatio="none" aria-hidden>
            <path d="M0 5 Q 25 0 50 5 T 100 5 T 150 5 T 200 5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </motion.span>
        <span className="ml-auto hidden font-serif text-sm italic text-brown/70 md:block">p. {index + 12}</span>
      </div>
      <p className="mt-2 max-w-md pl-12 font-serif text-base italic leading-relaxed text-brown">{note}</p>
    </motion.li>
  );
}
