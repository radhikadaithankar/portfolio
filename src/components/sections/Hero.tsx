import { HeroRobot } from "../HeroRobot";
import { positioning } from "@/data/site";

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
          Radhika
          <span className="headline-star" aria-hidden="true">
            ✳
          </span>
          <br />
          <em>Daithankar.</em>
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
