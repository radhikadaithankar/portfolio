# Search and AI discovery

The portfolio is prepared for search engines and AI tools that retrieve public web pages. This does not guarantee indexing, rankings, a knowledge panel, or citations in AI answers. Google says its normal SEO requirements also apply to AI Overviews and AI Mode. No special AI file or schema is required. [Google's guidance](https://developers.google.com/search/docs/appearance/ai-features)

## Implemented

- Full name in the homepage title, main heading, biography and project page titles.
- Descriptions, canonical URLs and social sharing metadata for the homepage and five project pages.
- Public content in the exported HTML, available without running JavaScript.
- A `ProfilePage` and `Person` graph identifying Radhika Daithankar. LinkedIn and GitHub identify her personal profiles. Evaradh and CIS are separate organizations linked through her roles.
- Project authorship and breadcrumbs in structured data, using confirmed facts.
- Visible links to Evaradh, Chintamani International School and LinkedIn.
- `/robots.txt` allows crawling and references `/sitemap.xml`. The sitemap contains only the six public content pages.
- Design experiments and the missing-page response marked `noindex`.
- Optional Google and Bing verification metadata supported at build time.

The site uses `https://radhikakd.com` as its canonical origin. The Cloudflare Pages address is a deployment address, not a second preferred identity.

## Domain activation completed

On 29 September 2026, the following DNS record was saved in Cloudflare and the Pages custom domain became active:

| Field | Value |
| --- | --- |
| Type | CNAME |
| Name | `@` |
| Target | `radhikakd.pages.dev` |
| Proxy | Proxied |
| TTL | Auto |

Cloudflare reports domain verification and certificate validation active. HTTPS returned the portfolio successfully. Some local DNS resolvers initially retained the earlier missing-domain response while public and authoritative DNS already resolved correctly.

The account-level Bulk Redirect rule `Portfolio on radhikakd.com only` uses the list `radhikakd_canonical`. It redirects `radhikakd.pages.dev/` and all its subdomains to `https://radhikakd.com/` with status 301, preserving paths and query strings. The production Pages address and an older deployment address were both verified to redirect. Keep this rule enabled after future deployments.

## Google Search Console connected

On 29 September 2026, the Domain property `sc-domain:radhikakd.com` was verified in Radhika's Google account using a Cloudflare TXT record at the domain root. Keep the `google-site-verification` TXT record in DNS; it maintains ownership verification for the portfolio and its subdomains. Google was not granted access to the Cloudflare account.

Both submitted sitemaps were read successfully by Google:

| Sitemap | Status | Discovered pages |
| --- | --- | --- |
| `https://radhikakd.com/sitemap.xml` | Success | 6 |
| `https://cv.radhikakd.com/sitemap.xml` | Success | 1 |

The first homepage URL Inspection reported **Discovered – currently not indexed**, with **Last crawl: N/A**. This is Google's actual indexing status, not an inference from a `site:` search. Public checks returned HTTP 200, crawl permission in robots.txt, `index, follow` metadata, a matching canonical URL and content in the initial HTML. No technical indexing block was found in those checks. Sitemap discovery does not mean the pages are already indexed.

Google's live homepage test then returned **URL is available to Google**, **Page can be indexed** and **Profile page: 1 valid item detected**. The homepage indexing request was accepted with **Indexing requested** and the confirmation that the URL was added to a priority crawl queue. This confirms submission, not completed indexing or a guaranteed ranking. Repeated requests do not move a URL up the queue. Search Console's aggregate reports initially said to check again in a day or so; crawling and indexing can take longer.

## Search engine setup reference

1. In Google Search Console, add the Domain property `radhikakd.com`. Add the verification TXT record Google supplies to Cloudflare DNS, then verify. Keep that record. [Ownership verification](https://support.google.com/webmasters/answer/9008080?hl=en)
2. Submit `https://radhikakd.com/sitemap.xml` in the Sitemaps report. Use URL Inspection on the homepage to test the live page and request indexing. Submission is a discovery request, not a ranking guarantee. [Sitemaps report](https://support.google.com/webmasters/answer/7451001?hl=en)
3. Add and verify `https://radhikakd.com/` in Bing Webmaster Tools, then submit the same sitemap. [Bing verification](https://www2.bing.com/webmasters/help/add-and-verify-site-12184f8b), [Bing sitemaps](https://www2.bing.com/webmasters/help/sitemaps-3b5cf6ed)
4. Check indexing reports after processing. Resolve crawl errors, blocked requests or canonical problems before making content changes to chase rankings.

If using HTML meta verification instead of DNS, set `GOOGLE_SITE_VERIFICATION` or `BING_SITE_VERIFICATION` to the exact content value issued by the provider. These are public verification values, not passwords. Supply them to the local build, run `npm run build:pages`, and redeploy. This direct-upload project does not rebuild when a dashboard environment variable changes. Google Domain properties still require DNS verification.

Keep search crawlers able to retrieve the site without a login or browser challenge. If Cloudflare blocks a specific crawler, review its bot controls using the provider's verified crawler guidance. Do not disable security globally.

## Connect the other three destinations

Each site must make its relationship to Radhika explicit. These changes have not been made by this portfolio update. Use the same full-name spelling throughout.

### Evaradh

Add or update a visible founder biography with a link on Radhika's name:

> Evaradh was founded by Radhika Daithankar, an AI engineer who builds software and machine learning projects. She independently built CIS Compass, Evaradh's school management app, and the Chintamani International School website.

Link “Radhika Daithankar” to `https://radhikakd.com/`. If Evaradh publishes Organization structured data, its `founder` can identify her using `https://radhikakd.com/#person`, her full name and portfolio URL. Keep the biography visible on the page.

### Chintamani International School

Add or update a leadership biography with a portfolio link:

> Radhika Daithankar is Managing Director at Chintamani International School in Parbhani. She leads technology initiatives for the school and independently built its website and CIS Compass school management app under Evaradh.

Link her name to `https://radhikakd.com/` and Evaradh to `https://evaradh.com/`. Keep school identity and address consistent. The school is an organization associated with Radhika, not an alternative personal profile.

### LinkedIn

Add `https://radhikakd.com/` to your website contact information and Featured section. Keep Evaradh and CIS roles accurate and enable public visibility for the information you want searchable. Do not put private contact details on the portfolio solely for search visibility.

## Maintain and measure

Publish meaningful project updates when there is new work or evidence. Keep titles, dates and roles accurate. Add real outcomes only when supported. Avoid repeated keywords, invented reviews or hidden text written for AI tools.

Track impressions and clicks for “Radhika Daithankar” in Search Console and Bing. Review whether the intended canonical pages are indexed. Search results vary by query, location and engine; the portfolio cannot force Google to display Evaradh, LinkedIn and CIS together.

The Google verification and sitemap submissions above were completed separately from portfolio deployment. Bing setup, LinkedIn edits and changes to Evaradh or CIS have not been made as part of this portfolio work.
