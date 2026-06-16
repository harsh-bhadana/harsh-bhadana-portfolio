import React from "react";
import GithubPulseClient from "./GithubPulseClient";

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

const generateFallbackWeeks = (): ContributionDay[][] => {
  const fallback: ContributionDay[][] = [];
  for (let w = 0; w < 26; w++) {
    const weekDays: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
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
};

const getMockActivities = (): GitActivity[] => [
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
];

export default async function GithubPulse() {
  let initialActivities: GitActivity[] = [];
  let initialWeeks: ContributionDay[][] = [];
  let initialTotalContributions = 0;
  let initialError: string | null = null;

  try {
    // 1. Fetch live activity list on the server (dynamic fetch)
    const activityResponse = await fetch("https://api.github.com/users/harsh-bhadana/events", {
      cache: "no-store",
    });

    if (activityResponse.ok) {
      const events = (await activityResponse.json()) as GitHubEvent[];
      initialActivities = events
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
    } else {
      initialActivities = getMockActivities();
    }

    // 2. Fetch contributions calendar on the server (dynamic fetch)
    const statsResponse = await fetch(
      "https://github-contributions-api.deno.dev/harsh-bhadana.json",
      {
        cache: "no-store",
      },
    );

    if (statsResponse.ok) {
      const data = await statsResponse.json();
      if (data.contributions) {
        const contributionCalendar = data.contributions || [];
        initialWeeks = contributionCalendar.slice(-26);

        initialTotalContributions = initialWeeks.reduce((acc: number, week: ContributionDay[]) => {
          return acc + week.reduce((weekAcc, day) => weekAcc + day.contributionCount, 0);
        }, 0);
      }
    } else {
      initialWeeks = generateFallbackWeeks();
      initialTotalContributions = 154;
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.warn("GitHub Server Fetch Error, loading fallback:", errorMessage);
    initialError = "Showing sandbox activity log.";
    initialWeeks = generateFallbackWeeks();
    initialTotalContributions = 182;
    initialActivities = getMockActivities();
  }

  return (
    <GithubPulseClient
      initialActivities={initialActivities}
      initialWeeks={initialWeeks}
      initialTotalContributions={initialTotalContributions}
      initialError={initialError}
    />
  );
}
