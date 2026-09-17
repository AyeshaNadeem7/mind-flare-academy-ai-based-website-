"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import {
  X,
  User,
  GraduationCap,
  Shield,
  Mail,
  ArrowRight,
  Sparkles,
  Lock,
  KeyRound,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { UserRole, UserProfile } from "@/types";
import { LocalStore, StoredUser, DEFAULT_ADMIN_USER, supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: UserRole;
  onAuthSuccess: (user: UserProfile) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  defaultRole = "student",
  onAuthSuccess,
}: AuthModalProps) {
  const router = useRouter();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [role, setRole] = useState<UserRole>(defaultRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedShift, setSelectedShift] = useState<"Morning" | "Evening">("Morning");
  const [selectedClass, setSelectedClass] = useState("Class 10 - Science Group");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    // 1. Direct official Admin verification
    if (
      cleanEmail === DEFAULT_ADMIN_USER.email.toLowerCase() &&
      password === DEFAULT_ADMIN_USER.password
    ) {
      LocalStore.setCurrentUser(DEFAULT_ADMIN_USER);
      onAuthSuccess(DEFAULT_ADMIN_USER);
      onClose();
      router.push("/dashboard/admin");
      setIsLoading(false);
      return;
    }

    try {
      if (tab === "signin") {
        // Try Supabase auth first if configured
        let authenticatedUser: UserProfile | null = null;

        if (isSupabaseConfigured && supabase) {
          try {
            const { data, error } = await supabase.auth.signInWithPassword({
              email: cleanEmail,
              password,
            });

            if (!error && data?.user) {
              authenticatedUser = {
                id: data.user.id,
                email: data.user.email || cleanEmail,
                full_name: data.user.user_metadata?.full_name || cleanEmail.split("@")[0],
                role: (data.user.user_metadata?.role as UserRole) || role,
                shift: data.user.user_metadata?.shift || selectedShift,
                enrolled_class: data.user.user_metadata?.enrolled_class || selectedClass,
                status: "active",
                created_at: new Date().toISOString(),
              };
            }
          } catch {
            // Proceed to local storage fallback
          }
        }

        // Local Storage fallback authentication
        if (!authenticatedUser) {
          const authResult = LocalStore.authenticateUser(cleanEmail, password);
          if (authResult.user) {
            authenticatedUser = authResult.user;
          } else {
            setErrorMsg(authResult.error || "Invalid login credentials. Please check your email and password.");
            setIsLoading(false);
            return;
          }
        }

        // Role Access Control check: Prevent non-admins from admin portal
        if (role === "admin" && authenticatedUser.role !== "admin") {
          setErrorMsg(
            `Access denied: Account '${cleanEmail}' is registered as a ${authenticatedUser.role.toUpperCase()}. Only verified Admin accounts can log in as Admin.`
          );
          setIsLoading(false);
          return;
        }

        LocalStore.setCurrentUser(authenticatedUser);
        onAuthSuccess(authenticatedUser);
        onClose();
        router.push(`/dashboard/${authenticatedUser.role}`);
        return;
      } else {
        // Sign Up (Student or Teacher)
        if (role === "admin" && cleanEmail !== DEFAULT_ADMIN_USER.email.toLowerCase()) {
          setErrorMsg("Administrator accounts cannot be self-created. Please select Student or Teacher role.");
          setIsLoading(false);
          return;
        }

        if (isSupabaseConfigured && supabase) {
          try {
            await supabase.auth.signUp({
              email: cleanEmail,
              password,
              options: {
                data: {
                  full_name: fullName.trim(),
                  role,
                  phone,
                  shift: selectedShift,
                  enrolled_class: selectedClass,
                },
              },
            });
          } catch {
            // Local store will save below
          }
        }

        const newProfile: StoredUser = {
          id: `usr-${Date.now()}`,
          email: cleanEmail,
          password: password,
          full_name: fullName.trim() || cleanEmail.split("@")[0],
          role: role,
          phone: phone || "0317-5790206",
          shift: selectedShift,
          enrolled_class: selectedClass,
          status: "active",
          created_at: new Date().toISOString(),
        };

        const regResult = LocalStore.registerUser(newProfile);
        if (regResult.error || !regResult.user) {
          setErrorMsg(regResult.error || "Registration failed.");
          setIsLoading(false);
          return;
        }

        LocalStore.setCurrentUser(regResult.user);
        onAuthSuccess(regResult.user);
        onClose();
        router.push(`/dashboard/${role}`);
        return;
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-cream-100 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-cream-300 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-navy-600 hover:text-navy-900 rounded-full hover:bg-cream-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with Logo */}
        <div className="text-center mb-5">
          <Logo size="lg" className="justify-center mb-3" />
          <h3 className="font-serif font-bold text-2xl text-navy-900">
            {tab === "signin" ? "Academy Portal Sign In" : "Register Student / Faculty Account"}
          </h3>
          <p className="text-xs text-navy-700 mt-1">
            Access LMS quizzes, assignments, attendance, and progress.
          </p>
        </div>

        {/* Tab Toggle (Sign In vs Sign Up) */}
        <div className="flex border-b border-cream-300 mb-5">
          <button
            onClick={() => {
              setTab("signin");
              setErrorMsg("");
            }}
            className={`flex-1 pb-2.5 text-xs sm:text-sm font-bold border-b-2 transition ${
              tab === "signin"
                ? "border-flame-orange text-flame-dark"
                : "border-transparent text-navy-600 hover:text-navy-900"
            }`}
          >
            Sign In with Email
          </button>
          <button
            onClick={() => {
              setTab("signup");
              if (role === "admin") setRole("student");
              setErrorMsg("");
            }}
            className={`flex-1 pb-2.5 text-xs sm:text-sm font-bold border-b-2 transition ${
              tab === "signup"
                ? "border-flame-orange text-flame-dark"
                : "border-transparent text-navy-600 hover:text-navy-900"
            }`}
          >
            New Student / Teacher Sign Up
          </button>
        </div>

        {/* Role Selector */}
        <div className="mb-4">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-navy-700 mb-1.5">
            Select Your Role:
          </label>
          <div className={`grid ${tab === "signup" ? "grid-cols-2" : "grid-cols-3"} gap-2`}>
            {(tab === "signup"
              ? [
                  { id: "student", label: "Student", icon: GraduationCap },
                  { id: "teacher", label: "Teacher", icon: User },
                ]
              : [
                  { id: "student", label: "Student", icon: GraduationCap },
                  { id: "teacher", label: "Teacher", icon: User },
                  { id: "admin", label: "Admin", icon: Shield },
                ]
            ).map((r) => {
              const Icon = r.icon;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setRole(r.id as UserRole);
                    setErrorMsg("");
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                    role === r.id
                      ? "bg-navy-900 text-white shadow-sm"
                      : "bg-white text-navy-800 border border-cream-300 hover:bg-cream-200"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleFormSubmit} className="space-y-3.5">
          {tab === "signup" && (
            <>
              <div>
                <label className="block text-xs font-bold text-navy-800 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayesha Nadeem"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-400 bg-white text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-flame-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">Shift *</label>
                  <select
                    value={selectedShift}
                    onChange={(e) => setSelectedShift(e.target.value as any)}
                    className="w-full px-2.5 py-2 rounded-xl border border-cream-400 bg-white text-xs text-navy-900"
                  >
                    <option value="Morning">Morning (8-12)</option>
                    <option value="Evening">Evening (3-7)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">Class / Subject *</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-cream-400 bg-white text-xs text-navy-900"
                  >
                    <option value="Class 10 - Science Group">Class 10 - Science</option>
                    <option value="Class 9 - Science Group">Class 9 - Science</option>
                    <option value="Class 11 - Pre-Medical">Class 11 - Pre-Med</option>
                    <option value="Class 12 - Pre-Engineering">Class 12 - Pre-Eng</option>
                    <option value="ICS Computer Science">ICS Computer Science</option>
                    <option value="MDCAT / ECAT Batch">MDCAT / ECAT Batch</option>
                    <option value="Digital Short Course">Digital Short Course</option>
                    <option value="Faculty Department">Faculty Department</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-navy-800 mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-navy-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-cream-400 bg-white text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-flame-orange"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-800 mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-navy-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-cream-400 bg-white text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-flame-orange"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-700 p-1 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-flame-orange to-flame-yellow shadow-flame-sm hover:shadow-flame-md transition flex items-center justify-center gap-2 mt-4"
          >
            <span>
              {isLoading
                ? "Verifying..."
                : tab === "signin"
                ? `Sign In as ${role.toUpperCase()}`
                : `Create ${role.toUpperCase()} Account`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
