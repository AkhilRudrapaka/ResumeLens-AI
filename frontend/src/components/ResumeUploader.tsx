"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, FileText, CheckCircle2, AlertCircle, FileUp, Sparkles, FileCode, Layers } from "lucide-react";

interface ResumeUploaderProps {
  onUploadFile: (file: File, jobDescription: string) => void;
  onUploadText: (text: string, jobDescription: string) => void;
  isLoading: boolean;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  onUploadFile,
  onUploadText,
  isLoading
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pasteText, setPasteText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [showJdInput, setShowJdInput] = useState(true);
  const [mode, setMode] = useState<"file" | "paste">("file");
  const [errorMsg, setErrorMsg] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (file: File) => {
    setErrorMsg("");
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("File size exceeds 10MB limit. Please upload a smaller PDF or DOCX file.");
      return;
    }
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext !== "pdf" && ext !== "docx" && ext !== "txt") {
      setErrorMsg("Unsupported file format. Please upload a .pdf or .docx file.");
      return;
    }
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleSampleResume = (type: "swe" | "ai" | "frontend") => {
    let sample = "";
    let sampleJd = "";

    if (type === "swe") {
      sample = `Alex Rivera
Email: alex.rivera@example.com | Phone: +1 555-0199 | LinkedIn: linkedin.com/in/alexrivera | GitHub: github.com/alexrivera-dev

SUMMARY
Software Engineer with experience developing REST APIs, microservices, and distributed applications using Java, Python, PostgreSQL, and Docker.

WORK EXPERIENCE
Software Engineer | CloudScale Tech
• Architected RESTful services using Python FastAPI and PostgreSQL, serving 500,000+ daily active requests.
• Reduced database query latency by 42% by implementing Redis caching layers and optimizing SQL execution plans.
• Containerized microservices using Docker and automated CI/CD deployment pipelines on AWS ECS.

PROJECTS
E-Commerce Microservices Platform (GitHub: github.com/alexrivera-dev/ecommerce-microservices)
• Engineered distributed event-driven architecture using Java Spring Boot, Kafka, and PostgreSQL.

SKILLS
Java, Python, SQL, REST APIs, FastAPI, Spring Boot, PostgreSQL, Redis, Docker, AWS, Git

EDUCATION
Bachelor of Science in Computer Science | Tech State University`;

      sampleJd = `We are hiring a Software Engineer to build scalable microservices and REST APIs.
Requirements:
- Strong proficiency in Java, Python, and SQL database design.
- Hands-on experience with FastAPI, Spring Boot, and PostgreSQL.
- Experience with Docker, Redis caching, AWS cloud deployment, and Git version control.
- Knowledge of microservices architecture and unit testing.`;
    } else if (type === "ai") {
      sample = `Sophia Chen
Email: sophia.chen@ai-domain.org | GitHub: github.com/sophiachen-ml

SUMMARY
AI Engineer specializing in Large Language Models (LLMs), RAG systems, PyTorch, and Vector Databases.

EXPERIENCE
AI & ML Engineer | Neural Cognitive Systems
• Built multimodal RAG pipeline using Python, LangChain, PyTorch, and ChromaDB.
• Fine-tuned Llama-3 checkpoints with LoRA adapter tuning for domain-specific medical Q&A.
• Deployed low-latency vLLM inference server on AWS EC2 GPU instances with Docker.

SKILLS
Python, PyTorch, LangChain, LlamaIndex, Vector DBs (Chroma/Pinecone), RAG, Prompt Engineering, Docker, FastAPI`;

      sampleJd = `Looking for an AI Engineer to lead LLM application development.
Required:
- Deep experience in Python, PyTorch, and HuggingFace Transformers.
- Proven expertise building RAG pipelines with LangChain and Vector Databases (Chroma / Qdrant).
- Experience with Docker, FastAPI model serving, and GPU optimization.`;
    } else {
      sample = `Jordan Miller
Email: jordan.miller@frontend-dev.io | GitHub: github.com/jordan-m

SUMMARY
Frontend Developer with 3 years building web applications using React, Next.js, TypeScript, and Tailwind CSS.

EXPERIENCE
Frontend Developer | Pixel Craft Studio
• Developed Next.js Web Portal using TypeScript, Tailwind CSS, and Framer Motion.
• Integrated Redux Toolkit state management and REST APIs.

SKILLS
React, Next.js, TypeScript, HTML5, CSS3, Tailwind CSS, Redux, REST APIs, Git`;

      sampleJd = `Senior Frontend Developer wanted.
Requirements:
- 3+ years experience with React, Next.js, TypeScript, and Tailwind CSS.
- Strong state management expertise (Redux / Zustand).
- Experience optimizing web performance, REST API integration, and Jest unit testing.`;
    }

    setPasteText(sample);
    setJobDescription(sampleJd);
    setMode("paste");
  };

  const handleStartAnalysis = () => {
    if (mode === "file" && selectedFile) {
      onUploadFile(selectedFile, jobDescription);
    } else if (mode === "paste" && pasteText.trim().length > 30) {
      onUploadText(pasteText, jobDescription);
    } else {
      setErrorMsg("Please upload a file or paste your resume text.");
    }
  };

  return (
    <div id="uploader" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <UploadCloud className="h-5 w-5 text-cyan-400" />
            Upload Resume & Target Job Description
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Accepts PDF and DOCX formats up to 10MB. Analyzes uploaded text strictly against target Job Description.
          </p>
        </div>

        <div className="flex items-center rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setMode("file")}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              mode === "file" ? "bg-cyan-500 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            PDF / DOCX File
          </button>
          <button
            onClick={() => setMode("paste")}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              mode === "paste" ? "bg-cyan-500 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            Paste Text / Samples
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="flex items-center space-x-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs font-medium text-rose-300">
          <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Target Job Description Area */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-cyan-400" />
            Target Job Description (Required for 100% Accurate ATS Matching):
          </label>
          <span className="text-[10px] text-slate-400 font-medium">
            Paste target job posting requirements
          </span>
        </div>
        <textarea
          rows={3}
          placeholder="Paste Job Description here (e.g. Required skills: Java, Python, SQL, Docker, AWS, microservices, 3+ years experience)..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:outline-none custom-scrollbar"
        />
      </div>

      {mode === "file" ? (
        <div>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`group cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
              dragActive
                ? "border-cyan-400 bg-cyan-500/10"
                : selectedFile
                ? "border-emerald-500/50 bg-emerald-500/5"
                : "border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900/60"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              className="hidden"
            />

            {selectedFile ? (
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-3">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <p className="text-base font-bold text-white">{selectedFile.name}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for strict document parsing
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                  className="mt-3 text-xs font-semibold text-cyan-400 hover:underline"
                >
                  Change file
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3 group-hover:scale-110 transition-transform">
                  <FileUp className="h-7 w-7" />
                </div>
                <p className="text-base font-bold text-white">
                  Drag and drop your resume file here
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Supports PDF and DOCX files up to 10MB
                </p>
                <span className="mt-4 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 group-hover:border-slate-700">
                  Browse File
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              Paste Resume Plain Text:
            </label>
            <textarea
              rows={7}
              placeholder="Paste raw text from your resume here..."
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs font-mono text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none custom-scrollbar"
            />
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-2">
              Or load candidate resume & job description samples:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSampleResume("swe")}
                className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:bg-slate-900"
              >
                Sample Software Engineer (Resume + JD)
              </button>
              <button
                type="button"
                onClick={() => handleSampleResume("ai")}
                className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:bg-slate-900"
              >
                Sample AI Engineer (Resume + JD)
              </button>
              <button
                type="button"
                onClick={() => handleSampleResume("frontend")}
                className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:bg-slate-900"
              >
                Sample Frontend Dev (Resume + JD)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Start Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleStartAnalysis}
          disabled={isLoading || (mode === "file" && !selectedFile) || (mode === "paste" && !pasteText.trim())}
          className="inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none transition-all"
        >
          <Sparkles className="h-4 w-4 fill-slate-950" />
          <span>{isLoading ? "Analyzing Uploaded Resume..." : "Run Accurate ATS & Recruiter Screening"}</span>
        </button>
      </div>
    </div>
  );
};
