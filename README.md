# Radhika Daithankar — personal site

A personal portfolio for Radhika Daithankar: AI engineer, Managing Director at CIS in Pune, and founder of the early-stage company Evaradh. One scrolling page: Projects, Experience, Skills, Evaradh, About, Contact. Copy is short and factual; all facts come from the resume.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- [framer-motion](https://www.framer.com/motion/) for scroll-driven and in-view animation
- [lenis](https://github.com/darkroomengineering/lenis) for smooth wheel scrolling (disabled on touch and for `prefers-reduced-motion`)
- `next/font` with Fraunces (editorial serif) and Manrope (sans)

## Run it locally

```bash
npm install
npm run dev
```

The dev server binds to **http://localhost:4517**.

Other scripts:

```bash
npm run lint    # eslint
npm run build   # production build
npm run start   # serve the production build on port 4517
```

## Editing content

Every fact, sentence and link lives in `src/data/site.ts`. The section components only lay that data out.

## Adding the portraits

Two image slots ship with a warm sunlit-paper placeholder. Drop files at:

| Slot | Path | Suggested crop |
| --- | --- | --- |
| Hero | `public/images/portrait.jpg` | Portrait, roughly 4:5 |
| About | `public/images/portrait-founder.jpg` | 3:4 or 4:5 |

The page checks whether each file exists when it renders. In `npm run dev` add the file and reload; after `npm run build`, rebuild to pick up a new photo.

## Structure

```
src/
  app/            layout (fonts, metadata), page (section order), global styles
  data/site.ts    all content
  components/     Nav, Cursor, SmoothScroll, Portrait, motion primitives
  components/sections/
                  Hero, Projects, Experience, Skills,
                  Evaradh, About, Contact
```

## Interaction

- First screen is the hero: name, role, fact strip. No opening overlay.
- Projects follows the CV: school platform first, then four technical projects. Each has a title, a short paragraph of resume facts, and tools.
- Skill categories open on hover/tap.
- Custom cursor, magnetic nav and smooth scroll on desktop; touch and `prefers-reduced-motion` get simpler motion.
- Animations use transforms and opacity only.
