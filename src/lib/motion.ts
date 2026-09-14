"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
