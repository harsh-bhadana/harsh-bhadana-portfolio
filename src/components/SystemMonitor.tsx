import React from "react";
import { headers } from "next/headers";
import { Server, Activity, ShieldCheck } from "lucide-react";

export default async function SystemMonitor() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "Antigravity Agent";

  let browserOS = "Developer Environment";
  if (userAgent.includes("Windows")) browserOS = "Windows OS";
  else if (userAgent.includes("Macintosh")) browserOS = "macOS";
  else if (userAgent.includes("Linux")) browserOS = "Linux OS";
  else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) browserOS = "iOS Device";
  else if (userAgent.includes("Android")) browserOS = "Android Device";

  // Simulate a 500ms network fetch for PPR demonstration
  await new Promise((resolve) => setTimeout(resolve, 500));

  return (
    <div className="premium-card rounded-2xl p-5 border border-zinc-200 bg-white flex flex-col justify-between h-44">
      <div className="flex justify-between items-center border-b border-zinc-100 pb-2.5">
        <div className="flex items-center space-x-2">
          <Server size={14} className="text-emerald-600 animate-pulse" />
        </div>
        <span className="text-[9px] font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
          PPR Dynamic Node
        </span>
      </div>

      <div className="space-y-1.5 my-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Client OS:</span>
          <span className="text-zinc-800 font-bold truncate max-w-[150px]" title={userAgent}>
            {browserOS}
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Simulated CPU Load:</span>
          <span className="text-zinc-800 font-bold">12.4%</span>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>API Handshake status:</span>
          <span className="text-emerald-600 font-bold flex items-center">
            <Activity size={10} className="mr-1" />
            Active
          </span>
        </div>
      </div>

      <div className="bg-zinc-50 px-2 py-1.5 rounded-xl border border-zinc-150 flex justify-between items-center text-[10px] font-mono text-zinc-500">
        <span>Prerendering status:</span>
        <span className="text-emerald-600 font-bold flex items-center">
          <ShieldCheck size={10} className="mr-1" />
          Stream Complete
        </span>
      </div>
    </div>
  );
}
