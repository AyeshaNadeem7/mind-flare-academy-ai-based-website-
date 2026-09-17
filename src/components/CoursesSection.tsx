"use client";

import React, { useState } from "react";
import { SHORT_COURSES } from "@/lib/demo-data";
import {
  Code,
  Palette,
  Terminal,
  TrendingUp,
  Globe,
  FileSpreadsheet,
  Languages,
  BookMarked,
  Sparkles,
  Clock,
  Flame,
  ArrowRight,
} from "lucide-react";

export default function CoursesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All 10 Courses" },
    { id: "digital-skills", label: "Digital Skills & Coding" },
    { id: "language", label: "Languages & IELTS" },
    { id: "competitive", label: "Competitive (CSS/PMS)" },
  ];

  const filteredCourses =
    selectedCategory === "all"
      ? SHORT_COURSES
      : SHORT_COURSES.filter((c) => c.category === selectedCategory);

  const getCourseIcon = (id: string) => {
    switch (id) {
      case "graphic-design":
        return <Palette className="w-5 h-5 text-flame-orange" />;
      case "web-dev":
        return <Code className="w-5 h-5 text-teal-accent" />;
      case "python-ai":
        return <Terminal className="w-5 h-5 text-amber-500" />;
      case "data-science":
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case "freelancing":
        return <Globe className="w-5 h-5 text-emerald-600" />;
      case "wordpress":
        return <Globe className="w-5 h-5 text-indigo-500" />;
      case "ms-office":
        return <FileSpreadsheet className="w-5 h-5 text-rose-500" />;
      case "ielts":
      case "spoken-english":
        return <Languages className="w-5 h-5 text-purple-500" />;
      case "css-pms":
        return <BookMarked className="w-5 h-5 text-navy-800" />;
      default:
        return <Sparkles className="w-5 h-5 text-flame-orange" />;
    }
  };

  return (
    <section id="courses" className="py-20 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-flame-orange/15 border border-flame-orange/30 text-xs font-bold text-flame-dark uppercase tracking-wider">
            <Flame className="w-4 h-4 text-flame-orange" />
            <span>Digital Skills & Career Readiness</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-navy-900">
            Short Courses & Career Programs
          </h2>
          <p className="text-sm sm:text-base text-navy-800/80">
            Build in-demand skills in 4-hour morning or evening sessions designed for students, graduates, and working professionals.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-flame-orange to-teal-accent mx-auto rounded-full" />
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-flame-orange text-white shadow-flame-sm"
                  : "bg-white text-navy-800 hover:bg-cream-200 border border-cream-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-cream-300/80 hover:border-teal-accent hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
            >
              {course.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-flame-orange to-flame-yellow text-navy-950 font-black text-[10px] uppercase px-3 py-1 rounded-bl-xl tracking-wider shadow-sm">
                  ★ High In Demand
                </div>
              )}

              <div>
                {/* Header Icon + Title */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2.5 bg-cream-200 rounded-xl group-hover:bg-cream-300 transition-colors">
                    {getCourseIcon(course.id)}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-navy-900 leading-snug group-hover:text-flame-orange transition-colors">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-dark bg-teal-light px-2 py-0.5 rounded">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </span>
                      <span className="text-[11px] font-medium text-navy-600">4 Hours / Session</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-navy-800/80 leading-relaxed mt-2 mb-4">
                  {course.description}
                </p>

                {/* Modules Tags */}
                <div className="space-y-1.5 mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-navy-600">
                    Curriculum & Tools:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {course.toolsOrModules.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 text-[11px] font-medium bg-white rounded border border-cream-300 text-navy-900"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fee & Action */}
              <div className="pt-4 border-t border-cream-300 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-navy-600 block">Course Fee</span>
                  <span className="font-serif font-black text-lg text-navy-900">
                    PKR {course.fee.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-navy-700 ml-1">(One-time)</span>
                </div>

                <a
                  href={`https://wa.me/923175790206?text=Assalam%20o%20Alaikum,%20I%20want%20to%20register%20for%20the%20${encodeURIComponent(
                    course.title
                  )}%20short%20course%20(Fee:%20PKR%20${course.fee}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-xs font-bold text-white bg-navy-900 hover:bg-flame-orange transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
