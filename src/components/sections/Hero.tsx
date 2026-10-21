import { HeroRobot } from "../HeroRobot";
import { company, education, identity, positioning, school } from "@/data/site";

/** Letters lift under the pointer; the heading keeps one readable name. */
function Letters({ text }: { text: string }) {
  return (
    <span className="hero-letters" aria-hidden="true">
      {[...text].map((letter, index) => (
        <span key={index} className="hero-letter">
          {letter}
        </span>
      ))}
    </span>
  );
}

const facts = [
  {
    label: "In production",
    value: "CIS Compass",
    detail: `In use at ${school.name}`,
    href: "#projects",
  },
  {
    label: "Education",
    value: education[0].degree,
    detail: education[0].school,
    href: "#experience",
  },
  {
    label: "Founder",
    value: company.name,
    detail: "A technology product company",
    href: company.url,
  },
];

export function Hero() {
  return (
    <section id="top" className="portfolio-hero shell">
      <div className="hero-topline">
        <p className="eyebrow">
          <span className="status-dot" aria-hidden="true" />
          {identity.discipline} — {identity.location}
        </p>
        <p className="eyebrow muted">Portfolio / {new Date().getFullYear()}</p>
      </div>

      <div className="hero-stage">
        <h1>
          <span className="sr-only">{identity.fullName}</span>
          <Letters text={identity.firstName} />
          <br />
          <em>
            <Letters text={`${identity.lastName}.`} />
          </em>
        </h1>
        <HeroRobot />
      </div>

      <div className="hero-grid">
        <p className="hero-tagline">{positioning.statement}</p>
        <div className="hero-body">
          <p className="hero-description">{positioning.supporting}</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#projects">
              Explore my work <span aria-hidden="true">↘</span>
            </a>
            <a
              className="button button-ghost"
              href="https://cv.radhikakd.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View my CV <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <ul className="hero-facts" aria-label="Highlights">
          {facts.map((fact) => {
            const external = fact.href.startsWith("http");
            return (
              <li key={fact.label}>
                <a
                  href={fact.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="eyebrow">{fact.label}</span>
                  <strong>{fact.value}</strong>
                  <span className="hero-fact-detail">{fact.detail}</span>
                  <span className="hero-fact-arrow" aria-hidden="true">
                    {external ? "↗" : "↘"}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
