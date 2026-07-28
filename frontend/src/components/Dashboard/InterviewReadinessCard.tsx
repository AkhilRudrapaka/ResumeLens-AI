"use client";

import React, { useState } from "react";
import { InterviewReadiness, InterviewQuestion } from "@/types";
import { HelpCircle, Sparkles, ChevronDown, ChevronUp, Code, MessageSquare, Terminal, Lightbulb } from "lucide-react";

interface InterviewReadinessCardProps {
  readiness: InterviewReadiness;
}

export const InterviewReadinessCard: React.FC<InterviewReadinessCardProps> = ({ readiness }) => {
  const [activeTab, setActiveTab] = useState<"all" | "tech" | "system" | "behavioral">("all");
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(1);

  const { interview_readiness_score, top_strengths, weaknesses_to_address, coding_topics, questions } = readiness;

  const filteredQuestions = questions.filter((q) => {
    if (activeTab === "tech") return q.type.includes("Coding");
    if (activeTab === "system") return q.type.includes("System") || q.type.includes("Project");
    if (activeTab === "behavioral") return q.type.includes("Behavioral");
    return true;
  });

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Interview Readiness & 20 Tailored Questions</h2>
            <p className="text-xs text-slate-400">
              Generated based on your resume stack and expected role interview topics.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-400">Readiness Score:</span>
          <span className="text-xl font-extrabold text-cyan-400">{interview_readiness_score} / 100</span>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Top Interview Strengths:
          </span>
          <ul className="space-y-1 text-xs text-slate-300">
            {top_strengths.map((str, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
          <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
            <Lightbulb className="h-3.5 w-3.5" />
            Weaknesses / Topics to Prepare:
          </span>
          <ul className="space-y-1 text-xs text-slate-300">
            {weaknesses_to_address.map((wk, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>{wk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Coding Topics Chips */}
      <div>
        <span className="text-xs font-bold text-slate-300 block mb-2">Priority Coding & Technical Focus Topics:</span>
        <div className="flex flex-wrap gap-2">
          {coding_topics.map((tp) => (
            <span key={tp} className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300">
              {tp}
            </span>
          ))}
        </div>
      </div>

      {/* 20 Tailored Questions Accordion */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-200">
            20 Tailored Interview Questions ({filteredQuestions.length} shown):
          </span>
          <div className="flex gap-1.5 text-[11px] font-semibold">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-2.5 py-1 rounded-md transition-colors ${activeTab === "all" ? "bg-cyan-500 text-slate-950" : "bg-slate-950 text-slate-400"}`}
            >
              All (20)
            </button>
            <button
              onClick={() => setActiveTab("tech")}
              className={`px-2.5 py-1 rounded-md transition-colors ${activeTab === "tech" ? "bg-cyan-500 text-slate-950" : "bg-slate-950 text-slate-400"}`}
            >
              Coding & Tech (8)
            </button>
            <button
              onClick={() => setActiveTab("system")}
              className={`px-2.5 py-1 rounded-md transition-colors ${activeTab === "system" ? "bg-cyan-500 text-slate-950" : "bg-slate-950 text-slate-400"}`}
            >
              Architecture (6)
            </button>
            <button
              onClick={() => setActiveTab("behavioral")}
              className={`px-2.5 py-1 rounded-md transition-colors ${activeTab === "behavioral" ? "bg-cyan-500 text-slate-950" : "bg-slate-950 text-slate-400"}`}
            >
              Behavioral (6)
            </button>
          </div>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
          {filteredQuestions.map((q: InterviewQuestion) => {
            const isExpanded = expandedQuestion === q.id;
            return (
              <div
                key={q.id}
                className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}
                  className="w-full flex items-center justify-between p-3.5 text-left hover:bg-slate-900/60 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-900 text-xs font-bold text-cyan-400 border border-slate-800">
                      Q{q.id}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-white block">{q.question}</span>
                      <span className="text-[10px] text-slate-500 font-medium">{q.type}</span>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-3.5 bg-slate-900/40 border-t border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-cyan-400 block">Recruiter & Engineering Interviewer Expectation:</span>
                    <p className="text-slate-400 leading-relaxed font-mono text-[11px]">{q.hint}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
