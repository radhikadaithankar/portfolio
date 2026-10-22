"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { notebooks, projects } from "@/data/projects";
import { contact } from "@/data/site";
import { prefersReducedMotion } from "@/lib/motion-preference";
import { CardTilt } from "../CardTilt";
import { LiveWebsites } from "../LiveWebsites";
import { ProjectMedia } from "../ProjectMedia";
import { ProjectVisual } from "../ProjectVisual";

/** One background tone per step; the last step is the notebooks panel. */
const tones = ["mocha", "latte", "mocha", "burgundy", "latte", "mocha"];
const steps = projects.length + 1;

type Layout = { top: number; stage: number; step: number } | null;

export function Projects() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [layout, setLayout] = useState<Layout>(null);

  // Pin the stage and advance one project per scroll step on tall, wide
  // screens. Everywhere else the projects stack as ordinary sections.
  useEffect(() => {
    const trackElement = track.current;
    const stageElement = stage.current;
    if (!trackElement || !stageElement) return;
    const wide = window.matchMedia("(min-width: 1051px)");
    let frame = 0;
    let current: Layout = null;

    function sync() {
      frame = 0;
      if (!current) return;
      const scrolled = current.top - trackElement!.getBoundingClientRect().top;
      const position = Math.min(
        steps - 1,
        Math.max(0, scrolled / current.step),
      );
      stageElement!.style.setProperty("--f", position.toFixed(3));
      setActive(Math.round(position));
    }
    function measure() {
      const header = document.querySelector<HTMLElement>(".site-header");
      const top = header?.offsetHeight ?? 0;
      current =
        wide.matches && innerHeight >= 700
          ? {
              top,
              stage: innerHeight - top,
              step: Math.min(Math.max(innerHeight * 0.75, 440), 680),
            }
          : null;
      setLayout(current);
      if (!current) stageElement!.style.removeProperty("--f");
      sync();
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
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setActive(index);
      const trackElement = track.current;
      if (!layout || !trackElement) return;
      const start =
        trackElement.getBoundingClientRect().top + scrollY - layout.top;
      window.scrollTo({
        top: start + index * layout.step,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    },
    [layout],
  );

  return (
    <section id="projects" className="work-scene" aria-label="Selected work">
      <div
        ref={track}
        className="work-track"
        data-scrolly={layout ? "true" : undefined}
        style={
          layout
            ? ({
                "--track-height": `${layout.stage + (steps - 1) * layout.step}px`,
                "--stage-top": `${layout.top}px`,
                "--stage-height": `${layout.stage}px`,
              } as CSSProperties)
            : undefined
        }
      >
        <div
          ref={stage}
          className="work-stage"
          data-tone={tones[active] ?? "latte"}
        >
          <div className="shell work-shell">
            <div className="work-head">
              <p className="eyebrow">01 / Selected work</p>
              <p className="eyebrow work-count">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(steps).padStart(2, "0")}
              </p>
            </div>

            <div className="work-panels">
              {projects.map((project, index) => (
                <article
                  key={project.slug}
                  className="work-panel"
                  data-active={index === active || undefined}
                  style={{ "--idx": index } as CSSProperties}
                >
                  <span className="work-numeral" aria-hidden="true">
                    {project.number}
                  </span>
                  <div className="work-copy">
                    <p className="eyebrow">
                      {project.number} / {project.discipline}
                    </p>
                    {project.context && (
                      <p className="work-context">{project.context}</p>
                    )}
                    <h2>
                      <Link href={`/work/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h2>
                    <p className="work-summary">{project.summary}</p>
                    {project.resultLine?.trim() && (
                      <p className="work-result">
                        <span className="status-dot" aria-hidden="true" />
                        {project.resultLine}
                      </p>
                    )}
                    <ProjectMedia media={project.media} />
                    <ul className="project-tags">
                      {project.collection === "Academic experiments" && (
                        <li className="tag-accent">Academic</li>
                      )}
                      {project.tools.map((tool) => (
                        <li key={tool}>{tool}</li>
                      ))}
                    </ul>
                    <Link
                      className="button button-dark"
                      href={`/work/${project.slug}`}
                    >
                      {project.visual === "school"
                        ? "Read the case study"
                        : "Explore the project"}{" "}
                      <span aria-hidden="true">↗</span>
                    </Link>
                    {project.visual === "school" && <LiveWebsites />}
                  </div>
                  <div className="work-visual">
                    <div className="frame">
                      <div className="frame-bar" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                        <span>~/work/{project.slug}</span>
                      </div>
                      <CardTilt>
                        <div className="project-visual-link">
                          <ProjectVisual kind={project.visual} />
                        </div>
                      </CardTilt>
                    </div>
                    {project.tools.slice(0, 3).map((tool, chip) => (
                      <span
                        key={tool}
                        className={`frame-chip chip-${chip + 1}`}
                        aria-hidden="true"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </article>
              ))}

              <article
                className="work-panel work-notes"
                data-active={active === steps - 1 || undefined}
                style={{ "--idx": steps - 1 } as CSSProperties}
              >
                <span className="work-numeral" aria-hidden="true">
                  +
                </span>
                <div className="work-copy">
                  <p className="eyebrow">Notebooks / Academic work</p>
                  <h2>
                    More to <em>explore.</em>
                  </h2>
                  <p className="work-summary">
                    Academic experiments in the methods behind the models. Open
                    the notebooks to explore the code.
                  </p>
                  <a
                    className="button button-dark"
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Browse my GitHub <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <ul className="work-notebooks">
                  {notebooks.map((notebook, index) => (
                    <li key={notebook.url}>
                      <a
                        href={notebook.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="eyebrow">N{index + 1}</span>
                        <strong>{notebook.title}</strong>
                        <span>{notebook.tools.join(" · ")}</span>
                        <i aria-hidden="true">↗</i>
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <div
              className="work-rail"
              role="group"
              aria-label="Choose a project"
            >
              {Array.from({ length: steps }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-pressed={index === active}
                  aria-label={
                    index < projects.length
                      ? `Project ${index + 1}: ${projects[index].shortTitle}`
                      : "Notebooks"
                  }
                  onClick={() => goTo(index)}
                >
                  <span aria-hidden="true">
                    {index < projects.length ? projects[index].number : "+"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
