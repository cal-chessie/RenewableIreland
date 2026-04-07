'use client';

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { MessageSquare, X, Send, Sun } from 'lucide-react';
import { ChatProvider, useChatContext, relativeTime } from './ChatProvider';
import './solar-chat.css';

/* ================================================================
   Inline Card Components
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
          <span>Grant amount: <strong style={{ color: '#c8ff00' }}>€1,800</strong></span>
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
  } = useChatContext();

  const [input, setInput] = useState('');
  const [closing, setClosing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  /* Auto-scroll to bottom */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  /* Focus input when opening */
  useEffect(() => {
    if (isOpen) {
      clearUnread();
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen, clearUnread]);

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
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  /* Only show quick actions after the greeting message */
  const showQuickActions = messages.length <= 2;

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
        ref={chatRef}
      >
        {/* Header */}
        <div className="solar-chat-header">
          <div className="solar-chat-header-left">
            <div className="solar-chat-header-logo" aria-hidden="true">
              <Sun size={18} />
            </div>
            <div className="solar-chat-header-info">
              <h3>Renewable Ireland</h3>
              <div className="solar-chat-header-status">
                <span className="solar-chat-status-dot" aria-hidden="true" />
                <span className="solar-chat-status-text">Online</span>
              </div>
            </div>
          </div>
          <button
            className="solar-chat-close-btn"
            onClick={handleClose}
            aria-label="Close chat"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div
          className="solar-chat-messages"
          role="log"
          aria-label="Chat messages"
          aria-relevant="additions"
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`solar-chat-msg ${msg.role}`}>
              <div className="solar-chat-msg-avatar" aria-hidden="true">
                {msg.role === 'bot' ? <Sun size={16} /> : '👤'}
              </div>
              <div className="solar-chat-msg-content">
                <div className="solar-chat-msg-bubble">{msg.content}</div>
                {msg.card === 'pricing' && <PricingCard />}
                {msg.card === 'grant' && <GrantCard />}
                {msg.card === 'roi' && <ROICard />}
                <span className="solar-chat-msg-time">{relativeTime(msg.timestamp)}</span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="solar-chat-typing" role="status" aria-label="SolarBot is typing">
              <div className="solar-chat-typing-avatar" aria-hidden="true">
                <Sun size={16} />
              </div>
              <div className="solar-chat-typing-dots">
                <span className="solar-chat-typing-dot" />
                <span className="solar-chat-typing-dot" />
                <span className="solar-chat-typing-dot" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
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
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
