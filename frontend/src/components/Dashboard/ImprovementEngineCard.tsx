"use client";

import React, { useState } from "react";
import { ImprovementRecommendation } from "@/types";
import { Wrench, TrendingUp, CheckSquare, Square, Sparkles } from "lucide-react";

interface ImprovementEngineCardProps {
  recommendations: ImprovementRecommendation[];
  baseScore: number;
}

export const ImprovementEngineCard: React.FC<ImprovementEngineCardProps> = ({
  recommendations,
  baseScore
}) => {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const addedScore = recommendations
    .filter((r) => checkedIds.includes(r.id))
    .reduce((acc, curr) => acc + curr.est_score_boost, 0);

  const updatedScore = Math.min(100, baseScore + addedScore);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Measurable Actionable Improvement Engine</h2>
            <p className="text-xs text-slate-400">
              Check off recommended fixes to simulate your updated score in real-time.
            </p>
          </div>
        </div>

        {/* Real-time score simulator */}
        <div className="flex items-center space-x-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 text-xs">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Simulated Score</span>
            <span className="text-lg font-extrabold text-cyan-300">
              {baseScore} → <span className="text-emerald-400">{updatedScore}</span> / 100
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec) => {
          const isChecked = checkedIds.includes(rec.id);

          return (
            <div
              key={rec.id}
              onClick={() => toggleCheck(rec.id)}
              className={`cursor-pointer rounded-xl border p-4 transition-all ${
                isChecked
                  ? "border-emerald-500/50 bg-emerald-500/10"
                  : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <button className="mt-0.5 text-slate-400 hover:text-white">
                    {isChecked ? (
                      <CheckSquare className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <Square className="h-5 w-5 text-slate-600" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className={`text-sm font-bold ${isChecked ? "text-emerald-300 line-through" : "text-white"}`}>
                        {rec.title}
                      </h3>
                      <span className="rounded-md bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-slate-400 border border-slate-800">
                        {rec.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{rec.action}</p>
                  </div>
                </div>

                {/* Estimated Boost Badges */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="rounded-lg bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-black text-emerald-300">
                    +{rec.est_score_boost} Score
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    +{rec.est_role_match_boost}% Role Match
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
