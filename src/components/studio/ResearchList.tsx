"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { Arrow } from "../Arrow";
import styles from "./studio.module.css";

const filters = ["All", "AI & ML", "Robotics"] as const;
export function ResearchList({
  projects,
}: {
  projects: Pick<
    Project,
    "slug" | "category" | "tools" | "visual" | "title" | "summary"
  >[];
}) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = projects.filter(
    (project) => filter === "All" || project.category === filter,
  );
  return (
    <>
      <div className={styles.researchHeader}>
        <div>
          <p className={styles.overline}>02 / Learning by building</p>
          <h2>Experiments & explorations</h2>
        </div>
        <div
          className={styles.filters}
          role="group"
          aria-label="Filter technical projects"
        >
          {filters.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={item === filter}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className={styles.srOnly} role="status">
        {visible.length} projects shown
      </p>
      <div className={styles.researchList}>
        {visible.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className={styles.researchRow}
          >
            <span
              className={`${styles.studyGlyph} ${project.category === "Robotics" ? styles.robotGlyph : ""}`}
              aria-hidden="true"
            >
              {project.visual === "networks"
                ? "01→9"
                : project.visual === "gan"
                  ? "G ⇄ D"
                  : project.visual === "robot"
                    ? "x · y · z"
                    : "↑ →"}
            </span>
            <div>
              <span className={styles.studyCategory}>
                {project.category} <span> / </span> {project.tools[0]}
              </span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
            </div>
            <Arrow diagonal />
          </Link>
        ))}
      </div>
    </>
  );
}
