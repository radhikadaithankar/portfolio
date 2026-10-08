"use client";

import dynamic from "next/dynamic";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "@/lib/motion-preference";
import { RobotArmFallback } from "./RobotArmFallback";

const RobotArmScene = dynamic(() => import("./RobotArmScene"), {
  ssr: false,
  loading: () => null,
});

class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function deviceAllowsScene() {
  const device = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  return (
    window.matchMedia("(min-width: 900px)").matches &&
    (device.hardwareConcurrency || 8) > 4 &&
    (device.deviceMemory ?? 8) > 4 &&
    !device.connection?.saveData
  );
}

function hasWebGL() {
  try {
    const gl = document
      .createElement("canvas")
      .getContext("webgl2", { failIfMajorPerformanceCaveat: true });
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function HeroRobot() {
  const host = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);
  const handleFailure = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const element = host.current;
    if (!element || reduced || failed) return;
    let visible = false;
    let idle: number | undefined;
    let frame = 0;
    let cancelled = false;
    let capable: boolean | undefined;
    function cancelPending() {
      cancelAnimationFrame(frame);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      frame = 0;
      idle = undefined;
    }
    function sync() {
      cancelPending();
      const suitable = deviceAllowsScene();
      const running = suitable && visible && !document.hidden;
      setActive(running);
      if (!suitable) {
        setEnabled(false);
        setReady(false);
      }
      if (!running) return;
      // Wait through a paint, then ask for genuinely idle time. No import on mobile.
      frame = requestAnimationFrame(() => {
        function load() {
          if (cancelled || document.hidden || !visible) return;
          capable ??= hasWebGL();
          if (capable) setEnabled(true);
          else setFailed(true);
        }
        if ("requestIdleCallback" in window)
          idle = window.requestIdleCallback(load);
        else frame = requestAnimationFrame(load);
      });
    }
    const observer = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      sync();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("resize", sync, { passive: true });
    return () => {
      cancelled = true;
      cancelPending();
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", sync);
    };
  }, [reduced, failed]);

  const live = enabled && !reduced && !failed;
  return (
    <div
      className="hero-board robot-board"
      aria-hidden="true"
      ref={host}
      data-scene-status={
        failed ? "unavailable" : live ? (ready ? "live" : "loading") : "static"
      }
      data-rendering={live && active}
    >
      <span className="board-orbit orbit-one" />
      <span className="board-orbit orbit-two" />
      <div className="robot-stage" data-ready={ready && live}>
        <RobotArmFallback />
        {live && (
          <SceneBoundary onFailure={handleFailure}>
            <RobotArmScene
              active={active}
              onReady={handleReady}
              onFailure={handleFailure}
            />
          </SceneBoundary>
        )}
      </div>
      <span className="board-foot">
        SOFTWARE / MACHINE LEARNING / ROBOTICS<span>↗</span>
      </span>
    </div>
  );
}
