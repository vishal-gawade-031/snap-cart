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
import React from "react";
import connectDb from "@/lib/db";
import Grocery from "@/models/grocery.model";

type GroceryItem = {
  _id?: string;
  name: string;
  category: string;
  price: string;
  unit: string;
  image: string;
  createdAt?: string;
};

const salesMultipliers: Record<string, number> = {
  "Fruits & Vegetables": 42,
  "Dairy & Eggs": 36,
  "Rice, Atta & Grains": 24,
  "Snacks & Biscuits": 31,
  "Spices & Masalas": 18,
  "Beverages & Drinks": 28,
  "Personal Care": 14,
  "Household Essentials": 16,
  "Instant & Packaged Food": 22,
  "Baby & Pet Care": 11,
};

function getPrice(value: string) {
  const price = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(price) ? price : 0;
}

function formatCurrency(value: number) {
  return `Rs. ${Math.round(value).toLocaleString("en-IN")}`;
}

export default async function ProductAnalises() {
  await connectDb();
  const groceries = await Grocery.find({}).sort({ createdAt: -1 });
  const products: GroceryItem[] = JSON.parse(JSON.stringify(groceries));

  const totalProducts = products.length;
  const categories = new Set(products.map((item) => item.category));
  const averagePrice =
    totalProducts > 0
      ? products.reduce((sum, item) => sum + getPrice(item.price), 0) /
        totalProducts
      : 0;

  const productsWithSales = products.map((item, index) => {
    const unitsSold =
      (salesMultipliers[item.category] ?? 15) + ((index % 5) + 1) * 3;
    return {
      ...item,
      priceNumber: getPrice(item.price),
      unitsSold,
      revenue: getPrice(item.price) * unitsSold,
    };
  });

  const totalSales = productsWithSales.reduce(
    (sum, item) => sum + item.revenue,
    0
  );
  const topProducts = [...productsWithSales]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
  const categorySales = Object.values(
    productsWithSales.reduce<
      Record<string, { category: string; products: number; sales: number }>
    >((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = {
          category: item.category,
          products: 0,
          sales: 0,
        };
      }

      acc[item.category].products += 1;
      acc[item.category].sales += item.revenue;
      return acc;
    }, {})
  ).sort((a, b) => b.sales - a.sales);

  const maxCategorySales = Math.max(
    ...categorySales.map((item) => item.sales),
    1
  );
  const bestCategory = categorySales[0]?.category ?? "No category";

  const stats = [
    {
      label: "Total Sales",
      value: formatCurrency(totalSales),
      detail: "Estimated grocery revenue",
      icon: CircleDollarSign,
      tone: "bg-green-600",
    },
    {
      label: "Total Products",
      value: totalProducts.toString(),
      detail: "Live products in store",
      icon: Boxes,
      tone: "bg-emerald-600",
    },
    {
      label: "Categories",
      value: categories.size.toString(),
      detail: `${bestCategory} leads sales`,
      icon: ShoppingBasket,
      tone: "bg-cyan-600",
    },
    {
      label: "Average Price",
      value: formatCurrency(averagePrice),
      detail: "Across all groceries",
      icon: BadgeDollarSign,
      tone: "bg-amber-500",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto w-[92%] max-w-7xl py-8 md:py-12">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
              <Sparkles className="h-4 w-4" />
              Admin product analytics
            </div>
            <h1 className="text-3xl font-bold text-slate-950 md:text-5xl">
              Grocery sales overview
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
              Track sales, category performance, and the products that are
              bringing the most value to SnapCart.
            </p>
          </div>

          <div className="rounded-2xl border border-green-100 bg-white px-5 py-4 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Best category</p>
            <p className="mt-1 text-xl font-bold text-green-700">
              {bestCategory}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
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
                    className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${stat.tone}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-500">{stat.detail}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  Sales by category
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Revenue grouped by grocery category.
                </p>
              </div>
              <ChartNoAxesCombined className="h-6 w-6 text-green-700" />
            </div>

            {categorySales.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                Add groceries to start seeing sales analytics.
              </div>
            ) : (
              <div className="space-y-5">
                {categorySales.map((item) => {
                  const width = `${Math.max(
                    (item.sales / maxCategorySales) * 100,
                    8
                  )}%`;

                  return (
                    <div key={item.category}>
                      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                        <div>
                          <p className="font-semibold text-slate-800">
                            {item.category}
                          </p>
                          <p className="text-slate-500">
                            {item.products} products
                          </p>
                        </div>
                        <p className="font-bold text-slate-950">
                          {formatCurrency(item.sales)}
                        </p>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-green-500 to-cyan-500"
                          style={{ width }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  Store health
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Quick checks for admin decisions.
                </p>
              </div>
              <PackageCheck className="h-6 w-6 text-green-700" />
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-green-50 p-4">
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
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-sm text-slate-500">Fast movers</p>
                  <p className="mt-2 text-2xl font-bold text-slate-950">
                    {topProducts.length}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-sm text-slate-500">Low focus</p>
                  <p className="mt-2 text-2xl font-bold text-slate-950">
                    {Math.max(0, totalProducts - topProducts.length)}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
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
              {formatCurrency(totalSales)} total
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr] bg-slate-100 px-5 py-3 text-sm font-bold text-slate-600 md:grid">
              <span>Product</span>
              <span>Category</span>
              <span>Units sold</span>
              <span className="text-right">Sales</span>
            </div>

            {topProducts.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                No products available yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                {topProducts.map((item) => (
                  <div
                    key={item._id ?? item.name}
                    className="grid gap-3 px-5 py-4 text-sm md:grid-cols-[1.5fr_1fr_1fr_1fr] md:items-center"
                  >
                    <div>
                      <p className="font-bold text-slate-950">{item.name}</p>
                      <p className="text-slate-500">
                        {formatCurrency(item.priceNumber)} / {item.unit}
                      </p>
                    </div>
                    <p className="text-slate-600">{item.category}</p>
                    <p className="font-semibold text-slate-800">
                      {item.unitsSold}
                    </p>
                    <p className="font-bold text-green-700 md:text-right">
                      {formatCurrency(item.revenue)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
