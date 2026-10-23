import Link from "next/link";
import { education, roles, toolkit } from "@/data/site";

/**
 * Five roles in a plain responsive grid, sized to their content, followed by
 * the toolkit and education. The current role spans the full width so the
 * "Now" card reads first at every width.
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
      <div className="shell v-exp-extras">
        <div className="v-tile v-tile-toolkit">
          <p className="eyebrow">Toolkit</p>
          <dl className="v-toolkit">
            {toolkit.map((set) => (
              <div key={set.group}>
                <dt>{set.group}</dt>
                <dd>
                  <ul className="v-chips">
                    {set.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="v-tile v-tile-education">
          <p className="eyebrow">Education</p>
          <ul className="education-list">
            {education.map((item) => (
              <li key={item.degree}>
                <strong>{item.degree}</strong>
                <span>
                  {item.school} · {item.place}
                </span>
                <span className="education-period">{item.period}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
