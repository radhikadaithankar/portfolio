"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CISAppScreens } from "@/components/CISAppScreens";
import { contact } from "@/data/site";
import styles from "./designs.module.css";

type Direction = "index" | "product" | "modular";
const options: { id: Direction; label: string; note: string }[] = [
  {
    id: "index",
    label: "01 / Bold index",
    note: "Oversized sans-serif type, monochrome, acid-yellow details. Motion through sliding type and responsive phone previews.",
  },
  {
    id: "product",
    label: "02 / Product studio",
    note: "Dark ink, electric blue, an app-first composition. Layered screen entrances and responsive project previews.",
  },
  {
    id: "modular",
    label: "03 / Color & structure",
    note: "Cobalt, pale lime and an asymmetric grid. Playful tile interactions with clear project information.",
  },
];

export function DesignPreview() {
  const searchParams = useSearchParams();
  const selected = searchParams.get("direction");
  const initial =
    selected === "index" || selected === "modular" ? selected : "product";
  return <DesignDirections key={initial} initial={initial} />;
}

export function DesignDirections({ initial }: { initial: Direction }) {
  const [direction, setDirection] = useState<Direction>(initial);
  const option = options.find((item) => item.id === direction)!;
  return (
    <main className={styles.lab}>
      <div className={styles.controls}>
        <div className={styles.controlTop}>
          <Link href="/">← Current portfolio</Link>
          <span>Design comparison · Working previews</span>
        </div>
        <div
          className={styles.choices}
          role="group"
          aria-label="Design direction"
        >
          {options.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={direction === item.id}
              onClick={() => {
                setDirection(item.id);
                window.history.replaceState(
                  null,
                  "",
                  `/designs?direction=${item.id}`,
                );
              }}
            >
              {item.label}
              {item.id === "product" && <small>Recommended</small>}
            </button>
          ))}
        </div>
        <p>{option.note}</p>
      </div>
      <div className={`${styles.preview} ${styles[direction]}`} key={direction}>
        <header className={styles.nav}>
          <a href="#direction-top" className={styles.brand}>
            <span>Radhika Daithankar</span>
          </a>
          <nav aria-label="Preview navigation">
            <a href="#direction-work">Work</a>
            <a href="#direction-about">About</a>
            <a href={`mailto:${contact.email}`}>Let&apos;s talk ↗</a>
          </nav>
        </header>
        {direction === "index" ? (
          <>
            <section id="direction-top" className={styles.indexHero}>
              <p className={styles.kicker}>
                AI engineer · Product builder · Pune, India
              </p>
              <h1>
                <span>Software.</span>
                <span>
                  With <i>purpose.</i>
                </span>
              </h1>
              <div className={styles.indexIntro}>
                <span className={styles.indexMark} aria-hidden="true">
                  ↘
                </span>
                <p>
                  I&apos;m Radhika. I build products around everyday problems,
                  combining AI engineering with hands-on product development.
                </p>
                <a href="#direction-work">
                  Selected work <span>↓</span>
                </a>
              </div>
            </section>
            <section id="direction-work" className={styles.indexProject}>
              <div className={styles.projectText}>
                <p className={styles.kicker}>
                  01 / Evaradh · School operations
                </p>
                <h2>CIS Compass</h2>
                <p>
                  Teachers, parents and school operations.
                  <br />
                  One connected app.
                </p>
                <Link href="/work/school-platform">View project ↗</Link>
              </div>
              <CISAppScreens priority />
            </section>
          </>
        ) : direction === "product" ? (
          <>
            <section id="direction-top" className={styles.productHero}>
              <div className={styles.productIntro}>
                <p className={styles.kicker}>
                  Radhika Daithankar / AI & product engineering
                </p>
                <h1>
                  I build the
                  <br />
                  software.
                  <br />
                  <span>
                    And see it
                    <br />
                    through.
                  </span>
                </h1>
                <p>
                  AI engineer. Founder of Evaradh.
                  <br />
                  Building software for the everyday work of a school.
                </p>
                <a className={styles.action} href="#direction-work">
                  Explore my work <span>↗</span>
                </a>
              </div>
              <div id="direction-work" className={styles.productStage}>
                <div className={styles.stageTop}>
                  <span>Featured product</span>
                  <span>01 / CIS Compass</span>
                </div>
                <CISAppScreens priority />
                <div className={styles.stageBottom}>
                  <div>
                    <h2>A school, connected.</h2>
                    <p>CIS Compass / Built under Evaradh</p>
                  </div>
                  <Link
                    aria-label="Explore the CIS Compass project"
                    href="/work/school-platform"
                  >
                    ↗
                  </Link>
                </div>
              </div>
            </section>
            <div className={styles.productStrip}>
              <span>PRODUCT DEVELOPMENT</span>
              <span>AI & MACHINE LEARNING</span>
              <span>ROBOTICS</span>
            </div>
          </>
        ) : (
          <>
            <section id="direction-top" className={styles.modularHero}>
              <div className={styles.introTile}>
                <p className={styles.kicker}>
                  Engineer. Founder. Curious by default.
                </p>
                <h1>
                  Radhika
                  <br />
                  <span>builds.</span>
                </h1>
                <p>
                  Products for real people.
                  <br />
                  Experiments that ask better questions.
                </p>
                <a href={`mailto:${contact.email}`}>
                  Have a project in mind? ↗
                </a>
              </div>
              <div id="direction-work" className={styles.appTile}>
                <div>
                  <p className={styles.kicker}>01 / Featured work</p>
                  <h2>
                    CIS Compass <span>↗</span>
                  </h2>
                </div>
                <Link
                  aria-label="Explore CIS Compass"
                  href="/work/school-platform"
                >
                  <CISAppScreens priority />
                </Link>
                <p>School management app / Evaradh</p>
              </div>
              <Link className={styles.aiTile} href="/work/image-classification">
                <span className={styles.kicker}>02 / AI & ML</span>
                <h2>
                  How does a<br />
                  network learn?
                </h2>
                <span>
                  ResNet18 & VGG13 <b>↗</b>
                </span>
              </Link>
              <Link className={styles.robotTile} href="/work/panda-manipulator">
                <span className={styles.kicker}>03 / Robotics</span>
                <h2>
                  Code,
                  <br />
                  <i>in motion.</i>
                </h2>
                <span>
                  Panda robot motion planning <b>↗</b>
                </span>
              </Link>
            </section>
          </>
        )}
        <section id="direction-about" className={styles.about}>
          <p className={styles.kicker}>The person behind the work</p>
          <div>
            <h2>
              Engineering knowledge.
              <br />
              Product responsibility.
            </h2>
            <p>
              MSc Artificial Intelligence, Queen Mary University of London.
              Managing Director at CIS. Founder of Evaradh.
            </p>
          </div>
          <a href={`mailto:${contact.email}`}>
            Let&apos;s make something work. ↗
          </a>
        </section>
        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} Radhika Daithankar</span>
          <a
            href="https://evaradh.com/#work"
            target="_blank"
            rel="noopener noreferrer"
          >
            CIS app previews: Evaradh · Illustrative data ↗
          </a>
        </footer>
      </div>
    </main>
  );
}
