"use client";

import { contact, identity } from "@/data/site";
import { Lines, Reveal } from "../Reveal";
import { Magnetic } from "../Magnetic";
import { SectionMark } from "../SectionMark";
import { useScrollTo } from "../SmoothScroll";

export function Contact() {
  const scrollTo = useScrollTo();
  const links = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}`, external: false },
    { label: "LinkedIn", value: "linkedin.com/in/radhika-daithankar", href: contact.linkedin, external: true },
    { label: "GitHub", value: "github.com/radhikadaithankar", href: contact.github, external: true },
  ];

  return (
    <section id="contact" className="relative bg-ivory">
      <div className="pad pt-28 md:pt-40">
        <SectionMark number="06" title="Contact" />
        <div className="mt-8 grid gap-12 md:grid-cols-12 md:items-end">
          <Lines
            as="h2"
            lines={["CONTACT."]}
            className="display text-[15vw] text-ink sm:text-[11vw] md:col-span-6 md:text-[7.5vw]"
          />
          <ul className="flex flex-col md:col-span-5 md:col-start-8">
            {links.map((l, i) => (
              <Reveal key={l.label} delay={0.12 + i * 0.06} y={16}>
                <li className="border-t border-ink/10 last:border-b">
                  <Magnetic strength={0.1} className="block w-full">
                    <a
                      href={l.href}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noopener noreferrer" : undefined}
                      className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                      data-cursor="Open"
                    >
                      <span className="eyebrow text-brown/70">{l.label}</span>
                      <span className="relative break-all font-serif text-lg text-ink transition-colors duration-500 group-hover:text-terracotta sm:text-xl">
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

        <footer className="mt-20 flex flex-col gap-4 border-t border-ink/10 py-8 text-xs text-brown/70 sm:flex-row sm:items-center sm:justify-between md:mt-28">
          <p className="font-serif text-base tracking-[0.22em] text-ink">{identity.firstName.toUpperCase()}</p>
          <p>
            {identity.fullName} · {identity.location} · {new Date().getFullYear()}
          </p>
          <button onClick={() => scrollTo("#top")} className="eyebrow text-left text-brown/70 transition-colors hover:text-terracotta">
            Top ↑
          </button>
        </footer>
      </div>
    </section>
  );
}
