import { HeroRobot } from "../HeroRobot";
import { identity, positioning } from "@/data/site";

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

export function Hero() {
  return (
    <section id="top" className="portfolio-hero shell">
      <div className="hero-intro">
        <p className="eyebrow">
          <span className="tiny-star" aria-hidden="true">
            ✳
          </span>{" "}
          AI engineer & builder
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
        <p className="eyebrow muted hero-secondary-tagline">
          {positioning.tagline}
        </p>
        <div className="hero-actions">
          <a className="button button-dark" href="#projects">
            Explore my work <span aria-hidden="true">↘</span>
          </a>
          <a className="hero-story-link" href="#about">
            Follow my story <span aria-hidden="true">↝</span>
          </a>
        </div>
        <div className="hero-location">
          <span className="status-dot" />
          Based in Pune, India
          <span className="location-divider" />
          Building at CIS & Evaradh
        </div>
      </div>
      <HeroRobot />
      <div className="hero-bottom">
        <span>Selected projects & experiments</span>
        <span>
          Scroll to explore <span aria-hidden="true">↓</span>
        </span>
      </div>
    </section>
  );
}
