"use client";

import { useMemo, useState } from "react";
import {
  IndianRupee,
  Package,
  ShoppingBasket,
  TriangleAlert,
} from "lucide-react";
import StoreDashboardHeader from "./StoreDashboardHeader";
import StoreDashboardOverview, {
  KpiCard,
  SalesDay,
} from "./StoreDashboardOverview";
import StoreInventoryOrders, {
  ExpiringProduct,
  LowStockProduct,
  RecentOrder,
  TopProduct,
} from "./StoreInventoryOrders";

const salesData: SalesDay[] = [
  { day: "Mon", sales: 12000 },
  { day: "Tue", sales: 18000 },
  { day: "Wed", sales: 25000 },
  { day: "Thu", sales: 21000 },
  { day: "Fri", sales: 32000 },
];

const orderTrend: SalesDay[] = [
  { day: "Mon", sales: 186 },
  { day: "Tue", sales: 242 },
  { day: "Wed", sales: 318 },
  { day: "Thu", sales: 284 },
  { day: "Fri", sales: 412 },
];

const lowStockProducts: LowStockProduct[] = [
  { product: "Amul Milk", stock: 4, status: "Critical" },
  { product: "Bread", stock: 8, status: "Low" },
  { product: "Eggs", stock: 12, status: "Low" },
  { product: "Basmati Rice", stock: 34, status: "Healthy" },
];

const expiringProducts: ExpiringProduct[] = [
  { product: "Milk", expiry: "2 Days" },
  { product: "Yogurt", expiry: "1 Day" },
  { product: "Paneer", expiry: "Today" },
];

const recentOrders: RecentOrder[] = [
  { id: "#1234", customer: "Rahul", amount: "Rs.250", status: "Delivered" },
  { id: "#1235", customer: "Priya", amount: "Rs.520", status: "Preparing" },
  {
    id: "#1236",
    customer: "Amit",
    amount: "Rs.180",
    status: "Out For Delivery",
  },
  { id: "#1237", customer: "Neha", amount: "Rs.740", status: "Cancelled" },
];

const topProducts: TopProduct[] = [
  { rank: "1", product: "Amul Milk", soldToday: 250 },
  { rank: "2", product: "Bread", soldToday: 180 },
  { rank: "3", product: "Eggs", soldToday: 150 },
  { rank: "4", product: "Fresh Paneer", soldToday: 96 },
];

function StoreManagement() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const today = useMemo(
    () =>
      new Intl.DateTimeFormat("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date()),
    []
  );

  const kpiCards: KpiCard[] = [
    {
      title: "Total Orders",
      value: "1,248 Orders",
      helper: "+12% Today",
      icon: <Package className="h-6 w-6" />,
      tone: "bg-blue-50 text-blue-700",
    },
    {
      title: "Revenue",
      value: "Rs.82,540",
      helper: "+18% Today",
      icon: <IndianRupee className="h-6 w-6" />,
      tone: "bg-green-50 text-green-700",
    },
    {
      title: "Products",
      value: "452 Products",
      helper: "Active inventory",
      icon: <ShoppingBasket className="h-6 w-6" />,
      tone: "bg-slate-100 text-slate-700",
    },
    {
      title: "Low Stock",
      value: "12 Products",
      helper: "Need refill",
      icon: <TriangleAlert className="h-6 w-6" />,
      tone: "bg-red-50 text-red-700",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <StoreDashboardHeader today={today} />
        <StoreDashboardOverview
          kpiCards={kpiCards}
          orderTrend={orderTrend}
          salesData={salesData}
        />
        <StoreInventoryOrders
          expiringProducts={expiringProducts}
          isDrawerOpen={isDrawerOpen}
          lowStockProducts={lowStockProducts}
          onCloseDrawer={() => setIsDrawerOpen(false)}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          recentOrders={recentOrders}
          topProducts={topProducts}
        />
      </div>
    </main>
  );
}

export default StoreManagement;
