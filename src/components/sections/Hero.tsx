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

const proof = [
  {
    label: "In production",
    title: "CIS Compass",
    detail: `In use at ${school.name}`,
    href: "#projects",
  },
  {
    label: "Education",
    title: education[0].degree,
    detail: education[0].school,
    href: "#experience",
  },
  {
    label: "Founder",
    title: company.name,
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
      <section id="top" className="portfolio-hero shell">
        <div className="hero-intro">
          <p className="eyebrow">
            <span className="tiny-star" aria-hidden="true">
              ✳
            </span>{" "}
            AI engineer & builder · {identity.location}
          </p>
          <h1>
            <span className="sr-only">{identity.fullName}</span>
            <Letters text={identity.firstName} />
            <span className="headline-star" aria-hidden="true">
              ✳
            </span>
            <br />
            <em>
              <Letters text={`${identity.lastName}.`} />
            </em>
          </h1>
          <p className="hero-tagline">{positioning.statement}</p>
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
        <HeroRobot />
        <ul className="hero-proof" aria-label="Highlights">
          {proof.map((item) => {
            const external = item.href.startsWith("http");
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="hero-proof-label">{item.label}</span>
                  <strong>{item.title}</strong>
                  <span className="hero-proof-detail">{item.detail}</span>
                  <span className="hero-proof-arrow" aria-hidden="true">
                    {external ? "↗" : "↘"}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
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
