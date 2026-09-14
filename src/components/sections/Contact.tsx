"use client";

import { contact, contactCopy, identity } from "@/data/site";
import { Lines, Reveal } from "../Reveal";
import { Magnetic } from "../Magnetic";
import { SectionMark } from "../SectionMark";
import { useScrollTo } from "../SmoothScroll";

/** Section 06. Email, LinkedIn, GitHub. */
export function Contact() {
  const scrollTo = useScrollTo();
  const links = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}`, external: false },
    { label: "LinkedIn", value: "linkedin.com/in/radhika-daithankar", href: contact.linkedin, external: true },
    { label: "GitHub", value: "github.com/radhikadaithankar", href: contact.github, external: true },
  ];

  return (
    <section id="contact" className="relative bg-ivory">
      <div className="px-5 pt-32 sm:px-8 md:px-12 md:pt-44">
        <SectionMark number="06" title="Contact" />
        <div className="mt-10 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <Lines
              as="h2"
              lines={contactCopy.title}
              className="display text-[16vw] text-ink sm:text-[13vw] md:text-[9vw]"
              lineClassName={(i) => (i === 1 ? "display-italic pl-[0.3em] text-terracotta" : "")}
            />
            <Reveal className="mt-10" delay={0.2}>
              <p className="measure font-serif text-xl leading-relaxed text-brown md:text-2xl">{contactCopy.line}</p>
            </Reveal>
          </div>

          <div className="md:col-span-5 md:col-start-8 md:pt-4">
            <ul className="flex flex-col">
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
            <Reveal className="mt-10" delay={0.5}>
              <dl className="grid grid-cols-2 gap-6 text-sm text-brown">
                <div>
                  <dt className="eyebrow text-brown/70">Based in</dt>
                  <dd className="mt-2 font-serif text-lg text-ink">{identity.location}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-brown/70">Currently</dt>
                  <dd className="mt-2 font-serif text-lg text-ink">{identity.currentRole}</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>

        <footer className="mt-32 flex flex-col gap-4 border-t border-ink/10 py-8 text-xs text-brown/70 sm:flex-row sm:items-center sm:justify-between md:mt-44">
          <p className="font-serif text-base tracking-[0.18em] text-ink">{identity.firstName.toUpperCase()}</p>
          <p>
            {identity.fullName} · {identity.location} · {new Date().getFullYear()}
          </p>
          <button onClick={() => scrollTo("#top")} className="eyebrow text-left text-brown/70 transition-colors hover:text-terracotta">
            Back to top ↑
          </button>
        </footer>
      </div>
    </section>
  );
}
