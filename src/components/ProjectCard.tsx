import Link from "next/link";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";
import { ProjectMedia } from "./ProjectMedia";
import { CardTilt } from "./CardTilt";
import { LiveWebsites } from "./LiveWebsites";

export function ProjectCard({ project }: { project: Project }) {
  const metadata = [project.year, project.context].filter((value) =>
    value?.trim(),
  );
  return (
    <article
      className={`project-card ${project.visual === "school" ? "featured-project" : ""}`}
    >
      <CardTilt>
        <div className="project-visual-link">
          <ProjectVisual kind={project.visual} />
          <span className="project-open" aria-hidden="true">
            ↗
          </span>
          <Link
            className="project-visual-target"
            href={`/work/${project.slug}`}
            aria-label={`View project: ${project.shortTitle}`}
          />
        </div>
      </CardTilt>
      <div className="project-copy">
        <p className="eyebrow">
          <span>{project.number}</span> / {project.discipline}
        </p>
        {metadata.length > 0 && (
          <p className="project-metadata">{metadata.join(" · ")}</p>
        )}
        <h3>
          <Link href={`/work/${project.slug}`}>
            {project.visual === "school" ? project.title : project.shortTitle}
          </Link>
        </h3>
        <p className="project-summary">{project.summary}</p>
        {project.resultLine?.trim() && (
          <p className="project-result">{project.resultLine}</p>
        )}
        <ProjectMedia media={project.media} />
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
  );
}
