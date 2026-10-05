"use client";

import { useState } from "react";
import { notebooks, projects } from "@/data/projects";
import { contact } from "@/data/site";
import { ProjectCard } from "../ProjectCard";

const filters = ["All work", "Product", "AI & ML", "Robotics"] as const;

export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All work");
  const visible =
    filter === "All work"
      ? projects
      : projects.filter((project) => project.category === filter);
  const featured = visible.filter(
    (project) => project.collection === "Featured",
  );
  const academic = visible.filter(
    (project) => project.collection === "Academic experiments",
  );
  const visibleNotebooks =
    filter === "All work" || filter === "AI & ML" ? notebooks : [];
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
          {visibleNotebooks.length > 0 &&
            ` · ${visibleNotebooks.length} notebooks`}
        </span>
      </div>
      <div className="work-collections">
        {featured.length > 0 && (
          <section
            className="work-collection"
            aria-labelledby="featured-heading"
          >
            <h3 id="featured-heading" className="eyebrow collection-heading">
              Featured
            </h3>
            <div className="project-grid">
              {featured.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        )}
        {(academic.length > 0 || visibleNotebooks.length > 0) && (
          <section
            className="notebook-section"
            aria-labelledby="academic-heading"
          >
            <div className="notebook-heading">
              <h3 id="academic-heading">
                Academic <em>experiments.</em>
              </h3>
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
            {academic.length > 0 && (
              <div className="project-grid">
                {academic.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            )}
            {visibleNotebooks.length > 0 && (
              <div className="notebook-grid">
                {visibleNotebooks.map((notebook) => (
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
            )}
          </section>
        )}
      </div>
    </section>
  );
}
