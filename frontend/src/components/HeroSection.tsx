"use client";

import React from "react";
import { Sparkles, ShieldCheck, Target, Award, ArrowRight, Activity, CheckCircle2 } from "lucide-react";

interface HeroSectionProps {
  onStart: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden py-12 sm:py-20 lg:py-24">
      {/* Glow background gradient accents */}
      <div className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-purple-500/10 blur-3xl opacity-70" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Announcement Pill */}
        <div className="flex justify-center">
          <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 shadow-sm backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span>AI Recruiter & ATS Simulation Engine 2.5</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">15 Evaluators</span>
          </div>
        </div>

        {/* Main Headline & Subtitle */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Resume Screening Like <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              Top Tech Companies
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Upload your resume, select your dream role, and discover how recruiter hiring committees and ATS algorithms evaluate your candidate profile before you apply.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStart}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-cyan-400 px-8 py-4 text-base font-bold text-slate-950 shadow-xl shadow-cyan-500/25 hover:bg-cyan-300 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Analyze My Resume Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <a
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-slate-800 bg-slate-900/80 px-6 py-4 text-base font-semibold text-slate-300 hover:border-slate-700 hover:bg-slate-800 transition-all"
            >
              <span>View Methodology & 15 Evaluators</span>
            </a>
          </div>

          {/* Key Metric Counters */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 pt-8 border-t border-slate-800/80 max-w-3xl mx-auto">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">24+</div>
              <div className="text-xs text-slate-400 font-medium">Hiring Profiles</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">15</div>
              <div className="text-xs text-slate-400 font-medium">AI Evaluators</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">100%</div>
              <div className="text-xs text-slate-400 font-medium">Explainable Evidence</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">&lt; 5s</div>
              <div className="text-xs text-slate-400 font-medium">Analysis Speed</div>
            </div>
          </div>

        </div>

        {/* Feature Grid */}
        <div id="features" className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md hover:border-slate-700 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">ATS Parsing & Formatting</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Detect section ordering issues, missing contact attributes, unreadable tables/columns, bullet formatting, and keyword density.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md hover:border-slate-700 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Role Knowledge Benchmark</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Compares your resume against internal tech profiles (Required skills, Preferred stack, Expected projects, and Experience levels).
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md hover:border-slate-700 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Recruiter Simulation & Shortlist</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Get an honest Recruiter First Impression, Shortlist Decision (YES/MAYBE/NO), Recruiter Confidence rating, and 20 Tailored Interview Questions.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
