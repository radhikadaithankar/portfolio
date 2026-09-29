# Portfolio audit and revision

28 September 2026. Scope: the local portfolio, its public project references, visual design, content, accessibility and implementation.

The previous version looked considered at a glance, but did not establish professional credibility. Its strongest work was buried among experiments. Decoration and generic copy occupied space that should have explained the work and Radhika's contribution.

## Findings and changes

| Area | Problem in the previous version | Revision |
| --- | --- | --- |
| Positioning | "Ideas, made useful" could describe almost any creative practitioner. The full name and discipline were small. | Named masthead, direct AI engineering and product development positioning, and a short introduction tied to CIS. |
| Art direction | Rotated cards, repeated asterisks, a curiosity sticker and pastel illustrations made the page feel like a template. | A restrained forest and paper palette, aligned layouts, a consistent spacing system, and fewer decorative elements. |
| Typography | Some paragraph text was 9px. Small labels and oversized italic headings created an uneven hierarchy. | Larger body text and controls, stronger sans-serif display type, and serif headings used selectively. Small type remains only in supporting captions and the screenshot's decorative browser frame. |
| Project hierarchy | Four technical experiments received large visual cards and nearly equal emphasis with a substantial school product. | One featured professional project, followed by a compact index of technical work. No invented client work or impact metrics. |
| Evidence | Every visual was an illustration. No public project could be inspected. | Actual capture and live link for Chintamani International School, supplied by the user. |
| Personal contribution | Visitors could not tell what Radhika had built. | The user explicitly confirmed building both the public website and school management app. This contribution is stated on the homepage and project page. |
| Project narrative | Repeated summaries and generic explanations of ML concepts did not demonstrate implementation. | The school project distinguishes public website, operational app, role-specific workflows and documented attendance rules. Technical pages use descriptive titles and retain the available implementation facts. |
| Navigation | Category filters added interaction to a five-project collection without making the strongest work easier to find. Three links per card led to the same destination. | Server-rendered, directly linked project index. One meaningful interactive overview on the school page. |
| Accessibility | Tiny controls, redundant link stops and ornamental detail made the experience harder to scan. | Minimum 44px primary navigation and text-link targets, visible focus, skip links, reduced-motion support, and properly labelled role tabs with arrow, Home and End key support. |
| Maintainability | Old cursor, scroll, portrait, skills, experience and animation components remained after the first redesign. Project facts were duplicated. | Removed 12 unreachable component/helper files, removed framer-motion and lenis, and kept separate sources for biography and project content. |
| Client JavaScript | The entire project collection was a client component solely for filtering. | The homepage project collection now renders on the server. Only the school workflow explorer needs application client state. |
| Images | Illustrative mockups could be mistaken for product evidence. | Next.js optimises a real 1440 × 1000 website capture. Technical visuals are labelled concept diagrams. The app workflow is explicitly an overview, not an app screenshot. |
| Sharing | Text metadata and a generic favicon were insufficient for sharing the portfolio. | Custom identity icon, social image, page-specific descriptions, and configurable production metadata origin. |

## Sources and boundaries

- [Chintamani website](https://chintamani-school.org/) was inspected in a browser on 28 September 2026. The screenshot in `public/images/chintamani-website.png` is a capture of its public homepage.
- [Digital-school overview](https://chintamani-school.org/digital-school) supports the parent, teacher and administration workflow descriptions. No private portal was accessed.
- Radhika confirmed in this chat that she built both the website and management app.
- The attendance QR refresh interval, campus radius and notification behaviour come from the original portfolio content. They are implementation rules, not measured impact.
- The live public school website is verified. Evaradh's public site describes CIS Compass as its first product, in use at Chintamani. No authenticated app session or independent usage measurement was performed.
- Academic/technical project content remains based on the original repository. No results, repositories, clients, testimonials, team sizes or dates have been fabricated.

## Validation

- Production build and TypeScript checks pass. Homepage, all five project pages, custom icon and social image prerender successfully.
- ESLint passes.
- Browser overflow checks pass at widths of 320, 390, 768, 1024 and 1440px; the school project also passes at 320px.
- Browser checks pass for next-project navigation, return to work, experience disclosure, skip-link focus and role-tab mouse/keyboard interaction.
- Automated accessibility scans report zero violations on the homepage, school page and image-classification page. Some checks require manual review; automated results are not a full accessibility certification.
- All five project routes and the social image return HTTP 200. An unknown project returns HTTP 404.
- No page runtime errors were observed. Development hot-reload messages are not production errors.

## Evidence still worth adding

These are content gaps, not problems a visual redesign can honestly solve.

1. Real, redacted management-app screenshots or a public demo. The current app view is an explanatory diagram, clearly labelled.
2. The school project's dates, stack, team context, constraints and specific engineering decisions. The user's contribution is confirmed, but those details are not yet available.
3. Verified outcomes: active users, time saved, adoption, reliability or feedback, only where evidence exists.
4. For the technical studies: repositories, training setup, evaluation methods, results and the limitations of each experiment. A GAN description alone is not evidence of a strong generative-model project.
5. A confirmed production portfolio URL. Set `NEXT_PUBLIC_SITE_URL` before deployment outside Vercel. Vercel's production hostname is used automatically when available.

The revised visual system gives the work a more professional presentation. The largest remaining credibility gains depend on this evidence.

## Evaradh source update

Radhika supplied [Evaradh's website](https://evaradh.com/), inspected on 28 September 2026. It identifies the company as a technology product company and CIS Compass as its first product, in use at Chintamani International School. The outdated pre-product label was removed. The portfolio now links to Evaradh from the founder section and hero, and to its [product section](https://evaradh.com/#work) from the school project. This establishes the company/product/school relationship without presenting Evaradh as a separate client engagement.

## Artistic direction revision — 28 September 2026

The user found the restrained revision too basic. The new composition uses oversized serif identity typography, original copper-and-silver sculptural artwork, a charcoal project gallery, staggered technical studies, and a copper Evaradh feature. The real school screenshot and sourced project claims remain intact.

Validation: final production build and ESLint passed; no horizontal overflow at 320, 390, and 768px; desktop at 1440px visually reviewed. The homepage and school case study returned zero automated axe violations after the footer contrast correction. Automated contrast checks left SVG labels and decorative characters for manual review; this is not an accessibility certification. The school workflow's ambiguous labelled div was given a group role. Arrow-key tab navigation selected and focused Teachers and updated its content. Responsive artwork loaded through Next Image. See `art-direction.md` for the generated artwork prompt and provenance.


## Motion revision — 28 September 2026

The user clarified that creative means animation and interaction, and requested removal of the artwork. Removed the sculpture, its served asset, preload, and caption. Added masked name entrances, an accessible discipline switcher with real project links, viewport reveals, pointer-responsive project previews, hover/focus feedback, and a native-scroll progress indicator. This supersedes the sculptural art direction above. See `art-direction.md` for current behavior and validation.
