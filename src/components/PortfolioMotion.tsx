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

/** Italic heading words wipe in from the left. */
const wipeTargets = "main h2 em";
/** Groups whose children enter one after another. */
const cascadeTargets = ".toolkit ul, .education-list";

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

    function track(animation: Animation) {
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    }
    function wipe(element: Element) {
      track(
        element.animate(
          [
            { clipPath: "inset(-20% 100% -30% -5%)", translate: "-0.12em 0" },
            { clipPath: "inset(-20% -10% -30% -5%)", translate: "0 0" },
          ],
          {
            duration: motion.duration.reveal * 1.4,
            delay: motion.duration.standard,
            easing: motion.ease,
            fill: "backwards",
          },
        ),
      );
    }
    function cascade(group: Element) {
      [...group.children].forEach((child, index) =>
        track(
          child.animate(
            [
              { opacity: 0, scale: "0.86", translate: "0 8px" },
              { opacity: 1, scale: "1", translate: "0 0" },
            ],
            {
              duration: motion.duration.reveal,
              delay: motion.duration.fast + index * 45,
              easing: motion.ease,
              fill: "backwards",
            },
          ),
        ),
      );
    }
    function inView(element: Element) {
      const box = element.getBoundingClientRect();
      return box.height > 0 && box.top < innerHeight && box.bottom > 0;
    }
    const extras = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          extras.unobserve(entry.target);
          if (entry.boundingClientRect.top < 0) continue;
          if (entry.target.matches(wipeTargets)) wipe(entry.target);
          else cascade(entry.target);
        }
      },
      { threshold: 0.2 },
    );
    document
      .querySelectorAll(`${wipeTargets}, ${cascadeTargets}`)
      .forEach((element) => {
        if (!inView(element)) extras.observe(element);
      });

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
    const timeline = document.querySelector<HTMLElement>(".experience-list");
    const phones = document.querySelector<HTMLElement>(
      ".featured-project .cis-app-screens",
    );
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let range = 1;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    function update() {
      frame = 0;
      if (bar) bar.style.transform = `scaleX(${clamp(scrollY / range)})`;
      if (phones) {
        // 1 while the phones enter from below, 0 once they reach mid-screen.
        const rect = phones.getBoundingClientRect();
        const centre = rect.top + rect.height / 2;
        const turn = clamp((centre - innerHeight * 0.5) / (innerHeight * 0.5));
        phones.style.setProperty("--phone-turn", turn.toFixed(3));
      }
      if (timeline) {
        const rect = timeline.getBoundingClientRect();
        const filled = clamp((innerHeight * 0.6 - rect.top) / rect.height);
        timeline.style.setProperty("--timeline", filled.toFixed(4));
      }
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
    // Primary buttons lean a few pixels toward a precise pointer.
    const magnets = [
      ...document.querySelectorAll<HTMLElement>(".button, .nav-contact"),
    ];
    function pull(event: PointerEvent) {
      if (!fine.matches) return;
      const target = event.currentTarget as HTMLElement;
      const box = target.getBoundingClientRect();
      const x = (event.clientX - box.left - box.width / 2) / box.width;
      const y = (event.clientY - box.top - box.height / 2) / box.height;
      target.style.translate = `${(x * 8).toFixed(1)}px ${(y * 6).toFixed(1)}px`;
    }
    function release(event: PointerEvent) {
      (event.currentTarget as HTMLElement).style.removeProperty("translate");
    }
    magnets.forEach((magnet) => {
      magnet.addEventListener("pointermove", pull);
      magnet.addEventListener("pointerleave", release);
    });
    measure();
    return () => {
      magnets.forEach((magnet) => {
        magnet.removeEventListener("pointermove", pull);
        magnet.removeEventListener("pointerleave", release);
        magnet.style.removeProperty("translate");
      });
      phones?.style.removeProperty("--phone-turn");
      observer.disconnect();
      extras.disconnect();
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
      timeline?.style.removeProperty("--timeline");
    };
  }, [reduced]);

  return <div ref={progress} className="reading-progress" aria-hidden="true" />;
}
