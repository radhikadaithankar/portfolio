import { company, contact, identity } from "@/data/site";
import { MotionToggle } from "../MotionToggle";

const loop = ["Let's talk", "Let's build", "Something useful"];

export function Contact() {
  return (
    <section id="contact" className="v-contact">
      <div className="v-contact-marquee" aria-hidden="true">
        <div className="discipline-track">
          {[0, 1].map((copy) => (
            <span key={copy}>
              {[...loop, ...loop].map((item, index) => (
                <span key={index}>
                  {item}
                  <i>✳</i>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="shell">
        <div className="v-contact-card">
          <p className="eyebrow">Start a conversation</p>
          <h2>
            Have something <em>in mind?</em>
          </h2>
          <div className="v-contact-routes">
            <div>
              <p>Hiring for AI or data roles?</p>
              <div className="v-contact-actions">
                <a className="pill pill-dark" href={`mailto:${contact.email}`}>
                  Email me <span aria-hidden="true">→</span>
                </a>
                <a
                  className="pill pill-ghost"
                  href="https://cv.radhikakd.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View my CV <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <div>
              <p>Want Compass for your school, or a custom build?</p>
              <div className="v-contact-actions">
                <a
                  className="pill pill-ghost"
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Talk to Evaradh <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
          <a className="v-contact-email" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </div>

        <footer className="site-footer">
          <span>
            © {new Date().getFullYear()} {identity.fullName}
          </span>
          <div>
            <a
              className="contact-social"
              href={contact.github}
              target="_blank"
              rel="me noopener noreferrer"
            >
              GitHub ↗
            </a>
            <a
              className="contact-social"
              href={contact.linkedin}
              target="_blank"
              rel="me noopener noreferrer"
            >
              LinkedIn ↗
            </a>
            <a href="#top">Back to top ↑</a>
            <MotionToggle />
          </div>
        </footer>
      </div>
    </section>
  );
}
