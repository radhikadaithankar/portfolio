"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import { journey } from "@/data/journey";
import styles from "./JourneyMap.module.css";

const routes = [
  "M 120 426 C 120 315 125 156 240 156",
  "M 240 156 C 335 156 345 174 480 174",
  "M 480 174 C 605 174 425 444 530 444",
  "M 530 444 C 665 444 655 396 810 396",
  "M 810 396 C 935 396 870 245 870 138",
];

export function JourneyMap() {
  const [active, setActive] = useState(0);
  const stops = useRef<(HTMLButtonElement | null)[]>([]);
  const chapter = journey[active];

  function navigateStops(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next: number;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (index + 1) % journey.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (index - 1 + journey.length) % journey.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = journey.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActive(next);
    stops.current[next]?.focus();
  }

  return (
    <div className={styles.journey} data-story-map>
      <div className="story-scroll-progress" aria-hidden="true">
        <span />
      </div>
      <div className={styles.atlas}>
        <div className={styles.atlasHeading}>
          <span className="eyebrow">A personal atlas</span>
          <span>
            Choose a stop to explore <span aria-hidden="true">↙</span>
          </span>
        </div>
        <div
          className={styles.map}
          role="group"
          aria-label="Six chapters of my story. Select a stop or use the arrow keys."
        >
          <svg
            className={styles.routes}
            data-story-parallax
            viewBox="0 0 1000 600"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="journey-grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="1.1" fill="currentColor" />
              </pattern>
            </defs>
            <rect
              width="1000"
              height="600"
              fill="url(#journey-grid)"
              opacity=".18"
            />
            <path
              className={styles.contour}
              d="M-40 180C100 40 280 50 345 135S300 320 430 355S645 225 690 145S885 30 1030 120M-40 214C100 74 258 90 300 155S273 345 420 397S665 265 728 178S885 65 1030 160M-40 247C93 121 222 125 255 176S241 377 405 436S705 285 766 208S910 97 1030 203"
            />
            {routes.map((path, index) => (
              <g key={path}>
                <path className={styles.routeBase} d={path} />
                <path
                  className={`${styles.routeTraced} ${index < active ? styles.traced : ""}`}
                  d={path}
                  pathLength="1"
                />
              </g>
            ))}
            <path
              className={styles.futureRoute}
              d="M870 138C870 60 928 30 987 37"
            />
            <path
              className={styles.compass}
              d="M76 76V28M52 52H100M76 28L71 40M76 28L81 40"
            />
          </svg>
          <span className={styles.mapAside} aria-hidden="true">
            A little curiosity.
            <br />A few unexpected turns.
          </span>
          {journey.map((stop, index) => (
            <button
              key={stop.id}
              ref={(element) => {
                stops.current[index] = element;
              }}
              className={`${styles.stop} ${index === active ? styles.activeStop : ""} ${index < active ? styles.pastStop : ""}`}
              data-stop={stop.id}
              style={
                {
                  left: `${stop.x}%`,
                  "--stop-y": `${stop.y}%`,
                } as CSSProperties
              }
              type="button"
              aria-label={`${String(index + 1).padStart(2, "0")} ${stop.place} ${stop.label}`}
              aria-pressed={index === active}
              aria-controls="journey-chapter"
              onClick={() => setActive(index)}
              onKeyDown={(event) => navigateStops(event, index)}
            >
              <span className={styles.pin}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.stopLabel} aria-hidden="true">
                <strong>{stop.place}</strong>
                <small>{stop.label}</small>
              </span>
            </button>
          ))}
        </div>
        <div className={styles.mapLegend}>
          <span>
            <i aria-hidden="true" />
            The journey so far
          </span>
          <span>A story map, not to scale</span>
        </div>
      </div>

      <div className={styles.chapterPanel}>
        <div className={styles.chapterTop}>
          <span className="eyebrow">
            Chapter {String(active + 1).padStart(2, "0")}
          </span>
          <span className={styles.pageCount}>
            {String(active + 1).padStart(2, "0")}{" "}
            <span>/ {String(journey.length).padStart(2, "0")}</span>
          </span>
        </div>
        <article
          id="journey-chapter"
          aria-labelledby="journey-chapter-title"
          className={styles.chapter}
        >
          <div key={chapter.id} className={styles.chapterContent}>
            <p className={styles.period}>{chapter.period}</p>
            <h3 id="journey-chapter-title">{chapter.title}</h3>
            {chapter.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className={styles.chapterNote}>{chapter.note}</p>
            {chapter.link ? (
              <Link href={chapter.link.href} className={styles.chapterLink}>
                {chapter.link.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ) : (
              <span className={styles.chapterPostscript}>
                People. Operations. A different kind of learning.
              </span>
            )}
          </div>
        </article>
        <div className={styles.chapterNavigation}>
          <button
            type="button"
            disabled={active === 0}
            onClick={() => setActive((value) => value - 1)}
            aria-controls="journey-chapter"
          >
            <span aria-hidden="true">←</span> Previous
          </button>
          <span className={styles.chapterProgress} aria-hidden="true">
            {journey.map((stop, index) => (
              <i
                key={stop.id}
                className={index <= active ? styles.progressFilled : ""}
              />
            ))}
          </span>
          <button
            type="button"
            disabled={active === journey.length - 1}
            onClick={() => setActive((value) => value + 1)}
            aria-controls="journey-chapter"
          >
            Next <span aria-hidden="true">→</span>
          </button>
        </div>
        <p className={styles.srOnly} role="status">
          Chapter {active + 1} of {journey.length}: {chapter.title}
        </p>
      </div>

      <details className={styles.readStory}>
        <summary>
          Read the whole story <span aria-hidden="true">+</span>
        </summary>
        <div className={styles.fullStory}>
          {journey.map((stop, index) => (
            <article key={stop.id} data-story-chapter>
              <p className="eyebrow">
                {String(index + 1).padStart(2, "0")} / {stop.place}
              </p>
              <h3>{stop.title}</h3>
              {stop.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
      </details>
    </div>
  );
}
