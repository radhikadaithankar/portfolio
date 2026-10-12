import { company, contact, identity } from "@/data/site";

import { MotionToggle } from "../MotionToggle";

export function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="shell">
        <div className="contact-top">
          <p className="eyebrow">04 / Start a conversation</p>
          <span aria-hidden="true">✳</span>
        </div>
        <div className="contact-main">
          <h2>
            Have something
            <br />
            <em>in mind?</em>
          </h2>
          <div className="contact-invitation">
            <div className="contact-route">
              <p>Hiring for AI or data roles?</p>
              <div className="contact-actions">
                <a
                  className="button button-light"
                  href={`mailto:${contact.email}`}
                >
                  Email me <span aria-hidden="true">→</span>
                </a>
                <a
                  className="button button-outline"
                  href="https://cv.radhikakd.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View my CV <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <div className="contact-route">
              <p>Want Compass for your school, or a custom build?</p>
              <div className="contact-actions">
                <a
                  className="button button-outline"
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Talk to Evaradh <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <a className="contact-email" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </div>
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
