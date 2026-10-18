import Link from "next/link";
import { notebooks, projects, type Project } from "@/data/projects";
import { contact } from "@/data/site";
import { CardTilt } from "../CardTilt";
import { LiveWebsites } from "../LiveWebsites";
import { ProjectMedia } from "../ProjectMedia";
import { ProjectVisual } from "../ProjectVisual";

/** A whole-tile link; the visual tilts while text and hit area stay put. */
function Tile({ project }: { project: Project }) {
  const academic = project.collection === "Academic experiments";
  return (
    <article className={`bento-tile tile-${project.visual}`}>
      <CardTilt>
        <div className="project-visual-link">
          <ProjectVisual kind={project.visual} />
        </div>
      </CardTilt>
      <div className="bento-copy">
        <p className="eyebrow">
          <span>{project.number}</span> / {project.discipline}
        </p>
        <h3>
          <Link className="bento-link" href={`/work/${project.slug}`}>
            {project.shortTitle}
          </Link>
        </h3>
        <p className="bento-summary">{project.summary}</p>
        <ul className="project-tags">
          {academic && <li className="tag-accent">Academic</li>}
          {project.tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
      <span className="bento-arrow" aria-hidden="true">
        ↗
      </span>
    </article>
  );
}

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

      <div className="bento">
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
            <Link
              className="button button-dark"
              href={`/work/${featured.slug}`}
            >
              Read the case study <span aria-hidden="true">↗</span>
            </Link>
            <LiveWebsites />
          </div>
        </article>

        {rest.map((project) => (
          <Tile key={project.slug} project={project} />
        ))}

        {notebooks.map((notebook) => (
          <article className="bento-note" key={notebook.url}>
            <p className="eyebrow">Notebook</p>
            <h3>
              <a
                className="bento-link"
                href={notebook.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {notebook.title}
              </a>
            </h3>
            <p className="bento-summary">{notebook.description}</p>
            <ul className="project-tags">
              {notebook.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
            <span className="bento-arrow" aria-hidden="true">
              ↗
            </span>
          </article>
        ))}

        <a
          className="bento-github"
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="eyebrow">More on GitHub</span>
          <strong>
            Notebooks, experiments
            <br />
            and code.
          </strong>
          <span className="bento-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}
