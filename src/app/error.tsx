"use client";

import React, { useEffect } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error Boundary caught error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="p-4 bg-red-50 text-red-600 rounded-full border border-red-100 shadow-sm animate-pulse">
        <AlertCircle size={36} />
      </div>
      <div className="space-y-2 max-w-sm">
        <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
          Application Runtime Error
        </h2>
        <p className="text-sm text-zinc-500 leading-relaxed">
          We encountered an unexpected error while rendering this page. The issue has been logged.
        </p>
        {error.message && (
          <div className="mt-4 p-3 bg-zinc-50 border border-zinc-150 rounded-xl font-mono text-[10px] text-zinc-650 text-left overflow-x-auto">
            {error.message}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => reset()}
          className="flex items-center space-x-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs px-4 py-2.5 rounded-xl transition-colors font-medium border border-zinc-950 shadow-sm cursor-pointer"
        >
          <RefreshCw size={14} />
          <span>Reload Application</span>
        </button>
        <Link
          href="/"
          className="flex items-center space-x-2 bg-white hover:bg-zinc-50 text-zinc-700 text-xs px-4 py-2.5 rounded-xl transition-colors font-medium border border-zinc-200 shadow-sm"
        >
          <Home size={14} />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
}
