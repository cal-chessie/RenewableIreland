'use client';

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sun,
  Volume2,
  VolumeX,
  ArrowDown,
} from 'lucide-react';
import { ChatProvider, useChatContext, formatTime } from './ChatProvider';
import './solar-chat.css';

/* ================================================================
   useSound — Web Audio API Sound Effects
   ================================================================ */

interface SoundAPI {
  playSent: () => void;
  playReceived: () => void;
  playOpen: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const SOUND_KEY = 'solar-chat-sound';

function useSound(): SoundAPI {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem(SOUND_KEY);
    return stored !== null ? stored === 'true' : true;
  });

  const ctxRef = useRef<AudioContext | null>(null);

  function getCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!ctxRef.current) {
      try {
        ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      } catch {
        return null;
      }
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }

  const playSent = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  }, [soundEnabled]);

  const playReceived = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    // First tone: 660Hz
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(660, ctx.currentTime);
    gain1.gain.setValueAtTime(0.1, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.12);
    // Second tone: 880Hz
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, ctx.currentTime + 0.15);
    gain2.gain.setValueAtTime(0.001, ctx.currentTime);
    gain2.gain.setValueAtTime(0.1, ctx.currentTime + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.15);
    osc2.stop(ctx.currentTime + 0.3);
  }, [soundEnabled]);

  const playOpen = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem(SOUND_KEY, String(next));
      }
      return next;
    });
  }, []);

  return { playSent, playReceived, playOpen, soundEnabled, toggleSound };
}

/* ================================================================
   NotificationToast Component
   ================================================================ */

