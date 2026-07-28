"use client";

import React from "react";
import { RecruiterSimulation } from "@/types";
import { UserCheck, ThumbsUp, AlertTriangle, Sparkles, CheckCircle2, XCircle, HelpCircle } from "lucide-react";

interface RecruiterSimulationCardProps {
  simulation: RecruiterSimulation;
  targetRole: string;
}

export const RecruiterSimulationCard: React.FC<RecruiterSimulationCardProps> = ({
  simulation,
  targetRole,
}) => {
  const { decision, badge, recruiter_confidence, first_impression, key_highlights, red_flags } = simulation;

  const decisionStyles = {
    YES: {
      bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
      pill: "bg-emerald-500 text-slate-950",
      icon: <CheckCircle2 className="h-6 w-6 text-emerald-400" />
    },
    MAYBE: {
      bg: "bg-amber-500/10 border-amber-500/30 text-amber-400",
      pill: "bg-amber-500 text-slate-950",
      icon: <HelpCircle className="h-6 w-6 text-amber-400" />
    },
    NO: {
      bg: "bg-rose-500/10 border-rose-500/30 text-rose-400",
      pill: "bg-rose-500 text-slate-950",
      icon: <XCircle className="h-6 w-6 text-rose-400" />
    }
  };

  const style = decisionStyles[decision] || decisionStyles.MAYBE;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Recruiter Screening Simulation</h2>
            <p className="text-xs text-slate-400">
              Evaluated from a Senior Recruiter & Hiring Manager perspective for {targetRole}.
            </p>
          </div>
        </div>

        {/* Shortlist Decision Badge */}
        <div className={`flex items-center space-x-3 rounded-2xl border p-4 ${style.bg}`}>
          {style.icon}
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">
              Would Recruiter Shortlist?
            </div>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className={`rounded-md px-2.5 py-0.5 text-xs font-black tracking-widest ${style.pill}`}>
                {decision}
              </span>
              <span className="text-xs font-semibold">{badge}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recruiter First Impression Box */}
      <div className="mt-6 space-y-4">
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            Recruiter's Initial 6-Second Impression:
          </span>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            "{first_impression}"
          </p>
        </div>

        {/* Highlights vs Red Flags Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
              <ThumbsUp className="h-3.5 w-3.5" />
              Screening Highlights:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {key_highlights.map((h, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
            <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5 mb-2">
              <AlertTriangle className="h-3.5 w-3.5" />
              Recruiter Concerns / Gaps:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {red_flags.map((rf, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{rf}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
