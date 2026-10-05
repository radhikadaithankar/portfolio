import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Nav } from "@/components/Nav";
import { ProjectVisual } from "@/components/ProjectVisual";
import { LiveWebsites } from "@/components/LiveWebsites";
import { ProjectMedia } from "@/components/ProjectMedia";
import { SchoolCaseStudy } from "@/components/SchoolCaseStudy";
import { Contact } from "@/components/sections/Contact";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, projectStructuredData, socialImage } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.shortTitle} | Radhika Daithankar`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.shortTitle} | Radhika Daithankar`,
      description: project.summary,
      url: absoluteUrl(`/work/${project.slug}`),
      siteName: "Radhika Daithankar",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.shortTitle} | Radhika Daithankar`,
      description: project.summary,
      images: [socialImage.url],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const metadata = [project.year, project.context].filter((value) =>
    value?.trim(),
  );

  return (
    <>
      <StructuredData data={projectStructuredData(project)} />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <Nav subpage />
      <main id="main" tabIndex={-1}>
        <article className="case-study shell">
          <Link href="/#projects" className="back-link">
            ← All work
          </Link>
          <header className="case-header">
            <p className="eyebrow">
              {project.number} / {project.discipline}
            </p>
            <h1>{project.title}</h1>
            <p>{project.caseStudy?.oneLiner?.trim() || project.summary}</p>
          </header>
          {project.visual === "school" && <LiveWebsites />}
          {!project.caseStudy && (
            <figure className="case-visual">
              <ProjectVisual kind={project.visual} />
              <figcaption>
                {project.visual === "school"
                  ? "Public CIS Compass app previews from Evaradh, showing illustrative data."
                  : "Explanatory illustration of the project’s approach."}
              </figcaption>
            </figure>
          )}
          <div className="case-body">
            <aside className="case-meta">
              {metadata.length > 0 && (
                <p className="case-context">{metadata.join(" · ")}</p>
              )}
              {project.resultLine?.trim() && (
                <p className="case-contribution">{project.resultLine}</p>
              )}
              <h2>My contribution</h2>
              <p className="case-contribution">{project.contribution}</p>
              <h2>
                {project.category === "Product" ? "Focus" : "Tools & concepts"}
              </h2>
              <ul className="project-tags">
                {project.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
              {project.repository && (
                <a
                  className="text-link case-source"
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View code on GitHub <span aria-hidden="true">↗</span>
                </a>
              )}
            </aside>
            <div className="case-story">
              {project.caseStudy ? (
                <SchoolCaseStudy project={project} />
              ) : (
                <>
                  <section>
                    <p className="eyebrow">The question</p>
                    <h2>{project.question}</h2>
                  </section>
                  <section>
                    <h2>The approach</h2>
                    <p>{project.approach}</p>
                  </section>
                  <section>
                    <h2>Project scope</h2>
                    <ul className="case-scope">
                      {project.scope.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h2>How it works</h2>
                    {project.details.map((detail) => (
                      <div key={detail.title}>
                        <h3>{detail.title}</h3>
                        <p>{detail.text}</p>
                      </div>
                    ))}
                  </section>
                  <section className="case-delivery">
                    <p className="eyebrow">The build</p>
                    <h2>{project.delivery.title}</h2>
                    <p>{project.delivery.text}</p>
                    {project.repository && (
                      <a
                        className="text-link"
                        href={project.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Explore the implementation{" "}
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </section>
                </>
              )}
              {!project.caseStudy && <ProjectMedia media={project.media} />}
            </div>
          </div>
          {project.caseStudy && (
            <section
              className="case-story case-media"
              aria-labelledby="case-media-title"
            >
              <h2 id="case-media-title">Media</h2>
              <figure className="case-visual">
                <ProjectVisual kind={project.visual} />
                <figcaption>
                  Public CIS Compass app previews from Evaradh, showing
                  illustrative data.
                </figcaption>
              </figure>
              <ProjectMedia media={project.media} />
            </section>
          )}
          <Link className="case-next" href={`/work/${next.slug}`}>
            <div>
              <p className="eyebrow">Next project / {next.number}</p>
              <h2>{next.shortTitle}</h2>
            </div>
            <span aria-hidden="true">↗</span>
          </Link>
        </article>
        <Contact />
      </main>
    </>
  );
}
