"use client";

import React from "react";

export type KpiCard = {
  title: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
  tone: string;
};

export type SalesDay = {
  day: string;
  sales: number;
};

type StoreDashboardOverviewProps = {
  kpiCards: KpiCard[];
  orderTrend: SalesDay[];
  salesData: SalesDay[];
};

function MiniBarChart({
  title,
  data,
  valuePrefix = "",
}: {
  title: string;
  data: SalesDay[];
  valuePrefix?: string;
}) {
  const maxValue = Math.max(...data.map((item) => item.sales));

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
        <span className="text-sm font-medium text-slate-500">This week</span>
      </div>

      <div className="flex h-64 items-end gap-4">
        {data.map((item) => {
          const height = `${Math.max((item.sales / maxValue) * 100, 8)}%`;

          return (
            <div
              className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              key={item.day}
            >
              <span className="text-xs font-semibold text-slate-500">
                {valuePrefix}
                {item.sales.toLocaleString("en-IN")}
              </span>
              <div className="flex h-48 w-full items-end rounded-md bg-slate-100">
                <div
                  aria-label={`${item.day}: ${item.sales}`}
                  className="w-full rounded-md bg-green-600 transition-all"
                  style={{ height }}
                />
              </div>
              <span className="text-sm font-semibold text-slate-700">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function StoreDashboardOverview({
  kpiCards,
  orderTrend,
  salesData,
}: StoreDashboardOverviewProps) {
  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((card) => (
          <article
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            key={card.title}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  {card.title}
                </p>
                <p className="mt-3 text-2xl font-bold text-slate-950">
                  {card.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-green-700">
                  {card.helper}
                </p>
              </div>
              <span className={`rounded-lg p-3 ${card.tone}`}>
                {card.icon}
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <MiniBarChart data={salesData} title="Sales Analytics" valuePrefix="Rs." />
        <MiniBarChart data={orderTrend} title="Orders Trend" />
      </section>
    </>
  );
}

export default StoreDashboardOverview;
