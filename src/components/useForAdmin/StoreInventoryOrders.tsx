"use client";

// Close icon used inside inventory drawer
import { X } from "lucide-react";

/* ==========================================================
   TYPES
   These types define the shape of data received from API
   ========================================================== */

export type StockStatus = "Critical" | "Low" | "Healthy";

export type OrderStatus =
  | "Delivered"
  | "Preparing"
  | "Out For Delivery"
  | "Cancelled";

// Low stock products shown in inventory table
export interface LowStockProduct {
  product: string;
  stock: number;
  status: StockStatus;
}

// Products that are close to expiry
export interface ExpiringProduct {
  product: string;
  expiry: string;
}

// Recent customer orders
export interface RecentOrder {
  id: string;
  customer: string;
  amount: string;
  status: OrderStatus;
}

// Best-selling products summary
export interface TopProduct {
  rank: string;
  product: string;
  soldToday: number;
}

/* ==========================================================
   COMPONENT PROPS
   Parent component passes all data and handlers through props
   ========================================================== */

interface StoreInventoryOrdersProps {
  lowStockProducts: LowStockProduct[];
  expiringProducts: ExpiringProduct[];
  recentOrders: RecentOrder[];
  topProducts: TopProduct[];

  isDrawerOpen: boolean;
  onOpenDrawer: () => void;
  onCloseDrawer: () => void;
}

/* ==========================================================
   STATUS COLORS
   Maps status values to Tailwind CSS classes
   ========================================================== */

const stockStatusClass: Record<StockStatus, string> = {
  Critical: "bg-red-100 text-red-700 ring-red-200",
  Low: "bg-yellow-100 text-yellow-800 ring-yellow-200",
  Healthy: "bg-green-100 text-green-700 ring-green-200",
};

const orderStatusClass: Record<OrderStatus, string> = {
  Delivered: "bg-green-100 text-green-700 ring-green-200",
  Preparing: "bg-blue-100 text-blue-700 ring-blue-200",
  "Out For Delivery": "bg-purple-100 text-purple-700 ring-purple-200",
  Cancelled: "bg-red-100 text-red-700 ring-red-200",
};

/* ==========================================================
   REUSABLE STATUS BADGE

   Used for:
   - Stock Status
   - Order Status

   Prevents duplicate badge code everywhere.
   ========================================================== */

function StatusBadge({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${className}`}
    >
      {label}
    </span>
  );
}

/* ==========================================================
   INVENTORY DRAWER

   Slides from right side when manager clicks
   "Manage Inventory".

   Future Features:
   - Add Product
   - Update Stock
   - Delete Product
   - Bulk Import Products
   ========================================================== */

function InventoryDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // Prevent rendering when drawer is closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40">
      <aside className="h-full w-full max-w-md bg-white p-6 shadow-xl">
        {/* Drawer Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-950">
              Manage Inventory
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Quick actions for store stock control.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close inventory drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Inventory Action Buttons */}
        <div className="mt-8 grid gap-3">
          {[
            "Add Product",
            "Update Stock",
            "Delete Product",
            "Bulk Import",
          ].map((action) => (
            <button
              key={action}
              className="rounded-lg border px-4 py-3 text-left"
            >
              {action}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}

/* ==========================================================
   MAIN COMPONENT

   Purpose:
   Central dashboard for store manager.

   Sections:
   1. Low Stock Products
   2. Expiring Products
   3. Recent Orders
   4. Top Selling Products
   5. Inventory Management Drawer

   Future API Integration:
   - Inventory Collection
   - Orders Collection
   - Product Analytics
   ========================================================== */

export default function StoreInventoryOrders({
  lowStockProducts,
  expiringProducts,
  recentOrders,
  topProducts,
  isDrawerOpen,
  onOpenDrawer,
  onCloseDrawer,
}: StoreInventoryOrdersProps) {
  return (
    <>
      {/* =====================================================
          INVENTORY OVERVIEW SECTION
          ===================================================== */}

      <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">

        {/* Low Stock Products Table */}
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">

          {/* Header */}
          <div className="mb-5 flex justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Low Stock Products
              </h2>

              <p className="text-sm text-slate-500">
                Products the manager should check first.
              </p>
            </div>

            {/* Opens inventory drawer */}
            <button
              onClick={onOpenDrawer}
              className="h-10 rounded-lg bg-green-600 px-4 text-white"
            >
              Manage Inventory
            </button>
          </div>

          {/* Low Stock Table */}
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Product</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {lowStockProducts.map((product) => (
                <tr key={product.product}>
                  <td>{product.product}</td>

                  <td>{product.stock}</td>

                  <td>
                    <StatusBadge
                      label={product.status}
                      className={
                        stockStatusClass[product.status]
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Expiring Products Card */}
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">
            Expiring Products
          </h2>

          {expiringProducts.map((product) => (
            <div key={product.product}>
              {product.product}
            </div>
          ))}
        </section>
      </section>

      {/* =====================================================
          ORDER ANALYTICS SECTION
          ===================================================== */}

      <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">

        {/* Latest customer orders */}
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">
            Recent Orders
          </h2>
        </section>

        {/* Most sold products today */}
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">
            Top Selling Products
          </h2>
        </section>
      </section>

      {/* Global Inventory Drawer */}
      <InventoryDrawer
        isOpen={isDrawerOpen}
        onClose={onCloseDrawer}
      />
    </>
  );
}