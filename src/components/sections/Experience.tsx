import Link from "next/link";
import { roles } from "@/data/site";

/**
 * Five roles in a plain responsive grid, sized to their content. The current
 * role spans the full width so the "Now" card reads first at every width.
 */
export function Experience() {
  return (
    <section
      id="experience"
      className="v-experience"
      aria-labelledby="experience-heading"
    >
      <div className="shell v-exp-head">
        <div>
          <p className="eyebrow">Experience</p>
          <h2 id="experience-heading">
            Where I&apos;ve <em>worked.</em>
          </h2>
        </div>
        <p className="v-section-lede">
          Building software, working with data and bringing products into
          everyday use.
        </p>
      </div>
      <ol className="shell v-exp-grid">
        {roles.map((role) => (
          <li
            key={`${role.company}-${role.title}`}
            id={role.id}
            className={`v-role${role.current ? " v-role-current" : ""}`}
          >
            <div className="v-role-top">
              <span>{role.period}</span>
              {role.current && (
                <span className="v-role-badge">
                  <span className="status-dot" aria-hidden="true" />
                  Now
                </span>
              )}
            </div>
            <h3>{role.title}</h3>
            <p className="v-role-company">
              {role.company}
              {role.location && <span> · {role.location}</span>}
            </p>
            <p className="v-role-text">{role.contribution}</p>
            {role.highlights.length > 0 && (
              <ul className="v-role-points">
                {role.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
            {role.impact?.trim() && (
              <p className="experience-impact">{role.impact}</p>
            )}
            <ul className="v-chips" aria-label="Areas of work">
              {role.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            {role.current && (
              <Link className="v-role-link" href="/work/school-platform">
                Explore the school platform <span aria-hidden="true">↗</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
