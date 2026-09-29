import Link from "next/link";
import { ProjectVisual } from "../ProjectVisual";

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
        <p className="hero-tagline">Ideas, made useful.</p>
        <p className="hero-description">
          I build software that connects with the real world. A school day, a
          handwritten digit, a robot&apos;s next move.
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
      <Link
        href="/work/school-platform"
        className="hero-board"
        aria-label="Explore the school operations platform"
      >
        <span className="board-label">A FEW THINGS I&apos;VE BUILT</span>
        <span className="board-orbit orbit-one" aria-hidden="true" />
        <span className="board-orbit orbit-two" aria-hidden="true" />
        <div className="board-school">
          <ProjectVisual kind="school" compact />
        </div>
        <div className="board-network">
          <ProjectVisual kind="networks" compact />
        </div>
        <div className="board-gesture">
          <span className="eyebrow">Human → machine</span>
          <span className="gesture-glyph" aria-hidden="true">
            ↗
          </span>
          <span>
            Small gestures.
            <br />
            Physical movement.
          </span>
        </div>
        <span className="board-sticker" aria-hidden="true">
          built with
          <br />
          <em>curiosity.</em>
        </span>
        <span className="board-foot">
          SOFTWARE / MACHINE LEARNING / ROBOTICS<span>↗</span>
        </span>
      </Link>
      <div className="hero-bottom">
        <span>Selected projects & experiments</span>
        <span>
          Scroll to explore <span aria-hidden="true">↓</span>
        </span>
      </div>
    </section>
  );
}
