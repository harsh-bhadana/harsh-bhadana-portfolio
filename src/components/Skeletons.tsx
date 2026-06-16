import React from "react";

export function BiddingSkeleton() {
  return (
    <div className="premium-card rounded-2xl overflow-hidden border border-zinc-200 bg-white flex flex-col h-[520px] animate-pulse">
      <div className="bg-zinc-50 px-5 py-4 border-b border-zinc-150 h-14"></div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-zinc-100">
        <div className="md:col-span-3 p-5 space-y-6">
          <div className="flex space-x-2">
            <div className="h-9 flex-1 bg-zinc-100 rounded-xl"></div>
            <div className="h-9 flex-1 bg-zinc-100 rounded-xl"></div>
          </div>
          <div className="h-28 bg-zinc-50 rounded-xl"></div>
          <div className="space-y-2">
            <div className="h-10 bg-zinc-100 rounded-xl"></div>
            <div className="h-10 bg-zinc-100 rounded-xl"></div>
          </div>
        </div>
        <div className="md:col-span-2 p-5 space-y-4">
          <div className="h-4 w-32 bg-zinc-100 rounded"></div>
          <div className="space-y-2">
            <div className="h-14 bg-zinc-50 rounded-xl"></div>
            <div className="h-14 bg-zinc-50 rounded-xl"></div>
            <div className="h-14 bg-zinc-50 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TrackerSkeleton() {
  return (
    <div className="premium-card rounded-2xl overflow-hidden border border-zinc-200 bg-white flex flex-col h-[520px] animate-pulse">
      <div className="bg-zinc-50 px-5 py-4 border-b border-zinc-150 h-14"></div>
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-zinc-100">
        <div className="lg:col-span-2 p-5 space-y-4">
          <div className="h-4 w-24 bg-zinc-100 rounded"></div>
          <div className="h-44 bg-zinc-50 rounded-xl"></div>
        </div>
        <div className="lg:col-span-3 p-5 space-y-4">
          <div className="h-9 bg-zinc-100 rounded-xl"></div>
          <div className="space-y-2">
            <div className="h-16 bg-zinc-50 rounded-xl"></div>
            <div className="h-16 bg-zinc-50 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SecuritySkeleton() {
  return (
    <div className="premium-card rounded-2xl overflow-hidden border border-zinc-200 bg-white flex flex-col h-[520px] animate-pulse">
      <div className="bg-zinc-50 px-5 py-4 border-b border-zinc-150 h-14"></div>
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-zinc-100">
        <div className="lg:col-span-2 p-5 space-y-4">
          <div className="h-16 bg-zinc-100 rounded-xl"></div>
          <div className="h-24 bg-zinc-100 rounded-xl"></div>
          <div className="h-10 bg-zinc-100 rounded-xl"></div>
        </div>
        <div className="lg:col-span-3 p-5 space-y-4">
          <div className="h-4 w-32 bg-zinc-100 rounded"></div>
          <div className="h-full bg-zinc-50 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

export function SystemSkeleton() {
  return (
    <div className="premium-card rounded-2xl p-5 border border-zinc-200 bg-white flex flex-col justify-between h-44 animate-pulse">
      <div className="flex justify-between items-center border-b border-zinc-100 pb-2.5">
        <div className="h-4 w-4 bg-zinc-100 rounded-full"></div>
        <div className="h-3 w-20 bg-zinc-100 rounded-md"></div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-5/6 bg-zinc-100 rounded"></div>
        <div className="h-3 w-2/3 bg-zinc-100 rounded"></div>
      </div>
      <div className="h-7 w-full bg-zinc-100 rounded-lg"></div>
    </div>
  );
}

export function GithubPulseSkeleton() {
  return (
    <div className="premium-card rounded-2xl p-5 border border-zinc-200 bg-white space-y-4 shadow-sm animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-zinc-100 pb-2.5 h-12">
        <div className="space-y-2">
          <div className="h-3 w-28 bg-zinc-100 rounded"></div>
          <div className="h-4 w-36 bg-zinc-150 rounded"></div>
        </div>
        <div className="h-7 w-7 bg-zinc-100 rounded-lg"></div>
      </div>

      {/* Grid skeleton */}
      <div className="space-y-2">
        <div className="h-3 w-40 bg-zinc-100 rounded"></div>
        <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl flex items-center space-x-2 h-28">
          <div className="flex flex-col justify-between h-20 w-8">
            <div className="h-2 w-6 bg-zinc-200 rounded"></div>
            <div className="h-2 w-6 bg-zinc-200 rounded"></div>
            <div className="h-2 w-6 bg-zinc-200 rounded"></div>
          </div>
          <div className="flex-1 flex gap-[3px] h-20 items-center">
            {/* Mock columns */}
            {Array.from({ length: 26 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, j) => (
                  <div key={j} className="w-2.5 h-2.5 bg-zinc-200 rounded-[2px]" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity skeleton */}
      <div className="space-y-2">
        <div className="h-3 w-24 bg-zinc-100 rounded"></div>
        <div className="space-y-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex items-start space-x-2.5 bg-zinc-50 p-2.5 rounded-xl border border-zinc-100 h-14"
            >
              <div className="w-6 h-6 bg-zinc-200 rounded-lg shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-2.5 w-1/3 bg-zinc-200 rounded"></div>
                <div className="h-2 w-2/3 bg-zinc-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
