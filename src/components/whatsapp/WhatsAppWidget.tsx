"use client";

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import "./whatsapp-widget.css";

const WA_NUMBER = "353873958424";
const WA_MESSAGE = `Hi Renewable Ireland! \u{1F44B}\n\nI'm interested in getting solar panels installed. Could you please provide me with a free quote?\n\nMy details:\n- Name: \n- Eircode: \n- County: `;
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

const SESSION_POPOUT_KEY = "wa-popout-dismissed";
const SESSION_TOOLTIP_KEY = "wa-tooltip-seen";

function isOnline(): boolean {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Dublin" })
  );
  const day = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const hour = now.getHours();

  if (day === 0) return false; // Sunday
  if (day >= 1 && day <= 5) return hour >= 8 && hour < 18; // Mon-Fri
  if (day === 6) return hour >= 9 && hour < 14; // Saturday
  return false;
}

/* ── useSyncExternalStore for mounted gate (avoids setState-in-effect) ── */
const emptySubscribe = () => () => {};
const clientTrue = () => true;
const serverFalse = () => false;

/* ── useSyncExternalStore for online status with periodic refresh ── */
let onlineListeners: Array<() => void> = [];

function subscribeOnline(callback: () => void) {
  onlineListeners.push(callback);
  return () => {
    onlineListeners = onlineListeners.filter((l) => l !== callback);
  };
}

function getOnlineSnapshot() {
  return isOnline();
}

function getOnlineServerSnapshot() {
  return false;
}

