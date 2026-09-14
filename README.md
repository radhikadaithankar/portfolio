# Radhika Daithankar — personal site

A personal portfolio for Radhika Daithankar: AI engineer and technology leader, Managing Director at CIS in Pune, and founder of the early-stage technology company Evaradh. The site is a single scrolling page with six plain-spoken sections: Work, Experience, Skills, Evaradh, About and Contact. Every headline says something specific; all facts come from the resume.

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

Every fact, sentence and link lives in one file: `src/data/site.ts`. The hero headline and facts, the platform case study, the four projects, roles, education, skill categories, the Evaradh copy, the About paragraphs and the contact links are all plain data there; the section components only lay them out.

## Adding the portraits

Two image slots ship with a warm sunlit-paper placeholder. To use real photographs, drop files at these paths (the paths are configurable in `portraits` inside `src/data/site.ts`):

| Slot | Path | Suggested crop |
| --- | --- | --- |
| Hero (right of the name on desktop) | `public/images/portrait.jpg` | Portrait, roughly 4:5 |
| About section | `public/images/portrait-founder.jpg` | 3:4 or 4:5 |

The page checks whether each file exists when it renders, so no code change is needed. In `npm run dev` just add the file and reload; the production build is prerendered, so run `npm run build` again after adding a photo.

## Structure

```
src/
  app/            layout (fonts, metadata), page (section order), global styles
  data/site.ts    all content
  components/     Nav, Cursor, SmoothScroll, Portrait, motion primitives
  components/sections/
                  Hero, Work (+ ProductDemo, Motifs), Experience, Skills,
                  Evaradh, About, Contact
```

## Interaction

- The first screen is the hero: name, role, a short bio and a fact strip. Nothing is hidden behind an opening overlay.
- Interactive walkthrough of the three attendance features in the platform case study (QR refresh, campus radius, parent notification).
- Skill categories open on hover/tap and lay their tools out on the right.
- Custom cursor, magnetic nav and smooth scroll on desktop only; touch devices and `prefers-reduced-motion` get simpler, non-pinned versions.
- Animations use transforms and opacity only.
