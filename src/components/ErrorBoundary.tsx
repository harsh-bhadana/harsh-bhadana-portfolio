"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error inside ErrorBoundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-6 bg-zinc-50 border border-zinc-200 rounded-2xl text-center space-y-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-full border border-red-100">
            <AlertTriangle size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-zinc-800">Something went wrong</h3>
            <p className="text-xs text-zinc-500 max-w-xs leading-normal">
              {this.state.error?.message ||
                "An unexpected runtime error occurred inside this component."}
            </p>
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="flex items-center space-x-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs px-3.5 py-2 rounded-xl transition-colors font-medium border border-zinc-950"
          >
            <RefreshCw size={12} />
            <span>Try Again</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
