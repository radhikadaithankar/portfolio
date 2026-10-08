"use client";

import { useSyncExternalStore } from "react";

const key = "portfolio-motion-v1";
const query = "(prefers-reduced-motion: reduce)";
type Choice = "reduce" | "full" | null;
let choice: Choice | undefined;
let systemPreference: MediaQueryList;
const system = () => (systemPreference ??= window.matchMedia(query));
const listeners = new Set<() => void>();

function readChoice(): Choice {
  try {
    const stored = localStorage.getItem(key);
    return stored === "reduce" || stored === "full" ? stored : null;
  } catch {
    return null;
  }
}

export function prefersReducedMotion() {
  if (choice === undefined) choice = readChoice();
  return choice === "reduce" || (choice !== "full" && system().matches);
}

function notify() {
  document.documentElement.dataset.motion = prefersReducedMotion()
    ? "reduce"
    : "full";
  listeners.forEach((listener) => listener());
}

function storageChanged(event: StorageEvent) {
  if (event.key !== key && event.key !== null) return;
  choice = readChoice();
  notify();
}

export function subscribeMotion(callback: () => void) {
  const media = system();
  if (!listeners.size) {
    if (choice === undefined) choice = readChoice();
    media.addEventListener("change", notify);
    window.addEventListener("storage", storageChanged);
  }
  listeners.add(callback);
  notify();
  return () => {
    listeners.delete(callback);
    if (!listeners.size) {
      media.removeEventListener("change", notify);
      window.removeEventListener("storage", storageChanged);
    }
  };
}

export function setReducedMotion(reduced: boolean) {
  choice = reduced ? "reduce" : "full";
  try {
    localStorage.setItem(key, choice);
  } catch {
    /* The choice still works for this visit. */
  }
  notify();
}

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    prefersReducedMotion,
    () => true,
  );
}
