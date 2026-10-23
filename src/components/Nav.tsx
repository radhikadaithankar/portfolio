import { featuredProjects } from "@/data/projects";
import { identity } from "@/data/site";

/** Featured project cards plus the single Coursework card. */
const workCards = featuredProjects.length + 1;

export function Nav({ subpage = false }: { subpage?: boolean }) {
  const root = subpage ? "/" : "";
  return (
    <header className="site-header">
      <a className="brand" href={subpage ? "/" : "#top"}>
        <span className="brand-full">{identity.fullName}</span>
        <span className="brand-short" aria-hidden="true">
          RD
        </span>
        <span className="brand-star" aria-hidden="true">
          ✳
        </span>
      </a>
      <nav aria-label="Primary" className="main-nav">
        <a href={`${root}#projects`} title="View my work">
          Work
          <span className="nav-count">
            {String(workCards).padStart(2, "0")}
          </span>
        </a>
        <a href={`${root}#experience`}>Experience</a>
        <a href={`${root}#about`}>My story</a>
        <a
          href="https://cv.radhikakd.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="CV (opens in a new tab)"
        >
          CV
        </a>
        <a className="nav-contact" href={`${root}#contact`}>
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
