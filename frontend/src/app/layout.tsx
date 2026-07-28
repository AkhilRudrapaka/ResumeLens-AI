import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ResumeLens AI — Know Your Resume Before Recruiters Do",
  description: "AI-Powered Recruiter & ATS Resume Evaluation Platform. Screen your resume against 24+ tech hiring benchmarks with 15 evaluators, recruiter simulation, and interview readiness.",
  keywords: ["Resume Evaluator", "ATS Checker", "AI Recruiter", "Resume Score", "Interview Preparation", "Software Engineer Resume"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
