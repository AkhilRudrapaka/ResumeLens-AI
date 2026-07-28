export interface RoleProfile {
  title: string;
  category: string;
  required_skills: string[];
  preferred_skills: string[];
  nice_to_have: string[];
  expected_projects: string[];
  expected_experience_level: string;
  expected_technologies: string[];
  ats_keywords: string[];
}

export interface CandidateInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  summary: string;
  work_count: number;
  education_count: number;
  projects_count: number;
  skills_count: number;
  certifications_eval: {
    score: number;
    evidence: string[];
  };
}

export interface OverallScores {
  resume_score: number;
  role_match_score: number;
  ats_compatibility_score: number;
  recruiter_confidence_score: number;
  interview_readiness_score: number;
  estimated_shortlist_probability: number;
  disclaimer: string;
}

export interface RecruiterSimulation {
  decision: "YES" | "MAYBE" | "NO";
  badge: string;
  recruiter_confidence: number;
  first_impression: string;
  key_highlights: string[];
  red_flags: string[];
}

export interface RoleMatchAnalysis {
  score: number;
  role: string;
  matching_skills: string[];
  missing_skills: string[];
  required_matched: number;
  required_total: number;
  preferred_matched: number;
  preferred_total: number;
  reason: string;
  evidence: string[];
}

export interface AtsAnalysis {
  score: number;
  issues: string[];
  fix_suggestions: string[];
  reason: string;
  evidence: string[];
  jd_keyword_coverage?: number;
  jd_keywords_found?: string[];
  jd_keywords_missing?: string[];
}

export interface CategoryScoreItem {
  score: number;
  reason: string;
  evidence: string[];
  [key: string]: any;
}

export interface CategoryScores {
  technical_skills: CategoryScoreItem;
  projects: CategoryScoreItem;
  experience: CategoryScoreItem;
  ats_compatibility: AtsAnalysis;
  role_match: RoleMatchAnalysis;
  resume_quality: CategoryScoreItem;
  achievements: CategoryScoreItem;
  education: CategoryScoreItem;
  certifications: CategoryScoreItem;
}

export interface DetailedProject {
  name: string;
  description: string;
  innovation: number;
  complexity: number;
  architecture: number;
  real_world_impact: number;
  deployment: number;
  documentation: number;
  scalability: number;
  testing: number;
  code_quality: number;
  score: number;
}

export interface InterviewQuestion {
  id: number;
  type: string;
  question: string;
  hint: string;
}

export interface InterviewReadiness {
  interview_readiness_score: number;
  top_strengths: string[];
  weaknesses_to_address: string[];
  coding_topics: string[];
  questions: InterviewQuestion[];
}

export interface ImprovementRecommendation {
  id: string;
  title: string;
  action: string;
  est_score_boost: number;
  est_role_match_boost: number;
  est_shortlist_boost: number;
  impact_level: "HIGH" | "MEDIUM" | "LOW";
  category: string;
}

export interface EvaluatorLog {
  step: number;
  name: string;
  status: "PENDING" | "RUNNING" | "COMPLETED";
}

export interface EvaluationReport {
  target_role: string;
  job_description?: string;
  role_profile: RoleProfile;
  candidate_info: CandidateInfo;
  overall_scores: OverallScores;
  recruiter_simulation: RecruiterSimulation;
  role_match: RoleMatchAnalysis;
  ats_analysis: AtsAnalysis;
  category_scores: CategoryScores;
  project_analysis: DetailedProject[];
  interview_readiness: InterviewReadiness;
  improvement_recommendations: ImprovementRecommendation[];
  evaluator_logs: EvaluatorLog[];
  filename?: string;
  timestamp?: number;
}
