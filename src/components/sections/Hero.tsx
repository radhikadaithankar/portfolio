import { HeroField } from "../HeroField";
import { LocalTime } from "../LocalTime";
import { company, identity } from "@/data/site";

/** Each word fades up once on load; one readable name stays for screen readers. */
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

export function Hero() {
  return (
    <section id="top" className="v-hero">
      <svg className="v-ring" viewBox="0 0 400 400" aria-hidden="true">
        <circle cx="200" cy="200" r="176" />
      </svg>
      <HeroField />

      <h1 className="v-name">
        <span className="sr-only">{identity.fullName}</span>
        <span className="v-name-top">
          <Letters text={identity.firstName} />
        </span>
        <span className="v-name-bottom">
          <Letters text={identity.lastName} offset={7} />
        </span>
      </h1>

      <div className="v-hero-bar shell">
        <p className="v-hero-role">
          {identity.discipline}
          <span aria-hidden="true"> · </span>
          <span className="sr-only">, </span>
          Founder of {company.name}
        </p>
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
