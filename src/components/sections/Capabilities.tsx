import { SkillOrb } from "../SkillOrb";
import { Stats } from "../Stats";
import { notebooks, projects } from "@/data/projects";
import { education, roles, toolkit } from "@/data/site";

const stats = [
  {
    value: projects.length,
    label: "Projects built",
    note: "From product to robotics",
  },
  {
    value: roles.length,
    label: "Roles",
    note: "Data, software and leadership",
  },
  {
    value: notebooks.length,
    label: "Public notebooks",
    note: "Open code to read and run",
  },
];

export function Capabilities() {
  return (
    <section className="v-capabilities" aria-labelledby="capabilities-title">
      <div className="shell">
        <div className="v-section-head">
          <p className="eyebrow">Capabilities</p>
          <h2 id="capabilities-title">
            What I bring <em>to the table.</em>
          </h2>
        </div>
        <div className="v-bento">
          <div className="v-tile v-tile-orb">
            <p className="eyebrow">Toolkit in 3D</p>
            <SkillOrb />
            <details className="v-toolkit">
              <summary>
                See the full toolkit as a list <span aria-hidden="true">+</span>
              </summary>
              <dl>
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
            </details>
          </div>
          <div className="v-tile v-tile-stats">
            <p className="eyebrow">At a glance</p>
            <Stats stats={stats} className="v-stats" />
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
      </div>
    </section>
  );
}
