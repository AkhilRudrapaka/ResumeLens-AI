"use client";

import React from "react";

interface GaugeChartProps {
  score: number;
  label: string;
  sublabel?: string;
  size?: number;
  strokeWidth?: number;
  color?: "cyan" | "emerald" | "purple" | "amber" | "rose";
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  score,
  label,
  sublabel,
  size = 140,
  strokeWidth = 10,
  color = "cyan"
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const colorMap = {
    cyan: { stroke: "#06b6d4", text: "text-cyan-400", bg: "stroke-cyan-950/40" },
    emerald: { stroke: "#10b981", text: "text-emerald-400", bg: "stroke-emerald-950/40" },
    purple: { stroke: "#a855f7", text: "text-purple-400", bg: "stroke-purple-950/40" },
    amber: { stroke: "#f59e0b", text: "text-amber-400", bg: "stroke-amber-950/40" },
    rose: { stroke: "#f43f5e", text: "text-rose-400", bg: "stroke-rose-950/40" },
  };

  const selectedColor = colorMap[color];

  return (
    <div className="flex flex-col items-center justify-center p-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="stroke-slate-800"
            fill="transparent"
          />
          {/* Animated score arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={selectedColor.stroke}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center text score */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${selectedColor.text}`}>
            {score}
            <span className="text-xs font-semibold text-slate-400">%</span>
          </span>
          {sublabel && (
            <span className="text-[10px] text-slate-400 font-medium mt-0.5">
              {sublabel}
            </span>
          )}
        </div>
      </div>

      <span className="mt-2 text-xs font-semibold text-slate-300 text-center tracking-wide">
        {label}
      </span>
    </div>
  );
};
