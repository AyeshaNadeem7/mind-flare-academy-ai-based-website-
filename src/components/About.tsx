"use client";

import React from "react";
import {
  Flame,
  Target,
  Eye,
  CheckCircle,
  Clock,
  Shield,
  Users,
  FileText,
  Award,
  BookOpen,
  Sparkles,
  Zap,
} from "lucide-react";

export default function About() {
  const whyChooseUs = [
    {
      title: "Experienced Subject Specialists",
      desc: "Qualified teachers (many with Master's degrees or higher) with years of experience across top institutions in Rawalpindi & Islamabad.",
      icon: Users,
    },
    {
      title: "Dual Flexible Shifts (4h Each)",
      desc: "Separate Morning Shift (8:00 AM – 12:00 PM) and Evening Shift (3:00 PM – 7:00 PM) suited for all student schedules.",
      icon: Clock,
    },
    {
      title: "Small Batch Sizes",
      desc: "Limited students per classroom ensuring individual attention, concept clarity, and close teacher mentorship.",
      icon: Target,
    },
    {
      title: "Regular Tests & Progress Reports",
      desc: "Weekly chapter tests, monthly grand assessments, and comprehensive progress reports shared transparently with parents.",
      icon: FileText,
    },
    {
      title: "Concept-Based Teaching",
      desc: "Zero reliance on cramming or rote learning. Rigorous focus on fundamental theory, numerical mastery, and board exam patterns.",
      icon: Sparkles,
    },
    {
      title: "Affordable Fees & Sibling Discounts",
      desc: "Transparent fee structure, discounted combo group packages, and an automatic 10% discount for second siblings onward.",
      icon: Award,
    },
    {
      title: "Dedicated Preparation Tracks",
      desc: "Tailored tracks for Matric (BISE), Intermediate (FSc/ICS/I.Com), MDCAT/ECAT entry tests, and in-demand digital short courses.",
      icon: BookOpen,
    },
    {
      title: "Free Doubt-Clearing Sessions",
      desc: "Dedicated extra hours, weekend tutorial sessions, and solved guess papers provided before major board and entrance exams.",
      icon: Zap,
    },
    {
      title: "Safe, CCTV-Secured Campus",
      desc: "Clean, well-ventilated classrooms, basic computer lab setup, clean drinking water, and strict zero-tolerance anti-bullying policy.",
      icon: Shield,
    },
  ];

  return (
    <section id="about" className="py-20 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-flame-orange/10 border border-flame-orange/30 text-xs font-bold text-flame-dark uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-flame-orange" />
            <span>Institutional Overview</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-navy-900">
            About Mind Flare Academy
          </h2>
          <p className="text-sm sm:text-base text-navy-800/80 leading-relaxed">
            Located in <strong>Jhanda Chichi, Rawalpindi</strong>, Mind Flare Academy is dedicated to helping
            students build solid academic foundations from early childhood right through to university entrance and professional life.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-flame-orange to-teal-accent mx-auto rounded-full" />
        </div>

        {/* Mission & Vision Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="glass-card rounded-2xl p-7 relative border-l-4 border-l-flame-orange overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-flame-orange/15 rounded-xl text-flame-orange">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-navy-900">Our Mission</h3>
                <p className="text-xs text-navy-700">Ignite curiosity & prepare for real exam success</p>
              </div>
            </div>
            <ul className="space-y-2.5 text-sm text-navy-800">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-flame-orange flex-shrink-0 mt-0.5" />
                <span>Provide quality, affordable education to every student in our community.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-flame-orange flex-shrink-0 mt-0.5" />
                <span>Build conceptual clarity rather than encouraging cramming or rote learning.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-flame-orange flex-shrink-0 mt-0.5" />
                <span>Prepare students for board exams, university entry tests, and future careers with confidence.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-flame-orange flex-shrink-0 mt-0.5" />
                <span>Create a disciplined yet friendly and supportive learning environment.</span>
              </li>
            </ul>
          </div>

          {/* Vision */}
          <div className="glass-card rounded-2xl p-7 relative border-l-4 border-l-teal-accent overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-teal-accent/15 rounded-xl text-teal-accent">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-navy-900">Our Vision</h3>
                <p className="text-xs text-navy-700">Academic excellence & practical digital readiness</p>
              </div>
            </div>
            <p className="text-sm text-navy-800 leading-relaxed mb-4">
              To become the leading academy in <strong>Rawalpindi</strong> known for producing top position holders
              in <strong>Matric, Intermediate, and MDCAT/ECAT entry tests</strong>, while also equipping students with
              modern digital, freelance, and language skills for the future job market.
            </p>
            <div className="p-3 bg-cream-200 rounded-xl border border-cream-300 text-xs text-navy-900 font-medium">
              💡 <em>"Our methodology connects fundamental theory with exam-oriented speed and analytical problem solving."</em>
            </div>
          </div>
        </div>

        {/* Shift Timings Breakdown */}
        <div className="mt-14 glass-panel rounded-2xl p-6 sm:p-8 border border-cream-300 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-cream-300">
            <div>
              <span className="text-xs font-bold text-flame-orange uppercase tracking-wider">Official Schedules</span>
              <h3 className="font-serif font-bold text-2xl text-navy-900">Flexible Academy Shift Timings</h3>
              <p className="text-xs sm:text-sm text-navy-700 mt-1">
                4-Hour structured shifts designed around school and professional timetables.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-bold bg-navy-900 text-white rounded-full">
                All Grades: Nursery – Class 12 & Short Courses
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-white/90 border-2 border-flame-orange/40 shadow-sm relative hover:shadow-md transition">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 text-xs font-extrabold uppercase bg-flame-orange/20 text-flame-dark rounded-full">
                  Morning Shift
                </span>
                <span className="text-xs font-bold text-navy-700">4 Hours Duration</span>
              </div>
              <p className="text-2xl font-black text-navy-900 mb-1">8:00 AM – 12:00 PM</p>
              <p className="text-xs text-navy-700">
                <strong>Best suited for:</strong> School-going students (afternoon/evening school shift) & short digital course learners.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/90 border-2 border-teal-accent/40 shadow-sm relative hover:shadow-md transition">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 text-xs font-extrabold uppercase bg-teal-light text-teal-dark rounded-full">
                  Evening Shift
                </span>
                <span className="text-xs font-bold text-navy-700">4 Hours Duration</span>
              </div>
              <p className="text-2xl font-black text-navy-900 mb-1">3:00 PM – 7:00 PM</p>
              <p className="text-xs text-navy-700">
                <strong>Best suited for:</strong> Morning school-going students, college attendees, and working individuals.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us - 9 Pillars Grid */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-navy-900">
              Why Parents & Students Choose Mind Flare
            </h3>
            <p className="text-sm text-navy-700 mt-1">9 core pillars of our proven coaching methodology</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="glass-card rounded-xl p-5 hover:translate-y-[-3px] transition-all duration-300 border border-cream-300/80 hover:border-flame-orange/50 hover:shadow-lg group"
                >
                  <div className="w-10 h-10 rounded-lg bg-cream-200 group-hover:bg-flame-orange/20 flex items-center justify-center text-navy-900 group-hover:text-flame-orange transition-colors mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-navy-900 mb-1.5">{item.title}</h4>
                  <p className="text-xs text-navy-800/80 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
