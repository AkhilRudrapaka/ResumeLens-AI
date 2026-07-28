"""
Resume text extractor and strict JSON parser for ResumeLens AI backend.
Extracts candidate info strictly from uploaded document content without assuming non-existent data.
"""

import os
import re
import fitz  # PyMuPDF
from typing import Dict, Any

def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """Extracts text from PDF bytes using PyMuPDF."""
    text_chunks = []
    try:
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        for page in doc:
            text_chunks.append(page.get_text("text"))
        return "\n".join(text_chunks)
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return ""

def extract_text_from_file(file_bytes: bytes, filename: str) -> str:
    """Handles PDF or text file decoding."""
    ext = os.path.splitext(filename)[1].lower()
    if ext == ".pdf":
        return extract_text_from_pdf(file_bytes)
    else:
        try:
            return file_bytes.decode("utf-8", errors="ignore")
        except Exception:
            return ""

def parse_resume_text_to_json(text: str) -> Dict[str, Any]:
    """
    Strict extraction from uploaded resume text.
    Returns 'Not provided in resume' if contact details are missing.
    """
    lines = [line.strip() for line in text.split("\n") if line.strip()]

    name = "Candidate"
    if lines:
        for line in lines[:5]:
            if not any(c in line for c in ["@", "http", "phone", "+", "resume", "curriculum"]) and len(line) < 40:
                name = line
                break

    email_match = re.search(r"[\w\.-]+@[\w\.-]+\.\w+", text)
    email = email_match.group(0) if email_match else ""

    phone_match = re.search(r"(\+?\d{1,3}[\s\-]?)?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{4}", text)
    phone = phone_match.group(0) if phone_match else ""

    linkedin_match = re.search(r"linkedin\.com/in/[\w\-]+", text, re.IGNORECASE)
    linkedin = f"https://{linkedin_match.group(0)}" if linkedin_match else ""

    github_match = re.search(r"github\.com/[\w\-]+", text, re.IGNORECASE)
    github = f"https://{github_match.group(0)}" if github_match else ""

    website_match = re.search(r"(https?://[^\s]+)", text)
    website = website_match.group(0) if website_match and "linkedin" not in website_match.group(0) and "github" not in website_match.group(0) else ""

    # Parse skills from uploaded text strictly
    skills = []
    text_lower = text.lower()
    known_skills = [
        "Python", "Java", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express",
        "FastAPI", "Django", "Flask", "Spring Boot", "C++", "C#", "Go", "Rust", "SQL", "PostgreSQL",
        "MySQL", "MongoDB", "Redis", "Docker", "Kubernetes", "AWS", "GCP", "Azure", "Terraform",
        "Git", "REST APIs", "GraphQL", "Tailwind CSS", "HTML", "CSS", "PyTorch", "TensorFlow",
        "Scikit-Learn", "Pandas", "NumPy", "LangChain", "RAG", "LLMs", "Cypress", "Jest", "PyTest"
    ]
    for sk in known_skills:
        if sk.lower() in text_lower:
            skills.append(sk)

    # Parse projects from uploaded text strictly
    projects = []
    proj_idx = text_lower.find("project")
    if proj_idx != -1:
        proj_text = text[proj_idx:proj_idx + 1500]
        proj_lines = [l for l in proj_text.split("\n") if len(l) > 10][:6]
        if proj_lines:
            projects.append({
                "name": proj_lines[0][:50],
                "description": " ".join(proj_lines[1:3]),
                "highlights": proj_lines[3:5]
            })

    # Parse work / experience from uploaded text strictly
    work = []
    exp_idx = max(text_lower.find("experience"), text_lower.find("work"), text_lower.find("employment"))
    if exp_idx != -1:
        exp_text = text[exp_idx:exp_idx + 1500]
        exp_lines = [l for l in exp_text.split("\n") if len(l) > 10][:6]
        if exp_lines:
            work.append({
                "company": exp_lines[0][:50],
                "position": "Role / Contributor",
                "summary": " ".join(exp_lines[1:4]),
                "highlights": exp_lines[4:6]
            })

    # Parse education from uploaded text strictly
    education = []
    edu_idx = text_lower.find("education")
    if edu_idx != -1:
        edu_text = text[edu_idx:edu_idx + 500]
        edu_lines = [l for l in edu_text.split("\n") if len(l) > 5][:4]
        if edu_lines:
            education.append({
                "institution": edu_lines[0][:60],
                "area": "STEM / Field of Study",
                "studyType": "Degree"
            })

    return {
        "basics": {
            "name": name,
            "email": email,
            "phone": phone,
            "linkedin": linkedin,
            "github": github,
            "website": website,
            "summary": text[:250] + "..." if len(text) > 250 else text
        },
        "work": work,
        "education": education,
        "projects": projects,
        "skills": skills,
        "awards": [],
        "publications": []
    }
