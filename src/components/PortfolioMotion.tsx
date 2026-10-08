"use client";

import { useEffect, useRef } from "react";
import { motion } from "@/lib/motion";
import { useReducedMotion } from "@/lib/motion-preference";

const revealTargets = [
  ".work-heading",
  ".collection-heading",
  ".project-card",
  ".notebook-heading",
  ".notebook-card",
  ".experience-intro",
  ".experience-role",
  ".story-intro",
  "#journey-start",
  "[data-story-chapter]",
  ".story-afterword",
  ".contact-main",
].join(", ");

/** Content stays readable before JavaScript and when any enhancement is cancelled. */
export function PortfolioMotion() {
  const progress = useRef<HTMLDivElement>(null);
  const seen = useRef(new WeakSet<Element>());
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const animations = new Set<Animation>();
    function enter(element: Element, delay = 0) {
      const animation = element.animate(
        [
          { opacity: 0, translate: `0 ${motion.rise}px` },
          { opacity: 1, translate: "0 0" },
        ],
        {
          duration: motion.duration.reveal,
          delay,
          easing: motion.ease,
          fill: "backwards",
        },
      );
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (seen.current.has(entry.target)) continue;
          seen.current.add(entry.target);
          if (
            entry.target.contains(document.activeElement) ||
            entry.boundingClientRect.top < 0
          )
            continue;
          enter(
            entry.target,
            Math.min(order++ * motion.stagger, motion.maxStagger),
          );
        }
      },
      { threshold: 0.06 },
    );

    function observe(element: Element, newlyAdded = false) {
      if (seen.current.has(element)) return;
      const box = element.getBoundingClientRect();
      if (
        !newlyAdded &&
        box.height > 0 &&
        box.top < innerHeight &&
        box.bottom > 0
      ) {
        // Never hide above-the-fold text or delay its paint.
        seen.current.add(element);
      } else observer.observe(element);
    }
    document
      .querySelectorAll(revealTargets)
      .forEach((element) => observe(element));
    const grid = document.querySelector(".work-collections");
    const gridObserver = new MutationObserver((records) => {
      for (const record of records) {
        record.removedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          observer.unobserve(node);
          node
            .querySelectorAll(revealTargets)
            .forEach((el) => observer.unobserve(el));
        });
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(revealTargets)) observe(node, true);
          node
            .querySelectorAll(revealTargets)
            .forEach((el) => observe(el, true));
        });
      }
    });
    if (grid) gridObserver.observe(grid, { childList: true, subtree: true });

    const bar = progress.current;
    const story = document.querySelector<HTMLElement>("[data-story-map]");
    const landscape = document.querySelector<SVGElement>(
      "[data-story-parallax]",
    );
    const storyBar = document.querySelector<HTMLElement>(
      ".story-scroll-progress span",
    );
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let range = 1;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    function update() {
      frame = 0;
      if (bar) bar.style.transform = `scaleX(${clamp(scrollY / range)})`;
      if (!story) return;
      const rect = story.getBoundingClientRect();
      const position = clamp(
        (innerHeight - rect.top) / (innerHeight + rect.height),
      );
      if (storyBar) storyBar.style.transform = `scaleX(${position})`;
      if (landscape)
        landscape.style.translate = fine.matches
          ? `0 ${(position - 0.5) * motion.parallax}px`
          : "none";
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    function measure() {
      range = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      schedule();
    }
    const resize = new ResizeObserver(measure);
    resize.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    fine.addEventListener("change", schedule);
    measure();
    return () => {
      observer.disconnect();
      gridObserver.disconnect();
      resize.disconnect();
      animations.forEach((animation) => animation.cancel());
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      fine.removeEventListener("change", schedule);
      bar?.style.removeProperty("transform");
      landscape?.style.removeProperty("translate");
      storyBar?.style.removeProperty("transform");
    };
  }, [reduced]);

  return <div ref={progress} className="reading-progress" aria-hidden="true" />;
}
