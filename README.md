# Radhika Daithankar — personal site

An editorial, art-directed personal website for Radhika Daithankar: an AI-focused technology builder, Managing Director at CIS, and founder-in-progress of Evaradh. It is written as a single scrolling story ("I build what I wish existed.") rather than a résumé, with scroll-driven typography, an interactive product chapter, and a quiet finale.

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

Every fact, sentence and link lives in one file: `src/data/site.ts`. Roles, projects, education, toolbox categories, the Evaradh manifesto and the contact links are all plain data there; the section components only lay them out.

## Adding the portraits

Two editorial image slots ship with a warm sunlit-paper placeholder. To use real photographs, drop files at these paths (the paths are configurable in `portraits` inside `src/data/site.ts`):

| Slot | Path | Suggested crop |
| --- | --- | --- |
| Hero (right side, bleeds off the viewport) | `public/images/portrait.jpg` | Tall, roughly 3:5, subject off-centre |
| Founder chapter | `public/images/portrait-founder.jpg` | 3:4 or 4:5 |

The page checks whether each file exists when it renders, so no code change is needed. In `npm run dev` just add the file and reload; the production build is prerendered, so run `npm run build` again after adding a photo.

## Structure

```
src/
  app/            layout (fonts, metadata), page (section order), global styles
  data/site.ts    all content
  components/     Intro, Nav, Cursor, SmoothScroll, Portrait, motion primitives
  components/sections/
                  Hero, Person, Built (+ ProductDemo, Motifs), Notebook, Builder,
                  Journey, Toolbox, Shift, Evaradh, Founder, Thinking, Finale
```

## Motion and accessibility

- Animations use transforms and opacity only.
- `prefers-reduced-motion` and touch devices get simplified, non-pinned versions of the scroll sequences, and the custom cursor and smooth scroll are turned off.
- The opening intro lasts about two seconds and can be skipped with a click, key press, wheel or touch.
