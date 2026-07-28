"use client";

import React from "react";
import { EvaluationReport } from "@/types";
import { GaugeChart } from "@/components/GaugeChart";
import { AlertCircle, HelpCircle, ShieldCheck } from "lucide-react";

interface PrimaryMetricsProps {
  report: EvaluationReport;
}

export const PrimaryMetrics: React.FC<PrimaryMetricsProps> = ({ report }) => {
  const { overall_scores, target_role, candidate_info } = report;

  return (
    <div className="space-y-6">
      {/* Candidate Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-extrabold text-white">
              {candidate_info.name || "Candidate"}
            </h1>
            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-400 border border-cyan-500/20">
              Target: {target_role}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Evaluated against internal recruiter rubric • {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {candidate_info.email && (
            <span className="rounded-lg bg-slate-950 px-3 py-1.5 text-xs text-slate-300 border border-slate-800">
              {candidate_info.email}
            </span>
          )}
          {candidate_info.github && (
            <a
              href={candidate_info.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-slate-950 px-3 py-1.5 text-xs text-cyan-400 hover:underline border border-slate-800"
            >
              GitHub Profile
            </a>
          )}
        </div>
      </div>

      {/* 6 Primary Metric Gauges */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md text-center">
          <GaugeChart
            score={overall_scores.resume_score}
            label="Resume Score"
            sublabel="Weighted Raw"
            color="cyan"
          />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md text-center">
          <GaugeChart
            score={overall_scores.role_match_score}
            label="Role Match"
            sublabel="Skills Coverage"
            color="emerald"
          />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md text-center">
          <GaugeChart
            score={overall_scores.ats_compatibility_score}
            label="ATS Score"
            sublabel="Readability"
            color="purple"
          />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md text-center">
          <GaugeChart
            score={overall_scores.recruiter_confidence_score}
            label="Recruiter Conf."
            sublabel="Overall Trust"
            color="amber"
          />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md text-center">
          <GaugeChart
            score={overall_scores.interview_readiness_score}
            label="Interview Ready"
            sublabel="Technical Prep"
            color="cyan"
          />
        </div>

        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-4 backdrop-blur-md text-center">
          <GaugeChart
            score={overall_scores.estimated_shortlist_probability}
            label="Shortlist Prob."
            sublabel="Pass Rate"
            color="emerald"
          />
        </div>
      </div>

      {/* Probability Disclaimer Notice */}
      <div className="flex items-start space-x-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-400">
        <HelpCircle className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
        <p>{overall_scores.disclaimer}</p>
      </div>
    </div>
  );
};
