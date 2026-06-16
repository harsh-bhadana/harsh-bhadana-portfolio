"use client";

import React from "react";
import { ShieldCheck, Zap, Award } from "lucide-react";

export default function ProfileSummary() {
  const highlights = [
    {
      icon: <Award className="text-primary" size={16} />,
      title: "4+ Years",
      desc: "Professional experience",
    },
    {
      icon: <ShieldCheck className="text-secondary" size={16} />,
      title: "Data Security",
      desc: "CSP & Hash Validation",
    },
    {
      icon: <Zap className="text-amber-600" size={16} />,
      title: "High Performance",
      desc: "API & UI Optimization",
    },
  ];

  const skillCategories = [
    {
      title: "Frameworks & State",
      skills: ["Next.js (App Router, Server Actions)", "React.js", "Redux Toolkit", "Context API"],
    },
    {
      title: "Languages & Styling",
      skills: [
        "TypeScript",
        "JavaScript (ES6+)",
        "Tailwind CSS",
        "Responsive Design",
        "Accessibility (WCAG)",
      ],
    },
    {
      title: "Security & Cloud",
      skills: [
        "Firebase (Auth, Realtime DB, Cloud Functions)",
        "REST APIs",
        "CSP Headers",
        "Hash Validation",
      ],
    },
    {
      title: "Performance & Tools",
      skills: [
        "Core Web Vitals",
        "Code Splitting",
        "Lazy Loading",
        "Git/GitHub",
        "Vercel",
        "Google Analytics",
      ],
    },
  ];

  return (
    <div className="premium-card rounded-2xl p-6 border border-zinc-200 bg-white space-y-6">
      {/* Intro */}
      <div className="space-y-3">
        <h3 className="text-sm font-mono uppercase text-zinc-400 tracking-wider">
          Professional Profile
        </h3>
        <p className="text-sm text-zinc-600 leading-relaxed font-sans">
          Frontend Developer specializing in building high-performance dashboards, responsive web
          architectures, and secure client-side applications. Committed to clean code, modular
          design, and robust code standardization to deliver maintainable, highly accessible, and
          pixel-perfect digital experiences.
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {highlights.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-3 p-3 bg-zinc-50 rounded-xl border border-zinc-100"
          >
            <div className="p-2 bg-white rounded-lg border border-zinc-200 shrink-0">
              {item.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-800">{item.title}</p>
              <p className="text-[10px] text-zinc-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-mono uppercase text-zinc-400 tracking-wider">
          Skills Inventory
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="space-y-2">
              <span className="text-xs font-bold text-zinc-800 block">{cat.title}</span>
              <div className="flex flex-wrap gap-1">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-mono bg-zinc-100/60 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-950 px-2 py-1 rounded-md border border-zinc-200/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
