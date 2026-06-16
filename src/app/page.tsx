import React from "react";
import { Mail, Phone, MapPin, Server, Cpu, Database } from "lucide-react";

import ProfileSummary from "@/components/ProfileSummary";
import GithubPulse from "@/components/GithubPulse";
import ProjectsCatalog from "@/components/ProjectsCatalog";
import InteractiveSimulators from "@/components/InteractiveSimulators";
import ExperienceTimeline from "@/components/ExperienceTimeline";

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

const LinkedinIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Home() {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col space-y-6 md:space-y-8">
      {/* Header Panel */}
      <header className="premium-card rounded-2xl p-6 md:p-8 border border-zinc-200 bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/20 rounded-full blur-3xl -z-10" />
        
        <div className="space-y-2.5">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              Design & Development Portfolio
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight uppercase font-sans">
            Harsh Bhadana
          </h1>
          <p className="text-xs md:text-sm font-mono font-bold text-indigo-600 uppercase tracking-wider">
            Senior Frontend Developer
          </p>
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          <a
            href="mailto:harshbhadana40@gmail.com"
            className="flex items-center space-x-2.5 bg-white hover:bg-zinc-50 border border-zinc-200 px-3 py-2 rounded-xl text-zinc-650 hover:text-zinc-900 transition-colors"
          >
            <Mail size={13} className="text-indigo-600" />
            <span className="truncate">harshbhadana40@gmail.com</span>
          </a>
          <div className="flex items-center space-x-2.5 bg-white border border-zinc-200 px-3 py-2 rounded-xl text-zinc-650">
            <Phone size={13} className="text-indigo-600" />
            <span>+91 9999182025</span>
          </div>
          <div className="flex items-center space-x-2.5 bg-white border border-zinc-200 px-3 py-2 rounded-xl text-zinc-650">
            <MapPin size={13} className="text-indigo-600" />
            <span>Faridabad, HR, India</span>
          </div>
          <a
            href="https://github.com/harsh-bhadana"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2.5 bg-white hover:bg-zinc-50 border border-zinc-200 px-3 py-2 rounded-xl text-zinc-650 hover:text-zinc-900 transition-colors"
          >
            <GithubIcon size={13} className="text-indigo-600" />
            <span>github/harsh-bhadana</span>
          </a>
          <a
            href="https://linkedin.com/in/harsh-bhadana"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2.5 bg-white hover:bg-zinc-50 border border-zinc-200 px-3 py-2 rounded-xl text-zinc-650 hover:text-zinc-900 transition-colors"
          >
            <LinkedinIcon size={13} className="text-indigo-600" />
            <span>linkedin/harsh-bhadana</span>
          </a>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Panel: Profile and Tech Specs (span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Summary Card */}
          <ProfileSummary />

          {/* GitHub Activity Pulse Card */}
          <GithubPulse />

          {/* Core Competency Metric Progress Bars */}
          <div className="premium-card rounded-2xl p-5 border border-zinc-200 bg-white space-y-4 shadow-sm">
            <h3 className="text-xs font-mono font-bold uppercase text-zinc-400 border-b border-zinc-100 pb-2">
              Technology Foundations
            </h3>
            
            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between text-[11px] font-mono text-zinc-500 mb-1">
                  <span className="flex items-center"><Cpu size={10} className="mr-1.5 text-indigo-600" /> Next.js & React Ecosystem</span>
                  <span className="text-zinc-850 font-bold">Expert</span>
                </div>
                <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full w-[95%]" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-[11px] font-mono text-zinc-500 mb-1">
                  <span className="flex items-center"><Database size={10} className="mr-1.5 text-teal-650" /> Firebase Realtime Architecture</span>
                  <span className="text-zinc-850 font-bold">Advanced</span>
                </div>
                <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-600 rounded-full w-[85%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-zinc-500 mb-1">
                  <span className="flex items-center"><Server size={10} className="mr-1.5 text-amber-600" /> Web Security Standards</span>
                  <span className="text-zinc-850 font-bold">Advanced</span>
                </div>
                <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-[80%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Timeline and Simulators (span 3) */}
        <div className="lg:col-span-3 space-y-8">
          {/* Career timeline */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
              Work History Timeline
            </h2>
            <ExperienceTimeline />
          </div>

          {/* Featured Projects & Labs Catalog */}
          <div className="pt-4 border-t border-zinc-100">
            <ProjectsCatalog />
          </div>

          {/* Interactive Simulators */}
          <div className="pt-4 border-t border-zinc-100">
            <InteractiveSimulators />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-8 border-t border-zinc-200 text-center text-[10px] font-mono text-zinc-400">
        <p>© 2026 Harsh Bhadana. Crafted using Next.js 16 (Partial Prerendering) & Tailwind v4.</p>
      </footer>
    </main>
  );
}
