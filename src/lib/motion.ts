"use client";

import { useEffect, useState } from "react";
import { useReducedMotion, useTransform, type MotionValue } from "framer-motion";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Maps scroll progress (0..1) to values. framer-motion may hand these ranges to the
 * browser as WAAPI keyframe offsets on a ScrollTimeline, which requires offsets to be
 * clamped to 0..1, non-decreasing, and to span the full range; otherwise the browser
 * adds implicit keyframes at the element's underlying value and things fade back in.
 */
export function useProgress<T extends string | number>(progress: MotionValue<number>, input: number[], output: T[]) {
  const inp: number[] = [];
  const out: T[] = [];
  let prev = 0;
  input.forEach((v, i) => {
    const c = Math.min(1, Math.max(0, v, prev));
    prev = c;
    inp.push(c);
    out.push(output[i]);
  });
  if (inp[0] > 0) {
    inp.unshift(0);
    out.unshift(out[0]);
  }
  if (inp[inp.length - 1] < 1) {
    inp.push(1);
    out.push(out[out.length - 1]);
  }
  return useTransform(progress, inp, out);
}

/** True on touch-first devices; used to simplify motion on phones and tablets. */
export function useIsTouch() {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return touch;
}

/** Combined signal: the visitor either asked for less motion or is on touch. */
export function useCalmMotion() {
  const reduced = useReducedMotion();
  const touch = useIsTouch();
  return { reduced: !!reduced, touch, calm: !!reduced || touch };
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/** Which page section is currently in the middle of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join("|");
  useEffect(() => {
    const list = key.split("|").filter(Boolean);
    const els = list.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit?.target.id) setActive(hit.target.id);
      },
      { rootMargin: "-28% 0px -55% 0px", threshold: [0, 0.15, 0.4, 0.7] },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [key]);
  return active;
}
