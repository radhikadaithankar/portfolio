"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { roles } from "@/data/site";
import { useReducedMotion } from "@/lib/motion-preference";

/**
 * On wide screens the timeline pins and slides sideways as the page scrolls
 * down. Narrow screens, and reduced motion, get a vertical list.
 */
export function Experience() {
  const track = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const trackElement = track.current;
    const railElement = rail.current;
    if (!trackElement || !railElement) return;
    const wide = window.matchMedia("(min-width: 1051px)");
    let frame = 0;
    let travel = 0;
    function measure() {
      // Lay the rail out in a row before measuring how far it must travel.
      if (wide.matches && !reduced) trackElement!.dataset.sideways = "true";
      else delete trackElement!.dataset.sideways;
      travel =
        wide.matches && !reduced
          ? Math.max(0, railElement!.scrollWidth - railElement!.clientWidth)
          : 0;
      if (!travel) delete trackElement!.dataset.sideways;
      setDistance(travel);
      sync();
    }
    function sync() {
      frame = 0;
      if (!travel) return railElement!.style.removeProperty("--x");
      const box = trackElement!.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -box.top / travel));
      railElement!.style.setProperty("--x", `${(-p * travel).toFixed(1)}px`);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(sync);
    }
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    wide.addEventListener("change", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      wide.removeEventListener("change", measure);
    };
  }, [reduced]);

  return (
    <section
      id="experience"
      className="v-experience"
      aria-labelledby="experience-heading"
    >
      <div
        ref={track}
        className="v-exp-track"
        data-sideways={distance ? "true" : undefined}
        style={
          distance
            ? ({ "--travel": `${distance}px` } as CSSProperties)
            : undefined
        }
      >
        <div className="v-exp-stage">
          <div className="shell v-exp-head">
            <div>
              <p className="eyebrow">Experience</p>
              <h2 id="experience-heading">
                Where I&apos;ve <em>worked.</em>
              </h2>
            </div>
            <p className="v-section-lede">
              Building software, working with data and bringing products into
              everyday use.
            </p>
          </div>
          <ol className="v-exp-rail" ref={rail}>
            {roles.map((role) => (
              <li
                key={`${role.company}-${role.title}`}
                id={role.id}
                className={`v-role${role.current ? " v-role-current" : ""}`}
              >
                <div className="v-role-top">
                  <span>{role.period}</span>
                  {role.current && (
                    <span className="v-role-badge">
                      <span className="status-dot" aria-hidden="true" />
                      Now
                    </span>
                  )}
                </div>
                <h3>{role.title}</h3>
                <p className="v-role-company">
                  {role.company}
                  {role.location && <span> · {role.location}</span>}
                </p>
                <p className="v-role-text">{role.contribution}</p>
                <ul className="v-role-points">
                  {role.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                {role.impact?.trim() && (
                  <p className="experience-impact">{role.impact}</p>
                )}
                <ul className="v-chips" aria-label="Areas of work">
                  {role.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                {role.current && (
                  <Link className="v-role-link" href="/work/school-platform">
                    Explore the school platform{" "}
                    <span aria-hidden="true">↗</span>
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
