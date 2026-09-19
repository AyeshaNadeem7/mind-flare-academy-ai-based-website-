"use client";

import React from "react";
import Logo from "./Logo";
import {
  Sparkles,
  ArrowRight,
  Clock,
  MapPin,
  GraduationCap,
  Award,
  BookOpen,
  Flame,
  MessageCircle,
} from "lucide-react";

interface HeroProps {
  onOpenChat: () => void;
  onOpenAuth: () => void;
}

export default function Hero({ onOpenChat, onOpenAuth }: HeroProps) {
  return (
    <section
      id="home"
      className="relative pt-28 sm:pt-36 pb-20 md:pb-28 overflow-hidden bg-gradient-to-b from-cream-100 via-cream-200 to-cream-200"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] bg-gradient-to-tr from-flame-orange/15 via-flame-yellow/20 to-teal-accent/10 blur-3xl -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-teal-accent/10 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Tagline, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Academy Announcement Pill (Only Admissions Open 2026) */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-flame-orange/30 shadow-sm text-xs font-semibold text-navy-900 animate-flame-pulse">
              <span className="flex h-2 w-2 rounded-full bg-flame-orange" />
              <span>Admissions Open 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 leading-[1.15] tracking-tight">
              Ignite Curiosity. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-flame-orange via-amber-500 to-flame-yellow">
                Strengthen Concepts.
              </span>{" "}
              <br />
              Conquer Academic Exams.
            </h1>

            {/* Subheading / Description */}
            <p className="text-base sm:text-lg text-navy-800/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Mind Flare Academy provides premier academic coaching from{" "}
              <strong className="font-semibold text-navy-900">Nursery to Class 12</strong> (Matric & Intermediate)
              and <strong className="font-semibold text-navy-900">Bachelor's Degree Subject Support</strong> with flexible
              Morning & Evening shifts.
            </p>

            {/* Shift Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-navy-800">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg border border-cream-300 shadow-sm">
                <Clock className="w-4 h-4 text-flame-orange" />
                <span>
                  <strong>Morning:</strong> 8:00 AM – 12:00 PM
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg border border-cream-300 shadow-sm">
                <Clock className="w-4 h-4 text-teal-accent" />
                <span>
                  <strong>Evening:</strong> 3:00 PM – 7:00 PM
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Primary CTA */}
              <a
                href="#admissions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-flame-orange to-flame-yellow shadow-flame-md hover:shadow-flame-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>Enroll Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* WhatsApp CTA (Just WhatsApp, no number displayed in button text) */}
              <a
                href="https://wa.me/923175790206?text=Assalam%20o%20Alaikum,%20I%20want%20to%20inquire%20about%20admissions%20at%20Mind%20Flare%20Academy."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-sm tracking-wide text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-all transform hover:-translate-y-0.5 shadow-sm"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span>WhatsApp</span>
              </a>

              {/* AI Chatbot CTA */}
              <button
                onClick={onOpenChat}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-navy-900 bg-white hover:bg-cream-100 border border-navy-900/20 shadow-sm transition-all hover:border-flame-orange"
              >
                <Flame className="w-4 h-4 text-flame-orange" />
                <span>Ask AI Assistant</span>
              </button>
            </div>

            {/* Key Trust Points */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-navy-900/10 text-center sm:text-left">
              <div className="space-y-0.5">
                <p className="font-serif font-bold text-lg sm:text-xl text-navy-900">80%+ Minimum</p>
                <p className="text-[11px] sm:text-xs text-navy-700">Attendance & Assessment</p>
              </div>
              <div className="space-y-0.5 border-x border-navy-900/10 px-2">
                <p className="font-serif font-bold text-lg sm:text-xl text-flame-orange">10% Off</p>
                <p className="text-[11px] sm:text-xs text-navy-700">Sibling Tuition Discount</p>
              </div>
              <div className="space-y-0.5">
                <p className="font-serif font-bold text-lg sm:text-xl text-teal-accent">Top Faculty</p>
                <p className="text-[11px] sm:text-xs text-navy-700">Experienced Specialists</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 relative z-10 border border-cream-400/50">
                {/* Header inside Card */}
                <div className="flex items-center justify-between pb-5 border-b border-cream-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-flame-orange/20 to-flame-yellow/20 border border-flame-orange/30">
                      <Flame className="w-6 h-6 text-flame-orange" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-navy-900">Mind Flare Academy</h3>
                      <p className="text-xs text-navy-700 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-teal-accent" />
                        <span>House DD1, St # 6, Jhanda Chichi, RWP</span>
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 rounded-full">
                    Active Session
                  </span>
                </div>

                {/* Programs Showcase List */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/80 border border-cream-300/80 hover:border-flame-orange/50 transition">
                    <div className="flex items-center gap-2.5">
                      <GraduationCap className="w-5 h-5 text-flame-orange" />
                      <div>
                        <p className="text-xs font-bold text-navy-900">Matric (9th & 10th) Science & Arts</p>
                        <p className="text-[11px] text-navy-700">Full group packages from PKR 7,500/mo</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-flame-orange bg-flame-orange/10 px-2 py-0.5 rounded">BISE Board</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/80 border border-cream-300/80 hover:border-teal-accent/50 transition">
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-5 h-5 text-teal-accent" />
                      <div>
                        <p className="text-xs font-bold text-navy-900">Inter (11th & 12th) FSc / ICS / I.Com</p>
                        <p className="text-[11px] text-navy-700">Pre-Medical, Pre-Eng, ICS from PKR 9,000/mo</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-teal-accent bg-teal-light px-2 py-0.5 rounded">HSSC</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/80 border border-cream-300/80 hover:border-amber-500/50 transition">
                    <div className="flex items-center gap-2.5">
                      <Award className="w-5 h-5 text-amber-500" />
                      <div>
                        <p className="text-xs font-bold text-navy-900">Primary & Middle Section (Nur - 8)</p>
                        <p className="text-[11px] text-navy-700">Core foundational coaching & exams</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">Foundation</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/80 border border-cream-300/80 hover:border-navy-900/40 transition">
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-5 h-5 text-navy-800" />
                      <div>
                        <p className="text-xs font-bold text-navy-900">Bachelor's Degree Support (BS)</p>
                        <p className="text-[11px] text-navy-700">CS, Math, BBA, Sciences & Education</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-navy-900 bg-navy-100 px-2 py-0.5 rounded">Degree Prep</span>
                  </div>
                </div>

                {/* Quick Admission CTA Banner inside card */}
                <div className="mt-5 p-3.5 rounded-xl bg-navy-900 text-white flex items-center justify-between">
                  <div className="text-xs">
                    <p className="font-bold text-flame-yellow">Need Placement Guidance?</p>
                    <p className="text-navy-200 text-[11px]">Free placement tests & trial classes</p>
                  </div>
                  <a
                    href="https://wa.me/923175790206?text=Hello%20Mind%20Flare%20Academy,%20I%20would%20like%20to%20book%20a%20free%20assessment%20test."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-bold bg-flame-orange hover:bg-flame-yellow hover:text-navy-900 text-white rounded-lg transition-colors"
                  >
                    Chat Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
