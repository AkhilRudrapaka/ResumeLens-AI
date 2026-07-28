"use client";

import React from "react";
import { RoleMatchAnalysis as RoleMatchAnalysisType } from "@/types";
import { Target, CheckCircle2, XCircle, Code, Layers } from "lucide-react";

interface RoleMatchAnalysisProps {
  roleMatch: RoleMatchAnalysisType;
}

export const RoleMatchAnalysis: React.FC<RoleMatchAnalysisProps> = ({ roleMatch }) => {
  const { score, role, matching_skills, missing_skills, required_matched, required_total, preferred_matched, preferred_total, reason } = roleMatch;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Target Role Skill Alignment</h2>
            <p className="text-xs text-slate-400">
              {reason}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-medium">Role Match</div>
            <div className="text-xl font-extrabold text-emerald-400">{score}%</div>
          </div>
        </div>
      </div>

      {/* Progress Bars for Required vs Preferred */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>Required Role Skills</span>
            <span className="text-cyan-400">{required_matched} / {required_total}</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-900 overflow-hidden">
            <div
              className="h-full rounded-full bg-cyan-500 transition-all duration-500"
              style={{ width: `${(required_matched / Math.max(1, required_total)) * 100}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>Preferred Role Skills</span>
            <span className="text-purple-400">{preferred_matched} / {preferred_total}</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-900 overflow-hidden">
            <div
              className="h-full rounded-full bg-purple-500 transition-all duration-500"
              style={{ width: `${(preferred_matched / Math.max(1, preferred_total)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Matching Skills vs Missing Skills Chips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched */}
        <div>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-3">
            <CheckCircle2 className="h-4 w-4" />
            Matching Skills Found in Resume ({matching_skills.length}):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {matching_skills.length > 0 ? (
              matching_skills.map((sk) => (
                <span
                  key={sk}
                  className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-xs font-medium text-emerald-300"
                >
                  ✓ {sk}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500">No skills matched yet.</span>
            )}
          </div>
        </div>

        {/* Missing */}
        <div>
          <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5 mb-3">
            <XCircle className="h-4 w-4" />
            Missing Skills Needed for {role} ({missing_skills.length}):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {missing_skills.length > 0 ? (
              missing_skills.map((sk) => (
                <span
                  key={sk}
                  className="rounded-lg bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 text-xs font-medium text-rose-300"
                >
                  + {sk}
                </span>
              ))
            ) : (
              <span className="text-xs text-emerald-400 font-medium">All target skills matched cleanly!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
