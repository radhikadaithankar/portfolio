import Link from "next/link";
import { roles } from "@/data/site";

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
    </section>
  );
}
