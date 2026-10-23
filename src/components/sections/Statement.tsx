import { company, identity, positioning, school } from "@/data/site";

const facts = [
  { label: "What", value: "AI engineer & builder" },
  { label: "Now", value: `${company.name} · ${school.name}` },
  { label: "Where", value: identity.location },
];

/** The introduction, in the same shape as Evaradh's: a line, a paragraph and facts. */
export function Statement() {
  return (
    <section className="v-statement" aria-labelledby="intro-title">
      <div className="shell">
        <p className="eyebrow">Hello</p>
        <h2 id="intro-title" className="v-statement-title">
          {positioning.intro.lead} <em>{positioning.intro.accent}</em>
        </h2>
        <p className="v-statement-body">{positioning.supporting}</p>
        <dl className="v-statement-facts">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
