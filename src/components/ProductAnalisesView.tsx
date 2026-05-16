"use client";

import {
  BadgeDollarSign,
  Boxes,
  ChartNoAxesCombined,
  CircleDollarSign,
  PackageCheck,
  ShoppingBasket,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

type StatTone = "green" | "emerald" | "cyan" | "amber";
type StatIcon = "sales" | "products" | "categories" | "price";

export type ProductAnalisesData = {
  bestCategory: string;
  maxCategorySales: number;
  totalSales: string;
  stats: {
    label: string;
    value: string;
    detail: string;
    icon: StatIcon;
    tone: StatTone;
  }[];
  categorySales: {
    category: string;
    products: number;
    sales: number;
    formattedSales: string;
  }[];
  topProducts: {
    id: string;
    name: string;
    category: string;
    unit: string;
    unitsSold: number;
    formattedPrice: string;
    formattedRevenue: string;
  }[];
  storeHealth: {
    fastMovers: number;
    lowFocus: number;
  };
};

const icons = {
  sales: CircleDollarSign,
  products: Boxes,
  categories: ShoppingBasket,
  price: BadgeDollarSign,
};

const toneClasses: Record<StatTone, string> = {
  green: "bg-green-600 shadow-green-200",
  emerald: "bg-emerald-600 shadow-emerald-200",
  cyan: "bg-cyan-600 shadow-cyan-200",
  amber: "bg-amber-500 shadow-amber-200",
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function ProductAnalisesView({
  data,
}: {
  data: ProductAnalisesData;
}) {
  return (
    <section className="bg-slate-50 py-8 md:py-12">
      <motion.div
        className="mx-auto w-[92%] max-w-7xl"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08 }}
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
              <Sparkles className="h-4 w-4" />
              Product analytics
            </div>
            <h1 className="text-3xl font-bold text-slate-950 md:text-5xl">
              Grocery sales overview
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
              Track sales, category performance, and top products from the
              current SnapCart inventory.
            </p>
          </div>

          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-xl border border-green-100 bg-white px-5 py-4 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">Best category</p>
            <p className="mt-1 text-xl font-bold text-green-700">
              {data.bestCategory}
            </p>
          </motion.div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.stats.map((stat, index) => {
            const Icon = icons[stat.icon];

            return (
              <motion.article
                key={stat.label}
                variants={fadeUp}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-slate-950">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-lg ${toneClasses[stat.tone]}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-500">{stat.detail}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <motion.section
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  Sales by category
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Revenue grouped by grocery category.
                </p>
              </div>
              <ChartNoAxesCombined className="h-6 w-6 shrink-0 text-green-700" />
            </div>

            {data.categorySales.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                Add groceries to start seeing sales analytics.
              </div>
            ) : (
              <div className="space-y-5">
                {data.categorySales.map((item, index) => {
                  const width = Math.max(
                    (item.sales / data.maxCategorySales) * 100,
                    8
                  );

                  return (
                    <motion.div
                      key={item.category}
                      variants={fadeUp}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                    >
                      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                        <div>
                          <p className="font-semibold text-slate-800">
                            {item.category}
                          </p>
                          <p className="text-slate-500">
                            {item.products} products
                          </p>
                        </div>
                        <p className="text-right font-bold text-slate-950">
                          {item.formattedSales}
                        </p>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <motion.div
                          className="h-full rounded-full bg-linear-to-r from-green-500 to-cyan-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${width}%` }}
                          transition={{
                            duration: 0.75,
                            delay: 0.2 + index * 0.06,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.section>

          <motion.section
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  Store health
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Quick checks for admin decisions.
                </p>
              </div>
              <PackageCheck className="h-6 w-6 shrink-0 text-green-700" />
            </div>

            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-xl bg-green-50 p-4"
              >
                <p className="text-sm font-semibold text-green-800">
                  Sales momentum
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-green-700" />
                  <p className="text-2xl font-bold text-green-900">+18%</p>
                </div>
                <p className="mt-2 text-sm text-green-700">
                  Simulated growth based on current product mix.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-sm text-slate-500">Fast movers</p>
                  <p className="mt-2 text-2xl font-bold text-slate-950">
                    {data.storeHealth.fastMovers}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-sm text-slate-500">Low focus</p>
                  <p className="mt-2 text-2xl font-bold text-slate-950">
                    {data.storeHealth.lowFocus}
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        <motion.section
          variants={fadeUp}
          transition={{ duration: 0.45 }}
          className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"
        >
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                Top selling products
              </h2>
              <p className="text-sm text-slate-500">
                Ranked by estimated product sales.
              </p>
            </div>
            <p className="text-sm font-semibold text-green-700">
              {data.totalSales} total
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr] bg-slate-100 px-5 py-3 text-sm font-bold text-slate-600 md:grid">
              <span>Product</span>
              <span>Category</span>
              <span>Units sold</span>
              <span className="text-right">Sales</span>
            </div>

            {data.topProducts.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                No products available yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                {data.topProducts.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 + index * 0.05 }}
                    className="grid gap-3 px-5 py-4 text-sm md:grid-cols-[1.5fr_1fr_1fr_1fr] md:items-center"
                  >
                    <div>
                      <p className="font-bold text-slate-950">{item.name}</p>
                      <p className="text-slate-500">
                        {item.formattedPrice} / {item.unit}
                      </p>
                    </div>
                    <p className="text-slate-600">{item.category}</p>
                    <p className="font-semibold text-slate-800">
                      {item.unitsSold}
                    </p>
                    <p className="font-bold text-green-700 md:text-right">
                      {item.formattedRevenue}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.section>
      </motion.div>
    </section>
  );
}
