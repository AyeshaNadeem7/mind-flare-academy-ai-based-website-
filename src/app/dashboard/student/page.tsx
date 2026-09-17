"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import {
  UserProfile,
  Assignment,
  Submission,
  Quiz,
  QuizAttempt,
  Announcement,
} from "@/types";
import { LocalStore } from "@/lib/supabase";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Award,
  FileText,
  Bell,
  Sparkles,
  Timer,
  ChevronRight,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function StudentDashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // Active quiz state
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState<QuizAttempt | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Active assignment submission form
  const [selectedAsg, setSelectedAsg] = useState<Assignment | null>(null);
  const [submissionText, setSubmissionText] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  useEffect(() => {
    const active = LocalStore.getCurrentUser();
    if (active) {
      setUser(active);
    } else {
      // Fallback default student profile if directly navigating
      const fallbackUser: UserProfile = {
        id: "student-temp",
        email: "student@mindflare.pk",
        full_name: "Enrolled Student",
        role: "student",
        phone: "0317-5790206",
        enrolled_class: "Class 10 - Science Group",
        shift: "Morning",
        status: "active",
        created_at: new Date().toISOString(),
      };
      setUser(fallbackUser);
      LocalStore.setCurrentUser(fallbackUser);
    }

    setAssignments(LocalStore.getAssignments());
    setSubmissions(LocalStore.getSubmissions());
    setQuizzes(LocalStore.getQuizzes());
    setAttempts(LocalStore.getQuizAttempts());
    setAnnouncements(LocalStore.getAnnouncements());
  }, []);

  // Timer effect for active quiz
  useEffect(() => {
    if (!activeQuiz || quizSubmitted || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeQuiz, quizSubmitted, timeLeft]);

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setQuizAnswers(new Array(quiz.questions.length).fill(-1));
    setQuizSubmitted(null);
    setTimeLeft(quiz.duration_minutes * 60);
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => {
      const next = [...prev];
      next[qIdx] = optIdx;
      return next;
    });
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz || !user) return;
    let score = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct_index) {
        score++;
      }
    });

    const percentage = Math.round((score / activeQuiz.questions.length) * 100);
    const newAttempt: QuizAttempt = {
      id: `att-${Date.now()}`,
      quiz_id: activeQuiz.id,
      quiz_title: activeQuiz.title,
      student_id: user.id,
      student_name: user.full_name,
      score,
      total_questions: activeQuiz.questions.length,
      percentage,
      answers: quizAnswers,
      completed_at: new Date().toISOString(),
    };

    LocalStore.saveQuizAttempt(newAttempt);
    setAttempts(LocalStore.getQuizAttempts());
    setQuizSubmitted(newAttempt);

    if (percentage >= 70) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsg || !user || !submissionText.trim()) return;

    const newSub: Submission = {
      id: `sub-${Date.now()}`,
      assignment_id: selectedAsg.id,
      student_id: user.id,
      student_name: user.full_name,
      submission_text: submissionText,
      file_name: `${user.full_name.replace(/\s+/g, "_")}_Solution.pdf`,
      submitted_at: new Date().toLocaleString(),
      status: "pending",
    };

    LocalStore.submitAssignment(newSub);
    setSubmissions(LocalStore.getSubmissions());
    setSubmissionSuccess(true);
    setSubmissionText("");
    setTimeout(() => {
      setSubmissionSuccess(false);
      setSelectedAsg(null);
    }, 2000);
  };

  if (!user) return null;

  const mySubmissions = submissions.filter((s) => s.student_id === user.id);

  return (
    <div className="min-h-screen bg-cream-200 text-navy-900">
      {/* Dashboard Top Header */}
      <header className="bg-navy-900 text-white border-b border-flame-orange/40 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:opacity-90 transition">
              <Logo size="sm" onDark />
            </Link>
            <span className="hidden sm:inline-block text-xs font-bold bg-flame-orange/20 text-flame-yellow px-2.5 py-1 rounded-full border border-flame-orange/30">
              Student LMS Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white">{user.full_name}</p>
              <p className="text-[10px] text-cream-300">{user.enrolled_class || "Student"}</p>
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
        {/* Welcome & Profile Summary Bar */}
        <div className="glass-card rounded-2xl p-6 sm:p-7 border border-cream-400 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[11px] font-extrabold uppercase bg-flame-orange text-white rounded">
                Active Student
              </span>
              <span className="text-xs text-navy-700">
                Shift: <strong>{user.shift || "Morning"} Shift (4 Hours)</strong>
              </span>
            </div>
            <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-navy-900">
              Welcome, {user.full_name}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-navy-800/80">
              Enrolled in <strong>{user.enrolled_class || "Class 10 - Science Group"}</strong> at Mind Flare Academy.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-cream-100 p-3 rounded-xl border border-cream-300 text-center min-w-[110px]">
              <p className="text-[10px] uppercase font-bold text-navy-600">Assigned Shift</p>
              <p className="font-serif font-black text-lg text-navy-900">{user.shift || "Morning"}</p>
              <p className="text-[9px] text-navy-600">{user.shift === "Morning" ? "8:00 AM – 12:00 PM" : "3:00 PM – 7:00 PM"}</p>
            </div>
            <div className="bg-cream-100 p-3 rounded-xl border border-cream-300 text-center min-w-[110px]">
              <p className="text-[10px] uppercase font-bold text-navy-600">Active Tasks</p>
              <p className="font-serif font-black text-lg text-flame-dark">{assignments.length}</p>
              <p className="text-[9px] text-navy-600">Subject Homework</p>
            </div>
            <div className="bg-cream-100 p-3 rounded-xl border border-cream-300 text-center min-w-[110px]">
              <p className="text-[10px] uppercase font-bold text-navy-600">My Submissions</p>
              <p className="font-serif font-black text-lg text-emerald-700">{mySubmissions.length}</p>
              <p className="text-[9px] text-emerald-600">Completed Tasks</p>
            </div>
          </div>
        </div>

        {/* Announcements Banner */}
        {announcements.length > 0 && (
          <div className="space-y-2">
            {announcements.map((anc) => (
              <div
                key={anc.id}
                className={`p-4 rounded-xl border flex items-start gap-3 shadow-xs ${
                  anc.priority === "urgent"
                    ? "bg-amber-50/90 border-amber-300 text-amber-950"
                    : "bg-white border-cream-300 text-navy-900"
                }`}
              >
                <Bell className="w-5 h-5 text-flame-orange flex-shrink-0 mt-0.5" />
                <div className="flex-1 text-xs sm:text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold">{anc.title}</h4>
                    <span className="text-[11px] text-navy-600 whitespace-nowrap">{anc.date}</span>
                  </div>
                  <p className="mt-1 text-navy-800">{anc.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2-Column Core LMS Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Column 1: Interactive Quizzes */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-cream-400 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-cream-300">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-flame-orange/20 rounded-xl text-flame-dark">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-lg text-navy-900">
                      Subject Quizzes & Mock Tests
                    </h2>
                    <p className="text-xs text-navy-700">Instant computerized auto-grading</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-teal-dark bg-teal-light px-2.5 py-0.5 rounded-full">
                  {quizzes.length} Quizzes
                </span>
              </div>

              {/* Active Quiz Player */}
              {activeQuiz ? (
                <div className="mt-5 space-y-5">
                  <div className="flex items-center justify-between bg-navy-900 text-white p-3.5 rounded-xl">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-flame-yellow">
                        {activeQuiz.title}
                      </h4>
                      <p className="text-[11px] text-navy-200">
                        Instructor: {activeQuiz.teacher_name}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-navy-800 px-3 py-1 rounded-lg border border-navy-700 text-xs font-bold text-amber-400">
                      <Timer className="w-4 h-4 animate-spin" />
                      <span>
                        {Math.floor(timeLeft / 60)}:
                        {(timeLeft % 60).toString().padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Questions List */}
                  <div className="space-y-4">
                    {activeQuiz.questions.map((q, qIdx) => {
                      const selectedOpt = quizAnswers[qIdx];
                      const isCorrect = quizSubmitted && selectedOpt === q.correct_index;

                      return (
                        <div
                          key={q.id}
                          className="p-4 rounded-xl bg-white border border-cream-300 space-y-2.5"
                        >
                          <p className="font-bold text-xs sm:text-sm text-navy-900">
                            Q{qIdx + 1}. {q.question}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((opt, optIdx) => {
                              const isThisSelected = selectedOpt === optIdx;
                              let btnClass = "bg-cream-100 border-cream-300 text-navy-900";
                              if (quizSubmitted) {
                                if (optIdx === q.correct_index) {
                                  btnClass = "bg-emerald-100 border-emerald-400 text-emerald-900 font-bold";
                                } else if (isThisSelected) {
                                  btnClass = "bg-rose-100 border-rose-400 text-rose-900";
                                }
                              } else if (isThisSelected) {
                                btnClass = "bg-navy-900 text-white border-navy-900 font-bold";
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleSelectOption(qIdx, optIdx)}
                                  disabled={!!quizSubmitted}
                                  className={`p-2.5 rounded-lg border text-left text-xs transition ${btnClass}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {quizSubmitted && q.explanation && (
                            <div className="mt-2 p-2 rounded bg-amber-50 text-[11px] text-amber-900 border border-amber-200">
                              💡 <strong>Concept:</strong> {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {quizSubmitted ? (
                    <div className="p-4 rounded-xl bg-navy-900 text-white text-center space-y-2">
                      <p className="text-xs text-navy-200">Quiz Completed!</p>
                      <p className="font-serif font-black text-2xl text-flame-yellow">
                        Your Score: {quizSubmitted.score} / {quizSubmitted.total_questions} (
                        {quizSubmitted.percentage}%)
                      </p>
                      <button
                        onClick={() => setActiveQuiz(null)}
                        className="mt-2 px-5 py-2 text-xs font-bold bg-flame-orange hover:bg-flame-yellow hover:text-navy-900 text-white rounded-full transition"
                      >
                        Back to Quizzes List
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSubmitQuiz}
                        className="flex-1 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-flame-orange to-flame-yellow shadow-flame-sm"
                      >
                        Submit Quiz for Auto-Grading
                      </button>
                      <button
                        onClick={() => setActiveQuiz(null)}
                        className="px-4 py-3 rounded-xl text-xs font-bold text-navy-800 bg-white border border-cream-400"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-5 space-y-3">
                  {quizzes.length === 0 ? (
                    <div className="text-center py-8 text-xs text-navy-600 bg-cream-100/60 rounded-xl border border-dashed border-cream-300">
                      No quizzes published by teachers yet. Newly created quizzes will appear here.
                    </div>
                  ) : (
                    quizzes.map((quiz) => {
                      const lastAttempt = attempts.find((a) => a.quiz_id === quiz.id);
                      return (
                        <div
                          key={quiz.id}
                          className="p-4 rounded-xl bg-white border border-cream-300 hover:border-flame-orange transition flex items-center justify-between gap-3 shadow-xs"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-cream-200 rounded text-navy-800">
                                {quiz.subject}
                              </span>
                              <span className="text-xs text-navy-600">
                                ⏱ {quiz.duration_minutes} Mins • {quiz.questions.length} MCQs
                              </span>
                            </div>
                            <h4 className="font-bold text-sm text-navy-900 mt-1">{quiz.title}</h4>
                            {lastAttempt && (
                              <p className="text-[11px] text-emerald-700 font-bold mt-1">
                                ✓ Last Score: {lastAttempt.score}/{lastAttempt.total_questions} ({lastAttempt.percentage}%)
                              </p>
                            )}
                          </div>

                          <button
                            onClick={() => startQuiz(quiz)}
                            className="px-4 py-2 text-xs font-bold text-white bg-navy-900 hover:bg-flame-orange rounded-xl transition flex items-center gap-1 shadow-xs"
                          >
                            <span>{lastAttempt ? "Retake" : "Start Test"}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Subject Assignments */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-cream-400 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-cream-300">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-teal-light rounded-xl text-teal-dark">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-lg text-navy-900">
                      Subject Assignments & Homework
                    </h2>
                    <p className="text-xs text-navy-700">Submit solutions and view teacher remarks</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-navy-900 bg-cream-200 px-2.5 py-0.5 rounded-full">
                  {assignments.length} Tasks
                </span>
              </div>

              {selectedAsg ? (
                <div className="mt-5 space-y-4">
                  <div className="p-4 rounded-xl bg-white border border-cream-300 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-flame-orange/20 text-flame-dark rounded">
                        {selectedAsg.subject}
                      </span>
                      <span className="text-xs text-rose-600 font-bold">
                        Due: {selectedAsg.due_date}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-navy-900">
                      {selectedAsg.title}
                    </h4>
                    <p className="text-xs text-navy-800 leading-relaxed bg-cream-100 p-3 rounded-lg">
                      {selectedAsg.description}
                    </p>
                  </div>

                  {submissionSuccess ? (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-center text-xs font-bold text-emerald-800">
                      ✓ Assignment submitted successfully to teacher for grading!
                    </div>
                  ) : (
                    <form onSubmit={handleAssignmentSubmit} className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-navy-900 mb-1">
                          Your Solution / Answer Text:
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Type your answers, solutions, or notes here..."
                          value={submissionText}
                          onChange={(e) => setSubmissionText(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-cream-400 bg-white focus:outline-none focus:ring-2 focus:ring-flame-orange"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-flame-orange to-flame-yellow shadow-sm"
                        >
                          Submit to Instructor
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedAsg(null)}
                          className="px-4 py-2.5 rounded-xl text-xs font-bold text-navy-800 bg-white border border-cream-400"
                        >
                          Back
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                <div className="mt-5 space-y-3">
                  {assignments.length === 0 ? (
                    <div className="text-center py-8 text-xs text-navy-600 bg-cream-100/60 rounded-xl border border-dashed border-cream-300">
                      No active assignments posted by teachers yet. Check back soon!
                    </div>
                  ) : (
                    assignments.map((asg) => {
                      const sub = mySubmissions.find((s) => s.assignment_id === asg.id);
                      return (
                        <div
                          key={asg.id}
                          className="p-4 rounded-xl bg-white border border-cream-300 hover:border-teal-accent transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-cream-200 rounded text-navy-800">
                                {asg.subject}
                              </span>
                              <span className="text-[11px] text-rose-600 font-bold">
                                Due: {asg.due_date}
                              </span>
                            </div>
                            <h4 className="font-bold text-sm text-navy-900 mt-1">{asg.title}</h4>

                            {sub && (
                              <div className="mt-2 text-xs">
                                {sub.status === "graded" ? (
                                  <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-900">
                                    <span className="font-bold">
                                      Score: {sub.score} / {asg.max_score}
                                    </span>
                                    {sub.feedback && <p className="text-[11px] mt-0.5 text-emerald-800">💬 {sub.feedback}</p>}
                                  </div>
                                ) : (
                                  <span className="inline-block text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                                    Submitted (Pending Teacher Grade)
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => setSelectedAsg(asg)}
                            className="px-4 py-2 text-xs font-bold text-navy-900 bg-cream-200 hover:bg-cream-300 rounded-xl transition flex items-center justify-center gap-1 flex-shrink-0"
                          >
                            <span>{sub ? "View / Edit" : "Submit Answer"}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
