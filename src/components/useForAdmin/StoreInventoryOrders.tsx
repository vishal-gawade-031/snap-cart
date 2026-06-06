"use client";

import { X } from "lucide-react";

export type StockStatus = "Critical" | "Low" | "Healthy";
export type OrderStatus =
  | "Delivered"
  | "Preparing"
  | "Out For Delivery"
  | "Cancelled";

export type LowStockProduct = {
  product: string;
  stock: number;
  status: StockStatus;
};

export type ExpiringProduct = {
  product: string;
  expiry: string;
};

export type RecentOrder = {
  id: string;
  customer: string;
  amount: string;
  status: OrderStatus;
};

export type TopProduct = {
  rank: string;
  product: string;
  soldToday: number;
};

type StoreInventoryOrdersProps = {
  expiringProducts: ExpiringProduct[];
  isDrawerOpen: boolean;
  lowStockProducts: LowStockProduct[];
  onCloseDrawer: () => void;
  onOpenDrawer: () => void;
  recentOrders: RecentOrder[];
  topProducts: TopProduct[];
};

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

function StoreInventoryOrders({
  expiringProducts,
  isDrawerOpen,
  lowStockProducts,
  onCloseDrawer,
  onOpenDrawer,
  recentOrders,
  topProducts,
}: StoreInventoryOrdersProps) {
  return (
    <>
      <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Low Stock Products
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Products the manager should check first.
              </p>
            </div>
            <button
              className="h-10 rounded-lg bg-green-600 px-4 text-sm font-semibold text-white hover:bg-green-700"
              onClick={onOpenDrawer}
            >
              Manage Inventory
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-30 text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                  <th className="py-3 font-semibold">Product</th>
                  <th className="py-3 font-semibold">Stock</th>
                  <th className="py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {lowStockProducts.map((product) => (
                  <tr key={product.product}>
                    <td className="py-4 font-semibold text-slate-900">
                      {product.product}
                    </td>
                    <td className="py-4 text-slate-600">{product.stock}</td>
                    <td className="py-4">
                      <StatusBadge
                        className={stockStatusClass[product.status]}
                        label={product.status}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            Expiring Products
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Move or discount these items to reduce wastage.
          </p>

          <div className="mt-5 space-y-3">
            {expiringProducts.map((product) => (
              <div
                className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-3"
                key={product.product}
              >
                <span className="font-semibold text-slate-900">
                  {product.product}
                </span>
                <span className="text-sm font-bold text-red-600">
                  {product.expiry}
                </span>
              </div>
            ))}
          </div>
        </section>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            Recent Orders
          </h2>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w- text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                  <th className="py-3 font-semibold">Order ID</th>
                  <th className="py-3 font-semibold">Customer</th>
                  <th className="py-3 font-semibold">Amount</th>
                  <th className="py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-4 font-semibold text-slate-900">
                      {order.id}
                    </td>
                    <td className="py-4 text-slate-600">{order.customer}</td>
                    <td className="py-4 font-semibold text-slate-900">
                      {order.amount}
                    </td>
                    <td className="py-4">
                      <StatusBadge
                        className={orderStatusClass[order.status]}
                        label={order.status}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            Top Selling Products
          </h2>

          <div className="mt-5 space-y-3">
            {topProducts.map((product) => (
              <article
                className="flex items-center gap-4 rounded-lg border border-slate-100 bg-white p-4 shadow-sm"
                key={product.product}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                  #{product.rank}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-950">
                    {product.product}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {product.soldToday} sold today
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>

      {isDrawerOpen ? (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40">
          <aside className="h-full w-full max-w-md bg-white p-6 shadow-xl">
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
                aria-label="Close inventory drawer"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-950"
                onClick={onCloseDrawer}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 grid gap-3">
              {["Add Product", "Update Stock", "Delete Product", "Bulk Import"].map(
                (action) => (
                  <button
                    className="rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-800 hover:border-green-300 hover:bg-green-50"
                    key={action}
                  >
                    {action}
                  </button>
                )
              )}
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}

export default StoreInventoryOrders;
