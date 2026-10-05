# Radhika Daithankar's portfolio

A portfolio organised around project stories and a visual work gallery. Chintamani International School is the featured project, supported by an editorial gallery of machine learning and robotics work.

## Run locally

```bash
npm ci
npm run dev
```

Open http://localhost:4517.

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

## Content and structure

The first cream-and-terracotta design has been restored, with the later verified project facts and CIS app previews retained.

- `src/data/site.ts`: identity, contact, experience and education.
- `src/data/projects.ts`: project facts and individual page content.
- `src/components/sections/`: homepage hero, filterable work gallery, visible work experience, about and contact.
- `src/data/journey.ts`: six chapters adapted from Radhika's personal story. Unreleased ideas remain labelled as explorations.
- `src/components/JourneyMap.tsx`: interactive story map with chapter selection, keyboard navigation, reduced-motion support and a native disclosure containing the complete story. The route is schematic, not geographic.
- `src/components/PortfolioMotion.tsx`: brief hero and scroll entrances, pointer movement on the collage, project-filter entrances and reading progress. Motion respects the system preference, cleans up on navigation and never hides the page's content.
- `src/components/CISAppScreens.tsx`: public teacher and parent app previews.
- `src/components/ProjectVisual.tsx`: project visuals and technical concept diagrams.
- `src/app/work/[slug]/page.tsx`: statically generated project pages.
- `src/app/globals.css`: restored layout, responsive styles and interaction states.
- `src/app/opengraph-image.tsx`: social sharing image.

The project gallery uses client state for category filters. Navigation, scrolling and the background disclosure use native browser behavior. Later design explorations remain in `src/components/studio/` and `src/design-archive/`, outside public routes. Files under `docs/` record design evaluations and the [site audit](docs/gap-audit.md).

## Updating project evidence

The shared hero and social positioning lives in `src/data/site.ts`. Contact offers separate routes for hiring teams and Evaradh clients. The story carousel and expanded story both continue to read `src/data/journey.ts`.

In `src/data/projects.ts`, `collection` separates featured work from academic experiments. Category filters apply to both collections; the academic notebooks appear under All work and AI & ML. Public project slugs stay unchanged.

Projects accept optional `year`, `context`, `resultLine` and `media` fields. Roles in `src/data/site.ts` accept an optional `impact` line. Leave unknown values undefined; the UI omits them. Use verified outcomes and include a baseline, period and source when publishing a measured result.

The CIS project's `caseStudy` holds its one-liner, problem, AI explanations, results, privacy information and future plans. Existing build details and screenshots are retained. Comments marked `TODO(...)` identify content awaiting confirmation. Empty strings and undefined optional fields do not create visible sections. Keep drafting notes in comments; the export check rejects visible TODO text.

For a walkthrough, put the clip and a still poster in `public/` and set `media` with `type` of `video` or `gif`, `src`, `poster`, descriptive `alt` text and an optional `caption`. `ProjectMedia.tsx` renders it in the project card and case study. Video sources load on entering the viewport and use muted looping playback, inline playback and native controls. Reduced motion prevents automatic playback; GIFs show their poster and provide explicit play/pause controls.

## Project evidence

Radhika confirmed building both the public Chintamani website and the school management app. Evaradh's public website identifies this app as CIS Compass, its first product, in use at Chintamani. The portfolio includes the company's founder story and direct links to https://evaradh.com/. The featured images capture the teacher and parent app previews published at https://evaradh.com/#work on 28 September 2026. They contain illustrative data, not private student records. The public digital-school page supplies the workflow categories. The app preview images use `next/image`.

The app previews use illustrative data. Technical diagrams are not model outputs. Outcome metrics, private app access and technical-project repositories have not been assumed.

## Production metadata

The production domain is `https://radhikakd.com`, with DNS managed through Cloudflare. Metadata and canonical links default to this origin. Set `NEXT_PUBLIC_SITE_URL` only to override it. Local development still runs at `http://localhost:4517`; setting the metadata domain does not deploy the site or configure DNS.

The custom domain is active. A Cloudflare Bulk Redirect rule forwards the project's Pages address and all deployment subdomains to `https://radhikakd.com`, preserving paths and query strings. Visitors use the custom domain even when they follow an older deployment link.

## Search discovery

The homepage and five project pages include canonical URLs, social metadata and structured data. `src/lib/seo.ts` defines the shared identity and project schema. `/robots.txt` and `/sitemap.xml` are generated during the static build. Design experiments are excluded from indexing.

See [the search launch checklist](docs/search-discovery.md) for domain activation, Search Console and Bing verification, and the profile links needed on Evaradh, CIS and LinkedIn. Search rankings and AI citations are not guaranteed.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS, Fraunces and Manrope via `next/font`. No animation or scroll-control dependencies.

## Cloudflare Pages

The portfolio is deployed as a static export. Build with `npm run build:pages`, which writes the upload to `out/`. The normal `npm run dev` workflow remains available on port 4517.

Deploy from this checkout using your existing Cloudflare login:

```bash
npm run build:pages
npm run check:export
npx wrangler@4.143.0 pages deploy out --project-name radhikakd --branch main --commit-dirty=true
```

This is a direct-upload Pages project. GitHub pushes do not automatically publish it. Run the build and deploy commands after future changes. `public/_headers` sets the generated social image's content type for static hosting.

Both build commands explicitly use Webpack. `check:export` checks the generated portfolio and CV for missing local links, anchors and assets, invalid structured data, missing canonical metadata, sitemap destinations and the PDF download. Run it after building and before uploading either site.

The `www` hostname redirects to the root domain with status 301, preserving paths and query strings. Its proxied DNS record exists only to run the Cloudflare redirect.

## CV subdomain

`https://cv.radhikakd.com/` serves a responsive web CV through a separate static Pages project, `radhikakd-cv`. The portfolio's CV navigation link opens it in a new browser tab. Experience, education, projects and skills are semantic HTML in `cv-site/index.html`. Styles and print rules live in `cv-site/styles.css`; `site.js` adds section highlighting and the print button. Self-hosted fonts match the portfolio. The original PDF remains available as a download.

To update the web CV, edit its HTML content. Print CV prints this current web content; Original PDF downloads the supplied document, which is maintained separately. To update that document, replace `cv-site/Radhika-Daithankar-CV.pdf`, keeping its filename. Publish the CV separately:

```bash
npx wrangler@4.143.0 pages deploy cv-site --project-name radhikakd-cv --branch main --commit-dirty=true
```

The proxied `cv` CNAME points to `radhikakd-cv.pages.dev`. The existing `radhikakd_canonical` Bulk Redirect list also forwards this Pages address and its deployment subdomains to `https://cv.radhikakd.com/`, preserving paths and query strings. The portfolio and CV deployments are independent.

The CV stylesheet and script use versioned URLs. Bump their `v` query value when changing these assets so returning visitors receive the new version. Their cache headers also require revalidation.
