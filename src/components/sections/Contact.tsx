import { contact, identity } from "@/data/site";

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
            <p>
              A product to build, an interesting role,
              <br className="desktop-break" /> or a problem worth figuring out
              together.
            </p>
            <a className="button button-light" href={`mailto:${contact.email}`}>
              Let&apos;s talk <span aria-hidden="true">↗</span>
            </a>
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
          </div>
        </footer>
      </div>
    </section>
  );
}
