import fs from "node:fs";
import path from "node:path";
import { portraits } from "@/data/site";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Evaradh } from "@/components/sections/Evaradh";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

/** Checked on the server so a missing photo never produces a 404 in the browser. */
function hasPublicFile(publicPath: string) {
  return fs.existsSync(path.join(process.cwd(), "public", publicPath));
}

export default function Home() {
  const heroPortrait = hasPublicFile(portraits.hero);
  const aboutPortrait = hasPublicFile(portraits.founder);

  return (
    <SmoothScroll>
      <ScrollProgress />
      <Cursor />
      <div className="page-grain grain" aria-hidden />
      <Nav />
      <main className="relative z-10">
        <Hero hasPortrait={heroPortrait} />
        <Projects />
        <Experience />
        <Skills />
        <Evaradh />
        <About hasPortrait={aboutPortrait} />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
