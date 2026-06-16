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
