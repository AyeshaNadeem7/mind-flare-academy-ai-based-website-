"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { UserProfile } from "@/types";
import { LocalStore, DEFAULT_ADMIN_USER } from "@/lib/supabase";
import { FEE_TABLES } from "@/lib/demo-data";
import {
  Shield,
  Users,
  CreditCard,
  Flame,
  Search,
  CheckCircle,
  AlertTriangle,
  Lock,
  ArrowRight,
  LogOut,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [activeTab, setActiveTab] = useState<"users" | "overview" | "fees" | "chatbot-logs">("users");

  // Sample chatbot query telemetry logs
  const [chatLogs] = useState([
    {
      id: "log-1",
      query: "What is the fee for Class 10 full Science group?",
      matchedSource: "Matric Fees",
      responseSnippet: "The full Science Group package for Class 10 is PKR 8,000/month (or Class 9: PKR 7,500/mo)...",
      timestamp: "Today at 09:15 AM",
    },
    {
      id: "log-2",
      query: "What are the shift timings for academy?",
      matchedSource: "Shift Timings",
      responseSnippet: "Morning Shift (8:00 AM – 12:00 PM) and Evening Shift (3:00 PM – 7:00 PM), each 4 hours...",
      timestamp: "Today at 08:42 AM",
    },
    {
      id: "log-3",
      query: "Do you offer any sibling discount on fees?",
      matchedSource: "Concessions",
      responseSnippet: "Yes, Mind Flare Academy offers a 10% tuition discount applicable from the 2nd sibling onward...",
      timestamp: "Yesterday at 06:20 PM",
    },
    {
      id: "log-4",
      query: "When do MDCAT and ECAT crash courses start?",
      matchedSource: "Entry Test Prep",
      responseSnippet: "MDCAT and ECAT batches run as full 6-month programs (PKR 35,000/32,000) or 6-8 week intensive crash courses (PKR 15,000)...",
      timestamp: "Yesterday at 04:10 PM",
    },
  ]);

  useEffect(() => {
    const active = LocalStore.getCurrentUser();
    setUser(active);

    if (active && (active.role === "admin" || active.email.toLowerCase() === DEFAULT_ADMIN_USER.email.toLowerCase())) {
      setIsAuthorized(true);
      setUsersList(LocalStore.getUsers());
    } else {
      setIsAuthorized(false);
    }
  }, []);

  const handleToggleStatus = (userId: string) => {
    const updated = usersList.map((u) =>
      u.id === userId
        ? { ...u, status: (u.status === "active" ? "suspended" : "active") as "active" | "suspended" }
        : u
    );
    setUsersList(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("mfa_all_registered_users", JSON.stringify(updated));
    }
  };

  const handleDeleteUser = (userId: string, name: string) => {
    if (window.confirm(`Are you sure you want to permanently delete the account for "${name}"?`)) {
      const updated = LocalStore.deleteUser(userId);
      setUsersList(updated);
    }
  };

  const handleLogout = () => {
    LocalStore.setCurrentUser(null);
    setUser(null);
    setIsAuthorized(false);
    router.push("/");
  };

  // 1. Unauthorized Access Guard Screen
  if (isAuthorized === false) {
    return (
      <div className="min-h-screen bg-cream-200 flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-card rounded-3xl p-8 border-2 border-red-300 text-center shadow-2xl space-y-5">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto border border-red-200">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="font-serif font-bold text-2xl text-navy-900">
              Restricted Admin Area
            </h2>
            <p className="text-xs text-navy-700 mt-2 leading-relaxed">
              {user ? (
                <>
                  You are currently logged in as <strong>{user.full_name}</strong> ({user.role.toUpperCase()}). Students and teachers do not have administrative access.
                </>
              ) : (
                "Please sign in with authorized administrator credentials to manage academy records."
              )}
            </p>
          </div>

          <div className="space-y-2 pt-2">
            {user ? (
              <Link
                href={`/dashboard/${user.role}`}
                className="block w-full py-2.5 rounded-xl text-xs font-bold text-white bg-navy-900 hover:bg-navy-800 transition"
              >
                Go to {user.role.toUpperCase()} Dashboard
              </Link>
            ) : (
              <Link
                href="/"
                className="block w-full py-2.5 rounded-xl text-xs font-bold text-white bg-navy-900 hover:bg-navy-800 transition"
              >
                Go to Sign In
              </Link>
            )}

            <Link
              href="/"
              className="block text-xs font-bold text-navy-600 hover:text-navy-900 pt-1"
            >
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-cream-200 text-navy-900">
      {/* Header */}
      <header className="bg-navy-900 text-white border-b border-flame-orange sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:opacity-90 transition">
              <Logo size="sm" onDark />
            </Link>
            <span className="hidden sm:inline-block text-xs font-bold bg-flame-orange/30 text-flame-yellow px-2.5 py-1 rounded-full border border-flame-orange/40">
              Admin & Governance Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white">{user.full_name}</p>
              <p className="text-[10px] text-cream-300">Principal Administrator ({user.email})</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-semibold bg-rose-600/80 hover:bg-rose-700 text-white rounded-lg transition"
            >
              Logout
            </button>
            <Link
              href="/"
              className="px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 rounded-lg transition"
            >
              Main Site
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[
            { id: "users", label: `👥 Registered Students & Teachers (${usersList.length})` },
            { id: "overview", label: "📊 Institutional Overview" },
            { id: "fees", label: "💳 Classes & Fees Catalog" },
            { id: "chatbot-logs", label: "🤖 AI Chatbot Telemetry" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-navy-900 text-white shadow"
                  : "bg-white text-navy-800 border border-cream-400 hover:bg-cream-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. Users Tab (Live registered accounts) */}
        {activeTab === "users" && (
          <div className="glass-card rounded-2xl p-6 border border-cream-400 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-navy-900">
                  Registered Academy Accounts
                </h3>
                <p className="text-xs text-navy-700">
                  Real-time list of all students and teachers registered through the portal.
                </p>
              </div>
              <span className="text-xs font-bold bg-navy-900 text-white px-3 py-1 rounded-full">
                {usersList.length} Accounts Active
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-cream-100 text-navy-900 border-b border-cream-300 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="px-4 py-3">Full Name</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Class / Program</th>
                    <th className="px-4 py-3">Shift</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-300/70 bg-white/60">
                  {usersList.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-xs text-navy-600">
                        No registered users found yet. Newly registered student/teacher accounts will appear here instantly.
                      </td>
                    </tr>
                  ) : (
                    usersList.map((u) => (
                      <tr key={u.id} className="hover:bg-cream-50 transition">
                        <td className="px-4 py-3 font-bold text-navy-900">
                          {u.full_name}
                          <span className="block text-[10px] text-navy-500 font-normal">{u.email}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`capitalize font-bold text-xs px-2.5 py-0.5 rounded-full ${
                            u.role === "student"
                              ? "bg-flame-orange/20 text-flame-dark"
                              : u.role === "teacher"
                              ? "bg-teal-light text-teal-dark"
                              : "bg-navy-900 text-white"
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-navy-800 font-medium">
                          {u.enrolled_class || "—"}
                        </td>
                        <td className="px-4 py-3 text-xs font-bold text-navy-700">
                          {u.shift ? `${u.shift} Shift` : "Morning Shift"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                              u.status === "active"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {u.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {u.role !== "admin" ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleToggleStatus(u.id)}
                                className="text-xs font-semibold text-navy-800 hover:text-navy-950 px-2 py-1 bg-cream-200 hover:bg-cream-300 rounded-lg transition"
                              >
                                {u.status === "active" ? "Suspend" : "Activate"}
                              </button>
                              <button
                                onClick={() => handleDeleteUser(u.id, u.full_name)}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 hover:text-white hover:bg-rose-600 px-2.5 py-1 bg-rose-50 border border-rose-200 hover:border-rose-600 rounded-lg transition"
                                title="Permanently delete user"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          ) : (
                            <span className="text-[11px] text-navy-400 font-medium italic">
                              Principal Admin
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="glass-card rounded-2xl p-5 border border-cream-400 shadow-sm">
                <p className="text-[11px] font-bold uppercase text-navy-600">Total Registered Users</p>
                <p className="font-serif font-black text-3xl text-navy-900 mt-1">{usersList.length}</p>
                <p className="text-xs text-emerald-700 font-semibold mt-1">Active on Portal</p>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-cream-400 shadow-sm">
                <p className="text-[11px] font-bold uppercase text-navy-600">Shift Coverage</p>
                <p className="font-serif font-black text-3xl text-teal-dark mt-1">2 Shifts</p>
                <p className="text-xs text-navy-700 font-medium mt-1">Morning (8-12) & Evening (3-7)</p>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-cream-400 shadow-sm">
                <p className="text-[11px] font-bold uppercase text-navy-600">AI Counselor Queries</p>
                <p className="font-serif font-black text-3xl text-flame-dark mt-1">{chatLogs.length}</p>
                <p className="text-xs text-teal-dark font-semibold mt-1">Groq RAG Live</p>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-cream-400 shadow-sm">
                <p className="text-[11px] font-bold uppercase text-navy-600">Campus Status</p>
                <p className="font-serif font-black text-3xl text-navy-900 mt-1">Open</p>
                <p className="text-xs text-emerald-700 font-semibold mt-1">Jhanda Chichi, RWP</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-cream-400">
              <h3 className="font-serif font-bold text-lg text-navy-900 mb-2">
                Mind Flare Academy Administration
              </h3>
              <p className="text-xs text-navy-700">
                House DD1, Street # 6, Jhanda Chichi, Rawalpindi • WhatsApp: 0317-5790206 • Email: mindflareacademy@gmail.com
              </p>
            </div>
          </div>
        )}

        {/* 3. Fees Tab */}
        {activeTab === "fees" && (
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-cream-400">
              <h3 className="font-serif font-bold text-xl text-navy-900 mb-2">
                Classes & Subject Packages Master Catalog
              </h3>
              <p className="text-xs text-navy-700 mb-6">
                Institutional fee schedules from the official academy knowledge base.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FEE_TABLES.map((t) => (
                  <div key={t.section} className="p-4 rounded-xl bg-white border border-cream-300">
                    <h4 className="font-bold text-sm text-navy-900 mt-0.5">{t.title}</h4>
                    <p className="text-xs text-navy-700 mt-1">{t.items.length} items configured</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. Chatbot Logs Tab */}
        {activeTab === "chatbot-logs" && (
          <div className="glass-card rounded-2xl p-6 border border-cream-400">
            <div className="flex items-center justify-between pb-4 border-b border-cream-300 mb-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-navy-900 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-flame-orange" />
                  <span>Groq RAG AI Chatbot Telemetry</span>
                </h3>
                <p className="text-xs text-navy-700">
                  Model: <strong>openai/gpt-oss-120b</strong> (Groq API) • Knowledge Base: <strong>Mind Flare KB</strong>
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                Groq Active
              </span>
            </div>

            <div className="space-y-4">
              {chatLogs.map((log) => (
                <div key={log.id} className="p-4 rounded-xl bg-white border border-cream-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm text-navy-900">
                      💬 "{log.query}"
                    </p>
                    <span className="text-[11px] text-navy-500">{log.timestamp}</span>
                  </div>
                  <div className="p-2.5 rounded bg-cream-100 text-xs text-navy-800 border border-cream-300">
                    <p className="text-[10px] font-bold uppercase text-flame-dark mb-1">
                      Matched KB Chunk: {log.matchedSource}
                    </p>
                    <p className="text-xs text-navy-700">{log.responseSnippet}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
