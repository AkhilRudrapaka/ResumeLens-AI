"""
Comprehensive 15-Evaluator Pipeline for ResumeLens AI.
Evaluates uploaded resume text strictly against target role hiring profiles and user-provided Job Descriptions.
"""

import re
import math
from typing import Dict, List, Any
from backend.roles_db import get_role_profile

class ResumeEvaluatorPipeline:
    def __init__(self, resume_text: str, parsed_json: Dict[str, Any], target_role: str, job_description: str = ""):
        self.raw_text = resume_text or ""
        self.parsed = parsed_json or {}
        self.role_name = target_role or "Software Engineer"
        self.job_description = job_description or ""
        self.role_profile = get_role_profile(self.role_name)

    def extract_jd_keywords(self) -> List[str]:
        """
        Extracts subject-oriented domain and technical keywords from Job Description.
        Filters out generic filler/boilerplate words (e.g. 'about', 'company', 'looking', 'hire', 'its', 'are').
        Prioritizes technical skills, tools, frameworks, engineering domains, and role-specific subject terms.
        """
        if not self.job_description or len(self.job_description.strip()) < 10:
            return self.role_profile.get("ats_keywords", [])

        jd_text = self.job_description
        jd_lower = jd_text.lower()

        # Stopwords & generic JD boilerplate terms to strictly filter out
        stopwords = {
            "about", "above", "across", "after", "again", "against", "all", "almost", "alone", "along", "already",
            "also", "although", "always", "among", "an", "and", "another", "any", "anybody", "anyone", "anything",
            "anywhere", "are", "area", "around", "as", "at", "be", "because", "been", "before", "being", "below",
            "between", "both", "but", "by", "can", "cannot", "could", "did", "do", "does", "doing", "done", "down",
            "during", "each", "either", "else", "every", "everybody", "everyone", "everything", "everywhere", "few",
            "for", "from", "further", "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him",
            "himself", "his", "how", "i", "if", "in", "into", "is", "it", "its", "itself", "just", "know", "like",
            "make", "many", "may", "me", "might", "more", "most", "much", "must", "my", "myself", "no", "nor", "not",
            "now", "of", "off", "on", "once", "one", "only", "or", "other", "our", "ours", "ourselves", "out", "over",
            "own", "same", "she", "should", "so", "some", "somebody", "someone", "something", "somewhere", "still",
            "such", "than", "that", "the", "their", "theirs", "them", "themselves", "then", "there", "these", "they",
            "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "we", "well", "were",
            "what", "when", "where", "which", "while", "who", "whom", "whose", "why", "will", "with", "within",
            "without", "would", "you", "your", "yours", "yourself", "yourselves",
            # HR / JD Boilerplate Words
            "job", "jobs", "description", "details", "role", "roles", "position", "positions", "title", "company",
            "companies", "organization", "firm", "inc", "ltd", "corp", "llc", "global", "national", "international",
            "product-based", "service-based", "startup", "center", "centre", "office", "headquarters", "location",
            "located", "city", "country", "region", "team", "teams", "department", "unit", "group", "work", "working",
            "workplace", "environment", "culture", "fast-paced", "growing", "looking", "look", "hire", "hiring",
            "hired", "seek", "seeking", "seeks", "search", "searching", "join", "joining", "bring", "brings", "help",
            "helps", "building", "deliver", "delivering", "opportunity", "opportunities", "candidate", "candidates",
            "applicant", "applicants", "individual", "individuals", "person", "people", "talented", "talent",
            "passionate", "motivated", "driven", "dynamic", "ideal", "successful", "experienced",
            "years", "year", "month", "months", "full-time", "part-time", "contract", "remote", "hybrid", "onsite",
            "relocation", "salary", "pay", "compensation", "benefits", "perks", "equal", "employer", "employment",
            "responsibilities", "responsibility", "requirements", "requirement", "qualification", "qualifications",
            "preferred", "preference", "plus", "need", "needed", "needs", "ability", "abilities", "able",
            "skill", "skills", "knowledge", "understanding", "strong", "great", "good", "excellent", "proven",
            "track", "record", "background", "experience", "experiences", "expert", "expertise", "proficient",
            "proficiency", "familiar", "familiarity", "hands-on", "daily", "day-to-day", "task", "tasks", "duty",
            "duties", "summary", "overview", "us", "offer", "offers",
            # Locations / Cities
            "chennai", "bangalore", "bengaluru", "hyderabad", "mumbai", "pune", "delhi", "noida", "gurgaon", "gurugram",
            "kolkata", "ahmedabad", "san", "francisco", "york", "london", "singapore", "berlin", "austin", "seattle",
            "india", "usa", "uk", "canada", "germany"
        }

        extracted: List[str] = []

        # 1. Match known technical terms & multi-word subject phrases from role profile & tech dictionary
        known_subjects = set()
        for sk in (
            self.role_profile.get("required_skills", []) +
            self.role_profile.get("preferred_skills", []) +
            self.role_profile.get("ats_keywords", []) +
            self.role_profile.get("expected_technologies", [])
        ):
            known_subjects.add(sk.lower())

        common_tech = [
            "python", "java", "javascript", "typescript", "c++", "c#", "go", "golang", "rust", "ruby", "php", "swift", "kotlin",
            "react", "react.js", "next.js", "node.js", "express", "fastapi", "django", "flask", "spring boot", "angular", "vue",
            "sql", "postgresql", "mysql", "mongodb", "redis", "elasticsearch", "docker", "kubernetes", "aws", "azure", "gcp",
            "git", "ci/cd", "terraform", "graphql", "rest api", "restful api", "rest", "microservices", "system design",
            "data structures", "algorithms", "unit testing", "integration testing", "automation", "devops", "cloud",
            "machine learning", "deep learning", "ai", "llm", "rag", "natural language processing", "nlp", "computer vision",
            "data pipeline", "etl", "spark", "hadoop", "airflow", "kafka", "full stack", "frontend", "backend", "security",
            "concurrency", "async", "scalability", "architecture", "engineering", "agile", "scrum", "oop", "object-oriented"
        ]
        for t in common_tech:
            known_subjects.add(t.lower())

        for subject in known_subjects:
            pattern = r"\b" + re.escape(subject) + r"\b"
            if re.search(pattern, jd_lower):
                match = re.search(pattern, jd_text, re.IGNORECASE)
                val = match.group(0) if match else subject
                if val.lower() not in [x.lower() for x in extracted]:
                    extracted.append(val)

        # 2. Extract remaining single-word technical/subject tokens that are not generic stopwords
        words = re.findall(r"\b[A-Za-z0-9\.#\+-]{3,20}\b", jd_text)
        for w in words:
            w_clean = w.strip()
            if w_clean.lower() not in stopwords and len(w_clean) >= 3:
                if w_clean.lower() not in [x.lower() for x in extracted]:
                    extracted.append(w_clean)

        # Fallback to role profile keywords if JD provides very few subject terms
        if len(extracted) < 5:
            for fallback_kw in self.role_profile.get("ats_keywords", []):
                if fallback_kw.lower() not in [x.lower() for x in extracted]:
                    extracted.append(fallback_kw)

        # 3. Deduplicate redundant sub-phrases (e.g. if 'REST APIs' is present, skip standalone 'REST' or 'APIs')
        final_extracted: List[str] = []
        extracted_sorted = sorted(extracted, key=lambda x: len(x), reverse=True)
        for term in extracted_sorted:
            term_lower = term.lower()
            if any(term_lower != existing.lower() and term_lower in existing.lower() for existing in final_extracted):
                continue
            final_extracted.append(term)

        return final_extracted[:15]

    def run_all_evaluators(self) -> Dict[str, Any]:
        """Runs evaluators 1 through 15 and returns structured complete report."""
        parser_res = self.eval_1_parser()
        role_match_res = self.eval_2_role_matching()
        ats_res = self.eval_3_ats_compatibility()
        tech_res = self.eval_4_technical_skills()
        proj_res = self.eval_5_projects()
        exp_res = self.eval_6_experience()
        ach_res = self.eval_7_achievements()
        edu_res = self.eval_8_education()
        gram_res = self.eval_9_grammar_tone()
        fmt_res = self.eval_10_formatting()
        kw_res = self.eval_11_keyword_coverage()
        rec_res = self.eval_12_recruiter_simulation(role_match_res, tech_res, exp_res)
        int_res = self.eval_13_interview_readiness(tech_res, proj_res)
        imp_res = self.eval_14_improvement_engine(role_match_res, ats_res, tech_res, proj_res)
        
        final_agg = self.eval_15_score_aggregator(
            tech_res, proj_res, exp_res, ats_res, role_match_res,
            fmt_res, ach_res, edu_res, kw_res, rec_res, int_res
        )

        return {
            "target_role": self.role_name,
            "job_description": self.job_description,
            "role_profile": self.role_profile,
            "candidate_info": parser_res,
            "overall_scores": final_agg,
            "recruiter_simulation": rec_res,
            "role_match": role_match_res,
            "ats_analysis": ats_res,
            "category_scores": {
                "technical_skills": tech_res,
                "projects": proj_res,
                "experience": exp_res,
                "ats_compatibility": ats_res,
                "role_match": role_match_res,
                "resume_quality": fmt_res,
                "achievements": ach_res,
                "education": edu_res,
                "certifications": parser_res.get("certifications_eval", {"score": 75, "evidence": []})
            },
            "project_analysis": proj_res.get("detailed_projects", []),
            "interview_readiness": int_res,
            "improvement_recommendations": imp_res,
            "evaluator_logs": [
                {"step": 1, "name": "Resume Parser", "status": "COMPLETED"},
                {"step": 2, "name": "Role Matching", "status": "COMPLETED"},
                {"step": 3, "name": "ATS Compatibility (JD & Document Grounded)", "status": "COMPLETED"},
                {"step": 4, "name": "Technical Skills Evaluator", "status": "COMPLETED"},
                {"step": 5, "name": "Projects Evaluator", "status": "COMPLETED"},
                {"step": 6, "name": "Experience Evaluator", "status": "COMPLETED"},
                {"step": 7, "name": "Achievements Evaluator", "status": "COMPLETED"},
                {"step": 8, "name": "Education Evaluator", "status": "COMPLETED"},
                {"step": 9, "name": "Grammar & Tone Evaluator", "status": "COMPLETED"},
                {"step": 10, "name": "Resume Formatting Evaluator", "status": "COMPLETED"},
                {"step": 11, "name": "Keyword Coverage Index", "status": "COMPLETED"},
                {"step": 12, "name": "Recruiter Simulation", "status": "COMPLETED"},
                {"step": 13, "name": "Interview Readiness", "status": "COMPLETED"},
                {"step": 14, "name": "Improvement Engine", "status": "COMPLETED"},
                {"step": 15, "name": "Final Score Aggregator", "status": "COMPLETED"}
            ]
        }

    # Evaluator 1: Resume Parser
    def eval_1_parser(self) -> Dict[str, Any]:
        basics = self.parsed.get("basics", {})
        work = self.parsed.get("work", [])
        education = self.parsed.get("education", [])
        projects = self.parsed.get("projects", [])
        skills = self.parsed.get("skills", [])
        awards = self.parsed.get("awards", [])

        # Extract GitHub handle strictly if present in raw text
        github_url = basics.get("github") or ""
        if not github_url and "github.com/" in self.raw_text.lower():
            match = re.search(r"github\.com/([a-zA-Z0-9_-]+)", self.raw_text, re.IGNORECASE)
            if match:
                github_url = f"https://github.com/{match.group(1)}"

        cert_count = len(awards)
        cert_score = min(100, 60 + (cert_count * 20))

        return {
            "name": basics.get("name") or "Candidate",
            "email": basics.get("email") or "Not provided in resume",
            "phone": basics.get("phone") or "Not provided in resume",
            "linkedin": basics.get("linkedin") or "Not provided in resume",
            "github": github_url or "Not provided in resume",
            "portfolio": basics.get("website") or "Not provided in resume",
            "summary": basics.get("summary") or "",
            "work_count": len(work),
            "education_count": len(education),
            "projects_count": len(projects),
            "skills_count": len(skills),
            "certifications_eval": {
                "score": cert_score,
                "evidence": [f"{cert_count} awards/certifications found in uploaded text."] if cert_count > 0 else ["No explicit certifications/awards found in uploaded document."]
            }
        }

    # Evaluator 2: Role Matching
    def eval_2_role_matching(self) -> Dict[str, Any]:
        required = self.role_profile["required_skills"]
        preferred = self.role_profile["preferred_skills"]

        text_lower = self.raw_text.lower()
        matched_req = []
        missing_req = []
        matched_pref = []
        missing_pref = []

        for req in required:
            req_clean = req.lower()
            if req_clean in text_lower or any(token in text_lower for token in req_clean.split() if len(token) > 3):
                matched_req.append(req)
            else:
                missing_req.append(req)

        for pref in preferred:
            pref_clean = pref.lower()
            if pref_clean in text_lower or any(token in text_lower for token in pref_clean.split() if len(token) > 3):
                matched_pref.append(pref)
            else:
                missing_pref.append(pref)

        req_score = (len(matched_req) / max(1, len(required))) * 70
        pref_score = (len(matched_pref) / max(1, len(preferred))) * 30
        match_percentage = min(100, round(req_score + pref_score))

        return {
            "score": match_percentage,
            "role": self.role_name,
            "matching_skills": matched_req + matched_pref,
            "missing_skills": missing_req + missing_pref,
            "required_matched": len(matched_req),
            "required_total": len(required),
            "preferred_matched": len(matched_pref),
            "preferred_total": len(preferred),
            "reason": f"Matches {len(matched_req)}/{len(required)} required and {len(matched_pref)}/{len(preferred)} preferred skills for {self.role_name}.",
            "evidence": [f"Matched core skills: {', '.join(matched_req[:5])}"] if matched_req else ["Missing core required role skills."]
        }

    # Evaluator 3: ATS Compatibility (Strictly Grounded on Uploaded Document & Job Description)
    def eval_3_ats_compatibility(self) -> Dict[str, Any]:
        issues = []
        fixes = []
        score = 90

        text_len = len(self.raw_text)
        if text_len < 300:
            score -= 20
            issues.append("Resume length is under 300 words. Too brief for standard ATS parsing.")
            fixes.append("Add detailed work achievements, technical stack, and project descriptions.")

        # Check contact info strictly from parsed text
        basics = self.parsed.get("basics", {})
        if not basics.get("email"):
            score -= 10
            issues.append("Email address missing or unrecognized in uploaded resume.")
            fixes.append("Place email address clearly near top header.")
        if not basics.get("phone"):
            score -= 5
            issues.append("Phone number missing or unrecognized in uploaded resume.")
            fixes.append("Include phone number in standard format (e.g. +1 555-0199).")

        # Check section headings in uploaded text
        text_lower = self.raw_text.lower()
        has_edu = "education" in text_lower
        has_exp = "experience" in text_lower or "work" in text_lower or "employment" in text_lower
        has_proj = "project" in text_lower
        has_skills = "skill" in text_lower

        missing_sections = []
        if not has_edu: missing_sections.append("Education")
        if not has_exp: missing_sections.append("Experience")
        if not has_proj: missing_sections.append("Projects")
        if not has_skills: missing_sections.append("Skills")

        if missing_sections:
            score -= (len(missing_sections) * 5)
            issues.append(f"Standard section headings missing in document: {', '.join(missing_sections)}.")
            fixes.append("Use standard headings: Education, Work Experience, Projects, Skills.")

        # Evaluate Job Description Keyword Matching if JD provided
        jd_keywords = self.extract_jd_keywords()
        jd_found = []
        jd_missing = []

        for kw in jd_keywords:
            if kw.lower() in text_lower:
                jd_found.append(kw)
            else:
                jd_missing.append(kw)

        jd_coverage_pct = round((len(jd_found) / max(1, len(jd_keywords))) * 100)

        # Factor JD match into ATS score if Job Description is provided
        if self.job_description:
            score = round((score * 0.5) + (jd_coverage_pct * 0.5))
            if jd_missing:
                issues.append(f"Missing {len(jd_missing)} key terms from provided Job Description: {', '.join(jd_missing[:4])}.")
                fixes.append(f"Incorporate missing Job Description keywords: {', '.join(jd_missing[:3])}.")

        score = max(35, min(100, score))

        return {
            "score": score,
            "issues": issues if issues else ["No major ATS parse blocks found in document."],
            "fix_suggestions": fixes if fixes else ["Formatting and document structure are ATS compliant."],
            "reason": f"Evaluated machine extractability of uploaded document{' against target Job Description' if self.job_description else ''}.",
            "evidence": [
                f"Extracted word count: {len(self.raw_text.split())} words.",
                f"Target JD Keyword Match: {len(jd_found)} / {len(jd_keywords)} ({jd_coverage_pct}%)"
            ],
            "jd_keyword_coverage": jd_coverage_pct,
            "jd_keywords_found": jd_found,
            "jd_keywords_missing": jd_missing
        }

    # Evaluator 4: Technical Skills
    def eval_4_technical_skills(self) -> Dict[str, Any]:
        role_profile = self.role_profile
        required = set(s.lower() for s in role_profile["required_skills"])
        preferred = set(s.lower() for s in role_profile["preferred_skills"])
        
        parsed_skills = self.parsed.get("skills", [])
        all_skills_extracted = set()
        for sk in parsed_skills:
            if isinstance(sk, dict):
                name = sk.get("name", "")
                all_skills_extracted.add(name.lower())
            elif isinstance(sk, str):
                all_skills_extracted.add(sk.lower())

        text_lower = self.raw_text.lower()

        core_matched = [s for s in role_profile["required_skills"] if s.lower() in all_skills_extracted or s.lower() in text_lower]
        pref_matched = [s for s in role_profile["preferred_skills"] if s.lower() in all_skills_extracted or s.lower() in text_lower]

        req_coverage = len(core_matched) / max(1, len(required))
        pref_coverage = len(pref_matched) / max(1, len(preferred))

        raw_score = (req_coverage * 70) + (pref_coverage * 30)
        score = round(min(100, max(30, raw_score)))

        return {
            "score": score,
            "core_skills_found": core_matched,
            "preferred_skills_found": pref_matched,
            "total_extracted_skills": len(core_matched) + len(pref_matched),
            "reason": f"Demonstrates {len(core_matched)} core and {len(pref_matched)} preferred technical stack skills.",
            "evidence": [f"Extracted stack includes: {', '.join(core_matched[:6])}"] if core_matched else ["Limited alignment with role required stack."]
        }

    # Evaluator 5: Projects
    def eval_5_projects(self) -> Dict[str, Any]:
        projects = self.parsed.get("projects", [])
        detailed_projects = []

        if not projects:
            total_score = 30 if any(w in self.raw_text.lower() for w in ["built", "application", "implemented", "developed", "portfolio"]) else 0
        else:
            for p in projects:
                name = p.get("name") if isinstance(p, dict) else str(p)
                desc = p.get("description", "") if isinstance(p, dict) else ""
                highlights = p.get("highlights", []) if isinstance(p, dict) else []
                combined = (desc + " " + " ".join(highlights)).lower()

                inn = 80 if any(w in combined for w in ["ai", "rag", "distributed", "real-time", "microservices", "custom"]) else 70
                comp = 85 if any(w in combined for w in ["scalable", "latency", "async", "concurrency", "optimization"]) else 72
                arch = 80 if any(w in combined for w in ["architecture", "pipeline", "schema", "api", "rest"]) else 68
                imp = 82 if any(r"\d+%" in h for h in highlights) or any(w in combined for w in ["increased", "reduced", "improved", "users"]) else 65
                dep = 85 if any(w in combined for w in ["docker", "aws", "vercel", "kubernetes", "deployed", "live"]) else 55
                doc = 75 if "github" in combined or "readme" in combined else 65
                scal = 80 if any(w in combined for w in ["cache", "redis", "sharding", "load", "throughput"]) else 65
                test = 75 if any(w in combined for w in ["test", "jest", "pytest", "cypress"]) else 55
                cq = 78

                proj_avg = round((inn + comp + arch + imp + dep + doc + scal + test + cq) / 9)

                detailed_projects.append({
                    "name": name,
                    "description": desc or "Project extracted directly from uploaded resume.",
                    "innovation": inn,
                    "complexity": comp,
                    "architecture": arch,
                    "real_world_impact": imp,
                    "deployment": dep,
                    "documentation": doc,
                    "scalability": scal,
                    "testing": test,
                    "code_quality": cq,
                    "score": proj_avg
                })

            total_score = round(sum(p["score"] for p in detailed_projects) / len(detailed_projects))

        return {
            "score": min(100, max(35, total_score)),
            "detailed_projects": detailed_projects,
            "project_count": len(detailed_projects),
            "reason": f"Evaluated {len(detailed_projects)} projects extracted from uploaded document.",
            "evidence": [f"Top Project: '{detailed_projects[0]['name']}' scored {detailed_projects[0]['score']}/100."] if detailed_projects else ["No distinct projects identified in document."]
        }

    # Evaluator 6: Experience
    def eval_6_experience(self) -> Dict[str, Any]:
        work = self.parsed.get("work", [])
        text_lower = self.raw_text.lower()

        has_internship = "intern" in text_lower or "internship" in text_lower
        has_fulltime = len(work) > 0 and not has_internship
        has_leadership = any(w in text_lower for w in ["lead", "managed", "mentored", "head", "founder", "president"])
        has_opensource = any(w in text_lower for w in ["open-source", "open source", "contributor", "github", "pull request"])

        base_score = 60
        if len(work) > 0:
            base_score += min(25, len(work) * 8)
        if has_fulltime:
            base_score += 10
        if has_internship:
            base_score += 5
        if has_leadership:
            base_score += 5
        if has_opensource:
            base_score += 5

        final_score = min(100, base_score)

        return {
            "score": final_score,
            "roles_found": len(work),
            "has_internship": has_internship,
            "has_leadership": has_leadership,
            "has_open_source": has_opensource,
            "reason": f"Found {len(work)} experience entries in uploaded document with leadership and technical signals.",
            "evidence": [f"{'Relevant experience listed in uploaded text.' if len(work) > 0 else 'Limited formal work history listed.'}"]
        }

    # Evaluator 7: Achievements
    def eval_7_achievements(self) -> Dict[str, Any]:
        text = self.raw_text
        metrics_matches = re.findall(r"(\d+%\s*|\$\d+|\d+\+?\s*(users|requests|downloads|stars|reduction|improvement|ms|seconds))", text, re.IGNORECASE)
        hackathons = re.findall(r"(hackathon|1st place|winner|top \d+|runner up|finalist)", text, re.IGNORECASE)
        
        quant_count = len(metrics_matches)
        hackathon_count = len(hackathons)

        score = 50 + min(35, quant_count * 10) + min(15, hackathon_count * 7)
        score = min(100, score)

        return {
            "score": score,
            "quantifiable_metrics_count": quant_count,
            "hackathons_count": hackathon_count,
            "reason": f"Detected {quant_count} metric-driven impact figures in uploaded text.",
            "evidence": [f"Quantified metrics found: {quant_count} data points extracted."] if quant_count > 0 else ["Lacks metric-driven impact numbers (e.g. '%', '$', 'X users')."]
        }

    # Evaluator 8: Education
    def eval_8_education(self) -> Dict[str, Any]:
        edu = self.parsed.get("education", [])
        text_lower = self.raw_text.lower()

        has_cs = any(w in text_lower for w in ["computer science", "software engineering", "data science", "information technology", "b.tech", "b.s.", "m.s.", "bachelor", "master"])
        gpa_match = re.search(r"gpa\s*:?\s*([0-9\.]+)", text_lower)

        score = 75
        if edu:
            score += 10
        if has_cs:
            score += 10
        if gpa_match:
            score += 5

        score = min(100, score)

        return {
            "score": score,
            "has_degree": len(edu) > 0 or has_cs,
            "is_relevant_field": has_cs,
            "gpa": gpa_match.group(1) if gpa_match else "Not specified in document",
            "reason": "STEM/Computer Science academic background parsed from uploaded text.",
            "evidence": [f"Degree field relevant: {has_cs}"]
        }

    # Evaluator 9: Grammar & Tone
    def eval_9_grammar_tone(self) -> Dict[str, Any]:
        action_verbs = ["built", "developed", "architected", "optimized", "spearheaded", "designed", "implemented", "reduced", "scaled", "automated", "created"]
        text_lower = self.raw_text.lower()

        verb_count = sum(1 for v in action_verbs if v in text_lower)
        score = min(100, 70 + (verb_count * 3))

        return {
            "score": score,
            "action_verbs_used": verb_count,
            "tone": "Professional & Action-Oriented" if verb_count > 5 else "Needs More Strong Action Verbs",
            "reason": f"Uses {verb_count} strong action verbs in uploaded text.",
            "evidence": [f"Action verb density: {verb_count} strong verbs present."]
        }

    # Evaluator 10: Resume Formatting
    def eval_10_formatting(self) -> Dict[str, Any]:
        word_count = len(self.raw_text.split())
        
        if 400 <= word_count <= 900:
            score = 92
        elif 300 <= word_count < 400 or 900 < word_count <= 1200:
            score = 82
        else:
            score = 68

        return {
            "score": score,
            "word_count": word_count,
            "estimated_pages": 1 if word_count <= 700 else 2,
            "visual_density": "Optimal" if score >= 85 else "Suboptimal length",
            "reason": f"Document word count is {word_count} words.",
            "evidence": [f"Word count: {word_count}"]
        }

    # Evaluator 11: Keyword Coverage Index
    def eval_11_keyword_coverage(self) -> Dict[str, Any]:
        keywords = self.extract_jd_keywords()
        text_lower = self.raw_text.lower()

        found = [kw for kw in keywords if kw.lower() in text_lower]
        missing = [kw for kw in keywords if kw.lower() not in text_lower]

        coverage_pct = round((len(found) / max(1, len(keywords))) * 100)

        return {
            "score": coverage_pct,
            "coverage_percentage": coverage_pct,
            "found_keywords": found,
            "missing_keywords": missing,
            "reason": f"Matches {len(found)} out of {len(keywords)} key domain terms{' from Job Description' if self.job_description else ''}.",
            "evidence": [f"Matched keywords: {', '.join(found[:5])}"] if found else ["Missing primary domain keywords."]
        }

    # Evaluator 12: Recruiter Simulation
    def eval_12_recruiter_simulation(self, role_match: Dict[str, Any], tech: Dict[str, Any], exp: Dict[str, Any]) -> Dict[str, Any]:
        match_score = role_match["score"]
        tech_score = tech["score"]
        
        avg_signal = (match_score + tech_score) / 2

        if avg_signal >= 80:
            decision = "YES"
            badge = "Strong Shortlist Candidate"
            impression = f"Strong profile for {self.role_name}. Candidate displays solid core competencies and relevant project work extracted from resume."
        elif avg_signal >= 65:
            decision = "MAYBE"
            badge = "Borderline - Under Review"
            impression = f"Decent candidate for {self.role_name}, but has noticeable skill or project gaps relative to target benchmark."
        else:
            decision = "NO"
            badge = "Likely Filtered Out"
            impression = f"Resume currently lacks required skills or project depth for {self.role_name} based on uploaded text."

        confidence = round(min(98, max(50, avg_signal + 5)))

        return {
            "decision": decision,
            "badge": badge,
            "recruiter_confidence": confidence,
            "first_impression": impression,
            "key_highlights": [
                f"Matched {role_match.get('required_matched', 0)} core role requirements.",
                f"Technical stack score: {tech_score}/100.",
                f"Document text extractability verified."
            ],
            "red_flags": [f"Missing skills: {', '.join(role_match.get('missing_skills', [])[:3])}"] if role_match.get("missing_skills") else ["No severe red flags detected."]
        }

    # Evaluator 13: Interview Readiness
    def eval_13_interview_readiness(self, tech: Dict[str, Any], proj: Dict[str, Any]) -> Dict[str, Any]:
        tech_score = tech["score"]
        readiness_score = round(min(95, max(45, tech_score * 0.95)))

        questions = [
            {"id": 1, "type": "Coding & Tech", "question": f"How would you optimize an API or data pipeline using {self.role_profile['required_skills'][0]}?", "hint": "Focus on indexing, caching, asynchronous execution, and time complexity."},
            {"id": 2, "type": "Coding & Tech", "question": f"Explain your approach to error handling and validation in {self.role_profile['required_skills'][1] if len(self.role_profile['required_skills']) > 1 else 'REST APIs'}.", "hint": "Discuss try/catch, global middleware, schema validation, and HTTP status codes."},
            {"id": 3, "type": "Coding & Tech", "question": "What strategies do you use for database index optimization and query debugging?", "hint": "Mention EXPLAIN ANALYZE, composite indexes, B-Trees, and avoiding N+1 queries."},
            {"id": 4, "type": "Coding & Tech", "question": "Explain the difference between synchronous and asynchronous execution in your primary stack.", "hint": "Discuss event loops, thread pools, async/await, and non-blocking I/O."},
            {"id": 5, "type": "Coding & Tech", "question": "How do you secure RESTful endpoints against unauthorized access?", "hint": "Discuss JWT tokens, OAuth2, RBAC, HTTPS, and rate limiting."},
            {"id": 6, "type": "Coding & Tech", "question": "Walk me through how memory management works in your preferred language.", "hint": "Cover heap vs stack, garbage collection, ARC, or pointers."},
            {"id": 7, "type": "Coding & Tech", "question": "How do you design a thread-safe cache or in-memory data store?", "hint": "Discuss Mutex/Locks, LRU eviction policy, Redis key expiry, and atomic operations."},
            {"id": 8, "type": "Coding & Tech", "question": "What is the difference between SQL relational normalization and NoSQL document storage?", "hint": "Contrast ACID compliance, join operations, schema flexibility, and horizontal scaling."},
            {"id": 9, "type": "Project & System Architecture", "question": "Walk me through the architecture of your main featured project.", "hint": "Highlight frontend, backend services, database schema, caching, and hosting deployment."},
            {"id": 10, "type": "Project & System Architecture", "question": "How would you scale your project to handle 100x traffic volume?", "hint": "Discuss load balancing, horizontal pod autoscaling, database read replicas, and CDN caching."},
            {"id": 11, "type": "Project & System Architecture", "question": "What trade-offs did you make when selecting your tech stack and database?", "hint": "Discuss developer velocity vs raw execution speed, relational consistency vs document flexibility."},
            {"id": 12, "type": "Project & System Architecture", "question": "How do you handle background jobs and queue failures in production?", "hint": "Mention dead-letter queues, retry exponential backoff, Celery/BullMQ, and idempotency keys."},
            {"id": 13, "type": "Project & System Architecture", "question": "How do you implement CI/CD automated testing before deploying code?", "hint": "Discuss GitHub Actions, linting, unit tests, integration tests, and staging environments."},
            {"id": 14, "type": "Project & System Architecture", "question": "Explain how you monitor application health and log unexpected exceptions.", "hint": "Mention Sentry, Prometheus/Grafana, structured JSON logging, and alert triggers."},
            {"id": 15, "type": "Behavioral", "question": "Describe a technical disagreement you had with a teammate and how you resolved it.", "hint": "Use STAR method: State technical context, your proposal, objective benchmarks, and final consensus."},
            {"id": 16, "type": "Behavioral", "question": "Tell me about a time when a project deadline was tight and how you prioritized tasks.", "hint": "Highlight MVP scope pruning, clear communication, and delivering core value first."},
            {"id": 17, "type": "Behavioral", "question": "Describe a production bug or unexpected system outage you fixed under pressure.", "hint": "Explain RCA (Root Cause Analysis), rollback strategy, hotfix, and post-mortem prevention."},
            {"id": 18, "type": "Behavioral", "question": "How do you stay up to date with rapidly evolving frameworks and tools?", "hint": "Mention open source repos, tech blogs, personal experiments, and engineering newsletters."},
            {"id": 19, "type": "Behavioral", "question": "Give an example of how you took ownership of a complex feature from start to finish.", "hint": "Detail requirements clarification, design doc writing, coding, testing, and deployment monitoring."},
            {"id": 20, "type": "Behavioral", "question": "How do you give constructive feedback during code reviews?", "hint": "Focus on code quality, readability, security, and explaining the 'why' respectfully."}
        ]

        return {
            "interview_readiness_score": readiness_score,
            "top_strengths": [
                f"Technical alignment in {self.role_profile['required_skills'][0]}.",
                "Clean ATS formatting parsed from document.",
                "Demonstrates engineering project structure."
            ],
            "weaknesses_to_address": [
                f"Needs explicit evidence of {self.role_profile['preferred_skills'][0] if self.role_profile['preferred_skills'] else 'System Architecture'}.",
                "Include more quantified impact numbers."
            ],
            "coding_topics": [
                "Data Structures & Algorithmic Complexity",
                "API Design & Exception Middleware",
                "Database Indexing & Query Tuning",
                "Asynchronous I/O & Concurrency"
            ],
            "questions": questions
        }

    # Evaluator 14: Improvement Engine
    def eval_14_improvement_engine(self, role_match: Dict[str, Any], ats: Dict[str, Any], tech: Dict[str, Any], proj: Dict[str, Any]) -> List[Dict[str, Any]]:
        suggestions = []
        
        missing = role_match.get("missing_skills", [])
        if missing:
            top_missing = missing[:2]
            suggestions.append({
                "id": "add_missing_skills",
                "title": f"Add {', '.join(top_missing)} to Skills & Projects",
                "action": f"Incorporate hands-on experience or coursework with {', '.join(top_missing)}.",
                "est_score_boost": 3,
                "est_role_match_boost": 5,
                "est_shortlist_boost": 4,
                "impact_level": "HIGH",
                "category": "Skills"
            })

        suggestions.append({
            "id": "add_docker_deployment",
            "title": "Add Containerization & Cloud Deployment",
            "action": "Mention Docker, Vercel/Railway deployment links, or CI/CD pipelines in your projects.",
            "est_score_boost": 2,
            "est_role_match_boost": 3,
            "est_shortlist_boost": 4,
            "impact_level": "HIGH",
            "category": "Projects"
        })

        suggestions.append({
            "id": "quantify_impact_metrics",
            "title": "Quantify Project & Experience Impact",
            "action": "Rephrase bullet points to include percentages or latency numbers (e.g. 'Reduced loading time by 35%').",
            "est_score_boost": 2,
            "est_role_match_boost": 2,
            "est_shortlist_boost": 3,
            "impact_level": "MEDIUM",
            "category": "Impact"
        })

        if ats.get("score", 100) < 90:
            suggestions.append({
                "id": "standardize_ats_headers",
                "title": "Optimize ATS Section Headings",
                "action": "Use clean, standard headings: Education, Experience, Projects, Technical Skills.",
                "est_score_boost": 1,
                "est_role_match_boost": 2,
                "est_shortlist_boost": 2,
                "impact_level": "MEDIUM",
                "category": "ATS"
            })

        return suggestions

    # Evaluator 15: Final Score Aggregator
    def eval_15_score_aggregator(
        self, tech: Dict[str, Any], proj: Dict[str, Any], exp: Dict[str, Any],
        ats: Dict[str, Any], role_match: Dict[str, Any], quality: Dict[str, Any],
        ach: Dict[str, Any], edu: Dict[str, Any], kw: Dict[str, Any],
        rec: Dict[str, Any], int_read: Dict[str, Any]
    ) -> Dict[str, Any]:
        tech_w = tech["score"] * 0.25
        proj_w = proj["score"] * 0.20
        exp_w = exp["score"] * 0.20
        ats_w = ats["score"] * 0.10
        role_w = role_match["score"] * 0.10
        qual_w = quality["score"] * 0.05
        ach_w = ach["score"] * 0.05
        edu_w = edu["score"] * 0.03
        cert_w = 75 * 0.02

        final_resume_score = round(tech_w + proj_w + exp_w + ats_w + role_w + qual_w + ach_w + edu_w + cert_w)
        final_resume_score = min(100, max(30, final_resume_score))

        role_match_pct = role_match["score"]
        ats_pct = ats["score"]
        recruiter_conf = rec["recruiter_confidence"]
        interview_readiness_pct = int_read["interview_readiness_score"]

        shortlist_prob = round((final_resume_score * 0.4) + (role_match_pct * 0.3) + (ats_pct * 0.2) + (recruiter_conf * 0.1))
        shortlist_prob = min(96, max(35, shortlist_prob))

        return {
            "resume_score": final_resume_score,
            "role_match_score": role_match_pct,
            "ats_compatibility_score": ats_pct,
            "recruiter_confidence_score": recruiter_conf,
            "interview_readiness_score": interview_readiness_pct,
            "estimated_shortlist_probability": shortlist_prob,
            "disclaimer": "Estimated probability of passing initial ATS and recruiter screening based strictly on uploaded document content. Not a guaranteed outcome."
        }
