"use client";

import React from "react";
import { EvaluationReport } from "@/types";
import { X, History, FileText, ArrowRight, Trash2 } from "lucide-react";

interface UserHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: EvaluationReport[];
  onSelectReport: (report: EvaluationReport) => void;
  onClearHistory: () => void;
}

export const UserHistoryModal: React.FC<UserHistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectReport,
  onClearHistory
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <History className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Resume Evaluation History</h2>
              <p className="text-xs text-slate-400">
                View past evaluation reports, scores, and candidate runs.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                className="flex items-center space-x-1 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-rose-400 hover:bg-slate-800"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* History List */}
        {history.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No previous evaluation runs saved yet. Upload a resume to create your first report.
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectReport(item);
                  onClose();
                }}
                className="group cursor-pointer flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4 hover:border-slate-700 hover:bg-slate-900 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.candidate_info.name || "Candidate"} • {item.target_role}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {item.filename || "Uploaded_Resume.pdf"} • {new Date(item.timestamp || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Score</span>
                    <span className="text-base font-extrabold text-cyan-400">
                      {item.overall_scores.resume_score} / 100
                    </span>
                  </div>

                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                    item.recruiter_simulation.decision === "YES"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : item.recruiter_simulation.decision === "MAYBE"
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-rose-500/20 text-rose-300"
                  }`}>
                    {item.recruiter_simulation.decision}
                  </span>

                  <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
