import { HeroRobot } from "../HeroRobot";
import { company, education, identity, positioning, school } from "@/data/site";

/** Letters rise in on load and lift under the pointer; one readable name stays. */
function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span className="hero-letters" aria-hidden="true">
      {[...text].map((letter, index) => (
        <span key={index} className="hero-letter-mask">
          <span
            className="hero-letter"
            style={{ "--i": index + offset } as React.CSSProperties}
          >
            {letter}
          </span>
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

const disciplines = [
  "Software",
  "Machine learning",
  "Robotics",
  "Product",
  "Computer vision",
  "School technology",
];

export function Hero() {
  return (
    <>
      <section id="top" className="scene hero-scene">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-robot">
          <HeroRobot />
        </div>
        <div className="hero-content shell">
          <p className="eyebrow hero-kicker">
            <span className="status-dot" aria-hidden="true" />
            {identity.discipline} — {identity.location}
          </p>
          <h1>
            <span className="sr-only">{identity.fullName}</span>
            <Letters text={identity.firstName} />
            <br />
            <em>
              <Letters text={`${identity.lastName}.`} offset={7} />
            </em>
          </h1>
          <div className="hero-lower">
            <p className="hero-tagline">{positioning.statement}</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#projects">
                Explore my work <span aria-hidden="true">↓</span>
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
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="scroll-cue eyebrow" aria-hidden="true">
          Scroll <span />
        </p>
      </section>
      <div className="discipline-marquee" aria-hidden="true">
        <div className="discipline-track">
          {[0, 1].map((copy) => (
            <span key={copy}>
              {disciplines.map((item) => (
                <span key={item}>
                  {item}
                  <i>✳</i>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
