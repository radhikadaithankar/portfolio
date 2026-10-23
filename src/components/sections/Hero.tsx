import { HeroRobot } from "../HeroRobot";
import { LocalTime } from "../LocalTime";
import { identity } from "@/data/site";

/** Letters rise in on load and lift under the pointer; one readable name stays. */
function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span className="hero-letters" aria-hidden="true">
      {[...text].map((letter, index) => (
        <span
          key={index}
          className="hero-letter"
          style={{ "--i": index + offset } as React.CSSProperties}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

const ring =
  "AI engineer ✳ Builder ✳ Founder of Evaradh ✳ MSc Artificial Intelligence ✳ ";

export function Hero() {
  return (
    <section id="top" className="v-hero">
      <div className="v-hero-glow" aria-hidden="true" />
      <svg className="v-ring" viewBox="0 0 400 400" aria-hidden="true">
        <defs>
          <path
            id="v-ring-path"
            d="M200,200 m-176,0 a176,176 0 1,1 352,0 a176,176 0 1,1 -352,0"
          />
        </defs>
        <text>
          <textPath href="#v-ring-path">{ring.repeat(2)}</textPath>
        </text>
      </svg>

      <h1 className="v-name">
        <span className="sr-only">{identity.fullName}</span>
        <span className="v-name-top">
          <Letters text={identity.firstName} />
        </span>
        <span className="v-name-bottom">
          <Letters text={identity.lastName} offset={7} />
        </span>
      </h1>

      <div className="v-robot">
        <HeroRobot />
      </div>

      <div className="v-hero-bar shell">
        <span aria-hidden="true" />
        <div className="v-hero-cta">
          <a className="pill pill-light" href="#projects">
            See the work <span aria-hidden="true">↓</span>
          </a>
          <a
            className="pill pill-ghost"
            href="https://cv.radhikakd.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CV <span aria-hidden="true">↗</span>
          </a>
        </div>
        <p className="v-hero-meta">
          <span className="status-dot" aria-hidden="true" />
          {identity.location}
          <span aria-hidden="true">·</span>
          <LocalTime />
        </p>
      </div>
    </section>
  );
}
