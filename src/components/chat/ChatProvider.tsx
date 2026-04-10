'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: number;
  /** Optional structured card data rendered inline */
  card?: 'pricing' | 'grant' | 'roi' | null;
}

export type LeadStep =
  | 'idle'
  | 'ask_name'
  | 'ask_phone'
  | 'ask_email'
  | 'ask_county'
  | 'complete';

export interface LeadData {
  name: string;
  phone: string;
  email: string;
  county: string;
}

type QuickAction =
  | 'quote'
  | 'sizing'
  | 'grants'
  | 'survey'
  | 'roi';

interface ChatContextValue {
  isOpen: boolean;
  unreadCount: number;
  messages: ChatMessage[];
  isTyping: boolean;
  leadStep: LeadStep;
  leadData: LeadData;
  lastBotMessage: string;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  sendMessage: (text: string) => Promise<void>;
  handleQuickAction: (action: QuickAction) => void;
  clearUnread: () => void;
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const ChatContext = createContext<ChatContextValue | null>(null);

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChatContext must be used within <ChatProvider>');
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

let msgCounter = 0;
function uid(): string {
  return `chat-msg-${Date.now()}-${++msgCounter}`;
}

/**
 * Format a timestamp as clock time: "10:30 AM"
 */
function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}

/**
 * Legacy relative time – kept for potential external usage
 */
function relativeTime(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 10) return 'Just now';
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export { relativeTime, formatTime };

const STORAGE_KEY = 'solar_chat_history';
const MAX_MESSAGES = 60;

function loadHistory(): ChatMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ChatMessage[];
  } catch {
    return [];
  }
}

function saveHistory(messages: ChatMessage[]) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_MESSAGES)));
  } catch {
    /* quota exceeded – ignore */
  }
}

/* ------------------------------------------------------------------ */
/*  Greeting & Quick-Action Templates                                  */
/* ------------------------------------------------------------------ */

const GREETING: ChatMessage = {
  id: 'greeting',
  role: 'bot',
  content:
    "Hi there! 👋 Welcome to Renewable Ireland. I'm here to help with solar panels, grants, pricing, and more. What can I help you with today?",
  timestamp: Date.now(),
  card: null,
};

