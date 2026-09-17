"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    q: "What classes does Mind Flare Academy offer?",
    a: "We offer classes from Nursery to Class 12, covering Matric and Intermediate (all groups: Pre-Medical, Pre-Engineering, ICS, Commerce, Arts), plus entry test preparation (MDCAT/ECAT/NET), Bachelor's-level subject tutoring, and short courses in digital skills, IELTS, and CSS/PMS.",
  },
  {
    q: "Where is Mind Flare Academy located?",
    a: "We are located at House DD1, Street # 6, Jhanda Chichi, Rawalpindi, Pakistan.",
  },
  {
    q: "How can I contact Mind Flare Academy?",
    a: "You can call or WhatsApp us at 0317-5790206 (link: https://wa.me/923175790206), message us on Instagram @mind_flare_academy, or email mindflareacademy@gmail.com.",
  },
  {
    q: "What are the academy shift timings?",
    a: "We offer a Morning Shift (approx. 8:00 AM – 12:00 PM) and an Evening Shift (approx. 3:00 PM – 7:00 PM), each running for 4 hours. Exact class times within shifts depend on grade and subject load.",
  },
  {
    q: "What is the fee for Matric (Class 10) subjects?",
    a: "Subject-wise fees range from PKR 1,500 to PKR 2,500 per month depending on the subject. A full Science Group package costs PKR 8,000/month (Class 9: PKR 7,500/mo), and a full Arts/General Group package costs PKR 6,500/month (Class 9: PKR 6,000/mo).",
  },
  {
    q: "What is the fee for Intermediate (Class 11-12) subjects?",
    a: "Subject-wise fees range from PKR 1,800 to PKR 3,000 per month. Full group packages: Pre-Medical & Pre-Engineering PKR 9,500/mo (Class 11) & PKR 10,000/mo (Class 12); ICS PKR 9,000/9,500; Commerce PKR 8,500/9,000; General Arts PKR 7,500/8,000.",
  },
  {
    q: "Do you offer MDCAT / ECAT preparation?",
    a: "Yes! We offer a full 6-month MDCAT and ECAT preparation program (PKR 35,000 and PKR 32,000 respectively, or PKR 6,500/6,000 monthly) as well as a 6-8 week intensive crash course (PKR 15,000) closer to test dates, including 12 computerized mock tests.",
  },
  {
    q: "What short courses do you offer?",
    a: "We offer Graphic Designing (PKR 8,000), Web Development (PKR 8,500), Python & AI Basics (PKR 6,500), Data Science (PKR 9,000), Freelancing & Digital Marketing (PKR 6,000), WordPress (PKR 5,000), Microsoft Office (PKR 4,000), IELTS (PKR 9,000), Spoken English (PKR 5,000), and CSS/PMS Coaching (PKR 12,000).",
  },
  {
    q: "Is there an admission fee?",
    a: "Yes, a one-time Admission Fee of PKR 2,000 and a Registration/Prospectus/ID Card Fee of PKR 500 apply to all new students across all levels.",
  },
  {
    q: "Do you offer a discount for siblings?",
    a: "Yes, we offer a 10% tuition discount from the second sibling onward.",
  },
  {
    q: "Do you provide Bachelor's level tutoring?",
    a: "Yes, we provide subject-wise tutoring and exam-prep support for BS-level students in subjects like Computer Science, Mathematics, Physics, Chemistry, Biology, Business Administration (BBA), and Education — this is coaching support, not a degree program.",
  },
  {
    q: "What is your teaching approach?",
    a: "We focus on concept-based learning rather than rote memorization, with regular tests, past-paper practice, small batch sizes, and dedicated doubt-clearing sessions before exams.",
  },
  {
    q: "When can I get admission?",
    a: "Admissions are open all year round. The best time to join Matric/Inter classes is at the start of the academic session (March-April), and for MDCAT/ECAT batches right after 2nd year board exams (June-July).",
  },
  {
    q: "What documents are needed for admission?",
    a: "A copy of your latest result/mark sheet (for Class 6 and above) and one passport-size photograph, along with the completed admission form.",
  },
  {
    q: "What happens if I miss a fee payment deadline?",
    a: "Fee must be paid by the 10th of each month. A late surcharge of PKR 200/week applies after that, and classes may be suspended after three consecutive unpaid months.",
  },
];

export default function FaqSection({ onOpenChat }: { onOpenChat: () => void }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = FAQ_LIST.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faqs" className="py-20 bg-cream-200 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-900 text-cream-100 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-flame-yellow" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-navy-900">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-sm sm:text-base text-navy-800/80">
            Institutional FAQs regarding admissions, subjects, shift timings, and fees.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-flame-orange to-teal-accent mx-auto rounded-full" />
        </div>

        {/* Live Search Bar */}
        <div className="mt-8 relative max-w-xl mx-auto">
          <Search className="w-4 h-4 text-navy-600 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs (e.g. fees, timings, MDCAT, admission)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-cream-400 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-flame-orange shadow-sm"
          />
        </div>

        {/* Accordion List */}
        <div className="mt-8 space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-cream-300">
              <p className="text-sm text-navy-700">No questions found matching your search.</p>
              <button
                onClick={onOpenChat}
                className="mt-3 px-4 py-2 text-xs font-bold text-white bg-flame-orange rounded-full"
              >
                Ask AI Assistant Instead
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-xl border border-cream-300 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-serif font-bold text-navy-900 text-sm sm:text-base hover:text-flame-orange transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="p-1 rounded-full bg-cream-200 text-navy-800 flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-navy-800 leading-relaxed border-t border-cream-200 bg-cream-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom AI Callout */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-cream-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-flame-orange/20 text-flame-dark">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif font-bold text-sm text-navy-900">Have a specific question?</p>
              <p className="text-xs text-navy-700">Our RAG AI Chatbot knows everything in the academy handbook.</p>
            </div>
          </div>
          <button
            onClick={onOpenChat}
            className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-flame-orange to-flame-yellow shadow-flame-sm hover:shadow-flame-md transition"
          >
            Chat with AI Counselor
          </button>
        </div>
      </div>
    </section>
  );
}
