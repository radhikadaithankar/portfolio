"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { identity, nav } from "@/data/site";
import { EASE } from "@/lib/motion";
import { useScrollTo } from "./SmoothScroll";
import { Magnetic } from "./Magnetic";

/** Floating editorial nav. Retreats on scroll down, returns on scroll up. */
export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const scrollTo = useScrollTo();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 120 && !menu);
    setScrolled(latest > 40);
  });

  useEffect(() => {
    if (!menu) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", close);
    };
  }, [menu]);

  const go = (href: string) => {
    setMenu(false);
    window.setTimeout(() => scrollTo(href), menu ? 350 : 0);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between px-5 py-5 sm:px-8 md:px-12"
        animate={{ y: hidden ? -96 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <button
          onClick={() => go("#top")}
          className={`font-serif text-lg tracking-[0.18em] transition-colors duration-500 ${menu ? "text-ivory" : "text-ink"}`}
          aria-label="Back to top"
        >
          {identity.firstName.toUpperCase()}
        </button>

        <nav
          className={`hidden items-center gap-1 rounded-full px-2 py-1 transition-all duration-500 md:flex ${
            scrolled ? "bg-ivory/70 shadow-[0_1px_0_rgba(42,30,26,0.08)] backdrop-blur-md" : ""
          }`}
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Magnetic key={item.href} strength={0.2}>
              <button
                onClick={() => go(item.href)}
                className="eyebrow group relative px-4 py-2 text-ink/80 transition-colors hover:text-terracotta"
              >
                {item.label}
                <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-terracotta transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
              </button>
            </Magnetic>
          ))}
        </nav>

        <button
          onClick={() => setMenu((m) => !m)}
          className={`eyebrow flex items-center gap-3 md:hidden ${menu ? "text-ivory" : "text-ink"}`}
          aria-expanded={menu}
          aria-controls="mobile-menu"
        >
          {menu ? "Close" : "Menu"}
          <span className="relative block h-3 w-6">
            <motion.span className="absolute left-0 top-0 block h-px w-full bg-current" animate={{ rotate: menu ? 45 : 0, y: menu ? 6 : 0 }} />
            <motion.span className="absolute bottom-0 left-0 block h-px w-full bg-current" animate={{ rotate: menu ? -45 : 0, y: menu ? -6 : 0 }} />
          </span>
        </button>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[65] flex flex-col justify-between bg-chocolate px-6 pb-10 pt-28 text-ivory"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="grain absolute inset-0 overflow-hidden opacity-60" />
            <ul className="relative flex flex-col gap-2">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.7, ease: EASE }}
                >
                  <button onClick={() => go(item.href)} className="display flex items-baseline gap-4 py-2 text-[15vw] leading-[0.95] text-ivory sm:text-[11vw]">
                    <span className="eyebrow text-peach/70">0{i + 1}</span>
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.p
              className="relative measure font-serif text-lg italic text-sand/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {identity.supportingLine}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
