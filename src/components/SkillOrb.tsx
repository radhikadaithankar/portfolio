"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { toolkit } from "@/data/site";
import { useReducedMotion } from "@/lib/motion-preference";

/** Group colours, in toolkit order. */
const tones = ["#7b1c34", "#7a4a2e", "#4a5a35"];
const maxRadius = 156;
const startTilt = { x: -0.35, y: 0.6 };

const items = toolkit.flatMap((set, group) =>
  set.items.map((label) => ({ label, group })),
);

/** Spread the tags evenly over a sphere (Fibonacci lattice). */
const points = items.map((_, index) => {
  const y = 1 - ((index + 0.5) / items.length) * 2;
  const ring = Math.sqrt(1 - y * y);
  const theta = index * Math.PI * (3 - Math.sqrt(5));
  return { x: Math.cos(theta) * ring, y, z: Math.sin(theta) * ring };
});

function place(
  point: (typeof points)[number],
  rx: number,
  ry: number,
  radius = maxRadius,
) {
  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const x1 = point.x * cosY + point.z * sinY;
  const z1 = -point.x * sinY + point.z * cosY;
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const y2 = point.y * cosX - z1 * sinX;
  const z2 = point.y * sinX + z1 * cosX;
  const depth = (z2 + 1) / 2;
  return {
    transform: `translate(-50%, -50%) translate3d(${(x1 * radius).toFixed(1)}px, ${(y2 * radius).toFixed(1)}px, 0) scale(${(0.62 + depth * 0.43).toFixed(3)})`,
    opacity: (0.18 + depth * 0.82).toFixed(3),
    zIndex: String(Math.round(depth * 100)),
  };
}

/**
 * A decorative, draggable sphere of the toolkit. The list beside it stays the
 * accessible source, so the sphere is hidden from assistive technology.
 */
export function SkillOrb() {
  const host = useRef<HTMLDivElement>(null);
  const tags = useRef<(HTMLSpanElement | null)[]>([]);
  const reduced = useReducedMotion();
  const [focus, setFocus] = useState<number | null>(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const angle = { ...startTilt };
    const velocity = { x: 0, y: reduced ? 0 : 0.18 };
    const drag = { active: false, x: 0, y: 0, time: 0 };
    let visible = false;
    let frame = 0;
    let last = 0;
    // Leave room for the widest tag on narrow screens.
    let radius = maxRadius;
    const resize = new ResizeObserver(() => {
      radius = Math.min(maxRadius, (element.clientWidth - 130) / 2);
      draw();
    });

    function draw() {
      tags.current.forEach((tag, index) => {
        if (!tag) return;
        const style = place(points[index], angle.x, angle.y, radius);
        tag.style.transform = style.transform;
        tag.style.opacity = style.opacity;
        tag.style.zIndex = style.zIndex;
      });
    }
    function tick(now: number) {
      const dt = Math.min((now - (last || now)) / 1000, 0.05);
      last = now;
      if (!drag.active) {
        angle.x += velocity.x * dt;
        angle.y += velocity.y * dt;
        // Ease back to a gentle idle spin after a fling.
        const idle = reduced ? 0 : 0.18;
        velocity.x += (0 - velocity.x) * Math.min(dt * 1.6, 1);
        velocity.y += (idle - velocity.y) * Math.min(dt * 1.6, 1);
        angle.x += (startTilt.x - angle.x) * Math.min(dt * 0.6, 1);
      }
      draw();
      const settled =
        reduced && Math.abs(velocity.x) + Math.abs(velocity.y) < 0.002;
      frame =
        visible && !document.hidden && !settled
          ? requestAnimationFrame(tick)
          : 0;
      if (!frame) last = 0;
    }
    function start() {
      if (!frame && visible && !document.hidden)
        frame = requestAnimationFrame(tick);
    }
    function down(event: PointerEvent) {
      drag.active = true;
      drag.x = event.clientX;
      drag.y = event.clientY;
      drag.time = event.timeStamp;
      element!.setPointerCapture(event.pointerId);
      start();
    }
    function move(event: PointerEvent) {
      if (!drag.active) return;
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      const elapsed = Math.max(event.timeStamp - drag.time, 1) / 1000;
      angle.y += dx * 0.008;
      angle.x -= dy * 0.008;
      velocity.y = Math.max(-6, Math.min(6, (dx * 0.008) / elapsed));
      velocity.x = Math.max(-6, Math.min(6, (-dy * 0.008) / elapsed));
      drag.x = event.clientX;
      drag.y = event.clientY;
      drag.time = event.timeStamp;
      draw();
    }
    function up() {
      drag.active = false;
      start();
    }
    const observer = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      start();
    });
    observer.observe(element);
    resize.observe(element);
    element.addEventListener("pointerdown", down);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerup", up);
    element.addEventListener("pointercancel", up);
    document.addEventListener("visibilitychange", start);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      element.removeEventListener("pointerdown", down);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerup", up);
      element.removeEventListener("pointercancel", up);
      document.removeEventListener("visibilitychange", start);
    };
  }, [reduced]);

  return (
    <div className="skill-orb" aria-hidden="true">
      <div
        className="skill-orb-stage"
        ref={host}
        data-focus={focus ?? undefined}
      >
        <span className="skill-orb-core" />
        {items.map((item, index) => {
          const style = place(points[index], startTilt.x, startTilt.y);
          return (
            <span
              key={item.label}
              ref={(value) => {
                tags.current[index] = value;
              }}
              className="skill-orb-tag"
              data-group={item.group}
              data-dim={focus !== null && focus !== item.group ? "" : undefined}
              style={
                {
                  "--tone": tones[item.group],
                  transform: style.transform,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                } as CSSProperties
              }
            >
              {item.label}
            </span>
          );
        })}
      </div>
      <div className="skill-orb-legend">
        {toolkit.map((set, group) => (
          <span
            key={set.group}
            style={{ "--tone": tones[group] } as CSSProperties}
            data-active={focus === group ? "" : undefined}
            onPointerEnter={() => setFocus(group)}
            onPointerLeave={() => setFocus(null)}
          >
            {set.group}
          </span>
        ))}
        <small>Drag to spin</small>
      </div>
    </div>
  );
}
