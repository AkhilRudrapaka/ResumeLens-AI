"use client";

import React from "react";
import { Sparkles, BarChart2, History, Shield, Zap, RefreshCw } from "lucide-react";

interface NavbarProps {
  onOpenHistory: () => void;
  onOpenAdmin: () => void;
  onOpenCompare: () => void;
  onReset: () => void;
  hasResult: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHistory,
  onOpenAdmin,
  onOpenCompare,
  onReset,
  hasResult
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div 
          onClick={onReset}
          className="flex cursor-pointer items-center space-x-3 group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold tracking-tight text-white">
                ResumeLens <span className="text-cyan-400">AI</span>
              </span>
              <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-400 border border-cyan-500/20">
                PRO 2.5
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Know Your Resume Before Recruiters Do.
            </p>
          </div>
        </div>

        {/* Navigation & Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {hasResult && (
            <button
              onClick={onReset}
              className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:bg-slate-800 transition-all"
            >
              <RefreshCw className="h-3.5 w-3.5 text-cyan-400" />
              <span className="hidden sm:inline">New Analysis</span>
            </button>
          )}

          <button
            onClick={onOpenCompare}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:bg-slate-800 transition-all"
          >
            <BarChart2 className="h-3.5 w-3.5 text-purple-400" />
            <span>Compare (A/B)</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:bg-slate-800 transition-all"
          >
            <History className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">History</span>
          </button>

          <button
            onClick={onOpenAdmin}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:bg-slate-800 transition-all"
          >
            <Shield className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden md:inline">Admin</span>
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

          <a
            href="#uploader"
            className="flex items-center space-x-1 rounded-lg bg-cyan-500 px-3.5 py-1.5 text-xs font-semibold text-slate-950 shadow-md shadow-cyan-500/20 hover:bg-cyan-400 transition-all"
          >
            <Zap className="h-3.5 w-3.5 fill-slate-950" />
            <span>Analyze Resume</span>
          </a>
        </div>

      </div>
    </header>
  );
};
