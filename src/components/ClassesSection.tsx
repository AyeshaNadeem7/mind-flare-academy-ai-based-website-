"use client";

import React, { useState } from "react";
import { ACADEMIC_CLASSES } from "@/lib/demo-data";
import { AcademicClass } from "@/types";
import {
  GraduationCap,
  ChevronRight,
  CreditCard,
} from "lucide-react";

export default function ClassesSection() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filterTabs = [
    { id: "all", label: "All Programs" },
    { id: "pre-primary", label: "Pre-Primary & Primary (Nur-5)" },
    { id: "middle", label: "Middle (6-8)" },
    { id: "matric", label: "Matric (9-10)" },
    { id: "intermediate", label: "Intermediate (11-12)" },
    { id: "bachelor", label: "Bachelor Support" },
    { id: "entry-test", label: "MDCAT / ECAT Prep" },
  ];

  const filteredClasses =
    activeTab === "all"
      ? ACADEMIC_CLASSES
      : ACADEMIC_CLASSES.filter((c) => c.category === activeTab);

  return (
    <section id="classes" className="py-20 bg-cream-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-light border border-teal-accent/40 text-xs font-bold text-teal-dark uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-teal-accent" />
            <span>Comprehensive Academic Programs</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-navy-900">
            Classes & Academic Coaching
          </h2>
          <p className="text-sm sm:text-base text-navy-800/80">
            From early foundation years through BISE board exams, university entry tests, and BS semester tutoring.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-flame-orange to-teal-accent mx-auto rounded-full" />
        </div>

        {/* Filter Tabs */}
        <div className="mt-10 flex items-center justify-start sm:justify-center overflow-x-auto pb-3 gap-2 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-navy-900 text-white shadow-md transform scale-105"
                  : "bg-white/80 text-navy-800 hover:bg-white hover:text-flame-orange border border-cream-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Classes Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-cream-300/80 hover:border-flame-orange/60 hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                {/* Card Top Pill */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-flame-orange/15 text-flame-dark">
                    {item.grades}
                  </span>
                  <span className="text-[11px] font-bold text-teal-dark bg-teal-light px-2.5 py-0.5 rounded-full">
                    Admissions Open
                  </span>
                </div>

                {/* Class Title */}
                <h3 className="font-serif font-bold text-xl text-navy-900 group-hover:text-flame-orange transition-colors">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-navy-800/80 mt-2 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Groups / Streams if present */}
                {item.groups && item.groups.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-cream-300/60">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-navy-700 mb-1.5">
                      Available Groups & Tracks:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.groups.map((group, gIdx) => (
                        <span
                          key={gIdx}
                          className="px-2 py-0.5 text-[11px] font-medium bg-cream-100 text-navy-900 rounded border border-cream-400/50"
                        >
                          {group}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subjects List */}
                <div className="mt-4 pt-3 border-t border-cream-300/60">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-navy-700 mb-1.5">
                    Subjects Covered:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.subjects.map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 text-[11px] bg-white text-navy-800 rounded border border-cream-300 font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer / Action */}
              <div className="mt-6 pt-4 border-t border-cream-300 flex items-center justify-between gap-2">
                <a
                  href="#fees"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl text-navy-900 bg-white hover:bg-navy-900 hover:text-white border border-cream-400 hover:border-navy-900 transition-all shadow-sm"
                >
                  <CreditCard className="w-3.5 h-3.5 text-flame-orange" />
                  <span>Fee Structure</span>
                </a>

                <a
                  href={`https://wa.me/923175790206?text=Assalam%20o%20Alaikum,%20I%20am%20interested%20in%20enrolling%20for%20${encodeURIComponent(
                    item.name
                  )}%20at%20Mind%20Flare%20Academy.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-flame-dark hover:text-flame-orange group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Inquire Now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 bg-navy-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif font-bold text-xl sm:text-2xl text-flame-yellow">
              Specialized MDCAT & ECAT Entrance Batches
            </h4>
            <p className="text-xs sm:text-sm text-navy-200 max-w-2xl">
              Comprehensive 6-month preparation programs and intensive crash courses with full-length simulated mock exam tests.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              href="#fees"
              className="px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition whitespace-nowrap"
            >
              View Fee Details
            </a>
            <a
              href="https://wa.me/923175790206?text=Hi,%20I%20want%20details%20about%20MDCAT%20/%20ECAT%20Batches."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-flame-orange to-flame-yellow text-navy-950 hover:brightness-110 shadow-flame-md whitespace-nowrap"
            >
              Book Entry Test Seat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
