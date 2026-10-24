"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { company, identity, positioning, school } from "@/data/site";
import { useReducedMotion } from "@/lib/motion-preference";

const facts = [
  { label: "What", value: "AI engineer & builder" },
  { label: "Now", value: `${company.name} · ${school.name}` },
  { label: "Where", value: identity.location },
];

/** Phrases the accent cycles through; the first is the one read aloud. */
const accents = [
  positioning.intro.accent,
  "useful products.",
  "learning machines.",
];

/**
 * The introduction, shaped like Evaradh's: a headline whose words rise in, a
 * rotating accent, a paragraph and a facts row that draws in on scroll.
 */
export function Statement() {
  const host = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [index, setIndex] = useState(0);
  const words = positioning.intro.lead.split(" ");

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduced) return;
    const timer = window.setInterval(
      () => setIndex((value) => (value + 1) % accents.length),
      2800,
    );
    return () => window.clearInterval(timer);
  }, [inView, reduced]);

  return (
    <section
      ref={host}
      className="v-statement"
      aria-labelledby="intro-title"
      data-in={inView || reduced ? "" : undefined}
    >
      <span className="v-statement-star" aria-hidden="true">
        ✳
      </span>
      <div className="shell">
        <p className="eyebrow v-rise">Hello</p>
        <h2 id="intro-title" className="v-statement-title">
          <span className="sr-only">
            {positioning.intro.lead} {positioning.intro.accent}
          </span>
          <span aria-hidden="true">
            {words.map((word, i) => (
              <Fragment key={i}>
                <span className="v-word-mask">
                  <span
                    className="v-word"
                    style={{ "--d": i } as CSSProperties}
                  >
                    {word}
                  </span>
                </span>{" "}
              </Fragment>
            ))}
            <span className="v-accent-slot">
              {accents.map((phrase, i) => (
                <em
                  key={phrase}
                  className="v-accent"
                  data-active={i === index || undefined}
                >
                  {phrase}
                </em>
              ))}
            </span>
          </span>
        </h2>
        <p
          className="v-statement-body v-rise"
          style={{ "--d": 6 } as CSSProperties}
        >
          {positioning.supporting}
        </p>
        <dl className="v-statement-facts">
          {facts.map((fact, i) => (
            <div
              key={fact.label}
              className="v-rise"
              style={{ "--d": 8 + i } as CSSProperties}
            >
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