const QUICK_ACTION_MAP: Record<QuickAction, string> = {
  quote:
    "I'd love a personalised quote for solar panels. Can you tell me what's included and the pricing options?",
  sizing:
    'How do I know what size solar panel system I need for my home?',
  grants:
    'Can you explain the SEAI grant available and how I can apply?',
  survey:
    "I'd like to book a free roof survey. Can you help me with that?",
  roi:
    "What's the return on investment for solar panels in Ireland?",
};

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [isTyping, setIsTyping] = useState(false);
  const [leadStep, setLeadStep] = useState<LeadStep>('idle');
  const [leadData, setLeadData] = useState<LeadData>({ name: '', phone: '', email: '', county: '' });
  const [lastBotMessage, setLastBotMessage] = useState('');

  const initialized = useRef(false);

  /* Hydrate from sessionStorage on mount */
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const saved = loadHistory();
    if (saved.length > 0) {
      setMessages(saved);
    }
  }, []);

  /* Persist on change */
  useEffect(() => {
    saveHistory(messages);
  }, [messages]);

  /* ---- open / close ---- */
  const openChat = useCallback(() => {
    setIsOpen(true);
    setUnreadCount(0);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    if (isOpen) closeChat();
    else openChat();
  }, [isOpen, openChat, closeChat]);

  const clearUnread = useCallback(() => setUnreadCount(0), []);

  /* ---- send message to API ---- */
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const userMsg: ChatMessage = {
        id: uid(),
        role: 'user',
        content: text.trim(),
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMsg].map((m) => ({
              role: m.role === 'bot' ? 'assistant' : m.role,
              content: m.content,
            })),
            leadData: leadStep !== 'idle' ? leadData : undefined,
          }),
        });

        const data = await res.json();
        const botContent: string = data.message ?? "Sorry, I couldn't process that. Please try again.";

        /* Track last bot message for toast notifications */
        setLastBotMessage(botContent);

        /* Determine card type from keywords */
        let card: ChatMessage['card'] = null;
        const lower = botContent.toLowerCase();
        if (lower.includes('[pricing]') || lower.includes('4kwp') || lower.includes('6kwp') || lower.includes('8kwp')) {
          card = 'pricing';
        } else if (lower.includes('[grant]') || lower.includes('€1,800') || lower.includes('seai grant')) {
          card = 'grant';
        } else if (lower.includes('[roi]') || lower.includes('payback') || lower.includes('lifetime savings')) {
          card = 'roi';
        }

        const botMsg: ChatMessage = {
          id: uid(),
          role: 'bot',
          content: botContent,
          timestamp: Date.now(),
          card,
        };

        setMessages((prev) => [...prev, botMsg]);

        /* Handle lead qualification suggestion */
        if (data.leadQualified && leadStep === 'idle') {
          setLeadStep('ask_name');
          const followUp: ChatMessage = {
            id: uid(),
            role: 'bot',
            content: "It sounds like you're interested! I can get you a personalised quote. What's your name?",
            timestamp: Date.now(),
          };
          setMessages((prev) => [...prev, followUp]);
          setLastBotMessage(followUp.content);
        }

        /* Track suggested actions */
        if (data.suggestedAction === 'book_survey' && leadStep === 'complete') {
          setLeadStep('idle');
        }
      } catch {
        const errMsg: ChatMessage = {
          id: uid(),
          role: 'bot',
          content: "I'm having trouble connecting right now. Please try again in a moment, or call us at +353 87 395 8424.",
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errMsg]);
        setLastBotMessage(errMsg.content);
      } finally {
        setIsTyping(false);
      }

      /* Increment unread if chat is closed */
      if (!isOpen) {
        setUnreadCount((c) => c + 1);
      }
    },
    [messages, leadStep, leadData, isOpen],
  );

  /* ---- lead capture flow within chat ---- */
  const handleLeadCapture = useCallback(
    async (text: string) => {
      switch (leadStep) {
        case 'ask_name': {
          setLeadData((prev) => ({ ...prev, name: text }));
          setLeadStep('ask_phone');
          await new Promise<void>((resolve) => {
            const msg: ChatMessage = {
              id: uid(),
              role: 'bot',
              content: `Thanks ${text}! What's the best phone number to reach you?`,
              timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, msg]);
            setLastBotMessage(msg.content);
            resolve();
          });
          break;
        }
        case 'ask_phone': {
          setLeadData((prev) => ({ ...prev, phone: text }));
          setLeadStep('ask_email');
          await new Promise<void>((resolve) => {
            const msg: ChatMessage = {
              id: uid(),
              role: 'bot',
              content: 'And your email address?',
              timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, msg]);
            setLastBotMessage(msg.content);
            resolve();
          });
          break;
        }
        case 'ask_email': {
          setLeadData((prev) => ({ ...prev, email: text }));
          setLeadStep('ask_county');
          await new Promise<void>((resolve) => {
            const msg: ChatMessage = {
              id: uid(),
              role: 'bot',
              content: 'What county are you in?',
              timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, msg]);
            setLastBotMessage(msg.content);
            resolve();
          });
          break;
        }
        case 'ask_county': {
          const fullLead = { ...leadData, county: text };
          setLeadData(fullLead);
          setLeadStep('complete');

          /* Submit lead */
          try {
            await fetch('/api/chat/lead', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(fullLead),
            });
          } catch {
            /* silently fail – still show confirmation */
          }

          const ref = `RI-${Date.now().toString(36).toUpperCase()}`;
          await new Promise<void>((resolve) => {
            const msg: ChatMessage = {
              id: uid(),
              role: 'bot',
              content: `Perfect! I've sent your details to our team. They'll call you within 1 hour during business hours (Mon-Sat 8am-6pm). Your reference is #${ref}. Is there anything else I can help with?`,
              timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, msg]);
            setLastBotMessage(msg.content);
            resolve();
          });
          break;
        }
        default:
          break;
      }
    },
    [leadStep, leadData],
  );

  /* ---- unified send handler ---- */
  const sendOrCapture = useCallback(
    async (text: string) => {
      if (['ask_name', 'ask_phone', 'ask_email', 'ask_county'].includes(leadStep)) {
        const userMsg: ChatMessage = {
          id: uid(),
          role: 'user',
          content: text.trim(),
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, userMsg]);
        await handleLeadCapture(text.trim());
      } else {
        await sendMessage(text);
      }
    },
    [leadStep, sendMessage, handleLeadCapture],
  );

  /* ---- quick actions ---- */
  const handleQuickAction = useCallback(
    (action: QuickAction) => {
      if (action === 'survey') {
        if (leadStep === 'idle' || leadStep === 'complete') {
          setLeadStep('ask_name');
          setLeadData({ name: '', phone: '', email: '', county: '' });
          const msg: ChatMessage = {
            id: uid(),
            role: 'bot',
            content: "Great! I can help you book a survey. What's your name?",
            timestamp: Date.now(),
          };
          setMessages((prev) => [...prev, msg]);
          setLastBotMessage(msg.content);
        }
      } else {
        sendOrCapture(QUICK_ACTION_MAP[action]);
      }
    },
    [leadStep, sendOrCapture],
  );

  /* ---- expose with overridden sendMessage ---- */
  const value: ChatContextValue = {
    isOpen,
    unreadCount,
    messages,
    isTyping,
    leadStep,
    leadData,
    lastBotMessage,
    openChat,
    closeChat,
    toggleChat,
    sendMessage: sendOrCapture,
    handleQuickAction,
    clearUnread,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
