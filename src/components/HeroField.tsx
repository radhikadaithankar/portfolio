"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion-preference";

type Point = { x: number; y: number; z: number };

/** Repeatable pseudo-random numbers, so every visit draws the same sphere. */
function seeded(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

/**
 * Evenly spread points on a unit sphere (Fibonacci lattice), each nudged a
 * little so the lattice's spiral does not read as a pattern.
 */
function spherePoints(count: number): Point[] {
  const points: Point[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  const random = seeded(7);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const x = Math.cos(theta) * radius + (random() - 0.5) * 0.07;
    const z = Math.sin(theta) * radius + (random() - 0.5) * 0.07;
    const yy = y + (random() - 0.5) * 0.07;
    const length = Math.hypot(x, yy, z) || 1;
    points.push({ x: x / length, y: yy / length, z: z / length });
  }
  return points;
}

/** Each point joins its two nearest neighbours, giving a light network. */
function neighbourEdges(points: Point[]): [number, number][] {
  const edges = new Map<string, [number, number]>();
  points.forEach((a, i) => {
    const nearest = points
      .map((b, j) => ({
        j,
        d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2,
      }))
      .filter(({ j }) => j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2);
    for (const { j } of nearest) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      edges.set(key, i < j ? [i, j] : [j, i]);
    }
  });
  return [...edges.values()];
}

