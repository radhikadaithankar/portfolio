import { faq } from "@/data/faq";

/** Visible answers; the same text feeds the FAQPage structured data. */
export function Faq() {
  return (
    <section className="v-faq" aria-labelledby="faq-title">
      <div className="shell">
        <div className="v-section-head">
          <p className="eyebrow">Quick answers</p>
          <h2 id="faq-title">
            Questions, <em>answered.</em>
          </h2>
        </div>
        <div className="v-faq-list">
          {faq.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>
                <h3>{item.question}</h3>
                <span aria-hidden="true">+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
