"use client";

import { Bell, Search, UserRound } from "lucide-react";

type StoreDashboardHeaderProps = {
  today: string;
};

function StoreDashboardHeader({ today }: StoreDashboardHeaderProps) {
  return (
    <header className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Snapcart Store Dashboard
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Bengaluru Branch &middot; {today}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 sm:w-72"
              placeholder="Search products"
              type="search"
            />
          </label>

          <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <Bell className="h-4 w-4" />
            5 Alerts
            {/* update the alerts when some inspices  */}
          </button>

          <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800">
            <UserRound className="h-4 w-4" />
            Vishal
            {/* take the name from auth session  */}
          </button>
        </div>
      </div>
    </header>
  );
}

export default StoreDashboardHeader;
