"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Cpu, ShieldCheck } from "lucide-react";

interface AnalysisProgressProps {
  onComplete: () => void;
}

const STAGES = [
  "Evaluator 1: Resume Section Parser & Contact Extraction",
  "Evaluator 2: Role Knowledge Benchmark & Requirements Match",
  "Evaluator 3: ATS Compatibility & Machine Readability",
  "Evaluator 4: Technical Stack Depth & Skill Coverage",
  "Evaluator 5: Project Complexity & Architecture Analysis",
  "Evaluator 6: Internship & Work Experience Audit",
  "Evaluator 7: Quantifiable Impact & Metrics Verification",
  "Evaluator 8: Education & Academic Background Check",
  "Evaluator 9: Action Verbs & Grammar Tone Scan",
  "Evaluator 10: Document Formatting & Density Check",
  "Evaluator 11: Domain Keyword Coverage Index",
  "Evaluator 12: Recruiter First Impression Simulation",
  "Evaluator 13: 20-Question Interview Readiness Generator",
  "Evaluator 14: Measurable Impact Improvement Engine",
  "Evaluator 15: Final Score Aggregator & Shortlist Probability"
];

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ onComplete }) => {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (currentStage < STAGES.length) {
      const timer = setTimeout(() => {
        setCurrentStage((prev) => prev + 1);
      }, 350); // fast 5s total run
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        onComplete();
      }, 400);
      return () => clearTimeout(finishTimer);
    }
  }, [currentStage, onComplete]);

  const progressPct = Math.min(100, Math.round((currentStage / STAGES.length) * 100));

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur-xl shadow-2xl max-w-2xl mx-auto my-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mx-auto mb-6">
        <Cpu className="h-8 w-8 animate-pulse" />
      </div>

      <h2 className="text-2xl font-extrabold text-white">AI Evaluation Pipeline Running</h2>
      <p className="text-xs text-slate-400 mt-1">
        Simulating Applicant Tracking Systems and Recruiter Screening Committees
      </p>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
          <span>Overall Progress</span>
          <span className="text-cyan-400">{progressPct}%</span>
        </div>
        <div className="h-3 w-full rounded-full bg-slate-950 overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Stage Logs List */}
      <div className="mt-8 space-y-2 text-left max-h-64 overflow-y-auto pr-2 custom-scrollbar">
        {STAGES.map((stage, idx) => {
          const isDone = idx < currentStage;
          const isCurrent = idx === currentStage;

          return (
            <div
              key={stage}
              className={`flex items-center space-x-3 rounded-xl p-2.5 text-xs transition-all ${
                isDone
                  ? "bg-slate-950/60 text-slate-300 border border-slate-800/80"
                  : isCurrent
                  ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold"
                  : "text-slate-600 opacity-40"
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="h-4 w-4 text-cyan-400 animate-spin shrink-0" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-slate-700 shrink-0" />
              )}
              <span className="truncate">{stage}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
