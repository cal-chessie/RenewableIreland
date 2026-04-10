"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useSyncExternalStore,
  type MouseEvent,
} from "react";
import "./whatsapp-widget.css";

/* ================================================================
   CONFIG
   ================================================================ */
const WA_NUMBER = "353873958424";
const WA_URL = `https://wa.me/${WA_NUMBER}`;

const SESSION_DISMISSED_KEY = "wa-panel-dismissed";
const SESSION_TOOLTIP_KEY = "wa-tooltip-seen";

/* ================================================================
   HELPERS
   ================================================================ */

/** Ireland business hours (Dublin timezone) */
function isOnline(): boolean {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Dublin" })
  );
  const day = now.getDay();
  const hour = now.getHours();
  if (day === 0) return false;
  if (day >= 1 && day <= 5) return hour >= 8 && hour < 18;
  if (day === 6) return hour >= 9 && hour < 14;
  return false;
}

/** Time-aware greeting */
function getGreeting(): string {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Dublin" })
  );
  const hour = now.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

/** Get contextual message based on current URL */
function getContextMessage(): string {
  if (typeof window === "undefined") return "solar panels";
  const path = window.location.pathname;
  if (path.includes("blog")) return "our latest solar insights";
  if (path.includes("roi-calculator")) return "your solar savings estimate";
  if (path.includes("referral")) return "our referral programme";
  if (path.includes("privacy") || path.includes("terms"))
    return "any questions about our policies";
  if (path.startsWith("/counties/")) {
    const county = path.split("/")[2]?.replace(/-/g, " ") || "your area";
    return `solar panels in ${county.charAt(0).toUpperCase() + county.slice(1)}`;
  }
  return "solar panels for your home";
}

/** Build WhatsApp URL with smart pre-filled message */
function buildWaUrl(): string {
  const greeting = getGreeting();
  const context = getContextMessage();
  const message = `${greeting} Renewable Ireland! \u26A1\n\nI'm interested in ${context}. Could you please provide me with a free quote?\n\nMy details:\n- Name: \n- Eircode: \n- County: `;
  return `${WA_URL}?text=${encodeURIComponent(message)}`;
}

/* ================================================================
   EXTERNAL STORE HOOKS (hydration-safe)
   ================================================================ */
const emptySubscribe = () => () => {};

// Mounted gate: false on server, true on client
const clientTrue = () => true;
const serverFalse = () => false;

// Online status with periodic refresh
let onlineListeners: Array<() => void> = [];
function subscribeOnline(cb: () => void) {
  onlineListeners.push(cb);
  return () => {
    onlineListeners = onlineListeners.filter((l) => l !== cb);
  };
}

/* ================================================================
   SOUND ENGINE (Web Audio API)
   ================================================================ */
const SOUND_KEY = "wa-chat-sound";

function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    return ctx;
  } catch {
    return null;
  }
}

function playOpenSound(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(880, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(1320, ctx.currentTime + 0.12);
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.2);
}

function playClickSound(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(1100, ctx.currentTime);
  gain.gain.setValueAtTime(0.06, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.08);
}

