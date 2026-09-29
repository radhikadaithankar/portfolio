import { Arrow } from "./Arrow";
import { CISAppScreens } from "./CISAppScreens";

export function SchoolShowcase({ priority = false }: { priority?: boolean }) {
  return (
    <figure className="school-showcase app-showcase" data-reveal>
      <div className="app-showcase-stage">
        <div className="app-showcase-copy">
          <p className="eyebrow">Evaradh / First product</p>
          <h2>
            CIS
            <br />
            <em>Compass.</em>
          </h2>
          <p>
            The school day,
            <br />
            in one place.
          </p>
          <a
            className="text-link"
            href="https://evaradh.com/#work"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore the app <Arrow diagonal />
          </a>
        </div>
        <CISAppScreens priority={priority} />
      </div>
      <figcaption>
        <span>CIS Compass · Teacher & parent app</span>
        <span>Public product previews from Evaradh · Illustrative data</span>
      </figcaption>
    </figure>
  );
}
