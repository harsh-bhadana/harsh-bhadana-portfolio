"use client";

import React, { useState } from "react";
import { GitBranch, GitCommit, GitPullRequest, RefreshCw } from "lucide-react";

interface GitActivity {
  id: string;
  type: "commit" | "pr" | "repo";
  repo: string;
  message: string;
  time: string;
  branch?: string;
}

export default function GithubPulse() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activities, setActivities] = useState<GitActivity[]>([
    {
      id: "act-1",
      type: "commit",
      repo: "harsh-bhadana-portfolio",
      message: "Refactored simulators layout & optimized asset bundle size",
      time: "2 Hours ago",
      branch: "main",
    },
    {
      id: "act-2",
      type: "pr",
      repo: "royal-enfield-bidding-app",
      message: "Merged Pull Request #14: Secure SHA-256 payload verification check",
      time: "1 Day ago",
    },
    {
      id: "act-3",
      type: "repo",
      repo: "somani-shipment-dashboard",
      message: "Created repository (Next.js, Redux, custom SVG route map)",
      time: "3 Days ago",
    },
    {
      id: "act-4",
      type: "commit",
      repo: "harsh-bhadana-portfolio",
      message: "Migrated caching headers to Next.js 16 cacheComponents spec",
      time: "4 Days ago",
      branch: "main",
    },
  ]);

  // Generate mock data for the 12-week contributions graph (7 days x 12 weeks = 84 cells)
  // Value 0: grey, 1: light green, 2: medium green, 3: dark green
  const contributions = [
    [0, 1, 0, 0, 2, 0, 0, 1, 0, 3, 0, 1], // Sun
    [1, 0, 2, 0, 1, 0, 3, 0, 0, 1, 2, 0], // Mon
    [0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 3], // Tue
    [3, 0, 1, 0, 0, 1, 2, 0, 1, 0, 0, 1], // Wed
    [0, 1, 0, 3, 0, 0, 1, 2, 0, 1, 2, 0], // Thu
    [1, 0, 2, 0, 1, 0, 0, 1, 3, 0, 1, 2], // Fri
    [0, 0, 0, 1, 2, 0, 1, 0, 0, 2, 0, 0], // Sat
  ];

  const refreshPulse = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const commitMessages = [
        "Configured Content Security Policy strictly blocking inline XSS triggers",
        "Tuned API payload structures, slashing Somani tracker latency by 35%",
        "Updated global variables to support clean, light-mode Stripe aesthetics",
        "Wrapped client interactive workspaces inside collapsible containers",
      ];
      
      const randomCommit = commitMessages[Math.floor(Math.random() * commitMessages.length)];
      
      const newActivity: GitActivity = {
        id: Math.random().toString(),
        type: "commit",
        repo: "harsh-bhadana-portfolio",
        message: randomCommit,
        time: "Just now",
        branch: "main",
      };

      setActivities((prev) => [newActivity, ...prev].slice(0, 4));
      setIsRefreshing(false);
    }, 800);
  };

  const getContributionColor = (val: number) => {
    switch (val) {
      case 1: return "bg-emerald-200/70 border-emerald-300/40";
      case 2: return "bg-emerald-400/80 border-emerald-500/30";
      case 3: return "bg-emerald-600/90 border-emerald-700/30";
      default: return "bg-zinc-100 border-zinc-200/40";
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "commit": return <GitCommit size={11} className="text-zinc-650" />;
      case "pr": return <GitPullRequest size={11} className="text-indigo-600" />;
      default: return <GitBranch size={11} className="text-teal-650" />;
    }
  };

  return (
    <div className="premium-card rounded-2xl p-5 border border-zinc-200 bg-white space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-zinc-100 pb-2.5">
        <div>
          <h3 className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
            Repository Activity
          </h3>
          <p className="text-sm font-semibold text-zinc-900 mt-0.5">
            GitHub Pulse Logs
          </p>
        </div>
        <button
          onClick={refreshPulse}
          disabled={isRefreshing}
          className="p-1.5 rounded-lg border border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50 transition-colors cursor-pointer"
        >
          <RefreshCw size={12} className={`text-zinc-550 ${isRefreshing ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Grid Graph */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono text-zinc-450 uppercase block">
          Contributions (Last 12 Weeks)
        </span>
        
        <div className="flex items-center space-x-2 bg-zinc-50/50 p-3 rounded-xl border border-zinc-100/60 overflow-x-auto">
          {/* Days of week labels */}
          <div className="flex flex-col justify-between h-20 text-[8px] font-mono text-zinc-400 select-none pr-1">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* Grid columns */}
          <div className="flex-1 flex gap-1">
            {Array.from({ length: 12 }).map((_, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, rowIdx) => {
                  const val = contributions[rowIdx][colIdx];
                  return (
                    <div
                      key={rowIdx}
                      className={`w-2 h-2 rounded-[2px] border ${getContributionColor(val)} transition-all`}
                      title={`${val > 0 ? val + " contributions" : "No contributions"}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono text-zinc-455 uppercase block">
          Recent Events
        </span>

        <div className="space-y-2">
          {activities.map((act) => (
            <div
              key={act.id}
              className="flex items-start space-x-2.5 bg-zinc-50 p-2.5 rounded-xl border border-zinc-100 hover:border-zinc-200 transition-colors"
            >
              <div className="p-1.5 bg-white border border-zinc-200 rounded-lg shrink-0 mt-0.5">
                {getIcon(act.type)}
              </div>
              <div className="flex-1 min-w-0 text-[11px]">
                <div className="flex justify-between items-baseline text-zinc-500 font-mono text-[9px] mb-0.5">
                  <span className="font-bold text-zinc-700 truncate max-w-[120px]">
                    {act.repo}
                  </span>
                  <span>{act.time}</span>
                </div>
                <p className="text-zinc-650 truncate leading-snug font-sans">
                  {act.message}
                </p>
                {act.branch && (
                  <span className="text-[8px] font-mono text-indigo-650 bg-indigo-50 border border-indigo-100 px-1 rounded mt-1 inline-block">
                    {act.branch}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
