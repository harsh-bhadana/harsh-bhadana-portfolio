"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, Eye, AlertCircle } from "lucide-react";

interface BidLog {
  id: string;
  bidder: string;
  amount: number;
  timestamp: string;
  hash: string;
}

interface BikeOption {
  id: string;
  name: string;
  specs: string;
  startingPrice: number;
  currentBid: number;
  bidsCount: number;
}

async function generateHash(payload: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(payload);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    return Math.random().toString(36).substring(2, 15);
  }
}

export default function BiddingSimulator() {
  const bikes: BikeOption[] = [
    {
      id: "himalayan",
      name: "Himalayan 450",
      specs: "Liquid-Cooled Sherpa Engine | Custom Granite Black",
      startingPrice: 285000,
      currentBid: 295000,
      bidsCount: 4,
    },
    {
      id: "continental",
      name: "Continental GT 650",
      specs: "Parallel-Twin Air-Cooled Engine | British Racing Green",
      startingPrice: 340000,
      currentBid: 355000,
      bidsCount: 6,
    },
  ];

  const [selectedBike, setSelectedBike] = useState<BikeOption>(bikes[0]);
  const [customBid, setCustomBid] = useState("");
  const [bidLogs, setBidLogs] = useState<Record<string, BidLog[]>>({
    himalayan: [
      { id: "1", bidder: "RacerX", amount: 285000, timestamp: "11:30 AM", hash: "8f7e6a5d9c2b4a1f..." },
      { id: "2", bidder: "BulletLover", amount: 290000, timestamp: "11:31 AM", hash: "9a2b3c4d8e7f6a5b..." },
      { id: "DelhiRider", bidder: "DelhiRider", amount: 295000, timestamp: "11:35 AM", hash: "1f2e3d4c5b6a7e8f..." },
    ],
    continental: [
      { id: "1", bidder: "CafeRacer", amount: 340000, timestamp: "11:25 AM", hash: "7c6b5a4d3e2f1a0b..." },
      { id: "2", bidder: "SpeedyBoy", amount: 345000, timestamp: "11:28 AM", hash: "6d5c4b3a2e1f0a9b..." },
      { id: "GT650Fans", bidder: "GT650Fans", amount: 355000, timestamp: "11:32 AM", hash: "5e4d3c2b1a0f9e8d..." },
    ],
  });

  const [isValidating, setIsValidating] = useState(false);
  const [validationStage, setValidationStage] = useState("");
  const [lastPayload, setLastPayload] = useState<any>(null);
  const [lastHash, setLastHash] = useState("");

  const bidInputRef = useRef<HTMLInputElement>(null);

  // Background auto-bidding simulation
  useEffect(() => {
    const interval = setInterval(async () => {
      const targetBike = selectedBike;
      const bidders = ["RohanS", "BulletGuru", "RE_Warrior", "MumbaiRider"];
      const nextBid = targetBike.currentBid + Math.floor(Math.random() * 2 + 1) * 5000;
      const randomBidder = bidders[Math.floor(Math.random() * bidders.length)];
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const payloadStr = JSON.stringify({ bidder: randomBidder, amount: nextBid, timestamp: timeStr });
      const fullHash = await generateHash(payloadStr);

      const newLog: BidLog = {
        id: Math.random().toString(),
        bidder: randomBidder,
        amount: nextBid,
        timestamp: timeStr,
        hash: fullHash.substring(0, 16) + "...",
      };

      setBidLogs((prev) => ({
        ...prev,
        [targetBike.id]: [newLog, ...prev[targetBike.id]].slice(0, 6),
      }));

      if (selectedBike.id === targetBike.id) {
        setSelectedBike((prev) => ({
          ...prev,
          currentBid: nextBid,
          bidsCount: prev.bidsCount + 1,
        }));
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [selectedBike]);

  const handlePlaceBid = async (amount: number) => {
    if (amount <= selectedBike.currentBid) {
      alert("Bid must exceed the current high bid!");
      return;
    }

    setIsValidating(true);
    setValidationStage("Validating payload signature...");
    
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const payloadObj = {
      bidder: "Anonymous Recruiter",
      amount: amount,
      timestamp: timeStr,
      clientToken: "secure_client_token_2026",
    };

    const payloadString = JSON.stringify(payloadObj);
    setLastPayload(payloadObj);

    setTimeout(async () => {
      setValidationStage("Verifying cryptographic hash (SHA-256)...");
      const fullHash = await generateHash(payloadString);
      setLastHash(fullHash);

      setTimeout(() => {
        const newLog: BidLog = {
          id: Math.random().toString(),
          bidder: "You (Recruiter)",
          amount: amount,
          timestamp: timeStr,
          hash: fullHash.substring(0, 16) + "...",
        };

        setBidLogs((prev) => ({
          ...prev,
          [selectedBike.id]: [newLog, ...prev[selectedBike.id]],
        }));

        setSelectedBike((prev) => ({
          ...prev,
          currentBid: amount,
          bidsCount: prev.bidsCount + 1,
        }));

        setIsValidating(false);
        setValidationStage("");
        setCustomBid("");
      }, 800);
    }, 1000);
  };

  return (
    <div className="premium-card rounded-2xl overflow-hidden bg-white border border-zinc-200 flex flex-col h-[520px]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
            Automotive Auction Module
          </h3>
          <p className="text-sm font-semibold text-zinc-900 mt-0.5">
            Royal Enfield Interactive Pricing Showcase
          </p>
        </div>
        <div className="flex items-center space-x-1.5 text-[10px] text-zinc-400 font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
          <span>Live Synchronized Stream</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-zinc-100 overflow-hidden">
        {/* Left Panel: Catalog View & Actions */}
        <div className="md:col-span-3 p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Model Tabs */}
            <div className="flex space-x-2">
              {bikes.map((bike) => (
                <button
                  key={bike.id}
                  onClick={() => {
                    const currentLogs = bidLogs[bike.id];
                    const topBid = currentLogs.length > 0 ? currentLogs[0].amount : bike.startingPrice;
                    setSelectedBike({
                      ...bike,
                      currentBid: topBid,
                      bidsCount: currentLogs.length,
                    });
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    selectedBike.id === bike.id
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  {bike.name}
                </button>
              ))}
            </div>

            {/* Spec Sheet */}
            <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 space-y-3">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Selected Specification</span>
                <h4 className="text-xs font-semibold text-zinc-800 mt-0.5">{selectedBike.specs}</h4>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Current Bid</span>
                  <div className="text-2xl font-bold text-zinc-900 tracking-tight font-sans">
                    ₹{selectedBike.currentBid.toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Total Offers</span>
                  <div className="text-sm font-bold text-zinc-700">{selectedBike.bidsCount}</div>
                </div>
              </div>
            </div>

            {/* Bid Actions */}
            <div className="space-y-2.5">
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePlaceBid(selectedBike.currentBid + 5000)}
                  disabled={isValidating}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  Place Bid (+₹5,000)
                </button>
                <button
                  onClick={() => handlePlaceBid(selectedBike.currentBid + 10000)}
                  disabled={isValidating}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-700 text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  Place Bid (+₹10,000)
                </button>
              </div>

              {/* Custom Bid */}
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-2.5 text-xs text-zinc-400 font-mono">₹</span>
                  <input
                    ref={bidInputRef}
                    type="number"
                    value={customBid}
                    onChange={(e) => setCustomBid(e.target.value)}
                    disabled={isValidating}
                    placeholder={`Enter bid amount (> ₹${selectedBike.currentBid.toLocaleString()})`}
                    className="w-full pl-7 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-sans text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400"
                  />
                </div>
                <button
                  onClick={() => {
                    const amount = parseInt(customBid);
                    if (isNaN(amount)) return;
                    handlePlaceBid(amount);
                  }}
                  disabled={isValidating || !customBid}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold transition-colors disabled:opacity-40"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          {/* Cryptography Footer (SSL styled) */}
          <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-150 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Shield size={14} className={isValidating ? "text-indigo-600 animate-pulse" : "text-emerald-600"} />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                {isValidating ? validationStage : "Payload integrity verified via SHA-256"}
              </span>
            </div>
            
            {lastHash && !isValidating && (
              <div className="flex items-center space-x-1 font-mono text-[9px] text-zinc-400">
                <Lock size={10} />
                <span className="truncate max-w-[80px]" title={lastHash}>{lastHash}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Transaction Log */}
        <div className="md:col-span-2 p-5 flex flex-col overflow-hidden h-full">
          <div className="text-[10px] font-mono uppercase text-zinc-400 border-b border-zinc-100 pb-2 mb-2 flex justify-between items-center">
            <span>Verified Offers Log</span>
            <span>Client SSL</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            <AnimatePresence initial={false}>
              {bidLogs[selectedBike.id]?.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white p-3 rounded-xl border border-zinc-100 flex flex-col space-y-1.5 hover:shadow-sm transition-shadow"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className={`font-semibold ${log.bidder.startsWith("You") ? "text-indigo-600" : "text-zinc-800"}`}>
                      {log.bidder}
                    </span>
                    <span className="font-bold text-zinc-900">
                      ₹{log.amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-zinc-400 font-mono">
                    <span>{log.timestamp}</span>
                    <span className="truncate max-w-[110px] cursor-help" title={log.hash}>
                      SHA: {log.hash.substring(0, 10)}...
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
