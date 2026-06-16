"use client";

import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Gavel, Ship, ShieldAlert, ChevronDown, ChevronUp, Cpu } from "lucide-react";

import BiddingSimulator from "./BiddingSimulator";
import ShipmentTracker from "./ShipmentTracker";
import SecuritySandbox from "./SecuritySandbox";
import { BiddingSkeleton, TrackerSkeleton, SecuritySkeleton } from "./Skeletons";

type SimTab = "bidding" | "tracker" | "security";

export default function InteractiveSimulators() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<SimTab>("bidding");

  const tabs = [
    { id: "bidding", name: "Bike Auction", icon: <Gavel size={14} />, color: "text-indigo-600" },
    { id: "tracker", name: "Somani Tracker", icon: <Ship size={14} />, color: "text-teal-600" },
    {
      id: "security",
      name: "CSP Sandbox",
      icon: <ShieldAlert size={14} />,
      color: "text-amber-600",
    },
  ];

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="w-full py-4 px-5 premium-card rounded-2xl bg-white border border-zinc-200 flex items-center justify-between group cursor-pointer hover:border-indigo-400 hover:shadow-md transition-all text-left"
      >
        <div className="flex items-center space-x-3.5">
          <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-650 group-hover:scale-105 transition-transform">
            <Cpu size={16} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-850">Interactive Telemetry Showcases</h3>
            <p className="text-[10px] font-mono text-zinc-400 uppercase mt-0.5">
              Click to deploy live sandbox environments
            </p>
          </div>
        </div>
        <ChevronDown
          size={18}
          className="text-zinc-400 group-hover:text-zinc-600 transition-colors"
        />
      </button>
    );
  }

  return (
    <div className="space-y-4">
      {/* Collapsed Header / Trigger */}
      <button
        onClick={() => setIsVisible(false)}
        className="w-full py-3 px-5 premium-card rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between group cursor-pointer hover:bg-zinc-100 transition-all text-left"
      >
        <div className="flex items-center space-x-3 text-zinc-700">
          <Cpu size={14} className="text-indigo-600 animate-spin-slow" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider">
            Interactive Telemetry Showcases
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[9px] font-mono text-zinc-400">Collapse Sandbox</span>
          <ChevronUp size={15} className="text-zinc-400 group-hover:text-zinc-650" />
        </div>
      </button>

      {/* Tab Selectors */}
      <div className="flex space-x-1 bg-zinc-100 p-1 rounded-xl border border-zinc-200/60 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SimTab)}
              className={`flex-1 min-w-[120px] relative py-2 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center space-x-2 transition-all duration-300 ${
                isActive ? "text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-sim-indicator"
                  className="absolute inset-0 bg-white border border-zinc-200/80 rounded-lg shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${isActive ? tab.color : ""}`}>{tab.icon}</span>
              <span className="relative z-10">{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Simulator Display View */}
      <div className="min-h-[520px]">
        {activeTab === "bidding" && (
          <Suspense fallback={<BiddingSkeleton />}>
            <BiddingSimulator />
          </Suspense>
        )}
        {activeTab === "tracker" && (
          <Suspense fallback={<TrackerSkeleton />}>
            <ShipmentTracker />
          </Suspense>
        )}
        {activeTab === "security" && (
          <Suspense fallback={<SecuritySkeleton />}>
            <SecuritySandbox />
          </Suspense>
        )}
      </div>
    </div>
  );
}
