"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Beaker, Camera, ChevronDown, ChevronUp } from "lucide-react";

interface Specimen {
  name: string;
  description: string;
  badge: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  status: "Live Specimen Lab" | "Production" | "Beta" | "Experimental";
  deployUrl: string;
  githubUrl: string;
  techStack: string[];
  features: Specimen[];
  iconType: "beaker" | "camera";
  launchLabel: string;
  featuresLabel: string;
}

const GithubIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const statusColors: Record<Project["status"], string> = {
  "Live Specimen Lab": "bg-emerald-50 border-emerald-100 text-emerald-600",
  Production: "bg-indigo-50 border-indigo-100 text-indigo-600",
  Beta: "bg-amber-50 border-amber-100 text-amber-600",
  Experimental: "bg-rose-50 border-rose-100 text-rose-600",
};

export default function ProjectsCatalog() {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>("next-labs");

  const projectsData: Project[] = [
    {
      id: "next-labs",
      title: "NextJS Labs",
      description:
        "A high-performance laboratory for experimental Next.js 15/16 and React 19 specimens. This project isolates advanced architectural patterns, concurrent rendering APIs, and server-side optimization techniques.",
      status: "Live Specimen Lab",
      deployUrl: "https://next-labs-one.vercel.app/",
      githubUrl: "https://github.com/harsh-bhadana/next-labs",
      techStack: [
        "Next.js 16",
        "React 19",
        "React Compiler",
        "Tailwind CSS",
        "Framer Motion",
        "Edge Runtime",
      ],
      features: [
        {
          name: "Optimistic Kanban Board",
          description:
            "Zero-latency drag-and-drop task reordering using React 19's useOptimistic hook with instant rollback triggers on server-side transaction failures.",
          badge: "useOptimistic",
        },
        {
          name: "Concurrent Priority Scheduler",
          description:
            "Visualizes CPU main thread scheduling. Defers low-priority rendering via useTransition to keep animations locked at 60fps under heavy filters.",
          badge: "useTransition",
        },
        {
          name: "Streaming checkout Wizard",
          description:
            "A 4-step progressive wizard eliminating local useState completely by orchestrating useFormStatus and useActionState server hooks.",
          badge: "useActionState",
        },
        {
          name: "Hybrid Rendering (PPR) Dashboard",
          description:
            "Combines instant static page loading with dynamic streamed React Server Component (RSC) chunks as data promises resolve.",
          badge: "PPR / Streaming",
        },
        {
          name: "Granular Directive Caching",
          description:
            'Explores Next.js\'s experimental "use cache" directive to apply granular component-level and fetch-level cache duration profiles.',
          badge: "use cache",
        },
      ],
      iconType: "beaker",
      launchLabel: "Launch Lab",
      featuresLabel: "Experimental Specimens (Live in Lab)",
    },
    {
      id: "clicks",
      title: "Clicks — Photography Showcase",
      description:
        "A minimal, immersive, and premium photography gallery designed to showcase personal photography through a horizontal interactive grid slider. Built with a 'content-first' philosophy, high-performance animations, fluid slide transitions, and a sophisticated dark aesthetic.",
      status: "Production",
      deployUrl: "https://clicks-nine.vercel.app/",
      githubUrl: "https://github.com/harsh-bhadana/clicks",
      techStack: [
        "Next.js 16",
        "React 19",
        "Tailwind CSS v4",
        "Framer Motion v12",
        "Vercel Blob",
        "Exifr",
      ],
      features: [
        {
          name: "Toroidal Slide Grid",
          description:
            "A widescreen 4x3 grid that shifts rows, columns, or diagonals every 4 seconds in a seamless toroidal loop.",
          badge: "Toroidal Loop",
        },
        {
          name: "Diagonal Morphing",
          description:
            "Diagonal movements temporarily morph grid cells into circles and scale them down to 0.707 of their size to slide collision-free.",
          badge: "Diagonal Shift",
        },
        {
          name: "Pulsating Ambient Glows",
          description:
            "Colorful background glows (Purple/Blue, Emerald/Teal, Rose/Amber) that expand and brighten during active shifts and fade out completely when idle.",
          badge: "Framer Motion",
        },
        {
          name: "Immersive Full-Screen Lightbox",
          description:
            "A minimal photo overlay stripped of metadata clutter, featuring full-screen imagery, keyboard/navigation controls, and custom interactive cursor support.",
          badge: "Lightbox / UX",
        },
      ],
      iconType: "camera",
      launchLabel: "Launch Gallery",
      featuresLabel: "Key Showcase Features",
    },
    {
      id: "whatnow",
      title: "WhatNow — Content Recommendation",
      description:
        "A personalized content recommendation platform that helps users discover new movies, TV shows, and anime tailored to their precise moods utilizing AI-driven generation and a unified watch history.",
      status: "Beta",
      deployUrl: "https://whatnow-swart.vercel.app/",
      githubUrl: "https://github.com/harsh-bhadana/whatnow",
      techStack: [
        "Next.js 16",
        "React 19",
        "Gemini SDK (WIP)",
        "Tailwind CSS v4",
        "Framer Motion",
        "MongoDB",
        "NextAuth",
        "Zustand",
      ],
      features: [
        {
          name: "AI-Driven Recommendations (WIP)",
          description:
            "Work in progress: Integration of the Gemini 2.0 Flash model to generate hyper-personalized media recommendations based on watch history and current vibe.",
          badge: "WIP / Gemini 2.0",
        },
        {
          name: "Server-Rendered Performance",
          description:
            "Key pages like History and Watchlist use Next.js Server Components for instant loading and zero layout shift.",
          badge: "RSC",
        },
        {
          name: "Unified Experience",
          description:
            "Seamless single-user architecture where all watch history and watchlists are securely synced with NextAuth and MongoDB.",
          badge: "Auth & DB",
        },
        {
          name: "Modern Interface",
          description:
            "A sleek, animated experience providing an immersive UI utilizing Tailwind CSS v4 and Framer Motion.",
          badge: "Framer Motion",
        },
      ],
      iconType: "beaker",
      launchLabel: "Launch App",
      featuresLabel: "Platform Features",
    },
  ];

  const handleToggleExpand = (id: string) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
          Featured Engineering Projects
        </h2>
        <span className="text-[10px] font-mono text-zinc-350">Scale: Extensible Framework</span>
      </div>

      <div className="space-y-4">
        {projectsData.map((project) => {
          const isExpanded = expandedProjectId === project.id;

          return (
            <div
              key={project.id}
              className={`premium-card rounded-2xl border bg-white overflow-hidden transition-all duration-300 ${
                isExpanded ? "border-zinc-350/50 shadow-sm" : "border-zinc-200"
              }`}
            >
              {/* Project Header */}
              <div
                onClick={() => handleToggleExpand(project.id)}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2.5">
                    <div
                      className={`p-2 rounded-xl border shrink-0 ${
                        project.iconType === "camera"
                          ? "bg-indigo-50 text-indigo-650 border-indigo-100"
                          : "bg-emerald-50 text-emerald-600 border-emerald-100"
                      }`}
                    >
                      {project.iconType === "camera" ? (
                        <Camera size={18} className="animate-pulse" />
                      ) : (
                        <Beaker size={18} className="animate-pulse" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base font-bold text-zinc-900 tracking-tight">
                          {project.title}
                        </h3>
                        <span
                          className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${statusColors[project.status]}`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-zinc-455 mt-0.5">
                        {project.deployUrl.replace("https://", "")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3">
                  {/* Action Links */}
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={project.deployUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-mono font-bold px-3 py-1.5 rounded-xl transition-all shadow-sm shadow-indigo-100 hover:shadow-md"
                    >
                      <span>{project.launchLabel}</span>
                      <ExternalLink size={10} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center space-x-1.5 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-655 hover:text-zinc-900 text-[10px] font-mono px-3 py-1.5 rounded-xl transition-all"
                    >
                      <GithubIcon size={10} />
                      <span>Source</span>
                    </a>
                  </div>

                  <button className="text-zinc-400 hover:text-zinc-600 p-1.5 rounded-lg border border-zinc-100 bg-zinc-50/50">
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>

              {/* Collapsible Content */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-t border-zinc-100 bg-zinc-50/20"
                  >
                    <div className="p-5 space-y-4">
                      {/* Description */}
                      <p className="text-xs text-zinc-655 leading-relaxed max-w-3xl font-sans">
                        {project.description}
                      </p>

                      {/* Specs/Features Grid */}
                      <div className="space-y-2.5">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                          {project.featuresLabel}
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {project.features.map((feat, idx) => (
                            <div
                              key={idx}
                              className="bg-white p-3.5 rounded-xl border border-zinc-200/60 shadow-sm hover:border-zinc-300 transition-all flex flex-col justify-between space-y-2"
                            >
                              <div className="space-y-1">
                                <div className="flex justify-between items-start">
                                  <span className="text-xs font-bold text-zinc-800 tracking-tight">
                                    {feat.name}
                                  </span>
                                  <span className="text-[8px] font-mono font-bold bg-indigo-50 border border-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-md">
                                    {feat.badge}
                                  </span>
                                </div>
                                <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                                  {feat.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] font-mono bg-zinc-100 border border-zinc-200 text-zinc-500 px-2 py-0.5 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
