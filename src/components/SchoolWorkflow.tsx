"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";

const perspectives = [
  {
    label: "Parents",
    title: "A clearer view of the school day.",
    description:
      "Attendance, homework, fees and notices connect families to what is happening at school.",
    areas: [
      "Attendance",
      "Homework & notices",
      "Fees & progress",
      "Communication",
    ],
  },
  {
    label: "Teachers",
    title: "Classroom work, connected to home.",
    description:
      "Teachers record attendance, manage classroom work and assessments, and share student progress.",
    areas: ["Attendance", "Classroom", "Assessments", "Student progress"],
  },
  {
    label: "Administration",
    title: "The operational view of the school.",
    description:
      "School operations, data and communication sit within the same digital system.",
    areas: ["Operations", "School data", "Analytics", "Communication"],
  },
];

export function SchoolWorkflow() {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const perspective = perspectives[active];
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % perspectives.length;
    else if (event.key === "ArrowLeft")
      next = (index + perspectives.length - 1) % perspectives.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = perspectives.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }
  return (
    <section className="workflow">
      <div className="workflow-header">
        <p className="eyebrow">CIS Compass / School management</p>
        <span>Interactive workflow overview</span>
      </div>
      <div
        className="workflow-tabs"
        role="tablist"
        aria-label="School management perspectives"
      >
        {perspectives.map((item, index) => (
          <button
            key={item.label}
            ref={(el) => {
              tabs.current[index] = el;
            }}
            id={`${id}-tab-${index}`}
            role="tab"
            aria-selected={active === index}
            aria-controls={`${id}-panel`}
            tabIndex={active === index ? 0 : -1}
            onKeyDown={(event) => onKeyDown(event, index)}
            onClick={() => setActive(index)}
          >
            {item.label}
            <span aria-hidden="true">0{index + 1}</span>
          </button>
        ))}
      </div>
      <div
        className="workflow-panel"
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
      >
        <div className="workflow-copy">
          <h3>{perspective.title}</h3>
          <p>{perspective.description}</p>
        </div>
        <div
          className="workflow-diagram"
          role="group"
          aria-label={`${perspective.label} workflow areas`}
        >
          <div className="workflow-hub">
            <span>CIS</span>
            <small>Shared system</small>
          </div>
          <ul>
            {perspective.areas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="workflow-caption">
        Diagram based on the school&apos;s public digital-school overview.{" "}
        <a
          href="https://chintamani-school.org/digital-school"
          target="_blank"
          rel="noopener noreferrer"
        >
          View source ↗
        </a>
      </p>
    </section>
  );
}
