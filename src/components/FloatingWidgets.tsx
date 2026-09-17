"use client";

import React from "react";
import { MessageCircle, Flame, Sparkles } from "lucide-react";

interface FloatingWidgetsProps {
  onOpenChat: () => void;
  isChatOpen: boolean;
}

export default function FloatingWidgets({ onOpenChat, isChatOpen }: FloatingWidgetsProps) {
  return (
    <aside aria-label="Quick contact and AI assistant actions" className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* 1. WhatsApp Floating Quick Button */}
      <a
        href="https://wa.me/923175790206?text=Assalam%20o%20Alaikum,%20I%20want%20to%20inquire%20about%20Mind%20Flare%20Academy%20admissions."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Mind Flare Academy on WhatsApp"
        className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        <MessageCircle className="w-6 h-6 fill-current text-white flex-shrink-0" />
        <span className="hidden sm:inline-block text-xs font-bold tracking-wide">
          WhatsApp Us
        </span>
      </a>

      {/* 2. AI Assistant Floating Chat Launcher */}
      {!isChatOpen && (
        <button
          onClick={onOpenChat}
          aria-label="Open Mind Flare AI Assistant chat"
          className="group relative flex items-center gap-2.5 bg-gradient-to-r from-flame-orange via-amber-500 to-flame-yellow text-navy-950 p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-flame-md hover:shadow-flame-lg transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/80"
        >
          {/* Animated Glow Halo */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-flame-orange to-flame-yellow opacity-40 blur-sm group-hover:opacity-80 transition duration-300 -z-10 animate-pulse" />

          <div className="relative">
            <Flame className="w-6 h-6 text-navy-950 fill-flame-orange" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          <div className="text-left hidden sm:block">
            <p className="text-[10px] uppercase font-black tracking-wider text-navy-900 leading-none">
              Mind Flare AI
            </p>
            <p className="text-xs font-black text-navy-950 leading-tight">
              Ask Anything
            </p>
          </div>
        </button>
      )}
    </aside>
  );
}
