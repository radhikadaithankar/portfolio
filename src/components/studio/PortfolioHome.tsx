import Link from "next/link";
import { company, contact, identity } from "@/data/site";
import { projects } from "@/data/projects";
import { Arrow } from "../Arrow";
import { PortfolioMotion } from "../PortfolioMotion";
import { ProjectVisual } from "../ProjectVisual";
import { CompassPreview } from "./CompassPreview";
import styles from "./studio.module.css";

export function PortfolioHome() {
  return (
    <div className={styles.page} id="top">
      <PortfolioMotion />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={styles.header}>
        <a
          href="#top"
          className={styles.wordmark}
          aria-label="Radhika Daithankar, home"
        >
          <span>Radhika Daithankar</span>
          <small>AI engineering & product development</small>
        </a>
        <nav aria-label="Primary">
          <a href="#projects">Work</a>
          <a href="#about">About</a>
          <a href={`mailto:${contact.email}`}>
            Let&apos;s talk <Arrow diagonal />
          </a>
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        <section
          id="projects"
          className={styles.featured}
          aria-label="Featured project"
        >
          <CompassPreview />
          <div className={styles.projectStory} data-reveal>
            <div>
              <p className={styles.overline}>The problem</p>
              <h2>
                A school day spread <br />
                across different systems.
              </h2>
              <p>
                Attendance, homework, fees and parent communication lived across
                messages, notebooks and office records.
              </p>
            </div>
            <div>
              <p className={styles.overline}>What I built</p>
              <h2>
                One platform. <br />A view for each role.
              </h2>
              <p>
                I built the school&apos;s website and CIS Compass, with separate
                experiences for teachers, parents and school staff.
              </p>
            </div>
            <div>
              <p className={styles.overline}>Where it is now</p>
              <h2>
                Evaradh&apos;s first product. <br />
                In use at Chintamani.
              </h2>
              <p>
                CIS Compass is in use at Chintamani International School,
                Parbhani. Published app previews are available on Evaradh.
              </p>
              <a
                href={`${company.url}#work`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the product <Arrow diagonal />
              </a>
            </div>
          </div>
        </section>
        <section id="experiments" className={styles.experiments}>
          <div className={styles.galleryHeading}>
            <div>
              <p className={styles.overline}>More selected work</p>
              <h2>
                Exploring what <br />
                code can do.
              </h2>
            </div>
            <p>
              Studies in machine learning and robotics. <br />
              Each starts with a question and a working implementation.
            </p>
          </div>
          <div className={styles.gallery}>
            {projects.slice(1).map((project) => (
              <article
                key={project.slug}
                className={styles.projectCard}
                data-reveal
              >
                <Link
                  href={`/work/${project.slug}`}
                  className={styles.projectLink}
                >
                  <div
                    className={`${styles.projectImage} ${styles[project.visual]}`}
                  >
                    {project.visual !== "school" && (
                      <ProjectVisual kind={project.visual} />
                    )}
                    <span className={styles.openProject} aria-hidden="true">
                      <Arrow diagonal />
                    </span>
                  </div>
                  <div className={styles.cardHeading}>
                    <h3>{project.title}</h3>
                    <Arrow diagonal />
                  </div>
                  <p className={styles.projectQuestion}>{project.question}</p>
                  <p className={styles.projectMeta}>
                    {project.tools.slice(0, 3).join(" / ")}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section id="about" className={styles.about} data-reveal>
          <p className={styles.overline}>Behind the work</p>
          <div>
            <h2>I&apos;m Radhika.</h2>
            <p>
              An AI engineer and founder of{" "}
              <a href={company.url} target="_blank" rel="noopener noreferrer">
                Evaradh
              </a>
              . I build software, explore machine learning and work on the
              problems in front of me. CIS Compass grew out of my work at
              Chintamani International School.
            </p>
            <a
              className={styles.aboutLink}
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              More about my background <Arrow diagonal />
            </a>
          </div>
        </section>
        <section id="contact" className={styles.contact}>
          <p className={styles.overline}>
            Projects · Collaborations · Engineering roles
          </p>
          <a className={styles.contactHeading} href={`mailto:${contact.email}`}>
            <h2>
              Have something <br />
              to build?
            </h2>
            <Arrow diagonal />
          </a>
          <div className={styles.contactBottom}>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <div>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <span>
          © {new Date().getFullYear()} {identity.fullName}
        </span>
        <span>Based in Pune, India</span>
        <Link href="#top">Back to top ↑</Link>
      </footer>
    </div>
  );
}
