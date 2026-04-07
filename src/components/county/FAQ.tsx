import styles from "@/app/counties/[county]/page.module.css";
import type { FAQ } from "@/data/counties";

interface FAQProps {
  faqs: FAQ[];
  countyName: string;
}

export default function FAQ({ faqs, countyName }: FAQProps) {
  return (
    <section
      className={styles.faqSection}
      id="faq"
      aria-labelledby="faq-heading"
    >
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 id="faq-heading">
            Frequently Asked Questions About Solar in {countyName}
          </h2>
          <p>
            Everything you need to know about solar panel installation in{" "}
            {countyName}. Can&apos;t find your answer? Give us a call.
          </p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <details>
                <summary>
                  <span>{faq.question}</span>
                  <svg
                    className={styles.faqToggle}
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </summary>
                <div className={styles.faqAnswer}>{faq.answer}</div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
