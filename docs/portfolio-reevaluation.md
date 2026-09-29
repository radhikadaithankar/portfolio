# Current direction: a portfolio of work

The user identified the sidebar revision as too close to a CV. The latest homepage therefore removes the persistent profile, career facts, experience/education disclosure, and filterable text index.

The opening screen is a featured CIS Compass project with public app previews, a case-study link and an explicit contribution credit. The next section explains the problem, what Radhika built and the publicly stated product status. Four visual project covers lead into the machine-learning and robotics studies. Each thumbnail is labelled as a concept diagram, not a model result or project photograph. A short bio follows the work and points to LinkedIn for career background.

Validation: production build and ESLint passed. The desktop homepage axe scan reported zero violations, with SVG labels left for manual contrast review. At 320px there is no horizontal overflow, both app images load, and all five project links are present. The Teacher/Parent controls respond to clicks and arrow keys. The DOM contains no profile sidebar or career disclosure.

---

# Previous evaluation, superseded

# Portfolio reevaluation

## What was not working

The previous homepage used most of a 1440 × 1000 opening viewport for a name, two short paragraphs and a second typographic panel. The first project image was below the fold. The alternative previews changed palette and typography but kept a landing-page format. Motion was visible, but did little to explain the work. Supporting text was small compared with the headlines.

## New direction

The homepage now places a compact profile beside a project gallery. The initial desktop viewport includes the CIS Compass app previews. A shorter introduction explains Radhika's work. The profile, primary navigation and contact links stay beside the content on desktop, and collapse into a compact header on phones.

The CIS role switch changes both the highlighted phone screen and the explanation of its workflow. On mobile, app images precede the detailed role copy. The previews remain sourced from Evaradh and explicitly use illustrative data. No private app access or generated imagery is implied.

Technical projects use a filterable index. This presents their subject and implementation before asking the visitor to open a study. Evaradh is introduced beside the shipped product. Experience and education remain available through a disclosure rather than dominating the page.

Case pages now share the homepage's neutral palette, sans-serif type and controls. The original school website screenshot and rejected decorative artwork are not rendered on the homepage.

## Technical choices

Content renders on the server. Client state is limited to the role switch, project filter and active navigation. The research index receives only the fields it displays. Navigation updates are limited to one animation frame per scroll event. All event listeners are removed on unmount. Native scrolling remains intact. Reduced-motion preferences disable the animated transitions.

## Checks

Reviewed the desktop and mobile layouts in the browser. At 320px and 390px the homepage has no horizontal overflow, and both app previews load. The school case study also fits at 320px and loads both app previews. Switching to Parent updates the story and foreground image; arrow keys preserve focus and change the selected tab. The Robotics filter displays exactly the two robotics studies. Reduced-motion mode reports zero running animations. The mobile homepage axe scan reports zero violations, with decorative characters and image-caption overlaps flagged for manual review; the visual phone captions were subsequently hidden because the image alt text and role controls already identify them.

These checks validate the implementation. Visual preference still needs Radhika's judgment; a reference site would help narrow future design decisions.
