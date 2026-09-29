"use client";

import Link from "next/link";
import { useState } from "react";
import { notebooks, projects } from "@/data/projects";
import { contact } from "@/data/site";
import { ProjectVisual } from "../ProjectVisual";
import { LiveWebsites } from "../LiveWebsites";

const filters = ["All work", "Product", "AI & ML", "Robotics"] as const;

export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All work");
  const visible =
    filter === "All work"
      ? projects
      : projects.filter((project) => project.category === filter);
  return (
    <section id="projects" className="work-section shell">
      <div className="section-topline">
        <span className="eyebrow">01 / Selected work</span>
        <span className="eyebrow muted">An idea is a good place to start.</span>
      </div>
      <div className="work-heading">
        <h2>
          A little thinking.
          <br />
          <em>A lot of making.</em>
        </h2>
        <p>
          Products, models and machines.
          <br />
          Each project built independently by me.
        </p>
      </div>
      <div className="work-toolbar">
        <div
          className="project-filters"
          role="group"
          aria-label="Filter projects"
        >
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
              className={filter === item ? "filter active" : "filter"}
            >
              {item}
              {item === "All work" && (
                <span aria-hidden="true">
                  {String(projects.length).padStart(2, "0")}
                </span>
              )}
            </button>
          ))}
        </div>
        <span className="project-count" role="status">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </span>
      </div>
      <div className="project-grid">
        {visible.map((project) => (
          <article
            className={`project-card ${project.visual === "school" ? "featured-project" : ""}`}
            key={project.slug}
          >
            <Link
              className="project-visual-link"
              href={`/work/${project.slug}`}
              aria-label={`View project: ${project.shortTitle}`}
            >
              <ProjectVisual kind={project.visual} />
              <span className="project-open" aria-hidden="true">
                ↗
              </span>
            </Link>
            <div className="project-copy">
              <p className="eyebrow">
                <span>{project.number}</span> / {project.discipline}
              </p>
              <h3>
                <Link href={`/work/${project.slug}`}>
                  {project.visual === "school"
                    ? project.title
                    : project.shortTitle}
                </Link>
              </h3>
              <p className="project-summary">{project.summary}</p>
              <details className="project-scope">
                <summary>
                  What I built <span aria-hidden="true">+</span>
                </summary>
                <ul>
                  {project.scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>
              <ul className="project-tags">
                {project.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
              <Link className="text-link" href={`/work/${project.slug}`}>
                Explore the project <span aria-hidden="true">↗</span>
              </Link>
              {project.visual === "school" && <LiveWebsites />}
            </div>
          </article>
        ))}
      </div>
      <section className="notebook-section" aria-labelledby="notebook-heading">
        <div className="notebook-heading">
          <div>
            <p className="eyebrow">Code & experiments</p>
            <h3 id="notebook-heading">
              From my <em>notebooks.</em>
            </h3>
          </div>
          <a
            className="text-link"
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            Browse my GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
        <p className="notebook-intro">
          Academic experiments in the methods behind the models. Open the
          notebooks to explore the code.
        </p>
        <div className="notebook-grid">
          {notebooks.map((notebook) => (
            <article className="notebook-card" key={notebook.url}>
              <h4>{notebook.title}</h4>
              <p>{notebook.description}</p>
              <ul className="project-tags">
                {notebook.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
              <a
                className="text-link"
                href={notebook.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the notebook <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
