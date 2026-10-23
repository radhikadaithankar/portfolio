"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "../Arrow";
import styles from "./studio.module.css";

const views = [
  {
    label: "Teacher",
    title: "The classroom, at a glance.",
    description:
      "Class overview, attendance and homework in one daily workspace.",
    image: "/images/cis-teacher-preview.png",
    alt: "Public CIS Compass teacher app preview showing the class overview and daily briefing",
  },
  {
    label: "Parent",
    title: "Stay connected to the school day.",
    description:
      "Attendance, homework and fee information together in the parent app.",
    image: "/images/cis-parent-preview.png",
    alt: "Public CIS Compass parent app preview showing attendance, homework and fees",
  },
];

export function CompassPreview() {
  const [active, setActive] = useState(0);
  const id = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft")
      next = 1 - index;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 1;
    else return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  }
  return (
    <article className={styles.compass}>
      <div className={styles.featuredMeta}>
        <p className={styles.overline}>Selected work / 01</p>
        <span>School operations · Product development</span>
      </div>
      <div className={styles.projectHero}>
        <div className={styles.heroCopy}>
          <p className={styles.projectBrand}>Built under Evaradh</p>
          <h1>
            CIS <br />
            Compass<span>.</span>
          </h1>
          <p className={styles.projectSummary}>
            Connecting the people <br />
            behind a school day.
          </p>
          <Link className={styles.caseButton} href="/work/school-platform">
            View the case study <Arrow diagonal />
          </Link>
          <p className={styles.projectCredit}>
            Website & school management app <br />
            <span>Built by Radhika Daithankar</span>
          </p>
        </div>
        <div className={styles.productStage} data-view={active}>
          <div className={styles.stageHeader}>
            <span>CIS Compass / App experience</span>
            <div
              role="tablist"
              aria-label="Explore app roles"
              className={styles.roleTabs}
            >
              {views.map((view, index) => (
                <button
                  type="button"
                  role="tab"
                  key={view.label}
                  id={`${id}-tab-${index}`}
                  aria-selected={active === index}
                  aria-controls={`${id}-panel-${index}`}
                  tabIndex={active === index ? 0 : -1}
                  ref={(node) => {
                    buttons.current[index] = node;
                  }}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                >
                  {view.label}
                </button>
              ))}
            </div>
          </div>
          <div
            className={styles.phones}
            role="group"
            aria-label="Public CIS Compass app previews"
          >
            {views.map((view, index) => (
              <figure
                key={view.label}
                className={
                  active === index ? styles.frontPhone : styles.backPhone
                }
              >
                <Image
                  src={view.image}
                  alt={view.alt}
                  width={404}
                  height={804}
                  sizes="(max-width: 650px) 43vw, (max-width: 1100px) 23vw, 230px"
                  preload
                />
              </figure>
            ))}
          </div>
          {views.map((view, index) => (
            <div
              key={view.label}
              id={`${id}-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`${id}-tab-${index}`}
              hidden={active !== index}
              tabIndex={0}
            >
              {active === index && (
                <div className={styles.roleCopy}>
                  <h2>{view.title}</h2>
                  <p>{view.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.previewNote}>
        <span>In use at Chintamani International School, Parbhani</span>
        <p>
          Public app previews from{" "}
          <a
            href="https://evaradh.com/#work"
            target="_blank"
            rel="noopener noreferrer"
          >
            Evaradh
          </a>{" "}
          · Illustrative data
        </p>
      </div>
    </article>
  );
}
