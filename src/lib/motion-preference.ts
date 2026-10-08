"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion() {
  return window.matchMedia(query).matches;
}

export function subscribeMotion(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function useReducedMotion() {
  // Server HTML is static. Optional motion starts after hydration.
  return useSyncExternalStore(
    subscribeMotion,
    prefersReducedMotion,
    () => true,
  );
}
