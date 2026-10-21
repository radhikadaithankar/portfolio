import Link from "next/link";
import { notebooks, projects } from "@/data/projects";
import { contact } from "@/data/site";
import { CardTilt } from "../CardTilt";
import { LiveWebsites } from "../LiveWebsites";
import { ProjectMedia } from "../ProjectMedia";
import { ProjectVisual } from "../ProjectVisual";
import { ProjectIndex } from "../ProjectIndex";

export function Projects() {
  const [featured, ...rest] = projects;
  return (
    <section id="projects" className="work-section shell">
      <div className="section-topline">
        <span className="eyebrow">01 / Selected work</span>
        <span className="eyebrow muted">
          {projects.length} projects · {notebooks.length} notebooks
        </span>
      </div>
      <div className="work-heading">
        <h2>
          A little thinking.
          <br />
          <em>A lot of making.</em>
        </h2>
        <p>
          Products, models and machines. Each project built independently by me.
        </p>
      </div>

      <article className="bento-feature featured-project">
        <CardTilt>
          <div className="project-visual-link">
            <ProjectVisual kind={featured.visual} />
          </div>
        </CardTilt>
        <div className="bento-feature-copy">
          <p className="eyebrow">
            <span>{featured.number}</span> / {featured.discipline}
          </p>
          {featured.context && (
            <p className="project-metadata">{featured.context}</p>
          )}
          <h3>
            <Link href={`/work/${featured.slug}`}>{featured.title}</Link>
          </h3>
          <p className="bento-summary">{featured.summary}</p>
          {featured.resultLine?.trim() && (
            <p className="project-result">
              <span className="status-dot" aria-hidden="true" />
              {featured.resultLine}
            </p>
          )}
          <ProjectMedia media={featured.media} />
          <ul className="project-tags">
            {featured.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
          <Link className="button button-dark" href={`/work/${featured.slug}`}>
            Read the case study <span aria-hidden="true">↗</span>
          </Link>
          <LiveWebsites />
        </div>
      </article>

      <h3 className="index-heading eyebrow">All work</h3>
      <ProjectIndex projects={rest} notebooks={notebooks} />
      <a
        className="index-github"
        href={contact.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        More notebooks and code on GitHub <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
