"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { UserProfile, Assignment, Submission, Quiz, Announcement } from "@/types";
import { LocalStore } from "@/lib/supabase";
import {
  PlusCircle,
  FileCheck,
  Bell,
  Sparkles,
} from "lucide-react";

export default function TeacherDashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // Modals / forms
  const [activeTab, setActiveTab] = useState<"grading" | "new-asg" | "new-quiz" | "announcement">("grading");

  // New assignment form state
  const [newAsg, setNewAsg] = useState({
    title: "",
    subject: "Physics",
    className: "Class 10 - Science Group",
    description: "",
    dueDate: "2026-10-05",
    maxScore: 20,
  });

  // New quiz builder form state
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    subject: "Physics",
    className: "Class 10 - Science Group",
    durationMinutes: 10,
    questionText: "",
    optA: "",
    optB: "",
    optC: "",
    optD: "",
    correctIdx: 0,
    explanation: "",
  });

  // Grading form state
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);
  const [gradingScore, setGradingScore] = useState<number>(18);
  const [gradingFeedback, setGradingFeedback] = useState<string>("Great conceptual grasp!");

  // New announcement form state
  const [announcementText, setAnnouncementText] = useState("");
  const [announcementTitle, setAnnouncementTitle] = useState("");

  useEffect(() => {
    const active = LocalStore.getCurrentUser();
    if (active) {
      setUser(active);
    } else {
      const fallbackTeacher: UserProfile = {
        id: "teacher-temp",
        email: "teacher@mindflare.pk",
        full_name: "Academy Instructor",
        role: "teacher",
        phone: "0317-5790206",
        enrolled_class: "Faculty Member",
        shift: "Morning",
        status: "active",
        created_at: new Date().toISOString(),
      };
      setUser(fallbackTeacher);
      LocalStore.setCurrentUser(fallbackTeacher);
    }

    setAssignments(LocalStore.getAssignments());
    setSubmissions(LocalStore.getSubmissions());
    setQuizzes(LocalStore.getQuizzes());
    setAnnouncements(LocalStore.getAnnouncements());
  }, []);

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newAsg.title) return;

    const created: Assignment = {
      id: `asg-${Date.now()}`,
      title: newAsg.title,
      subject: newAsg.subject,
      class_name: newAsg.className,
      teacher_id: user.id,
      teacher_name: user.full_name,
      description: newAsg.description,
      due_date: newAsg.dueDate,
      max_score: Number(newAsg.maxScore),
      created_at: new Date().toISOString(),
    };

    LocalStore.addAssignment(created);
    setAssignments(LocalStore.getAssignments());
    setActiveTab("grading");
    setNewAsg({
      title: "",
      subject: "Physics",
      className: "Class 10 - Science Group",
      description: "",
      dueDate: "2026-10-05",
      maxScore: 20,
    });
  };

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newQuiz.title || !newQuiz.questionText) return;

    const createdQuiz: Quiz = {
      id: `quiz-${Date.now()}`,
      title: newQuiz.title,
      subject: newQuiz.subject,
      class_name: newQuiz.className,
      teacher_name: user.full_name,
      duration_minutes: Number(newQuiz.durationMinutes),
      created_at: new Date().toISOString(),
      questions: [
        {
          id: `q-${Date.now()}`,
          question: newQuiz.questionText,
          options: [newQuiz.optA, newQuiz.optB, newQuiz.optC, newQuiz.optD],
          correct_index: Number(newQuiz.correctIdx),
          explanation: newQuiz.explanation || "Correct option selected as per syllabus.",
        },
      ],
    };

    LocalStore.addQuiz(createdQuiz);
    setQuizzes(LocalStore.getQuizzes());
    setActiveTab("grading");
    setNewQuiz({
      title: "",
      subject: "Physics",
      className: "Class 10 - Science Group",
      durationMinutes: 10,
      questionText: "",
      optA: "",
      optB: "",
      optC: "",
      optD: "",
      correctIdx: 0,
      explanation: "",
    });
  };

  const handleGradeSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;

    LocalStore.gradeSubmission(selectedSub.id, Number(gradingScore), gradingFeedback);
    setSubmissions(LocalStore.getSubmissions());
    setSelectedSub(null);
  };

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !announcementTitle.trim()) return;

    const newAnc: Announcement = {
      id: `anc-${Date.now()}`,
      title: announcementTitle,
      content: announcementText,
      author_name: user.full_name,
      target_audience: "students",
      priority: "normal",
      date: new Date().toISOString().split("T")[0],
    };

    LocalStore.addAnnouncement(newAnc);
    setAnnouncements(LocalStore.getAnnouncements());
    setAnnouncementTitle("");
    setAnnouncementText("");
    setActiveTab("grading");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-cream-200 text-navy-900">
      {/* Header */}
      <header className="bg-navy-900 text-white border-b border-teal-accent sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:opacity-90 transition">
              <Logo size="sm" onDark />
            </Link>
            <span className="hidden sm:inline-block text-xs font-bold bg-teal-dark/60 text-teal-light px-2.5 py-1 rounded-full border border-teal-accent/40">
              Teacher & Faculty LMS Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white">{user.full_name}</p>
              <p className="text-[10px] text-cream-300">Instructor • Mind Flare Academy</p>
            </div>
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
        {/* Faculty Summary Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-7 border border-cream-400 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[11px] font-extrabold uppercase bg-teal-accent text-white rounded">
                Faculty Portal
              </span>
              <span className="text-xs text-navy-700">
                Shift: <strong>{user.shift || "Morning"} Shift</strong>
              </span>
            </div>
            <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-navy-900">
              Faculty Dashboard • {user.full_name}
            </h1>
            <p className="text-xs sm:text-sm text-navy-800/80">
              Publish assignments, configure computerized MCQ quizzes, and review student homework.
            </p>
          </div>

          {/* Action Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("grading")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === "grading"
                  ? "bg-navy-900 text-white"
                  : "bg-white text-navy-900 border border-cream-400 hover:bg-cream-100"
              }`}
            >
              📥 Submissions ({submissions.length})
            </button>
            <button
              onClick={() => setActiveTab("new-asg")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                activeTab === "new-asg"
                  ? "bg-flame-orange text-white"
                  : "bg-white text-navy-900 border border-cream-400 hover:bg-cream-100"
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New Assignment</span>
            </button>
            <button
              onClick={() => setActiveTab("new-quiz")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                activeTab === "new-quiz"
                  ? "bg-flame-orange text-white"
                  : "bg-white text-navy-900 border border-cream-400 hover:bg-cream-100"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create MCQ Quiz</span>
            </button>
            <button
              onClick={() => setActiveTab("announcement")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                activeTab === "announcement"
                  ? "bg-teal-accent text-white"
                  : "bg-white text-navy-900 border border-cream-400 hover:bg-cream-100"
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Post Notice</span>
            </button>
          </div>
        </div>

        {/* Tab Views */}
        {activeTab === "grading" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Submissions List */}
            <div className="lg:col-span-7 glass-card rounded-2xl p-6 border border-cream-400">
              <h2 className="font-serif font-bold text-xl text-navy-900 mb-4 flex items-center justify-between">
                <span>Student Submissions Queue</span>
                <span className="text-xs font-normal text-navy-600">{submissions.length} Total</span>
              </h2>

              <div className="space-y-3">
                {submissions.length === 0 ? (
                  <div className="text-center py-10 text-xs text-navy-600 bg-cream-100/50 rounded-xl border border-dashed border-cream-300">
                    No student submissions yet. Student homework submissions will appear here for grading.
                  </div>
                ) : (
                  submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 rounded-xl bg-white border border-cream-300 hover:border-flame-orange transition flex items-center justify-between gap-3 shadow-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-navy-900">{sub.student_name}</span>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                              sub.status === "graded"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {sub.status === "graded" ? `Graded: ${sub.score} Marks` : "Needs Review"}
                          </span>
                        </div>
                        <p className="text-xs text-navy-700 mt-1 line-clamp-1">
                          "{sub.submission_text}"
                        </p>
                        <p className="text-[10px] text-navy-500 mt-1">Submitted: {sub.submitted_at}</p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedSub(sub);
                          setGradingScore(sub.score || 18);
                          setGradingFeedback(sub.feedback || "Good effort!");
                        }}
                        className="px-3.5 py-1.5 text-xs font-bold text-white bg-navy-900 hover:bg-flame-orange rounded-lg transition"
                      >
                        {sub.status === "graded" ? "Edit Grade" : "Grade Now"}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Grading Box */}
            <div className="lg:col-span-5 glass-card rounded-2xl p-6 border border-cream-400">
              {selectedSub ? (
                <form onSubmit={handleGradeSubmission} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-cream-300">
                    <h3 className="font-serif font-bold text-lg text-navy-900">
                      Grading: {selectedSub.student_name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setSelectedSub(null)}
                      className="text-xs font-bold text-navy-600 hover:underline"
                    >
                      Close
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-cream-100 text-xs text-navy-800 space-y-1">
                    <p className="font-bold">Student Response:</p>
                    <p className="italic">{selectedSub.submission_text}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">
                      Score Awarded (Max 25):
                    </label>
                    <input
                      type="number"
                      max={25}
                      min={0}
                      value={gradingScore}
                      onChange={(e) => setGradingScore(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-cream-400 bg-white font-bold text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">
                      Faculty Feedback / Remarks:
                    </label>
                    <textarea
                      rows={3}
                      value={gradingFeedback}
                      onChange={(e) => setGradingFeedback(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-cream-400 bg-white focus:outline-none focus:ring-2 focus:ring-flame-orange"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-flame-orange to-flame-yellow shadow-sm"
                  >
                    Save & Return Grade to Student
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 text-navy-600 text-xs space-y-2">
                  <FileCheck className="w-8 h-8 text-navy-400 mx-auto" />
                  <p className="font-bold">Select a student submission to grade and provide feedback.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* New Assignment Tab */}
        {activeTab === "new-asg" && (
          <div className="max-w-2xl mx-auto glass-card rounded-2xl p-6 sm:p-8 border border-cream-400">
            <h2 className="font-serif font-bold text-2xl text-navy-900 mb-2">
              Create New Subject Assignment
            </h2>
            <p className="text-xs text-navy-700 mb-6">
              Assigned tasks will appear on student LMS dashboards immediately.
            </p>

            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Assignment Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chapter 3: Vectors & Kinematics Problem Set"
                  value={newAsg.title}
                  onChange={(e) => setNewAsg({ ...newAsg, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-400 bg-white text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-flame-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Subject</label>
                  <select
                    value={newAsg.subject}
                    onChange={(e) => setNewAsg({ ...newAsg, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-cream-400 bg-white text-xs text-navy-900"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="English">English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newAsg.dueDate}
                    onChange={(e) => setNewAsg({ ...newAsg, dueDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-cream-400 bg-white text-xs text-navy-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Instructions & Description</label>
                <textarea
                  rows={4}
                  required
                  placeholder="State questions from board past papers or textbook exercises..."
                  value={newAsg.description}
                  onChange={(e) => setNewAsg({ ...newAsg, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-cream-400 bg-white focus:outline-none focus:ring-2 focus:ring-flame-orange"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-flame-orange to-flame-yellow shadow-flame-sm"
                >
                  Publish Assignment to Students
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("grading")}
                  className="px-5 py-3 rounded-xl text-xs font-bold bg-white border border-cream-400 text-navy-900"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* New MCQ Quiz Tab */}
        {activeTab === "new-quiz" && (
          <div className="max-w-2xl mx-auto glass-card rounded-2xl p-6 sm:p-8 border border-cream-400">
            <h2 className="font-serif font-bold text-2xl text-navy-900 mb-2">
              Create Computerized MCQ Quiz
            </h2>
            <form onSubmit={handleCreateQuiz} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Quiz Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Physics Chapter 3 Speed & Motion Quiz"
                  value={newQuiz.title}
                  onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-400 bg-white text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Subject</label>
                  <select
                    value={newQuiz.subject}
                    onChange={(e) => setNewQuiz({ ...newQuiz, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-cream-400 bg-white text-xs"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="English">English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Timer (Minutes)</label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={newQuiz.durationMinutes}
                    onChange={(e) => setNewQuiz({ ...newQuiz, durationMinutes: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-cream-400 bg-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Question Text *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. What is the SI unit of acceleration?"
                  value={newQuiz.questionText}
                  onChange={(e) => setNewQuiz({ ...newQuiz, questionText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-400 bg-white text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Option A"
                  value={newQuiz.optA}
                  onChange={(e) => setNewQuiz({ ...newQuiz, optA: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-cream-400 bg-white text-xs"
                />
                <input
                  type="text"
                  required
                  placeholder="Option B"
                  value={newQuiz.optB}
                  onChange={(e) => setNewQuiz({ ...newQuiz, optB: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-cream-400 bg-white text-xs"
                />
                <input
                  type="text"
                  required
                  placeholder="Option C"
                  value={newQuiz.optC}
                  onChange={(e) => setNewQuiz({ ...newQuiz, optC: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-cream-400 bg-white text-xs"
                />
                <input
                  type="text"
                  required
                  placeholder="Option D"
                  value={newQuiz.optD}
                  onChange={(e) => setNewQuiz({ ...newQuiz, optD: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-cream-400 bg-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Correct Answer</label>
                  <select
                    value={newQuiz.correctIdx}
                    onChange={(e) => setNewQuiz({ ...newQuiz, correctIdx: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-cream-400 bg-white text-xs"
                  >
                    <option value={0}>Option A</option>
                    <option value={1}>Option B</option>
                    <option value={2}>Option C</option>
                    <option value={3}>Option D</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Explanation / Hint</label>
                  <input
                    type="text"
                    placeholder="e.g. Unit is m/s^2"
                    value={newQuiz.explanation}
                    onChange={(e) => setNewQuiz({ ...newQuiz, explanation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-cream-400 bg-white text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-flame-orange to-flame-yellow shadow-flame-sm"
              >
                Publish MCQ Quiz to Students
              </button>
            </form>
          </div>
        )}

        {/* Announcement Tab */}
        {activeTab === "announcement" && (
          <div className="max-w-2xl mx-auto glass-card rounded-2xl p-6 sm:p-8 border border-cream-400">
            <h2 className="font-serif font-bold text-2xl text-navy-900 mb-2">
              Broadcast Notice to Students
            </h2>
            <form onSubmit={handlePostAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 📢 Extra Physics Numerical Session this Saturday"
                  value={announcementTitle}
                  onChange={(e) => setAnnouncementTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-400 bg-white text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-teal-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Message Content *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Details of schedule, room number, or required materials..."
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-cream-400 bg-white focus:outline-none focus:ring-2 focus:ring-teal-accent"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-teal-accent hover:bg-teal-dark transition shadow-sm"
              >
                Post Broadcast Announcement
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
