"use client";

import { useState, useRef, useCallback } from "react";
import styles from "@/app/counties/[county]/page.module.css";
import type { FAQ } from "@/data/counties";

interface FAQProps {
  faqs: FAQ[];
  countyName: string;
}

export default function FAQ({ faqs, countyName }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const setAnswerRef = useCallback(
    (el: HTMLDivElement | null, index: number) => {
      answerRefs.current[index] = el;
    },
    []
  );

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
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const contentHeight = answerRefs.current[index]?.scrollHeight || 0;

            return (
              <div
                key={index}
                className={`${styles.faqItem} ${isOpen ? styles.faqItemActive : ""}`}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{faq.question}</span>
                  <span className={styles.faqIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
                <div
                  className={styles.faqAnswer}
                  id={`faq-answer-${index}`}
                  role="region"
                  ref={(el) => setAnswerRef(el, index)}
                  style={{
                    maxHeight: isOpen ? `${contentHeight}px` : "0",
                  }}
                >
                  <div className={styles.faqAnswerInner}>{faq.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
