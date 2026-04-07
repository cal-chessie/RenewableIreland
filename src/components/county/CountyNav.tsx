"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from "@/app/counties/[county]/page.module.css";

interface CountyNavProps {
  countyName: string;
  countySlug: string;
}

export default function CountyNav({ countyName, countySlug }: CountyNavProps) {
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

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        closeMenu();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen, closeMenu]);

  // Body scroll lock
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

  // Focus trap
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

  // Focus trap cycle
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

  // Close on click outside
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
    { href: `/counties/${countySlug}`, label: "Home" },
    { href: `/counties/${countySlug}/home-solar-panels`, label: "Services" },
    { href: `/counties/${countySlug}/blog`, label: "Blog" },
    { href: "#trust", label: "About" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <div className={styles.navInner}>
        <a href={`/counties/${countySlug}`} className={styles.navLogo}>
          Solar <span className={styles.navLogoAccent}>{countyName}</span>
        </a>

        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${countySlug === "tyrone" ? "+44-28-8224-5900" : "+353-1-514-3200"}`}
            className={styles.btnPrimary}
            style={{ padding: "10px 20px", borderRadius: "4px", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", background: "#E10600", textDecoration: "none", minWidth: "48px", minHeight: "48px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
          >
            Get a Quote
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
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu} ref={link.href === navLinks[0].href ? firstLinkRef : undefined}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
