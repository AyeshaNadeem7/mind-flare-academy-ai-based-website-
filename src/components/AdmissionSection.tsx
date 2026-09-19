"use client";

import React, { useState } from "react";
import {
  ClipboardList,
  CheckCircle,
  Send,
} from "lucide-react";

export default function AdmissionSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    guardianPhone: "",
    targetClass: "Matric (Class 10) - Science",
    preferredShift: "Evening (3:00 PM – 7:00 PM)",
    message: "",
  });

  const steps = [
    {
      num: "01",
      title: "Contact or Visit",
      desc: "Visit our campus at House DD1, Street # 6, Jhanda Chichi, Rawalpindi or message us on WhatsApp at 0317-5790206.",
    },
    {
      num: "02",
      title: "Submit Documents",
      desc: "Fill out admission form with 1 passport photo and latest result/mark sheet copy (for Class 6 and above).",
    },
    {
      num: "03",
      title: "Pay Registration",
      desc: "Pay one-time Admission Fee (PKR 2,000) and Prospectus / ID Card Fee (PKR 500).",
    },
    {
      num: "04",
      title: "Select Shift & Group",
      desc: "Choose your preferred 4-hour batch: Morning (8:00 AM – 12:00 PM) or Evening (3:00 PM – 7:00 PM).",
    },
    {
      num: "05",
      title: "Free Placement Test",
      desc: "Attend a free diagnostic assessment (for Matric & Intermediate students) to assign you to the right coaching batch.",
    },
    {
      num: "06",
      title: "Commence Classes",
      desc: "Begin your classes with student kit and syllabus guide! 1st month tuition is due by the 10th.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    const msg = `Assalam o Alaikum! I would like to submit an admission inquiry for Mind Flare Academy:%0A- Student: ${encodeURIComponent(
      formData.studentName
    )}%0A- Phone: ${encodeURIComponent(formData.guardianPhone)}%0A- Program: ${encodeURIComponent(
      formData.targetClass
    )}%0A- Shift: ${encodeURIComponent(formData.preferredShift)}%0A- Notes: ${encodeURIComponent(
      formData.message || "None"
    )}`;
    window.open(`https://wa.me/923175790206?text=${msg}`, "_blank");
  };

  return (
    <section id="admissions" className="py-20 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-light border border-teal-accent/40 text-xs font-bold text-teal-dark uppercase tracking-wider">
            <ClipboardList className="w-4 h-4 text-teal-accent" />
            <span>Admission Process</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-navy-900">
            How to Get Admission in 6 Simple Steps
          </h2>
          <p className="text-sm sm:text-base text-navy-800/80">
            Admissions remain open throughout the year. Free placement test and trial class available.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-flame-orange to-teal-accent mx-auto rounded-full" />
        </div>

        {/* 6 Steps Timeline */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="glass-card rounded-2xl p-6 relative border border-cream-300 hover:border-flame-orange hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif font-black text-3xl text-flame-orange/40">
                    {step.num}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-flame-orange/15 flex items-center justify-center text-flame-dark font-bold text-xs">
                    ✓
                  </div>
                </div>
                <h3 className="font-serif font-bold text-lg text-navy-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-navy-800/80 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Online Admission Registration Form (Centered & Clean) */}
        <div className="mt-14 max-w-3xl mx-auto">
          <div className="glass-card rounded-3xl p-7 sm:p-10 border-2 border-flame-orange/30 shadow-2xl relative">
            <div className="mb-8 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-flame-orange">
                Instant Online Inquiry
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-navy-900 mt-1">
                Reserve Your Seat & Free Placement Test
              </h3>
              <p className="text-xs sm:text-sm text-navy-700 mt-1.5 max-w-lg mx-auto">
                Fill the details below to connect directly with the admissions office via WhatsApp.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-2xl text-emerald-900">
                  Inquiry Sent Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                  Thank you! Our academic counselor will review your submission and contact you on WhatsApp or by phone promptly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-full transition shadow"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Ali"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-cream-400 bg-white text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-flame-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0312-XXXXXXX"
                      value={formData.guardianPhone}
                      onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-cream-400 bg-white text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-flame-orange"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">
                      Target Class / Course *
                    </label>
                    <select
                      value={formData.targetClass}
                      onChange={(e) => setFormData({ ...formData, targetClass: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-cream-400 bg-white text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-flame-orange"
                    >
                      <option value="Pre-Primary (Nursery/Prep/Class 1-5)">Pre-Primary (Nursery/Prep/Class 1-5)</option>
                      <option value="Middle (Class 6 - 8)">Middle (Class 6 - 8)</option>
                      <option value="Matric (Class 9) - Science Group">Matric (Class 9) - Science Group</option>
                      <option value="Matric (Class 10) - Science Group">Matric (Class 10) - Science Group</option>
                      <option value="Matric (Class 9/10) - Arts Group">Matric (Class 9/10) - Arts Group</option>
                      <option value="Intermediate Class 11 (FSc Pre-Med / Pre-Eng)">Intermediate Class 11 (FSc Pre-Med / Pre-Eng)</option>
                      <option value="Intermediate Class 12 (FSc Pre-Med / Pre-Eng)">Intermediate Class 12 (FSc Pre-Med / Pre-Eng)</option>
                      <option value="Intermediate (ICS Computer Science)">Intermediate (ICS Computer Science)</option>
                      <option value="Intermediate (I.Com Commerce)">Intermediate (I.Com Commerce)</option>
                      <option value="Intermediate (FA General Arts)">Intermediate (FA General Arts)</option>
                      <option value="Bachelor (BS) Subject Tutoring">Bachelor (BS) Subject Tutoring</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">
                      Preferred Shift *
                    </label>
                    <select
                      value={formData.preferredShift}
                      onChange={(e) => setFormData({ ...formData, preferredShift: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-cream-400 bg-white text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-flame-orange"
                    >
                      <option value="Morning (8:00 AM – 12:00 PM)">Morning Shift (8:00 AM – 12:00 PM)</option>
                      <option value="Evening (3:00 PM – 7:00 PM)">Evening Shift (3:00 PM – 7:00 PM)</option>
                      <option value="Flexible / Either Shift">Flexible / Either Shift</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    Special Inquiries or Weak Subjects (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Need special focus on Physics numericals, or interested in sibling discount..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-400 bg-white text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-flame-orange"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-flame-orange to-flame-yellow shadow-flame-md hover:shadow-flame-lg transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry via WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
