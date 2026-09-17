import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { UserProfile, Assignment, Submission, Quiz, QuizAttempt, Announcement } from "@/types";

const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseUrl = rawSupabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes("your-project") &&
    !supabaseAnonKey.includes("your-anon")
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Extended user record including password for persistent local auth
export interface StoredUser extends UserProfile {
  password?: string;
}

// Local storage keys
const LOCAL_STORAGE_KEY_USER = "mfa_active_user";
const LOCAL_STORAGE_KEY_ALL_USERS = "mfa_all_registered_users";
const LOCAL_STORAGE_KEY_SUBMISSIONS = "mfa_submissions";
const LOCAL_STORAGE_KEY_ASSIGNMENTS = "mfa_assignments";
const LOCAL_STORAGE_KEY_QUIZZES = "mfa_quizzes";
const LOCAL_STORAGE_KEY_ATTEMPTS = "mfa_quiz_attempts";
const LOCAL_STORAGE_KEY_ANNOUNCEMENTS = "mfa_announcements";

// Default Official Admin Account as requested by user
export const DEFAULT_ADMIN_USER: StoredUser = {
  id: "admin-jaweria",
  email: "jawerianadeem93@gmail.com",
  password: "admin",
  full_name: "Jaweria Nadeem",
  role: "admin",
  phone: "0317-5790206",
  enrolled_class: "Academy Principal & Administration",
  shift: "Morning",
  status: "active",
  created_at: new Date().toISOString(),
};

export const LocalStore = {
  getUsers(): StoredUser[] {
    if (typeof window === "undefined") return [DEFAULT_ADMIN_USER];
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_ALL_USERS);
    if (!stored) {
      localStorage.setItem(LOCAL_STORAGE_KEY_ALL_USERS, JSON.stringify([DEFAULT_ADMIN_USER]));
      return [DEFAULT_ADMIN_USER];
    }
    try {
      const users: StoredUser[] = JSON.parse(stored);
      const adminIdx = users.findIndex(
        (u) => u.email.toLowerCase() === DEFAULT_ADMIN_USER.email.toLowerCase()
      );
      if (adminIdx === -1) {
        users.push(DEFAULT_ADMIN_USER);
        localStorage.setItem(LOCAL_STORAGE_KEY_ALL_USERS, JSON.stringify(users));
      } else {
        users[adminIdx] = { ...users[adminIdx], ...DEFAULT_ADMIN_USER };
      }
      return users;
    } catch {
      return [DEFAULT_ADMIN_USER];
    }
  },

  findUserByEmail(email: string): StoredUser | null {
    const users = this.getUsers();
    return (
      users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase()) || null
    );
  },

  deleteUser(userId: string): StoredUser[] {
    const users = this.getUsers();
    const updated = users.filter((u) => u.id !== userId || u.email.toLowerCase() === DEFAULT_ADMIN_USER.email.toLowerCase());
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY_ALL_USERS, JSON.stringify(updated));
    }
    return updated;
  },

  authenticateUser(email: string, passwordAttempt: string): { user: StoredUser | null; error?: string } {
    const cleanEmail = email.trim().toLowerCase();
    const existing = this.findUserByEmail(cleanEmail);

    if (!existing) {
      return {
        user: null,
        error: "No account found with this email. Please click 'New Student / Teacher Sign Up' below to create your account.",
      };
    }

    if (existing.password && existing.password !== passwordAttempt) {
      return {
        user: null,
        error: "Incorrect password. Please verify your password and try again.",
      };
    }

    return { user: existing };
  },

  registerUser(newUser: StoredUser): { user: StoredUser | null; error?: string } {
    const cleanEmail = newUser.email.trim().toLowerCase();
    const existing = this.findUserByEmail(cleanEmail);

    if (existing) {
      return {
        user: null,
        error: "An account with this email already exists. Please Sign In using your password.",
      };
    }

    const users = this.getUsers();
    const updated = [{ ...newUser, email: cleanEmail }, ...users];
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY_ALL_USERS, JSON.stringify(updated));
    }
    return { user: newUser };
  },

  getCurrentUser(): UserProfile | null {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return null;
      }
    }
    return null;
  },

  setCurrentUser(user: UserProfile | null) {
    if (typeof window === "undefined") return;
    if (user) {
      const { ...safeUser } = user;
      localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(safeUser));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
    }
  },

  getAssignments(): Assignment[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_ASSIGNMENTS);
    if (!stored) {
      localStorage.setItem(LOCAL_STORAGE_KEY_ASSIGNMENTS, JSON.stringify([]));
      return [];
    }
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  },

  addAssignment(assignment: Assignment) {
    const list = this.getAssignments();
    const updated = [assignment, ...list];
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY_ASSIGNMENTS, JSON.stringify(updated));
    }
    return updated;
  },

  getSubmissions(): Submission[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_SUBMISSIONS);
    if (!stored) {
      localStorage.setItem(LOCAL_STORAGE_KEY_SUBMISSIONS, JSON.stringify([]));
      return [];
    }
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  },

  submitAssignment(sub: Submission) {
    const list = this.getSubmissions();
    const updated = [sub, ...list];
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY_SUBMISSIONS, JSON.stringify(updated));
    }
    return updated;
  },

  gradeSubmission(submissionId: string, score: number, feedback: string) {
    const list = this.getSubmissions();
    const updated = list.map((item) =>
      item.id === submissionId ? { ...item, score, feedback, status: "graded" as const } : item
    );
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY_SUBMISSIONS, JSON.stringify(updated));
    }
    return updated;
  },

  getQuizzes(): Quiz[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_QUIZZES);
    if (!stored) {
      localStorage.setItem(LOCAL_STORAGE_KEY_QUIZZES, JSON.stringify([]));
      return [];
    }
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  },

  addQuiz(quiz: Quiz) {
    const list = this.getQuizzes();
    const updated = [quiz, ...list];
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY_QUIZZES, JSON.stringify(updated));
    }
    return updated;
  },

  getQuizAttempts(): QuizAttempt[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_ATTEMPTS);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  },

  saveQuizAttempt(attempt: QuizAttempt) {
    const list = this.getQuizAttempts();
    const updated = [attempt, ...list];
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY_ATTEMPTS, JSON.stringify(updated));
    }
    return updated;
  },

  getAnnouncements(): Announcement[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_ANNOUNCEMENTS);
    if (!stored) {
      localStorage.setItem(LOCAL_STORAGE_KEY_ANNOUNCEMENTS, JSON.stringify([]));
      return [];
    }
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  },

  addAnnouncement(announcement: Announcement) {
    const list = this.getAnnouncements();
    const updated = [announcement, ...list];
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY_ANNOUNCEMENTS, JSON.stringify(updated));
    }
    return updated;
  },
};
