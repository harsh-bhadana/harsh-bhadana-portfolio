"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, GraduationCap, ChevronDown, ChevronUp } from "lucide-react";

interface Achievement {
  text: string;
  metric?: string;
}

interface TimelineItem {
  id: string;
  type: "work" | "education";
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: Achievement[];
  skills: string[];
}

export default function ExperienceTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>("tcz-digital");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const timelineData: TimelineItem[] = [
    {
      id: "tcz-digital",
      type: "work",
      role: "Frontend Developer (Senior Associate – Technology)",
      company: "TCZ Digital Pvt. Ltd. (Royal Enfield Projects)",
      period: "Dec 2021 – Present",
      description: "Designed and built performance-focused frontend architectures, bidding networks, and secure APIs for Royal Enfield.",
      achievements: [
        { text: "Architected Royal Enfield internal dashboard using Next.js App Router, Redux Toolkit, and Firebase from scratch.", metric: "100% Custom Architecture" },
        { text: "Designed a secure real-time bidding network for bikes with live synchronization via Firebase.", metric: "Real-time Sync" },
        { text: "Hardened payload transmission security by establishing client-server Hash Validation protocols.", metric: "SHA-256 Payload Checks" },
        { text: "Mitigated XSS and clickjacking attacks using strict Content Security Policy (CSP) security headers.", metric: "Zero Vulnerabilities" },
        { text: "Integrated Ride Sure shared authentication SSO and customized native Google Analytics metrics.", metric: "Single Sign-On" },
      ],
      skills: ["Next.js", "React.js", "Redux Toolkit", "Firebase", "Tailwind CSS", "CSP", "Hash Validation", "Google Analytics", "REST APIs"],
    },
    {
      id: "somani",
      type: "work",
      role: "Frontend Engineer (Contract)",
      company: "Somani (Shipment Tracking Dashboard)",
      period: "2021",
      description: "Developed and optimized dashboard platforms tracking complex shipping routes and cargo metrics.",
      achievements: [
        { text: "Developed shipment tracking dashboards highlighting real-time transit telemetry and metrics.", metric: "Interactive Maps" },
        { text: "Engineered responsive data visualization modules using React and Redux.", metric: "SVG Charts" },
        { text: "Collaborated with backend services to tune API payloads, reducing endpoint response overhead.", metric: "35% Latency Reduction" },
      ],
      skills: ["React.js", "Redux", "Data Visualization", "API Optimization", "JavaScript (ES6+)", "CSS3"],
    },
    {
      id: "education",
      type: "education",
      role: "Bachelor of Commerce (B.Com)",
      company: "Delhi NCR University",
      period: "2018 – 2021",
      description: "Academic foundation focusing on finance, trade systems, and business analytics.",
      achievements: [
        { text: "Graduated with B.Com degree.", metric: "CGPA: 6.6" },
      ],
      skills: ["Analytics", "Business Systems"],
    },
  ];

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const allSkills = Array.from(
    new Set(timelineData.flatMap((item) => item.skills))
  );

  return (
    <div className="space-y-6">
      {/* Skill Filters */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono text-zinc-400 uppercase block">
          Filter timeline records by competency
        </span>
        <div className="flex flex-wrap gap-1.5">
          {allSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono border transition-all duration-200 ${
                selectedSkill === skill
                  ? "bg-indigo-50 text-indigo-600 border-indigo-200 font-semibold"
                  : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300 hover:text-zinc-800"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Tree */}
      <div className="relative border-l border-zinc-200 ml-3 md:ml-4 space-y-6">
        {timelineData
          .filter((item) => !selectedSkill || item.skills.includes(selectedSkill))
          .map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id} className="relative pl-6 md:pl-8">
                {/* Node Icon */}
                <div className={`absolute -left-3.5 top-1.5 w-7 h-7 rounded-full flex items-center justify-center border text-xs transition-colors duration-300 bg-white ${
                  isExpanded
                    ? "border-indigo-600 text-indigo-600"
                    : "border-zinc-200 text-zinc-400"
                }`}>
                  {item.type === "work" ? <Briefcase size={12} /> : <GraduationCap size={12} />}
                </div>

                {/* Timeline Box */}
                <div className={`premium-card rounded-2xl p-4 bg-white ${
                  isExpanded ? "border-zinc-350/50" : "border-zinc-200"
                }`}>
                  {/* Top Bar Header */}
                  <div
                    onClick={() => handleToggle(item.id)}
                    className="flex justify-between items-start cursor-pointer select-none"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-col md:flex-row md:items-center space-y-0.5 md:space-y-0 md:space-x-2">
                        <h3 className="text-sm font-bold text-zinc-800 tracking-wide">
                          {item.role}
                        </h3>
                        <span className="hidden md:inline text-zinc-300">|</span>
                        <span className="text-xs font-semibold text-indigo-600">
                          {item.company}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-[10px] text-zinc-400 font-mono">
                        <Calendar size={10} />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    <button className="text-zinc-400 hover:text-zinc-600 ml-2">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed font-sans">
                    {item.description}
                  </p>

                  {/* Collapsible achievements */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-zinc-100 mt-3 space-y-2">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                            Core Deliverables
                          </span>
                          <div className="space-y-2">
                            {item.achievements.map((ach, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between items-start md:items-center bg-zinc-50 p-2.5 rounded-xl border border-zinc-100"
                              >
                                <p className="text-xs text-zinc-600 pr-4 leading-relaxed font-sans">
                                  {ach.text}
                                </p>
                                {ach.metric && (
                                  <span className="text-[9px] font-mono font-bold bg-indigo-50 border border-indigo-100 text-indigo-600 px-2 py-0.5 rounded-md shrink-0">
                                    {ach.metric}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tag Badges */}
                  <div className="flex flex-wrap gap-1 mt-4">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSkill(selectedSkill === skill ? null : skill);
                        }}
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
                          selectedSkill === skill
                            ? "bg-indigo-55/20 text-indigo-650 border border-indigo-200"
                            : "bg-zinc-100 border border-zinc-200 text-zinc-500 hover:text-zinc-700"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
