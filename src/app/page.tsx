import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { StructuredData } from "@/components/StructuredData";
import { profileStructuredData } from "@/lib/seo";
import { PortfolioMotion } from "@/components/PortfolioMotion";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <StructuredData data={profileStructuredData()} />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <PortfolioMotion />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Projects />
        <Experience />
        <About />
        <Contact />
      </main>
    </>
  );
}
