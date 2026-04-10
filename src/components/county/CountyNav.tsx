"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from "@/app/counties/[county]/page.module.css";

interface CountyNavProps {
  countyName: string;
  countySlug: string;
  phone?: string;
}

export default function CountyNav({ countyName, countySlug, phone }: CountyNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        closeMenu();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add(styles.bodyScrollLocked);
    } else {
      document.body.classList.remove(styles.bodyScrollLocked);
    }
    return () => {
      document.body.classList.remove(styles.bodyScrollLocked);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, input, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen || !menuRef.current) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = menuRef.current!.querySelectorAll<HTMLElement>(
        'a[href], button, input, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, closeMenu]);

  const navLinks = [
    { href: "#features", label: "Services" },
    { href: "#process", label: "Process" },
    { href: "#grant", label: "Grants" },
    { href: "#calculator", label: "Savings" },
    { href: "#faq", label: "FAQ" },
    { href: `/counties/${countySlug}/blog`, label: "Blog" },
  ];

  const phoneHref = phone ? `tel:${phone.replace(/[^+\d]/g, "")}` : "#contact";

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <div className={styles.navInner}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a href={`https://renewableireland.ie/`} aria-label="Renewable Ireland" className={styles.navLogo}>
            Renewable <span className={styles.navLogoAccent}>Ireland</span>
          </a>
        </div>

        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a href={phoneHref} className={styles.btnPrimary} style={{
            padding: "10px 24px",
            borderRadius: "var(--radius)",
            fontWeight: 700,
            fontSize: "0.9rem",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            Get Free Quote
          </a>
        </div>

        <button
          ref={hamburgerRef}
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        ref={menuRef}
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <a
          href="https://renewableireland.ie/"
          onClick={closeMenu}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--hint)",
            fontSize: ".85rem",
            fontWeight: 600,
            textDecoration: "none",
            padding: "12px 0",
            borderBottom: "2px solid var(--gray-lt)",
            fontFamily: "var(--font-body)",
            textTransform: "none",
            letterSpacing: ".01em",
            transition: "color .15s",
            minHeight: "48px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Renewable Ireland
        </a>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu} ref={link.href === navLinks[0].href ? firstLinkRef : undefined}>
            {link.label}
          </a>
        ))}
        <a href={phoneHref} className={styles.btnPrimary} onClick={closeMenu} style={{
          padding: "16px 36px",
          borderRadius: "var(--radius)",
          fontWeight: 700,
          fontSize: "1rem",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}>
          Call Now
        </a>
      </div>
    </nav>
  );
}
