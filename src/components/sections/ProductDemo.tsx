"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { platform } from "@/data/site";
import { EASE, useCalmMotion } from "@/lib/motion";

type FactId = "qr" | "radius" | "notify";
const QR_LIFETIME = 15;

/**
 * The platform's three technical facts, made touchable. Hovering or tapping a
 * fact switches what the device on the right is doing.
 */
export function ProductDemo() {
  const [active, setActive] = useState<FactId>("qr");
  const [replay, setReplay] = useState(0);
  const { touch } = useCalmMotion();

  const select = (id: FactId) => {
    setActive(id);
    setReplay((r) => r + 1);
  };

  return (
    <div className="grid gap-12 md:grid-cols-12 md:items-center">
      <div className="md:col-span-6 lg:col-span-5">
        <ul className="flex flex-col">
          {platform.facts.map((f) => {
            const on = active === f.id;
            return (
              <li key={f.id} className="border-t border-ink/10 last:border-b">
                <button
                  className="group flex w-full flex-col items-start gap-1 py-5 text-left sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  onMouseEnter={() => !touch && setActive(f.id as FactId)}
                  onClick={() => select(f.id as FactId)}
                  onFocus={() => setActive(f.id as FactId)}
                  aria-pressed={on}
                  data-cursor={on ? "Replay" : "Show"}
                >
                  <span className={`display text-[13vw] transition-colors duration-500 sm:text-[9vw] md:text-[5.2vw] ${on ? "text-terracotta" : "text-ink/40 group-hover:text-ink"}`}>
                    {f.big}
                  </span>
                  <span className={`eyebrow transition-colors duration-500 sm:shrink-0 ${on ? "text-ink" : "text-ink/40"}`}>{f.label}</span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.p
                      className="measure overflow-hidden pb-6 font-serif text-lg leading-relaxed text-brown"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                    >
                      {f.text}
                    </motion.p>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex justify-center md:col-span-6 lg:col-span-7 lg:justify-end">
        <Device active={active} replay={replay} />
      </div>
    </div>
  );
}

function Device({ active, replay }: { active: FactId; replay: number }) {
  return (
    <div className="relative">
      {/* Shadow print behind the device, like a photograph laid slightly off */}
      <div className="absolute -left-6 -top-6 hidden h-full w-full bg-sand/70 sm:block" aria-hidden />
      <div className="relative w-[min(88vw,320px)] overflow-hidden rounded-[2rem] border border-ink/15 bg-cream shadow-[0_30px_80px_-40px_rgba(58,42,36,0.5)]">
        <div className="flex items-center justify-between px-6 pt-5">
          <span className="font-serif text-sm text-ink">08:42</span>
          <span className="h-1.5 w-12 rounded-full bg-ink/15" />
          <span className="eyebrow !text-[0.55rem] text-ink/60">Teacher</span>
        </div>
        <div className="relative h-[520px] px-6 pb-6 pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="absolute inset-0 px-6 pb-6 pt-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {active === "qr" && <QRView key={replay} />}
              {active === "radius" && <RadiusView key={replay} />}
              {active === "notify" && <NotifyView key={replay} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ---------- 15 SEC: a QR code that will not sit still ---------- */

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SIZE = 21;
function isFinder(x: number, y: number) {
  const inBox = (bx: number, by: number) => x >= bx && x < bx + 7 && y >= by && y < by + 7;
  return inBox(0, 0) || inBox(SIZE - 7, 0) || inBox(0, SIZE - 7);
}
function finderOn(x: number, y: number) {
  const local = (bx: number, by: number) => {
    const lx = x - bx;
    const ly = y - by;
    if (lx < 0 || lx > 6 || ly < 0 || ly > 6) return null;
    const ring = lx === 0 || lx === 6 || ly === 0 || ly === 6;
    const core = lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4;
    return ring || core;
  };
  return local(0, 0) ?? local(SIZE - 7, 0) ?? local(0, SIZE - 7) ?? false;
}

/** Remounted (via key) whenever the visitor asks for a replay, so state resets naturally. */
function QRView() {
  // Deterministic first seed so server and client render the same code; it rotates after mount.
  const [seed, setSeed] = useState(20250915);
  const [cycle, setCycle] = useState(0);
  const { reduced } = useCalmMotion();

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeed(Math.floor(Math.random() * 1e9));
      setCycle((c) => c + 1);
    }, QR_LIFETIME * 1000);
    return () => window.clearInterval(id);
  }, []);

  const cells = useMemo(() => {
    const rnd = mulberry32(seed);
    const out: { x: number; y: number }[] = [];
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        if (isFinder(x, y)) {
          if (finderOn(x, y)) out.push({ x, y });
        } else if (rnd() > 0.52) {
          out.push({ x, y });
        }
      }
    }
    return out;
  }, [seed]);

  const r = 22;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="flex h-full flex-col">
      <p className="eyebrow text-ink/60">Morning register</p>
      <p className="mt-1 font-serif text-xl text-ink">Show this code to the class</p>
      <div className="mt-6 flex flex-1 items-center justify-center">
        <div className="relative rounded-2xl bg-ivory p-4 shadow-inner">
          <AnimatePresence mode="popLayout">
            <motion.svg
              key={seed}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="h-44 w-44"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.35 }}
              aria-label="Attendance QR code, regenerated every fifteen seconds"
            >
              {cells.map((c) => (
                <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width={1} height={1} fill="#2a1e1a" />
              ))}
            </motion.svg>
          </AnimatePresence>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <svg viewBox="0 0 52 52" className="h-12 w-12 -rotate-90" aria-hidden>
          <circle cx="26" cy="26" r={r} fill="none" stroke="#2a1e1a" strokeOpacity="0.1" strokeWidth="2" />
          <motion.circle
            key={cycle}
            cx="26"
            cy="26"
            r={r}
            fill="none"
            stroke="#b2624a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: circumference }}
            transition={{ duration: reduced ? 0 : QR_LIFETIME, ease: "linear" }}
          />
        </svg>
        <div>
          <p className="font-serif text-lg text-ink">Refreshes every 15 seconds</p>
          <p className="text-xs text-ink/60">Old codes stop working immediately.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- 100 M: the campus boundary appears ---------- */

