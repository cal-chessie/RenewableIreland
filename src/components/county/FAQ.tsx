"use client";

import { useState } from "react";
import styles from "@/app/counties/[county]/page.module.css";
import type { FAQ } from "@/data/counties";

interface FAQProps {
  faqs: FAQ[];
  countyName: string;
}

export default function FAQ({ faqs, countyName }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className={`${styles.section} ${styles.faqSection}`}
      id="faq"
      aria-labelledby="faq-heading"
    >
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Got Questions?</div>
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
            <div
              key={index}
              className={`${styles.faqItem} ${openIndex === index ? styles.faqItemActive : ""}`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{faq.question}</span>
                <span className={styles.faqIcon} aria-hidden="true">+</span>
              </button>
              <div
                className={styles.faqAnswer}
                id={`faq-answer-${index}`}
                role="region"
                style={{
                  maxHeight: openIndex === index ? `${300}px` : "0",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className={styles.faqAnswerInner}>{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
