"use client";

import {
  ArrowLeft,
  Boxes,
  CircleDollarSign,
  Layers3,
  PackagePlus,
  Search,
  ShieldCheck,
  Sparkles,
  Tags,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export type AdminProduct = {
  _id?: string;
  name: string;
  category: string;
  price: string;
  unit: string;
  image: string;
  createdAt?: string;
};

type AdminProductsViewProps = {
  products: AdminProduct[];
  summary: {
    totalProducts: number;
    categories: number;
    averagePrice: string;
    latestProduct: string;
  };
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const categoryTone = [
  "bg-green-50 text-green-700 border-green-100",
  "bg-cyan-50 text-cyan-700 border-cyan-100",
  "bg-amber-50 text-amber-700 border-amber-100",
  "bg-rose-50 text-rose-700 border-rose-100",
];

export default function AdminProductsView({
  products,
  summary,
}: AdminProductsViewProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((item) => item.category)))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase();

    return products.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesSearch =
        search.length === 0 ||
        item.name.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [category, products, query]);

  const stats = [
    {
      label: "Live Products",
      value: summary.totalProducts.toString(),
      detail: "Items visible in store",
      icon: Boxes,
      className: "bg-green-600",
    },
    {
      label: "Categories",
      value: summary.categories.toString(),
      detail: "Product groups",
      icon: Layers3,
      className: "bg-cyan-600",
    },
    {
      label: "Average Price",
      value: summary.averagePrice,
      detail: "Across current items",
      icon: CircleDollarSign,
      className: "bg-amber-500",
    },
    {
      label: "Latest Added",
      value: summary.latestProduct,
      detail: "Newest inventory item",
      icon: ShieldCheck,
      className: "bg-emerald-600",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08 }}
        className="mx-auto max-w-7xl"
      >
        <motion.div
          variants={fadeUp}
          className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-green-200 hover:text-green-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
              <Sparkles className="h-4 w-4" />
              Product admin
            </div>
            <h1 className="mt-3 text-3xl font-bold text-slate-950 md:text-5xl">
              Manage grocery products
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
              Review product details, filter inventory, and add new grocery
              items from one clean admin workspace.
            </p>
          </div>

          <Link
            href="/admin/add-grocery"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-green-100 transition hover:bg-green-700"
          >
            <PackagePlus className="h-5 w-5" />
            Add Grocery
          </Link>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.article
                key={stat.label}
                variants={fadeUp}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-500">
                      {stat.label}
                    </p>
                    <p className="mt-2 truncate text-2xl font-bold text-slate-950">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white ${stat.className}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-500">{stat.detail}</p>
              </motion.article>
            );
          })}
        </div>

        <motion.section
          variants={fadeUp}
          className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                Product inventory
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {filteredProducts.length} of {products.length} products shown
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative block w-full sm:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search product"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-green-300 focus:bg-white focus:ring-2 focus:ring-green-100"
                />
              </label>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-green-300 focus:bg-white focus:ring-2 focus:ring-green-100"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-10 text-center">
              <Tags className="mx-auto h-10 w-10 text-slate-400" />
              <p className="mt-3 text-sm font-semibold text-slate-700">
                No products match this filter.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((item, index) => (
                <motion.article
                  key={item._id ?? item.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-green-200 hover:shadow-md"
                >
                  <div className="relative aspect-4/3 bg-slate-50">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-contain p-5"
                    />
                    <span
                      className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-bold ${
                        categoryTone[index % categoryTone.length]
                      }`}
                    >
                      Active
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="truncate text-lg font-bold text-slate-950">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {item.category}
                        </p>
                      </div>
                      <p className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-sm font-bold text-green-700">
                        {item.price}
                      </p>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-slate-500">Unit</p>
                        <p className="mt-1 font-bold text-slate-900">
                          {item.unit}
                        </p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-slate-500">Status</p>
                        <p className="mt-1 font-bold text-green-700">
                          In stock
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </motion.section>
      </motion.div>
    </main>
  );
}
