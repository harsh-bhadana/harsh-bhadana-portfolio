"use client";

import React, { useState, useCallback } from "react";
import { GitBranch, GitCommit, GitPullRequest, RefreshCw, AlertCircle } from "lucide-react";

interface GitActivity {
  id: string;
  type: "commit" | "pr" | "repo" | "generic";
  repo: string;
  message: string;
  time: string;
  branch?: string;
}

interface ContributionDay {
  color: string;
  contributionCount: number;
  contributionLevel:
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";
  date: string;
}

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    ref?: string;
    ref_type?: string;
    action?: string;
    commits?: Array<{ message: string }>;
    pull_request?: { title: string };
  };
}

const formatEventTime = (isoString: string): string => {
  const eventDate = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - eventDate.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) {
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return diffMins <= 1 ? "Just now" : `${diffMins}m ago`;
  }
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  const diffDays = Math.floor(diffHours / 24);
  return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
};

interface GithubPulseClientProps {
  initialActivities: GitActivity[];
  initialWeeks: ContributionDay[][];
  initialTotalContributions: number;
  initialError: string | null;
}

export default function GithubPulseClient({
  initialActivities,
  initialWeeks,
  initialTotalContributions,
  initialError,
}: GithubPulseClientProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(initialError);
  const [activities, setActivities] = useState<GitActivity[]>(initialActivities);
  const [weeks, setWeeks] = useState<ContributionDay[][]>(initialWeeks);
  const [totalContributions, setTotalContributions] = useState<number>(initialTotalContributions);

  // Fallback data for last 26 weeks (6 months) in case of offline/API limit
  const generateFallbackWeeks = useCallback((): ContributionDay[][] => {
    const fallback: ContributionDay[][] = [];

    for (let w = 0; w < 26; w++) {
      const weekDays: ContributionDay[] = [];
      for (let d = 0; d < 7; d++) {
        // Generate a random level to look like a realistic fallback
        const rand = Math.random();
        let level: ContributionDay["contributionLevel"] = "NONE";
        let count = 0;

        if (rand > 0.85) {
          level = "FOURTH_QUARTILE";
          count = 12;
        } else if (rand > 0.7) {
          level = "THIRD_QUARTILE";
          count = 6;
        } else if (rand > 0.5) {
          level = "SECOND_QUARTILE";
          count = 3;
        } else if (rand > 0.35) {
          level = "FIRST_QUARTILE";
          count = 1;
        }

        weekDays.push({
          color: "#ebedf0",
          contributionCount: count,
          contributionLevel: level,
          date: `Week-${w}-Day-${d}`,
        });
      }
      fallback.push(weekDays);
    }
    return fallback;
  }, []);

  const loadMockActivities = useCallback(() => {
    setActivities([
      {
        id: "act-1",
        type: "commit",
        repo: "harsh-bhadana-portfolio",
        message: "Synchronized contributions calendar with live GitHub scraper API",
        time: "Just now",
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
  }, []);

  const fetchGithubData = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);

    try {
      // 1. Fetch live activity list
      const activityResponse = await fetch("https://api.github.com/users/harsh-bhadana/events");
      if (activityResponse.ok) {
        const events = (await activityResponse.json()) as GitHubEvent[];
        const parsedActivities: GitActivity[] = events
          .filter(
            (event: GitHubEvent) =>
              event.type === "PushEvent" ||
              event.type === "PullRequestEvent" ||
              event.type === "CreateEvent",
          )
          .slice(0, 4)
          .map((event: GitHubEvent) => {
            let type: "commit" | "pr" | "repo" | "generic" = "generic";
            let message = "";
            let branch = "";
            const timeFormatted = formatEventTime(event.created_at);

            if (event.type === "PushEvent") {
              type = "commit";
              const commitMessage = event.payload.commits?.[0]?.message || "Pushed code updates";
              message = commitMessage.split("\n")[0];
              branch = event.payload.ref?.replace("refs/heads/", "") || "main";
            } else if (event.type === "PullRequestEvent") {
              type = "pr";
              message = `${event.payload.action} PR: ${event.payload.pull_request?.title || "Code review"}`;
            } else if (event.type === "CreateEvent") {
              type = "repo";
              message = `Created ${event.payload.ref_type}: ${event.payload.ref || event.repo.name}`;
            }

            return {
              id: event.id,
              type,
              repo: event.repo.name,
              message,
              time: timeFormatted,
              branch,
            };
          });
        setActivities(parsedActivities);
      } else {
        loadMockActivities();
      }

      // 2. Fetch contributions calendar
      const statsResponse = await fetch(
        "https://github-contributions-api.deno.dev/harsh-bhadana.json",
      );
      if (statsResponse.ok) {
        const data = await statsResponse.json();
        if (data.contributions) {
          const contributionCalendar = data.contributions || [];
          const last26Weeks = contributionCalendar.slice(-26);
          setWeeks(last26Weeks);

          const total = last26Weeks.reduce((acc: number, week: ContributionDay[]) => {
            return acc + week.reduce((weekAcc, day) => weekAcc + day.contributionCount, 0);
          }, 0);
          setTotalContributions(total);
        }
      } else {
        setWeeks(generateFallbackWeeks());
        setTotalContributions(154);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.warn("GitHub Fetch Error, loading fallback:", errorMessage);
      setError("Showing sandbox activity log.");
      setWeeks(generateFallbackWeeks());
      setTotalContributions(182);
      loadMockActivities();
    } finally {
      setIsRefreshing(false);
    }
  }, [generateFallbackWeeks, loadMockActivities]);

  // Map GitHub contribution level to exact colors matching the dark theme screenshot
  const mapLevelToColor = (level: string) => {
    switch (level) {
      case "FIRST_QUARTILE":
        return "#0e4429"; // Level 1
      case "SECOND_QUARTILE":
        return "#006d32"; // Level 2
      case "THIRD_QUARTILE":
        return "#26a641"; // Level 3
      case "FOURTH_QUARTILE":
        return "#39d353"; // Level 4
      default:
        return "#ebedf0"; // Level 0 (None) (standard GitHub light grey)
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "commit":
        return <GitCommit size={11} className="text-zinc-650" />;
      case "pr":
        return <GitPullRequest size={11} className="text-indigo-600" />;
      default:
        return <GitBranch size={11} className="text-teal-650" />;
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
          <p className="text-sm font-semibold text-zinc-900 mt-0.5">GitHub Live Pulse</p>
        </div>
        <button
          onClick={fetchGithubData}
          disabled={isRefreshing}
          className="p-1.5 rounded-lg border border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50 transition-colors cursor-pointer"
        >
          <RefreshCw size={12} className={`text-zinc-550 ${isRefreshing ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Grid Graph Card (Styled in authentic GitHub Dark Theme) */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-[10px] font-mono text-zinc-455 uppercase">
            Live Grid (Last 6 Months)
          </span>
          {totalContributions > 0 && (
            <span className="text-[9px] font-mono text-emerald-600 font-bold">
              {totalContributions} Contributions
            </span>
          )}
        </div>

        <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl flex items-center space-x-2 overflow-x-auto shadow-inner">
          {/* Days of week labels */}
          <div className="flex flex-col justify-between h-20 text-[8px] font-mono text-zinc-400 select-none pr-2">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* Grid columns */}
          <div className="flex-1 flex gap-[3px]">
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-[3px]">
                {week.map((day, dayIdx) => (
                  <div
                    key={dayIdx}
                    className="w-2.5 h-2.5 rounded-[2px] transition-all duration-200 hover:scale-110"
                    style={{ backgroundColor: mapLevelToColor(day.contributionLevel) }}
                    title={`${day.contributionCount} contributions on ${day.date}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Colors Legend */}
        <div className="flex justify-end items-center space-x-1 text-[8px] font-mono text-zinc-400 pr-1">
          <span>Less</span>
          <div className="w-2 h-2 rounded-[1px]" style={{ backgroundColor: "#ebedf0" }} />
          <div className="w-2 h-2 rounded-[1px]" style={{ backgroundColor: "#0e4429" }} />
          <div className="w-2 h-2 rounded-[1px]" style={{ backgroundColor: "#006d32" }} />
          <div className="w-2 h-2 rounded-[1px]" style={{ backgroundColor: "#26a641" }} />
          <div className="w-2 h-2 rounded-[1px]" style={{ backgroundColor: "#39d353" }} />
          <span>More</span>
        </div>
      </div>

      {/* Activity Log */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono text-zinc-455 uppercase block">
          Recent Public Events
        </span>

        {error && (
          <div className="flex items-center space-x-2 bg-zinc-50 text-zinc-550 text-[10px] px-2.5 py-1.5 rounded-lg border border-zinc-200/50 font-mono">
            <AlertCircle size={12} className="text-zinc-400" />
            <span>{error}</span>
          </div>
        )}

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
                  <span className="font-bold text-zinc-700 truncate max-w-[120px]" title={act.repo}>
                    {act.repo}
                  </span>
                  <span>{act.time}</span>
                </div>
                <p className="text-zinc-650 truncate leading-snug font-sans">{act.message}</p>
                {act.branch && (
                  <span className="text-[8px] font-mono text-indigo-650 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded-md mt-1 inline-block">
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
