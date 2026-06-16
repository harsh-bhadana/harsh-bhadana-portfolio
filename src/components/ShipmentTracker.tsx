"use client";

import React, { useState } from "react";
import { Search, Compass, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: "In Transit" | "Delivered" | "Delayed" | "Pending";
  progress: number;
  eta: string;
  carrier: string;
}

export default function ShipmentTracker() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [shipments] = useState<Shipment[]>([
    {
      id: "SMN-98402",
      origin: "Mumbai (Port)",
      destination: "Faridabad ICD",
      status: "In Transit",
      progress: 65,
      eta: "16 Hours",
      carrier: "Somani Logistics",
    },
    {
      id: "SMN-71109",
      origin: "Chennai Port",
      destination: "Delhi Central",
      status: "Delivered",
      progress: 100,
      eta: "Completed",
      carrier: "Somani Express",
    },
    {
      id: "SMN-55418",
      origin: "Gujarat Port",
      destination: "Faridabad ICD",
      status: "Delayed",
      progress: 40,
      eta: "2 Days (Delayed)",
      carrier: "Somani Cargo",
    },
    {
      id: "SMN-33012",
      origin: "Kolkata Hub",
      destination: "Mumbai Port",
      status: "Pending",
      progress: 10,
      eta: "3 Days",
      carrier: "Somani Logistics",
    },
    {
      id: "SMN-88492",
      origin: "Delhi Central",
      destination: "Bangalore Hub",
      status: "In Transit",
      progress: 85,
      eta: "4 Hours",
      carrier: "Somani Express",
    },
  ]);

  const filteredShipments = shipments.filter((s) => {
    const matchesSearch =
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === "All" || s.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "In Transit":
        return "text-teal-600 bg-teal-50 border-teal-100";
      case "Delivered":
        return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "Delayed":
        return "text-rose-600 bg-rose-50 border-rose-100";
      default:
        return "text-zinc-500 bg-zinc-50 border-zinc-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Transit":
        return <Compass size={12} className="animate-spin-slow" />;
      case "Delivered":
        return <CheckCircle2 size={12} />;
      case "Delayed":
        return <AlertCircle size={12} />;
      default:
        return <Clock size={12} />;
    }
  };

  return (
    <div className="premium-card rounded-2xl overflow-hidden bg-white border border-zinc-200 flex flex-col h-[520px]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
            Logistic Analytics
          </h3>
          <p className="text-sm font-semibold text-zinc-900 mt-0.5">
            Somani Shipment Tracking Interface
          </p>
        </div>
        <span className="text-[10px] font-mono text-zinc-400 bg-zinc-50 border border-zinc-250/50 px-2 py-0.5 rounded-md">
          Active Monitor
        </span>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-zinc-100 overflow-hidden">
        {/* Left Panel: Stats and Quick Transit Flow */}
        <div className="lg:col-span-2 p-5 flex flex-col justify-between space-y-4 overflow-y-auto">
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase text-zinc-400 block border-b border-zinc-100 pb-1.5">
              Hub Transit Overview
            </span>

            {/* Simple Transit Timeline Graphic */}
            <div className="bg-zinc-50 rounded-xl border border-zinc-100 p-4 space-y-4">
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                <span>ON-TIME RATING</span>
                <span className="text-zinc-800 font-bold">94.2%</span>
              </div>

              {/* Graphical Transit Line */}
              <div className="relative pl-6 space-y-5 border-l-2 border-zinc-200 ml-2 py-1">
                <div className="relative">
                  <span className="absolute -left-8 top-0.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  </span>
                  <p className="text-xs font-bold text-zinc-800">Mumbai Central Port</p>
                  <p className="text-[9px] text-zinc-400 font-mono">Origin Gateway</p>
                </div>

                <div className="relative">
                  <span className="absolute -left-8 top-0.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-zinc-350/50 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                  </span>
                  <p className="text-xs font-bold text-zinc-700">Gujarat Hub</p>
                  <p className="text-[9px] text-zinc-400 font-mono">In Transit (ICD Link)</p>
                </div>

                <div className="relative">
                  <span className="absolute -left-8 top-0.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-zinc-350/50 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                  </span>
                  <p className="text-xs font-bold text-zinc-700">Faridabad Terminal</p>
                  <p className="text-[9px] text-zinc-400 font-mono">Destination Gateway</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-zinc-50 border border-zinc-100 p-3 rounded-xl flex flex-col">
              <span className="text-[9px] text-zinc-400 font-mono uppercase">Avg Speed</span>
              <span className="text-base font-bold text-zinc-800 font-mono">62 km/h</span>
            </div>
            <div className="bg-zinc-50 border border-zinc-100 p-3 rounded-xl flex flex-col">
              <span className="text-[9px] text-zinc-400 font-mono uppercase">Monitored</span>
              <span className="text-base font-bold text-indigo-600 font-mono">5 Routes</span>
            </div>
          </div>
        </div>

        {/* Right Panel: Interactive Shipments List */}
        <div className="lg:col-span-3 p-5 flex flex-col overflow-hidden h-full bg-zinc-50/30">
          {/* Search and Filters */}
          <div className="space-y-3 mb-3 shrink-0">
            <div className="relative">
              <Search className="absolute left-3.5 top-2.5 text-zinc-400" size={14} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shipping files..."
                className="w-full bg-white border border-zinc-200 rounded-xl pl-9 pr-4 py-2 text-xs font-sans text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-300"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-1 overflow-x-auto pb-1">
              {["All", "In Transit", "Delivered", "Delayed"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono transition-all duration-200 shrink-0 ${
                    statusFilter === filter
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Shipments List */}
          <div className="flex-1 overflow-y-auto pr-1">
            <div className="space-y-2">
              {filteredShipments.length > 0 ? (
                filteredShipments.map((shipment) => (
                  <div
                    key={shipment.id}
                    className="bg-white border border-zinc-200/80 rounded-xl p-3.5 hover:border-zinc-300 hover:shadow-sm transition-all flex flex-col space-y-2.5"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono font-bold text-zinc-900">
                        {shipment.id}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md border text-[9px] font-mono font-semibold flex items-center space-x-1 ${getStatusStyle(shipment.status)}`}
                      >
                        {getStatusIcon(shipment.status)}
                        <span className="ml-1">{shipment.status}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-500">
                      <div>
                        <span className="text-zinc-400 block text-[9px] uppercase">Route</span>
                        <span className="text-zinc-800 font-semibold">
                          {shipment.origin}
                        </span> →{" "}
                        <span className="text-zinc-800 font-semibold">{shipment.destination}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-zinc-400 block text-[9px] uppercase">
                          Est. Arrival
                        </span>
                        <span className="text-zinc-800 font-semibold">{shipment.eta}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="h-1 bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            shipment.status === "Delivered"
                              ? "bg-emerald-500"
                              : shipment.status === "Delayed"
                                ? "bg-rose-500"
                                : "bg-indigo-500"
                          }`}
                          style={{ width: `${shipment.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs font-mono text-zinc-400">
                  No matching files recorded.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
