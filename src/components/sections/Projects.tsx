"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import {
  courseworkProjects,
  featuredProjects,
  notebooks,
} from "@/data/projects";
import { contact } from "@/data/site";

const courseworkTags = ["PyTorch", "MNIST", "NumPy", "Matplotlib"];
import { useReducedMotion } from "@/lib/motion-preference";
import { CardTilt } from "../CardTilt";
import { LiveWebsites } from "../LiveWebsites";
import { ProjectMedia } from "../ProjectMedia";
import { ProjectVisual } from "../ProjectVisual";

/**
 * Project cards stick one after another; each card eases back as the next
 * slides over it. On small screens they are ordinary stacked cards.
 */
export function Projects() {
  const list = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = list.current;
    if (!element || reduced) return;
    const cards = [...element.querySelectorAll<HTMLElement>(".v-card")];
    let frame = 0;
    function update() {
      frame = 0;
      cards.forEach((card, index) => {
        const next = cards[index + 1];
        if (!next) return card.style.removeProperty("--t");
        const stick = parseFloat(getComputedStyle(next).top) || 0;
        const top = next.getBoundingClientRect().top;
        const t = 1 - (top - stick) / Math.max(innerHeight - stick, 1);
        card.style.setProperty("--t", Math.min(1, Math.max(0, t)).toFixed(3));
      });
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cards.forEach((card) => card.style.removeProperty("--t"));
    };
  }, [reduced]);

  return (
    <section id="projects" className="v-work" aria-labelledby="work-title">
      <div className="shell">
        <div className="v-section-head">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title">
            Things I&apos;ve <em>built.</em>
          </h2>
          <p className="v-section-lede">
            Products, models and machines, each built independently, from a
            school app in daily use to robotics and deep learning.
          </p>
        </div>

        <ol className="v-cards" ref={list}>
          {featuredProjects.map((project, index) => (
            <li
              key={project.slug}
              className="v-card"
              style={{ "--i": index } as CSSProperties}
            >
              <article className="v-card-inner">
                <div className="v-card-copy">
                  <div className="v-card-top">
                    <span className="v-card-number">{project.number}</span>
                    <span className="eyebrow">{project.discipline}</span>
                  </div>
                  <h3>
                    <Link href={`/work/${project.slug}`}>
                      {project.shortTitle}
                    </Link>
                  </h3>
                  <p className="v-card-summary">{project.summary}</p>
                  {project.resultLine?.trim() && (
                    <p className="v-card-result">
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
                  <div className="v-card-actions">
                    <Link
                      className="pill pill-dark"
                      href={`/work/${project.slug}`}
                    >
                      {project.visual === "school"
                        ? "Read the case study"
                        : "Explore the project"}{" "}
                      <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                  {project.visual === "school" && <LiveWebsites />}
                </div>
                <div className="v-card-visual">
                  <CardTilt>
                    <div className="project-visual-link">
                      <ProjectVisual kind={project.visual} />
                    </div>
                  </CardTilt>
                </div>
              </article>
            </li>
          ))}
          <li
            className="v-card v-card-coursework"
            style={{ "--i": featuredProjects.length } as CSSProperties}
          >
            <article className="v-card-inner">
              <div className="v-card-copy">
                <div className="v-card-top">
                  <span className="v-card-number">
                    {String(featuredProjects.length + 1).padStart(2, "0")}
                  </span>
                  <span className="eyebrow">Coursework · Deep learning</span>
                </div>
                <h3>Coursework.</h3>
                <p className="v-card-summary">
                  MNIST classifiers and public notebooks from my MSc. Open any
                  of them to read and run the code.
                </p>
                <ul className="project-tags">
                  <li className="tag-accent">Academic</li>
                  {courseworkTags.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
                <div className="v-card-actions">
                  <a
                    className="pill pill-dark"
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Browse my GitHub <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
              <ul className="v-notebooks" aria-label="Coursework and notebooks">
                {courseworkProjects.map((project) => (
                  <li key={project.slug}>
                    <Link href={`/work/${project.slug}`}>
                      <strong>{project.shortTitle}</strong>
                      <span>{project.tools.join(" · ")}</span>
                      <i aria-hidden="true">↗</i>
                    </Link>
                  </li>
                ))}
                {notebooks.map((notebook) => (
                  <li key={notebook.url}>
                    <a
                      href={notebook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong>{notebook.title}</strong>
                      <span>{notebook.tools.join(" · ")} · GitHub</span>
                      <i aria-hidden="true">↗</i>
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        </ol>
      </div>
    </section>
  );
}
