"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Clock,
  Send,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function ContactFooter() {
  const [formSent, setFormSent] = useState(false);
  const [contactMsg, setContactMsg] = useState({ name: "", email: "", message: "" });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    const msg = `Assalam o Alaikum,%0AFrom: ${encodeURIComponent(contactMsg.name)} (${encodeURIComponent(
      contactMsg.email
    )})%0AMessage: ${encodeURIComponent(contactMsg.message)}`;
    window.open(`https://wa.me/923175790206?text=${msg}`, "_blank");
  };

  return (
    <footer id="contact" className="bg-navy-950 text-white relative pt-20 pb-10 overflow-hidden">
      {/* Top subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-flame-orange/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-navy-800">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-block">
              <Logo size="lg" onDark />
            </div>
            <p className="text-xs sm:text-sm text-navy-200 leading-relaxed max-w-sm">
              Mind Flare Academy is a premier coaching institute in Jhanda Chichi, Rawalpindi. We provide concept-based coaching from Nursery to Class 12, MDCAT/ECAT entry tests, and digital short courses.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/923175790206"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center text-white transition transform hover:scale-110 shadow-sm"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/mind_flare_academy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 flex items-center justify-center text-white transition transform hover:scale-110 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:mindflareacademy@gmail.com"
                className="w-9 h-9 rounded-full bg-teal-accent hover:bg-teal-400 flex items-center justify-center text-white transition transform hover:scale-110 shadow-sm"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-lg text-flame-yellow">
              Contact & Location
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-navy-200">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-accent flex-shrink-0 mt-0.5" />
                <span>House DD1, Street # 6, Jhanda Chichi, Rawalpindi, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-flame-orange flex-shrink-0" />
                <a href="tel:03175790206" className="hover:text-flame-yellow transition">
                  0317-5790206 (Call & WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-accent flex-shrink-0" />
                <a href="mailto:mindflareacademy@gmail.com" className="hover:text-flame-yellow transition break-all">
                  mindflareacademy@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <a
                  href="https://instagram.com/mind_flare_academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-flame-yellow transition"
                >
                  @mind_flare_academy
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-flame-yellow">
                Shift Schedules:
              </p>
              <p className="text-xs text-navy-300">
                • Morning: 8:00 AM – 12:00 PM (4h)<br />
                • Evening: 3:00 PM – 7:00 PM (4h)
              </p>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-lg text-flame-yellow">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-navy-200">
              <li>
                <a href="#about" className="hover:text-flame-yellow transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-teal-accent" />
                  <span>About Academy</span>
                </a>
              </li>
              <li>
                <a href="#classes" className="hover:text-flame-yellow transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-teal-accent" />
                  <span>Classes (Nursery-12)</span>
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-flame-yellow transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-teal-accent" />
                  <span>Short IT Courses</span>
                </a>
              </li>
              <li>
                <a href="#fees" className="hover:text-flame-yellow transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-teal-accent" />
                  <span>Fee Structure</span>
                </a>
              </li>
              <li>
                <a href="#admissions" className="hover:text-flame-yellow transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-teal-accent" />
                  <span>Admission Process</span>
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-flame-yellow transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-teal-accent" />
                  <span>Official FAQs</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Location Map Embed & Quick Message */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-lg text-flame-yellow">
              Campus Map
            </h4>
            <div className="rounded-xl overflow-hidden border border-navy-700 bg-navy-900 p-2 relative group">
              <div className="h-32 rounded-lg bg-navy-800 flex flex-col items-center justify-center text-center p-3 border border-navy-700">
                <MapPin className="w-6 h-6 text-flame-orange mb-1 animate-bounce" />
                <p className="text-xs font-bold text-white">House DD1, Street # 6</p>
                <p className="text-[11px] text-navy-300">Jhanda Chichi, Rawalpindi</p>
                <a
                  href="https://maps.google.com/?q=Jhanda+Chichi+Rawalpindi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-[10px] font-bold uppercase tracking-wider text-teal-accent hover:underline"
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Micro Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-navy-400">
          <p>© {new Date().getFullYear()} Mind Flare Academy. All Rights Reserved. Rawalpindi, Pakistan.</p>
          <div className="flex items-center gap-4">
            <span>Quality Education</span>
            <span>•</span>
            <span>Concept-Based</span>
            <span>•</span>
            <span>Proven Exam Results</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