function cssColour(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

/** Hex colour to "r, g, b" so alpha can vary per point. */
function rgb(hex: string) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? [...clean].map((c) => c + c).join("")
      : clean.slice(0, 6);
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

/**
 * A slowly turning sphere of points and faint links, centred in the hero's
 * hairline circle. It leans towards the pointer, points near the pointer lift
 * away, a click sends a pulse across the surface, and on touch a drag turns
 * it. With reduced motion it draws one still frame.
 */
export function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.closest<HTMLElement>(".v-hero");
    const context = canvas?.getContext("2d");
    if (!canvas || !hero || !context) return;
    const ctx = context;
    const host = hero;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const points = spherePoints(coarse ? 520 : 860);
    const edges = neighbourEdges(points);
    const near = rgb(cssColour("--burgundy", "#5a1226"));
    const far = rgb(cssColour("--ink", "#2a0e16"));

    let width = 0;
    let height = 0;
    let dpr = 1;
    let cx = 0;
    let cy = 0;
    let radius = 0;
    let yaw = 0.6;
    const pitch = -0.18;
    let leanX = 0;
    let leanY = 0;
    let targetLeanX = 0;
    let targetLeanY = 0;
    let spin = 0;
    let pointer: { x: number; y: number } | null = null;
    let pulse: { origin: Point; start: number } | null = null;
    let dragX: number | null = null;
    let frame = 0;
    let last = performance.now();
    let visible = true;

    const projected = points.map(() => ({ x: 0, y: 0, z: 0 }));

    function measure() {
      const box = host.getBoundingClientRect();
      const ring = host.querySelector(".v-ring")?.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      if (ring && ring.width > 0) {
        cx = ring.left - box.left + ring.width / 2;
        cy = ring.top - box.top + ring.height / 2;
        radius = (ring.width / 2) * 0.76;
      } else {
        cx = width / 2;
        cy = height / 2;
        radius = Math.min(width, height) * 0.3;
      }
    }

    function draw(now: number) {
      const cosY = Math.cos(yaw + leanX);
      const sinY = Math.sin(yaw + leanX);
      const cosP = Math.cos(pitch + leanY);
      const sinP = Math.sin(pitch + leanY);
      const age = pulse ? (now - pulse.start) / 1000 : 0;
      if (pulse && age > 1.8) pulse = null;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        // Rotate about the vertical axis, then tilt about the horizontal one.
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y2 = p.y * cosP - z1 * sinP;
        const z2 = p.y * sinP + z1 * cosP;
        let lift = 1;
        if (pulse) {
          const dot =
            p.x * pulse.origin.x + p.y * pulse.origin.y + p.z * pulse.origin.z;
          const angle = Math.acos(Math.max(-1, Math.min(1, dot)));
          const wave = angle - age * 2.6;
          lift += 0.09 * Math.exp(-(wave * wave) * 18) * (1 - age / 1.8);
        }
        const perspective = 1 / (1 - z2 * 0.22);
        let sx = cx + x1 * radius * lift * perspective;
        let sy = cy + y2 * radius * lift * perspective;
        if (pointer && z2 > 0) {
          const dx = sx - pointer.x;
          const dy = sy - pointer.y;
          const dist = Math.hypot(dx, dy);
          const reach = radius * 0.42;
          if (dist < reach && dist > 0.01) {
            const push = (1 - dist / reach) ** 2 * radius * 0.09;
            sx += (dx / dist) * push;
            sy += (dy / dist) * push;
          }
        }
        projected[i].x = sx;
        projected[i].y = sy;
        projected[i].z = z2;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      ctx.lineWidth = 0.6;
      for (const [a, b] of edges) {
        const pa = projected[a];
        const pb = projected[b];
        const depth = (pa.z + pb.z) / 2;
        const alpha = 0.07 + Math.max(0, depth) * 0.22;
        ctx.strokeStyle = `rgba(${depth > 0 ? near : far}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }

      for (const p of projected) {
        const front = (p.z + 1) / 2;
        const size = 0.7 + front * 1.5;
        const alpha = 0.14 + front * 0.76;
        ctx.fillStyle = `rgba(${p.z > 0 ? near : far}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function tick(now: number) {
      frame = 0;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      yaw += (0.09 + spin) * dt;
      spin *= Math.pow(0.04, dt);
      leanX += (targetLeanX - leanX) * Math.min(1, dt * 3);
      leanY += (targetLeanY - leanY) * Math.min(1, dt * 3);
      draw(now);
      schedule();
    }

    function schedule() {
      if (!reduced && visible && !document.hidden && !frame)
        frame = requestAnimationFrame(tick);
    }

    function local(event: PointerEvent) {
      const box = host.getBoundingClientRect();
      return { x: event.clientX - box.left, y: event.clientY - box.top };
    }

    function onMove(event: PointerEvent) {
      const at = local(event);
      if (event.pointerType === "touch") {
        if (dragX !== null) {
          spin = Math.max(-3, Math.min(3, spin + (at.x - dragX) * 0.02));
          dragX = at.x;
        }
        return;
      }
      pointer = at;
      targetLeanX = ((at.x - cx) / Math.max(width, 1)) * 0.9;
      targetLeanY = ((at.y - cy) / Math.max(height, 1)) * 0.7;
    }

    function onLeave() {
      pointer = null;
      targetLeanX = 0;
      targetLeanY = 0;
    }

    function onDown(event: PointerEvent) {
      if ((event.target as HTMLElement).closest("a, button")) return;
      const at = local(event);
      if (event.pointerType === "touch") dragX = at.x;
      const dx = (at.x - cx) / radius;
      const dy = (at.y - cy) / radius;
      if (dx * dx + dy * dy > 1.2) return;
      // The pulse starts from the surface point under the pointer.
      const zFront = Math.sqrt(Math.max(0, 1 - dx * dx - dy * dy));
      const cosP = Math.cos(pitch + leanY);
      const sinP = Math.sin(pitch + leanY);
      const y1 = dy * cosP + zFront * sinP;
      const z1 = -dy * sinP + zFront * cosP;
      const cosY = Math.cos(yaw + leanX);
      const sinY = Math.sin(yaw + leanX);
      const origin = {
        x: dx * cosY - z1 * sinY,
        y: y1,
        z: dx * sinY + z1 * cosY,
      };
      const length = Math.hypot(origin.x, origin.y, origin.z) || 1;
      pulse = {
        origin: {
          x: origin.x / length,
          y: origin.y / length,
          z: origin.z / length,
        },
        start: performance.now(),
      };
    }

    function onUp() {
      dragX = null;
    }

    measure();
    draw(performance.now());
    canvas.dataset.ready = "true";

    const resize = new ResizeObserver(() => {
      measure();
      draw(performance.now());
    });
    resize.observe(host);
    const observer = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      last = performance.now();
      schedule();
    });
    observer.observe(host);
    function onVisibility() {
      last = performance.now();
      schedule();
    }
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduced) {
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);
      host.addEventListener("pointerdown", onDown, { passive: true });
      window.addEventListener("pointerup", onUp, { passive: true });
    }
    schedule();

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="v-field" aria-hidden="true" />;
}
