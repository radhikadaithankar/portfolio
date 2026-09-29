"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { Arrow } from "./Arrow";

const disciplines = [
  {
    label: "Products",
    word: "Build.",
    number: "01",
    title: "Software in everyday use",
    description:
      "A school website and CIS Compass. Built for the people running a school.",
    href: "/work/school-platform",
    link: "Explore CIS Compass",
  },
  {
    label: "AI & ML",
    word: "Learn.",
    number: "02",
    title: "Questions, tested in code",
    description:
      "Comparing ResNet18 and VGG13 to explore how different networks classify images.",
    href: "/work/image-classification",
    link: "Explore the experiment",
  },
  {
    label: "Robotics",
    word: "Move.",
    number: "03",
    title: "Code meets the physical world",
    description:
      "Planning a Panda robot's movement, one Cartesian trajectory at a time.",
    href: "/work/panda-manipulator",
    link: "Explore the robot project",
  },
];

export function WorkExplorer() {
  const [active, setActive] = useState(0);
  const id = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = disciplines[active];

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % disciplines.length;
    else if (event.key === "ArrowLeft")
      next = (index + disciplines.length - 1) % disciplines.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = disciplines.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  }

  return (
    <div className="work-explorer">
      <div
        className="explorer-tabs"
        role="tablist"
        aria-label="Explore my work"
      >
        {disciplines.map((item, index) => (
          <button
            key={item.label}
            ref={(node) => {
              buttons.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-selected={active === index}
            aria-controls={`${id}-panel-${index}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            <span>{item.number}</span>
            {item.label}
          </button>
        ))}
      </div>
      {disciplines.map((item, index) => (
        <div
          key={item.label}
          id={`${id}-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${index}`}
          hidden={index !== active}
          tabIndex={0}
        >
          {index === active && (
            <div className="explorer-scene" key={selected.word}>
              <div className="explorer-type" aria-hidden="true">
                <span>{item.word}</span>
                <span className="explorer-index">{item.number}</span>
              </div>
              <div className="explorer-copy">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
              <Link className="text-link" href={item.href}>
                {item.link}
                <Arrow diagonal />
              </Link>
            </div>
          )}
        </div>
      ))}
      <span className="explorer-caption">Choose a discipline to explore ↑</span>
    </div>
  );
}
