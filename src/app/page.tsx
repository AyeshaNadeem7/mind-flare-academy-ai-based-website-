"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ClassesSection from "@/components/ClassesSection";
import CoursesSection from "@/components/CoursesSection";
import FeeStructureSection from "@/components/FeeStructureSection";
import AdmissionSection from "@/components/AdmissionSection";
import FaqSection from "@/components/FaqSection";
import ContactFooter from "@/components/ContactFooter";
import FloatingWidgets from "@/components/FloatingWidgets";
import ChatbotDrawer from "@/components/ChatbotDrawer";
import AuthModal from "@/components/AuthModal";
import { UserProfile, UserRole } from "@/types";
import { LocalStore } from "@/lib/supabase";

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authDefaultRole, setAuthDefaultRole] = useState<UserRole>("student");
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    setCurrentUser(LocalStore.getCurrentUser());
  }, []);

  const handleOpenAuth = (role: UserRole = "student") => {
    setAuthDefaultRole(role);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    LocalStore.setCurrentUser(null);
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-cream-200 text-navy-900 selection:bg-flame-orange selection:text-white relative">
      {/* Navigation */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Single-Page Sections */}
      <main>
        <Hero
          onOpenChat={() => setIsChatOpen(true)}
          onOpenAuth={() => handleOpenAuth("student")}
        />
        <About />
        <ClassesSection />
        <CoursesSection />
        <FeeStructureSection />
        <AdmissionSection />
        <FaqSection onOpenChat={() => setIsChatOpen(true)} />
      </main>

      {/* Contact & Footer */}
      <ContactFooter />

      {/* Floating Action Stack (WhatsApp + AI Assistant) */}
      <FloatingWidgets
        onOpenChat={() => setIsChatOpen(true)}
        isChatOpen={isChatOpen}
      />

      {/* AI Assistant Chatbot Drawer */}
      <ChatbotDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Role-Based Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        defaultRole={authDefaultRole}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