function RadiusView() {
  return (
    <div className="flex h-full flex-col">
      <p className="eyebrow text-ink/60">Location check</p>
      <p className="mt-1 font-serif text-xl text-ink">Inside the campus radius</p>
      <div className="mt-6 flex-1 overflow-hidden rounded-2xl bg-sand/60">
        <svg viewBox="0 0 260 300" className="h-full w-full" aria-label="Map showing a hundred-metre boundary around the campus">
          {/* Blocks and roads, warm and abstract */}
          <g fill="#e9dcc8">
            <rect x="12" y="20" width="70" height="52" rx="4" />
            <rect x="100" y="14" width="60" height="40" rx="4" />
            <rect x="178" y="26" width="70" height="60" rx="4" />
            <rect x="10" y="96" width="54" height="70" rx="4" />
            <rect x="186" y="110" width="62" height="54" rx="4" />
            <rect x="14" y="190" width="80" height="60" rx="4" />
            <rect x="120" y="216" width="56" height="70" rx="4" />
            <rect x="196" y="190" width="54" height="90" rx="4" />
          </g>
          <g stroke="#f7f2ea" strokeWidth="6" strokeLinecap="round" fill="none">
            <path d="M0 84 H260" />
            <path d="M0 178 H260" />
            <path d="M88 0 V300" />
            <path d="M172 0 V300" />
          </g>
          {/* Campus */}
          <rect x="100" y="98" width="62" height="70" rx="6" fill="#d9b8a1" />
          <text x="131" y="138" textAnchor="middle" fontSize="9" fill="#3a2a24" fontFamily="var(--font-manrope)" letterSpacing="1.5">
            CAMPUS
          </text>
          <motion.g>
            <motion.circle
              cx="131"
              cy="133"
              r="100"
              fill="#b2624a"
              fillOpacity="0.12"
              stroke="#b2624a"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
              style={{ originX: "131px", originY: "133px" }}
            />
            <motion.line x1="131" y1="133" x2="231" y2="133" stroke="#6e4d3c" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 0.6 }} />
            <motion.text x="181" y="126" textAnchor="middle" fontSize="10" fill="#6e4d3c" fontFamily="var(--font-fraunces)" fontStyle="italic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
              100 m
            </motion.text>
            {/* Teacher, inside */}
            <motion.g initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.8, duration: 0.6 }} style={{ originX: "160px", originY: "180px" }}>
              <circle cx="160" cy="180" r="12" fill="#b2624a" fillOpacity="0.25">
                <animate attributeName="r" values="8;16;8" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="160" cy="180" r="5" fill="#b2624a" />
            </motion.g>
          </motion.g>
        </svg>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="font-serif text-lg text-ink">Attendance can be submitted</p>
          <p className="text-xs text-ink/60">Outside the boundary, the button disappears.</p>
        </div>
        <span className="h-2.5 w-2.5 rounded-full bg-terracotta" />
      </div>
    </div>
  );
}

