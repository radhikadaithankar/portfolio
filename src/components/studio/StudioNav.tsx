"use client";

import { useEffect, useState } from "react";
import styles from "./studio.module.css";
const links = [
  { id: "projects", label: "Selected work" },
  { id: "experiments", label: "Experiments" },
  { id: "about", label: "About me" },
  { id: "contact", label: "Get in touch" },
];
export function StudioNav() {
  const [active, setActive] = useState("projects");
  useEffect(() => {
    const sections = links.map((link) => document.getElementById(link.id));
    let frame = 0;
    function update() {
      let current = "projects";
      sections.forEach((section) => {
        if (
          section &&
          section.getBoundingClientRect().top <= window.innerHeight * 0.4
        )
          current = section.id;
      });
      setActive(current);
      frame = 0;
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return (
    <nav className={styles.sectionNav} aria-label="Primary">
      {links.map((link, index) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          aria-current={active === link.id ? "location" : undefined}
          onClick={() => setActive(link.id)}
        >
          <span>{link.label}</span>
          <span aria-hidden="true">0{index + 1}</span>
        </a>
      ))}
    </nav>
  );
}
