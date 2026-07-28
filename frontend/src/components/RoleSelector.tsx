"use client";

import React, { useState } from "react";
import { ROLES_LIST, RoleItem } from "@/data/rolesData";
import { Search, Briefcase, Check, Sparkles } from "lucide-react";

interface RoleSelectorProps {
  selectedRole: string;
  onSelectRole: (roleTitle: string) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  selectedRole,
  onSelectRole,
}) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Core Engineering", "Web & UI", "AI & Data", "Infrastructure", "Mobile", "Quality & Testing", "Product & Business", "Design"];

  const filteredRoles = ROLES_LIST.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.profile.required_skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedRoleItem = ROLES_LIST.find(r => r.id === selectedRole) || ROLES_LIST[0];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Select Target Job Role</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Choose the position you are targeting. AI evaluates your resume against this role's hiring benchmark.
          </p>
        </div>

        {/* Selected Role Badge */}
        <div className="flex items-center space-x-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 text-xs font-bold text-cyan-300">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <span>Active Target: {selectedRoleItem.title}</span>
        </div>
      </div>

      {/* Search Bar & Category Chips */}
      <div className="mt-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search 24+ job roles or required skills (e.g. Java, AI Engineer, React)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Roles Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
        {filteredRoles.map((role: RoleItem) => {
          const isSelected = selectedRole === role.id;
          return (
            <div
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className={`group cursor-pointer rounded-xl border p-4 transition-all ${
                isSelected
                  ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                  : "border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/80"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`text-sm font-bold transition-colors ${isSelected ? "text-cyan-300" : "text-white group-hover:text-cyan-300"}`}>
                    {role.title}
                  </h3>
                  <span className="text-[10px] font-medium text-slate-400">
                    {role.category} • {role.expected_experience}
                  </span>
                </div>
                {isSelected && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-slate-950">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Skills Tags Preview */}
              <div className="mt-3 flex flex-wrap gap-1">
                {role.profile.required_skills.slice(0, 3).map((sk) => (
                  <span
                    key={sk}
                    className="rounded-md bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-slate-300 border border-slate-800"
                  >
                    {sk}
                  </span>
                ))}
                {role.profile.required_skills.length > 3 && (
                  <span className="text-[10px] text-slate-500 font-medium self-center pl-1">
                    +{role.profile.required_skills.length - 3} more
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