function playDismissSound(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(660, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(440, ctx.currentTime + 0.12);
  gain.gain.setValueAtTime(0.06, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.15);
}

/* ================================================================
   QUICK ACTION BUTTONS
   ================================================================ */
const QUICK_ACTIONS = [
  {
    key: "quote",
    label: "Get a Free Quote",
    emoji: "\uD83D\uDCCB",
    message: `Hi Renewable Ireland! \uD83D\uDC4B\n\nI'd like to get a free solar panel quote.\n\nMy details:\n- Name: \n- Eircode: \n- County: `,
  },
  {
    key: "pricing",
    label: "View Pricing",
    emoji: "\uD83D\uDCB0",
    message: `Hi Renewable Ireland! \uD83D\uDCB0\n\nI'd like to know your solar panel pricing and what packages are available.`,
  },
  {
    key: "grants",
    label: "SEAI Grant Info",
    emoji: "\uD83C\uDFDB\uFE0F",
    message: `Hi Renewable Ireland! \uD83C\uDFDB\uFE0F\n\nI'd like to know more about the SEAI \u20AC1,800 solar PV grant and how to apply.`,
  },
  {
    key: "survey",
    label: "Book a Survey",
    emoji: "\uD83D\uDCC5",
    message: `Hi Renewable Ireland! \uD83D\uDCC5\n\nI'd like to book a free site survey for solar panel installation.\n\nMy details:\n- Name: \n- Eircode: \n- County: `,
  },
];

/* ================================================================
   WHATSAPP WIDGET — MAIN COMPONENT
   ================================================================ */
export default function WhatsAppWidget() {
  const mounted = useSyncExternalStore(emptySubscribe, clientTrue, serverFalse);
  const online = useSyncExternalStore(
    subscribeOnline,
    isOnline,
    serverFalse
  );

  const [panelOpen, setPanelOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(true);
  const [showTyping, setShowTyping] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [soundEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem(SOUND_KEY) !== "false";
  });

  const panelRef = useRef<HTMLDivElement>(null);
  const popoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoDismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Refresh online status every 60s ── */
  useEffect(() => {
    const interval = setInterval(() => {
      onlineListeners.forEach((l) => l());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  /* ── First-visit auto-popout sequence ── */
  useEffect(() => {
    if (!mounted) return;
    if (sessionStorage.getItem(SESSION_DISMISSED_KEY)) return;

    popoutTimerRef.current = setTimeout(() => {
      // Phase 1: Show typing indicator for 2.5s
      setShowTyping(true);
      typingTimerRef.current = setTimeout(() => {
        setShowTyping(false);
        // Phase 2: Show the greeting bubble
        setShowBubble(true);
        // Phase 3: After 1s, open the full panel
        setTimeout(() => {
          setPanelOpen(true);
        }, 1000);
      }, 2500);
    }, 6000);

    return () => {
      if (popoutTimerRef.current) clearTimeout(popoutTimerRef.current);
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, [mounted]);

  /* ── Auto-dismiss panel after 45s on auto-open ── */
  useEffect(() => {
    if (!panelOpen) return;
    if (sessionStorage.getItem(SESSION_DISMISSED_KEY)) return;

    autoDismissTimerRef.current = setTimeout(() => {
      closePanel();
    }, 45_000);

    return () => {
      if (autoDismissTimerRef.current) clearTimeout(autoDismissTimerRef.current);
    };
  }, [panelOpen]);

  /* ── Tooltip auto-hide after 6s on first visit ── */
  useEffect(() => {
    if (!mounted) return;
    if (sessionStorage.getItem(SESSION_TOOLTIP_KEY)) {
      setTooltipVisible(false);
      return;
    }

    tooltipTimerRef.current = setTimeout(() => {
      setTooltipVisible(false);
      sessionStorage.setItem(SESSION_TOOLTIP_KEY, "1");
    }, 6000);

    return () => {
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
    };
  }, [mounted]);

  /* ── Close on outside click ── */
  useEffect(() => {
    if (!panelOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node)
      ) {
        closePanel();
      }
    }

    document.addEventListener("mousedown", handleClickOutside as EventListener);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as EventListener
      );
    };
  }, [panelOpen]);

  /* ── Escape key closes panel ── */
  useEffect(() => {
    if (!panelOpen) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closePanel();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [panelOpen]);

  /* ── Panel open/close handlers ── */
  const closePanel = useCallback(() => {
    setClosing(true);
    setShowBubble(false);
    setShowTyping(false);
    setTimeout(() => {
      setPanelOpen(false);
      setClosing(false);
    }, 280);
  }, []);

  const togglePanel = useCallback(() => {
    if (panelOpen) {
      closePanel();
    } else {
      setPanelOpen(true);
      if (soundEnabled) {
        try {
          const ctx = getAudioCtx();
          if (ctx) playOpenSound(ctx);
        } catch {}
      }
    }
  }, [panelOpen, closePanel, soundEnabled]);

  const handleDismiss = useCallback(() => {
    if (soundEnabled) {
      try {
        const ctx = getAudioCtx();
        if (ctx) playDismissSound(ctx);
      } catch {}
    }
    closePanel();
    sessionStorage.setItem(SESSION_DISMISSED_KEY, "1");
  }, [closePanel, soundEnabled]);

  const openWhatsApp = useCallback(
    (customMessage?: string) => {
      const url = customMessage
        ? `${WA_URL}?text=${encodeURIComponent(customMessage)}`
        : buildWaUrl();
      window.open(url, "_blank", "noopener,noreferrer");
      if (soundEnabled) {
        try {
          const ctx = getAudioCtx();
          if (ctx) playClickSound(ctx);
        } catch {}
      }
    },
    [soundEnabled]
  );

  const handleQuickAction = useCallback(
    (action: (typeof QUICK_ACTIONS)[number]) => {
      openWhatsApp(action.message);
      closePanel();
    },
    [openWhatsApp, closePanel]
  );

  /* ── Keyboard handler for main button ── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        togglePanel();
      }
    },
    [togglePanel]
  );

  /* Don't render on server */
  if (!mounted) return null;

  const greeting = getGreeting();
  const contextLabel = getContextMessage();

  return (
    <div className="wa-root" aria-label="WhatsApp contact widget">
      {/* ── Typing indicator (shows before auto-popout) ── */}
      {showTyping && (
        <div className="wa-typing-indicator" aria-hidden="true">
          <div className="wa-typing-avatar">
            <svg viewBox="0 0 32 32" width="16" height="16">
              <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.742 3.054 9.378L1.054 31.29l6.116-1.958A15.92 15.92 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.334 22.598c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.324-5.658-1.216-4.748-1.97-7.802-6.808-8.038-7.124-.226-.316-1.878-2.502-1.878-4.774s1.19-3.388 1.612-3.852c.39-.424.858-.532 1.144-.532.286 0 .572.002.822.014.264.012.618-.1.966.738.354.852 1.2 2.936 1.306 3.15.106.214.178.464.036.748-.142.286-.214.462-.428.712-.214.25-.45.558-.642.748-.214.214-.438.446-.188.876.25.43 1.11 1.832 2.386 2.968 1.64 1.462 3.022 1.914 3.452 2.128.43.214.68.18.93-.142.25-.322 1.072-1.25 1.358-1.68.286-.43.572-.356.964-.214.392.142 2.49 1.176 2.918 1.39.428.214.714.322.82.498.106.178.106 1.022-.284 2.122z" />
            </svg>
          </div>
          <div className="wa-typing-dots">
            <span className="wa-typing-dot" />
            <span className="wa-typing-dot" />
            <span className="wa-typing-dot" />
          </div>
        </div>
      )}

      {/* ── Greeting Bubble (shows before panel) ── */}
      {showBubble && !panelOpen && (
        <div className="wa-bubble" aria-hidden="true">
          <div className="wa-bubble-inner">
            <p className="wa-bubble-text">
              {greeting}! \u26A1 We&apos;d love to help you with{" "}
              <strong>{contextLabel}</strong>.
            </p>
            <span className="wa-bubble-tail" />
          </div>
        </div>
      )}

      {/* ── Expanded Panel ── */}
      {(panelOpen || closing) && (
        <div
          className={`wa-panel ${panelOpen ? "wa-panel-open" : ""} ${closing ? "wa-panel-closing" : ""}`}
          ref={panelRef}
          role="dialog"
          aria-label="WhatsApp chat"
          aria-modal="false"
        >
          {/* Panel Header — brand logo + status */}
          <div className="wa-panel-header">
            <div className="wa-panel-header-avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.webp"
                alt="Renewable Ireland"
                width={36}
                height={36}
                className="wa-panel-header-logo"
              />
              <span className={`wa-panel-status-dot ${online ? "online" : "offline"}`} />
            </div>
            <div className="wa-panel-header-info">
              <span className="wa-panel-header-name">Renewable Ireland</span>
              <span className="wa-panel-header-meta">
                {online ? (
                  <>
                    <span className="wa-panel-online-dot" /> Online now
                    <span className="wa-panel-separator">&middot;</span>
                    Replies in ~2 min
                  </>
                ) : (
                  "We'll reply first thing tomorrow"
                )}
              </span>
            </div>
            <button
              className="wa-panel-close"
              onClick={handleDismiss}
              type="button"
              aria-label="Close WhatsApp panel"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Panel Body */}
          <div className="wa-panel-body">
            {/* Greeting Message */}
            <div className="wa-panel-message wa-panel-message-bot">
              <div className="wa-panel-msg-bubble">
                <p>
                  {greeting}! \u26A1 Thanks for your interest in{" "}
                  <strong>{contextLabel}</strong>.
                </p>
                <p>
                  We&apos;re here to help. Tap a quick action below, or start
                  a WhatsApp chat directly!
                </p>
              </div>
              <span className="wa-panel-msg-time">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>

            {/* Quick Actions */}
            <div className="wa-panel-actions" role="group" aria-label="Quick actions">
              {QUICK_ACTIONS.map((action, i) => (
                <button
                  key={action.key}
                  className="wa-panel-action-btn"
                  onClick={() => handleQuickAction(action)}
                  type="button"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <span className="wa-panel-action-emoji">{action.emoji}</span>
                  <span className="wa-panel-action-label">{action.label}</span>
                  <svg
                    className="wa-panel-action-arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Trust Indicators — clean text, no emojis */}
            <div className="wa-panel-trust">
              <div className="wa-panel-trust-item">
                <span className="wa-panel-trust-icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </span>
                <span className="wa-panel-trust-value">4.9</span>
                <span className="wa-panel-trust-label">Rating</span>
              </div>
              <div className="wa-panel-trust-divider" />
              <div className="wa-panel-trust-item">
                <span className="wa-panel-trust-icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </span>
                <span className="wa-panel-trust-value">2,847+</span>
                <span className="wa-panel-trust-label">Installs</span>
              </div>
              <div className="wa-panel-trust-divider" />
              <div className="wa-panel-trust-item">
                <span className="wa-panel-trust-icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </span>
                <span className="wa-panel-trust-value">1-Day</span>
                <span className="wa-panel-trust-label">Install</span>
              </div>
            </div>
          </div>

          {/* Panel Footer — Big CTA */}
          <div className="wa-panel-footer">
            <a
              href={buildWaUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-panel-cta"
              onClick={() => {
                if (showBubble || showTyping) handleDismiss();
              }}
            >
              <svg viewBox="0 0 32 32" width="22" height="22">
                <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.742 3.054 9.378L1.054 31.29l6.116-1.958A15.92 15.92 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.334 22.598c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.324-5.658-1.216-4.748-1.97-7.802-6.808-8.038-7.124-.226-.316-1.878-2.502-1.878-4.774s1.19-3.388 1.612-3.852c.39-.424.858-.532 1.144-.532.286 0 .572.002.822.014.264.012.618-.1.966.738.354.852 1.2 2.936 1.306 3.15.106.214.178.464.036.748-.142.286-.214.462-.428.712-.214.25-.45.558-.642.748-.214.214-.438.446-.188.876.25.43 1.11 1.832 2.386 2.968 1.64 1.462 3.022 1.914 3.452 2.128.43.214.68.18.93-.142.25-.322 1.072-1.25 1.358-1.68.286-.43.572-.356.964-.214.392.142 2.49 1.176 2.918 1.39.428.214.714.322.82.498.106.178.106 1.022-.284 2.122z" />
              </svg>
              <span>Start WhatsApp Chat</span>
              <svg
                className="wa-cta-arrow"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <p className="wa-panel-footer-note">
              Free quote &middot; No obligation &middot; SEAI grant handled
            </p>
          </div>
        </div>
      )}

      {/* ── Tooltip (desktop only — hover on button area) ── */}
      {tooltipVisible && !panelOpen && (
        <div className="wa-tooltip-new" aria-hidden="true">
          <div className="wa-tooltip-new-inner">
            <div className="wa-tooltip-new-row">
              <svg viewBox="0 0 32 32" width="16" height="16">
                <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.742 3.054 9.378L1.054 31.29l6.116-1.958A15.92 15.92 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.334 22.598c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.324-5.658-1.216-4.748-1.97-7.802-6.808-8.038-7.124-.226-.316-1.878-2.502-1.878-4.774s1.19-3.388 1.612-3.852c.39-.424.858-.532 1.144-.532.286 0 .572.002.822.014.264.012.618-.1.966.738.354.852 1.2 2.936 1.306 3.15.106.214.178.464.036.748-.142.286-.214.462-.428.712-.214.25-.45.558-.642.748-.214.214-.438.446-.188.876.25.43 1.11 1.832 2.386 2.968 1.64 1.462 3.022 1.914 3.452 2.128.43.214.68.18.93-.142.25-.322 1.072-1.25 1.358-1.68.286-.43.572-.356.964-.214.392.142 2.49 1.176 2.918 1.39.428.214.714.322.82.498.106.178.106 1.022-.284 2.122z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </div>
            <div className="wa-tooltip-new-status">
              <span className={`wa-tooltip-new-dot ${online ? "online" : "offline"}`} />
              {online
                ? "We\u2019re online \u2014 typically replies in 2 min"
                : "Offline \u2014 we\u2019ll reply first thing"}
            </div>
          </div>
          <span className="wa-tooltip-new-arrow" />
        </div>
      )}

      {/* ── Main Floating Button ── */}
      <button
        className={`wa-fab ${panelOpen ? "wa-fab-active" : ""}`}
        onClick={togglePanel}
        onKeyDown={handleKeyDown}
        aria-label={
          panelOpen ? "Close WhatsApp panel" : "Open WhatsApp chat"
        }
        aria-expanded={panelOpen}
        type="button"
      >
        {/* Ripple rings */}
        <span className="wa-fab-ring wa-fab-ring-1" aria-hidden="true" />
        <span className="wa-fab-ring wa-fab-ring-2" aria-hidden="true" />

        {/* Online indicator */}
        <span className={`wa-fab-dot ${online ? "online" : "offline"}`} />

        {/* WhatsApp Icon */}
        <svg viewBox="0 0 32 32" className="wa-fab-icon">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.742 3.054 9.378L1.054 31.29l6.116-1.958A15.92 15.92 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.334 22.598c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.324-5.658-1.216-4.748-1.97-7.802-6.808-8.038-7.124-.226-.316-1.878-2.502-1.878-4.774s1.19-3.388 1.612-3.852c.39-.424.858-.532 1.144-.532.286 0 .572.002.822.014.264.012.618-.1.966.738.354.852 1.2 2.936 1.306 3.15.106.214.178.464.036.748-.142.286-.214.462-.428.712-.214.25-.45.558-.642.748-.214.214-.438.446-.188.876.25.43 1.11 1.832 2.386 2.968 1.64 1.462 3.022 1.914 3.452 2.128.43.214.68.18.93-.142.25-.322 1.072-1.25 1.358-1.68.286-.43.572-.356.964-.214.392.142 2.49 1.176 2.918 1.39.428.214.714.322.82.498.106.178.106 1.022-.284 2.122z" />
        </svg>

        {/* Close X (shown when panel open) */}
        <svg
          viewBox="0 0 24 24"
          className="wa-fab-close"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
