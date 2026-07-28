"use client";

import React, { useState } from "react";
import { CategoryScores } from "@/types";
import { ChevronDown, ChevronUp, CheckCircle, Info, Award, Code, Briefcase, FileText, GraduationCap, Zap, Star } from "lucide-react";

interface CategoryBreakdownProps {
  categories: CategoryScores;
}

interface CategoryConfig {
  key: keyof CategoryScores;
  name: string;
  weight: string;
  icon: React.ReactNode;
}

export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ categories }) => {
  const [openItem, setOpenItem] = useState<string | null>("technical_skills");

  const categoryConfigs: CategoryConfig[] = [
    { key: "technical_skills", name: "Technical Skills", weight: "25%", icon: <Code className="h-4 w-4 text-cyan-400" /> },
    { key: "projects", name: "Projects & Architecture", weight: "20%", icon: <Zap className="h-4 w-4 text-emerald-400" /> },
    { key: "experience", name: "Work & Internship Experience", weight: "20%", icon: <Briefcase className="h-4 w-4 text-indigo-400" /> },
    { key: "ats_compatibility", name: "ATS Machine Readability", weight: "10%", icon: <FileText className="h-4 w-4 text-purple-400" /> },
    { key: "role_match", name: "Role Requirement Match", weight: "10%", icon: <Star className="h-4 w-4 text-amber-400" /> },
    { key: "resume_quality", name: "Resume Quality & Formatting", weight: "5%", icon: <Info className="h-4 w-4 text-blue-400" /> },
    { key: "achievements", name: "Quantifiable Achievements", weight: "5%", icon: <Award className="h-4 w-4 text-rose-400" /> },
    { key: "education", name: "Education & Foundation", weight: "3%", icon: <GraduationCap className="h-4 w-4 text-teal-400" /> },
    { key: "certifications", name: "Certifications & Honors", weight: "2%", icon: <Award className="h-4 w-4 text-yellow-400" /> },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">Weighted Category Evaluation Breakdown</h2>
        <p className="text-xs text-slate-400 mt-1">
          Every score includes evidence extracted directly from the resume and explicit rationale.
        </p>
      </div>

      <div className="space-y-3">
        {categoryConfigs.map((cfg) => {
          const item = categories[cfg.key];
          if (!item) return null;

          const isOpen = openItem === cfg.key;
          const score = item.score ?? 75;

          return (
            <div
              key={cfg.key}
              className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenItem(isOpen ? null : (cfg.key as string))}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-900/80 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    {cfg.icon}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-white">{cfg.name}</span>
                      <span className="rounded-md bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-slate-400 border border-slate-800">
                        Weight: {cfg.weight}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {item.reason}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="text-base font-extrabold text-cyan-400">{score}</span>
                    <span className="text-xs text-slate-500"> / 100</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="p-4 bg-slate-900/40 border-t border-slate-800 space-y-3 text-xs text-slate-300">
                  <div>
                    <span className="font-bold text-slate-200 block mb-1">Score Rationale:</span>
                    <p className="text-slate-400 leading-relaxed">{item.reason}</p>
                  </div>

                  {item.evidence && item.evidence.length > 0 && (
                    <div>
                      <span className="font-bold text-cyan-400 block mb-1">Extracted Resume Evidence:</span>
                      <ul className="space-y-1">
                        {item.evidence.map((ev: string, idx: number) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="font-mono text-slate-300">{ev}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
