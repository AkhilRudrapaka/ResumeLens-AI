"use client";

import React from "react";
import { AtsAnalysis } from "@/types";
import { ShieldCheck, AlertCircle, Wrench, Check, CheckCircle2, XCircle, Layers } from "lucide-react";

interface AtsAnalysisCardProps {
  ats: AtsAnalysis;
}

export const AtsAnalysisCard: React.FC<AtsAnalysisCardProps> = ({ ats }) => {
  const { score, issues, fix_suggestions, reason, jd_keyword_coverage, jd_keywords_found, jd_keywords_missing } = ats;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">ATS Compatibility & Readability Audit</h2>
            <p className="text-xs text-slate-400">{reason}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-400">ATS Score:</span>
          <span className="text-xl font-extrabold text-purple-400">{score} / 100</span>
        </div>
      </div>

      {/* Job Description Keyword Coverage Breakdown if present */}
      {jd_keywords_found && (
        <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-purple-400" />
              Target Job Description Keyword Match ({jd_keyword_coverage ?? 0}%):
            </span>
            <span className="text-xs font-extrabold text-purple-400">
              {jd_keywords_found.length} / {(jd_keywords_found.length + (jd_keywords_missing?.length || 0))} terms matched
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1 mb-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" /> Matched JD Keywords ({jd_keywords_found.length}):
              </span>
              <div className="flex flex-wrap gap-1">
                {jd_keywords_found.map((k) => (
                  <span key={k} className="rounded-md bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[11px] text-emerald-300">
                    ✓ {k}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-rose-400 flex items-center gap-1 mb-1.5">
                <XCircle className="h-3.5 w-3.5" /> Missing JD Keywords ({jd_keywords_missing?.length || 0}):
              </span>
              <div className="flex flex-wrap gap-1">
                {jd_keywords_missing && jd_keywords_missing.length > 0 ? (
                  jd_keywords_missing.map((k) => (
                    <span key={k} className="rounded-md bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 text-[11px] text-rose-300">
                      + {k}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-emerald-400 font-medium">100% of target JD terms matched in document!</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Issues Found */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <AlertCircle className="h-4 w-4" />
            Detected ATS Formatting & Parser Flags:
          </span>
          <ul className="space-y-2 text-xs text-slate-300">
            {issues.map((iss, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{iss}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actionable Fix Suggestions */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
          <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
            <Wrench className="h-4 w-4" />
            Recommended ATS Fixes:
          </span>
          <ul className="space-y-2 text-xs text-slate-300">
            {fix_suggestions.map((fix, i) => (
              <li key={i} className="flex items-start space-x-2">
                <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{fix}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