function NotificationToast({
  message,
  onClick,
  visible,
}: {
  message: string;
  onClick: () => void;
  visible: boolean;
}) {
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const exitTimerRef = useRef<NodeJS.Timeout | null>(null);
  const visibleRef = useRef(visible);

  useEffect(() => {
    const wasVisible = visibleRef.current;
    visibleRef.current = visible;

    if (visible && !wasVisible) {
      // New toast: reset exit state, start auto-dismiss
      setExiting(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      timerRef.current = setTimeout(() => {
        setExiting(true);
        exitTimerRef.current = setTimeout(() => {
          setExiting(false);
        }, 300);
      }, 4000);
    } else if (!visible) {
      setExiting(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, [visible]);

  if (!visible && !exiting) return null;

  const preview = message.length > 50 ? message.slice(0, 50) + '…' : message;
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <div
      className={`solar-chat-toast ${exiting ? 'toast-exit' : ''}`}
      onClick={() => {
        onClick();
        if (timerRef.current) clearTimeout(timerRef.current);
      }}
      role="button"
      tabIndex={0}
      aria-label="Open chat notification"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="solar-chat-toast-avatar" aria-hidden="true">
        <Sun size={20} />
      </div>
      <div className="solar-chat-toast-body">
        <div className="solar-chat-toast-name">Renewable Ireland</div>
        <div className="solar-chat-toast-preview">{preview}</div>
      </div>
      <span className="solar-chat-toast-time">{timeStr}</span>
    </div>
  );
}

/* ================================================================
   ScrollToBottomFab Component
   ================================================================ */

function ScrollToBottomFab({
  visible,
  onClick,
}: {
  visible: boolean;
  onClick: () => void;
}) {
  if (!visible) return null;

  return (
    <button
      className="solar-chat-scroll-fab"
      onClick={onClick}
      aria-label="Scroll to bottom"
      type="button"
    >
      <ArrowDown size={18} />
    </button>
  );
}

/* ================================================================
   DateSeparator Component
   ================================================================ */

function DateSeparator({ date }: { date: string }) {
  return (
    <div className="solar-chat-date-separator">
      <span className="solar-chat-date-pill">{date}</span>
    </div>
  );
}

/* ================================================================
   Inline Card Components (WhatsApp-styled)
   ================================================================ */

function PricingCard() {
  return (
    <div className="solar-chat-card">
      <div className="solar-chat-card-title">Solar Panel Packages</div>
      <div className="solar-chat-pricing-grid">
        <div className="solar-chat-pricing-item">
          <div>
            <div className="solar-chat-pricing-name">4kWp System</div>
            <div className="solar-chat-pricing-desc">~8 panels · Small-medium home</div>
          </div>
          <div className="solar-chat-pricing-cost">
            <div className="solar-chat-pricing-amount">€4,500</div>
            <div className="solar-chat-pricing-after">€2,700 after grant</div>
          </div>
        </div>
        <div className="solar-chat-pricing-item">
          <div>
            <div className="solar-chat-pricing-name">6kWp System</div>
            <div className="solar-chat-pricing-desc">~12 panels · Medium-large home</div>
          </div>
          <div className="solar-chat-pricing-cost">
            <div className="solar-chat-pricing-amount">€5,500</div>
            <div className="solar-chat-pricing-after">€3,700 after grant</div>
          </div>
        </div>
        <div className="solar-chat-pricing-item">
          <div>
            <div className="solar-chat-pricing-name">8kWp System</div>
            <div className="solar-chat-pricing-desc">~16 panels · Large home / EV</div>
          </div>
          <div className="solar-chat-pricing-cost">
            <div className="solar-chat-pricing-amount">€6,500</div>
            <div className="solar-chat-pricing-after">€4,700 after grant</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GrantCard() {
  return (
    <div className="solar-chat-card">
      <div className="solar-chat-card-title">SEAI Grant Eligibility</div>
      <div className="solar-chat-grant-list">
        <div className="solar-chat-grant-item">
          <span className="solar-chat-grant-check">✓</span>
          <span>Home built &amp; occupied before 2021</span>
        </div>
        <div className="solar-chat-grant-item">
          <span className="solar-chat-grant-check">✓</span>
          <span>Owner-occupied property (not rental)</span>
        </div>
        <div className="solar-chat-grant-item">
          <span className="solar-chat-grant-check">✓</span>
          <span>Registered SEAI installer used</span>
        </div>
        <div className="solar-chat-grant-item">
          <span className="solar-chat-grant-check">✓</span>
          <span>Grant amount: <strong style={{ color: '#128C7E' }}>€1,800</strong></span>
        </div>
        <div className="solar-chat-grant-item">
          <span className="solar-chat-grant-check">✓</span>
          <span>Applied for &amp; deducted from your invoice</span>
        </div>
      </div>
    </div>
  );
}

function ROICard() {
  return (
    <div className="solar-chat-card">
      <div className="solar-chat-card-title">Solar Panel ROI</div>
      <div className="solar-chat-card-row">
        <span>Typical payback period</span>
        <span className="solar-chat-card-value">5-7 years</span>
      </div>
      <div className="solar-chat-card-row">
        <span>Lifetime savings (25yr)</span>
        <span className="solar-chat-card-value">€15,000 - €25,000</span>
      </div>
      <div className="solar-chat-card-row">
        <span>Annual electricity savings</span>
        <span className="solar-chat-card-value">€800 - €1,400</span>
      </div>
      <div className="solar-chat-card-row">
        <span>CEG export earnings /yr</span>
        <span className="solar-chat-card-value">€200 - €400</span>
      </div>
      <div className="solar-chat-card-row">
        <span>Panel warranty</span>
        <span className="solar-chat-card-value">25 years</span>
      </div>
    </div>
  );
}

/* ================================================================
   Chat Window (inner component that uses context)
   ================================================================ */

function ChatWindowInner() {
  const {
    isOpen,
    unreadCount,
    messages,
    isTyping,
    toggleChat,
    sendMessage: sendMsg,
    handleQuickAction,
    clearUnread,
    openChat,
    lastBotMessage,
  } = useChatContext();

  const [input, setInput] = useState('');
  const [closing, setClosing] = useState(false);
  const [showScrollFab, setShowScrollFab] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const prevLastBotMessageRef = useRef('');

  const sound = useSound();

  /* ---- Date Separator Logic ---- */
  function getDateLabel(ts: number): string {
    const now = new Date();
    const msgDate = new Date(ts);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const msgDay = new Date(msgDate.getFullYear(), msgDate.getMonth(), msgDate.getDate());

    if (msgDay.getTime() === today.getTime()) return 'Today';
    if (msgDay.getTime() === yesterday.getTime()) return 'Yesterday';
    return msgDate.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: 'numeric' });
  }

  function needsDateSeparator(currentTs: number, prevTs: number | undefined): boolean {
    if (!prevTs) return true;
    const curr = new Date(currentTs);
    const prev = new Date(prevTs);
    return (
      curr.getFullYear() !== prev.getFullYear() ||
      curr.getMonth() !== prev.getMonth() ||
      curr.getDate() !== prev.getDate()
    );
  }

  /* Auto-scroll to bottom */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  /* Scroll handler for FAB */
  const handleScroll = useCallback(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    setShowScrollFab(distanceFromBottom > 100);
  }, []);

  /* Focus input when opening */
  useEffect(() => {
    if (isOpen) {
      clearUnread();
      sound.playOpen();
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen, clearUnread, sound]);

  /* Handle bot message arrival: toast when closed, sound when open.
     This effect synchronizes local toast UI state with the external ChatProvider context,
     which is a legitimate use of effects per React docs. */
  useEffect(() => {
    const prev = prevLastBotMessageRef.current;
    prevLastBotMessageRef.current = lastBotMessage;
    if (lastBotMessage && lastBotMessage !== prev && prev !== '') {
      if (!isOpen) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with external context store
        setToastMessage(lastBotMessage);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with external context store
        setToastVisible(true);
      }
      sound.playReceived();
    }
  }, [lastBotMessage, isOpen, sound]);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      toggleChat();
    }, 200);
  }, [toggleChat]);

  /* Focus trap: return focus to input when chat is open */
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setInput('');
    sendMsg(text);
    sound.playSent();
    /* Reset textarea height */
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  /* Auto-resize textarea */
  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 100) + 'px';
  }

  /* Only show quick actions after the greeting message */
  const showQuickActions = messages.length <= 2;

  /* Build message list with date separators */
  const renderMessages = () => {
    const elements: React.ReactNode[] = [];
    let prevTimestamp: number | undefined;

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];

      // Date separator before message if date changes
      if (needsDateSeparator(msg.timestamp, prevTimestamp)) {
        elements.push(
          <DateSeparator key={`date-${msg.id}`} date={getDateLabel(msg.timestamp)} />
        );
      }
      prevTimestamp = msg.timestamp;

      elements.push(
        <div key={msg.id} className={`solar-chat-msg ${msg.role}`}>
          <div className="solar-chat-msg-content">
            <div className="solar-chat-msg-bubble">{msg.content}</div>
            {msg.card === 'pricing' && <PricingCard />}
            {msg.card === 'grant' && <GrantCard />}
            {msg.card === 'roi' && <ROICard />}
            <div className="solar-chat-msg-meta">
              <span className="solar-chat-msg-time">{formatTime(msg.timestamp)}</span>
              {msg.role === 'user' && (
                <span className="solar-chat-msg-ticks" aria-hidden="true">✓✓</span>
              )}
            </div>
          </div>
        </div>
      );
    }

    return elements;
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        className={`solar-chat-trigger ${isOpen || closing ? 'chat-open' : ''}`}
        onClick={isOpen ? handleClose : toggleChat}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isOpen}
        type="button"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && unreadCount > 0 && (
          <span className="solar-chat-badge" aria-hidden="true">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Toast */}
      <NotificationToast
        message={toastMessage}
        onClick={openChat}
        visible={toastVisible}
      />

      {/* Screen reader announcements */}
      <div className="solar-chat-sr-only" aria-live="polite" aria-atomic="false">
        {isTyping && 'SolarBot is typing...'}
        {messages.length > 0 &&
          !isTyping &&
          `Latest message: ${messages[messages.length - 1].content.slice(0, 100)}`}
      </div>

      {/* Chat Window */}
      <div
        className={`solar-chat-window ${isOpen ? 'chat-visible' : ''} ${closing ? 'chat-closing' : ''}`}
        role="dialog"
        aria-label="Solar chat assistant"
        aria-modal={isOpen}
      >
        {/* Header */}
        <div className="solar-chat-header">
          <div className="solar-chat-header-left">
            <div className="solar-chat-header-logo" aria-hidden="true">
              <Sun size={22} />
            </div>
            <div className="solar-chat-header-info">
              <h3>Renewable Ireland</h3>
              <div className="solar-chat-header-status">
                <span className="solar-chat-status-dot" aria-hidden="true" />
                <span className="solar-chat-status-text">Online</span>
              </div>
            </div>
          </div>
          <div className="solar-chat-header-actions">
            <button
              className="solar-chat-sound-btn"
              onClick={sound.toggleSound}
              aria-label={sound.soundEnabled ? 'Mute sounds' : 'Unmute sounds'}
              type="button"
              title={sound.soundEnabled ? 'Mute sounds' : 'Unmute sounds'}
            >
              {sound.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button
              className="solar-chat-close-btn"
              onClick={handleClose}
              aria-label="Close chat"
              type="button"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          className="solar-chat-messages"
          ref={messagesContainerRef}
          onScroll={handleScroll}
          role="log"
          aria-label="Chat messages"
          aria-relevant="additions"
          style={{ position: 'relative' }}
        >
          {renderMessages()}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="solar-chat-typing" role="status" aria-label="SolarBot is typing">
              <div className="solar-chat-typing-bubble">
                <span className="solar-chat-typing-dot" />
                <span className="solar-chat-typing-dot" />
                <span className="solar-chat-typing-dot" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />

          {/* Scroll to bottom FAB */}
          <ScrollToBottomFab
            visible={showScrollFab}
            onClick={scrollToBottom}
          />
        </div>

        {/* Quick Actions */}
        {showQuickActions && !isTyping && (
          <div className="solar-chat-quick-actions" role="group" aria-label="Quick actions">
            {[
              { key: 'quote' as const, label: '💡 Get a Quote' },
              { key: 'sizing' as const, label: '📐 System Sizing' },
              { key: 'grants' as const, label: '🏛️ SEAI Grants' },
              { key: 'survey' as const, label: '📅 Book a Survey' },
              { key: 'roi' as const, label: '💰 ROI Calculator' },
            ].map((qa) => (
              <button
                key={qa.key}
                className="solar-chat-quick-btn"
                onClick={() => handleQuickAction(qa.key)}
                type="button"
              >
                {qa.label}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="solar-chat-input-area">
          <textarea
            ref={inputRef}
            className="solar-chat-input"
            placeholder="Type a message"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
            aria-label="Chat message input"
            disabled={isTyping}
          />
          <button
            className="solar-chat-send-btn"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
            type="button"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
}

/* ================================================================
   Exported Widget – wraps everything in provider
   ================================================================ */

export default function SolarChatWidget() {
  return (
    <ChatProvider>
      <ChatWindowInner />
    </ChatProvider>
  );
}
