"use client";

import { motion } from "framer-motion";
import { contact, finale, identity } from "@/data/site";
import { EASE } from "@/lib/motion";
import { Lines, Reveal } from "../Reveal";
import { Magnetic } from "../Magnetic";

/** The last page. Quiet, and open. */
export function Finale() {
  const links = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}`, external: false },
    { label: "LinkedIn", value: "linkedin.com/in/radhika-daithankar", href: contact.linkedin, external: true },
    { label: "GitHub", value: "github.com/radhikadaithankar", href: contact.github, external: true },
  ];

  return (
    <section id="contact" className="relative bg-ivory">
      <div className="px-5 pt-32 sm:px-8 md:px-12 md:pt-44">
        <Lines
          as="h2"
          lines={finale.question.split(" ")}
          className="display text-[16vw] text-ink sm:text-[13vw] md:text-[10vw]"
          lineClassName={(i) => (i === 1 ? "display-italic pl-[0.3em] text-brown" : "")}
        />

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <ol className="flex flex-col gap-1">
              {finale.list.map((l, i) => (
                <motion.li
                  key={l}
                  className="font-serif text-3xl leading-tight text-ink md:text-[2.6vw]"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: 0.15 + i * 0.2, duration: 0.8, ease: EASE }}
                >
                  {l}
                </motion.li>
              ))}
            </ol>
            <motion.p
              className="display display-italic mt-10 text-[9vw] text-terracotta sm:text-[8vw] md:text-[4.2vw]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 1, duration: 1 }}
            >
              {finale.maybe}
            </motion.p>
            <motion.p
              className="display mt-6 text-[12vw] tracking-[0.06em] text-ink sm:text-[9vw] md:text-[5vw]"
              initial={{ opacity: 0, letterSpacing: "0.3em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.06em" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 1.4, duration: 1.4, ease: EASE }}
            >
              {finale.name}
            </motion.p>
          </div>

          <div className="md:col-span-6 md:col-start-7 md:pt-4">
            <Reveal delay={0.2}>
              <p className="max-w-md font-serif text-2xl italic leading-snug text-brown md:text-3xl">{finale.invitation}</p>
            </Reveal>
            <ul className="mt-12 flex flex-col">
              {links.map((l, i) => (
                <Reveal key={l.label} delay={0.3 + i * 0.08} y={16}>
                  <li className="border-t border-ink/10 last:border-b">
                    <Magnetic strength={0.12} className="block w-full">
                      <a
                        href={l.href}
                        target={l.external ? "_blank" : undefined}
                        rel={l.external ? "noopener noreferrer" : undefined}
                        className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                        data-cursor="Open"
                      >
                        <span className="eyebrow text-brown/70">{l.label}</span>
                        <span className="relative break-all font-serif text-xl text-ink transition-colors duration-500 group-hover:text-terracotta sm:text-2xl">
                          {l.value}
                          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-terracotta transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
                        </span>
                      </a>
                    </Magnetic>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <footer className="mt-32 flex flex-col gap-4 border-t border-ink/10 py-8 text-xs text-brown/70 sm:flex-row sm:items-center sm:justify-between md:mt-44">
          <p className="font-serif text-base tracking-[0.18em] text-ink">{identity.firstName.toUpperCase()}</p>
          <p>
            {identity.fullName} · {identity.location} · {new Date().getFullYear()}
          </p>
          <p className="font-serif italic">This is the beginning.</p>
        </footer>
      </div>
    </section>
  );
}