/* ---------- REAL TIME: a parent hears about it now ---------- */

function NotifyView() {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const t1 = window.setTimeout(() => setStage(1), 700);
    const t2 = window.setTimeout(() => setStage(2), 1900);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow text-ink/60">Parent</p>
          <p className="mt-1 font-serif text-xl text-ink">Today</p>
        </div>
        <motion.span
          className="eyebrow !text-[0.55rem] rounded-full border border-terracotta/40 px-3 py-1 text-terracotta"
          animate={{ opacity: stage >= 1 ? 1 : 0.35 }}
        >
          {stage >= 1 ? "Live" : "Waiting"}
        </motion.span>
      </div>

      <div className="relative mt-6 flex-1">
        <AnimatePresence>
          {stage >= 2 && (
            <motion.div
              key="n2"
              className="absolute inset-x-0 top-0 rounded-2xl border border-terracotta/30 bg-ivory p-4 shadow-[0_18px_40px_-24px_rgba(178,98,74,0.6)]"
              initial={{ y: -40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE }}
              layout
            >
              <p className="eyebrow !text-[0.55rem] text-terracotta">Just now</p>
              <p className="mt-1 font-serif text-base text-ink">Attendance recorded: present.</p>
              <p className="mt-1 text-xs text-ink/60">Marked at 08:42, first period.</p>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div className="absolute inset-x-0 rounded-2xl bg-ivory/70 p-4" animate={{ top: stage >= 2 ? 104 : 0 }} transition={{ duration: 0.7, ease: EASE }}>
          <p className="eyebrow !text-[0.55rem] text-ink/50">Yesterday</p>
          <p className="mt-1 font-serif text-base text-ink">Parent–teacher slot confirmed.</p>
          <p className="mt-1 text-xs text-ink/60">Thursday, 15:30 with the class teacher.</p>
        </motion.div>
        <motion.div className="absolute inset-x-0 rounded-2xl bg-ivory/50 p-4" animate={{ top: stage >= 2 ? 208 : 104 }} transition={{ duration: 0.7, ease: EASE }}>
          <p className="eyebrow !text-[0.55rem] text-ink/50">Monday</p>
          <p className="mt-1 font-serif text-base text-ink">Fee receipt available.</p>
          <p className="mt-1 text-xs text-ink/60">Term fees updated in student records.</p>
        </motion.div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <motion.span className="relative flex h-3 w-3" animate={{ opacity: stage >= 1 ? 1 : 0.4 }}>
          <span className="absolute inset-0 rounded-full bg-terracotta/40" style={{ animation: stage >= 1 ? "ping 1.6s cubic-bezier(0,0,.2,1) infinite" : undefined }} />
          <span className="relative h-3 w-3 rounded-full bg-terracotta" />
        </motion.span>
        <p className="text-xs text-ink/60">
          {stage < 1 && "Teacher is submitting the register…"}
          {stage === 1 && "Register submitted. Notifying parents…"}
          {stage >= 2 && "Delivered the moment it happened."}
        </p>
      </div>
    </div>
  );
}
