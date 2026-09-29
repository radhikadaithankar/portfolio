# Portfolio and CV audit

Audited on 29 September 2026. The scope covers this portfolio repository, its web CV and their Cloudflare hosting. It does not cover the CIS Compass app implementation.

## Gaps fixed

- Small mobile navigation and filter targets. Increased their height to 44 pixels, improved small-screen text and wrapping, and retained the project count for screen readers.
- Low CV text contrast. Adjusted muted text and section numbers. The contact strip now has a semantic navigation landmark.
- Hard-to-see focus rings on burgundy panels. These now use the light background color for contrast.
- Stale CV project descriptions. Added the confirmed school AI assistant behavior and the public GAN implementation details and repository link.
- Ambiguous PDF version. The download is labelled Original PDF. Print CV produces the current web content and remains available on narrow screens.
- Public alternate design route. Preserved its source in `src/design-archive`, outside the app routes.
- Failing default production build. Both build scripts now explicitly use the verified Webpack build path.
- Hard-coded gallery counts and singular grammar. Counts now derive from project data and show “1 project” when filtered to one item.
- Missing `www` hostname. Added a proxied redirect-only DNS record and an exact-host Cloudflare 301 rule to the root domain, preserving the requested path and query.
- No deployment artifact check. Added `npm run check:export` to validate both sites' generated local links, anchors, assets, canonical metadata, JSON-LD, sitemap destinations and PDF signature.
- Stale styles for returning CV visitors. Versioned the stylesheet and script URLs and required revalidation for these un-hashed assets.

## Verification

- Lint and static production build.
- Export validation across ten HTML files, including missing-page files.
- Automated accessibility checks on the homepage, all five project pages and web CV. No reported violations after fixes. Some decorative visuals require manual contrast review; an automated pass is not an accessibility certification.
- Mobile navigation and filter sizing, category filtering, keyboard disclosure behavior and horizontal overflow checks.
- CV print button, PDF rendering and original PDF download signature.
- Production dependency audit reported zero known vulnerabilities at the time of the check.
- Authoritative and public DNS resolution for `www`, plus certificate-validated HTTPS and HTTP redirects preserving a project path and query string.
- Live deployments returned 200 for all six portfolio content pages, the CV, robots, sitemap and original PDF. Retired designs and unknown paths returned 404. Deployment hostnames still redirected to the custom domains.
- A returning browser received the revised CV stylesheet after URL versioning: 16-pixel contact text, 44-pixel targets and zero automated accessibility violations. The local DNS resolver still cached the earlier missing `www` result while public DNS resolved correctly.

## Content and external limits

The original PDF is intentionally preserved and can differ from the updated web CV. Project metrics, screenshots of private app sessions and repositories that have not been supplied are not invented. The portfolio describes the assistant's intended homework behavior from Radhika's account; it does not claim that the actual assistant has been safety-tested in this audit.

Search Console is verified and has accepted the sitemaps and homepage indexing request. Google still controls crawling, indexing and ranking. See `search-discovery.md` for the verified status and remaining external profile work.
