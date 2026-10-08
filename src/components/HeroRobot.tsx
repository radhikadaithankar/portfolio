"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion-preference";
import { RobotArmFallback } from "./RobotArmFallback";

const RobotArmScene = dynamic(() => import("./RobotArmScene"), {
  ssr: false,
  loading: () => null,
});

export function HeroRobot() {
  const host = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = host.current;
    if (!element || reduced) return;
    let visible = false;
    let idle = 0;
    let frame = 0;
    function sync() {
      const running = visible && !document.hidden;
      setActive(running);
      if (!running) return;
      frame = requestAnimationFrame(() => {
        if ("requestIdleCallback" in window)
          idle = window.requestIdleCallback(() => setLoaded(true));
        else setLoaded(true);
      });
    }
    const observer = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      sync();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      cancelAnimationFrame(frame);
      if (idle) window.cancelIdleCallback(idle);
    };
  }, [reduced]);

  return (
    <div
      className="hero-board robot-board"
      aria-hidden="true"
      ref={host}
      data-scene-status={loaded && !reduced ? "live" : "static"}
    >
      <span className="board-orbit orbit-one" />
      <span className="board-orbit orbit-two" />
      <div className="robot-stage" data-ready={ready && !reduced}>
        <RobotArmFallback />
        {loaded && !reduced && (
          <RobotArmScene active={active} onReady={() => setReady(true)} />
        )}
      </div>
      <span className="board-foot">
        SOFTWARE / MACHINE LEARNING / ROBOTICS<span>↗</span>
      </span>
    </div>
  );
}