export default function WhatsAppWidget() {
  /* Hydration-safe: false on server, true on client */
  const mounted = useSyncExternalStore(emptySubscribe, clientTrue, serverFalse);

  /* Online status with periodic refresh */
  const online = useSyncExternalStore(
    subscribeOnline,
    getOnlineSnapshot,
    getOnlineServerSnapshot
  );

  const [showPopout, setShowPopout] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(true);
  const popoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoDismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Refresh online status every 60s ── */
  useEffect(() => {
    const interval = setInterval(() => {
      onlineListeners.forEach((l) => l());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  /* ── First-visit popout ── */
  useEffect(() => {
    if (!mounted) return;
    if (sessionStorage.getItem(SESSION_POPOUT_KEY)) return;

    popoutTimerRef.current = setTimeout(() => {
      setShowPopout(true);
    }, 8000);

    return () => {
      if (popoutTimerRef.current) clearTimeout(popoutTimerRef.current);
    };
  }, [mounted]);

  const dismissPopout = useCallback(() => {
    setDismissing(true);
    setTimeout(() => {
      setShowPopout(false);
      setDismissing(false);
      sessionStorage.setItem(SESSION_POPOUT_KEY, "1");
    }, 200);
  }, []);

  /* ── Auto-dismiss popout after 30s ── */
  useEffect(() => {
    if (!showPopout) return;

    autoDismissTimerRef.current = setTimeout(() => {
      dismissPopout();
    }, 30_000);

    return () => {
      if (autoDismissTimerRef.current) clearTimeout(autoDismissTimerRef.current);
    };
  }, [showPopout, dismissPopout]);

  /* ── Tooltip auto-hide after 5s on first visit ── */
  useEffect(() => {
    if (!mounted) return;
    if (sessionStorage.getItem(SESSION_TOOLTIP_KEY)) return;

    const timer = setTimeout(() => {
      setTooltipVisible(false);
      sessionStorage.setItem(SESSION_TOOLTIP_KEY, "1");
    }, 5000);

    return () => clearTimeout(timer);
  }, [mounted]);

  const openWhatsApp = useCallback(() => {
    window.open(WA_URL, "_blank", "noopener,noreferrer");
  }, []);

  /* Keyboard handler */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openWhatsApp();
      }
    },
    [openWhatsApp]
  );

  /* Don't render on server to avoid hydration mismatch with dynamic styles */
  if (!mounted) return null;

  return (
    <div className="whatsapp-wrapper">
      {/* Tooltip (desktop only — hidden via CSS on mobile) */}
      {tooltipVisible && (
        <div className="wa-tooltip" aria-hidden="true">
          <div className="wa-tooltip-inner">
            <span>Chat on WhatsApp</span>
            <span className="wa-tooltip-status">
              <span className={`dot ${online ? "online" : "offline"}`} />
              {online ? "We're online" : "We'll reply first thing tomorrow"}
            </span>
            <span className="wa-tooltip-arrow" />
          </div>
        </div>
      )}

      {/* Popout Card */}
      {showPopout && (
        <div
          className={`wa-popout${dismissing ? " dismissing" : ""}`}
          role="dialog"
          aria-label="WhatsApp chat invitation"
        >
          <div className="wa-popout-header">
            <div className="wa-popout-icon">
              <svg viewBox="0 0 32 32">
                <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.742 3.054 9.378L1.054 31.29l6.116-1.958A15.92 15.92 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.334 22.598c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.324-5.658-1.216-4.748-1.97-7.802-6.808-8.038-7.124-.226-.316-1.878-2.502-1.878-4.774s1.19-3.388 1.612-3.852c.39-.424.858-.532 1.144-.532.286 0 .572.002.822.014.264.012.618-.1.966.738.354.852 1.2 2.936 1.306 3.15.106.214.178.464.036.748-.142.286-.214.462-.428.712-.214.25-.45.558-.642.748-.214.214-.438.446-.188.876.25.43 1.11 1.832 2.386 2.968 1.64 1.462 3.022 1.914 3.452 2.128.43.214.68.18.93-.142.25-.322 1.072-1.25 1.358-1.68.286-.43.572-.356.964-.214.392.142 2.49 1.176 2.918 1.39.428.214.714.322.82.498.106.178.106 1.022-.284 2.122z" />
              </svg>
            </div>
            <span className="wa-popout-title">Need Help? Chat With Us!</span>
          </div>

          <p className="wa-popout-desc">
            Our solar experts are available to answer your questions and help you
            get a free quote.
          </p>

          <div className="wa-popout-actions">
            <button
              className="wa-popout-btn-start"
              onClick={() => {
                openWhatsApp();
                dismissPopout();
              }}
              type="button"
            >
              Start Chat
            </button>
            <button
              className="wa-popout-btn-dismiss"
              onClick={dismissPopout}
              type="button"
            >
              Not Now
            </button>
          </div>
        </div>
      )}

      {/* Main Button */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-btn"
        aria-label="Chat with us on WhatsApp"
        role="button"
        tabIndex={0}
        onClick={() => {
          if (showPopout) dismissPopout();
        }}
        onKeyDown={handleKeyDown}
      >
        <span className={`wa-status-dot ${online ? "online" : "offline"}`} />
        <svg viewBox="0 0 32 32" width="28" height="28">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.742 3.054 9.378L1.054 31.29l6.116-1.958A15.92 15.92 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.334 22.598c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.324-5.658-1.216-4.748-1.97-7.802-6.808-8.038-7.124-.226-.316-1.878-2.502-1.878-4.774s1.19-3.388 1.612-3.852c.39-.424.858-.532 1.144-.532.286 0 .572.002.822.014.264.012.618-.1.966.738.354.852 1.2 2.936 1.306 3.15.106.214.178.464.036.748-.142.286-.214.462-.428.712-.214.25-.45.558-.642.748-.214.214-.438.446-.188.876.25.43 1.11 1.832 2.386 2.968 1.64 1.462 3.022 1.914 3.452 2.128.43.214.68.18.93-.142.25-.322 1.072-1.25 1.358-1.68.286-.43.572-.356.964-.214.392.142 2.49 1.176 2.918 1.39.428.214.714.322.82.498.106.178.106 1.022-.284 2.122z" />
        </svg>
      </a>
    </div>
  );
}
