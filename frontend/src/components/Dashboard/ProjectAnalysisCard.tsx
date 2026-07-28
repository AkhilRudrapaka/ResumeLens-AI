"use client";

import React from "react";
import { DetailedProject } from "@/types";
import { Zap, Code, ShieldCheck, Server, Terminal, FileCode, CheckCircle2 } from "lucide-react";

interface ProjectAnalysisCardProps {
  projects: DetailedProject[];
}

export const ProjectAnalysisCard: React.FC<ProjectAnalysisCardProps> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Zap className="h-5 w-5 text-emerald-400" />
          Project Architecture & Quality Deep Dive
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Every project is evaluated across 9 engineering dimensions.
        </p>
      </div>

      <div className="space-y-6">
        {projects.map((proj, idx) => (
          <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-900">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>{proj.name}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{proj.description}</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">Score:</span>
                <span className="text-lg font-extrabold text-emerald-400">{proj.score} / 100</span>
              </div>
            </div>

            {/* 9 Dimensions Radar/Bar Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
              <div className="rounded-lg bg-slate-900/80 p-2.5 text-center border border-slate-850">
                <div className="text-[10px] text-slate-400 font-semibold">Innovation</div>
                <div className="text-sm font-extrabold text-cyan-400 mt-1">{proj.innovation}%</div>
              </div>
              <div className="rounded-lg bg-slate-900/80 p-2.5 text-center border border-slate-850">
                <div className="text-[10px] text-slate-400 font-semibold">Complexity</div>
                <div className="text-sm font-extrabold text-cyan-400 mt-1">{proj.complexity}%</div>
              </div>
              <div className="rounded-lg bg-slate-900/80 p-2.5 text-center border border-slate-850">
                <div className="text-[10px] text-slate-400 font-semibold">Architecture</div>
                <div className="text-sm font-extrabold text-cyan-400 mt-1">{proj.architecture}%</div>
              </div>
              <div className="rounded-lg bg-slate-900/80 p-2.5 text-center border border-slate-850">
                <div className="text-[10px] text-slate-400 font-semibold">Impact</div>
                <div className="text-sm font-extrabold text-emerald-400 mt-1">{proj.real_world_impact}%</div>
              </div>
              <div className="rounded-lg bg-slate-900/80 p-2.5 text-center border border-slate-850">
                <div className="text-[10px] text-slate-400 font-semibold">Deployment</div>
                <div className="text-sm font-extrabold text-purple-400 mt-1">{proj.deployment}%</div>
              </div>
              <div className="rounded-lg bg-slate-900/80 p-2.5 text-center border border-slate-850">
                <div className="text-[10px] text-slate-400 font-semibold">Documentation</div>
                <div className="text-sm font-extrabold text-amber-400 mt-1">{proj.documentation}%</div>
              </div>
              <div className="rounded-lg bg-slate-900/80 p-2.5 text-center border border-slate-850">
                <div className="text-[10px] text-slate-400 font-semibold">Scalability</div>
                <div className="text-sm font-extrabold text-indigo-400 mt-1">{proj.scalability}%</div>
              </div>
              <div className="rounded-lg bg-slate-900/80 p-2.5 text-center border border-slate-850">
                <div className="text-[10px] text-slate-400 font-semibold">Testing</div>
                <div className="text-sm font-extrabold text-rose-400 mt-1">{proj.testing}%</div>
              </div>
              <div className="rounded-lg bg-slate-900/80 p-2.5 text-center border border-slate-850 col-span-2 sm:col-span-1">
                <div className="text-[10px] text-slate-400 font-semibold">Code Quality</div>
                <div className="text-sm font-extrabold text-teal-400 mt-1">{proj.code_quality}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
