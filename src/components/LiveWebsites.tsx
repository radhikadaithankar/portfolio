import { company, school } from "@/data/site";

const websites = [
  {
    name: "Chintamani",
    fullName: school.name,
    url: school.url,
    domain: "chintamani-school.org",
  },
  {
    name: company.name,
    fullName: company.name,
    url: company.url,
    domain: "evaradh.com",
  },
];

export function LiveWebsites() {
  return (
    <div className="live-websites">
      <p className="eyebrow">Visit the live websites</p>
      <div className="live-website-grid">
        {websites.map((website) => (
          <a
            key={website.url}
            href={website.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${website.fullName}'s website (opens in a new tab)`}
          >
            <span>
              <strong>{website.name}</strong>
              <small>{website.domain}</small>
            </span>
            <span className="live-website-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
