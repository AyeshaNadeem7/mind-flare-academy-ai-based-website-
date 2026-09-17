"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { Menu, X, User, Sparkles } from "lucide-react";
import { UserProfile } from "@/types";

interface NavbarProps {
  onOpenAuth: (role?: "student" | "teacher" | "admin") => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
}

export default function Navbar({ onOpenAuth, currentUser, onLogout }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Classes", href: "#classes" },
    { name: "Courses", href: "#courses" },
    { name: "Fee Structure", href: "#fees" },
    { name: "Admission", href: "#admissions" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-cream-100/95 backdrop-blur-md shadow-md border-b border-cream-300/80 py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="#home" className="flex items-center focus:outline-none py-1">
            <Logo size="lg" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-sm font-semibold text-navy-900 hover:text-flame-orange rounded-md transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-teal-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <Link
                  href={`/dashboard/${currentUser.role}`}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-navy-900 bg-white border border-flame-orange/40 rounded-full hover:shadow-md transition-all"
                >
                  <User className="w-3.5 h-3.5 text-flame-orange" />
                  <span>{currentUser.role} Portal</span>
                </Link>
                <button
                  onClick={onLogout}
                  className="text-xs text-navy-700 hover:text-red-600 font-semibold px-2 py-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth("student")}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-navy-900 bg-white/90 hover:bg-white border border-navy-900/20 rounded-full transition-all hover:border-flame-orange"
                >
                  Portal Login
                </button>
                <a
                  href="#admissions"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-flame-orange to-flame-yellow rounded-full shadow-flame-sm hover:shadow-flame-md transition-all transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Enroll Now</span>
                </a>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-navy-900 hover:text-flame-orange focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream-100/98 backdrop-blur-xl border-b border-cream-300 shadow-xl px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-semibold text-navy-900 hover:text-flame-orange hover:bg-cream-200/60 rounded-lg transition"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-cream-300 flex flex-col gap-2">
            {currentUser ? (
              <>
                <Link
                  href={`/dashboard/${currentUser.role}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-bold text-white bg-navy-900 rounded-lg shadow"
                >
                  Open {currentUser.role.toUpperCase()} Dashboard
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-center text-xs font-semibold text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth("student");
                  }}
                  className="w-full py-2.5 text-center text-sm font-bold text-navy-900 bg-white border border-navy-900/20 rounded-lg"
                >
                  Student / Faculty Portal Login
                </button>
                <a
                  href="#admissions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-bold text-white bg-gradient-to-r from-flame-orange to-flame-yellow rounded-lg shadow-flame-sm"
                >
                  Enroll Today
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
