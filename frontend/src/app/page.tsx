"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { RoleSelector } from "@/components/RoleSelector";
import { ResumeUploader } from "@/components/ResumeUploader";
import { AnalysisProgress } from "@/components/AnalysisProgress";

import { PrimaryMetrics } from "@/components/Dashboard/PrimaryMetrics";
import { RecruiterSimulationCard } from "@/components/Dashboard/RecruiterSimulationCard";
import { RoleMatchAnalysis } from "@/components/Dashboard/RoleMatchAnalysis";
import { AtsAnalysisCard } from "@/components/Dashboard/AtsAnalysisCard";
import { CategoryBreakdown } from "@/components/Dashboard/CategoryBreakdown";
import { ProjectAnalysisCard } from "@/components/Dashboard/ProjectAnalysisCard";
import { InterviewReadinessCard } from "@/components/Dashboard/InterviewReadinessCard";
import { ImprovementEngineCard } from "@/components/Dashboard/ImprovementEngineCard";

import { ResumeComparer } from "@/components/ResumeComparer";
import { UserHistoryModal } from "@/components/UserHistoryModal";
import { AdminDashboardModal } from "@/components/AdminDashboardModal";

import { evaluateResumeClient } from "@/utils/mockEvaluator";
import { API_BASE_URL } from "@/utils/api";
import { EvaluationReport } from "@/types";
import { Download, FileJson, FileText, Printer, ArrowLeft, Sparkles, RefreshCw } from "lucide-react";

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<string>("Software Engineer");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [report, setReport] = useState<EvaluationReport | null>(null);

  const [history, setHistory] = useState<EvaluationReport[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);

  // Trigger evaluation pipeline with target role & Job Description
  const runAnalysis = async (text: string, jobDescription: string, file?: File) => {
    setIsAnalyzing(true);

    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("target_role", selectedRole);
        formData.append("job_description", jobDescription || "");

        const res = await fetch(`${API_BASE_URL}/api/evaluate`, {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          setReport(data);
          setHistory((prev) => [data, ...prev]);
          return;
        }
      }
    } catch (err) {
      console.log("Backend offline, running strict client evaluator fallback.");
    }

    // Client fallback evaluation with Job Description
    const clientReport = evaluateResumeClient(text, selectedRole, jobDescription);
    if (file) clientReport.filename = file.name;
    
    setReport(clientReport);
    setHistory((prev) => [clientReport, ...prev]);
  };

  const handleUploadFile = async (file: File, jobDescription: string) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string || file.name;
      runAnalysis(text, jobDescription, file);
    };
    reader.readAsText(file);
  };

  const handleUploadText = (text: string, jobDescription: string) => {
    runAnalysis(text, jobDescription);
  };

  // Export handlers
  const exportJSON = () => {
    if (!report) return;
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ResumeLens_${report.candidate_info.name || "Candidate"}_Report.json`;
    a.click();
  };

  const exportMarkdown = () => {
    if (!report) return;
    const md = `# ResumeLens AI Screening Report
Candidate: ${report.candidate_info.name || "Candidate"}
Target Role: ${report.target_role}
Resume Score: ${report.overall_scores.resume_score} / 100
Role Match: ${report.overall_scores.role_match_score}%
ATS Score: ${report.overall_scores.ats_compatibility_score}%
Recruiter Shortlist Decision: ${report.recruiter_simulation.decision} (${report.recruiter_simulation.badge})

## Recruiter First Impression
"${report.recruiter_simulation.first_impression}"

## Key Screening Highlights
${report.recruiter_simulation.key_highlights.map((h) => `- ${h}`).join("\n")}

## Tailored 20 Interview Questions
${report.interview_readiness.questions.map((q) => `### Q${q.id} (${q.type}): ${q.question}\n*Hint: ${q.hint}*\n`).join("\n")}
`;

    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ResumeLens_${report.candidate_info.name || "Candidate"}_Report.md`;
    a.click();
  };

  const exportPrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Navbar
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onReset={() => setReport(null)}
        hasResult={!!report}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* State 1: Landing Page & Input Form */}
        {!isAnalyzing && !report && (
          <div className="space-y-12">
            <HeroSection onStart={() => {
              const uploader = document.getElementById("uploader");
              uploader?.scrollIntoView({ behavior: "smooth" });
            }} />

            <div className="space-y-8 max-w-5xl mx-auto">
              <RoleSelector
                selectedRole={selectedRole}
                onSelectRole={setSelectedRole}
              />

              <ResumeUploader
                onUploadFile={handleUploadFile}
                onUploadText={handleUploadText}
                isLoading={isAnalyzing}
              />
            </div>
          </div>
        )}

        {/* State 2: Analysis Pipeline Running Stepper */}
        {isAnalyzing && (
          <AnalysisProgress
            onComplete={() => setIsAnalyzing(false)}
          />
        )}

        {/* State 3: Interactive Dashboard View */}
        {!isAnalyzing && report && (
          <div className="mt-8 space-y-8">
            
            {/* Top Dashboard Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md">
              <button
                onClick={() => setReport(null)}
                className="flex items-center space-x-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:bg-slate-900 transition-all"
              >
                <ArrowLeft className="h-4 w-4 text-cyan-400" />
                <span>Evaluate Another Role / Resume</span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={exportPrint}
                  className="flex items-center space-x-1.5 rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:bg-slate-900 transition-all"
                >
                  <Printer className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Print PDF</span>
                </button>

                <button
                  onClick={exportMarkdown}
                  className="flex items-center space-x-1.5 rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:bg-slate-900 transition-all"
                >
                  <FileText className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Export Markdown</span>
                </button>

                <button
                  onClick={exportJSON}
                  className="flex items-center space-x-1.5 rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:bg-slate-900 transition-all"
                >
                  <FileJson className="h-3.5 w-3.5 text-purple-400" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>

            {/* 1. Primary Metrics Gauges */}
            <PrimaryMetrics report={report} />

            {/* 2. Recruiter Simulation Card */}
            <RecruiterSimulationCard
              simulation={report.recruiter_simulation}
              targetRole={report.target_role}
            />

            {/* 3. Role Match Analysis */}
            <RoleMatchAnalysis roleMatch={report.role_match} />

            {/* 4. ATS Readability & JD Match Audit */}
            <AtsAnalysisCard ats={report.ats_analysis} />

            {/* 5. 9 Weighted Categories Breakdown */}
            <CategoryBreakdown categories={report.category_scores} />

            {/* 6. In-depth Project Architecture Evaluation */}
            <ProjectAnalysisCard projects={report.project_analysis} />

            {/* 7. Interview Readiness & 20 Tailored Questions */}
            <InterviewReadinessCard readiness={report.interview_readiness} />

            {/* 8. Actionable Measurable Improvement Engine */}
            <ImprovementEngineCard
              recommendations={report.improvement_recommendations}
              baseScore={report.overall_scores.resume_score}
            />
          </div>
        )}

      </main>

      {/* Modals */}
      <ResumeComparer
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        targetRole={selectedRole}
      />

      <UserHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectReport={(rep) => setReport(rep)}
        onClearHistory={() => setHistory([])}
      />

      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

    </div>
  );
}
