"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { journey } from "@/data/journey";
import { prefersReducedMotion } from "@/lib/motion-preference";
import styles from "./JourneyMap.module.css";

type Scroll = { step: number; height: number; top: number } | null;

const routes = [
  "M 120 426 C 120 315 125 156 240 156",
  "M 240 156 C 335 156 345 174 480 174",
  "M 480 174 C 605 174 425 444 530 444",
  "M 530 444 C 665 444 655 396 810 396",
  "M 810 396 C 935 396 870 245 870 138",
];

export function JourneyMap({ intro }: { intro?: ReactNode }) {
  const [active, setActive] = useState(0);
  const [scroll, setScroll] = useState<Scroll>(null);
  // Narrow screens: the map sticks at the top while every chapter scrolls
  // underneath it, and the active stop follows the chapter being read.
  const [flow, setFlow] = useState(false);
  const chapters = useRef<(HTMLDivElement | null)[]>([]);
  const atlas = useRef<HTMLDivElement>(null);
  const stops = useRef<(HTMLButtonElement | null)[]>([]);
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const chapter = journey[active];

  // Pin the map and step through chapters on scroll, but only on wide screens
  // where the whole stage fits below the sticky header.
  useEffect(() => {
    const trackElement = track.current;
    const stageElement = stage.current;
    if (!trackElement || !stageElement) return;
    const wide = window.matchMedia("(min-width: 1051px)");
    let frame = 0;
    let layout: Scroll = null;

    function sync() {
      frame = 0;
      if (!layout) return;
      const scrolled = layout.top - trackElement!.getBoundingClientRect().top;
      const index = Math.floor((scrolled + layout.step / 2) / layout.step);
      setActive(Math.min(journey.length - 1, Math.max(0, index)));
    }
    function measure() {
      const header = document.querySelector<HTMLElement>(".site-header");
      const headerBottom = (header?.getBoundingClientRect().bottom ?? 0) + 28;
      // Stack the chapters before measuring so the height is the tallest one.
      if (wide.matches) trackElement!.dataset.wide = "true";
      else delete trackElement!.dataset.wide;
      const height = stageElement!.offsetHeight;
      // Centre the stage in the space below the header when there is room.
      const top = Math.max(
        headerBottom,
        (innerHeight - height) / 2 + headerBottom / 3,
      );
      layout =
        wide.matches && height <= innerHeight - headerBottom - 8
          ? {
              top,
              height,
              step: Math.min(Math.max(innerHeight * 0.55, 320), 520),
            }
          : null;
      setScroll(layout);
      sync();
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(sync);
    }
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    wide.addEventListener("change", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      wide.removeEventListener("change", measure);
    };
  }, []);

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 1050px)");
    let frame = 0;
    function sync() {
      frame = 0;
      if (!narrow.matches) return;
      const line =
        (atlas.current?.getBoundingClientRect().bottom ?? 0) +
        (innerHeight - (atlas.current?.getBoundingClientRect().bottom ?? 0)) *
          0.35;
      let index = 0;
      chapters.current.forEach((element, i) => {
        if (element && element.getBoundingClientRect().top <= line) index = i;
      });
      setActive(index);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(sync);
    }
    function update() {
      setFlow(narrow.matches);
      schedule();
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    narrow.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      narrow.removeEventListener("change", update);
    };
  }, []);

  // Touch: a sideways swipe on the chapter panel moves to the next or
  // previous chapter (when the stage is not pinned to page scroll).
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const goTo = useCallback(
    (index: number) => {
      setActive(index);
      const trackElement = track.current;
      if (flow) {
        const element = chapters.current[index];
        const offset =
          (atlas.current?.getBoundingClientRect().bottom ?? 0) + 16;
        if (element)
          window.scrollTo({
            top: element.getBoundingClientRect().top + scrollY - offset,
            behavior: prefersReducedMotion() ? "auto" : "smooth",
          });
        return;
      }
      if (!scroll || !trackElement) return;
      const start =
        trackElement.getBoundingClientRect().top + scrollY - scroll.top;
      window.scrollTo({
        top: start + index * scroll.step,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    },
    [scroll, flow],
  );

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
    goTo(next);
    stops.current[next]?.focus({ preventScroll: true });
  }

  return (
    <div className={styles.journey} data-story-map>
      <div
        ref={track}
        className={styles.track}
        data-scrolly={scroll ? "true" : undefined}
        data-flow={flow ? "true" : undefined}
        style={
          scroll
            ? ({
                "--track-height": `${scroll.height + (journey.length - 1) * scroll.step}px`,
                "--stage-top": `${scroll.top}px`,
              } as CSSProperties)
            : undefined
        }
      >
        <div ref={stage} className={styles.stage}>
          {intro && <div className={styles.stageIntro}>{intro}</div>}
          <div className="story-scroll-progress" aria-hidden="true">
            <span />
          </div>
          <div className={styles.atlas} ref={atlas}>
            <div className={styles.atlasHeading}>
              <span className="eyebrow">A personal atlas</span>
              <span>
                {scroll
                  ? "Scroll or choose a stop"
                  : "Choose a stop to explore"}{" "}
                <span aria-hidden="true">{scroll ? "↓" : "↙"}</span>
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
                  aria-pressed={index === active}
                  aria-controls="journey-chapter"
                  onClick={() => goTo(index)}
                  onKeyDown={(event) => navigateStops(event, index)}
                >
                  <span className={styles.pin}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.stopLabel}>
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

          <div
            className={styles.chapterPanel}
            data-direction={direction}
            onTouchStart={(event) => {
              if (scroll) return;
              const touch = event.touches[0];
              swipe.current = { x: touch.clientX, y: touch.clientY };
            }}
            onTouchEnd={(event) => {
              const start = swipe.current;
              swipe.current = null;
              if (!start || scroll) return;
              const touch = event.changedTouches[0];
              const dx = touch.clientX - start.x;
              const dy = touch.clientY - start.y;
              if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.4)
                return;
              if (dx < 0 && active < journey.length - 1) {
                setDirection("next");
                goTo(active + 1);
              } else if (dx > 0 && active > 0) {
                setDirection("prev");
                goTo(active - 1);
              }
            }}
          >
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
              {journey.map((item, index) => (
                <div
                  key={item.id}
                  ref={(element) => {
                    chapters.current[index] = element;
                  }}
                  className={styles.chapterContent}
                  data-active={index === active || undefined}
                >
                  <p className={styles.chapterKicker}>
                    Chapter {String(index + 1).padStart(2, "0")} · {item.place}
                  </p>
                  <p className={styles.period}>{item.period}</p>
                  <h3
                    id={index === active ? "journey-chapter-title" : undefined}
                  >
                    {item.title}
                  </h3>
                  {item.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <p className={styles.chapterNote}>{item.note}</p>
                  {item.link ? (
                    <Link href={item.link.href} className={styles.chapterLink}>
                      {item.link.label}
                      <span aria-hidden="true">↗</span>
                    </Link>
                  ) : (
                    <span className={styles.chapterPostscript}>
                      People. Operations. A different kind of learning.
                    </span>
                  )}
                </div>
              ))}
            </article>
            <div className={styles.chapterNavigation}>
              <button
                type="button"
                disabled={active === 0}
                onClick={() => {
                  setDirection("prev");
                  goTo(active - 1);
                }}
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
                onClick={() => {
                  setDirection("next");
                  goTo(active + 1);
                }}
                aria-controls="journey-chapter"
              >
                Next <span aria-hidden="true">→</span>
              </button>
            </div>
            <p className={styles.srOnly} role="status">
              Chapter {active + 1} of {journey.length}: {chapter.title}
            </p>
          </div>
        </div>
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
