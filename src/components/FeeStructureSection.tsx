"use client";

import React, { useState } from "react";
import { FEE_TABLES } from "@/lib/demo-data";
import {
  CreditCard,
  Calculator,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

export default function FeeStructureSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [calcBaseFee, setCalcBaseFee] = useState<number>(8000);
  const [calcNumSiblings, setCalcNumSiblings] = useState<number>(2);

  const discountedFee =
    calcNumSiblings > 1
      ? Math.round(calcBaseFee * 0.9)
      : calcBaseFee;

  const categoryNames: { [key: string]: string } = {
    "5.1": "Pre-Primary & Primary",
    "5.2": "Middle Section",
    "5.3": "Matric Section",
    "5.4": "Intermediate Section",
    "5.6": "Admission & Charges",
  };

  const filteredTables =
    selectedCategory === "all"
      ? FEE_TABLES
      : FEE_TABLES.filter((t) => t.section === selectedCategory);

  return (
    <section id="fees" className="py-20 bg-cream-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-900 text-cream-100 text-xs font-bold uppercase tracking-wider">
            <CreditCard className="w-3.5 h-3.5 text-flame-yellow" />
            <span>Institutional Fee Schedule</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-navy-900">
            Complete & Transparent Fee Structure
          </h2>
          <p className="text-sm sm:text-base text-navy-800/80">
            All fees in PKR. Discounted full-group packages, family concessions, and clear institutional policies.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-flame-orange to-teal-accent mx-auto rounded-full" />
        </div>

        {/* Section Filter Tabs */}
        <div className="mt-8 flex items-center justify-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCategory === "all"
                ? "bg-navy-900 text-white shadow"
                : "bg-white text-navy-800 border border-cream-300"
            }`}
          >
            All Fee Categories
          </button>
          {FEE_TABLES.map((table) => (
            <button
              key={table.section}
              onClick={() => setSelectedCategory(table.section)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === table.section
                  ? "bg-navy-900 text-white shadow"
                  : "bg-white text-navy-800 border border-cream-300"
              }`}
            >
              {categoryNames[table.section] || table.title}
            </button>
          ))}
        </div>

        {/* Fee Tables Grid */}
        <div className="mt-8 space-y-8">
          {filteredTables.map((table) => (
            <div
              key={table.section}
              className="glass-card rounded-2xl overflow-hidden border border-cream-400 shadow-md"
            >
              {/* Table Header */}
              <div className="bg-navy-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                    {table.title.replace(/^\d+\.\d+\s*/, "")}
                  </h3>
                </div>
                <p className="text-xs text-navy-200 sm:text-right max-w-sm">{table.description}</p>
              </div>

              {/* Table Content */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-cream-100 text-navy-900 border-b border-cream-300 font-bold uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Category / Subject</th>
                      <th className="px-6 py-3.5">Fee (PKR)</th>
                      <th className="px-6 py-3.5">Schedule</th>
                      <th className="px-6 py-3.5">Coverage / Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-300/70 text-navy-800 bg-white/70">
                    {table.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-cream-100/80 transition-colors">
                        <td className="px-6 py-3.5 font-bold text-navy-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-3.5 font-extrabold text-flame-dark whitespace-nowrap">
                          {typeof item.fee === "number"
                            ? `PKR ${item.fee.toLocaleString()}`
                            : item.fee}
                        </td>
                        <td className="px-6 py-3.5 text-xs text-navy-700 whitespace-nowrap">
                          {item.duration || "Per Month"}
                        </td>
                        <td className="px-6 py-3.5 text-xs text-navy-700">
                          {item.note || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Sibling Discount Calculator & Policies */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Sibling Calculator */}
          <div className="lg:col-span-6 glass-card rounded-2xl p-6 sm:p-7 border border-cream-400">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-flame-orange/20 rounded-xl text-flame-dark">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-navy-900">
                  Sibling Discount Calculator
                </h3>
                <p className="text-xs text-navy-700">Automatic 10% concession from 2nd sibling onward</p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-navy-800 mb-1">
                  Monthly Tuition Package (PKR)
                </label>
                <select
                  value={calcBaseFee}
                  onChange={(e) => setCalcBaseFee(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-400 bg-white text-sm font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-flame-orange"
                >
                  <option value={7500}>Class 9 Science Group (PKR 7,500)</option>
                  <option value={8000}>Class 10 Science Group (PKR 8,000)</option>
                  <option value={9500}>Class 11 Pre-Med / Pre-Eng (PKR 9,500)</option>
                  <option value={10000}>Class 12 Pre-Med / Pre-Eng (PKR 10,000)</option>
                  <option value={9000}>ICS Group Package (PKR 9,000)</option>
                  <option value={8500}>Commerce I.Com Package (PKR 8,500)</option>
                  <option value={5000}>Middle Class 8 All Subjects (PKR 5,000)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-800 mb-1">
                  Number of Enrolled Siblings
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => setCalcNumSiblings(num)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        calcNumSiblings === num
                          ? "bg-navy-900 text-white"
                          : "bg-white border border-cream-400 text-navy-800 hover:bg-cream-100"
                      }`}
                    >
                      {num} {num === 1 ? "Student" : "Siblings"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Result Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cream-100 to-cream-200 border border-cream-400 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase text-navy-700">
                    {calcNumSiblings > 1 ? "Sibling Discounted Monthly Fee" : "Standard Tuition Fee"}
                  </p>
                  <p className="font-serif font-black text-2xl text-navy-900">
                    PKR {discountedFee.toLocaleString()}
                    <span className="text-xs font-normal text-navy-700 ml-1">/ month</span>
                  </p>
                </div>
                {calcNumSiblings > 1 && (
                  <span className="px-3 py-1 text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full">
                    Saved PKR {(calcBaseFee - discountedFee).toLocaleString()} / mo!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Policy Rules Summary */}
          <div className="lg:col-span-6 glass-card rounded-2xl p-6 sm:p-7 border border-cream-400 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-teal-accent/20 rounded-xl text-teal-dark">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-navy-900">
                    Fee Policies & Payment Rules
                  </h3>
                  <p className="text-xs text-navy-700">Official institutional terms</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-navy-800">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-accent flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>One-Time Charges:</strong> Admission Fee (PKR 2,000) & Registration / Prospectus / ID Card Fee (PKR 500) apply for all new students.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-accent flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Due Date (10th):</strong> Monthly tuition must be submitted by the 10th of every calendar month.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-accent flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Late Surcharge:</strong> A fee of <strong>PKR 200 / week</strong> is applied after the 10th deadline.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-accent flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Refund Policy:</strong> Fee once paid is non-refundable, but adjustable against the next month in verified genuine cases.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-cream-300 flex items-center justify-between">
              <span className="text-xs font-bold text-navy-700">Have questions about fee vouchers?</span>
              <a
                href="https://wa.me/923175790206?text=Hello,%20I%20have%20a%20question%20regarding%20Mind%20Flare%20Academy%20fees."
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-flame-dark hover:text-flame-orange underline"
              >
                Inquire Accounts Office
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
