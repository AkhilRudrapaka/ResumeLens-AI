"use client";

import React from "react";
import { X, Shield, BarChart3, Users, AlertCircle, Award, TrendingUp } from "lucide-react";

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const stats = {
    total_uploads: 148,
    average_resume_score: 78,
    average_ats_score: 86,
    popular_roles: [
      { role: "Software Engineer", count: 42 },
      { role: "Frontend Developer", count: 38 },
      { role: "AI Engineer", count: 31 },
      { role: "Full Stack Developer", count: 28 },
      { role: "DevOps Engineer", count: 19 }
    ],
    top_missing_skills: [
      { skill: "Docker & Containerization", occurrences: 64 },
      { skill: "AWS / Cloud Deployment", occurrences: 58 },
      { skill: "Automated Testing (Jest/PyTest)", occurrences: 49 },
      { skill: "System Design & Architecture", occurrences: 41 },
      { skill: "CI/CD Pipeline Configuration", occurrences: 37 }
    ]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Platform Admin & Recruiter Analytics</h2>
              <p className="text-xs text-slate-400">
                Aggregate insights across resume screenings, popular roles, and missing candidate skills.
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

        {/* Top 3 Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Total Candidate Uploads</span>
              <Users className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">{stats.total_uploads}</div>
            <span className="text-[10px] text-emerald-400 font-medium">+14% this week</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Average Resume Score</span>
              <Award className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-400 mt-2">{stats.average_resume_score} / 100</div>
            <span className="text-[10px] text-slate-400 font-medium">Standard distribution</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Average ATS Readability</span>
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </div>
            <div className="text-2xl font-extrabold text-purple-400 mt-2">{stats.average_ats_score}%</div>
            <span className="text-[10px] text-slate-400 font-medium">Machine extractable</span>
          </div>
        </div>

        {/* Analytics Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Popular Target Roles */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4 text-cyan-400" />
              Most Popular Target Job Roles:
            </span>
            <div className="space-y-2">
              {stats.popular_roles.map((r, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">{r.role}</span>
                  <span className="rounded-md bg-slate-900 px-2 py-0.5 font-bold text-cyan-400 border border-slate-800">
                    {r.count} candidates
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Missing Skills Across Candidates */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 text-rose-400" />
              Top Missing Skills Across Applicants:
            </span>
            <div className="space-y-2">
              {stats.top_missing_skills.map((s, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">{s.skill}</span>
                  <span className="rounded-md bg-rose-500/10 px-2 py-0.5 font-bold text-rose-300 border border-rose-500/20">
                    {s.occurrences} missing
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
