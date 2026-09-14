import fs from "node:fs";
import path from "node:path";
import { portraits } from "@/data/site";
import { Cursor } from "@/components/Cursor";
import { Intro } from "@/components/Intro";
import { Nav } from "@/components/Nav";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Hero } from "@/components/sections/Hero";
import { Person } from "@/components/sections/Person";
import { Built } from "@/components/sections/Built";
import { Notebook } from "@/components/sections/Notebook";
import { Builder } from "@/components/sections/Builder";
import { Journey } from "@/components/sections/Journey";
import { Toolbox } from "@/components/sections/Toolbox";
import { Shift } from "@/components/sections/Shift";
import { Evaradh } from "@/components/sections/Evaradh";
import { Founder } from "@/components/sections/Founder";
import { Thinking } from "@/components/sections/Thinking";
import { Finale } from "@/components/sections/Finale";

/** Checked on the server so a missing photo never produces a 404 in the browser. */
function hasPublicFile(publicPath: string) {
  return fs.existsSync(path.join(process.cwd(), "public", publicPath));
}

export default function Home() {
  const heroPortrait = hasPublicFile(portraits.hero);
  const founderPortrait = hasPublicFile(portraits.founder);

  return (
    <SmoothScroll>
      <Intro />
      <Cursor />
      <div className="page-grain grain" aria-hidden />
      <Nav />
      <main>
        <Hero hasPortrait={heroPortrait} />
        <Person />
        <Built />
        <Notebook />
        <Builder />
        <Journey />
        <Toolbox />
        <Shift />
        <Evaradh />
        <Founder hasPortrait={founderPortrait} />
        <Thinking />
        <Finale />
      </main>
    </SmoothScroll>
  );
}
