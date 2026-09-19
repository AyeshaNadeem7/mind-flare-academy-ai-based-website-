"use client";

import React, { useState, useRef, useEffect } from "react";
import Logo from "./Logo";
import {
  Flame,
  X,
  Send,
  Sparkles,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import { ChatMessage } from "@/types";

interface ChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_PROMPTS = [
  "What is the fee for Matric (Class 10) Science?",
  "What are the Morning & Evening shift timings?",
  "What Intermediate (FSc / ICS) groups are offered?",
  "How to get admission in 6 steps?",
  "Do you offer a discount for siblings?",
  "Tell me about Bachelor (BS) subject tutoring",
];

// Helper to render formatted text with bold, bullets, and clean line breaks without raw markdown syntax
function FormattedMessage({ text }: { text: string }) {
  if (!text) return null;

  // Split lines
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5 text-xs sm:text-sm text-navy-900 leading-relaxed">
      {lines.map((line, lIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lIdx} className="h-1" />;
        }

        // Check if it's a pipe table line and sanitize it
        if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
          const cells = trimmed
            .split("|")
            .map((c) => c.trim())
            .filter((c) => c.length > 0 && !c.match(/^[-:]+$/));
          if (cells.length === 0) return null; // Table separator line
          return (
            <div
              key={lIdx}
              className="p-1.5 rounded bg-cream-100/90 border border-cream-300 flex flex-wrap gap-2 text-[11px]"
            >
              {cells.map((cell, cIdx) => (
                <span key={cIdx} className={cIdx === 0 ? "font-bold text-navy-900" : "text-navy-700"}>
                  {formatInlineText(cell)}
                  {cIdx < cells.length - 1 && " • "}
                </span>
              ))}
            </div>
          );
        }

        // Bullet points
        if (trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("* ")) {
          const content = trimmed.replace(/^[•\-\*]\s*/, "");
          return (
            <div key={lIdx} className="flex items-start gap-1.5 pl-1">
              <span className="text-flame-orange font-bold mt-0.5">•</span>
              <span className="flex-1">{formatInlineText(content)}</span>
            </div>
          );
        }

        // Numbered list
        const numMatch = trimmed.match(/^(\d+[\.\)])\s*(.+)/);
        if (numMatch) {
          return (
            <div key={lIdx} className="flex items-start gap-1.5 pl-1">
              <span className="font-bold text-teal-accent min-w-[18px]">{numMatch[1]}</span>
              <span className="flex-1">{formatInlineText(numMatch[2])}</span>
            </div>
          );
        }

        // Headings
        if (trimmed.startsWith("###")) {
          return (
            <h4 key={lIdx} className="font-serif font-bold text-navy-900 pt-1 text-xs sm:text-sm">
              {formatInlineText(trimmed.replace(/^###\s*/, ""))}
            </h4>
          );
        }
        if (trimmed.startsWith("##")) {
          return (
            <h3 key={lIdx} className="font-serif font-bold text-navy-900 pt-1.5 text-sm sm:text-base text-flame-dark">
              {formatInlineText(trimmed.replace(/^##\s*/, ""))}
            </h3>
          );
        }

        return <p key={lIdx}>{formatInlineText(trimmed)}</p>;
      })}
    </div>
  );
}

function formatInlineText(text: string) {
  // Replace **bold** with <strong> tags safely
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-navy-950">
          {part.slice(2, -2)}
        </strong>
      );
    }
    // Also handle *italic* or single * removal
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={index} className="italic text-navy-900">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

export default function ChatbotDrawer({ isOpen, onClose }: ChatbotDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: `Assalam-o-Alaikum! 🌟 Welcome to **Mind Flare Academy**!\n\nI am your AI Academic Counselor. Ask me anything about our **classes (Nursery to 12th)**, **Bachelor's support**, **fee structure**, or **shift timings** in Rawalpindi.\n\nHow may I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: "msg-" + Date.now(),
      sender: "user",
      text: userText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const botMessageId = "bot-" + Date.now();
    setMessages((prev) => [
      ...prev,
      {
        id: botMessageId,
        sender: "assistant",
        text: "",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText.trim(),
          history: messages.slice(-6).map((m) => ({ role: m.sender, content: m.text })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reach chat server");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let streamedText = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          streamedText += chunk;

          setMessages((prev) =>
            prev.map((m) => (m.id === botMessageId ? { ...m, text: streamedText } : m))
          );
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMessageId
            ? {
                ...m,
                text: "I apologize, but I encountered a momentary connection issue. Please feel free to call or WhatsApp us directly at **0317-5790206** for immediate assistance!",
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "assistant",
        text: `Assalam-o-Alaikum! 🌟 Chat has been reset. What would you like to know about Mind Flare Academy?`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-cream-100 shadow-2xl border-l border-cream-300 flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="bg-navy-900 text-white p-4 flex items-center justify-between shadow-md border-b border-flame-orange/40">
        <div className="flex items-center gap-3">
          <div className="relative p-2 bg-gradient-to-br from-flame-orange to-flame-yellow rounded-xl text-navy-950 shadow-sm">
            <Flame className="w-5 h-5 fill-current" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-navy-900 rounded-full" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base flex items-center gap-1.5 text-white">
              <span>Mind Flare AI Assistant</span>
              <Sparkles className="w-3.5 h-3.5 text-flame-yellow" />
            </h3>
            <p className="text-[11px] text-cream-300 flex items-center gap-1">
              <span>Grounding: Academy Knowledge Base</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleResetChat}
            title="Reset conversation"
            className="p-1.5 text-navy-300 hover:text-white rounded-lg hover:bg-navy-800 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            title="Close drawer"
            className="p-1.5 text-navy-300 hover:text-white rounded-lg hover:bg-navy-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Prompts Chips */}
      <div className="bg-cream-200/90 border-b border-cream-300 px-3 py-2 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            disabled={isLoading}
            className="px-2.5 py-1 text-[11px] font-semibold text-navy-800 bg-white hover:bg-cream-100 hover:text-flame-orange rounded-full border border-cream-400 transition shadow-2xs flex-shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-cream-100 to-cream-200">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-full bg-navy-900 text-flame-orange flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                  <Flame className="w-4 h-4 fill-current" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed shadow-sm ${
                  isUser
                    ? "bg-navy-900 text-white rounded-tr-none text-xs sm:text-sm"
                    : "bg-white text-navy-900 border border-cream-300 rounded-tl-none"
                }`}
              >
                {isUser ? (
                  <p>{msg.text}</p>
                ) : msg.text ? (
                  <FormattedMessage text={msg.text} />
                ) : (
                  <div className="flex items-center gap-1.5 py-1 text-navy-600 text-xs">
                    <span className="w-2 h-2 bg-flame-orange rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-flame-yellow rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-teal-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                    <span className="text-xs text-navy-700 ml-1">Searching Knowledge Base...</span>
                  </div>
                )}
                <div
                  className={`text-[10px] mt-1.5 text-right ${
                    isUser ? "text-navy-300" : "text-navy-500"
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-full bg-flame-orange text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-sm font-bold text-xs">
                  U
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Direct WhatsApp Escalation Banner */}
      <div className="px-3 py-1.5 bg-cream-300/80 border-t border-cream-400 flex items-center justify-between text-[11px]">
        <span className="text-navy-800 font-medium">Need admission counselor directly?</span>
        <a
          href="https://wa.me/923175790206?text=Assalam%20o%20Alaikum,%20I%20am%20chatting%20from%20the%20website%20and%20want%20to%20talk%20to%20an%20admissions%20officer."
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
        >
          <span>WhatsApp 0317-5790206</span>
          <ChevronRight className="w-3 h-3" />
        </a>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }}
        className="p-3 bg-white border-t border-cream-300 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask about fees, timings, classes..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-cream-100 border border-cream-400 rounded-full text-navy-900 focus:outline-none focus:ring-2 focus:ring-flame-orange"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-2.5 rounded-full bg-gradient-to-r from-flame-orange to-flame-yellow text-navy-950 hover:brightness-105 disabled:opacity-50 transition shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
