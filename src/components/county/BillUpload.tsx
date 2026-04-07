"use client";

import { useState, useRef } from "react";
import styles from "@/app/counties/[county]/page.module.css";

interface BillUploadProps {
  countyName: string;
  countySlug: string;
}

export default function BillUpload({ countyName, countySlug }: BillUploadProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateFile(file);
  };

  const validateFile = (file: File) => {
    const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      setFormStatus("error");
      return;
    }
    if (file.size > maxSize) {
      setFormStatus("error");
      return;
    }

    setFileName(file.name);
    setSelectedFile(file.type);
    setFormStatus("idle");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFormStatus("success");
  };

  return (
    <section
      className={styles.billUploadSection}
      id="bill-upload"
      aria-labelledby="bill-upload-heading"
    >
      <div className="container">
        <div className={styles.billUploadGrid}>
          <div className={styles.billUploadInfo}>
            <h2 id="bill-upload-heading">
              Get a Personalised Solar Quote for {countyName}
            </h2>
            <p>
              Upload your electricity bill and we&apos;ll calculate exactly how
              much you could save with solar panels on your {countyName} home.
              No obligation, no pressure — just honest figures.
            </p>

            <div
              className={styles.uploadZone}
              role="button"
              tabIndex={0}
              aria-label="Upload your electricity bill — accepts PDF, JPG or PNG up to 10MB"
              onClick={handleFileSelect}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleFileSelect();
                }
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={isDragging ? { borderColor: "#E10600", background: "#fafafa" } : undefined}
            >
              <svg className={styles.uploadZoneIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span className={styles.uploadZoneText}>
                {fileName ? (
                  <>
                    <strong>{fileName}</strong> selected
                  </>
                ) : (
                  "Drag & drop your electricity bill here"
                )}
              </span>
              <span className={styles.uploadZoneHint}>
                or click to browse — PDF, JPG or PNG (max 10MB)
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ display: "none" }}
                aria-label="Select bill file"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <form
            className={styles.uploadForm}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className={styles.formGroup}>
              <label htmlFor={`bill-name-${countySlug}`}>
                Your name
              </label>
              <input
                type="text"
                id={`bill-name-${countySlug}`}
                name="name"
                placeholder="e.g. John Smith"
                required
                autoComplete="name"
                aria-required="true"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor={`bill-phone-${countySlug}`}>
                Phone number
              </label>
              <input
                type="tel"
                id={`bill-phone-${countySlug}`}
                name="phone"
                placeholder="e.g. 01 234 5678"
                required
                autoComplete="tel"
                pattern="[0-9+\s\-()]+"
                aria-required="true"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor={`bill-email-${countySlug}`}>
                Email address
              </label>
              <input
                type="email"
                id={`bill-email-${countySlug}`}
                name="email"
                placeholder="e.g. john@example.com"
                required
                autoComplete="email"
                aria-required="true"
              />
            </div>

            {/* Honeypot field */}
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="website-field">Website</label>
              <input type="text" id="website-field" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <p className={styles.formPrivacy}>
              We keep your details private. We never pass them on to third
              parties. See our{" "}
              <a href="#privacy">privacy policy</a>.
            </p>

            {formStatus === "success" ? (
              <div style={{ padding: "16px", background: "#e8f5e9", borderRadius: "4px", color: "#2e7d32", textAlign: "center", fontWeight: 600 }}>
                Thank you! We&apos;ll be in touch within 60 minutes during business hours.
              </div>
            ) : (
              <button
                type="submit"
                className={styles.btnPrimary}
                disabled={formStatus === "submitting"}
                style={{ width: "100%" }}
              >
                {formStatus === "submitting" ? "Sending..." : "Show Me My Savings"}
              </button>
            )}

            {formStatus === "error" && (
              <span className={styles.formError} role="alert">
                Please check your file (PDF, JPG or PNG, max 10MB) and try again.
              </span>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
