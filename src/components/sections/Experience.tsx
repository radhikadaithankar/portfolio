import Link from "next/link";
import { education, roles, toolkit } from "@/data/site";

export function Experience() {
  return (
    <section
      id="experience"
      className="experience-section shell"
      aria-labelledby="experience-heading"
    >
      <div className="experience-intro">
        <div>
          <p className="eyebrow">02 / Along the way</p>
          <h2 id="experience-heading">
            Work <em>experience.</em>
          </h2>
        </div>
        <p>
          Building software, working with data and bringing products into
          everyday use.
        </p>
      </div>
      <ol className="experience-list">
        {roles.map((role) => (
          <li
            id={role.id}
            key={`${role.company}-${role.title}`}
            className={`experience-role${role.current ? " experience-current" : ""}`}
          >
            <div className="experience-date">
              {role.current && (
                <span className="experience-status">
                  <span className="status-dot" aria-hidden="true" />
                  Current role
                </span>
              )}
              <p className="experience-period">{role.period}</p>
            </div>
            <div className="experience-position">
              <p className="experience-company">
                {role.company}
                {role.location && <span> / {role.location}</span>}
              </p>
              <h3>{role.title}</h3>
              <ul className="experience-skills" aria-label="Areas of work">
                {role.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
            <div className="experience-detail">
              <p className="experience-contribution">{role.contribution}</p>
              <ul className="experience-highlights">
                {role.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              {role.impact?.trim() && (
                <p className="experience-impact">{role.impact}</p>
              )}
              {role.current && (
                <Link
                  className="experience-project"
                  href="/work/school-platform"
                >
                  Explore the school platform <span aria-hidden="true">↗</span>
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
      <div className="credentials">
        <div className="credentials-block">
          <h3 className="eyebrow">Toolkit</h3>
          <dl className="toolkit">
            {toolkit.map((set) => (
              <div className="toolkit-row" key={set.group}>
                <dt>{set.group}</dt>
                <dd>
                  <ul>
                    {set.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="credentials-block">
          <h3 className="eyebrow">Education</h3>
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
