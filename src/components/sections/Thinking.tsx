"use client";

import { principles } from "@/data/site";
import { SectionMark } from "../SectionMark";
import { StatementSequence } from "../StatementSequence";

/** Section 10. Five sentences she would actually say. */
export function Thinking() {
  return (
    <section id="principles" className="relative bg-ivory">
      <div className="px-5 pt-28 sm:px-8 md:px-12 md:pt-36">
        <SectionMark number="10" title="How I think" />
      </div>
      <StatementSequence statements={principles} perStatement={85} size="text-[11.5vw] sm:text-[9vw] md:text-[6.2vw]" />
    </section>
  );
}
