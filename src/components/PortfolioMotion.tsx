"use client";

import { useEffect, useRef } from "react";

const revealTargets = [
  ".work-heading",
  ".project-card",
  ".notebook-heading",
  ".notebook-card",
  ".experience-intro",
  ".experience-role",
  ".story-intro",
  "#journey-start",
  ".story-afterword",
  ".contact-main",
].join(", ");

/** All content renders normally; motion is a cancellable enhancement. */
export function PortfolioMotion() {
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 851px)",
    );
    const seen = new WeakSet<Element>();
    let introPlayed = false;
    let dispose = () => {};

    function configure() {
      dispose();
      dispose = () => {};
      if (reduceMotion.matches) return;
      const animations = new Set<Animation>();
      const cleanups: (() => void)[] = [];
      function enter(element: Element, delay = 0, distance = 24) {
        const animation = element.animate(
          [{ translate: `0 ${distance}px` }, { translate: "0 0" }],
          {
            duration: 850,
            delay,
            easing: "cubic-bezier(.16,1,.3,1)",
            fill: "backwards",
          },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }

      if (!introPlayed) {
        introPlayed = true;
        document
          .querySelectorAll(".hero-intro > *, .hero-board > :not(.board-orbit)")
          .forEach((element, index) => {
            const box = element.getBoundingClientRect();
            if (box.bottom > 0 && box.top < window.innerHeight)
              enter(element, Math.min(index * 55, 400), 32);
          });
      }

      const observer = new IntersectionObserver(
        (entries) => {
          let order = 0;
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            observer.unobserve(entry.target);
            seen.add(entry.target);
            // Keep focused elements and content above the viewport stable.
            if (
              entry.target.contains(document.activeElement) ||
              entry.boundingClientRect.top < 0
            )
              continue;
            enter(entry.target, Math.min(order++ * 75, 225));
          }
        },
        { threshold: 0.06 },
      );

      function observe(element: Element, newlyAdded = false) {
        if (seen.has(element)) return;
        const box = element.getBoundingClientRect();
        if (box.top >= window.innerHeight) observer.observe(element);
        else {
          seen.add(element);
          if (newlyAdded && box.bottom > 0) enter(element, 0, 16);
        }
      }
      document
        .querySelectorAll(revealTargets)
        .forEach((element) => observe(element));

      // Filters replace project cards; only newly mounted cards need observing.
      const grid = document.querySelector(".project-grid");
      const gridObserver = new MutationObserver((records) => {
        for (const record of records) {
          record.removedNodes.forEach((node) => {
            if (node instanceof Element) observer.unobserve(node);
          });
          record.addedNodes.forEach((node) => {
            if (node instanceof Element && node.matches(".project-card"))
              observe(node, true);
          });
        }
      });
      if (grid) gridObserver.observe(grid, { childList: true });

      const bar = progress.current;
      let scrollFrame = 0;
      let scrollRange = 1;
      function updateProgress() {
        scrollFrame = 0;
        if (bar)
          bar.style.transform = `scaleX(${Math.max(0, Math.min(1, window.scrollY / scrollRange))})`;
      }
      function scheduleProgress() {
        if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);
      }
      function measurePage() {
        scrollRange = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight,
        );
        scheduleProgress();
      }
      const resizeObserver = new ResizeObserver(measurePage);
      resizeObserver.observe(document.body);
      window.addEventListener("scroll", scheduleProgress, { passive: true });
      window.addEventListener("resize", measurePage, { passive: true });
      measurePage();

      const board = document.querySelector<HTMLElement>(".hero-board");
      if (board && finePointer.matches) {
        let pointerFrame = 0;
        let x = 0;
        let y = 0;
        function move(event: PointerEvent) {
          if (event.pointerType !== "mouse" || !board) return;
          const box = board.getBoundingClientRect();
          x = Math.max(
            -1,
            Math.min(1, ((event.clientX - box.left) / box.width) * 2 - 1),
          );
          y = Math.max(
            -1,
            Math.min(1, ((event.clientY - box.top) / box.height) * 2 - 1),
          );
          if (!pointerFrame)
            pointerFrame = requestAnimationFrame(() => {
              board.style.setProperty("--board-x", `${x * 10}px`);
              board.style.setProperty("--board-y", `${y * 8}px`);
              pointerFrame = 0;
            });
        }
        function reset() {
          cancelAnimationFrame(pointerFrame);
          pointerFrame = 0;
          board?.style.removeProperty("--board-x");
          board?.style.removeProperty("--board-y");
        }
        board.addEventListener("pointermove", move, { passive: true });
        board.addEventListener("pointerleave", reset);
        board.addEventListener("pointercancel", reset);
        cleanups.push(() => {
          board.removeEventListener("pointermove", move);
          board.removeEventListener("pointerleave", reset);
          board.removeEventListener("pointercancel", reset);
          reset();
        });
      }

      dispose = () => {
        observer.disconnect();
        gridObserver.disconnect();
        resizeObserver.disconnect();
        animations.forEach((animation) => animation.cancel());
        cancelAnimationFrame(scrollFrame);
        window.removeEventListener("scroll", scheduleProgress);
        window.removeEventListener("resize", measurePage);
        if (bar) bar.style.removeProperty("transform");
        cleanups.forEach((cleanup) => cleanup());
      };
    }

    configure();
    reduceMotion.addEventListener("change", configure);
    finePointer.addEventListener("change", configure);
    return () => {
      dispose();
      reduceMotion.removeEventListener("change", configure);
      finePointer.removeEventListener("change", configure);
    };
  }, []);

  return <div ref={progress} className="reading-progress" aria-hidden="true" />;
}
