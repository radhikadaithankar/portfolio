"use client";

import { shift } from "@/data/site";
import { StatementSequence } from "../StatementSequence";
import { SectionMark } from "../SectionMark";

/** Section 07. The page goes quiet. Three sentences, one at a time. */
export function Shift() {
  return (
    <section className="relative bg-chocolate text-ivory">
      <div className="grain pointer-events-none absolute inset-0 overflow-hidden opacity-70" aria-hidden />
      <div className="relative px-5 pt-28 sm:px-8 md:px-12 md:pt-36">
        <SectionMark number="07" title="The shift" tone="light" />
      </div>
      <StatementSequence statements={shift} tone="light" perStatement={80} className="relative" size="text-[12vw] sm:text-[9.5vw] md:text-[6.6vw]" />
    </section>
  );
}
