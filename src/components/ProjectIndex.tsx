"use client";

import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import type { notebooks as notebookData, Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";

type Notebook = (typeof notebookData)[number];

type Row = {
  key: string;
  number: string;
  title: string;
  discipline: string;
  kind: string;
  href: string;
  external: boolean;
  visual?: Project["visual"];
};

/**
 * A numbered project list. On precise pointers, the hovered row's
 * illustration follows the cursor; small screens show it inline.
 */
export function ProjectIndex({
  projects,
  notebooks,
}: {
  projects: Project[];
  notebooks: Notebook[];
}) {
  const list = useRef<HTMLOListElement>(null);
  const rows: Row[] = [
    ...projects.map((project) => ({
      key: project.slug,
      number: project.number,
      title: project.shortTitle,
      discipline: project.discipline,
      kind:
        project.collection === "Academic experiments"
          ? "Academic"
          : "Independent",
      href: `/work/${project.slug}`,
      external: false,
      visual: project.visual,
    })),
    ...notebooks.map((notebook, index) => ({
      key: notebook.url,
      number: `N${index + 1}`,
      title: notebook.title,
      discipline: notebook.tools.join(" · "),
      kind: "Notebook",
      href: notebook.url,
      external: true,
    })),
  ];

  function follow(event: PointerEvent<HTMLOListElement>) {
    if (event.pointerType !== "mouse" || !list.current) return;
    const box = list.current.getBoundingClientRect();
    list.current.style.setProperty("--px", `${event.clientX - box.left}px`);
    list.current.style.setProperty("--py", `${event.clientY - box.top}px`);
  }

  return (
    <ol className="project-index" ref={list} onPointerMove={follow}>
      {rows.map((row) => {
        const content = (
          <>
            <span className="index-number">{row.number}</span>
            <span className="index-title">{row.title}</span>
            <span className="index-discipline">{row.discipline}</span>
            <span className="index-kind">{row.kind}</span>
            <span className="index-arrow" aria-hidden="true">
              ↗
            </span>
          </>
        );
        return (
          <li key={row.key} className="index-row">
            {row.external ? (
              <a href={row.href} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              <Link href={row.href}>{content}</Link>
            )}
            {row.visual && (
              <div className="index-preview" aria-hidden="true">
                <ProjectVisual kind={row.visual} compact />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
