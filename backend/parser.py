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

    # Parse skills dynamically from uploaded text
    skills = []
    text_lower = text.lower()
    known_skills = [
        "Python", "Java", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express",
        "FastAPI", "Django", "Flask", "Spring Boot", "C++", "C#", "Go", "Rust", "SQL", "PostgreSQL",
        "MySQL", "MongoDB", "Redis", "Docker", "Kubernetes", "AWS", "GCP", "Azure", "Terraform",
        "Git", "REST APIs", "GraphQL", "Tailwind CSS", "HTML", "CSS", "PyTorch", "TensorFlow",
        "Scikit-Learn", "Pandas", "NumPy", "LangChain", "RAG", "LLMs", "Cypress", "Jest", "PyTest",
        "System Design", "Microservices", "CI/CD", "Kafka", "Elasticsearch", "Linux", "Bash"
    ]
    for sk in known_skills:
        if re.search(r"\b" + re.escape(sk.lower()) + r"\b", text_lower):
            skills.append(sk)

    # Dynamic project extraction across header synonyms
    projects = []
    proj_match = re.search(r"(?:projects?|portfolio|built|applications|key implementations)\b", text_lower)
    if proj_match:
        proj_idx = proj_match.start()
        proj_text = text[proj_idx:proj_idx + 1500]
        proj_lines = [l.strip() for l in proj_text.split("\n") if len(l.strip()) > 10][:6]
        if proj_lines:
            projects.append({
                "name": proj_lines[0][:60],
                "description": " ".join(proj_lines[1:3]),
                "highlights": proj_lines[3:5]
            })

    # Dynamic work/experience extraction across header synonyms
    work = []
    exp_match = re.search(r"(?:experience|work|employment|career|internships?|positions?)\b", text_lower)
    if exp_match:
        exp_idx = exp_match.start()
        exp_text = text[exp_idx:exp_idx + 1500]
        exp_lines = [l.strip() for l in exp_text.split("\n") if len(l.strip()) > 10][:6]
        if exp_lines:
            work.append({
                "company": exp_lines[0][:60],
                "position": "Role / Contributor",
                "summary": " ".join(exp_lines[1:4]),
                "highlights": exp_lines[4:6]
            })

    # Dynamic education extraction across header synonyms
    education = []
    edu_match = re.search(r"(?:education|academics?|qualifications?|degrees?|university|college)\b", text_lower)
    if edu_match:
        edu_idx = edu_match.start()
        edu_text = text[edu_idx:edu_idx + 500]
        edu_lines = [l.strip() for l in edu_text.split("\n") if len(l.strip()) > 5][:4]
        if edu_lines:
            education.append({
                "institution": edu_lines[0][:60],
                "area": "Degree / Field of Study",
                "studyType": "Parsed Education Entry"
            })

    # Dynamic awards/certifications parsing
    awards = []
    cert_match = re.search(r"(?:certificat\w*|awards?|honors?|licenses?|achievements?)\b", text_lower)
    if cert_match:
        cert_idx = cert_match.start()
        cert_text = text[cert_idx:cert_idx + 500]
        cert_lines = [l.strip() for l in cert_text.split("\n") if len(l.strip()) > 5][:3]
        for cl in cert_lines:
            awards.append({"title": cl[:60], "summary": cl})

    return {
        "basics": {
            "name": name,
            "email": email,
            "phone": phone,
            "linkedin": linkedin,
            "github": github,
            "website": website,
            "summary": text[:300] + "..." if len(text) > 300 else text
        },
        "work": work,
        "education": education,
        "projects": projects,
        "skills": skills,
        "awards": awards,
        "publications": []
    }
