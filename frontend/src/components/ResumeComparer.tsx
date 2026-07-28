"use client";

import React, { useState } from "react";
import { evaluateResumeClient } from "@/utils/mockEvaluator";
import { EvaluationReport } from "@/types";
import { X, ArrowRight, CheckCircle2, TrendingUp, Sparkles, Scale } from "lucide-react";

interface ResumeComparerProps {
  isOpen: boolean;
  onClose: () => void;
  targetRole: string;
}

export const ResumeComparer: React.FC<ResumeComparerProps> = ({
  isOpen,
  onClose,
  targetRole
}) => {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [reportA, setReportA] = useState<EvaluationReport | null>(null);
  const [reportB, setReportB] = useState<EvaluationReport | null>(null);

  if (!isOpen) return null;

  const handleCompare = () => {
    if (!textA.trim() || !textB.trim()) return;
    const resA = evaluateResumeClient(textA, targetRole);
    const resB = evaluateResumeClient(textB, targetRole);
    setReportA(resA);
    setReportB(resB);
  };

  const loadSampleComparison = () => {
    const sampleA = `Alex Rivera\nSkills: Java, Python, SQL, REST APIs.\nWork: Software Engineer Intern at Innovate Labs. Built basic CRUD endpoints.`;
    const sampleB = `Alex Rivera\nSkills: Java, Python, SQL, REST APIs, Docker, AWS, Redis, Microservices.\nWork: Software Engineer at CloudScale Tech. Architected high-throughput FastAPI microservices serving 500,000+ DAE. Reduced latency by 42%. Deployed with Docker & AWS.`;

    setTextA(sampleA);
    setTextB(sampleB);

    const resA = evaluateResumeClient(sampleA, targetRole);
    const resB = evaluateResumeClient(sampleB, targetRole);
    setReportA(resA);
    setReportB(resB);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Resume Version A vs B Comparer</h2>
              <p className="text-xs text-slate-400">
                Compare score deltas, ATS improvement, and recruiter shortlist decisions side-by-side.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Action button bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={loadSampleComparison}
            className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-cyan-400 hover:border-cyan-500/40"
          >
            Load Demo Comparison (Before vs After)
          </button>

          <button
            onClick={handleCompare}
            disabled={!textA.trim() || !textB.trim()}
            className="rounded-xl bg-purple-500 px-6 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-purple-500/20 hover:bg-purple-400 disabled:opacity-50"
          >
            Run Side-by-Side Comparison
          </button>
        </div>

        {/* Text Areas Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1 block">
              Resume Version A (Original):
            </label>
            <textarea
              rows={5}
              placeholder="Paste Version A resume text..."
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs font-mono text-slate-200 placeholder-slate-600 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1 block">
              Resume Version B (Revised / Optimized):
            </label>
            <textarea
              rows={5}
              placeholder="Paste Version B resume text..."
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs font-mono text-slate-200 placeholder-slate-600 focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Comparison Results Card */}
        {reportA && reportB && (
          <div className="space-y-6 pt-4 border-t border-slate-800">
            {/* Top Delta Summary */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
              <span className="text-xs font-bold text-emerald-300 flex items-center justify-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                Version B Score Gain: +
                {reportB.overall_scores.resume_score - reportA.overall_scores.resume_score} Points!
              </span>
              <p className="text-xs text-slate-300 mt-1 font-medium">
                Shortlist probability increased from {reportA.overall_scores.estimated_shortlist_probability}% → {reportB.overall_scores.estimated_shortlist_probability}%.
              </p>
            </div>

            {/* Side-by-side metric comparison table */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <div className="text-[10px] text-slate-400 font-semibold">Resume Score</div>
                <div className="text-lg font-extrabold text-white mt-1">
                  {reportA.overall_scores.resume_score} → <span className="text-emerald-400">{reportB.overall_scores.resume_score}</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <div className="text-[10px] text-slate-400 font-semibold">Role Match</div>
                <div className="text-lg font-extrabold text-white mt-1">
                  {reportA.overall_scores.role_match_score}% → <span className="text-emerald-400">{reportB.overall_scores.role_match_score}%</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <div className="text-[10px] text-slate-400 font-semibold">ATS Compatibility</div>
                <div className="text-lg font-extrabold text-white mt-1">
                  {reportA.overall_scores.ats_compatibility_score}% → <span className="text-emerald-400">{reportB.overall_scores.ats_compatibility_score}%</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <div className="text-[10px] text-slate-400 font-semibold">Recruiter Verdict</div>
                <div className="text-sm font-extrabold text-white mt-1">
                  {reportA.recruiter_simulation.decision} → <span className="text-emerald-400">{reportB.recruiter_simulation.decision}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
