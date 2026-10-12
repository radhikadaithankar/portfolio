import { company, contact, school } from "@/data/site";
import { JourneyMap } from "@/components/JourneyMap";

const interests = ["Dancing", "Cooking", "Travel", "Design"];

export function About() {
  return (
    <section
      id="about"
      className="story-section shell"
      aria-labelledby="story-title"
    >
      <div className="story-intro">
        <div>
          <p className="eyebrow">03 / The person behind the work</p>
          <h2 id="story-title">
            Everything
            <br />
            <em>can evolve.</em>
          </h2>
        </div>
        <div className="story-intro-copy">
          <p>
            I&apos;m Radhika Daithankar, an AI engineer, founder of Evaradh and
            Managing Director at CIS. The route here had a few unexpected turns.
          </p>
          <p>
            A computer science classroom. A move to London. Bakery and
            restaurant shifts. A school back home. Each gave me a different
            reason to build.
          </p>
          <a href="#journey-start" className="story-start-link">
            Follow the thread <span aria-hidden="true">↘</span>
          </a>
        </div>
      </div>
      <div id="journey-start" className="story-map-anchor">
        <JourneyMap />
      </div>
      <div className="story-afterword">
        <div className="story-personal">
          <p className="eyebrow">Away from the keyboard</p>
          <h3>
            There&apos;s more than
            <br />
            one version of me.
          </h3>
          <p>
            I love dancing. I also like cooking, trying new recipes, travelling
            and design. A day can take me from a machine learning problem to a
            school poster, then into the kitchen to try something new.
          </p>
          <ul className="story-interests" aria-label="Interests">
            {interests.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </div>
        <div className="story-elsewhere">
          <p className="eyebrow">Find me elsewhere</p>
          <nav
            className="profile-links"
            aria-label="Related websites and profiles"
          >
            <a href={company.url} target="_blank" rel="noopener noreferrer">
              <span>
                Evaradh<small>Company I founded</small>
              </span>
              <span aria-hidden="true">↗</span>
            </a>
            <a href={school.url} target="_blank" rel="noopener noreferrer">
              <span>
                Chintamani International School
                <small>Managing Director · Parbhani</small>
              </span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="me noopener noreferrer"
            >
              <span>
                LinkedIn<small>My professional profile</small>
              </span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="me noopener noreferrer"
            >
              <span>
                GitHub<small>Notebooks and code</small>
              </span>
              <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
