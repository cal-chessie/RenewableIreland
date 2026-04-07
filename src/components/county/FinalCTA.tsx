"use client";

import { useState } from "react";
import styles from "@/app/counties/[county]/page.module.css";

interface FinalCTAProps {
  countyName: string;
  phone: string;
}

export default function FinalCTA({ countyName, phone }: FinalCTAProps) {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFormStatus("success");
  };

  return (
    <section
      className={styles.finalCtaSection}
      id="contact"
      aria-labelledby="final-cta-heading"
    >
      <div className="container">
        <h2 id="final-cta-heading">
          Ready to Switch to Solar in {countyName}?
        </h2>
        <p>
          Join hundreds of {countyName} homeowners who are already saving on
          their electricity bills with solar energy.
        </p>

        <a href={`tel:${phone}`} className={styles.finalCtaPhone}>
          <span className="srOnly">Call us: </span>
          <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: 8 }}>
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          {phone}
        </a>

        {formStatus === "success" ? (
          <div
            style={{
              maxWidth: 400,
              margin: "0 auto",
              padding: "20px 24px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#FFFFFF",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Thank you! We&apos;ll call you back within the hour during business
            hours.
          </div>
        ) : (
          <form
            className={styles.finalCtaForm}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              autoComplete="name"
              aria-label="Your name"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              required
              autoComplete="tel"
              aria-label="Phone number"
            />
            <button type="submit" className={styles.btnPrimary} style={{ width: "100%" }}>
              {formStatus === "submitting" ? "Sending..." : "Request a Callback"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
