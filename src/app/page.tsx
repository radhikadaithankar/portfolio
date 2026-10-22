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
import { Stats } from "@/components/Stats";
import { notebooks, projects } from "@/data/projects";
import { education, roles } from "@/data/site";

const stats = [
  {
    value: projects.length,
    label: "Projects built",
    note: "Independently, from product to robotics",
  },
  {
    value: roles.length,
    label: "Roles",
    note: "Across data, software and school leadership",
  },
  {
    value: notebooks.length,
    label: "Public notebooks",
    note: "Open code you can read and run",
  },
  {
    value: education.length,
    label: "Degrees",
    note: "B.Tech and an MSc in Artificial Intelligence",
  },
];

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
        <Stats stats={stats} />
        <Projects />
        <Experience />
        <About />
        <Contact />
      </main>
    </>
  );
}
